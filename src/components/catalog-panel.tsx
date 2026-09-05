import { JURISDICTIONS, JURISDICTION_BY_CODE } from "@/lib/aamva";
import { useLicenseStore } from "@/lib/aamva/store";
import { FACE_GENERATIONS, ISO_FIELD_ORDER, generationFor, themeFor } from "@/lib/card";

export function CatalogPanel() {
  const code = useLicenseStore((s) => s.form.jurisdictionCode);
  const selectJurisdiction = useLicenseStore((s) => s.selectJurisdiction);
  const j = JURISDICTION_BY_CODE[code];
  const theme = themeFor(code);
  const gen = generationFor(code);

  return (
    <div className="space-y-4">
      <div>
        <p className="text-sm font-medium text-fg">
          {j?.name} · IIN {j?.iin}
        </p>
        <p className="mt-1 text-xs text-muted">
          Public AAMVA / DMV facts for the current issue generation. Card face uses original specimen art.
        </p>
      </div>

      <dl className="grid grid-cols-2 gap-x-3 gap-y-2 text-[11px]">
        <Fact k="Current face" v={gen.current} />
        <Fact k="Issued from" v={gen.issuedFrom} />
        <Fact k="Previous (to EXP)" v={gen.previous} />
        <Fact k="Previous years" v={gen.previousYears} />
        <Fact k="Legacy / sunset" v={gen.legacy} />
        <Fact k="REAL ID mark" v={gen.realIdMark} />
        <Fact k="Mag stripe" v={gen.magStripe ? "Yes" : "No (CA 2025)"} />
        <Fact k="EDL stock" v={gen.edl ? "Yes" : "No"} />
        <Fact k="Under 21" v={gen.u21 === "vertical-to-65" ? "Vertical; AZ may keep past 21" : "Vertical CR80"} />
        <Fact k="Back" v={gen.back} />
        <Fact k="License pattern" v={j?.licensePattern ?? "—"} mono />
        <Fact k="Header" v={`${theme.headerStyle} · ${theme.agency}`} />
        <Fact k="ISO numbers on face" v={gen.numberedIso ? "Printed (CA / VA / SC)" : "Layout only; NY spells Issued/Expires"} />
        <Fact k="Source" v={gen.source} />
      </dl>

      <div className="rounded-md border border-border bg-surface-2 p-3">
        <p className="text-[10px] font-medium uppercase tracking-wider text-subtle">AAMVA CDS / ISO 18013-1</p>
        <p className="mt-1 font-mono text-[11px] leading-relaxed text-fg">{ISO_FIELD_ORDER}</p>
      </div>

      <div>
        <p className="mb-2 text-[10px] font-medium uppercase tracking-wider text-subtle">All 56 jurisdictions</p>
        <div className="grid grid-cols-8 gap-1 sm:grid-cols-10">
          {JURISDICTIONS.map((row) => {
            const active = row.code === code;
            return (
              <button
                key={row.code}
                type="button"
                onClick={() => selectJurisdiction(row.code)}
                className={
                  active
                    ? "rounded-md bg-fg px-0 py-1.5 text-[10px] font-medium text-bg"
                    : "rounded-md bg-surface-2 px-0 py-1.5 text-[10px] text-muted hover:text-fg"
                }
                title={`${row.name} · ${FACE_GENERATIONS[row.code]?.current ?? ""}`}
              >
                {row.code}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function Fact({ k, v, mono }: { k: string; v: string; mono?: boolean }) {
  return (
    <div className="min-w-0">
      <dt className="text-[10px] uppercase tracking-wider text-subtle">{k}</dt>
      <dd className={`mt-0.5 truncate text-fg ${mono ? "font-mono" : ""}`} title={v}>
        {v}
      </dd>
    </div>
  );
}
