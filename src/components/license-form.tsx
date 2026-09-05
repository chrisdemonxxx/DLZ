import { EYE_COLORS, HAIR_COLORS } from "@/lib/aamva";
import { useLicenseStore } from "@/lib/aamva/store";
import { PortraitFields } from "./portrait-fields";
import { Field } from "./ui/field";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Switch } from "./ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

export function LicenseForm() {
  const form = useLicenseStore((s) => s.form);
  const setForm = useLicenseStore((s) => s.setForm);

  return (
    <Tabs defaultValue="identity" className="w-full">
      <TabsList className="flex h-auto min-h-11 w-full flex-wrap justify-start gap-1">
        <TabsTrigger value="identity" className="flex-none px-3">
          Identity
        </TabsTrigger>
        <TabsTrigger value="address" className="flex-none px-3">
          Address
        </TabsTrigger>
        <TabsTrigger value="credential" className="flex-none px-3">
          License
        </TabsTrigger>
        <TabsTrigger value="physical" className="flex-none px-3">
          Physical
        </TabsTrigger>
        <TabsTrigger value="photo" className="flex-none px-3">
          Photo
        </TabsTrigger>
        <TabsTrigger value="symbol" className="flex-none px-3">
          Symbol
        </TabsTrigger>
      </TabsList>

      <TabsContent value="identity" className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Field label="Family name" htmlFor="familyName" hint="DCS">
          <Input
            id="familyName"
            autoComplete="off"
            value={form.familyName}
            onChange={(e) => setForm({ familyName: e.target.value })}
          />
        </Field>
        <Field label="First name" htmlFor="firstName" hint="DAC">
          <Input
            id="firstName"
            autoComplete="off"
            value={form.firstName}
            onChange={(e) => setForm({ firstName: e.target.value })}
          />
        </Field>
        <Field label="Middle name" htmlFor="middleName" hint="DAD · NONE if blank">
          <Input
            id="middleName"
            autoComplete="off"
            value={form.middleName}
            onChange={(e) => setForm({ middleName: e.target.value })}
          />
        </Field>
        <Field label="Suffix" htmlFor="suffix" hint="DCU optional">
          <Input
            id="suffix"
            autoComplete="off"
            value={form.suffix}
            onChange={(e) => setForm({ suffix: e.target.value })}
          />
        </Field>
        <Field label="Date of birth" htmlFor="dob" hint="DBB">
          <Input id="dob" type="date" value={form.dob} onChange={(e) => setForm({ dob: e.target.value })} />
        </Field>
        <Field label="Sex" hint="DBC">
          <Select value={form.sex} onValueChange={(sex) => setForm({ sex: sex as typeof form.sex })}>
            <SelectTrigger aria-label="Sex">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Male (1)</SelectItem>
              <SelectItem value="2">Female (2)</SelectItem>
              <SelectItem value="9">Not specified (9)</SelectItem>
            </SelectContent>
          </Select>
        </Field>
      </TabsContent>

      <TabsContent value="address" className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Field label="Street" htmlFor="street" hint="DAG" className="sm:col-span-2">
          <Input id="street" value={form.street} onChange={(e) => setForm({ street: e.target.value })} />
        </Field>
        <Field label="Street 2" htmlFor="street2" hint="DAH optional" className="sm:col-span-2">
          <Input id="street2" value={form.street2} onChange={(e) => setForm({ street2: e.target.value })} />
        </Field>
        <Field label="City" htmlFor="city" hint="DAI">
          <Input id="city" value={form.city} onChange={(e) => setForm({ city: e.target.value })} />
        </Field>
        <Field label="Postal code" htmlFor="postal" hint="DAK · padded to 11">
          <Input id="postal" inputMode="numeric" value={form.postal} onChange={(e) => setForm({ postal: e.target.value })} />
        </Field>
      </TabsContent>

      <TabsContent value="credential" className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Field label="Document" hint="Subfile type">
          <Select
            value={form.documentKind}
            onValueChange={(documentKind) =>
              setForm({
                documentKind: documentKind as typeof form.documentKind,
                vehicleClass: documentKind === "ID" ? "NONE" : form.vehicleClass,
              })
            }
          >
            <SelectTrigger aria-label="Document type">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="DL">Driver license</SelectItem>
              <SelectItem value="ID">Identification card</SelectItem>
            </SelectContent>
          </Select>
        </Field>
        <Field label="Customer ID / license no." htmlFor="licenseNumber" hint="DAQ">
          <Input
            id="licenseNumber"
            className="font-mono uppercase"
            value={form.licenseNumber}
            onChange={(e) => setForm({ licenseNumber: e.target.value })}
          />
        </Field>
        <Field label="Vehicle class" htmlFor="vehicleClass" hint="DCA">
          <Input
            id="vehicleClass"
            className="font-mono uppercase"
            value={form.vehicleClass}
            onChange={(e) => setForm({ vehicleClass: e.target.value })}
          />
        </Field>
        <Field label="Restrictions" htmlFor="restrictions" hint="DCB">
          <Input
            id="restrictions"
            className="font-mono uppercase"
            value={form.restrictions}
            onChange={(e) => setForm({ restrictions: e.target.value })}
          />
        </Field>
        <Field label="Endorsements" htmlFor="endorsements" hint="DCD">
          <Input
            id="endorsements"
            className="font-mono uppercase"
            value={form.endorsements}
            onChange={(e) => setForm({ endorsements: e.target.value })}
          />
        </Field>
        <Field label="REAL ID" hint="DDA">
          <Select
            value={form.compliance}
            onValueChange={(compliance) => setForm({ compliance: compliance as typeof form.compliance })}
          >
            <SelectTrigger aria-label="REAL ID compliance">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="F">Fully compliant (F)</SelectItem>
              <SelectItem value="N">Non-compliant (N)</SelectItem>
              <SelectItem value="M">Materially compliant (M)</SelectItem>
            </SelectContent>
          </Select>
        </Field>
        <Field label="Issue date" htmlFor="issueDate" hint="DBD">
          <Input id="issueDate" type="date" value={form.issueDate} onChange={(e) => setForm({ issueDate: e.target.value })} />
        </Field>
        <Field label="Expiration" htmlFor="expDate" hint="DBA">
          <Input id="expDate" type="date" value={form.expDate} onChange={(e) => setForm({ expDate: e.target.value })} />
        </Field>
        <Field label="Document discriminator" htmlFor="discriminator" hint="DCF" className="sm:col-span-2">
          <Input
            id="discriminator"
            className="font-mono"
            value={form.discriminator}
            onChange={(e) => setForm({ discriminator: e.target.value })}
          />
        </Field>
        <Field label="Inventory control" htmlFor="inventory" hint="DCK">
          <Input
            id="inventory"
            className="font-mono"
            value={form.inventory}
            onChange={(e) => setForm({ inventory: e.target.value })}
          />
        </Field>
        <Field label="Card revision" htmlFor="cardRevision" hint="DDB">
          <Input
            id="cardRevision"
            type="date"
            value={form.cardRevision}
            onChange={(e) => setForm({ cardRevision: e.target.value })}
          />
        </Field>
        <ToggleRow
          label="Limited duration"
          hint="DDD"
          checked={form.limitedDuration}
          onCheckedChange={(limitedDuration) => setForm({ limitedDuration })}
        />
      </TabsContent>

      <TabsContent value="physical" className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Field label="Height" htmlFor="height" hint="DAU · 068 in or 5'8">
          <Input id="height" value={form.height} onChange={(e) => setForm({ height: e.target.value })} />
        </Field>
        <Field label="Weight (lb)" htmlFor="weightLbs" hint="DAW">
          <Input
            id="weightLbs"
            inputMode="numeric"
            value={form.weightLbs}
            onChange={(e) => setForm({ weightLbs: e.target.value })}
          />
        </Field>
        <Field label="Eyes" hint="DAY">
          <Select value={form.eyes} onValueChange={(eyes) => setForm({ eyes })}>
            <SelectTrigger aria-label="Eye color">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {EYE_COLORS.map((c) => (
                <SelectItem key={c.code} value={c.code}>
                  {c.label} ({c.code})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
        <Field label="Hair" hint="DAZ">
          <Select value={form.hair} onValueChange={(hair) => setForm({ hair })}>
            <SelectTrigger aria-label="Hair color">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {HAIR_COLORS.map((c) => (
                <SelectItem key={c.code} value={c.code}>
                  {c.label} ({c.code})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
        <ToggleRow
          label="Organ donor"
          hint="DDH"
          checked={form.organDonor}
          onCheckedChange={(organDonor) => setForm({ organDonor })}
        />
        <ToggleRow
          label="Veteran"
          hint="DDI"
          checked={form.veteran}
          onCheckedChange={(veteran) => setForm({ veteran })}
        />
      </TabsContent>

      <TabsContent value="photo">
        <PortraitFields />
      </TabsContent>

      <TabsContent value="symbol" className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Field label="AAMVA version" hint="Header">
          <Select
            value={String(form.aamvaVersion)}
            onValueChange={(v) => setForm({ aamvaVersion: Number(v) })}
          >
            <SelectTrigger aria-label="AAMVA version">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {[
                ["4", "04 · 2009"],
                ["8", "08 · 2013"],
                ["9", "09 · 2016"],
                ["10", "10 · 2020"],
              ].map(([v, label]) => (
                <SelectItem key={v} value={v}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
        <Field label="Jurisdiction version" htmlFor="jurisdictionVersion">
          <Input
            id="jurisdictionVersion"
            inputMode="numeric"
            value={String(form.jurisdictionVersion)}
            onChange={(e) => setForm({ jurisdictionVersion: Number.parseInt(e.target.value || "0", 10) || 0 })}
          />
        </Field>
        <Field label="PDF417 columns" htmlFor="pdf417Columns" hint="AAMVA typical: 13">
          <Input
            id="pdf417Columns"
            type="number"
            min={6}
            max={30}
            value={form.pdf417Columns}
            onChange={(e) => setForm({ pdf417Columns: Number.parseInt(e.target.value, 10) || 13 })}
          />
        </Field>
        <Field label="Error correction" htmlFor="pdf417EcLevel" hint="AAMVA typical: 5">
          <Input
            id="pdf417EcLevel"
            type="number"
            min={0}
            max={8}
            value={form.pdf417EcLevel}
            onChange={(e) => setForm({ pdf417EcLevel: Number.parseInt(e.target.value, 10) || 5 })}
          />
        </Field>
        <ToggleRow
          label="Jurisdiction Z-subfile"
          hint="Z + state initial"
          checked={form.includeJurisdictionSubfile}
          onCheckedChange={(includeJurisdictionSubfile) => setForm({ includeJurisdictionSubfile })}
        />
        <ToggleRow
          label="Compact PDF417"
          hint="Truncated stop pattern"
          checked={form.compactPdf417}
          onCheckedChange={(compactPdf417) => setForm({ compactPdf417 })}
        />
      </TabsContent>
    </Tabs>
  );
}

function ToggleRow({
  label,
  hint,
  checked,
  onCheckedChange,
}: {
  label: string;
  hint?: string;
  checked: boolean;
  onCheckedChange: (value: boolean) => void;
}) {
  return (
    <div className="flex h-11 items-center justify-between gap-3 rounded-md border border-border bg-surface-2 px-3">
      <div className="min-w-0">
        <p className="text-sm text-fg">{label}</p>
        {hint ? <p className="font-mono text-[11px] text-subtle">{hint}</p> : null}
      </div>
      <Switch checked={checked} onCheckedChange={onCheckedChange} aria-label={label} />
    </div>
  );
}
