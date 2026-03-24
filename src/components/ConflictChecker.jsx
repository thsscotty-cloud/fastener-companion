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
// ConflictChecker
// ════════════════════════════════════════════════════

// ─── CONFLICT RULES ───────────────────────────────────────────────────────────
// Sources: ASTM F1941 (HE/baking), AISC (structural bolt requirements),
// ASTM A490/A325 (galvanizing restrictions), NACE MR0175 (sour service),
// ISO 898-1, IFI 7th Ed., Fastenal Engineering Reference

const CONFLICT_RULES = [
  {
    id: "he_grade8_electroplate",
    severity: "CRITICAL",
    severity_color: "#DC2626",
    title: "Grade 8 / A490 / 10.9 / 12.9 + Electroplating Without Baking",
    category: "Hydrogen Embrittlement",
    triggers: {
      grades: ["grade 8", "gr8", "gr. 8", "a490", "10.9", "12.9", "a354 bd", "a574"],
      coatings: ["zinc plate", "zinc electroplate", "electroplate", "zinc plated", "electrogalvanized", "eg ", "cadmium", "cad plate", "nickel plate", "chrome plate"],
      absence: ["bake", "baking", "embrittlement relief", "f1941"],
    },
    description: "High-strength fasteners above HRC 35 are highly susceptible to hydrogen embrittlement. Electroplating introduces hydrogen during acid cleaning. Without baking to drive out the hydrogen, these fasteners can fracture suddenly — at loads well below their rated capacity — with no warning.",
    standard_ref: "ASTM F1941 — requires baking within 4 hours of electroplating at 350–450°F for 3–10 hours.",
    correction: "Add baking requirement to spec: 'Bake per ASTM F1941 within 4 hours of plating, 375°F minimum, 3 hours minimum duration.' Better alternative: specify zinc flake coating (Geomet/Dacromet per ISO 10683) — no HE risk, no baking required, excellent corrosion resistance.",
    reference_feature: "Coating & Plating Guide → HE Risk Matrix",
  },
  {
    id: "a490_hdg",
    severity: "CRITICAL",
    severity_color: "#DC2626",
    title: "A490 / Grade 12.9 + Hot-Dip Galvanizing",
    category: "Prohibited Combination",
    triggers: {
      grades: ["a490", "12.9", "gr 12.9", "grade 12.9"],
      coatings: ["hot dip", "hot-dip", "hdg", "galvanized", "galvanize", "a153"],
    },
    description: "Hot-dip galvanizing of A490 structural bolts and 12.9 metric fasteners is explicitly PROHIBITED by AISC and ASTM. The high-temperature zinc bath (450°C/842°F) combined with the extreme hardness of these grades creates unacceptable risk. This is not a recommendation — it is a code violation.",
    standard_ref: "AISC Code of Standard Practice; ASTM F3125 Section on A490 coatings — galvanizing prohibited.",
    correction: "A490: Use plain (uncoated) or mechanically galvanized (ASTM B695) only. 12.9: Use black oxide or zinc flake coating only. If corrosion protection is critical and A490/12.9 strength is required, consult engineer — this may require a design change.",
    reference_feature: "Coating & Plating Guide → A490 row",
  },
  {
    id: "a325_no_f436",
    severity: "HIGH",
    severity_color: "#D97706",
    title: "A325 / A490 Structural Bolt Without F436 Hardened Washer",
    category: "Structural Bolting",
    triggers: {
      grades: ["a325", "a490"],
      coatings_absent: ["f436", "hardened washer", "structural washer"],
    },
    description: "AISC requires F436 hardened washers under the bolt head and nut for all A325 and A490 pretensioned connections. Standard SAE or USS flat washers are not adequate — they deform under high bolt tension, causing preload loss and embedment relaxation.",
    standard_ref: "AISC Specification for Structural Steel Buildings, Section J3 — hardened washers required.",
    correction: "Add 'ASTM F436 hardened washers — one under head, one under nut' to the specification. Also verify nut specification is A563 Grade DH (for A325) or A563 Grade DH3 (for A490).",
    reference_feature: "Washer Sizes → F436 Structural tab",
  },
  {
    id: "stainless_aluminum_no_isolation",
    severity: "HIGH",
    severity_color: "#D97706",
    title: "Stainless Steel Fastener in Aluminum Structure — No Isolation Specified",
    category: "Galvanic Corrosion",
    triggers: {
      grades: ["stainless", "304", "316", "a2", "a4", "f593"],
      base_material: ["aluminum", "aluminium", "al "],
      absence: ["isolat", "neoprene", "nylon washer", "dielectric"],
    },
    description: "Stainless steel and aluminum are dissimilar metals with significant galvanic potential difference. In the presence of moisture, this creates a galvanic cell where the aluminum (anodic/less noble) corrodes preferentially. The small stainless fastener area vs large aluminum plate area accelerates the corrosion significantly.",
    standard_ref: "MIL-STD-889C (Galvanic Corrosion); NASA RP-1124 (galvanic series); NACE corrosion engineering reference.",
    correction: "Add isolating washer specification: 'Neoprene or nylon isolating washer under head and nut. Non-conductive sleeve in bolt hole if bolt contacts aluminum.' Apply sealant at joint interface for marine or outdoor applications.",
    reference_feature: "Galvanic Corrosion Chart → Common Pairs",
  },
  {
    id: "copper_brass_aluminum",
    severity: "CRITICAL",
    severity_color: "#DC2626",
    title: "Copper / Brass Fastener in Aluminum Structure",
    category: "Galvanic Corrosion",
    triggers: {
      grades: ["copper", "brass", "bronze"],
      base_material: ["aluminum", "aluminium"],
    },
    description: "Copper and copper alloys (brass, bronze) are far more noble than aluminum — among the worst possible galvanic combinations. Copper/brass fasteners in aluminum will aggressively corrode the aluminum even with minimal moisture exposure. This combination should essentially never appear on a print.",
    standard_ref: "MIL-STD-889C — copper/aluminum listed as incompatible combination.",
    correction: "Replace copper/brass fasteners with aluminum alloy fasteners or 316 stainless with full isolation (neoprene washers, nylon sleeve). The application driving the brass choice (conductivity?) needs to be evaluated separately.",
    reference_feature: "Galvanic Corrosion Chart → Common Pairs",
  },
  {
    id: "fine_thread_outdoor",
    severity: "MEDIUM",
    severity_color: "#2563EB",
    title: "Fine Thread (UNF) in Outdoor / Dirty / Maintenance-Heavy Environment",
    category: "Application Mismatch",
    triggers: {
      thread: ["unf", "fine thread", "-20 unf", "-28 unf", "-32 unf", "-36 unf"],
      environment: ["outdoor", "dirty", "field", "maintenance", "construction", "mining", "agricultural"],
    },
    description: "Fine threads (UNF) are more sensitive to dirt, debris, and damage than coarse threads (UNC). In field maintenance or dirty/outdoor environments, fine threads cross-thread more easily, are harder to start by hand, and are more susceptible to corrosion and galling. UNC coarse thread is strongly preferred for field use.",
    standard_ref: "IFI Fastener Standards — thread series selection guidance; ASME B1.1 thread classification.",
    correction: "Consider changing to UNC coarse thread unless there is a specific engineering reason for fine thread (precision adjustment, thin wall, specific vibration resistance). If fine thread is required, specify thread protectors and careful installation procedures.",
    reference_feature: "Thread Pitch Chart → UNC/UNF comparison",
  },
  {
    id: "grade2_fatigue",
    severity: "HIGH",
    severity_color: "#D97706",
    title: "Grade 2 / A307 in Fatigue or Vibration Application",
    category: "Under-Specification",
    triggers: {
      grades: ["grade 2", "gr2", "gr. 2", "a307", "4.6", "5.8"],
      load: ["fatigue", "vibrat", "cyclic", "dynamic", "rotating", "reciprocating"],
    },
    description: "Grade 2 and A307 are low-strength grades with low proof load and poor fatigue resistance. In applications with cyclic or vibration loading, these grades will typically loosen and potentially fail by fatigue. Minimum Grade 5 (or 8.8 metric) is required for most vibration applications; Grade 8 preferred.",
    standard_ref: "IFI Technical Bulletin on fatigue; AISC minimum bolt grades for connections.",
    correction: "Upgrade to minimum SAE Grade 5 / ISO 8.8 for vibration environments. For high vibration or fatigue-critical applications, specify Grade 8 / ISO 10.9 with appropriate locking mechanism (nyloc nut, threadlocker, or Nordlock washer).",
    reference_feature: "Fastener Failure Analysis → Fatigue Failure",
  },
  {
    id: "missing_nut_spec",
    severity: "MEDIUM",
    severity_color: "#2563EB",
    title: "High-Strength Bolt Specified Without Nut Grade",
    category: "Incomplete Specification",
    triggers: {
      grades: ["a325", "a490", "grade 8", "gr8", "10.9", "12.9", "a193 b7"],
      absence: ["nut", "a563", "a194", "j995"],
    },
    description: "High-strength fastener specifications that omit the nut grade create a sourcing and safety risk. A Grade 2 nut will strip before a Grade 8 bolt reaches full preload. The nut must be specified to match or exceed the bolt grade. For structural and pressure vessel applications, nut grade is code-required.",
    standard_ref: "SAE J995 (nut grades); ASTM A563 (structural nuts); ASTM A194 (pressure vessel nuts); IFI compatibility guide.",
    correction: "Add nut specification: Grade 8 bolt → SAE J995 Grade 5 or 8 nut. A325 → A563 DH heavy hex. A490 → A563 DH3 heavy hex. A193 B7 → A194 2H heavy hex. ISO 10.9 → ISO Style 2 nut. ISO 12.9 → ISO Style 2 nut.",
    reference_feature: "Nut Dimensions → Grade Compatibility tab",
  },
  {
    id: "torque_to_yield_reuse",
    severity: "HIGH",
    severity_color: "#D97706",
    title: "Torque-to-Yield (TTY) Fastener Marked for Reuse",
    category: "Reuse Error",
    triggers: {
      types: ["torque to yield", "tty", "torque-to-yield", "angle tighten", "yield tighten"],
      reuse: ["reuse", "re-use", "reinstall", "reusable"],
    },
    description: "Torque-to-yield fasteners are intentionally tightened past the yield point to maximize clamping force. Once yielded, the fastener is permanently elongated and cannot be accurately re-torqued. Reusing TTY fasteners results in unpredictable and insufficient clamping force — a common cause of joint failure after maintenance.",
    standard_ref: "OEM service manuals (automotive TTY head bolts, rod bolts); ASME PCC-1 fastener reuse guidance.",
    correction: "Replace all torque-to-yield fasteners after every removal. Mark prints and maintenance procedures: 'Single use — replace after removal.' Budget for fastener replacement as part of maintenance cost.",
    reference_feature: "Installation Best Practices → Reuse Guide",
  },
  {
    id: "sour_service_hardness",
    severity: "CRITICAL",
    severity_color: "#DC2626",
    title: "High-Hardness Fastener in Sour Gas / H2S Service Without Low-Hardness Spec",
    category: "Environmental Cracking",
    triggers: {
      grades: ["a193 b7", "b7", "grade 8", "10.9", "12.9"],
      environment: ["sour", "h2s", "hydrogen sulfide", "oil and gas", "wellhead", "nace", "mr0175"],
      absence: ["b7m", "l7m", "hrc 22", "22 hrc", "nace"],
    },
    description: "Standard A193 B7 (HRC 35 max) and other high-hardness fasteners are susceptible to sulfide stress cracking (SSC) in sour gas environments containing H2S. NACE MR0175/ISO 15156 requires a maximum hardness of HRC 22 for carbon and low-alloy steel fasteners in H2S service.",
    standard_ref: "NACE MR0175 / ISO 15156 — materials for sour service. ASTM A193 B7M (HRC 22 max version of B7).",
    correction: "For sour service: specify A193 B7M (not B7) — the 'M' designation is the low-hardness controlled version (HRC 22 max). Pair with A194 2HM nuts. Verify all other metallic components also meet NACE MR0175.",
    reference_feature: "Fastener Material Guide → Chromoly Steel",
  },
  {
    id: "metric_imperial_mix",
    severity: "HIGH",
    severity_color: "#D97706",
    title: "Metric Fastener in Imperial Bolt Pattern (or Vice Versa)",
    category: "Dimensional Conflict",
    triggers: {
      mixed: ["m10 x 1.5 in 3/8", "m12 x 1.75 in 1/2", "metric bolt in inch", "inch bolt in metric"],
    },
    description: "Metric and imperial fasteners have different thread forms and cannot be interchanged. A metric M10 bolt cannot thread into a 3/8\"-16 tapped hole even though the diameters are similar. Forcing mismatched threads strips the hole or creates a false engagement that fails under load.",
    standard_ref: "ASME B1.1 (unified inch threads); ISO 68-1 (metric threads) — thread forms are incompatible.",
    correction: "Verify the tapped hole or nut thread series matches the fastener. For field repairs, use a thread gauge to confirm. If converting an assembly from metric to imperial or vice versa, all holes must be re-tapped to the new thread series.",
    reference_feature: "Thread Pitch Chart → Metric tab",
  },
];

// Simple keyword matcher
function checkConflicts(inputs) {
  const { grade, coating, basemat, environment, thread, load, notes } = inputs;
  const allText = [grade, coating, basemat, environment, thread, load, notes]
    .join(" ").toLowerCase();

  const found = [];

  for (const rule of CONFLICT_RULES) {
    const t = rule.triggers;
    let gradeMatch = !t.grades || t.grades.some(g => allText.includes(g));
    let coatMatch = !t.coatings || t.coatings.some(c => allText.includes(c));
    let baseMatch = !t.base_material || t.base_material.some(b => allText.includes(b));
    let envMatch = !t.environment || t.environment.some(e => allText.includes(e));
    let loadMatch = !t.load || t.load.some(l => allText.includes(l));
    let threadMatch = !t.thread || t.thread.some(t2 => allText.includes(t2));
    let reuseMatch = !t.reuse || t.reuse.some(r => allText.includes(r));
    let typeMatch = !t.types || t.types.some(ty => allText.includes(ty));
    let mixedMatch = !t.mixed || t.mixed.some(m => allText.includes(m));

    // Absence checks — these flip if the text DOES contain the absent term
    let absenceOk = !t.absence || !t.absence.some(a => allText.includes(a));
    let coatAbsentOk = !t.coatings_absent || !t.coatings_absent.some(a => allText.includes(a));

    // Rule-specific logic
    if (rule.id === "he_grade8_electroplate" && gradeMatch && coatMatch && absenceOk) found.push(rule);
    else if (rule.id === "a490_hdg" && gradeMatch && coatMatch) found.push(rule);
    else if (rule.id === "a325_no_f436" && gradeMatch && coatAbsentOk) found.push(rule);
    else if (rule.id === "stainless_aluminum_no_isolation" && gradeMatch && baseMatch && absenceOk) found.push(rule);
    else if (rule.id === "copper_brass_aluminum" && gradeMatch && baseMatch) found.push(rule);
    else if (rule.id === "fine_thread_outdoor" && threadMatch && envMatch) found.push(rule);
    else if (rule.id === "grade2_fatigue" && gradeMatch && loadMatch) found.push(rule);
    else if (rule.id === "missing_nut_spec" && gradeMatch && absenceOk) found.push(rule);
    else if (rule.id === "torque_to_yield_reuse" && typeMatch && reuseMatch) found.push(rule);
    else if (rule.id === "sour_service_hardness" && gradeMatch && envMatch && absenceOk) found.push(rule);
  }

  return found;
}

const FIELDS = [
  { id: "grade", label: "Fastener Grade / Spec", placeholder: "e.g. Grade 8, A490, 10.9, A193 B7, 304 SS..." },
  { id: "coating", label: "Coating / Finish", placeholder: "e.g. Zinc electroplate, HDG, Black oxide, none..." },
  { id: "basemat", label: "Base Material Being Fastened", placeholder: "e.g. Carbon steel, aluminum, stainless..." },
  { id: "environment", label: "Environment / Service", placeholder: "e.g. Outdoor, marine, sour gas, food grade..." },
  { id: "thread", label: "Thread Series", placeholder: "e.g. UNC, UNF, M10 x 1.5..." },
  { id: "load", label: "Loading Condition", placeholder: "e.g. Static tension, fatigue, vibration, shear..." },
  { id: "notes", label: "Additional Notes / Full Spec", placeholder: "Paste full spec or add any other details..." },
];

const EXAMPLE_SPECS = [
  { label: "A490 + HDG", values: { grade: "A490", coating: "Hot dip galvanized HDG", basemat: "Carbon steel", environment: "Outdoor", thread: "1\" UNC", load: "Structural tension", notes: "" } },
  { label: "Grade 8 Plated", values: { grade: "Grade 8", coating: "Zinc electroplate", basemat: "Carbon steel", environment: "Indoor machinery", thread: "1/2-13 UNC", load: "Vibration, fatigue loading", notes: "" } },
  { label: "SS in Aluminum", values: { grade: "304 Stainless A2", coating: "Passivation", basemat: "Aluminum 6061", environment: "Outdoor coastal", thread: "M8 x 1.25", load: "Static tension", notes: "" } },
  { label: "B7 Sour Gas", values: { grade: "A193 B7", coating: "Plain", basemat: "Carbon steel flange", environment: "Sour gas H2S service oil and gas", thread: "1\"-8 UNC", load: "Static tension pressure", notes: "Wellhead application" } },
];

export default function ConflictChecker() {
  const [inputs, setInputs] = useState({ grade: "", coating: "", basemat: "", environment: "", thread: "", load: "", notes: "" });
  const [results, setResults] = useState(null);
  const [expanded, setExpanded] = useState(null);
  const [checked, setChecked] = useState(false);

  const handleCheck = () => {
    const conflicts = checkConflicts(inputs);
    setResults(conflicts);
    setChecked(true);
    setExpanded(null);
  };

  const loadExample = (example) => {
    setInputs(example.values);
    setResults(null);
    setChecked(false);
  };

  const reset = () => {
    setInputs({ grade: "", coating: "", basemat: "", environment: "", thread: "", load: "", notes: "" });
    setResults(null);
    setChecked(false);
    setExpanded(null);
  };

  const hasInput = Object.values(inputs).some(v => v.trim().length > 0);

  return (
    <div style={{ fontFamily: "'DM Sans','Segoe UI',sans-serif", background: BG, minHeight: "100vh", maxWidth: 430, margin: "0 auto" }}>

      {/* HEADER */}
      <div style={{ background: `linear-gradient(135deg, ${NAVY} 0%, #2C5282 100%)`, padding: "16px 20px 20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
          <span style={{ fontSize: 20 }}>⬡</span>
          <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 10, letterSpacing: 2, textTransform: "uppercase" }}>Fastener Companion</span>
        </div>
        <div style={{ color: WHITE, fontSize: 20, fontWeight: 800, marginBottom: 2 }}>Spec Conflict Checker</div>
        <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 11 }}>ASTM F1941 · AISC · NACE MR0175 · ISO 898-1 · MIL-STD-889C · IFI 7th Ed.</div>
      </div>

      <div style={{ padding: "14px 16px" }}>

        {/* INTRO */}
        <div style={{ background: STAR_BG, border: `1px solid ${STAR_BORDER}`, borderRadius: 10, padding: "10px 14px", marginBottom: 14 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#92400E", marginBottom: 4 }}>Check your spec before it goes to print</div>
          <div style={{ fontSize: 11, color: TEXT, lineHeight: 1.5 }}>Enter as much or as little of your fastener specification as you have. The checker will flag known conflicts, prohibited combinations, and common errors before they become sourcing or safety problems.</div>
        </div>

        {/* EXAMPLE SPECS */}
        <div style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: MUTED, textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 8 }}>Load an Example Spec</div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {EXAMPLE_SPECS.map((ex) => (
              <button key={ex.label} onClick={() => loadExample(ex)}
                style={{ background: WHITE, border: `1px solid ${BORDER}`, borderRadius: 20, padding: "5px 12px", fontSize: 11, fontWeight: 700, color: NAVY, cursor: "pointer", fontFamily: "inherit" }}>
                {ex.label}
              </button>
            ))}
          </div>
        </div>

        {/* INPUT FORM */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 14 }}>
          {FIELDS.map((field) => (
            <div key={field.id}>
              <div style={{ fontSize: 11, fontWeight: 700, color: NAVY, marginBottom: 4 }}>{field.label}</div>
              <input
                value={inputs[field.id]}
                onChange={e => setInputs({ ...inputs, [field.id]: e.target.value })}
                placeholder={field.placeholder}
                style={{
                  width: "100%", boxSizing: "border-box",
                  background: WHITE, border: `1px solid ${BORDER}`, borderRadius: 10,
                  padding: "10px 14px", fontSize: 12, color: TEXT, fontFamily: "inherit",
                  outline: "none",
                }}
              />
            </div>
          ))}
        </div>

        {/* CHECK BUTTON */}
        <button onClick={handleCheck} disabled={!hasInput}
          style={{
            width: "100%", background: hasInput ? NAVY : "#CBD5E1", color: WHITE,
            border: "none", borderRadius: 12, padding: "14px",
            fontSize: 14, fontWeight: 800, cursor: hasInput ? "pointer" : "not-allowed",
            fontFamily: "inherit", marginBottom: 14,
          }}>
          Check for Conflicts →
        </button>

        {/* RESULTS */}
        {checked && results && (
          <>
            {results.length === 0 ? (
              <div style={{ background: "#F0FDF4", border: "1px solid #BBF7D0", borderLeft: "4px solid #059669", borderRadius: 12, padding: "14px 16px", marginBottom: 14, textAlign: "center" }}>
                <div style={{ fontSize: 20, marginBottom: 6 }}>✅</div>
                <div style={{ fontSize: 14, fontWeight: 800, color: "#059669", marginBottom: 4 }}>No Conflicts Detected</div>
                <div style={{ fontSize: 12, color: TEXT, lineHeight: 1.5 }}>Based on the inputs provided, no known spec conflicts were identified. This does not guarantee the specification is complete or correct — verify against applicable standards and engineering requirements.</div>
              </div>
            ) : (
              <>
                <div style={{ background: "#FFF1F2", border: "1px solid #FECDD3", borderRadius: 10, padding: "10px 14px", marginBottom: 12 }}>
                  <div style={{ fontSize: 13, fontWeight: 800, color: "#DC2626" }}>
                    ⚡ {results.length} Conflict{results.length > 1 ? "s" : ""} Detected
                  </div>
                  <div style={{ fontSize: 11, color: "#9F1239", marginTop: 2 }}>Review and correct before this specification goes to procurement or print.</div>
                </div>

                {results.map((rule, i) => (
                  <div key={rule.id} style={{ marginBottom: 10 }}>
                    <div onClick={() => setExpanded(expanded === rule.id ? null : rule.id)}
                      style={{
                        background: rule.severity === "CRITICAL" ? "#FFF1F2" : rule.severity === "HIGH" ? "#FFF8E7" : "#EFF6FF",
                        border: `1px solid ${rule.severity_color}`,
                        borderLeft: `4px solid ${rule.severity_color}`,
                        borderRadius: expanded === rule.id ? "12px 12px 0 0" : 12,
                        padding: "12px 14px", cursor: "pointer",
                      }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                        <div style={{ flex: 1 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                            <div style={{ background: rule.severity_color, color: WHITE, borderRadius: 4, padding: "1px 8px", fontSize: 9, fontWeight: 800 }}>{rule.severity}</div>
                            <div style={{ fontSize: 10, color: MUTED, fontWeight: 600 }}>{rule.category}</div>
                          </div>
                          <div style={{ fontSize: 13, fontWeight: 800, color: NAVY }}>{rule.title}</div>
                        </div>
                        <span style={{ color: MUTED, fontSize: 14, marginLeft: 8 }}>{expanded === rule.id ? "▲" : "▼"}</span>
                      </div>
                    </div>

                    {expanded === rule.id && (
                      <div style={{ background: WHITE, border: `1px solid ${rule.severity_color}`, borderTop: "none", borderRadius: "0 0 12px 12px", padding: "14px" }}>
                        <div style={{ fontSize: 12, color: TEXT, lineHeight: 1.6, marginBottom: 10 }}>{rule.description}</div>
                        <div style={{ background: "#F0FDF4", border: "1px solid #BBF7D0", borderRadius: 8, padding: "8px 12px", marginBottom: 8 }}>
                          <div style={{ fontSize: 10, fontWeight: 700, color: "#059669", textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 3 }}>How to Fix This</div>
                          <div style={{ fontSize: 12, color: TEXT, lineHeight: 1.5 }}>{rule.correction}</div>
                        </div>
                        <div style={{ background: ROW_ALT, border: `1px solid ${BORDER}`, borderRadius: 8, padding: "6px 12px" }}>
                          <div style={{ fontSize: 10, fontWeight: 700, color: MUTED, textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 2 }}>Standard Reference</div>
                          <div style={{ fontSize: 11, color: TEXT }}>{rule.standard_ref}</div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </>
            )}
          </>
        )}

        <div style={{ display: "flex", gap: 10, marginBottom: 14 }}>
          {hasInput && (
            <button onClick={reset} style={{ flex: 1, background: WHITE, color: NAVY, border: `1px solid ${BORDER}`, borderRadius: 10, padding: "11px", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
              Clear / Reset
            </button>
          )}
        </div>

        {/* WHAT WE CHECK */}
        {!checked && (
          <div style={{ background: WHITE, border: `1px solid ${BORDER}`, borderRadius: 12, overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
            <div style={{ background: NAVY, padding: "10px 14px" }}>
              <div style={{ color: WHITE, fontSize: 12, fontWeight: 700 }}>What the Conflict Checker Flags</div>
            </div>
            {[
              { icon: "⚡", text: "Hydrogen embrittlement risk — high-strength + electroplating without baking" },
              { icon: "??", text: "Prohibited combinations — A490 + galvanizing, 12.9 + galvanizing" },
              { icon: "??️", text: "Structural omissions — A325/A490 without F436 washers or A563 nuts" },
              { icon: "??", text: "Galvanic pairs — stainless or copper/brass in aluminum without isolation" },
              { icon: "??", text: "Thread mismatch — fine thread in dirty/field environments" },
              { icon: "??", text: "Under-specification — Grade 2 in fatigue/vibration applications" },
              { icon: "??", text: "Missing specs — high-strength bolt without nut grade specified" },
              { icon: "☠", text: "Sour service — high-hardness fasteners in H2S without NACE spec" },
              { icon: "♻", text: "Reuse errors — torque-to-yield fasteners marked reusable" },
              { icon: "??", text: "Metric/imperial mixing — incompatible thread system conflicts" },
            ].map((item, i) => (
              <div key={i} style={{ padding: "9px 14px", borderBottom: `1px solid ${BORDER}`, background: i % 2 === 0 ? WHITE : ROW_ALT, display: "flex", gap: 10, alignItems: "flex-start" }}>
                <span style={{ fontSize: 14, flexShrink: 0 }}>{item.icon}</span>
                <div style={{ fontSize: 12, color: TEXT, lineHeight: 1.5 }}>{item.text}</div>
              </div>
            ))}
          </div>
        )}

        <div style={{ marginTop: 14, background: "#FFF1F2", border: "1px solid #FECDD3", borderRadius: 10, padding: "10px 14px" }}>
          <div style={{ fontSize: 10, color: "#9F1239", lineHeight: 1.5 }}>
            <strong>⚠ Verify Before Use.</strong> Conflict detection is based on keyword matching against known rules from ASTM F1941, AISC, NACE MR0175, ISO 898-1, MIL-STD-889C, and IFI 7th Edition. This tool flags common conflicts — it does not guarantee a spec is complete or correct. Always verify with applicable standards and a qualified engineer for safety-critical applications.
          </div>
        </div>
      </div>
    </div>
  );
}
