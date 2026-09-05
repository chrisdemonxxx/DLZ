/**
 * Encode, render, and ZXing-decode a specimen DL for every US jurisdiction.
 */
import { writeFileSync, mkdirSync } from "node:fs";

const [{ encodeAamva }, { createSpecimen }, { parseAamva }, { verifyPayload }, { JURISDICTIONS }] =
  await Promise.all([
    import("../src/lib/aamva/encode.ts"),
    import("../src/lib/aamva/specimen.ts"),
    import("../src/lib/aamva/parse.ts"),
    import("../src/lib/aamva/verify.ts"),
    import("../src/lib/aamva/jurisdictions.ts"),
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

const hints = new Map();
hints.set(DecodeHintType.TRY_HARDER, true);
hints.set(DecodeHintType.POSSIBLE_FORMATS, [BarcodeFormat.PDF_417]);
hints.set(DecodeHintType.CHARACTER_SET, "ISO-8859-1");

function decodePng(pngBuf) {
  const png = PNG.sync.read(pngBuf);
  const luminances = new Uint8ClampedArray(png.width * png.height);
  for (let i = 0; i < png.width * png.height; i++) {
    const o = i * 4;
    luminances[i] = (png.data[o] * 299 + png.data[o + 1] * 587 + png.data[o + 2] * 114) / 1000;
  }
  const source = new RGBLuminanceSource(luminances, png.width, png.height);
  const bitmap = new BinaryBitmap(new HybridBinarizer(source));
  return new PDF417Reader().decode(bitmap, hints).getText();
}

mkdirSync("/workspace/screenshots/all-states", { recursive: true });

const rows = [];
let failCount = 0;

for (const j of JURISDICTIONS) {
  const result = {
    code: j.code,
    name: j.name,
    iin: j.iin,
    license: "",
    bytes: 0,
    checks: "",
    scan: "",
    error: "",
  };
  try {
    const form = createSpecimen(j.code);
    const encoded = encodeAamva(form);
    const payload = encoded.payload;
    result.license = form.licenseNumber;
    result.bytes = payload.length;

    if (encoded.iin !== j.iin) throw new Error(`IIN ${encoded.iin} != ${j.iin}`);
    const parsed = parseAamva(payload);
    if (parsed.elements.DAJ !== j.code) throw new Error(`DAJ ${parsed.elements.DAJ}`);
    if (parsed.elements.DAQ !== form.licenseNumber.toUpperCase()) {
      throw new Error(`DAQ ${parsed.elements.DAQ}`);
    }

    const report = verifyPayload(payload, form);
    const fails = report.checks.filter((c) => c.severity === "fail");
    result.checks = `${report.passed}/${report.checks.length} p ${report.warnings}w ${report.failed}f`;
    if (fails.length) throw new Error(fails.map((f) => `${f.id}:${f.detail}`).join("; "));

    const pngBuf = await bwipjs.toBuffer({
      bcid: "pdf417",
      text: payload,
      columns: 13,
      securitylevel: 5,
      scale: 3,
      rowmult: 3,
      padding: 12,
      binarytext: true,
      parse: false,
      backgroundcolor: "FFFFFF",
      barcolor: "000000",
    });

    let decoded;
    try {
      decoded = decodePng(pngBuf);
    } catch {
      const retry = await bwipjs.toBuffer({
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
      decoded = decodePng(retry);
    }

    if (decoded !== payload) throw new Error("decoded bytes differ from payload");
    result.scan = "exact";
    writeFileSync(`/workspace/screenshots/all-states/${j.code}.png`, pngBuf);
  } catch (err) {
    failCount += 1;
    result.scan = "FAIL";
    result.error = err instanceof Error ? err.message : String(err);
  }
  rows.push(result);
  const mark = result.scan === "exact" ? "OK" : "FAIL";
  console.log(
    `${mark.padEnd(4)} ${j.code.padEnd(2)} ${j.iin} ${String(result.bytes).padStart(3)}B  ${result.checks.padEnd(16)} ${result.license} ${result.error}`,
  );
}

console.log("\n=== SUMMARY ===");
console.log(`jurisdictions ${rows.length}`);
console.log(`scan exact    ${rows.filter((r) => r.scan === "exact").length}`);
console.log(`failed        ${failCount}`);
if (failCount) process.exit(1);
console.log("PASS: every US jurisdiction PDF417 scanned back to the exact AAMVA payload.");
