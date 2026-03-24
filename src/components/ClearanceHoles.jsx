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
// ClearanceHoles
// ════════════════════════════════════════════════════

// ─── DATA ─────────────────────────────────────────────────────────────────────
// Sources: ASME B18.2.8 (clearance holes for bolts, screws, studs),
// ASME B18.3 (socket head clearance), ISO 273 (metric clearance holes),
// Machinery's Handbook 31st Ed., Shigley's MED

// Clearance hole fits:
// Close (normal fit): bolt passes through with minimal clearance — best for alignment
// Normal: standard clearance for most applications
// Loose: maximum clearance for ease of assembly or misalignment tolerance

const CLEARANCE_HOLES_IMP = [
  { size: "#4 (0.112\")",   close: "0.120\"", normal: "0.125\"", loose: "0.136\"", close_mm: "3.05", normal_mm: "3.18", loose_mm: "3.45" },
  { size: "#6 (0.138\")",   close: "0.144\"", normal: "0.150\"", loose: "0.164\"", close_mm: "3.66", normal_mm: "3.81", loose_mm: "4.17", star: false },
  { size: "#8 (0.164\")",   close: "0.170\"", normal: "0.177\"", loose: "0.196\"", close_mm: "4.32", normal_mm: "4.50", loose_mm: "4.98" },
  { size: "#10 (0.190\")",  close: "0.196\"", normal: "0.201\"", loose: "0.228\"", close_mm: "4.98", normal_mm: "5.11", loose_mm: "5.79", star: false },
  { size: "1/4\" (0.250\")", close: "0.257\"", normal: "0.266\"", loose: "0.281\"", close_mm: "6.53", normal_mm: "6.76", loose_mm: "7.14", star: true },
  { size: "5/16\" (0.3125\")", close: "0.323\"", normal: "0.332\"", loose: "0.348\"", close_mm: "8.20", normal_mm: "8.43", loose_mm: "8.84", star: true },
  { size: "3/8\" (0.375\")", close: "0.386\"", normal: "0.397\"", loose: "0.413\"", close_mm: "9.80", normal_mm: "10.08", loose_mm: "10.49", star: true },
  { size: "7/16\" (0.4375\")", close: "0.449\"", normal: "0.453\"", loose: "0.480\"", close_mm: "11.40", normal_mm: "11.51", loose_mm: "12.19", star: false },
  { size: "1/2\" (0.500\")", close: "0.511\"", normal: "0.531\"", loose: "0.562\"", close_mm: "12.98", normal_mm: "13.49", loose_mm: "14.27", star: true },
  { size: "9/16\" (0.5625\")", close: "0.576\"", normal: "0.594\"", loose: "0.625\"", close_mm: "14.63", normal_mm: "15.09", loose_mm: "15.88", star: false },
  { size: "5/8\" (0.625\")", close: "0.642\"", normal: "0.656\"", loose: "0.687\"", close_mm: "16.31", normal_mm: "16.66", loose_mm: "17.45", star: false },
  { size: "3/4\" (0.750\")", close: "0.766\"", normal: "0.781\"", loose: "0.812\"", close_mm: "19.46", normal_mm: "19.84", loose_mm: "20.63", star: true },
  { size: "7/8\" (0.875\")", close: "0.891\"", normal: "0.906\"", loose: "0.937\"", close_mm: "22.63", normal_mm: "23.01", loose_mm: "23.80", star: false },
  { size: "1\" (1.000\")",   close: "1.016\"", normal: "1.047\"", loose: "1.094\"", close_mm: "25.81", normal_mm: "26.59", loose_mm: "27.79", star: true },
  { size: "1-1/4\" (1.250\")", close: "1.281\"", normal: "1.313\"", loose: "1.375\"", close_mm: "32.54", normal_mm: "33.35", loose_mm: "34.93", star: false },
  { size: "1-1/2\" (1.500\")", close: "1.531\"", normal: "1.562\"", loose: "1.625\"", close_mm: "38.89", normal_mm: "39.67", loose_mm: "41.28", star: false },
];

const CLEARANCE_HOLES_MET = [
  { size: "M3",  close: "3.2",  normal: "3.4",  loose: "3.6",  star: false },
  { size: "M4",  close: "4.3",  normal: "4.5",  loose: "4.8",  star: false },
  { size: "M5",  close: "5.3",  normal: "5.5",  loose: "5.8",  star: false },
  { size: "M6",  close: "6.4",  normal: "6.6",  loose: "7.0",  star: true },
  { size: "M8",  close: "8.4",  normal: "9.0",  loose: "10.0", star: true },
  { size: "M10", close: "10.5", normal: "11.0", loose: "12.0", star: true },
  { size: "M12", close: "13.0", normal: "13.5", loose: "14.5", star: true },
  { size: "M14", close: "15.0", normal: "15.5", loose: "16.5", star: false },
  { size: "M16", close: "17.0", normal: "17.5", loose: "18.5", star: true },
  { size: "M18", close: "19.0", normal: "20.0", loose: "21.0", star: false },
  { size: "M20", close: "21.0", normal: "22.0", loose: "24.0", star: true },
  { size: "M22", close: "23.0", normal: "24.0", loose: "26.0", star: false },
  { size: "M24", close: "25.0", normal: "26.0", loose: "28.0", star: true },
  { size: "M27", close: "28.0", normal: "30.0", loose: "32.0", star: false },
  { size: "M30", close: "31.0", normal: "33.0", loose: "35.0", star: false },
  { size: "M33", close: "34.0", normal: "36.0", loose: "38.0", star: false },
  { size: "M36", close: "37.0", normal: "39.0", loose: "42.0", star: false },
  { size: "M42", close: "43.0", normal: "45.0", loose: "48.0", star: false },
  { size: "M48", close: "50.0", normal: "52.0", loose: "56.0", star: false },
];

const FIT_GUIDANCE = [
  {
    fit: "Close Fit",
    use: "Precision alignment applications where bolts also locate parts. Dowel-like function.",
    when: "Precision machinery, optical mounts, tooling, jigs, fixtures requiring accurate part location",
    note: "Requires careful assembly — less tolerance for misalignment. Best fit when bolt must also act as locating feature.",
    color: "#DC2626",
  },
  {
    fit: "Normal Fit",
    use: "Standard clearance for most bolted joints. Default choice unless specific reason for other fit.",
    when: "General machinery, structural connections, most industrial applications",
    note: "Sufficient clearance for easy assembly with adequate alignment. Use this unless you have specific reason for close or loose.",
    color: "#059669",
    star: true,
  },
  {
    fit: "Loose Fit",
    use: "Maximum clearance for easy assembly, thermal expansion accommodation, or field connections.",
    when: "Field erection, structural steel with misalignment tolerance, high-temperature applications with thermal growth, adjustable connections",
    note: "Easiest assembly. Bolt cannot act as locating feature. Use shear plates or dowels if shear alignment is needed.",
    color: "#2563EB",
  },
];

export default function ClearanceHoles() {
  const [system, setSystem] = useState("imperial");
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("table");

  const data = system === "imperial" ? CLEARANCE_HOLES_IMP : CLEARANCE_HOLES_MET;
  const filtered = data.filter(r => r.size.toLowerCase().includes(search.toLowerCase()));

  return (
    <div style={{ fontFamily: "'DM Sans','Segoe UI',sans-serif", background: BG, minHeight: "100vh", maxWidth: 430, margin: "0 auto" }}>
      <div style={{ background: `linear-gradient(135deg, ${NAVY} 0%, #2C5282 100%)`, padding: "16px 20px 20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
          <span style={{ fontSize: 20 }}>⬡</span>
          <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 10, letterSpacing: 2, textTransform: "uppercase" }}>Fastener Companion</span>
        </div>
        <div style={{ color: WHITE, fontSize: 20, fontWeight: 800, marginBottom: 2 }}>Clearance Hole Sizes</div>
        <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 11 }}>ASME B18.2.8 · ISO 273 · Machinery's Handbook 31st Ed.</div>
        <div style={{ background: WHITE, borderRadius: 12, display: "flex", alignItems: "center", padding: "10px 14px", gap: 8, marginTop: 14, boxShadow: "0 2px 8px rgba(0,0,0,0.15)" }}>
          <span style={{ color: MUTED }}>??</span>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Filter by bolt size..."
            style={{ background: "none", border: "none", outline: "none", color: TEXT, fontSize: 14, flex: 1, fontFamily: "inherit" }} />
          {search && <span onClick={() => setSearch("")} style={{ color: MUTED, cursor: "pointer" }}>✕</span>}
        </div>
      </div>

      <div style={{ background: WHITE, borderBottom: `1px solid ${BORDER}`, padding: "0 8px", display: "flex" }}>
        {[{ id: "table", label: "Hole Sizes" }, { id: "guidance", label: "Fit Selection" }].map(t => (
          <button key={t.id} onClick={() => setActiveTab(t.id)}
            style={{ background: "none", border: "none", cursor: "pointer", padding: "12px 14px", fontSize: 12, fontWeight: 700, fontFamily: "inherit", color: activeTab === t.id ? NAVY : MUTED, borderBottom: activeTab === t.id ? `3px solid ${AMBER}` : "3px solid transparent" }}>
            {t.label}
          </button>
        ))}
      </div>

      {activeTab === "table" && (
        <div style={{ padding: "12px 16px 24px" }}>
          <div style={{ display: "flex", background: WHITE, border: `1px solid ${BORDER}`, borderRadius: 10, padding: 4, marginBottom: 12 }}>
            {["imperial", "metric"].map(s => (
              <button key={s} onClick={() => { setSystem(s); setSearch(""); }}
                style={{ flex: 1, background: system === s ? NAVY : "none", color: system === s ? WHITE : MUTED, border: "none", borderRadius: 8, padding: "8px", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", textTransform: "capitalize" }}>
                {s}
              </button>
            ))}
          </div>
          <div style={{ background: STAR_BG, border: `1px solid ${STAR_BORDER}`, borderRadius: 10, padding: "8px 12px", marginBottom: 10 }}>
            <div style={{ fontSize: 11, color: "#92400E" }}>★ = most common sizes. All dimensions are minimum hole diameters. Normal fit is the default for most applications.</div>
          </div>
          <div style={{ background: WHITE, borderRadius: 14, overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.06)", border: `1px solid ${BORDER}` }}>
            <div style={{ display: "grid", gridTemplateColumns: system === "imperial" ? "1.2fr 0.8fr 0.8fr 0.8fr" : "0.8fr 0.8fr 0.8fr 0.8fr", background: NAVY, padding: "10px 12px" }}>
              {["Bolt Size", "Close", "Normal", "Loose"].map(h => (
                <div key={h} style={{ color: WHITE, fontSize: 9, fontWeight: 700 }}>{h}</div>
              ))}
            </div>
            {filtered.map((row, i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: system === "imperial" ? "1.2fr 0.8fr 0.8fr 0.8fr" : "0.8fr 0.8fr 0.8fr 0.8fr", padding: "8px 12px", background: row.star ? STAR_BG : i % 2 === 0 ? WHITE : ROW_ALT, borderBottom: `1px solid ${BORDER}`, alignItems: "center" }}>
                <div style={{ fontSize: 11, fontWeight: row.star ? 800 : 600, color: NAVY, display: "flex", alignItems: "center", gap: 3 }}>
                  {row.star && <span style={{ color: AMBER, fontSize: 9 }}>★</span>}{row.size}
                </div>
                <div style={{ fontSize: 11, color: "#DC2626", fontWeight: 600 }}>{system === "imperial" ? row.close : `${row.close}mm`}</div>
                <div style={{ fontSize: 12, fontWeight: 800, color: "#059669" }}>{system === "imperial" ? row.normal : `${row.normal}mm`}</div>
                <div style={{ fontSize: 11, color: "#2563EB", fontWeight: 600 }}>{system === "imperial" ? row.loose : `${row.loose}mm`}</div>
              </div>
            ))}
          </div>
          {system === "imperial" && (
            <div style={{ marginTop: 8, fontSize: 10, color: MUTED }}>Dimensions in inches per ASME B18.2.8. Metric equivalents available in metric tab.</div>
          )}
        </div>
      )}

      {activeTab === "guidance" && (
        <div style={{ padding: "14px 16px", display: "flex", flexDirection: "column", gap: 10 }}>
          {FIT_GUIDANCE.map((item, i) => (
            <div key={i} style={{ background: WHITE, border: `1px solid ${BORDER}`, borderLeft: `4px solid ${item.color}`, borderRadius: 12, padding: "14px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <div style={{ fontSize: 14, fontWeight: 800, color: item.color }}>{item.fit}</div>
                {item.star && <span style={{ color: AMBER, fontSize: 12 }}>★ Default</span>}
              </div>
              <div style={{ fontSize: 12, color: TEXT, lineHeight: 1.5, marginBottom: 8 }}>{item.use}</div>
              <div style={{ background: item.color + "10", borderRadius: 8, padding: "8px 10px", marginBottom: 6 }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: item.color, textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 2 }}>Use When</div>
                <div style={{ fontSize: 11, color: TEXT }}>{item.when}</div>
              </div>
              <div style={{ fontSize: 11, color: MUTED, fontStyle: "italic" }}>{item.note}</div>
            </div>
          ))}
          <div style={{ background: "#EEF4FF", border: `1px solid ${BORDER}`, borderRadius: 12, padding: "12px 14px" }}>
            <div style={{ fontSize: 12, fontWeight: 800, color: NAVY, marginBottom: 6 }}>Bolts Don't Locate — Dowels Do</div>
            <div style={{ fontSize: 12, color: TEXT, lineHeight: 1.6 }}>
              A critical design principle: fasteners clamp, dowel pins locate. If you need precise part alignment, use close-fit clearance holes AND dowel pins — relying on bolts alone for location is poor practice. Bolts in normal-fit clearance holes have enough play to allow part misalignment.
            </div>
          </div>
          <div style={{ background: "#FFF1F2", border: "1px solid #FECDD3", borderRadius: 10, padding: "10px 14px" }}>
            <div style={{ fontSize: 10, color: "#9F1239", lineHeight: 1.5 }}>
              <strong>⚠ Verify Before Use.</strong> Clearance holes per ASME B18.2.8 (inch) and ISO 273 (metric). Fastener Companion is a reference tool.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
