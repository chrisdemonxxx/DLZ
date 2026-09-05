import type { Jurisdiction, ZipRange } from "./types.ts";

type Row = [
  code: string,
  name: string,
  iin: string,
  city: string,
  zip: string,
  operatorClass: string,
  licensePattern: string,
  licenseSample: string,
  zipRanges: ZipRange[],
  jurisdictionVersion?: number,
];

const ROWS: Row[] = [
  ["AL", "Alabama", "636033", "MONTGOMERY", "36104", "D", "^\\d{7,8}$", "1234567", [[350, 369]]],
  ["AK", "Alaska", "636059", "JUNEAU", "99801", "D", "^\\d{1,7}$", "1234567", [[995, 999]]],
  ["AZ", "Arizona", "636026", "PHOENIX", "85001", "D", "^[A-Z]\\d{8}$|^\\d{9}$", "$12345678", [[850, 865]]],
  ["AR", "Arkansas", "636021", "LITTLE ROCK", "72201", "D", "^\\d{8,9}$", "12345678", [[716, 729]]],
  ["CA", "California", "636014", "SACRAMENTO", "95814", "C", "^[A-Z]\\d{7}$", "$1234567", [[900, 961]]],
  ["CO", "Colorado", "636020", "DENVER", "80202", "C", "^\\d{9}$", "123456789", [[800, 816]]],
  ["CT", "Connecticut", "636006", "HARTFORD", "06103", "D", "^\\d{9}$", "123456789", [[60, 69]]],
  ["DE", "Delaware", "636011", "DOVER", "19901", "D", "^\\d{1,7}$", "1234567", [[197, 199]]],
  ["DC", "District of Columbia", "636043", "WASHINGTON", "20001", "D", "^\\d{7}$", "1234567", [[200, 205], [569, 569]]],
  ["FL", "Florida", "636010", "TALLAHASSEE", "32301", "E", "^[A-Z]\\d{12}$", "$123456789012", [[320, 349]]],
  ["GA", "Georgia", "636055", "ATLANTA", "30303", "C", "^\\d{7,9}$", "123456789", [[300, 319], [398, 399]]],
  ["HI", "Hawaii", "636047", "HONOLULU", "96813", "3", "^H\\d{8}$|^\\d{9}$", "H12345678", [[967, 968]]],
  ["ID", "Idaho", "636050", "BOISE", "83702", "D", "^[A-Z]{2}\\d{6}[A-Z]$|^\\d{9}$", "AB123456C", [[832, 838]]],
  ["IL", "Illinois", "636035", "SPRINGFIELD", "62701", "D", "^[A-Z]\\d{11,12}$", "$12345678901", [[600, 629]]],
  ["IN", "Indiana", "636037", "INDIANAPOLIS", "46204", "D", "^\\d{10}$", "1234567890", [[460, 479]]],
  ["IA", "Iowa", "636018", "DES MOINES", "50309", "C", "^\\d{3}[A-Z]{2}\\d{4}$|^\\d{9}$", "123AB4567", [[500, 528]]],
  ["KS", "Kansas", "636022", "TOPEKA", "66603", "C", "^K\\d{8}$|^\\d{9}$", "K12345678", [[660, 679]]],
  ["KY", "Kentucky", "636046", "FRANKFORT", "40601", "D", "^[A-Z]\\d{8}$|^\\d{9}$", "$12345678", [[400, 427]]],
  ["LA", "Louisiana", "636007", "BATON ROUGE", "70801", "E", "^\\d{1,9}$", "012345678", [[700, 714]]],
  ["ME", "Maine", "636041", "AUGUSTA", "04330", "C", "^\\d{7}$", "1234567", [[39, 49]]],
  ["MD", "Maryland", "636003", "ANNAPOLIS", "21401", "C", "^[A-Z]\\d{12}$", "$123456789012", [[206, 219]]],
  ["MA", "Massachusetts", "636002", "BOSTON", "02108", "D", "^[A-Z]\\d{8}$|^SA\\d{7}$", "$12345678", [[10, 27], [55, 55]]],
  ["MI", "Michigan", "636032", "LANSING", "48933", "OP", "^[A-Z]\\d{12}$", "$123456789012", [[480, 499]]],
  ["MN", "Minnesota", "636038", "SAINT PAUL", "55101", "D", "^[A-Z]\\d{12}$", "$123456789012", [[550, 567]]],
  ["MS", "Mississippi", "636051", "JACKSON", "39201", "R", "^\\d{9}$", "123456789", [[386, 397]]],
  ["MO", "Missouri", "636030", "JEFFERSON CITY", "65101", "F", "^[A-Z]\\d{5,9}$|^\\d{9}$", "$12345678", [[630, 658]]],
  ["MT", "Montana", "636008", "HELENA", "59601", "D", "^\\d{9,13}$|^[A-Z]\\d{8}$", "123456789", [[590, 599]]],
  ["NE", "Nebraska", "636054", "LINCOLN", "68508", "O", "^[A-Z]\\d{3,8}$|^H\\d{8}$", "H12345678", [[680, 693]]],
  ["NV", "Nevada", "636049", "CARSON CITY", "89701", "C", "^\\d{10,12}$|^X\\d{8}$", "1234567890", [[889, 898]]],
  ["NH", "New Hampshire", "636039", "CONCORD", "03301", "D", "^\\d{2}[A-Z]{3}\\d{5}$", "01ABC23456", [[30, 38]]],
  ["NJ", "New Jersey", "636036", "TRENTON", "08608", "D", "^[A-Z]\\d{14}$", "$12345678901234", [[70, 89]]],
  ["NM", "New Mexico", "636009", "SANTA FE", "87501", "D", "^\\d{8,9}$", "12345678", [[870, 884]]],
  ["NY", "New York", "636001", "ALBANY", "12207", "D", "^\\d{9}$", "123456789", [[100, 149], [5, 5]]],
  ["NC", "North Carolina", "636004", "RALEIGH", "27601", "C", "^\\d{1,12}$", "123456789012", [[270, 289]]],
  ["ND", "North Dakota", "636034", "BISMARCK", "58501", "D", "^[A-Z]{3}\\d{6}$", "ABC123456", [[580, 588]]],
  ["OH", "Ohio", "636023", "COLUMBUS", "43215", "D", "^[A-Z]{2}\\d{6}$", "AB123456", [[430, 458]]],
  ["OK", "Oklahoma", "636058", "OKLAHOMA CITY", "73102", "D", "^[A-Z]\\d{9}$", "$123456789", [[730, 749]]],
  ["OR", "Oregon", "636029", "SALEM", "97301", "C", "^[A-Z0-9]{1,9}$", "1234567", [[970, 979]]],
  ["PA", "Pennsylvania", "636025", "HARRISBURG", "17101", "C", "^\\d{8}$", "12345678", [[150, 196]]],
  ["RI", "Rhode Island", "636052", "PROVIDENCE", "02903", "10", "^\\d{7}$|^V\\d{6}$", "1234567", [[28, 29]]],
  ["SC", "South Carolina", "636005", "COLUMBIA", "29201", "D", "^\\d{5,11}$", "123456789", [[290, 299]]],
  ["SD", "South Dakota", "636042", "PIERRE", "57501", "D", "^\\d{6,10}$", "12345678", [[570, 577]]],
  ["TN", "Tennessee", "636053", "NASHVILLE", "37219", "D", "^\\d{7,9}$", "123456789", [[370, 385]]],
  ["TX", "Texas", "636015", "AUSTIN", "78701", "C", "^\\d{8}$", "12345678", [[750, 799], [885, 885]]],
  ["UT", "Utah", "636040", "SALT LAKE CITY", "84111", "D", "^\\d{4,10}$", "123456789", [[840, 847]]],
  ["VT", "Vermont", "636024", "MONTPELIER", "05602", "D", "^\\d{8}$|^\\d{7}A$", "12345678", [[50, 59]]],
  ["VA", "Virginia", "636000", "RICHMOND", "23219", "D", "^[A-Z]\\d{8}$", "T16700285", [[201, 201], [220, 246]], 2],
  ["WA", "Washington", "636045", "OLYMPIA", "98501", "C", "^[A-Z0-9*]{7,12}$", "WDL123456789", [[980, 994]]],
  ["WV", "West Virginia", "636061", "CHARLESTON", "25301", "E", "^[A-Z0-9]{7}$", "A123456", [[247, 268]]],
  ["WI", "Wisconsin", "636031", "MADISON", "53703", "D", "^[A-Z]\\d{13}$", "$1234567890123", [[530, 549]]],
  ["WY", "Wyoming", "636060", "CHEYENNE", "82001", "C", "^\\d{9}$", "123456789", [[820, 831]]],
  ["PR", "Puerto Rico", "604431", "SAN JUAN", "00901", "3", "^\\d{7,9}$", "12345678", [[6, 9]]],
  ["GU", "Guam", "636019", "HAGATNA", "96910", "D", "^[A-Z0-9]{5,10}$", "1234567", [[969, 969]]],
  ["VI", "Virgin Islands", "636062", "CHARLOTTE AMALIE", "00802", "D", "^[A-Z0-9]{6,10}$", "1234567", [[8, 8]]],
  ["AS", "American Samoa", "604427", "PAGO PAGO", "96799", "D", "^[A-Z0-9]{4,10}$", "1234567", [[967, 967]]],
  ["MP", "Northern Mariana Islands", "604430", "SAIPAN", "96950", "D", "^[A-Z0-9]{4,10}$", "1234567", [[969, 969]]],
];

export const JURISDICTIONS: Jurisdiction[] = ROWS.map((row) => ({
  code: row[0],
  name: row[1],
  iin: row[2],
  city: row[3],
  zip: row[4],
  operatorClass: row[5],
  licensePattern: row[6],
  licenseSample: row[7],
  zipRanges: row[8],
  jurisdictionVersion: row[9] ?? 0,
}));

export const JURISDICTION_BY_CODE: Record<string, Jurisdiction> = Object.fromEntries(
  JURISDICTIONS.map((j) => [j.code, j]),
);

export const IIN_BY_CODE: Record<string, string> = Object.fromEntries(
  JURISDICTIONS.map((j) => [j.code, j.iin]),
);

export const JURISDICTION_BY_IIN: Record<string, Jurisdiction> = Object.fromEntries(
  JURISDICTIONS.map((j) => [j.iin, j]),
);

export function jurisdictionSubfileType(code: string): string {
  return `Z${code.charAt(0)}`;
}

export function sampleLicenseNumber(j: Jurisdiction, familyName: string): string {
  const initial = (familyName.replace(/[^A-Za-z]/g, "").charAt(0) || "S").toUpperCase();
  return j.licenseSample.replace(/\$/g, initial);
}

export function zipMatchesJurisdiction(j: Jurisdiction, postal: string): boolean {
  const digits = postal.replace(/\D/g, "");
  if (digits.length < 3) return false;
  const prefix = Number.parseInt(digits.slice(0, 3), 10);
  return j.zipRanges.some(([lo, hi]) => prefix >= lo && prefix <= hi);
}
