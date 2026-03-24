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
// VibrationGuide
// ════════════════════════════════════════════════════

// ─── DATA ─────────────────────────────────────────────────────────────────────
// Sources: IFI Fastener Standards 7th Ed., NASA Fastener Design Manual (RP-1228),
// Junker vibration test (DIN 65151), Shigley's Mechanical Engineering Design,
// Bickford "Introduction to the Design and Behavior of Bolted Joints",
// Nord-Lock Group technical resources, ASME PCC-1

const LOCKING_METHODS = [
  {
    id: "preload",
    name: "High Preload (Correct Torque)",
    category: "Fundamental",
    effectiveness: 5,
    effectiveness_label: "Most Effective",
    effectiveness_color: "#059669",
    cost: 1,
    cost_label: "No Cost",
    disassembly: "Full — no restriction",
    junker_rating: "Excellent",
    how_it_works: "The most effective vibration resistance is correct bolt preload. High preload creates friction that resists transverse movement. Under-torquing is the leading cause of vibration loosening — not the absence of a locking device.",
    best_for: ["All vibration applications as the first line of defense", "Any properly torqued joint experiences dramatically improved vibration resistance", "Critical where disassembly is needed"],
    limitations: ["Requires calibrated torque wrench", "Preload relaxes over time (embedment) — may need re-torquing", "Alone may not be sufficient for very high vibration (>0.5G)"],
    star: true,
    combine_with: "Add mechanical locking for severe vibration environments",
  },
  {
    id: "prevailing_torque",
    name: "Prevailing Torque Nuts (Nyloc)",
    category: "Mechanical — Nut",
    effectiveness: 3,
    effectiveness_label: "Good",
    effectiveness_color: "#2563EB",
    cost: 1,
    cost_label: "Low Cost",
    disassembly: "Removable — limited reuse",
    junker_rating: "Good",
    how_it_works: "Nylon insert or distorted thread deforms over bolt threads, creating friction resistance to loosening. The nylon maintains prevailing torque throughout service without operator skill.",
    best_for: ["General vibration resistance in light to moderate environments", "Automated assembly (consistent locking action)", "Applications where torque wrench is not available for final check"],
    limitations: ["Temperature limit ~250°F (121°C) — nylon degrades above this", "Limited reuse — replace when prevailing torque drops", "Not for oxygen-enriched environments (nylon flammability)"],
    star: true,
    combine_with: "Correct preload is still required — nyloc is not a substitute for proper torquing",
  },
  {
    id: "nordlock",
    name: "Nord-Lock Wedge Washer",
    category: "Mechanical — Washer",
    effectiveness: 5,
    effectiveness_label: "Excellent",
    effectiveness_color: "#059669",
    cost: 3,
    cost_label: "Moderate Cost",
    disassembly: "Full — not consumed",
    junker_rating: "Superior (Junker test certified)",
    how_it_works: "Two washers with cammed faces and radial teeth. When bolt attempts to rotate loose, cam action creates wedge that increases bolt tension — actively resisting loosening. The only washer system that passes Junker vibration test.",
    best_for: ["High vibration (rotating equipment, engines, rail, mining)", "Critical joints where failure is unacceptable", "Where joint must remain serviceable (remove/reinstall)", "Harsh environments where threadlocker is impractical"],
    limitations: ["Higher cost than split lock washers or nyloc", "Requires more controlled assembly — must be torqued properly", "Washer pair is directional — must be installed correctly"],
    star: true,
    combine_with: "Used as primary locking in high-vibration. Also combine with correct preload.",
  },
  {
    id: "threadlocker",
    name: "Anaerobic Threadlocker (Loctite)",
    category: "Chemical",
    effectiveness: 4,
    effectiveness_label: "Very Good",
    effectiveness_color: "#059669",
    cost: 1,
    cost_label: "Low Cost",
    disassembly: "Blue = removable / Red = heat required",
    junker_rating: "Very Good",
    how_it_works: "Anaerobic adhesive fills thread voids and cures to resist vibration loosening. Blue grade is removable with standard tools. Red grade is permanent (heat required for removal). Also seals against corrosion and leakage.",
    best_for: ["Small fasteners where lock nuts are impractical", "Already-assembled fasteners (green wicking grade)", "Where sealing against fluids is also needed", "Electronics and instrumentation", "Set screws"],
    limitations: ["Cure time — full strength in 24 hours (handling cure ~10 min)", "Not for temperatures above 300°F (150°C) — standard grades", "Stainless steel and zinc require activator (7649) for proper cure", "Difficult to control application quantity in production"],
    star: true,
    combine_with: "Use blue for serviceable joints, red for permanent. Do not use with prevailing torque nuts.",
  },
  {
    id: "split_lock",
    name: "Split / Helical Spring Washer",
    category: "Mechanical — Washer",
    effectiveness: 1,
    effectiveness_label: "Poor (Overrated)",
    effectiveness_color: "#DC2626",
    cost: 1,
    cost_label: "Very Low",
    disassembly: "Full",
    junker_rating: "Fails Junker test — considered ineffective",
    how_it_works: "Spring washer maintains tension against nut. In theory, spring action prevents loosening. In practice, at standard torque levels, the washer flattens completely during tightening and provides no spring action in service.",
    best_for: ["Light-duty non-critical applications", "Low-vibration environments where any locking is better than none", "Legacy assemblies where it has been used historically"],
    limitations: ["Fails Junker vibration test — considered ineffective by most fastening engineers", "Provides false sense of security in critical applications", "Concentrates load on two points, potentially damaging soft surfaces", "NASA and aerospace standards prohibit for most applications"],
    star: false,
    combine_with: "Do not rely on split lock washers for vibration-critical applications — upgrade to Nordlock, nyloc, or threadlocker",
  },
  {
    id: "safety_wire",
    name: "Safety Wire (Lock Wire)",
    category: "Mechanical — Wire",
    effectiveness: 5,
    effectiveness_label: "Excellent",
    effectiveness_color: "#059669",
    cost: 2,
    cost_label: "Low Material / High Labor",
    disassembly: "Wire destroyed on removal — replace each disassembly",
    junker_rating: "Excellent",
    how_it_works: "Stainless wire threaded through drilled heads, twisted to tension, anchored. Any rotation of bolt is physically resisted by wire. Visual inspection confirms security. Standard for critical aerospace and racing applications.",
    best_for: ["Aerospace and aviation", "Racing engines and high-performance", "Critical fasteners requiring visual security confirmation", "High-temperature applications where other methods fail"],
    limitations: ["Requires drilled heads — not available on standard fasteners", "Labor intensive — skilled technician required for correct installation", "Wire fails on removal — single use", "Not practical for high-volume production"],
    star: false,
    combine_with: "Standard method for aircraft and aerospace. Often specified with drilled hex bolts.",
  },
  {
    id: "cotter_pin",
    name: "Cotter Pin / Castellated Nut",
    category: "Mechanical — Pin",
    effectiveness: 5,
    effectiveness_label: "Excellent (Positive Lock)",
    effectiveness_color: "#059669",
    cost: 2,
    cost_label: "Low Cost",
    disassembly: "Cotter pin destroyed on removal",
    junker_rating: "Excellent — positive mechanical lock",
    how_it_works: "Castellated (slotted) nut aligns with cross-drilled bolt. Cotter pin passes through both, physically preventing rotation. A true positive mechanical lock — the fastener cannot loosen without the pin failing.",
    best_for: ["Suspension, steering, and chassis connections", "Trailer hitch pins", "Any application where absolute loosening prevention is required", "High-vibration vehicular applications"],
    limitations: ["Requires castellated nut and drilled bolt — not standard stock", "Assembly time — must align slot to hole during tightening", "Cotter pin is single-use", "Cannot achieve optimal preload — must stop at slot alignment"],
    star: false,
    combine_with: "Used in steering/suspension where positive lock is required. Standard for ball joints, tie rods, etc.",
  },
  {
    id: "deformed_thread",
    name: "All-Metal Prevailing Torque Nuts",
    category: "Mechanical — Nut",
    effectiveness: 3,
    effectiveness_label: "Good",
    effectiveness_color: "#2563EB",
    cost: 2,
    cost_label: "Moderate",
    disassembly: "Removable — limited reuse",
    junker_rating: "Good",
    how_it_works: "Distorted or oval-shaped thread section creates mechanical interference with bolt threads. No non-metallic components — works at high temperature where nyloc fails.",
    best_for: ["High temperature environments (above nyloc limit)", "Clean room (no nylon or adhesive)", "Aerospace applications requiring all-metal"],
    limitations: ["Higher cost than nyloc", "Limited reuse — distortion decreases with each assembly", "Higher prevailing torque than nyloc — verify bolt is not overtorqued"],
    star: false,
    combine_with: "Good for high-temp or clean environments where nyloc is not suitable.",
  },
];

const VIBRATION_LEVELS = [
  {
    level: "Low Vibration",
    desc: "HVAC, electrical panels, light equipment",
    g_level: "< 0.1G",
    recommended: ["High Preload (Correct Torque)", "Prevailing Torque Nuts (Nyloc)"],
    note: "Correct torque alone is usually sufficient. Add nyloc as low-cost insurance.",
    color: "#059669",
  },
  {
    level: "Moderate Vibration",
    desc: "Pumps, compressors, general machinery",
    g_level: "0.1–0.5G",
    recommended: ["High Preload (Correct Torque)", "Anaerobic Threadlocker (Loctite)", "Prevailing Torque Nuts (Nyloc)"],
    note: "Threadlocker or nyloc required. Correct torque is still the primary defense.",
    color: "#D97706",
  },
  {
    level: "High Vibration",
    desc: "Engines, rail, mining, heavy equipment",
    g_level: "0.5–2G",
    recommended: ["High Preload (Correct Torque)", "Nord-Lock Wedge Washer", "Anaerobic Threadlocker (Loctite) — red grade"],
    note: "Mechanical locking required. Nordlock or red threadlocker. Consider re-torque schedule.",
    color: "#DC2626",
  },
  {
    level: "Extreme Vibration",
    desc: "Aircraft, high-performance engines, explosive environments",
    g_level: "> 2G",
    recommended: ["Safety Wire (Lock Wire)", "Cotter Pin / Castellated Nut", "Nord-Lock Wedge Washer"],
    note: "Positive mechanical lock required. Safety wire or cotter pin. Engineering review mandatory.",
    color: "#7C3AED",
  },
];

export default function VibrationGuide() {
  const [activeTab, setActiveTab] = useState("by_level");
  const [selected, setSelected] = useState(null);

  const selectedMethod = selected ? LOCKING_METHODS.find(m => m.id === selected) : null;

  const EffBar = ({ value, max = 5 }) => (
    <div style={{ display: "flex", gap: 3 }}>
      {Array.from({ length: max }).map((_, i) => (
        <div key={i} style={{ width: 18, height: 8, borderRadius: 3, background: i < value ? (value >= 4 ? "#059669" : value >= 3 ? "#D97706" : "#DC2626") : "#E2E8F0" }} />
      ))}
    </div>
  );

  return (
    <div style={{ fontFamily: "'DM Sans','Segoe UI',sans-serif", background: BG, minHeight: "100vh", maxWidth: 430, margin: "0 auto" }}>
      <div style={{ background: `linear-gradient(135deg, ${NAVY} 0%, #2C5282 100%)`, padding: "16px 20px 20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
          <span style={{ fontSize: 20 }}>⬡</span>
          <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 10, letterSpacing: 2, textTransform: "uppercase" }}>Fastener Companion</span>
        </div>
        <div style={{ color: WHITE, fontSize: 20, fontWeight: 800, marginBottom: 2 }}>Vibration-Resistant Fastening</div>
        <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 11 }}>IFI 7th Ed. · NASA RP-1228 · DIN 65151 (Junker) · Nord-Lock · Shigley's MED</div>
      </div>

      <div style={{ background: WHITE, borderBottom: `1px solid ${BORDER}`, padding: "0 8px", display: "flex" }}>
        {[
          { id: "by_level", label: "By Vibration Level" },
          { id: "methods", label: "All Methods" },
        ].map(t => (
          <button key={t.id} onClick={() => { setActiveTab(t.id); setSelected(null); }}
            style={{ background: "none", border: "none", cursor: "pointer", padding: "12px 14px", fontSize: 12, fontWeight: 700, fontFamily: "inherit", color: activeTab === t.id ? NAVY : MUTED, borderBottom: activeTab === t.id ? `3px solid ${AMBER}` : "3px solid transparent" }}>
            {t.label}
          </button>
        ))}
      </div>

      {activeTab === "by_level" && (
        <div style={{ padding: "14px 16px" }}>
          <div style={{ background: STAR_BG, border: `1px solid ${STAR_BORDER}`, borderRadius: 10, padding: "10px 14px", marginBottom: 14 }}>
            <div style={{ fontSize: 12, fontWeight: 800, color: "#92400E", marginBottom: 4 }}>Most Important: Under-torquing is the #1 cause</div>
            <div style={{ fontSize: 11, color: TEXT, lineHeight: 1.5 }}>The most effective vibration resistance is correct preload — a properly torqued bolt resists loosening dramatically better than a loose bolt with a locking device. Always start with correct torque before adding locking elements.</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {VIBRATION_LEVELS.map((level, i) => (
              <div key={i} style={{ background: WHITE, border: `1px solid ${BORDER}`, borderLeft: `4px solid ${level.color}`, borderRadius: 12, padding: "14px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 800, color: level.color }}>{level.level}</div>
                    <div style={{ fontSize: 11, color: MUTED, marginTop: 1 }}>{level.desc}</div>
                  </div>
                  <div style={{ background: level.color + "20", border: `1px solid ${level.color}`, borderRadius: 6, padding: "2px 8px", fontSize: 10, fontWeight: 800, color: level.color, flexShrink: 0, marginLeft: 8 }}>{level.g_level}</div>
                </div>
                <div style={{ marginBottom: 8 }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: MUTED, textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 4 }}>Recommended</div>
                  {level.recommended.map((r, j) => (
                    <div key={j} style={{ display: "flex", gap: 6, marginBottom: 3, alignItems: "center" }}>
                      <span style={{ color: "#059669", fontSize: 12 }}>✓</span>
                      <div style={{ fontSize: 12, color: TEXT, fontWeight: 600 }}>{r}</div>
                    </div>
                  ))}
                </div>
                <div style={{ background: ROW_ALT, borderRadius: 8, padding: "6px 10px", fontSize: 11, color: TEXT }}>{level.note}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "methods" && !selectedMethod && (
        <div style={{ padding: "14px 16px", display: "flex", flexDirection: "column", gap: 10 }}>
          {LOCKING_METHODS.map((method) => (
            <div key={method.id} onClick={() => setSelected(method.id)}
              style={{ background: method.star ? STAR_BG : WHITE, border: `1px solid ${BORDER}`, borderLeft: `4px solid ${method.effectiveness_color}`, borderRadius: 12, padding: "14px", cursor: "pointer", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }}>
                    {method.star && <span style={{ color: AMBER, fontSize: 11 }}>★</span>}
                    <span style={{ fontSize: 13, fontWeight: 800, color: NAVY }}>{method.name}</span>
                  </div>
                  <div style={{ fontSize: 10, color: MUTED }}>{method.category}</div>
                </div>
                <span style={{ color: MUTED }}>›</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <div>
                  <div style={{ fontSize: 9, color: MUTED, marginBottom: 3 }}>EFFECTIVENESS</div>
                  <EffBar value={method.effectiveness} />
                </div>
                <div style={{ background: method.effectiveness_color + "15", border: `1px solid ${method.effectiveness_color}`, borderRadius: 6, padding: "2px 8px", fontSize: 10, fontWeight: 700, color: method.effectiveness_color }}>
                  {method.effectiveness_label}
                </div>
              </div>
              <div style={{ fontSize: 11, color: TEXT, lineHeight: 1.5 }}>{method.how_it_works.slice(0, 120)}...</div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "methods" && selectedMethod && (
        <div style={{ padding: "14px 16px" }}>
          <button onClick={() => setSelected(null)} style={{ background: "none", border: "none", cursor: "pointer", color: NAVY, fontSize: 13, fontWeight: 700, fontFamily: "inherit", marginBottom: 14, padding: 0 }}>← Back</button>

          <div style={{ background: WHITE, border: `1px solid ${BORDER}`, borderLeft: `4px solid ${selectedMethod.effectiveness_color}`, borderRadius: 12, padding: "14px", marginBottom: 12 }}>
            <div style={{ fontSize: 16, fontWeight: 800, color: NAVY, marginBottom: 2 }}>{selectedMethod.name}</div>
            <div style={{ fontSize: 11, color: MUTED, marginBottom: 10 }}>{selectedMethod.category}</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 10 }}>
              <div style={{ background: ROW_ALT, borderRadius: 8, padding: "8px" }}>
                <div style={{ fontSize: 9, color: MUTED, textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 4 }}>Effectiveness</div>
                <EffBar value={selectedMethod.effectiveness} />
                <div style={{ fontSize: 10, fontWeight: 700, color: selectedMethod.effectiveness_color, marginTop: 3 }}>{selectedMethod.effectiveness_label}</div>
              </div>
              <div style={{ background: ROW_ALT, borderRadius: 8, padding: "8px" }}>
                <div style={{ fontSize: 9, color: MUTED, textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 3 }}>Junker Test</div>
                <div style={{ fontSize: 11, fontWeight: 700, color: TEXT }}>{selectedMethod.junker_rating}</div>
              </div>
            </div>
            <div style={{ fontSize: 12, color: TEXT, lineHeight: 1.6 }}>{selectedMethod.how_it_works}</div>
          </div>

          {[
            { label: "Disassembly", value: selectedMethod.disassembly },
            { label: "Combine With", value: selectedMethod.combine_with },
          ].map((item, i) => (
            <div key={i} style={{ background: WHITE, border: `1px solid ${BORDER}`, borderRadius: 10, padding: "10px 14px", marginBottom: 8 }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: MUTED, textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 3 }}>{item.label}</div>
              <div style={{ fontSize: 12, color: TEXT, lineHeight: 1.5 }}>{item.value}</div>
            </div>
          ))}

          <div style={{ background: "#F0FDF4", border: "1px solid #BBF7D0", borderRadius: 12, overflow: "hidden", marginBottom: 10 }}>
            <div style={{ background: "#059669", padding: "8px 14px" }}><div style={{ color: WHITE, fontSize: 11, fontWeight: 700 }}>✓ Best For</div></div>
            {selectedMethod.best_for.map((item, i) => (
              <div key={i} style={{ padding: "7px 14px", borderBottom: `1px solid #BBF7D0`, background: i % 2 === 0 ? WHITE : "#F0FDF4", display: "flex", gap: 8 }}>
                <span style={{ color: "#059669", flexShrink: 0 }}>✓</span>
                <div style={{ fontSize: 12, color: TEXT }}>{item}</div>
              </div>
            ))}
          </div>

          <div style={{ background: "#FFF8E7", border: `1px solid ${STAR_BORDER}`, borderRadius: 12, overflow: "hidden", marginBottom: 14 }}>
            <div style={{ background: "#D97706", padding: "8px 14px" }}><div style={{ color: WHITE, fontSize: 11, fontWeight: 700 }}>⚠ Limitations</div></div>
            {selectedMethod.limitations.map((item, i) => (
              <div key={i} style={{ padding: "7px 14px", borderBottom: `1px solid ${STAR_BORDER}`, background: i % 2 === 0 ? WHITE : STAR_BG, display: "flex", gap: 8 }}>
                <span style={{ color: "#D97706", flexShrink: 0 }}>⚠</span>
                <div style={{ fontSize: 12, color: TEXT }}>{item}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={{ margin: "0 16px 24px", background: "#FFF1F2", border: "1px solid #FECDD3", borderRadius: 10, padding: "10px 14px" }}>
        <div style={{ fontSize: 10, color: "#9F1239", lineHeight: 1.5 }}>
          <strong>⚠ Verify Before Use.</strong> Effectiveness ratings based on DIN 65151 Junker vibration test data, IFI 7th Edition, and NASA RP-1228. Junker test results for Nord-Lock per manufacturer published data. For safety-critical vibration applications, consult a mechanical engineer. Fastener Companion is a reference tool.
        </div>
      </div>
    </div>
  );
}
