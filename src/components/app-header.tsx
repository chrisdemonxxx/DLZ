import { RotateCcw } from "lucide-react";
import { JURISDICTION_BY_CODE } from "@/lib/aamva";
import { useLicenseStore } from "@/lib/aamva/store";
import { JurisdictionSelect } from "./jurisdiction-select";
import { Button } from "./ui/button";

export function AppHeader() {
  const form = useLicenseStore((s) => s.form);
  const selectJurisdiction = useLicenseStore((s) => s.selectJurisdiction);
  const loadSpecimen = useLicenseStore((s) => s.loadSpecimen);
  const j = JURISDICTION_BY_CODE[form.jurisdictionCode];

  return (
    <header className="border-b border-border bg-bg">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-3">
          <Mark />
          <div>
            <p className="text-lg font-medium tracking-tight text-fg">Annex D</p>
            <p className="text-xs text-muted">US driver license card and PDF417 workbench</p>
          </div>
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-2 sm:flex-row sm:items-center sm:justify-end">
          <JurisdictionSelect value={form.jurisdictionCode} onChange={selectJurisdiction} />
          <div className="hidden font-mono text-[11px] text-subtle lg:block">
            IIN {j?.iin} · v{String(form.aamvaVersion).padStart(2, "0")}
          </div>
          <Button variant="outline" size="sm" onClick={() => loadSpecimen()}>
            <RotateCcw /> Specimen
          </Button>
        </div>
      </div>
    </header>
  );
}

function Mark() {
  return (
    <svg viewBox="0 0 32 32" className="size-9 rounded-md border border-border bg-surface-2 p-1.5" aria-hidden>
      <rect x="3" y="5" width="26" height="2.2" fill="currentColor" className="text-fg" />
      <rect x="3" y="10" width="18" height="2.2" fill="currentColor" className="text-fg" />
      <rect x="3" y="15" width="24" height="2.2" fill="currentColor" className="text-fg" />
      <rect x="3" y="20" width="14" height="2.2" fill="currentColor" className="text-fg" />
      <rect x="3" y="25" width="22" height="2.2" fill="currentColor" className="text-fg" />
    </svg>
  );
}
