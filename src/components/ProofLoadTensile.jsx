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
// ProofLoadTensile
// ════════════════════════════════════════════════════

// ─── DATA ─────────────────────────────────────────────────────────────────────
// Sources: SAE J429 (Grade 2/5/8), ASTM A307, ASTM F3125/A325/A490,
// ASTM A354 (BD/BC), ASTM A193 B7/B8, ASTM F593 (stainless),
// ISO 898-1 (metric property classes), IFI Fastener Standards 7th Ed.,
// Fastenal Technical Reference Guide, Portland Bolt strength requirements,
// Engineers Edge mechanical properties tables

// All psi values are minimum values per applicable standard
// Metric values in MPa — minimum per ISO 898-1

const SAE_ASTM_GRADES = [
  {
    id: "a307",
    grade: "A307 Grade A",
    system: "ASTM",
    material: "Low carbon steel",
    size_range: "1/4\"–4\"",
    proof_psi: "—",
    proof_mpa: "—",
    yield_psi: "≥ 36,000",
    yield_mpa: "248",
    tensile_psi: "≥ 60,000",
    tensile_mpa: "414",
    hardness: "B69–B100",
    head_mark: "A307 or no mark",
    equiv_metric: "~4.6",
    color: "#64748B",
    notes: "General purpose low-strength bolt. Used for wood construction, light steel, pipe flanges (non-pressure). No proof load specified — strength verified by tensile test only.",
    star: false,
  },
  {
    id: "grade2",
    grade: "SAE Grade 2",
    system: "SAE J429",
    material: "Low/medium carbon steel",
    size_range: "1/4\"–3/4\" (74 ksi tensile)\
3/4\"–1-1/2\" (60 ksi tensile)",
    proof_psi: "55,000 (≤3/4\") / 33,000 (>3/4\")",
    proof_mpa: "379 / 228",
    yield_psi: "57,000 (≤3/4\") / 36,000 (>3/4\")",
    yield_mpa: "393 / 248",
    tensile_psi: "74,000 (≤3/4\") / 60,000 (>3/4\")",
    tensile_mpa: "510 / 414",
    hardness: "B70–B100",
    head_mark: "No radial lines (unmarked)",
    equiv_metric: "~4.6–5.8",
    color: "#64748B",
    notes: "General purpose. Strength drops significantly for bolts over 3/4\". Not for structural or high-load applications. Often found in non-critical assemblies.",
    star: true,
  },
  {
    id: "grade5",
    grade: "SAE Grade 5",
    system: "SAE J429",
    material: "Medium carbon steel, quenched & tempered",
    size_range: "1/4\"–1\" (120 ksi) / 1\"–1-1/2\" (105 ksi)",
    proof_psi: "85,000 (≤1\") / 74,000 (>1\")",
    proof_mpa: "586 / 510",
    yield_psi: "92,000 (≤1\") / 81,000 (>1\")",
    yield_mpa: "634 / 558",
    tensile_psi: "120,000 (≤1\") / 105,000 (>1\")",
    tensile_mpa: "827 / 724",
    hardness: "C25–C34",
    head_mark: "3 radial lines",
    equiv_metric: "~8.8",
    color: "#2563EB",
    notes: "Medium-strength workhorse. Most common bolt for general industrial use. Strength steps down for sizes over 1\". Equivalent to ASTM A449 and roughly comparable to A325 in many applications.",
    star: true,
  },
  {
    id: "grade8",
    grade: "SAE Grade 8",
    system: "SAE J429",
    material: "Alloy steel, quenched & tempered",
    size_range: "1/4\"–1-1/2\"",
    proof_psi: "120,000",
    proof_mpa: "827",
    yield_psi: "130,000",
    yield_mpa: "896",
    tensile_psi: "150,000",
    tensile_mpa: "1034",
    hardness: "C33–C39",
    head_mark: "6 radial lines",
    equiv_metric: "~10.9",
    color: "#D97706",
    notes: "High-strength general purpose bolt. Maximum common SAE grade. Used in automotive, machinery, and high-load applications. Subject to HE risk — avoid electroplating without baking.",
    star: true,
  },
  {
    id: "a325",
    grade: "ASTM A325 (F3125 Gr. A325)",
    system: "ASTM",
    material: "Medium carbon steel or alloy steel, Q&T",
    size_range: "1/2\"–1\" (120 ksi) / 1-1/8\"–1-1/2\" (105 ksi)",
    proof_psi: "85,000 (≤1\") / 74,000 (>1\")",
    proof_mpa: "586 / 510",
    yield_psi: "92,000 (≤1\") / 81,000 (>1\")",
    yield_mpa: "634 / 558",
    tensile_psi: "120,000 (≤1\") / 105,000 (>1\")",
    tensile_mpa: "827 / 724",
    hardness: "C25–C34",
    head_mark: "A325 (3 heavy radial marks)",
    equiv_metric: "~8.8",
    color: "#2563EB",
    notes: "Structural bolt — requires heavy hex head and A563 DH heavy hex nut. Used in steel frame construction, bridges, and heavy equipment. Now designated ASTM F3125 Grade A325 but A325 marking still used. Requires F436 hardened washers.",
    star: true,
  },
  {
    id: "a490",
    grade: "ASTM A490 (F3125 Gr. A490)",
    system: "ASTM",
    material: "Alloy steel, quenched & tempered",
    size_range: "1/2\"–1-1/2\"",
    proof_psi: "120,000",
    proof_mpa: "827",
    yield_psi: "130,000",
    yield_mpa: "896",
    tensile_psi: "150,000–173,000",
    tensile_mpa: "1034–1193",
    hardness: "C33–C38",
    head_mark: "A490 (4 heavy radial marks)",
    equiv_metric: "~10.9",
    color: "#DC2626",
    notes: "Highest strength structural bolt. No galvanizing permitted — HE risk. Plain or mechanically galvanized only. Requires A563 Grade DH3 heavy hex nut and F436 washers. Critical: maximum tensile is capped — overtorquing risk.",
    star: true,
  },
  {
    id: "a354bc",
    grade: "ASTM A354 Grade BC",
    system: "ASTM",
    material: "Alloy steel, Q&T",
    size_range: "1/4\"–4\"",
    proof_psi: "105,000 (≤2-1/2\") / 95,000 (>2-1/2\")",
    proof_mpa: "724 / 655",
    yield_psi: "109,000 (≤2-1/2\") / 99,000 (>2-1/2\")",
    yield_mpa: "751 / 682",
    tensile_psi: "125,000 (≤2-1/2\") / 115,000 (>2-1/2\")",
    tensile_mpa: "862 / 793",
    hardness: "C26–C36",
    head_mark: "BC",
    equiv_metric: "~8.8–10.9",
    color: "#7C3AED",
    notes: "Heavy hex bolt for general industrial and structural applications. Available in larger diameter range than A325. Paired with A563 nuts.",
    star: false,
  },
  {
    id: "a354bd",
    grade: "ASTM A354 Grade BD",
    system: "ASTM",
    material: "Alloy steel, Q&T",
    size_range: "1/4\"–4\"",
    proof_psi: "120,000 (≤2-1/2\") / 105,000 (>2-1/2\")",
    proof_mpa: "827 / 724",
    yield_psi: "130,000 (≤2-1/2\") / 115,000 (>2-1/2\")",
    yield_mpa: "896 / 793",
    tensile_psi: "150,000 (≤2-1/2\") / 140,000 (>2-1/2\")",
    tensile_mpa: "1034 / 965",
    hardness: "C33–C39",
    head_mark: "BD",
    equiv_metric: "~10.9",
    color: "#DC2626",
    notes: "High-strength equivalent for diameters larger than A490 range (over 1-1/2\"). Used in heavy equipment, pressure vessels, and large structural connections. HE risk — electroplating requires 10-hour bake.",
    star: false,
  },
  {
    id: "a193b7",
    grade: "ASTM A193 Grade B7",
    system: "ASTM",
    material: "4140/4142/4145 Cr-Mo alloy steel, Q&T",
    size_range: "≤2-1/2\" / 2-1/2\"–4\" / 4\"–7\"",
    proof_psi: "—",
    proof_mpa: "—",
    yield_psi: "105,000 / 95,000 / 75,000",
    yield_mpa: "724 / 655 / 517",
    tensile_psi: "125,000 / 115,000 / 100,000",
    tensile_mpa: "862 / 793 / 689",
    hardness: "C35 max",
    head_mark: "B7 (varies by supplier)",
    equiv_metric: "~10.9",
    color: "#059669",
    notes: "STUD BOLT standard for flanges and pressure vessels. Typically fully threaded both ends. Used with A194 Grade 2H nuts. Strength steps down significantly for large diameters. Most common industrial stud bolt material.",
    star: true,
  },
  {
    id: "a193b8",
    grade: "ASTM A193 Grade B8 (304 SS)",
    system: "ASTM",
    material: "304 austenitic stainless steel",
    size_range: "All sizes",
    proof_psi: "—",
    proof_mpa: "—",
    yield_psi: "30,000",
    yield_mpa: "207",
    tensile_psi: "75,000",
    tensile_mpa: "517",
    hardness: "B96 max",
    head_mark: "B8",
    equiv_metric: "~A2-70",
    color: "#0891B2",
    notes: "Stainless stud bolt for corrosive service. Much lower strength than carbon steel — verify adequacy for application. Used with A194 Grade 8 nuts. B8M is 316 SS equivalent for marine/chemical service.",
    star: false,
  },
];

const METRIC_GRADES = [
  {
    id: "46",
    grade: "4.6",
    system: "ISO 898-1",
    material: "Low/medium carbon steel",
    proof_mpa: "225",
    yield_mpa: "240",
    tensile_mpa: "400",
    hardness: "B67–B95",
    head_mark: "4.6",
    equiv_sae: "~Grade 2",
    color: "#64748B",
    notes: "General purpose low-strength metric bolt. Common in European-manufactured equipment. Not typically stocked in North America — sourcing may require special order.",
    star: false,
  },
  {
    id: "48",
    grade: "4.8",
    system: "ISO 898-1",
    material: "Low/medium carbon steel",
    proof_mpa: "310",
    yield_mpa: "340",
    tensile_mpa: "420",
    hardness: "B71–B95",
    head_mark: "4.8",
    equiv_sae: "~Grade 2+",
    color: "#64748B",
    notes: "Slightly stronger than 4.6. Used in light general applications. Limited availability in North America.",
    star: false,
  },
  {
    id: "58",
    grade: "5.8",
    system: "ISO 898-1",
    material: "Low/medium carbon steel",
    proof_mpa: "380",
    yield_mpa: "420",
    tensile_mpa: "520",
    hardness: "B82–C22",
    head_mark: "5.8",
    equiv_sae: "~Grade 5 (low end)",
    color: "#2563EB",
    notes: "Medium strength. Common in automotive applications. Available at most metric distributors.",
    star: false,
  },
  {
    id: "88",
    grade: "8.8",
    system: "ISO 898-1",
    material: "Medium carbon steel or alloy steel, Q&T",
    proof_mpa: "600",
    yield_mpa: "640",
    tensile_mpa: "800",
    hardness: "C22–C32",
    head_mark: "8.8",
    equiv_sae: "~Grade 5",
    color: "#2563EB",
    notes: "Most common metric structural grade. Standard for general industrial and machinery applications worldwide. Note: 8.8 ≠ Grade 8 — more comparable to Grade 5 (800 MPa vs 150,000 psi/1034 MPa for Grade 8).",
    star: true,
  },
  {
    id: "109",
    grade: "10.9",
    system: "ISO 898-1",
    material: "Alloy steel, quenched & tempered",
    proof_mpa: "830",
    yield_mpa: "900",
    tensile_mpa: "1040",
    hardness: "C32–C39",
    head_mark: "10.9",
    equiv_sae: "~Grade 8",
    color: "#D97706",
    notes: "High-strength metric bolt. Comparable to SAE Grade 8 and ASTM A490. Subject to HE risk — avoid electroplating without baking. Common in automotive and heavy equipment.",
    star: true,
  },
  {
    id: "129",
    grade: "12.9",
    system: "ISO 898-1",
    material: "Alloy steel, Q&T (special steel required)",
    proof_mpa: "970",
    yield_mpa: "1080",
    tensile_mpa: "1220",
    hardness: "C38–C44",
    head_mark: "12.9",
    equiv_sae: "Exceeds Grade 8",
    color: "#DC2626",
    notes: "Highest common metric grade. Used in critical automotive (engine, drivetrain) and aerospace applications. VERY HIGH HE risk — black oxide standard finish, electroplating strongly discouraged. Socket head cap screws are almost always 12.9.",
    star: true,
  },
  {
    id: "a270",
    grade: "A2-70",
    system: "ISO 3506",
    material: "304 austenitic stainless steel",
    proof_mpa: "450",
    yield_mpa: "450",
    tensile_mpa: "700",
    hardness: "B95 max",
    head_mark: "A2-70",
    equiv_sae: "~Grade 5 (stainless)",
    color: "#0891B2",
    notes: "Most common stainless metric fastener. 304 SS base material. Good corrosion resistance for most environments. Not marine — for saltwater use specify A4-70 or A4-80 (316 SS).",
    star: true,
  },
  {
    id: "a480",
    grade: "A4-80",
    system: "ISO 3506",
    material: "316 austenitic stainless steel",
    proof_mpa: "600",
    yield_mpa: "600",
    tensile_mpa: "800",
    hardness: "C22 max",
    head_mark: "A4-80",
    equiv_sae: "~Grade 8 (stainless)",
    color: "#059669",
    notes: "Marine grade stainless. 316 SS — chloride resistant. Higher strength than A2-70. Required for marine, chemical, and food processing applications where 304 is insufficient.",
    star: true,
  },
];

const STRENGTH_COMPARISON = [
  { grade: "A307 / Grade 2 (≤3/4\")", tensile_ksi: 60, tensile_mpa: 414, bar_width: 28, color: "#94A3B8" },
  { grade: "Grade 2 (>3/4\")", tensile_ksi: 60, tensile_mpa: 414, bar_width: 28, color: "#94A3B8" },
  { grade: "Metric 4.6", tensile_ksi: 58, tensile_mpa: 400, bar_width: 27, color: "#94A3B8" },
  { grade: "Metric 5.8", tensile_ksi: 75, tensile_mpa: 520, bar_width: 35, color: "#64748B" },
  { grade: "Grade 5 (≤1\")", tensile_ksi: 120, tensile_mpa: 827, bar_width: 56, color: "#2563EB" },
  { grade: "Metric 8.8", tensile_ksi: 116, tensile_mpa: 800, bar_width: 54, color: "#2563EB" },
  { grade: "A325 (≤1\")", tensile_ksi: 120, tensile_mpa: 827, bar_width: 56, color: "#2563EB" },
  { grade: "A193 B7 (≤2-1/2\")", tensile_ksi: 125, tensile_mpa: 862, bar_width: 58, color: "#059669" },
  { grade: "A2-70 (304 SS)", tensile_ksi: 102, tensile_mpa: 700, bar_width: 47, color: "#0891B2" },
  { grade: "A4-80 (316 SS)", tensile_ksi: 116, tensile_mpa: 800, bar_width: 54, color: "#059669" },
  { grade: "Grade 8", tensile_ksi: 150, tensile_mpa: 1034, bar_width: 70, color: "#D97706" },
  { grade: "Metric 10.9", tensile_ksi: 151, tensile_mpa: 1040, bar_width: 70, color: "#D97706" },
  { grade: "A490", tensile_ksi: 150, tensile_mpa: 1034, bar_width: 70, color: "#DC2626" },
  { grade: "Metric 12.9", tensile_ksi: 177, tensile_mpa: 1220, bar_width: 82, color: "#DC2626" },
];

export default function ProofLoadTensile() {
  const [activeTab, setActiveTab] = useState("sae_astm");
  const [selected, setSelected] = useState(null);
  const [units, setUnits] = useState("both");

  const selectedGrade = selected
    ? (activeTab === "sae_astm" ? SAE_ASTM_GRADES : METRIC_GRADES).find(g => g.id === selected)
    : null;

  return (
    <div style={{ fontFamily: "'DM Sans','Segoe UI',sans-serif", background: BG, minHeight: "100vh", maxWidth: 430, margin: "0 auto" }}>

      {/* HEADER */}
      <div style={{ background: `linear-gradient(135deg, ${NAVY} 0%, #2C5282 100%)`, padding: "16px 20px 20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
          <span style={{ fontSize: 20 }}>⬡</span>
          <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 10, letterSpacing: 2, textTransform: "uppercase" }}>Fastener Companion</span>
        </div>
        <div style={{ color: WHITE, fontSize: 20, fontWeight: 800, marginBottom: 2 }}>Proof Load & Tensile Strength</div>
        <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 11 }}>SAE J429 · ASTM F3125/A325/A490 · ASTM A193/A354 · ISO 898-1 · ISO 3506 · IFI 7th Ed.</div>
      </div>

      {/* TABS */}
      <div style={{ background: WHITE, borderBottom: `1px solid ${BORDER}`, padding: "0 8px", display: "flex", overflowX: "auto", scrollbarWidth: "none" }}>
        {[
          { id: "sae_astm", label: "SAE / ASTM" },
          { id: "metric", label: "Metric" },
          { id: "comparison", label: "Comparison Chart" },
        ].map(t => (
          <button key={t.id} onClick={() => { setActiveTab(t.id); setSelected(null); }}
            style={{
              background: "none", border: "none", cursor: "pointer", padding: "12px 14px",
              fontSize: 12, fontWeight: 700, fontFamily: "inherit", whiteSpace: "nowrap",
              color: activeTab === t.id ? NAVY : MUTED,
              borderBottom: activeTab === t.id ? `3px solid ${AMBER}` : "3px solid transparent",
            }}>{t.label}</button>
        ))}
      </div>

      {/* GRADE LIST */}
      {(activeTab === "sae_astm" || activeTab === "metric") && !selectedGrade && (
        <div style={{ padding: "12px 16px", display: "flex", flexDirection: "column", gap: 10 }}>
          <div style={{ background: STAR_BG, border: `1px solid ${STAR_BORDER}`, borderRadius: 10, padding: "10px 14px" }}>
            <div style={{ fontSize: 11, color: "#92400E", lineHeight: 1.5 }}>
              <strong>Design to proof load, not tensile.</strong> A properly torqued joint targets 75–90% of proof load as preload. Tensile strength is the ultimate breaking point — never a design target.
            </div>
          </div>
          {(activeTab === "sae_astm" ? SAE_ASTM_GRADES : METRIC_GRADES).map(grade => (
            <div key={grade.id} onClick={() => setSelected(grade.id)}
              style={{
                background: grade.star ? STAR_BG : WHITE,
                border: `1px solid ${BORDER}`,
                borderLeft: `4px solid ${grade.color}`,
                borderRadius: 12, padding: "14px", cursor: "pointer",
                boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
              }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }}>
                    {grade.star && <span style={{ color: AMBER, fontSize: 11 }}>★</span>}
                    <span style={{ fontSize: 14, fontWeight: 800, color: NAVY }}>{grade.grade}</span>
                  </div>
                  <div style={{ fontSize: 10, color: MUTED }}>{grade.system} · {grade.material}</div>
                </div>
                <div style={{ background: grade.color + "20", border: `1px solid ${grade.color}`, borderRadius: 8, padding: "3px 8px", fontSize: 10, fontWeight: 700, color: grade.color, flexShrink: 0, marginLeft: 8 }}>
                  {grade.head_mark}
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 8 }}>
                {[
                  { label: "Proof Load", val: activeTab === "sae_astm" ? (grade.proof_psi !== "—" ? grade.proof_psi + " psi" : "—") : grade.proof_mpa + " MPa" },
                  { label: "Yield", val: activeTab === "sae_astm" ? grade.yield_psi + " psi" : grade.yield_mpa + " MPa" },
                  { label: "Tensile", val: activeTab === "sae_astm" ? grade.tensile_psi + " psi" : grade.tensile_mpa + " MPa" },
                ].map((item, i) => (
                  <div key={i} style={{ background: ROW_ALT, borderRadius: 8, padding: "6px 8px", border: `1px solid ${BORDER}` }}>
                    <div style={{ fontSize: 9, color: MUTED, textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 1 }}>{item.label}</div>
                    <div style={{ fontSize: 10, fontWeight: 700, color: NAVY, lineHeight: 1.3 }}>{item.val}</div>
                  </div>
                ))}
              </div>
              <div style={{ fontSize: 11, color: TEXT, lineHeight: 1.4 }}>{grade.notes}</div>
            </div>
          ))}
        </div>
      )}

      {/* GRADE DETAIL */}
      {(activeTab === "sae_astm" || activeTab === "metric") && selectedGrade && (
        <div style={{ padding: "14px 16px" }}>
          <button onClick={() => setSelected(null)}
            style={{ background: "none", border: "none", cursor: "pointer", color: NAVY, fontSize: 13, fontWeight: 700, fontFamily: "inherit", marginBottom: 14, display: "flex", alignItems: "center", gap: 6, padding: 0 }}>
            ← Back
          </button>

          <div style={{ background: WHITE, border: `1px solid ${BORDER}`, borderLeft: `4px solid ${selectedGrade.color}`, borderRadius: 12, padding: "14px", marginBottom: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
              <div>
                <div style={{ fontSize: 16, fontWeight: 800, color: NAVY }}>{selectedGrade.grade}</div>
                <div style={{ fontSize: 11, color: MUTED, marginTop: 2 }}>{selectedGrade.system} · {selectedGrade.material}</div>
              </div>
              <div style={{ background: selectedGrade.color + "20", border: `1px solid ${selectedGrade.color}`, borderRadius: 8, padding: "4px 12px", fontSize: 12, fontWeight: 800, color: selectedGrade.color }}>
                {selectedGrade.head_mark}
              </div>
            </div>
            <div style={{ fontSize: 11, color: TEXT, lineHeight: 1.5 }}>{selectedGrade.notes}</div>
          </div>

          <div style={{ background: WHITE, border: `1px solid ${BORDER}`, borderRadius: 12, overflow: "hidden", marginBottom: 12, boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
            <div style={{ background: NAVY, padding: "10px 14px" }}>
              <div style={{ color: WHITE, fontSize: 12, fontWeight: 700 }}>Mechanical Properties</div>
            </div>
            {[
              { label: "Size Range", val: selectedGrade.size_range },
              { label: "Proof Load (psi)", val: activeTab === "sae_astm" ? selectedGrade.proof_psi : "N/A (metric uses MPa)" },
              { label: "Proof Load (MPa)", val: activeTab === "sae_astm" ? selectedGrade.proof_mpa : selectedGrade.proof_mpa },
              { label: "Yield Strength (psi)", val: activeTab === "sae_astm" ? selectedGrade.yield_psi : (parseInt(selectedGrade.yield_mpa) * 145).toLocaleString() + " (calc)" },
              { label: "Yield Strength (MPa)", val: activeTab === "sae_astm" ? selectedGrade.yield_mpa : selectedGrade.yield_mpa },
              { label: "Tensile Strength (psi)", val: activeTab === "sae_astm" ? selectedGrade.tensile_psi : (parseInt(selectedGrade.tensile_mpa) * 145).toLocaleString() + " (calc)" },
              { label: "Tensile Strength (MPa)", val: activeTab === "sae_astm" ? selectedGrade.tensile_mpa : selectedGrade.tensile_mpa },
              { label: "Hardness Range", val: selectedGrade.hardness },
              { label: "Head Marking", val: selectedGrade.head_mark },
              { label: activeTab === "sae_astm" ? "Metric Equivalent" : "SAE Equivalent", val: activeTab === "sae_astm" ? selectedGrade.equiv_metric : selectedGrade.equiv_sae },
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "9px 14px", borderBottom: `1px solid ${BORDER}`, background: i % 2 === 0 ? WHITE : ROW_ALT }}>
                <div style={{ fontSize: 11, color: MUTED, fontWeight: 600 }}>{item.label}</div>
                <div style={{ fontSize: 11, fontWeight: 700, color: NAVY, textAlign: "right", maxWidth: "55%" }}>{item.val}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* COMPARISON CHART */}
      {activeTab === "comparison" && (
        <div style={{ padding: "14px 16px" }}>
          <div style={{ background: STAR_BG, border: `1px solid ${STAR_BORDER}`, borderRadius: 10, padding: "10px 14px", marginBottom: 14 }}>
            <div style={{ fontSize: 11, color: "#92400E", lineHeight: 1.5 }}>
              Minimum tensile strength comparison. Bar length = relative strength. Note: 8.8 ≈ Grade 5, not Grade 8. Grade 8 ≈ 10.9.
            </div>
          </div>
          <div style={{ background: WHITE, borderRadius: 14, overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.06)", border: `1px solid ${BORDER}` }}>
            <div style={{ background: NAVY, padding: "10px 14px" }}>
              <div style={{ color: WHITE, fontSize: 12, fontWeight: 700 }}>Min. Tensile Strength — All Grades</div>
            </div>
            {STRENGTH_COMPARISON.map((item, i) => (
              <div key={i} style={{ padding: "10px 14px", borderBottom: `1px solid ${BORDER}`, background: i % 2 === 0 ? WHITE : ROW_ALT }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: NAVY }}>{item.grade}</div>
                  <div style={{ fontSize: 11, fontWeight: 800, color: item.color }}>{item.tensile_ksi} ksi / {item.tensile_mpa} MPa</div>
                </div>
                <div style={{ background: "#F1F5F9", borderRadius: 4, height: 8, overflow: "hidden" }}>
                  <div style={{ background: item.color, height: "100%", width: `${item.bar_width}%`, borderRadius: 4, transition: "width 0.3s" }} />
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 14, background: "#EEF4FF", border: `1px solid ${BORDER}`, borderRadius: 12, padding: "12px 14px" }}>
            <div style={{ fontSize: 12, fontWeight: 800, color: NAVY, marginBottom: 6 }}>Common Misconception</div>
            <div style={{ fontSize: 12, color: TEXT, lineHeight: 1.6 }}>
              <strong>8.8 ≠ Grade 8.</strong> Metric 8.8 has 800 MPa tensile (≈116 ksi) — comparable to SAE Grade 5 (120 ksi). SAE Grade 8 has 150,000 psi (1034 MPa) — closer to metric 10.9 (1040 MPa). This is one of the most common fastener substitution errors in the field.
            </div>
          </div>
        </div>
      )}

      <div style={{ margin: "0 16px 24px", background: "#FFF1F2", border: "1px solid #FECDD3", borderRadius: 10, padding: "10px 14px" }}>
        <div style={{ fontSize: 10, color: "#9F1239", lineHeight: 1.5 }}>
          <strong>⚠ Verify Before Use.</strong> Minimum strength values per SAE J429, ASTM F3125, ASTM A193, ASTM A354, ISO 898-1, and ISO 3506. Values shown are minimums — actual fastener may exceed these. Strength steps down for larger diameters — always check applicable size range. Fastener Companion is a reference tool — not a substitute for engineering judgment.
        </div>
      </div>
    </div>
  );
}
