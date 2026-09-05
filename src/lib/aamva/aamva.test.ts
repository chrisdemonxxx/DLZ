import assert from "node:assert/strict";
import { test } from "node:test";
import { encodeAamva } from "./encode.ts";
import { parseAamva } from "./parse.ts";
import { createSpecimen } from "./specimen.ts";
import { JURISDICTIONS } from "./jurisdictions.ts";
import { verifyPayload } from "./verify.ts";
import { HEADER_PREFIX } from "./format.ts";

test("header prefix is 9 bytes ending in ANSI space", () => {
  assert.equal(HEADER_PREFIX.length, 9);
  assert.equal(HEADER_PREFIX, "@\n\x1e\rANSI ");
});

test("Virginia specimen round-trips and passes structural checks", () => {
  const encoded = encodeAamva(createSpecimen("VA"));
  assert.equal(encoded.iin, "636000");
  assert.ok(encoded.payload.startsWith("@\n\x1e\rANSI 63600010"));
  const parsed = parseAamva(encoded.payload);
  assert.equal(parsed.elements.DCS, "SAMPLE");
  assert.equal(parsed.elements.DAC, "MICHAEL");
  assert.equal(parsed.elements.DAJ, "VA");
  assert.equal(parsed.elements.DAQ, "T16700285");
  assert.equal(parsed.subfiles[0].offset, 21 + 10 * parsed.entryCount);
  assert.equal(parsed.elements.DAK.length, 11);
  const report = verifyPayload(encoded.payload, createSpecimen("VA"));
  const fails = report.checks.filter((c) => c.severity === "fail");
  assert.deepEqual(fails, []);
});

test("every US jurisdiction encodes a matching IIN and license format", () => {
  for (const j of JURISDICTIONS) {
    const form = createSpecimen(j.code);
    const encoded = encodeAamva(form);
    assert.equal(encoded.iin, j.iin, j.code);
    const parsed = parseAamva(encoded.payload);
    assert.equal(parsed.elements.DAJ, j.code, j.code);
    assert.equal(parsed.iin, j.iin, j.code);
    const report = verifyPayload(encoded.payload, form);
    const fails = report.checks.filter((c) => c.severity === "fail");
    assert.equal(fails.length, 0, `${j.code}: ${fails.map((f) => f.id + " " + f.detail).join("; ")}`);
    assert.ok(parsed.elements.DAG.length > 5, j.code);
  }
});

test("offsets chain across DL + Z subfiles", () => {
  const encoded = encodeAamva(createSpecimen("CA"));
  const parsed = parseAamva(encoded.payload);
  assert.equal(parsed.entryCount, 2);
  assert.equal(parsed.subfiles[0].type, "DL");
  assert.equal(parsed.subfiles[1].type, "ZC");
  const headerEnd = 21 + 20;
  assert.equal(parsed.subfiles[0].offset, headerEnd);
  assert.equal(
    parsed.subfiles[1].offset,
    parsed.subfiles[0].offset + parsed.subfiles[0].length,
  );
});
