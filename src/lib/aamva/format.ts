export const LF = "\n";
export const RS = "\x1e";
export const CR = "\r";

export const HEADER_PREFIX = `@${LF}${RS}${CR}ANSI `;
export const FIXED_HEADER_LENGTH = HEADER_PREFIX.length + 6 + 2 + 2 + 2; // 21

export const EYE_COLORS = [
  { code: "BLK", label: "Black" },
  { code: "BLU", label: "Blue" },
  { code: "BRO", label: "Brown" },
  { code: "GRY", label: "Gray" },
  { code: "GRN", label: "Green" },
  { code: "HAZ", label: "Hazel" },
  { code: "MAR", label: "Maroon" },
  { code: "PNK", label: "Pink" },
  { code: "DIC", label: "Dichromatic" },
  { code: "UNK", label: "Unknown" },
] as const;

export const HAIR_COLORS = [
  { code: "BAL", label: "Bald" },
  { code: "BLK", label: "Black" },
  { code: "BLN", label: "Blond" },
  { code: "BRO", label: "Brown" },
  { code: "GRY", label: "Gray" },
  { code: "RED", label: "Red / Auburn" },
  { code: "SDY", label: "Sandy" },
  { code: "WHI", label: "White" },
  { code: "UNK", label: "Unknown" },
] as const;

export const MANDATORY_FIELDS = [
  "DCA",
  "DCB",
  "DCD",
  "DBA",
  "DCS",
  "DAC",
  "DAD",
  "DBD",
  "DBB",
  "DBC",
  "DAY",
  "DAU",
  "DAG",
  "DAI",
  "DAJ",
  "DAK",
  "DAQ",
  "DCF",
  "DCG",
  "DDE",
  "DDF",
  "DDG",
] as const;

export const FIELD_LABELS: Record<string, string> = {
  DCA: "Vehicle class",
  DCB: "Restriction codes",
  DCD: "Endorsement codes",
  DBA: "Expiration date",
  DCS: "Family name",
  DAC: "First name",
  DAD: "Middle name",
  DBD: "Issue date",
  DBB: "Date of birth",
  DBC: "Sex",
  DAY: "Eye color",
  DAU: "Height",
  DAG: "Street",
  DAH: "Street 2",
  DAI: "City",
  DAJ: "Jurisdiction",
  DAK: "Postal code",
  DAQ: "Customer ID",
  DCF: "Document discriminator",
  DCG: "Country",
  DDE: "Family name truncation",
  DDF: "First name truncation",
  DDG: "Middle name truncation",
  DCU: "Name suffix",
  DAZ: "Hair color",
  DCK: "Inventory control",
  DDA: "REAL ID compliance",
  DDB: "Card revision date",
  DDC: "HAZMAT expiration",
  DDD: "Limited duration",
  DAW: "Weight (lb)",
  DAX: "Weight (kg)",
  DDH: "Organ donor",
  DDI: "Veteran",
  DCE: "Weight range",
};

export function pad2(n: number): string {
  return String(n).padStart(2, "0");
}

export function pad4(n: number): string {
  return String(n).padStart(4, "0");
}

export function upperName(value: string): string {
  return value.trim().replace(/\s+/g, " ").toUpperCase();
}

export function parseIsoDate(raw: string): { y: string; m: string; d: string } | null {
  const iso = raw.trim();
  const isoMatch = iso.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (isoMatch) return { y: isoMatch[1], m: isoMatch[2], d: isoMatch[3] };

  const digits = iso.replace(/\D/g, "");
  if (digits.length !== 8) return null;

  // ISO-like YYYYMMDD if year looks plausible
  const yFirst = Number.parseInt(digits.slice(0, 4), 10);
  if (yFirst >= 1900 && yFirst <= 2100) {
    return { y: digits.slice(0, 4), m: digits.slice(4, 6), d: digits.slice(6, 8) };
  }
  return { m: digits.slice(0, 2), d: digits.slice(2, 4), y: digits.slice(4, 8) };
}

export function toAamvaDate(raw: string, aamvaVersion: number): string {
  const parts = parseIsoDate(raw);
  if (!parts) return raw.replace(/\D/g, "").slice(0, 8);
  if (aamvaVersion >= 4) return `${parts.m}${parts.d}${parts.y}`;
  return `${parts.y}${parts.m}${parts.d}`;
}

export function fromAamvaDate(raw: string, aamvaVersion: number): string | null {
  const digits = raw.replace(/\D/g, "");
  if (digits.length !== 8) return null;
  if (aamvaVersion >= 4) {
    return `${digits.slice(4, 8)}-${digits.slice(0, 2)}-${digits.slice(2, 4)}`;
  }
  return `${digits.slice(0, 4)}-${digits.slice(4, 6)}-${digits.slice(6, 8)}`;
}

export function formatHeight(raw: string): string {
  const t = raw.trim();
  const already = t.match(/^(\d{1,3})\s*(in|cm)$/i);
  if (already) {
    return `${already[1].padStart(3, "0")} ${already[2].toLowerCase()}`;
  }
  const feet = t.match(/^(\d)\s*['′]\s*(\d{1,2})/);
  if (feet) {
    const inches = Number.parseInt(feet[1], 10) * 12 + Number.parseInt(feet[2], 10);
    return `${String(inches).padStart(3, "0")} in`;
  }
  const hyphen = t.match(/^(\d)\s*-\s*(\d{1,2})$/);
  if (hyphen) {
    const inches = Number.parseInt(hyphen[1], 10) * 12 + Number.parseInt(hyphen[2], 10);
    return `${String(inches).padStart(3, "0")} in`;
  }
  const n = Number.parseInt(t.replace(/[^\d]/g, ""), 10);
  if (Number.isFinite(n) && n >= 36 && n <= 90) {
    return `${String(n).padStart(3, "0")} in`;
  }
  return t || "068 in";
}

export function formatPostal(raw: string): string {
  const digits = raw.replace(/\D/g, "").slice(0, 9);
  if (!digits) return "".padEnd(11, " ");
  const nine = digits.length <= 5 ? digits.padEnd(9, "0") : digits.padEnd(9, "0");
  return nine.padEnd(11, " ");
}

export function sexLabel(code: string): string {
  if (code === "1") return "Male";
  if (code === "2") return "Female";
  return "Not specified";
}

export function complianceLabel(code: string): string {
  if (code === "F") return "Fully compliant (REAL ID)";
  if (code === "N") return "Non-compliant";
  if (code === "M") return "Materially compliant";
  return code || "Unknown";
}

export function visiblePayload(payload: string): string {
  return payload
    .replaceAll(RS, "␞")
    .replaceAll(CR, "␍\n")
    .replaceAll(LF, "␊\n");
}

export function todayIso(): string {
  const d = new Date();
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
}

export function addYearsIso(iso: string, years: number): string {
  const parts = parseIsoDate(iso);
  if (!parts) return iso;
  const y = Number.parseInt(parts.y, 10) + years;
  return `${y}-${parts.m}-${parts.d}`;
}

export function ageOn(dobIso: string, onIso: string): number | null {
  const dob = parseIsoDate(dobIso);
  const on = parseIsoDate(onIso);
  if (!dob || !on) return null;
  let age = Number.parseInt(on.y, 10) - Number.parseInt(dob.y, 10);
  const beforeBirthday =
    on.m < dob.m || (on.m === dob.m && on.d < dob.d);
  if (beforeBirthday) age -= 1;
  return age;
}

export function isValidAamvaDate(raw: string, aamvaVersion: number): boolean {
  const iso = fromAamvaDate(raw, aamvaVersion);
  if (!iso) return false;
  const p = parseIsoDate(iso);
  if (!p) return false;
  const y = Number.parseInt(p.y, 10);
  const m = Number.parseInt(p.m, 10);
  const d = Number.parseInt(p.d, 10);
  if (m < 1 || m > 12 || d < 1 || d > 31 || y < 1900 || y > 2100) return false;
  const dt = new Date(`${p.y}-${p.m}-${p.d}T00:00:00Z`);
  return !Number.isNaN(dt.getTime());
}
