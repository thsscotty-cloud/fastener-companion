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
// ConditionAssessment
// ════════════════════════════════════════════════════

// ─── DATA ─────────────────────────────────────────────────────────────────────
// Sources: ASME PCC-1 (fastener reuse guidance), IFI 7th Edition,
// AISC (structural bolt inspection), NASA RP-1228,
// Fastenal Engineering Reference, Portland Bolt inspection guide

const INSPECTION_CHECKLIST = [
  {
    category: "Thread Condition",
    icon: "??",
    color: "#2563EB",
    checks: [
      {
        item: "Thread damage or deformation",
        pass: "Threads are clean, uniform, and undamaged. Can be started by hand smoothly for minimum 3 full turns.",
        fail: "Any crossed, stripped, galled, or bent threads. Resistance when starting by hand.",
        action_fail: "REPLACE — damaged threads cannot develop full clamping force and create false torque readings.",
        critical: true,
      },
      {
        item: "Thread corrosion / rust",
        pass: "Light surface rust that cleans off. Threads still fully formed beneath.",
        fail: "Deep pitting in thread roots. Thread form reduced or missing. Orange/brown deposits that don't clean off.",
        action_fail: "REPLACE — pitting at thread roots is a fatigue initiation site. Do not reuse pitted fasteners.",
        critical: true,
      },
      {
        item: "Thread elongation / stretch",
        pass: "Nut runs freely by hand from end to end. No tight spots.",
        fail: "Nut binds or cannot be run by hand. Thread pitch appears stretched or non-uniform.",
        action_fail: "REPLACE — elongated threads indicate the bolt was loaded past yield. Yield = permanent deformation = reduced strength.",
        critical: true,
      },
      {
        item: "Cross-threading evidence",
        pass: "No visible diagonal scoring or deformation on thread flanks.",
        fail: "Diagonal scratches across threads. Nut won't start straight. Metal shavings present.",
        action_fail: "REPLACE fastener and inspect mating threads (nut or tapped hole) — cross-threading damages both parts.",
        critical: false,
      },
    ],
  },
  {
    category: "Shank / Body Condition",
    icon: "??",
    color: "#059669",
    checks: [
      {
        item: "Visible necking or elongation",
        pass: "Shank diameter uniform along full length. No visible reduction in diameter.",
        fail: "Visible reduction in shank diameter (necking) — especially at thread-shank junction or under head.",
        action_fail: "REPLACE IMMEDIATELY — necking indicates yield has occurred. Bolt has permanently stretched and is at risk of fracture.",
        critical: true,
      },
      {
        item: "Cracks or fractures",
        pass: "No visible cracks. Surface is continuous under magnification.",
        fail: "Any visible crack, fracture line, or break — even hairline.",
        action_fail: "REPLACE IMMEDIATELY — any crack is a fatigue initiation site. Do not reuse under any circumstances.",
        critical: true,
      },
      {
        item: "Corrosion pitting on shank",
        pass: "Light surface rust without pitting. Smooth shank surface beneath.",
        fail: "Visible pits or craters on shank surface — especially at shank-thread transition.",
        action_fail: "REPLACE — pitting creates stress concentrations that dramatically accelerate fatigue failure.",
        critical: true,
      },
      {
        item: "Bending or curvature",
        pass: "Shank is visually straight. Rolls smoothly on flat surface.",
        fail: "Any visible bend or bow. Does not roll smoothly. Wobbles when threaded into nut.",
        action_fail: "REPLACE — bent bolts create bending stress during tightening, compromising clamping force and creating failure risk.",
        critical: false,
      },
    ],
  },
  {
    category: "Head Condition",
    icon: "⬡",
    color: "#D97706",
    checks: [
      {
        item: "Head deformation",
        pass: "Head is fully formed. Flats are sharp and well-defined. Head height is consistent.",
        fail: "Rounded flats from tool slippage. Cracked head. Visible deformation of any flat.",
        action_fail: "REPLACE — rounded flats prevent accurate torquing. Cracked head indicates extreme overtorque.",
        critical: false,
      },
      {
        item: "Drive socket damage (SHCS, Torx, etc.)",
        pass: "Socket is clean, sharp-cornered, and undamaged.",
        fail: "Rounded, stripped, or damaged drive. Tool slips during trial fit.",
        action_fail: "REPLACE — damaged drive prevents torquing. Attempting to force will strip the socket completely.",
        critical: false,
      },
      {
        item: "Head-to-shank fillet condition",
        pass: "Smooth, continuous radius at head-to-shank transition.",
        fail: "Any crack or notch at the fillet radius.",
        action_fail: "REPLACE IMMEDIATELY — this is the highest-stress fatigue location on the bolt. Any crack here will propagate rapidly.",
        critical: true,
      },
      {
        item: "Bearing surface condition",
        pass: "Flat, undamaged bearing surface under head.",
        fail: "Gouged, eroded, or deformed bearing surface.",
        action_fail: "REPLACE — poor bearing surface creates inconsistent clamping and torque scatter.",
        critical: false,
      },
    ],
  },
  {
    category: "Marking & Traceability",
    icon: "??",
    color: "#7C3AED",
    checks: [
      {
        item: "Grade markings visible",
        pass: "Grade marking (radial lines, property class number, or grade designation) clearly readable.",
        fail: "Markings worn off, painted over, or illegible.",
        action_fail: "QUESTION USE — without grade markings, the fastener's strength cannot be verified. Do not use in critical applications without material certification.",
        critical: false,
      },
      {
        item: "Manufacturer identification mark",
        pass: "Manufacturer's logo or mark visible (required by ASTM/SAE standards).",
        fail: "No manufacturer mark. Grade marking without manufacturer mark.",
        action_fail: "SUSPECT — ASTM and SAE require manufacturer identification. Missing marks may indicate non-conforming (counterfeit) fasteners.",
        critical: false,
      },
      {
        item: "Coating integrity",
        pass: "Coating is intact, continuous, and covering all significant surfaces.",
        fail: "Coating damaged, peeling, absent, or showing significant rust breakthrough.",
        action_fail: "ASSESS — minor coating damage: clean and apply touch-up coating for non-critical use. Significant damage in corrosive environment: REPLACE.",
        critical: false,
      },
    ],
  },
];

const REUSE_MATRIX = [
  {
    type: "Standard hex bolt (Grade 2, 5)",
    reuse: "Generally OK",
    color: "#059669",
    conditions: "If threads clean and undamaged, no visible elongation, no pitting, grade markings intact. Inspect per checklist.",
    max_reuse: "No formal limit — inspect each time",
  },
  {
    type: "SAE Grade 8 / ISO 10.9 hex bolt",
    reuse: "OK with caution",
    color: "#D97706",
    conditions: "Stricter inspection required — high-strength grades are less forgiving of damage. Replace at any sign of yielding, pitting, or thread damage.",
    max_reuse: "Recommend replacement after high-torque fatigue service",
  },
  {
    type: "Torque-to-Yield (TTY) bolt",
    reuse: "NEVER REUSE",
    color: "#DC2626",
    conditions: "TTY bolts are intentionally tightened past yield. They cannot be accurately re-torqued. Common in automotive (head bolts, rod bolts, wheel bolts on some vehicles).",
    max_reuse: "Single use only — always replace",
  },
  {
    type: "A325 / A490 structural bolt (pretensioned)",
    reuse: "Generally not recommended",
    color: "#DC2626",
    conditions: "AISC does not permit reuse of pretensioned structural bolts. Snug-tight only A325 may be reused if undamaged.",
    max_reuse: "Pretensioned: single use. Snug-tight: inspect and reuse if undamaged.",
  },
  {
    type: "A193 B7 stud bolt (flange service)",
    reuse: "OK with inspection",
    color: "#059669",
    conditions: "Clean threads, apply fresh anti-seize, inspect for pitting and elongation. Replace if threads show wear or corrosion damage.",
    max_reuse: "Multiple reuses OK if condition acceptable",
  },
  {
    type: "Nyloc / prevailing torque nut",
    reuse: "Limited reuse",
    color: "#D97706",
    conditions: "Measure prevailing torque — if it falls below minimum specification, replace. Nylon insert degrades with each use.",
    max_reuse: "3–5 cycles maximum (check prevailing torque)",
  },
  {
    type: "ISO 12.9 / A574 SHCS",
    reuse: "Use caution",
    color: "#D97706",
    conditions: "Highest hardness, most HE-susceptible. Inspect socket drive carefully — damaged socket = replace. No pitting or corrosion acceptable.",
    max_reuse: "Replace if any doubt — high-strength grade, unforgiving",
  },
  {
    type: "Any fastener from a failed joint",
    reuse: "DO NOT REUSE",
    color: "#DC2626",
    conditions: "If the joint failed (loosened, fractured, or showed signs of movement), all fasteners in that joint are suspect. Unknown load history. Unknown fatigue damage.",
    max_reuse: "Replace entire joint set after any failure",
  },
];

const TOOLS_NEEDED = [
  { tool: "Caliper / Micrometer", use: "Measure shank diameter at multiple points — compare to nominal to detect elongation" },
  { tool: "Thread gauge (go/no-go)", use: "Verify thread pitch and diameter. Failed go-gauge = damaged threads. Failed no-go = oversized." },
  { tool: "3× magnifying glass", use: "Inspect thread roots, head fillet, and shank for cracks and pitting. Sufficient for most field inspection." },
  { tool: "Penetrant dye (NDT)", use: "Apply dye penetrant to detect surface cracks not visible to naked eye. Used for critical aerospace/pressure vessel fasteners." },
  { tool: "Torque wrench", use: "Verify prevailing torque on prevailing torque nuts before reuse" },
  { tool: "Wire brush", use: "Clean threads and surfaces before inspection — do not clean after final inspection decision" },
];

export default function ConditionAssessment() {
  const [activeTab, setActiveTab] = useState("checklist");
  const [expanded, setExpanded] = useState(null);
  const [checkStates, setCheckStates] = useState({});

  const toggle = (key) => setExpanded(expanded === key ? null : key);
  const setCheck = (key, val) => setCheckStates(prev => ({ ...prev, [key]: val }));

  const allChecks = INSPECTION_CHECKLIST.flatMap(cat => cat.checks.map((c, i) => ({ ...c, key: `${cat.category}-${i}` })));
  const checkedCount = Object.keys(checkStates).length;
  const failCount = Object.values(checkStates).filter(v => v === "fail").length;
  const passCount = Object.values(checkStates).filter(v => v === "pass").length;

  return (
    <div style={{ fontFamily: "'DM Sans','Segoe UI',sans-serif", background: BG, minHeight: "100vh", maxWidth: 430, margin: "0 auto" }}>
      <div style={{ background: `linear-gradient(135deg, ${NAVY} 0%, #2C5282 100%)`, padding: "16px 20px 20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
          <span style={{ fontSize: 20 }}>⬡</span>
          <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 10, letterSpacing: 2, textTransform: "uppercase" }}>Fastener Companion</span>
        </div>
        <div style={{ color: WHITE, fontSize: 20, fontWeight: 800, marginBottom: 2 }}>Fastener Condition Assessment</div>
        <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 11 }}>ASME PCC-1 · AISC · IFI 7th Ed. · NASA RP-1228 · Fastenal Engineering</div>
      </div>

      <div style={{ background: WHITE, borderBottom: `1px solid ${BORDER}`, padding: "0 8px", display: "flex", overflowX: "auto", scrollbarWidth: "none" }}>
        {[
          { id: "checklist", label: "Inspection Checklist" },
          { id: "reuse", label: "Reuse Guide" },
          { id: "tools", label: "Tools Needed" },
        ].map(t => (
          <button key={t.id} onClick={() => setActiveTab(t.id)}
            style={{ background: "none", border: "none", cursor: "pointer", padding: "11px 12px", fontSize: 11, fontWeight: 700, fontFamily: "inherit", whiteSpace: "nowrap", color: activeTab === t.id ? NAVY : MUTED, borderBottom: activeTab === t.id ? `3px solid ${AMBER}` : "3px solid transparent" }}>
            {t.label}
          </button>
        ))}
      </div>

      {activeTab === "checklist" && (
        <div style={{ padding: "14px 16px" }}>
          {checkedCount > 0 && (
            <div style={{ background: failCount > 0 ? "#FFF1F2" : "#F0FDF4", border: `1px solid ${failCount > 0 ? "#FECDD3" : "#BBF7D0"}`, borderRadius: 10, padding: "10px 14px", marginBottom: 12, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 800, color: failCount > 0 ? "#DC2626" : "#059669" }}>
                  {failCount > 0 ? `${failCount} FAIL — Replace Fastener` : `${passCount} checks passed`}
                </div>
                <div style={{ fontSize: 11, color: MUTED }}>{checkedCount} of {allChecks.length} checks completed</div>
              </div>
              <button onClick={() => setCheckStates({})} style={{ background: "none", border: `1px solid ${BORDER}`, borderRadius: 8, padding: "4px 10px", fontSize: 11, color: MUTED, cursor: "pointer", fontFamily: "inherit" }}>Reset</button>
            </div>
          )}

          {INSPECTION_CHECKLIST.map((cat) => (
            <div key={cat.category} style={{ marginBottom: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                <span style={{ fontSize: 18 }}>{cat.icon}</span>
                <div style={{ fontSize: 14, fontWeight: 800, color: cat.color }}>{cat.category}</div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {cat.checks.map((check, i) => {
                  const key = `${cat.category}-${i}`;
                  const state = checkStates[key];
                  return (
                    <div key={i}>
                      <div onClick={() => toggle(key)}
                        style={{ background: state === "fail" ? "#FFF1F2" : state === "pass" ? "#F0FDF4" : WHITE, border: `1px solid ${state === "fail" ? "#FECDD3" : state === "pass" ? "#BBF7D0" : BORDER}`, borderLeft: `3px solid ${state === "fail" ? "#DC2626" : state === "pass" ? "#059669" : cat.color}`, borderRadius: expanded === key ? "10px 10px 0 0" : 10, padding: "10px 14px", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div>
                          {check.critical && <div style={{ fontSize: 9, fontWeight: 800, color: "#DC2626", marginBottom: 3 }}>CRITICAL</div>}
                          <div style={{ fontSize: 13, fontWeight: 700, color: NAVY }}>{check.item}</div>
                        </div>
                        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                          {state === "pass" && <span style={{ color: "#059669", fontWeight: 800 }}>✓</span>}
                          {state === "fail" && <span style={{ color: "#DC2626", fontWeight: 800 }}>✗</span>}
                          <span style={{ color: MUTED, fontSize: 12 }}>{expanded === key ? "▲" : "▼"}</span>
                        </div>
                      </div>
                      {expanded === key && (
                        <div style={{ background: "#F8FAFC", border: `1px solid ${BORDER}`, borderTop: "none", borderRadius: "0 0 10px 10px", padding: "12px 14px" }}>
                          <div style={{ marginBottom: 8 }}>
                            <div style={{ fontSize: 10, fontWeight: 700, color: "#059669", textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 3 }}>PASS condition</div>
                            <div style={{ fontSize: 12, color: TEXT, lineHeight: 1.5 }}>{check.pass}</div>
                          </div>
                          <div style={{ marginBottom: 10 }}>
                            <div style={{ fontSize: 10, fontWeight: 700, color: "#DC2626", textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 3 }}>FAIL condition</div>
                            <div style={{ fontSize: 12, color: TEXT, lineHeight: 1.5 }}>{check.fail}</div>
                          </div>
                          {checkStates[key] === "fail" && (
                            <div style={{ background: "#FFF1F2", border: "1px solid #FECDD3", borderRadius: 8, padding: "8px 10px", marginBottom: 10 }}>
                              <div style={{ fontSize: 10, fontWeight: 700, color: "#DC2626", marginBottom: 3 }}>ACTION REQUIRED</div>
                              <div style={{ fontSize: 12, color: "#9F1239", lineHeight: 1.5 }}>{check.action_fail}</div>
                            </div>
                          )}
                          <div style={{ display: "flex", gap: 8 }}>
                            <button onClick={() => setCheck(key, "pass")}
                              style={{ flex: 1, background: state === "pass" ? "#059669" : WHITE, color: state === "pass" ? WHITE : "#059669", border: `2px solid #059669`, borderRadius: 8, padding: "8px", fontSize: 12, fontWeight: 800, cursor: "pointer", fontFamily: "inherit" }}>
                              ✓ PASS
                            </button>
                            <button onClick={() => setCheck(key, "fail")}
                              style={{ flex: 1, background: state === "fail" ? "#DC2626" : WHITE, color: state === "fail" ? WHITE : "#DC2626", border: `2px solid #DC2626`, borderRadius: 8, padding: "8px", fontSize: 12, fontWeight: 800, cursor: "pointer", fontFamily: "inherit" }}>
                              ✗ FAIL
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "reuse" && (
        <div style={{ padding: "14px 16px" }}>
          <div style={{ background: "#FFF1F2", border: "1px solid #FECDD3", borderRadius: 10, padding: "10px 14px", marginBottom: 12 }}>
            <div style={{ fontSize: 11, color: "#9F1239", lineHeight: 1.5 }}>
              <strong>When in doubt, replace.</strong> Fastener cost is trivial compared to downtime, repair, or injury from a joint failure. The cost of a new bolt is always less than the cost of a failure.
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {REUSE_MATRIX.map((item, i) => (
              <div key={i} style={{ background: WHITE, border: `1px solid ${BORDER}`, borderLeft: `4px solid ${item.color}`, borderRadius: 12, padding: "12px 14px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
                  <div style={{ fontSize: 13, fontWeight: 800, color: NAVY, flex: 1 }}>{item.type}</div>
                  <div style={{ background: item.color + "20", border: `1px solid ${item.color}`, borderRadius: 6, padding: "2px 8px", fontSize: 10, fontWeight: 800, color: item.color, flexShrink: 0, marginLeft: 8 }}>{item.reuse}</div>
                </div>
                <div style={{ fontSize: 12, color: TEXT, lineHeight: 1.5, marginBottom: 6 }}>{item.conditions}</div>
                <div style={{ background: ROW_ALT, borderRadius: 8, padding: "5px 10px", fontSize: 11, color: MUTED }}>Max reuse: {item.max_reuse}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "tools" && (
        <div style={{ padding: "14px 16px" }}>
          <div style={{ background: STAR_BG, border: `1px solid ${STAR_BORDER}`, borderRadius: 10, padding: "10px 14px", marginBottom: 12 }}>
            <div style={{ fontSize: 11, color: "#92400E" }}>Visual inspection with a 3× magnifying glass is sufficient for most field inspections. Specialized NDT equipment is reserved for critical aerospace and pressure vessel applications.</div>
          </div>
          <div style={{ background: WHITE, borderRadius: 14, overflow: "hidden", border: `1px solid ${BORDER}` }}>
            <div style={{ background: NAVY, padding: "10px 14px" }}><div style={{ color: WHITE, fontSize: 12, fontWeight: 700 }}>Inspection Tools</div></div>
            {TOOLS_NEEDED.map((item, i) => (
              <div key={i} style={{ padding: "12px 14px", borderBottom: `1px solid ${BORDER}`, background: i % 2 === 0 ? WHITE : ROW_ALT }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: NAVY, marginBottom: 4 }}>{item.tool}</div>
                <div style={{ fontSize: 12, color: TEXT, lineHeight: 1.5 }}>{item.use}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 12, background: "#FFF1F2", border: "1px solid #FECDD3", borderRadius: 10, padding: "10px 14px" }}>
            <div style={{ fontSize: 10, color: "#9F1239", lineHeight: 1.5 }}>
              <strong>⚠ Verify Before Use.</strong> Inspection criteria based on ASME PCC-1, AISC, IFI 7th Edition, and NASA RP-1228. Visual inspection is a preliminary tool — critical fasteners in pressure vessels, aircraft, and structural connections require NDT by qualified personnel. Fastener Companion is a reference tool.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
