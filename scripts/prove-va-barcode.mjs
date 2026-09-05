/**
 * Gate: encode one Virginia DL specimen, render PDF417, decode the image,
 * and fail the process unless the round-trip is exact and Annex D checks pass.
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { createRequire } from "node:module";
import { pathToFileURL } from "node:url";
import { register } from "node:module";

const require = createRequire(import.meta.url);

async function loadTs(rel) {
  return import(pathToFileURL(new URL(rel, import.meta.url)).href);
}

const [{ encodeAamva }, { createSpecimen }, { parseAamva }, { verifyPayload }] = await Promise.all([
  import("../src/lib/aamva/encode.ts"),
  import("../src/lib/aamva/specimen.ts"),
  import("../src/lib/aamva/parse.ts"),
  import("../src/lib/aamva/verify.ts"),
]);

const bwipjs = (await import("bwip-js")).default;
const { PNG } = await import("pngjs");
const zxingMod = await import("@zxing/library");
const zxing = zxingMod.default ?? zxingMod;
const {
  PDF417Reader,
  BinaryBitmap,
  HybridBinarizer,
  RGBLuminanceSource,
  DecodeHintType,
  BarcodeFormat,
} = zxing;
if (typeof RGBLuminanceSource !== "function") {
  fail(`RGBLuminanceSource missing: ${typeof RGBLuminanceSource}`);
}

function fail(msg) {
  console.error("FAIL:", msg);
  process.exit(1);
}

const form = createSpecimen("VA");
const encoded = encodeAamva(form);
const payload = encoded.payload;

console.log("=== Virginia DL specimen ===");
console.log("IIN", encoded.iin);
console.log("subfiles", encoded.subfiles.map((s) => `${s.type}@${s.offset}/${s.length}`).join("  "));
console.log("bytes", payload.length);
console.log("header hex", Buffer.from(payload.slice(0, 21), "latin1").toString("hex"));
console.log("--- payload (controls visible) ---");
console.log(
  payload.replaceAll("\x1e", "<RS>").replaceAll("\r", "<CR>\n").replaceAll("\n", "<LF>\n"),
);

const header = Buffer.from(payload.slice(0, 9), "latin1");
if (!header.equals(Buffer.from([0x40, 0x0a, 0x1e, 0x0d, 0x41, 0x4e, 0x53, 0x49, 0x20]))) {
  fail(`bad header bytes: ${header.toString("hex")}`);
}

const parsed = parseAamva(payload);
if (parsed.iin !== "636000") fail(`IIN ${parsed.iin}`);
if (parsed.elements.DAJ !== "VA") fail(`DAJ ${parsed.elements.DAJ}`);
if (parsed.elements.DAQ !== "T16700285") fail(`DAQ ${parsed.elements.DAQ}`);
if (parsed.subfiles[0].offset !== 41) fail(`offset ${parsed.subfiles[0].offset}`);

const report = verifyPayload(payload, form);
const fails = report.checks.filter((c) => c.severity === "fail");
console.log("\n=== Annex D checks ===");
console.log(`pass ${report.passed}  warn ${report.warnings}  fail ${report.failed}`);
if (fails.length) {
  for (const f of fails) console.error("-", f.id, f.detail);
  fail("structural verification failed");
}

console.log("\n=== Render PDF417 ===");
const pngBuf = await bwipjs.toBuffer({
  bcid: "pdf417",
  text: payload,
  columns: 13,
  securitylevel: 5,
  scale: 4,
  rowmult: 4,
  padding: 16,
  binarytext: true,
  parse: false,
  backgroundcolor: "FFFFFF",
  barcolor: "000000",
});

mkdirSync("/workspace/screenshots", { recursive: true });
const pngPath = "/workspace/screenshots/va-dl-specimen.png";
writeFileSync(pngPath, pngBuf);
console.log("wrote", pngPath, pngBuf.length, "bytes");

console.log("\n=== Decode PDF417 image (ZXing) ===");
const png = PNG.sync.read(pngBuf);
const luminances = new Uint8ClampedArray(png.width * png.height);
for (let i = 0; i < png.width * png.height; i++) {
  const o = i * 4;
  luminances[i] = (png.data[o] * 299 + png.data[o + 1] * 587 + png.data[o + 2] * 114) / 1000;
}
const source = new RGBLuminanceSource(luminances, png.width, png.height);
const bitmap = new BinaryBitmap(new HybridBinarizer(source));
const reader = new PDF417Reader();
const hints = new Map();
hints.set(DecodeHintType.TRY_HARDER, true);
hints.set(DecodeHintType.POSSIBLE_FORMATS, [BarcodeFormat.PDF_417]);
hints.set(DecodeHintType.CHARACTER_SET, "ISO-8859-1");

let decoded;
try {
  decoded = reader.decode(bitmap, hints).getText();
} catch (err) {
  fail(`ZXing could not read the PDF417: ${err instanceof Error ? err.message : err}`);
}

if (decoded !== payload) {
  console.error("decoded length", decoded.length, "payload length", payload.length);
  console.error("decoded header hex", Buffer.from(decoded.slice(0, 21), "latin1").toString("hex"));
  fail("decoded image text does not match AAMVA payload");
}

console.log("ZXing recovered the exact payload.");
console.log("scanner name:", report.scanner?.fullName);
console.log("license:", report.scanner?.licenseNumber);
console.log("REAL ID:", report.scanner?.realId);
console.log("\nPASS: Virginia DL PDF417 is scannable and Annex D-valid.");
