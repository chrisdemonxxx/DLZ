import { createFileRoute } from "@tanstack/react-router";
import { AppHeader } from "@/components/app-header";
import { LicenseForm } from "@/components/license-form";
import { WorkbenchPanel } from "@/components/workbench-panel";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return (
    <div className="min-h-dvh overflow-x-hidden bg-bg text-fg">
      <AppHeader />
      <main className="mx-auto grid max-w-7xl gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(22rem,28rem)] lg:items-start">
        <section className="rounded-xl border border-border bg-surface p-4 sm:p-5">
          <div className="mb-4">
            <h1 className="text-base font-medium tracking-tight">Credential fields</h1>
            <p className="mt-1 text-sm text-muted">
              Build a printable CR80 specimen for any US jurisdiction. Fields encode a live AAMVA PDF417 on the
              back.
            </p>
          </div>
          <LicenseForm />
        </section>
        <aside className="rounded-xl border border-border bg-surface p-4 sm:p-5 lg:sticky lg:top-4">
          <WorkbenchPanel />
        </aside>
      </main>
      <footer className="mx-auto max-w-7xl px-4 pb-10 text-xs leading-relaxed text-subtle sm:px-6">
        Specimen cards and barcodes for scanner software QA. The face is a stylized CR80 layout (not a copy of a
        state plate). The PDF417 follows Annex D structure so ID-capture SDKs can parse it. Neither side is a
        government document.
      </footer>
    </div>
  );
}
