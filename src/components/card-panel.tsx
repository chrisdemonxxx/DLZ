import { Download, FlipHorizontal, Printer } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import { encodeAamva, JURISDICTION_BY_CODE, type LicenseForm } from "@/lib/aamva";
import { useLicenseStore } from "@/lib/aamva/store";
import { renderPdf417, renderCode128, downloadCanvas } from "@/lib/barcode/render";
import {
  cardSize,
  drawCardBack,
  drawCardFront,
  FOIL_TEXTURE,
  isVerticalCard,
  loadImage,
  OVD_TEXTURE,
  OVI_STRIP,
  PAPER_TEXTURE,
  renderSignatureDataUrl,
  signatureText,
  themeFor,
  type CardAssets,
} from "@/lib/card";
import { Button } from "./ui/button";

const PREVIEW_DPI = 300;
const PRINT_DPI = 600;

async function loadCardAssets(
  form: LicenseForm,
  portraitUrl: string,
  signatureMode: string,
  drawnSignatureUrl: string | null,
): Promise<CardAssets> {
  const themeNow = themeFor(form.jurisdictionCode);
  const [portrait, paper, foil, bg, ovd, ovi] = await Promise.all([
    loadImage(portraitUrl).catch(() => null),
    loadImage(PAPER_TEXTURE).catch(() => null),
    loadImage(FOIL_TEXTURE).catch(() => null),
    loadImage(themeNow.bg).catch(() => null),
    loadImage(OVD_TEXTURE).catch(() => null),
    loadImage(OVI_STRIP).catch(() => null),
  ]);
  let signature: HTMLImageElement | null = null;
  if (signatureMode === "drawn" && drawnSignatureUrl) {
    signature = await loadImage(drawnSignatureUrl).catch(() => null);
  } else {
    signature = await loadImage(
      renderSignatureDataUrl(signatureText(form.familyName, form.firstName, form.middleName), "#1a2744"),
    ).catch(() => null);
  }
  const code128 = document.createElement("canvas");
  const inv128 = document.createElement("canvas");
  await renderCode128(code128, form.licenseNumber.toUpperCase() || "SPECIMEN", 12).catch(() => undefined);
  await renderCode128(inv128, form.inventory || "000000000000", 10).catch(() => undefined);
  return { portrait, paper, foil, signature, bg, ovd, ovi, code128, inv128 };
}

export function CardPanel() {
  const form = useLicenseStore((s) => s.form);
  const portraitUrl = useLicenseStore((s) => s.portraitUrl);
  const drawnSignatureUrl = useLicenseStore((s) => s.drawnSignatureUrl);
  const signatureMode = useLicenseStore((s) => s.signatureMode);
  const orientation = useLicenseStore((s) => s.orientation);
  const showGhost = useLicenseStore((s) => s.showGhost);
  const cardSide = useLicenseStore((s) => s.cardSide);
  const setCardSide = useLicenseStore((s) => s.setCardSide);

  const vertical = isVerticalCard(form, orientation);
  const encoded = useMemo(() => encodeAamva(form), [form]);
  const theme = themeFor(form.jurisdictionCode);
  const j = JURISDICTION_BY_CODE[form.jurisdictionCode];

  const frontRef = useRef<HTMLCanvasElement>(null);
  const backRef = useRef<HTMLCanvasElement>(null);
  const barcodeRef = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        await Promise.all([
          document.fonts.load('92px "Great Vibes"'),
          document.fonts.load('700 26px "Playfair Display"'),
          document.fonts.load('700 22px "IBM Plex Sans"'),
          document.fonts.ready,
        ]);
        const assets = await loadCardAssets(form, portraitUrl, signatureMode, drawnSignatureUrl);
        if (cancelled) return;

        const size = cardSize(PREVIEW_DPI, vertical);
        const opts = { form, assets, vertical, showGhost, dpi: PREVIEW_DPI };

        const front = frontRef.current;
        if (front) {
          front.width = size.w;
          front.height = size.h;
          const ctx = front.getContext("2d");
          if (ctx) drawCardFront(ctx, opts);
        }

        const barcode = barcodeRef.current;
        if (barcode) {
          await renderPdf417(barcode, encoded.payload, {
            columns: form.pdf417Columns,
            ecLevel: form.pdf417EcLevel,
            compact: form.compactPdf417,
            scale: 2,
            backgroundcolor: "FFFFFF",
            barcolor: "000000",
          });
        }

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
  }, [form, portraitUrl, drawnSignatureUrl, signatureMode, vertical, showGhost, encoded.payload]);

  function currentCanvas() {
    return cardSide === "back" ? backRef.current : frontRef.current;
  }

  function onDownload() {
    const canvas = currentCanvas();
    if (!canvas) return;
    const stem = `${form.jurisdictionCode.toLowerCase()}-${form.documentKind.toLowerCase()}-${cardSide}-specimen`;
    downloadCanvas(canvas, `${stem}.png`);
    toast(`${cardSide === "front" ? "Front" : "Back"} PNG saved`);
  }

  async function onDownloadPrint() {
    try {
      await document.fonts.ready;
      const size = cardSize(PRINT_DPI, vertical);
      const assets = await loadCardAssets(form, portraitUrl, signatureMode, drawnSignatureUrl);
      const opts = { form, assets, vertical, showGhost, dpi: PRINT_DPI };
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
        barcolor: "000000",
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

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-mono text-[11px] tracking-[0.18em] text-muted">CR80 CARD · SPECIMEN</p>
          <p className="mt-0.5 text-sm font-medium">
            {j?.name} {form.documentKind === "ID" ? "ID" : "DL"} · {theme.generation}
          </p>
        </div>
        <p className="font-mono text-[11px] text-subtle">{vertical ? "Vertical" : "Horizontal"} · 300 dpi</p>
      </div>

      <div className="overflow-hidden rounded-xl border border-border bg-surface-2 p-3">
        <div
          className="relative mx-auto"
          style={{
            aspectRatio: vertical ? "2.125 / 3.375" : "3.375 / 2.125",
            width: vertical ? "min(100%, 15rem)" : "100%",
          }}
        >
          <canvas
            ref={frontRef}
            className={cardSide === "front" ? "absolute inset-0 size-full" : "hidden"}
            aria-label="Driver license front"
          />
          <canvas
            ref={backRef}
            className={cardSide === "back" ? "absolute inset-0 size-full" : "hidden"}
            aria-label="Driver license back"
          />
        </div>
        <canvas ref={barcodeRef} className="hidden" aria-hidden />
        {!ready ? <p className="pt-2 text-center text-xs text-subtle">Rendering card…</p> : null}
      </div>

      <div className="flex flex-wrap gap-2">
        <Button size="sm" variant={cardSide === "front" ? "default" : "outline"} onClick={() => setCardSide("front")}>
          Front
        </Button>
        <Button size="sm" variant={cardSide === "back" ? "default" : "outline"} onClick={() => setCardSide("back")}>
          Back
        </Button>
        <Button
          size="sm"
          variant="secondary"
          onClick={() => setCardSide(cardSide === "front" ? "back" : "front")}
        >
          <FlipHorizontal /> Flip
        </Button>
        <Button size="sm" variant="secondary" onClick={onDownload}>
          <Download /> PNG
        </Button>
        <Button size="sm" variant="secondary" onClick={onDownloadPrint}>
          Print PNG
        </Button>
        <Button size="sm" variant="outline" onClick={onPrint}>
          <Printer /> Print both
        </Button>
      </div>
      <p className="text-xs leading-relaxed text-subtle">
        CR80 (3.375 × 2.125 in). Front is the visual credential; back carries the live AAMVA PDF417. Both faces
        are marked SPECIMEN and are not government documents.
      </p>
    </div>
  );
}
