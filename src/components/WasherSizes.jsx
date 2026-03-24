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
// WasherSizes
// ════════════════════════════════════════════════════

// ─── DATA ─────────────────────────────────────────────────────────────────────
// Sources: ASME B18.21.1-2009 (inch series washers),
// ASME B18.22M (metric plain washers),
// SAE J1237 (flat washers), ASTM F436 (hardened washers for structural),
// ASTM F844 (unhardened flat washers), Bolt Depot washer size tables,
// MechaniCalc fastener size tables, Engineers Edge

// SAE washers: smaller ID, smaller OD than USS — used with bolts in close fitting applications
// USS washers: larger ID, larger OD — used where larger bearing surface needed
// F436: structural hardened washers — required with A325/A490 structural bolts

const SAE_WASHERS = [
  { size: "#10", id_frac: "7/32\"", id_dec: "0.219", od_frac: "1/2\"", od_dec: "0.500", thick: "0.049", id_mm: "5.56", od_mm: "12.70", thick_mm: "1.24", star: false },
  { size: "1/4\"", id_frac: "9/32\"", id_dec: "0.281", od_frac: "5/8\"", od_dec: "0.625", thick: "0.065", id_mm: "7.14", od_mm: "15.88", thick_mm: "1.65", star: true },
  { size: "5/16\"", id_frac: "11/32\"", id_dec: "0.344", od_frac: "11/16\"", od_dec: "0.688", thick: "0.065", id_mm: "8.73", od_mm: "17.48", thick_mm: "1.65", star: true },
  { size: "3/8\"", id_frac: "13/32\"", id_dec: "0.406", od_frac: "13/16\"", od_dec: "0.813", thick: "0.065", id_mm: "10.31", od_mm: "20.65", thick_mm: "1.65", star: true },
  { size: "7/16\"", id_frac: "15/32\"", id_dec: "0.469", od_frac: "59/64\"", od_dec: "0.922", thick: "0.065", id_mm: "11.91", od_mm: "23.42", thick_mm: "1.65", star: false },
  { size: "1/2\"", id_frac: "17/32\"", id_dec: "0.531", od_frac: "1-1/16\"", od_dec: "1.063", thick: "0.095", id_mm: "13.49", od_mm: "27.00", thick_mm: "2.41", star: true },
  { size: "9/16\"", id_frac: "19/32\"", id_dec: "0.594", od_frac: "1-3/16\"", od_dec: "1.188", thick: "0.095", id_mm: "15.09", od_mm: "30.18", thick_mm: "2.41", star: false },
  { size: "5/8\"", id_frac: "11/16\"", id_dec: "0.688", od_frac: "1-5/16\"", od_dec: "1.313", thick: "0.095", id_mm: "17.48", od_mm: "33.34", thick_mm: "2.41", star: false },
  { size: "3/4\"", id_frac: "13/16\"", id_dec: "0.813", od_frac: "1-15/32\"", od_dec: "1.469", thick: "0.134", id_mm: "20.65", od_mm: "37.31", thick_mm: "3.40", star: true },
  { size: "7/8\"", id_frac: "15/16\"", id_dec: "0.938", od_frac: "1-3/4\"", od_dec: "1.750", thick: "0.134", id_mm: "23.83", od_mm: "44.45", thick_mm: "3.40", star: false },
  { size: "1\"", id_frac: "1-1/16\"", id_dec: "1.063", od_frac: "2\"", od_dec: "2.000", thick: "0.134", id_mm: "27.00", od_mm: "50.80", thick_mm: "3.40", star: true },
  { size: "1-1/4\"", id_frac: "1-5/16\"", id_dec: "1.313", od_frac: "2-1/2\"", od_dec: "2.500", thick: "0.165", id_mm: "33.34", od_mm: "63.50", thick_mm: "4.19", star: false },
  { size: "1-1/2\"", id_frac: "1-9/16\"", id_dec: "1.563", od_frac: "3\"", od_dec: "3.000", thick: "0.165", id_mm: "39.69", od_mm: "76.20", thick_mm: "4.19", star: false },
];

const USS_WASHERS = [
  { size: "1/4\"", id_frac: "5/16\"", id_dec: "0.313", od_frac: "3/4\"", od_dec: "0.734", thick: "0.065", id_mm: "7.95", od_mm: "18.64", thick_mm: "1.65", star: true },
  { size: "5/16\"", id_frac: "3/8\"", id_dec: "0.375", od_frac: "7/8\"", od_dec: "0.875", thick: "0.083", id_mm: "9.53", od_mm: "22.23", thick_mm: "2.11", star: true },
  { size: "3/8\"", id_frac: "7/16\"", id_dec: "0.438", od_frac: "1\"", od_dec: "1.000", thick: "0.083", id_mm: "11.13", od_mm: "25.40", thick_mm: "2.11", star: true },
  { size: "7/16\"", id_frac: "1/2\"", id_dec: "0.500", od_frac: "1-1/4\"", od_dec: "1.250", thick: "0.083", id_mm: "12.70", od_mm: "31.75", thick_mm: "2.11", star: false },
  { size: "1/2\"", id_frac: "9/16\"", id_dec: "0.563", od_frac: "1-3/8\"", od_dec: "1.375", thick: "0.109", id_mm: "14.29", od_mm: "34.93", thick_mm: "2.77", star: true },
  { size: "9/16\"", id_frac: "5/8\"", id_dec: "0.625", od_frac: "1-1/2\"", od_dec: "1.469", thick: "0.109", id_mm: "15.88", od_mm: "37.31", thick_mm: "2.77", star: false },
  { size: "5/8\"", id_frac: "11/16\"", id_dec: "0.688", od_frac: "1-3/4\"", od_dec: "1.750", thick: "0.134", id_mm: "17.48", od_mm: "44.45", thick_mm: "3.40", star: false },
  { size: "3/4\"", id_frac: "13/16\"", id_dec: "0.813", od_frac: "2\"", od_dec: "2.000", thick: "0.148", id_mm: "20.65", od_mm: "50.80", thick_mm: "3.76", star: true },
  { size: "7/8\"", id_frac: "15/16\"", id_dec: "0.938", od_frac: "2-1/4\"", od_dec: "2.250", thick: "0.165", id_mm: "23.83", od_mm: "57.15", thick_mm: "4.19", star: false },
  { size: "1\"", id_frac: "1-1/16\"", id_dec: "1.063", od_frac: "2-1/2\"", od_dec: "2.500", thick: "0.165", id_mm: "27.00", od_mm: "63.50", thick_mm: "4.19", star: true },
  { size: "1-1/4\"", id_frac: "1-5/16\"", id_dec: "1.313", od_frac: "3\"", od_dec: "3.000", thick: "0.165", id_mm: "33.34", od_mm: "76.20", thick_mm: "4.19", star: false },
  { size: "1-1/2\"", id_frac: "1-5/8\"", id_dec: "1.625", od_frac: "3-1/2\"", od_dec: "3.500", thick: "0.180", id_mm: "41.28", od_mm: "88.90", thick_mm: "4.57", star: false },
];

const F436_WASHERS = [
  { size: "1/2\"", id_dec: "0.531", od_dec: "1.063", thick: "0.122", id_mm: "13.49", od_mm: "27.00", thick_mm: "3.10", star: true },
  { size: "5/8\"", id_dec: "0.656", od_dec: "1.313", thick: "0.122", id_mm: "16.66", od_mm: "33.34", thick_mm: "3.10", star: false },
  { size: "3/4\"", id_dec: "0.781", od_dec: "1.469", thick: "0.136", id_mm: "19.84", od_mm: "37.31", thick_mm: "3.45", star: true },
  { size: "7/8\"", id_dec: "0.906", od_dec: "1.750", thick: "0.136", id_mm: "23.01", od_mm: "44.45", thick_mm: "3.45", star: false },
  { size: "1\"", id_dec: "1.031", od_dec: "2.000", thick: "0.136", id_mm: "26.19", od_mm: "50.80", thick_mm: "3.45", star: true },
  { size: "1-1/8\"", id_dec: "1.188", od_dec: "2.250", thick: "0.136", id_mm: "30.18", od_mm: "57.15", thick_mm: "3.45", star: false },
  { size: "1-1/4\"", id_dec: "1.313", od_dec: "2.500", thick: "0.136", id_mm: "33.34", od_mm: "63.50", thick_mm: "3.45", star: false },
  { size: "1-3/8\"", id_dec: "1.438", od_dec: "2.750", thick: "0.136", id_mm: "36.53", od_mm: "69.85", thick_mm: "3.45", star: false },
  { size: "1-1/2\"", id_dec: "1.563", od_dec: "3.000", thick: "0.136", id_mm: "39.70", od_mm: "76.20", thick_mm: "3.45", star: false },
];

const METRIC_WASHERS = [
  { size: "M5", id: "5.3", od_n: "10", od_w: "15", thick_n: "1.0", thick_w: "1.2", star: false },
  { size: "M6", id: "6.4", od_n: "12", od_w: "18.8", thick_n: "1.6", thick_w: "1.6", star: true },
  { size: "M8", id: "8.4", od_n: "16", od_w: "24.9", thick_n: "1.6", thick_w: "2.0", star: true },
  { size: "M10", id: "10.5", od_n: "20", od_w: "30", thick_n: "2.0", thick_w: "2.5", star: true },
  { size: "M12", id: "13.0", od_n: "24", od_w: "37", thick_n: "2.5", thick_w: "3.0", star: true },
  { size: "M14", id: "15.0", od_n: "28", od_w: "44", thick_n: "2.5", thick_w: "3.0", star: false },
  { size: "M16", id: "17.0", od_n: "30", od_w: "50", thick_n: "3.0", thick_w: "3.0", star: true },
  { size: "M18", id: "19.0", od_n: "34", od_w: "56", thick_n: "3.0", thick_w: "4.0", star: false },
  { size: "M20", id: "21.0", od_n: "37", od_w: "60", thick_n: "3.0", thick_w: "4.0", star: true },
  { size: "M22", id: "23.0", od_n: "39", od_w: "66", thick_n: "3.0", thick_w: "4.0", star: false },
  { size: "M24", id: "25.0", od_n: "44", od_w: "72", thick_n: "4.0", thick_w: "5.0", star: true },
  { size: "M27", id: "28.0", od_n: "50", od_w: "85", thick_n: "4.0", thick_w: "5.0", star: false },
  { size: "M30", id: "31.0", od_n: "56", od_w: "92", thick_n: "4.0", thick_w: "6.0", star: false },
  { size: "M36", id: "37.0", od_n: "66", od_w: "110", thick_n: "5.0", thick_w: "6.0", star: false },
];

const WASHER_SELECTION = [
  { type: "SAE Flat Washer", use: "General purpose bolted joints. Smaller OD than USS — use where compact bearing surface is needed or close-fit appearance matters.", color: "#2563EB" },
  { type: "USS Flat Washer", use: "Larger bearing area than SAE — better load distribution. Use with softer materials (wood, plastic, aluminum) or where larger contact patch reduces pull-through risk.", color: "#059669" },
  { type: "F436 Hardened Washer", use: "REQUIRED under head and nut of A325/A490 structural bolts per AISC. Hardened steel prevents embedment relaxation. Never substitute with SAE or USS in structural connections.", color: "#DC2626" },
  { type: "F844 Unhardened Washer", use: "General purpose washer meeting ASTM dimensional requirements but without hardness requirement. For A307 and lower-strength applications.", color: "#64748B" },
  { type: "Fender Washer", use: "Very large OD relative to ID — maximum load distribution. Used for large clearance holes, soft materials, and decorative applications.", color: "#D97706" },
  { type: "Lock Washer (Split)", use: "Provides spring action to maintain fastener tension. Effectiveness debated — tooth lock and Nordlock designs are more reliable for high-vibration applications.", color: "#7C3AED" },
  { type: "Belleville / Disc Washer", use: "Conical spring washer — maintains clamping force under vibration and thermal cycling. More reliable than split lock washers for critical vibration applications.", color: "#0891B2" },
  { type: "Metric Plain Washer (Regular)", use: "General purpose metric applications. Regular series is standard. Wide series provides larger bearing area.", color: "#059669" },
];

export default function WasherSizes() {
  const [activeTab, setActiveTab] = useState("sae");
  const [search, setSearch] = useState("");

  const tabs = [
    { id: "sae", label: "SAE" },
    { id: "uss", label: "USS" },
    { id: "f436", label: "F436 Struct." },
    { id: "metric", label: "Metric" },
    { id: "selection", label: "Which Washer?" },
  ];

  const getData = () => {
    switch (activeTab) {
      case "sae": return SAE_WASHERS;
      case "uss": return USS_WASHERS;
      case "f436": return F436_WASHERS;
      case "metric": return METRIC_WASHERS;
      default: return [];
    }
  };

  const filtered = getData().filter(r =>
    r.size.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ fontFamily: "'DM Sans','Segoe UI',sans-serif", background: BG, minHeight: "100vh", maxWidth: 430, margin: "0 auto" }}>

      {/* HEADER */}
      <div style={{ background: `linear-gradient(135deg, ${NAVY} 0%, #2C5282 100%)`, padding: "16px 20px 20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
          <span style={{ fontSize: 20 }}>⬡</span>
          <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 10, letterSpacing: 2, textTransform: "uppercase" }}>Fastener Companion</span>
        </div>
        <div style={{ color: WHITE, fontSize: 20, fontWeight: 800, marginBottom: 2 }}>Washer Sizes</div>
        <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 11 }}>ASME B18.21.1 · ASME B18.22M · ASTM F436 · ASTM F844 · SAE J1237</div>
        <div style={{ background: WHITE, borderRadius: 12, display: "flex", alignItems: "center", padding: "10px 14px", gap: 8, marginTop: 14, boxShadow: "0 2px 8px rgba(0,0,0,0.15)" }}>
          <span style={{ color: MUTED }}>??</span>
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search washer size..."
            style={{ background: "none", border: "none", outline: "none", color: TEXT, fontSize: 14, flex: 1, fontFamily: "inherit" }} />
          {search && <span onClick={() => setSearch("")} style={{ color: MUTED, cursor: "pointer" }}>✕</span>}
        </div>
      </div>

      {/* TABS */}
      <div style={{ background: WHITE, borderBottom: `1px solid ${BORDER}`, padding: "0 8px", display: "flex", overflowX: "auto", scrollbarWidth: "none" }}>
        {tabs.map(tab => (
          <button key={tab.id} onClick={() => { setActiveTab(tab.id); setSearch(""); }}
            style={{
              background: "none", border: "none", cursor: "pointer", padding: "11px 10px",
              fontSize: 11, fontWeight: 700, fontFamily: "inherit", whiteSpace: "nowrap",
              color: activeTab === tab.id ? NAVY : MUTED,
              borderBottom: activeTab === tab.id ? `3px solid ${AMBER}` : "3px solid transparent",
            }}>{tab.label}</button>
        ))}
      </div>

      {activeTab !== "selection" && (
        <>
          <div style={{ margin: "12px 16px 0", background: STAR_BG, border: `1px solid ${STAR_BORDER}`, borderRadius: 10, padding: "10px 14px" }}>
            <div style={{ fontSize: 11, color: "#92400E", lineHeight: 1.5 }}>
              {activeTab === "sae" && <><strong>★ = Most common.</strong> SAE washers have smaller OD than USS. All dimensions in inches. ID = Inside Diameter, OD = Outside Diameter, Thick = Thickness.</>}
              {activeTab === "uss" && <><strong>★ = Most common.</strong> USS washers have larger OD than SAE — better load distribution. Preferred when larger bearing area is needed.</>}
              {activeTab === "f436" && <><strong>F436 hardened washers are REQUIRED for A325/A490 structural bolts.</strong> Never substitute SAE or USS for F436 in structural connections — insufficient hardness causes embedment relaxation.</>}
              {activeTab === "metric" && <><strong>★ = Most common.</strong> Regular series (N) and Wide series (W). N = narrow/regular, W = wide/large OD. All dimensions in mm.</>}
            </div>
          </div>

          <div style={{ margin: "12px 16px 24px", background: WHITE, borderRadius: 14, overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.06)", border: `1px solid ${BORDER}` }}>
            {activeTab === "metric" ? (
              <>
                <div style={{ display: "grid", gridTemplateColumns: "0.6fr 0.6fr 0.7fr 0.7fr 0.7fr 0.7fr", background: NAVY, padding: "10px 10px" }}>
                  {["Size", "ID", "OD (N)", "OD (W)", "Tk (N)", "Tk (W)"].map(h => (
                    <div key={h} style={{ color: WHITE, fontSize: 9, fontWeight: 700 }}>{h}</div>
                  ))}
                </div>
                {filtered.map((row, i) => (
                  <div key={i} style={{ display: "grid", gridTemplateColumns: "0.6fr 0.6fr 0.7fr 0.7fr 0.7fr 0.7fr", padding: "8px 10px", background: row.star ? STAR_BG : i % 2 === 0 ? WHITE : ROW_ALT, borderBottom: `1px solid ${BORDER}`, alignItems: "center" }}>
                    <div style={{ fontSize: 12, fontWeight: row.star ? 800 : 600, color: row.star ? NAVY : TEXT, display: "flex", alignItems: "center", gap: 3 }}>
                      {row.star && <span style={{ color: AMBER, fontSize: 9 }}>★</span>}
                      {row.size}
                    </div>
                    <div style={{ fontSize: 11, color: TEXT }}>{row.id}</div>
                    <div style={{ fontSize: 11, fontWeight: 700, color: NAVY }}>{row.od_n}</div>
                    <div style={{ fontSize: 11, color: TEXT }}>{row.od_w}</div>
                    <div style={{ fontSize: 11, color: MUTED }}>{row.thick_n}</div>
                    <div style={{ fontSize: 11, color: MUTED }}>{row.thick_w}</div>
                  </div>
                ))}
              </>
            ) : activeTab === "f436" ? (
              <>
                <div style={{ display: "grid", gridTemplateColumns: "0.8fr 0.7fr 0.7fr 0.6fr 0.7fr 0.7fr", background: NAVY, padding: "10px 10px" }}>
                  {["Size", "ID\"", "OD\"", "Tk\"", "ID mm", "OD mm"].map(h => (
                    <div key={h} style={{ color: WHITE, fontSize: 9, fontWeight: 700 }}>{h}</div>
                  ))}
                </div>
                {filtered.map((row, i) => (
                  <div key={i} style={{ display: "grid", gridTemplateColumns: "0.8fr 0.7fr 0.7fr 0.6fr 0.7fr 0.7fr", padding: "8px 10px", background: row.star ? STAR_BG : i % 2 === 0 ? WHITE : ROW_ALT, borderBottom: `1px solid ${BORDER}`, alignItems: "center" }}>
                    <div style={{ fontSize: 12, fontWeight: row.star ? 800 : 600, color: row.star ? NAVY : TEXT, display: "flex", alignItems: "center", gap: 3 }}>
                      {row.star && <span style={{ color: AMBER, fontSize: 9 }}>★</span>}
                      {row.size}
                    </div>
                    <div style={{ fontSize: 11, color: TEXT }}>{row.id_dec}"</div>
                    <div style={{ fontSize: 11, fontWeight: 700, color: NAVY }}>{row.od_dec}"</div>
                    <div style={{ fontSize: 11, color: MUTED }}>{row.thick}"</div>
                    <div style={{ fontSize: 11, color: TEXT }}>{row.id_mm}</div>
                    <div style={{ fontSize: 11, color: TEXT }}>{row.od_mm}</div>
                  </div>
                ))}
              </>
            ) : (
              <>
                <div style={{ display: "grid", gridTemplateColumns: "0.7fr 0.8fr 0.8fr 0.6fr", background: NAVY, padding: "10px 12px" }}>
                  {["Size", "ID (in)", "OD (in)", "Thick\""].map(h => (
                    <div key={h} style={{ color: WHITE, fontSize: 10, fontWeight: 700 }}>{h}</div>
                  ))}
                </div>
                {filtered.map((row, i) => (
                  <div key={i} style={{ display: "grid", gridTemplateColumns: "0.7fr 0.8fr 0.8fr 0.6fr", padding: "8px 12px", background: row.star ? STAR_BG : i % 2 === 0 ? WHITE : ROW_ALT, borderBottom: `1px solid ${BORDER}`, alignItems: "center" }}>
                    <div style={{ fontSize: 12, fontWeight: row.star ? 800 : 600, color: row.star ? NAVY : TEXT, display: "flex", alignItems: "center", gap: 3 }}>
                      {row.star && <span style={{ color: AMBER, fontSize: 9 }}>★</span>}
                      {row.size}
                    </div>
                    <div style={{ fontSize: 11, color: TEXT }}>{row.id_frac}</div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: NAVY }}>{row.od_frac}</div>
                    <div style={{ fontSize: 11, color: MUTED }}>{row.thick}"</div>
                  </div>
                ))}
              </>
            )}
          </div>
        </>
      )}

      {activeTab === "selection" && (
        <div style={{ padding: "14px 16px", display: "flex", flexDirection: "column", gap: 10 }}>
          {WASHER_SELECTION.map((item, i) => (
            <div key={i} style={{ background: WHITE, border: `1px solid ${BORDER}`, borderLeft: `4px solid ${item.color}`, borderRadius: 12, padding: "12px 14px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
              <div style={{ fontSize: 13, fontWeight: 800, color: NAVY, marginBottom: 6 }}>{item.type}</div>
              <div style={{ fontSize: 12, color: TEXT, lineHeight: 1.6 }}>{item.use}</div>
            </div>
          ))}
        </div>
      )}

      <div style={{ margin: "0 16px 24px", background: "#FFF1F2", border: "1px solid #FECDD3", borderRadius: 10, padding: "10px 14px" }}>
        <div style={{ fontSize: 10, color: "#9F1239", lineHeight: 1.5 }}>
          <strong>⚠ Verify Before Use.</strong> Washer dimensions based on ASME B18.21.1, ASME B18.22M, ASTM F436, ASTM F844, and SAE J1237. F436 hardened washers required for structural bolting per AISC. Fastener Companion is a reference tool — not a substitute for engineering judgment.
        </div>
      </div>
    </div>
  );
}
