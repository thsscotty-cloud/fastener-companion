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
// CboreCsink
// ════════════════════════════════════════════════════

// ─── DATA ─────────────────────────────────────────────────────────────────────
// Sources: ASME B18.3 (socket head counterbores),
// Machinery's Handbook 31st Ed. (countersinks and counterbores),
// ISO 4762 (metric SHCS), Shigley's MED

// Counterbore dimensions for socket head cap screws (SHCS)
// Cbore diameter must allow head to seat; depth = head height
const CBORE_IMP = [
  { size: "#4-40",   head_d: "0.183\"", head_h: "0.101\"", cbore_d: "3/16\"",  cbore_h: "7/64\"",  clear_drill: "#26", star: false },
  { size: "#6-32",   head_d: "0.226\"", head_h: "0.120\"", cbore_d: "15/64\"", cbore_h: "1/8\"",   clear_drill: "#18", star: false },
  { size: "#8-32",   head_d: "0.270\"", head_h: "0.140\"", cbore_d: "9/32\"",  cbore_h: "9/64\"",  clear_drill: "#9", star: false },
  { size: "#10-32",  head_d: "0.312\"", head_h: "0.160\"", cbore_d: "5/16\"",  cbore_h: "5/32\"",  clear_drill: "#2", star: true },
  { size: "1/4-20",  head_d: "0.375\"", head_h: "0.250\"", cbore_d: "3/8\"",   cbore_h: "1/4\"",   clear_drill: "F",  star: true },
  { size: "5/16-18", head_d: "0.469\"", head_h: "0.3125\"", cbore_d: "1/2\"",  cbore_h: "5/16\"",  clear_drill: "P",  star: true },
  { size: "3/8-16",  head_d: "0.562\"", head_h: "0.375\"", cbore_d: "9/16\"",  cbore_h: "3/8\"",   clear_drill: "W",  star: true },
  { size: "1/2-13",  head_d: "0.750\"", head_h: "0.500\"", cbore_d: "3/4\"",   cbore_h: "1/2\"",   clear_drill: "29/64\"", star: true },
  { size: "5/8-11",  head_d: "0.938\"", head_h: "0.625\"", cbore_d: "15/16\"", cbore_h: "5/8\"",   clear_drill: "37/64\"", star: false },
  { size: "3/4-10",  head_d: "1.125\"", head_h: "0.750\"", cbore_d: "1-1/8\"", cbore_h: "3/4\"",   clear_drill: "11/16\"", star: true },
  { size: "1-8",     head_d: "1.500\"", head_h: "1.000\"", cbore_d: "1-1/2\"", cbore_h: "1\"",     clear_drill: "59/64\"", star: false },
];

const CBORE_MET = [
  { size: "M4",   head_d: "7.0",  head_h: "4.0",  cbore_d: "8.0",   cbore_h: "4.4",  star: false },
  { size: "M5",   head_d: "8.5",  head_h: "5.0",  cbore_d: "9.5",   cbore_h: "5.5",  star: false },
  { size: "M6",   head_d: "10.0", head_h: "6.0",  cbore_d: "11.0",  cbore_h: "6.6",  star: true },
  { size: "M8",   head_d: "13.0", head_h: "8.0",  cbore_d: "14.0",  cbore_h: "8.8",  star: true },
  { size: "M10",  head_d: "16.0", head_h: "10.0", cbore_d: "17.5",  cbore_h: "11.0", star: true },
  { size: "M12",  head_d: "18.0", head_h: "12.0", cbore_d: "20.0",  cbore_h: "13.2", star: true },
  { size: "M16",  head_d: "24.0", head_h: "16.0", cbore_d: "26.0",  cbore_h: "17.6", star: true },
  { size: "M20",  head_d: "30.0", head_h: "20.0", cbore_d: "33.0",  cbore_h: "22.0", star: false },
  { size: "M24",  head_d: "36.0", head_h: "24.0", cbore_d: "40.0",  cbore_h: "26.4", star: false },
];

const CSINK_IMP = [
  { size: "#4-40",   csink_d: "0.225\"", drill: "#30" },
  { size: "#6-32",   csink_d: "0.279\"", drill: "#27" },
  { size: "#8-32",   csink_d: "0.332\"", drill: "#19" },
  { size: "#10-32",  csink_d: "0.385\"", drill: "#10", star: true },
  { size: "1/4-20",  csink_d: "0.507\"", drill: "F",   star: true },
  { size: "5/16-18", csink_d: "0.635\"", drill: "P",   star: true },
  { size: "3/8-16",  csink_d: "0.762\"", drill: "W",   star: true },
  { size: "7/16-14", csink_d: "0.812\"", drill: "29/64\"" },
  { size: "1/2-13",  csink_d: "0.875\"", drill: "29/64\"", star: true },
  { size: "5/8-11",  csink_d: "1.188\"", drill: "37/64\"" },
  { size: "3/4-10",  csink_d: "1.438\"", drill: "11/16\"", star: false },
];

const CSINK_MET = [
  { size: "M3",   csink_d: "6.72",  drill: "2.5" },
  { size: "M4",   csink_d: "8.96",  drill: "3.3" },
  { size: "M5",   csink_d: "11.20", drill: "4.2", star: false },
  { size: "M6",   csink_d: "13.44", drill: "5.0", star: true },
  { size: "M8",   csink_d: "17.92", drill: "6.8", star: true },
  { size: "M10",  csink_d: "22.40", drill: "8.5", star: true },
  { size: "M12",  csink_d: "26.88", drill: "10.2", star: true },
  { size: "M16",  csink_d: "33.60", drill: "14.0", star: false },
  { size: "M20",  csink_d: "40.32", drill: "17.5", star: false },
];

export default function CboreCsink() {
  const [system, setSystem] = useState("imperial");
  const [activeTab, setActiveTab] = useState("cbore");
  const [search, setSearch] = useState("");

  const cboreData = system === "imperial" ? CBORE_IMP : CBORE_MET;
  const csinkData = system === "imperial" ? CSINK_IMP : CSINK_MET;
  const filteredCbore = cboreData.filter(r => r.size.toLowerCase().includes(search.toLowerCase()));
  const filteredCsink = csinkData.filter(r => r.size.toLowerCase().includes(search.toLowerCase()));

  return (
    <div style={{ fontFamily: "'DM Sans','Segoe UI',sans-serif", background: BG, minHeight: "100vh", maxWidth: 430, margin: "0 auto" }}>
      <div style={{ background: `linear-gradient(135deg, ${NAVY} 0%, #2C5282 100%)`, padding: "16px 20px 20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
          <span style={{ fontSize: 20 }}>⬡</span>
          <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 10, letterSpacing: 2, textTransform: "uppercase" }}>Fastener Companion</span>
        </div>
        <div style={{ color: WHITE, fontSize: 20, fontWeight: 800, marginBottom: 2 }}>Counterbore & Countersink</div>
        <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 11 }}>ASME B18.3 · ISO 4762 · Machinery's Handbook 31st Ed.</div>
        <div style={{ background: WHITE, borderRadius: 12, display: "flex", alignItems: "center", padding: "10px 14px", gap: 8, marginTop: 14, boxShadow: "0 2px 8px rgba(0,0,0,0.15)" }}>
          <span style={{ color: MUTED }}>??</span>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Filter by size..."
            style={{ background: "none", border: "none", outline: "none", color: TEXT, fontSize: 14, flex: 1, fontFamily: "inherit" }} />
          {search && <span onClick={() => setSearch("")} style={{ color: MUTED, cursor: "pointer" }}>✕</span>}
        </div>
      </div>

      <div style={{ background: WHITE, borderBottom: `1px solid ${BORDER}`, padding: "0 8px", display: "flex" }}>
        {[{ id: "cbore", label: "Counterbore (SHCS)" }, { id: "csink", label: "Countersink (Flat Head)" }].map(t => (
          <button key={t.id} onClick={() => { setActiveTab(t.id); setSearch(""); }}
            style={{ background: "none", border: "none", cursor: "pointer", padding: "11px 12px", fontSize: 11, fontWeight: 700, fontFamily: "inherit", whiteSpace: "nowrap", color: activeTab === t.id ? NAVY : MUTED, borderBottom: activeTab === t.id ? `3px solid ${AMBER}` : "3px solid transparent" }}>
            {t.label}
          </button>
        ))}
      </div>

      <div style={{ padding: "12px 16px 24px" }}>
        <div style={{ display: "flex", background: WHITE, border: `1px solid ${BORDER}`, borderRadius: 10, padding: 4, marginBottom: 12 }}>
          {["imperial", "metric"].map(s => (
            <button key={s} onClick={() => { setSystem(s); setSearch(""); }}
              style={{ flex: 1, background: system === s ? NAVY : "none", color: system === s ? WHITE : MUTED, border: "none", borderRadius: 8, padding: "8px", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", textTransform: "capitalize" }}>
              {s}
            </button>
          ))}
        </div>

        {activeTab === "cbore" && (
          <>
            <div style={{ background: STAR_BG, border: `1px solid ${STAR_BORDER}`, borderRadius: 10, padding: "8px 12px", marginBottom: 10 }}>
              <div style={{ fontSize: 11, color: "#92400E" }}>Counterbore dimensions for socket head cap screws (SHCS). Cbore diameter allows head to sit flush or below surface. Depth = head height.</div>
            </div>
            <div style={{ background: WHITE, borderRadius: 14, overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.06)", border: `1px solid ${BORDER}` }}>
              <div style={{ display: "grid", gridTemplateColumns: system === "imperial" ? "0.9fr 0.7fr 0.7fr 0.7fr 0.7fr" : "0.7fr 0.7fr 0.7fr 0.7fr 0.7fr", background: NAVY, padding: "10px 12px" }}>
                {["Size", "Head Ø", "Head H", "Cbore Ø", system === "imperial" ? "Drill" : "Cbore H"].map(h => (
                  <div key={h} style={{ color: WHITE, fontSize: 9, fontWeight: 700 }}>{h}</div>
                ))}
              </div>
              {filteredCbore.map((row, i) => (
                <div key={i} style={{ display: "grid", gridTemplateColumns: system === "imperial" ? "0.9fr 0.7fr 0.7fr 0.7fr 0.7fr" : "0.7fr 0.7fr 0.7fr 0.7fr 0.7fr", padding: "8px 12px", background: row.star ? STAR_BG : i % 2 === 0 ? WHITE : ROW_ALT, borderBottom: `1px solid ${BORDER}`, alignItems: "center" }}>
                  <div style={{ fontSize: 11, fontWeight: row.star ? 800 : 600, color: NAVY, display: "flex", alignItems: "center", gap: 3 }}>
                    {row.star && <span style={{ color: AMBER, fontSize: 9 }}>★</span>}{row.size}
                  </div>
                  <div style={{ fontSize: 11, color: MUTED }}>{system === "imperial" ? row.head_d : `${row.head_d}mm`}</div>
                  <div style={{ fontSize: 11, color: MUTED }}>{system === "imperial" ? row.head_h : `${row.head_h}mm`}</div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: NAVY }}>{system === "imperial" ? row.cbore_d : `${row.cbore_d}mm`}</div>
                  <div style={{ fontSize: 11, color: TEXT }}>{system === "imperial" ? row.clear_drill : `${row.cbore_h}mm`}</div>
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab === "csink" && (
          <>
            <div style={{ background: "#FFF1F2", border: "1px solid #FECDD3", borderRadius: 10, padding: "8px 12px", marginBottom: 10 }}>
              <div style={{ fontSize: 11, color: "#9F1239" }}>
                <strong>Critical:</strong> Inch flat head machine screws use 82° countersink angle. Metric flat head screws use 90°. These are NOT interchangeable — using wrong angle leaves head proud or creates uneven bearing.
              </div>
            </div>
            <div style={{ background: WHITE, borderRadius: 14, overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.06)", border: `1px solid ${BORDER}` }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", background: NAVY, padding: "10px 12px" }}>
                {["Size", "Csink Ø", "Pilot Drill"].map(h => (
                  <div key={h} style={{ color: WHITE, fontSize: 10, fontWeight: 700 }}>{h}</div>
                ))}
              </div>
              {filteredCsink.map((row, i) => (
                <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", padding: "8px 12px", background: row.star ? STAR_BG : i % 2 === 0 ? WHITE : ROW_ALT, borderBottom: `1px solid ${BORDER}`, alignItems: "center" }}>
                  <div style={{ fontSize: 12, fontWeight: row.star ? 800 : 600, color: NAVY, display: "flex", alignItems: "center", gap: 3 }}>
                    {row.star && <span style={{ color: AMBER, fontSize: 9 }}>★</span>}{row.size}
                  </div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: NAVY }}>{system === "imperial" ? row.csink_d : `${row.csink_d}mm`}</div>
                  <div style={{ fontSize: 11, color: TEXT }}>{system === "imperial" ? row.drill : `${row.drill}mm`}</div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 10, background: "#EEF4FF", border: `1px solid ${BORDER}`, borderRadius: 10, padding: "10px 14px" }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#2563EB", marginBottom: 4 }}>Countersink Angle Reference</div>
              {[
                { std: "Inch (ASME B18.6.3)", angle: "82°", note: "Standard for unified inch flat head machine screws" },
                { std: "Metric (ISO 7046 / DIN 965)", angle: "90°", note: "Standard for metric flat head screws" },
                { std: "Aerospace AN/MS flat head", angle: "100°", note: "Wider angle for thinner aircraft skin" },
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", gap: 10, marginBottom: i < 2 ? 6 : 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 800, color: "#2563EB", minWidth: 40 }}>{item.angle}</div>
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 700, color: NAVY }}>{item.std}</div>
                    <div style={{ fontSize: 11, color: MUTED }}>{item.note}</div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        <div style={{ marginTop: 12, background: "#FFF1F2", border: "1px solid #FECDD3", borderRadius: 10, padding: "10px 14px" }}>
          <div style={{ fontSize: 10, color: "#9F1239", lineHeight: 1.5 }}>
            <strong>⚠ Verify Before Use.</strong> Counterbore dims per ASME B18.3. Countersink dims per Machinery's Handbook. Verify with actual fastener head dimensions before machining. Fastener Companion is a reference tool.
          </div>
        </div>
      </div>
    </div>
  );
}
