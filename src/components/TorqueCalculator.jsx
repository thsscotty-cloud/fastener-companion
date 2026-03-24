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

export default function TorqueCalculator() {
  const [system, setSystem] = useState("imperial");
  const [size, setSize] = useState("1/2-13");
  const [grade, setGrade] = useState("Grade 5 (≤1\")");
  const [kFactor, setKFactor] = useState("Dry / No Lubrication");
  const [preload, setPreload] = useState(75);
  const [result, setResult] = useState(null);
  const [showFormula, setShowFormula] = useState(false);

  const sizes = system === "imperial" ? Object.keys(STRESS_AREAS) : Object.keys(METRIC_STRESS_AREAS);
  const grades = system === "imperial" ? Object.keys(GRADE_DATA.imperial) : Object.keys(GRADE_DATA.metric);

  const handleSystem = (s) => {
    setSystem(s);
    setSize(s === "imperial" ? "1/2-13" : "M12 x 1.75");
    setGrade(s === "imperial" ? "Grade 5 (≤1\")" : "8.8");
    setResult(null);
  };

  const handleCalc = () => {
    const r = calcTorque(size, grade, kFactor, preload, system);
    setResult(r);
  };

  const kInfo = K_FACTORS[kFactor];

  return (
    <div style={{ fontFamily: "'DM Sans','Segoe UI',sans-serif", background: BG, minHeight: "100vh", maxWidth: 430, margin: "0 auto" }}>
      <div style={{ background: `linear-gradient(135deg, ${NAVY} 0%, #2C5282 100%)`, padding: "16px 20px 20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
          <span style={{ fontSize: 20 }}>⬡</span>
          <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 10, letterSpacing: 2, textTransform: "uppercase" }}>Fastener Companion</span>
        </div>
        <div style={{ color: WHITE, fontSize: 20, fontWeight: 800, marginBottom: 2 }}>Torque Calculator</div>
        <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 11 }}>IFI 7th Ed. · SAE J429 · ASTM F3125 · ISO 898-1 · Machinery's Handbook 31st Ed.</div>
      </div>

      <div style={{ padding: "14px 16px" }}>
        {/* SYSTEM TOGGLE */}
        <div style={{ display: "flex", background: WHITE, border: `1px solid ${BORDER}`, borderRadius: 10, padding: 4, marginBottom: 14 }}>
          {["imperial", "metric"].map(s => (
            <button key={s} onClick={() => handleSystem(s)}
              style={{ flex: 1, background: system === s ? NAVY : "none", color: system === s ? WHITE : MUTED, border: "none", borderRadius: 8, padding: "8px", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", textTransform: "capitalize" }}>
              {s === "imperial" ? "Imperial (in-lb / ft-lb)" : "Metric (Nm)"}
            </button>
          ))}
        </div>

        {/* INPUTS */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 14 }}>
          {/* SIZE */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: NAVY, marginBottom: 4 }}>Bolt Size</div>
            <select value={size} onChange={e => setSize(e.target.value)}
              style={{ width: "100%", background: WHITE, border: `1px solid ${BORDER}`, borderRadius: 10, padding: "10px 14px", fontSize: 13, color: TEXT, fontFamily: "inherit", outline: "none" }}>
              {sizes.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          {/* GRADE */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: NAVY, marginBottom: 4 }}>Fastener Grade</div>
            <select value={grade} onChange={e => setGrade(e.target.value)}
              style={{ width: "100%", background: WHITE, border: `1px solid ${BORDER}`, borderRadius: 10, padding: "10px 14px", fontSize: 13, color: TEXT, fontFamily: "inherit", outline: "none" }}>
              {grades.map(g => <option key={g} value={g}>{g}</option>)}
            </select>
          </div>

          {/* K FACTOR */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: NAVY, marginBottom: 4 }}>Lubrication / Surface Condition</div>
            <select value={kFactor} onChange={e => setKFactor(e.target.value)}
              style={{ width: "100%", background: WHITE, border: `1px solid ${BORDER}`, borderRadius: 10, padding: "10px 14px", fontSize: 13, color: TEXT, fontFamily: "inherit", outline: "none" }}>
              {Object.keys(K_FACTORS).map(k => <option key={k} value={k}>{k} (K={K_FACTORS[k].k})</option>)}
            </select>
            {kFactor.includes("Anti-Seize") && (
              <div style={{ marginTop: 6, background: "#FFF1F2", border: "1px solid #FECDD3", borderRadius: 8, padding: "6px 10px" }}>
                <div style={{ fontSize: 11, color: "#9F1239" }}>⚠ Anti-seize reduces friction significantly. Using standard dry torque values with anti-seize will over-torque the joint.</div>
              </div>
            )}
          </div>

          {/* PRELOAD % */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: NAVY, marginBottom: 4 }}>Target Preload — <span style={{ color: AMBER, fontWeight: 800 }}>{preload}% of Proof Load</span></div>
            <input type="range" min={50} max={90} step={5} value={preload} onChange={e => setPreload(Number(e.target.value))}
              style={{ width: "100%", accentColor: NAVY }} />
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: MUTED, marginTop: 2 }}>
              <span>50% (conservative)</span>
              <span>75% (typical)</span>
              <span>90% (max)</span>
            </div>
            <div style={{ marginTop: 6, background: ROW_ALT, border: `1px solid ${BORDER}`, borderRadius: 8, padding: "6px 10px", fontSize: 11, color: TEXT }}>
              {preload < 65 && "Conservative — use for soft joints, cast iron, or uncertain conditions."}
              {preload >= 65 && preload < 80 && "Standard — appropriate for most industrial applications."}
              {preload >= 80 && "Aggressive — use only with calibrated torque equipment and verified joint conditions."}
            </div>
          </div>
        </div>

        {/* CALCULATE */}
        <button onClick={handleCalc}
          style={{ width: "100%", background: NAVY, color: WHITE, border: "none", borderRadius: 12, padding: "14px", fontSize: 14, fontWeight: 800, cursor: "pointer", fontFamily: "inherit", marginBottom: 14 }}>
          Calculate Torque →
        </button>

        {/* RESULT */}
        {result && (
          <>
            <div style={{ background: WHITE, border: `1px solid ${BORDER}`, borderRadius: 14, overflow: "hidden", marginBottom: 12, boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
              <div style={{ background: NAVY, padding: "12px 14px" }}>
                <div style={{ color: WHITE, fontSize: 13, fontWeight: 800 }}>Calculated Torque Values</div>
                <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 11, marginTop: 2 }}>{size} · {grade} · {kFactor}</div>
              </div>

              {/* PRIMARY OUTPUT */}
              <div style={{ padding: "16px 14px", background: STAR_BG, borderBottom: `1px solid ${BORDER}` }}>
                <div style={{ textAlign: "center" }}>
                  {system === "imperial" ? (
                    <>
                      <div style={{ fontSize: 42, fontWeight: 900, color: NAVY, lineHeight: 1 }}>{result.torque_ftlb}</div>
                      <div style={{ fontSize: 16, fontWeight: 700, color: AMBER }}>ft-lb</div>
                      <div style={{ fontSize: 14, color: MUTED, marginTop: 4 }}>{result.torque_inlb} in-lb · {result.torque_nm} Nm</div>
                    </>
                  ) : (
                    <>
                      <div style={{ fontSize: 42, fontWeight: 900, color: NAVY, lineHeight: 1 }}>{result.torque_nm}</div>
                      <div style={{ fontSize: 16, fontWeight: 700, color: AMBER }}>Nm</div>
                      <div style={{ fontSize: 14, color: MUTED, marginTop: 4 }}>{result.torque_ftlb} ft-lb · {result.torque_inlb} in-lb</div>
                    </>
                  )}
                </div>
              </div>

              {/* DETAILS */}
              {[
                { label: "Target Preload", value: `${preload}% of proof load` },
                { label: "Estimated Clamp Load", value: system === "imperial" ? `${result.clampLoad.toLocaleString()} lbs` : `${result.clampLoad.toLocaleString()} N` },
                { label: "Nut Factor (K)", value: result.k.toString() },
                { label: "Proof Load", value: result.proofLoad ? (system === "imperial" ? `${result.proofLoad.toLocaleString()} psi` : `${result.proofLoad} MPa`) : "Not specified — used 75% of tensile" },
                { label: "Tensile Strength", value: system === "imperial" ? `${result.tensile.toLocaleString()} psi` : `${result.tensile} MPa` },
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "9px 14px", borderBottom: `1px solid ${BORDER}`, background: i % 2 === 0 ? WHITE : ROW_ALT }}>
                  <div style={{ fontSize: 11, color: MUTED, fontWeight: 600 }}>{item.label}</div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: NAVY }}>{item.value}</div>
                </div>
              ))}
            </div>

            {/* FORMULA */}
            <div onClick={() => setShowFormula(!showFormula)}
              style={{ background: "#EEF4FF", border: `1px solid ${BORDER}`, borderRadius: 10, padding: "10px 14px", marginBottom: 12, cursor: "pointer" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#2563EB" }}>?? How This Was Calculated</div>
                <span style={{ color: MUTED, fontSize: 12 }}>{showFormula ? "▲" : "▼"}</span>
              </div>
              {showFormula && (
                <div style={{ marginTop: 8 }}>
                  <div style={{ fontSize: 12, color: TEXT, lineHeight: 1.7, fontFamily: "monospace" }}>
                    T = K × D × F<br />
                    F = Proof Load × Stress Area × {preload}%<br />
                    K (nut factor) = {result.k}<br />
                    T = {result.k} × {system === "imperial" ? `${STRESS_AREAS[size]?.d}"` : `${METRIC_STRESS_AREAS[size]?.d}m`} × {system === "imperial" ? `${result.clampLoad.toLocaleString()} lbs` : `${result.clampLoad.toLocaleString()} N`}<br />
                    = {system === "imperial" ? `${result.torque_ftlb} ft-lb` : `${result.torque_nm} Nm`}
                  </div>
                  <div style={{ marginTop: 8, fontSize: 11, color: MUTED }}>~90% of applied torque overcomes friction. Only ~10% produces actual bolt stretch (preload). This is why lubrication so dramatically affects required torque.</div>
                </div>
              )}
            </div>

            {/* WARNINGS */}
            <div style={{ background: STAR_BG, border: `1px solid ${STAR_BORDER}`, borderRadius: 10, padding: "10px 14px", marginBottom: 12 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#92400E", marginBottom: 6 }}>⚠ Important Reminders</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                {[
                  "Use a calibrated torque wrench — never an impact wrench for final torque.",
                  "Torque values assume clean, undamaged threads and bearing surfaces.",
                  "Equal torque does not guarantee equal preload — friction variation causes ±25–30% scatter.",
                  "Re-torque gasketed joints after first heat cycle to compensate for embedment relaxation.",
                  grade?.includes("8") || grade?.includes("10.9") || grade?.includes("12.9") ? "High-strength grade — verify coating does not introduce HE risk without baking." : null,
                  kFactor?.includes("Anti-Seize") ? "Anti-seize applied — torque reduced correctly. Document the as-applied condition." : null,
                ].filter(Boolean).map((w, i) => (
                  <div key={i} style={{ display: "flex", gap: 8, fontSize: 11, color: TEXT, lineHeight: 1.5 }}>
                    <span style={{ color: "#D97706", flexShrink: 0 }}>•</span>
                    <span>{w}</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        <div style={{ background: "#FFF1F2", border: "1px solid #FECDD3", borderRadius: 10, padding: "10px 14px" }}>
          <div style={{ fontSize: 10, color: "#9F1239", lineHeight: 1.5 }}>
            <strong>⚠ Verify Before Use.</strong> Calculated using T = K×D×F per IFI 7th Edition and Machinery's Handbook methodology. Stress areas per ASME B1.1. K-factors are representative values — actual friction varies with surface condition, plating, and application method. For critical joints, verify with direct tension measurement. Fastener Companion is a reference tool — not a substitute for engineering judgment.
          </div>
        </div>
      </div>
    </div>
  );
}
