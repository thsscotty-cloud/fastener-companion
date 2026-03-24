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
// BoltLengthGuide
// ════════════════════════════════════════════════════

// ─── DATA ─────────────────────────────────────────────────────────────────────
// Sources: ASME B18.2.1 (thread length formulas), ASME B1.1,
// IFI Fastener Standards 7th Ed., Machinery's Handbook 31st Ed.

// Thread length formulas per ASME B18.2.1:
// Imperial: L ≤ 6": thread = 2D + 0.25"; L > 6": thread = 2D + 0.50"
// Metric: L ≤ 125mm: thread = 2D + 6mm; 125 < L ≤ 200mm: thread = 2D + 12mm; L > 200mm: thread = 2D + 25mm

const IMPERIAL_SIZES = [
  { size: "1/4\"",    d: 0.250, tpi_unc: 20, tpi_unf: 28 },
  { size: "5/16\"",   d: 0.3125, tpi_unc: 18, tpi_unf: 24 },
  { size: "3/8\"",    d: 0.375, tpi_unc: 16, tpi_unf: 24 },
  { size: "7/16\"",   d: 0.4375, tpi_unc: 14, tpi_unf: 20 },
  { size: "1/2\"",    d: 0.500, tpi_unc: 13, tpi_unf: 20 },
  { size: "9/16\"",   d: 0.5625, tpi_unc: 12, tpi_unf: 18 },
  { size: "5/8\"",    d: 0.625, tpi_unc: 11, tpi_unf: 18 },
  { size: "3/4\"",    d: 0.750, tpi_unc: 10, tpi_unf: 16 },
  { size: "7/8\"",    d: 0.875, tpi_unc: 9,  tpi_unf: 14 },
  { size: "1\"",      d: 1.000, tpi_unc: 8,  tpi_unf: 12 },
  { size: "1-1/8\"",  d: 1.125, tpi_unc: 7,  tpi_unf: 12 },
  { size: "1-1/4\"",  d: 1.250, tpi_unc: 7,  tpi_unf: 12 },
  { size: "1-3/8\"",  d: 1.375, tpi_unc: 6,  tpi_unf: 12 },
  { size: "1-1/2\"",  d: 1.500, tpi_unc: 6,  tpi_unf: 12 },
  { size: "1-3/4\"",  d: 1.750, tpi_unc: 5,  tpi_unf: null },
  { size: "2\"",      d: 2.000, tpi_unc: 4.5, tpi_unf: null },
];

const METRIC_SIZES = [
  { size: "M6",  d: 6,  pitch: 1.0 },
  { size: "M8",  d: 8,  pitch: 1.25 },
  { size: "M10", d: 10, pitch: 1.5 },
  { size: "M12", d: 12, pitch: 1.75 },
  { size: "M14", d: 14, pitch: 2.0 },
  { size: "M16", d: 16, pitch: 2.0 },
  { size: "M18", d: 18, pitch: 2.5 },
  { size: "M20", d: 20, pitch: 2.5 },
  { size: "M22", d: 22, pitch: 2.5 },
  { size: "M24", d: 24, pitch: 3.0 },
  { size: "M27", d: 27, pitch: 3.0 },
  { size: "M30", d: 30, pitch: 3.5 },
  { size: "M36", d: 36, pitch: 4.0 },
];

const HEAD_TYPES = [
  { name: "Hex Bolt / Cap Screw", measured: "Under head to tip", note: "Standard measurement" },
  { name: "Carriage Bolt", measured: "Under head to tip", note: "Same as hex" },
  { name: "Flat Head (Countersunk)", measured: "Top of head to tip", note: "Head is included in length" },
  { name: "Oval Head", measured: "Top of head to tip", note: "Head included in length" },
  { name: "Stud Bolt", measured: "End to end (full length)", note: "No head — total length" },
  { name: "Set Screw (Headless)", measured: "End to end", note: "No head — total length" },
  { name: "Button Head SHCS", measured: "Under head to tip", note: "Same as hex cap screw" },
];

function calcThreadLength(d_or_size, boltLength, system) {
  if (system === "imperial") {
    const d = d_or_size;
    if (boltLength <= 6) return Math.round((2 * d + 0.25) * 1000) / 1000;
    else return Math.round((2 * d + 0.50) * 1000) / 1000;
  } else {
    const d = d_or_size;
    if (boltLength <= 125) return 2 * d + 6;
    else if (boltLength <= 200) return 2 * d + 12;
    else return 2 * d + 25;
  }
}

export default function BoltLengthGuide() {
  const [system, setSystem] = useState("imperial");
  const [sizeIdx, setSizeIdx] = useState(4); // 1/2" default
  const [gripLength, setGripLength] = useState("");
  const [nutHeight, setNutHeight] = useState("");
  const [washerCount, setWasherCount] = useState("2");
  const [washerThickness, setWasherThickness] = useState("");
  const [headType, setHeadType] = useState("Hex Bolt / Cap Screw");
  const [result, setResult] = useState(null);
  const [activeTab, setActiveTab] = useState("calc");

  const sizes = system === "imperial" ? IMPERIAL_SIZES : METRIC_SIZES;
  const selectedSize = sizes[sizeIdx];

  const handleSystem = (s) => {
    setSystem(s);
    setSizeIdx(s === "imperial" ? 4 : 2);
    setGripLength("");
    setNutHeight("");
    setWasherThickness("");
    setResult(null);
  };

  const handleCalc = () => {
    const grip = parseFloat(gripLength);
    if (!grip || !selectedSize) return;

    const d = selectedSize.d;
    const nut = parseFloat(nutHeight) || (system === "imperial" ? d * 0.875 : d * 0.8);
    const washers = parseInt(washerCount) || 0;
    const washer_t = parseFloat(washerThickness) || (system === "imperial" ? 0.095 : 2.0);
    const washer_total = washers * washer_t;

    const totalJointThickness = grip + nut + washer_total;

    // Thread length for candidate bolt lengths
    const tryLengths = [];
    if (system === "imperial") {
      const candidates = [0.5, 0.625, 0.75, 1, 1.25, 1.5, 1.75, 2, 2.25, 2.5, 2.75, 3, 3.25, 3.5, 3.75, 4, 4.5, 5, 5.5, 6, 7, 8, 10, 12];
      for (const L of candidates) {
        const tl = calcThreadLength(d, L, "imperial");
        const shank = Math.max(0, L - tl);
        const protrusion = L - totalJointThickness;
        const threads_engaged_in_nut = Math.min(tl, nut);
        if (protrusion >= 0 && protrusion <= 0.75 && threads_engaged_in_nut >= nut * 0.8) {
          tryLengths.push({ L, tl, shank, protrusion: Math.round(protrusion * 1000) / 1000 });
        }
      }
    } else {
      const candidates = [16, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160, 180, 200, 220, 240, 260, 280, 300];
      for (const L of candidates) {
        const tl = calcThreadLength(d, L, "metric");
        const shank = Math.max(0, L - tl);
        const protrusion = L - totalJointThickness;
        const threads_engaged_in_nut = Math.min(tl, nut);
        if (protrusion >= 0 && protrusion <= 20 && threads_engaged_in_nut >= nut * 0.8) {
          tryLengths.push({ L, tl, shank, protrusion: Math.round(protrusion * 10) / 10 });
        }
      }
    }

    const recommended = tryLengths.length > 0 ? tryLengths[0] : null;
    const tl_rec = recommended ? recommended.tl : calcThreadLength(d, totalJointThickness * 1.15, system);

    setResult({
      grip,
      nut,
      washer_total,
      totalJointThickness: Math.round(totalJointThickness * 100) / 100,
      recommended,
      alternatives: tryLengths.slice(1, 4),
      tl_for_total: Math.round(calcThreadLength(d, totalJointThickness, system) * 100) / 100,
      minBoltLength: Math.round(totalJointThickness * 100) / 100,
    });
  };

  return (
    <div style={{ fontFamily: "'DM Sans','Segoe UI',sans-serif", background: BG, minHeight: "100vh", maxWidth: 430, margin: "0 auto" }}>
      <div style={{ background: `linear-gradient(135deg, ${NAVY} 0%, #2C5282 100%)`, padding: "16px 20px 20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
          <span style={{ fontSize: 20 }}>⬡</span>
          <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 10, letterSpacing: 2, textTransform: "uppercase" }}>Fastener Companion</span>
        </div>
        <div style={{ color: WHITE, fontSize: 20, fontWeight: 800, marginBottom: 2 }}>Bolt Length Selection</div>
        <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 11 }}>ASME B18.2.1 · ASME B1.1 · IFI 7th Ed. · Machinery's Handbook 31st Ed.</div>
      </div>

      {/* TABS */}
      <div style={{ background: WHITE, borderBottom: `1px solid ${BORDER}`, padding: "0 8px", display: "flex" }}>
        {[{ id: "calc", label: "Length Calculator" }, { id: "measure", label: "How to Measure" }, { id: "heads", label: "Head Types" }].map(t => (
          <button key={t.id} onClick={() => setActiveTab(t.id)}
            style={{ background: "none", border: "none", cursor: "pointer", padding: "11px 12px", fontSize: 11, fontWeight: 700, fontFamily: "inherit", color: activeTab === t.id ? NAVY : MUTED, borderBottom: activeTab === t.id ? `3px solid ${AMBER}` : "3px solid transparent", whiteSpace: "nowrap" }}>
            {t.label}
          </button>
        ))}
      </div>

      {activeTab === "calc" && (
        <div style={{ padding: "14px 16px" }}>
          <div style={{ background: STAR_BG, border: `1px solid ${STAR_BORDER}`, borderRadius: 10, padding: "10px 14px", marginBottom: 14 }}>
            <div style={{ fontSize: 11, color: "#92400E", lineHeight: 1.5 }}>
              Enter the joint stack-up and the calculator will recommend the correct bolt length. Minimum length = grip + nut + washers. Aim for 2–3 threads protruding beyond the nut.
            </div>
          </div>

          <div style={{ display: "flex", background: WHITE, border: `1px solid ${BORDER}`, borderRadius: 10, padding: 4, marginBottom: 12 }}>
            {["imperial", "metric"].map(s => (
              <button key={s} onClick={() => handleSystem(s)}
                style={{ flex: 1, background: system === s ? NAVY : "none", color: system === s ? WHITE : MUTED, border: "none", borderRadius: 8, padding: "8px", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", textTransform: "capitalize" }}>
                {s}
              </button>
            ))}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 14 }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: NAVY, marginBottom: 4 }}>Bolt Diameter</div>
              <select value={sizeIdx} onChange={e => { setSizeIdx(Number(e.target.value)); setResult(null); }}
                style={{ width: "100%", background: WHITE, border: `1px solid ${BORDER}`, borderRadius: 10, padding: "10px 14px", fontSize: 13, color: TEXT, fontFamily: "inherit", outline: "none" }}>
                {sizes.map((s, i) => <option key={s.size} value={i}>{s.size}</option>)}
              </select>
            </div>

            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: NAVY, marginBottom: 4 }}>Grip Length — Total Material Thickness {system === "imperial" ? "(inches)" : "(mm)"}</div>
              <input value={gripLength} onChange={e => setGripLength(e.target.value)} type="number" step="0.001" min="0"
                placeholder={system === "imperial" ? 'e.g. 1.5 (inches)' : 'e.g. 40 (mm)'}
                style={{ width: "100%", boxSizing: "border-box", background: WHITE, border: `1px solid ${BORDER}`, borderRadius: 10, padding: "10px 14px", fontSize: 13, color: TEXT, fontFamily: "inherit", outline: "none" }} />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: NAVY, marginBottom: 4 }}>Nut Height {system === "imperial" ? "(in)" : "(mm)"}</div>
                <input value={nutHeight} onChange={e => setNutHeight(e.target.value)} type="number" step="0.001" min="0"
                  placeholder={system === "imperial" ? "Leave blank = auto" : "Blank = auto"}
                  style={{ width: "100%", boxSizing: "border-box", background: WHITE, border: `1px solid ${BORDER}`, borderRadius: 10, padding: "10px 14px", fontSize: 12, color: TEXT, fontFamily: "inherit", outline: "none" }} />
              </div>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: NAVY, marginBottom: 4 }}>Washers (#)</div>
                <select value={washerCount} onChange={e => setWasherCount(e.target.value)}
                  style={{ width: "100%", background: WHITE, border: `1px solid ${BORDER}`, borderRadius: 10, padding: "10px 14px", fontSize: 12, color: TEXT, fontFamily: "inherit", outline: "none" }}>
                  {["0", "1", "2", "3", "4"].map(n => <option key={n} value={n}>{n}</option>)}
                </select>
              </div>
            </div>

            {parseInt(washerCount) > 0 && (
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: NAVY, marginBottom: 4 }}>Washer Thickness Each {system === "imperial" ? "(in)" : "(mm)"}</div>
                <input value={washerThickness} onChange={e => setWasherThickness(e.target.value)} type="number" step="0.001" min="0"
                  placeholder={system === "imperial" ? "e.g. 0.095 (SAE standard)" : "e.g. 2.0 (metric standard)"}
                  style={{ width: "100%", boxSizing: "border-box", background: WHITE, border: `1px solid ${BORDER}`, borderRadius: 10, padding: "10px 14px", fontSize: 12, color: TEXT, fontFamily: "inherit", outline: "none" }} />
              </div>
            )}
          </div>

          <button onClick={handleCalc} disabled={!gripLength}
            style={{ width: "100%", background: gripLength ? NAVY : "#CBD5E1", color: WHITE, border: "none", borderRadius: 12, padding: "14px", fontSize: 14, fontWeight: 800, cursor: gripLength ? "pointer" : "not-allowed", fontFamily: "inherit", marginBottom: 14 }}>
            Find Bolt Length →
          </button>

          {result && (
            <>
              {/* STACK UP SUMMARY */}
              <div style={{ background: WHITE, border: `1px solid ${BORDER}`, borderRadius: 12, overflow: "hidden", marginBottom: 12, boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
                <div style={{ background: "#64748B", padding: "10px 14px" }}>
                  <div style={{ color: WHITE, fontSize: 12, fontWeight: 700 }}>Joint Stack-Up</div>
                </div>
                {[
                  { label: "Material thickness (grip)", value: `${result.grip} ${system === "imperial" ? "in" : "mm"}` },
                  { label: "Nut height", value: `${Math.round(result.nut * 100) / 100} ${system === "imperial" ? "in" : "mm"}` },
                  { label: "Washer total", value: `${Math.round(result.washer_total * 100) / 100} ${system === "imperial" ? "in" : "mm"}` },
                  { label: "Total stack", value: `${result.totalJointThickness} ${system === "imperial" ? "in" : "mm"}`, bold: true },
                ].map((item, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "8px 14px", borderBottom: `1px solid ${BORDER}`, background: i % 2 === 0 ? WHITE : ROW_ALT }}>
                    <div style={{ fontSize: 11, color: MUTED }}>{item.label}</div>
                    <div style={{ fontSize: 11, fontWeight: item.bold ? 800 : 600, color: item.bold ? NAVY : TEXT }}>{item.value}</div>
                  </div>
                ))}
              </div>

              {/* RECOMMENDATION */}
              {result.recommended ? (
                <div style={{ background: STAR_BG, border: `2px solid ${AMBER}`, borderRadius: 14, padding: "16px 14px", marginBottom: 12, textAlign: "center" }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: MUTED, textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 6 }}>Recommended Bolt Length</div>
                  <div style={{ fontSize: 44, fontWeight: 900, color: NAVY, lineHeight: 1 }}>
                    {system === "imperial" ? `${result.recommended.L}"` : `${result.recommended.L}mm`}
                  </div>
                  <div style={{ fontSize: 13, color: AMBER, fontWeight: 700, marginTop: 4 }}>
                    {result.recommended.protrusion > 0 ? `${result.recommended.protrusion}${system === "imperial" ? '"' : "mm"} protrusion past nut` : "Flush with nut"}
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 12 }}>
                    <div style={{ background: WHITE, borderRadius: 8, padding: "8px", border: `1px solid ${BORDER}` }}>
                      <div style={{ fontSize: 9, color: MUTED, textTransform: "uppercase", marginBottom: 2 }}>Thread Length</div>
                      <div style={{ fontSize: 12, fontWeight: 700, color: NAVY }}>{result.recommended.tl}{system === "imperial" ? '"' : "mm"}</div>
                    </div>
                    <div style={{ background: WHITE, borderRadius: 8, padding: "8px", border: `1px solid ${BORDER}` }}>
                      <div style={{ fontSize: 9, color: MUTED, textTransform: "uppercase", marginBottom: 2 }}>Shank Length</div>
                      <div style={{ fontSize: 12, fontWeight: 700, color: NAVY }}>{Math.round(result.recommended.shank * 100) / 100}{system === "imperial" ? '"' : "mm"}</div>
                    </div>
                  </div>
                </div>
              ) : (
                <div style={{ background: "#FFF1F2", border: "1px solid #FECDD3", borderRadius: 12, padding: "12px 14px", marginBottom: 12 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#DC2626", marginBottom: 4 }}>No Standard Length Found</div>
                  <div style={{ fontSize: 12, color: TEXT }}>Minimum bolt length needed: {result.minBoltLength}{system === "imperial" ? '"' : "mm"}. May require non-standard length or adjusting stack-up (different washer, nut configuration).</div>
                </div>
              )}

              {/* ALTERNATIVES */}
              {result.alternatives.length > 0 && (
                <div style={{ background: WHITE, border: `1px solid ${BORDER}`, borderRadius: 12, overflow: "hidden", marginBottom: 12 }}>
                  <div style={{ background: NAVY, padding: "10px 14px" }}>
                    <div style={{ color: WHITE, fontSize: 12, fontWeight: 700 }}>Alternative Lengths</div>
                  </div>
                  {result.alternatives.map((alt, i) => (
                    <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "9px 14px", borderBottom: `1px solid ${BORDER}`, background: i % 2 === 0 ? WHITE : ROW_ALT }}>
                      <div style={{ fontSize: 13, fontWeight: 700, color: NAVY }}>{system === "imperial" ? `${alt.L}"` : `${alt.L}mm`}</div>
                      <div style={{ fontSize: 11, color: MUTED }}>+{alt.protrusion}{system === "imperial" ? '"' : "mm"} protrusion</div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          <div style={{ background: "#FFF1F2", border: "1px solid #FECDD3", borderRadius: 10, padding: "10px 14px" }}>
            <div style={{ fontSize: 10, color: "#9F1239", lineHeight: 1.5 }}>
              <strong>⚠ Verify Before Use.</strong> Thread length formulas per ASME B18.2.1. Recommended protrusion is 2–3 threads beyond nut. Verify actual stock bolt lengths available from supplier before finalizing spec. Fastener Companion is a reference tool.
            </div>
          </div>
        </div>
      )}

      {activeTab === "measure" && (
        <div style={{ padding: "14px 16px", display: "flex", flexDirection: "column", gap: 10 }}>
          <div style={{ background: STAR_BG, border: `1px solid ${STAR_BORDER}`, borderRadius: 10, padding: "10px 14px" }}>
            <div style={{ fontSize: 11, color: "#92400E" }}>Bolt length is always measured from the bearing surface of the head (underside) to the tip — EXCEPT for countersunk heads, which are measured from the top of the head to the tip.</div>
          </div>
          {[
            { title: "Step 1: Identify the head type", content: "Countersunk (flat head) bolts are measured differently than all other head types. Confirm head type before measuring. See Head Types tab." },
            { title: "Step 2: Measure grip length", content: "Use calipers to measure the total thickness of all material being clamped — this is your grip length. Include all plates, flanges, and structural members but NOT the nut or washers." },
            { title: "Step 3: Add nut height", content: "Find the nut height in the Nut Dimensions chart. Add to grip length. Standard hex nut height ≈ 0.875× diameter. Heavy hex nut height ≈ 0.94× diameter." },
            { title: "Step 4: Add washer thickness", content: "If using washers, measure or look up thickness. SAE washer: 0.065\"–0.165\" depending on size. F436 structural washer: 0.122\"–0.136\". Add total of all washers." },
            { title: "Step 5: Find next standard length", content: "Round UP to the next available standard length. Aim for 2–3 threads protruding beyond the nut. Too short = insufficient engagement. Too long = interference or excess weight." },
            { title: "Step 6: Verify thread length", content: "Check that the thread length (per ASME B18.2.1 formula: L≤6\": 2D+0.25\"; L>6\": 2D+0.5\") is sufficient to engage the nut fully and provide required thread engagement in any tapped holes." },
          ].map((item, i) => (
            <div key={i} style={{ background: WHITE, border: `1px solid ${BORDER}`, borderLeft: `4px solid ${NAVY}`, borderRadius: 12, padding: "12px 14px" }}>
              <div style={{ fontSize: 12, fontWeight: 800, color: NAVY, marginBottom: 4 }}>{item.title}</div>
              <div style={{ fontSize: 12, color: TEXT, lineHeight: 1.6 }}>{item.content}</div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "heads" && (
        <div style={{ padding: "14px 16px" }}>
          <div style={{ background: "#FFF1F2", border: "1px solid #FECDD3", borderRadius: 10, padding: "10px 14px", marginBottom: 12 }}>
            <div style={{ fontSize: 11, color: "#9F1239", lineHeight: 1.5 }}>
              <strong>Critical:</strong> Flat head (countersunk) bolts are measured from the TOP of the head to the tip. All other head types are measured from the UNDERSIDE of the head (bearing surface) to the tip.
            </div>
          </div>
          <div style={{ background: WHITE, borderRadius: 14, overflow: "hidden", border: `1px solid ${BORDER}` }}>
            <div style={{ background: NAVY, padding: "10px 14px" }}>
              <div style={{ color: WHITE, fontSize: 12, fontWeight: 700 }}>Length Measurement by Head Type</div>
            </div>
            {HEAD_TYPES.map((item, i) => (
              <div key={i} style={{ padding: "12px 14px", borderBottom: `1px solid ${BORDER}`, background: i % 2 === 0 ? WHITE : ROW_ALT }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: NAVY, marginBottom: 4 }}>{item.name}</div>
                <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 4 }}>
                  <div style={{ background: AMBER + "30", border: `1px solid ${AMBER}`, borderRadius: 6, padding: "2px 8px", fontSize: 10, fontWeight: 700, color: "#92400E" }}>Measured:</div>
                  <div style={{ fontSize: 11, color: TEXT }}>{item.measured}</div>
                </div>
                <div style={{ fontSize: 11, color: MUTED }}>{item.note}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
