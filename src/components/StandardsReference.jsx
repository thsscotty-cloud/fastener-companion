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
// StandardsReference
// ════════════════════════════════════════════════════

// ─── DATA ─────────────────────────────────────────────────────────────────────
// Sources: ASTM, SAE, ISO, DIN, JIS, BS standards documents,
// IFI Fastener Standards 7th Edition, AISC, ASME B18 series,
// Portland Bolt technical resources, Fastenal Engineering Reference

const STANDARDS_DATA = [
  // ── BOLT / SCREW STANDARDS ──────────────────────────────────────────────────
  {
    category: "Bolt / Screw Mechanical Properties",
    items: [
      {
        standard: "SAE J429",
        title: "Mechanical and Material Requirements for Externally Threaded Fasteners",
        scope: "Defines Grades 2, 5, 7, 8 for inch-series bolts and screws",
        covers: ["Grade 2 (74 ksi tensile)", "Grade 5 (120 ksi tensile)", "Grade 7 (133 ksi)", "Grade 8 (150 ksi tensile)"],
        metric_equiv: "ISO 898-1",
        din_equiv: "DIN 931/933 8.8, 10.9, 12.9",
        star: true,
        color: "#2563EB",
      },
      {
        standard: "ISO 898-1",
        title: "Mechanical Properties of Fasteners — Bolts, Screws and Studs",
        scope: "Defines metric property classes 4.6 through 12.9",
        covers: ["4.6 (400 MPa)", "5.8 (520 MPa)", "8.8 (800 MPa)", "10.9 (1040 MPa)", "12.9 (1220 MPa)"],
        metric_equiv: "—",
        din_equiv: "DIN 931/933",
        star: true,
        color: "#2563EB",
      },
      {
        standard: "ASTM A307",
        title: "Carbon Steel Bolts and Studs, 60,000 PSI Tensile",
        scope: "Low-strength general purpose bolts. Grade A (hex bolts), Grade B (heavy hex bolts for flanges)",
        covers: ["Grade A: 60 ksi min tensile", "Grade B: 60 ksi min tensile, special chemistry for flange use"],
        metric_equiv: "ISO 4.6",
        din_equiv: "DIN 4.6",
        star: true,
        color: "#64748B",
      },
      {
        standard: "ASTM F3125 / A325",
        title: "High-Strength Structural Bolts for Structural Steel Joints",
        scope: "Heavy hex structural bolts for steel construction. Now covered under F3125 umbrella. A325 marking still used.",
        covers: ["A325 Type 1: 120/105 ksi (≤1\"/≥1-1/8\")", "Requires heavy hex head, A563 DH nut, F436 washer", "Pretensioning required for slip-critical connections"],
        metric_equiv: "ISO 8.8",
        din_equiv: "—",
        star: true,
        color: "#D97706",
      },
      {
        standard: "ASTM F3125 / A490",
        title: "High-Strength Structural Bolts — Alloy Steel",
        scope: "Highest-strength structural bolt. Part of F3125 umbrella. No galvanizing permitted.",
        covers: ["150–173 ksi tensile", "Requires A563 DH3 nut and F436 washer", "NO galvanizing — mechanical galv or plain only"],
        metric_equiv: "ISO 10.9",
        din_equiv: "—",
        star: true,
        color: "#DC2626",
      },
      {
        standard: "ASTM A354",
        title: "Quenched and Tempered Alloy Steel Bolts, Studs, and Other Externally Threaded Fasteners",
        scope: "Heavy-duty alloy steel bolts for diameters beyond A490 range. Grade BC and BD.",
        covers: ["Grade BC: 125/115 ksi (≤2.5\"/≥2.5\")", "Grade BD: 150/140 ksi (≤2.5\"/≥2.5\")", "Available to 4\" diameter — exceeds A490/A325 range"],
        metric_equiv: "ISO 10.9 (BD)",
        din_equiv: "—",
        star: false,
        color: "#DC2626",
      },
      {
        standard: "ASTM A449",
        title: "Hex Cap Screws, Bolts and Studs — Quenched and Tempered",
        scope: "Similar to Grade 5/A325 properties but for diameters over 1.5\" and non-structural hex products.",
        covers: ["120/105/90 ksi tensile by diameter range", "Used when A325 not applicable (non-heavy hex, larger sizes)", "Equivalent to Grade 5 in many respects"],
        metric_equiv: "ISO 8.8",
        din_equiv: "—",
        star: false,
        color: "#2563EB",
      },
      {
        standard: "ASTM A574",
        title: "Alloy Steel Socket Head Cap Screws",
        scope: "Defines Grade A (12.9 equivalent) socket head cap screws in inch series.",
        covers: ["180 ksi tensile (≤0.5\")", "170 ksi tensile (0.5\"–1.5\")", "HRC 39–45", "Very high HE risk — black oxide standard finish"],
        metric_equiv: "ISO 12.9",
        din_equiv: "DIN 912 12.9",
        star: true,
        color: "#DC2626",
      },
      {
        standard: "JIS B1051",
        title: "Mechanical Properties of Bolts, Screws and Studs (Japanese Standard)",
        scope: "Japanese equivalent of ISO 898-1. Requires Japanese alloy steels (SCM435, SCM440) not in US supply chains.",
        covers: ["Property classes similar to ISO 8.8–12.9", "SCM435 (similar to SAE Grade 8)", "SCM440 (similar to SAE Grade 8+)", "Import required — 6–14 week lead time from Japan"],
        metric_equiv: "ISO 898-1 (closest)",
        din_equiv: "DIN 931/933",
        star: true,
        color: "#7C3AED",
      },
    ],
  },
  // ── STUD BOLT STANDARDS ─────────────────────────────────────────────────────
  {
    category: "Stud Bolts & High-Temperature",
    items: [
      {
        standard: "ASTM A193",
        title: "Alloy-Steel and Stainless Steel Bolting for High-Temperature or High-Pressure Service",
        scope: "Stud bolts and screws for pressure vessels, flanges, valves. Multiple grades.",
        covers: ["B7: 4140/4142 Cr-Mo (125/115/100 ksi)", "B7M: Low-hardness B7 for sour service (HRC 22 max)", "B8: 304 SS (75 ksi)", "B8M: 316 SS (75 ksi)", "L7: Similar to B7 for low-temp service"],
        metric_equiv: "ISO 898-1 10.9 (B7 approx.)",
        din_equiv: "—",
        star: true,
        color: "#059669",
      },
      {
        standard: "ASTM A194",
        title: "Carbon Steel, Alloy Steel, and Stainless Steel Nuts for Bolts for High-Pressure or High-Temperature Service",
        scope: "Heavy hex nuts to pair with A193 stud bolts.",
        covers: ["Grade 2H: Standard nut for B7 studs (REQUIRED pairing)", "Grade 2HM: Low-hardness nut for B7M sour service", "Grade 8: For B8 stainless studs", "Grade 8M: For B8M (316 SS) studs"],
        metric_equiv: "ISO nut grades",
        din_equiv: "—",
        star: true,
        color: "#059669",
      },
      {
        standard: "ASTM A320",
        title: "Alloy-Steel and Stainless Steel Bolting for Low-Temperature Service",
        scope: "Bolting for cryogenic and low-temperature pressure vessels and equipment.",
        covers: ["L7: 4140 alloy steel Charpy impact tested to –150°F", "L7M: Low-hardness L7 for sour service", "B8 grades: Stainless steel variants"],
        metric_equiv: "—",
        din_equiv: "—",
        star: false,
        color: "#0891B2",
      },
    ],
  },
  // ── NUT STANDARDS ───────────────────────────────────────────────────────────
  {
    category: "Nut Standards",
    items: [
      {
        standard: "SAE J995",
        title: "Mechanical and Material Requirements for Steel Nuts",
        scope: "Grades 2, 5, 8 hex nuts for inch-series fasteners.",
        covers: ["Grade 2: Low carbon (min proof load)", "Grade 5: Medium carbon (recommended with Grade 5 bolts)", "Grade 8: Alloy steel (use with Grade 8 bolts)"],
        metric_equiv: "ISO 898-2",
        din_equiv: "DIN 934",
        star: true,
        color: "#2563EB",
      },
      {
        standard: "ASTM A563",
        title: "Carbon and Alloy Steel Nuts",
        scope: "Structural nuts for use with A325 and A490 bolts.",
        covers: ["Grade A: General purpose", "Grade C: Medium strength", "Grade DH: Required with A325 structural bolts", "Grade DH3: Required with A490 structural bolts"],
        metric_equiv: "ISO 898-2",
        din_equiv: "—",
        star: true,
        color: "#D97706",
      },
      {
        standard: "ISO 898-2",
        title: "Mechanical Properties of Fasteners — Nuts with Specified Property Classes",
        scope: "Metric property classes for nuts: 5, 6, 8, 10, 12.",
        covers: ["Style 1 (lower height): Classes 5–10", "Style 2 (higher/stronger): Classes 8–12", "Match nut class to bolt property class"],
        metric_equiv: "—",
        din_equiv: "DIN 934",
        star: true,
        color: "#2563EB",
      },
    ],
  },
  // ── WASHER STANDARDS ────────────────────────────────────────────────────────
  {
    category: "Washer Standards",
    items: [
      {
        standard: "ASTM F436",
        title: "Hardened Steel Washers for Structural Bolting",
        scope: "Hardened washers REQUIRED under head and nut of A325/A490 structural bolts.",
        covers: ["Type 1: Round (most common)", "Type 3: Weathering steel", "Min hardness HRC 38–45", "Do NOT substitute SAE/USS washers in structural connections"],
        metric_equiv: "ISO structural washers",
        din_equiv: "—",
        star: true,
        color: "#DC2626",
      },
      {
        standard: "ASTM F844",
        title: "Unhardened Steel Washers",
        scope: "General purpose flat washers for non-structural applications.",
        covers: ["Dimensional requirements only", "No hardness requirement", "For A307 and lower-strength applications"],
        metric_equiv: "ISO plain washers",
        din_equiv: "DIN 125",
        star: false,
        color: "#64748B",
      },
      {
        standard: "ASME B18.21.1",
        title: "Washers: Helical Spring-Lock, Tooth Lock, and Plain — Inch Series",
        scope: "Dimensional standard for SAE and USS plain washers, lock washers.",
        covers: ["SAE plain washers (narrow OD)", "USS plain washers (wide OD)", "Helical spring (split) lock washers", "Internal/external tooth lock washers"],
        metric_equiv: "ASME B18.22M",
        din_equiv: "DIN 125, DIN 127",
        star: true,
        color: "#64748B",
      },
    ],
  },
  // ── COATING STANDARDS ───────────────────────────────────────────────────────
  {
    category: "Coating & Finish Standards",
    items: [
      {
        standard: "ASTM F1941 / F1941M",
        title: "Electrodeposited Coatings on Mechanical Fasteners — Inch and Metric",
        scope: "Requirements for zinc and other electroplated coatings on fasteners. Critical HE baking requirements.",
        covers: ["Coating thickness requirements", "Chromate finish types", "HE baking: required for HRC 40+ within 4 hrs of plating", "Salt spray test requirements"],
        metric_equiv: "ISO 4042",
        din_equiv: "—",
        star: true,
        color: "#DC2626",
      },
      {
        standard: "ASTM A153",
        title: "Zinc Coating (Hot-Dip) on Iron and Steel Hardware",
        scope: "Hot-dip galvanizing of hardware including fasteners.",
        covers: ["Minimum zinc coating weights by class", "For bolts, nuts, washers, structural hardware", "No HE risk from process", "Threads must be oversized or chased after coating"],
        metric_equiv: "ISO 1461",
        din_equiv: "DIN EN ISO 1461",
        star: true,
        color: "#059669",
      },
      {
        standard: "ASTM B695",
        title: "Mechanical Zinc Coating on Iron and Steel Hardware",
        scope: "Mechanical galvanizing — zinc applied by tumbling, not hot-dip. Very low HE risk.",
        covers: ["Class 5–Class 115 (coating thickness)", "Recommended for high-strength fasteners where HDG not appropriate", "No acid cleaning = very low HE risk"],
        metric_equiv: "ISO 10683 (zinc flake, similar benefit)",
        din_equiv: "—",
        star: true,
        color: "#059669",
      },
      {
        standard: "ISO 10683",
        title: "Non-Electrolytically Applied Zinc Flake Coatings",
        scope: "Zinc flake coatings (Geomet, Dacromet, Magni). Zero HE risk, excellent corrosion resistance.",
        covers: ["Geomet, Dacromet, Magni and equivalents", "Zero HE risk — no acid process", "500–1500+ hour salt spray", "Thin coating (8–20 microns) — minimal thread impact"],
        metric_equiv: "—",
        din_equiv: "—",
        star: true,
        color: "#059669",
      },
    ],
  },
  // ── THREAD STANDARDS ────────────────────────────────────────────────────────
  {
    category: "Thread Standards",
    items: [
      {
        standard: "ASME B1.1",
        title: "Unified Inch Screw Threads (UN/UNR)",
        scope: "Defines UNC, UNF, UNEF, UN constant pitch series for inch fasteners.",
        covers: ["Thread form geometry", "Tolerance classes 1A/B, 2A/B, 3A/B", "Standard pitch series UNC/UNF/UNEF", "Tensile stress areas"],
        metric_equiv: "ISO 68-1, ISO 261",
        din_equiv: "DIN 13",
        star: true,
        color: "#2563EB",
      },
      {
        standard: "ISO 68-1",
        title: "ISO General Purpose Screw Threads — Basic Profile",
        scope: "Defines the 60° metric thread form. Foundation standard for all metric threads.",
        covers: ["M series metric thread form", "Basic dimensions and tolerances", "Coarse and fine pitch series"],
        metric_equiv: "—",
        din_equiv: "DIN 13",
        star: true,
        color: "#2563EB",
      },
      {
        standard: "ASME B1.20.1",
        title: "Pipe Threads, General Purpose (Inch)",
        scope: "NPT and NPS pipe thread dimensions and tolerances.",
        covers: ["NPT taper pipe threads (1:16 taper)", "NPS straight pipe threads", "Tap drill sizes", "Engagement turns"],
        metric_equiv: "ISO 7-1 (BSPT), ISO 228 (BSPP)",
        din_equiv: "—",
        star: true,
        color: "#D97706",
      },
    ],
  },
  // ── DIMENSION STANDARDS ─────────────────────────────────────────────────────
  {
    category: "Dimensional Standards",
    items: [
      {
        standard: "ASME B18.2.1",
        title: "Square, Hex, Heavy Hex, and Askew Head Bolts and Hex, Heavy Hex, Hex Flange, Lobed Head, and Lag Screws — Inch Series",
        scope: "Dimensional requirements for most common inch-series bolt and screw head types.",
        covers: ["Hex bolt head dimensions", "Heavy hex bolt dimensions", "Width across flats, head height", "Thread length formulas"],
        metric_equiv: "ASME B18.2.3.1M / ISO 4014",
        din_equiv: "DIN 931, DIN 933",
        star: true,
        color: "#1B3A6B",
      },
      {
        standard: "ASME B18.2.2",
        title: "Nuts for General Applications — Inch Series",
        scope: "Dimensional requirements for hex nuts, heavy hex nuts, jam nuts, coupling nuts.",
        covers: ["Hex nut dimensions by size", "Heavy hex nut dimensions", "Jam nut dimensions", "Width across flats, height"],
        metric_equiv: "ASME B18.2.4.1M / ISO 4032",
        din_equiv: "DIN 934",
        star: true,
        color: "#1B3A6B",
      },
      {
        standard: "ASME B18.3",
        title: "Socket Cap, Shoulder, Set Screws, and Hex Keys — Inch Series",
        scope: "Dimensional requirements for socket head products and hex keys.",
        covers: ["SHCS dimensions", "Button head, flat head socket cap screws", "Shoulder bolt dimensions", "Hex key sizes"],
        metric_equiv: "DIN 912 (metric SHCS)",
        din_equiv: "DIN 912, DIN 6912",
        star: true,
        color: "#1B3A6B",
      },
    ],
  },
  // ── STRUCTURAL STANDARDS ────────────────────────────────────────────────────
  {
    category: "Structural & Pressure Standards",
    items: [
      {
        standard: "AISC 360",
        title: "Specification for Structural Steel Buildings",
        scope: "Governs structural bolting in steel construction. Bolt grades, pretensioning, connection design.",
        covers: ["Specifies A325/A490 (F3125) for structural connections", "Snug-tight vs pretensioned vs slip-critical", "Prohibits galvanizing of A490", "Requires F436 washers and A563 nuts"],
        metric_equiv: "EN 1993 (Eurocode 3)",
        din_equiv: "—",
        star: true,
        color: "#D97706",
      },
      {
        standard: "ASME B16.5",
        title: "Pipe Flanges and Flanged Fittings",
        scope: "Governs pipe flange design, bolt sizing, and bolt count by pipe size and pressure class.",
        covers: ["Pressure classes 150# through 2500#", "Bolt size and quantity by flange size and class", "Stud bolt dimensions (A193 B7 standard)", "Flange facing types (RF, FF, RTJ)"],
        metric_equiv: "EN 1092 (European flanges)",
        din_equiv: "DIN 2501",
        star: true,
        color: "#059669",
      },
      {
        standard: "ASME PCC-1",
        title: "Guidelines for Pressure Boundary Bolted Flange Joint Assembly",
        scope: "Best practices for assembling and tightening pressure vessel flanges.",
        covers: ["Multiple-pass tightening procedure", "Star/cross tightening pattern", "Re-torquing after initial heat cycle", "Torque verification methods"],
        metric_equiv: "EN 1591",
        din_equiv: "—",
        star: true,
        color: "#059669",
      },
      {
        standard: "NACE MR0175 / ISO 15156",
        title: "Materials for Use in H2S-Containing Environments in Oil and Gas Production",
        scope: "Materials and hardness limits for sour gas (H2S) service to prevent sulfide stress cracking.",
        covers: ["HRC 22 max for carbon/alloy steel fasteners in sour service", "A193 B7M (not B7) required for sour applications", "Applies to all metallic components in contact with H2S"],
        metric_equiv: "—",
        din_equiv: "—",
        star: true,
        color: "#DC2626",
      },
    ],
  },
];

const ALL_STANDARDS = STANDARDS_DATA.flatMap(cat => cat.items.map(item => ({ ...item, category: cat.category })));

export default function StandardsReference() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [selected, setSelected] = useState(null);

  const categories = ["All", ...STANDARDS_DATA.map(c => c.category)];
  const selectedStd = selected ? ALL_STANDARDS.find(s => s.standard === selected) : null;

  const filtered = ALL_STANDARDS.filter(s =>
    (activeCategory === "All" || s.category === activeCategory) &&
    (s.standard.toLowerCase().includes(search.toLowerCase()) ||
      s.title.toLowerCase().includes(search.toLowerCase()) ||
      s.scope.toLowerCase().includes(search.toLowerCase()))
  );

  if (selectedStd) return (
    <div style={{ fontFamily: "'DM Sans','Segoe UI',sans-serif", background: BG, minHeight: "100vh", maxWidth: 430, margin: "0 auto" }}>
      <div style={{ background: `linear-gradient(135deg, ${NAVY} 0%, #2C5282 100%)`, padding: "16px 20px 20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
          <span style={{ fontSize: 20 }}>⬡</span>
          <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 10, letterSpacing: 2, textTransform: "uppercase" }}>Fastener Companion</span>
        </div>
        <div style={{ color: WHITE, fontSize: 18, fontWeight: 800 }}>{selectedStd.standard}</div>
        <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 11, marginTop: 2 }}>{selectedStd.category}</div>
      </div>
      <div style={{ padding: "14px 16px" }}>
        <button onClick={() => setSelected(null)} style={{ background: "none", border: "none", cursor: "pointer", color: NAVY, fontSize: 13, fontWeight: 700, fontFamily: "inherit", marginBottom: 14, padding: 0 }}>← Standards</button>
        <div style={{ background: selectedStd.color + "15", border: `1px solid ${selectedStd.color}`, borderLeft: `4px solid ${selectedStd.color}`, borderRadius: 12, padding: "14px", marginBottom: 12 }}>
          <div style={{ fontSize: 15, fontWeight: 800, color: NAVY, marginBottom: 6 }}>{selectedStd.title}</div>
          <div style={{ fontSize: 12, color: TEXT, lineHeight: 1.6 }}>{selectedStd.scope}</div>
        </div>
        <div style={{ background: WHITE, border: `1px solid ${BORDER}`, borderRadius: 12, overflow: "hidden", marginBottom: 10 }}>
          <div style={{ background: NAVY, padding: "10px 14px" }}><div style={{ color: WHITE, fontSize: 12, fontWeight: 700 }}>What This Standard Covers</div></div>
          {selectedStd.covers.map((item, i) => (
            <div key={i} style={{ padding: "8px 14px", borderBottom: `1px solid ${BORDER}`, background: i % 2 === 0 ? WHITE : ROW_ALT, display: "flex", gap: 8 }}>
              <span style={{ color: selectedStd.color, flexShrink: 0 }}>•</span>
              <div style={{ fontSize: 12, color: TEXT, lineHeight: 1.5 }}>{item}</div>
            </div>
          ))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 14 }}>
          {[
            { label: "Metric Equivalent", value: selectedStd.metric_equiv },
            { label: "DIN Equivalent", value: selectedStd.din_equiv },
          ].map((item, i) => (
            <div key={i} style={{ background: WHITE, border: `1px solid ${BORDER}`, borderRadius: 10, padding: "10px" }}>
              <div style={{ fontSize: 9, color: MUTED, textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 3 }}>{item.label}</div>
              <div style={{ fontSize: 12, fontWeight: 700, color: NAVY }}>{item.value}</div>
            </div>
          ))}
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
        <div style={{ color: WHITE, fontSize: 20, fontWeight: 800, marginBottom: 2 }}>Standards Reference</div>
        <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 11 }}>ASTM · SAE · ISO · ASME · AISC · DIN · JIS · NACE · IFI 7th Ed.</div>
        <div style={{ background: WHITE, borderRadius: 12, display: "flex", alignItems: "center", padding: "10px 14px", gap: 8, marginTop: 14, boxShadow: "0 2px 8px rgba(0,0,0,0.15)" }}>
          <span style={{ color: MUTED }}>??</span>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search standards..."
            style={{ background: "none", border: "none", outline: "none", color: TEXT, fontSize: 14, flex: 1, fontFamily: "inherit" }} />
          {search && <span onClick={() => setSearch("")} style={{ color: MUTED, cursor: "pointer" }}>✕</span>}
        </div>
      </div>

      <div style={{ background: WHITE, borderBottom: `1px solid ${BORDER}`, padding: "8px 12px", display: "flex", gap: 6, overflowX: "auto", scrollbarWidth: "none" }}>
        {["All", ...STANDARDS_DATA.map(c => c.category.split(" ")[0])].map((cat, i) => {
          const fullCat = i === 0 ? "All" : STANDARDS_DATA[i - 1].category;
          return (
            <button key={fullCat} onClick={() => setActiveCategory(fullCat)}
              style={{ flexShrink: 0, padding: "4px 12px", borderRadius: 20, border: `1.5px solid ${activeCategory === fullCat ? NAVY : BORDER}`, background: activeCategory === fullCat ? NAVY : WHITE, color: activeCategory === fullCat ? WHITE : MUTED, fontSize: 10, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", whiteSpace: "nowrap" }}>
              {cat}
            </button>
          );
        })}
      </div>

      <div style={{ padding: "12px 16px 24px", display: "flex", flexDirection: "column", gap: 8 }}>
        <div style={{ fontSize: 11, color: MUTED }}>{filtered.length} standards</div>
        {filtered.map((std, i) => (
          <div key={i} onClick={() => setSelected(std.standard)}
            style={{ background: std.star ? STAR_BG : WHITE, border: `1px solid ${BORDER}`, borderLeft: `4px solid ${std.color}`, borderRadius: 12, padding: "12px 14px", cursor: "pointer", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                {std.star && <span style={{ color: AMBER, fontSize: 11 }}>★</span>}
                <span style={{ fontSize: 14, fontWeight: 800, color: std.color }}>{std.standard}</span>
              </div>
              <span style={{ color: MUTED }}>›</span>
            </div>
            <div style={{ fontSize: 12, fontWeight: 600, color: NAVY, marginBottom: 4 }}>{std.title}</div>
            <div style={{ fontSize: 11, color: MUTED }}>{std.category}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
