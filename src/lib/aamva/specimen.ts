import { defaultDiscriminator } from "./encode.ts";
import { addYearsIso } from "./format.ts";
import { JURISDICTION_BY_CODE, sampleLicenseNumber } from "./jurisdictions.ts";
import type { LicenseForm } from "./types.ts";

export const SPECIMEN_NAME = {
  familyName: "SAMPLE",
  firstName: "MICHAEL",
  middleName: "JOHN",
} as const;

const STREETS: Record<string, string> = {
  AL: "301 SOUTH RIPLEY STREET",
  AK: "1300 WEST BENSON BOULEVARD",
  AZ: "400 WEST CONGRESS STREET",
  AR: "1900 WEST 7TH STREET",
  CA: "2415 1ST AVENUE",
  CO: "1881 PIERCE STREET",
  CT: "60 STATE STREET",
  DE: "303 TRANSPORTATION CIRCLE",
  DC: "95 M STREET SW",
  FL: "2900 APALACHEE PARKWAY",
  GA: "2206 EAST VIEW PARKWAY",
  HI: "1000 BISHOP STREET",
  ID: "3311 WEST STATE STREET",
  IL: "2701 SOUTH DIRKSEN PARKWAY",
  IN: "100 NORTH SENATE AVENUE",
  IA: "6310 SE CONVENIENCE BOULEVARD",
  KS: "915 SW HARRISON STREET",
  KY: "200 MERO STREET",
  LA: "7979 INDEPENDENCE BOULEVARD",
  ME: "101 HOSPITAL STREET",
  MD: "6601 RITCHIE HIGHWAY",
  MA: "25 NEW CHARDON STREET",
  MI: "7064 CROWER DRIVE",
  MN: "445 MINNESOTA STREET",
  MS: "1900 EAST WOODROW WILSON AVENUE",
  MO: "301 WEST HIGH STREET",
  MT: "302 NORTH ROBERTS",
  NE: "301 CENTENNIAL MALL SOUTH",
  NV: "555 WRIGHT WAY",
  NH: "23 HAZEN DRIVE",
  NJ: "140 EAST FRONT STREET",
  NM: "2542 CERRILLOS ROAD",
  NY: "6 EMPIRE STATE PLAZA",
  NC: "1100 NEW BERN AVENUE",
  ND: "608 EAST BOULEVARD AVENUE",
  OH: "1970 WEST BROAD STREET",
  OK: "2401 NW 23RD STREET",
  OR: "1905 LANA AVENUE NE",
  PA: "1101 SOUTH FRONT STREET",
  RI: "600 NEW LONDON AVENUE",
  SC: "10311 WILSON BOULEVARD",
  SD: "118 WEST CAPITOL AVENUE",
  TN: "44 VANTAGE WAY",
  TX: "5805 NORTH LAMAR BOULEVARD",
  UT: "4501 SOUTH 2700 WEST",
  VT: "120 STATE STREET",
  VA: "2300 WEST BROAD STREET",
  WA: "410 15TH AVENUE SW",
  WV: "5707 MACCORKLE AVENUE SE",
  WI: "4802 SHEBOYGAN AVENUE",
  WY: "5300 BISHOP BOULEVARD",
  PR: "100 AVE. DE DIEGO",
  GU: "542 NORTH MARINE CORPS DRIVE",
  VI: "81 KRONPRINDSENS GADE",
  AS: "PAGO PAGO HIGHWAY",
  MP: "BEACH ROAD",
};

export function specimenStreet(code: string): string {
  return STREETS[code] ?? "100 CAPITOL STREET";
}

export function createSpecimen(code = "VA"): LicenseForm {
  const j = JURISDICTION_BY_CODE[code] ?? JURISDICTION_BY_CODE.VA;
  const dob = "1986-06-06";
  const issue = "2024-06-06";
  return {
    documentKind: "DL",
    jurisdictionCode: j.code,
    aamvaVersion: 10,
    jurisdictionVersion: j.jurisdictionVersion,
    familyName: SPECIMEN_NAME.familyName,
    firstName: SPECIMEN_NAME.firstName,
    middleName: SPECIMEN_NAME.middleName,
    suffix: "",
    dob,
    sex: "1",
    street: specimenStreet(j.code),
    street2: "",
    city: j.city,
    postal: j.zip,
    licenseNumber: sampleLicenseNumber(j, SPECIMEN_NAME.familyName),
    vehicleClass: j.operatorClass,
    restrictions: "NONE",
    endorsements: "NONE",
    issueDate: issue,
    expDate: addYearsIso(issue, 8),
    discriminator: defaultDiscriminator(j.code, j.iin),
    inventory: `INV${j.iin}0001`,
    height: "068 in",
    eyes: "BRO",
    hair: "BRO",
    weightLbs: "180",
    compliance: "F",
    limitedDuration: false,
    organDonor: true,
    veteran: false,
    cardRevision: issue,
    familyTrunc: "N",
    firstTrunc: "N",
    middleTrunc: "N",
    includeJurisdictionSubfile: true,
    pdf417Columns: 13,
    pdf417EcLevel: 5,
    compactPdf417: false,
  };
}

export function applyJurisdiction(form: LicenseForm, code: string): LicenseForm {
  const j = JURISDICTION_BY_CODE[code];
  if (!j) return form;
  const streetStillDefault = Object.values(STREETS).includes(form.street) || form.street === "100 CAPITOL STREET";
  return {
    ...form,
    jurisdictionCode: j.code,
    jurisdictionVersion: j.jurisdictionVersion,
    city: j.city,
    postal: j.zip,
    street: streetStillDefault ? specimenStreet(j.code) : form.street,
    licenseNumber: sampleLicenseNumber(j, form.familyName || SPECIMEN_NAME.familyName),
    vehicleClass: form.documentKind === "ID" ? "NONE" : j.operatorClass,
    discriminator: defaultDiscriminator(j.code, j.iin),
    inventory: `INV${j.iin}0001`,
  };
}
