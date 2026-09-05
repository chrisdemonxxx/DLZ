import assert from "node:assert/strict";
import { test } from "node:test";
import { JURISDICTIONS } from "../aamva/jurisdictions.ts";
import { createSpecimen } from "../aamva/specimen.ts";
import { CARD_THEMES, themeFor } from "./themes.ts";
import { displayDate, displayHeight, displaySex } from "./format-card.ts";
import { FACE_GENERATIONS, generationFor } from "./catalog.ts";
import { isVerticalCard } from "./draw.ts";

test("every jurisdiction has a card theme", () => {
  for (const j of JURISDICTIONS) {
    const theme = themeFor(j.code);
    assert.equal(theme.code, j.code, j.code);
    assert.ok(theme.agency.length > 4, j.code);
    assert.ok(theme.header.startsWith("#"), j.code);
    assert.ok(theme.bg.startsWith("/card/bg/"), j.code);
    assert.ok(theme.generation.length > 3, j.code);
    assert.equal(typeof theme.magStripe, "boolean", j.code);
  }
  assert.equal(Object.keys(CARD_THEMES).length, JURISDICTIONS.length);
  assert.equal(themeFor("CA").magStripe, false);
  assert.equal(themeFor("VA").magStripe, true);
});

test("adult specimen stays horizontal; under-21 flips in auto", () => {
  const adult = createSpecimen("VA");
  assert.equal(isVerticalCard(adult, "auto"), false);
  assert.equal(isVerticalCard({ ...adult, dob: "2010-01-01" }, "auto"), true);
  assert.equal(isVerticalCard(adult, "vertical"), true);
  assert.equal(isVerticalCard({ ...adult, dob: "2010-01-01" }, "horizontal"), false);
});

test("card display helpers", () => {
  assert.equal(displayDate("1986-06-06"), "06/06/1986");
  assert.equal(displayHeight("068 in"), "5'-08\"");
  assert.equal(displaySex("1"), "M");
  assert.equal(displaySex("2"), "F");
});

test("specimen street follows the jurisdiction", () => {
  assert.match(createSpecimen("CA").street, /1ST AVENUE/i);
  assert.match(createSpecimen("TX").street, /LAMAR/i);
  assert.equal(createSpecimen("VA").street, "2300 WEST BROAD STREET");
});

test("every jurisdiction has an official generation record", () => {
  for (const j of JURISDICTIONS) {
    const gen = generationFor(j.code);
    assert.equal(FACE_GENERATIONS[j.code], gen, j.code);
    assert.ok(gen.current.length > 4, j.code);
    assert.ok(gen.source.includes("."), j.code);
    assert.equal(typeof gen.magStripe, "boolean", j.code);
  }
  assert.equal(Object.keys(FACE_GENERATIONS).length, JURISDICTIONS.length);
  assert.equal(generationFor("CA").magStripe, false);
  assert.equal(generationFor("CA").numberedIso, true);
  assert.equal(generationFor("AZ").u21, "vertical-to-65");
  assert.equal(generationFor("NY").edl, true);
});
