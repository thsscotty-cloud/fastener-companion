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
// IndustryGuide
// ════════════════════════════════════════════════════

// ─── DATA ─────────────────────────────────────────────────────────────────────
// Sources: IFI 7th Edition industry application guides,
// Fastenal Engineering Reference by industry,
// ASTM application guides, Parker Hannifin industrial guide,
// Various industry-specific standards bodies

const INDUSTRIES = [
  {
    id: "oil_gas",
    name: "Oil & Gas / Petrochemical",
    icon: "??️",
    color: "#D97706",
    primary_grades: ["A193 B7 stud bolts + A194 2H nuts", "A193 B7M for sour service (NACE)", "A193 B8M (316 SS) for corrosive", "F3125 A325/A490 for structural"],
    primary_coatings: ["Plain (bare) or phosphate + oil", "Zinc flake for external hardware", "Hot-dip galvanize for structural"],
    key_standards: ["ASME B16.5 (pipe flanges)", "ASME B31.3 (process piping)", "NACE MR0175/ISO 15156 (sour service)", "ASME VIII (pressure vessels)", "ASTM A193/A194"],
    common_problems: [
      "Sour service (H2S) — must specify B7M, not B7",
      "High temperature flanges — verify B7 is rated for the temperature",
      "Offshore — stainless required, verify 316 SS for chloride resistance",
      "Hydrogen attack — C-0.5Mo and other alloys have limits",
    ],
    cots_note: "B7 stud bolts are widely stocked. Exotic alloys (Inconel, duplex SS) are specialty items.",
    star: true,
  },
  {
    id: "structural_steel",
    name: "Structural Steel / Construction",
    icon: "??️",
    color: "#2563EB",
    primary_grades: ["F3125 A325 (standard structural)", "F3125 A490 (high-strength structural)", "ASTM A307 (non-structural, secondary)", "ASTM F1554 (anchor bolts)"],
    primary_coatings: ["Hot-dip galvanized (ASTM A153) for outdoor", "Plain/mill scale for indoor structural", "Mechanical galv for high-strength (no A490 HDG)"],
    key_standards: ["AISC 360 (steel construction)", "RCSC (structural bolting)", "ASME B16.5 (if any flanges)", "ASTM F3125 (structural bolts)", "ASTM F1554 (anchor bolts)"],
    common_problems: [
      "A490 cannot be galvanized — prohibited by AISC",
      "F436 hardened washers required — SAE/USS not acceptable",
      "A563 DH or DH3 nuts required — standard hex nuts not acceptable",
      "1-year shelf life on pre-lubricated structural bolts",
    ],
    cots_note: "A325 is widely stocked. A490 is less common — verify availability with distributor.",
    star: true,
  },
  {
    id: "food_bev",
    name: "Food & Beverage / Pharmaceutical",
    icon: "??",
    color: "#059669",
    primary_grades: ["316 SS (A4) — FDA/USDA required", "304 SS (A2) — acceptable in some zones", "Titanium for ultra-high corrosion resistance"],
    primary_coatings: ["Passivation (standard for SS)", "Electropolish for cleanroom/pharmaceutical", "NO zinc coatings — contamination risk"],
    key_standards: ["FDA 21 CFR (food contact)", "USDA 3A sanitary standards", "ASTM F593 (stainless fasteners)", "ISO 3506 A4-70/A4-80"],
    common_problems: [
      "304 SS in high-chloride clean-in-place (CIP) solutions — upgrade to 316",
      "Crevices under bolt heads — use shoulder bolts or seal washers",
      "Lubricants on fasteners must be food-grade (NSF H1 rated)",
      "Plastic head caps over stainless fasteners trap bacteria",
    ],
    cots_note: "316 SS hex bolts widely available. Specialty food-grade coated fasteners are special order.",
    star: true,
  },
  {
    id: "mining",
    name: "Mining & Heavy Equipment",
    icon: "⛏️",
    color: "#92400E",
    primary_grades: ["Grade 8 for structural and machinery", "A490 for heavy structural", "A193 B7 for high-temp process"],
    primary_coatings: ["Hot-dip galvanized for outdoor/exposed", "Zinc flake for high-strength hardware", "Plain for underground (cathodic protection zones)"],
    key_standards: ["SAE J429 (Grade 8)", "ASTM F3125 (structural)", "MSHA regulations (mine safety)"],
    common_problems: [
      "Extreme vibration — Nordlock or double-nut required, not split lock washers",
      "Abrasive environments — thread damage during installation common",
      "Remote locations — COTS availability critical, exotic specs = downtime",
      "Corrosive groundwater — coating selection critical for underground",
    ],
    cots_note: "Grade 8 and HDG widely available. Specify COTS-compatible sizes for remote operations.",
    star: false,
  },
  {
    id: "automotive",
    name: "Automotive / Transportation",
    icon: "??",
    color: "#374151",
    primary_grades: ["ISO 10.9 (predominant for drivetrain)", "ISO 8.8 (general assembly)", "ISO 12.9 (engine critical — head bolts, rod bolts)", "Custom OEM specs common"],
    primary_coatings: ["Zinc flake (Dacromet/Geomet) — dominant", "Zinc-nickel electroplate for high strength", "Phosphate + oil for internal engine"],
    key_standards: ["ISO 898-1 (metric property classes)", "SAE J429 (inch series)", "VW/BMW/Mercedes OEM specs", "Torque-to-yield (TTY) single-use"],
    common_problems: [
      "Torque-to-yield (TTY) bolts — NEVER REUSE (head bolts, rod bolts, wheel bolts on some vehicles)",
      "OEM-specific thread forms — not always standard metric",
      "Zinc flake coatings calibrated to specific K-factors — cannot swap coatings without recalculating torque",
      "Grade 12.9 head bolts — HE risk if wrong service (never acid clean)",
    ],
    cots_note: "Standard ISO 8.8/10.9 widely available. OEM-specific parts require dealer/OEM source.",
    star: false,
  },
  {
    id: "aerospace",
    name: "Aerospace",
    icon: "✈️",
    color: "#7C3AED",
    primary_grades: ["NAS/AN/MS military specification bolts", "Ti-6Al-4V titanium for weight-critical", "A286 superalloy for high-temp", "Custom per aircraft design data"],
    primary_coatings: ["Cadmium plate (AMS-QQ-P-416) — legacy aerospace", "Zinc flake replacing cadmium", "Dry film lubricant for titanium", "Passivation for stainless"],
    key_standards: ["NAS (National Aerospace Standards)", "AN/MS (Army-Navy/Military Standard)", "NASM standards", "AS9100 quality management", "FAA regulations"],
    common_problems: [
      "NAS/AN/MS specs require specific manufacturers and lots — not standard commercial",
      "Safety wire required on many applications — bolts must have drilled heads",
      "Titanium galls easily — anti-seize or dry film required, never install dry",
      "Single-use requirement on many aircraft fasteners (record every installation)",
    ],
    cots_note: "Aerospace fasteners are NOT general COTS. Certified aerospace distributors required. Counterfeit aerospace fasteners are a documented safety problem.",
    star: false,
  },
  {
    id: "power_gen",
    name: "Power Generation / Utilities",
    icon: "⚡",
    color: "#DC2626",
    primary_grades: ["A193 B7 for steam/heat systems", "A193 B8/B8M for corrosive service", "A320 L7 for cryogenic (LNG)", "A286 for very high temperature turbine"],
    primary_coatings: ["Plain (bare) for hot service", "Zinc flake for external hardware", "Nickel-based for high-temp exposure"],
    key_standards: ["ASME B16.5 (flanges)", "ASME VIII (pressure vessels)", "ASME PCC-1 (flange assembly)", "ASTM A193/A194", "IEEE standards (electrical equipment)"],
    common_problems: [
      "Elevated temperature relaxation — re-torque schedule required",
      "Steam flanges — spiral wound gaskets + B7 studs + star pattern critical",
      "Cycling service — thermal fatigue, check for embed relaxation",
      "Nuclear applications (BWR/PWR) — ASME NQA-1 level documentation required",
    ],
    cots_note: "B7 stud bolts widely available. Nuclear-qualified fasteners require NQA-1 certified sources.",
    star: true,
  },
  {
    id: "marine",
    name: "Marine / Coastal",
    icon: "⚓",
    color: "#0891B2",
    primary_grades: ["316 SS (A4-70/A4-80) — primary", "Monel 400 for extreme submerged", "Bronze/copper alloys for specific applications", "Hot-dip galvanized for structural steel above waterline"],
    primary_coatings: ["Passivation for stainless", "Hot-dip galvanize for above-waterline structural", "Zinc flake — not suitable for continuous submersion"],
    key_standards: ["ASTM F593 (stainless fasteners)", "ISO 3506 A4", "ABYC (American Boat and Yacht Council)", "ABS classification society standards"],
    common_problems: [
      "304 SS corrodes in marine saltwater — always specify 316 SS",
      "Galvanic corrosion underwater — all metals in contact must be compatible",
      "Aluminum boats with SS fasteners — isolation required",
      "Carbon steel + saltwater = rapid and destructive corrosion — never use plain steel",
    ],
    cots_note: "316 SS hex bolts available at most distributors. Monel and specialty marine hardware requires marine supply sources.",
    star: false,
  },
];

export default function IndustryGuide() {
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");

  const selectedIndustry = selected ? INDUSTRIES.find(i => i.id === selected) : null;
  const filtered = INDUSTRIES.filter(ind =>
    ind.name.toLowerCase().includes(search.toLowerCase())
  );

  if (selectedIndustry) return (
    <div style={{ fontFamily: "'DM Sans','Segoe UI',sans-serif", background: BG, minHeight: "100vh", maxWidth: 430, margin: "0 auto" }}>
      <div style={{ background: `linear-gradient(135deg, ${NAVY} 0%, #2C5282 100%)`, padding: "16px 20px 20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
          <span style={{ fontSize: 20 }}>⬡</span>
          <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 10, letterSpacing: 2, textTransform: "uppercase" }}>Fastener Companion</span>
        </div>
        <div style={{ color: WHITE, fontSize: 18, fontWeight: 800 }}>{selectedIndustry.icon} {selectedIndustry.name}</div>
      </div>
      <div style={{ padding: "14px 16px" }}>
        <button onClick={() => setSelected(null)} style={{ background: "none", border: "none", cursor: "pointer", color: NAVY, fontSize: 13, fontWeight: 700, fontFamily: "inherit", marginBottom: 14, padding: 0 }}>← Industries</button>

        {[
          { label: "Primary Grades", items: selectedIndustry.primary_grades, color: "#2563EB", icon: "⬡" },
          { label: "Common Coatings", items: selectedIndustry.primary_coatings, color: "#059669", icon: "??" },
          { label: "Key Standards", items: selectedIndustry.key_standards, color: NAVY, icon: "??" },
        ].map((section, i) => (
          <div key={i} style={{ background: WHITE, border: `1px solid ${BORDER}`, borderRadius: 12, overflow: "hidden", marginBottom: 10 }}>
            <div style={{ background: section.color, padding: "8px 14px" }}>
              <div style={{ color: WHITE, fontSize: 12, fontWeight: 700 }}>{section.icon} {section.label}</div>
            </div>
            {section.items.map((item, j) => (
              <div key={j} style={{ padding: "8px 14px", borderBottom: `1px solid ${BORDER}`, background: j % 2 === 0 ? WHITE : ROW_ALT, display: "flex", gap: 8 }}>
                <span style={{ color: section.color, flexShrink: 0 }}>•</span>
                <div style={{ fontSize: 12, color: TEXT, lineHeight: 1.5 }}>{item}</div>
              </div>
            ))}
          </div>
        ))}

        <div style={{ background: "#FFF1F2", border: "1px solid #FECDD3", borderRadius: 12, overflow: "hidden", marginBottom: 10 }}>
          <div style={{ background: "#DC2626", padding: "8px 14px" }}><div style={{ color: WHITE, fontSize: 12, fontWeight: 700 }}>⚠ Common Problems in This Industry</div></div>
          {selectedIndustry.common_problems.map((item, i) => (
            <div key={i} style={{ padding: "8px 14px", borderBottom: `1px solid #FECDD3`, background: i % 2 === 0 ? WHITE : "#FFF5F5", display: "flex", gap: 8 }}>
              <span style={{ color: "#DC2626", flexShrink: 0 }}>⚠</span>
              <div style={{ fontSize: 12, color: TEXT, lineHeight: 1.5 }}>{item}</div>
            </div>
          ))}
        </div>

        <div style={{ background: STAR_BG, border: `1px solid ${STAR_BORDER}`, borderLeft: `4px solid ${AMBER}`, borderRadius: 12, padding: "12px 14px", marginBottom: 14 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#92400E", marginBottom: 4 }}>?? Availability Note</div>
          <div style={{ fontSize: 12, color: TEXT, lineHeight: 1.5 }}>{selectedIndustry.cots_note}</div>
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ fontFamily: "'DM Sans','Segoe UI',sans-serif", background: BG, minHeight: "100vh", maxWidth: 430, margin: "0 auto" }}>
      <div style={{ background: `linear-gradient(135deg, ${NAVY} 0%, #2C5282 100%)`, padding: "16px 20px 20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
          <span style={{ fontSize: 20 }}>⬡</span>
          <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 10, letterSpacing: 2, textTransform: "uppercase" }}>Fastener Companion</span>
        </div>
        <div style={{ color: WHITE, fontSize: 20, fontWeight: 800, marginBottom: 2 }}>Industry Application Guide</div>
        <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 11 }}>IFI 7th Ed. · ASTM · AISC · NACE · ASME · FDA · ABS</div>
        <div style={{ background: WHITE, borderRadius: 12, display: "flex", alignItems: "center", padding: "10px 14px", gap: 8, marginTop: 14, boxShadow: "0 2px 8px rgba(0,0,0,0.15)" }}>
          <span style={{ color: MUTED }}>??</span>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search industries..."
            style={{ background: "none", border: "none", outline: "none", color: TEXT, fontSize: 14, flex: 1, fontFamily: "inherit" }} />
          {search && <span onClick={() => setSearch("")} style={{ color: MUTED, cursor: "pointer" }}>✕</span>}
        </div>
      </div>

      <div style={{ padding: "12px 16px 24px", display: "flex", flexDirection: "column", gap: 10 }}>
        {filtered.map((industry) => (
          <div key={industry.id} onClick={() => setSelected(industry.id)}
            style={{ background: industry.star ? STAR_BG : WHITE, border: `1px solid ${BORDER}`, borderLeft: `4px solid ${industry.color}`, borderRadius: 12, padding: "14px", cursor: "pointer", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 22 }}>{industry.icon}</span>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    {industry.star && <span style={{ color: AMBER, fontSize: 11 }}>★</span>}
                    <span style={{ fontSize: 14, fontWeight: 800, color: NAVY }}>{industry.name}</span>
                  </div>
                </div>
              </div>
              <span style={{ color: MUTED }}>›</span>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
              {industry.primary_grades.slice(0, 2).map(g => (
                <div key={g} style={{ background: industry.color + "15", border: `1px solid ${industry.color}30`, borderRadius: 6, padding: "2px 8px", fontSize: 10, fontWeight: 600, color: industry.color }}>{g.split(" ")[0]} {g.split(" ")[1] || ""}</div>
              ))}
              <div style={{ background: ROW_ALT, border: `1px solid ${BORDER}`, borderRadius: 6, padding: "2px 8px", fontSize: 10, color: MUTED }}>+{industry.primary_grades.length - 2} more</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
