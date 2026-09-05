import type { PointerEvent } from "react";
import { Camera, Eraser, PenLine, Upload } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { cropToPortrait, fileToDataUrl, SPECIMEN_PORTRAITS } from "@/lib/card/portraits.ts";
import { useLicenseStore } from "@/lib/aamva/store";
import { Button } from "./ui/button";
import { Field } from "./ui/field";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Switch } from "./ui/switch";
import { cn } from "@/lib/utils";

export function PortraitFields() {
  const portraitUrl = useLicenseStore((s) => s.portraitUrl);
  const setPortraitUrl = useLicenseStore((s) => s.setPortraitUrl);
  const orientation = useLicenseStore((s) => s.orientation);
  const setOrientation = useLicenseStore((s) => s.setOrientation);
  const showGhost = useLicenseStore((s) => s.showGhost);
  const setShowGhost = useLicenseStore((s) => s.setShowGhost);
  const signatureMode = useLicenseStore((s) => s.signatureMode);
  const setSignatureMode = useLicenseStore((s) => s.setSignatureMode);
  const setDrawnSignatureUrl = useLicenseStore((s) => s.setDrawnSignatureUrl);
  const fileRef = useRef<HTMLInputElement>(null);

  async function onUpload(file: File | undefined) {
    if (!file) return;
    try {
      const raw = await fileToDataUrl(file);
      const cropped = await cropToPortrait(raw);
      setPortraitUrl(cropped);
      toast("Portrait cropped to 3:4");
    } catch {
      toast("Could not read that image");
    }
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      <div className="grid grid-cols-4 gap-2">
        {SPECIMEN_PORTRAITS.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => setPortraitUrl(p.url)}
            className={cn(
              "overflow-hidden rounded-md border bg-surface-2 outline-none ring-ring/40 transition-shadow",
              portraitUrl === p.url ? "border-fg ring-2" : "border-border hover:border-border-strong",
            )}
            aria-label={p.label}
            aria-pressed={portraitUrl === p.url}
          >
            <img src={p.url} alt="" className="aspect-[3/4] w-full object-cover" />
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => onUpload(e.target.files?.[0])}
        />
        <Button type="button" size="sm" variant="secondary" onClick={() => fileRef.current?.click()}>
          <Upload /> Upload photo
        </Button>
        <CameraCapture onCapture={setPortraitUrl} />
        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={() => setPortraitUrl(SPECIMEN_PORTRAITS[0].url)}
        >
          Reset
        </Button>
      </div>

      <Field label="Card orientation">
        <Select value={orientation} onValueChange={(v) => setOrientation(v as typeof orientation)}>
          <SelectTrigger aria-label="Card orientation">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="auto">Auto (vertical if under 21)</SelectItem>
            <SelectItem value="horizontal">Horizontal adult</SelectItem>
            <SelectItem value="vertical">Vertical</SelectItem>
          </SelectContent>
        </Select>
      </Field>

      <div className="flex h-11 items-center justify-between gap-3 rounded-md border border-border bg-surface-2 px-3">
        <div>
          <p className="text-sm text-fg">Ghost image</p>
          <p className="font-mono text-[11px] text-subtle">Faint reprint of the portrait</p>
        </div>
        <Switch checked={showGhost} onCheckedChange={setShowGhost} aria-label="Ghost image" />
      </div>

      <div className="flex h-11 items-center justify-between gap-3 rounded-md border border-border bg-surface-2 px-3">
        <div>
          <p className="text-sm text-fg">Signature</p>
          <p className="font-mono text-[11px] text-subtle">{signatureMode === "auto" ? "From name" : "Drawn"}</p>
        </div>
        <Button
          type="button"
          size="sm"
          variant="ghost"
          onClick={() => {
            setSignatureMode("auto");
            setDrawnSignatureUrl(null);
          }}
        >
          <PenLine /> Auto
        </Button>
      </div>
      <SignaturePad />
    </div>
  );
}

function CameraCapture({ onCapture }: { onCapture: (url: string) => void }) {
  const [open, setOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    if (!open) return;
    let cancelled = false;
    (async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" }, audio: false });
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
    onCapture(canvas.toDataURL("image/jpeg", 0.92));
    setOpen(false);
    toast("Portrait captured");
  }

  if (!open) {
    return (
      <Button type="button" size="sm" variant="secondary" onClick={() => setOpen(true)}>
        <Camera /> Camera
      </Button>
    );
  }

  return (
    <div className="col-span-full overflow-hidden rounded-lg border border-border bg-surface-2 p-3">
      <video ref={videoRef} className="mx-auto aspect-[3/4] h-56 rounded-md bg-bg object-cover" playsInline muted />
      <div className="mt-3 flex gap-2">
        <Button type="button" size="sm" onClick={snap}>
          Capture
        </Button>
        <Button type="button" size="sm" variant="outline" onClick={() => setOpen(false)}>
          Cancel
        </Button>
      </div>
    </div>
  );
}

function SignaturePad() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);
  const setDrawnSignatureUrl = useLicenseStore((s) => s.setDrawnSignatureUrl);

  useEffect(() => {
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

  function pos(e: PointerEvent<HTMLCanvasElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  }

  function commit() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    setDrawnSignatureUrl(canvas.toDataURL("image/png"));
  }

  return (
    <div>
      <p className="mb-1.5 text-sm text-fg">Draw signature</p>
      <canvas
        ref={canvasRef}
        className="h-[88px] w-full touch-none rounded-md border border-border bg-paper"
        onPointerDown={(e) => {
          drawing.current = true;
          const ctx = e.currentTarget.getContext("2d");
          if (!ctx) return;
          const p = pos(e);
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          e.currentTarget.setPointerCapture(e.pointerId);
        }}
        onPointerMove={(e) => {
          if (!drawing.current) return;
          const ctx = e.currentTarget.getContext("2d");
          if (!ctx) return;
          const p = pos(e);
          ctx.lineTo(p.x, p.y);
          ctx.stroke();
        }}
        onPointerUp={() => {
          drawing.current = false;
          commit();
        }}
      />
      <Button
        type="button"
        size="sm"
        variant="ghost"
        className="mt-2"
        onClick={() => {
          const canvas = canvasRef.current;
          const ctx = canvas?.getContext("2d");
          if (!canvas || !ctx) return;
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          setDrawnSignatureUrl(null);
        }}
      >
        <Eraser /> Clear signature
      </Button>
    </div>
  );
}
