// ============================================================
// BATCH 02 — REFERENCE GUIDES
// Fastener Companion App
//
// Named exports — import as:
//   import { HowToMeasure, Nomenclature, TopStandards,
//            Glossary, FailureAnalysis, InstallationBestPractices,
//            ThreadlockerGuide, AntiSeizeGuide, GalvanicCorrosion,
//            FastenerMaterialGuide } from './batch-02-reference-guides'
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
// HowToMeasure
// ════════════════════════════════════════════════════

import { useState } from "react";

// ─── DATA ─────────────────────────────────────────────────────────────────────
// Sources: ASME B18.2.1, ASME B18.2.3.1M, ASME B18.2.8, Engineers Edge,
// Bolt Depot, Portland Bolt, MechaniCalc fastener reference

const MEASUREMENT_TYPES = [
  {
    id: "diameter",
    label: "Diameter",
    icon: "⊙",
    color: "#2563EB",
    bg: "#EFF6FF",
    title: "How to Measure Bolt/Screw Diameter",
    standard: "ASME B18.2.1 · ISO 272",
    steps: [
      {
        step: "1. Identify nominal vs actual diameter",
        detail: "Nominal diameter is the reference size used for ordering (e.g. 1/2\"). Actual measured diameter will be slightly less — a 1/2\" bolt typically measures 0.490\"–0.498\". This is normal per ASME B18.2.1 tolerances.",
        warning: false,
      },
      {
        step: "2. Use calipers or a bolt gauge",
        detail: "Measure the SHANK (unthreaded body) with digital calipers or a bolt gauge. Do not measure across thread crests — this gives an inflated reading. Measure at least 2–3 locations along the shank and take the average.",
        warning: false,
      },
      {
        step: "3. Measure across thread crests only if no shank is present",
        detail: "If the bolt is threaded full length, measure across the outside of the threads (major diameter). Add a small allowance — thread crests are at maximum material condition.",
        warning: false,
      },
      {
        step: "4. Convert your measurement",
        detail: "If you measure in mm and need inches: divide by 25.4. If you measure in inches and need mm: multiply by 25.4.",
        warning: false,
      },
    ],
    tips: [
      { label: "Common mistake", text: "Measuring across thread crests gives major diameter, not nominal diameter. Always measure the smooth shank when possible.", type: "warning" },
      { label: "Bolt gauge", text: "A bolt gauge (go/no-go gauge) is the fastest field method. Slot the bolt through until it drops through cleanly — that's your nominal size.", type: "tip" },
      { label: "Metric identification", text: "M-sizes are measured in mm of nominal diameter. M10 = 10mm nominal diameter. Actual measurement will be 9.97–9.97mm.", type: "info" },
    ],
    table: {
      headers: ["Nominal Size", "Typical Actual (in)", "Typical Actual (mm)"],
      rows: [
        ["#10", "0.185–0.190\"", "4.7–4.8mm"],
        ["1/4\"", "0.245–0.250\"", "6.2–6.4mm"],
        ["5/16\"", "0.307–0.313\"", "7.8–7.9mm"],
        ["3/8\"", "0.370–0.375\"", "9.4–9.5mm"],
        ["1/2\"", "0.490–0.498\"", "12.4–12.6mm"],
        ["5/8\"", "0.615–0.623\"", "15.6–15.8mm"],
        ["3/4\"", "0.740–0.748\"", "18.8–19.0mm"],
        ["1\"", "0.990–0.998\"", "25.1–25.3mm"],
        ["M6", "5.97–6.00mm", "0.235–0.236\""],
        ["M8", "7.97–8.00mm", "0.314–0.315\""],
        ["M10", "9.97–10.00mm", "0.392–0.394\""],
        ["M12", "11.97–12.00mm", "0.471–0.472\""],
        ["M16", "15.97–16.00mm", "0.629–0.630\""],
        ["M20", "19.97–20.00mm", "0.786–0.787\""],
      ],
    },
  },
  {
    id: "length",
    label: "Length",
    icon: "↕",
    color: "#DC2626",
    bg: "#FFF1F2",
    title: "How to Measure Bolt/Screw Length",
    standard: "ASME B18.2.1 · ASME B18.2.3.1M",
    steps: [
      {
        step: "1. Understand that length measurement varies by head type",
        detail: "This is the most common source of ordering errors. The rule: length is measured from the bearing surface of the head (where it contacts the joint) to the end of the bolt. For most heads this is the underside. For flat/countersunk heads it is the TOP of the head.",
        warning: true,
      },
      {
        step: "2. Hex head, pan head, round head, truss head",
        detail: "Measure from the underside of the head (bearing surface) to the tip of the bolt. The head height is NOT included in the length. This is the most common head type.",
        warning: false,
      },
      {
        step: "3. Flat head / countersunk head",
        detail: "Measure from the TOP of the head to the tip of the bolt. The entire head IS included in the length because a flat head sits flush with the surface — the full head becomes part of the joint.",
        warning: false,
      },
      {
        step: "4. Oval head",
        detail: "Measure from the theoretical sharp edge at the junction of the cone and the oval (not the top of the dome). In practice, measure similarly to flat head — from where the head would meet a flat surface.",
        warning: false,
      },
      {
        step: "5. Use calipers for accuracy",
        detail: "For bolts under 1\", measure to the nearest 0.01\". For ordering, round to the nearest standard length increment. Standard length increments are typically 1/8\" up to 1\", then 1/4\" up to 4\", then 1/2\" above 4\".",
        warning: false,
      },
    ],
    tips: [
      { label: "Most common mistake", text: "Ordering a flat head screw with the head height NOT included in the length. A flat head countersink length ALWAYS includes the head.", type: "warning" },
      { label: "Thread length formula (imperial)", text: "For L ≤ 6\": Thread length = (2 × diameter) + 0.25\". For L > 6\": Thread length = (2 × diameter) + 0.50\". Per ASME B18.2.1.", type: "info" },
      { label: "Thread length formula (metric)", text: "For L ≤ 125mm: Thread length = (2 × diameter) + 6mm. For L > 125mm: Thread length = (2 × diameter) + 12mm. Per ASME B18.2.3.1M.", type: "info" },
      { label: "Fully threaded bolts", text: "Some bolts are threaded full length. These have no smooth shank. Length measurement rule still applies — measured from bearing surface to tip.", type: "tip" },
    ],
    headTypes: [
      { head: "Hex / Heavy Hex", measure: "Underside of head to tip", includesHead: "No" },
      { head: "Pan / Round / Truss", measure: "Underside of head to tip", includesHead: "No" },
      { head: "Flat / Countersunk", measure: "Top of head to tip", includesHead: "Yes" },
      { head: "Oval / Raised CSK", measure: "Bearing edge to tip", includesHead: "Partial" },
      { head: "Socket Head Cap", measure: "Underside of head to tip", includesHead: "No" },
      { head: "Button Head", measure: "Underside of head to tip", includesHead: "No" },
      { head: "Carriage Bolt", measure: "Underside of head to tip", includesHead: "No" },
      { head: "Set Screw", measure: "Full length (no head)", includesHead: "N/A" },
    ],
  },
  {
    id: "thread",
    label: "Thread Pitch",
    icon: "〰",
    color: "#059669",
    bg: "#F0FDF4",
    title: "How to Measure Thread Pitch",
    standard: "ASME B1.1 · ISO 68-1",
    steps: [
      {
        step: "1. Use a thread pitch gauge (comb gauge) — fastest method",
        detail: "Lay the teeth of the gauge along the threads. Try different blade sizes until the teeth seat flush in the thread valleys with no rocking or gaps. The number stamped on the blade is your thread pitch (metric: mm) or TPI (imperial).",
        warning: false,
      },
      {
        step: "2. Count threads per inch (imperial) — manual method",
        detail: "Place a ruler along the bolt threads. Count the number of thread crests within exactly 1 inch. That number is your TPI (Threads Per Inch). Partial threads at start/end don't count. Count peaks, not valleys.",
        warning: false,
      },
      {
        step: "3. Measure pitch directly (metric) — manual method",
        detail: "Use digital calipers to measure the distance from the center of one thread crest to the center of the next adjacent crest. That measurement in mm is your pitch. For accuracy, measure across 10 threads and divide by 10.",
        warning: false,
      },
      {
        step: "4. Identify coarse vs fine",
        detail: "Coarse thread has fewer TPI (wider spacing). Fine thread has more TPI (tighter spacing). For the same bolt diameter, fine thread feels smoother when you run your fingernail along it. Coarse threads feel more aggressive.",
        warning: false,
      },
      {
        step: "5. Confirm metric vs imperial",
        detail: "Metric and imperial threads look similar but are NOT interchangeable. Use a pitch gauge to confirm. If a gauge from neither system fits cleanly, the thread may be damaged, an unusual pitch, or a non-standard thread form.",
        warning: true,
      },
    ],
    tips: [
      { label: "Never mix metric and imperial", text: "A 3/8\"-16 UNC bolt and an M10 × 1.5 bolt are close in diameter but completely different threads. Forcing mismatched threads strips the mating part instantly.", type: "warning" },
      { label: "Conversion formula", text: "TPI to mm pitch: divide 25.4 by TPI. Pitch to TPI: divide 25.4 by pitch. Example: 20 TPI = 25.4÷20 = 1.27mm pitch.", type: "info" },
      { label: "Damaged threads", text: "If a thread gauge doesn't fit cleanly, check for damage before assuming wrong pitch. Burrs, galling, or cross-threading can prevent gauge seating.", type: "tip" },
      { label: "Left-hand threads", text: "Left-hand threads are uncommon but exist. If a bolt tightens counterclockwise, it's left-hand thread. Look for an L or LH marking on the head.", type: "tip" },
    ],
    commonPitches: [
      { size: "1/4\" UNC", tpi: "20", pitch: "1.27mm" },
      { size: "5/16\" UNC", tpi: "18", pitch: "1.41mm" },
      { size: "3/8\" UNC", tpi: "16", pitch: "1.59mm" },
      { size: "1/2\" UNC", tpi: "13", pitch: "1.95mm" },
      { size: "3/4\" UNC", tpi: "10", pitch: "2.54mm" },
      { size: "1\" UNC", tpi: "8", pitch: "3.18mm" },
      { size: "M6 Coarse", tpi: "~25.4", pitch: "1.00mm" },
      { size: "M8 Coarse", tpi: "~20.3", pitch: "1.25mm" },
      { size: "M10 Coarse", tpi: "~16.9", pitch: "1.50mm" },
      { size: "M12 Coarse", tpi: "~14.5", pitch: "1.75mm" },
      { size: "M16 Coarse", tpi: "~12.7", pitch: "2.00mm" },
      { size: "M20 Coarse", tpi: "~10.2", pitch: "2.50mm" },
    ],
  },
  {
    id: "head",
    label: "Head Dimensions",
    icon: "⬡",
    color: "#7C3AED",
    bg: "#F5F3FF",
    title: "How to Measure Head Dimensions",
    standard: "ASME B18.2.1 · ISO 272",
    steps: [
      {
        step: "1. Width Across Flats (WAF) — wrench size",
        detail: "Measure from one flat face to the opposite flat face using calipers. This is the dimension that determines your wrench/socket size. Also called 'across flats' or 'AF'. This is NOT the same as across corners.",
        warning: false,
      },
      {
        step: "2. Width Across Corners (WAC)",
        detail: "Measure diagonally from one corner to the opposite corner. WAC is always larger than WAF. WAC = WAF × 1.1547 (for a perfect hex). Relevant for clearance calculations in confined spaces.",
        warning: false,
      },
      {
        step: "3. Head Height",
        detail: "Measure from the bearing surface (underside) to the top of the head using calipers. For hex heads this is the dimension from the flat bearing face to the flat top. Standard and heavy hex heads have different heights — always specify which.",
        warning: false,
      },
      {
        step: "4. Standard vs Heavy Hex",
        detail: "Heavy hex heads have larger WAF and greater head height than standard hex for the same bolt diameter. Heavy hex is used in structural connections (ASTM A325/A490) and flanged joints. Never assume standard — measure to confirm.",
        warning: true,
      },
      {
        step: "5. Socket Head Cap Screw head diameter",
        detail: "Socket heads are measured by head diameter (OD of the cylindrical head) and head height. Use calipers to measure both. Socket size is typically 80% of the nominal bolt diameter.",
        warning: false,
      },
    ],
    tips: [
      { label: "Standard vs Heavy Hex", text: "A 1/2\" standard hex uses 3/4\" wrench. A 1/2\" heavy hex uses 7/8\" wrench. Always confirm head type before specifying.", type: "warning" },
      { label: "Across flats formula", text: "WAF (mm) = nominal bolt diameter (mm) × 1.6 (approximate for metric coarse). E.g. M10 ≈ 17mm WAF. Not exact — always verify with dimension tables.", type: "info" },
      { label: "Damaged heads", text: "Round or damaged hex heads indicate overtorque, wrong tool, or corrosion. A rounded head that won't accept a socket can be removed with bolt extractors or vice grips as a last resort.", type: "tip" },
    ],
    headTable: {
      headers: ["Size", "Std WAF", "Heavy WAF", "Std Height", "Heavy Height"],
      rows: [
        ["1/4\"", "7/16\"", "—", "11/64\"", "—"],
        ["5/16\"", "1/2\"", "—", "7/32\"", "—"],
        ["3/8\"", "9/16\"", "—", "1/4\"", "—"],
        ["1/2\"", "3/4\"", "7/8\"", "11/32\"", "5/16\""],
        ["5/8\"", "15/16\"", "1-1/16\"", "27/64\"", "25/64\""],
        ["3/4\"", "1-1/8\"", "1-1/4\"", "1/2\"", "15/32\""],
        ["7/8\"", "1-5/16\"", "1-7/16\"", "37/64\"", "35/64\""],
        ["1\"", "1-1/2\"", "1-5/8\"", "43/64\"", "39/64\""],
        ["1-1/4\"", "1-7/8\"", "2\"", "27/32\"", "25/32\""],
        ["1-1/2\"", "2-1/4\"", "2-3/8\"", "1\"", "15/16\""],
      ],
    },
  },
  {
    id: "tools",
    label: "Measuring Tools",
    icon: "??",
    color: "#D97706",
    bg: "#FFF8E7",
    title: "Measuring Tools for Fasteners",
    standard: "Field Reference",
    tools: [
      {
        name: "Digital Calipers",
        use: "Most versatile tool. Measures diameter, length, head height, WAF. Essential for any serious fastener work.",
        accuracy: "±0.001\" / ±0.02mm",
        cost: "$15–$200",
        tip: "Always zero before measuring. Clean the jaws. Measure at least twice. Digital preferred over dial for readability.",
        star: true,
      },
      {
        name: "Bolt/Fastener Gauge",
        use: "Quick go/no-go size ID. Slotted gauge — drop bolt through slots to find nominal diameter. Fastest field method.",
        accuracy: "Nominal size only",
        cost: "$10–$30",
        tip: "Best for quick nominal diameter ID. Not for precise measurement. Carry one in every toolbox.",
        star: true,
      },
      {
        name: "Thread Pitch Gauge (Comb)",
        use: "Identifies thread pitch or TPI. Fan of blades — each stamped with pitch/TPI. Lay against threads until flush.",
        accuracy: "Identifies standard pitches",
        cost: "$8–$25",
        tip: "Get a combo set with both imperial (TPI) and metric (mm pitch) blades. Essential for field ID.",
        star: true,
      },
      {
        name: "Micrometer",
        use: "Precision diameter measurement. More accurate than calipers for critical applications.",
        accuracy: "±0.0001\"",
        cost: "$30–$300+",
        tip: "Use for precision applications where caliper accuracy isn't sufficient. Overkill for most field work.",
        star: false,
      },
      {
        name: "Go/No-Go Thread Gauges",
        use: "Verifies thread class (2A, 3A etc.). GO gauge must pass, NO-GO gauge must not pass.",
        accuracy: "Thread class verification",
        cost: "$50–$500+ per size",
        tip: "Required for quality inspection and receiving inspection of critical fasteners. Not typically needed for field use.",
        star: false,
      },
      {
        name: "Optical Comparator / Vision System",
        use: "Projects magnified fastener profile for measurement. Used in manufacturing QC.",
        accuracy: "±0.001\"",
        cost: "$500–$50,000+",
        tip: "Manufacturing/inspection environment only. Not field applicable.",
        star: false,
      },
      {
        name: "Ruler / Tape Measure",
        use: "Rough length measurement only. NOT suitable for diameter, thread pitch, or head dimensions.",
        accuracy: "±1/16\" at best",
        cost: "$1–$20",
        tip: "Acceptable ONLY for rough bolt length. Never use for diameter or thread ID. Always upgrade to calipers for anything important.",
        star: false,
      },
    ],
  },
];


// ════════════════════════════════════════════════════
// FailureAnalysis
// ════════════════════════════════════════════════════

// ─── DATA ─────────────────────────────────────────────────────────────────────
// Sources: ARP (Automotive Racing Products) failure analysis guide,
// KnightHawk Engineering case studies, Nord-Lock Group bolting analysis,
// SMRP bolt failure mode identification, IFI technical resources,
// ASTM failure analysis methodology, J.P. Aero-Com failure analysis

const FAILURE_MODES = [
  {
    id: "fatigue",
    name: "Fatigue Failure",
    severity: "HIGH",
    frequency: "Most Common",
    color: "#DC2626",
    bg: "#FFF1F2",
    icon: "??",
    summary: "Gradual crack growth from cyclic (repeated) loading — eventually causes sudden fracture at loads well below rated capacity.",
    visual_signs: [
      "Fracture surface shows 'beach marks' or 'thumbnail marks' — concentric rings radiating from crack origin",
      "Two distinct zones: smooth fatigue crack propagation area + rough final fracture area",
      "Crack typically initiates at thread root, head-to-shank transition, or corrosion pit",
      "Little or no visible deformation — bolt looks almost intact until final fracture",
      "Beach marks visible under 3× magnification or even naked eye on larger fasteners",
    ],
    causes: [
      "Under-torquing (insufficient preload) — most common cause. Allows joint to flex under load",
      "Vibration without adequate locking mechanism",
      "Cyclic external loading exceeding fatigue limit",
      "Corrosion pits at thread roots acting as stress concentrators",
      "Wrong fastener grade for application",
      "Poor surface finish at thread roots",
    ],
    prevention: [
      "Correct preload — torque to specification, use torque angle method for critical joints",
      "Use rolled threads (stronger than cut threads in fatigue)",
      "Add vibration-resistant locking: nyloc, threadlocker, Nordlock washers",
      "Protect from corrosion — prevent pitting at thread roots",
      "Upgrade grade if cyclic loading is high",
      "Re-torque after initial service period to address embedment relaxation",
    ],
    what_to_do: "Examine fracture surface for beach marks. Check torque specification and verify correct procedure was followed. Inspect remaining fasteners for looseness. Consider upgrading to rolled thread fasteners and adding locking mechanism.",
    reuse: "Never reuse a fractured fastener. Inspect all fasteners in the same joint — if one failed from fatigue, others may be close to failure.",
  },
  {
    id: "overtorque",
    name: "Tensile Overload (Over-Torquing)",
    severity: "HIGH",
    frequency: "Common",
    color: "#D97706",
    bg: "#FFF8E7",
    icon: "??",
    summary: "Bolt stretched beyond yield or tensile strength during installation or from excessive external load.",
    visual_signs: [
      "Fracture surface shows 'cup and cone' shape — one face has a cup, the other a cone",
      "Significant necking (reduction in diameter) at the fracture point",
      "Shiny, fibrous fracture surface — indicates ductile failure",
      "Thread may be stripped or elongated",
      "Bolt may appear stretched or elongated before fracture",
      "Head may show signs of bearing surface damage",
    ],
    causes: [
      "Torque specification not followed — most common",
      "Impact wrench used without torque control",
      "Wrong torque spec used (dry vs lubricated mix-up)",
      "Anti-seize applied but dry torque value used",
      "Incorrect fastener grade (lower grade installed where higher required)",
      "Excessive external tensile load on joint",
    ],
    prevention: [
      "Always use calibrated torque wrench for final tightening",
      "Verify dry vs lubricated torque specification before starting",
      "When using anti-seize, reduce torque by 25–35%",
      "Confirm correct grade was installed — check head markings",
      "Use torque angle method for critical joints",
      "Never use impact wrench for final torque",
    ],
    what_to_do: "Check torque specification and lubricant condition. Verify correct grade was installed by checking head markings. Review if anti-seize or lubricant was used without torque reduction. Replace with correct grade and retorque properly.",
    reuse: "Never reuse an overtorqued or yielded fastener — permanent elongation reduces clamping capability. Replace all fasteners in joint.",
  },
  {
    id: "undertorque",
    name: "Loosening / Under-Torquing",
    severity: "MEDIUM",
    frequency: "Very Common",
    color: "#2563EB",
    bg: "#EFF6FF",
    icon: "??",
    summary: "Fastener loses clamping force due to insufficient initial torque, vibration, or embedment relaxation.",
    visual_signs: [
      "Fastener turns by hand or minimal tool effort",
      "Visible gap between joint members or head/nut bearing surface",
      "Fretting corrosion (reddish-brown powder) around fastener head or joint interface",
      "Elongated or wallowed-out holes from joint movement",
      "Wear marks on faying surfaces from micro-movement",
      "Thread damage from repeated micro-movement",
    ],
    causes: [
      "Insufficient installation torque",
      "Vibration without locking mechanism",
      "Embedment relaxation — surfaces flatten, losing preload",
      "Thermal cycling — differential expansion loosens fasteners",
      "Wrong thread engagement length — insufficient threads",
      "Corrosion reducing effective thread engagement",
      "Reuse of stretch-type or torque-to-yield fasteners",
    ],
    prevention: [
      "Torque to specification — verify with calibrated wrench",
      "Re-torque after initial service period for gasketed and high-temperature joints",
      "Add locking mechanism: nyloc nut, threadlocker, lock washer",
      "Use Nordlock washers in high-vibration applications",
      "Ensure adequate thread engagement (minimum 1× diameter)",
      "Replace torque-to-yield fasteners after each removal",
    ],
    what_to_do: "Inspect all fasteners in joint for looseness. Determine root cause — vibration, relaxation, or insufficient initial torque. Re-torque to specification with appropriate locking mechanism. If holes are wallowed out, the joint members need repair or replacement.",
    reuse: "If fasteners show no damage, they can be reused after re-torquing. Replace any showing thread damage, corrosion, or deformation.",
  },
  {
    id: "shear",
    name: "Shear Failure",
    severity: "HIGH",
    frequency: "Moderate",
    color: "#7C3AED",
    bg: "#F5F3FF",
    icon: "✂️",
    summary: "Bolt cut laterally by shear forces — often sudden and catastrophic.",
    visual_signs: [
      "Diagonal or flat fracture surface perpendicular to bolt axis — clean cut appearance",
      "Fracture surface at shear plane location (typically at faying surface between parts)",
      "May show 45° fracture angle in ductile shear failure",
      "Little or no elongation visible",
      "Parts may show wear or fretting at bolt hole edges",
    ],
    causes: [
      "Bolt loaded in shear without adequate cross-section",
      "Wrong grade — insufficient shear strength for application",
      "Threads in shear plane — bolt should have shank in shear zone, not threads",
      "Overloaded joint — external shear load exceeded bolt capacity",
      "Impact or shock load",
      "Insufficient number of bolts sharing the shear load",
    ],
    prevention: [
      "Size bolts correctly for shear loads — verify with engineering calculation",
      "Position bolts so smooth shank (not threads) is in the shear plane",
      "Use dowel pins for shear — bolts are designed for tension/clamping, not shear",
      "Verify correct grade — do not substitute lower grade",
      "Consider adding bolts to distribute shear load",
    ],
    what_to_do: "Check bolt positioning — threads should not be in shear plane. Verify correct grade and size for shear application. Consider using dowel pins to handle shear and bolts for clamping. Consult engineer if shear loads are significant.",
    reuse: "Never reuse a shear-failed fastener. Inspect mating holes for damage or elongation.",
  },
  {
    id: "corrosion",
    name: "Corrosion Failure",
    severity: "MEDIUM-HIGH",
    frequency: "Common",
    color: "#92400E",
    bg: "#FEF3C7",
    icon: "??",
    summary: "Chemical degradation of fastener material — reduces effective cross section and strength, can cause sudden brittle fracture.",
    visual_signs: [
      "Red/orange rust on carbon steel — general corrosion",
      "White powder on aluminum or zinc-plated fasteners — white rust (zinc oxide)",
      "Pitting — small holes or craters on fastener surface or thread roots",
      "Green discoloration on copper alloy (brass, bronze) fasteners",
      "Crevice corrosion — concentrated attack under heads, at thread roots, in gaps",
      "Stress corrosion cracking (SCC) — fine branched cracks, often invisible until fracture",
      "Galvanic corrosion — severe pitting on one metal when in contact with dissimilar metal",
    ],
    causes: [
      "Wrong coating or material for environment",
      "Galvanic couple — stainless fasteners in aluminum structure, or zinc in contact with copper",
      "Coating damage — scratches, nicks exposing bare steel",
      "Moisture trapped under heads or in crevices",
      "Chemical exposure — salt, acids, industrial chemicals",
      "Stainless steel in chloride environment without adequate grade (need 316, not 304)",
    ],
    prevention: [
      "Select correct material/coating for environment — 316 SS for marine, HDG for outdoor steel",
      "Avoid galvanic couples — use isolating washers or same metal family",
      "Inspect coatings regularly and repair damage",
      "Drain moisture — avoid trapped water around fastener heads",
      "Apply corrosion inhibitor in aggressive environments",
      "Use zinc flake coatings (Geomet/Dacromet) for maximum corrosion resistance without HE risk",
    ],
    what_to_do: "Assess extent of corrosion — surface only vs deep pitting vs thread damage. Replace any fastener with pitting at thread roots (stress concentration). Identify and eliminate root cause of corrosion. Upgrade material/coating for future installations.",
    reuse: "Never reuse a heavily corroded fastener. Light surface rust may be acceptable for non-critical applications — clean and inspect threads carefully.",
  },
  {
    id: "hydrogen",
    name: "Hydrogen Embrittlement (HE)",
    severity: "CRITICAL",
    frequency: "Uncommon but Dangerous",
    color: "#DC2626",
    bg: "#FFF1F2",
    icon: "⚡",
    summary: "Sudden brittle fracture caused by hydrogen absorption — most dangerous failure mode because it can occur at loads well below rated capacity with no warning.",
    visual_signs: [
      "Sudden fracture with little or no visible prior deformation — looks like new bolt",
      "Intergranular fracture pattern under magnification — cracks follow grain boundaries",
      "Fracture may occur hours or days after installation (delayed HE)",
      "No beach marks (unlike fatigue) — fracture is sudden",
      "May occur at or near thread roots",
      "Parts look otherwise undamaged — no obvious cause visible",
    ],
    causes: [
      "Electroplating without baking — hydrogen absorbed during acid pickling or plating",
      "Galvanizing high-strength fasteners — NEVER galvanize Grade 8, A490, or 12.9",
      "Hydrogen-rich service environment — sour gas, cathodic protection systems",
      "Improper baking after plating — bake must be 375°F (191°C) for minimum 3 hours per ASTM F1941",
      "Susceptible grades — Grade 8, A490, 10.9, 12.9 are most vulnerable (above HRC 35)",
    ],
    prevention: [
      "NEVER hot-dip galvanize Grade 8, A490, 10.9, or 12.9 fasteners",
      "Require baking (embrittlement relief) after electroplating of high-strength fasteners per ASTM F1941",
      "Use zinc flake coatings (Geomet, Dacromet) instead of electroplating for high-strength fasteners",
      "Specify 'embrittlement tested' on purchase orders for critical high-strength plated fasteners",
      "For sour gas applications, use low-hardness grades (A193 B7M, A320 L7M)",
    ],
    what_to_do: "If HE is suspected, immediately quarantine and replace all fasteners from the same lot. Do not attempt to reuse. Contact supplier for material certification review. Test remaining fasteners if safety-critical application.",
    reuse: "NEVER reuse a hydrogen-embrittled fastener. Quarantine entire lot — the problem affects the batch, not individual fasteners.",
  },
  {
    id: "galling",
    name: "Galling (Thread Seizure)",
    severity: "MEDIUM",
    frequency: "Common in Stainless",
    color: "#0891B2",
    bg: "#F0FDFE",
    icon: "??",
    summary: "Cold welding of mating thread surfaces — typically during assembly. Most common with stainless steel.",
    visual_signs: [
      "Fastener becomes impossible to turn during assembly — sudden seizure",
      "Torn, smeared, or abraded thread surfaces",
      "Material transfer visible — metal from one surface adhered to another",
      "Fastener may spin freely then suddenly lock",
      "Metallic debris visible around fastener",
    ],
    causes: [
      "Stainless steel — austenitic SS is highly susceptible due to work hardening under pressure",
      "No lubrication — dry assembly of stainless fasteners",
      "High assembly speed — impact drivers generate heat accelerating galling",
      "Overtightening — excessive contact pressure",
      "Surface finish incompatibility — too smooth or too rough",
      "Dirty or contaminated threads",
    ],
    prevention: [
      "Always lubricate stainless fasteners — anti-seize or thread lubricant mandatory",
      "Assemble stainless fasteners slowly by hand initially — impact wrench only for run-down",
      "Use dissimilar stainless grades for bolt and nut (e.g. 304 bolt with 316 nut)",
      "Keep threads clean — remove debris before assembly",
      "Consider anti-galling coatings — PTFE (Teflon) coated fasteners resist galling",
    ],
    what_to_do: "Once galling occurs, the fastener typically cannot be saved — the threads are damaged. Apply penetrating oil and attempt removal with slow steady force. Often must drill out or use bolt extractor. Prevent with lubrication on all future stainless installations.",
    reuse: "Never reuse a galled fastener. Inspect mating threads — may need re-tapping or thread insert repair.",
  },
  {
    id: "stripped",
    name: "Stripped Threads",
    severity: "MEDIUM",
    frequency: "Very Common",
    color: "#64748B",
    bg: "#F8FAFC",
    icon: "??",
    summary: "Thread failure where the internal or external thread material shears away, losing grip.",
    visual_signs: [
      "Fastener spins without developing clamping force — 'spinning in place'",
      "Metallic debris or shavings around fastener",
      "Visible thread damage — flattened, sheared, or missing thread crests",
      "Tapped hole may show bright, polished damaged threads",
      "Nut may run freely on bolt after stripping",
    ],
    causes: [
      "Insufficient thread engagement length",
      "Overtorquing — exceeds shear strength of threads",
      "Wrong material combination — bolt harder than tapped hole material",
      "Cross-threading — forcing misaligned threads",
      "Reuse of prevailing torque nuts beyond service life",
      "Tapped hole in aluminum or soft material without adequate engagement",
      "Incorrect tap size or drill size for hole",
    ],
    prevention: [
      "Minimum thread engagement: 1× diameter in steel, 1.5× in aluminum, 2× in cast iron",
      "Start all fasteners by hand to verify thread alignment before using tools",
      "Use thread inserts (Helicoil) in soft materials for improved strength",
      "Never reuse nyloc/prevailing torque nuts beyond manufacturer's reuse recommendation",
      "Verify correct tap drill size from tap drill chart",
    ],
    what_to_do: "Assess damage — external thread (bolt) vs internal thread (hole/nut). External thread: replace bolt. Internal thread: repair with Helicoil, E-Z Lok, or Keensert insert, or re-tap to next larger size. Evaluate root cause — overtorque, insufficient engagement, or cross-threading.",
    reuse: "Replace externally stripped bolts. Tapped hole can often be repaired with thread inserts.",
  },
];

const DECISION_TREE = [
  {
    question: "Is the fastener broken/fractured?",
    yes: "Go to fracture analysis",
    no: "Go to loosening/stripping analysis",
  },
  {
    question: "Fracture: Does it show beach marks (concentric rings)?",
    yes: "→ FATIGUE FAILURE — look for under-torque, vibration, corrosion pits",
    no: "Continue fracture analysis",
  },
  {
    question: "Fracture: Cup and cone shape with necking/elongation?",
    yes: "→ TENSILE OVERLOAD — check torque procedure, grade, lubrication",
    no: "Continue fracture analysis",
  },
  {
    question: "Fracture: Sudden, no deformation, intergranular pattern?",
    yes: "→ HYDROGEN EMBRITTLEMENT — check plating process, quarantine lot",
    no: "Continue fracture analysis",
  },
  {
    question: "Fracture: Clean cut perpendicular to bolt axis?",
    yes: "→ SHEAR FAILURE — check bolt position, grade, shear load calculation",
    no: "→ CORROSION FAILURE — examine for pitting, galvanic couple, coating failure",
  },
  {
    question: "Not fractured: Spins freely without clamping?",
    yes: "→ STRIPPED THREADS — check engagement length, material, torque",
    no: "Continue loosening analysis",
  },
  {
    question: "Not fractured: Loose but not stripped?",
    yes: "→ LOOSENING/UNDER-TORQUE — check torque, add locking mechanism, re-torque",
    no: "→ GALLING (if stainless) — check lubrication, thread condition",
  },
];

export default function FailureAnalysis() {
  const [selected, setSelected] = useState(null);
  const [activeTab, setActiveTab] = useState("modes");

  const selectedMode = selected ? FAILURE_MODES.find(m => m.id === selected) : null;

  const severityColor = (s) => {
    if (s === "CRITICAL") return "#DC2626";
    if (s === "HIGH") return "#D97706";
    if (s === "MEDIUM-HIGH") return "#D97706";
    if (s === "MEDIUM") return "#2563EB";
    return "#64748B";
  };

  return (
    <div style={{ fontFamily: "'DM Sans','Segoe UI',sans-serif", background: BG, minHeight: "100vh", maxWidth: 430, margin: "0 auto" }}>

      {/* HEADER */}
      <div style={{ background: `linear-gradient(135deg, ${NAVY} 0%, #2C5282 100%)`, padding: "16px 20px 20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
          <span style={{ fontSize: 20 }}>⬡</span>
          <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 10, letterSpacing: 2, textTransform: "uppercase" }}>Fastener Companion</span>
        </div>
        <div style={{ color: WHITE, fontSize: 20, fontWeight: 800, marginBottom: 2 }}>Fastener Failure Analysis</div>
        <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 11 }}>ARP · KnightHawk Engineering · Nord-Lock Group · IFI Technical Resources · ASTM</div>
      </div>

      {/* TABS */}
      <div style={{ background: WHITE, borderBottom: `1px solid ${BORDER}`, padding: "0 12px", display: "flex" }}>
        {[
          { id: "modes", label: "Failure Modes" },
          { id: "tree", label: "Decision Tree" },
        ].map(t => (
          <button key={t.id} onClick={() => { setActiveTab(t.id); setSelected(null); }}
            style={{
              background: "none", border: "none", cursor: "pointer", padding: "12px 16px",
              fontSize: 12, fontWeight: 700, fontFamily: "inherit",
              color: activeTab === t.id ? NAVY : MUTED,
              borderBottom: activeTab === t.id ? `3px solid ${AMBER}` : "3px solid transparent",
            }}>{t.label}</button>
        ))}
      </div>

      {/* FAILURE MODES LIST */}
      {activeTab === "modes" && !selectedMode && (
        <div style={{ padding: "12px 16px", display: "flex", flexDirection: "column", gap: 10 }}>
          <div style={{ background: STAR_BG, border: `1px solid ${STAR_BORDER}`, borderRadius: 10, padding: "10px 14px", marginBottom: 4 }}>
            <div style={{ fontSize: 11, color: "#92400E", lineHeight: 1.5 }}>
              <strong>Field tip:</strong> ~95% of fastener failures occur during installation or maintenance. Only ~5% are due to wrong fastener selection. Always start by reviewing the installation procedure.
            </div>
          </div>
          {FAILURE_MODES.map((mode) => (
            <div key={mode.id} onClick={() => setSelected(mode.id)}
              style={{
                background: WHITE, border: `1px solid ${BORDER}`,
                borderLeft: `4px solid ${mode.color}`,
                borderRadius: 12, padding: "14px", cursor: "pointer",
                boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
              }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 20 }}>{mode.icon}</span>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 800, color: NAVY }}>{mode.name}</div>
                    <div style={{ fontSize: 10, color: MUTED, marginTop: 1 }}>{mode.frequency}</div>
                  </div>
                </div>
                <div style={{
                  background: severityColor(mode.severity) + "20",
                  border: `1px solid ${severityColor(mode.severity)}`,
                  borderRadius: 6, padding: "2px 8px",
                  fontSize: 9, fontWeight: 800, color: severityColor(mode.severity),
                }}>{mode.severity}</div>
              </div>
              <div style={{ fontSize: 12, color: TEXT, lineHeight: 1.5, marginBottom: 6 }}>{mode.summary}</div>
              <div style={{ fontSize: 11, color: mode.color, fontWeight: 600 }}>Tap to see visual signs, causes & prevention →</div>
            </div>
          ))}
        </div>
      )}

      {/* FAILURE MODE DETAIL */}
      {activeTab === "modes" && selectedMode && (
        <div style={{ padding: "14px 16px" }}>
          <button onClick={() => setSelected(null)}
            style={{ background: "none", border: "none", cursor: "pointer", color: NAVY, fontSize: 13, fontWeight: 700, fontFamily: "inherit", marginBottom: 14, display: "flex", alignItems: "center", gap: 6, padding: 0 }}>
            ← Back to failures
          </button>

          <div style={{ background: selectedMode.bg, border: `1px solid ${BORDER}`, borderLeft: `4px solid ${selectedMode.color}`, borderRadius: 12, padding: "14px", marginBottom: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
              <span style={{ fontSize: 24 }}>{selectedMode.icon}</span>
              <div>
                <div style={{ fontSize: 16, fontWeight: 800, color: selectedMode.color }}>{selectedMode.name}</div>
                <div style={{ fontSize: 11, color: MUTED }}>{selectedMode.frequency}</div>
              </div>
            </div>
            <div style={{ fontSize: 12, color: TEXT, lineHeight: 1.6 }}>{selectedMode.summary}</div>
          </div>

          {/* Visual Signs */}
          <div style={{ background: WHITE, border: `1px solid ${BORDER}`, borderRadius: 12, overflow: "hidden", marginBottom: 10, boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
            <div style={{ background: NAVY, padding: "10px 14px" }}>
              <div style={{ color: WHITE, fontSize: 12, fontWeight: 700 }}>?? Visual Signs to Look For</div>
            </div>
            {selectedMode.visual_signs.map((sign, i) => (
              <div key={i} style={{ padding: "9px 14px", borderBottom: `1px solid ${BORDER}`, background: i % 2 === 0 ? WHITE : ROW_ALT, display: "flex", gap: 10, alignItems: "flex-start" }}>
                <span style={{ color: selectedMode.color, fontSize: 12, flexShrink: 0, marginTop: 1 }}>•</span>
                <div style={{ fontSize: 12, color: TEXT, lineHeight: 1.5 }}>{sign}</div>
              </div>
            ))}
          </div>

          {/* Causes */}
          <div style={{ background: "#FFF1F2", border: `1px solid #FECDD3`, borderRadius: 12, overflow: "hidden", marginBottom: 10 }}>
            <div style={{ background: "#DC2626", padding: "10px 14px" }}>
              <div style={{ color: WHITE, fontSize: 12, fontWeight: 700 }}>⚠ Common Causes</div>
            </div>
            {selectedMode.causes.map((cause, i) => (
              <div key={i} style={{ padding: "9px 14px", borderBottom: `1px solid #FECDD3`, background: i % 2 === 0 ? WHITE : "#FFF5F5", display: "flex", gap: 10, alignItems: "flex-start" }}>
                <span style={{ color: "#DC2626", fontSize: 12, flexShrink: 0, marginTop: 1 }}>✗</span>
                <div style={{ fontSize: 12, color: TEXT, lineHeight: 1.5 }}>{cause}</div>
              </div>
            ))}
          </div>

          {/* Prevention */}
          <div style={{ background: "#F0FDF4", border: `1px solid #BBF7D0`, borderRadius: 12, overflow: "hidden", marginBottom: 10 }}>
            <div style={{ background: "#059669", padding: "10px 14px" }}>
              <div style={{ color: WHITE, fontSize: 12, fontWeight: 700 }}>✓ Prevention</div>
            </div>
            {selectedMode.prevention.map((item, i) => (
              <div key={i} style={{ padding: "9px 14px", borderBottom: `1px solid #BBF7D0`, background: i % 2 === 0 ? WHITE : "#F0FDF4", display: "flex", gap: 10, alignItems: "flex-start" }}>
                <span style={{ color: "#059669", fontSize: 12, flexShrink: 0, marginTop: 1 }}>✓</span>
                <div style={{ fontSize: 12, color: TEXT, lineHeight: 1.5 }}>{item}</div>
              </div>
            ))}
          </div>

          {/* What to do */}
          <div style={{ background: "#EFF6FF", border: `1px solid #BFDBFE`, borderLeft: `4px solid #2563EB`, borderRadius: 12, padding: "12px 14px", marginBottom: 10 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#2563EB", marginBottom: 6 }}>?? What to Do Now</div>
            <div style={{ fontSize: 12, color: TEXT, lineHeight: 1.6 }}>{selectedMode.what_to_do}</div>
          </div>

          {/* Reuse guidance */}
          <div style={{ background: STAR_BG, border: `1px solid ${STAR_BORDER}`, borderLeft: `4px solid ${AMBER}`, borderRadius: 12, padding: "12px 14px", marginBottom: 14 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#92400E", marginBottom: 6 }}>♻ Reuse Guidance</div>
            <div style={{ fontSize: 12, color: "#92400E", lineHeight: 1.5 }}>{selectedMode.reuse}</div>
          </div>
        </div>
      )}

      {/* DECISION TREE */}
      {activeTab === "tree" && (
        <div style={{ padding: "14px 16px" }}>
          <div style={{ background: STAR_BG, border: `1px solid ${STAR_BORDER}`, borderRadius: 10, padding: "10px 14px", marginBottom: 14 }}>
            <div style={{ fontSize: 11, color: "#92400E", lineHeight: 1.5 }}>
              Work through these questions to identify the most likely failure mode. Always examine the failed fastener directly — visual inspection is the most important diagnostic tool.
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {DECISION_TREE.map((node, i) => (
              <div key={i} style={{ background: WHITE, border: `1px solid ${BORDER}`, borderRadius: 12, overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
                <div style={{ background: NAVY, padding: "10px 14px" }}>
                  <div style={{ color: AMBER, fontSize: 10, fontWeight: 700, marginBottom: 2 }}>Step {i + 1}</div>
                  <div style={{ color: WHITE, fontSize: 12, fontWeight: 700 }}>{node.question}</div>
                </div>
                <div style={{ padding: "10px 14px" }}>
                  <div style={{ display: "flex", gap: 8, marginBottom: node.no ? 8 : 0 }}>
                    <div style={{ background: "#F0FDF4", border: "1px solid #BBF7D0", borderRadius: 6, padding: "4px 10px", fontSize: 10, fontWeight: 700, color: "#059669", flexShrink: 0 }}>YES</div>
                    <div style={{ fontSize: 12, color: TEXT, lineHeight: 1.5 }}>{node.yes}</div>
                  </div>
                  {node.no && (
                    <div style={{ display: "flex", gap: 8 }}>
                      <div style={{ background: "#FFF1F2", border: "1px solid #FECDD3", borderRadius: 6, padding: "4px 10px", fontSize: 10, fontWeight: 700, color: "#DC2626", flexShrink: 0 }}>NO</div>
                      <div style={{ fontSize: 12, color: TEXT, lineHeight: 1.5 }}>{node.no}</div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* DISCLAIMER */}
      <div style={{ margin: "0 16px 24px", background: "#FFF1F2", border: "1px solid #FECDD3", borderRadius: 10, padding: "10px 14px" }}>
        <div style={{ fontSize: 10, color: "#9F1239", lineHeight: 1.5 }}>
          <strong>⚠ Verify Before Use.</strong> Failure analysis guidance based on ARP, KnightHawk Engineering, Nord-Lock Group, and IFI technical resources. Visual inspection is a preliminary diagnostic tool — critical failures should be analyzed by a qualified engineer or materials laboratory. Fastener Companion is a reference tool — not a substitute for engineering judgment.
        </div>
      </div>
    </div>
  );
}
