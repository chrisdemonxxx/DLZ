import { FIELD_LABELS, FIXED_HEADER_LENGTH, HEADER_PREFIX, LF, CR, formatHeight, formatPostal, pad2, pad4, toAamvaDate, upperName } from "./format.ts";
import { JURISDICTION_BY_CODE, jurisdictionSubfileType, sampleLicenseNumber } from "./jurisdictions.ts";
import type { EncodedDocument, EncodedElement, EncodedSubfile, LicenseForm } from "./types.ts";

export function buildDlElements(form: LicenseForm): EncodedElement[] {
  const j = JURISDICTION_BY_CODE[form.jurisdictionCode];
  const version = form.aamvaVersion;
  const none = (value: string, fallback = "NONE") => {
    const t = value.trim();
    return t.length ? t.toUpperCase() : fallback;
  };

  const elements: EncodedElement[] = [
    { id: "DCA", value: none(form.vehicleClass || j?.operatorClass || "D") },
    { id: "DCB", value: none(form.restrictions) },
    { id: "DCD", value: none(form.endorsements) },
    { id: "DBA", value: toAamvaDate(form.expDate, version) },
    { id: "DCS", value: upperName(form.familyName) },
    { id: "DAC", value: upperName(form.firstName) },
    { id: "DAD", value: none(form.middleName) },
    { id: "DBD", value: toAamvaDate(form.issueDate, version) },
    { id: "DBB", value: toAamvaDate(form.dob, version) },
    { id: "DBC", value: form.sex },
    { id: "DAY", value: (form.eyes || "BRO").toUpperCase() },
    { id: "DAU", value: formatHeight(form.height) },
    { id: "DAG", value: upperName(form.street) },
  ];

  if (form.street2.trim()) {
    elements.push({ id: "DAH", value: upperName(form.street2) });
  }

  elements.push(
    { id: "DAI", value: upperName(form.city) },
    { id: "DAJ", value: form.jurisdictionCode },
    { id: "DAK", value: formatPostal(form.postal) },
    { id: "DAQ", value: form.licenseNumber.trim().toUpperCase() },
    { id: "DCF", value: form.discriminator.trim().toUpperCase() },
    { id: "DCG", value: "USA" },
    { id: "DDE", value: form.familyTrunc },
    { id: "DDF", value: form.firstTrunc },
    { id: "DDG", value: form.middleTrunc },
  );

  if (form.suffix.trim()) {
    elements.push({ id: "DCU", value: upperName(form.suffix) });
  }
  if (form.hair.trim()) {
    elements.push({ id: "DAZ", value: form.hair.toUpperCase() });
  }
  if (form.inventory.trim()) {
    elements.push({ id: "DCK", value: form.inventory.trim().toUpperCase() });
  }
  elements.push({ id: "DDA", value: form.compliance });
  if (form.cardRevision.trim()) {
    elements.push({ id: "DDB", value: toAamvaDate(form.cardRevision, version) });
  }
  elements.push({ id: "DDD", value: form.limitedDuration ? "1" : "0" });
  if (form.weightLbs.trim()) {
    const lbs = form.weightLbs.replace(/\D/g, "");
    if (lbs) elements.push({ id: "DAW", value: lbs.padStart(3, "0") });
  }
  if (form.organDonor) elements.push({ id: "DDH", value: "1" });
  if (form.veteran) elements.push({ id: "DDI", value: "1" });

  return elements;
}

function packSubfile(type: string, elements: EncodedElement[]): string {
  return (
    type +
    elements
      .map((el, i) => `${el.id}${el.value}${i === elements.length - 1 ? CR : LF}`)
      .join("")
  );
}

export function encodeAamva(form: LicenseForm): EncodedDocument {
  const j = JURISDICTION_BY_CODE[form.jurisdictionCode];
  if (!j) throw new Error(`Unknown jurisdiction ${form.jurisdictionCode}`);

  const fileType = form.documentKind === "ID" ? "ID" : "DL";
  const dlElements = buildDlElements(form);
  const bodies: { type: string; body: string; elements: EncodedElement[] }[] = [
    { type: fileType, body: packSubfile(fileType, dlElements), elements: dlElements },
  ];

  if (form.includeJurisdictionSubfile) {
    const zType = jurisdictionSubfileType(j.code);
    const zId = `Z${j.code}`;
    const zElements: EncodedElement[] = [
      { id: zId, value: `SPECIMEN-ANNEXD-${j.code}-${j.iin}` },
    ];
    bodies.push({ type: zType, body: packSubfile(zType, zElements), elements: zElements });
  }

  const n = bodies.length;
  let offset = FIXED_HEADER_LENGTH + 10 * n;
  const subfiles: EncodedSubfile[] = bodies.map((b) => {
    const sf: EncodedSubfile = {
      type: b.type,
      offset,
      length: b.body.length,
      body: b.body,
      elements: b.elements,
    };
    offset += b.body.length;
    return sf;
  });

  const designators = subfiles
    .map((sf) => `${sf.type}${pad4(sf.offset)}${pad4(sf.length)}`)
    .join("");

  const header =
    HEADER_PREFIX +
    j.iin +
    pad2(form.aamvaVersion) +
    pad2(form.jurisdictionVersion) +
    pad2(n) +
    designators;

  const payload = header + subfiles.map((sf) => sf.body).join("");

  return {
    payload,
    iin: j.iin,
    aamvaVersion: form.aamvaVersion,
    jurisdictionVersion: form.jurisdictionVersion,
    fileType: "ANSI",
    subfiles,
  };
}

export function describeElement(id: string, value: string): string {
  return `${id}  ${FIELD_LABELS[id] ?? "Field"}  ${value}`;
}

export function defaultDiscriminator(code: string, iin: string): string {
  return `ANNEXD${iin}${code}SPEC01`;
}

export { sampleLicenseNumber };
