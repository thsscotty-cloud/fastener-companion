// ============================================================
// BATCH 04 — CALCULATORS, DIMENSIONAL TOOLS & SYSTEMS/APPLICATIONS
// Fastener Companion App
//
// Named exports — import as:
//   import { TorqueCalculator, ThreadEngagement, PreloadCalculator,
//            BoltLengthGuide, FastenerTypeReference, ClearanceHoles,
//            CboreCsink, WeightCount, PipeThreadReference,
//            VibrationGuide, StandardsReference, ConditionAssessment,
//            StorageHandling, AnchorBoltReference, FlangeBoltChart,
//            CertificationGuide, IndustryGuide,
//            TempRatingReference } from './batch-04-calculators-systems'
//
// Design tokens: Navy #1B3A6B · Amber #F6AD55 · DM Sans · 430px mobile-first
// ⬡ logo · ★ common sizes · ⚠ disclaimer on all components
// Sources cited inline per component
// ============================================================

import { useState } from "react";

// ─── SHARED DESIGN TOKENS ────────────────────────────────────
const NAVY = "#1B3A6B";
const AMBER = "#F6AD55";
const BG = "#F7F9FC";
const WHITE = "#FFFFFF";
const BORDER = "#E2E8F0";
const TEXT = "#1E293B";
const MUTED = "#94A3B8";
const ROW_ALT = "#F8FAFC";
const STAR_BG = "#FFF8E7";
const STAR_BORDER = "#FDE68A";


// ════════════════════════════════════════════════════
// TorqueCalculator
// ════════════════════════════════════════════════════

// ─── DATA ─────────────────────────────────────────────────────────────────────
// Sources: IFI Fastener Standards 7th Edition, SAE J429, ASTM F3125,
// Machinery's Handbook 31st Ed., Bickford "Introduction to the Design and
// Behavior of Bolted Joints", Engineers Edge torque tables

// Torque formula: T = K × D × F
// K = nut factor (friction coefficient)
// D = nominal diameter (inches)
// F = desired clamp load (lbs) = proof load × stress area × target preload %

// Stress areas per ASME B1.1
const STRESS_AREAS = {
  "1/4-20":  { area: 0.0318, d: 0.250 },
  "1/4-28":  { area: 0.0364, d: 0.250 },
  "5/16-18": { area: 0.0524, d: 0.3125 },
  "5/16-24": { area: 0.0580, d: 0.3125 },
  "3/8-16":  { area: 0.0775, d: 0.375 },
  "3/8-24":  { area: 0.0878, d: 0.375 },
  "7/16-14": { area: 0.1063, d: 0.4375 },
  "7/16-20": { area: 0.1187, d: 0.4375 },
  "1/2-13":  { area: 0.1419, d: 0.500 },
  "1/2-20":  { area: 0.1599, d: 0.500 },
  "9/16-12": { area: 0.1820, d: 0.5625 },
  "9/16-18": { area: 0.2030, d: 0.5625 },
  "5/8-11":  { area: 0.2260, d: 0.625 },
  "5/8-18":  { area: 0.2560, d: 0.625 },
  "3/4-10":  { area: 0.3340, d: 0.750 },
  "3/4-16":  { area: 0.3730, d: 0.750 },
  "7/8-9":   { area: 0.4620, d: 0.875 },
  "7/8-14":  { area: 0.5090, d: 0.875 },
  "1-8":     { area: 0.6060, d: 1.000 },
  "1-12":    { area: 0.6630, d: 1.000 },
  "1-14":    { area: 0.6780, d: 1.000 },
  "1 1/8-7": { area: 0.7630, d: 1.125 },
  "1 1/4-7": { area: 0.9690, d: 1.250 },
  "1 3/8-6": { area: 1.155,  d: 1.375 },
  "1 1/2-6": { area: 1.405,  d: 1.500 },
};

const METRIC_STRESS_AREAS = {
  "M6 x 1.0":    { area: 0.00452, d: 0.00600 },  // m²
  "M8 x 1.25":   { area: 0.00845, d: 0.00800 },
  "M10 x 1.5":   { area: 0.01400, d: 0.01000 },
  "M12 x 1.75":  { area: 0.02030, d: 0.01200 },
  "M14 x 2.0":   { area: 0.02760, d: 0.01400 },
  "M16 x 2.0":   { area: 0.03570, d: 0.01600 },
  "M18 x 2.5":   { area: 0.04520, d: 0.01800 },
  "M20 x 2.5":   { area: 0.05450, d: 0.02000 },
  "M22 x 2.5":   { area: 0.07030, d: 0.02200 },
  "M24 x 3.0":   { area: 0.08430, d: 0.02400 },
  "M27 x 3.0":   { area: 0.10600, d: 0.02700 },
  "M30 x 3.5":   { area: 0.13000, d: 0.03000 },
  "M36 x 4.0":   { area: 0.19200, d: 0.03600 },
};

// Proof loads in PSI for imperial, MPa for metric
const GRADE_DATA = {
  imperial: {
    "Grade 2 (≤3/4\")":  { proof: 55000,  tensile: 74000,  name: "SAE Grade 2" },
    "Grade 2 (>3/4\")":  { proof: 33000,  tensile: 60000,  name: "SAE Grade 2 (large)" },
    "Grade 5 (≤1\")":    { proof: 85000,  tensile: 120000, name: "SAE Grade 5" },
    "Grade 5 (>1\")":    { proof: 74000,  tensile: 105000, name: "SAE Grade 5 (large)" },
    "Grade 8":           { proof: 120000, tensile: 150000, name: "SAE Grade 8" },
    "A307 Grade A":      { proof: 0,      tensile: 60000,  name: "ASTM A307" },
    "A325 (≤1\")":       { proof: 85000,  tensile: 120000, name: "ASTM A325" },
    "A325 (>1\")":       { proof: 74000,  tensile: 105000, name: "ASTM A325 (large)" },
    "A490":              { proof: 120000, tensile: 150000, name: "ASTM A490" },
    "A354 BD":           { proof: 120000, tensile: 150000, name: "ASTM A354 BD" },
    "A193 B7 (≤2.5\")":  { proof: 0,      tensile: 125000, name: "ASTM A193 B7" },
  },
  metric: {
    "8.8":   { proof: 580,  tensile: 800,  name: "ISO 8.8" },
    "10.9":  { proof: 830,  tensile: 1040, name: "ISO 10.9" },
    "12.9":  { proof: 970,  tensile: 1220, name: "ISO 12.9" },
    "A2-70": { proof: 450,  tensile: 700,  name: "ISO A2-70 (304 SS)" },
    "A4-70": { proof: 450,  tensile: 700,  name: "ISO A4-70 (316 SS)" },
    "A4-80": { proof: 600,  tensile: 800,  name: "ISO A4-80 (316 SS)" },
    "4.6":   { proof: 225,  tensile: 400,  name: "ISO 4.6" },
    "5.8":   { proof: 380,  tensile: 520,  name: "ISO 5.8" },
  },
};

// K-factors by condition
const K_FACTORS = {
  "Dry / No Lubrication":           { k: 0.20, color: "#64748B" },
  "Zinc Plated (dry)":              { k: 0.17, color: "#2563EB" },
  "Slightly Oiled":                 { k: 0.17, color: "#2563EB" },
  "Machine Oil (light lubrication)": { k: 0.15, color: "#059669" },
  "Anti-Seize — Copper":            { k: 0.13, color: "#D97706" },
  "Anti-Seize — Nickel":            { k: 0.13, color: "#D97706" },
  "Anti-Seize — Moly (MoS₂)":      { k: 0.11, color: "#7C3AED" },
  "Waxed / PTFE":                   { k: 0.15, color: "#059669" },
  "Hot-Dip Galvanized":             { k: 0.19, color: "#64748B" },
  "Cadmium Plated":                 { k: 0.14, color: "#0891B2" },
};

function calcTorque(size, gradeKey, kKey, preloadPct, system) {
  const kData = K_FACTORS[kKey];
  const gradeInfo = system === "imperial" ? GRADE_DATA.imperial[gradeKey] : GRADE_DATA.metric[gradeKey];
  const sizeData = system === "imperial" ? STRESS_AREAS[size] : METRIC_STRESS_AREAS[size];
  if (!kData || !gradeInfo || !sizeData) return null;

  const k = kData.k;
  const pct = preloadPct / 100;

  if (system === "imperial") {
    const proofLoad = gradeInfo.proof > 0 ? gradeInfo.proof : gradeInfo.tensile * 0.75;
    const clampLoad = proofLoad * sizeData.area * pct; // lbs
    const torque_inlb = k * sizeData.d * 12 * clampLoad; // in-lb (d in inches, multiply to get in-lb)
    const torque_ftlb = torque_inlb / 12;
    const torque_nm = torque_ftlb * 1.3558;
    return {
      clampLoad: Math.round(clampLoad),
      torque_ftlb: Math.round(torque_ftlb),
      torque_inlb: Math.round(torque_inlb),
      torque_nm: Math.round(torque_nm),
      k,
      proofLoad: gradeInfo.proof > 0 ? gradeInfo.proof : null,
      tensile: gradeInfo.tensile,
    };
  } else {
    // Metric: T = K × d × F, d in meters, F in N, T in Nm
    const proofLoad_mpa = gradeInfo.proof > 0 ? gradeInfo.proof : gradeInfo.tensile * 0.75;
    const proofLoad_pa = proofLoad_mpa * 1e6;
    const clampLoad_n = proofLoad_pa * sizeData.area * pct; // N
    const torque_nm = k * sizeData.d * clampLoad_n; // Nm
    const torque_ftlb = torque_nm / 1.3558;
    const torque_inlb = torque_ftlb * 12;
    return {
      clampLoad: Math.round(clampLoad_n),
      torque_nm: Math.round(torque_nm),
      torque_ftlb: Math.round(torque_ftlb),
      torque_inlb: Math.round(torque_inlb * 10) / 10,
      k,
      proofLoad: gradeInfo.proof > 0 ? gradeInfo.proof : null,
      tensile: gradeInfo.tensile,
    };
  }
}



// ════════════════════════════════════════════════════
// ThreadEngagement
// ════════════════════════════════════════════════════

// ─── DATA ─────────────────────────────────────────────────────────────────────
// Sources: Machinery's Handbook 31st Ed., ASME B1.1, ISO 68-1,
// Shigley's Mechanical Engineering Design, IFI 7th Edition,
// Engineers Edge thread engagement tables

// Thread engagement factors by material combination
// Based on Shigley's formula: Le = (2 × As × Sp) / (0.5 × π × D × Ssy_female × 1.155)
// Simplified to practical multiplier of nominal diameter

const MATERIAL_FACTORS = {
  "Steel (same grade as bolt)": {
    multiplier: 1.0,
    desc: "1× diameter — standard minimum for steel-to-steel",
    color: "#059669",
    notes: "Steel-to-steel at similar strength: minimum 1D engagement provides full bolt strength utilization. Common in machinery and structural applications.",
  },
  "Steel (lower strength than bolt)": {
    multiplier: 1.25,
    desc: "1.25× diameter — lower strength female thread",
    color: "#2563EB",
    notes: "When tapped hole material is softer than bolt grade, increase engagement to prevent thread stripping before bolt yield.",
  },
  "Cast Iron": {
    multiplier: 1.5,
    desc: "1.5× diameter — brittle, lower shear strength",
    color: "#D97706",
    notes: "Cast iron is brittle and has lower thread shear strength than steel. Minimum 1.5D required. Consider thread inserts (Helicoil) for critical applications.",
  },
  "Aluminum (6061-T6 or similar)": {
    multiplier: 1.5,
    desc: "1.5× diameter — softer material, standard",
    color: "#D97706",
    notes: "Aluminum has lower shear strength than steel. 1.5D provides full bolt strength utilization. For critical applications or repeated assembly, use Helicoil inserts.",
  },
  "Aluminum (soft, 2024 or below)": {
    multiplier: 2.0,
    desc: "2× diameter — soft aluminum, higher risk",
    color: "#DC2626",
    notes: "Soft aluminum alloys have significantly lower thread shear strength. 2D minimum. Thread inserts strongly recommended for any critical or frequently assembled joint.",
  },
  "Magnesium Alloy": {
    multiplier: 2.0,
    desc: "2× diameter — very low shear strength",
    color: "#DC2626",
    notes: "Magnesium has very low thread shear strength. 2D minimum. Thread inserts are almost always recommended in magnesium to prevent stripping.",
  },
  "Brass / Copper": {
    multiplier: 1.25,
    desc: "1.25× diameter",
    color: "#2563EB",
    notes: "Brass has moderate strength. 1.25D typically adequate for standard hex bolts. Verify for high-strength fasteners.",
  },
  "Plastic / Thermoplastic": {
    multiplier: 3.0,
    desc: "3× diameter minimum — very low strength",
    color: "#DC2626",
    notes: "Plastics have very low thread shear strength. Use formed threads (self-tapping) where possible. For tapped plastic, 3D+ engagement and thread inserts (heat-set brass) recommended.",
  },
};

const IMPERIAL_SIZES = [
  { size: "1/4-20 UNC",  d: 0.250, tpi: 20, pitch: 0.050 },
  { size: "1/4-28 UNF",  d: 0.250, tpi: 28, pitch: 0.0357 },
  { size: "5/16-18 UNC", d: 0.3125, tpi: 18, pitch: 0.0556 },
  { size: "5/16-24 UNF", d: 0.3125, tpi: 24, pitch: 0.0417 },
  { size: "3/8-16 UNC",  d: 0.375, tpi: 16, pitch: 0.0625 },
  { size: "3/8-24 UNF",  d: 0.375, tpi: 24, pitch: 0.0417 },
  { size: "7/16-14 UNC", d: 0.4375, tpi: 14, pitch: 0.0714 },
  { size: "7/16-20 UNF", d: 0.4375, tpi: 20, pitch: 0.050 },
  { size: "1/2-13 UNC",  d: 0.500, tpi: 13, pitch: 0.0769 },
  { size: "1/2-20 UNF",  d: 0.500, tpi: 20, pitch: 0.050 },
  { size: "9/16-12 UNC", d: 0.5625, tpi: 12, pitch: 0.0833 },
  { size: "9/16-18 UNF", d: 0.5625, tpi: 18, pitch: 0.0556 },
  { size: "5/8-11 UNC",  d: 0.625, tpi: 11, pitch: 0.0909 },
  { size: "5/8-18 UNF",  d: 0.625, tpi: 18, pitch: 0.0556 },
  { size: "3/4-10 UNC",  d: 0.750, tpi: 10, pitch: 0.100 },
  { size: "3/4-16 UNF",  d: 0.750, tpi: 16, pitch: 0.0625 },
  { size: "7/8-9 UNC",   d: 0.875, tpi: 9, pitch: 0.1111 },
  { size: "7/8-14 UNF",  d: 0.875, tpi: 14, pitch: 0.0714 },
  { size: "1-8 UNC",     d: 1.000, tpi: 8, pitch: 0.125 },
  { size: "1-12 UNF",    d: 1.000, tpi: 12, pitch: 0.0833 },
  { size: "1 1/4-7 UNC", d: 1.250, tpi: 7, pitch: 0.1429 },
  { size: "1 1/2-6 UNC", d: 1.500, tpi: 6, pitch: 0.1667 },
];

const METRIC_SIZES = [
  { size: "M4 x 0.7",   d: 4,  pitch: 0.7 },
  { size: "M5 x 0.8",   d: 5,  pitch: 0.8 },
  { size: "M6 x 1.0",   d: 6,  pitch: 1.0 },
  { size: "M8 x 1.25",  d: 8,  pitch: 1.25 },
  { size: "M10 x 1.5",  d: 10, pitch: 1.5 },
  { size: "M12 x 1.75", d: 12, pitch: 1.75 },
  { size: "M14 x 2.0",  d: 14, pitch: 2.0 },
  { size: "M16 x 2.0",  d: 16, pitch: 2.0 },
  { size: "M18 x 2.5",  d: 18, pitch: 2.5 },
  { size: "M20 x 2.5",  d: 20, pitch: 2.5 },
  { size: "M22 x 2.5",  d: 22, pitch: 2.5 },
  { size: "M24 x 3.0",  d: 24, pitch: 3.0 },
  { size: "M27 x 3.0",  d: 27, pitch: 3.0 },
  { size: "M30 x 3.5",  d: 30, pitch: 3.5 },
  { size: "M36 x 4.0",  d: 36, pitch: 4.0 },
  { size: "M42 x 4.5",  d: 42, pitch: 4.5 },
  { size: "M48 x 5.0",  d: 48, pitch: 5.0 },
];

const REPAIR_OPTIONS = [
  {
    name: "Helicoil (Wire Thread Insert)",
    strength_recovery: "100%",
    available: "★ COTS — Widely Available",
    avail_color: "#059669",
    best_for: "Steel, aluminum, soft metals — most common repair method",
    drill_size: "Requires specific Helicoil tap drill size (larger than original)",
    notes: "Coil of stainless wire forms new internal thread. Installed with special tool. After install, break off tang. Most economical and widely stocked repair.",
  },
  {
    name: "Keensert (Key-Locking Insert)",
    strength_recovery: "100%+",
    available: "COTS — Available",
    avail_color: "#D97706",
    best_for: "High load, frequent disassembly, soft materials",
    drill_size: "Specific Keensert drill/tap size required",
    notes: "Solid stainless insert with locking keys that deform into parent material. Stronger than Helicoil for high-load applications. Better for repeated assembly/disassembly.",
  },
  {
    name: "E-Z Lok Thread Insert",
    strength_recovery: "100%",
    available: "COTS — Available",
    avail_color: "#D97706",
    best_for: "Aluminum and soft materials, clean installation",
    drill_size: "Specific E-Z Lok drill/tap size",
    notes: "Pressed-in solid insert with external knurls that grip parent material. Easy installation — no special tools required beyond drill and tap.",
  },
  {
    name: "Re-tap to Next Larger Size",
    strength_recovery: "Full strength at new size",
    available: "Any — requires tap set",
    avail_color: "#2563EB",
    best_for: "When space allows and mating fastener can be changed",
    drill_size: "Standard tap drill for larger size",
    notes: "If design allows, simply re-tap to next standard size (e.g. 3/8-16 → 7/16-14, M10 → M12). All mating fasteners must be replaced with new size.",
  },
];

export default function ThreadEngagement() {
  const [system, setSystem] = useState("imperial");
  const [sizeIdx, setSizeIdx] = useState(8); // 1/2-13 default
  const [material, setMaterial] = useState("Aluminum (6061-T6 or similar)");
  const [holeType, setHoleType] = useState("through");
  const [customDepth, setCustomDepth] = useState("");
  const [result, setResult] = useState(null);
  const [activeTab, setActiveTab] = useState("calc");

  const sizes = system === "imperial" ? IMPERIAL_SIZES : METRIC_SIZES;
  const selectedSize = sizes[sizeIdx];
  const matFactor = MATERIAL_FACTORS[material];

  const handleCalc = () => {
    if (!selectedSize || !matFactor) return;
    const d = selectedSize.d;
    const pitch = selectedSize.pitch;
    const multiplier = matFactor.multiplier;
    const minEngagement = d * multiplier;
    const minThreads = Math.ceil(minEngagement / pitch);
    const recommendedEngagement = minEngagement * 1.25; // 25% safety margin
    const recommendedThreads = Math.ceil(recommendedEngagement / pitch);

    const stripping_risk = customDepth
      ? (parseFloat(customDepth) < minEngagement ? "HIGH" : parseFloat(customDepth) < recommendedEngagement ? "MODERATE" : "LOW")
      : null;

    setResult({
      d,
      pitch,
      multiplier,
      minEngagement: Math.round(minEngagement * 1000) / 1000,
      minEngagement_mm: Math.round(minEngagement * 25.4 * 10) / 10,
      minThreads,
      recommendedEngagement: Math.round(recommendedEngagement * 1000) / 1000,
      recommendedEngagement_mm: Math.round(recommendedEngagement * 25.4 * 10) / 10,
      recommendedThreads,
      customDepth: customDepth ? parseFloat(customDepth) : null,
      stripping_risk,
    });
  };

  const handleSystem = (s) => {
    setSystem(s);
    setSizeIdx(s === "imperial" ? 8 : 4);
    setResult(null);
    setCustomDepth("");
  };

  return (
    <div style={{ fontFamily: "'DM Sans','Segoe UI',sans-serif", background: BG, minHeight: "100vh", maxWidth: 430, margin: "0 auto" }}>
      <div style={{ background: `linear-gradient(135deg, ${NAVY} 0%, #2C5282 100%)`, padding: "16px 20px 20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
          <span style={{ fontSize: 20 }}>⬡</span>
          <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 10, letterSpacing: 2, textTransform: "uppercase" }}>Fastener Companion</span>
        </div>
        <div style={{ color: WHITE, fontSize: 20, fontWeight: 800, marginBottom: 2 }}>Thread Engagement Calculator</div>
        <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 11 }}>Machinery's Handbook 31st Ed. · ASME B1.1 · ISO 68-1 · Shigley's MED · IFI 7th Ed.</div>
      </div>

      {/* TABS */}
      <div style={{ background: WHITE, borderBottom: `1px solid ${BORDER}`, padding: "0 8px", display: "flex" }}>
        {[{ id: "calc", label: "Calculator" }, { id: "repair", label: "Thread Repair" }].map(t => (
          <button key={t.id} onClick={() => setActiveTab(t.id)}
            style={{ background: "none", border: "none", cursor: "pointer", padding: "12px 16px", fontSize: 12, fontWeight: 700, fontFamily: "inherit", color: activeTab === t.id ? NAVY : MUTED, borderBottom: activeTab === t.id ? `3px solid ${AMBER}` : "3px solid transparent" }}>
            {t.label}
          </button>
        ))}
      </div>

      {activeTab === "calc" && (
        <div style={{ padding: "14px 16px" }}>
          <div style={{ background: STAR_BG, border: `1px solid ${STAR_BORDER}`, borderRadius: 10, padding: "10px 14px", marginBottom: 14 }}>
            <div style={{ fontSize: 11, color: "#92400E", lineHeight: 1.5 }}>
              Minimum thread engagement ensures the bolt breaks before the threads strip — the safe failure mode. Insufficient engagement = stripped threads with no warning.
            </div>
          </div>

          {/* SYSTEM */}
          <div style={{ display: "flex", background: WHITE, border: `1px solid ${BORDER}`, borderRadius: 10, padding: 4, marginBottom: 12 }}>
            {["imperial", "metric"].map(s => (
              <button key={s} onClick={() => handleSystem(s)}
                style={{ flex: 1, background: system === s ? NAVY : "none", color: system === s ? WHITE : MUTED, border: "none", borderRadius: 8, padding: "8px", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", textTransform: "capitalize" }}>
                {s}
              </button>
            ))}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 14 }}>
            {/* SIZE */}
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: NAVY, marginBottom: 4 }}>Thread Size</div>
              <select value={sizeIdx} onChange={e => { setSizeIdx(Number(e.target.value)); setResult(null); }}
                style={{ width: "100%", background: WHITE, border: `1px solid ${BORDER}`, borderRadius: 10, padding: "10px 14px", fontSize: 13, color: TEXT, fontFamily: "inherit", outline: "none" }}>
                {sizes.map((s, i) => <option key={s.size} value={i}>{s.size}</option>)}
              </select>
            </div>

            {/* MATERIAL */}
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: NAVY, marginBottom: 4 }}>Female Thread Material (Tapped Hole)</div>
              <select value={material} onChange={e => { setMaterial(e.target.value); setResult(null); }}
                style={{ width: "100%", background: WHITE, border: `1px solid ${BORDER}`, borderRadius: 10, padding: "10px 14px", fontSize: 13, color: TEXT, fontFamily: "inherit", outline: "none" }}>
                {Object.keys(MATERIAL_FACTORS).map(m => <option key={m} value={m}>{m} ({MATERIAL_FACTORS[m].multiplier}× D)</option>)}
              </select>
              {matFactor && (
                <div style={{ marginTop: 6, background: matFactor.color + "15", border: `1px solid ${matFactor.color}`, borderRadius: 8, padding: "6px 10px", fontSize: 11, color: TEXT, lineHeight: 1.4 }}>
                  {matFactor.notes}
                </div>
              )}
            </div>

            {/* HOLE TYPE */}
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: NAVY, marginBottom: 6 }}>Hole Type</div>
              <div style={{ display: "flex", gap: 8 }}>
                {["through", "blind"].map(t => (
                  <button key={t} onClick={() => setHoleType(t)}
                    style={{ flex: 1, background: holeType === t ? NAVY : WHITE, color: holeType === t ? WHITE : MUTED, border: `1.5px solid ${holeType === t ? NAVY : BORDER}`, borderRadius: 8, padding: "8px", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", textTransform: "capitalize" }}>
                    {t === "through" ? "Through Hole" : "Blind Hole"}
                  </button>
                ))}
              </div>
              {holeType === "blind" && (
                <div style={{ marginTop: 6, background: "#FFF1F2", border: "1px solid #FECDD3", borderRadius: 8, padding: "6px 10px", fontSize: 11, color: "#9F1239" }}>
                  Blind holes require extra depth beyond minimum engagement — add at least 3 thread pitches for thread run-out and chip clearance.
                </div>
              )}
            </div>

            {/* OPTIONAL: CHECK EXISTING DEPTH */}
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: NAVY, marginBottom: 4 }}>Check My Existing Depth (optional)</div>
              <div style={{ display: "flex", gap: 8 }}>
                <input
                  value={customDepth}
                  onChange={e => setCustomDepth(e.target.value)}
                  placeholder={system === "imperial" ? 'Enter depth in inches e.g. 0.75"' : "Enter depth in mm e.g. 18"}
                  style={{ flex: 1, background: WHITE, border: `1px solid ${BORDER}`, borderRadius: 10, padding: "10px 14px", fontSize: 12, color: TEXT, fontFamily: "inherit", outline: "none" }}
                />
              </div>
            </div>
          </div>

          <button onClick={handleCalc}
            style={{ width: "100%", background: NAVY, color: WHITE, border: "none", borderRadius: 12, padding: "14px", fontSize: 14, fontWeight: 800, cursor: "pointer", fontFamily: "inherit", marginBottom: 14 }}>
            Calculate Engagement →
          </button>

          {result && (
            <>
              {/* EXISTING DEPTH CHECK */}
              {result.stripping_risk && (
                <div style={{
                  background: result.stripping_risk === "HIGH" ? "#FFF1F2" : result.stripping_risk === "MODERATE" ? STAR_BG : "#F0FDF4",
                  border: `1px solid ${result.stripping_risk === "HIGH" ? "#FECDD3" : result.stripping_risk === "MODERATE" ? STAR_BORDER : "#BBF7D0"}`,
                  borderLeft: `4px solid ${result.stripping_risk === "HIGH" ? "#DC2626" : result.stripping_risk === "MODERATE" ? "#D97706" : "#059669"}`,
                  borderRadius: 12, padding: "12px 14px", marginBottom: 12,
                }}>
                  <div style={{ fontSize: 13, fontWeight: 800, color: result.stripping_risk === "HIGH" ? "#DC2626" : result.stripping_risk === "MODERATE" ? "#D97706" : "#059669", marginBottom: 4 }}>
                    Existing Depth {system === "imperial" ? `${result.customDepth}"` : `${result.customDepth}mm`} — Stripping Risk: {result.stripping_risk}
                  </div>
                  <div style={{ fontSize: 12, color: TEXT }}>
                    {result.stripping_risk === "HIGH" && "Current depth is below minimum engagement. Threads will likely strip before bolt reaches full strength. Increase depth or use thread insert."}
                    {result.stripping_risk === "MODERATE" && "Current depth meets minimum but not recommended engagement. Acceptable for static loads, marginal for cyclic or impact loading."}
                    {result.stripping_risk === "LOW" && "Current depth meets recommended engagement. Thread stripping risk is low."}
                  </div>
                </div>
              )}

              {/* RESULTS */}
              <div style={{ background: WHITE, border: `1px solid ${BORDER}`, borderRadius: 14, overflow: "hidden", marginBottom: 12, boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
                <div style={{ background: NAVY, padding: "12px 14px" }}>
                  <div style={{ color: WHITE, fontSize: 13, fontWeight: 800 }}>Thread Engagement Results</div>
                  <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 11, marginTop: 2 }}>{selectedSize.size} in {material}</div>
                </div>

                {[
                  { label: "Multiplier", value: `${result.multiplier}× nominal diameter` },
                  { label: "Minimum Engagement", value: system === "imperial" ? `${result.minEngagement}" (${result.minEngagement_mm}mm)` : `${result.minEngagement_mm}mm`, highlight: true },
                  { label: "Minimum Threads Engaged", value: `${result.minThreads} threads` },
                  { label: "Recommended Engagement", value: system === "imperial" ? `${result.recommendedEngagement}" (${result.recommendedEngagement_mm}mm)` : `${result.recommendedEngagement_mm}mm`, highlight: true },
                  { label: "Recommended Threads", value: `${result.recommendedThreads} threads` },
                  holeType === "blind" ? { label: "Blind Hole Total Depth", value: system === "imperial" ? `${Math.round((result.recommendedEngagement + 3 * result.pitch) * 1000) / 1000}" minimum` : `${Math.round((result.recommendedEngagement_mm + 3 * result.pitch * 25.4) * 10) / 10}mm minimum` } : null,
                ].filter(Boolean).map((item, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "10px 14px", borderBottom: `1px solid ${BORDER}`, background: item.highlight ? STAR_BG : (i % 2 === 0 ? WHITE : ROW_ALT) }}>
                    <div style={{ fontSize: 11, color: MUTED, fontWeight: 600 }}>{item.label}</div>
                    <div style={{ fontSize: item.highlight ? 13 : 11, fontWeight: item.highlight ? 800 : 600, color: NAVY }}>{item.value}</div>
                  </div>
                ))}
              </div>

              <div style={{ background: "#EEF4FF", border: `1px solid ${BORDER}`, borderRadius: 10, padding: "10px 14px", marginBottom: 14 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#2563EB", marginBottom: 4 }}>Why This Matters</div>
                <div style={{ fontSize: 11, color: TEXT, lineHeight: 1.6 }}>
                  With adequate engagement, the bolt will break before the threads strip — a visible, obvious failure. With insufficient engagement, threads strip silently under load with no warning. Always design for bolt breakage, not thread stripping.
                </div>
              </div>
            </>
          )}

          <div style={{ background: "#FFF1F2", border: "1px solid #FECDD3", borderRadius: 10, padding: "10px 14px" }}>
            <div style={{ fontSize: 10, color: "#9F1239", lineHeight: 1.5 }}>
              <strong>⚠ Verify Before Use.</strong> Engagement minimums based on Machinery's Handbook methodology and IFI thread engagement tables. Values assume standard tolerance class threads and average material properties. For critical applications, consult a mechanical engineer. Fastener Companion is a reference tool.
            </div>
          </div>
        </div>
      )}

      {activeTab === "repair" && (
        <div style={{ padding: "14px 16px" }}>
          <div style={{ background: STAR_BG, border: `1px solid ${STAR_BORDER}`, borderRadius: 10, padding: "10px 14px", marginBottom: 14 }}>
            <div style={{ fontSize: 11, color: "#92400E", lineHeight: 1.5 }}>
              Thread repair options when engagement is insufficient or threads are damaged. All options restore full bolt strength when properly installed.
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {REPAIR_OPTIONS.map((opt, i) => (
              <div key={i} style={{ background: WHITE, border: `1px solid ${BORDER}`, borderLeft: `4px solid ${opt.avail_color}`, borderRadius: 12, padding: "14px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                  <div style={{ fontSize: 13, fontWeight: 800, color: NAVY, flex: 1 }}>{opt.name}</div>
                  <div style={{ background: opt.avail_color + "15", border: `1px solid ${opt.avail_color}`, borderRadius: 6, padding: "2px 8px", fontSize: 9, fontWeight: 700, color: opt.avail_color, flexShrink: 0, marginLeft: 8 }}>{opt.available.split(" — ")[0]}</div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, marginBottom: 8 }}>
                  <div style={{ background: ROW_ALT, borderRadius: 8, padding: "6px 8px", border: `1px solid ${BORDER}` }}>
                    <div style={{ fontSize: 9, color: MUTED, textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 1 }}>Strength Recovery</div>
                    <div style={{ fontSize: 11, fontWeight: 700, color: "#059669" }}>{opt.strength_recovery}</div>
                  </div>
                  <div style={{ background: ROW_ALT, borderRadius: 8, padding: "6px 8px", border: `1px solid ${BORDER}` }}>
                    <div style={{ fontSize: 9, color: MUTED, textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 1 }}>Drill Required</div>
                    <div style={{ fontSize: 10, fontWeight: 600, color: TEXT, lineHeight: 1.2 }}>{opt.drill_size.split(" ")[0]}</div>
                  </div>
                </div>
                <div style={{ fontSize: 11, color: MUTED, marginBottom: 6 }}<b>Best for:</b> {opt.best_for}</div>
                <div style={{ fontSize: 12, color: TEXT, lineHeight: 1.5 }}>{opt.notes}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
