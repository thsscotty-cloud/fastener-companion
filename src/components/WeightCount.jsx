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
// WeightCount
// ════════════════════════════════════════════════════

// ─── DATA ─────────────────────────────────────────────────────────────────────
// Sources: IFI Fastener Standards 7th Edition (weight tables),
// Machinery's Handbook 31st Ed. (fastener weights),
// Portland Bolt weight per foot tables, Fastenal catalog weights
// All weights in lbs per 100 pieces for standard lengths

const BOLT_WEIGHTS = [
  // [size, tpi, length_in, lbs_per_100, lbs_per_1000]
  // Hex bolts, Grade 2/5/8, UNC, plain steel
  { size: "1/4\"", tpi: "20", length: "1/2\"",   w100: 0.26,  star: false },
  { size: "1/4\"", tpi: "20", length: "3/4\"",   w100: 0.34,  star: false },
  { size: "1/4\"", tpi: "20", length: "1\"",     w100: 0.42,  star: true },
  { size: "1/4\"", tpi: "20", length: "1-1/2\"", w100: 0.58,  star: false },
  { size: "1/4\"", tpi: "20", length: "2\"",     w100: 0.74,  star: false },
  { size: "5/16\"",tpi: "18", length: "3/4\"",   w100: 0.65,  star: false },
  { size: "5/16\"",tpi: "18", length: "1\"",     w100: 0.82,  star: true },
  { size: "5/16\"",tpi: "18", length: "1-1/2\"", w100: 1.13,  star: false },
  { size: "5/16\"",tpi: "18", length: "2\"",     w100: 1.44,  star: false },
  { size: "3/8\"", tpi: "16", length: "3/4\"",   w100: 1.23,  star: false },
  { size: "3/8\"", tpi: "16", length: "1\"",     w100: 1.55,  star: true },
  { size: "3/8\"", tpi: "16", length: "1-1/2\"", w100: 2.15,  star: true },
  { size: "3/8\"", tpi: "16", length: "2\"",     w100: 2.77,  star: false },
  { size: "3/8\"", tpi: "16", length: "3\"",     w100: 4.00,  star: false },
  { size: "1/2\"", tpi: "13", length: "1\"",     w100: 3.63,  star: true },
  { size: "1/2\"", tpi: "13", length: "1-1/2\"", w100: 4.92,  star: true },
  { size: "1/2\"", tpi: "13", length: "2\"",     w100: 6.22,  star: true },
  { size: "1/2\"", tpi: "13", length: "2-1/2\"", w100: 7.51,  star: false },
  { size: "1/2\"", tpi: "13", length: "3\"",     w100: 8.80,  star: false },
  { size: "1/2\"", tpi: "13", length: "4\"",     w100: 11.40, star: false },
  { size: "5/8\"", tpi: "11", length: "1-1/2\"", w100: 9.08,  star: false },
  { size: "5/8\"", tpi: "11", length: "2\"",     w100: 11.40, star: true },
  { size: "5/8\"", tpi: "11", length: "2-1/2\"", w100: 13.80, star: false },
  { size: "5/8\"", tpi: "11", length: "3\"",     w100: 16.10, star: false },
  { size: "5/8\"", tpi: "11", length: "4\"",     w100: 20.90, star: false },
  { size: "3/4\"", tpi: "10", length: "1-1/2\"", w100: 15.10, star: false },
  { size: "3/4\"", tpi: "10", length: "2\"",     w100: 18.90, star: true },
  { size: "3/4\"", tpi: "10", length: "2-1/2\"", w100: 22.80, star: false },
  { size: "3/4\"", tpi: "10", length: "3\"",     w100: 26.60, star: false },
  { size: "3/4\"", tpi: "10", length: "4\"",     w100: 34.30, star: false },
  { size: "3/4\"", tpi: "10", length: "6\"",     w100: 49.80, star: false },
  { size: "7/8\"", tpi: "9",  length: "2\"",     w100: 28.80, star: false },
  { size: "7/8\"", tpi: "9",  length: "2-1/2\"", w100: 34.80, star: false },
  { size: "7/8\"", tpi: "9",  length: "3\"",     w100: 40.80, star: false },
  { size: "7/8\"", tpi: "9",  length: "4\"",     w100: 52.70, star: false },
  { size: "1\"",   tpi: "8",  length: "2\"",     w100: 41.40, star: false },
  { size: "1\"",   tpi: "8",  length: "2-1/2\"", w100: 50.00, star: false },
  { size: "1\"",   tpi: "8",  length: "3\"",     w100: 58.60, star: false },
  { size: "1\"",   tpi: "8",  length: "4\"",     w100: 75.80, star: false },
  { size: "1\"",   tpi: "8",  length: "6\"",     w100: 110.0, star: false },
];

const NUT_WEIGHTS = [
  { size: "1/4\"",   tpi: "20", type: "Hex",        w100: 0.14 },
  { size: "5/16\"",  tpi: "18", type: "Hex",        w100: 0.27 },
  { size: "3/8\"",   tpi: "16", type: "Hex",        w100: 0.50 },
  { size: "7/16\"",  tpi: "14", type: "Hex",        w100: 0.76 },
  { size: "1/2\"",   tpi: "13", type: "Hex",        w100: 1.19 },
  { size: "5/8\"",   tpi: "11", type: "Hex",        w100: 2.30 },
  { size: "3/4\"",   tpi: "10", type: "Hex",        w100: 3.88 },
  { size: "7/8\"",   tpi: "9",  type: "Hex",        w100: 5.97 },
  { size: "1\"",     tpi: "8",  type: "Hex",        w100: 8.80 },
  { size: "1/2\"",   tpi: "13", type: "Heavy Hex",  w100: 1.62 },
  { size: "5/8\"",   tpi: "11", type: "Heavy Hex",  w100: 3.09 },
  { size: "3/4\"",   tpi: "10", type: "Heavy Hex",  w100: 5.08 },
  { size: "7/8\"",   tpi: "9",  type: "Heavy Hex",  w100: 7.86 },
  { size: "1\"",     tpi: "8",  type: "Heavy Hex",  w100: 11.60 },
];

const WASHER_WEIGHTS = [
  { size: "1/4\"",  type: "SAE",  w100: 0.06 },
  { size: "5/16\"", type: "SAE",  w100: 0.11 },
  { size: "3/8\"",  type: "SAE",  w100: 0.18 },
  { size: "1/2\"",  type: "SAE",  w100: 0.41 },
  { size: "5/8\"",  type: "SAE",  w100: 0.63 },
  { size: "3/4\"",  type: "SAE",  w100: 1.11 },
  { size: "1\"",    type: "SAE",  w100: 2.10 },
  { size: "1/4\"",  type: "USS",  w100: 0.09 },
  { size: "3/8\"",  type: "USS",  w100: 0.28 },
  { size: "1/2\"",  type: "USS",  w100: 0.55 },
  { size: "5/8\"",  type: "USS",  w100: 0.94 },
  { size: "3/4\"",  type: "USS",  w100: 1.60 },
  { size: "1\"",    type: "USS",  w100: 3.30 },
];

export default function WeightCount() {
  const [activeTab, setActiveTab] = useState("bolts");
  const [search, setSearch] = useState("");
  const [qty, setQty] = useState("100");
  const [selectedRow, setSelectedRow] = useState(null);
  const [calcResult, setCalcResult] = useState(null);

  const filteredBolts = BOLT_WEIGHTS.filter(b =>
    b.size.includes(search) || b.length.includes(search)
  );
  const filteredNuts = NUT_WEIGHTS.filter(n =>
    n.size.includes(search) || n.type.toLowerCase().includes(search.toLowerCase())
  );
  const filteredWashers = WASHER_WEIGHTS.filter(w =>
    w.size.includes(search) || w.type.toLowerCase().includes(search.toLowerCase())
  );

  const calcWeight = (w100, quantity) => {
    const q = parseFloat(quantity) || 100;
    return Math.round((w100 * q / 100) * 100) / 100;
  };

  const calcPiecesPerLb = (w100) => Math.round(100 / w100);

  return (
    <div style={{ fontFamily: "'DM Sans','Segoe UI',sans-serif", background: BG, minHeight: "100vh", maxWidth: 430, margin: "0 auto" }}>
      <div style={{ background: `linear-gradient(135deg, ${NAVY} 0%, #2C5282 100%)`, padding: "16px 20px 20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
          <span style={{ fontSize: 20 }}>⬡</span>
          <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 10, letterSpacing: 2, textTransform: "uppercase" }}>Fastener Companion</span>
        </div>
        <div style={{ color: WHITE, fontSize: 20, fontWeight: 800, marginBottom: 2 }}>Weight & Count Reference</div>
        <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 11 }}>IFI 7th Edition · Machinery's Handbook 31st Ed. · Portland Bolt</div>
        <div style={{ background: WHITE, borderRadius: 12, display: "flex", alignItems: "center", padding: "10px 14px", gap: 8, marginTop: 14, boxShadow: "0 2px 8px rgba(0,0,0,0.15)" }}>
          <span style={{ color: MUTED }}>??</span>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Filter by size..."
            style={{ background: "none", border: "none", outline: "none", color: TEXT, fontSize: 14, flex: 1, fontFamily: "inherit" }} />
          {search && <span onClick={() => setSearch("")} style={{ color: MUTED, cursor: "pointer" }}>✕</span>}
        </div>
      </div>

      {/* QTY CALC */}
      <div style={{ background: WHITE, borderBottom: `1px solid ${BORDER}`, padding: "10px 16px", display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: NAVY, flexShrink: 0 }}>Quantity:</div>
        <input value={qty} onChange={e => setQty(e.target.value)} type="number" min="1"
          style={{ width: 100, background: "#F8FAFC", border: `1px solid ${BORDER}`, borderRadius: 8, padding: "6px 10px", fontSize: 12, color: TEXT, fontFamily: "inherit", outline: "none" }} />
        <div style={{ fontSize: 11, color: MUTED }}>pieces — weights scale automatically</div>
      </div>

      {/* TABS */}
      <div style={{ background: WHITE, borderBottom: `1px solid ${BORDER}`, padding: "0 8px", display: "flex" }}>
        {[{ id: "bolts", label: "Hex Bolts" }, { id: "nuts", label: "Nuts" }, { id: "washers", label: "Washers" }].map(t => (
          <button key={t.id} onClick={() => setActiveTab(t.id)}
            style={{ background: "none", border: "none", cursor: "pointer", padding: "11px 14px", fontSize: 12, fontWeight: 700, fontFamily: "inherit", color: activeTab === t.id ? NAVY : MUTED, borderBottom: activeTab === t.id ? `3px solid ${AMBER}` : "3px solid transparent" }}>
            {t.label}
          </button>
        ))}
      </div>

      <div style={{ padding: "12px 16px 24px" }}>
        <div style={{ background: WHITE, borderRadius: 14, overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.06)", border: `1px solid ${BORDER}` }}>
          {activeTab === "bolts" && (
            <>
              <div style={{ display: "grid", gridTemplateColumns: "0.7fr 0.5fr 0.7fr 0.7fr 0.7fr", background: NAVY, padding: "10px 12px" }}>
                {["Size", "TPI", "Length", `Wt/${qty}pc`, "Pc/lb"].map(h => (
                  <div key={h} style={{ color: WHITE, fontSize: 9, fontWeight: 700 }}>{h}</div>
                ))}
              </div>
              {filteredBolts.map((row, i) => (
                <div key={i} style={{ display: "grid", gridTemplateColumns: "0.7fr 0.5fr 0.7fr 0.7fr 0.7fr", padding: "8px 12px", background: row.star ? STAR_BG : i % 2 === 0 ? WHITE : ROW_ALT, borderBottom: `1px solid ${BORDER}`, alignItems: "center" }}>
                  <div style={{ fontSize: 12, fontWeight: row.star ? 800 : 600, color: NAVY, display: "flex", alignItems: "center", gap: 3 }}>
                    {row.star && <span style={{ color: AMBER, fontSize: 9 }}>★</span>}{row.size}
                  </div>
                  <div style={{ fontSize: 11, color: MUTED }}>{row.tpi}</div>
                  <div style={{ fontSize: 11, color: TEXT }}>{row.length}</div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: NAVY }}>{calcWeight(row.w100, qty)} lb</div>
                  <div style={{ fontSize: 11, color: MUTED }}>{calcPiecesPerLb(row.w100)}</div>
                </div>
              ))}
            </>
          )}
          {activeTab === "nuts" && (
            <>
              <div style={{ display: "grid", gridTemplateColumns: "0.7fr 0.5fr 0.8fr 0.8fr 0.8fr", background: NAVY, padding: "10px 12px" }}>
                {["Size", "TPI", "Type", `Wt/${qty}pc`, "Pc/lb"].map(h => (
                  <div key={h} style={{ color: WHITE, fontSize: 9, fontWeight: 700 }}>{h}</div>
                ))}
              </div>
              {filteredNuts.map((row, i) => (
                <div key={i} style={{ display: "grid", gridTemplateColumns: "0.7fr 0.5fr 0.8fr 0.8fr 0.8fr", padding: "8px 12px", background: i % 2 === 0 ? WHITE : ROW_ALT, borderBottom: `1px solid ${BORDER}`, alignItems: "center" }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: NAVY }}>{row.size}</div>
                  <div style={{ fontSize: 11, color: MUTED }}>{row.tpi}</div>
                  <div style={{ fontSize: 11, color: TEXT }}>{row.type}</div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: NAVY }}>{calcWeight(row.w100, qty)} lb</div>
                  <div style={{ fontSize: 11, color: MUTED }}>{calcPiecesPerLb(row.w100)}</div>
                </div>
              ))}
            </>
          )}
          {activeTab === "washers" && (
            <>
              <div style={{ display: "grid", gridTemplateColumns: "0.8fr 0.7fr 0.8fr 0.8fr", background: NAVY, padding: "10px 12px" }}>
                {["Size", "Type", `Wt/${qty}pc`, "Pc/lb"].map(h => (
                  <div key={h} style={{ color: WHITE, fontSize: 9, fontWeight: 700 }}>{h}</div>
                ))}
              </div>
              {filteredWashers.map((row, i) => (
                <div key={i} style={{ display: "grid", gridTemplateColumns: "0.8fr 0.7fr 0.8fr 0.8fr", padding: "8px 12px", background: i % 2 === 0 ? WHITE : ROW_ALT, borderBottom: `1px solid ${BORDER}`, alignItems: "center" }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: NAVY }}>{row.size}</div>
                  <div style={{ fontSize: 11, color: TEXT }}>{row.type}</div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: NAVY }}>{calcWeight(row.w100, qty)} lb</div>
                  <div style={{ fontSize: 11, color: MUTED }}>{calcPiecesPerLb(row.w100)}</div>
                </div>
              ))}
            </>
          )}
        </div>
        <div style={{ marginTop: 12, background: "#FFF1F2", border: "1px solid #FECDD3", borderRadius: 10, padding: "10px 14px" }}>
          <div style={{ fontSize: 10, color: "#9F1239", lineHeight: 1.5 }}>
            <strong>⚠ Verify Before Use.</strong> Weights based on IFI 7th Edition and Machinery's Handbook for plain carbon steel hex bolts. Weights vary slightly by grade, coating, manufacturer, and exact thread length. For shipping/freight calculations, add 5–10% tolerance. Fastener Companion is a reference tool.
          </div>
        </div>
      </div>
    </div>
  );
}
