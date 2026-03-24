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
// FlangeBoltChart
// ════════════════════════════════════════════════════

// ─── DATA ─────────────────────────────────────────────────────────────────────
// Sources: ASME B16.5-2017 (Pipe Flanges and Flanged Fittings),
// ASME PCC-1 (flange assembly), ASTM A193/A194 (stud bolt/nut specs),
// Portland Bolt flange reference, Fastenal Engineering Reference

// Flange bolt data per ASME B16.5
// All sizes are nominal pipe size (NPS)
// bolt_size = stud bolt diameter (A193 B7)
// bolt_count = number of bolts
// bolt_circle = bolt circle diameter in inches
// stud_length = approximate stud length for raised face (inches)
// Pressure class 150# shown as default

const FLANGE_DATA = {
  "150#": [
    { nps: "1/2\"",   bolt_size: "1/2\"",   bolt_count: 4,  bolt_circle: "2-3/8\"",  stud_length: "1-3/4\"", star: false },
    { nps: "3/4\"",   bolt_size: "1/2\"",   bolt_count: 4,  bolt_circle: "2-3/4\"",  stud_length: "1-3/4\"", star: false },
    { nps: "1\"",     bolt_size: "1/2\"",   bolt_count: 4,  bolt_circle: "3-1/8\"",  stud_length: "2\"",     star: true },
    { nps: "1-1/4\"", bolt_size: "1/2\"",   bolt_count: 4,  bolt_circle: "3-1/2\"",  stud_length: "2\"",     star: false },
    { nps: "1-1/2\"", bolt_size: "1/2\"",   bolt_count: 4,  bolt_circle: "3-7/8\"",  stud_length: "2-1/4\"", star: false },
    { nps: "2\"",     bolt_size: "5/8\"",   bolt_count: 4,  bolt_circle: "4-3/4\"",  stud_length: "2-1/2\"", star: true },
    { nps: "2-1/2\"", bolt_size: "5/8\"",   bolt_count: 4,  bolt_circle: "5-1/2\"",  stud_length: "2-3/4\"", star: false },
    { nps: "3\"",     bolt_size: "5/8\"",   bolt_count: 4,  bolt_circle: "6\"",       stud_length: "3\"",     star: true },
    { nps: "3-1/2\"", bolt_size: "5/8\"",   bolt_count: 8,  bolt_circle: "7\"",       stud_length: "3\"",     star: false },
    { nps: "4\"",     bolt_size: "5/8\"",   bolt_count: 8,  bolt_circle: "7-1/2\"",  stud_length: "3\"",     star: true },
    { nps: "5\"",     bolt_size: "3/4\"",   bolt_count: 8,  bolt_circle: "8-1/2\"",  stud_length: "3-1/2\"", star: false },
    { nps: "6\"",     bolt_size: "3/4\"",   bolt_count: 8,  bolt_circle: "9-1/2\"",  stud_length: "3-1/2\"", star: true },
    { nps: "8\"",     bolt_size: "3/4\"",   bolt_count: 8,  bolt_circle: "11-3/4\"", stud_length: "3-3/4\"", star: true },
    { nps: "10\"",    bolt_size: "7/8\"",   bolt_count: 12, bolt_circle: "14-1/4\"", stud_length: "4-1/4\"", star: false },
    { nps: "12\"",    bolt_size: "7/8\"",   bolt_count: 12, bolt_circle: "17\"",      stud_length: "4-1/2\"", star: false },
    { nps: "14\"",    bolt_size: "1\"",     bolt_count: 12, bolt_circle: "18-3/4\"", stud_length: "5\"",     star: false },
    { nps: "16\"",    bolt_size: "1\"",     bolt_count: 16, bolt_circle: "21-1/4\"", stud_length: "5-1/4\"", star: false },
    { nps: "18\"",    bolt_size: "1-1/4\"", bolt_count: 16, bolt_circle: "22-3/4\"", stud_length: "5-3/4\"", star: false },
    { nps: "20\"",    bolt_size: "1-1/4\"", bolt_count: 20, bolt_circle: "25\"",      stud_length: "6\"",     star: false },
    { nps: "24\"",    bolt_size: "1-1/4\"", bolt_count: 20, bolt_circle: "29-1/2\"", stud_length: "6-1/2\"", star: false },
  ],
  "300#": [
    { nps: "1/2\"",   bolt_size: "1/2\"",   bolt_count: 4,  bolt_circle: "2-5/8\"",  stud_length: "2\"",     star: false },
    { nps: "3/4\"",   bolt_size: "5/8\"",   bolt_count: 4,  bolt_circle: "3-1/4\"",  stud_length: "2-1/4\"", star: false },
    { nps: "1\"",     bolt_size: "5/8\"",   bolt_count: 4,  bolt_circle: "3-1/2\"",  stud_length: "2-1/4\"", star: true },
    { nps: "1-1/2\"", bolt_size: "3/4\"",   bolt_count: 4,  bolt_circle: "4-5/8\"",  stud_length: "2-3/4\"", star: false },
    { nps: "2\"",     bolt_size: "5/8\"",   bolt_count: 8,  bolt_circle: "5\"",       stud_length: "2-1/2\"", star: true },
    { nps: "3\"",     bolt_size: "3/4\"",   bolt_count: 8,  bolt_circle: "6-5/8\"",  stud_length: "3\"",     star: true },
    { nps: "4\"",     bolt_size: "3/4\"",   bolt_count: 8,  bolt_circle: "7-7/8\"",  stud_length: "3-1/4\"", star: true },
    { nps: "6\"",     bolt_size: "3/4\"",   bolt_count: 12, bolt_circle: "10-5/8\"", stud_length: "3-3/4\"", star: true },
    { nps: "8\"",     bolt_size: "7/8\"",   bolt_count: 12, bolt_circle: "13\"",      stud_length: "4-1/2\"", star: false },
    { nps: "10\"",    bolt_size: "1\"",     bolt_count: 16, bolt_circle: "15-1/4\"", stud_length: "5\"",     star: false },
    { nps: "12\"",    bolt_size: "1-1/8\"", bolt_count: 16, bolt_circle: "17-3/4\"", stud_length: "5-1/2\"", star: false },
    { nps: "16\"",    bolt_size: "1-1/4\"", bolt_count: 16, bolt_circle: "21-7/8\"", stud_length: "6-1/2\"", star: false },
    { nps: "20\"",    bolt_size: "1-1/4\"", bolt_count: 24, bolt_circle: "27\"",      stud_length: "7\"",     star: false },
    { nps: "24\"",    bolt_size: "1-1/2\"", bolt_count: 24, bolt_circle: "32\"",      stud_length: "8\"",     star: false },
  ],
  "600#": [
    { nps: "1/2\"",   bolt_size: "1/2\"",   bolt_count: 4,  bolt_circle: "2-5/8\"",  stud_length: "2-1/2\"", star: false },
    { nps: "1\"",     bolt_size: "5/8\"",   bolt_count: 4,  bolt_circle: "3-1/2\"",  stud_length: "3\"",     star: true },
    { nps: "2\"",     bolt_size: "3/4\"",   bolt_count: 8,  bolt_circle: "5\"",       stud_length: "3-1/2\"", star: true },
    { nps: "3\"",     bolt_size: "7/8\"",   bolt_count: 8,  bolt_circle: "6-5/8\"",  stud_length: "4\"",     star: true },
    { nps: "4\"",     bolt_size: "7/8\"",   bolt_count: 8,  bolt_circle: "7-7/8\"",  stud_length: "4-1/4\"", star: true },
    { nps: "6\"",     bolt_size: "1\"",     bolt_count: 12, bolt_circle: "11\"",      stud_length: "5\"",     star: true },
    { nps: "8\"",     bolt_size: "1-1/8\"", bolt_count: 12, bolt_circle: "13\"",      stud_length: "5-1/2\"", star: false },
    { nps: "10\"",    bolt_size: "1-1/4\"", bolt_count: 16, bolt_circle: "15-1/4\"", stud_length: "6\"",     star: false },
    { nps: "12\"",    bolt_size: "1-3/8\"", bolt_count: 20, bolt_circle: "17-3/4\"", stud_length: "6-3/4\"", star: false },
    { nps: "16\"",    bolt_size: "1-1/2\"", bolt_count: 20, bolt_circle: "22-1/2\"", stud_length: "8\"",     star: false },
    { nps: "20\"",    bolt_size: "1-5/8\"", bolt_count: 24, bolt_circle: "27-3/4\"", stud_length: "9\"",     star: false },
    { nps: "24\"",    bolt_size: "1-7/8\"", bolt_count: 24, bolt_circle: "32\"",      stud_length: "10\"",    star: false },
  ],
};

const PRESSURE_CLASSES = Object.keys(FLANGE_DATA);

const FLANGE_NOTES = [
  {
    topic: "Standard Stud Bolt Material",
    detail: "ASME B16.5 flanges use stud bolts (double-end threaded, no head). Standard material is ASTM A193 Grade B7 (4140 Cr-Mo alloy steel) with ASTM A194 Grade 2H heavy hex nuts. This is the universal standard for industrial flanges.",
    color: "#059669",
  },
  {
    topic: "Stud Length Calculation",
    detail: "Stud length shown is approximate for raised face (RF) flanges with standard gaskets. Actual stud length = 2 × flange thickness + 2 × nut height + gasket thickness + 1/4\" thread protrusion each end. Always verify with actual flange dimensions.",
    color: "#2563EB",
  },
  {
    topic: "Tightening Sequence",
    detail: "Always tighten in a cross (star) pattern — NEVER in rotational sequence. Circular tightening warps the flange and causes uneven gasket compression leading to leaks. Use minimum 3 passes: 30% → 70% → 100% of final torque.",
    color: "#D97706",
  },
  {
    topic: "Re-torque requirement",
    detail: "All flanged joints should be re-torqued after the first heat cycle (first startup). Gasket compression and thermal expansion cause bolt relaxation. Re-torquing restores clamp load. Per ASME PCC-1 guidelines.",
    color: "#7C3AED",
  },
  {
    topic: "Gasket selection matters",
    detail: "Gasket material affects required bolt torque. Spiral wound (SW) gaskets are standard for most applications. Ring joint (RTJ) flanges require higher bolt forces. Always confirm torque values from gasket manufacturer for critical applications.",
    color: "#DC2626",
  },
  {
    topic: "300# ≠ 3× 150# pressure capacity",
    detail: "Pressure ratings are temperature-dependent. A 150# flange rated for 285 PSI at ambient temperature may only be rated for 20 PSI at 800°F. Always check the complete pressure-temperature rating table from ASME B16.5, not just the class number.",
    color: "#DC2626",
  },
];

export default function FlangeBoltChart() {
  const [pressureClass, setPressureClass] = useState("150#");
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("chart");

  const data = FLANGE_DATA[pressureClass] || [];
  const filtered = data.filter(r => r.nps.includes(search));

  return (
    <div style={{ fontFamily: "'DM Sans','Segoe UI',sans-serif", background: BG, minHeight: "100vh", maxWidth: 430, margin: "0 auto" }}>
      <div style={{ background: `linear-gradient(135deg, ${NAVY} 0%, #2C5282 100%)`, padding: "16px 20px 20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
          <span style={{ fontSize: 20 }}>⬡</span>
          <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 10, letterSpacing: 2, textTransform: "uppercase" }}>Fastener Companion</span>
        </div>
        <div style={{ color: WHITE, fontSize: 20, fontWeight: 800, marginBottom: 2 }}>Flange Bolt Chart</div>
        <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 11 }}>ASME B16.5-2017 · ASME PCC-1 · ASTM A193/A194</div>
        <div style={{ background: WHITE, borderRadius: 12, display: "flex", alignItems: "center", padding: "10px 14px", gap: 8, marginTop: 14, boxShadow: "0 2px 8px rgba(0,0,0,0.15)" }}>
          <span style={{ color: MUTED }}>??</span>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Filter by pipe size (e.g. 4, 6, 8)..."
            style={{ background: "none", border: "none", outline: "none", color: TEXT, fontSize: 14, flex: 1, fontFamily: "inherit" }} />
          {search && <span onClick={() => setSearch("")} style={{ color: MUTED, cursor: "pointer" }}>✕</span>}
        </div>
      </div>

      <div style={{ background: WHITE, borderBottom: `1px solid ${BORDER}`, padding: "0 8px", display: "flex" }}>
        {[{ id: "chart", label: "Bolt Chart" }, { id: "notes", label: "Field Notes" }].map(t => (
          <button key={t.id} onClick={() => setActiveTab(t.id)}
            style={{ background: "none", border: "none", cursor: "pointer", padding: "12px 14px", fontSize: 12, fontWeight: 700, fontFamily: "inherit", color: activeTab === t.id ? NAVY : MUTED, borderBottom: activeTab === t.id ? `3px solid ${AMBER}` : "3px solid transparent" }}>
            {t.label}
          </button>
        ))}
      </div>

      {activeTab === "chart" && (
        <div style={{ padding: "12px 16px 24px" }}>
          {/* PRESSURE CLASS SELECTOR */}
          <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
            {PRESSURE_CLASSES.map(pc => (
              <button key={pc} onClick={() => setPressureClass(pc)}
                style={{ flex: 1, background: pressureClass === pc ? NAVY : WHITE, color: pressureClass === pc ? WHITE : MUTED, border: `1.5px solid ${pressureClass === pc ? NAVY : BORDER}`, borderRadius: 10, padding: "8px", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
                {pc}
              </button>
            ))}
          </div>

          <div style={{ background: STAR_BG, border: `1px solid ${STAR_BORDER}`, borderRadius: 10, padding: "8px 12px", marginBottom: 10 }}>
            <div style={{ fontSize: 11, color: "#92400E" }}>
              <strong>Stud bolt material: ASTM A193 B7 + A194 2H nuts.</strong> ★ = most common pipe sizes. Stud lengths are approximate for raised face (RF) — verify with flange dimensions.
            </div>
          </div>

          <div style={{ background: WHITE, borderRadius: 14, overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.06)", border: `1px solid ${BORDER}` }}>
            <div style={{ display: "grid", gridTemplateColumns: "0.7fr 0.6fr 0.5fr 0.8fr 0.8fr", background: NAVY, padding: "10px 12px" }}>
              {["NPS", "Bolt Ø", "# Bolts", "BCD", "Stud L"].map(h => (
                <div key={h} style={{ color: WHITE, fontSize: 9, fontWeight: 700 }}>{h}</div>
              ))}
            </div>
            {filtered.map((row, i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "0.7fr 0.6fr 0.5fr 0.8fr 0.8fr", padding: "8px 12px", background: row.star ? STAR_BG : i % 2 === 0 ? WHITE : ROW_ALT, borderBottom: `1px solid ${BORDER}`, alignItems: "center" }}>
                <div style={{ fontSize: 12, fontWeight: row.star ? 800 : 600, color: NAVY, display: "flex", alignItems: "center", gap: 3 }}>
                  {row.star && <span style={{ color: AMBER, fontSize: 9 }}>★</span>}{row.nps}
                </div>
                <div style={{ fontSize: 12, fontWeight: 700, color: "#059669" }}>{row.bolt_size}</div>
                <div style={{ fontSize: 12, fontWeight: 700, color: NAVY }}>{row.bolt_count}</div>
                <div style={{ fontSize: 11, color: TEXT }}>{row.bolt_circle}</div>
                <div style={{ fontSize: 11, color: MUTED }}>{row.stud_length}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 8, fontSize: 10, color: MUTED }}>BCD = Bolt Circle Diameter. Stud L = approximate stud bolt length. Verify actual dimensions from flange manufacturer.</div>
        </div>
      )}

      {activeTab === "notes" && (
        <div style={{ padding: "14px 16px", display: "flex", flexDirection: "column", gap: 10 }}>
          {FLANGE_NOTES.map((note, i) => (
            <div key={i} style={{ background: WHITE, border: `1px solid ${BORDER}`, borderLeft: `4px solid ${note.color}`, borderRadius: 12, padding: "12px 14px" }}>
              <div style={{ fontSize: 12, fontWeight: 800, color: note.color, marginBottom: 6 }}>{note.topic}</div>
              <div style={{ fontSize: 12, color: TEXT, lineHeight: 1.6 }}>{note.detail}</div>
            </div>
          ))}
          <div style={{ background: "#FFF1F2", border: "1px solid #FECDD3", borderRadius: 10, padding: "10px 14px" }}>
            <div style={{ fontSize: 10, color: "#9F1239", lineHeight: 1.5 }}>
              <strong>⚠ Verify Before Use.</strong> Bolt data per ASME B16.5-2017. Stud bolt lengths are approximate — verify with actual flange dimensions and gasket thickness. All flange assembly should follow ASME PCC-1. Fastener Companion is a reference tool.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
