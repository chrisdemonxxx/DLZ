import { Check, Copy, Download, QrCode } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import { encodeAamva, JURISDICTION_BY_CODE, visiblePayload } from "@/lib/aamva";
import { useLicenseStore } from "@/lib/aamva/store";
import {
  decodePdf417Canvas,
  downloadCanvas,
  downloadSvg,
  downloadText,
  pdf417Svg,
  renderPdf417,
  renderQr,
} from "@/lib/barcode/render";
import { Button } from "./ui/button";
import { Switch } from "./ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Textarea } from "./ui/textarea";
import { VerifyPanel } from "./verify-panel";

export function BarcodePanel() {
  const form = useLicenseStore((s) => s.form);
  const showQr = useLicenseStore((s) => s.showQr);
  const setShowQr = useLicenseStore((s) => s.setShowQr);
  const pastedScan = useLicenseStore((s) => s.pastedScan);
  const setPastedScan = useLicenseStore((s) => s.setPastedScan);

  const encoded = useMemo(() => encodeAamva(form), [form]);
  const payload = encoded.payload;
  const pdfCanvas = useRef<HTMLCanvasElement>(null);
  const qrCanvas = useRef<HTMLCanvasElement>(null);
  const [renderError, setRenderError] = useState<string | null>(null);
  const [decoded, setDecoded] = useState<string | null | undefined>(undefined);
  const j = JURISDICTION_BY_CODE[form.jurisdictionCode];

  useEffect(() => {
    let cancelled = false;
    setDecoded(undefined);
    (async () => {
      try {
        if (pdfCanvas.current) {
          await renderPdf417(pdfCanvas.current, payload, {
            columns: form.pdf417Columns,
            ecLevel: form.pdf417EcLevel,
            compact: form.compactPdf417,
            scale: 3,
          });
          if (!cancelled && pdfCanvas.current) {
            const text = await decodePdf417Canvas(pdfCanvas.current);
            if (!cancelled) setDecoded(text);
          }
        }
        if (showQr && qrCanvas.current) {
          await renderQr(qrCanvas.current, payload);
        }
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
  }, [payload, form.pdf417Columns, form.pdf417EcLevel, form.compactPdf417, showQr]);

  const stem = `annexd-${form.jurisdictionCode.toLowerCase()}-${form.documentKind.toLowerCase()}-specimen`;

  async function onDownloadPng() {
    if (!pdfCanvas.current) return;
    downloadCanvas(pdfCanvas.current, `${stem}.png`);
    toast("PNG saved");
  }

  async function onDownloadSvg() {
    const svg = await pdf417Svg(payload, {
      columns: form.pdf417Columns,
      ecLevel: form.pdf417EcLevel,
      compact: form.compactPdf417,
    });
    downloadSvg(svg, `${stem}.svg`);
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

  return (
    <div className="flex flex-col gap-4">
      <div className="overflow-hidden rounded-xl border border-border bg-paper text-ink">
        <div className="flex items-center justify-between gap-3 border-b border-ink/10 px-4 py-3">
          <div>
            <p className="font-mono text-[11px] tracking-[0.18em] text-ink/50">AAMVA PDF417 · SPECIMEN</p>
            <p className="mt-0.5 text-sm font-medium">
              {j?.name} {form.documentKind} · IIN {j?.iin}
            </p>
          </div>
          <p className="font-mono text-[11px] text-ink/50">
            {form.pdf417Columns} col · EC{form.pdf417EcLevel}
          </p>
        </div>
        <div className="bg-paper px-3 py-4">
          {renderError ? (
            <p className="px-2 py-8 text-center text-sm text-fail">{renderError}</p>
          ) : (
            <canvas
              ref={pdfCanvas}
              className="mx-auto block h-auto max-h-52 w-full max-w-full"
              aria-label="PDF417 barcode"
            />
          )}
        </div>
        {showQr ? (
          <div className="flex justify-center border-t border-ink/10 bg-paper px-3 py-4">
            <canvas ref={qrCanvas} className="size-44 object-contain" aria-label="QR code of AAMVA payload" />
          </div>
        ) : null}
        <div className="flex items-center justify-between gap-3 border-t border-ink/10 px-4 py-2.5">
          <p className="font-mono text-[11px] text-ink/50">{payload.length} bytes · not a government document</p>
          <ScanStatus decoded={decoded} payload={payload} />
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <Button size="sm" onClick={onDownloadPng}>
          <Download /> PNG
        </Button>
        <Button size="sm" variant="secondary" onClick={onDownloadSvg}>
          SVG
        </Button>
        <Button size="sm" variant="secondary" onClick={onDownloadRaw}>
          Raw
        </Button>
        <Button size="sm" variant="outline" onClick={onCopy}>
          <Copy /> Copy
        </Button>
        <label className="flex h-9 items-center gap-2 rounded-md border border-border bg-surface-2 px-3 text-xs">
          <QrCode className="size-3.5 text-muted" />
          QR
          <Switch checked={showQr} onCheckedChange={setShowQr} aria-label="Show QR code" />
        </label>
      </div>

      <Tabs defaultValue="verify">
        <TabsList>
          <TabsTrigger value="verify">Verify</TabsTrigger>
          <TabsTrigger value="raw">Raw AAMVA</TabsTrigger>
          <TabsTrigger value="scan">Paste scan</TabsTrigger>
        </TabsList>
        <TabsContent value="verify">
          <VerifyPanel payload={payload} decoded={decoded} />
        </TabsContent>
        <TabsContent value="raw">
          <pre className="max-h-80 overflow-auto rounded-lg border border-border bg-surface-2 p-3 font-mono text-[11px] leading-relaxed text-muted">
            {visiblePayload(payload)}
          </pre>
        </TabsContent>
        <TabsContent value="scan" className="flex flex-col gap-3">
          <p className="text-sm text-muted">
            Paste a string from a hardware scanner or another generator. Control characters (RS, CR, LF) are kept.
          </p>
          <Textarea
            value={pastedScan}
            onChange={(e) => setPastedScan(e.target.value)}
            placeholder="@ then ANSI header…"
            spellCheck={false}
          />
          {pastedScan.trim() ? <VerifyPanel payload={pastedScan} /> : null}
        </TabsContent>
      </Tabs>
    </div>
  );
}

function ScanStatus({ decoded, payload }: { decoded: string | null | undefined; payload: string }) {
  if (decoded === undefined) {
    return <span className="font-mono text-[11px] text-ink/40">decoding…</span>;
  }
  if (decoded && decoded === payload) {
    return (
      <span className="inline-flex items-center gap-1 font-mono text-[11px] text-pass">
        <Check className="size-3" /> image round-trip
      </span>
    );
  }
  if (decoded) {
    return <span className="font-mono text-[11px] text-warn">decoded, payload differs</span>;
  }
  return <span className="font-mono text-[11px] text-ink/40">image decode pending</span>;
}
