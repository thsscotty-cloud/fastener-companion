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
// PipeThreadReference
// ════════════════════════════════════════════════════

// ─── DATA ─────────────────────────────────────────────────────────────────────
// Sources: ASME B1.20.1 (NPT pipe threads), ASME B1.20.3 (NPTF dryseal),
// Parker Hannifin fitting reference, Swagelok tube fitting guide,
// IFI 7th Edition, Machinery's Handbook 31st Ed.

const NPT_SIZES = [
  { size: "1/8\"",    od: "0.405\"",  tpi: 27,  engagement: "0.180\"", turns: 4.9, tap_drill: "11/32\"", od_mm: "10.29", star: false },
  { size: "1/4\"",    od: "0.540\"",  tpi: 18,  engagement: "0.200\"", turns: 3.6, tap_drill: "7/16\"",  od_mm: "13.72", star: true },
  { size: "3/8\"",    od: "0.675\"",  tpi: 18,  engagement: "0.240\"", turns: 4.3, tap_drill: "37/64\"", od_mm: "17.15", star: true },
  { size: "1/2\"",    od: "0.840\"",  tpi: 14,  engagement: "0.320\"", turns: 4.5, tap_drill: "23/32\"", od_mm: "21.34", star: true },
  { size: "3/4\"",    od: "1.050\"",  tpi: 14,  engagement: "0.339\"", turns: 4.7, tap_drill: "59/64\"", od_mm: "26.67", star: true },
  { size: "1\"",      od: "1.315\"",  tpi: 11.5, engagement: "0.400\"", turns: 4.6, tap_drill: "1-5/32\"", od_mm: "33.40", star: true },
  { size: "1-1/4\"",  od: "1.660\"",  tpi: 11.5, engagement: "0.420\"", turns: 4.8, tap_drill: "1-1/2\"",  od_mm: "42.16", star: true },
  { size: "1-1/2\"",  od: "1.900\"",  tpi: 11.5, engagement: "0.420\"", turns: 4.8, tap_drill: "1-23/32\"", od_mm: "48.26", star: false },
  { size: "2\"",      od: "2.375\"",  tpi: 11.5, engagement: "0.436\"", turns: 5.0, tap_drill: "2-7/32\"",  od_mm: "60.33", star: false },
  { size: "2-1/2\"",  od: "2.875\"",  tpi: 8,    engagement: "0.682\"", turns: 5.5, tap_drill: "2-5/8\"",  od_mm: "73.03", star: false },
  { size: "3\"",      od: "3.500\"",  tpi: 8,    engagement: "0.766\"", turns: 6.1, tap_drill: "3-1/4\"",  od_mm: "88.90", star: false },
  { size: "4\"",      od: "4.500\"",  tpi: 8,    engagement: "0.844\"", turns: 6.8, tap_drill: "4-1/4\"",  od_mm: "114.30", star: false },
  { size: "6\"",      od: "6.625\"",  tpi: 8,    engagement: "0.958\"", turns: 7.7, tap_drill: "6-3/8\"",  od_mm: "168.28", star: false },
  { size: "8\"",      od: "8.625\"",  tpi: 8,    engagement: "1.063\"", turns: 8.5, tap_drill: "8-3/8\"",  od_mm: "219.08", star: false },
];

const THREAD_TYPES = [
  {
    type: "NPT",
    full: "National Pipe Tapered",
    standard: "ASME B1.20.1",
    taper: "1:16 (3/4\" per foot)",
    seal: "Thread interference + pipe dope or Teflon tape",
    seal_method: "Sealant required",
    uses: ["General plumbing and piping", "Industrial fluid systems", "Hydraulic and pneumatic connections", "Water, steam, gas, oil applications"],
    not_for: ["Pressure systems where vibration causes loosening", "Applications requiring repeated disassembly"],
    torque: "Hand tight + 2–4 turns wrench tight (varies by size). No torque spec — use engagement turns.",
    color: "#2563EB",
    star: true,
  },
  {
    type: "NPTF",
    full: "National Pipe Tapered Fuel (Dryseal)",
    standard: "ASME B1.20.3",
    taper: "1:16 (3/4\" per foot)",
    seal: "Thread-on-thread metal interference — no sealant required",
    seal_method: "No sealant needed (but not prohibited)",
    uses: ["Fluid power systems", "Hydraulic connections", "Fuel systems", "Applications where sealant contamination is unacceptable"],
    not_for: ["Cast iron or brittle materials — may crack under interference load"],
    torque: "Engage until wrench tight + 1–2 additional turns. Achieves metal-to-metal seal through interference.",
    color: "#059669",
    star: true,
  },
  {
    type: "NPS",
    full: "National Pipe Straight",
    standard: "ASME B1.20.1",
    taper: "None — parallel (straight) threads",
    seal: "O-ring or gasket sealing — threads do NOT seal",
    seal_method: "O-ring or face seal required",
    uses: ["Hose couplings", "Adapters where O-ring sealing is used", "Mechanical joints (not pressure-sealing)"],
    not_for: ["Pressure connections without sealing element", "Interchangeable with NPT — different thread form"],
    torque: "Standard thread torque applies. Seal is via O-ring or gasket, not thread.",
    color: "#D97706",
    star: false,
  },
  {
    type: "BSP / BSPP",
    full: "British Standard Pipe Parallel",
    standard: "ISO 228 / BS EN 10226",
    taper: "None — parallel (G thread)",
    seal: "O-ring or gasket — does not seal by thread alone",
    seal_method: "O-ring or bonded seal required",
    uses: ["European and Asian manufactured equipment", "Hydraulic systems in European machinery", "Common in imported equipment"],
    not_for: ["Direct connection to NPT without adapter"],
    torque: "Standard torque. Seal via external element.",
    color: "#7C3AED",
    star: false,
  },
  {
    type: "BSPT",
    full: "British Standard Pipe Tapered",
    standard: "ISO 7-1 / BS 21",
    taper: "1:16 — same as NPT but different thread form",
    seal: "Thread interference + sealant — similar to NPT",
    seal_method: "Sealant required",
    uses: ["European and Asian manufactured equipment", "Common in imported machinery"],
    not_for: ["Direct connection to NPT — incompatible thread angle (55° vs 60°)"],
    torque: "Hand tight + 2–3 turns wrench tight. Same approach as NPT.",
    color: "#DC2626",
    star: false,
  },
];

const SEALANT_GUIDE = [
  {
    sealant: "PTFE Tape (Teflon Tape)",
    best_for: "Water, air, mild chemicals, general plumbing",
    not_for: "Oxygen service (fire hazard), high-temperature steam above 450°F, strong solvents",
    apply: "Wrap clockwise (direction of thread) 2–3 layers. Start from second thread — do not cover first thread. Stretch tape as you wrap.",
    cots: "★ COTS — Widely Available",
    color: "#2563EB",
  },
  {
    sealant: "Pipe Dope / Thread Compound",
    best_for: "High pressure, steam, gas, oil — more reliable than tape for critical applications",
    not_for: "Oxygen service, some chemicals (verify compatibility)",
    apply: "Apply with brush to male threads only. Cover all threads. Do not apply to first thread. Allow to set before pressurizing (15–30 min for some types).",
    cots: "★ COTS — Widely Available",
    color: "#059669",
  },
  {
    sealant: "Loctite 567 / 565 (Anaerobic Pipe Sealant)",
    best_for: "Metal pipes, high pressure, vibration-prone systems, where repositioning is needed",
    not_for: "Plastic fittings, oxygen service",
    apply: "Apply to male threads. Assemble immediately. Allows adjustment for 5 minutes before cure begins. Full cure in 24 hours.",
    cots: "COTS — Available",
    color: "#D97706",
  },
  {
    sealant: "NPTF (No Sealant)",
    best_for: "Dryseal connections — hydraulic, fuel, high-purity systems",
    not_for: "Standard NPT fittings — NPTF requires NPTF mating fitting",
    apply: "No sealant needed. Engage until wrench-tight + 1–2 additional turns for metal-to-metal seal.",
    cots: "Fitting must be NPTF rated",
    color: "#7C3AED",
  },
];

export default function PipeThreadReference() {
  const [activeTab, setActiveTab] = useState("npt_table");
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState(null);

  const filtered = NPT_SIZES.filter(s => s.size.includes(search));

  return (
    <div style={{ fontFamily: "'DM Sans','Segoe UI',sans-serif", background: BG, minHeight: "100vh", maxWidth: 430, margin: "0 auto" }}>
      <div style={{ background: `linear-gradient(135deg, ${NAVY} 0%, #2C5282 100%)`, padding: "16px 20px 20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
          <span style={{ fontSize: 20 }}>⬡</span>
          <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 10, letterSpacing: 2, textTransform: "uppercase" }}>Fastener Companion</span>
        </div>
        <div style={{ color: WHITE, fontSize: 20, fontWeight: 800, marginBottom: 2 }}>Pipe Thread Reference</div>
        <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 11 }}>ASME B1.20.1 (NPT) · ASME B1.20.3 (NPTF) · ISO 228 (BSP) · ISO 7-1 (BSPT)</div>
        <div style={{ background: WHITE, borderRadius: 12, display: "flex", alignItems: "center", padding: "10px 14px", gap: 8, marginTop: 14, boxShadow: "0 2px 8px rgba(0,0,0,0.15)" }}>
          <span style={{ color: MUTED }}>??</span>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Filter by pipe size..."
            style={{ background: "none", border: "none", outline: "none", color: TEXT, fontSize: 14, flex: 1, fontFamily: "inherit" }} />
          {search && <span onClick={() => setSearch("")} style={{ color: MUTED, cursor: "pointer" }}>✕</span>}
        </div>
      </div>

      <div style={{ background: WHITE, borderBottom: `1px solid ${BORDER}`, padding: "0 8px", display: "flex", overflowX: "auto", scrollbarWidth: "none" }}>
        {[
          { id: "npt_table", label: "NPT Sizes" },
          { id: "thread_types", label: "Thread Types" },
          { id: "sealant", label: "Sealant Guide" },
          { id: "tips", label: "Field Tips" },
        ].map(t => (
          <button key={t.id} onClick={() => { setActiveTab(t.id); setSelectedType(null); }}
            style={{ background: "none", border: "none", cursor: "pointer", padding: "11px 10px", fontSize: 11, fontWeight: 700, fontFamily: "inherit", whiteSpace: "nowrap", color: activeTab === t.id ? NAVY : MUTED, borderBottom: activeTab === t.id ? `3px solid ${AMBER}` : "3px solid transparent" }}>
            {t.label}
          </button>
        ))}
      </div>

      {activeTab === "npt_table" && (
        <div style={{ padding: "12px 16px 24px" }}>
          <div style={{ background: STAR_BG, border: `1px solid ${STAR_BORDER}`, borderRadius: 10, padding: "10px 14px", marginBottom: 12 }}>
            <div style={{ fontSize: 11, color: "#92400E", lineHeight: 1.5 }}>
              <strong>Critical:</strong> Pipe size designation (1/2\", 3/4\", etc.) does NOT equal actual OD. 1/2\" NPT OD = 0.840\". This is historical — pipe size refers to approximate bore, not OD. Always verify actual dimensions.
            </div>
          </div>
          <div style={{ background: WHITE, borderRadius: 14, overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.06)", border: `1px solid ${BORDER}` }}>
            <div style={{ display: "grid", gridTemplateColumns: "0.7fr 0.7fr 0.4fr 0.7fr 0.5fr", background: NAVY, padding: "10px 12px" }}>
              {["Pipe", "OD", "TPI", "Tap Drill", "Turns"].map(h => (
                <div key={h} style={{ color: WHITE, fontSize: 9, fontWeight: 700 }}>{h}</div>
              ))}
            </div>
            {filtered.map((row, i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "0.7fr 0.7fr 0.4fr 0.7fr 0.5fr", padding: "8px 12px", background: row.star ? STAR_BG : i % 2 === 0 ? WHITE : ROW_ALT, borderBottom: `1px solid ${BORDER}`, alignItems: "center" }}>
                <div style={{ fontSize: 12, fontWeight: row.star ? 800 : 600, color: NAVY, display: "flex", alignItems: "center", gap: 3 }}>
                  {row.star && <span style={{ color: AMBER, fontSize: 9 }}>★</span>}{row.size}
                </div>
                <div style={{ fontSize: 11, color: TEXT }}>{row.od}</div>
                <div style={{ fontSize: 11, color: TEXT }}>{row.tpi}</div>
                <div style={{ fontSize: 11, color: TEXT }}>{row.tap_drill}</div>
                <div style={{ fontSize: 11, color: MUTED }}>{row.turns}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 8, fontSize: 10, color: MUTED, padding: "0 2px" }}>Turns = wrench-tight engagement turns (hand tight + wrench tight). Engagement depth per ASME B1.20.1.</div>
        </div>
      )}

      {activeTab === "thread_types" && (
        <div style={{ padding: "14px 16px", display: "flex", flexDirection: "column", gap: 10 }}>
          {!selectedType ? (
            THREAD_TYPES.map((type, i) => (
              <div key={i} onClick={() => setSelectedType(type)}
                style={{ background: type.star ? STAR_BG : WHITE, border: `1px solid ${BORDER}`, borderLeft: `4px solid ${type.color}`, borderRadius: 12, padding: "14px", cursor: "pointer", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }}>
                      {type.star && <span style={{ color: AMBER, fontSize: 11 }}>★</span>}
                      <span style={{ fontSize: 16, fontWeight: 800, color: type.color }}>{type.type}</span>
                      <span style={{ fontSize: 12, color: MUTED }}>— {type.full}</span>
                    </div>
                    <div style={{ fontSize: 10, color: MUTED }}>{type.standard}</div>
                  </div>
                  <span style={{ color: MUTED }}>›</span>
                </div>
                <div style={{ background: type.color + "15", border: `1px solid ${type.color}30`, borderRadius: 8, padding: "6px 10px", fontSize: 11, fontWeight: 700, color: type.color }}>
                  Seal: {type.seal_method}
                </div>
              </div>
            ))
          ) : (
            <>
              <button onClick={() => setSelectedType(null)} style={{ background: "none", border: "none", cursor: "pointer", color: NAVY, fontSize: 13, fontWeight: 700, fontFamily: "inherit", padding: 0, marginBottom: 8 }}>← Back</button>
              <div style={{ background: selectedType.color + "15", border: `1px solid ${selectedType.color}`, borderLeft: `4px solid ${selectedType.color}`, borderRadius: 12, padding: "14px", marginBottom: 10 }}>
                <div style={{ fontSize: 16, fontWeight: 800, color: selectedType.color, marginBottom: 2 }}>{selectedType.type}</div>
                <div style={{ fontSize: 13, color: NAVY, marginBottom: 4 }}>{selectedType.full}</div>
                <div style={{ fontSize: 11, color: MUTED }}>{selectedType.standard}</div>
              </div>
              {[
                { label: "Taper", value: selectedType.taper },
                { label: "Sealing Method", value: selectedType.seal },
                { label: "Assembly Torque", value: selectedType.torque },
              ].map((item, i) => (
                <div key={i} style={{ background: WHITE, border: `1px solid ${BORDER}`, borderRadius: 10, padding: "10px 14px" }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: MUTED, textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 3 }}>{item.label}</div>
                  <div style={{ fontSize: 12, color: TEXT, lineHeight: 1.5 }}>{item.value}</div>
                </div>
              ))}
              <div style={{ background: "#F0FDF4", border: "1px solid #BBF7D0", borderRadius: 12, overflow: "hidden" }}>
                <div style={{ background: "#059669", padding: "8px 14px" }}><div style={{ color: WHITE, fontSize: 11, fontWeight: 700 }}>✓ Best Used For</div></div>
                {selectedType.uses.map((u, i) => (
                  <div key={i} style={{ padding: "7px 14px", borderBottom: `1px solid #BBF7D0`, background: i % 2 === 0 ? WHITE : "#F0FDF4", display: "flex", gap: 8 }}>
                    <span style={{ color: "#059669", flexShrink: 0 }}>✓</span>
                    <div style={{ fontSize: 12, color: TEXT }}>{u}</div>
                  </div>
                ))}
              </div>
              {selectedType.not_for.length > 0 && (
                <div style={{ background: "#FFF1F2", border: "1px solid #FECDD3", borderRadius: 12, overflow: "hidden" }}>
                  <div style={{ background: "#DC2626", padding: "8px 14px" }}><div style={{ color: WHITE, fontSize: 11, fontWeight: 700 }}>✗ Not For</div></div>
                  {selectedType.not_for.map((n, i) => (
                    <div key={i} style={{ padding: "7px 14px", borderBottom: `1px solid #FECDD3`, display: "flex", gap: 8 }}>
                      <span style={{ color: "#DC2626", flexShrink: 0 }}>✗</span>
                      <div style={{ fontSize: 12, color: TEXT }}>{n}</div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      )}

      {activeTab === "sealant" && (
        <div style={{ padding: "14px 16px", display: "flex", flexDirection: "column", gap: 10 }}>
          <div style={{ background: "#FFF1F2", border: "1px solid #FECDD3", borderRadius: 10, padding: "10px 14px" }}>
            <div style={{ fontSize: 11, color: "#9F1239", lineHeight: 1.5 }}>
              <strong>Threadlocker (Loctite blue/red) is NOT a pipe sealant.</strong> Use Loctite 567 or 565 for pipe threads — these are anaerobic pipe sealants, not thread lockers. Standard threadlocker does not seal pipe threads adequately.
            </div>
          </div>
          {SEALANT_GUIDE.map((item, i) => (
            <div key={i} style={{ background: WHITE, border: `1px solid ${BORDER}`, borderLeft: `4px solid ${item.color}`, borderRadius: 12, padding: "12px 14px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
              <div style={{ fontSize: 13, fontWeight: 800, color: NAVY, marginBottom: 4 }}>{item.sealant}</div>
              <div style={{ background: item.color + "15", border: `1px solid ${item.color}30`, borderRadius: 6, padding: "2px 8px", fontSize: 10, fontWeight: 700, color: item.color, display: "inline-block", marginBottom: 8 }}>{item.cots}</div>
              <div style={{ marginBottom: 6 }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: "#059669", textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 2 }}>Best For</div>
                <div style={{ fontSize: 12, color: TEXT }}>{item.best_for}</div>
              </div>
              <div style={{ marginBottom: 6 }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: "#DC2626", textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 2 }}>Not For</div>
                <div style={{ fontSize: 12, color: TEXT }}>{item.not_for}</div>
              </div>
              <div style={{ background: ROW_ALT, borderRadius: 8, padding: "8px 10px" }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: MUTED, textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 2 }}>How to Apply</div>
                <div style={{ fontSize: 11, color: TEXT, lineHeight: 1.5 }}>{item.apply}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "tips" && (
        <div style={{ padding: "14px 16px", display: "flex", flexDirection: "column", gap: 10 }}>
          {[
            { title: "Pipe size ≠ actual diameter", color: "#DC2626", bg: "#FFF1F2", body: "1/2\" NPT pipe has 0.840\" OD — not 0.5\". Pipe size designations are historical and refer to approximate bore, not outside diameter. Never assume the pipe size equals the physical dimension. Always verify with the NPT table." },
            { title: "NPT and BSPT look the same but aren't", color: "#DC2626", bg: "#FFF1F2", body: "Both NPT and BSPT are tapered pipe threads with the same 1:16 taper. But NPT has 60° thread angle and BSPT has 55° thread angle. They will start threading together but will not seal and will damage each other. Always identify the thread type before connecting." },
            { title: "Standard thread torque doesn't apply", color: "#D97706", bg: "#FFF8E7", body: "NPT joints are assembled by engagement turns, not torque values. Hand tight + 2–4 wrench-tight turns is the standard approach. Over-tightening can crack fittings or strip tapered threads. Under-tightening causes leaks." },
            { title: "Do not cover the first thread with tape", color: "#2563EB", bg: "#EFF6FF", body: "When applying PTFE tape, start from the second thread and wrap clockwise (same direction as threading). Covering the first thread allows tape fragments to enter the fluid system, potentially fouling valves, sensors, and equipment." },
            { title: "Reuse is generally not recommended", color: "#D97706", bg: "#FFF8E7", body: "Tapered pipe threads deform slightly on first assembly. After disassembly, apply fresh sealant and re-examine the threads carefully. Multiple disassembly/reassembly cycles may require a new fitting if threads show deformation or wear." },
            { title: "PTFE tape and oxygen service", color: "#DC2626", bg: "#FFF1F2", body: "Standard PTFE tape is flammable in oxygen-enriched environments. For oxygen service, use oxygen-compatible sealants specifically rated for O2 service — never standard PTFE tape or pipe dope. Consult engineering for oxygen system connections." },
          ].map((tip, i) => (
            <div key={i} style={{ background: tip.bg, border: `1px solid ${BORDER}`, borderLeft: `4px solid ${tip.color}`, borderRadius: 12, padding: "12px 14px" }}>
              <div style={{ fontSize: 12, fontWeight: 800, color: tip.color, marginBottom: 6 }}>{tip.title}</div>
              <div style={{ fontSize: 12, color: TEXT, lineHeight: 1.6 }}>{tip.body}</div>
            </div>
          ))}
          <div style={{ background: "#FFF1F2", border: "1px solid #FECDD3", borderRadius: 10, padding: "10px 14px" }}>
            <div style={{ fontSize: 10, color: "#9F1239", lineHeight: 1.5 }}>
              <strong>⚠ Verify Before Use.</strong> NPT dimensions per ASME B1.20.1. NPTF per ASME B1.20.3. BSP per ISO 228 / ISO 7-1. Pipe thread connections for pressure systems should be verified by a qualified piping engineer. Fastener Companion is a reference tool.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
