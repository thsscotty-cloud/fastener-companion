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


// ─── DATA ─────────────────────────────────────────────────────────────────────
// Sources: ASTM International, SAE International, ISO standards bodies,
// Portland Bolt technical library, Fastenal Engineering & Design Support,
// Engineers Edge, American Institute of Steel Construction (AISC),
// IFI Fastener Standards 7th Edition

const STANDARDS = [
  {
    id: "a307",
    code: "ASTM A307",
    nickname: "The Basic Bolt",
    category: "ASTM",
    color: "#64748B",
    bg: "#F8FAFC",
    grade: "Grade A / Grade B",
    saeEquiv: "≈ SAE Grade 2",
    metricEquiv: "≈ ISO 4.6",
    material: "Low carbon steel",
    tensile: "60,000 psi min (414 MPa)",
    yield: "Not specified",
    proof: "Not specified",
    marking: "A307 on head",
    sizes: "1/4\" – 4\"",
    star: false,
    plain_english: "The most basic, lowest-strength common bolt. No heat treatment required. Use for non-critical, general purpose applications where strength is not a design factor — wood connections, light framing, non-structural mechanical attachments.",
    when_to_use: "Light duty brackets, wood connections, non-structural attachments, any application where load is minimal and failure is not safety-critical.",
    when_not_to_use: "Structural steel connections, pressure vessels, high-vibration machinery, any safety-critical application.",
    common_confusion: "Often confused with Grade 2 — they are similar but A307 is the ASTM structural bolt standard while Grade 2 is the SAE mechanical fastener standard. A307 Grade B is specifically for cast iron flanged joints.",
    certifications: "A307 bolts should come with a basic CoC. MTR not always required but recommended for critical applications.",
  },
  {
    id: "a325",
    code: "ASTM A325",
    nickname: "The Structural Bolt",
    category: "ASTM",
    color: "#2563EB",
    bg: "#EFF6FF",
    grade: "Type 1 (carbon steel) / Type 3 (weathering steel)",
    saeEquiv: "≈ SAE Grade 5",
    metricEquiv: "≈ ISO 8.8",
    material: "Medium carbon steel, quenched & tempered",
    tensile: "120,000 psi (827 MPa) for ≤1\"",
    yield: "92,000 psi (634 MPa)",
    proof: "85,000 psi (586 MPa)",
    marking: "A325 on head",
    sizes: "1/2\" – 1-1/2\" (heavy hex head only)",
    star: true,
    plain_english: "The standard high-strength bolt for structural steel construction. Used in steel buildings, bridges, and industrial structures per AISC specifications. HEAVY HEX HEAD ONLY — not a standard hex bolt. Must be used with A563 heavy hex nuts and F436 hardened washers. Now technically part of ASTM F3125.",
    when_to_use: "Structural steel connections per AISC. Steel buildings, bridges, industrial structures, anywhere AISC structural bolt specification is required.",
    when_not_to_use: "General mechanical applications — overspec'd and expensive. Not for threaded into tapped holes — structural bolts are not designed for that.",
    common_confusion: "People often order 'A325 bolts' for general industrial use not realizing they only come in heavy hex, specific sizes, and must be used in snug-tight, pretensioned, or slip-critical connections with specific nuts and washers.",
    certifications: "Always requires CoC and MTR. Lot traceability required. Manufacturer's identification mark required on head.",
  },
  {
    id: "a354",
    code: "ASTM A354",
    nickname: "Grade 8 for Big Bolts",
    category: "ASTM",
    color: "#DC2626",
    bg: "#FFF1F2",
    grade: "Grade BC (≈Gr.5) / Grade BD (≈Gr.8)",
    saeEquiv: "BD ≈ SAE Grade 8",
    metricEquiv: "BD ≈ ISO 10.9",
    material: "Alloy steel, quenched & tempered",
    tensile: "BD: 150,000 psi (1034 MPa) for ≤2.5\"",
    yield: "BD: 130,000 psi (896 MPa)",
    proof: "BD: 120,000 psi (827 MPa)",
    marking: "BD stamped on head (may be BD/8 for dual marking)",
    sizes: "1/4\" – 4\"",
    star: true,
    plain_english: "The ASTM equivalent of SAE Grade 8, but covers larger diameters (up to 4\") that Grade 8 doesn't cover. If you need Grade 8 strength in a bolt larger than 1-1/2\", you need A354 BD. Grade BC is the lower-strength option equivalent to Grade 5.",
    when_to_use: "High-strength applications requiring larger diameters than SAE Grade 8 covers. Heavy equipment, large machinery, structural applications needing certified documentation.",
    when_not_to_use: "Standard 1/4\"–1\" applications where SAE Grade 8 or 5 is specified — unless documentation requires ASTM designation specifically.",
    common_confusion: "BD is Grade 8 equivalent but A354 is often dual-marked BD/8. When you see BD on a large bolt head, it's Grade 8 equivalent strength. Grade BC is NOT Grade 8 — it's closer to Grade 5.",
    certifications: "MTR and CoC typically required. Manufacturer identification mark required.",
  },
  {
    id: "a490",
    code: "ASTM A490",
    nickname: "The High-Strength Structural Bolt",
    category: "ASTM",
    color: "#DC2626",
    bg: "#FFF1F2",
    grade: "Type 1 / Type 3",
    saeEquiv: "≈ SAE Grade 8 (structural)",
    metricEquiv: "≈ ISO 10.9",
    material: "Alloy steel, quenched & tempered",
    tensile: "150,000–173,000 psi (1034–1193 MPa)",
    yield: "130,000 psi min (896 MPa)",
    proof: "120,000 psi (827 MPa)",
    marking: "A490 on head",
    sizes: "1/2\" – 1-1/2\" (heavy hex head only)",
    star: true,
    plain_english: "High-strength structural bolt — the heavy-duty version of A325. Used in structural connections requiring higher strength. CRITICAL: A490 bolts CANNOT be galvanized — hot-dip galvanizing causes hydrogen embrittlement in high-strength steels. Now technically part of ASTM F3125.",
    when_to_use: "High-strength structural steel connections per AISC where A325 strength is insufficient. Heavy industrial structures, bridges, high-load connections.",
    when_not_to_use: "Never galvanize A490. Never use in corrosive environments without proper coating (not galvanizing). Not for general mechanical use.",
    common_confusion: "People try to galvanize A490 bolts — this is PROHIBITED. The hydrogen embrittlement risk from galvanizing can cause sudden brittle failure at loads well below rated capacity.",
    certifications: "Always requires CoC and MTR. Lot traceability required. Manufacturer ID mark required.",
  },
  {
    id: "a193b7",
    code: "ASTM A193 Gr.B7",
    nickname: "The Pressure & High-Temp Stud",
    category: "ASTM",
    color: "#7C3AED",
    bg: "#F5F3FF",
    grade: "Grade B7 (most common) / B7M (lower hardness)",
    saeEquiv: "≈ SAE Grade 5 strength, different alloy",
    metricEquiv: "≈ ISO 8.8 (different temp rating)",
    material: "4140 Cr-Mo alloy steel, quenched & tempered",
    tensile: "125,000 psi (862 MPa) for ≤2.5\"",
    yield: "105,000 psi (724 MPa)",
    proof: "Not specified (use yield as reference)",
    marking: "B7 stamped on end or head",
    sizes: "All sizes (primarily stud bolts)",
    star: true,
    plain_english: "The standard stud bolt material for flanges, pressure vessels, and high-temperature piping. Rated to 1000°F (538°C) continuous service. The '7' doesn't mean Grade 7 strength — it identifies the alloy (4140 Cr-Mo steel). Always pair with A194 Grade 2H heavy hex nuts. If you're working on flanges, this is your bolt.",
    when_to_use: "Flanged connections, pressure vessels, valves, any high-temperature or high-pressure bolting application. Standard for ASME B16.5 flange bolting.",
    when_not_to_use: "Room temperature, low-stress applications where less expensive Grade 5 or 8 works fine. B7 is more expensive than needed for general use.",
    common_confusion: "B7 must be used with A194 Gr.2H nuts — not standard hex nuts. Using standard nuts with B7 studs is a frequent procurement error that reduces joint integrity.",
    certifications: "MTR required for pressure vessel and ASME-coded work. CoC required. Heat/lot traceability required.",
  },
  {
    id: "f593",
    code: "ASTM F593 / F594",
    nickname: "The US Stainless Standard",
    category: "ASTM",
    color: "#0891B2",
    bg: "#F0FDFE",
    grade: "Groups 1–4 (different alloys). Most common: Group 1 (304), Group 2 (316)",
    saeEquiv: "No direct SAE equivalent",
    metricEquiv: "F593 ≈ ISO A2 (304SS) or A4 (316SS)",
    material: "Austenitic stainless steel (304, 316, 303, 305, 384)",
    tensile: "Condition CW: 100,000 psi (689 MPa) min",
    yield: "Condition CW: 65,000 psi (448 MPa) min",
    proof: "Not specified",
    marking: "F593 or manufacturer mark",
    sizes: "#0 – 1-1/2\"",
    star: false,
    plain_english: "The American standard for stainless steel bolts and screws (F593) and nuts (F594). Most stainless bolts sold in the US are either F593 or the ISO equivalent (A2/A4). The alloy group matters more than the standard number — always specify 304 or 316 stainless, not just 'stainless steel'.",
    when_to_use: "Corrosive environments, food processing, marine (use 316), chemical exposure, outdoor applications, anywhere galvanic corrosion from carbon steel is a concern.",
    when_not_to_use: "High temperature above 700°F (371°C) — austenitic stainless loses strength at elevated temps. High-strength structural applications — stainless is significantly weaker than Grade 8.",
    common_confusion: "304 and 316 stainless look identical but have very different corrosion resistance. 304 (18-8) is general purpose. 316 adds molybdenum for chloride resistance — use 316 for marine and chemical environments.",
    certifications: "CoC typically required. Chemical analysis certification for critical applications.",
  },
  {
    id: "sae5",
    code: "SAE Grade 5",
    nickname: "The All-Purpose Workhorse",
    category: "SAE",
    color: "#2563EB",
    bg: "#EFF6FF",
    grade: "Grade 5",
    astmEquiv: "ASTM A449",
    metricEquiv: "≈ ISO 8.8",
    material: "Medium carbon steel, quenched & tempered",
    tensile: "120,000 psi (827 MPa) for ≤1\"",
    yield: "92,000 psi (634 MPa)",
    proof: "85,000 psi (586 MPa)",
    marking: "3 radial lines on hex head",
    sizes: "1/4\" – 1\" (standard), up to 1-1/2\" at reduced strength",
    star: true,
    plain_english: "The most commonly used mid-strength bolt in North America. Three radial lines on the head. Used for automotive, machinery, general industrial, and moderate-stress applications. Good balance of strength, availability, and cost. If you're not sure what grade to use and you need more than Grade 2, Grade 5 is often the right answer.",
    when_to_use: "General machinery, automotive, moderate-stress industrial applications, most everyday bolting needs where Grade 2 isn't strong enough but Grade 8 is overkill.",
    when_not_to_use: "Structural steel connections (use A325), high-temperature applications (use A193 B7), highest-stress applications (use Grade 8).",
    common_confusion: "Grade 5 and A325 are often confused — both have similar strength but A325 is a structural bolt (heavy hex, specific sizes) while Grade 5 is a mechanical fastener. They are not interchangeable.",
    certifications: "CoC typically sufficient. MTR for critical applications.",
  },
  {
    id: "sae8",
    code: "SAE Grade 8",
    nickname: "The High-Strength Standard",
    category: "SAE",
    color: "#DC2626",
    bg: "#FFF1F2",
    grade: "Grade 8",
    astmEquiv: "ASTM A354 Gr.BD",
    metricEquiv: "≈ ISO 10.9",
    material: "Alloy steel (4140/4340), quenched & tempered",
    tensile: "150,000 psi (1034 MPa)",
    yield: "130,000 psi (896 MPa)",
    proof: "120,000 psi (827 MPa)",
    marking: "6 radial lines on hex head",
    sizes: "1/4\" – 1-1/2\"",
    star: true,
    plain_english: "The strongest commonly available SAE fastener. Six radial lines on the head. Used for heavy machinery, high-stress joints, and applications where maximum strength is needed. NOT always better than Grade 5 — Grade 8 is more brittle and more susceptible to hydrogen embrittlement and stress corrosion. Use Grade 8 when you need it, not just because it's 'stronger'.",
    when_to_use: "High-stress machinery, heavy equipment, critical joints requiring maximum clamp load, applications where fatigue or high dynamic loading is present.",
    when_not_to_use: "Galvanized applications (hydrogen embrittlement risk). Corrosive environments without proper coating. Applications where toughness matters more than strength — Grade 8 is less tough (more brittle) than Grade 5.",
    common_confusion: "More common mistake: using Grade 8 everywhere because it's 'stronger.' Grade 8 is harder and more brittle — in impact or fatigue applications, Grade 5 can actually outperform Grade 8 because it absorbs energy better.",
    certifications: "CoC typically sufficient. MTR for critical applications.",
  },
  {
    id: "iso88",
    code: "ISO 8.8",
    nickname: "The Metric Grade 5",
    category: "ISO",
    color: "#059669",
    bg: "#F0FDF4",
    grade: "Property Class 8.8",
    imperialEquiv: "≈ SAE Grade 5 / ASTM A325",
    astmEquiv: "≈ ASTM A325 (approximate)",
    material: "Medium carbon steel, quenched & tempered",
    tensile: "800 MPa (116,000 psi)",
    yield: "640 MPa (92,800 psi) — 80% of tensile",
    proof: "600 MPa (87,000 psi)",
    marking: "8.8 stamped on head",
    sizes: "M5 – M100",
    star: true,
    plain_english: "The most common metric fastener grade for industrial use. How to read it: first number (8) × 100 = tensile strength in MPa (800 MPa). Second number (8) × 10% = yield/tensile ratio (80%). Equivalent to SAE Grade 5 in strength. Used throughout European, Asian, and globally-manufactured equipment.",
    when_to_use: "Any metric machinery or equipment specification calling for 8.8. Standard for most industrial metric bolting needs.",
    when_not_to_use: "Applications requiring 10.9 strength. Do not substitute 8.8 for 10.9 — 20% strength reduction.",
    common_confusion: "People assume 8.8 metric means 88,000 psi tensile. It means 800 MPa = 116,000 psi. The number system is MPa based, not PSI based.",
    certifications: "CoC typically sufficient. MTR for critical applications.",
  },
  {
    id: "iso109",
    code: "ISO 10.9",
    nickname: "The Metric Grade 8",
    category: "ISO",
    color: "#D97706",
    bg: "#FFF8E7",
    grade: "Property Class 10.9",
    imperialEquiv: "≈ SAE Grade 8 / ASTM A490",
    astmEquiv: "≈ ASTM A490 (approximate)",
    material: "Alloy steel, quenched & tempered",
    tensile: "1040 MPa (150,800 psi)",
    yield: "940 MPa (136,300 psi) — 90% of tensile",
    proof: "830 MPa (120,000 psi)",
    marking: "10.9 stamped on head",
    sizes: "M5 – M100",
    star: true,
    plain_english: "High-strength metric fastener. Equivalent to SAE Grade 8. Used in automotive, heavy machinery, and high-stress metric applications. The 90% yield ratio (vs 80% for 8.8) means less margin before yielding — tighter torque control required. Common in European automotive and machinery where the original manufacturer specified 10.9.",
    when_to_use: "High-stress metric applications, OEM-specified 10.9 replacement, automotive and heavy machinery where metric high-strength is required.",
    when_not_to_use: "General industrial metric use where 8.8 is sufficient. Never substitute with 8.8 when 10.9 is specified.",
    common_confusion: "10.9 is NOT 10 × 100 MPa. It IS (10 × 100) = 1000 MPa nominal, but the actual minimum tensile is 1040 MPa. The '9' = 90% yield ratio × 1040 MPa = 940 MPa yield.",
    certifications: "CoC typically sufficient. MTR for critical applications. Automotive applications often require additional traceability.",
  },
];

export default function TopStandards() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");

  const filters = ["All", "ASTM", "SAE", "ISO"];

  const filtered = STANDARDS.filter(s =>
    (activeFilter === "All" || s.category === activeFilter) &&
    (s.code.toLowerCase().includes(search.toLowerCase()) ||
      s.nickname.toLowerCase().includes(search.toLowerCase()) ||
      s.plain_english.toLowerCase().includes(search.toLowerCase()))
  );

  const selectedStandard = selected !== null ? STANDARDS.find(s => s.id === selected) : null;

  return (
    <div style={{ fontFamily: "'DM Sans','Segoe UI',sans-serif", background: BG, minHeight: "100vh", maxWidth: 430, margin: "0 auto" }}>

      {/* HEADER */}
      <div style={{ background: `linear-gradient(135deg, ${NAVY} 0%, #2C5282 100%)`, padding: "16px 20px 20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
          <span style={{ fontSize: 20 }}>⬡</span>
          <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 10, letterSpacing: 2, textTransform: "uppercase" }}>Fastener Companion</span>
        </div>
        <div style={{ color: WHITE, fontSize: 20, fontWeight: 800, marginBottom: 2 }}>Fastener Standards</div>
        <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 11 }}>ASTM · SAE J429 · ISO 898-1 · Plain language explanations</div>
        <div style={{ background: WHITE, borderRadius: 12, display: "flex", alignItems: "center", padding: "10px 14px", gap: 8, marginTop: 14, boxShadow: "0 2px 8px rgba(0,0,0,0.15)" }}>
          <span style={{ color: MUTED }}>??</span>
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search standards..."
            style={{ background: "none", border: "none", outline: "none", color: TEXT, fontSize: 14, flex: 1, fontFamily: "inherit" }} />
          {search && <span onClick={() => setSearch("")} style={{ color: MUTED, cursor: "pointer" }}>✕</span>}
        </div>
      </div>

      {/* FILTER TABS */}
      <div style={{ background: WHITE, borderBottom: `1px solid ${BORDER}`, padding: "0 12px", display: "flex" }}>
        {filters.map(f => (
          <button key={f} onClick={() => setActiveFilter(f)}
            style={{
              background: "none", border: "none", cursor: "pointer", padding: "12px 16px",
              fontSize: 12, fontWeight: 700, fontFamily: "inherit",
              color: activeFilter === f ? NAVY : MUTED,
              borderBottom: activeFilter === f ? `3px solid ${AMBER}` : "3px solid transparent",
            }}>{f}</button>
        ))}
      </div>

      {/* STANDARDS LIST */}
      {!selectedStandard && (
        <div style={{ padding: "12px 16px", display: "flex", flexDirection: "column", gap: 10 }}>
          {filtered.map((s, i) => (
            <div key={s.id} onClick={() => setSelected(s.id)}
              style={{
                background: s.star ? STAR_BG : WHITE,
                border: `1px solid ${BORDER}`,
                borderLeft: `4px solid ${s.color}`,
                borderRadius: 12, padding: "14px", cursor: "pointer",
                boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
              }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }}>
                    {s.star && <span style={{ color: AMBER, fontSize: 11 }}>★</span>}
                    <span style={{ fontSize: 15, fontWeight: 800, color: s.color }}>{s.code}</span>
                  </div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: NAVY }}>{s.nickname}</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 9, color: MUTED, marginBottom: 2 }}>Tensile</div>
                  <div style={{ fontSize: 12, fontWeight: 800, color: s.color }}>{s.tensile.split(" ")[0]}</div>
                  <div style={{ fontSize: 9, color: MUTED }}>{s.tensile.includes("MPa") ? s.tensile.split("(")[1]?.replace(")", "") : s.tensile.split("(")[1]?.replace(")", "")}</div>
                </div>
              </div>
              <div style={{ fontSize: 11, color: MUTED, marginBottom: 6 }}>{s.material} · {s.marking}</div>
              <div style={{ fontSize: 12, color: TEXT, lineHeight: 1.5, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{s.plain_english}</div>
              <div style={{ marginTop: 8, fontSize: 11, color: s.color, fontWeight: 600 }}>Tap to read full explanation →</div>
            </div>
          ))}
        </div>
      )}

      {/* DETAIL VIEW */}
      {selectedStandard && (
        <div style={{ padding: "14px 16px" }}>
          <button onClick={() => setSelected(null)}
            style={{ background: "none", border: "none", cursor: "pointer", color: NAVY, fontSize: 13, fontWeight: 700, fontFamily: "inherit", marginBottom: 14, display: "flex", alignItems: "center", gap: 6, padding: 0 }}>
            ← Back to list
          </button>

          {/* Header card */}
          <div style={{ background: selectedStandard.bg, border: `1px solid ${BORDER}`, borderLeft: `4px solid ${selectedStandard.color}`, borderRadius: 12, padding: "14px", marginBottom: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <div style={{ fontSize: 18, fontWeight: 800, color: selectedStandard.color, marginBottom: 2 }}>{selectedStandard.code}</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: NAVY }}>{selectedStandard.nickname}</div>
                <div style={{ fontSize: 11, color: MUTED, marginTop: 2 }}>{selectedStandard.material}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 9, color: MUTED }}>Tensile</div>
                <div style={{ fontSize: 14, fontWeight: 800, color: selectedStandard.color }}>{selectedStandard.tensile.split(" ")[0]}</div>
              </div>
            </div>
          </div>

          {/* Plain English */}
          <div style={{ background: WHITE, border: `1px solid ${BORDER}`, borderRadius: 12, padding: "14px", marginBottom: 10, boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: NAVY, textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>Plain English Explanation</div>
            <div style={{ fontSize: 13, color: TEXT, lineHeight: 1.7 }}>{selectedStandard.plain_english}</div>
          </div>

          {/* Specs grid */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 10 }}>
            {[
              { label: "Tensile Strength", value: selectedStandard.tensile },
              { label: "Yield Strength", value: selectedStandard.yield },
              { label: "Proof Load", value: selectedStandard.proof },
              { label: "Head Marking", value: selectedStandard.marking },
              { label: "Size Range", value: selectedStandard.sizes },
              { label: "Grade / Class", value: selectedStandard.grade },
              { label: "SAE Equiv.", value: selectedStandard.saeEquiv || selectedStandard.imperialEquiv || "—" },
              { label: "Metric Equiv.", value: selectedStandard.metricEquiv || selectedStandard.astmEquiv || "—" },
            ].map((item, i) => (
              <div key={i} style={{ background: ROW_ALT, borderRadius: 8, padding: "8px 10px", border: `1px solid ${BORDER}` }}>
                <div style={{ fontSize: 9, color: MUTED, textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 2 }}>{item.label}</div>
                <div style={{ fontSize: 11, fontWeight: 700, color: TEXT, lineHeight: 1.3 }}>{item.value}</div>
              </div>
            ))}
          </div>

          {/* When to use / not use */}
          <div style={{ background: "#F0FDF4", border: `1px solid ${BORDER}`, borderLeft: "4px solid #059669", borderRadius: 12, padding: "12px 14px", marginBottom: 10 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#059669", marginBottom: 6 }}>✓ When to Use</div>
            <div style={{ fontSize: 12, color: TEXT, lineHeight: 1.5 }}>{selectedStandard.when_to_use}</div>
          </div>

          <div style={{ background: "#FFF1F2", border: `1px solid ${BORDER}`, borderLeft: "4px solid #DC2626", borderRadius: 12, padding: "12px 14px", marginBottom: 10 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#DC2626", marginBottom: 6 }}>✗ When NOT to Use</div>
            <div style={{ fontSize: 12, color: TEXT, lineHeight: 1.5 }}>{selectedStandard.when_not_to_use}</div>
          </div>

          <div style={{ background: STAR_BG, border: `1px solid ${STAR_BORDER}`, borderRadius: 12, padding: "12px 14px", marginBottom: 10 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#92400E", marginBottom: 6 }}>⚠ Common Confusion</div>
            <div style={{ fontSize: 12, color: "#92400E", lineHeight: 1.5 }}>{selectedStandard.common_confusion}</div>
          </div>

          <div style={{ background: "#EEF4FF", border: `1px solid ${BORDER}`, borderLeft: "4px solid #2563EB", borderRadius: 12, padding: "12px 14px", marginBottom: 14 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: NAVY, marginBottom: 6 }}>?? Certification Requirements</div>
            <div style={{ fontSize: 12, color: TEXT, lineHeight: 1.5 }}>{selectedStandard.certifications}</div>
          </div>
        </div>
      )}

      {/* DISCLAIMER */}
      <div style={{ margin: "0 16px 24px", background: "#FFF1F2", border: "1px solid #FECDD3", borderRadius: 10, padding: "10px 14px" }}>
        <div style={{ fontSize: 10, color: "#9F1239", lineHeight: 1.5 }}>
          <strong>⚠ Verify Before Use.</strong> Standards data sourced from ASTM International, SAE International, ISO, Portland Bolt, and IFI 7th Edition. Always obtain current standard documents for critical applications. Fastener Companion is a reference tool — not a substitute for engineering judgment.
        </div>
      </div>
    </div>
  );
}


// ════════════════════════════════════════════════════
// TopStandards
// ════════════════════════════════════════════════════

// ─── DATA ─────────────────────────────────────────────────────────────────────
// Sources: ASTM International, SAE International, ISO standards bodies,
// Portland Bolt technical library, Fastenal Engineering & Design Support,
// Engineers Edge, American Institute of Steel Construction (AISC),
// IFI Fastener Standards 7th Edition

const STANDARDS = [
  {
    id: "a307",
    code: "ASTM A307",
    nickname: "The Basic Bolt",
    category: "ASTM",
    color: "#64748B",
    bg: "#F8FAFC",
    grade: "Grade A / Grade B",
    saeEquiv: "≈ SAE Grade 2",
    metricEquiv: "≈ ISO 4.6",
    material: "Low carbon steel",
    tensile: "60,000 psi min (414 MPa)",
    yield: "Not specified",
    proof: "Not specified",
    marking: "A307 on head",
    sizes: "1/4\" – 4\"",
    star: false,
    plain_english: "The most basic, lowest-strength common bolt. No heat treatment required. Use for non-critical, general purpose applications where strength is not a design factor — wood connections, light framing, non-structural mechanical attachments.",
    when_to_use: "Light duty brackets, wood connections, non-structural attachments, any application where load is minimal and failure is not safety-critical.",
    when_not_to_use: "Structural steel connections, pressure vessels, high-vibration machinery, any safety-critical application.",
    common_confusion: "Often confused with Grade 2 — they are similar but A307 is the ASTM structural bolt standard while Grade 2 is the SAE mechanical fastener standard. A307 Grade B is specifically for cast iron flanged joints.",
    certifications: "A307 bolts should come with a basic CoC. MTR not always required but recommended for critical applications.",
  },
  {
    id: "a325",
    code: "ASTM A325",
    nickname: "The Structural Bolt",
    category: "ASTM",
    color: "#2563EB",
    bg: "#EFF6FF",
    grade: "Type 1 (carbon steel) / Type 3 (weathering steel)",
    saeEquiv: "≈ SAE Grade 5",
    metricEquiv: "≈ ISO 8.8",
    material: "Medium carbon steel, quenched & tempered",
    tensile: "120,000 psi (827 MPa) for ≤1\"",
    yield: "92,000 psi (634 MPa)",
    proof: "85,000 psi (586 MPa)",
    marking: "A325 on head",
    sizes: "1/2\" – 1-1/2\" (heavy hex head only)",
    star: true,
    plain_english: "The standard high-strength bolt for structural steel construction. Used in steel buildings, bridges, and industrial structures per AISC specifications. HEAVY HEX HEAD ONLY — not a standard hex bolt. Must be used with A563 heavy hex nuts and F436 hardened washers. Now technically part of ASTM F3125.",
    when_to_use: "Structural steel connections per AISC. Steel buildings, bridges, industrial structures, anywhere AISC structural bolt specification is required.",
    when_not_to_use: "General mechanical applications — overspec'd and expensive. Not for threaded into tapped holes — structural bolts are not designed for that.",
    common_confusion: "People often order 'A325 bolts' for general industrial use not realizing they only come in heavy hex, specific sizes, and must be used in snug-tight, pretensioned, or slip-critical connections with specific nuts and washers.",
    certifications: "Always requires CoC and MTR. Lot traceability required. Manufacturer's identification mark required on head.",
  },
  {
    id: "a354",
    code: "ASTM A354",
    nickname: "Grade 8 for Big Bolts",
    category: "ASTM",
    color: "#DC2626",
    bg: "#FFF1F2",
    grade: "Grade BC (≈Gr.5) / Grade BD (≈Gr.8)",
    saeEquiv: "BD ≈ SAE Grade 8",
    metricEquiv: "BD ≈ ISO 10.9",
    material: "Alloy steel, quenched & tempered",
    tensile: "BD: 150,000 psi (1034 MPa) for ≤2.5\"",
    yield: "BD: 130,000 psi (896 MPa)",
    proof: "BD: 120,000 psi (827 MPa)",
    marking: "BD stamped on head (may be BD/8 for dual marking)",
    sizes: "1/4\" – 4\"",
    star: true,
    plain_english: "The ASTM equivalent of SAE Grade 8, but covers larger diameters (up to 4\") that Grade 8 doesn't cover. If you need Grade 8 strength in a bolt larger than 1-1/2\", you need A354 BD. Grade BC is the lower-strength option equivalent to Grade 5.",
    when_to_use: "High-strength applications requiring larger diameters than SAE Grade 8 covers. Heavy equipment, large machinery, structural applications needing certified documentation.",
    when_not_to_use: "Standard 1/4\"–1\" applications where SAE Grade 8 or 5 is specified — unless documentation requires ASTM designation specifically.",
    common_confusion: "BD is Grade 8 equivalent but A354 is often dual-marked BD/8. When you see BD on a large bolt head, it's Grade 8 equivalent strength. Grade BC is NOT Grade 8 — it's closer to Grade 5.",
    certifications: "MTR and CoC typically required. Manufacturer identification mark required.",
  },
  {
    id: "a490",
    code: "ASTM A490",
    nickname: "The High-Strength Structural Bolt",
    category: "ASTM",
    color: "#DC2626",
    bg: "#FFF1F2",
    grade: "Type 1 / Type 3",
    saeEquiv: "≈ SAE Grade 8 (structural)",
    metricEquiv: "≈ ISO 10.9",
    material: "Alloy steel, quenched & tempered",
    tensile: "150,000–173,000 psi (1034–1193 MPa)",
    yield: "130,000 psi min (896 MPa)",
    proof: "120,000 psi (827 MPa)",
    marking: "A490 on head",
    sizes: "1/2\" – 1-1/2\" (heavy hex head only)",
    star: true,
    plain_english: "High-strength structural bolt — the heavy-duty version of A325. Used in structural connections requiring higher strength. CRITICAL: A490 bolts CANNOT be galvanized — hot-dip galvanizing causes hydrogen embrittlement in high-strength steels. Now technically part of ASTM F3125.",
    when_to_use: "High-strength structural steel connections per AISC where A325 strength is insufficient. Heavy industrial structures, bridges, high-load connections.",
    when_not_to_use: "Never galvanize A490. Never use in corrosive environments without proper coating (not galvanizing). Not for general mechanical use.",
    common_confusion: "People try to galvanize A490 bolts — this is PROHIBITED. The hydrogen embrittlement risk from galvanizing can cause sudden brittle failure at loads well below rated capacity.",
    certifications: "Always requires CoC and MTR. Lot traceability required. Manufacturer ID mark required.",
  },
  {
    id: "a193b7",
    code: "ASTM A193 Gr.B7",
    nickname: "The Pressure & High-Temp Stud",
    category: "ASTM",
    color: "#7C3AED",
    bg: "#F5F3FF",
    grade: "Grade B7 (most common) / B7M (lower hardness)",
    saeEquiv: "≈ SAE Grade 5 strength, different alloy",
    metricEquiv: "≈ ISO 8.8 (different temp rating)",
    material: "4140 Cr-Mo alloy steel, quenched & tempered",
    tensile: "125,000 psi (862 MPa) for ≤2.5\"",
    yield: "105,000 psi (724 MPa)",
    proof: "Not specified (use yield as reference)",
    marking: "B7 stamped on end or head",
    sizes: "All sizes (primarily stud bolts)",
    star: true,
    plain_english: "The standard stud bolt material for flanges, pressure vessels, and high-temperature piping. Rated to 1000°F (538°C) continuous service. The '7' doesn't mean Grade 7 strength — it identifies the alloy (4140 Cr-Mo steel). Always pair with A194 Grade 2H heavy hex nuts. If you're working on flanges, this is your bolt.",
    when_to_use: "Flanged connections, pressure vessels, valves, any high-temperature or high-pressure bolting application. Standard for ASME B16.5 flange bolting.",
    when_not_to_use: "Room temperature, low-stress applications where less expensive Grade 5 or 8 works fine. B7 is more expensive than needed for general use.",
    common_confusion: "B7 must be used with A194 Gr.2H nuts — not standard hex nuts. Using standard nuts with B7 studs is a frequent procurement error that reduces joint integrity.",
    certifications: "MTR required for pressure vessel and ASME-coded work. CoC required. Heat/lot traceability required.",
  },
  {
    id: "f593",
    code: "ASTM F593 / F594",
    nickname: "The US Stainless Standard",
    category: "ASTM",
    color: "#0891B2",
    bg: "#F0FDFE",
    grade: "Groups 1–4 (different alloys). Most common: Group 1 (304), Group 2 (316)",
    saeEquiv: "No direct SAE equivalent",
    metricEquiv: "F593 ≈ ISO A2 (304SS) or A4 (316SS)",
    material: "Austenitic stainless steel (304, 316, 303, 305, 384)",
    tensile: "Condition CW: 100,000 psi (689 MPa) min",
    yield: "Condition CW: 65,000 psi (448 MPa) min",
    proof: "Not specified",
    marking: "F593 or manufacturer mark",
    sizes: "#0 – 1-1/2\"",
    star: false,
    plain_english: "The American standard for stainless steel bolts and screws (F593) and nuts (F594). Most stainless bolts sold in the US are either F593 or the ISO equivalent (A2/A4). The alloy group matters more than the standard number — always specify 304 or 316 stainless, not just 'stainless steel'.",
    when_to_use: "Corrosive environments, food processing, marine (use 316), chemical exposure, outdoor applications, anywhere galvanic corrosion from carbon steel is a concern.",
    when_not_to_use: "High temperature above 700°F (371°C) — austenitic stainless loses strength at elevated temps. High-strength structural applications — stainless is significantly weaker than Grade 8.",
    common_confusion: "304 and 316 stainless look identical but have very different corrosion resistance. 304 (18-8) is general purpose. 316 adds molybdenum for chloride resistance — use 316 for marine and chemical environments.",
    certifications: "CoC typically required. Chemical analysis certification for critical applications.",
  },
  {
    id: "sae5",
    code: "SAE Grade 5",
    nickname: "The All-Purpose Workhorse",
    category: "SAE",
    color: "#2563EB",
    bg: "#EFF6FF",
    grade: "Grade 5",
    astmEquiv: "ASTM A449",
    metricEquiv: "≈ ISO 8.8",
    material: "Medium carbon steel, quenched & tempered",
    tensile: "120,000 psi (827 MPa) for ≤1\"",
    yield: "92,000 psi (634 MPa)",
    proof: "85,000 psi (586 MPa)",
    marking: "3 radial lines on hex head",
    sizes: "1/4\" – 1\" (standard), up to 1-1/2\" at reduced strength",
    star: true,
    plain_english: "The most commonly used mid-strength bolt in North America. Three radial lines on the head. Used for automotive, machinery, general industrial, and moderate-stress applications. Good balance of strength, availability, and cost. If you're not sure what grade to use and you need more than Grade 2, Grade 5 is often the right answer.",
    when_to_use: "General machinery, automotive, moderate-stress industrial applications, most everyday bolting needs where Grade 2 isn't strong enough but Grade 8 is overkill.",
    when_not_to_use: "Structural steel connections (use A325), high-temperature applications (use A193 B7), highest-stress applications (use Grade 8).",
    common_confusion: "Grade 5 and A325 are often confused — both have similar strength but A325 is a structural bolt (heavy hex, specific sizes) while Grade 5 is a mechanical fastener. They are not interchangeable.",
    certifications: "CoC typically sufficient. MTR for critical applications.",
  },
  {
    id: "sae8",
    code: "SAE Grade 8",
    nickname: "The High-Strength Standard",
    category: "SAE",
    color: "#DC2626",
    bg: "#FFF1F2",
    grade: "Grade 8",
    astmEquiv: "ASTM A354 Gr.BD",
    metricEquiv: "≈ ISO 10.9",
    material: "Alloy steel (4140/4340), quenched & tempered",
    tensile: "150,000 psi (1034 MPa)",
    yield: "130,000 psi (896 MPa)",
    proof: "120,000 psi (827 MPa)",
    marking: "6 radial lines on hex head",
    sizes: "1/4\" – 1-1/2\"",
    star: true,
    plain_english: "The strongest commonly available SAE fastener. Six radial lines on the head. Used for heavy machinery, high-stress joints, and applications where maximum strength is needed. NOT always better than Grade 5 — Grade 8 is more brittle and more susceptible to hydrogen embrittlement and stress corrosion. Use Grade 8 when you need it, not just because it's 'stronger'.",
    when_to_use: "High-stress machinery, heavy equipment, critical joints requiring maximum clamp load, applications where fatigue or high dynamic loading is present.",
    when_not_to_use: "Galvanized applications (hydrogen embrittlement risk). Corrosive environments without proper coating. Applications where toughness matters more than strength — Grade 8 is less tough (more brittle) than Grade 5.",
    common_confusion: "More common mistake: using Grade 8 everywhere because it's 'stronger.' Grade 8 is harder and more brittle — in impact or fatigue applications, Grade 5 can actually outperform Grade 8 because it absorbs energy better.",
    certifications: "CoC typically sufficient. MTR for critical applications.",
  },
  {
    id: "iso88",
    code: "ISO 8.8",
    nickname: "The Metric Grade 5",
    category: "ISO",
    color: "#059669",
    bg: "#F0FDF4",
    grade: "Property Class 8.8",
    imperialEquiv: "≈ SAE Grade 5 / ASTM A325",
    astmEquiv: "≈ ASTM A325 (approximate)",
    material: "Medium carbon steel, quenched & tempered",
    tensile: "800 MPa (116,000 psi)",
    yield: "640 MPa (92,800 psi) — 80% of tensile",
    proof: "600 MPa (87,000 psi)",
    marking: "8.8 stamped on head",
    sizes: "M5 – M100",
    star: true,
    plain_english: "The most common metric fastener grade for industrial use. How to read it: first number (8) × 100 = tensile strength in MPa (800 MPa). Second number (8) × 10% = yield/tensile ratio (80%). Equivalent to SAE Grade 5 in strength. Used throughout European, Asian, and globally-manufactured equipment.",
    when_to_use: "Any metric machinery or equipment specification calling for 8.8. Standard for most industrial metric bolting needs.",
    when_not_to_use: "Applications requiring 10.9 strength. Do not substitute 8.8 for 10.9 — 20% strength reduction.",
    common_confusion: "People assume 8.8 metric means 88,000 psi tensile. It means 800 MPa = 116,000 psi. The number system is MPa based, not PSI based.",
    certifications: "CoC typically sufficient. MTR for critical applications.",
  },
  {
    id: "iso109",
    code: "ISO 10.9",
    nickname: "The Metric Grade 8",
    category: "ISO",
    color: "#D97706",
    bg: "#FFF8E7",
    grade: "Property Class 10.9",
    imperialEquiv: "≈ SAE Grade 8 / ASTM A490",
    astmEquiv: "≈ ASTM A490 (approximate)",
    material: "Alloy steel, quenched & tempered",
    tensile: "1040 MPa (150,800 psi)",
    yield: "940 MPa (136,300 psi) — 90% of tensile",
    proof: "830 MPa (120,000 psi)",
    marking: "10.9 stamped on head",
    sizes: "M5 – M100",
    star: true,
    plain_english: "High-strength metric fastener. Equivalent to SAE Grade 8. Used in automotive, heavy machinery, and high-stress metric applications. The 90% yield ratio (vs 80% for 8.8) means less margin before yielding — tighter torque control required. Common in European automotive and machinery where the original manufacturer specified 10.9.",
    when_to_use: "High-stress metric applications, OEM-specified 10.9 replacement, automotive and heavy machinery where metric high-strength is required.",
    when_not_to_use: "General industrial metric use where 8.8 is sufficient. Never substitute with 8.8 when 10.9 is specified.",
    common_confusion: "10.9 is NOT 10 × 100 MPa. It IS (10 × 100) = 1000 MPa nominal, but the actual minimum tensile is 1040 MPa. The '9' = 90% yield ratio × 1040 MPa = 940 MPa yield.",
    certifications: "CoC typically sufficient. MTR for critical applications. Automotive applications often require additional traceability.",
  },
];

export default function TopStandards() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");

  const filters = ["All", "ASTM", "SAE", "ISO"];

  const filtered = STANDARDS.filter(s =>
    (activeFilter === "All" || s.category === activeFilter) &&
    (s.code.toLowerCase().includes(search.toLowerCase()) ||
      s.nickname.toLowerCase().includes(search.toLowerCase()) ||
      s.plain_english.toLowerCase().includes(search.toLowerCase()))
  );

  const selectedStandard = selected !== null ? STANDARDS.find(s => s.id === selected) : null;

  return (
    <div style={{ fontFamily: "'DM Sans','Segoe UI',sans-serif", background: BG, minHeight: "100vh", maxWidth: 430, margin: "0 auto" }}>

      {/* HEADER */}
      <div style={{ background: `linear-gradient(135deg, ${NAVY} 0%, #2C5282 100%)`, padding: "16px 20px 20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
          <span style={{ fontSize: 20 }}>⬡</span>
          <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 10, letterSpacing: 2, textTransform: "uppercase" }}>Fastener Companion</span>
        </div>
        <div style={{ color: WHITE, fontSize: 20, fontWeight: 800, marginBottom: 2 }}>Fastener Standards</div>
        <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 11 }}>ASTM · SAE J429 · ISO 898-1 · Plain language explanations</div>
        <div style={{ background: WHITE, borderRadius: 12, display: "flex", alignItems: "center", padding: "10px 14px", gap: 8, marginTop: 14, boxShadow: "0 2px 8px rgba(0,0,0,0.15)" }}>
          <span style={{ color: MUTED }}>??</span>
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search standards..."
            style={{ background: "none", border: "none", outline: "none", color: TEXT, fontSize: 14, flex: 1, fontFamily: "inherit" }} />
          {search && <span onClick={() => setSearch("")} style={{ color: MUTED, cursor: "pointer" }}>✕</span>}
        </div>
      </div>

      {/* FILTER TABS */}
      <div style={{ background: WHITE, borderBottom: `1px solid ${BORDER}`, padding: "0 12px", display: "flex" }}>
        {filters.map(f => (
          <button key={f} onClick={() => setActiveFilter(f)}
            style={{
              background: "none", border: "none", cursor: "pointer", padding: "12px 16px",
              fontSize: 12, fontWeight: 700, fontFamily: "inherit",
              color: activeFilter === f ? NAVY : MUTED,
              borderBottom: activeFilter === f ? `3px solid ${AMBER}` : "3px solid transparent",
            }}>{f}</button>
        ))}
      </div>

      {/* STANDARDS LIST */}
      {!selectedStandard && (
        <div style={{ padding: "12px 16px", display: "flex", flexDirection: "column", gap: 10 }}>
          {filtered.map((s, i) => (
            <div key={s.id} onClick={() => setSelected(s.id)}
              style={{
                background: s.star ? STAR_BG : WHITE,
                border: `1px solid ${BORDER}`,
                borderLeft: `4px solid ${s.color}`,
                borderRadius: 12, padding: "14px", cursor: "pointer",
                boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
              }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }}>
                    {s.star && <span style={{ color: AMBER, fontSize: 11 }}>★</span>}
                    <span style={{ fontSize: 15, fontWeight: 800, color: s.color }}>{s.code}</span>
                  </div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: NAVY }}>{s.nickname}</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 9, color: MUTED, marginBottom: 2 }}>Tensile</div>
                  <div style={{ fontSize: 12, fontWeight: 800, color: s.color }}>{s.tensile.split(" ")[0]}</div>
                  <div style={{ fontSize: 9, color: MUTED }}>{s.tensile.includes("MPa") ? s.tensile.split("(")[1]?.replace(")", "") : s.tensile.split("(")[1]?.replace(")", "")}</div>
                </div>
              </div>
              <div style={{ fontSize: 11, color: MUTED, marginBottom: 6 }}>{s.material} · {s.marking}</div>
              <div style={{ fontSize: 12, color: TEXT, lineHeight: 1.5, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{s.plain_english}</div>
              <div style={{ marginTop: 8, fontSize: 11, color: s.color, fontWeight: 600 }}>Tap to read full explanation →</div>
            </div>
          ))}
        </div>
      )}

      {/* DETAIL VIEW */}
      {selectedStandard && (
        <div style={{ padding: "14px 16px" }}>
          <button onClick={() => setSelected(null)}
            style={{ background: "none", border: "none", cursor: "pointer", color: NAVY, fontSize: 13, fontWeight: 700, fontFamily: "inherit", marginBottom: 14, display: "flex", alignItems: "center", gap: 6, padding: 0 }}>
            ← Back to list
          </button>

          {/* Header card */}
          <div style={{ background: selectedStandard.bg, border: `1px solid ${BORDER}`, borderLeft: `4px solid ${selectedStandard.color}`, borderRadius: 12, padding: "14px", marginBottom: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <div style={{ fontSize: 18, fontWeight: 800, color: selectedStandard.color, marginBottom: 2 }}>{selectedStandard.code}</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: NAVY }}>{selectedStandard.nickname}</div>
                <div style={{ fontSize: 11, color: MUTED, marginTop: 2 }}>{selectedStandard.material}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 9, color: MUTED }}>Tensile</div>
                <div style={{ fontSize: 14, fontWeight: 800, color: selectedStandard.color }}>{selectedStandard.tensile.split(" ")[0]}</div>
              </div>
            </div>
          </div>

          {/* Plain English */}
          <div style={{ background: WHITE, border: `1px solid ${BORDER}`, borderRadius: 12, padding: "14px", marginBottom: 10, boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: NAVY, textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>Plain English Explanation</div>
            <div style={{ fontSize: 13, color: TEXT, lineHeight: 1.7 }}>{selectedStandard.plain_english}</div>
          </div>

          {/* Specs grid */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 10 }}>
            {[
              { label: "Tensile Strength", value: selectedStandard.tensile },
              { label: "Yield Strength", value: selectedStandard.yield },
              { label: "Proof Load", value: selectedStandard.proof },
              { label: "Head Marking", value: selectedStandard.marking },
              { label: "Size Range", value: selectedStandard.sizes },
              { label: "Grade / Class", value: selectedStandard.grade },
              { label: "SAE Equiv.", value: selectedStandard.saeEquiv || selectedStandard.imperialEquiv || "—" },
              { label: "Metric Equiv.", value: selectedStandard.metricEquiv || selectedStandard.astmEquiv || "—" },
            ].map((item, i) => (
              <div key={i} style={{ background: ROW_ALT, borderRadius: 8, padding: "8px 10px", border: `1px solid ${BORDER}` }}>
                <div style={{ fontSize: 9, color: MUTED, textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 2 }}>{item.label}</div>
                <div style={{ fontSize: 11, fontWeight: 700, color: TEXT, lineHeight: 1.3 }}>{item.value}</div>
              </div>
            ))}
          </div>

          {/* When to use / not use */}
          <div style={{ background: "#F0FDF4", border: `1px solid ${BORDER}`, borderLeft: "4px solid #059669", borderRadius: 12, padding: "12px 14px", marginBottom: 10 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#059669", marginBottom: 6 }}>✓ When to Use</div>
            <div style={{ fontSize: 12, color: TEXT, lineHeight: 1.5 }}>{selectedStandard.when_to_use}</div>
          </div>

          <div style={{ background: "#FFF1F2", border: `1px solid ${BORDER}`, borderLeft: "4px solid #DC2626", borderRadius: 12, padding: "12px 14px", marginBottom: 10 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#DC2626", marginBottom: 6 }}>✗ When NOT to Use</div>
            <div style={{ fontSize: 12, color: TEXT, lineHeight: 1.5 }}>{selectedStandard.when_not_to_use}</div>
          </div>

          <div style={{ background: STAR_BG, border: `1px solid ${STAR_BORDER}`, borderRadius: 12, padding: "12px 14px", marginBottom: 10 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#92400E", marginBottom: 6 }}>⚠ Common Confusion</div>
            <div style={{ fontSize: 12, color: "#92400E", lineHeight: 1.5 }}>{selectedStandard.common_confusion}</div>
          </div>

          <div style={{ background: "#EEF4FF", border: `1px solid ${BORDER}`, borderLeft: "4px solid #2563EB", borderRadius: 12, padding: "12px 14px", marginBottom: 14 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: NAVY, marginBottom: 6 }}>?? Certification Requirements</div>
            <div style={{ fontSize: 12, color: TEXT, lineHeight: 1.5 }}>{selectedStandard.certifications}</div>
          </div>
        </div>
      )}

      {/* DISCLAIMER */}
      <div style={{ margin: "0 16px 24px", background: "#FFF1F2", border: "1px solid #FECDD3", borderRadius: 10, padding: "10px 14px" }}>
        <div style={{ fontSize: 10, color: "#9F1239", lineHeight: 1.5 }}>
          <strong>⚠ Verify Before Use.</strong> Standards data sourced from ASTM International, SAE International, ISO, Portland Bolt, and IFI 7th Edition. Always obtain current standard documents for critical applications. Fastener Companion is a reference tool — not a substitute for engineering judgment.
        </div>
      </div>
    </div>
  );
}
