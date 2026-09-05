import { encodeAamva } from "./encode.ts";
import {
  EYE_COLORS,
  HAIR_COLORS,
  MANDATORY_FIELDS,
  ageOn,
  complianceLabel,
  formatHeight,
  formatPostal,
  fromAamvaDate,
  isValidAamvaDate,
  sexLabel,
  todayIso,
} from "./format.ts";
import { JURISDICTION_BY_CODE, JURISDICTION_BY_IIN, zipMatchesJurisdiction } from "./jurisdictions.ts";
import { parseAamva } from "./parse.ts";
import type { LicenseForm, ParsedDocument, ScannerExtract, VerifyCheck, VerifyReport } from "./types.ts";

const EYE_SET = new Set(EYE_COLORS.map((e) => e.code));
const HAIR_SET = new Set(HAIR_COLORS.map((h) => h.code));

export function verifyPayload(payload: string, form?: LicenseForm): VerifyReport {
  const checks: VerifyCheck[] = [];
  const add = (check: VerifyCheck) => checks.push(check);

  let parsed: ParsedDocument | null = null;
  try {
    parsed = parseAamva(payload);
    add({
      id: "parse",
      label: "AAMVA header parses",
      severity: "pass",
      detail: `ANSI IIN ${parsed.iin}  version ${String(parsed.aamvaVersion).padStart(2, "0")}  ${parsed.entryCount} subfile(s)`,
    });
  } catch (err) {
    add({
      id: "parse",
      label: "AAMVA header parses",
      severity: "fail",
      detail: err instanceof Error ? err.message : "Unreadable payload",
    });
    return summarize(checks, null);
  }

  const headerOk =
    payload.startsWith("@\n\x1e\rANSI ") || payload.startsWith("@\n\u001e\rANSI ");
  add({
    id: "header-bytes",
    label: "Compliance header bytes",
    severity: headerOk ? "pass" : "fail",
    detail: headerOk
      ? "@ + LF + RS + CR + ANSI (AAMVA Annex D)"
      : "Header must be '@' LF RS CR 'ANSI ' — scanners reject a missing RS (0x1E).",
  });

  const jFromIin = JURISDICTION_BY_IIN[parsed.iin];
  add({
    id: "iin",
    label: "Issuer Identification Number",
    severity: jFromIin ? "pass" : "fail",
    detail: jFromIin
      ? `${parsed.iin} is ${jFromIin.name} (${jFromIin.code})`
      : `${parsed.iin} is not a registered US jurisdiction IIN`,
  });

  if (form) {
    const expected = JURISDICTION_BY_CODE[form.jurisdictionCode];
    const match = expected && expected.iin === parsed.iin;
    add({
      id: "iin-match",
      label: "IIN matches selected jurisdiction",
      severity: match ? "pass" : "fail",
      detail: match
        ? `${form.jurisdictionCode} ↔ ${parsed.iin}`
        : `Selected ${form.jurisdictionCode} expects IIN ${expected?.iin ?? "—"}, payload has ${parsed.iin}`,
    });
  }

  const versionOk = parsed.aamvaVersion >= 1 && parsed.aamvaVersion <= 10;
  add({
    id: "version",
    label: "AAMVA version",
    severity: versionOk ? "pass" : "fail",
    detail: versionOk
      ? `Version ${String(parsed.aamvaVersion).padStart(2, "0")} (${versionName(parsed.aamvaVersion)})`
      : `Version ${parsed.aamvaVersion} is outside 01–10`,
  });

  const expectedCount = parsed.subfiles.length;
  add({
    id: "entries",
    label: "Subfile count",
    severity: parsed.entryCount === expectedCount && expectedCount > 0 ? "pass" : "fail",
    detail: `Header declares ${parsed.entryCount}, parsed ${expectedCount}`,
  });

  const expectedStart = 21 + 10 * parsed.entryCount;
  const first = parsed.subfiles[0];
  add({
    id: "offset-0",
    label: "First subfile offset",
    severity: first && first.offset === expectedStart ? "pass" : "fail",
    detail: first
      ? `Offset ${String(first.offset).padStart(4, "0")} (expected ${String(expectedStart).padStart(4, "0")})`
      : "No subfile designator",
  });

  parsed.subfiles.forEach((sf, i) => {
    const slice = payload.slice(sf.offset, sf.offset + sf.length);
    const lenOk = slice.length === sf.length && sf.length === sf.body.length;
    add({
      id: `len-${i}`,
      label: `${sf.type} subfile length`,
      severity: lenOk ? "pass" : "fail",
      detail: `Declared ${sf.length}, body ${sf.body.length} chars`,
    });
    const startsWithType = sf.body.startsWith(sf.type);
    add({
      id: `type-${i}`,
      label: `${sf.type} subfile prefix`,
      severity: startsWithType ? "pass" : "fail",
      detail: startsWithType
        ? `Body begins with ${sf.type}`
        : `Body does not begin with declared type ${sf.type}`,
    });
    const terminated = sf.body.endsWith("\r");
    add({
      id: `term-${i}`,
      label: `${sf.type} segment terminator`,
      severity: terminated ? "pass" : "fail",
      detail: terminated ? "Ends with CR (0x0D)" : "Missing segment terminator CR",
    });
  });

  const chained = parsed.subfiles.every((sf, i, arr) => {
    if (i === 0) return true;
    return sf.offset === arr[i - 1].offset + arr[i - 1].length;
  });
  add({
    id: "chain",
    label: "Subfile offsets chain",
    severity: chained ? "pass" : "fail",
    detail: chained ? "Each subfile begins where the previous ends" : "Gap or overlap in subfile offsets",
  });

  const dl = parsed.subfiles.find((s) => s.type === "DL" || s.type === "ID");
  add({
    id: "dl-subfile",
    label: "DL / ID subfile present",
    severity: dl ? "pass" : "fail",
    detail: dl ? `Type ${dl.type}` : "Missing mandatory DL or ID subfile",
  });

  for (const id of MANDATORY_FIELDS) {
    const value = parsed.elements[id];
    const present = typeof value === "string" && value.length > 0;
    add({
      id: `field-${id}`,
      label: `Mandatory ${id}`,
      severity: present ? "pass" : "fail",
      detail: present ? value : "Missing",
    });
  }

  const v = parsed.aamvaVersion;
  for (const id of ["DBA", "DBB", "DBD"] as const) {
    const raw = parsed.elements[id];
    if (!raw) continue;
    add({
      id: `date-${id}`,
      label: `${id} date format`,
      severity: isValidAamvaDate(raw, v) ? "pass" : "fail",
      detail: isValidAamvaDate(raw, v)
        ? `${raw} → ${fromAamvaDate(raw, v)}`
        : `${raw} is not a valid ${v >= 4 ? "MMDDYYYY" : "YYYYMMDD"} date`,
    });
  }

  const dobIso = parsed.elements.DBB ? fromAamvaDate(parsed.elements.DBB, v) : null;
  const issueIso = parsed.elements.DBD ? fromAamvaDate(parsed.elements.DBD, v) : null;
  const expIso = parsed.elements.DBA ? fromAamvaDate(parsed.elements.DBA, v) : null;

  if (dobIso && issueIso) {
    const ok = issueIso >= dobIso;
    add({
      id: "date-order-issue",
      label: "Issue date after birth",
      severity: ok ? "pass" : "fail",
      detail: ok ? `${issueIso} ≥ ${dobIso}` : `Issue ${issueIso} is before DOB ${dobIso}`,
    });
  }
  if (issueIso && expIso) {
    const ok = expIso >= issueIso;
    add({
      id: "date-order-exp",
      label: "Expiration after issue",
      severity: ok ? "pass" : "fail",
      detail: ok ? `${expIso} ≥ ${issueIso}` : `Expiration ${expIso} is before issue ${issueIso}`,
    });
  }

  const sex = parsed.elements.DBC;
  add({
    id: "sex",
    label: "Sex code",
    severity: sex === "1" || sex === "2" || sex === "9" ? "pass" : "fail",
    detail: sex ? `${sex} (${sexLabel(sex)})` : "Missing",
  });

  const height = parsed.elements.DAU ?? "";
  add({
    id: "height",
    label: "Height format",
    severity: /^\d{3} (in|cm)$/.test(height) ? "pass" : "fail",
    detail: height || "Missing — expected '068 in'",
  });

  const eyes = parsed.elements.DAY ?? "";
  add({
    id: "eyes",
    label: "Eye color code",
    severity: EYE_SET.has(eyes as never) ? "pass" : "warn",
    detail: eyes || "Missing",
  });

  const hair = parsed.elements.DAZ;
  if (hair) {
    add({
      id: "hair",
      label: "Hair color code",
      severity: HAIR_SET.has(hair as never) ? "pass" : "warn",
      detail: hair,
    });
  }

  const postal = parsed.elements.DAK ?? "";
  add({
    id: "postal-len",
    label: "Postal code width",
    severity: postal.length === 11 ? "pass" : "fail",
    detail: postal.length === 11 ? `"${postal}" (11 characters)` : `Length ${postal.length}, AAMVA requires 11`,
  });

  const state = parsed.elements.DAJ;
  const jFromState = state ? JURISDICTION_BY_CODE[state] : undefined;
  add({
    id: "state",
    label: "Jurisdiction code",
    severity: jFromState ? "pass" : "fail",
    detail: jFromState ? `${jFromState.code} ${jFromState.name}` : `${state ?? "—"} is not a US jurisdiction`,
  });

  if (jFromState && jFromIin && jFromState.code !== jFromIin.code) {
    add({
      id: "state-iin",
      label: "DAJ matches IIN",
      severity: "fail",
      detail: `DAJ ${jFromState.code} but IIN belongs to ${jFromIin.code}`,
    });
  } else if (jFromState && jFromIin) {
    add({
      id: "state-iin",
      label: "DAJ matches IIN",
      severity: "pass",
      detail: `${jFromState.code} ↔ ${jFromIin.iin}`,
    });
  }

  const license = parsed.elements.DAQ ?? "";
  if (jFromState) {
    const re = new RegExp(`^${jFromState.licensePattern}$`);
    const ok = re.test(license);
    add({
      id: "license-format",
      label: `${jFromState.code} license number format`,
      severity: ok ? "pass" : "fail",
      detail: ok ? license : `"${license}" does not match ${jFromState.licensePattern}`,
    });
  }

  if (jFromState && postal.trim()) {
    const zipOk = zipMatchesJurisdiction(jFromState, postal);
    add({
      id: "zip-state",
      label: "ZIP belongs to jurisdiction",
      severity: zipOk ? "pass" : "warn",
      detail: zipOk
        ? `${postal.trim()} is in ${jFromState.code}`
        : `${postal.trim()} is outside typical ${jFromState.code} ZIP ranges`,
    });
  }

  for (const id of ["DDE", "DDF", "DDG"] as const) {
    const t = parsed.elements[id];
    add({
      id: `trunc-${id}`,
      label: `${id} truncation`,
      severity: t === "N" || t === "T" || t === "U" ? "pass" : "fail",
      detail: t ?? "Missing (N / T / U)",
    });
  }

  const country = parsed.elements.DCG;
  add({
    id: "country",
    label: "Country",
    severity: country === "USA" || country === "CAN" ? "pass" : "warn",
    detail: country ?? "Missing",
  });

  const dda = parsed.elements.DDA;
  if (dda) {
    add({
      id: "realid",
      label: "REAL ID compliance (DDA)",
      severity: dda === "F" || dda === "N" || dda === "M" ? "pass" : "fail",
      detail: complianceLabel(dda),
    });
  } else {
    add({
      id: "realid",
      label: "REAL ID compliance (DDA)",
      severity: "warn",
      detail: "Optional on older versions; expected on 2013+",
    });
  }

  const disc = parsed.elements.DCF ?? "";
  add({
    id: "discriminator",
    label: "Document discriminator",
    severity: disc.length >= 10 ? "pass" : "warn",
    detail: disc ? `${disc.length} chars` : "Missing",
  });

  if (form) {
    try {
      const roundtrip = encodeAamva(form).payload;
      add({
        id: "encode-stable",
        label: "Re-encode matches payload",
        severity: roundtrip === payload ? "pass" : "warn",
        detail:
          roundtrip === payload
            ? "Encoder output is deterministic"
            : "Live form produced a different payload than the scanned string",
      });
    } catch {
      /* form may be incomplete */
    }
  }

  if (payload.length > 900) {
    add({
      id: "size",
      label: "Payload size",
      severity: "warn",
      detail: `${payload.length} chars — dense PDF417; raise columns or EC if a scanner struggles`,
    });
  } else {
    add({
      id: "size",
      label: "Payload size",
      severity: "pass",
      detail: `${payload.length} chars, fits a 13-column PDF417 at EC 5`,
    });
  }

  const scanner = extractScanner(parsed);
  if (scanner?.under21 && scanner.expDate && dobIso) {
    add({
      id: "u21",
      label: "Under-21 expiration",
      severity: "warn",
      detail: "Cardholder is under 21 — many states expire the credential on the 21st birthday",
    });
  }

  return summarize(checks, scanner);
}

function summarize(checks: VerifyCheck[], scanner: ScannerExtract | null): VerifyReport {
  return {
    checks,
    passed: checks.filter((c) => c.severity === "pass").length,
    failed: checks.filter((c) => c.severity === "fail").length,
    warnings: checks.filter((c) => c.severity === "warn").length,
    scanner,
  };
}

export function extractScanner(parsed: ParsedDocument): ScannerExtract {
  const v = parsed.aamvaVersion;
  const dob = parsed.elements.DBB ? fromAamvaDate(parsed.elements.DBB, v) : null;
  const issue = parsed.elements.DBD ? fromAamvaDate(parsed.elements.DBD, v) : null;
  const exp = parsed.elements.DBA ? fromAamvaDate(parsed.elements.DBA, v) : null;
  const today = todayIso();
  const age = dob ? ageOn(dob, today) : null;
  const family = parsed.elements.DCS ?? "";
  const first = parsed.elements.DAC ?? "";
  const middle = parsed.elements.DAD && parsed.elements.DAD !== "NONE" ? parsed.elements.DAD : "";
  const j = JURISDICTION_BY_IIN[parsed.iin];
  const street = [parsed.elements.DAG, parsed.elements.DAH].filter(Boolean).join(", ");
  const cityLine = [parsed.elements.DAI, parsed.elements.DAJ, (parsed.elements.DAK ?? "").trim()]
    .filter(Boolean)
    .join(" ");

  return {
    fullName: [first, middle, family].filter(Boolean).join(" "),
    firstName: first,
    familyName: family,
    middleName: middle,
    licenseNumber: parsed.elements.DAQ ?? "",
    documentKind: parsed.subfiles.some((s) => s.type === "ID") ? "ID" : "DL",
    jurisdiction: j ? `${j.code} · ${j.name}` : (parsed.elements.DAJ ?? parsed.iin),
    iin: parsed.iin,
    dob: dob ?? parsed.elements.DBB ?? "",
    issueDate: issue ?? parsed.elements.DBD ?? "",
    expDate: exp ?? parsed.elements.DBA ?? "",
    age,
    under21: age === null ? null : age < 21,
    expired: exp ? exp < today : null,
    sex: sexLabel(parsed.elements.DBC ?? ""),
    height: parsed.elements.DAU ?? "",
    eyes: parsed.elements.DAY ?? "",
    address: [street, cityLine].filter(Boolean).join(", "),
    realId: complianceLabel(parsed.elements.DDA ?? ""),
    organDonor: parsed.elements.DDH === "1",
    veteran: parsed.elements.DDI === "1",
    aamvaVersion: v,
  };
}

function versionName(v: number): string {
  const names: Record<number, string> = {
    1: "2000",
    2: "2003",
    3: "2005",
    4: "2009",
    5: "2010",
    6: "2011",
    7: "2012",
    8: "2013",
    9: "2016",
    10: "2020",
  };
  return names[v] ?? "unknown";
}

export function heightPreview(raw: string): string {
  return formatHeight(raw);
}

export function postalPreview(raw: string): string {
  return formatPostal(raw);
}
