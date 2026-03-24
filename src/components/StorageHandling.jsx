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
// StorageHandling
// ════════════════════════════════════════════════════

// ─── DATA ─────────────────────────────────────────────────────────────────────
// Sources: ASTM F3125 (storage for structural bolts),
// IFI Fastener Standards 7th Edition,
// Fastenal Engineering Reference, Portland Bolt storage guide,
// AISC (structural bolt storage and handling)

const STORAGE_RULES = [
  {
    category: "General Storage",
    icon: "??",
    color: "#2563EB",
    rules: [
      {
        title: "Keep dry — always",
        detail: "Moisture is the primary enemy of carbon steel fasteners. Even zinc-plated bolts corrode over time in humid conditions. Store in a dry, covered environment. If bulk bags are opened, transfer to dry sealed containers.",
        critical: true,
      },
      {
        title: "Store off the ground",
        detail: "Never store fasteners directly on concrete floors — concrete wicks moisture. Use pallets, shelving, or bins. Minimum 4\" off the floor.",
        critical: false,
      },
      {
        title: "Keep in original packaging until use",
        detail: "Original packaging is designed for the specific fastener. Cardboard boxes, plastic bags, and manufacturer containers protect against moisture, contamination, and damage. Don't break out more than you need.",
        critical: false,
      },
      {
        title: "Segregate by grade and size",
        detail: "Mixed bins create dangerous situations — a Grade 2 bolt installed where a Grade 8 is required is a safety failure waiting to happen. Strict bin segregation is non-negotiable for industrial fastener storage.",
        critical: true,
      },
      {
        title: "FIFO — First In, First Out",
        detail: "Rotate stock so older inventory is used first. Fasteners don't expire, but prolonged storage increases corrosion risk — especially in humid environments.",
        critical: false,
      },
    ],
  },
  {
    category: "Structural Bolts (A325/A490)",
    icon: "??️",
    color: "#DC2626",
    rules: [
      {
        title: "Store in original shipping containers until used",
        detail: "AISC requires A325 and A490 bolts to remain in their original manufacturer containers until immediately before use. Mixing with field-found or unlabeled fasteners is prohibited.",
        critical: true,
      },
      {
        title: "Protect from dirt and contamination",
        detail: "Dirt, sand, and grit on threads changes the friction coefficient — directly affecting the relationship between torque applied and preload achieved. Contaminated structural bolts must be cleaned or discarded.",
        critical: true,
      },
      {
        title: "Lubrication — manufacturer's coating is calibrated",
        detail: "Structural bolts come with a specific lubricant or coating from the manufacturer. Adding oil, grease, or other lubricants changes the K-factor and invalidates the torque specification. Do not add lubricant unless specifically required by the engineer.",
        critical: true,
      },
      {
        title: "Discard if dropped in dirt",
        detail: "A325/A490 bolts dropped in dirt and not cleaned should be discarded rather than risk contamination affecting the torque-tension relationship.",
        critical: false,
      },
      {
        title: "Shelf life — 1 year from manufacturer",
        detail: "AISC recommends using A325/A490 bolts within 1 year of the manufacturer's shipping date. After 1 year, the lubricant may have degraded, affecting installation torque values.",
        critical: false,
      },
    ],
  },
  {
    category: "High-Strength Fasteners (Grade 8, 10.9, 12.9)",
    icon: "⚡",
    color: "#D97706",
    rules: [
      {
        title: "Watch for hydrogen embrittlement risk on plated stock",
        detail: "If high-strength plated fasteners have been stored for extended periods (>12 months) after plating without baking, they should be inspected or tested before installation in critical applications. HE failure can occur in storage before any load is applied.",
        critical: true,
      },
      {
        title: "Store away from corrosive chemicals",
        detail: "High-strength alloy steels are more susceptible to stress corrosion cracking (SCC) than low-carbon steels. Keep away from solvents, acids, cleaning chemicals, and battery acid.",
        critical: true,
      },
      {
        title: "Inspect coating before use",
        detail: "Check that coating is intact and continuous. Damaged coating on Grade 8 bolts in corrosive environments can initiate stress corrosion cracking.",
        critical: false,
      },
    ],
  },
  {
    category: "Stainless Steel Fasteners",
    icon: "??",
    color: "#059669",
    rules: [
      {
        title: "Keep away from carbon steel",
        detail: "Direct contact or proximity to carbon steel can embed carbon steel particles ('iron contamination') into stainless surface, causing rust spots and compromising corrosion resistance. Store in separate bins, ideally non-metallic containers.",
        critical: true,
      },
      {
        title: "Anti-seize at point of use — not in storage",
        detail: "Do not pre-apply anti-seize in storage — it attracts contamination and becomes less effective. Apply immediately before assembly.",
        critical: false,
      },
      {
        title: "Passivation may be needed after storage",
        detail: "If stainless fasteners show surface rust (from iron contamination), they can be re-passivated (citric acid bath) to restore the protective oxide layer. Consult a metal treatment specialist.",
        critical: false,
      },
    ],
  },
];

const HANDLING_RULES = [
  {
    title: "Inspect before installing",
    detail: "Quick visual check before installing: correct grade markings, no visible damage, threads start cleanly by hand. Takes 5 seconds and prevents failures.",
    icon: "??",
  },
  {
    title: "Never use impact wrench for final torque",
    detail: "Impact wrenches are for rundown only — never final torque. Impact hammering greatly exceeds target torque with no control. Always use a calibrated torque wrench for final tightening.",
    icon: "??",
    critical: true,
  },
  {
    title: "Start by hand — always",
    detail: "Every fastener starts by hand for minimum 3 full turns before applying tools. This confirms thread alignment and prevents cross-threading. One cross-threaded bolt can ruin an expensive housing.",
    icon: "✋",
    critical: true,
  },
  {
    title: "Never mix zinc and cadmium plated with HDG",
    detail: "Electroplated fasteners and hot-dip galvanized fasteners look similar but have significantly different friction coefficients. Mixing in the same torqued joint creates unpredictable clamping. Keep segregated.",
    icon: "⚠",
  },
  {
    title: "Protect threads during transport",
    detail: "Bulk bags of bolts tumbling together cause thread damage — especially on fine threads and stainless. Use thread protectors or divided containers for critical fasteners.",
    icon: "??",
  },
  {
    title: "Clean contaminated threads before torquing",
    detail: "Dirt, paint, rust, and old thread sealant all change friction coefficients. Wire brush or chase threads before installation. Apply specified lubricant or anti-seize fresh.",
    icon: "??",
  },
  {
    title: "Mark fasteners after final torque",
    detail: "Paint pen or torque seal across the nut and adjacent surface allows instant visual verification that fasteners haven't moved since installation. Standard practice in flanges, pressure vessels, and critical machinery.",
    icon: "??",
  },
  {
    title: "Document lot numbers for critical applications",
    detail: "For safety-critical, structural, or pressure vessel applications, record the manufacturer's lot number and heat number from the certification documents. Required for traceability if a failure occurs.",
    icon: "??",
    critical: true,
  },
];

const COUNTERFEIT_SIGNS = [
  { sign: "Missing manufacturer identification mark", risk: "CRITICAL", detail: "All ASTM and SAE fasteners require manufacturer ID marks. No mark = unverified source." },
  { sign: "Grade markings too perfect or too shallow", risk: "HIGH", detail: "Genuine markings are consistent depth. Counterfeit grades may be die-stamped on incorrect grade material — often too shallow or inconsistently applied." },
  { sign: "Hardness inconsistent with grade markings", risk: "CRITICAL", detail: "Rockwell hardness test is the definitive check. Grade 5 should be HRC 25–34, Grade 8 HRC 33–39. Outside range = suspect." },
  { sign: "Price significantly below market", risk: "HIGH", detail: "Genuine Grade 8 bolts cost what they cost for a reason — alloy steel, heat treatment, testing. Pricing 40%+ below market is a major red flag." },
  { sign: "No certification documentation available", risk: "HIGH", detail: "Reputable distributors provide certificates of conformance (CoC) for industrial fasteners. Refusal or inability to provide = questionable source." },
  { sign: "Dimensions out of tolerance", risk: "MEDIUM", detail: "Measure head dimensions, thread pitch, and diameter with calipers. Significant deviation from ASME B18.2.1 tolerances indicates non-conforming product." },
  { sign: "Inconsistent markings within same lot", risk: "CRITICAL", detail: "A genuine lot of fasteners will have consistent markings. Random or varying marks on same 'lot' indicates mixed or remarked product." },
];

export default function StorageHandling() {
  const [activeTab, setActiveTab] = useState("storage");
  const [expanded, setExpanded] = useState(null);

  return (
    <div style={{ fontFamily: "'DM Sans','Segoe UI',sans-serif", background: BG, minHeight: "100vh", maxWidth: 430, margin: "0 auto" }}>
      <div style={{ background: `linear-gradient(135deg, ${NAVY} 0%, #2C5282 100%)`, padding: "16px 20px 20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
          <span style={{ fontSize: 20 }}>⬡</span>
          <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 10, letterSpacing: 2, textTransform: "uppercase" }}>Fastener Companion</span>
        </div>
        <div style={{ color: WHITE, fontSize: 20, fontWeight: 800, marginBottom: 2 }}>Storage, Handling & Quality</div>
        <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 11 }}>ASTM F3125 · AISC · IFI 7th Ed. · Fastenal Engineering Reference</div>
      </div>

      <div style={{ background: WHITE, borderBottom: `1px solid ${BORDER}`, padding: "0 8px", display: "flex", overflowX: "auto", scrollbarWidth: "none" }}>
        {[
          { id: "storage", label: "Storage" },
          { id: "handling", label: "Handling" },
          { id: "counterfeit", label: "Counterfeit ID" },
        ].map(t => (
          <button key={t.id} onClick={() => { setActiveTab(t.id); setExpanded(null); }}
            style={{ background: "none", border: "none", cursor: "pointer", padding: "12px 14px", fontSize: 12, fontWeight: 700, fontFamily: "inherit", whiteSpace: "nowrap", color: activeTab === t.id ? NAVY : MUTED, borderBottom: activeTab === t.id ? `3px solid ${AMBER}` : "3px solid transparent" }}>
            {t.label}
          </button>
        ))}
      </div>

      {activeTab === "storage" && (
        <div style={{ padding: "14px 16px" }}>
          {STORAGE_RULES.map((cat) => (
            <div key={cat.category} style={{ marginBottom: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                <span style={{ fontSize: 18 }}>{cat.icon}</span>
                <div style={{ fontSize: 14, fontWeight: 800, color: cat.color }}>{cat.category}</div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {cat.rules.map((rule, i) => {
                  const key = `${cat.category}-${i}`;
                  return (
                    <div key={i}>
                      <div onClick={() => setExpanded(expanded === key ? null : key)}
                        style={{ background: WHITE, border: `1px solid ${BORDER}`, borderLeft: `3px solid ${rule.critical ? "#DC2626" : cat.color}`, borderRadius: expanded === key ? "10px 10px 0 0" : 10, padding: "10px 14px", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div>
                          {rule.critical && <div style={{ fontSize: 9, fontWeight: 800, color: "#DC2626", marginBottom: 2 }}>CRITICAL</div>}
                          <div style={{ fontSize: 13, fontWeight: 700, color: NAVY }}>{rule.title}</div>
                        </div>
                        <span style={{ color: MUTED, fontSize: 12 }}>{expanded === key ? "▲" : "▼"}</span>
                      </div>
                      {expanded === key && (
                        <div style={{ background: "#F8FAFC", border: `1px solid ${BORDER}`, borderTop: "none", borderRadius: "0 0 10px 10px", padding: "10px 14px" }}>
                          <div style={{ fontSize: 12, color: TEXT, lineHeight: 1.7 }}>{rule.detail}</div>
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

      {activeTab === "handling" && (
        <div style={{ padding: "14px 16px", display: "flex", flexDirection: "column", gap: 10 }}>
          {HANDLING_RULES.map((rule, i) => (
            <div key={i} style={{ background: rule.critical ? "#FFF8E7" : WHITE, border: `1px solid ${rule.critical ? STAR_BORDER : BORDER}`, borderLeft: `4px solid ${rule.critical ? "#D97706" : NAVY}`, borderRadius: 12, padding: "12px 14px" }}>
              <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                <span style={{ fontSize: 18, flexShrink: 0 }}>{rule.icon}</span>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                    {rule.critical && <div style={{ background: "#D97706", color: WHITE, borderRadius: 4, padding: "1px 6px", fontSize: 9, fontWeight: 800 }}>IMPORTANT</div>}
                    <div style={{ fontSize: 13, fontWeight: 700, color: NAVY }}>{rule.title}</div>
                  </div>
                  <div style={{ fontSize: 12, color: TEXT, lineHeight: 1.6 }}>{rule.detail}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "counterfeit" && (
        <div style={{ padding: "14px 16px" }}>
          <div style={{ background: "#FFF1F2", border: "1px solid #FECDD3", borderRadius: 10, padding: "10px 14px", marginBottom: 12 }}>
            <div style={{ fontSize: 12, fontWeight: 800, color: "#DC2626", marginBottom: 4 }}>Counterfeit fasteners are a real industrial safety problem</div>
            <div style={{ fontSize: 11, color: "#9F1239", lineHeight: 1.5 }}>Counterfeit Grade 8 fasteners marked with Grade 5 or lower material have caused equipment failures and injuries. They look identical to genuine fasteners. Sourcing from reputable certified distributors with mill traceability is the primary defense.</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {COUNTERFEIT_SIGNS.map((item, i) => (
              <div key={i} style={{ background: WHITE, border: `1px solid ${BORDER}`, borderLeft: `4px solid ${item.risk === "CRITICAL" ? "#DC2626" : item.risk === "HIGH" ? "#D97706" : "#2563EB"}`, borderRadius: 12, padding: "12px 14px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: NAVY, flex: 1 }}>{item.sign}</div>
                  <div style={{ background: (item.risk === "CRITICAL" ? "#DC2626" : item.risk === "HIGH" ? "#D97706" : "#2563EB") + "20", border: `1px solid ${item.risk === "CRITICAL" ? "#DC2626" : item.risk === "HIGH" ? "#D97706" : "#2563EB"}`, borderRadius: 6, padding: "2px 8px", fontSize: 9, fontWeight: 800, color: item.risk === "CRITICAL" ? "#DC2626" : item.risk === "HIGH" ? "#D97706" : "#2563EB", flexShrink: 0, marginLeft: 8 }}>{item.risk}</div>
                </div>
                <div style={{ fontSize: 12, color: TEXT, lineHeight: 1.5 }}>{item.detail}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 12, background: STAR_BG, border: `1px solid ${STAR_BORDER}`, borderRadius: 12, padding: "12px 14px" }}>
            <div style={{ fontSize: 12, fontWeight: 800, color: "#92400E", marginBottom: 6 }}>Best Defense: Source Traceability</div>
            <div style={{ fontSize: 12, color: TEXT, lineHeight: 1.6 }}>
              Purchase from ISO 9001 certified distributors who provide mill test reports (MTR) with heat/lot numbers. For critical applications, require third-party testing. The Fastener Quality Act (FQA) requires distributors to certify conformance — request and retain documentation.
            </div>
          </div>
        </div>
      )}

      <div style={{ margin: "0 16px 24px", background: "#FFF1F2", border: "1px solid #FECDD3", borderRadius: 10, padding: "10px 14px" }}>
        <div style={{ fontSize: 10, color: "#9F1239", lineHeight: 1.5 }}>
          <strong>⚠ Verify Before Use.</strong> Storage and handling guidance based on ASTM F3125, AISC, IFI 7th Edition, and Fastenal Engineering Reference. Structural bolt storage requirements per AISC Specification for Structural Steel Buildings. Fastener Companion is a reference tool.
        </div>
      </div>
    </div>
  );
}
