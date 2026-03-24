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


function calcTorque(size, gradeKey, kKey, preloadPct, system) {
  const kData = K_FACTORS[kKey];
  const gradeInfo = system === "imperial" ? GRADE_DATA.imperial[gradeKey] : GRADE_DATA.metric[gradeKey];
  const sizeData = system === "imperial" ? STRESS_AREAS[size] : METRIC_STRESS_AREAS[size];
  if (!kData || !gradeInfo || !sizeData) return null;

  const k = kData;
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
// PreloadCalculator
// ════════════════════════════════════════════════════

// ─── DATA ─────────────────────────────────────────────────────────────────────
// Sources: Bickford "Introduction to the Design and Behavior of Bolted Joints",
// Shigley's Mechanical Engineering Design 10th Ed., IFI 7th Edition,
// ASME PCC-1, Machinery's Handbook 31st Ed., NASA RP-1228

// Tensile stress areas (in²) per ASME B1.1
const STRESS_AREAS_IMP = {
  "1/4-20":  0.0318, "1/4-28":  0.0364,
  "5/16-18": 0.0524, "5/16-24": 0.0580,
  "3/8-16":  0.0775, "3/8-24":  0.0878,
  "7/16-14": 0.1063, "7/16-20": 0.1187,
  "1/2-13":  0.1419, "1/2-20":  0.1599,
  "9/16-12": 0.1820, "9/16-18": 0.2030,
  "5/8-11":  0.2260, "5/8-18":  0.2560,
  "3/4-10":  0.3340, "3/4-16":  0.3730,
  "7/8-9":   0.4620, "7/8-14":  0.5090,
  "1-8":     0.6060, "1-12":    0.6630,
  "1 1/8-7": 0.7630, "1 1/4-7": 0.9690,
  "1 3/8-6": 1.155,  "1 1/2-6": 1.405,
};

// Tensile stress areas (mm²) per ISO 68-1
const STRESS_AREAS_MET = {
  "M6 x 1.0":   20.1,  "M8 x 1.25":  36.6,
  "M10 x 1.5":  58.0,  "M12 x 1.75": 84.3,
  "M14 x 2.0":  115,   "M16 x 2.0":  157,
  "M18 x 2.5":  192,   "M20 x 2.5":  245,
  "M22 x 2.5":  303,   "M24 x 3.0":  353,
  "M27 x 3.0":  459,   "M30 x 3.5":  561,
  "M33 x 3.5":  694,   "M36 x 4.0":  817,
  "M39 x 4.0":  976,   "M42 x 4.5":  1120,
  "M48 x 5.0":  1470,
};

const GRADES_IMP = {
  "Grade 2 (≤3/4\")": { proof: 55000,  yield: 57000,  tensile: 74000  },
  "Grade 2 (>3/4\")": { proof: 33000,  yield: 36000,  tensile: 60000  },
  "Grade 5 (≤1\")":   { proof: 85000,  yield: 92000,  tensile: 120000 },
  "Grade 5 (>1\")":   { proof: 74000,  yield: 81000,  tensile: 105000 },
  "Grade 8":          { proof: 120000, yield: 130000, tensile: 150000 },
  "A307 Grade A":     { proof: null,   yield: 36000,  tensile: 60000  },
  "A325 (≤1\")":      { proof: 85000,  yield: 92000,  tensile: 120000 },
  "A325 (>1\")":      { proof: 74000,  yield: 81000,  tensile: 105000 },
  "A490":             { proof: 120000, yield: 130000, tensile: 150000 },
  "A354 BD":          { proof: 120000, yield: 130000, tensile: 150000 },
  "A193 B7 (≤2.5\")": { proof: null,   yield: 105000, tensile: 125000 },
};

const GRADES_MET = {
  "4.6":   { proof: 225, yield: 240, tensile: 400  },
  "5.8":   { proof: 380, yield: 420, tensile: 520  },
  "8.8":   { proof: 580, yield: 640, tensile: 800  },
  "10.9":  { proof: 830, yield: 940, tensile: 1040 },
  "12.9":  { proof: 970, yield: 1080, tensile: 1220 },
  "A2-70": { proof: 450, yield: 450, tensile: 700  },
  "A4-70": { proof: 450, yield: 450, tensile: 700  },
  "A4-80": { proof: 600, yield: 600, tensile: 800  },
};

const K_FACTORS = {
  "Dry":              0.20,
  "Zinc plated (dry)": 0.17,
  "Lightly oiled":    0.17,
  "Machine oil":      0.15,
  "Anti-seize (copper/nickel)": 0.13,
  "Anti-seize (moly)": 0.11,
  "Waxed / PTFE":     0.15,
  "Hot-dip galvanized": 0.19,
};

export default function PreloadCalculator() {
  const [system, setSystem] = useState("imperial");
  const [size, setSize] = useState("1/2-13");
  const [grade, setGrade] = useState("Grade 5 (≤1\")");
  const [kKey, setKKey] = useState("Dry");
  const [pct, setPct] = useState(75);
  const [result, setResult] = useState(null);

  const sizes = system === "imperial" ? Object.keys(STRESS_AREAS_IMP) : Object.keys(STRESS_AREAS_MET);
  const grades = system === "imperial" ? Object.keys(GRADES_IMP) : Object.keys(GRADES_MET);

  const handleSystem = (s) => {
    setSystem(s);
    setSize(s === "imperial" ? "1/2-13" : "M12 x 1.75");
    setGrade(s === "imperial" ? "Grade 5 (≤1\")" : "8.8");
    setResult(null);
  };

  const calc = () => {
    const k = K_FACTORS[kKey];
    const gradeData = system === "imperial" ? GRADES_IMP[grade] : GRADES_MET[grade];
    const As = system === "imperial" ? STRESS_AREAS_IMP[size] : STRESS_AREAS_MET[size] * 1e-6; // convert mm² to m²
    if (!gradeData || !As) return;

    const p = pct / 100;
    const proofStrength = gradeData.proof || (gradeData.tensile * 0.85);

    if (system === "imperial") {
      // Imperial: F in lbs, T in ft-lb, d in inches
      const sizeData = size.split("-");
      const d = parseFloat(sizeData[0].replace(/\//g, "/").includes("/")
        ? eval(sizeData[0].replace(" ", "+"))
        : sizeData[0]);
      const F_proof = proofStrength * STRESS_AREAS_IMP[size]; // max proof load (lbs)
      const F_target = F_proof * p; // target clamp load (lbs)
      const T_inlb = k * d * 12 * F_target;
      const T_ftlb = T_inlb / 12;
      const T_nm = T_ftlb * 1.3558;
      const utilization = (F_target / F_proof * 100).toFixed(0);
      const safety_margin = ((gradeData.tensile * STRESS_AREAS_IMP[size] - F_target) / F_target * 100).toFixed(0);

      setResult({
        F_target: Math.round(F_target),
        F_proof: Math.round(F_proof),
        F_tensile: Math.round(gradeData.tensile * STRESS_AREAS_IMP[size]),
        T_ftlb: Math.round(T_ftlb),
        T_inlb: Math.round(T_inlb),
        T_nm: Math.round(T_nm),
        utilization,
        safety_margin,
        k,
        proofStrength,
        system: "imperial",
      });
    } else {
      // Metric: F in N, T in Nm, d in meters
      const d_m = parseFloat(size.replace("M", "")) / 1000;
      const As_m2 = STRESS_AREAS_MET[size] * 1e-6;
      const F_proof = proofStrength * 1e6 * As_m2; // N
      const F_target = F_proof * p;
      const T_nm = k * d_m * F_target;
      const T_ftlb = T_nm / 1.3558;
      const T_inlb = T_ftlb * 12;
      const utilization = (F_target / F_proof * 100).toFixed(0);
      const safety_margin = ((gradeData.tensile * 1e6 * As_m2 - F_target) / F_target * 100).toFixed(0);

      setResult({
        F_target: Math.round(F_target),
        F_proof: Math.round(F_proof),
        F_tensile: Math.round(gradeData.tensile * 1e6 * As_m2),
        T_nm: Math.round(T_nm),
        T_ftlb: Math.round(T_ftlb),
        T_inlb: Math.round(T_inlb * 10) / 10,
        utilization,
        safety_margin,
        k,
        proofStrength,
        system: "metric",
      });
    }
  };

  const evalFraction = (str) => {
    try {
      const parts = str.split("-")[0].trim();
      if (parts.includes(" ")) {
        const [whole, frac] = parts.split(" ");
        const [n, d] = frac.split("/");
        return parseInt(whole) + parseInt(n) / parseInt(d);
      }
      if (parts.includes("/")) {
        const [n, d] = parts.split("/");
        return parseInt(n) / parseInt(d);
      }
      return parseFloat(parts);
    } catch { return 0.5; }
  };

  return (
    <div style={{ fontFamily: "'DM Sans','Segoe UI',sans-serif", background: BG, minHeight: "100vh", maxWidth: 430, margin: "0 auto" }}>
      <div style={{ background: `linear-gradient(135deg, ${NAVY} 0%, #2C5282 100%)`, padding: "16px 20px 20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
          <span style={{ fontSize: 20 }}>⬡</span>
          <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 10, letterSpacing: 2, textTransform: "uppercase" }}>Fastener Companion</span>
        </div>
        <div style={{ color: WHITE, fontSize: 20, fontWeight: 800, marginBottom: 2 }}>Preload & Clamp Load</div>
        <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 11 }}>Bickford · Shigley's MED · IFI 7th Ed. · ASME PCC-1 · NASA RP-1228</div>
      </div>

      <div style={{ padding: "14px 16px" }}>
        <div style={{ background: STAR_BG, border: `1px solid ${STAR_BORDER}`, borderRadius: 10, padding: "10px 14px", marginBottom: 14 }}>
          <div style={{ fontSize: 11, color: "#92400E", lineHeight: 1.5 }}>
            <strong>Torque is a means to an end.</strong> The goal is clamp load (preload), not a torque number. ~90% of applied torque overcomes friction — only ~10% stretches the bolt. This calculator shows both the torque required AND the resulting clamp load.
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
            <div style={{ fontSize: 11, fontWeight: 700, color: NAVY, marginBottom: 4 }}>Bolt Size</div>
            <select value={size} onChange={e => { setSize(e.target.value); setResult(null); }}
              style={{ width: "100%", background: WHITE, border: `1px solid ${BORDER}`, borderRadius: 10, padding: "10px 14px", fontSize: 13, color: TEXT, fontFamily: "inherit", outline: "none" }}>
              {sizes.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: NAVY, marginBottom: 4 }}>Grade</div>
            <select value={grade} onChange={e => { setGrade(e.target.value); setResult(null); }}
              style={{ width: "100%", background: WHITE, border: `1px solid ${BORDER}`, borderRadius: 10, padding: "10px 14px", fontSize: 13, color: TEXT, fontFamily: "inherit", outline: "none" }}>
              {grades.map(g => <option key={g} value={g}>{g}</option>)}
            </select>
          </div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: NAVY, marginBottom: 4 }}>Lubrication (K Factor)</div>
            <select value={kKey} onChange={e => { setKKey(e.target.value); setResult(null); }}
              style={{ width: "100%", background: WHITE, border: `1px solid ${BORDER}`, borderRadius: 10, padding: "10px 14px", fontSize: 13, color: TEXT, fontFamily: "inherit", outline: "none" }}>
              {Object.entries(K_FACTORS).map(([k, v]) => <option key={k} value={k}>{k} (K={v})</option>)}
            </select>
          </div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: NAVY, marginBottom: 4 }}>Target Preload — <span style={{ color: AMBER }}>{pct}% of Proof Load</span></div>
            <input type="range" min={50} max={90} step={5} value={pct} onChange={e => { setPct(Number(e.target.value)); setResult(null); }}
              style={{ width: "100%", accentColor: NAVY }} />
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: MUTED, marginTop: 2 }}>
              <span>50% conservative</span><span>75% typical</span><span>90% max</span>
            </div>
          </div>
        </div>

        <button onClick={calc}
          style={{ width: "100%", background: NAVY, color: WHITE, border: "none", borderRadius: 12, padding: "14px", fontSize: 14, fontWeight: 800, cursor: "pointer", fontFamily: "inherit", marginBottom: 14 }}>
          Calculate Preload →
        </button>

        {result && (
          <>
            {/* PRIMARY OUTPUT */}
            <div style={{ background: WHITE, border: `1px solid ${BORDER}`, borderRadius: 14, overflow: "hidden", marginBottom: 12, boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
              <div style={{ background: NAVY, padding: "12px 14px" }}>
                <div style={{ color: WHITE, fontSize: 13, fontWeight: 800 }}>Preload & Torque Results</div>
              </div>

              {/* CLAMP LOAD */}
              <div style={{ padding: "16px 14px", background: STAR_BG, borderBottom: `1px solid ${BORDER}`, textAlign: "center" }}>
                <div style={{ fontSize: 12, color: MUTED, marginBottom: 4 }}>Target Clamp Load (Preload)</div>
                <div style={{ fontSize: 42, fontWeight: 900, color: NAVY, lineHeight: 1 }}>
                  {result.system === "imperial" ? result.F_target.toLocaleString() : result.F_target.toLocaleString()}
                </div>
                <div style={{ fontSize: 16, fontWeight: 700, color: AMBER }}>
                  {result.system === "imperial" ? "lbs" : "N"}
                </div>
                {result.system === "metric" && (
                  <div style={{ fontSize: 13, color: MUTED, marginTop: 4 }}>{(result.F_target / 1000).toFixed(1)} kN · {(result.F_target / 4.448).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")} lbs</div>
                )}
              </div>

              {/* TORQUE */}
              <div style={{ padding: "14px", background: "#EFF6FF", borderBottom: `1px solid ${BORDER}`, textAlign: "center" }}>
                <div style={{ fontSize: 12, color: "#2563EB", marginBottom: 4, fontWeight: 700 }}>Required Torque</div>
                <div style={{ display: "flex", justifyContent: "center", gap: 20 }}>
                  <div>
                    <div style={{ fontSize: 28, fontWeight: 900, color: NAVY }}>{result.T_nm}</div>
                    <div style={{ fontSize: 12, color: AMBER, fontWeight: 700 }}>Nm</div>
                  </div>
                  <div style={{ color: BORDER, fontSize: 24 }}>|</div>
                  <div>
                    <div style={{ fontSize: 28, fontWeight: 900, color: NAVY }}>{result.T_ftlb}</div>
                    <div style={{ fontSize: 12, color: AMBER, fontWeight: 700 }}>ft-lb</div>
                  </div>
                  <div style={{ color: BORDER, fontSize: 24 }}>|</div>
                  <div>
                    <div style={{ fontSize: 28, fontWeight: 900, color: NAVY }}>{result.T_inlb}</div>
                    <div style={{ fontSize: 12, color: AMBER, fontWeight: 700 }}>in-lb</div>
                  </div>
                </div>
              </div>

              {/* DETAILS */}
              {[
                { label: "Proof Load (100%)", value: result.system === "imperial" ? `${result.F_proof.toLocaleString()} lbs` : `${result.F_proof.toLocaleString()} N` },
                { label: "Bolt Tensile Capacity", value: result.system === "imperial" ? `${result.F_tensile.toLocaleString()} lbs` : `${result.F_tensile.toLocaleString()} N` },
                { label: "Proof Utilization", value: `${pct}% of proof load` },
                { label: "Safety Margin vs Tensile", value: `+${result.safety_margin}% above target` },
                { label: "Nut Factor (K)", value: result.k.toString() },
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "9px 14px", borderBottom: `1px solid ${BORDER}`, background: i % 2 === 0 ? WHITE : ROW_ALT }}>
                  <div style={{ fontSize: 11, color: MUTED, fontWeight: 600 }}>{item.label}</div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: NAVY }}>{item.value}</div>
                </div>
              ))}
            </div>

            {/* JOINT BEHAVIOR INSIGHT */}
            <div style={{ background: WHITE, border: `1px solid ${BORDER}`, borderRadius: 12, padding: "12px 14px", marginBottom: 12 }}>
              <div style={{ fontSize: 12, fontWeight: 800, color: NAVY, marginBottom: 8 }}>Understanding the Joint</div>
              {[
                { icon: "??", text: `At ${pct}% preload, the bolt stretches elastically — it acts as a spring holding the joint in compression. As long as external load stays below ${result.F_target.toLocaleString()} ${result.system === "imperial" ? "lbs" : "N"}, the joint members remain in contact and the bolt sees minimal additional stress.` },
                { icon: "⚠", text: "If external tensile load exceeds clamp load, joint members separate — bolt takes the full load and fatigue risk increases dramatically. Design external loads to be well below clamp load." },
                { icon: "??", text: "Embedment relaxation will reduce preload 5–15% in the first service cycle. For gasketed or high-temperature joints, re-torque after initial heat cycle to restore clamp load." },
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", gap: 10, marginBottom: i < 2 ? 10 : 0, paddingBottom: i < 2 ? 10 : 0, borderBottom: i < 2 ? `1px solid ${BORDER}` : "none" }}>
                  <span style={{ fontSize: 16, flexShrink: 0 }}>{item.icon}</span>
                  <div style={{ fontSize: 12, color: TEXT, lineHeight: 1.6 }}>{item.text}</div>
                </div>
              ))}
            </div>

            {(grade?.includes("8") || grade?.includes("10.9") || grade?.includes("12.9") || grade?.includes("A490")) && (
              <div style={{ background: "#FFF1F2", border: "1px solid #FECDD3", borderLeft: "4px solid #DC2626", borderRadius: 12, padding: "12px 14px", marginBottom: 12 }}>
                <div style={{ fontSize: 11, fontWeight: 800, color: "#DC2626", marginBottom: 4 }}>⚡ HE Risk — High Strength Grade</div>
                <div style={{ fontSize: 12, color: "#9F1239", lineHeight: 1.5 }}>This grade is susceptible to hydrogen embrittlement. If zinc electroplating, require baking per ASTM F1941 within 4 hours of plating. Consider zinc flake coating (Geomet/Dacromet) as zero-HE-risk alternative.</div>
              </div>
            )}
          </>
        )}

        <div style={{ background: "#FFF1F2", border: "1px solid #FECDD3", borderRadius: 10, padding: "10px 14px" }}>
          <div style={{ fontSize: 10, color: "#9F1239", lineHeight: 1.5 }}>
            <strong>⚠ Verify Before Use.</strong> Calculated per T=K×D×F methodology (Bickford, Shigley's, IFI 7th Ed.). Stress areas per ASME B1.1 / ISO 68-1. K-factors are representative — actual friction varies ±25–30%. For critical joints use direct tension measurement (DTI washers or ultrasonic). Fastener Companion is a reference tool.
          </div>
        </div>
      </div>
    </div>
  );
}
