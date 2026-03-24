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
// FastenerTypeReference
// ════════════════════════════════════════════════════

// ─── DATA ─────────────────────────────────────────────────────────────────────
// Sources: ASME B18.2.1, B18.3, B18.6.3, B18.6.4, B18.5, B18.9,
// IFI Fastener Standards 7th Edition, Machinery's Handbook 31st Ed.

const FASTENER_FAMILIES = [
  {
    family: "Hex Bolts & Cap Screws",
    icon: "⬡",
    color: "#1B3A6B",
    standard: "ASME B18.2.1",
    star: true,
    types: [
      {
        name: "Hex Bolt",
        symbol: "H-BOLT",
        description: "Six-sided head. Used through a clearance hole with a nut. No washer face under head.",
        callout: "3/8-16 × 2\" Hex Bolt ASTM A307",
        uses: "General structural, construction, through-bolting",
        note: "Distinguished from hex cap screw by absence of washer face",
        drive: "Wrench / socket (hex)",
        star: true,
      },
      {
        name: "Hex Cap Screw",
        symbol: "HCS",
        description: "Six-sided head with washer face on bearing surface. Tighter tolerance than hex bolt. Can be used in tapped hole without nut.",
        callout: "1/2-13 × 1.5\" Hex Cap Screw SAE Grade 5",
        uses: "Machinery, tapped holes, higher-precision assembly",
        note: "Has washer face — hex bolt does not. Higher tolerance class.",
        drive: "Wrench / socket (hex)",
        star: true,
      },
      {
        name: "Heavy Hex Bolt",
        symbol: "HH-BOLT",
        description: "Larger head (WAF) than standard hex for same diameter. Required for structural bolting (A325/A490).",
        callout: "3/4-10 × 2.5\" A325 Heavy Hex Structural Bolt",
        uses: "Structural steel connections, bridges, heavy machinery",
        note: "Required by AISC for A325/A490 structural bolting — cannot substitute standard hex",
        drive: "Wrench / socket (hex, larger size than standard)",
        star: true,
      },
      {
        name: "Flange Bolt",
        symbol: "FLG",
        description: "Hex head with integral washer flange beneath. Distributes clamping load without separate washer.",
        callout: "5/16-18 × 1\" Flange Bolt Gr. 5",
        uses: "Automotive, pipe flanges, sheet metal, covers",
        note: "Serrated flange variant adds vibration resistance. Eliminates need for separate washer.",
        drive: "Wrench / socket (hex)",
        star: false,
      },
      {
        name: "Hex Jam Nut Bolt (Double Nut)",
        symbol: "JAM",
        description: "Not a bolt type — technique using standard bolt with standard nut plus thin jam nut to lock assembly.",
        callout: "Jam nut tightened against standard nut",
        uses: "Vibration-resistant assemblies, adjustable connections",
        note: "Jam nut goes on first (against work), standard nut goes on outside. Tighten standard nut against jam nut.",
        drive: "Two wrenches simultaneously",
        star: false,
      },
    ],
  },
  {
    family: "Socket Head Fasteners",
    icon: "⬟",
    color: "#7C3AED",
    standard: "ASME B18.3",
    star: true,
    types: [
      {
        name: "Socket Head Cap Screw (SHCS)",
        symbol: "SHCS",
        description: "Cylindrical head with internal hex socket. High strength (12.9 / Grade 8 typical). Allows assembly in tight spaces.",
        callout: "M10 × 1.5 × 30mm SHCS ISO 12.9",
        uses: "Machinery, tooling, precision equipment, where clearance is limited",
        note: "Standard grade is 12.9 (metric) or Grade 8 (imperial). Do NOT electroplate 12.9 without baking — extreme HE risk.",
        drive: "Hex key (Allen wrench)",
        star: true,
      },
      {
        name: "Button Head Cap Screw",
        symbol: "BHCS",
        description: "Low-profile dome head with hex socket. Wider bearing surface than SHCS but lower profile.",
        callout: "1/4-20 × 3/4\" Button Head SHCS Gr. 8",
        uses: "Low clearance, cosmetic applications, panels, covers",
        note: "Lower torque capacity than standard SHCS due to smaller socket. Not for high-torque applications.",
        drive: "Hex key (Allen wrench)",
        star: false,
      },
      {
        name: "Flat Head Cap Screw",
        symbol: "FHCS",
        description: "Countersunk head (82° for inch, 90° for metric) that sits flush or below surface.",
        callout: "10-32 × 1\" Flat Head SHCS SS",
        uses: "Flush mounting, panels, where protruding head is unacceptable",
        note: "Requires countersunk hole. Inch = 82°, Metric = 90° — countersinks are NOT interchangeable.",
        drive: "Hex key (Allen wrench)",
        star: false,
      },
      {
        name: "Low Head Cap Screw",
        symbol: "LHCS",
        description: "Reduced head height SHCS for minimal clearance applications.",
        callout: "M6 × 1.0 × 20mm Low Head SHCS",
        uses: "Extremely tight head clearance, stacked assemblies",
        note: "Smaller socket depth = reduced torque capacity. Verify torque requirements before substituting for standard SHCS.",
        drive: "Hex key (Allen wrench)",
        star: false,
      },
    ],
  },
  {
    family: "Machine Screws",
    icon: "??",
    color: "#2563EB",
    standard: "ASME B18.6.3",
    star: true,
    types: [
      {
        name: "Pan Head Machine Screw",
        symbol: "PAN",
        description: "Rounded top, flat bearing surface, large diameter. Most common machine screw head.",
        callout: "#10-32 × 1\" Pan Head Phillips SS",
        uses: "Panels, electronics, light machinery, general assembly",
        note: "High profile but good tool access. Most universally available head style.",
        drive: "Phillips, Slotted, Square, Torx",
        star: true,
      },
      {
        name: "Flat Head Machine Screw",
        symbol: "FLAT",
        description: "Countersunk head. 82° for inch (unified), 90° for metric.",
        callout: "#8-32 × 3/4\" Flat Head Phillips Stainless",
        uses: "Flush mounting, panels, hinges, trim pieces",
        note: "Inch and metric countersink angles differ — do not mix.",
        drive: "Phillips, Slotted, Torx, Hex",
        star: true,
      },
      {
        name: "Oval Head Machine Screw",
        symbol: "OVAL",
        description: "Countersunk like flat head but with decorative dome above surface.",
        callout: "#6-32 × 1/2\" Oval Head Slotted Chrome",
        uses: "Decorative/aesthetic applications, hardware, handles",
        note: "Primarily aesthetic. Rarely used in industrial applications.",
        drive: "Phillips, Slotted",
        star: false,
      },
      {
        name: "Truss Head Machine Screw",
        symbol: "TRUSS",
        description: "Extra wide, low-profile head. Maximum bearing area.",
        callout: "#10-24 × 1\" Truss Head Phillips Zinc",
        uses: "Thin material, maximum bearing area, where washer is not practical",
        note: "Large bearing diameter distributes load. Good for sheet metal and thin materials.",
        drive: "Phillips, Slotted, Square",
        star: false,
      },
      {
        name: "Fillister Head Machine Screw",
        symbol: "FILL",
        description: "Tall cylindrical head, small diameter. Deep slot for high torque.",
        callout: "#10-32 × 3/4\" Fillister Head Slotted",
        uses: "High torque in small head diameter, recessed installations",
        note: "Taller head allows deeper slot = higher torque before slot failure. Good for tight locations.",
        drive: "Slotted, Phillips",
        star: false,
      },
    ],
  },
  {
    family: "Sheet Metal & Self-Drilling Screws",
    icon: "??",
    color: "#059669",
    standard: "ASME B18.6.4",
    star: false,
    types: [
      {
        name: "Type A Sheet Metal Screw",
        symbol: "SMS-A",
        description: "Sharp point, coarse thread (fewer TPI than AB). Preferred in stainless for better grip.",
        callout: "#10 × 3/4\" Type A Pan Head Phillips SS",
        uses: "Sheet metal, light gauge steel, aluminum",
        note: "IFI considers Type A 'obsolete' but it remains preferred in stainless applications.",
        drive: "Phillips, Hex Washer Head",
        star: false,
      },
      {
        name: "Type AB Sheet Metal Screw",
        symbol: "SMS-AB",
        description: "Sharp point, fine thread (more TPI than A). Most common type.",
        callout: "#8 × 1\" Type AB Hex Washer Head Zinc",
        uses: "Sheet metal, plastic, wood, general light fastening",
        note: "Standard type for most sheet metal applications. Sharp point self-starts.",
        drive: "Phillips, Hex Washer Head, Slotted",
        star: true,
      },
      {
        name: "Type B Sheet Metal Screw",
        symbol: "SMS-B",
        description: "Blunt point, fine thread. For use in pre-punched or drilled holes.",
        callout: "#10 × 1\" Type B Pan Head Phillips",
        uses: "Reattachment in existing holes, softer materials",
        note: "Will not self-drill — requires pre-drilled hole.",
        drive: "Phillips, Slotted",
        star: false,
      },
      {
        name: "Self-Drilling Screw (Tek Screw)",
        symbol: "TEK",
        description: "Drill point (#1–#5) eliminates need for pre-drilled hole. Drills, taps, and fastens in one operation.",
        callout: "#12 × 1\" #3 Point Self-Drilling Hex Washer Head Zinc",
        uses: "Steel framing, roofing, HVAC ductwork, metal-to-metal",
        note: "Point number = material thickness capacity (#1 = light gauge, #5 = heavy structural). Confirm correct point for material thickness.",
        drive: "Hex Washer Head, Phillips Washer Head",
        star: true,
      },
    ],
  },
  {
    family: "Specialty & Structural",
    icon: "??️",
    color: "#D97706",
    standard: "ASME B18.5 / AISC",
    star: false,
    types: [
      {
        name: "Carriage Bolt",
        symbol: "CARR",
        description: "Dome head with square section under head that prevents rotation when inserted in square hole or wood.",
        callout: "3/8-16 × 3\" Carriage Bolt Grade 5 HDG",
        uses: "Wood construction, fencing, playground equipment, timber framing",
        note: "Square neck must engage wood or square hole to prevent spinning. Not for metal-to-metal without special fixtures.",
        drive: "Wrench on nut only — head non-wrenchable",
        star: false,
      },
      {
        name: "Stud Bolt",
        symbol: "STUD",
        description: "Threaded on both ends (or full length), no head. Used in flanges and pressure vessels.",
        callout: "1\"-8 × 6\" Stud Bolt A193 B7 / A194 2H",
        uses: "Pipe flanges (ASME B16.5), pressure vessels, cylinder heads",
        note: "Standard industrial flange bolting. Tap end (shorter) threads into flange, full thread extends through and accepts nut.",
        drive: "Nut on both ends",
        star: true,
      },
      {
        name: "U-Bolt",
        symbol: "U-BOLT",
        description: "U-shaped bolt threaded on both legs. Clamps around pipe, tube, or structural member.",
        callout: "3/8-16 × 2\" Round U-Bolt Zinc A307",
        uses: "Pipe supports, vehicle leaf springs, antenna mounting, structural clamps",
        note: "Specify inside diameter (ID) = pipe OD. Leg length determines clamping depth. Round, square, or semi-round bend types available.",
        drive: "Nut on both threaded legs",
        star: false,
      },
      {
        name: "Eye Bolt",
        symbol: "EYE",
        description: "Bolt with a looped or ring head. Load attachment point.",
        callout: "1/2-13 × 3\" Eye Bolt Working Load 1,300 lbs",
        uses: "Rigging, lifting, load anchoring, cable attachment",
        note: "Working load limit (WLL) is for straight vertical pull only — angular loading dramatically reduces capacity. Never lift at angle without shoulder eye bolt.",
        drive: "Wrench on shank (if shouldered), hand install for standard",
        star: false,
      },
      {
        name: "Anchor Bolt (L-Bolt / J-Bolt)",
        symbol: "ANCHOR",
        description: "Bent bolt embedded in concrete to attach structural elements.",
        callout: "3/4-10 × 18\" L-Bolt ASTM F1554 Gr. 36",
        uses: "Base plates, equipment anchoring, structural steel attachment to concrete",
        note: "Per ASTM F1554 (Gr. 36, 55, or 105 depending on strength). Embed depth per ACI 318. J-bolt has smaller hook than L-bolt.",
        drive: "Nut threaded onto projecting end",
        star: false,
      },
    ],
  },
  {
    family: "Set Screws & Headless",
    icon: "??",
    color: "#64748B",
    standard: "ASME B18.3",
    star: false,
    types: [
      {
        name: "Cup Point Set Screw",
        symbol: "CUP",
        description: "Most common set screw point. Concave cup bites into shaft surface for holding power.",
        callout: "1/4-20 × 1/4\" Cup Point Set Screw Gr. 8",
        uses: "Locking collars, hubs, and components to shafts",
        note: "Most common set screw type. Provides highest friction force. Leaves marks on shaft — acceptable in most applications.",
        drive: "Hex key (Allen)",
        star: true,
      },
      {
        name: "Cone Point Set Screw",
        symbol: "CONE",
        description: "Sharp conical point digs into shaft for permanent hold.",
        callout: "5/16-18 × 1/2\" Cone Point Set Screw",
        uses: "Permanent installations, where shaft marking is acceptable",
        note: "Highest holding force. Damages shaft — intended for permanent installation or expendable shafts.",
        drive: "Hex key",
        star: false,
      },
      {
        name: "Dog Point Set Screw",
        symbol: "DOG",
        description: "Cylindrical tip that enters a hole or slot in the shaft for precise location.",
        callout: "3/8-24 × 1\" Dog Point Set Screw",
        uses: "Precise shaft location, where removal without shaft damage required",
        note: "Requires matching hole or slot in shaft. Does not damage shaft. Good for removable assemblies.",
        drive: "Hex key",
        star: false,
      },
      {
        name: "Flat Point Set Screw",
        symbol: "FLAT",
        description: "Flat end, minimal shaft marring.",
        callout: "10-32 × 3/16\" Flat Point Set Screw",
        uses: "Soft materials, surfaces that must not be damaged, adjustment screws",
        note: "Lowest holding force of set screw types. Use only for light loads or fine adjustment.",
        drive: "Hex key, Slotted",
        star: false,
      },
    ],
  },
];

const ALL_TYPES = FASTENER_FAMILIES.flatMap(f => f.types.map(t => ({ ...t, family: f.family, family_color: f.color })));

export default function FastenerTypeReference() {
  const [activeFamily, setActiveFamily] = useState(null);
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");
  const [view, setView] = useState("families");

  const filteredFamilies = FASTENER_FAMILIES.filter(f =>
    f.family.toLowerCase().includes(search.toLowerCase()) ||
    f.types.some(t => t.name.toLowerCase().includes(search.toLowerCase()) || t.uses.toLowerCase().includes(search.toLowerCase()))
  );

  const filteredTypes = ALL_TYPES.filter(t =>
    t.name.toLowerCase().includes(search.toLowerCase()) ||
    t.uses.toLowerCase().includes(search.toLowerCase()) ||
    t.description.toLowerCase().includes(search.toLowerCase())
  );

  const selectedType = selected ? ALL_TYPES.find(t => t.name === selected) : null;
  const displayFamily = activeFamily ? FASTENER_FAMILIES.find(f => f.family === activeFamily) : null;

  if (selectedType) {
    return (
      <div style={{ fontFamily: "'DM Sans','Segoe UI',sans-serif", background: BG, minHeight: "100vh", maxWidth: 430, margin: "0 auto" }}>
        <div style={{ background: `linear-gradient(135deg, ${NAVY} 0%, #2C5282 100%)`, padding: "16px 20px 20px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
            <span style={{ fontSize: 20 }}>⬡</span>
            <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 10, letterSpacing: 2, textTransform: "uppercase" }}>Fastener Companion</span>
          </div>
          <div style={{ color: WHITE, fontSize: 18, fontWeight: 800 }}>{selectedType.name}</div>
          <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 11, marginTop: 2 }}>{selectedType.family}</div>
        </div>
        <div style={{ padding: "14px 16px" }}>
          <button onClick={() => setSelected(null)} style={{ background: "none", border: "none", cursor: "pointer", color: NAVY, fontSize: 13, fontWeight: 700, fontFamily: "inherit", marginBottom: 14, padding: 0 }}>← Back</button>

          <div style={{ background: WHITE, border: `1px solid ${BORDER}`, borderLeft: `4px solid ${selectedType.family_color}`, borderRadius: 12, padding: "14px", marginBottom: 12, boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <div style={{ background: selectedType.family_color, color: WHITE, borderRadius: 6, padding: "2px 10px", fontSize: 10, fontWeight: 800 }}>{selectedType.symbol}</div>
              {selectedType.star && <span style={{ color: AMBER }}>★ Common</span>}
            </div>
            <div style={{ fontSize: 13, color: TEXT, lineHeight: 1.6 }}>{selectedType.description}</div>
          </div>

          {[
            { label: "Typical Callout", value: selectedType.callout, mono: true },
            { label: "Primary Uses", value: selectedType.uses },
            { label: "Drive Type", value: selectedType.drive },
            { label: "Key Note", value: selectedType.note },
          ].map((item, i) => (
            <div key={i} style={{ background: WHITE, border: `1px solid ${BORDER}`, borderRadius: 10, padding: "10px 14px", marginBottom: 8 }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: MUTED, textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 3 }}>{item.label}</div>
              <div style={{ fontSize: 12, color: TEXT, lineHeight: 1.6, fontFamily: item.mono ? "monospace" : "inherit", fontWeight: item.mono ? 700 : 400 }}>{item.value}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: "'DM Sans','Segoe UI',sans-serif", background: BG, minHeight: "100vh", maxWidth: 430, margin: "0 auto" }}>
      <div style={{ background: `linear-gradient(135deg, ${NAVY} 0%, #2C5282 100%)`, padding: "16px 20px 20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
          <span style={{ fontSize: 20 }}>⬡</span>
          <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 10, letterSpacing: 2, textTransform: "uppercase" }}>Fastener Companion</span>
        </div>
        <div style={{ color: WHITE, fontSize: 20, fontWeight: 800, marginBottom: 2 }}>Fastener Type Reference</div>
        <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 11 }}>ASME B18.2.1/B18.3/B18.5/B18.6.3/B18.6.4 · IFI 7th Ed.</div>
        <div style={{ background: WHITE, borderRadius: 12, display: "flex", alignItems: "center", padding: "10px 14px", gap: 8, marginTop: 14, boxShadow: "0 2px 8px rgba(0,0,0,0.15)" }}>
          <span style={{ color: MUTED }}>??</span>
          <input value={search} onChange={e => { setSearch(e.target.value); setView(e.target.value ? "search" : "families"); }}
            placeholder="Search fastener types..."
            style={{ background: "none", border: "none", outline: "none", color: TEXT, fontSize: 14, flex: 1, fontFamily: "inherit" }} />
          {search && <span onClick={() => { setSearch(""); setView("families"); }} style={{ color: MUTED, cursor: "pointer" }}>✕</span>}
        </div>
      </div>

      {view === "search" ? (
        <div style={{ padding: "12px 16px", display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{ fontSize: 11, color: MUTED, marginBottom: 4 }}>{filteredTypes.length} results for "{search}"</div>
          {filteredTypes.map((type, i) => (
            <div key={i} onClick={() => setSelected(type.name)}
              style={{ background: WHITE, border: `1px solid ${BORDER}`, borderLeft: `3px solid ${type.family_color}`, borderRadius: 10, padding: "10px 14px", cursor: "pointer" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: NAVY }}>{type.name}</div>
                {type.star && <span style={{ color: AMBER, fontSize: 11 }}>★</span>}
              </div>
              <div style={{ fontSize: 11, color: MUTED, marginBottom: 3 }}>{type.family}</div>
              <div style={{ fontSize: 11, color: TEXT }}>{type.uses}</div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ padding: "12px 16px" }}>
          {!displayFamily ? (
            <>
              <div style={{ fontSize: 11, color: MUTED, marginBottom: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.8 }}>Fastener Families</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {FASTENER_FAMILIES.map((family) => (
                  <div key={family.family} onClick={() => setActiveFamily(family.family)}
                    style={{ background: family.star ? STAR_BG : WHITE, border: `1px solid ${BORDER}`, borderLeft: `4px solid ${family.color}`, borderRadius: 12, padding: "14px", cursor: "pointer", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <span style={{ fontSize: 22 }}>{family.icon}</span>
                        <div>
                          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                            {family.star && <span style={{ color: AMBER, fontSize: 11 }}>★</span>}
                            <span style={{ fontSize: 14, fontWeight: 800, color: NAVY }}>{family.family}</span>
                          </div>
                          <div style={{ fontSize: 10, color: MUTED }}>{family.standard} · {family.types.length} types</div>
                        </div>
                      </div>
                      <span style={{ color: MUTED }}>›</span>
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                      {family.types.slice(0, 3).map(t => (
                        <div key={t.name} style={{ background: family.color + "15", border: `1px solid ${family.color}30`, borderRadius: 6, padding: "2px 8px", fontSize: 10, fontWeight: 600, color: family.color }}>{t.name}</div>
                      ))}
                      {family.types.length > 3 && <div style={{ background: "#F1F5F9", border: `1px solid ${BORDER}`, borderRadius: 6, padding: "2px 8px", fontSize: 10, color: MUTED }}>+{family.types.length - 3} more</div>}
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              <button onClick={() => setActiveFamily(null)} style={{ background: "none", border: "none", cursor: "pointer", color: NAVY, fontSize: 13, fontWeight: 700, fontFamily: "inherit", marginBottom: 14, padding: 0 }}>← Families</button>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                <span style={{ fontSize: 24 }}>{displayFamily.icon}</span>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 800, color: NAVY }}>{displayFamily.family}</div>
                  <div style={{ fontSize: 11, color: MUTED }}>{displayFamily.standard}</div>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {displayFamily.types.map((type, i) => (
                  <div key={i} onClick={() => setSelected(type.name)}
                    style={{ background: type.star ? STAR_BG : WHITE, border: `1px solid ${BORDER}`, borderLeft: `3px solid ${displayFamily.color}`, borderRadius: 12, padding: "12px 14px", cursor: "pointer", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        {type.star && <span style={{ color: AMBER, fontSize: 11 }}>★</span>}
                        <div style={{ fontSize: 13, fontWeight: 800, color: NAVY }}>{type.name}</div>
                        <div style={{ background: displayFamily.color + "20", border: `1px solid ${displayFamily.color}40`, borderRadius: 4, padding: "1px 6px", fontSize: 9, fontWeight: 700, color: displayFamily.color }}>{type.symbol}</div>
                      </div>
                      <span style={{ color: MUTED }}>›</span>
                    </div>
                    <div style={{ fontSize: 12, color: TEXT, lineHeight: 1.5, marginBottom: 4 }}>{type.description}</div>
                    <div style={{ fontSize: 11, color: MUTED }}>Drive: {type.drive}</div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
