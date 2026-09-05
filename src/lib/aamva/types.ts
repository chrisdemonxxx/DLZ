export type DocumentKind = "DL" | "ID";

export type SexCode = "1" | "2" | "9";

export type Truncation = "N" | "T" | "U";

export type ComplianceType = "F" | "N" | "M";

export type ZipRange = readonly [number, number];

export type Jurisdiction = {
  code: string;
  name: string;
  iin: string;
  city: string;
  zip: string;
  operatorClass: string;
  licensePattern: string;
  /** `$` is replaced with the family-name initial. */
  licenseSample: string;
  zipRanges: ZipRange[];
  jurisdictionVersion: number;
};

export type LicenseForm = {
  documentKind: DocumentKind;
  jurisdictionCode: string;
  aamvaVersion: number;
  jurisdictionVersion: number;
  familyName: string;
  firstName: string;
  middleName: string;
  suffix: string;
  dob: string;
  sex: SexCode;
  street: string;
  street2: string;
  city: string;
  postal: string;
  licenseNumber: string;
  vehicleClass: string;
  restrictions: string;
  endorsements: string;
  issueDate: string;
  expDate: string;
  discriminator: string;
  inventory: string;
  height: string;
  eyes: string;
  hair: string;
  weightLbs: string;
  compliance: ComplianceType;
  limitedDuration: boolean;
  organDonor: boolean;
  veteran: boolean;
  cardRevision: string;
  familyTrunc: Truncation;
  firstTrunc: Truncation;
  middleTrunc: Truncation;
  includeJurisdictionSubfile: boolean;
  pdf417Columns: number;
  pdf417EcLevel: number;
  compactPdf417: boolean;
};

export type EncodedElement = {
  id: string;
  value: string;
};

export type EncodedSubfile = {
  type: string;
  offset: number;
  length: number;
  body: string;
  elements: EncodedElement[];
};

export type EncodedDocument = {
  payload: string;
  iin: string;
  aamvaVersion: number;
  jurisdictionVersion: number;
  fileType: "ANSI";
  subfiles: EncodedSubfile[];
};

export type ParsedDocument = {
  payload: string;
  iin: string;
  aamvaVersion: number;
  jurisdictionVersion: number;
  entryCount: number;
  subfiles: EncodedSubfile[];
  elements: Record<string, string>;
};

export type CheckSeverity = "pass" | "fail" | "warn";

export type VerifyCheck = {
  id: string;
  label: string;
  severity: CheckSeverity;
  detail: string;
};

export type VerifyReport = {
  checks: VerifyCheck[];
  passed: number;
  failed: number;
  warnings: number;
  scanner: ScannerExtract | null;
};

export type ScannerExtract = {
  fullName: string;
  firstName: string;
  familyName: string;
  middleName: string;
  licenseNumber: string;
  documentKind: string;
  jurisdiction: string;
  iin: string;
  dob: string;
  issueDate: string;
  expDate: string;
  age: number | null;
  under21: boolean | null;
  expired: boolean | null;
  sex: string;
  height: string;
  eyes: string;
  address: string;
  realId: string;
  organDonor: boolean;
  veteran: boolean;
  aamvaVersion: number;
};
