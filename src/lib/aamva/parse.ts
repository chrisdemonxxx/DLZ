import { CR, FIXED_HEADER_LENGTH, HEADER_PREFIX, LF } from "./format.ts";
import type { EncodedElement, EncodedSubfile, ParsedDocument } from "./types.ts";

export function looksLikeAamva(text: string): boolean {
  return text.startsWith("@") && text.includes("ANSI");
}

export function parseAamva(payload: string): ParsedDocument {
  if (!payload.startsWith(HEADER_PREFIX) && !payload.startsWith("@")) {
    throw new Error("Not an AAMVA barcode — missing @ / ANSI header.");
  }

  const ansiAt = payload.indexOf("ANSI ");
  if (ansiAt < 0) throw new Error("Missing ANSI file type.");

  const cursor = ansiAt + 5;
  const iin = payload.slice(cursor, cursor + 6);
  const aamvaVersion = Number.parseInt(payload.slice(cursor + 6, cursor + 8), 10);
  const jurisdictionVersion = Number.parseInt(payload.slice(cursor + 8, cursor + 10), 10);
  const entryCount = Number.parseInt(payload.slice(cursor + 10, cursor + 12), 10);

  if (!/^\d{6}$/.test(iin)) throw new Error("IIN must be 6 digits.");
  if (!Number.isFinite(aamvaVersion) || !Number.isFinite(entryCount)) {
    throw new Error("Corrupt AAMVA header.");
  }

  const designatorStart = cursor + 12;
  const subfiles: EncodedSubfile[] = [];
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
      elements: parseSubfileElements(body, type),
    });
  }

  const elements: Record<string, string> = {};
  for (const sf of subfiles) {
    for (const el of sf.elements) elements[el.id] = el.value;
  }

  return {
    payload,
    iin,
    aamvaVersion,
    jurisdictionVersion,
    entryCount,
    subfiles,
    elements,
  };
}

function parseSubfileElements(body: string, type: string): EncodedElement[] {
  let data = body;
  if (data.startsWith(type)) data = data.slice(type.length);
  if (data.endsWith(CR)) data = data.slice(0, -1);
  if (!data) return [];

  const chunks = data.split(LF);
  const elements: EncodedElement[] = [];
  for (const chunk of chunks) {
    if (chunk.length < 3) continue;
    elements.push({ id: chunk.slice(0, 3), value: chunk.slice(3) });
  }
  return elements;
}

export function expectedHeaderLength(entryCount: number): number {
  return FIXED_HEADER_LENGTH + 10 * entryCount;
}
