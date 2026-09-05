import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { c as require_jsx_runtime, n as Slot } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { a as QrCode, c as FlipHorizontal, d as Copy, f as ChevronsUpDown, h as Camera, i as RotateCcw, l as Eraser, m as Check, o as Printer, p as ChevronDown, r as Search, s as PenLine, t as Upload, u as Download } from "../_libs/lucide-react.mjs";
import { i as Trigger, n as Portal, r as Root2, t as Content2 } from "../_libs/@radix-ui/react-popover+[...].mjs";
import { a as SelectItemIndicator, c as SelectTrigger$1, i as SelectItem$1, l as SelectValue$1, n as SelectContent$1, o as SelectItemText, r as SelectIcon, s as SelectPortal, t as Select$1, u as SelectViewport } from "../_libs/@radix-ui/react-select+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { t as create } from "../_libs/zustand.mjs";
import { t as _e } from "../_libs/cmdk.mjs";
import { t as Root } from "../_libs/radix-ui__react-label.mjs";
import { n as SwitchThumb, t as Switch$1 } from "../_libs/radix-ui__react-switch.mjs";
import { i as Trigger$1, n as List, r as Root2$1, t as Content } from "../_libs/radix-ui__react-tabs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-CDgWFyof.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var HEADER_PREFIX = `@
\rANSI `;
var FIXED_HEADER_LENGTH = HEADER_PREFIX.length + 6 + 2 + 2 + 2;
var EYE_COLORS = [
	{
		code: "BLK",
		label: "Black"
	},
	{
		code: "BLU",
		label: "Blue"
	},
	{
		code: "BRO",
		label: "Brown"
	},
	{
		code: "GRY",
		label: "Gray"
	},
	{
		code: "GRN",
		label: "Green"
	},
	{
		code: "HAZ",
		label: "Hazel"
	},
	{
		code: "MAR",
		label: "Maroon"
	},
	{
		code: "PNK",
		label: "Pink"
	},
	{
		code: "DIC",
		label: "Dichromatic"
	},
	{
		code: "UNK",
		label: "Unknown"
	}
];
var HAIR_COLORS = [
	{
		code: "BAL",
		label: "Bald"
	},
	{
		code: "BLK",
		label: "Black"
	},
	{
		code: "BLN",
		label: "Blond"
	},
	{
		code: "BRO",
		label: "Brown"
	},
	{
		code: "GRY",
		label: "Gray"
	},
	{
		code: "RED",
		label: "Red / Auburn"
	},
	{
		code: "SDY",
		label: "Sandy"
	},
	{
		code: "WHI",
		label: "White"
	},
	{
		code: "UNK",
		label: "Unknown"
	}
];
var MANDATORY_FIELDS = [
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
	"DDG"
];
function pad2(n) {
	return String(n).padStart(2, "0");
}
function pad4(n) {
	return String(n).padStart(4, "0");
}
function upperName(value) {
	return value.trim().replace(/\s+/g, " ").toUpperCase();
}
function parseIsoDate(raw) {
	const iso = raw.trim();
	const isoMatch = iso.match(/^(\d{4})-(\d{2})-(\d{2})$/);
	if (isoMatch) return {
		y: isoMatch[1],
		m: isoMatch[2],
		d: isoMatch[3]
	};
	const digits = iso.replace(/\D/g, "");
	if (digits.length !== 8) return null;
	const yFirst = Number.parseInt(digits.slice(0, 4), 10);
	if (yFirst >= 1900 && yFirst <= 2100) return {
		y: digits.slice(0, 4),
		m: digits.slice(4, 6),
		d: digits.slice(6, 8)
	};
	return {
		m: digits.slice(0, 2),
		d: digits.slice(2, 4),
		y: digits.slice(4, 8)
	};
}
function toAamvaDate(raw, aamvaVersion) {
	const parts = parseIsoDate(raw);
	if (!parts) return raw.replace(/\D/g, "").slice(0, 8);
	if (aamvaVersion >= 4) return `${parts.m}${parts.d}${parts.y}`;
	return `${parts.y}${parts.m}${parts.d}`;
}
function fromAamvaDate(raw, aamvaVersion) {
	const digits = raw.replace(/\D/g, "");
	if (digits.length !== 8) return null;
	if (aamvaVersion >= 4) return `${digits.slice(4, 8)}-${digits.slice(0, 2)}-${digits.slice(2, 4)}`;
	return `${digits.slice(0, 4)}-${digits.slice(4, 6)}-${digits.slice(6, 8)}`;
}
function formatHeight(raw) {
	const t = raw.trim();
	const already = t.match(/^(\d{1,3})\s*(in|cm)$/i);
	if (already) return `${already[1].padStart(3, "0")} ${already[2].toLowerCase()}`;
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
	if (Number.isFinite(n) && n >= 36 && n <= 90) return `${String(n).padStart(3, "0")} in`;
	return t || "068 in";
}
function formatPostal(raw) {
	const digits = raw.replace(/\D/g, "").slice(0, 9);
	if (!digits) return "".padEnd(11, " ");
	return (digits.length <= 5 ? digits.padEnd(9, "0") : digits.padEnd(9, "0")).padEnd(11, " ");
}
function sexLabel(code) {
	if (code === "1") return "Male";
	if (code === "2") return "Female";
	return "Not specified";
}
function complianceLabel(code) {
	if (code === "F") return "Fully compliant (REAL ID)";
	if (code === "N") return "Non-compliant";
	if (code === "M") return "Materially compliant";
	return code || "Unknown";
}
function visiblePayload(payload) {
	return payload.replaceAll("", "␞").replaceAll("\r", "␍\n").replaceAll("\n", "␊\n");
}
function todayIso() {
	const d = /* @__PURE__ */ new Date();
	return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
}
function addYearsIso(iso, years) {
	const parts = parseIsoDate(iso);
	if (!parts) return iso;
	return `${Number.parseInt(parts.y, 10) + years}-${parts.m}-${parts.d}`;
}
function ageOn(dobIso, onIso) {
	const dob = parseIsoDate(dobIso);
	const on = parseIsoDate(onIso);
	if (!dob || !on) return null;
	let age = Number.parseInt(on.y, 10) - Number.parseInt(dob.y, 10);
	if (on.m < dob.m || on.m === dob.m && on.d < dob.d) age -= 1;
	return age;
}
function isValidAamvaDate(raw, aamvaVersion) {
	const iso = fromAamvaDate(raw, aamvaVersion);
	if (!iso) return false;
	const p = parseIsoDate(iso);
	if (!p) return false;
	const y = Number.parseInt(p.y, 10);
	const m = Number.parseInt(p.m, 10);
	const d = Number.parseInt(p.d, 10);
	if (m < 1 || m > 12 || d < 1 || d > 31 || y < 1900 || y > 2100) return false;
	const dt = /* @__PURE__ */ new Date(`${p.y}-${p.m}-${p.d}T00:00:00Z`);
	return !Number.isNaN(dt.getTime());
}
var JURISDICTIONS = [
	[
		"AL",
		"Alabama",
		"636033",
		"MONTGOMERY",
		"36104",
		"D",
		"^\\d{7,8}$",
		"1234567",
		[[350, 369]]
	],
	[
		"AK",
		"Alaska",
		"636059",
		"JUNEAU",
		"99801",
		"D",
		"^\\d{1,7}$",
		"1234567",
		[[995, 999]]
	],
	[
		"AZ",
		"Arizona",
		"636026",
		"PHOENIX",
		"85001",
		"D",
		"^[A-Z]\\d{8}$|^\\d{9}$",
		"$12345678",
		[[850, 865]]
	],
	[
		"AR",
		"Arkansas",
		"636021",
		"LITTLE ROCK",
		"72201",
		"D",
		"^\\d{8,9}$",
		"12345678",
		[[716, 729]]
	],
	[
		"CA",
		"California",
		"636014",
		"SACRAMENTO",
		"95814",
		"C",
		"^[A-Z]\\d{7}$",
		"$1234567",
		[[900, 961]]
	],
	[
		"CO",
		"Colorado",
		"636020",
		"DENVER",
		"80202",
		"C",
		"^\\d{9}$",
		"123456789",
		[[800, 816]]
	],
	[
		"CT",
		"Connecticut",
		"636006",
		"HARTFORD",
		"06103",
		"D",
		"^\\d{9}$",
		"123456789",
		[[60, 69]]
	],
	[
		"DE",
		"Delaware",
		"636011",
		"DOVER",
		"19901",
		"D",
		"^\\d{1,7}$",
		"1234567",
		[[197, 199]]
	],
	[
		"DC",
		"District of Columbia",
		"636043",
		"WASHINGTON",
		"20001",
		"D",
		"^\\d{7}$",
		"1234567",
		[[200, 205], [569, 569]]
	],
	[
		"FL",
		"Florida",
		"636010",
		"TALLAHASSEE",
		"32301",
		"E",
		"^[A-Z]\\d{12}$",
		"$123456789012",
		[[320, 349]]
	],
	[
		"GA",
		"Georgia",
		"636055",
		"ATLANTA",
		"30303",
		"C",
		"^\\d{7,9}$",
		"123456789",
		[[300, 319], [398, 399]]
	],
	[
		"HI",
		"Hawaii",
		"636047",
		"HONOLULU",
		"96813",
		"3",
		"^H\\d{8}$|^\\d{9}$",
		"H12345678",
		[[967, 968]]
	],
	[
		"ID",
		"Idaho",
		"636050",
		"BOISE",
		"83702",
		"D",
		"^[A-Z]{2}\\d{6}[A-Z]$|^\\d{9}$",
		"AB123456C",
		[[832, 838]]
	],
	[
		"IL",
		"Illinois",
		"636035",
		"SPRINGFIELD",
		"62701",
		"D",
		"^[A-Z]\\d{11,12}$",
		"$12345678901",
		[[600, 629]]
	],
	[
		"IN",
		"Indiana",
		"636037",
		"INDIANAPOLIS",
		"46204",
		"D",
		"^\\d{10}$",
		"1234567890",
		[[460, 479]]
	],
	[
		"IA",
		"Iowa",
		"636018",
		"DES MOINES",
		"50309",
		"C",
		"^\\d{3}[A-Z]{2}\\d{4}$|^\\d{9}$",
		"123AB4567",
		[[500, 528]]
	],
	[
		"KS",
		"Kansas",
		"636022",
		"TOPEKA",
		"66603",
		"C",
		"^K\\d{8}$|^\\d{9}$",
		"K12345678",
		[[660, 679]]
	],
	[
		"KY",
		"Kentucky",
		"636046",
		"FRANKFORT",
		"40601",
		"D",
		"^[A-Z]\\d{8}$|^\\d{9}$",
		"$12345678",
		[[400, 427]]
	],
	[
		"LA",
		"Louisiana",
		"636007",
		"BATON ROUGE",
		"70801",
		"E",
		"^\\d{1,9}$",
		"012345678",
		[[700, 714]]
	],
	[
		"ME",
		"Maine",
		"636041",
		"AUGUSTA",
		"04330",
		"C",
		"^\\d{7}$",
		"1234567",
		[[39, 49]]
	],
	[
		"MD",
		"Maryland",
		"636003",
		"ANNAPOLIS",
		"21401",
		"C",
		"^[A-Z]\\d{12}$",
		"$123456789012",
		[[206, 219]]
	],
	[
		"MA",
		"Massachusetts",
		"636002",
		"BOSTON",
		"02108",
		"D",
		"^[A-Z]\\d{8}$|^SA\\d{7}$",
		"$12345678",
		[[10, 27], [55, 55]]
	],
	[
		"MI",
		"Michigan",
		"636032",
		"LANSING",
		"48933",
		"OP",
		"^[A-Z]\\d{12}$",
		"$123456789012",
		[[480, 499]]
	],
	[
		"MN",
		"Minnesota",
		"636038",
		"SAINT PAUL",
		"55101",
		"D",
		"^[A-Z]\\d{12}$",
		"$123456789012",
		[[550, 567]]
	],
	[
		"MS",
		"Mississippi",
		"636051",
		"JACKSON",
		"39201",
		"R",
		"^\\d{9}$",
		"123456789",
		[[386, 397]]
	],
	[
		"MO",
		"Missouri",
		"636030",
		"JEFFERSON CITY",
		"65101",
		"F",
		"^[A-Z]\\d{5,9}$|^\\d{9}$",
		"$12345678",
		[[630, 658]]
	],
	[
		"MT",
		"Montana",
		"636008",
		"HELENA",
		"59601",
		"D",
		"^\\d{9,13}$|^[A-Z]\\d{8}$",
		"123456789",
		[[590, 599]]
	],
	[
		"NE",
		"Nebraska",
		"636054",
		"LINCOLN",
		"68508",
		"O",
		"^[A-Z]\\d{3,8}$|^H\\d{8}$",
		"H12345678",
		[[680, 693]]
	],
	[
		"NV",
		"Nevada",
		"636049",
		"CARSON CITY",
		"89701",
		"C",
		"^\\d{10,12}$|^X\\d{8}$",
		"1234567890",
		[[889, 898]]
	],
	[
		"NH",
		"New Hampshire",
		"636039",
		"CONCORD",
		"03301",
		"D",
		"^\\d{2}[A-Z]{3}\\d{5}$",
		"01ABC23456",
		[[30, 38]]
	],
	[
		"NJ",
		"New Jersey",
		"636036",
		"TRENTON",
		"08608",
		"D",
		"^[A-Z]\\d{14}$",
		"$12345678901234",
		[[70, 89]]
	],
	[
		"NM",
		"New Mexico",
		"636009",
		"SANTA FE",
		"87501",
		"D",
		"^\\d{8,9}$",
		"12345678",
		[[870, 884]]
	],
	[
		"NY",
		"New York",
		"636001",
		"ALBANY",
		"12207",
		"D",
		"^\\d{9}$",
		"123456789",
		[[100, 149], [5, 5]]
	],
	[
		"NC",
		"North Carolina",
		"636004",
		"RALEIGH",
		"27601",
		"C",
		"^\\d{1,12}$",
		"123456789012",
		[[270, 289]]
	],
	[
		"ND",
		"North Dakota",
		"636034",
		"BISMARCK",
		"58501",
		"D",
		"^[A-Z]{3}\\d{6}$",
		"ABC123456",
		[[580, 588]]
	],
	[
		"OH",
		"Ohio",
		"636023",
		"COLUMBUS",
		"43215",
		"D",
		"^[A-Z]{2}\\d{6}$",
		"AB123456",
		[[430, 458]]
	],
	[
		"OK",
		"Oklahoma",
		"636058",
		"OKLAHOMA CITY",
		"73102",
		"D",
		"^[A-Z]\\d{9}$",
		"$123456789",
		[[730, 749]]
	],
	[
		"OR",
		"Oregon",
		"636029",
		"SALEM",
		"97301",
		"C",
		"^[A-Z0-9]{1,9}$",
		"1234567",
		[[970, 979]]
	],
	[
		"PA",
		"Pennsylvania",
		"636025",
		"HARRISBURG",
		"17101",
		"C",
		"^\\d{8}$",
		"12345678",
		[[150, 196]]
	],
	[
		"RI",
		"Rhode Island",
		"636052",
		"PROVIDENCE",
		"02903",
		"10",
		"^\\d{7}$|^V\\d{6}$",
		"1234567",
		[[28, 29]]
	],
	[
		"SC",
		"South Carolina",
		"636005",
		"COLUMBIA",
		"29201",
		"D",
		"^\\d{5,11}$",
		"123456789",
		[[290, 299]]
	],
	[
		"SD",
		"South Dakota",
		"636042",
		"PIERRE",
		"57501",
		"D",
		"^\\d{6,10}$",
		"12345678",
		[[570, 577]]
	],
	[
		"TN",
		"Tennessee",
		"636053",
		"NASHVILLE",
		"37219",
		"D",
		"^\\d{7,9}$",
		"123456789",
		[[370, 385]]
	],
	[
		"TX",
		"Texas",
		"636015",
		"AUSTIN",
		"78701",
		"C",
		"^\\d{8}$",
		"12345678",
		[[750, 799], [885, 885]]
	],
	[
		"UT",
		"Utah",
		"636040",
		"SALT LAKE CITY",
		"84111",
		"D",
		"^\\d{4,10}$",
		"123456789",
		[[840, 847]]
	],
	[
		"VT",
		"Vermont",
		"636024",
		"MONTPELIER",
		"05602",
		"D",
		"^\\d{8}$|^\\d{7}A$",
		"12345678",
		[[50, 59]]
	],
	[
		"VA",
		"Virginia",
		"636000",
		"RICHMOND",
		"23219",
		"D",
		"^[A-Z]\\d{8}$",
		"T16700285",
		[[201, 201], [220, 246]],
		2
	],
	[
		"WA",
		"Washington",
		"636045",
		"OLYMPIA",
		"98501",
		"C",
		"^[A-Z0-9*]{7,12}$",
		"WDL123456789",
		[[980, 994]]
	],
	[
		"WV",
		"West Virginia",
		"636061",
		"CHARLESTON",
		"25301",
		"E",
		"^[A-Z0-9]{7}$",
		"A123456",
		[[247, 268]]
	],
	[
		"WI",
		"Wisconsin",
		"636031",
		"MADISON",
		"53703",
		"D",
		"^[A-Z]\\d{13}$",
		"$1234567890123",
		[[530, 549]]
	],
	[
		"WY",
		"Wyoming",
		"636060",
		"CHEYENNE",
		"82001",
		"C",
		"^\\d{9}$",
		"123456789",
		[[820, 831]]
	],
	[
		"PR",
		"Puerto Rico",
		"604431",
		"SAN JUAN",
		"00901",
		"3",
		"^\\d{7,9}$",
		"12345678",
		[[6, 9]]
	],
	[
		"GU",
		"Guam",
		"636019",
		"HAGATNA",
		"96910",
		"D",
		"^[A-Z0-9]{5,10}$",
		"1234567",
		[[969, 969]]
	],
	[
		"VI",
		"Virgin Islands",
		"636062",
		"CHARLOTTE AMALIE",
		"00802",
		"D",
		"^[A-Z0-9]{6,10}$",
		"1234567",
		[[8, 8]]
	],
	[
		"AS",
		"American Samoa",
		"604427",
		"PAGO PAGO",
		"96799",
		"D",
		"^[A-Z0-9]{4,10}$",
		"1234567",
		[[967, 967]]
	],
	[
		"MP",
		"Northern Mariana Islands",
		"604430",
		"SAIPAN",
		"96950",
		"D",
		"^[A-Z0-9]{4,10}$",
		"1234567",
		[[969, 969]]
	]
].map((row) => ({
	code: row[0],
	name: row[1],
	iin: row[2],
	city: row[3],
	zip: row[4],
	operatorClass: row[5],
	licensePattern: row[6],
	licenseSample: row[7],
	zipRanges: row[8],
	jurisdictionVersion: row[9] ?? 0
}));
var JURISDICTION_BY_CODE = Object.fromEntries(JURISDICTIONS.map((j) => [j.code, j]));
Object.fromEntries(JURISDICTIONS.map((j) => [j.code, j.iin]));
var JURISDICTION_BY_IIN = Object.fromEntries(JURISDICTIONS.map((j) => [j.iin, j]));
function jurisdictionSubfileType(code) {
	return `Z${code.charAt(0)}`;
}
function sampleLicenseNumber(j, familyName) {
	const initial = (familyName.replace(/[^A-Za-z]/g, "").charAt(0) || "S").toUpperCase();
	return j.licenseSample.replace(/\$/g, initial);
}
function zipMatchesJurisdiction(j, postal) {
	const digits = postal.replace(/\D/g, "");
	if (digits.length < 3) return false;
	const prefix = Number.parseInt(digits.slice(0, 3), 10);
	return j.zipRanges.some(([lo, hi]) => prefix >= lo && prefix <= hi);
}
function buildDlElements(form) {
	const j = JURISDICTION_BY_CODE[form.jurisdictionCode];
	const version = form.aamvaVersion;
	const none = (value, fallback = "NONE") => {
		const t = value.trim();
		return t.length ? t.toUpperCase() : fallback;
	};
	const elements = [
		{
			id: "DCA",
			value: none(form.vehicleClass || j?.operatorClass || "D")
		},
		{
			id: "DCB",
			value: none(form.restrictions)
		},
		{
			id: "DCD",
			value: none(form.endorsements)
		},
		{
			id: "DBA",
			value: toAamvaDate(form.expDate, version)
		},
		{
			id: "DCS",
			value: upperName(form.familyName)
		},
		{
			id: "DAC",
			value: upperName(form.firstName)
		},
		{
			id: "DAD",
			value: none(form.middleName)
		},
		{
			id: "DBD",
			value: toAamvaDate(form.issueDate, version)
		},
		{
			id: "DBB",
			value: toAamvaDate(form.dob, version)
		},
		{
			id: "DBC",
			value: form.sex
		},
		{
			id: "DAY",
			value: (form.eyes || "BRO").toUpperCase()
		},
		{
			id: "DAU",
			value: formatHeight(form.height)
		},
		{
			id: "DAG",
			value: upperName(form.street)
		}
	];
	if (form.street2.trim()) elements.push({
		id: "DAH",
		value: upperName(form.street2)
	});
	elements.push({
		id: "DAI",
		value: upperName(form.city)
	}, {
		id: "DAJ",
		value: form.jurisdictionCode
	}, {
		id: "DAK",
		value: formatPostal(form.postal)
	}, {
		id: "DAQ",
		value: form.licenseNumber.trim().toUpperCase()
	}, {
		id: "DCF",
		value: form.discriminator.trim().toUpperCase()
	}, {
		id: "DCG",
		value: "USA"
	}, {
		id: "DDE",
		value: form.familyTrunc
	}, {
		id: "DDF",
		value: form.firstTrunc
	}, {
		id: "DDG",
		value: form.middleTrunc
	});
	if (form.suffix.trim()) elements.push({
		id: "DCU",
		value: upperName(form.suffix)
	});
	if (form.hair.trim()) elements.push({
		id: "DAZ",
		value: form.hair.toUpperCase()
	});
	if (form.inventory.trim()) elements.push({
		id: "DCK",
		value: form.inventory.trim().toUpperCase()
	});
	elements.push({
		id: "DDA",
		value: form.compliance
	});
	if (form.cardRevision.trim()) elements.push({
		id: "DDB",
		value: toAamvaDate(form.cardRevision, version)
	});
	elements.push({
		id: "DDD",
		value: form.limitedDuration ? "1" : "0"
	});
	if (form.weightLbs.trim()) {
		const lbs = form.weightLbs.replace(/\D/g, "");
		if (lbs) elements.push({
			id: "DAW",
			value: lbs.padStart(3, "0")
		});
	}
	if (form.organDonor) elements.push({
		id: "DDH",
		value: "1"
	});
	if (form.veteran) elements.push({
		id: "DDI",
		value: "1"
	});
	return elements;
}
function packSubfile(type, elements) {
	return type + elements.map((el, i) => `${el.id}${el.value}${i === elements.length - 1 ? "\r" : "\n"}`).join("");
}
function encodeAamva(form) {
	const j = JURISDICTION_BY_CODE[form.jurisdictionCode];
	if (!j) throw new Error(`Unknown jurisdiction ${form.jurisdictionCode}`);
	const fileType = form.documentKind === "ID" ? "ID" : "DL";
	const dlElements = buildDlElements(form);
	const bodies = [{
		type: fileType,
		body: packSubfile(fileType, dlElements),
		elements: dlElements
	}];
	if (form.includeJurisdictionSubfile) {
		const zType = jurisdictionSubfileType(j.code);
		const zElements = [{
			id: `Z${j.code}`,
			value: `SPECIMEN-ANNEXD-${j.code}-${j.iin}`
		}];
		bodies.push({
			type: zType,
			body: packSubfile(zType, zElements),
			elements: zElements
		});
	}
	const n = bodies.length;
	let offset = FIXED_HEADER_LENGTH + 10 * n;
	const subfiles = bodies.map((b) => {
		const sf = {
			type: b.type,
			offset,
			length: b.body.length,
			body: b.body,
			elements: b.elements
		};
		offset += b.body.length;
		return sf;
	});
	const designators = subfiles.map((sf) => `${sf.type}${pad4(sf.offset)}${pad4(sf.length)}`).join("");
	return {
		payload: HEADER_PREFIX + j.iin + pad2(form.aamvaVersion) + pad2(form.jurisdictionVersion) + pad2(n) + designators + subfiles.map((sf) => sf.body).join(""),
		iin: j.iin,
		aamvaVersion: form.aamvaVersion,
		jurisdictionVersion: form.jurisdictionVersion,
		fileType: "ANSI",
		subfiles
	};
}
function defaultDiscriminator(code, iin) {
	return `ANNEXD${iin}${code}SPEC01`;
}
function parseAamva(payload) {
	if (!payload.startsWith(HEADER_PREFIX) && !payload.startsWith("@")) throw new Error("Not an AAMVA barcode — missing @ / ANSI header.");
	const ansiAt = payload.indexOf("ANSI ");
	if (ansiAt < 0) throw new Error("Missing ANSI file type.");
	const cursor = ansiAt + 5;
	const iin = payload.slice(cursor, cursor + 6);
	const aamvaVersion = Number.parseInt(payload.slice(cursor + 6, cursor + 8), 10);
	const jurisdictionVersion = Number.parseInt(payload.slice(cursor + 8, cursor + 10), 10);
	const entryCount = Number.parseInt(payload.slice(cursor + 10, cursor + 12), 10);
	if (!/^\d{6}$/.test(iin)) throw new Error("IIN must be 6 digits.");
	if (!Number.isFinite(aamvaVersion) || !Number.isFinite(entryCount)) throw new Error("Corrupt AAMVA header.");
	const designatorStart = cursor + 12;
	const subfiles = [];
	for (let i = 0; i < entryCount; i += 1) {
		const at = designatorStart + i * 10;
		const type = payload.slice(at, at + 2);
		const offset = Number.parseInt(payload.slice(at + 2, at + 6), 10);
		const length = Number.parseInt(payload.slice(at + 6, at + 10), 10);
		const body = payload.slice(offset, offset + length);
		subfiles.push({
			type,
			offset,
			length,
			body,
			elements: parseSubfileElements(body, type)
		});
	}
	const elements = {};
	for (const sf of subfiles) for (const el of sf.elements) elements[el.id] = el.value;
	return {
		payload,
		iin,
		aamvaVersion,
		jurisdictionVersion,
		entryCount,
		subfiles,
		elements
	};
}
function parseSubfileElements(body, type) {
	let data = body;
	if (data.startsWith(type)) data = data.slice(type.length);
	if (data.endsWith("\r")) data = data.slice(0, -1);
	if (!data) return [];
	const chunks = data.split("\n");
	const elements = [];
	for (const chunk of chunks) {
		if (chunk.length < 3) continue;
		elements.push({
			id: chunk.slice(0, 3),
			value: chunk.slice(3)
		});
	}
	return elements;
}
var EYE_SET = new Set(EYE_COLORS.map((e) => e.code));
var HAIR_SET = new Set(HAIR_COLORS.map((h) => h.code));
function verifyPayload(payload, form) {
	const checks = [];
	const add = (check) => checks.push(check);
	let parsed = null;
	try {
		parsed = parseAamva(payload);
		add({
			id: "parse",
			label: "AAMVA header parses",
			severity: "pass",
			detail: `ANSI IIN ${parsed.iin}  version ${String(parsed.aamvaVersion).padStart(2, "0")}  ${parsed.entryCount} subfile(s)`
		});
	} catch (err) {
		add({
			id: "parse",
			label: "AAMVA header parses",
			severity: "fail",
			detail: err instanceof Error ? err.message : "Unreadable payload"
		});
		return summarize(checks, null);
	}
	const headerOk = payload.startsWith("@\n\rANSI ") || payload.startsWith("@\n\rANSI ");
	add({
		id: "header-bytes",
		label: "Compliance header bytes",
		severity: headerOk ? "pass" : "fail",
		detail: headerOk ? "@ + LF + RS + CR + ANSI (AAMVA Annex D)" : "Header must be '@' LF RS CR 'ANSI ' — scanners reject a missing RS (0x1E)."
	});
	const jFromIin = JURISDICTION_BY_IIN[parsed.iin];
	add({
		id: "iin",
		label: "Issuer Identification Number",
		severity: jFromIin ? "pass" : "fail",
		detail: jFromIin ? `${parsed.iin} is ${jFromIin.name} (${jFromIin.code})` : `${parsed.iin} is not a registered US jurisdiction IIN`
	});
	if (form) {
		const expected = JURISDICTION_BY_CODE[form.jurisdictionCode];
		const match = expected && expected.iin === parsed.iin;
		add({
			id: "iin-match",
			label: "IIN matches selected jurisdiction",
			severity: match ? "pass" : "fail",
			detail: match ? `${form.jurisdictionCode} ↔ ${parsed.iin}` : `Selected ${form.jurisdictionCode} expects IIN ${expected?.iin ?? "—"}, payload has ${parsed.iin}`
		});
	}
	const versionOk = parsed.aamvaVersion >= 1 && parsed.aamvaVersion <= 10;
	add({
		id: "version",
		label: "AAMVA version",
		severity: versionOk ? "pass" : "fail",
		detail: versionOk ? `Version ${String(parsed.aamvaVersion).padStart(2, "0")} (${versionName(parsed.aamvaVersion)})` : `Version ${parsed.aamvaVersion} is outside 01–10`
	});
	const expectedCount = parsed.subfiles.length;
	add({
		id: "entries",
		label: "Subfile count",
		severity: parsed.entryCount === expectedCount && expectedCount > 0 ? "pass" : "fail",
		detail: `Header declares ${parsed.entryCount}, parsed ${expectedCount}`
	});
	const expectedStart = 21 + 10 * parsed.entryCount;
	const first = parsed.subfiles[0];
	add({
		id: "offset-0",
		label: "First subfile offset",
		severity: first && first.offset === expectedStart ? "pass" : "fail",
		detail: first ? `Offset ${String(first.offset).padStart(4, "0")} (expected ${String(expectedStart).padStart(4, "0")})` : "No subfile designator"
	});
	parsed.subfiles.forEach((sf, i) => {
		const lenOk = payload.slice(sf.offset, sf.offset + sf.length).length === sf.length && sf.length === sf.body.length;
		add({
			id: `len-${i}`,
			label: `${sf.type} subfile length`,
			severity: lenOk ? "pass" : "fail",
			detail: `Declared ${sf.length}, body ${sf.body.length} chars`
		});
		const startsWithType = sf.body.startsWith(sf.type);
		add({
			id: `type-${i}`,
			label: `${sf.type} subfile prefix`,
			severity: startsWithType ? "pass" : "fail",
			detail: startsWithType ? `Body begins with ${sf.type}` : `Body does not begin with declared type ${sf.type}`
		});
		const terminated = sf.body.endsWith("\r");
		add({
			id: `term-${i}`,
			label: `${sf.type} segment terminator`,
			severity: terminated ? "pass" : "fail",
			detail: terminated ? "Ends with CR (0x0D)" : "Missing segment terminator CR"
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
		detail: chained ? "Each subfile begins where the previous ends" : "Gap or overlap in subfile offsets"
	});
	const dl = parsed.subfiles.find((s) => s.type === "DL" || s.type === "ID");
	add({
		id: "dl-subfile",
		label: "DL / ID subfile present",
		severity: dl ? "pass" : "fail",
		detail: dl ? `Type ${dl.type}` : "Missing mandatory DL or ID subfile"
	});
	for (const id of MANDATORY_FIELDS) {
		const value = parsed.elements[id];
		const present = typeof value === "string" && value.length > 0;
		add({
			id: `field-${id}`,
			label: `Mandatory ${id}`,
			severity: present ? "pass" : "fail",
			detail: present ? value : "Missing"
		});
	}
	const v = parsed.aamvaVersion;
	for (const id of [
		"DBA",
		"DBB",
		"DBD"
	]) {
		const raw = parsed.elements[id];
		if (!raw) continue;
		add({
			id: `date-${id}`,
			label: `${id} date format`,
			severity: isValidAamvaDate(raw, v) ? "pass" : "fail",
			detail: isValidAamvaDate(raw, v) ? `${raw} → ${fromAamvaDate(raw, v)}` : `${raw} is not a valid ${v >= 4 ? "MMDDYYYY" : "YYYYMMDD"} date`
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
			detail: ok ? `${issueIso} ≥ ${dobIso}` : `Issue ${issueIso} is before DOB ${dobIso}`
		});
	}
	if (issueIso && expIso) {
		const ok = expIso >= issueIso;
		add({
			id: "date-order-exp",
			label: "Expiration after issue",
			severity: ok ? "pass" : "fail",
			detail: ok ? `${expIso} ≥ ${issueIso}` : `Expiration ${expIso} is before issue ${issueIso}`
		});
	}
	const sex = parsed.elements.DBC;
	add({
		id: "sex",
		label: "Sex code",
		severity: sex === "1" || sex === "2" || sex === "9" ? "pass" : "fail",
		detail: sex ? `${sex} (${sexLabel(sex)})` : "Missing"
	});
	const height = parsed.elements.DAU ?? "";
	add({
		id: "height",
		label: "Height format",
		severity: /^\d{3} (in|cm)$/.test(height) ? "pass" : "fail",
		detail: height || "Missing — expected '068 in'"
	});
	const eyes = parsed.elements.DAY ?? "";
	add({
		id: "eyes",
		label: "Eye color code",
		severity: EYE_SET.has(eyes) ? "pass" : "warn",
		detail: eyes || "Missing"
	});
	const hair = parsed.elements.DAZ;
	if (hair) add({
		id: "hair",
		label: "Hair color code",
		severity: HAIR_SET.has(hair) ? "pass" : "warn",
		detail: hair
	});
	const postal = parsed.elements.DAK ?? "";
	add({
		id: "postal-len",
		label: "Postal code width",
		severity: postal.length === 11 ? "pass" : "fail",
		detail: postal.length === 11 ? `"${postal}" (11 characters)` : `Length ${postal.length}, AAMVA requires 11`
	});
	const state = parsed.elements.DAJ;
	const jFromState = state ? JURISDICTION_BY_CODE[state] : void 0;
	add({
		id: "state",
		label: "Jurisdiction code",
		severity: jFromState ? "pass" : "fail",
		detail: jFromState ? `${jFromState.code} ${jFromState.name}` : `${state ?? "—"} is not a US jurisdiction`
	});
	if (jFromState && jFromIin && jFromState.code !== jFromIin.code) add({
		id: "state-iin",
		label: "DAJ matches IIN",
		severity: "fail",
		detail: `DAJ ${jFromState.code} but IIN belongs to ${jFromIin.code}`
	});
	else if (jFromState && jFromIin) add({
		id: "state-iin",
		label: "DAJ matches IIN",
		severity: "pass",
		detail: `${jFromState.code} ↔ ${jFromIin.iin}`
	});
	const license = parsed.elements.DAQ ?? "";
	if (jFromState) {
		const ok = new RegExp(`^${jFromState.licensePattern}$`).test(license);
		add({
			id: "license-format",
			label: `${jFromState.code} license number format`,
			severity: ok ? "pass" : "fail",
			detail: ok ? license : `"${license}" does not match ${jFromState.licensePattern}`
		});
	}
	if (jFromState && postal.trim()) {
		const zipOk = zipMatchesJurisdiction(jFromState, postal);
		add({
			id: "zip-state",
			label: "ZIP belongs to jurisdiction",
			severity: zipOk ? "pass" : "warn",
			detail: zipOk ? `${postal.trim()} is in ${jFromState.code}` : `${postal.trim()} is outside typical ${jFromState.code} ZIP ranges`
		});
	}
	for (const id of [
		"DDE",
		"DDF",
		"DDG"
	]) {
		const t = parsed.elements[id];
		add({
			id: `trunc-${id}`,
			label: `${id} truncation`,
			severity: t === "N" || t === "T" || t === "U" ? "pass" : "fail",
			detail: t ?? "Missing (N / T / U)"
		});
	}
	const country = parsed.elements.DCG;
	add({
		id: "country",
		label: "Country",
		severity: country === "USA" || country === "CAN" ? "pass" : "warn",
		detail: country ?? "Missing"
	});
	const dda = parsed.elements.DDA;
	if (dda) add({
		id: "realid",
		label: "REAL ID compliance (DDA)",
		severity: dda === "F" || dda === "N" || dda === "M" ? "pass" : "fail",
		detail: complianceLabel(dda)
	});
	else add({
		id: "realid",
		label: "REAL ID compliance (DDA)",
		severity: "warn",
		detail: "Optional on older versions; expected on 2013+"
	});
	const disc = parsed.elements.DCF ?? "";
	add({
		id: "discriminator",
		label: "Document discriminator",
		severity: disc.length >= 10 ? "pass" : "warn",
		detail: disc ? `${disc.length} chars` : "Missing"
	});
	if (form) try {
		const roundtrip = encodeAamva(form).payload;
		add({
			id: "encode-stable",
			label: "Re-encode matches payload",
			severity: roundtrip === payload ? "pass" : "warn",
			detail: roundtrip === payload ? "Encoder output is deterministic" : "Live form produced a different payload than the scanned string"
		});
	} catch {}
	if (payload.length > 900) add({
		id: "size",
		label: "Payload size",
		severity: "warn",
		detail: `${payload.length} chars — dense PDF417; raise columns or EC if a scanner struggles`
	});
	else add({
		id: "size",
		label: "Payload size",
		severity: "pass",
		detail: `${payload.length} chars, fits a 13-column PDF417 at EC 5`
	});
	const scanner = extractScanner(parsed);
	if (scanner?.under21 && scanner.expDate && dobIso) add({
		id: "u21",
		label: "Under-21 expiration",
		severity: "warn",
		detail: "Cardholder is under 21 — many states expire the credential on the 21st birthday"
	});
	return summarize(checks, scanner);
}
function summarize(checks, scanner) {
	return {
		checks,
		passed: checks.filter((c) => c.severity === "pass").length,
		failed: checks.filter((c) => c.severity === "fail").length,
		warnings: checks.filter((c) => c.severity === "warn").length,
		scanner
	};
}
function extractScanner(parsed) {
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
	const cityLine = [
		parsed.elements.DAI,
		parsed.elements.DAJ,
		(parsed.elements.DAK ?? "").trim()
	].filter(Boolean).join(" ");
	return {
		fullName: [
			first,
			middle,
			family
		].filter(Boolean).join(" "),
		firstName: first,
		familyName: family,
		middleName: middle,
		licenseNumber: parsed.elements.DAQ ?? "",
		documentKind: parsed.subfiles.some((s) => s.type === "ID") ? "ID" : "DL",
		jurisdiction: j ? `${j.code} · ${j.name}` : parsed.elements.DAJ ?? parsed.iin,
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
		aamvaVersion: v
	};
}
function versionName(v) {
	return {
		1: "2000",
		2: "2003",
		3: "2005",
		4: "2009",
		5: "2010",
		6: "2011",
		7: "2012",
		8: "2013",
		9: "2016",
		10: "2020"
	}[v] ?? "unknown";
}
var SPECIMEN_NAME = {
	familyName: "SAMPLE",
	firstName: "MICHAEL",
	middleName: "JOHN"
};
var STREETS = {
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
	MP: "BEACH ROAD"
};
function specimenStreet(code) {
	return STREETS[code] ?? "100 CAPITOL STREET";
}
function createSpecimen(code = "VA") {
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
		compactPdf417: false
	};
}
function applyJurisdiction(form, code) {
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
		inventory: `INV${j.iin}0001`
	};
}
var SPECIMEN_PORTRAITS = [
	{
		id: "male-01",
		url: "/portraits/male-01.jpg",
		sex: "1",
		label: "Specimen A"
	},
	{
		id: "male-02",
		url: "/portraits/male-02.jpg",
		sex: "1",
		label: "Specimen B"
	},
	{
		id: "female-01",
		url: "/portraits/female-01.jpg",
		sex: "2",
		label: "Specimen C"
	},
	{
		id: "female-02",
		url: "/portraits/female-02.jpg",
		sex: "2",
		label: "Specimen D"
	}
];
var PAPER_TEXTURE = "/card/paper.jpg";
var FOIL_TEXTURE = "/card/foil.jpg";
function defaultPortraitForSex(sex) {
	return SPECIMEN_PORTRAITS.find((p) => p.sex === sex) ?? SPECIMEN_PORTRAITS[0];
}
function isSpecimenPortrait(url) {
	return !!url && SPECIMEN_PORTRAITS.some((p) => p.url === url);
}
var imageCache = /* @__PURE__ */ new Map();
function loadImage(src) {
	if (!src.startsWith("data:")) {
		const hit = imageCache.get(src);
		if (hit instanceof HTMLImageElement) return Promise.resolve(hit);
		if (hit) return hit;
	}
	const promise = new Promise((resolve, reject) => {
		const img = new Image();
		img.crossOrigin = "anonymous";
		img.onload = () => {
			if (!src.startsWith("data:")) imageCache.set(src, img);
			resolve(img);
		};
		img.onerror = () => {
			imageCache.delete(src);
			reject(/* @__PURE__ */ new Error(`Failed to load ${src}`));
		};
		img.src = src;
	});
	if (!src.startsWith("data:")) imageCache.set(src, promise);
	return promise;
}
async function fileToDataUrl(file) {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = () => resolve(String(reader.result));
		reader.onerror = () => reject(reader.error);
		reader.readAsDataURL(file);
	});
}
async function cropToPortrait(dataUrl) {
	const img = await loadImage(dataUrl);
	const ratio = 3 / 4;
	let sx = 0;
	let sy = 0;
	let sw = img.width;
	let sh = img.height;
	if (sw / sh > ratio) {
		sw = Math.round(sh * ratio);
		sx = Math.round((img.width - sw) / 2);
	} else {
		sh = Math.round(sw / ratio);
		sy = Math.round((img.height - sh) / 2);
	}
	const canvas = document.createElement("canvas");
	canvas.width = 900;
	canvas.height = 1200;
	const ctx = canvas.getContext("2d");
	if (!ctx) return dataUrl;
	ctx.drawImage(img, sx, sy, sw, sh, 0, 0, 900, 1200);
	return canvas.toDataURL("image/jpeg", .92);
}
function drawFallbackPortrait(ctx, x, y, w, h, sex) {
	ctx.save();
	ctx.beginPath();
	ctx.rect(x, y, w, h);
	ctx.clip();
	const bg = ctx.createLinearGradient(x, y, x, y + h);
	bg.addColorStop(0, "#c8ced6");
	bg.addColorStop(1, "#9aa3ad");
	ctx.fillStyle = bg;
	ctx.fillRect(x, y, w, h);
	ctx.fillStyle = sex === "2" ? "#2c2420" : "#1d2a38";
	ctx.fillRect(x, y + h * .62, w, h * .38);
	ctx.fillStyle = sex === "2" ? "#c9a58a" : "#c4a27c";
	ctx.beginPath();
	ctx.ellipse(x + w / 2, y + h * .42, w * .28, h * .24, 0, 0, Math.PI * 2);
	ctx.fill();
	ctx.fillStyle = sex === "2" ? "#2a1d16" : "#3a2a1c";
	ctx.beginPath();
	ctx.ellipse(x + w / 2, y + h * .28, w * .3, h * .16, 0, Math.PI, Math.PI * 2);
	ctx.fill();
	ctx.fillStyle = "rgba(18,21,26,0.55)";
	ctx.font = `${Math.round(h * .06)}px "IBM Plex Sans"`;
	ctx.textAlign = "center";
	ctx.fillText("SPECIMEN", x + w / 2, y + h * .9);
	ctx.restore();
}
function portraitForForm(form, current) {
	if (current && !isSpecimenPortrait(current)) return current;
	return defaultPortraitForSex(form.sex).url;
}
var useLicenseStore = create()((set) => ({
	form: createSpecimen("VA"),
	pastedScan: "",
	showQr: false,
	portraitUrl: defaultPortraitForSex("1").url,
	drawnSignatureUrl: null,
	signatureMode: "auto",
	orientation: "auto",
	showGhost: true,
	cardSide: "front",
	setForm: (patch) => set((s) => {
		const form = {
			...s.form,
			...patch
		};
		return {
			form,
			portraitUrl: patch.sex && patch.sex !== s.form.sex ? portraitForForm(form, s.portraitUrl) : s.portraitUrl
		};
	}),
	replaceForm: (form) => set({
		form,
		portraitUrl: portraitForForm(form)
	}),
	loadSpecimen: (code) => set((s) => {
		const form = createSpecimen(code ?? s.form.jurisdictionCode);
		return {
			form,
			portraitUrl: portraitForForm(form),
			drawnSignatureUrl: null,
			signatureMode: "auto"
		};
	}),
	selectJurisdiction: (code) => set((s) => ({ form: applyJurisdiction(s.form, code) })),
	setPastedScan: (pastedScan) => set({ pastedScan }),
	setShowQr: (showQr) => set({ showQr }),
	setPortraitUrl: (portraitUrl) => set({ portraitUrl }),
	setDrawnSignatureUrl: (drawnSignatureUrl) => set({
		drawnSignatureUrl,
		signatureMode: drawnSignatureUrl ? "drawn" : "auto"
	}),
	setSignatureMode: (signatureMode) => set({ signatureMode }),
	setOrientation: (orientation) => set({ orientation }),
	setShowGhost: (showGhost) => set({ showGhost }),
	setCardSide: (cardSide) => set({ cardSide })
}));
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[opacity,transform,background-color,color,border-color] duration-[var(--motion-quick)] ease-[var(--ease-out)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-40 [&_svg]:size-4 [&_svg]:shrink-0 active:scale-[0.98]", {
	variants: {
		variant: {
			default: "bg-accent text-accent-fg hover:opacity-90",
			secondary: "bg-surface-2 text-fg border border-border hover:border-border-strong",
			outline: "border border-border bg-transparent text-fg hover:bg-surface-2",
			ghost: "text-muted hover:text-fg hover:bg-surface-2",
			danger: "bg-fail text-paper hover:opacity-90"
		},
		size: {
			default: "h-11 px-4",
			sm: "h-9 px-3 text-xs",
			lg: "h-12 px-5",
			icon: "size-11"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
function Button({ className, variant, size, asChild = false, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		...props
	});
}
function Command$1({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(_e, {
		className: cn("flex h-full w-full flex-col overflow-hidden rounded-md bg-surface text-fg", className),
		...props
	});
}
function CommandInput({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-2 border-b border-border px-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "size-4 shrink-0 text-subtle" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(_e.Input, {
			className: cn("flex h-11 w-full bg-transparent text-sm outline-none placeholder:text-subtle", className),
			...props
		})]
	});
}
function CommandList({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(_e.List, {
		className: cn("max-h-72 overflow-y-auto overflow-x-hidden py-1", className),
		...props
	});
}
function CommandEmpty({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(_e.Empty, {
		className: cn("py-8 text-center text-sm text-muted", className),
		...props
	});
}
function CommandGroup({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(_e.Group, {
		className: cn("overflow-hidden p-1", className),
		...props
	});
}
function CommandItem({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(_e.Item, {
		className: cn("flex cursor-pointer items-center gap-2 rounded-md px-2 py-2 text-sm outline-none data-[selected=true]:bg-surface-2 data-[selected=true]:text-fg", className),
		...props
	});
}
var Popover = Root2;
var PopoverTrigger = Trigger;
function PopoverContent({ className, align = "start", sideOffset = 6, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
		align,
		sideOffset,
		className: cn("z-50 w-72 origin-[var(--radix-popover-content-transform-origin)] rounded-lg border border-border bg-surface p-2 text-fg shadow-lg outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-100", className),
		...props
	}) });
}
function JurisdictionSelect({ value, onChange }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	const selected = (0, import_react.useMemo)(() => JURISDICTIONS.find((j) => j.code === value), [value]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Popover, {
		open,
		onOpenChange: setOpen,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverTrigger, {
			asChild: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				variant: "secondary",
				className: "h-11 min-w-0 justify-between gap-3 px-3 font-normal",
				"aria-label": "Select jurisdiction",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "flex min-w-0 items-baseline gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-mono text-sm font-medium tracking-wide",
						children: selected?.code ?? "—"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "truncate text-muted",
						children: selected?.name ?? "Jurisdiction"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronsUpDown, { className: "size-4 shrink-0 text-subtle" })]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverContent, {
			className: "w-[min(100vw-2rem,22rem)] p-0",
			align: "start",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Command$1, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandInput, { placeholder: "State, IIN, or abbreviation" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CommandList, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandEmpty, { children: "No jurisdiction matches." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandGroup, { children: JURISDICTIONS.map((j) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CommandItem, {
				value: `${j.code} ${j.name} ${j.iin}`,
				onSelect: () => {
					onChange(j.code);
					setOpen(false);
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: cn("size-3.5", j.code === value ? "opacity-100" : "opacity-0") }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "w-8 font-mono text-xs",
						children: j.code
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "flex-1",
						children: j.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-mono text-[11px] text-subtle",
						children: j.iin
					})
				]
			}, j.code)) })] })] })
		})]
	});
}
function AppHeader() {
	const form = useLicenseStore((s) => s.form);
	const selectJurisdiction = useLicenseStore((s) => s.selectJurisdiction);
	const loadSpecimen = useLicenseStore((s) => s.loadSpecimen);
	const j = JURISDICTION_BY_CODE[form.jurisdictionCode];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
		className: "border-b border-border bg-bg",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mark, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-lg font-medium tracking-tight text-fg",
					children: "Annex D"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted",
					children: "US driver license card and PDF417 workbench"
				})] })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex min-w-0 flex-1 flex-col gap-2 sm:flex-row sm:items-center sm:justify-end",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(JurisdictionSelect, {
						value: form.jurisdictionCode,
						onChange: selectJurisdiction
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "hidden font-mono text-[11px] text-subtle lg:block",
						children: [
							"IIN ",
							j?.iin,
							" · v",
							String(form.aamvaVersion).padStart(2, "0")
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "outline",
						size: "sm",
						onClick: () => loadSpecimen(),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, {}), " Specimen"]
					})
				]
			})]
		})
	});
}
function Mark() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 32 32",
		className: "size-9 rounded-md border border-border bg-surface-2 p-1.5",
		"aria-hidden": true,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "3",
				y: "5",
				width: "26",
				height: "2.2",
				fill: "currentColor",
				className: "text-fg"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "3",
				y: "10",
				width: "18",
				height: "2.2",
				fill: "currentColor",
				className: "text-fg"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "3",
				y: "15",
				width: "24",
				height: "2.2",
				fill: "currentColor",
				className: "text-fg"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "3",
				y: "20",
				width: "14",
				height: "2.2",
				fill: "currentColor",
				className: "text-fg"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "3",
				y: "25",
				width: "22",
				height: "2.2",
				fill: "currentColor",
				className: "text-fg"
			})
		]
	});
}
function Label({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
		className: cn("text-xs font-medium tracking-wide text-muted", className),
		...props
	});
}
function Field({ label, htmlFor, hint, className, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("flex flex-col gap-1.5", className),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
				htmlFor,
				children: label
			}),
			children,
			hint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-mono text-[11px] text-subtle",
				children: hint
			}) : null
		]
	});
}
var Select = Select$1;
var SelectValue = SelectValue$1;
function SelectTrigger({ className, children, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectTrigger$1, {
		className: cn("flex h-11 w-full items-center justify-between gap-2 rounded-md border border-border bg-surface-2 px-3 text-sm text-fg outline-none transition-[border-color] focus:ring-2 focus:ring-ring disabled:opacity-40 [&>span]:line-clamp-1", className),
		...props,
		children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectIcon, {
			asChild: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "size-4 text-subtle" })
		})]
	});
}
function SelectContent({ className, children, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectPortal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent$1, {
		className: cn("z-50 max-h-72 min-w-[8rem] overflow-hidden rounded-lg border border-border bg-surface text-fg shadow-lg", className),
		position: "popper",
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectViewport, {
			className: "p-1",
			children
		})
	}) });
}
function SelectItem({ className, children, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem$1, {
		className: cn("relative flex w-full cursor-pointer select-none items-center rounded-md py-2 pl-8 pr-2 text-sm outline-none data-[highlighted]:bg-surface-2 data-[highlighted]:text-fg", className),
		...props,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "absolute left-2 flex size-4 items-center justify-center",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItemIndicator, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3.5" }) })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItemText, { children })]
	});
}
function Switch({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch$1, {
		className: cn("peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border border-border bg-surface-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring data-[state=checked]:bg-accent data-[state=checked]:border-accent", className),
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SwitchThumb, { className: "pointer-events-none block size-5 translate-x-0.5 rounded-full bg-fg shadow-sm transition-transform data-[state=checked]:translate-x-5 data-[state=checked]:bg-accent-fg" })
	});
}
function PortraitFields() {
	const portraitUrl = useLicenseStore((s) => s.portraitUrl);
	const setPortraitUrl = useLicenseStore((s) => s.setPortraitUrl);
	const orientation = useLicenseStore((s) => s.orientation);
	const setOrientation = useLicenseStore((s) => s.setOrientation);
	const showGhost = useLicenseStore((s) => s.showGhost);
	const setShowGhost = useLicenseStore((s) => s.setShowGhost);
	const signatureMode = useLicenseStore((s) => s.signatureMode);
	const setSignatureMode = useLicenseStore((s) => s.setSignatureMode);
	const setDrawnSignatureUrl = useLicenseStore((s) => s.setDrawnSignatureUrl);
	const fileRef = (0, import_react.useRef)(null);
	async function onUpload(file) {
		if (!file) return;
		try {
			const cropped = await cropToPortrait(await fileToDataUrl(file));
			setPortraitUrl(cropped);
			toast("Portrait cropped to 3:4");
		} catch {
			toast("Could not read that image");
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid grid-cols-1 gap-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-4 gap-2",
				children: SPECIMEN_PORTRAITS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setPortraitUrl(p.url),
					className: cn("overflow-hidden rounded-md border bg-surface-2 outline-none ring-ring/40 transition-shadow", portraitUrl === p.url ? "border-fg ring-2" : "border-border hover:border-border-strong"),
					"aria-label": p.label,
					"aria-pressed": portraitUrl === p.url,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: p.url,
						alt: "",
						className: "aspect-[3/4] w-full object-cover"
					})
				}, p.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						ref: fileRef,
						type: "file",
						accept: "image/*",
						className: "hidden",
						onChange: (e) => onUpload(e.target.files?.[0])
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						type: "button",
						size: "sm",
						variant: "secondary",
						onClick: () => fileRef.current?.click(),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, {}), " Upload photo"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CameraCapture, { onCapture: setPortraitUrl }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						size: "sm",
						variant: "outline",
						onClick: () => setPortraitUrl(SPECIMEN_PORTRAITS[0].url),
						children: "Reset"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Card orientation",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
					value: orientation,
					onValueChange: (v) => setOrientation(v),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
						"aria-label": "Card orientation",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: "auto",
							children: "Auto (vertical if under 21)"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: "horizontal",
							children: "Horizontal adult"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: "vertical",
							children: "Vertical"
						})
					] })]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex h-11 items-center justify-between gap-3 rounded-md border border-border bg-surface-2 px-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-fg",
					children: "Ghost image"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-[11px] text-subtle",
					children: "Faint reprint of the portrait"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
					checked: showGhost,
					onCheckedChange: setShowGhost,
					"aria-label": "Ghost image"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex h-11 items-center justify-between gap-3 rounded-md border border-border bg-surface-2 px-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-fg",
					children: "Signature"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-[11px] text-subtle",
					children: signatureMode === "auto" ? "From name" : "Drawn"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					type: "button",
					size: "sm",
					variant: "ghost",
					onClick: () => {
						setSignatureMode("auto");
						setDrawnSignatureUrl(null);
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PenLine, {}), " Auto"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SignaturePad, {})
		]
	});
}
function CameraCapture({ onCapture }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	const videoRef = (0, import_react.useRef)(null);
	const streamRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		if (!open) return;
		let cancelled = false;
		(async () => {
			try {
				const stream = await navigator.mediaDevices.getUserMedia({
					video: { facingMode: "user" },
					audio: false
				});
				if (cancelled) {
					stream.getTracks().forEach((t) => t.stop());
					return;
				}
				streamRef.current = stream;
				if (videoRef.current) {
					videoRef.current.srcObject = stream;
					await videoRef.current.play();
				}
			} catch {
				toast("Camera is blocked in this preview");
				setOpen(false);
			}
		})();
		return () => {
			cancelled = true;
			streamRef.current?.getTracks().forEach((t) => t.stop());
			streamRef.current = null;
		};
	}, [open]);
	function snap() {
		const video = videoRef.current;
		if (!video) return;
		const canvas = document.createElement("canvas");
		canvas.width = 900;
		canvas.height = 1200;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;
		const vw = video.videoWidth;
		const vh = video.videoHeight;
		const r = 3 / 4;
		let sx = 0;
		let sy = 0;
		let sw = vw;
		let sh = vh;
		if (vw / vh > r) {
			sw = vh * r;
			sx = (vw - sw) / 2;
		} else {
			sh = vw / r;
			sy = (vh - sh) / 2;
		}
		ctx.drawImage(video, sx, sy, sw, sh, 0, 0, 900, 1200);
		onCapture(canvas.toDataURL("image/jpeg", .92));
		setOpen(false);
		toast("Portrait captured");
	}
	if (!open) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
		type: "button",
		size: "sm",
		variant: "secondary",
		onClick: () => setOpen(true),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Camera, {}), " Camera"]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "col-span-full overflow-hidden rounded-lg border border-border bg-surface-2 p-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
			ref: videoRef,
			className: "mx-auto aspect-[3/4] h-56 rounded-md bg-bg object-cover",
			playsInline: true,
			muted: true
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-3 flex gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "button",
				size: "sm",
				onClick: snap,
				children: "Capture"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "button",
				size: "sm",
				variant: "outline",
				onClick: () => setOpen(false),
				children: "Cancel"
			})]
		})]
	});
}
function SignaturePad() {
	const canvasRef = (0, import_react.useRef)(null);
	const drawing = (0, import_react.useRef)(false);
	const setDrawnSignatureUrl = useLicenseStore((s) => s.setDrawnSignatureUrl);
	(0, import_react.useEffect)(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;
		const ratio = window.devicePixelRatio || 1;
		canvas.width = 600 * ratio;
		canvas.height = 140 * ratio;
		ctx.scale(ratio, ratio);
		ctx.lineWidth = 2;
		ctx.lineCap = "round";
		ctx.strokeStyle = "#1a2744";
	}, []);
	function pos(e) {
		const rect = e.currentTarget.getBoundingClientRect();
		return {
			x: e.clientX - rect.left,
			y: e.clientY - rect.top
		};
	}
	function commit() {
		const canvas = canvasRef.current;
		if (!canvas) return;
		setDrawnSignatureUrl(canvas.toDataURL("image/png"));
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mb-1.5 text-sm text-fg",
			children: "Draw signature"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
			ref: canvasRef,
			className: "h-[88px] w-full touch-none rounded-md border border-border bg-paper",
			onPointerDown: (e) => {
				drawing.current = true;
				const ctx = e.currentTarget.getContext("2d");
				if (!ctx) return;
				const p = pos(e);
				ctx.beginPath();
				ctx.moveTo(p.x, p.y);
				e.currentTarget.setPointerCapture(e.pointerId);
			},
			onPointerMove: (e) => {
				if (!drawing.current) return;
				const ctx = e.currentTarget.getContext("2d");
				if (!ctx) return;
				const p = pos(e);
				ctx.lineTo(p.x, p.y);
				ctx.stroke();
			},
			onPointerUp: () => {
				drawing.current = false;
				commit();
			}
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
			type: "button",
			size: "sm",
			variant: "ghost",
			className: "mt-2",
			onClick: () => {
				const canvas = canvasRef.current;
				const ctx = canvas?.getContext("2d");
				if (!canvas || !ctx) return;
				ctx.clearRect(0, 0, canvas.width, canvas.height);
				setDrawnSignatureUrl(null);
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eraser, {}), " Clear signature"]
		})
	] });
}
function Input({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		className: cn("flex h-11 w-full rounded-md border border-border bg-surface-2 px-3 text-sm text-fg shadow-none outline-none transition-[border-color,box-shadow] duration-[var(--motion-quick)] placeholder:text-subtle focus-visible:border-border-strong focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-40", className),
		...props
	});
}
var Tabs = Root2$1;
function TabsList({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, {
		className: cn("inline-flex h-11 w-full items-center gap-1 rounded-lg bg-surface-2 p-1 text-muted", className),
		...props
	});
}
function TabsTrigger({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trigger$1, {
		className: cn("inline-flex h-9 flex-1 items-center justify-center rounded-md px-3 text-xs font-medium tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-40 data-[state=active]:bg-surface data-[state=active]:text-fg data-[state=active]:shadow-sm", className),
		...props
	});
}
function TabsContent({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content, {
		className: cn("mt-4 outline-none", className),
		...props
	});
}
function LicenseForm() {
	const form = useLicenseStore((s) => s.form);
	const setForm = useLicenseStore((s) => s.setForm);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
		defaultValue: "identity",
		className: "w-full",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
				className: "flex h-auto min-h-11 w-full flex-wrap justify-start gap-1",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
						value: "identity",
						className: "flex-none px-3",
						children: "Identity"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
						value: "address",
						className: "flex-none px-3",
						children: "Address"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
						value: "credential",
						className: "flex-none px-3",
						children: "License"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
						value: "physical",
						className: "flex-none px-3",
						children: "Physical"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
						value: "photo",
						className: "flex-none px-3",
						children: "Photo"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
						value: "symbol",
						className: "flex-none px-3",
						children: "Symbol"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
				value: "identity",
				className: "grid grid-cols-1 gap-3 sm:grid-cols-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Family name",
						htmlFor: "familyName",
						hint: "DCS",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "familyName",
							autoComplete: "off",
							value: form.familyName,
							onChange: (e) => setForm({ familyName: e.target.value })
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "First name",
						htmlFor: "firstName",
						hint: "DAC",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "firstName",
							autoComplete: "off",
							value: form.firstName,
							onChange: (e) => setForm({ firstName: e.target.value })
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Middle name",
						htmlFor: "middleName",
						hint: "DAD · NONE if blank",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "middleName",
							autoComplete: "off",
							value: form.middleName,
							onChange: (e) => setForm({ middleName: e.target.value })
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Suffix",
						htmlFor: "suffix",
						hint: "DCU optional",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "suffix",
							autoComplete: "off",
							value: form.suffix,
							onChange: (e) => setForm({ suffix: e.target.value })
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Date of birth",
						htmlFor: "dob",
						hint: "DBB",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "dob",
							type: "date",
							value: form.dob,
							onChange: (e) => setForm({ dob: e.target.value })
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Sex",
						hint: "DBC",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: form.sex,
							onValueChange: (sex) => setForm({ sex }),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
								"aria-label": "Sex",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "1",
									children: "Male (1)"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "2",
									children: "Female (2)"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "9",
									children: "Not specified (9)"
								})
							] })]
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
				value: "address",
				className: "grid grid-cols-1 gap-3 sm:grid-cols-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Street",
						htmlFor: "street",
						hint: "DAG",
						className: "sm:col-span-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "street",
							value: form.street,
							onChange: (e) => setForm({ street: e.target.value })
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Street 2",
						htmlFor: "street2",
						hint: "DAH optional",
						className: "sm:col-span-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "street2",
							value: form.street2,
							onChange: (e) => setForm({ street2: e.target.value })
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "City",
						htmlFor: "city",
						hint: "DAI",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "city",
							value: form.city,
							onChange: (e) => setForm({ city: e.target.value })
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Postal code",
						htmlFor: "postal",
						hint: "DAK · padded to 11",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "postal",
							inputMode: "numeric",
							value: form.postal,
							onChange: (e) => setForm({ postal: e.target.value })
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
				value: "credential",
				className: "grid grid-cols-1 gap-3 sm:grid-cols-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Document",
						hint: "Subfile type",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: form.documentKind,
							onValueChange: (documentKind) => setForm({
								documentKind,
								vehicleClass: documentKind === "ID" ? "NONE" : form.vehicleClass
							}),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
								"aria-label": "Document type",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "DL",
								children: "Driver license"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "ID",
								children: "Identification card"
							})] })]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Customer ID / license no.",
						htmlFor: "licenseNumber",
						hint: "DAQ",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "licenseNumber",
							className: "font-mono uppercase",
							value: form.licenseNumber,
							onChange: (e) => setForm({ licenseNumber: e.target.value })
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Vehicle class",
						htmlFor: "vehicleClass",
						hint: "DCA",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "vehicleClass",
							className: "font-mono uppercase",
							value: form.vehicleClass,
							onChange: (e) => setForm({ vehicleClass: e.target.value })
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Restrictions",
						htmlFor: "restrictions",
						hint: "DCB",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "restrictions",
							className: "font-mono uppercase",
							value: form.restrictions,
							onChange: (e) => setForm({ restrictions: e.target.value })
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Endorsements",
						htmlFor: "endorsements",
						hint: "DCD",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "endorsements",
							className: "font-mono uppercase",
							value: form.endorsements,
							onChange: (e) => setForm({ endorsements: e.target.value })
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "REAL ID",
						hint: "DDA",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: form.compliance,
							onValueChange: (compliance) => setForm({ compliance }),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
								"aria-label": "REAL ID compliance",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "F",
									children: "Fully compliant (F)"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "N",
									children: "Non-compliant (N)"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "M",
									children: "Materially compliant (M)"
								})
							] })]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Issue date",
						htmlFor: "issueDate",
						hint: "DBD",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "issueDate",
							type: "date",
							value: form.issueDate,
							onChange: (e) => setForm({ issueDate: e.target.value })
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Expiration",
						htmlFor: "expDate",
						hint: "DBA",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "expDate",
							type: "date",
							value: form.expDate,
							onChange: (e) => setForm({ expDate: e.target.value })
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Document discriminator",
						htmlFor: "discriminator",
						hint: "DCF",
						className: "sm:col-span-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "discriminator",
							className: "font-mono",
							value: form.discriminator,
							onChange: (e) => setForm({ discriminator: e.target.value })
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Inventory control",
						htmlFor: "inventory",
						hint: "DCK",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "inventory",
							className: "font-mono",
							value: form.inventory,
							onChange: (e) => setForm({ inventory: e.target.value })
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Card revision",
						htmlFor: "cardRevision",
						hint: "DDB",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "cardRevision",
							type: "date",
							value: form.cardRevision,
							onChange: (e) => setForm({ cardRevision: e.target.value })
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleRow, {
						label: "Limited duration",
						hint: "DDD",
						checked: form.limitedDuration,
						onCheckedChange: (limitedDuration) => setForm({ limitedDuration })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
				value: "physical",
				className: "grid grid-cols-1 gap-3 sm:grid-cols-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Height",
						htmlFor: "height",
						hint: "DAU · 068 in or 5'8",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "height",
							value: form.height,
							onChange: (e) => setForm({ height: e.target.value })
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Weight (lb)",
						htmlFor: "weightLbs",
						hint: "DAW",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "weightLbs",
							inputMode: "numeric",
							value: form.weightLbs,
							onChange: (e) => setForm({ weightLbs: e.target.value })
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Eyes",
						hint: "DAY",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: form.eyes,
							onValueChange: (eyes) => setForm({ eyes }),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
								"aria-label": "Eye color",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: EYE_COLORS.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem, {
								value: c.code,
								children: [
									c.label,
									" (",
									c.code,
									")"
								]
							}, c.code)) })]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Hair",
						hint: "DAZ",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: form.hair,
							onValueChange: (hair) => setForm({ hair }),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
								"aria-label": "Hair color",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: HAIR_COLORS.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem, {
								value: c.code,
								children: [
									c.label,
									" (",
									c.code,
									")"
								]
							}, c.code)) })]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleRow, {
						label: "Organ donor",
						hint: "DDH",
						checked: form.organDonor,
						onCheckedChange: (organDonor) => setForm({ organDonor })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleRow, {
						label: "Veteran",
						hint: "DDI",
						checked: form.veteran,
						onCheckedChange: (veteran) => setForm({ veteran })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
				value: "photo",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PortraitFields, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
				value: "symbol",
				className: "grid grid-cols-1 gap-3 sm:grid-cols-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "AAMVA version",
						hint: "Header",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: String(form.aamvaVersion),
							onValueChange: (v) => setForm({ aamvaVersion: Number(v) }),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
								"aria-label": "AAMVA version",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: [
								["4", "04 · 2009"],
								["8", "08 · 2013"],
								["9", "09 · 2016"],
								["10", "10 · 2020"]
							].map(([v, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: v,
								children: label
							}, v)) })]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Jurisdiction version",
						htmlFor: "jurisdictionVersion",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "jurisdictionVersion",
							inputMode: "numeric",
							value: String(form.jurisdictionVersion),
							onChange: (e) => setForm({ jurisdictionVersion: Number.parseInt(e.target.value || "0", 10) || 0 })
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "PDF417 columns",
						htmlFor: "pdf417Columns",
						hint: "AAMVA typical: 13",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "pdf417Columns",
							type: "number",
							min: 6,
							max: 30,
							value: form.pdf417Columns,
							onChange: (e) => setForm({ pdf417Columns: Number.parseInt(e.target.value, 10) || 13 })
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Error correction",
						htmlFor: "pdf417EcLevel",
						hint: "AAMVA typical: 5",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "pdf417EcLevel",
							type: "number",
							min: 0,
							max: 8,
							value: form.pdf417EcLevel,
							onChange: (e) => setForm({ pdf417EcLevel: Number.parseInt(e.target.value, 10) || 5 })
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleRow, {
						label: "Jurisdiction Z-subfile",
						hint: "Z + state initial",
						checked: form.includeJurisdictionSubfile,
						onCheckedChange: (includeJurisdictionSubfile) => setForm({ includeJurisdictionSubfile })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleRow, {
						label: "Compact PDF417",
						hint: "Truncated stop pattern",
						checked: form.compactPdf417,
						onCheckedChange: (compactPdf417) => setForm({ compactPdf417 })
					})
				]
			})
		]
	});
}
function ToggleRow({ label, hint, checked, onCheckedChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-11 items-center justify-between gap-3 rounded-md border border-border bg-surface-2 px-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-fg",
				children: label
			}), hint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-mono text-[11px] text-subtle",
				children: hint
			}) : null]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
			checked,
			onCheckedChange,
			"aria-label": label
		})]
	});
}
async function loadBwip() {
	const mod = await import("../_libs/bwip-js.mjs").then((n) => n.t);
	return mod.default ?? mod;
}
function pdf417Opts(text, opts) {
	return {
		bcid: opts.compact ? "pdf417compact" : "pdf417",
		text,
		columns: opts.columns,
		securitylevel: opts.ecLevel,
		scale: opts.scale ?? 4,
		rowmult: 4,
		padding: 12,
		binarytext: true,
		parse: false,
		backgroundcolor: opts.backgroundcolor ?? "F4F1EA",
		barcolor: opts.barcolor ?? "0B0C0E"
	};
}
async function renderPdf417(canvas, text, opts) {
	await (await loadBwip()).toCanvas(canvas, pdf417Opts(text, opts));
}
async function renderQr(canvas, text) {
	await (await loadBwip()).toCanvas(canvas, {
		bcid: "qrcode",
		text,
		scale: 3,
		padding: 10,
		eclevel: "M",
		binarytext: true,
		parse: false,
		backgroundcolor: "F4F1EA",
		barcolor: "0B0C0E"
	});
}
async function pdf417Svg(text, opts) {
	return (await loadBwip()).toSVG(pdf417Opts(text, opts));
}
async function decodePdf417Canvas(canvas) {
	try {
		const zxingMod = await import("../_libs/ts-custom-error+zxing__library.mjs").then((n) => n.t);
		const zxing = zxingMod.default ?? zxingMod;
		const ctx = canvas.getContext("2d");
		if (!ctx) return null;
		const { width, height } = canvas;
		if (!width || !height) return null;
		const img = ctx.getImageData(0, 0, width, height);
		const luminances = new Uint8ClampedArray(width * height);
		for (let i = 0; i < width * height; i++) {
			const o = i * 4;
			luminances[i] = (img.data[o] * 299 + img.data[o + 1] * 587 + img.data[o + 2] * 114) / 1e3;
		}
		const source = new zxing.RGBLuminanceSource(luminances, width, height);
		const bitmap = new zxing.BinaryBitmap(new zxing.HybridBinarizer(source));
		const reader = new zxing.PDF417Reader();
		const hints = /* @__PURE__ */ new Map();
		hints.set(zxing.DecodeHintType.TRY_HARDER, true);
		hints.set(zxing.DecodeHintType.POSSIBLE_FORMATS, [zxing.BarcodeFormat.PDF_417]);
		hints.set(zxing.DecodeHintType.CHARACTER_SET, "ISO-8859-1");
		return reader.decode(bitmap, hints).getText();
	} catch {
		return null;
	}
}
function downloadCanvas(canvas, filename) {
	const a = document.createElement("a");
	a.href = canvas.toDataURL("image/png");
	a.download = filename;
	a.click();
}
function downloadText(text, filename) {
	const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
	const a = document.createElement("a");
	a.href = URL.createObjectURL(blob);
	a.download = filename;
	a.click();
	URL.revokeObjectURL(a.href);
}
function downloadSvg(svg, filename) {
	const blob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
	const a = document.createElement("a");
	a.href = URL.createObjectURL(blob);
	a.download = filename;
	a.click();
	URL.revokeObjectURL(a.href);
}
function Textarea({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		className: cn("flex min-h-32 w-full rounded-md border border-border bg-surface-2 px-3 py-2 font-mono text-xs leading-relaxed text-fg outline-none transition-[border-color] duration-[var(--motion-quick)] placeholder:text-subtle focus-visible:border-border-strong focus-visible:ring-2 focus-visible:ring-ring", className),
		...props
	});
}
var badgeVariants = cva("inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium tracking-wide", {
	variants: { variant: {
		default: "bg-surface-2 text-muted border border-border",
		pass: "bg-pass/15 text-pass",
		fail: "bg-fail/15 text-fail",
		warn: "bg-warn/15 text-warn",
		accent: "bg-accent text-accent-fg"
	} },
	defaultVariants: { variant: "default" }
});
function Badge({ className, variant, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn(badgeVariants({ variant }), className),
		...props
	});
}
function VerifyPanel({ payload, decoded }) {
	const form = useLicenseStore((s) => s.form);
	const [showPasses, setShowPasses] = (0, import_react.useState)(false);
	const report = (0, import_react.useMemo)(() => {
		const base = verifyPayload(payload, form);
		if (decoded === void 0) return base;
		const extra = decoded ? decoded === payload ? {
			id: "image-roundtrip",
			label: "PDF417 image round-trip",
			severity: "pass",
			detail: "ZXing recovered the exact AAMVA payload from the rendered symbol"
		} : {
			id: "image-roundtrip",
			label: "PDF417 image round-trip",
			severity: "warn",
			detail: "Symbol decoded but the bytes differ from the encoder output"
		} : {
			id: "image-roundtrip",
			label: "PDF417 image round-trip",
			severity: "warn",
			detail: "Could not decode the PNG in-browser. The symbol is still AAMVA-structured; try a hardware scanner."
		};
		const checks = [...base.checks, extra];
		return {
			...base,
			checks,
			passed: checks.filter((c) => c.severity === "pass").length,
			failed: checks.filter((c) => c.severity === "fail").length,
			warnings: checks.filter((c) => c.severity === "warn").length
		};
	}, [
		payload,
		form,
		decoded
	]);
	const overall = report.failed ? "fail" : report.warnings ? "warn" : "pass";
	const notable = report.checks.filter((c) => c.severity !== "pass");
	const visible = showPasses ? report.checks : notable.length ? notable : report.checks.slice(0, 6);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-end justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-medium tracking-wide text-muted",
					children: "Annex D report"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 font-mono text-2xl tabular-nums text-fg",
					children: [report.passed, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-subtle",
						children: ["/", report.checks.length]
					})]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
					variant: overall,
					children: report.failed ? `${report.failed} failed` : report.warnings ? `${report.warnings} warnings` : "All checks passed"
				})]
			}),
			report.scanner ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScannerCard, { data: report.scanner }) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "overflow-hidden rounded-lg border border-border",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "max-h-72 divide-y divide-border overflow-y-auto",
					children: visible.map((check) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex gap-3 bg-surface-2/60 px-3 py-2.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SeverityDot, { severity: check.severity }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-fg",
								children: check.label
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "truncate font-mono text-[11px] text-subtle",
								children: check.detail
							})]
						})]
					}, check.id))
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "border-t border-border bg-surface-2 px-2 py-1.5",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "sm",
						className: "h-8 w-full text-xs",
						onClick: () => setShowPasses((v) => !v),
						children: showPasses ? "Hide passing checks" : `Show all ${report.checks.length} checks`
					})
				})]
			})
		]
	});
}
function ScannerCard({ data }) {
	const rows = [
		["Name", data.fullName],
		["ID", data.licenseNumber],
		["DOB", data.dob],
		["Age", data.age === null ? "—" : String(data.age)],
		["Expires", data.expDate],
		["Issued", data.issueDate],
		["Sex", data.sex],
		["Height", data.height],
		["Eyes", data.eyes],
		["Address", data.address],
		["Jurisdiction", data.jurisdiction],
		["IIN", data.iin],
		["REAL ID", data.realId]
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-lg border border-border bg-surface-2 p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-3 flex flex-wrap items-center gap-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-medium tracking-wide text-muted",
					children: "Scanner extract"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
					variant: data.expired ? "fail" : "pass",
					children: data.expired ? "Expired" : "Unexpired"
				}),
				data.under21 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
					variant: "warn",
					children: "Under 21"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
					variant: "pass",
					children: "21+"
				}),
				data.organDonor ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: "Donor" }) : null,
				data.veteran ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: "Veteran" }) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, { children: [
					data.documentKind,
					" · v",
					String(data.aamvaVersion).padStart(2, "0")
				] })
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
			className: "grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2",
			children: rows.map(([k, v]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
					className: "text-[11px] text-subtle",
					children: k
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
					className: "truncate font-mono text-sm text-fg",
					children: v || "—"
				})]
			}, k))
		})]
	});
}
function SeverityDot({ severity }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("mt-1 size-2 shrink-0 rounded-full", severity === "pass" && "bg-pass", severity === "fail" && "bg-fail", severity === "warn" && "bg-warn"),
		"aria-hidden": true
	});
}
function BarcodePanel() {
	const form = useLicenseStore((s) => s.form);
	const showQr = useLicenseStore((s) => s.showQr);
	const setShowQr = useLicenseStore((s) => s.setShowQr);
	const pastedScan = useLicenseStore((s) => s.pastedScan);
	const setPastedScan = useLicenseStore((s) => s.setPastedScan);
	const payload = (0, import_react.useMemo)(() => encodeAamva(form), [form]).payload;
	const pdfCanvas = (0, import_react.useRef)(null);
	const qrCanvas = (0, import_react.useRef)(null);
	const [renderError, setRenderError] = (0, import_react.useState)(null);
	const [decoded, setDecoded] = (0, import_react.useState)(void 0);
	const j = JURISDICTION_BY_CODE[form.jurisdictionCode];
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		setDecoded(void 0);
		(async () => {
			try {
				if (pdfCanvas.current) {
					await renderPdf417(pdfCanvas.current, payload, {
						columns: form.pdf417Columns,
						ecLevel: form.pdf417EcLevel,
						compact: form.compactPdf417,
						scale: 3
					});
					if (!cancelled && pdfCanvas.current) {
						const text = await decodePdf417Canvas(pdfCanvas.current);
						if (!cancelled) setDecoded(text);
					}
				}
				if (showQr && qrCanvas.current) await renderQr(qrCanvas.current, payload);
				if (!cancelled) setRenderError(null);
			} catch (err) {
				if (!cancelled) {
					setRenderError(err instanceof Error ? err.message : "Could not render barcode");
					setDecoded(null);
				}
			}
		})();
		return () => {
			cancelled = true;
		};
	}, [
		payload,
		form.pdf417Columns,
		form.pdf417EcLevel,
		form.compactPdf417,
		showQr
	]);
	const stem = `annexd-${form.jurisdictionCode.toLowerCase()}-${form.documentKind.toLowerCase()}-specimen`;
	async function onDownloadPng() {
		if (!pdfCanvas.current) return;
		downloadCanvas(pdfCanvas.current, `${stem}.png`);
		toast("PNG saved");
	}
	async function onDownloadSvg() {
		downloadSvg(await pdf417Svg(payload, {
			columns: form.pdf417Columns,
			ecLevel: form.pdf417EcLevel,
			compact: form.compactPdf417
		}), `${stem}.svg`);
		toast("SVG saved");
	}
	async function onCopy() {
		await navigator.clipboard.writeText(payload);
		toast("AAMVA payload copied");
	}
	function onDownloadRaw() {
		downloadText(payload, `${stem}.txt`);
		toast("Raw payload saved");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "overflow-hidden rounded-xl border border-border bg-paper text-ink",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between gap-3 border-b border-ink/10 px-4 py-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-[11px] tracking-[0.18em] text-ink/50",
							children: "AAMVA PDF417 · SPECIMEN"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-0.5 text-sm font-medium",
							children: [
								j?.name,
								" ",
								form.documentKind,
								" · IIN ",
								j?.iin
							]
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "font-mono text-[11px] text-ink/50",
							children: [
								form.pdf417Columns,
								" col · EC",
								form.pdf417EcLevel
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "bg-paper px-3 py-4",
						children: renderError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "px-2 py-8 text-center text-sm text-fail",
							children: renderError
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
							ref: pdfCanvas,
							className: "mx-auto block h-auto max-h-52 w-full max-w-full",
							"aria-label": "PDF417 barcode"
						})
					}),
					showQr ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex justify-center border-t border-ink/10 bg-paper px-3 py-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
							ref: qrCanvas,
							className: "size-44 object-contain",
							"aria-label": "QR code of AAMVA payload"
						})
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between gap-3 border-t border-ink/10 px-4 py-2.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "font-mono text-[11px] text-ink/50",
							children: [payload.length, " bytes · not a government document"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScanStatus, {
							decoded,
							payload
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "sm",
						onClick: onDownloadPng,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, {}), " PNG"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						variant: "secondary",
						onClick: onDownloadSvg,
						children: "SVG"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						variant: "secondary",
						onClick: onDownloadRaw,
						children: "Raw"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "sm",
						variant: "outline",
						onClick: onCopy,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {}), " Copy"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex h-9 items-center gap-2 rounded-md border border-border bg-surface-2 px-3 text-xs",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QrCode, { className: "size-3.5 text-muted" }),
							"QR",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
								checked: showQr,
								onCheckedChange: setShowQr,
								"aria-label": "Show QR code"
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
				defaultValue: "verify",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							value: "verify",
							children: "Verify"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							value: "raw",
							children: "Raw AAMVA"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							value: "scan",
							children: "Paste scan"
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "verify",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VerifyPanel, {
							payload,
							decoded
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "raw",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
							className: "max-h-80 overflow-auto rounded-lg border border-border bg-surface-2 p-3 font-mono text-[11px] leading-relaxed text-muted",
							children: visiblePayload(payload)
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
						value: "scan",
						className: "flex flex-col gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted",
								children: "Paste a string from a hardware scanner or another generator. Control characters (RS, CR, LF) are kept."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								value: pastedScan,
								onChange: (e) => setPastedScan(e.target.value),
								placeholder: "@ then ANSI header…",
								spellCheck: false
							}),
							pastedScan.trim() ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VerifyPanel, { payload: pastedScan }) : null
						]
					})
				]
			})
		]
	});
}
function ScanStatus({ decoded, payload }) {
	if (decoded === void 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "font-mono text-[11px] text-ink/40",
		children: "decoding…"
	});
	if (decoded && decoded === payload) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: "inline-flex items-center gap-1 font-mono text-[11px] text-pass",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3" }), " image round-trip"]
	});
	if (decoded) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "font-mono text-[11px] text-warn",
		children: "decoded, payload differs"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "font-mono text-[11px] text-ink/40",
		children: "image decode pending"
	});
}
function theme(code, p) {
	return {
		code,
		agency: p.agency,
		titleDl: p.titleDl ?? "DRIVER LICENSE",
		titleId: p.titleId ?? "IDENTIFICATION CARD",
		nickname: p.nickname,
		header: p.header,
		headerInk: p.headerInk ?? "#F6F3EB",
		accent: p.accent,
		panel: p.panel ?? "#E7EDF4",
		ground: p.ground ?? "#F3F0E8",
		ink: p.ink ?? "#12151A",
		muted: p.muted ?? "#4C5560",
		gold: p.gold ?? "#C4A35A",
		motif: p.motif
	};
}
var CARD_THEMES = Object.fromEntries(Object.entries({
	AL: {
		agency: "STATE OF ALABAMA",
		nickname: "Heart of Dixie",
		header: "#9E1B32",
		accent: "#828A8F",
		motif: "star"
	},
	AK: {
		agency: "STATE OF ALASKA",
		nickname: "The Last Frontier",
		header: "#0A3161",
		accent: "#C5A572",
		motif: "compass",
		gold: "#D4B36A"
	},
	AZ: {
		agency: "STATE OF ARIZONA",
		nickname: "Grand Canyon State",
		header: "#7A2E0E",
		accent: "#E87722",
		motif: "cactus",
		panel: "#F3E4D4"
	},
	AR: {
		agency: "STATE OF ARKANSAS",
		nickname: "The Natural State",
		header: "#9E0B0F",
		accent: "#1A4480",
		motif: "diamond"
	},
	CA: {
		agency: "STATE OF CALIFORNIA",
		nickname: "The Golden State",
		header: "#1B4D3E",
		accent: "#C4A35A",
		motif: "bear",
		titleDl: "DRIVER LICENSE",
		panel: "#E4EEE8"
	},
	CO: {
		agency: "STATE OF COLORADO",
		nickname: "Centennial State",
		header: "#1C3D73",
		accent: "#BF0A30",
		motif: "sun"
	},
	CT: {
		agency: "STATE OF CONNECTICUT",
		nickname: "The Constitution State",
		header: "#12325A",
		accent: "#C4A35A",
		motif: "tree"
	},
	DE: {
		agency: "STATE OF DELAWARE",
		nickname: "The First State",
		header: "#163A6B",
		accent: "#C4A35A",
		motif: "diamond"
	},
	DC: {
		agency: "DISTRICT OF COLUMBIA",
		nickname: "Federal City",
		header: "#C8102E",
		accent: "#1A1A1A",
		motif: "star",
		titleDl: "DRIVER LICENSE"
	},
	FL: {
		agency: "STATE OF FLORIDA",
		nickname: "Sunshine State",
		header: "#0021A5",
		accent: "#FA4616",
		motif: "sun",
		panel: "#E6ECF8"
	},
	GA: {
		agency: "STATE OF GEORGIA",
		nickname: "Peach State",
		header: "#BA0C2F",
		accent: "#F2A900",
		motif: "peach"
	},
	HI: {
		agency: "STATE OF HAWAII",
		nickname: "Aloha State",
		header: "#1D4E89",
		accent: "#F5C518",
		motif: "sun"
	},
	ID: {
		agency: "STATE OF IDAHO",
		nickname: "Gem State",
		header: "#3D5B2F",
		accent: "#C4A35A",
		motif: "mountain"
	},
	IL: {
		agency: "STATE OF ILLINOIS",
		nickname: "Prairie State",
		header: "#1E4B8E",
		accent: "#C8102E",
		motif: "star"
	},
	IN: {
		agency: "STATE OF INDIANA",
		nickname: "Crossroads of America",
		header: "#0F3B73",
		accent: "#C4A35A",
		motif: "star"
	},
	IA: {
		agency: "STATE OF IOWA",
		nickname: "Hawkeye State",
		header: "#1A365D",
		accent: "#C4A35A",
		motif: "wheat"
	},
	KS: {
		agency: "STATE OF KANSAS",
		nickname: "Sunflower State",
		header: "#002868",
		accent: "#FFC72C",
		motif: "sun",
		gold: "#E0B01D"
	},
	KY: {
		agency: "COMMONWEALTH OF KENTUCKY",
		nickname: "Bluegrass State",
		header: "#183661",
		accent: "#C4A35A",
		motif: "horse"
	},
	LA: {
		agency: "STATE OF LOUISIANA",
		nickname: "Pelican State",
		header: "#3C1E5B",
		accent: "#F9AD1D",
		motif: "pelican",
		gold: "#F9AD1D"
	},
	ME: {
		agency: "STATE OF MAINE",
		nickname: "Vacationland",
		header: "#1C3A4F",
		accent: "#3D6B4F",
		motif: "pine"
	},
	MD: {
		agency: "STATE OF MARYLAND",
		nickname: "Old Line State",
		header: "#9A0000",
		accent: "#F0B429",
		motif: "diamond",
		gold: "#F0B429"
	},
	MA: {
		agency: "COMMONWEALTH OF MASSACHUSETTS",
		nickname: "The Bay State",
		header: "#0C2D57",
		accent: "#C4A35A",
		motif: "wave"
	},
	MI: {
		agency: "STATE OF MICHIGAN",
		nickname: "Great Lakes State",
		header: "#1A4F6E",
		accent: "#C4A35A",
		motif: "wave"
	},
	MN: {
		agency: "STATE OF MINNESOTA",
		nickname: "North Star State",
		header: "#003865",
		accent: "#78BE20",
		motif: "star"
	},
	MS: {
		agency: "STATE OF MISSISSIPPI",
		nickname: "Magnolia State",
		header: "#7A1F2B",
		accent: "#C4A35A",
		motif: "star"
	},
	MO: {
		agency: "STATE OF MISSOURI",
		nickname: "Show-Me State",
		header: "#1E3A6E",
		accent: "#C8102E",
		motif: "star"
	},
	MT: {
		agency: "STATE OF MONTANA",
		nickname: "Treasure State",
		header: "#4A3728",
		accent: "#C4A35A",
		motif: "mountain"
	},
	NE: {
		agency: "STATE OF NEBRASKA",
		nickname: "Cornhusker State",
		header: "#7A1F2B",
		accent: "#F0B429",
		motif: "wheat"
	},
	NV: {
		agency: "STATE OF NEVADA",
		nickname: "Silver State",
		header: "#2C3E50",
		accent: "#A8B2BD",
		motif: "diamond",
		gold: "#C0C6CE"
	},
	NH: {
		agency: "STATE OF NEW HAMPSHIRE",
		nickname: "Live Free or Die",
		header: "#163A5F",
		accent: "#C4A35A",
		motif: "mountain"
	},
	NJ: {
		agency: "STATE OF NEW JERSEY",
		nickname: "The Garden State",
		header: "#2F3B2E",
		accent: "#C4A35A",
		motif: "wave",
		panel: "#E8E6D8"
	},
	NM: {
		agency: "STATE OF NEW MEXICO",
		nickname: "Land of Enchantment",
		header: "#8C1D18",
		accent: "#FFD100",
		motif: "zia",
		gold: "#FFD100"
	},
	NY: {
		agency: "STATE OF NEW YORK",
		nickname: "Excelsior",
		header: "#002868",
		accent: "#C4A35A",
		motif: "star",
		titleDl: "DRIVER LICENSE"
	},
	NC: {
		agency: "STATE OF NORTH CAROLINA",
		nickname: "Tar Heel State",
		header: "#4B0E1E",
		accent: "#A7C1D9",
		motif: "star"
	},
	ND: {
		agency: "STATE OF NORTH DAKOTA",
		nickname: "Peace Garden State",
		header: "#0F4C3A",
		accent: "#C4A35A",
		motif: "wheat"
	},
	OH: {
		agency: "STATE OF OHIO",
		nickname: "The Buckeye State",
		header: "#8C1D18",
		accent: "#C4A35A",
		motif: "star"
	},
	OK: {
		agency: "STATE OF OKLAHOMA",
		nickname: "Native America",
		header: "#00843D",
		accent: "#C4A35A",
		motif: "star"
	},
	OR: {
		agency: "STATE OF OREGON",
		nickname: "Beaver State",
		header: "#1F4D3A",
		accent: "#C4A35A",
		motif: "tree"
	},
	PA: {
		agency: "COMMONWEALTH OF PENNSYLVANIA",
		nickname: "Keystone State",
		header: "#1A365D",
		accent: "#C4A35A",
		motif: "keystone"
	},
	RI: {
		agency: "STATE OF RHODE ISLAND",
		nickname: "Ocean State",
		header: "#0B3A6E",
		accent: "#C4A35A",
		motif: "anchor"
	},
	SC: {
		agency: "STATE OF SOUTH CAROLINA",
		nickname: "Palmetto State",
		header: "#054238",
		accent: "#C4A35A",
		motif: "palmetto"
	},
	SD: {
		agency: "STATE OF SOUTH DAKOTA",
		nickname: "Mount Rushmore State",
		header: "#1A365D",
		accent: "#C4A35A",
		motif: "mountain"
	},
	TN: {
		agency: "STATE OF TENNESSEE",
		nickname: "Volunteer State",
		header: "#1A365D",
		accent: "#FF8200",
		motif: "star"
	},
	TX: {
		agency: "STATE OF TEXAS",
		nickname: "The Lone Star State",
		header: "#111111",
		accent: "#BF0A30",
		motif: "star",
		headerInk: "#F6F3EB",
		panel: "#EDE8DC"
	},
	UT: {
		agency: "STATE OF UTAH",
		nickname: "Beehive State",
		header: "#8C1D18",
		accent: "#C4A35A",
		motif: "diamond"
	},
	VT: {
		agency: "STATE OF VERMONT",
		nickname: "Green Mountain State",
		header: "#154734",
		accent: "#C4A35A",
		motif: "pine"
	},
	VA: {
		agency: "COMMONWEALTH OF VIRGINIA",
		nickname: "Sic Semper Tyrannis",
		header: "#00297B",
		accent: "#C8102E",
		motif: "star",
		titleDl: "DRIVER'S LICENSE",
		panel: "#E4EAF6"
	},
	WA: {
		agency: "STATE OF WASHINGTON",
		nickname: "The Evergreen State",
		header: "#1A5632",
		accent: "#C4A35A",
		motif: "tree"
	},
	WV: {
		agency: "STATE OF WEST VIRGINIA",
		nickname: "Mountain State",
		header: "#1A365D",
		accent: "#C4A35A",
		motif: "mountain"
	},
	WI: {
		agency: "STATE OF WISCONSIN",
		nickname: "Badger State",
		header: "#C5050C",
		accent: "#C4A35A",
		motif: "star"
	},
	WY: {
		agency: "STATE OF WYOMING",
		nickname: "Equality State",
		header: "#4A3728",
		accent: "#C4A35A",
		motif: "bison"
	},
	PR: {
		agency: "ESTADO LIBRE ASOCIADO DE PUERTO RICO",
		nickname: "Isla del Encanto",
		header: "#004B87",
		accent: "#C8102E",
		motif: "star",
		titleDl: "LICENCIA DE CONDUCIR"
	},
	GU: {
		agency: "TERRITORY OF GUAM",
		nickname: "Tano y Tasi",
		header: "#002868",
		accent: "#BF0A30",
		motif: "star"
	},
	VI: {
		agency: "U.S. VIRGIN ISLANDS",
		nickname: "America's Caribbean",
		header: "#0B3A6E",
		accent: "#C4A35A",
		motif: "wave"
	},
	AS: {
		agency: "AMERICAN SAMOA",
		nickname: "Motu o Fiafiaga",
		header: "#0A3161",
		accent: "#C4A35A",
		motif: "compass"
	},
	MP: {
		agency: "NORTHERN MARIANA ISLANDS",
		nickname: "Håfa Adai",
		header: "#0B3A6E",
		accent: "#C4A35A",
		motif: "star"
	}
}).map(([code, row]) => [code, theme(code, row)]));
function themeFor(code) {
	return CARD_THEMES[code] ?? theme(code, {
		agency: `STATE OF ${code}`,
		nickname: "United States",
		header: "#1A365D",
		accent: "#C4A35A",
		motif: "star"
	});
}
var CR80_IN = {
	w: 3.375,
	h: 2.125
};
var DESIGN = {
	w: Math.round(CR80_IN.w * 300),
	h: Math.round(CR80_IN.h * 300)
};
function cardSize(dpi, vertical) {
	const w = Math.round(CR80_IN.w * dpi);
	const h = Math.round(CR80_IN.h * dpi);
	return vertical ? {
		w: h,
		h: w
	} : {
		w,
		h
	};
}
function displayDate(iso) {
	const p = parseIsoDate(iso);
	if (!p) return iso || "—";
	return `${p.m}/${p.d}/${p.y}`;
}
function displayHeight(raw) {
	const formatted = formatHeight(raw);
	const m = formatted.match(/^(\d{3}) in$/i);
	if (!m) return formatted;
	const inches = Number.parseInt(m[1], 10);
	const ft = Math.floor(inches / 12);
	const inn = inches % 12;
	return `${ft}'-${String(inn).padStart(2, "0")}"`;
}
function displaySex(code) {
	if (code === "1") return "M";
	if (code === "2") return "F";
	return "X";
}
function displayZip(postal) {
	const digits = postal.replace(/\D/g, "");
	if (digits.length >= 9 && digits.slice(5) !== "0000") return `${digits.slice(0, 5)}-${digits.slice(5, 9)}`;
	return digits.slice(0, 5) || postal;
}
function titleCaseName(value) {
	return value.trim().toLowerCase().replace(/\b([a-z])/g, (ch) => ch.toUpperCase());
}
function under21Until(dobIso) {
	const p = parseIsoDate(dobIso);
	if (!p) return null;
	const y = Number.parseInt(p.y, 10) + 21;
	return `${p.m}/${p.d}/${y}`;
}
function signatureText(family, first, middle) {
	return [
		titleCaseName(first),
		middle && middle.toUpperCase() !== "NONE" ? `${titleCaseName(middle).charAt(0)}.` : "",
		titleCaseName(family)
	].filter(Boolean).join(" ");
}
function renderSignatureDataUrl(name, color = "#1a2744") {
	const canvas = document.createElement("canvas");
	canvas.width = 900;
	canvas.height = 220;
	const ctx = canvas.getContext("2d");
	if (!ctx) return "";
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = color;
	ctx.font = "92px 'Great Vibes', cursive";
	ctx.textBaseline = "middle";
	ctx.fillText(name, 24, 120);
	return canvas.toDataURL("image/png");
}
function isVerticalCard(form, orientation) {
	if (orientation === "vertical") return true;
	if (orientation === "horizontal") return false;
	const age = ageOn(form.dob, todayIso());
	return age !== null && age < 21;
}
function roundRect(ctx, x, y, w, h, r) {
	const rr = Math.min(r, w / 2, h / 2);
	ctx.beginPath();
	ctx.moveTo(x + rr, y);
	ctx.arcTo(x + w, y, x + w, y + h, rr);
	ctx.arcTo(x + w, y + h, x, y + h, rr);
	ctx.arcTo(x, y + h, x, y, rr);
	ctx.arcTo(x, y, x + w, y, rr);
	ctx.closePath();
}
function seedFrom(code) {
	return [...code].reduce((n, ch) => n + ch.charCodeAt(0) * 13, 17);
}
function drawCardFront(ctx, opts) {
	const scale = (opts.dpi ?? 300) / 300;
	const vertical = opts.vertical;
	const W = vertical ? DESIGN.h : DESIGN.w;
	const H = vertical ? DESIGN.w : DESIGN.h;
	ctx.setTransform(scale, 0, 0, scale, 0, 0);
	ctx.clearRect(0, 0, W, H);
	ctx.save();
	roundRect(ctx, 0, 0, W, H, 22);
	ctx.clip();
	const theme = themeFor(opts.form.jurisdictionCode);
	paintGround(ctx, W, H, theme, opts.assets.paper, opts.form.jurisdictionCode);
	if (vertical) drawVertical(ctx, W, H, opts, theme);
	else drawHorizontal(ctx, W, H, opts, theme);
	drawSecurityOverlay(ctx, W, H, theme, opts.form);
	ctx.restore();
	ctx.save();
	roundRect(ctx, .5, .5, W - 1, H - 1, 22);
	ctx.strokeStyle = "rgba(18,21,26,0.35)";
	ctx.lineWidth = 1.2;
	ctx.stroke();
	ctx.restore();
}
function drawCardBack(ctx, opts, barcode) {
	const scale = (opts.dpi ?? 300) / 300;
	const vertical = opts.vertical;
	const W = vertical ? DESIGN.h : DESIGN.w;
	const H = vertical ? DESIGN.w : DESIGN.h;
	ctx.setTransform(scale, 0, 0, scale, 0, 0);
	ctx.clearRect(0, 0, W, H);
	ctx.save();
	roundRect(ctx, 0, 0, W, H, 22);
	ctx.clip();
	const theme = themeFor(opts.form.jurisdictionCode);
	ctx.fillStyle = "#efece4";
	ctx.fillRect(0, 0, W, H);
	if (opts.assets.paper) {
		ctx.globalAlpha = .28;
		ctx.drawImage(opts.assets.paper, 0, 0, W, H);
		ctx.globalAlpha = 1;
	}
	ctx.fillStyle = "#111111";
	ctx.fillRect(0, 18, W, 42);
	ctx.fillStyle = "rgba(255,255,255,0.18)";
	ctx.font = "11px \"IBM Plex Sans\"";
	ctx.fillText("SPECIMEN  ·  MAGNETIC STRIPE NOT ENCODED  ·  NOT A GOVERNMENT DOCUMENT", 24, 44);
	const form = opts.form;
	const j = JURISDICTION_BY_CODE[form.jurisdictionCode];
	if (barcode) {
		const maxW = vertical ? W - 48 : 520;
		const maxH = vertical ? 260 : 300;
		const ratio = barcode.width / Math.max(1, barcode.height);
		let bw = maxW;
		let bh = bw / ratio;
		if (bh > maxH) {
			bh = maxH;
			bw = bh * ratio;
		}
		ctx.fillStyle = "#ffffff";
		roundRect(ctx, 20, 74, bw + 16, bh + 16, 6);
		ctx.fill();
		ctx.drawImage(barcode, 28, 82, bw, bh);
		const rx = vertical ? 24 : Math.min(W - 280, 28 + bw + 36);
		const ry = vertical ? 82 + bh + 28 : 92;
		ctx.fillStyle = theme.header;
		ctx.font = "700 11px \"IBM Plex Sans\"";
		ctx.fillText("CUSTOMER ID", rx, ry);
		ctx.fillStyle = theme.ink;
		ctx.font = "700 18px \"IBM Plex Mono\"";
		ctx.fillText(form.licenseNumber.toUpperCase(), rx, ry + 24);
		ctx.font = "500 12px \"IBM Plex Sans\"";
		ctx.fillStyle = theme.muted;
		ctx.fillText(`${form.vehicleClass || "NONE"}  ·  REST ${form.restrictions || "NONE"}`, rx, ry + 48);
		ctx.fillText(`END ${form.endorsements || "NONE"}`, rx, ry + 66);
		ctx.fillText(form.inventory, rx, ry + 88);
		ctx.fillStyle = theme.accent;
		ctx.font = "700 11px \"IBM Plex Sans\"";
		ctx.fillText("SPECIMEN  ·  VOID FOR IDENTIFICATION", rx, ry + 112);
	}
	ctx.fillStyle = theme.ink;
	ctx.font = "600 13px \"IBM Plex Sans\"";
	ctx.fillText("PDF417  ·  AAMVA ANNEX D", 24, H - 86);
	ctx.font = "11px \"IBM Plex Mono\"";
	ctx.fillStyle = theme.muted;
	ctx.fillText(`IIN ${j?.iin ?? "------"}   ${form.jurisdictionCode} ${form.documentKind}   v${String(form.aamvaVersion).padStart(2, "0")}`, 24, H - 64);
	ctx.fillText(`DAQ ${form.licenseNumber.toUpperCase()}   DCF ${form.discriminator}`, 24, H - 46);
	ctx.font = "9px \"IBM Plex Sans\"";
	ctx.fillStyle = "rgba(18,21,26,0.55)";
	wrapText(ctx, "SPECIMEN CARD FOR SCANNER SOFTWARE QA. This image is not issued by a government agency, is not a credential, and must not be presented as identification. Security patterns are stylized and unmarked as official.", 24, H - 28, W - 48, 12);
	drawWatermark(ctx, W, H, .08);
	ctx.restore();
	ctx.save();
	roundRect(ctx, .5, .5, W - 1, H - 1, 22);
	ctx.strokeStyle = "rgba(18,21,26,0.35)";
	ctx.lineWidth = 1.2;
	ctx.stroke();
	ctx.restore();
}
function paintGround(ctx, W, H, theme, paper, code) {
	const g = ctx.createLinearGradient(0, 0, 0, H);
	g.addColorStop(0, theme.panel);
	g.addColorStop(.45, theme.ground);
	g.addColorStop(1, mix(theme.ground, theme.header, .08));
	ctx.fillStyle = g;
	ctx.fillRect(0, 0, W, H);
	if (paper) {
		ctx.globalAlpha = .38;
		ctx.drawImage(paper, 0, 0, W, H);
		ctx.globalAlpha = 1;
	}
	drawGuilloche(ctx, W, H, theme, seedFrom(code));
}
function drawHorizontal(ctx, W, H, opts, theme) {
	const form = opts.form;
	drawHeader(ctx, W, 72, theme, form);
	if (opts.assets.foil) {
		ctx.save();
		ctx.globalAlpha = .72;
		const fh = opts.assets.foil.height;
		ctx.drawImage(opts.assets.foil, 0, fh * .42, opts.assets.foil.width, fh * .12, 0, 72, W, 7);
		ctx.restore();
	} else {
		ctx.fillStyle = theme.gold;
		ctx.fillRect(0, 72, W, 5);
	}
	drawPhotoFrame(ctx, {
		x: 24,
		y: 96,
		w: 196,
		h: 262
	}, opts, theme);
	drawSignature(ctx, 24, 368, 196, 52, opts);
	drawSeal(ctx, W - 78, 150, 48, theme);
	if (opts.showGhost) drawGhost(ctx, W - 168, 320, 120, 160, opts);
	drawIdentity(ctx, 240, 98, form, theme, false);
	drawFacts(ctx, 240, 300, form, theme, false);
	drawFooter(ctx, 240, 548, W - 264, form, theme);
}
function drawVertical(ctx, W, H, opts, theme) {
	const form = opts.form;
	drawHeader(ctx, W, 92, theme, form);
	const until = under21Until(form.dob);
	const age = ageOn(form.dob, todayIso());
	const showU21 = age !== null && age < 21;
	let y = 92;
	if (showU21) {
		ctx.fillStyle = theme.accent;
		ctx.fillRect(0, 92, W, 36);
		ctx.fillStyle = "#F6F3EB";
		ctx.font = "700 14px \"IBM Plex Sans\"";
		ctx.textAlign = "center";
		ctx.fillText(until ? `UNDER 21 UNTIL ${until}` : "UNDER 21", W / 2, 116);
		ctx.textAlign = "left";
		y = 128;
	}
	const photo = {
		x: (W - 220) / 2,
		y: y + 16,
		w: 220,
		h: 292
	};
	drawPhotoFrame(ctx, photo, opts, theme);
	const afterPhoto = photo.y + photo.h + 18;
	drawIdentity(ctx, 28, afterPhoto, form, theme, true);
	drawFacts(ctx, 28, afterPhoto + 200, form, theme, true);
	drawSignature(ctx, 28, H - 130, W - 56, 52, opts);
	drawFooter(ctx, 28, H - 68, W - 56, form, theme);
}
function drawHeader(ctx, W, h, theme, form) {
	ctx.fillStyle = theme.header;
	ctx.fillRect(0, 0, W, h);
	ctx.fillStyle = "rgba(255,255,255,0.06)";
	for (let i = 0; i < 18; i++) ctx.fillRect(0, h / 18 * i, W, 1);
	const title = form.documentKind === "ID" ? theme.titleId : theme.titleDl;
	ctx.fillStyle = theme.headerInk;
	ctx.font = "600 12px \"IBM Plex Sans\"";
	ctx.fillText(theme.agency, 22, 28);
	ctx.font = "700 22px \"IBM Plex Sans\"";
	ctx.fillText(title, 22, 56);
	ctx.font = "500 11px \"IBM Plex Sans\"";
	ctx.fillStyle = mix(theme.headerInk, theme.header, .35);
	ctx.fillText(theme.nickname.toUpperCase(), 22, 72);
	if (form.compliance === "F") {
		drawRealIdMark(ctx, W - 54, 40, 16);
		ctx.fillStyle = theme.headerInk;
		ctx.font = "600 9px \"IBM Plex Sans\"";
		ctx.textAlign = "center";
		ctx.fillText("STAR", W - 54, 68);
		ctx.textAlign = "left";
	} else {
		ctx.strokeStyle = "rgba(246,243,235,0.55)";
		ctx.lineWidth = 1.4;
		ctx.strokeRect(W - 86, 18, 64, 28);
		ctx.fillStyle = theme.headerInk;
		ctx.font = "700 10px \"IBM Plex Sans\"";
		ctx.textAlign = "center";
		ctx.fillText("NOT FOR", W - 54, 30);
		ctx.fillText("FEDERAL", W - 54, 42);
		ctx.textAlign = "left";
	}
}
function drawPhotoFrame(ctx, box, opts, theme) {
	ctx.fillStyle = "#ffffff";
	roundRect(ctx, box.x - 4, box.y - 4, box.w + 8, box.h + 8, 4);
	ctx.fill();
	ctx.save();
	ctx.beginPath();
	ctx.rect(box.x, box.y, box.w, box.h);
	ctx.clip();
	if (opts.assets.portrait) coverImage(ctx, opts.assets.portrait, box.x, box.y, box.w, box.h);
	else drawFallbackPortrait(ctx, box.x, box.y, box.w, box.h, opts.form.sex);
	ctx.restore();
	ctx.strokeStyle = mix(theme.header, "#000000", .2);
	ctx.lineWidth = 1.2;
	ctx.strokeRect(box.x, box.y, box.w, box.h);
}
function drawGhost(ctx, x, y, w, h, opts) {
	ctx.save();
	ctx.globalAlpha = .18;
	ctx.beginPath();
	ctx.rect(x, y, w, h);
	ctx.clip();
	if (opts.assets.portrait) {
		ctx.filter = "grayscale(1) contrast(1.2)";
		coverImage(ctx, opts.assets.portrait, x, y, w, h);
	}
	ctx.restore();
}
function drawIdentity(ctx, x, y, form, theme, compact) {
	const family = form.familyName.trim().toUpperCase() || "—";
	const given = [
		form.firstName,
		form.middleName === "NONE" ? "" : form.middleName,
		form.suffix
	].map((s) => s.trim()).filter(Boolean).join(" ").toUpperCase();
	const cityLine = `${form.city.trim().toUpperCase()}, ${form.jurisdictionCode}  ${displayZip(form.postal)}`;
	const row = compact ? 44 : 40;
	stacked(ctx, x, y, compact ? "DLN" : "DL", form.licenseNumber.toUpperCase() || "—", theme, { font: "700 20px \"IBM Plex Mono\"" });
	stacked(ctx, x, y + row, compact ? "LN" : "LN", family, theme, { font: "700 22px \"IBM Plex Sans\"" });
	stacked(ctx, x, y + row * 2, compact ? "FN" : "FN", given || "—", theme, { font: "600 15px \"IBM Plex Sans\"" });
	stacked(ctx, x, y + row * 3, "ADD", form.street.trim().toUpperCase() || "—", theme, { font: "500 13px \"IBM Plex Sans\"" });
	ctx.fillStyle = theme.ink;
	ctx.font = "500 13px \"IBM Plex Sans\"";
	const addY = y + row * 3 + (form.street2.trim() ? 36 : 22);
	if (form.street2.trim()) ctx.fillText(form.street2.trim().toUpperCase(), x, y + row * 3 + 22);
	ctx.fillText(cityLine, x, addY);
}
function stacked(ctx, x, y, lab, value, theme, opts) {
	label(ctx, x, y, lab, theme);
	ctx.fillStyle = opts?.color ?? theme.ink;
	ctx.font = opts?.font ?? "700 16px \"IBM Plex Sans\"";
	ctx.fillText(value, x, y + 18);
}
function drawFacts(ctx, x, y, form, theme, compact) {
	const cols = [
		["DOB", displayDate(form.dob)],
		[
			"EXP",
			displayDate(form.expDate),
			theme.accent
		],
		["SEX", displaySex(form.sex)],
		["HGT", displayHeight(form.height)],
		["EYES", form.eyes],
		["HAIR", form.hair],
		["ISS", displayDate(form.issueDate)],
		["WGT", form.weightLbs ? `${form.weightLbs} lb` : "—"]
	];
	const gap = compact ? 148 : 124;
	cols.forEach((col, i) => {
		stacked(ctx, x + i % 4 * gap, y + Math.floor(i / 4) * 48, col[0], col[1], theme, {
			font: "700 14px \"IBM Plex Sans\"",
			color: col[2]
		});
	});
}
function drawFooter(ctx, x, y, w, form, theme) {
	ctx.fillStyle = mix(theme.header, theme.ground, .86);
	roundRect(ctx, x, y, w, 46, 6);
	ctx.fill();
	[
		["CLASS", form.vehicleClass || "NONE"],
		["REST", form.restrictions || "NONE"],
		["END", form.endorsements || "NONE"]
	].forEach((item, i) => {
		const cx = x + 14 + i * Math.min(150, w / 3);
		label(ctx, cx, y + 14, item[0], theme);
		ctx.fillStyle = theme.ink;
		ctx.font = "700 13px \"IBM Plex Sans\"";
		ctx.fillText(item[1].toUpperCase(), cx, y + 34);
	});
	ctx.font = "700 11px \"IBM Plex Sans\"";
	ctx.textAlign = "right";
	if (form.organDonor) {
		ctx.fillStyle = theme.accent;
		ctx.fillText("DONOR", x + w - 14, y + 20);
	}
	if (form.veteran) {
		ctx.fillStyle = theme.header;
		ctx.fillText("VETERAN", x + w - 14, y + 36);
	}
	ctx.textAlign = "left";
}
function drawSignature(ctx, x, y, w, h, opts) {
	ctx.strokeStyle = "rgba(18,21,26,0.16)";
	ctx.beginPath();
	ctx.moveTo(x, y + h - 8);
	ctx.lineTo(x + w, y + h - 8);
	ctx.stroke();
	if (opts.assets.signature) ctx.drawImage(opts.assets.signature, x, y - 6, w, h);
	ctx.fillStyle = "rgba(18,21,26,0.4)";
	ctx.font = "8px \"IBM Plex Sans\"";
	ctx.fillText("SIGNATURE", x, y + h + 6);
}
function label(ctx, x, y, text, theme) {
	ctx.fillStyle = theme.muted;
	ctx.font = "600 8px \"IBM Plex Sans\"";
	ctx.fillText(text, x, y);
}
function drawSecurityOverlay(ctx, W, H, theme, form) {
	ctx.save();
	ctx.fillStyle = mix(theme.header, "#ffffff", .82);
	ctx.font = "6px \"IBM Plex Mono\"";
	const micro = `SPECIMEN ${form.jurisdictionCode} ANNEX D NOT A GOVERNMENT DOCUMENT ${form.licenseNumber.toUpperCase()} `;
	ctx.globalAlpha = .55;
	ctx.fillText(micro.repeat(20), 8, H - 8);
	ctx.fillText(micro.repeat(20), 8, 86);
	ctx.restore();
	drawWatermark(ctx, W, H, .1);
}
function drawWatermark(ctx, W, H, alpha) {
	ctx.save();
	ctx.translate(W / 2, H / 2);
	ctx.rotate(-Math.PI / 5);
	ctx.fillStyle = `rgba(180, 28, 28, ${alpha})`;
	ctx.font = "700 64px \"IBM Plex Sans\"";
	ctx.textAlign = "center";
	ctx.textBaseline = "middle";
	ctx.fillText("SPECIMEN", 0, -18);
	ctx.font = "600 18px \"IBM Plex Sans\"";
	ctx.fillText("NOT A GOVERNMENT DOCUMENT", 0, 28);
	ctx.restore();
}
function drawGuilloche(ctx, W, H, theme, seed) {
	ctx.save();
	ctx.globalAlpha = .16;
	ctx.strokeStyle = theme.header;
	ctx.lineWidth = .7;
	for (let i = 0; i < 22; i++) {
		ctx.beginPath();
		for (let x = 0; x <= W; x += 4) {
			const y = H * .52 + Math.sin(x * .018 + i * .45 + seed) * (28 + i % 7 * 4) + Math.sin(x * .041 + i * .9) * 16;
			if (x === 0) ctx.moveTo(x, y);
			else ctx.lineTo(x, y);
		}
		ctx.stroke();
	}
	ctx.strokeStyle = theme.accent;
	ctx.globalAlpha = .1;
	for (let i = 0; i < 10; i++) {
		ctx.beginPath();
		ctx.ellipse(W * .72, H * .58, 80 + i * 14, 46 + i * 8, -.4, 0, Math.PI * 2);
		ctx.stroke();
	}
	ctx.restore();
}
function drawSeal(ctx, cx, cy, r, theme) {
	ctx.save();
	ctx.globalAlpha = .22;
	ctx.beginPath();
	ctx.arc(cx, cy, r, 0, Math.PI * 2);
	ctx.fillStyle = theme.gold;
	ctx.fill();
	ctx.lineWidth = 2;
	ctx.strokeStyle = theme.header;
	ctx.stroke();
	ctx.beginPath();
	ctx.arc(cx, cy, r - 8, 0, Math.PI * 2);
	ctx.stroke();
	ctx.fillStyle = theme.header;
	ctx.font = `700 ${Math.round(r * .42)}px "IBM Plex Sans"`;
	ctx.textAlign = "center";
	ctx.textBaseline = "middle";
	ctx.fillText(theme.code, cx, cy - 2);
	ctx.globalAlpha = .18;
	drawMotif(ctx, theme.motif, cx, cy + r + 18, 16, theme);
	ctx.restore();
}
function drawMotif(ctx, motif, x, y, s, theme) {
	ctx.fillStyle = theme.header;
	ctx.strokeStyle = theme.header;
	ctx.lineWidth = 1.4;
	ctx.beginPath();
	switch (motif) {
		case "star":
			starPath(ctx, x, y, 5, s, s / 2.4);
			ctx.fill();
			break;
		case "sun":
			ctx.arc(x, y, s * .45, 0, Math.PI * 2);
			ctx.fill();
			break;
		case "zia":
			ctx.moveTo(x - s, y);
			ctx.lineTo(x + s, y);
			ctx.moveTo(x, y - s);
			ctx.lineTo(x, y + s);
			ctx.stroke();
			break;
		case "anchor":
			ctx.moveTo(x, y - s);
			ctx.lineTo(x, y + s * .6);
			ctx.moveTo(x - s * .6, y + s * .6);
			ctx.quadraticCurveTo(x, y + s, x + s * .6, y + s * .6);
			ctx.stroke();
			break;
		case "keystone":
			ctx.moveTo(x - s * .5, y - s);
			ctx.lineTo(x + s * .5, y - s);
			ctx.lineTo(x + s, y + s);
			ctx.lineTo(x - s, y + s);
			ctx.closePath();
			ctx.fill();
			break;
		default:
			ctx.arc(x, y, s * .35, 0, Math.PI * 2);
			ctx.fill();
	}
}
function drawRealIdMark(ctx, cx, cy, r) {
	ctx.save();
	ctx.beginPath();
	ctx.arc(cx, cy, r, 0, Math.PI * 2);
	ctx.fillStyle = "#C4A35A";
	ctx.fill();
	ctx.lineWidth = 1.5;
	ctx.strokeStyle = "#F6F3EB";
	ctx.stroke();
	ctx.fillStyle = "#1A2744";
	starPath(ctx, cx, cy, 5, r * .62, r * .26);
	ctx.fill();
	ctx.restore();
}
function starPath(ctx, cx, cy, points, outer, inner) {
	ctx.beginPath();
	for (let i = 0; i < points * 2; i++) {
		const ang = i * Math.PI / points - Math.PI / 2;
		const r = i % 2 === 0 ? outer : inner;
		const x = cx + Math.cos(ang) * r;
		const y = cy + Math.sin(ang) * r;
		if (i === 0) ctx.moveTo(x, y);
		else ctx.lineTo(x, y);
	}
	ctx.closePath();
}
function coverImage(ctx, img, x, y, w, h) {
	const ir = img.width / img.height;
	const r = w / h;
	let dw = w;
	let dh = h;
	let dx = x;
	let dy = y;
	if (ir > r) {
		dw = h * ir;
		dx = x - (dw - w) / 2;
	} else {
		dh = w / ir;
		dy = y - (dh - h) / 2;
	}
	ctx.drawImage(img, dx, dy, dw, dh);
}
function mix(a, b, t) {
	const pa = hexToRgb(a);
	const pb = hexToRgb(b);
	return `rgb(${Math.round(pa[0] + (pb[0] - pa[0]) * t)},${Math.round(pa[1] + (pb[1] - pa[1]) * t)},${Math.round(pa[2] + (pb[2] - pa[2]) * t)})`;
}
function hexToRgb(hex) {
	const h = hex.replace("#", "");
	if (h.length === 3) return [
		parseInt(h[0] + h[0], 16),
		parseInt(h[1] + h[1], 16),
		parseInt(h[2] + h[2], 16)
	];
	return [
		parseInt(h.slice(0, 2), 16),
		parseInt(h.slice(2, 4), 16),
		parseInt(h.slice(4, 6), 16)
	];
}
function wrapText(ctx, text, x, y, maxW, lineH) {
	const words = text.split(" ");
	let line = "";
	let yy = y;
	for (const word of words) {
		const test = line ? `${line} ${word}` : word;
		if (ctx.measureText(test).width > maxW) {
			ctx.fillText(line, x, yy);
			line = word;
			yy += lineH;
		} else line = test;
	}
	if (line) ctx.fillText(line, x, yy);
}
var PREVIEW_DPI = 300;
var PRINT_DPI = 600;
function CardPanel() {
	const form = useLicenseStore((s) => s.form);
	const portraitUrl = useLicenseStore((s) => s.portraitUrl);
	const drawnSignatureUrl = useLicenseStore((s) => s.drawnSignatureUrl);
	const signatureMode = useLicenseStore((s) => s.signatureMode);
	const orientation = useLicenseStore((s) => s.orientation);
	const showGhost = useLicenseStore((s) => s.showGhost);
	const cardSide = useLicenseStore((s) => s.cardSide);
	const setCardSide = useLicenseStore((s) => s.setCardSide);
	const vertical = isVerticalCard(form, orientation);
	const encoded = (0, import_react.useMemo)(() => encodeAamva(form), [form]);
	const theme = themeFor(form.jurisdictionCode);
	const j = JURISDICTION_BY_CODE[form.jurisdictionCode];
	const frontRef = (0, import_react.useRef)(null);
	const backRef = (0, import_react.useRef)(null);
	const barcodeRef = (0, import_react.useRef)(null);
	const [ready, setReady] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		(async () => {
			try {
				await Promise.all([
					document.fonts.load("92px \"Great Vibes\""),
					document.fonts.load("700 22px \"IBM Plex Sans\""),
					document.fonts.ready
				]);
				const [portrait, paper, foil] = await Promise.all([
					loadImage(portraitUrl).catch(() => null),
					loadImage(PAPER_TEXTURE).catch(() => null),
					loadImage(FOIL_TEXTURE).catch(() => null)
				]);
				let signature = null;
				if (signatureMode === "drawn" && drawnSignatureUrl) signature = await loadImage(drawnSignatureUrl).catch(() => null);
				else signature = await loadImage(renderSignatureDataUrl(signatureText(form.familyName, form.firstName, form.middleName), "#1a2744")).catch(() => null);
				if (cancelled) return;
				const size = cardSize(PREVIEW_DPI, vertical);
				const opts = {
					form,
					assets: {
						portrait,
						paper,
						foil,
						signature
					},
					vertical,
					showGhost,
					dpi: PREVIEW_DPI
				};
				const front = frontRef.current;
				if (front) {
					front.width = size.w;
					front.height = size.h;
					const ctx = front.getContext("2d");
					if (ctx) drawCardFront(ctx, opts);
				}
				const barcode = barcodeRef.current;
				if (barcode) await renderPdf417(barcode, encoded.payload, {
					columns: form.pdf417Columns,
					ecLevel: form.pdf417EcLevel,
					compact: form.compactPdf417,
					scale: 2,
					backgroundcolor: "FFFFFF",
					barcolor: "000000"
				});
				const back = backRef.current;
				if (back) {
					back.width = size.w;
					back.height = size.h;
					const ctx = back.getContext("2d");
					if (ctx) drawCardBack(ctx, opts, barcode);
				}
				if (!cancelled) setReady(true);
			} catch {
				if (!cancelled) setReady(false);
			}
		})();
		return () => {
			cancelled = true;
		};
	}, [
		form,
		portraitUrl,
		drawnSignatureUrl,
		signatureMode,
		vertical,
		showGhost,
		encoded.payload
	]);
	function currentCanvas() {
		return cardSide === "back" ? backRef.current : frontRef.current;
	}
	function onDownload() {
		const canvas = currentCanvas();
		if (!canvas) return;
		downloadCanvas(canvas, `${`${form.jurisdictionCode.toLowerCase()}-${form.documentKind.toLowerCase()}-${cardSide}-specimen`}.png`);
		toast(`${cardSide === "front" ? "Front" : "Back"} PNG saved`);
	}
	async function onDownloadPrint() {
		try {
			await document.fonts.ready;
			const size = cardSize(PRINT_DPI, vertical);
			const [portrait, paper, foil] = await Promise.all([
				loadImage(portraitUrl).catch(() => null),
				loadImage(PAPER_TEXTURE).catch(() => null),
				loadImage(FOIL_TEXTURE).catch(() => null)
			]);
			let signature = null;
			if (signatureMode === "drawn" && drawnSignatureUrl) signature = await loadImage(drawnSignatureUrl).catch(() => null);
			else signature = await loadImage(renderSignatureDataUrl(signatureText(form.familyName, form.firstName, form.middleName))).catch(() => null);
			const opts = {
				form,
				assets: {
					portrait,
					paper,
					foil,
					signature
				},
				vertical,
				showGhost,
				dpi: PRINT_DPI
			};
			const front = document.createElement("canvas");
			front.width = size.w;
			front.height = size.h;
			const fctx = front.getContext("2d");
			if (fctx) drawCardFront(fctx, opts);
			const bc = document.createElement("canvas");
			await renderPdf417(bc, encoded.payload, {
				columns: form.pdf417Columns,
				ecLevel: form.pdf417EcLevel,
				compact: form.compactPdf417,
				scale: 3,
				backgroundcolor: "FFFFFF",
				barcolor: "000000"
			});
			const back = document.createElement("canvas");
			back.width = size.w;
			back.height = size.h;
			const bctx = back.getContext("2d");
			if (bctx) drawCardBack(bctx, opts, bc);
			downloadCanvas(front, `${form.jurisdictionCode.toLowerCase()}-front-print.png`);
			downloadCanvas(back, `${form.jurisdictionCode.toLowerCase()}-back-print.png`);
			toast("600 dpi front and back saved");
		} catch {
			toast("Print export failed");
		}
	}
	function onPrint() {
		const front = frontRef.current;
		const back = backRef.current;
		if (!front || !back) return;
		const w = window.open("", "_blank", "noopener,noreferrer,width=900,height=700");
		if (!w) {
			toast("Allow pop-ups to print");
			return;
		}
		const page = vertical ? "2.125in 3.375in" : "3.375in 2.125in";
		w.document.write(`<!doctype html><html><head><title>Specimen ${form.jurisdictionCode} ${form.documentKind}</title>
<style>
  @page { size: ${page}; margin: 0; }
  html, body { margin: 0; background: #fff; }
  img { display: block; width: ${vertical ? "2.125in" : "3.375in"}; height: ${vertical ? "3.375in" : "2.125in"}; }
  .break { page-break-after: always; break-after: page; }
</style></head><body>
<img class="break" alt="Front specimen" src="${front.toDataURL("image/png")}" />
<img alt="Back specimen" src="${back.toDataURL("image/png")}" />
</body></html>`);
		w.document.close();
		w.focus();
		w.print();
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-[11px] tracking-[0.18em] text-muted",
					children: "CR80 CARD · SPECIMEN"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-0.5 text-sm font-medium",
					children: [
						j?.name,
						" ",
						form.documentKind === "ID" ? "ID" : "DL",
						" · ",
						theme.agency
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "font-mono text-[11px] text-subtle",
					children: [vertical ? "Vertical" : "Horizontal", " · 300 dpi"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "overflow-hidden rounded-xl border border-border bg-surface-2 p-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative mx-auto",
						style: {
							aspectRatio: vertical ? "2.125 / 3.375" : "3.375 / 2.125",
							width: vertical ? "min(100%, 15rem)" : "100%"
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
							ref: frontRef,
							className: cardSide === "front" ? "absolute inset-0 size-full" : "hidden",
							"aria-label": "Driver license front"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
							ref: backRef,
							className: cardSide === "back" ? "absolute inset-0 size-full" : "hidden",
							"aria-label": "Driver license back"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
						ref: barcodeRef,
						className: "hidden",
						"aria-hidden": true
					}),
					!ready ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "pt-2 text-center text-xs text-subtle",
						children: "Rendering card…"
					}) : null
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						variant: cardSide === "front" ? "default" : "outline",
						onClick: () => setCardSide("front"),
						children: "Front"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						variant: cardSide === "back" ? "default" : "outline",
						onClick: () => setCardSide("back"),
						children: "Back"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "sm",
						variant: "secondary",
						onClick: () => setCardSide(cardSide === "front" ? "back" : "front"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FlipHorizontal, {}), " Flip"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "sm",
						variant: "secondary",
						onClick: onDownload,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, {}), " PNG"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						variant: "secondary",
						onClick: onDownloadPrint,
						children: "Print PNG"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "sm",
						variant: "outline",
						onClick: onPrint,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Printer, {}), " Print both"]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs leading-relaxed text-subtle",
				children: "CR80 (3.375 × 2.125 in). Front is the visual credential; back carries the live AAMVA PDF417. Both faces are marked SPECIMEN and are not government documents."
			})
		]
	});
}
function WorkbenchPanel() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
		defaultValue: "card",
		className: "w-full",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
				className: "mb-4 w-full justify-start",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
					value: "card",
					className: "flex-1 sm:flex-none",
					children: "Card face"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
					value: "barcode",
					className: "flex-1 sm:flex-none",
					children: "PDF417"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
				value: "card",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardPanel, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
				value: "barcode",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BarcodePanel, {})
			})
		]
	});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh overflow-x-hidden bg-bg text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppHeader, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "mx-auto grid max-w-7xl gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(22rem,28rem)] lg:items-start",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "rounded-xl border border-border bg-surface p-4 sm:p-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-base font-medium tracking-tight",
							children: "Credential fields"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted",
							children: "Build a printable CR80 specimen for any US jurisdiction. Fields encode a live AAMVA PDF417 on the back."
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LicenseForm, {})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
					className: "rounded-xl border border-border bg-surface p-4 sm:p-5 lg:sticky lg:top-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WorkbenchPanel, {})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
				className: "mx-auto max-w-7xl px-4 pb-10 text-xs leading-relaxed text-subtle sm:px-6",
				children: "Specimen cards and barcodes for scanner software QA. The face is a stylized CR80 layout (not a copy of a state plate). The PDF417 follows Annex D structure so ID-capture SDKs can parse it. Neither side is a government document."
			})
		]
	});
}
//#endregion
export { Home as component };
