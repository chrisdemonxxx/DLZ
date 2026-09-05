export type Motif =
  | "star"
  | "sun"
  | "tree"
  | "mountain"
  | "wave"
  | "keystone"
  | "fleur"
  | "anchor"
  | "zia"
  | "peach"
  | "pine"
  | "horse"
  | "compass"
  | "bear"
  | "bison"
  | "palmetto"
  | "pelican"
  | "lighthouse"
  | "wheat"
  | "diamond"
  | "cactus"
  | "rose";

export type HeaderStyle = "script" | "serif" | "sans";
export type RealIdStyle = "star-circle" | "star-bear" | "star-map";
export type GhostStyle = "rect" | "rosette";

export type CardTheme = {
  code: string;
  agency: string;
  titleDl: string;
  titleId: string;
  nickname: string;
  header: string;
  headerInk: string;
  accent: string;
  panel: string;
  ground: string;
  ink: string;
  muted: string;
  gold: string;
  motif: Motif;
  generation: string;
  issuedFrom: string;
  displayName: string;
  headerStyle: HeaderStyle;
  realId: RealIdStyle;
  ghost: GhostStyle;
  bg: string;
  expColor: string;
  magStripe: boolean;
};

type Row = {
  agency: string;
  nickname: string;
  header: string;
  accent: string;
  motif: Motif;
  generation: string;
  issuedFrom: string;
  displayName: string;
  bg: string;
  titleDl?: string;
  titleId?: string;
  headerStyle?: HeaderStyle;
  realId?: RealIdStyle;
  ghost?: GhostStyle;
  headerInk?: string;
  ink?: string;
  gold?: string;
  expColor?: string;
  magStripe?: boolean;
};

const BG = {
  redwood: "/card/bg/redwood.jpg",
  hill: "/card/bg/hillcountry.jpg",
  ridge: "/card/bg/blueridge.jpg",
  hudson: "/card/bg/hudson.jpg",
  tropic: "/card/bg/subtropic.jpg",
  palm: "/card/bg/palmetto.jpg",
  key: "/card/bg/keystone.jpg",
  prairie: "/card/bg/prairie.jpg",
  lakes: "/card/bg/lakes.jpg",
  rock: "/card/bg/rockies.jpg",
  desert: "/card/bg/desert.jpg",
  nw: "/card/bg/pacificnw.jpg",
  ne: "/card/bg/newengland.jpg",
  gulf: "/card/bg/gulf.jpg",
  hi: "/card/bg/hawaii.jpg",
  ak: "/card/bg/alaska.jpg",
} as const;

const ROWS: Record<string, Row> = {
  AL: { agency: "STATE OF ALABAMA", displayName: "Alabama", nickname: "Heart of Dixie", header: "#9E1B32", accent: "#9E1B32", motif: "star", generation: "2020 REAL ID", issuedFrom: "2020", bg: BG.gulf, headerStyle: "serif" },
  AK: { agency: "STATE OF ALASKA", displayName: "Alaska", nickname: "The Last Frontier", header: "#0A3161", accent: "#C5A572", motif: "compass", generation: "2018 REAL ID", issuedFrom: "2018", bg: BG.ak, headerStyle: "sans", gold: "#D4B36A" },
  AZ: { agency: "STATE OF ARIZONA", displayName: "Arizona", nickname: "Grand Canyon State", header: "#7A2E0E", accent: "#C45C26", motif: "cactus", generation: "2014 / current", issuedFrom: "2014", bg: BG.desert, headerStyle: "serif" },
  AR: { agency: "STATE OF ARKANSAS", displayName: "Arkansas", nickname: "The Natural State", header: "#9E0B0F", accent: "#1A4480", motif: "diamond", generation: "2018 REAL ID", issuedFrom: "2018", bg: BG.gulf, headerStyle: "serif" },
  CA: { agency: "STATE OF CALIFORNIA", displayName: "CALIFORNIA", nickname: "The Golden State", header: "#1B4D8E", accent: "#C45C12", motif: "bear", generation: "2025 landscape", issuedFrom: "2025-10-01", bg: BG.redwood, titleDl: "DRIVER LICENSE", headerStyle: "sans", realId: "star-bear", gold: "#C9A227", magStripe: false },
  CO: { agency: "STATE OF COLORADO", displayName: "Colorado", nickname: "Centennial State", header: "#1C3D73", accent: "#BF0A30", motif: "sun", generation: "2019 REAL ID", issuedFrom: "2019", bg: BG.rock, headerStyle: "sans" },
  CT: { agency: "STATE OF CONNECTICUT", displayName: "Connecticut", nickname: "Constitution State", header: "#12325A", accent: "#C4A35A", motif: "tree", generation: "2017 REAL ID", issuedFrom: "2017", bg: BG.hudson, headerStyle: "serif" },
  DE: { agency: "STATE OF DELAWARE", displayName: "Delaware", nickname: "The First State", header: "#163A6B", accent: "#C4A35A", motif: "diamond", generation: "2018 REAL ID", issuedFrom: "2018", bg: BG.key, headerStyle: "script" },
  DC: { agency: "DISTRICT OF COLUMBIA", displayName: "Washington, D.C.", nickname: "Federal City", header: "#C8102E", accent: "#1A1A1A", motif: "star", generation: "2013 / current", issuedFrom: "2013", bg: BG.key, headerStyle: "serif" },
  FL: { agency: "STATE OF FLORIDA", displayName: "Florida", nickname: "Sunshine State", header: "#287A3B", accent: "#C9A227", motif: "sun", generation: "2017 secure design", issuedFrom: "2017", bg: BG.tropic, titleDl: "DRIVER LICENSE", headerStyle: "script", gold: "#C9A227" },
  GA: { agency: "STATE OF GEORGIA", displayName: "Georgia", nickname: "Peach State", header: "#BA0C2F", accent: "#F2A900", motif: "peach", generation: "2019 REAL ID", issuedFrom: "2019", bg: BG.palm, headerStyle: "serif" },
  HI: { agency: "STATE OF HAWAII", displayName: "Hawai‘i", nickname: "Aloha State", header: "#1D4E89", accent: "#F5C518", motif: "sun", generation: "2026 redesign", issuedFrom: "2026", bg: BG.hi, headerStyle: "script" },
  ID: { agency: "STATE OF IDAHO", displayName: "Idaho", nickname: "Gem State", header: "#3D5B2F", accent: "#C4A35A", motif: "mountain", generation: "2017 REAL ID", issuedFrom: "2017", bg: BG.rock, headerStyle: "serif" },
  IL: { agency: "STATE OF ILLINOIS", displayName: "Illinois", nickname: "Prairie State", header: "#1E4B8E", accent: "#C8102E", motif: "star", generation: "2016 REAL ID", issuedFrom: "2016", bg: BG.prairie, headerStyle: "serif" },
  IN: { agency: "STATE OF INDIANA", displayName: "Indiana", nickname: "Crossroads of America", header: "#0F3B73", accent: "#C4A35A", motif: "star", generation: "2017 REAL ID", issuedFrom: "2017", bg: BG.prairie, headerStyle: "sans" },
  IA: { agency: "STATE OF IOWA", displayName: "Iowa", nickname: "Hawkeye State", header: "#1A365D", accent: "#C4A35A", motif: "wheat", generation: "2018 REAL ID", issuedFrom: "2018", bg: BG.prairie, headerStyle: "serif" },
  KS: { agency: "STATE OF KANSAS", displayName: "Kansas", nickname: "Sunflower State", header: "#002868", accent: "#E0B01D", motif: "sun", generation: "2017 REAL ID", issuedFrom: "2017", bg: BG.prairie, headerStyle: "serif", gold: "#E0B01D" },
  KY: { agency: "COMMONWEALTH OF KENTUCKY", displayName: "Kentucky", nickname: "Bluegrass State", header: "#183661", accent: "#C4A35A", motif: "horse", generation: "2019 REAL ID", issuedFrom: "2019", bg: BG.ridge, headerStyle: "script" },
  LA: { agency: "STATE OF LOUISIANA", displayName: "Louisiana", nickname: "Pelican State", header: "#3C1E5B", accent: "#F9AD1D", motif: "pelican", generation: "2014 / current", issuedFrom: "2014", bg: BG.gulf, headerStyle: "script", gold: "#F9AD1D" },
  ME: { agency: "STATE OF MAINE", displayName: "Maine", nickname: "Vacationland", header: "#1C3A4F", accent: "#3D6B4F", motif: "pine", generation: "2019 REAL ID", issuedFrom: "2019", bg: BG.ne, headerStyle: "script", realId: "star-map" },
  MD: { agency: "STATE OF MARYLAND", displayName: "Maryland", nickname: "Old Line State", header: "#9A0000", accent: "#F0B429", motif: "diamond", generation: "2016 REAL ID", issuedFrom: "2016", bg: BG.key, headerStyle: "script", gold: "#F0B429" },
  MA: { agency: "COMMONWEALTH OF MASSACHUSETTS", displayName: "Massachusetts", nickname: "The Bay State", header: "#0C2D57", accent: "#C4A35A", motif: "wave", generation: "2018 REAL ID", issuedFrom: "2018", bg: BG.ne, headerStyle: "serif" },
  MI: { agency: "STATE OF MICHIGAN", displayName: "Michigan", nickname: "Great Lakes State", header: "#1A4F6E", accent: "#C4A35A", motif: "wave", generation: "2019 REAL ID", issuedFrom: "2019", bg: BG.lakes, headerStyle: "sans", realId: "star-map" },
  MN: { agency: "STATE OF MINNESOTA", displayName: "Minnesota", nickname: "North Star State", header: "#003865", accent: "#3B7A2F", motif: "star", generation: "2018 REAL ID", issuedFrom: "2018", bg: BG.lakes, headerStyle: "serif" },
  MS: { agency: "STATE OF MISSISSIPPI", displayName: "Mississippi", nickname: "Magnolia State", header: "#7A1F2B", accent: "#C4A35A", motif: "star", generation: "2019 REAL ID", issuedFrom: "2019", bg: BG.gulf, headerStyle: "serif" },
  MO: { agency: "STATE OF MISSOURI", displayName: "Missouri", nickname: "Show-Me State", header: "#1E3A6E", accent: "#C8102E", motif: "star", generation: "2018 REAL ID", issuedFrom: "2018", bg: BG.prairie, headerStyle: "serif" },
  MT: { agency: "STATE OF MONTANA", displayName: "Montana", nickname: "Treasure State", header: "#4A3728", accent: "#C4A35A", motif: "mountain", generation: "2015 REAL ID", issuedFrom: "2015", bg: BG.rock, headerStyle: "serif" },
  NE: { agency: "STATE OF NEBRASKA", displayName: "Nebraska", nickname: "Cornhusker State", header: "#7A1F2B", accent: "#F0B429", motif: "wheat", generation: "2017 REAL ID", issuedFrom: "2017", bg: BG.prairie, headerStyle: "serif" },
  NV: { agency: "STATE OF NEVADA", displayName: "Nevada", nickname: "Battle Born", header: "#2C3E50", accent: "#A8B2BD", motif: "diamond", generation: "2021 Battle Born", issuedFrom: "2021-07", bg: BG.desert, headerStyle: "sans", realId: "star-map", gold: "#C0C6CE" },
  NH: { agency: "STATE OF NEW HAMPSHIRE", displayName: "New Hampshire", nickname: "Live Free or Die", header: "#163A5F", accent: "#C4A35A", motif: "mountain", generation: "2017 REAL ID", issuedFrom: "2017", bg: BG.ne, headerStyle: "serif", realId: "star-map" },
  NJ: { agency: "STATE OF NEW JERSEY", displayName: "New Jersey", nickname: "The Garden State", header: "#2F3B2E", accent: "#C4A35A", motif: "wave", generation: "2020 REAL ID", issuedFrom: "2020", bg: BG.hudson, headerStyle: "serif" },
  NM: { agency: "STATE OF NEW MEXICO", displayName: "New Mexico", nickname: "Land of Enchantment", header: "#8C1D18", accent: "#E6B800", motif: "zia", generation: "2016 REAL ID", issuedFrom: "2016", bg: BG.desert, headerStyle: "serif", gold: "#E6B800" },
  NY: { agency: "STATE OF NEW YORK", displayName: "New York State", nickname: "Excelsior", header: "#1A4F8B", accent: "#1A4F8B", motif: "star", generation: "2022 security redesign", issuedFrom: "2022-03", bg: BG.hudson, titleDl: "DRIVER LICENSE", headerStyle: "serif" },
  NC: { agency: "STATE OF NORTH CAROLINA", displayName: "North Carolina", nickname: "Tar Heel State", header: "#4B0E1E", accent: "#4B0E1E", motif: "star", generation: "2018 REAL ID", issuedFrom: "2018", bg: BG.ridge, headerStyle: "serif" },
  ND: { agency: "STATE OF NORTH DAKOTA", displayName: "North Dakota", nickname: "Peace Garden State", header: "#0F4C3A", accent: "#C4A35A", motif: "wheat", generation: "2014 REAL ID", issuedFrom: "2014", bg: BG.prairie, headerStyle: "serif" },
  OH: { agency: "STATE OF OHIO", displayName: "Ohio", nickname: "The Buckeye State", header: "#8C1D18", accent: "#C4A35A", motif: "star", generation: "2018 REAL ID", issuedFrom: "2018", bg: BG.lakes, headerStyle: "sans" },
  OK: { agency: "STATE OF OKLAHOMA", displayName: "Oklahoma", nickname: "Native America", header: "#00843D", accent: "#C4A35A", motif: "star", generation: "2018 REAL ID", issuedFrom: "2018", bg: BG.hill, headerStyle: "serif" },
  OR: { agency: "STATE OF OREGON", displayName: "Oregon", nickname: "Beaver State", header: "#1F4D3A", accent: "#C4A35A", motif: "tree", generation: "2018 REAL ID", issuedFrom: "2018", bg: BG.nw, headerStyle: "serif" },
  PA: { agency: "COMMONWEALTH OF PENNSYLVANIA", displayName: "Pennsylvania", nickname: "Keystone State", header: "#1A365D", accent: "#C4A35A", motif: "keystone", generation: "2022 redesign", issuedFrom: "2022-09", bg: BG.key, headerStyle: "serif", ghost: "rosette" },
  RI: { agency: "STATE OF RHODE ISLAND", displayName: "Rhode Island", nickname: "Ocean State", header: "#0B3A6E", accent: "#C4A35A", motif: "anchor", generation: "2018 REAL ID", issuedFrom: "2018", bg: BG.ne, headerStyle: "script" },
  SC: { agency: "STATE OF SOUTH CAROLINA", displayName: "South Carolina", nickname: "Palmetto State", header: "#1A4F8B", accent: "#1A4F8B", motif: "palmetto", generation: "2025 palmetto", issuedFrom: "2025-07", bg: BG.palm, titleDl: "DRIVER'S LICENSE", headerStyle: "sans", ghost: "rosette" },
  SD: { agency: "STATE OF SOUTH DAKOTA", displayName: "South Dakota", nickname: "Mount Rushmore State", header: "#1A365D", accent: "#C4A35A", motif: "mountain", generation: "2026 redesign", issuedFrom: "2026", bg: BG.prairie, headerStyle: "serif" },
  TN: { agency: "STATE OF TENNESSEE", displayName: "Tennessee", nickname: "Volunteer State", header: "#1A365D", accent: "#FF8200", motif: "star", generation: "2018 REAL ID", issuedFrom: "2018", bg: BG.ridge, headerStyle: "serif" },
  TX: { agency: "STATE OF TEXAS", displayName: "Texas", nickname: "The Lone Star State", header: "#1A365D", accent: "#BF0A30", motif: "star", generation: "2025 redesign", issuedFrom: "2025-08-18", bg: BG.hill, titleDl: "DRIVER LICENSE", headerStyle: "script", ghost: "rosette" },
  UT: { agency: "STATE OF UTAH", displayName: "Utah", nickname: "Beehive State", header: "#8C1D18", accent: "#C4A35A", motif: "diamond", generation: "2016 REAL ID", issuedFrom: "2016", bg: BG.rock, headerStyle: "sans" },
  VT: { agency: "STATE OF VERMONT", displayName: "Vermont", nickname: "Green Mountain State", header: "#154734", accent: "#C4A35A", motif: "pine", generation: "2016 REAL ID", issuedFrom: "2016", bg: BG.ne, headerStyle: "script" },
  VA: { agency: "COMMONWEALTH OF VIRGINIA", displayName: "Virginia", nickname: "Sic Semper Tyrannis", header: "#2E5A8C", accent: "#2E5A8C", motif: "star", generation: "2023 redesign", issuedFrom: "2023-04-24", bg: BG.ridge, titleDl: "DRIVER'S LICENSE", headerStyle: "script", ghost: "rosette" },
  WA: { agency: "STATE OF WASHINGTON", displayName: "Washington", nickname: "The Evergreen State", header: "#1A5632", accent: "#C4A35A", motif: "tree", generation: "2018 design", issuedFrom: "2018-07", bg: BG.nw, headerStyle: "sans" },
  WV: { agency: "STATE OF WEST VIRGINIA", displayName: "West Virginia", nickname: "Mountain State", header: "#1A365D", accent: "#C4A35A", motif: "mountain", generation: "2017 REAL ID", issuedFrom: "2017", bg: BG.ridge, headerStyle: "serif" },
  WI: { agency: "STATE OF WISCONSIN", displayName: "Wisconsin", nickname: "Badger State", header: "#C5050C", accent: "#C5050C", motif: "star", generation: "2015 REAL ID", issuedFrom: "2015", bg: BG.lakes, headerStyle: "serif" },
  WY: { agency: "STATE OF WYOMING", displayName: "Wyoming", nickname: "Equality State", header: "#4A3728", accent: "#C4A35A", motif: "bison", generation: "2014 REAL ID", issuedFrom: "2014", bg: BG.rock, headerStyle: "serif" },
  PR: { agency: "ESTADO LIBRE ASOCIADO DE PUERTO RICO", displayName: "Puerto Rico", nickname: "Isla del Encanto", header: "#004B87", accent: "#C8102E", motif: "star", generation: "2015 / current", issuedFrom: "2015", bg: BG.tropic, titleDl: "LICENCIA DE CONDUCIR", headerStyle: "sans" },
  GU: { agency: "TERRITORY OF GUAM", displayName: "Guam", nickname: "Tano y Tasi", header: "#002868", accent: "#BF0A30", motif: "star", generation: "2018 REAL ID", issuedFrom: "2018", bg: BG.tropic, headerStyle: "sans" },
  VI: { agency: "U.S. VIRGIN ISLANDS", displayName: "U.S. Virgin Islands", nickname: "America's Caribbean", header: "#0B3A6E", accent: "#C4A35A", motif: "wave", generation: "2017 REAL ID", issuedFrom: "2017", bg: BG.tropic, headerStyle: "serif" },
  AS: { agency: "AMERICAN SAMOA", displayName: "American Samoa", nickname: "Motu o Fiafiaga", header: "#0A3161", accent: "#C4A35A", motif: "compass", generation: "2024 REAL ID", issuedFrom: "2024", bg: BG.hi, headerStyle: "sans" },
  MP: { agency: "NORTHERN MARIANA ISLANDS", displayName: "Northern Mariana Islands", nickname: "Håfa Adai", header: "#0B3A6E", accent: "#C4A35A", motif: "star", generation: "2020 REAL ID", issuedFrom: "2020", bg: BG.hi, headerStyle: "sans" },
};

function theme(code: string, p: Row): CardTheme {
  return {
    code,
    agency: p.agency,
    titleDl: p.titleDl ?? "DRIVER LICENSE",
    titleId: p.titleId ?? "IDENTIFICATION CARD",
    nickname: p.nickname,
    header: p.header,
    headerInk: p.headerInk ?? p.header,
    accent: p.accent,
    panel: "#F4F1EA",
    ground: "#F4F1EA",
    ink: p.ink ?? "#16181C",
    muted: "#5A616A",
    gold: p.gold ?? "#C4A35A",
    motif: p.motif,
    generation: p.generation,
    issuedFrom: p.issuedFrom,
    displayName: p.displayName,
    headerStyle: p.headerStyle ?? "sans",
    realId: p.realId ?? "star-circle",
    ghost: p.ghost ?? "rect",
    bg: p.bg,
    expColor: p.expColor ?? "#B42318",
    magStripe: p.magStripe ?? true,
  };
}

export const CARD_THEMES: Record<string, CardTheme> = Object.fromEntries(
  Object.entries(ROWS).map(([code, row]) => [code, theme(code, row)]),
);

export function themeFor(code: string): CardTheme {
  return (
    CARD_THEMES[code] ??
    theme(code, {
      agency: `STATE OF ${code}`,
      nickname: "United States",
      header: "#1A365D",
      accent: "#C4A35A",
      motif: "star",
      generation: "AAMVA CDS",
      issuedFrom: "2020",
      displayName: code,
      bg: BG.prairie,
    })
  );
}
