// ============================================================
// BATCH 03 — DIMENSIONAL REFERENCE, STRENGTH DATA & ADVISORY TOOLS
// Fastener Companion App
//
// Named exports — import as:
//   import { CoatingGuide, BoltDimensions, NutDimensions,
//            WasherSizes, ProofLoadTensile, HardnessReference,
//            DesignAdvisor, SubstitutionAdvisor,
//            ConflictChecker } from './batch-03-dimensional-advisory'
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
// CoatingGuide
// ════════════════════════════════════════════════════

// ─── DATA ─────────────────────────────────────────────────────────────────────
// Sources: ASTM F1941/F1941M, ASTM A153, ASTM B633, ASTM F2329,
// ISO 10683 (zinc flake), MIL-STD-171, Fastenal Engineering Resources,
// Portland Bolt coating guide, Boltcouncil.org HE research (Brahimi),
// Southwestern Plating technical data, IFI Fastener Standards 7th Ed.

const COATINGS = [
  {
    id: "zinc_electroplate",
    name: "Zinc Electroplating",
    shortName: "Zinc Plate / EG",
    category: "Electroplated",
    he_risk: "HIGH",
    standard: "ASTM F1941/F1941M",
    color: "#2563EB",
    bg: "#EFF6FF",
    cots: "COTS — Widely Available",
    cots_color: "#059669",
    appearance: "Bright silver (clear chromate) or yellow (yellow chromate) or black",
    thickness: "0.0002\"–0.0005\" (5–13 microns) typical",
    corrosion_resistance: "48–200 hours salt spray (ASTM B117) depending on chromate",
    temp_limit: "Up to ~250°F (121°C) — chromate degrades above this",
    thread_effect: "May affect thread fit — check after plating on tight tolerance threads",
    he_detail: "Electroplating introduces hydrogen during acid cleaning/pickling stage. Hydrogen is absorbed into the steel and trapped by the zinc coating. HIGH RISK for Grade 8, A490, 10.9, 12.9, and any fastener above HRC 39.",
    baking_required: "REQUIRED for fasteners above HRC 40. Strongly recommended for HRC 35–39. Must bake within 4 hours of plating at 375°F (191°C) for minimum 3 hours (commercial standard) to 8+ hours for high-strength.",
    baking_standard: "ASTM F1941 — bake within 4 hours of plating. Temperature 350–450°F (177–232°C). Typical duration 3–8 hours. Grade BD (A354) requires 10 hours minimum per revised standard.",
    safe_for: ["Grade 2 (unthreaded)", "Grade 5", "SAE Grade 2", "Low-carbon steel", "Fasteners below HRC 34"],
    not_safe_for: ["Grade 8 without baking", "A490 without baking", "10.9 without baking", "12.9 without baking", "SHCS A574 without baking", "Any fastener above HRC 39 without baking"],
    substitution_note: "Widely available. Most common fastener finish. Clear, yellow, and black chromate variants all standard COTS.",
    star: true,
  },
  {
    id: "hot_dip_galv",
    name: "Hot-Dip Galvanizing",
    shortName: "HDG / Hot-Dip Galv",
    category: "Hot-Dip",
    he_risk: "NONE",
    standard: "ASTM A153 (hardware) / ASTM F2329 (fasteners)",
    color: "#059669",
    bg: "#F0FDF4",
    cots: "COTS — Widely Available",
    cots_color: "#059669",
    appearance: "Dull gray/matte silver — rough texture",
    thickness: "1.0–4.3 mils (25–109 microns) — much thicker than electroplate",
    corrosion_resistance: "1,000+ hours salt spray. Provides sacrificial cathodic protection.",
    temp_limit: "Up to ~392°F (200°C) — zinc-iron alloy layer stable at moderate temperatures",
    thread_effect: "SIGNIFICANT — HDG adds substantial thickness. External threads must be oversized (class 2A tolerance) before galvanizing. Internal threads must be re-tapped or chased after galvanizing. Specify with supplier.",
    he_detail: "Hot-dip galvanizing does NOT introduce hydrogen embrittlement. The process uses molten zinc at 450°C (842°F) — no acid absorption mechanism. No HE risk from the coating process itself.",
    baking_required: "NOT REQUIRED — no HE risk from process",
    baking_standard: "N/A — however, NEVER galvanize Grade 8, A490, or 12.9 fasteners. Not because of HE from galvanizing, but because the high temperature of galvanizing can affect the temper of high-strength fasteners and the combination with service conditions creates HE risk.",
    safe_for: ["Grade 2", "Grade 5", "A307", "A325 (with oversized threads)", "A36 structural steel", "F1554 anchor bolts", "General structural applications"],
    not_safe_for: ["Grade 8 — PROHIBITED per AISC", "A490 — PROHIBITED", "12.9 — PROHIBITED", "10.9 — NOT recommended", "Any fastener above 150,000 psi tensile — check with engineer"],
    substitution_note: "Widely available. Standard for outdoor structural and construction fasteners. Nuts must be tapped oversize to account for zinc buildup.",
    star: true,
  },
  {
    id: "mechanical_galv",
    name: "Mechanical Galvanizing",
    shortName: "Mech. Galv / Mech. Zinc",
    category: "Mechanical",
    he_risk: "VERY LOW",
    standard: "ASTM B695",
    color: "#059669",
    bg: "#F0FDF4",
    cots: "COTS — Available (less common than electroplate or HDG)",
    cots_color: "#D97706",
    appearance: "Matte silver/gray — similar to HDG but smoother",
    thickness: "0.5–3.0 mils (13–76 microns) — thicker than electroplate, thinner than HDG",
    corrosion_resistance: "500–1,000+ hours salt spray depending on thickness",
    temp_limit: "Similar to electroplate — ~250°F",
    thread_effect: "Less thread impact than HDG. Still adds measurable thickness — verify thread fit.",
    he_detail: "Mechanical galvanizing uses abrasive blasting (not acid cleaning) to prepare the surface, then tumbles parts with zinc powder and glass beads. No acid = no hydrogen introduction. Very low HE risk — the preferred alternative to electroplating for high-strength fasteners.",
    baking_required: "NOT REQUIRED — process does not introduce significant hydrogen",
    baking_standard: "ASTM B695. No baking requirement. This is the key advantage over electroplating for high-strength fasteners.",
    safe_for: ["Grade 8", "Grade 5", "A354 BD", "A325", "High-strength fasteners where HDG is not acceptable", "Lock washers (spring steel)"],
    not_safe_for: ["A490 — still not recommended even with mechanical galvanizing due to HE risk from service environment", "Applications requiring very tight thread tolerances"],
    substitution_note: "Available but less commonly stocked than zinc electroplate. May require ordering. Good COTS substitute for electroplated coating on high-strength fasteners.",
    star: true,
  },
  {
    id: "zinc_flake",
    name: "Zinc Flake Coating",
    shortName: "Zinc Flake (Geomet / Dacromet / Magni)",
    category: "Dip-Spin",
    he_risk: "NONE",
    standard: "ISO 10683 / ASTM F1136",
    color: "#059669",
    bg: "#F0FDF4",
    cots: "COTS — Available (specialty finish, not all distributors stock)",
    cots_color: "#D97706",
    appearance: "Matte silver-gray — thin, uniform coating",
    thickness: "0.3–0.8 mils (8–20 microns) — very thin but highly effective",
    corrosion_resistance: "500–1,500+ hours salt spray. Superior to electroplate at equivalent thickness.",
    temp_limit: "Up to ~570°F (300°C) depending on formulation",
    thread_effect: "Minimal — thin coating, negligible effect on thread dimensions. One major advantage.",
    he_detail: "Zinc flake coatings use dip-spin application with no acid cleaning. Abrasive blasting for surface prep means no hydrogen is introduced. Zero HE risk. The premium choice for high-strength fasteners requiring corrosion protection.",
    baking_required: "NOT REQUIRED — no hydrogen introduced",
    baking_standard: "ISO 10683. No baking requirement. Increasingly specified for Grade 8, 10.9, and 12.9 fasteners in automotive and industrial applications.",
    safe_for: ["Grade 8", "Grade 5", "10.9", "12.9", "A574 SHCS", "A490 (where corrosion protection needed)", "High-strength fasteners of all types", "Applications requiring tight tolerances"],
    not_safe_for: ["Not for applications requiring bright/decorative appearance", "Some formulations not compatible with all chemicals"],
    substitution_note: "Specialty finish — not widely stocked at general distributors. May require special order. Worth specifying for critical high-strength applications. Geomet, Dacromet, and Magni are the major brands.",
    star: true,
  },
  {
    id: "black_oxide",
    name: "Black Oxide",
    shortName: "Black Oxide / BLK",
    category: "Chemical Conversion",
    he_risk: "VERY LOW",
    standard: "MIL-DTL-13924",
    color: "#374151",
    bg: "#F8FAFC",
    cots: "COTS — Widely Available",
    cots_color: "#059669",
    appearance: "Matte black — distinctive appearance",
    thickness: "Essentially zero — no measurable dimensional change",
    corrosion_resistance: "Very limited — 2–4 hours salt spray without oil. With oil: 24–100 hours. NOT a corrosion-resistant finish without supplemental oil.",
    temp_limit: "Up to ~300°F (149°C)",
    thread_effect: "None — no dimensional change. A major advantage for precision threads.",
    he_detail: "Black oxide process uses alkaline (hot or cold) solutions — no acid cleaning required. Very low HE risk. Specifically chosen for socket head cap screws (Grade 12.9/A574) for this reason. Case-hardened parts do NOT need baking after black oxide.",
    baking_required: "NOT REQUIRED — no HE risk",
    baking_standard: "MIL-DTL-13924. No baking requirement for black oxide.",
    safe_for: ["Grade 8", "12.9", "A574 SHCS", "Case-hardened fasteners", "Precision thread applications", "Tooling and machinery"],
    not_safe_for: ["Outdoor or wet environments without supplemental coating", "Marine applications", "Applications requiring corrosion resistance"],
    substitution_note: "Widely available. Standard finish for socket head cap screws. Provides minimal corrosion protection — primarily for appearance and light rust prevention.",
    star: false,
  },
  {
    id: "phosphate",
    name: "Phosphate Coating",
    shortName: "Phosphate / Parkerizing",
    category: "Chemical Conversion",
    he_risk: "LOW-MEDIUM",
    standard: "MIL-DTL-16232",
    color: "#64748B",
    bg: "#F8FAFC",
    cots: "COTS — Available",
    cots_color: "#D97706",
    appearance: "Matte gray-black or dark gray — porous surface",
    thickness: "Minimal — 0.1–1.0 mil",
    corrosion_resistance: "Very limited alone. Used as a base for paint, oil, or wax — combined protection can be significant.",
    temp_limit: "Up to ~300°F with oil",
    thread_effect: "Minimal dimensional change",
    he_detail: "Phosphate process uses acidic phosphoric acid solutions — moderate HE risk. Less aggressive than electroplating but can introduce some hydrogen. Typically not specified for Grade 8 or higher without baking.",
    baking_required: "RECOMMENDED for high-strength fasteners (Grade 8 and above)",
    baking_standard: "MIL-DTL-16232. Baking recommended for high-hardness parts.",
    safe_for: ["Grade 5 and below", "Applications where paint adhesion is needed", "Indoor applications with supplemental oil"],
    not_safe_for: ["Outdoor or corrosive environments without supplemental coating", "Grade 8 without baking"],
    substitution_note: "Primarily used as a base coat for paint or as a temporary rust preventative. Not a standalone corrosion coating.",
    star: false,
  },
  {
    id: "cadmium",
    name: "Cadmium Plating",
    shortName: "Cadmium / Cad Plate",
    category: "Electroplated",
    he_risk: "HIGH",
    standard: "AMS-QQ-P-416 / ASTM B766",
    color: "#DC2626",
    bg: "#FFF1F2",
    cots: "LIMITED — Specialty/Military Only",
    cots_color: "#DC2626",
    appearance: "Bright silver — similar to zinc but slightly more yellow",
    thickness: "0.0002\"–0.0005\" (5–13 microns)",
    corrosion_resistance: "Excellent — superior to zinc in marine and salt environments. 200–500 hours salt spray.",
    temp_limit: "Up to ~450°F (232°C) — cadmium melts at 610°F — baking temperature must stay below this",
    thread_effect: "Similar to zinc electroplate — affects tight tolerances",
    he_detail: "Cadmium electroplating carries same HE risk as zinc electroplating — acid cleaning introduces hydrogen. Baking required for high-strength fasteners. Special consideration: cadmium melts at 610°F — baking temperature must be carefully controlled below this.",
    baking_required: "REQUIRED for high-strength fasteners. Baking temperature must NOT exceed 450°F (232°C) — cadmium melts at 610°F (321°C).",
    baking_standard: "AMS-QQ-P-416. Bake within 4 hours of plating. Temperature 250–375°F (121–191°C) — lower than zinc due to cadmium melt point concern.",
    safe_for: ["Military/aerospace specified applications", "Marine environments where cadmium is specified", "Applications with aluminum contact (good galvanic compatibility)"],
    not_safe_for: ["EU RoHS/REACH regulated products — cadmium is restricted", "Food contact applications", "Most commercial applications — largely replaced by zinc flake"],
    substitution_note: "NOT widely available commercially — primarily military/aerospace. Regulated under RoHS/REACH in EU. Most commercial applications have substituted zinc flake (Geomet/Dacromet) or zinc-nickel electroplate.",
    star: false,
  },
  {
    id: "nickel_chrome",
    name: "Nickel / Chrome Plating",
    shortName: "Nickel / Chrome",
    category: "Electroplated",
    he_risk: "HIGH",
    standard: "ASTM B456 / ASTM B177",
    color: "#7C3AED",
    bg: "#F5F3FF",
    cots: "COTS — Available (decorative/specialty)",
    cots_color: "#D97706",
    appearance: "Bright chrome or nickel finish — decorative",
    thickness: "Varies — 0.0002\"–0.001\" typical",
    corrosion_resistance: "Good to excellent depending on thickness and substrate preparation",
    temp_limit: "Chrome: up to 1,200°F. Nickel: up to 800°F.",
    thread_effect: "Affects thread dimensions — verify fit after plating",
    he_detail: "Both nickel and chrome electroplating use acid cleaning — same HE risk as zinc electroplating. Chrome plating particularly aggressive — chromic acid cleaning. Baking essential for high-strength fasteners.",
    baking_required: "REQUIRED for high-strength fasteners. Standard baking procedure applies.",
    baking_standard: "ASTM B456. Baking conditions per ASTM F1941 principles.",
    safe_for: ["Decorative applications", "Moderate strength fasteners", "Corrosion-resistant applications where appearance matters"],
    not_safe_for: ["High-strength fasteners without baking", "Hexavalent chrome now restricted under RoHS/REACH"],
    substitution_note: "Used primarily for decorative and specialty applications. Not typically a standard fastener finish for industrial use.",
    star: false,
  },
  {
    id: "passivation",
    name: "Passivation (Stainless)",
    shortName: "Passivation",
    category: "Chemical Treatment",
    he_risk: "NONE",
    standard: "ASTM A967 / AMS 2700",
    color: "#0891B2",
    bg: "#F0FDFE",
    cots: "Standard treatment for stainless — not a visible coating",
    cots_color: "#059669",
    appearance: "No visual change — enhances existing stainless appearance",
    thickness: "No measurable thickness — chemical treatment only",
    corrosion_resistance: "Restores and enhances natural passive oxide layer on stainless steel",
    temp_limit: "Same as base stainless material",
    thread_effect: "None — no dimensional change",
    he_detail: "Passivation is a chemical treatment that removes free iron and contaminants from the stainless surface, restoring the chromium oxide passive layer. Uses nitric or citric acid solutions. Very low HE risk — stainless is not susceptible to same HE mechanism as carbon steel.",
    baking_required: "NOT REQUIRED",
    baking_standard: "ASTM A967. No baking requirement.",
    safe_for: ["All stainless steel fasteners", "Standard treatment after machining or fabrication of stainless parts"],
    not_safe_for: ["Carbon steel — passivation is only for stainless"],
    substitution_note: "Not a coating — a standard treatment for stainless. Most quality stainless fasteners are passivated as part of standard manufacturing.",
    star: false,
  },
];

const HE_RISK_MATRIX = [
  { grade: "Grade 2", hrc: "B70–B100", tensile: "74 ksi", he_susceptibility: "VERY LOW", safe_coatings: "All coatings — no restriction", restricted_coatings: "None", color: "#059669" },
  { grade: "Grade 5", hrc: "C25–C34", tensile: "120 ksi", he_susceptibility: "LOW", safe_coatings: "All coatings. Baking recommended but not mandatory for electroplate.", restricted_coatings: "None restricted, baking best practice", color: "#2563EB" },
  { grade: "Grade 8", hrc: "C33–C39", tensile: "150 ksi", he_susceptibility: "MODERATE", safe_coatings: "HDG, mechanical galv, zinc flake, black oxide. Electroplate with baking.", restricted_coatings: "Electroplate without baking — HIGH RISK. HDG technically permitted but not recommended.", color: "#D97706" },
  { grade: "A325", hrc: "C25–C34", tensile: "120 ksi", he_susceptibility: "LOW", safe_coatings: "HDG standard for A325. Mechanical galv acceptable.", restricted_coatings: "Electroplate not typical for structural bolts", color: "#2563EB" },
  { grade: "A490", hrc: "C33–C38", tensile: "150 ksi", he_susceptibility: "HIGH", safe_coatings: "Plain (uncoated) or zinc flake only. Mechanical galv with caution.", restricted_coatings: "HDG — PROHIBITED. Electroplate — PROHIBITED. Hot-dip galvanizing PROHIBITED.", color: "#DC2626" },
  { grade: "A354 BD", hrc: "C33–C39", tensile: "150 ksi", he_susceptibility: "MODERATE-HIGH", safe_coatings: "Zinc flake, mechanical galv, black oxide. Electroplate with extended baking (10 hrs).", restricted_coatings: "Electroplate without baking — HIGH RISK", color: "#D97706" },
  { grade: "A193 B7", hrc: "C35 max", tensile: "125 ksi", he_susceptibility: "MODERATE", safe_coatings: "Usually plain or phosphate + oil. Zinc flake for corrosion resistance.", restricted_coatings: "Electroplate with caution — baking required", color: "#D97706" },
  { grade: "ISO 8.8", hrc: "C22–C32", tensile: "116 ksi", he_susceptibility: "LOW", safe_coatings: "All coatings with appropriate baking for electroplate.", restricted_coatings: "None restricted with proper procedure", color: "#2563EB" },
  { grade: "ISO 10.9", hrc: "C32–C39", tensile: "151 ksi", he_susceptibility: "MODERATE-HIGH", safe_coatings: "Zinc flake, mechanical galv, black oxide preferred. Electroplate with baking.", restricted_coatings: "Electroplate without baking — HIGH RISK", color: "#D97706" },
  { grade: "ISO 12.9", hrc: "C38–C44", tensile: "177 ksi", he_susceptibility: "VERY HIGH", safe_coatings: "Black oxide standard. Zinc flake acceptable. Mechanical galv with special process.", restricted_coatings: "Electroplate — VERY HIGH RISK even with baking. HDG — PROHIBITED.", color: "#DC2626" },
  { grade: "A574 SHCS", hrc: "C39–C45", tensile: "180 ksi", he_susceptibility: "VERY HIGH", safe_coatings: "Black oxide standard and safest. Zinc flake acceptable. Special processing required for any electroplate.", restricted_coatings: "Electroplate — VERY HIGH RISK. Acid cleaning processes prohibited without special controls.", color: "#DC2626" },
];

const BAKING_GUIDE = [
  { aspect: "When to bake", detail: "Required for all electroplated fasteners above HRC 40. Strongly recommended for HRC 35–39. Not required for HRC 34 and below per ASTM F1941." },
  { aspect: "Timing — critical", detail: "Must bake within 4 hours of electroplating. Hydrogen diffuses into steel during plating — the longer you wait, the more it migrates to grain boundaries and the harder it is to remove." },
  { aspect: "Temperature range", detail: "350–450°F (177–232°C) for most fasteners. Must stay below original tempering temperature to avoid reducing fastener strength. Cadmium-plated parts: max 375°F (191°C) due to cadmium melt point." },
  { aspect: "Duration", detail: "Minimum 3 hours (commercial standard per Southwestern Plating). 8+ hours for Grade 8. 10 hours minimum for A354 BD per revised standard. Longer baking provides more thorough hydrogen removal." },
  { aspect: "Grade BD special requirement", detail: "ASTM revised standard requires 10 hours minimum baking for A354 BD (Grade 8 equivalent) electroplated fasteners. Previous requirement was 4 hours — verify supplier is using current standard." },
  { aspect: "After baking", detail: "Apply chromate finish AFTER baking — temperatures above 150°F (66°C) damage chromate films. Baking must be complete before chromate application." },
  { aspect: "Verification", detail: "ASTM F1940 provides test methods for process control verification. For critical applications, require certification of baking time and temperature from plating supplier." },
];

const heRiskColor = (r) => {
  if (r === "VERY HIGH" || r === "HIGH") return "#DC2626";
  if (r === "MODERATE-HIGH" || r === "MODERATE") return "#D97706";
  if (r === "LOW-MEDIUM" || r === "LOW") return "#2563EB";
  return "#059669";
};

const heRiskBg = (r) => {
  if (r === "VERY HIGH" || r === "HIGH") return "#FFF1F2";
  if (r === "MODERATE-HIGH" || r === "MODERATE") return "#FFF8E7";
  if (r === "LOW-MEDIUM" || r === "LOW") return "#EFF6FF";
  return "#F0FDF4";
};



// ════════════════════════════════════════════════════
// DesignAdvisor
// ════════════════════════════════════════════════════

// ─── RECOMMENDATION LOGIC ────────────────────────────────────────────────────
// Based on: SAE J429, ASTM A307/A325/A354/A490/A193, ISO 898-1, ISO 3506,
// ASTM F1941 (coatings/HE), AISC (structural), ASME PCC-1 (flanges),
// IFI 7th Edition, Fastenal Engineering Reference

function generateRecommendation(inputs) {
  const { joint, load, environment, baseMaterial, assembly, standard } = inputs;

  let type = "Hex Cap Screw";
  let size_note = "Size to be determined by load calculation";
  let grade = "";
  let grade_spec = "";
  let material = "";
  let coating = "";
  let coating_spec = "";
  let nut = "";
  let washer = "";
  let torque_note = "";
  let cots = "★ COTS — Widely Available";
  let cots_color = "#059669";
  let why = [];
  let warnings = [];
  let conflicts = [];
  let upgrade_path = "";

  // ─── HEAD TYPE ─────────────────────────────────────────────────────────────
  if (assembly === "limited_access") {
    type = "Socket Head Cap Screw (SHCS)";
    why.push("Socket head selected for limited tool access — hex key fits in tight spaces where standard wrench cannot.");
  } else if (assembly === "frequent_disassembly") {
    type = "Hex Cap Screw";
    why.push("Hex cap screw selected for frequent disassembly — best tool engagement durability over many cycles.");
  } else if (joint === "structural") {
    type = "Heavy Hex Structural Bolt";
    why.push("Heavy hex head required for structural applications — provides larger bearing area and tool engagement per AISC.");
  } else if (joint === "flange") {
    type = "Stud Bolt (Double End)";
    why.push("Stud bolt selected for flange application — standard per ASME B16.5 and ASME PCC-1.");
  }

  // ─── GRADE / MATERIAL ──────────────────────────────────────────────────────
  const isHighTemp = environment === "high_temp";
  const isMarine = environment === "marine";
  const isChemical = environment === "chemical";
  const isFoodGrade = environment === "food_grade";
  const isFatigue = load === "fatigue" || load === "vibration";
  const isShear = load === "shear" || load === "combined";
  const isStructural = joint === "structural";
  const isFlange = joint === "flange";
  const isSS = baseMaterial === "stainless" || baseMaterial === "aluminum";
  const needsEngineering = standard === "aisc" || standard === "asme_viii" || standard === "asme_b165";

  if (isFoodGrade || environment === "food_grade") {
    grade = "A2-70 / A4-70";
    grade_spec = "ISO 3506 — Stainless";
    material = "316 Stainless Steel (A4) — FDA compliant, chloride resistant";
    coating = "Passivation (standard treatment)";
    coating_spec = "ASTM A967";
    nut = "A4 stainless hex nut (ISO 3506)";
    washer = "A4 stainless flat washer";
    cots = "COTS — Available";
    cots_color = "#D97706";
    why.push("316 Stainless (A4) required for food contact — FDA/USDA compliant, resists cleaning chemicals and chlorides.");
    why.push("Passivation restores and enhances protective oxide layer after manufacturing.");
  } else if (isMarine) {
    grade = "A4-70 or A4-80";
    grade_spec = "ISO 3506 — 316 Stainless";
    material = "316 Austenitic Stainless Steel — molybdenum addition provides chloride resistance";
    coating = "Passivation";
    coating_spec = "ASTM A967";
    nut = "A4 stainless hex nut";
    washer = "A4 stainless flat washer";
    cots = "COTS — Available (less common than 304)";
    cots_color = "#D97706";
    why.push("Marine/saltwater environment requires 316 SS — 304 SS will pit in chloride environments.");
    why.push("A4-80 provides higher strength (800 MPa tensile) if load demands it.");
    warnings.push("Always apply anti-seize to stainless fastener threads — galling is permanent and irreversible.");
    warnings.push("If base material is aluminum, use isolating neoprene washers — stainless/aluminum galvanic couple will corrode the aluminum.");
  } else if (isHighTemp) {
    grade = "A193 Grade B7";
    grade_spec = "ASTM A193 — Alloy steel stud bolt";
    material = "4140/4142 Chromoly alloy steel — retains strength to ~700°F (371°C)";
    coating = "Plain (bare) or phosphate + oil";
    coating_spec = "MIL-DTL-16232";
    nut = "A194 Grade 2H heavy hex nut — REQUIRED with B7";
    washer = "Hardened flat washer (F436 or equivalent)";
    type = isFlange ? "Stud Bolt (Double End)" : "Hex Cap Screw — B7 material";
    cots = "★ COTS — Widely Available";
    cots_color = "#059669";
    why.push("ASTM A193 B7 (4140 Cr-Mo alloy) is the industry standard for elevated temperature bolting — retains strength where plain carbon steel loses it.");
    why.push("A194 Grade 2H nut is the required pairing for B7 studs in all flange and pressure vessel applications.");
    warnings.push("For sour gas / H2S service, specify A193 B7M (HRC 22 max) — standard B7 is too hard for SSC resistance.");
    warnings.push("Above 750°F, consider upgrading to Inconel or specialty alloy — consult engineer.");
  } else if (isStructural) {
    grade = "A325 Type 1";
    grade_spec = "ASTM F3125 Grade A325";
    material = "Medium carbon steel or alloy steel, quenched & tempered";
    coating = environment === "outdoor" ? "Hot-Dip Galvanized (HDG)" : "Plain (mill scale)";
    coating_spec = environment === "outdoor" ? "ASTM A153" : "None";
    nut = "A563 Grade DH Heavy Hex Nut — REQUIRED";
    washer = "F436 Hardened Washer — REQUIRED under head and nut";
    cots = "★ COTS — Widely Available";
    cots_color = "#059669";
    why.push("A325 (now F3125 Gr. A325) is the standard for structural steel connections per AISC.");
    why.push("Heavy hex head, A563 DH nut, and F436 hardened washers are all required by AISC — not optional.");
    warnings.push("A325 requires pretensioning for slip-critical connections per AISC — snug-tight alone is not acceptable for all structural applications.");
    warnings.push("DO NOT substitute standard hex nuts for A563 DH — insufficient strength.");
    if (environment === "outdoor") warnings.push("HDG threads must be chased or nuts ordered oversized — zinc buildup affects thread fit.");
  } else if (baseMaterial === "aluminum") {
    grade = "18-8 Stainless (A2-70) or Aluminum";
    grade_spec = "ISO 3506 A2-70 or Aluminum alloy";
    material = "304 SS (A2) for moderate environments — or aluminum alloy for lightweight/low-galvanic";
    coating = "Passivation (SS) or Anodize (aluminum)";
    coating_spec = "ASTM A967 (SS passivation)";
    nut = "Match fastener material";
    washer = "Neoprene or nylon isolating washer if SS in aluminum structure";
    cots = "COTS — Available";
    cots_color = "#D97706";
    why.push("Aluminum base material creates galvanic corrosion risk — fastener material selection is critical.");
    why.push("Stainless is acceptable WITH isolation washers. Aluminum fasteners eliminate galvanic concern entirely but have lower strength.");
    warnings.push("NEVER use copper, brass, or plain carbon steel directly against aluminum — galvanic corrosion will attack the aluminum aggressively.");
    conflicts.push("⚡ Galvanic Risk: Stainless fastener in aluminum without isolation = accelerated corrosion of aluminum. Use isolating neoprene or nylon washers under head, nut, and through the hole.");
  } else if (isFatigue || load === "vibration") {
    grade = "SAE Grade 8";
    grade_spec = "SAE J429 Grade 8";
    material = "Alloy steel, quenched & tempered";
    coating = environment === "outdoor" ? "Zinc electroplate (ASTM F1941) or Zinc Flake" : "Zinc electroplate (ASTM F1941) clear chromate";
    coating_spec = "ASTM F1941";
    nut = "Grade 8 hex nut (SAE J995) or nyloc prevailing torque nut";
    washer = "Hardened flat washer or Nordlock washer for high vibration";
    cots = "★ COTS — Widely Available";
    cots_color = "#059669";
    why.push("Fatigue/vibration loading requires Grade 8 minimum — higher preload maintains joint clamping force under cyclic loads.");
    why.push("High preload is the single most effective fatigue prevention measure — under-torquing is the leading cause of fatigue failure.");
    warnings.push("⚠ HE RISK: Grade 8 is susceptible to hydrogen embrittlement. If zinc electroplating, require baking per ASTM F1941 (375°F, minimum 3 hours, within 4 hours of plating).");
    warnings.push("Consider zinc flake coating (Geomet/Dacromet) as a zero-HE-risk alternative to electroplate for Grade 8.");
    upgrade_path = "For severe vibration: add Nordlock washers or thread insert with prevailing torque. For very high cycle fatigue: consult engineer for fatigue analysis.";
  } else if (joint === "machinery" || joint === "general") {
    if (load === "impact" || load === "heavy") {
      grade = "SAE Grade 8";
      grade_spec = "SAE J429 Grade 8";
      material = "Alloy steel, quenched & tempered";
      coating = "Zinc electroplate (ASTM F1941)";
      coating_spec = "ASTM F1941";
      nut = "Grade 5 or Grade 8 hex nut";
      washer = "SAE flat washer";
      cots = "★ COTS — Widely Available";
      cots_color = "#059669";
      why.push("Impact/heavy loading requires Grade 8 for adequate proof load and yield strength.");
      warnings.push("⚠ HE RISK: Require baking per ASTM F1941 if zinc electroplated.");
    } else {
      grade = "SAE Grade 5";
      grade_spec = "SAE J429 Grade 5";
      material = "Medium carbon steel, quenched & tempered";
      coating = environment === "outdoor" ? "Hot-Dip Galvanized (ASTM A153) or Zinc Flake" : "Zinc electroplate (ASTM F1941) clear chromate";
      coating_spec = environment === "outdoor" ? "ASTM A153" : "ASTM F1941";
      nut = "Grade 5 hex nut (SAE J995)";
      washer = "SAE flat washer (ASME B18.21.1)";
      cots = "★ COTS — Widely Available";
      cots_color = "#059669";
      why.push("Grade 5 is the standard for general machinery and industrial applications — adequate strength for most non-critical joints at best cost/availability.");
      why.push("Medium carbon steel Q&T provides 120,000 psi tensile (≤1\") with good toughness and ductility.");
    }
  } else {
    grade = "SAE Grade 5";
    grade_spec = "SAE J429 Grade 5";
    material = "Medium carbon steel, quenched & tempered";
    coating = "Zinc electroplate (ASTM F1941) clear chromate";
    coating_spec = "ASTM F1941";
    nut = "Grade 5 hex nut (SAE J995)";
    washer = "SAE flat washer (ASME B18.21.1)";
    cots = "★ COTS — Widely Available";
    cots_color = "#059669";
    why.push("Grade 5 is the standard recommendation for general purpose bolted joints — best balance of strength, cost, and availability.");
  }

  // ─── TORQUE GUIDANCE ───────────────────────────────────────────────────────
  if (grade.includes("Grade 8") || grade.includes("A490") || grade.includes("10.9") || grade.includes("12.9")) {
    torque_note = "Use calibrated torque wrench. Refer to Torque Chart for specific values by size. Reduce torque 25–35% if anti-seize or lubricant applied.";
  } else if (grade.includes("B7") || grade.includes("A193")) {
    torque_note = "Torque per ASME PCC-1 or engineering specification. Multiple passes in star pattern required for flanges.";
  } else if (grade.includes("A325") || grade.includes("A490")) {
    torque_note = "Pretensioning required per AISC. Use calibrated wrench method or turn-of-nut method. Do not use impact wrench for final torque.";
  } else if (grade.includes("Stainless") || grade.includes("A2") || grade.includes("A4")) {
    torque_note = "Apply anti-seize to ALL stainless threads before assembly. Reduce dry torque values by 25–30%. Assemble slowly — stainless on stainless galls instantly at high speed.";
  } else {
    torque_note = "Use calibrated torque wrench. Refer to Torque Chart for specific values by size. Reduce torque 25–35% if lubricated or anti-seize applied.";
  }

  // ─── ADDITIONAL CONFLICTS ──────────────────────────────────────────────────
  if ((grade.includes("Grade 8") || grade.includes("10.9") || grade.includes("12.9")) && coating.includes("electroplate")) {
    if (!conflicts.some(c => c.includes("HE"))) {
      conflicts.push("⚡ HE RISK: High-strength fastener + electroplating requires baking per ASTM F1941 (within 4 hrs of plating, 350–450°F, 3–10 hrs). Without baking, risk of sudden brittle fracture below rated load.");
    }
  }

  if (isFatigue && assembly === "no_locking") {
    conflicts.push("⚠ Fatigue loading without locking mechanism: Add nyloc nut, threadlocker, or Nordlock washer. Vibration loosening is the leading cause of fatigue failure.");
  }

  return {
    type, grade, grade_spec, material, coating, coating_spec,
    nut, washer, torque_note, cots, cots_color, size_note,
    why, warnings, conflicts, upgrade_path, needsEngineering
  };
}

// ─── STEPS ────────────────────────────────────────────────────────────────────
const STEPS = [
  {
    id: "joint",
    title: "Joint Type",
    subtitle: "What is this fastener doing?",
    icon: "??",
    options: [
      { value: "general", label: "General Assembly", desc: "Machinery, equipment, maintenance" },
      { value: "structural", label: "Structural / Load-Bearing", desc: "Steel construction, bridges, heavy frames" },
      { value: "flange", label: "Flange / Pressure Vessel", desc: "Pipe flanges, pressure equipment, vessels" },
      { value: "precision", label: "Precision / Tight Tolerance", desc: "Instruments, gauges, optical, medical" },
      { value: "machinery", label: "Industrial Machinery", desc: "Manufacturing equipment, conveyors, presses" },
    ],
  },
  {
    id: "load",
    title: "Load Type",
    subtitle: "How is the fastener being loaded?",
    icon: "⚡",
    options: [
      { value: "tension", label: "Primarily Tension", desc: "Clamping force, pressure containment" },
      { value: "shear", label: "Primarily Shear", desc: "Lateral forces, pin-loaded connections" },
      { value: "combined", label: "Combined Tension + Shear", desc: "Mixed loading condition" },
      { value: "fatigue", label: "Cyclic / Fatigue Loading", desc: "Repeated loading cycles" },
      { value: "vibration", label: "High Vibration", desc: "Engines, compressors, rotating equipment" },
      { value: "impact", label: "Impact / Shock Load", desc: "Sudden or dynamic loading" },
    ],
  },
  {
    id: "environment",
    title: "Environment",
    subtitle: "What conditions will the fastener be exposed to?",
    icon: "??️",
    options: [
      { value: "indoor", label: "Indoor / Controlled", desc: "Climate controlled, no corrosion concern" },
      { value: "outdoor", label: "Outdoor / Exposed", desc: "Weather, moisture, temperature cycling" },
      { value: "marine", label: "Marine / Saltwater", desc: "Coastal, offshore, submerged" },
      { value: "high_temp", label: "High Temperature", desc: "Above 400°F (204°C)" },
      { value: "chemical", label: "Chemical Exposure", desc: "Acids, solvents, industrial chemicals" },
      { value: "food_grade", label: "Food / Pharmaceutical", desc: "FDA/USDA requirements, cleanroom" },
    ],
  },
  {
    id: "baseMaterial",
    title: "Base Material",
    subtitle: "What material is being fastened?",
    icon: "??️",
    options: [
      { value: "carbon_steel", label: "Carbon / Alloy Steel", desc: "Most common structural and machinery material" },
      { value: "stainless", label: "Stainless Steel", desc: "304, 316, or other stainless alloy" },
      { value: "aluminum", label: "Aluminum", desc: "Structural or sheet aluminum" },
      { value: "cast_iron", label: "Cast Iron", desc: "Machine bases, housings, brackets" },
      { value: "mixed", label: "Mixed / Dissimilar Metals", desc: "Different metals in contact" },
    ],
  },
  {
    id: "assembly",
    title: "Assembly Conditions",
    subtitle: "How will this be installed and maintained?",
    icon: "??",
    options: [
      { value: "standard", label: "Standard Access", desc: "Normal wrench / socket access available" },
      { value: "limited_access", label: "Limited Access", desc: "Tight space — hex key preferred" },
      { value: "torque_wrench", label: "Torque Wrench Available", desc: "Precise torque application possible" },
      { value: "frequent_disassembly", label: "Frequent Disassembly", desc: "Removed regularly for maintenance" },
      { value: "permanent", label: "Permanent Assembly", desc: "Not intended for removal" },
    ],
  },
  {
    id: "standard",
    title: "Governing Standard",
    subtitle: "Is there a standard or specification that applies?",
    icon: "??",
    options: [
      { value: "none", label: "No Specific Standard", desc: "General application, best practice" },
      { value: "aisc", label: "AISC (Structural Steel)", desc: "Steel construction, structural connections" },
      { value: "asme_b165", label: "ASME B16.5 (Pipe Flanges)", desc: "Piping system flanges" },
      { value: "asme_viii", label: "ASME Section VIII (Pressure Vessels)", desc: "Pressure vessel and boiler code" },
      { value: "customer_spec", label: "Customer / Internal Spec", desc: "Specific requirement from customer or company" },
    ],
  },
];

export default function DesignAdvisor() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const currentStep = STEPS[step];
  const totalSteps = STEPS.length;
  const progress = ((step) / totalSteps) * 100;

  const handleSelect = (value) => {
    const newAnswers = { ...answers, [currentStep.id]: value };
    setAnswers(newAnswers);
    if (step < totalSteps - 1) {
      setTimeout(() => setStep(step + 1), 200);
    } else {
      const rec = generateRecommendation(newAnswers);
      setResult(rec);
      setShowResult(true);
    }
  };

  const reset = () => {
    setStep(0);
    setAnswers({});
    setResult(null);
    setShowResult(false);
  };

  const goBack = () => {
    if (step > 0) setStep(step - 1);
  };

  if (showResult && result) {
    return (
      <div style={{ fontFamily: "'DM Sans','Segoe UI',sans-serif", background: BG, minHeight: "100vh", maxWidth: 430, margin: "0 auto" }}>
        {/* HEADER */}
        <div style={{ background: `linear-gradient(135deg, ${NAVY} 0%, #2C5282 100%)`, padding: "16px 20px 20px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
            <span style={{ fontSize: 20 }}>⬡</span>
            <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 10, letterSpacing: 2, textTransform: "uppercase" }}>Fastener Companion</span>
          </div>
          <div style={{ color: WHITE, fontSize: 20, fontWeight: 800, marginBottom: 2 }}>Recommendation</div>
          <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 11 }}>SAE J429 · ASTM F3125 · A193 · ISO 898-1 · ISO 3506 · IFI 7th Ed.</div>
        </div>

        <div style={{ padding: "14px 16px" }}>

          {/* CONFLICTS — show first if any */}
          {result.conflicts.length > 0 && (
            <div style={{ background: "#FFF1F2", border: "1px solid #FECDD3", borderLeft: "4px solid #DC2626", borderRadius: 12, padding: "12px 14px", marginBottom: 12 }}>
              <div style={{ fontSize: 12, fontWeight: 800, color: "#DC2626", marginBottom: 8 }}>⚡ Conflicts Detected</div>
              {result.conflicts.map((c, i) => (
                <div key={i} style={{ fontSize: 12, color: "#9F1239", lineHeight: 1.6, marginBottom: i < result.conflicts.length - 1 ? 6 : 0 }}>{c}</div>
              ))}
            </div>
          )}

          {/* MAIN RECOMMENDATION CARD */}
          <div style={{ background: WHITE, border: `1px solid ${BORDER}`, borderRadius: 14, overflow: "hidden", marginBottom: 12, boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
            <div style={{ background: NAVY, padding: "12px 14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ color: WHITE, fontSize: 13, fontWeight: 800 }}>Recommended Specification</div>
              <div style={{ background: result.cots_color + "30", border: `1px solid ${result.cots_color}`, borderRadius: 6, padding: "2px 8px", fontSize: 9, fontWeight: 800, color: result.cots_color }}>{result.cots.split(" — ")[0]}</div>
            </div>

            {[
              { label: "Fastener Type", value: result.type, highlight: true },
              { label: "Grade / Class", value: result.grade, highlight: true },
              { label: "Standard", value: result.grade_spec },
              { label: "Material", value: result.material },
              { label: "Coating", value: result.coating },
              { label: "Coating Spec", value: result.coating_spec },
              { label: "Nut", value: result.nut },
              { label: "Washer", value: result.washer },
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", padding: "9px 14px", borderBottom: `1px solid ${BORDER}`, background: item.highlight ? STAR_BG : (i % 2 === 0 ? WHITE : ROW_ALT), gap: 12 }}>
                <div style={{ fontSize: 11, color: MUTED, fontWeight: 600, minWidth: 90, flexShrink: 0 }}>{item.label}</div>
                <div style={{ fontSize: 12, fontWeight: item.highlight ? 800 : 600, color: item.highlight ? NAVY : TEXT, lineHeight: 1.4 }}>{item.value}</div>
              </div>
            ))}

            <div style={{ padding: "10px 14px", background: "#EFF6FF", borderTop: `1px solid ${BORDER}` }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: "#2563EB", marginBottom: 3, textTransform: "uppercase", letterSpacing: 0.8 }}>Torque Guidance</div>
              <div style={{ fontSize: 11, color: TEXT, lineHeight: 1.5 }}>{result.torque_note}</div>
            </div>
          </div>

          {/* AVAILABILITY */}
          <div style={{ background: result.cots_color + "15", border: `1px solid ${result.cots_color}`, borderRadius: 10, padding: "10px 14px", marginBottom: 12, display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ fontSize: 20 }}>??</div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 800, color: result.cots_color }}>{result.cots}</div>
              <div style={{ fontSize: 11, color: TEXT, marginTop: 2 }}>Available through major industrial distributors</div>
            </div>
          </div>

          {/* WHY THIS SPEC */}
          <div style={{ background: WHITE, border: `1px solid ${BORDER}`, borderRadius: 12, overflow: "hidden", marginBottom: 10, boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
            <div style={{ background: NAVY, padding: "10px 14px" }}>
              <div style={{ color: WHITE, fontSize: 12, fontWeight: 700 }}>Why This Specification</div>
            </div>
            {result.why.map((item, i) => (
              <div key={i} style={{ padding: "9px 14px", borderBottom: `1px solid ${BORDER}`, background: i % 2 === 0 ? WHITE : ROW_ALT, display: "flex", gap: 10 }}>
                <span style={{ color: "#059669", flexShrink: 0, fontSize: 12 }}>✓</span>
                <div style={{ fontSize: 12, color: TEXT, lineHeight: 1.6 }}>{item}</div>
              </div>
            ))}
          </div>

          {/* WARNINGS */}
          {result.warnings.length > 0 && (
            <div style={{ background: STAR_BG, border: `1px solid ${STAR_BORDER}`, borderRadius: 12, overflow: "hidden", marginBottom: 10 }}>
              <div style={{ background: "#D97706", padding: "10px 14px" }}>
                <div style={{ color: WHITE, fontSize: 12, fontWeight: 700 }}>⚠ Watch Out For</div>
              </div>
              {result.warnings.map((item, i) => (
                <div key={i} style={{ padding: "9px 14px", borderBottom: `1px solid ${STAR_BORDER}`, background: i % 2 === 0 ? WHITE : STAR_BG, display: "flex", gap: 10 }}>
                  <span style={{ color: "#D97706", flexShrink: 0, fontSize: 12 }}>⚠</span>
                  <div style={{ fontSize: 12, color: TEXT, lineHeight: 1.6 }}>{item}</div>
                </div>
              ))}
            </div>
          )}

          {/* UPGRADE PATH */}
          {result.upgrade_path && (
            <div style={{ background: "#EFF6FF", border: `1px solid #BFDBFE}`, borderLeft: "4px solid #2563EB", borderRadius: 12, padding: "12px 14px", marginBottom: 10 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#2563EB", marginBottom: 4 }}>?? Upgrade Path</div>
              <div style={{ fontSize: 12, color: TEXT, lineHeight: 1.6 }}>{result.upgrade_path}</div>
            </div>
          )}

          {/* ENGINEERING NOTE */}
          {result.needsEngineering && (
            <div style={{ background: "#FFF1F2", border: "1px solid #FECDD3", borderLeft: "4px solid #DC2626", borderRadius: 12, padding: "12px 14px", marginBottom: 10 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#DC2626", marginBottom: 4 }}>?? Engineering Review Required</div>
              <div style={{ fontSize: 12, color: "#9F1239", lineHeight: 1.6 }}>This application is governed by a formal standard (AISC, ASME B16.5, or ASME Section VIII). This recommendation provides general guidance — final specification must be verified by a qualified engineer and comply with the applicable code.</div>
            </div>
          )}

          {/* SELECTED INPUTS SUMMARY */}
          <div style={{ background: WHITE, border: `1px solid ${BORDER}`, borderRadius: 12, overflow: "hidden", marginBottom: 14, boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
            <div style={{ background: "#64748B", padding: "8px 14px" }}>
              <div style={{ color: WHITE, fontSize: 11, fontWeight: 700 }}>Based On Your Inputs</div>
            </div>
            {STEPS.map((s) => {
              const answer = answers[s.id];
              const option = s.options.find(o => o.value === answer);
              return (
                <div key={s.id} style={{ display: "flex", padding: "7px 14px", borderBottom: `1px solid ${BORDER}`, background: WHITE, gap: 12 }}>
                  <div style={{ fontSize: 11, color: MUTED, minWidth: 90, flexShrink: 0 }}>{s.title}</div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: NAVY }}>{option?.label}</div>
                </div>
              );
            })}
          </div>

          {/* ACTIONS */}
          <button onClick={reset} style={{ width: "100%", background: NAVY, color: WHITE, border: "none", borderRadius: 12, padding: "14px", fontSize: 14, fontWeight: 800, cursor: "pointer", fontFamily: "inherit", marginBottom: 8 }}>
            ← New Recommendation
          </button>

          {/* DISCLAIMER */}
          <div style={{ background: "#FFF1F2", border: "1px solid #FECDD3", borderRadius: 10, padding: "10px 14px" }}>
            <div style={{ fontSize: 10, color: "#9F1239", lineHeight: 1.5 }}>
              <strong>⚠ Verify Before Use.</strong> This recommendation is based on SAE J429, ASTM F3125, A193, ISO 898-1, ISO 3506, and IFI 7th Edition. It is a starting point — not a substitute for engineering judgment. For structural, pressure vessel, and safety-critical applications, verify with a qualified engineer. Fastener Companion is a reference tool only.
            </div>
          </div>
        </div>
      </div>
    );
  }
