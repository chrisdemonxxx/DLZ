import { useMemo, useState } from "react";
import { useLicenseStore } from "@/lib/aamva/store";
import { verifyPayload, type CheckSeverity, type ScannerExtract, type VerifyCheck } from "@/lib/aamva";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

export function VerifyPanel({ payload, decoded }: { payload: string; decoded?: string | null }) {
  const form = useLicenseStore((s) => s.form);
  const [showPasses, setShowPasses] = useState(false);
  const report = useMemo(() => {
    const base = verifyPayload(payload, form);
    if (decoded === undefined) return base;
    const extra: VerifyCheck = decoded
      ? decoded === payload
        ? {
            id: "image-roundtrip",
            label: "PDF417 image round-trip",
            severity: "pass",
            detail: "ZXing recovered the exact AAMVA payload from the rendered symbol",
          }
        : {
            id: "image-roundtrip",
            label: "PDF417 image round-trip",
            severity: "warn",
            detail: "Symbol decoded but the bytes differ from the encoder output",
          }
      : {
          id: "image-roundtrip",
          label: "PDF417 image round-trip",
          severity: "warn",
          detail: "Could not decode the PNG in-browser. The symbol is still AAMVA-structured; try a hardware scanner.",
        };
    const checks = [...base.checks, extra];
    return {
      ...base,
      checks,
      passed: checks.filter((c) => c.severity === "pass").length,
      failed: checks.filter((c) => c.severity === "fail").length,
      warnings: checks.filter((c) => c.severity === "warn").length,
    };
  }, [payload, form, decoded]);

  const overall: CheckSeverity = report.failed ? "fail" : report.warnings ? "warn" : "pass";
  const notable = report.checks.filter((c) => c.severity !== "pass");
  const visible = showPasses ? report.checks : notable.length ? notable : report.checks.slice(0, 6);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-end justify-between gap-3">
        <div>
          <p className="text-xs font-medium tracking-wide text-muted">Annex D report</p>
          <p className="mt-1 font-mono text-2xl tabular-nums text-fg">
            {report.passed}
            <span className="text-subtle">/{report.checks.length}</span>
          </p>
        </div>
        <Badge variant={overall}>
          {report.failed ? `${report.failed} failed` : report.warnings ? `${report.warnings} warnings` : "All checks passed"}
        </Badge>
      </div>

      {report.scanner ? <ScannerCard data={report.scanner} /> : null}

      <div className="overflow-hidden rounded-lg border border-border">
        <ul className="max-h-72 divide-y divide-border overflow-y-auto">
          {visible.map((check) => (
            <li key={check.id} className="flex gap-3 bg-surface-2/60 px-3 py-2.5">
              <SeverityDot severity={check.severity} />
              <div className="min-w-0 flex-1">
                <p className="text-sm text-fg">{check.label}</p>
                <p className="truncate font-mono text-[11px] text-subtle">{check.detail}</p>
              </div>
            </li>
          ))}
        </ul>
        <div className="border-t border-border bg-surface-2 px-2 py-1.5">
          <Button variant="ghost" size="sm" className="h-8 w-full text-xs" onClick={() => setShowPasses((v) => !v)}>
            {showPasses ? "Hide passing checks" : `Show all ${report.checks.length} checks`}
          </Button>
        </div>
      </div>
    </div>
  );
}

function ScannerCard({ data }: { data: ScannerExtract }) {
  const rows: [string, string][] = [
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
    ["REAL ID", data.realId],
  ];

  return (
    <div className="rounded-lg border border-border bg-surface-2 p-4">
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <p className="text-xs font-medium tracking-wide text-muted">Scanner extract</p>
        <Badge variant={data.expired ? "fail" : "pass"}>{data.expired ? "Expired" : "Unexpired"}</Badge>
        {data.under21 ? <Badge variant="warn">Under 21</Badge> : <Badge variant="pass">21+</Badge>}
        {data.organDonor ? <Badge>Donor</Badge> : null}
        {data.veteran ? <Badge>Veteran</Badge> : null}
        <Badge>
          {data.documentKind} · v{String(data.aamvaVersion).padStart(2, "0")}
        </Badge>
      </div>
      <dl className="grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2">
        {rows.map(([k, v]) => (
          <div key={k} className="min-w-0">
            <dt className="text-[11px] text-subtle">{k}</dt>
            <dd className="truncate font-mono text-sm text-fg">{v || "—"}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function SeverityDot({ severity }: { severity: CheckSeverity }) {
  return (
    <span
      className={cn(
        "mt-1 size-2 shrink-0 rounded-full",
        severity === "pass" && "bg-pass",
        severity === "fail" && "bg-fail",
        severity === "warn" && "bg-warn",
      )}
      aria-hidden
    />
  );
}
