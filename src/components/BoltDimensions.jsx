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
// BoltDimensions
// ════════════════════════════════════════════════════

// ─── DATA ─────────────────────────────────────────────────────────────────────
// Sources: ASME B18.2.1-2012 (imperial hex bolts/cap screws/heavy hex),
// ASME B18.2.3.1M (metric hex cap screws), ISO 4014/4017 (metric hex bolts),
// DIN 931/933 (metric hex bolts), MechaniCalc fastener size tables,
// Bolt Depot dimension tables, Engineers Edge

// All imperial dimensions in inches. All metric in mm.
// WAF = Width Across Flats (wrench size)
// WAC = Width Across Corners
// H = Head Height
// Thread Length formula (imperial): L≤6": 2D+0.25"; L>6": 2D+0.50"
// Thread Length formula (metric): L≤125mm: 2D+6mm; L>125mm: 2D+12mm

const HEX_BOLT_IMPERIAL = [
  { size: "1/4\"", d: "0.250", tpi: "20", waf: "7/16\"", waf_dec: "0.438", waf_mm: "11.13", wac: "0.505", h: "11/64\"", h_dec: "0.163", h_mm: "4.14", thread_l6: "0.75\"", star: true },
  { size: "5/16\"", d: "0.3125", tpi: "18", waf: "1/2\"", waf_dec: "0.500", waf_mm: "12.70", wac: "0.577", h: "7/32\"", h_dec: "0.211", h_mm: "5.36", thread_l6: "0.875\"", star: true },
  { size: "3/8\"", d: "0.375", tpi: "16", waf: "9/16\"", waf_dec: "0.563", waf_mm: "14.29", wac: "0.650", h: "1/4\"", h_dec: "0.243", h_mm: "6.17", thread_l6: "1.00\"", star: true },
  { size: "7/16\"", d: "0.4375", tpi: "14", waf: "5/8\"", waf_dec: "0.625", waf_mm: "15.88", wac: "0.722", h: "19/64\"", h_dec: "0.291", h_mm: "7.39", thread_l6: "1.125\"", star: false },
  { size: "1/2\"", d: "0.500", tpi: "13", waf: "3/4\"", waf_dec: "0.750", waf_mm: "19.05", wac: "0.866", h: "11/32\"", h_dec: "0.323", h_mm: "8.20", thread_l6: "1.25\"", star: true },
  { size: "9/16\"", d: "0.5625", tpi: "12", waf: "7/8\"", waf_dec: "0.875", waf_mm: "22.23", wac: "1.010", h: "3/8\"", h_dec: "0.371", h_mm: "9.42", thread_l6: "1.375\"", star: false },
  { size: "5/8\"", d: "0.625", tpi: "11", waf: "15/16\"", waf_dec: "0.938", waf_mm: "23.83", wac: "1.083", h: "27/64\"", h_dec: "0.403", h_mm: "10.24", thread_l6: "1.50\"", star: false },
  { size: "3/4\"", d: "0.750", tpi: "10", waf: "1-1/8\"", waf_dec: "1.125", waf_mm: "28.58", wac: "1.299", h: "1/2\"", h_dec: "0.483", h_mm: "12.27", thread_l6: "1.75\"", star: true },
  { size: "7/8\"", d: "0.875", tpi: "9", waf: "1-5/16\"", waf_dec: "1.313", waf_mm: "33.34", wac: "1.516", h: "37/64\"", h_dec: "0.563", h_mm: "14.30", thread_l6: "2.00\"", star: false },
  { size: "1\"", d: "1.000", tpi: "8", waf: "1-1/2\"", waf_dec: "1.500", waf_mm: "38.10", wac: "1.732", h: "43/64\"", h_dec: "0.627", h_mm: "15.93", thread_l6: "2.25\"", star: true },
  { size: "1-1/8\"", d: "1.125", tpi: "7", waf: "1-11/16\"", waf_dec: "1.688", waf_mm: "42.88", wac: "1.949", h: "11/16\"", h_dec: "0.718", h_mm: "18.24", thread_l6: "2.50\"", star: false },
  { size: "1-1/4\"", d: "1.250", tpi: "7", waf: "1-7/8\"", waf_dec: "1.875", waf_mm: "47.63", wac: "2.165", h: "25/32\"", h_dec: "0.813", h_mm: "20.65", thread_l6: "2.75\"", star: false },
  { size: "1-3/8\"", d: "1.375", tpi: "6", waf: "2-1/16\"", waf_dec: "2.063", waf_mm: "52.39", wac: "2.382", h: "27/32\"", h_dec: "0.878", h_mm: "22.30", thread_l6: "3.00\"", star: false },
  { size: "1-1/2\"", d: "1.500", tpi: "6", waf: "2-1/4\"", waf_dec: "2.250", waf_mm: "57.15", wac: "2.598", h: "15/16\"", h_dec: "0.974", h_mm: "24.74", thread_l6: "3.25\"", star: false },
  { size: "1-3/4\"", d: "1.750", tpi: "5", waf: "2-5/8\"", waf_dec: "2.625", waf_mm: "66.68", wac: "3.031", h: "1-3/32\"", h_dec: "1.134", h_mm: "28.80", thread_l6: "3.75\"", star: false },
  { size: "2\"", d: "2.000", tpi: "4.5", waf: "3\"", waf_dec: "3.000", waf_mm: "76.20", wac: "3.464", h: "1-7/32\"", h_dec: "1.263", h_mm: "32.08", thread_l6: "4.25\"", star: false },
];

const HEAVY_HEX_IMPERIAL = [
  { size: "1/2\"", d: "0.500", tpi: "13", waf: "7/8\"", waf_dec: "0.875", waf_mm: "22.23", h: "5/16\"", h_dec: "0.317", h_mm: "8.05", star: true },
  { size: "5/8\"", d: "0.625", tpi: "11", waf: "1-1/16\"", waf_dec: "1.063", waf_mm: "26.99", h: "25/64\"", h_dec: "0.397", h_mm: "10.08", star: false },
  { size: "3/4\"", d: "0.750", tpi: "10", waf: "1-1/4\"", waf_dec: "1.250", waf_mm: "31.75", h: "15/32\"", h_dec: "0.478", h_mm: "12.14", star: true },
  { size: "7/8\"", d: "0.875", tpi: "9", waf: "1-7/16\"", waf_dec: "1.438", waf_mm: "36.51", h: "35/64\"", h_dec: "0.556", h_mm: "14.12", star: false },
  { size: "1\"", d: "1.000", tpi: "8", waf: "1-5/8\"", waf_dec: "1.625", waf_mm: "41.28", h: "39/64\"", h_dec: "0.620", h_mm: "15.75", star: true },
  { size: "1-1/8\"", d: "1.125", tpi: "7", waf: "1-13/16\"", waf_dec: "1.813", waf_mm: "46.04", h: "11/16\"", h_dec: "0.684", h_mm: "17.37", star: false },
  { size: "1-1/4\"", d: "1.250", tpi: "7", waf: "2\"", waf_dec: "2.000", waf_mm: "50.80", h: "25/32\"", h_dec: "0.780", h_mm: "19.81", star: false },
  { size: "1-3/8\"", d: "1.375", tpi: "6", waf: "2-3/16\"", waf_dec: "2.188", waf_mm: "55.58", h: "27/32\"", h_dec: "0.876", h_mm: "22.25", star: false },
  { size: "1-1/2\"", d: "1.500", tpi: "6", waf: "2-3/8\"", waf_dec: "2.375", waf_mm: "60.33", h: "15/16\"", h_dec: "0.940", h_mm: "23.88", star: false },
  { size: "1-3/4\"", d: "1.750", tpi: "5", waf: "2-3/4\"", waf_dec: "2.750", waf_mm: "69.85", h: "1-3/64\"", h_dec: "1.067", h_mm: "27.10", star: false },
  { size: "2\"", d: "2.000", tpi: "4.5", waf: "3-1/8\"", waf_dec: "3.125", waf_mm: "79.38", h: "1-11/64\"", h_dec: "1.175", h_mm: "29.85", star: false },
  { size: "2-1/4\"", d: "2.250", tpi: "4.5", waf: "3-1/2\"", waf_dec: "3.500", waf_mm: "88.90", h: "1-5/16\"", h_dec: "1.317", h_mm: "33.45", star: false },
  { size: "2-1/2\"", d: "2.500", tpi: "4", waf: "3-7/8\"", waf_dec: "3.875", waf_mm: "98.43", h: "1-29/64\"", h_dec: "1.464", h_mm: "37.19", star: false },
  { size: "2-3/4\"", d: "2.750", tpi: "4", waf: "4-1/4\"", waf_dec: "4.250", waf_mm: "107.95", h: "1-37/64\"", h_dec: "1.590", h_mm: "40.39", star: false },
  { size: "3\"", d: "3.000", tpi: "4", waf: "4-5/8\"", waf_dec: "4.625", waf_mm: "117.48", h: "1-49/64\"", h_dec: "1.780", h_mm: "45.21", star: false },
];

const HEX_BOLT_METRIC = [
  { size: "M5", pitch: "0.80", waf: "8", wac: "9.24", h: "3.65", thread_l125: "16", star: false },
  { size: "M6", pitch: "1.00", waf: "10", wac: "11.55", h: "4.15", thread_l125: "18", star: true },
  { size: "M8", pitch: "1.25", waf: "13", wac: "15.01", h: "5.45", thread_l125: "22", star: true },
  { size: "M10", pitch: "1.50", waf: "17", wac: "19.64", h: "6.58", thread_l125: "26", star: true },
  { size: "M12", pitch: "1.75", waf: "19", wac: "21.94", h: "7.68", thread_l125: "30", star: true },
  { size: "M14", pitch: "2.00", waf: "22", wac: "25.40", h: "9.09", thread_l125: "34", star: false },
  { size: "M16", pitch: "2.00", waf: "24", wac: "27.71", h: "10.18", thread_l125: "38", star: true },
  { size: "M18", pitch: "2.50", waf: "27", wac: "31.18", h: "11.28", thread_l125: "42", star: false },
  { size: "M20", pitch: "2.50", waf: "30", wac: "34.64", h: "12.43", thread_l125: "46", star: true },
  { size: "M22", pitch: "2.50", waf: "32", wac: "36.95", h: "13.43", thread_l125: "50", star: false },
  { size: "M24", pitch: "3.00", waf: "36", wac: "41.57", h: "14.48", thread_l125: "54", star: true },
  { size: "M27", pitch: "3.00", waf: "41", wac: "47.34", h: "16.58", thread_l125: "60", star: false },
  { size: "M30", pitch: "3.50", waf: "46", wac: "53.12", h: "18.68", thread_l125: "66", star: false },
  { size: "M33", pitch: "3.50", waf: "50", wac: "57.74", h: "20.78", thread_l125: "72", star: false },
  { size: "M36", pitch: "4.00", waf: "55", wac: "63.51", h: "22.88", thread_l125: "78", star: false },
  { size: "M39", pitch: "4.00", waf: "60", wac: "69.28", h: "24.98", thread_l125: "84", star: false },
  { size: "M42", pitch: "4.50", waf: "65", wac: "75.06", h: "26.97", thread_l125: "90", star: false },
  { size: "M48", pitch: "5.00", waf: "75", wac: "86.60", h: "30.97", thread_l125: "102", star: false },
  { size: "M56", pitch: "5.50", waf: "85", wac: "98.15", h: "35.40", thread_l125: "118", star: false },
  { size: "M64", pitch: "6.00", waf: "95", wac: "109.70", h: "39.95", thread_l125: "134", star: false },
];

const THREAD_LENGTH_INFO = [
  { rule: "Imperial — Length ≤ 6\"", formula: "Thread Length = (2 × D) + 0.25\"", example: "1/2\" bolt: (2 × 0.5) + 0.25 = 1.25\" thread length", standard: "ASME B18.2.1" },
  { rule: "Imperial — Length > 6\"", formula: "Thread Length = (2 × D) + 0.50\"", example: "1/2\" bolt 8\" long: (2 × 0.5) + 0.50 = 1.50\" thread length", standard: "ASME B18.2.1" },
  { rule: "Metric — Length ≤ 125mm", formula: "Thread Length = (2 × D) + 6mm", example: "M12 bolt: (2 × 12) + 6 = 30mm thread length", standard: "ISO 4014 / DIN 931" },
  { rule: "Metric — 125mm < Length ≤ 200mm", formula: "Thread Length = (2 × D) + 12mm", example: "M12 bolt 150mm: (2 × 12) + 12 = 36mm thread length", standard: "ISO 4014 / DIN 931" },
  { rule: "Metric — Length > 200mm", formula: "Thread Length = (2 × D) + 25mm", example: "M12 bolt 250mm: (2 × 12) + 25 = 49mm thread length", standard: "ISO 4014 / DIN 931" },
];

export default function BoltDimensions() {
  const [activeTab, setActiveTab] = useState("hex_imperial");
  const [search, setSearch] = useState("");

  const tabs = [
    { id: "hex_imperial", label: "Hex (Imperial)" },
    { id: "heavy_hex", label: "Heavy Hex" },
    { id: "hex_metric", label: "Hex (Metric)" },
    { id: "thread_length", label: "Thread Length" },
  ];

  const getData = () => {
    switch (activeTab) {
      case "hex_imperial": return HEX_BOLT_IMPERIAL;
      case "heavy_hex": return HEAVY_HEX_IMPERIAL;
      case "hex_metric": return HEX_BOLT_METRIC;
      default: return [];
    }
  };

  const filtered = getData().filter(r =>
    r.size.toLowerCase().includes(search.toLowerCase())
  );

  const isMetric = activeTab === "hex_metric";

  return (
    <div style={{ fontFamily: "'DM Sans','Segoe UI',sans-serif", background: BG, minHeight: "100vh", maxWidth: 430, margin: "0 auto" }}>

      {/* HEADER */}
      <div style={{ background: `linear-gradient(135deg, ${NAVY} 0%, #2C5282 100%)`, padding: "16px 20px 20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
          <span style={{ fontSize: 20 }}>⬡</span>
          <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 10, letterSpacing: 2, textTransform: "uppercase" }}>Fastener Companion</span>
        </div>
        <div style={{ color: WHITE, fontSize: 20, fontWeight: 800, marginBottom: 2 }}>Bolt Dimensions</div>
        <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 11 }}>ASME B18.2.1-2012 · ISO 4014/4017 · DIN 931/933 · ASME B18.2.3.1M</div>
        <div style={{ background: WHITE, borderRadius: 12, display: "flex", alignItems: "center", padding: "10px 14px", gap: 8, marginTop: 14, boxShadow: "0 2px 8px rgba(0,0,0,0.15)" }}>
          <span style={{ color: MUTED }}>??</span>
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search bolt size..."
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

      {activeTab !== "thread_length" && (
        <>
          {/* INFO BANNER */}
          <div style={{ margin: "12px 16px 0", background: STAR_BG, border: `1px solid ${STAR_BORDER}`, borderRadius: 10, padding: "10px 14px" }}>
            <div style={{ fontSize: 11, color: "#92400E", lineHeight: 1.5 }}>
              {activeTab === "hex_imperial" && <><strong>★ = Most common sizes.</strong> Standard hex bolt. WAF = Width Across Flats (wrench size). H = Head Height. Thread length varies by bolt length — see Thread Length tab.</>}
              {activeTab === "heavy_hex" && <><strong>Heavy hex has larger WAF than standard hex</strong> for same bolt diameter. Required for A325/A490 structural bolts. Use with A563 heavy hex nuts. Example: 1/2\" heavy hex uses 7/8\" wrench vs 3/4\" for standard.</>}
              {activeTab === "hex_metric" && <><strong>★ = Most common sizes.</strong> Per ISO 4014 (partial thread) and ISO 4017 (full thread). All dimensions in mm. Thread length shown for L ≤ 125mm — see Thread Length tab for formula.</>}
            </div>
          </div>

          {/* TABLE */}
          <div style={{ margin: "12px 16px 24px", background: WHITE, borderRadius: 14, overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.06)", border: `1px solid ${BORDER}` }}>
            {isMetric ? (
              <>
                <div style={{ display: "grid", gridTemplateColumns: "0.7fr 0.6fr 0.6fr 0.6fr 0.6fr 0.7fr", background: NAVY, padding: "10px 10px" }}>
                  {["Size", "Pitch", "WAF", "WAC", "H", "Thrd L"].map(h => (
                    <div key={h} style={{ color: WHITE, fontSize: 9, fontWeight: 700 }}>{h}</div>
                  ))}
                </div>
                {filtered.map((row, i) => (
                  <div key={i} style={{ display: "grid", gridTemplateColumns: "0.7fr 0.6fr 0.6fr 0.6fr 0.6fr 0.7fr", padding: "8px 10px", background: row.star ? STAR_BG : i % 2 === 0 ? WHITE : ROW_ALT, borderBottom: `1px solid ${BORDER}`, alignItems: "center" }}>
                    <div style={{ fontSize: 12, fontWeight: row.star ? 800 : 600, color: row.star ? NAVY : TEXT, display: "flex", alignItems: "center", gap: 3 }}>
                      {row.star && <span style={{ color: AMBER, fontSize: 9 }}>★</span>}
                      {row.size}
                    </div>
                    <div style={{ fontSize: 11, color: TEXT }}>{row.pitch}</div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: NAVY }}>{row.waf}mm</div>
                    <div style={{ fontSize: 11, color: TEXT }}>{row.wac}</div>
                    <div style={{ fontSize: 11, color: TEXT }}>{row.h}</div>
                    <div style={{ fontSize: 11, color: MUTED }}>{row.thread_l125}</div>
                  </div>
                ))}
              </>
            ) : (
              <>
                <div style={{ display: "grid", gridTemplateColumns: "0.8fr 0.6fr 0.9fr 0.7fr 0.7fr 0.7fr", background: NAVY, padding: "10px 10px" }}>
                  {["Size", "TPI", "WAF", "WAC\"", "H", "Thrd≤6\""].map(h => (
                    <div key={h} style={{ color: WHITE, fontSize: 9, fontWeight: 700 }}>{h}</div>
                  ))}
                </div>
                {filtered.map((row, i) => (
                  <div key={i} style={{ display: "grid", gridTemplateColumns: "0.8fr 0.6fr 0.9fr 0.7fr 0.7fr 0.7fr", padding: "8px 10px", background: row.star ? STAR_BG : i % 2 === 0 ? WHITE : ROW_ALT, borderBottom: `1px solid ${BORDER}`, alignItems: "center" }}>
                    <div style={{ fontSize: 12, fontWeight: row.star ? 800 : 600, color: row.star ? NAVY : TEXT, display: "flex", alignItems: "center", gap: 3 }}>
                      {row.star && <span style={{ color: AMBER, fontSize: 9 }}>★</span>}
                      {row.size}
                    </div>
                    <div style={{ fontSize: 11, color: TEXT }}>{row.tpi}</div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: NAVY }}>{row.waf}</div>
                    <div style={{ fontSize: 11, color: TEXT }}>{row.wac}"</div>
                    <div style={{ fontSize: 11, color: TEXT }}>{row.h}</div>
                    <div style={{ fontSize: 11, color: MUTED }}>{row.thread_l6}</div>
                  </div>
                ))}
              </>
            )}
          </div>
        </>
      )}

      {activeTab === "thread_length" && (
        <div style={{ padding: "14px 16px" }}>
          <div style={{ background: STAR_BG, border: `1px solid ${STAR_BORDER}`, borderRadius: 10, padding: "10px 14px", marginBottom: 14 }}>
            <div style={{ fontSize: 11, color: "#92400E", lineHeight: 1.5 }}>
              Thread length is the distance from the end of the bolt to where full thread engagement ends. Critical for specifying bolt length in a joint — grip length + thread length = minimum bolt length needed.
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {THREAD_LENGTH_INFO.map((item, i) => (
              <div key={i} style={{ background: WHITE, border: `1px solid ${BORDER}`, borderLeft: `4px solid ${NAVY}`, borderRadius: 12, padding: "12px 14px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
                <div style={{ fontSize: 12, fontWeight: 800, color: NAVY, marginBottom: 6 }}>{item.rule}</div>
                <div style={{ background: STAR_BG, borderRadius: 8, padding: "6px 10px", marginBottom: 8 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#92400E", fontFamily: "monospace" }}>{item.formula}</div>
                </div>
                <div style={{ fontSize: 11, color: TEXT, marginBottom: 4 }}><span style={{ fontWeight: 700 }}>Example:</span> {item.example}</div>
                <div style={{ fontSize: 10, color: MUTED }}>Source: {item.standard}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 14, background: "#EEF4FF", border: `1px solid ${BORDER}`, borderRadius: 12, padding: "12px 14px" }}>
            <div style={{ fontSize: 12, fontWeight: 800, color: NAVY, marginBottom: 6 }}>Selecting Correct Bolt Length</div>
            <div style={{ fontSize: 12, color: TEXT, lineHeight: 1.7 }}>
              Minimum bolt length = Grip length (material thickness) + Thread length needed for nut engagement{"\
\
"}
              Rule of thumb: 2–3 threads should protrude beyond the nut after tightening. Too few threads = inadequate engagement. Too many = wasted material and interference risk.
            </div>
          </div>
        </div>
      )}

      {/* DISCLAIMER */}
      <div style={{ margin: "0 16px 24px", background: "#FFF1F2", border: "1px solid #FECDD3", borderRadius: 10, padding: "10px 14px" }}>
        <div style={{ fontSize: 10, color: "#9F1239", lineHeight: 1.5 }}>
          <strong>⚠ Verify Before Use.</strong> Dimensions based on ASME B18.2.1-2012, ISO 4014/4017, DIN 931/933, and ASME B18.2.3.1M. Maximum dimensions shown — verify against current standard for tolerance ranges. Fastener Companion is a reference tool — not a substitute for engineering judgment.
        </div>
      </div>
    </div>
  );
}
