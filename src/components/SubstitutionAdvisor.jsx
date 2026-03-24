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
// SubstitutionAdvisor
// ════════════════════════════════════════════════════

// ─── DATA ─────────────────────────────────────────────────────────────────────
// Sources: SAE J429, ASTM F3125/A325/A490/A354/A193/A574, ISO 898-1/3506,
// JIS B1051, DIN 931/933, IFI 7th Ed., Portland Bolt, Fastenal Engineering

const SUBSTITUTION_DATABASE = [
  // JIS GRADES
  {
    id: "jis_scm435",
    match: ["jis", "scm435", "scm 435", "jis b1051"],
    original: "JIS B1051 — SCM435",
    original_system: "JIS (Japanese Industrial Standard)",
    source_problem: "SCM435 is a Japanese chromium-molybdenum alloy steel (JIS G4053) not produced in US domestic supply chains. Sourcing requires import from Japanese mills with 6–14 week lead times and premium pricing. No equivalent US alloy exists under the same designation.",
    tensile_orig: "~135 ksi (~931 MPa)",
    yield_orig: "~115 ksi (~793 MPa)",
    hardness_orig: "HRC 28–34",
    substitutes: [
      {
        spec: "SAE Grade 8",
        standard: "SAE J429",
        tensile: "150 ksi (1034 MPa)",
        yield: "130 ksi (896 MPa)",
        hardness: "HRC 33–39",
        availability: "★ COTS — Widely Available",
        avail_color: "#059669",
        equivalency: "ACCEPTABLE — Conservative (stronger)",
        equivalency_color: "#059669",
        engineering_required: true,
        notes: "Grade 8 exceeds SCM435 in both tensile and yield — conservative substitution. Dimensions must match original exactly. Torque values may need adjustment due to higher strength. Verify coating specification.",
        he_warning: "Grade 8 is susceptible to HE — if electroplating, require baking per ASTM F1941.",
      },
      {
        spec: "ISO 10.9",
        standard: "ISO 898-1",
        tensile: "151 ksi (1040 MPa)",
        yield: "136 ksi (940 MPa)",
        hardness: "HRC 32–39",
        availability: "★ COTS — Widely Available",
        avail_color: "#059669",
        equivalency: "ACCEPTABLE — Conservative (stronger)",
        equivalency_color: "#059669",
        engineering_required: true,
        notes: "ISO 10.9 is the metric equivalent recommendation. Identical thread dimensions (M-series). Exceeds original in strength — conservative substitution.",
        he_warning: "ISO 10.9 is susceptible to HE — avoid electroplating without baking.",
      },
    ],
  },
  {
    id: "jis_scm440",
    match: ["scm440", "scm 440"],
    original: "JIS — SCM440",
    original_system: "JIS (Japanese Industrial Standard)",
    source_problem: "SCM440 is a Japanese Cr-Mo alloy (higher carbon than SCM435) — not produced in US supply chains. Same sourcing challenges as SCM435: import-only, 6–14 week lead times.",
    tensile_orig: "~145 ksi (~1000 MPa)",
    yield_orig: "~125 ksi (~862 MPa)",
    hardness_orig: "HRC 30–36",
    substitutes: [
      {
        spec: "SAE Grade 8",
        standard: "SAE J429",
        tensile: "150 ksi (1034 MPa)",
        yield: "130 ksi (896 MPa)",
        hardness: "HRC 33–39",
        availability: "★ COTS — Widely Available",
        avail_color: "#059669",
        equivalency: "ACCEPTABLE — Comparable strength",
        equivalency_color: "#059669",
        engineering_required: true,
        notes: "Grade 8 closely matches SCM440 in strength range. Standard domestic substitute.",
        he_warning: "Grade 8 susceptible to HE — require baking if electroplating.",
      },
      {
        spec: "ASTM A354 Grade BD",
        standard: "ASTM A354",
        tensile: "150 ksi (1034 MPa) ≤2.5\"",
        yield: "130 ksi (896 MPa)",
        hardness: "HRC 33–39",
        availability: "COTS — Available",
        avail_color: "#D97706",
        equivalency: "ACCEPTABLE — Comparable",
        equivalency_color: "#059669",
        engineering_required: true,
        notes: "A354 BD provides similar properties with ASTM documentation trail. Good for applications requiring certified test reports.",
        he_warning: "A354 BD susceptible to HE — electroplating requires extended baking (10 hrs per revised standard).",
      },
    ],
  },
  // DIN GRADES
  {
    id: "din_8_8",
    match: ["din 8.8", "din8.8", "din 931 8.8", "din 933 8.8"],
    original: "DIN 8.8 (DIN 931/933)",
    original_system: "DIN (German Industrial Standard)",
    source_problem: "DIN 8.8 fasteners with German mill certifications and DIN-specific dimensional tolerances may not be readily stocked domestically. Many distributors carry ISO 8.8 which supersedes DIN in most applications, but some legacy equipment requires strict DIN compliance.",
    tensile_orig: "116 ksi (800 MPa)",
    yield_orig: "93 ksi (640 MPa)",
    hardness_orig: "HRC 22–32",
    substitutes: [
      {
        spec: "ISO 8.8",
        standard: "ISO 898-1 / ISO 4014",
        tensile: "116 ksi (800 MPa)",
        yield: "93 ksi (640 MPa)",
        hardness: "HRC 22–32",
        availability: "★ COTS — Widely Available",
        avail_color: "#059669",
        equivalency: "DIRECT EQUIVALENT",
        equivalency_color: "#059669",
        engineering_required: false,
        notes: "ISO 8.8 is the direct modern replacement for DIN 8.8. Dimensional standards are compatible. ISO supersedes DIN for most applications.",
        he_warning: null,
      },
      {
        spec: "SAE Grade 5",
        standard: "SAE J429",
        tensile: "120 ksi (827 MPa) ≤1\"",
        yield: "92 ksi (634 MPa)",
        hardness: "HRC 25–34",
        availability: "★ COTS — Widely Available",
        avail_color: "#059669",
        equivalency: "ACCEPTABLE — Imperial equivalent",
        equivalency_color: "#059669",
        engineering_required: true,
        notes: "Grade 5 is the closest imperial equivalent to 8.8. Note: if fastener is metric, Grade 5 may not be a direct dimensional match — verify thread series and dimensions.",
        he_warning: null,
      },
    ],
  },
  {
    id: "din_10_9",
    match: ["din 10.9", "din10.9", "din 931 10.9", "din 933 10.9"],
    original: "DIN 10.9",
    original_system: "DIN (German Industrial Standard)",
    source_problem: "Same as DIN 8.8 — DIN-specific certifications and legacy dimensional requirements may not be stocked domestically. ISO 10.9 supersedes in most applications.",
    tensile_orig: "151 ksi (1040 MPa)",
    yield_orig: "136 ksi (940 MPa)",
    hardness_orig: "HRC 32–39",
    substitutes: [
      {
        spec: "ISO 10.9",
        standard: "ISO 898-1",
        tensile: "151 ksi (1040 MPa)",
        yield: "136 ksi (940 MPa)",
        hardness: "HRC 32–39",
        availability: "★ COTS — Widely Available",
        avail_color: "#059669",
        equivalency: "DIRECT EQUIVALENT",
        equivalency_color: "#059669",
        engineering_required: false,
        notes: "ISO 10.9 is the direct modern replacement for DIN 10.9. ISO supersedes DIN.",
        he_warning: "10.9 susceptible to HE — require baking if electroplating.",
      },
    ],
  },
  // ASTM GRADES — common substitution questions
  {
    id: "a490_galv",
    match: ["a490 galvanized", "a490 hdg", "a490 hot dip"],
    original: "A490 — Hot-Dip Galvanized",
    original_system: "ASTM F3125 Grade A490",
    source_problem: "A490 + hot-dip galvanizing is PROHIBITED by AISC and ASTM. This is not a sourcing problem — it is a specification conflict. A490 must never be galvanized.",
    tensile_orig: "150–173 ksi",
    yield_orig: "130 ksi",
    hardness_orig: "HRC 33–38",
    substitutes: [
      {
        spec: "A490 — Plain or Mechanically Galvanized",
        standard: "ASTM F3125 / ASTM B695",
        tensile: "150–173 ksi",
        yield: "130 ksi",
        hardness: "HRC 33–38",
        availability: "COTS — Available",
        avail_color: "#D97706",
        equivalency: "CORRECT SPECIFICATION",
        equivalency_color: "#2563EB",
        engineering_required: true,
        notes: "A490 must be plain (uncoated) or mechanically galvanized (ASTM B695) only. Hot-dip galvanizing of A490 is explicitly prohibited — both AISC and ASTM prohibit this combination due to hydrogen embrittlement and strength concerns.",
        he_warning: "⛔ A490 + HDG is PROHIBITED. This is a print conflict — the specification must be corrected before procurement.",
      },
      {
        spec: "A325 — Hot-Dip Galvanized",
        standard: "ASTM F3125 / ASTM A153",
        tensile: "120 ksi (≤1\")",
        yield: "92 ksi",
        hardness: "HRC 25–34",
        availability: "★ COTS — Widely Available",
        avail_color: "#059669",
        equivalency: "LOWER STRENGTH ALTERNATIVE",
        equivalency_color: "#D97706",
        engineering_required: true,
        notes: "If HDG is required for corrosion protection, A325 is the appropriate grade — A325 can be galvanized per ASTM A153 with properly oversized threads. Structural engineer must confirm A325 is adequate for the application.",
        he_warning: null,
      },
    ],
  },
  {
    id: "a193_b7",
    match: ["b7", "a193 b7", "a193-b7", "astm b7", "b7 stud"],
    original: "ASTM A193 Grade B7",
    original_system: "ASTM A193 — Alloy Steel Stud Bolt",
    source_problem: "A193 B7 is widely available as stud bolts but may be harder to source as standard hex bolts. Also commonly confused with SAE Grade 8 — they are different products with different application purposes.",
    tensile_orig: "125 ksi (≤2.5\"), 115 ksi (2.5\"–4\")",
    yield_orig: "105 ksi (≤2.5\"), 95 ksi (2.5\"–4\")",
    hardness_orig: "HRC 35 max",
    substitutes: [
      {
        spec: "A193 B7 + A194 2H (correct pairing)",
        standard: "ASTM A193 / ASTM A194",
        tensile: "125 ksi (≤2.5\")",
        yield: "105 ksi",
        hardness: "HRC 35 max",
        availability: "★ COTS — Widely Available",
        avail_color: "#059669",
        equivalency: "CORRECT SPECIFICATION",
        equivalency_color: "#059669",
        engineering_required: false,
        notes: "A193 B7 studs must be paired with A194 Grade 2H heavy hex nuts — this is the universal standard for flange bolting. Verify the nut specification is also correct.",
        he_warning: null,
      },
      {
        spec: "SAE Grade 8 Hex Bolt (non-flange applications only)",
        standard: "SAE J429",
        tensile: "150 ksi",
        yield: "130 ksi",
        hardness: "HRC 33–39",
        availability: "★ COTS — Widely Available",
        avail_color: "#059669",
        equivalency: "LIMITED — Non-flange applications only",
        equivalency_color: "#D97706",
        engineering_required: true,
        notes: "Grade 8 may substitute for B7 in non-pressure, non-flange general industrial applications. Do NOT substitute Grade 8 for B7 in flange or pressure vessel applications — B7 is specified for temperature resistance and documented material traceability.",
        he_warning: null,
      },
    ],
  },
  {
    id: "grade8_stainless",
    match: ["grade 8 stainless", "gr8 stainless", "stainless grade 8", "stainless gr 8"],
    original: "Grade 8 Stainless Steel",
    original_system: "Non-standard specification — common field request",
    source_problem: "There is no 'Grade 8 Stainless' in any standard. SAE Grade 8 is an alloy steel grade — stainless steel uses a completely different classification system (ISO 3506 / ASTM F593). This is a specification conflict that needs clarification.",
    tensile_orig: "N/A — not a valid specification",
    yield_orig: "N/A",
    hardness_orig: "N/A",
    substitutes: [
      {
        spec: "A4-80 (316 SS) — Highest Common Stainless Grade",
        standard: "ISO 3506",
        tensile: "116 ksi (800 MPa)",
        yield: "87 ksi (600 MPa)",
        hardness: "HRC 22 max",
        availability: "COTS — Available",
        avail_color: "#D97706",
        equivalency: "CLOSEST STAINLESS EQUIVALENT",
        equivalency_color: "#2563EB",
        engineering_required: true,
        notes: "A4-80 (316 SS) provides the highest strength of common stainless grades. Note: A4-80 tensile (800 MPa/116 ksi) is significantly lower than Grade 8 (1034 MPa/150 ksi). If Grade 8 strength is required, stainless cannot meet it — evaluate if the application truly requires both high strength AND stainless corrosion resistance.",
        he_warning: "Always use anti-seize on stainless fasteners — galling is permanent.",
      },
      {
        spec: "A2-70 (304 SS) — Standard Stainless Grade",
        standard: "ISO 3506",
        tensile: "102 ksi (700 MPa)",
        yield: "73 ksi (450 MPa + proof)",
        hardness: "HRC 20 max",
        availability: "★ COTS — Widely Available",
        avail_color: "#059669",
        equivalency: "LOWER STRENGTH — Most common stainless",
        equivalency_color: "#D97706",
        engineering_required: true,
        notes: "A2-70 is the most common stainless fastener. 304 SS. Not marine grade — for saltwater use A4 (316 SS). Significantly lower strength than Grade 8 — verify adequacy.",
        he_warning: null,
      },
    ],
  },
  {
    id: "metric_grade5",
    match: ["metric grade 5", "m grade 5", "metric gr5"],
    original: "Metric Grade 5 equivalent",
    original_system: "Common field question",
    source_problem: "There is no 'Metric Grade 5' — SAE grades and metric property classes use completely different systems. The closest metric equivalent to SAE Grade 5 is ISO 8.8.",
    tensile_orig: "120 ksi SAE Grade 5 ≤1\"",
    yield_orig: "92 ksi",
    hardness_orig: "HRC 25–34",
    substitutes: [
      {
        spec: "ISO 8.8",
        standard: "ISO 898-1",
        tensile: "116 ksi (800 MPa)",
        yield: "93 ksi (640 MPa)",
        hardness: "HRC 22–32",
        availability: "★ COTS — Widely Available",
        avail_color: "#059669",
        equivalency: "CLOSEST METRIC EQUIVALENT",
        equivalency_color: "#059669",
        engineering_required: false,
        notes: "ISO 8.8 is the standard metric equivalent of SAE Grade 5. Note: 8.8 has slightly lower tensile (800 MPa vs 827 MPa for Grade 5 ≤1\") but is within normal engineering tolerance for most applications.",
        he_warning: null,
      },
    ],
  },
  {
    id: "metric_grade8",
    match: ["metric grade 8", "m grade 8", "metric gr8", "metric equivalent grade 8"],
    original: "Metric Grade 8 equivalent",
    original_system: "Common field question / substitution request",
    source_problem: "Critical clarification: 'Metric 8.8' is NOT equivalent to SAE Grade 8. This is the most common fastener substitution error in the field. ISO 10.9 is the correct metric equivalent of Grade 8.",
    tensile_orig: "150 ksi (1034 MPa) — SAE Grade 8",
    yield_orig: "130 ksi (896 MPa)",
    hardness_orig: "HRC 33–39",
    substitutes: [
      {
        spec: "ISO 10.9",
        standard: "ISO 898-1",
        tensile: "151 ksi (1040 MPa)",
        yield: "136 ksi (940 MPa)",
        hardness: "HRC 32–39",
        availability: "★ COTS — Widely Available",
        avail_color: "#059669",
        equivalency: "CORRECT METRIC EQUIVALENT",
        equivalency_color: "#059669",
        engineering_required: false,
        notes: "ISO 10.9 is the correct metric equivalent of SAE Grade 8 — NOT 8.8. ISO 8.8 is equivalent to Grade 5. This distinction is critical and commonly confused.",
        he_warning: "10.9 susceptible to HE — require baking if zinc electroplating.",
      },
      {
        spec: "⚠ ISO 8.8 is NOT Grade 8 equivalent",
        standard: "ISO 898-1",
        tensile: "116 ksi (800 MPa)",
        yield: "93 ksi (640 MPa)",
        hardness: "HRC 22–32",
        availability: "★ COTS",
        avail_color: "#DC2626",
        equivalency: "⚠ INCORRECT SUBSTITUTION — DO NOT USE for Grade 8 applications",
        equivalency_color: "#DC2626",
        engineering_required: true,
        notes: "8.8 is equivalent to Grade 5 (120 ksi), not Grade 8 (150 ksi). Using 8.8 where Grade 8 is specified is an under-strength substitution that could cause joint failure.",
        he_warning: null,
      },
    ],
  },
];

function findSubstitution(query) {
  const q = query.toLowerCase().trim();
  return SUBSTITUTION_DATABASE.find(item =>
    item.match.some(m => q.includes(m))
  ) || null;
}

const COMMON_SEARCHES = [
  "JIS SCM435", "JIS SCM440", "DIN 8.8", "DIN 10.9",
  "A490 Galvanized", "A193 B7", "Grade 8 Stainless", "Metric Grade 8",
];

export default function SubstitutionAdvisor() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);
  const [searched, setSearched] = useState(false);
  const [selectedSub, setSelectedSub] = useState(0);

  const handleSearch = (q) => {
    const searchQuery = q || query;
    if (!searchQuery.trim()) return;
    const found = findSubstitution(searchQuery);
    setResult(found);
    setSearched(true);
    setSelectedSub(0);
  };

  const reset = () => {
    setQuery("");
    setResult(null);
    setSearched(false);
    setSelectedSub(0);
  };

  const sub = result?.substitutes[selectedSub];

  return (
    <div style={{ fontFamily: "'DM Sans','Segoe UI',sans-serif", background: BG, minHeight: "100vh", maxWidth: 430, margin: "0 auto" }}>

      {/* HEADER */}
      <div style={{ background: `linear-gradient(135deg, ${NAVY} 0%, #2C5282 100%)`, padding: "16px 20px 20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
          <span style={{ fontSize: 20 }}>⬡</span>
          <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 10, letterSpacing: 2, textTransform: "uppercase" }}>Fastener Companion</span>
        </div>
        <div style={{ color: WHITE, fontSize: 20, fontWeight: 800, marginBottom: 2 }}>Substitution Advisor</div>
        <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 11 }}>SAE J429 · ISO 898-1 · ASTM A193/A354/F3125 · JIS B1051 · DIN 931/933 · IFI 7th Ed.</div>

        {/* SEARCH */}
        <div style={{ background: WHITE, borderRadius: 12, display: "flex", alignItems: "center", padding: "10px 14px", gap: 8, marginTop: 14, boxShadow: "0 2px 8px rgba(0,0,0,0.15)" }}>
          <span style={{ color: MUTED }}>??</span>
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleSearch()}
            placeholder="Enter spec e.g. JIS SCM435, DIN 8.8, Grade 8 SS..."
            style={{ background: "none", border: "none", outline: "none", color: TEXT, fontSize: 13, flex: 1, fontFamily: "inherit" }}
          />
          {query && <span onClick={() => setQuery("")} style={{ color: MUTED, cursor: "pointer" }}>✕</span>}
        </div>
        <button onClick={() => handleSearch()} style={{ marginTop: 10, width: "100%", background: AMBER, color: NAVY, border: "none", borderRadius: 10, padding: "11px", fontSize: 13, fontWeight: 800, cursor: "pointer", fontFamily: "inherit" }}>
          Find Substitute →
        </button>
      </div>

      {/* COMMON SEARCHES */}
      {!searched && (
        <div style={{ padding: "14px 16px" }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: MUTED, textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 10 }}>Common Substitution Requests</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {COMMON_SEARCHES.map((s) => (
              <button key={s} onClick={() => { setQuery(s); handleSearch(s); }}
                style={{ background: WHITE, border: `1px solid ${BORDER}`, borderRadius: 20, padding: "6px 14px", fontSize: 11, fontWeight: 700, color: NAVY, cursor: "pointer", fontFamily: "inherit" }}>
                {s}
              </button>
            ))}
          </div>

          <div style={{ marginTop: 20, background: STAR_BG, border: `1px solid ${STAR_BORDER}`, borderRadius: 12, padding: "12px 14px" }}>
            <div style={{ fontSize: 12, fontWeight: 800, color: "#92400E", marginBottom: 6 }}>⚠ Most Common Error in the Field</div>
            <div style={{ fontSize: 12, color: TEXT, lineHeight: 1.6 }}>
              <strong>ISO 8.8 ≠ SAE Grade 8.</strong> Metric 8.8 (800 MPa / 116 ksi) is equivalent to SAE Grade 5 — not Grade 8. SAE Grade 8 (150 ksi) is equivalent to ISO 10.9. Using 8.8 where Grade 8 is specified is an under-strength substitution that can cause joint failure.
            </div>
          </div>
        </div>
      )}

      {/* RESULT */}
      {searched && result && sub && (
        <div style={{ padding: "14px 16px" }}>

          {/* ORIGINAL SPEC */}
          <div style={{ background: WHITE, border: `1px solid ${BORDER}`, borderLeft: "4px solid #DC2626", borderRadius: 12, padding: "12px 14px", marginBottom: 12, boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: MUTED, textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 4 }}>Original Specification</div>
            <div style={{ fontSize: 14, fontWeight: 800, color: NAVY, marginBottom: 2 }}>{result.original}</div>
            <div style={{ fontSize: 11, color: MUTED, marginBottom: 8 }}>{result.original_system}</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6, marginBottom: 10 }}>
              {[
                { label: "Tensile", value: result.tensile_orig },
                { label: "Yield", value: result.yield_orig },
                { label: "Hardness", value: result.hardness_orig },
              ].map((item, i) => (
                <div key={i} style={{ background: ROW_ALT, borderRadius: 8, padding: "6px 8px", border: `1px solid ${BORDER}` }}>
                  <div style={{ fontSize: 9, color: MUTED, textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 1 }}>{item.label}</div>
                  <div style={{ fontSize: 10, fontWeight: 700, color: TEXT, lineHeight: 1.3 }}>{item.value}</div>
                </div>
              ))}
            </div>
            <div style={{ background: "#FFF1F2", borderRadius: 8, padding: "8px 10px" }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: "#DC2626", marginBottom: 3 }}>WHY THIS IS DIFFICULT TO SOURCE</div>
              <div style={{ fontSize: 11, color: TEXT, lineHeight: 1.5 }}>{result.source_problem}</div>
            </div>
          </div>

          {/* SUBSTITUTE SELECTOR */}
          {result.substitutes.length > 1 && (
            <div style={{ display: "flex", gap: 8, marginBottom: 12, overflowX: "auto", scrollbarWidth: "none" }}>
              {result.substitutes.map((s, i) => (
                <button key={i} onClick={() => setSelectedSub(i)}
                  style={{
                    flexShrink: 0, padding: "6px 14px", borderRadius: 20,
                    border: `2px solid ${selectedSub === i ? NAVY : BORDER}`,
                    background: selectedSub === i ? NAVY : WHITE,
                    color: selectedSub === i ? WHITE : MUTED,
                    fontSize: 11, fontWeight: 700, cursor: "pointer", fontFamily: "inherit",
                  }}>Option {i + 1}: {s.spec.split(" ")[0]} {s.spec.split(" ")[1] || ""}
                </button>
              ))}
            </div>
          )}

          {/* SUBSTITUTE DETAIL */}
          <div style={{ background: WHITE, border: `1px solid ${BORDER}`, borderLeft: "4px solid #059669", borderRadius: 12, padding: "12px 14px", marginBottom: 10, boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: MUTED, textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 4 }}>Recommended Substitute</div>
            <div style={{ fontSize: 14, fontWeight: 800, color: NAVY, marginBottom: 2 }}>{sub.spec}</div>
            <div style={{ fontSize: 11, color: MUTED, marginBottom: 8 }}>{sub.standard}</div>
            <div style={{ display: "inline-block", background: sub.avail_color + "15", border: `1px solid ${sub.avail_color}`, borderRadius: 6, padding: "2px 10px", fontSize: 10, fontWeight: 700, color: sub.avail_color, marginBottom: 8 }}>{sub.availability}</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6, marginBottom: 10 }}>
              {[
                { label: "Tensile", value: sub.tensile },
                { label: "Yield", value: sub.yield },
                { label: "Hardness", value: sub.hardness },
              ].map((item, i) => (
                <div key={i} style={{ background: ROW_ALT, borderRadius: 8, padding: "6px 8px", border: `1px solid ${BORDER}` }}>
                  <div style={{ fontSize: 9, color: MUTED, textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 1 }}>{item.label}</div>
                  <div style={{ fontSize: 10, fontWeight: 700, color: TEXT, lineHeight: 1.3 }}>{item.value}</div>
                </div>
              ))}
            </div>
            <div style={{ background: sub.equivalency_color + "15", border: `1px solid ${sub.equivalency_color}`, borderRadius: 8, padding: "8px 10px", marginBottom: 8 }}>
              <div style={{ fontSize: 11, fontWeight: 800, color: sub.equivalency_color }}>{sub.equivalency}</div>
            </div>
            <div style={{ fontSize: 12, color: TEXT, lineHeight: 1.6, marginBottom: sub.he_warning ? 8 : 0 }}>{sub.notes}</div>
            {sub.he_warning && (
              <div style={{ background: "#FFF1F2", border: "1px solid #FECDD3", borderRadius: 8, padding: "8px 10px", marginTop: 8 }}>
                <div style={{ fontSize: 11, color: "#9F1239", lineHeight: 1.5 }}>⚡ {sub.he_warning}</div>
              </div>
            )}
          </div>

          {/* ENGINEERING REVIEW */}
          {sub.engineering_required && (
            <div style={{ background: STAR_BG, border: `1px solid ${STAR_BORDER}`, borderLeft: "4px solid #D97706", borderRadius: 12, padding: "12px 14px", marginBottom: 10 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#D97706", marginBottom: 4 }}>?? Engineering Sign-Off Recommended</div>
              <div style={{ fontSize: 12, color: TEXT, lineHeight: 1.5 }}>This substitution changes the specification from the original design intent. Engineering review is recommended before implementation, especially for structural, pressure-containing, or safety-critical applications.</div>
            </div>
          )}

          <button onClick={reset} style={{ width: "100%", background: NAVY, color: WHITE, border: "none", borderRadius: 12, padding: "13px", fontSize: 13, fontWeight: 800, cursor: "pointer", fontFamily: "inherit", marginBottom: 12 }}>
            ← New Search
          </button>

          <div style={{ background: "#FFF1F2", border: "1px solid #FECDD3", borderRadius: 10, padding: "10px 14px" }}>
            <div style={{ fontSize: 10, color: "#9F1239", lineHeight: 1.5 }}>
              <strong>⚠ Verify Before Use.</strong> Substitution guidance based on SAE J429, ISO 898-1, ASTM F3125/A193/A354, JIS B1051, DIN 931/933, and IFI 7th Edition. Substitutions may require engineering approval depending on application. Always verify dimensions, coating spec, and torque values when substituting. Fastener Companion is a reference tool — not a substitute for engineering judgment.
            </div>
          </div>
        </div>
      )}

      {/* NO RESULT */}
      {searched && !result && (
        <div style={{ padding: "40px 24px", textAlign: "center" }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>??</div>
          <div style={{ fontSize: 14, fontWeight: 700, color: NAVY, marginBottom: 8 }}>Spec Not Found</div>
          <div style={{ fontSize: 12, color: MUTED, lineHeight: 1.6, marginBottom: 16 }}>
            Try searching for: JIS SCM435, JIS SCM440, DIN 8.8, DIN 10.9, A490 Galvanized, A193 B7, Grade 8 Stainless, or Metric Grade 8.
          </div>
          <button onClick={reset} style={{ background: NAVY, color: WHITE, border: "none", borderRadius: 10, padding: "11px 24px", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
            Try Again
          </button>
        </div>
      )}
    </div>
  );
}
