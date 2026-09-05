import { create } from "zustand";
import { applyJurisdiction, createSpecimen } from "./specimen.ts";
import type { LicenseForm, SexCode } from "./types.ts";
import { defaultPortraitForSex, isSpecimenPortrait } from "@/lib/card/portraits.ts";

export type CardOrientation = "auto" | "horizontal" | "vertical";
export type CardSide = "front" | "back";
export type SignatureMode = "auto" | "drawn";

type LicenseState = {
  form: LicenseForm;
  pastedScan: string;
  showQr: boolean;
  portraitUrl: string;
  drawnSignatureUrl: string | null;
  signatureMode: SignatureMode;
  orientation: CardOrientation;
  showGhost: boolean;
  cardSide: CardSide;
  setForm: (patch: Partial<LicenseForm>) => void;
  replaceForm: (form: LicenseForm) => void;
  loadSpecimen: (code?: string) => void;
  selectJurisdiction: (code: string) => void;
  setPastedScan: (value: string) => void;
  setShowQr: (value: boolean) => void;
  setPortraitUrl: (url: string) => void;
  setDrawnSignatureUrl: (url: string | null) => void;
  setSignatureMode: (mode: SignatureMode) => void;
  setOrientation: (orientation: CardOrientation) => void;
  setShowGhost: (value: boolean) => void;
  setCardSide: (side: CardSide) => void;
};

function portraitForForm(form: LicenseForm, current?: string): string {
  if (current && !isSpecimenPortrait(current)) return current;
  return defaultPortraitForSex(form.sex as SexCode).url;
}

export const useLicenseStore = create<LicenseState>()((set) => ({
  form: createSpecimen("VA"),
  pastedScan: "",
  showQr: false,
  portraitUrl: defaultPortraitForSex("1").url,
  drawnSignatureUrl: null,
  signatureMode: "auto",
  orientation: "auto",
  showGhost: true,
  cardSide: "front",
  setForm: (patch) =>
    set((s) => {
      const form = { ...s.form, ...patch };
      const portraitUrl = patch.sex && patch.sex !== s.form.sex ? portraitForForm(form, s.portraitUrl) : s.portraitUrl;
      return { form, portraitUrl };
    }),
  replaceForm: (form) => set({ form, portraitUrl: portraitForForm(form) }),
  loadSpecimen: (code) =>
    set((s) => {
      const form = createSpecimen(code ?? s.form.jurisdictionCode);
      return { form, portraitUrl: portraitForForm(form), drawnSignatureUrl: null, signatureMode: "auto" };
    }),
  selectJurisdiction: (code) =>
    set((s) => ({ form: applyJurisdiction(s.form, code) })),
  setPastedScan: (pastedScan) => set({ pastedScan }),
  setShowQr: (showQr) => set({ showQr }),
  setPortraitUrl: (portraitUrl) => set({ portraitUrl }),
  setDrawnSignatureUrl: (drawnSignatureUrl) => set({ drawnSignatureUrl, signatureMode: drawnSignatureUrl ? "drawn" : "auto" }),
  setSignatureMode: (signatureMode) => set({ signatureMode }),
  setOrientation: (orientation) => set({ orientation }),
  setShowGhost: (showGhost) => set({ showGhost }),
  setCardSide: (cardSide) => set({ cardSide }),
}));
