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

```

How to Measure done. Moving straight to the next one — **Fastener Nomenclature & Callout Guide.**",
    "citations": []
  }


// ════════════════════════════════════════════════════
// Nomenclature
// ════════════════════════════════════════════════════

import { useState } from "react";

// ─── DATA ─────────────────────────────────────────────────────────────────────
// Sources: ASME B18.2.1, ASME B18.24, ASME B1.1, ISO 898-1,
// Portland Bolt designation guides, Bolt Depot, Engineers Edge,
// IFI Fastener Standards 7th Edition

const CALLOUT_EXAMPLES = [
  {
    id: "imperial_bolt",
    label: "Imperial Hex Bolt",
    example: "1/2\"-13 UNC × 2\" Hex Bolt — ASTM A307 Gr.A — HDG",
    color: "#2563EB",
    bg: "#EFF6FF",
    parts: [
      { segment: "1/2\"", name: "Nominal Diameter", detail: "Outside diameter of the shank in inches. This is the bolt 'size'." },
      { segment: "13", name: "Threads Per Inch (TPI)", detail: "Number of thread crests per inch. Separated from diameter by a dash. 13 TPI = coarse thread for 1/2\"." },
      { segment: "UNC", name: "Thread Series", detail: "UNC = Unified National Coarse. Other options: UNF (fine), UNEF (extra fine), UN (constant pitch e.g. 8UN)." },
      { segment: "×", name: "Separator", detail: "An × or dash separates thread callout from length. Both are acceptable." },
      { segment: "2\"", name: "Length", detail: "From bearing surface of head to tip. For hex bolts this does NOT include head height." },
      { segment: "Hex Bolt", name: "Product Type", detail: "Head and body style. Could also be: Hex Cap Screw, Heavy Hex Bolt, Carriage Bolt, etc." },
      { segment: "ASTM A307 Gr.A", name: "Material / Grade Standard", detail: "Material specification and grade. This determines mechanical properties. Could also be: SAE Gr.5, ASTM A325, ISO 8.8, etc." },
      { segment: "HDG", name: "Finish / Coating", detail: "Hot-Dip Galvanized. Other common codes: ZP (zinc plated), BLK (black oxide), SS (stainless), Plain (uncoated)." },
    ],
    notes: "The minimum complete callout for ordering is: diameter-TPI × length, product type, material/grade. Finish is optional but recommended to avoid ambiguity.",
  },
  {
    id: "metric_bolt",
    label: "Metric Hex Bolt",
    example: "M12 × 1.75 × 50mm Hex Bolt — ISO 8.8 — Zinc Plated",
    color: "#059669",
    bg: "#F0FDF4",
    parts: [
      { segment: "M12", name: "Metric Designation + Nominal Diameter", detail: "'M' prefix indicates metric. 12 = nominal diameter in millimeters. This is the bolt 'size'." },
      { segment: "× 1.75", name: "Thread Pitch (mm)", detail: "Distance in mm between adjacent thread crests. For coarse threads this can be omitted — M12 alone implies 1.75mm coarse pitch. Always specify when using fine pitch." },
      { segment: "× 50mm", name: "Length", detail: "From bearing surface of head to tip in millimeters. Same rule as imperial — hex bolt length does NOT include head height." },
      { segment: "Hex Bolt", name: "Product Type", detail: "Head and body style. Same descriptors as imperial: Hex Bolt, Hex Cap Screw, Flange Bolt, etc." },
      { segment: "ISO 8.8", name: "Property Class", detail: "Metric strength designation per ISO 898-1. 8.8 = 800 MPa tensile, 80% yield ratio. Common classes: 4.6, 8.8, 10.9, 12.9." },
      { segment: "Zinc Plated", name: "Finish / Coating", detail: "Electrogalvanized zinc. Common metric finishes: Plain, Zinc Plated, Hot-Dip Galvanized, Black Oxide, Stainless (A2/A4)." },
    ],
    notes: "For coarse pitch metric bolts, pitch can be omitted: 'M12 × 50mm' implies M12 coarse (1.75mm pitch). Always include pitch for fine thread: 'M12 × 1.25 × 50mm'.",
  },
  {
    id: "imperial_screw",
    label: "Imperial Machine Screw",
    example: "#10-32 × 1\" Pan Head Phillips — SAE Gr.5 — ZP",
    color: "#D97706",
    bg: "#FFF8E7",
    parts: [
      { segment: "#10", name: "Machine Screw Size Number", detail: "Machine screw sizes use # prefix. Range: #0 through #12, then 1/4\" and up. #10 nominal diameter = 0.190\". Formula: diameter = (#size × 0.013) + 0.060\"." },
      { segment: "32", name: "Threads Per Inch", detail: "Same as bolts. #10-32 is fine thread (UNF). #10-24 would be coarse (UNC). Always specify for machine screws." },
      { segment: "× 1\"", name: "Length", detail: "Same rules as bolts apply — measurement depends on head type. Pan head = from underside. Flat head = from top." },
      { segment: "Pan Head", name: "Head Style", detail: "Head style is critical for machine screws. Common styles: Pan, Flat (countersunk), Round, Oval, Truss, Fillister, Binding, Hex, Button." },
      { segment: "Phillips", name: "Drive Type", detail: "Drive style. Common: Phillips (#0–#3), Slotted, Combo (Phillips/Slot), Hex Socket (Allen), Torx, Square (Robertson)." },
      { segment: "SAE Gr.5", name: "Material / Grade", detail: "Machine screws are often specified by material type rather than full ASTM designation. Common: SAE Gr.5, SAE Gr.8, 18-8 SS, 316 SS, Brass, Nylon." },
      { segment: "ZP", name: "Finish", detail: "Zinc Plated (electrogalvanized). Common finishes for machine screws: ZP, Black Oxide (BLK), Plain, 18-8 SS (self-describing)." },
    ],
    notes: "For machine screws, head style and drive type are both critical to include — a #10-32 pan head Phillips and a #10-32 flat head slotted are completely different parts.",
  },
  {
    id: "stud_bolt",
    label: "Stud Bolt",
    example: "1\"-8 UNC × 8\" Stud Bolt — ASTM A193 Gr.B7 — Plain",
    color: "#7C3AED",
    bg: "#F5F3FF",
    parts: [
      { segment: "1\"", name: "Nominal Diameter", detail: "Outside thread diameter in inches. Stud bolts are typically larger — common for flanges and pressure vessels." },
      { segment: "8 UNC", name: "Thread Series", detail: "1\"-8 is the 8-UN (8 thread per inch) constant pitch series — the most common for large industrial stud bolts. Per ASME B18.31.2." },
      { segment: "× 8\"", name: "Length", detail: "Full length of stud. Stud bolts have no head — measured full length from end to end. Specify engagement depth when required." },
      { segment: "Stud Bolt", name: "Product Type", detail: "Fully threaded rod with no head. Types: Full Thread (fully threaded), Double End (specific thread length each end), Tap End (different thread each end)." },
      { segment: "ASTM A193 Gr.B7", name: "Material Standard", detail: "B7 = chromium-molybdenum alloy steel (4140), quenched and tempered. Standard for flanges, pressure vessels, high temperature. Specify A194 Gr.2H nuts to match." },
      { segment: "Plain", name: "Finish", detail: "No coating. B7 stud bolts are commonly supplied plain or with phosphate coating. Avoid galvanizing A490 and high-strength bolts — hydrogen embrittlement risk." },
    ],
    notes: "Always specify nut grade for stud bolts. B7 studs require A194 Gr.2H heavy hex nuts. Never mix nut grades with stud bolt grades — this is a common and dangerous procurement error.",
  },
];

const SCREW_VS_BOLT = [
  {
    question: "The technical definition",
    bolt: "An externally threaded fastener designed to be used with a nut. Passes through a clearance hole and is tightened by turning the nut.",
    screw: "An externally threaded fastener designed to mate with a pre-formed internal thread (tapped hole) or to form its own thread. Tightened by turning the head.",
    verdict: "Technical distinction is about how the fastener is used, not what it looks like.",
  },
  {
    question: "In common industrial usage",
    bolt: "Often used loosely to mean any large externally threaded fastener with a hex head — even when used in a tapped hole (technically a screw).",
    screw: "Often used for smaller fasteners or those with non-hex drive types (Phillips, Torx, socket). Also used correctly for fasteners threaded into tapped holes.",
    verdict: "In practice, 'bolt' and 'screw' are often used interchangeably. For ordering, always specify the full callout rather than relying on the noun alone.",
  },
  {
    question: "Hex Cap Screw vs Hex Bolt",
    bolt: "Hex Bolt: partially threaded, coarser tolerances, used with a nut through a clearance hole. Covered by ASME B18.2.1.",
    screw: "Hex Cap Screw: tighter dimensional tolerances, washer face under head, used in tapped holes. Also covered by ASME B18.2.1 but to tighter tolerances.",
    verdict: "These look nearly identical but have different tolerances. For precision applications, specify 'hex cap screw' not 'hex bolt'.",
  },
  {
    question: "For ordering purposes",
    bolt: "Always use the full technical callout: diameter-TPI × length, product type, material, finish. The noun 'bolt' or 'screw' matters less than the complete specification.",
    screw: "Same rule applies. A complete callout eliminates ambiguity regardless of what noun you use.",
    verdict: "Bottom line: use the complete callout. Don't rely on 'bolt' or 'screw' alone to communicate what you need.",
  },
];

const COMMON_ABBREVIATIONS = [
  { abbr: "UNC", full: "Unified National Coarse thread" },
  { abbr: "UNF", full: "Unified National Fine thread" },
  { abbr: "UNEF", full: "Unified National Extra Fine thread" },
  { abbr: "8UN / 8-UN", full: "8 Unified National (constant pitch)" },
  { abbr: "TPI", full: "Threads Per Inch" },
  { abbr: "WAF", full: "Width Across Flats (wrench size)" },
  { abbr: "WAC", full: "Width Across Corners" },
  { abbr: "HDG", full: "Hot-Dip Galvanized" },
  { abbr: "ZP / EG", full: "Zinc Plated / Electrogalvanized" },
  { abbr: "BLK / BO", full: "Black Oxide" },
  { abbr: "Plain / A/R", full: "As Received / No finish" },
  { abbr: "SS", full: "Stainless Steel (must specify grade: 18-8, 316, etc.)" },
  { abbr: "GR / Gr.", full: "Grade (e.g. Gr.5, Gr.8, Gr.B7)" },
  { abbr: "PC", full: "Property Class (metric, e.g. PC 8.8)" },
  { abbr: "HH", full: "Heavy Hex (larger head than standard)" },
  { abbr: "FT / TF", full: "Full Thread (threaded entire length)" },
  { abbr: "PT / HT", full: "Partial Thread / Half Thread" },
  { abbr: "SHCS", full: "Socket Head Cap Screw" },
  { abbr: "BHCS", full: "Button Head Cap Screw" },
  { abbr: "FHCS", full: "Flat Head Cap Screw" },
  { abbr: "HHCS", full: "Hex Head Cap Screw" },
  { abbr: "LH", full: "Left Hand thread" },
  { abbr: "RH", full: "Right Hand thread (default — never needs to be specified)" },
  { abbr: "CoC", full: "Certificate of Conformance" },
  { abbr: "MTR", full: "Mill Test Report" },
  { abbr: "Q&T", full: "Quenched and Tempered (heat treatment)" },
  { abbr: "A2 / A4", full: "Stainless steel grade per ISO 3506 (A2=304, A4=316)" },
];

export default function Nomenclature() {
  const [activeTab, setActiveTab] = useState("callout");
  const [activeExample, setActiveExample] = useState("imperial_bolt");
  const [expandedPart, setExpandedPart] = useState(null);
  const [search, setSearch] = useState("");

  const current = CALLOUT_EXAMPLES.find(e => e.id === activeExample);

  const filteredAbbr = COMMON_ABBREVIATIONS.filter(a =>
    a.abbr.toLowerCase().includes(search.toLowerCase()) ||
    a.full.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ fontFamily: "'DM Sans','Segoe UI',sans-serif", background: BG, minHeight: "100vh", maxWidth: 430, margin: "0 auto" }}>

      {/* HEADER */}
      <div style={{ background: `linear-gradient(135deg, ${NAVY} 0%, #2C5282 100%)`, padding: "16px 20px 20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
          <span style={{ fontSize: 20 }}>⬡</span>
          <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 10, letterSpacing: 2, textTransform: "uppercase" }}>Fastener Companion</span>
        </div>
        <div style={{ color: WHITE, fontSize: 20, fontWeight: 800, marginBottom: 2 }}>Fastener Nomenclature</div>
        <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 11 }}>ASME B18.2.1 · ASME B18.24 · ASME B1.1 · ISO 898-1 · IFI 7th Ed.</div>
      </div>

      {/* SECTION TABS */}
      <div style={{ background: WHITE, borderBottom: `1px solid ${BORDER}`, padding: "0 8px", display: "flex" }}>
        {[
          { id: "callout", label: "Callout Guide" },
          { id: "screw_vs_bolt", label: "Bolt vs Screw" },
          { id: "abbreviations", label: "Abbreviations" },
        ].map(t => (
          <button key={t.id} onClick={() => setActiveTab(t.id)}
            style={{
              background: "none", border: "none", cursor: "pointer", padding: "12px 10px",
              fontSize: 11, fontWeight: 700, fontFamily: "inherit", whiteSpace: "nowrap",
              color: activeTab === t.id ? NAVY : MUTED,
              borderBottom: activeTab === t.id ? `3px solid ${AMBER}` : "3px solid transparent",
            }}>{t.label}</button>
        ))}
      </div>

      {/* CALLOUT GUIDE */}
      {activeTab === "callout" && (
        <div style={{ padding: "14px 16px" }}>
          {/* Example selector */}
          <div style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: MUTED, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 8 }}>Select Example</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {CALLOUT_EXAMPLES.map(ex => (
                <button key={ex.id} onClick={() => { setActiveExample(ex.id); setExpandedPart(null); }}
                  style={{
                    background: activeExample === ex.id ? ex.bg : WHITE,
                    border: `1.5px solid ${activeExample === ex.id ? ex.color : BORDER}`,
                    borderRadius: 10, padding: "10px 14px", cursor: "pointer", fontFamily: "inherit",
                    textAlign: "left",
                  }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: activeExample === ex.id ? ex.color : NAVY }}>{ex.label}</div>
                  <div style={{ fontSize: 11, color: MUTED, marginTop: 2, fontFamily: "monospace" }}>{ex.example}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Callout display */}
          <div style={{ background: current.bg, border: `1px solid ${BORDER}`, borderLeft: `4px solid ${current.color}`, borderRadius: 12, padding: "12px 14px", marginBottom: 14 }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: current.color, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 6 }}>Complete Callout</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: NAVY, fontFamily: "monospace", lineHeight: 1.6 }}>{current.example}</div>
          </div>

          {/* Parts breakdown */}
          <div style={{ fontSize: 10, fontWeight: 700, color: MUTED, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 8 }}>Tap Each Part to Explain</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {current.parts.map((part, i) => (
              <div key={i}>
                <div onClick={() => setExpandedPart(expandedPart === i ? null : i)}
                  style={{
                    background: WHITE, border: `1px solid ${expandedPart === i ? current.color : BORDER}`,
                    borderRadius: expandedPart === i ? "12px 12px 0 0" : 12,
                    padding: "10px 14px", cursor: "pointer",
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                  }}>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 800, color: current.color, fontFamily: "monospace" }}>{part.segment}</div>
                    <div style={{ fontSize: 11, color: MUTED, marginTop: 1 }}>{part.name}</div>
                  </div>
                  <span style={{ color: expandedPart === i ? current.color : MUTED, fontSize: 16 }}>{expandedPart === i ? "▲" : "▼"}</span>
                </div>
                {expandedPart === i && (
                  <div style={{ background: current.bg, border: `1px solid ${current.color}`, borderTop: "none", borderRadius: "0 0 12px 12px", padding: "10px 14px" }}>
                    <div style={{ fontSize: 12, color: TEXT, lineHeight: 1.6 }}>{part.detail}</div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Notes */}
          <div style={{ marginTop: 12, background: STAR_BG, border: `1px solid ${STAR_BORDER}`, borderRadius: 10, padding: "10px 14px" }}>
            <div style={{ fontSize: 11, color: "#92400E", lineHeight: 1.5 }}>?? {current.notes}</div>
          </div>
        </div>
      )}

      {/* BOLT VS SCREW */}
      {activeTab === "screw_vs_bolt" && (
        <div style={{ padding: "14px 16px", display: "flex", flexDirection: "column", gap: 10 }}>
          {SCREW_VS_BOLT.map((item, i) => (
            <div key={i} style={{ background: WHITE, border: `1px solid ${BORDER}`, borderRadius: 12, overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
              <div style={{ background: NAVY, padding: "10px 14px" }}>
                <div style={{ color: WHITE, fontSize: 12, fontWeight: 700 }}>{item.question}</div>
              </div>
              <div style={{ padding: "12px 14px" }}>
                <div style={{ marginBottom: 8 }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: "#2563EB", textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>Bolt</div>
                  <div style={{ fontSize: 12, color: TEXT, lineHeight: 1.5 }}>{item.bolt}</div>
                </div>
                <div style={{ marginBottom: 10 }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: "#059669", textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>Screw</div>
                  <div style={{ fontSize: 12, color: TEXT, lineHeight: 1.5 }}>{item.screw}</div>
                </div>
                <div style={{ background: STAR_BG, borderRadius: 8, padding: "8px 12px" }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#92400E", marginBottom: 2 }}>Bottom Line</div>
                  <div style={{ fontSize: 11, color: "#92400E", lineHeight: 1.5 }}>{item.verdict}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ABBREVIATIONS */}
      {activeTab === "abbreviations" && (
        <div style={{ padding: "14px 16px" }}>
          <div style={{ background: WHITE, borderRadius: 12, display: "flex", alignItems: "center", padding: "10px 14px", gap: 8, marginBottom: 12, boxShadow: "0 1px 4px rgba(0,0,0,0.06)", border: `1px solid ${BORDER}` }}>
            <span style={{ color: MUTED }}>??</span>
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search abbreviations..."
              style={{ background: "none", border: "none", outline: "none", color: TEXT, fontSize: 14, flex: 1, fontFamily: "inherit" }} />
            {search && <span onClick={() => setSearch("")} style={{ color: MUTED, cursor: "pointer" }}>✕</span>}
          </div>
          <div style={{ background: WHITE, borderRadius: 14, overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.06)", border: `1px solid ${BORDER}` }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", background: NAVY, padding: "10px 14px" }}>
              <div style={{ color: WHITE, fontSize: 11, fontWeight: 700 }}>Abbreviation</div>
              <div style={{ color: WHITE, fontSize: 11, fontWeight: 700 }}>Meaning</div>
            </div>
            {filteredAbbr.length === 0
              ? <div style={{ padding: 24, textAlign: "center", color: MUTED, fontSize: 13 }}>No results found</div>
              : filteredAbbr.map((item, i) => (
                <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 2fr", padding: "9px 14px", background: i % 2 === 0 ? WHITE : ROW_ALT, borderBottom: `1px solid ${BORDER}`, alignItems: "center" }}>
                  <div style={{ fontSize: 12, fontWeight: 800, color: NAVY, fontFamily: "monospace" }}>{item.abbr}</div>
                  <div style={{ fontSize: 12, color: TEXT, lineHeight: 1.4 }}>{item.full}</div>
                </div>
              ))
            }
          </div>
        </div>
      )}

      {/* DISCLAIMER */}
      <div style={{ margin: "0 16px 24px", background: "#FFF1F2", border: "1px solid #FECDD3", borderRadius: 10, padding: "10px 14px" }}>
        <div style={{ fontSize: 10, color: "#9F1239", lineHeight: 1.5 }}>
          <strong>⚠ Verify Before Use.</strong> Nomenclature guidance based on ASME B18.2.1, ASME B18.24, ASME B1.1, and IFI 7th Edition. Always confirm complete specifications with supplier documentation for critical applications. Fastener Companion is a reference tool — not a substitute for engineering judgment.
        </div>
      </div>
    </div>
  );
}
