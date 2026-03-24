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
// Sources: Henkel/Loctite product technical data sheets,
// 3M threadlocker technical bulletins, Permabond engineering adhesives,
// Engineers Edge chemical applications guide, IFI technical resources

const THREADLOCKER_GRADES = [
  {
    id: "purple",
    color_name: "Purple",
    color: "#7C3AED",
    hex: "#7C3AED",
    loctite_nums: "222, 2221",
    strength: "Low Strength",
    breakaway_torque: "~2.8 Nm (25 in-lb)",
    removal: "By hand or standard tools",
    temp_range: "-65°F to 300°F (-54°C to 149°C)",
    cure_time_handling: "10 minutes",
    cure_time_full: "24 hours",
    gap_fill: "Up to 0.15mm (0.006\")",
    best_for: [
      "Small fasteners M2–M12 (under 1/4\")",
      "Delicate instruments and electronics",
      "Set screws that need periodic adjustment",
      "Applications requiring frequent disassembly",
      "Plastic or soft material fasteners",
    ],
    not_for: [
      "Fasteners larger than M12",
      "High-vibration applications requiring permanent hold",
      "High-temperature applications above 300°F",
    ],
    notes: "The gentlest threadlocker. Prevents vibration loosening while still allowing easy removal. Good for instrument panels, electronics, and any application where disassembly is frequent.",
    star: false,
  },
  {
    id: "blue",
    color_name: "Blue",
    color: "#2563EB",
    hex: "#2563EB",
    loctite_nums: "243, 242, 248",
    strength: "Medium Strength",
    breakaway_torque: "~9.5 Nm (84 in-lb)",
    removal: "Standard hand tools",
    temp_range: "-65°F to 300°F (-54°C to 149°C)",
    cure_time_handling: "10 minutes",
    cure_time_full: "24 hours",
    gap_fill: "Up to 0.15mm (0.006\")",
    best_for: [
      "General purpose — most common grade",
      "M6–M20 (1/4\"–3/4\") fasteners",
      "Maintenance, repair, and assembly",
      "Vibration-prone machinery and equipment",
      "Fasteners that may need occasional removal",
      "Most automotive and industrial applications",
    ],
    not_for: [
      "Permanent assemblies (use red)",
      "Very high temperature above 300°F",
      "Passive metals (stainless, zinc) without activator",
    ],
    notes: "The most widely used grade. 243 is the 'extended use' formula that handles contaminated or oily threads better than 242. When someone says 'blue Loctite,' this is what they mean. Standard recommendation for most industrial applications.",
    star: true,
  },
  {
    id: "red",
    color_name: "Red",
    color: "#DC2626",
    hex: "#DC2626",
    loctite_nums: "271, 262, 268",
    strength: "High Strength (Permanent)",
    breakaway_torque: "~27 Nm (239 in-lb)",
    removal: "Heat to 250°C (482°F) then remove while hot",
    temp_range: "-65°F to 300°F (-54°C to 149°C)",
    cure_time_handling: "10 minutes",
    cure_time_full: "24 hours",
    gap_fill: "Up to 0.15mm (0.006\")",
    best_for: [
      "Permanent assemblies not intended for disassembly",
      "Large fasteners M20+ (3/4\" and larger)",
      "Studs and anchors",
      "High-vibration applications requiring maximum retention",
      "Press fits and cylindrical assemblies",
    ],
    not_for: [
      "Fasteners that need to be removed for maintenance",
      "Plastic substrates (may crack)",
      "Very small fasteners — use purple or blue",
    ],
    notes: "Permanent grade — requires heat for removal. Consider carefully before using: once cured, removal without heat is very difficult and may damage the fastener or mating threads. Reserve for truly permanent assemblies.",
    star: true,
  },
  {
    id: "green",
    color_name: "Green",
    color: "#059669",
    hex: "#059669",
    loctite_nums: "290",
    strength: "Medium-High (Wicking Grade)",
    breakaway_torque: "~9.5 Nm (84 in-lb)",
    removal: "Standard hand tools",
    temp_range: "-65°F to 300°F (-54°C to 149°C)",
    cure_time_handling: "15 minutes",
    cure_time_full: "24 hours",
    gap_fill: "Wicks into assembled joints — very low viscosity",
    best_for: [
      "Already-assembled fasteners that need threadlocking",
      "Fasteners in tight spaces where pre-application is difficult",
      "Capillary action applications — applies to assembled joint",
      "Fine threads where low viscosity is needed",
    ],
    not_for: [
      "New assemblies (use blue or red)",
      "Vertical surfaces where it may run before curing",
      "Large gaps — green is very low viscosity",
    ],
    notes: "The wicking grade — unique because it's applied AFTER assembly. Capillary action draws it into the thread gap. Valuable when fasteners are already installed and you need to add threadlocker without disassembly.",
    star: false,
  },
  {
    id: "orange",
    color_name: "Orange / Silver",
    color: "#D97706",
    hex: "#D97706",
    loctite_nums: "2400, 2700",
    strength: "Medium / High (Dry-to-Touch)",
    breakaway_torque: "Medium (2400) / High (2700)",
    removal: "Standard tools (2400) / Heat required (2700)",
    temp_range: "-65°F to 250°F (-54°C to 121°C)",
    cure_time_handling: "Dry to touch in minutes",
    cure_time_full: "24 hours",
    gap_fill: "Up to 0.15mm",
    best_for: [
      "Pre-applied (factory) applications",
      "Parts that need handling before assembly",
      "Production line applications",
      "Fasteners shipped with adhesive pre-applied",
    ],
    not_for: [
      "General maintenance use — use standard blue or red",
      "High temperature above 250°F",
    ],
    notes: "Dry-to-touch formula — remains inactive until compressed between threads. Useful for production environments where fasteners are pre-coated and then stored before assembly.",
    star: false,
  },
];

const APPLICATION_GUIDE = [
  {
    scenario: "General machinery maintenance",
    recommendation: "Blue (243)",
    reason: "Removable for maintenance, sufficient for vibration resistance",
  },
  {
    scenario: "Small fasteners (under 1/4\" / M6)",
    recommendation: "Purple (222)",
    reason: "Lower strength matches small fastener torque capacity",
  },
  {
    scenario: "Permanent stud installation",
    recommendation: "Red (271)",
    reason: "Maximum retention, no planned disassembly",
  },
  {
    scenario: "Pipe fittings / NPT threads",
    recommendation: "Pipe sealant (567 or Teflon tape)",
    reason: "Threadlocker is not a pipe sealant — use correct product",
  },
  {
    scenario: "Already-assembled loose fasteners",
    recommendation: "Green (290)",
    reason: "Wicks into assembled joint without disassembly",
  },
  {
    scenario: "High-vibration (>0.5G) applications",
    recommendation: "Red (271) or Blue + mechanical locking",
    reason: "Blue alone may be insufficient for severe vibration",
  },
  {
    scenario: "Stainless steel fasteners",
    recommendation: "Blue (243) + activator (7649)",
    reason: "Passive oxide layer on stainless inhibits cure — activator required",
  },
  {
    scenario: "Zinc-plated fasteners",
    recommendation: "Blue (243) + activator (7649)",
    reason: "Zinc inhibits anaerobic cure — activator ensures proper cure",
  },
  {
    scenario: "Plastics",
    recommendation: "Blue (243) or specialty grade",
    reason: "Red may stress-crack some plastics. Test first.",
  },
  {
    scenario: "Temperatures above 300°F (149°C)",
    recommendation: "High-temp grade (2620) or mechanical locking",
    reason: "Standard threadlockers lose strength above 300°F",
  },
];

const REMOVAL_GUIDE = [
  { grade: "Purple", method: "Standard hand tools — wrench or screwdriver", heat_needed: false },
  { grade: "Blue", method: "Standard hand tools — wrench or socket", heat_needed: false },
  { grade: "Green", method: "Standard hand tools", heat_needed: false },
  { grade: "Red", method: "Heat to 482°F (250°C), remove while hot. Use heat gun or torch.", heat_needed: true },
  { grade: "Any (when stuck)", method: "Apply heat to 482°F → attempt removal → reapply heat if needed. Impact wrench can help break cure.", heat_needed: true },
];

export default function ThreadlockerGuide() {
  const [activeTab, setActiveTab] = useState("grades");
  const [selected, setSelected] = useState(null);

  const selectedGrade = selected ? THREADLOCKER_GRADES.find(g => g.id === selected) : null;

  return (
    <div style={{ fontFamily: "'DM Sans','Segoe UI',sans-serif", background: BG, minHeight: "100vh", maxWidth: 430, margin: "0 auto" }}>

      {/* HEADER */}
      <div style={{ background: `linear-gradient(135deg, ${NAVY} 0%, #2C5282 100%)`, padding: "16px 20px 20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
          <span style={{ fontSize: 20 }}>⬡</span>
          <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 10, letterSpacing: 2, textTransform: "uppercase" }}>Fastener Companion</span>
        </div>
        <div style={{ color: WHITE, fontSize: 20, fontWeight: 800, marginBottom: 2 }}>Threadlocker Guide</div>
        <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 11 }}>Henkel/Loctite TDS · 3M Technical Bulletins · Permabond · IFI Technical Resources</div>
      </div>

      {/* TABS */}
      <div style={{ background: WHITE, borderBottom: `1px solid ${BORDER}`, padding: "0 8px", display: "flex", overflowX: "auto", scrollbarWidth: "none" }}>
        {[
          { id: "grades", label: "Grade Guide" },
          { id: "application", label: "Which Grade?" },
          { id: "removal", label: "Removal" },
          { id: "tips", label: "Field Tips" },
        ].map(t => (
          <button key={t.id} onClick={() => { setActiveTab(t.id); setSelected(null); }}
            style={{
              background: "none", border: "none", cursor: "pointer", padding: "11px 10px",
              fontSize: 11, fontWeight: 700, fontFamily: "inherit", whiteSpace: "nowrap",
              color: activeTab === t.id ? NAVY : MUTED,
              borderBottom: activeTab === t.id ? `3px solid ${AMBER}` : "3px solid transparent",
            }}>{t.label}</button>
        ))}
      </div>

      {/* GRADE GUIDE */}
      {activeTab === "grades" && !selectedGrade && (
        <div style={{ padding: "12px 16px", display: "flex", flexDirection: "column", gap: 10 }}>
          <div style={{ background: "#EEF4FF", border: `1px solid ${BORDER}`, borderRadius: 10, padding: "10px 14px", marginBottom: 4 }}>
            <div style={{ fontSize: 11, color: NAVY, lineHeight: 1.5 }}>
              Threadlockers are anaerobic adhesives — they cure in the absence of air when confined between metal surfaces. Color indicates strength. Always confirm with product data sheet for critical applications.
            </div>
          </div>
          {THREADLOCKER_GRADES.map(grade => (
            <div key={grade.id} onClick={() => setSelected(grade.id)}
              style={{
                background: grade.star ? STAR_BG : WHITE,
                border: `1px solid ${BORDER}`,
                borderLeft: `4px solid ${grade.hex}`,
                borderRadius: 12, padding: "14px", cursor: "pointer",
                boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
              }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 28, height: 28, borderRadius: "50%", background: grade.hex, flexShrink: 0 }} />
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      {grade.star && <span style={{ color: AMBER, fontSize: 11 }}>★</span>}
                      <span style={{ fontSize: 14, fontWeight: 800, color: NAVY }}>{grade.color_name}</span>
                    </div>
                    <div style={{ fontSize: 11, color: MUTED }}>Loctite {grade.loctite_nums}</div>
                  </div>
                </div>
                <div style={{ background: grade.hex + "20", border: `1px solid ${grade.hex}`, borderRadius: 8, padding: "4px 10px", fontSize: 11, fontWeight: 700, color: grade.hex }}>{grade.strength}</div>
              </div>
              <div style={{ fontSize: 12, color: TEXT, lineHeight: 1.5, marginBottom: 6 }}>{grade.notes}</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
                <div style={{ background: "#F1F5F9", borderRadius: 6, padding: "6px 8px" }}>
                  <div style={{ fontSize: 9, color: MUTED, textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 1 }}>Breakaway Torque</div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: TEXT }}>{grade.breakaway_torque}</div>
                </div>
                <div style={{ background: "#F1F5F9", borderRadius: 6, padding: "6px 8px" }}>
                  <div style={{ fontSize: 9, color: MUTED, textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 1 }}>Removal</div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: TEXT }}>{grade.removal.split(" ")[0]}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* GRADE DETAIL */}
      {activeTab === "grades" && selectedGrade && (
        <div style={{ padding: "14px 16px" }}>
          <button onClick={() => setSelected(null)}
            style={{ background: "none", border: "none", cursor: "pointer", color: NAVY, fontSize: 13, fontWeight: 700, fontFamily: "inherit", marginBottom: 14, display: "flex", alignItems: "center", gap: 6, padding: 0 }}>
            ← Back
          </button>
          <div style={{ background: WHITE, border: `1px solid ${BORDER}`, borderLeft: `4px solid ${selectedGrade.hex}`, borderRadius: 12, padding: "14px", marginBottom: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
              <div style={{ width: 40, height: 40, borderRadius: "50%", background: selectedGrade.hex }} />
              <div>
                <div style={{ fontSize: 18, fontWeight: 800, color: NAVY }}>{selectedGrade.color_name} — {selectedGrade.strength}</div>
                <div style={{ fontSize: 12, color: MUTED }}>Loctite {selectedGrade.loctite_nums}</div>
              </div>
            </div>
            <div style={{ fontSize: 12, color: TEXT, lineHeight: 1.6 }}>{selectedGrade.notes}</div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 12 }}>
            {[
              { label: "Breakaway Torque", value: selectedGrade.breakaway_torque },
              { label: "Removal Method", value: selectedGrade.removal },
              { label: "Temp Range", value: selectedGrade.temp_range },
              { label: "Handling Time", value: selectedGrade.cure_time_handling },
              { label: "Full Cure", value: selectedGrade.cure_time_full },
              { label: "Gap Fill", value: selectedGrade.gap_fill },
            ].map((item, i) => (
              <div key={i} style={{ background: ROW_ALT, borderRadius: 8, padding: "8px 10px", border: `1px solid ${BORDER}` }}>
                <div style={{ fontSize: 9, color: MUTED, textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 2 }}>{item.label}</div>
                <div style={{ fontSize: 11, fontWeight: 700, color: TEXT, lineHeight: 1.3 }}>{item.value}</div>
              </div>
            ))}
          </div>

          <div style={{ background: "#F0FDF4", border: `1px solid #BBF7D0`, borderRadius: 12, overflow: "hidden", marginBottom: 10 }}>
            <div style={{ background: "#059669", padding: "8px 14px" }}>
              <div style={{ color: WHITE, fontSize: 11, fontWeight: 700 }}>✓ Best Used For</div>
            </div>
            {selectedGrade.best_for.map((item, i) => (
              <div key={i} style={{ padding: "8px 14px", borderBottom: `1px solid #BBF7D0`, background: i % 2 === 0 ? WHITE : "#F0FDF4", display: "flex", gap: 8 }}>
                <span style={{ color: "#059669", flexShrink: 0 }}>✓</span>
                <div style={{ fontSize: 12, color: TEXT }}>{item}</div>
              </div>
            ))}
          </div>

          <div style={{ background: "#FFF1F2", border: `1px solid #FECDD3`, borderRadius: 12, overflow: "hidden", marginBottom: 14 }}>
            <div style={{ background: "#DC2626", padding: "8px 14px" }}>
              <div style={{ color: WHITE, fontSize: 11, fontWeight: 700 }}>✗ Not Suitable For</div>
            </div>
            {selectedGrade.not_for.map((item, i) => (
              <div key={i} style={{ padding: "8px 14px", borderBottom: `1px solid #FECDD3`, background: i % 2 === 0 ? WHITE : "#FFF5F5", display: "flex", gap: 8 }}>
                <span style={{ color: "#DC2626", flexShrink: 0 }}>✗</span>
                <div style={{ fontSize: 12, color: TEXT }}>{item}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* APPLICATION GUIDE */}
      {activeTab === "application" && (
        <div style={{ padding: "14px 16px" }}>
          <div style={{ background: WHITE, borderRadius: 14, overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.06)", border: `1px solid ${BORDER}` }}>
            <div style={{ background: NAVY, padding: "10px 14px" }}>
              <div style={{ color: WHITE, fontSize: 12, fontWeight: 700 }}>Which Grade for My Application?</div>
            </div>
            {APPLICATION_GUIDE.map((item, i) => (
              <div key={i} style={{ padding: "12px 14px", borderBottom: `1px solid ${BORDER}`, background: i % 2 === 0 ? WHITE : ROW_ALT }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: NAVY, marginBottom: 4 }}>{item.scenario}</div>
                <div style={{ display: "inline-block", background: "#EEF4FF", border: `1px solid ${NAVY}`, borderRadius: 6, padding: "2px 10px", fontSize: 11, fontWeight: 800, color: NAVY, marginBottom: 6 }}>→ {item.recommendation}</div>
                <div style={{ fontSize: 11, color: MUTED }}>{item.reason}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* REMOVAL */}
      {activeTab === "removal" && (
        <div style={{ padding: "14px 16px" }}>
          <div style={{ background: STAR_BG, border: `1px solid ${STAR_BORDER}`, borderRadius: 10, padding: "10px 14px", marginBottom: 12 }}>
            <div style={{ fontSize: 11, color: "#92400E", lineHeight: 1.5 }}>
              Red threadlocker requires heat for removal. Apply heat gun or torch to the fastener head/nut until you reach 250°C (482°F), then attempt removal while still hot. Do NOT force a cold red-locked fastener — you will break it.
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {REMOVAL_GUIDE.map((item, i) => (
              <div key={i} style={{ background: item.heat_needed ? "#FFF1F2" : WHITE, border: `1px solid ${item.heat_needed ? "#FECDD3" : BORDER}`, borderLeft: `4px solid ${item.heat_needed ? "#DC2626" : "#059669"}`, borderRadius: 12, padding: "12px 14px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                  <div style={{ fontSize: 13, fontWeight: 800, color: NAVY }}>{item.grade}</div>
                  {item.heat_needed && <div style={{ background: "#FFF1F2", border: "1px solid #FECDD3", borderRadius: 6, padding: "2px 8px", fontSize: 10, fontWeight: 700, color: "#DC2626" }}>?? HEAT REQUIRED</div>}
                </div>
                <div style={{ fontSize: 12, color: TEXT, lineHeight: 1.5 }}>{item.method}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* FIELD TIPS */}
      {activeTab === "tips" && (
        <div style={{ padding: "14px 16px", display: "flex", flexDirection: "column", gap: 10 }}>
          {[
            { title: "Threadlocker ≠ thread sealant", color: "#DC2626", bg: "#FFF1F2", body: "Threadlocker prevents loosening. Thread sealant seals against fluid/gas leakage. They are different products. Loctite 567 and 565 are thread sealants for pipe threads (NPT). Standard blue/red Loctite is NOT a pipe sealant." },
            { title: "Surface preparation matters", color: NAVY, bg: "#EEF4FF", body: "Clean, dry threads cure faster and stronger. Degrease with acetone or isopropyl alcohol. Oil, grease, and contamination slow cure and reduce bond strength. Allow surfaces to dry completely before applying." },
            { title: "Stainless and zinc need activator", color: "#D97706", bg: "#FFF8E7", body: "Passive oxide layers on stainless steel and zinc platings inhibit anaerobic cure. Apply Loctite 7649 activator to the female thread before applying threadlocker to ensure proper cure. Without activator, cure may be slow or incomplete." },
            { title: "Temperature affects cure time", color: "#059669", bg: "#F0FDF4", body: "Cold slows cure: at 50°F (10°C), full cure can take 72+ hours. Warm environments speed cure. For urgent applications at low temperatures, use a heat gun to warm the assembly (not hot — just warm, ~100°F/38°C) to accelerate cure." },
            { title: "Don't over-apply", color: "#7C3AED", bg: "#F5F3FF", body: "2–3 drops on male threads is sufficient. Excess threadlocker gets displaced and creates contamination. Excess on flange faces can affect sealing. Apply to the first engaged threads — not the lead threads which won't be covered." },
            { title: "Prevailing torque nuts vs threadlocker", color: "#64748B", bg: "#F8FAFC", body: "Threadlocker and nyloc prevailing torque nuts both prevent loosening but work differently. Don't combine them — the chemistry of threadlocker may interact with nylon and affect the nyloc nut's effectiveness." },
          ].map((tip, i) => (
            <div key={i} style={{ background: tip.bg, border: `1px solid ${BORDER}`, borderLeft: `4px solid ${tip.color}`, borderRadius: 12, padding: "12px 14px" }}>
              <div style={{ fontSize: 12, fontWeight: 800, color: tip.color, marginBottom: 6 }}>{tip.title}</div>
              <div style={{ fontSize: 12, color: TEXT, lineHeight: 1.6 }}>{tip.body}</div>
            </div>
          ))}
        </div>
      )}

      {/* DISCLAIMER */}
      <div style={{ margin: "0 16px 24px", background: "#FFF1F2", border: "1px solid #FECDD3", borderRadius: 10, padding: "10px 14px" }}>
        <div style={{ fontSize: 10, color: "#9F1239", lineHeight: 1.5 }}>
          <strong>⚠ Verify Before Use.</strong> Product data based on Henkel/Loctite technical data sheets. Always consult current manufacturer TDS for critical applications. Cure times and strength values are approximate. Fastener Companion is a reference tool — not a substitute for engineering judgment.
        </div>
      </div>
    </div>
  );
}

// ─── DATA ─────────────────────────────────────────────────────────────────────
// Sources: Jet-Lube technical data, Henkel/Loctite anti-seize TDS,
// Jet-Lube Nuclear Grade, Molykote technical bulletins,
// ASTM D2670 (lubricity), Portland Bolt anti-seize guidance,
// Engineers Edge chemical compatibility reference

const ANTI_SEIZE_TYPES = [
  {
    id: "copper",
    name: "Copper-Based Anti-Seize",
    color: "#D97706",
    bg: "#FFF8E7",
    appearance: "Copper/brown metallic paste",
    common_brands: "Jet-Lube Copper-Based, Loctite 767, Permatex 09128",
    temp_range: "Up to 1800°F (982°C)",
    torque_reduction: "25–35% (K ≈ 0.13–0.15)",
    applications: [
      "Exhaust manifold studs and bolts",
      "High-temperature flanges and fittings",
      "Spark plugs and oxygen sensors",
      "Steam and hot water systems",
      "Furnace and kiln hardware",
      "General purpose high-temp fastener assembly",
    ],
    not_for: [
      "Aluminum components — copper can cause galvanic corrosion",
      "Oxygen service — copper burns in oxygen-rich environments",
      "Electrical connections — copper can cause galvanic issues",
      "Stainless in contact with aluminum",
    ],
    notes: "Most versatile general purpose anti-seize. Excellent high-temperature performance. The copper particles provide lubricity and prevent seizing even at extreme temperatures.",
    star: true,
  },
  {
    id: "nickel",
    name: "Nickel-Based Anti-Seize",
    color: "#64748B",
    bg: "#F8FAFC",
    appearance: "Silver/gray metallic paste",
    common_brands: "Jet-Lube Nikal, Loctite 771, Molykote P-37",
    temp_range: "Up to 2400°F (1316°C)",
    torque_reduction: "25–30% (K ≈ 0.13–0.15)",
    applications: [
      "Stainless steel fasteners in high-temp applications",
      "Austenitic SS to prevent galling",
      "Oxygen service (nickel is compatible with O2)",
      "Nuclear and aerospace applications",
      "Titanium fasteners",
      "Any application where copper contamination must be avoided",
      "Petrochemical and refinery high-temperature bolting",
    ],
    not_for: [
      "General purpose where copper is acceptable — nickel is more expensive",
      "Some nickel-sensitive alloys",
    ],
    notes: "Premium anti-seize with the highest temperature rating. Required for oxygen service where copper cannot be used. Standard for nuclear industry. More expensive than copper-based but provides superior protection for critical applications.",
    star: true,
  },
  {
    id: "moly",
    name: "Molybdenum Disulfide (Moly/MoS₂)",
    color: "#1B3A6B",
    bg: "#EEF4FF",
    appearance: "Dark gray/black paste",
    common_brands: "Molykote 1000, Dow Corning 321, Loctite 8009",
    temp_range: "Up to 750°F (399°C) (higher in vacuum/inert atmosphere)",
    torque_reduction: "30–40% (K ≈ 0.11–0.13)",
    applications: [
      "Extreme pressure applications",
      "Slow-speed, high-load fasteners",
      "Mining and heavy equipment",
      "Gearboxes and mechanical assemblies",
      "Fasteners subject to heavy vibration",
      "Aluminum fasteners (no galvanic concern)",
    ],
    not_for: [
      "Oxidizing environments — MoS₂ oxidizes above 750°F in air",
      "High-speed applications",
      "Stainless steel in chloride environments (can accelerate corrosion)",
    ],
    notes: "Provides the lowest friction coefficient of common anti-seize compounds. The lamellar structure of MoS₂ provides extreme pressure lubrication. Requires the most torque reduction — always verify torque values when using moly.",
    star: false,
  },
  {
    id: "zinc",
    name: "Zinc-Based / Aluminum Anti-Seize",
    color: "#059669",
    bg: "#F0FDF4",
    appearance: "Silver metallic paste",
    common_brands: "Jet-Lube Zinc Anti-Seize, Permatex 81343",
    temp_range: "Up to 1600°F (871°C)",
    torque_reduction: "25–30%",
    applications: [
      "General maintenance applications",
      "Aluminum components",
      "Galvanized and zinc-coated hardware",
      "Outdoor and marine fasteners",
      "Water and wastewater applications",
    ],
    not_for: [
      "Copper-sensitive applications",
      "Electrical connections",
    ],
    notes: "Good general purpose anti-seize for non-critical maintenance applications. The zinc content provides cathodic protection similar to galvanizing, making it good for outdoor and wet environments.",
    star: false,
  },
  {
    id: "ptfe",
    name: "PTFE (Teflon) Based",
    color: "#0891B2",
    bg: "#F0FDFE",
    appearance: "White paste or tape",
    common_brands: "Teflon tape, Jet-Lube TF, various PTFE paste",
    temp_range: "Up to 500°F (260°C) continuous",
    torque_reduction: "20–25%",
    applications: [
      "NPT pipe threads (PTFE tape is the standard)",
      "Chemical and food-grade applications",
      "Stainless fasteners in chemical environments",
      "Applications requiring clean/non-metallic lubricant",
      "Plastic fittings",
    ],
    not_for: [
      "High temperature above 500°F",
      "Oxygen service (PTFE tape in O2 lines is a fire hazard)",
      "Structural or high-load fasteners",
    ],
    notes: "PTFE tape (Teflon tape) is for pipe threads — NOT for standard bolt fasteners. Using PTFE tape on structural bolts reduces torque accuracy. For fastener anti-seize use PTFE paste, not tape.",
    star: false,
  },
];

const TORQUE_FACTORS = [
  { compound: "No anti-seize (dry)", factor: "1.00", k: "0.20", note: "Baseline dry torque values" },
  { compound: "Copper-based anti-seize", factor: "0.65–0.75", k: "0.13–0.15", note: "Reduce dry torque by 25–35%" },
  { compound: "Nickel-based anti-seize", factor: "0.65–0.75", k: "0.13–0.15", note: "Reduce dry torque by 25–35%" },
  { compound: "Moly (MoS₂) anti-seize", factor: "0.60–0.70", k: "0.11–0.13", note: "Reduce dry torque by 30–40% — most reduction" },
  { compound: "PTFE paste", factor: "0.75–0.80", k: "0.15–0.16", note: "Reduce dry torque by 20–25%" },
  { compound: "Light oil (WD-40)", factor: "0.75–0.80", k: "0.15–0.16", note: "Approximate — use with caution, not a calibrated lubricant" },
  { compound: "Zinc plated (dry)", factor: "0.85", k: "0.17", note: "Zinc coating provides some lubricity even dry" },
];

const APPLICATION_GUIDE = [
  { situation: "Stainless fasteners — any application", product: "Nickel or Copper anti-seize", reason: "MANDATORY to prevent galling. Apply before every assembly." },
  { situation: "Exhaust manifold / high temperature", product: "Copper or Nickel anti-seize", reason: "Prevents seizing at high temperatures. Copper is standard, nickel for >1800°F." },
  { situation: "Spark plugs", product: "Copper anti-seize", reason: "Standard practice. Check OEM specification — some modern plugs pre-coated." },
  { situation: "Flange studs (A193 B7)", product: "Nickel or Copper anti-seize", reason: "Prevents seizing in flange environments. Required for hot systems." },
  { situation: "Aluminum components", product: "Nickel or Zinc (NOT Copper)", reason: "Copper causes galvanic corrosion against aluminum. Use nickel or zinc." },
  { situation: "Oxygen service", product: "Nickel ONLY", reason: "Copper burns in oxygen. PTFE is a fire hazard. Nickel is the safe choice." },
  { situation: "Marine / saltwater", product: "Nickel or Copper", reason: "Both prevent seizing in corrosive saltwater. Nickel preferred for submerged." },
  { situation: "General maintenance", product: "Copper anti-seize", reason: "Most cost-effective general purpose solution for non-aluminum applications." },
];

export default function AntiSeizeGuide() {
  const [activeTab, setActiveTab] = useState("types");
  const [selected, setSelected] = useState(null);

  const selectedType = selected ? ANTI_SEIZE_TYPES.find(t => t.id === selected) : null;

  return (
    <div style={{ fontFamily: "'DM Sans','Segoe UI',sans-serif", background: BG, minHeight: "100vh", maxWidth: 430, margin: "0 auto" }}>

      {/* HEADER */}
      <div style={{ background: `linear-gradient(135deg, ${NAVY} 0%, #2C5282 100%)`, padding: "16px 20px 20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
          <span style={{ fontSize: 20 }}>⬡</span>
          <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 10, letterSpacing: 2, textTransform: "uppercase" }}>Fastener Companion</span>
        </div>
        <div style={{ color: WHITE, fontSize: 20, fontWeight: 800, marginBottom: 2 }}>Anti-Seize Guide</div>
        <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 11 }}>Jet-Lube TDS · Henkel/Loctite · Molykote · Portland Bolt · ASTM D2670</div>
      </div>

      {/* CRITICAL WARNING */}
      <div style={{ margin: "12px 16px 0", background: "#FFF1F2", border: "1px solid #FECDD3", borderLeft: "4px solid #DC2626", borderRadius: 10, padding: "10px 14px" }}>
        <div style={{ fontSize: 12, fontWeight: 800, color: "#DC2626", marginBottom: 4 }}>⚠ Critical: Always Reduce Torque</div>
        <div style={{ fontSize: 11, color: "#9F1239", lineHeight: 1.5 }}>Anti-seize reduces friction. Using standard dry torque values with anti-seize WILL over-torque the joint. Reduce dry torque values by 25–35% (copper/nickel) or 30–40% (moly) when using anti-seize.</div>
      </div>

      {/* TABS */}
      <div style={{ background: WHITE, borderBottom: `1px solid ${BORDER}`, padding: "0 8px", display: "flex", overflowX: "auto", scrollbarWidth: "none", marginTop: 12 }}>
        {[
          { id: "types", label: "Types" },
          { id: "torque", label: "Torque Factors" },
          { id: "application", label: "Which Type?" },
          { id: "tips", label: "Field Tips" },
        ].map(t => (
          <button key={t.id} onClick={() => { setActiveTab(t.id); setSelected(null); }}
            style={{
              background: "none", border: "none", cursor: "pointer", padding: "11px 10px",
              fontSize: 11, fontWeight: 700, fontFamily: "inherit", whiteSpace: "nowrap",
              color: activeTab === t.id ? NAVY : MUTED,
              borderBottom: activeTab === t.id ? `3px solid ${AMBER}` : "3px solid transparent",
            }}>{t.label}</button>
        ))}
      </div>

      {/* TYPES */}
      {activeTab === "types" && !selectedType && (
        <div style={{ padding: "12px 16px", display: "flex", flexDirection: "column", gap: 10 }}>
          {ANTI_SEIZE_TYPES.map(type => (
            <div key={type.id} onClick={() => setSelected(type.id)}
              style={{
                background: type.star ? STAR_BG : WHITE,
                border: `1px solid ${BORDER}`,
                borderLeft: `4px solid ${type.color}`,
                borderRadius: 12, padding: "14px", cursor: "pointer",
                boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
              }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }}>
                    {type.star && <span style={{ color: AMBER, fontSize: 11 }}>★</span>}
                    <span style={{ fontSize: 14, fontWeight: 800, color: NAVY }}>{type.name}</span>
                  </div>
                  <div style={{ fontSize: 11, color: MUTED }}>{type.appearance}</div>
                </div>
                <div style={{ background: type.color + "20", border: `1px solid ${type.color}`, borderRadius: 8, padding: "3px 8px", fontSize: 10, fontWeight: 700, color: type.color, whiteSpace: "nowrap", flexShrink: 0, marginLeft: 8 }}>
                  {type.temp_range.split("(")[0].trim()}
                </div>
              </div>
              <div style={{ fontSize: 12, color: TEXT, lineHeight: 1.5, marginBottom: 6 }}>{type.notes}</div>
              <div style={{ fontSize: 11, color: "#DC2626", fontWeight: 700 }}>Torque reduction: {type.torque_reduction}</div>
            </div>
          ))}
        </div>
      )}

      {/* TYPE DETAIL */}
      {activeTab === "types" && selectedType && (
        <div style={{ padding: "14px 16px" }}>
          <button onClick={() => setSelected(null)}
            style={{ background: "none", border: "none", cursor: "pointer", color: NAVY, fontSize: 13, fontWeight: 700, fontFamily: "inherit", marginBottom: 14, display: "flex", alignItems: "center", gap: 6, padding: 0 }}>
            ← Back
          </button>
          <div style={{ background: selectedType.bg, border: `1px solid ${BORDER}`, borderLeft: `4px solid ${selectedType.color}`, borderRadius: 12, padding: "14px", marginBottom: 12 }}>
            <div style={{ fontSize: 16, fontWeight: 800, color: NAVY, marginBottom: 4 }}>{selectedType.name}</div>
            <div style={{ fontSize: 11, color: MUTED, marginBottom: 6 }}>{selectedType.appearance} · {selectedType.common_brands}</div>
            <div style={{ fontSize: 12, color: TEXT, lineHeight: 1.6 }}>{selectedType.notes}</div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 12 }}>
            {[
              { label: "Max Temp", value: selectedType.temp_range },
              { label: "Torque Reduction", value: selectedType.torque_reduction },
            ].map((item, i) => (
              <div key={i} style={{ background: ROW_ALT, borderRadius: 8, padding: "8px 10px", border: `1px solid ${BORDER}` }}>
                <div style={{ fontSize: 9, color: MUTED, textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 2 }}>{item.label}</div>
                <div style={{ fontSize: 11, fontWeight: 700, color: TEXT }}>{item.value}</div>
              </div>
            ))}
          </div>
          <div style={{ background: "#F0FDF4", border: `1px solid #BBF7D0`, borderRadius: 12, overflow: "hidden", marginBottom: 10 }}>
            <div style={{ background: "#059669", padding: "8px 14px" }}>
              <div style={{ color: WHITE, fontSize: 11, fontWeight: 700 }}>✓ Applications</div>
            </div>
            {selectedType.applications.map((item, i) => (
              <div key={i} style={{ padding: "8px 14px", borderBottom: `1px solid #BBF7D0`, background: i % 2 === 0 ? WHITE : "#F0FDF4", display: "flex", gap: 8 }}>
                <span style={{ color: "#059669", flexShrink: 0 }}>✓</span>
                <div style={{ fontSize: 12, color: TEXT }}>{item}</div>
              </div>
            ))}
          </div>
          <div style={{ background: "#FFF1F2", border: `1px solid #FECDD3`, borderRadius: 12, overflow: "hidden", marginBottom: 14 }}>
            <div style={{ background: "#DC2626", padding: "8px 14px" }}>
              <div style={{ color: WHITE, fontSize: 11, fontWeight: 700 }}>✗ Not Suitable For</div>
            </div>
            {selectedType.not_for.map((item, i) => (
              <div key={i} style={{ padding: "8px 14px", borderBottom: `1px solid #FECDD3`, background: i % 2 === 0 ? WHITE : "#FFF5F5", display: "flex", gap: 8 }}>
                <span style={{ color: "#DC2626", flexShrink: 0 }}>✗</span>
                <div style={{ fontSize: 12, color: TEXT }}>{item}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TORQUE FACTORS */}
      {activeTab === "torque" && (
        <div style={{ padding: "14px 16px" }}>
          <div style={{ background: "#FFF1F2", border: "1px solid #FECDD3", borderRadius: 10, padding: "10px 14px", marginBottom: 12 }}>
            <div style={{ fontSize: 11, color: "#9F1239", lineHeight: 1.5 }}>
              <strong>Formula: T(actual) = T(dry) × Factor</strong> — Example: Dry torque 100 ft-lb with copper anti-seize = 100 × 0.65 = 65 ft-lb actual torque.
            </div>
          </div>
          <div style={{ background: WHITE, borderRadius: 14, overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.06)", border: `1px solid ${BORDER}` }}>
            <div style={{ display: "grid", gridTemplateColumns: "1.5fr 0.6fr 0.5fr", background: NAVY, padding: "10px 12px" }}>
              {["Compound", "Factor", "K"].map(h => (
                <div key={h} style={{ color: WHITE, fontSize: 10, fontWeight: 700 }}>{h}</div>
              ))}
            </div>
            {TORQUE_FACTORS.map((item, i) => (
              <div key={i} style={{ padding: "10px 12px", borderBottom: `1px solid ${BORDER}`, background: i % 2 === 0 ? WHITE : ROW_ALT }}>
                <div style={{ display: "grid", gridTemplateColumns: "1.5fr 0.6fr 0.5fr", alignItems: "center", marginBottom: 3 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: NAVY }}>{item.compound}</div>
                  <div style={{ fontSize: 13, fontWeight: 800, color: item.factor === "1.00" ? MUTED : "#DC2626" }}>{item.factor}</div>
                  <div style={{ fontSize: 12, color: TEXT }}>{item.k}</div>
                </div>
                <div style={{ fontSize: 10, color: MUTED }}>{item.note}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* APPLICATION GUIDE */}
      {activeTab === "application" && (
        <div style={{ padding: "14px 16px" }}>
          <div style={{ background: WHITE, borderRadius: 14, overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.06)", border: `1px solid ${BORDER}` }}>
            <div style={{ background: NAVY, padding: "10px 14px" }}>
              <div style={{ color: WHITE, fontSize: 12, fontWeight: 700 }}>Which Anti-Seize for My Application?</div>
            </div>
            {APPLICATION_GUIDE.map((item, i) => (
              <div key={i} style={{ padding: "12px 14px", borderBottom: `1px solid ${BORDER}`, background: i % 2 === 0 ? WHITE : ROW_ALT }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: NAVY, marginBottom: 4 }}>{item.situation}</div>
                <div style={{ display: "inline-block", background: "#EEF4FF", border: `1px solid ${NAVY}`, borderRadius: 6, padding: "2px 10px", fontSize: 11, fontWeight: 800, color: NAVY, marginBottom: 6 }}>→ {item.product}</div>
                <div style={{ fontSize: 11, color: MUTED }}>{item.reason}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* FIELD TIPS */}
      {activeTab === "tips" && (
        <div style={{ padding: "14px 16px", display: "flex", flexDirection: "column", gap: 10 }}>
          {[
            { title: "Apply to male threads only", color: NAVY, bg: "#EEF4FF", body: "Apply a thin coat to male (bolt) threads only. Do not pack threads. Do not apply to the first 1–2 lead threads — excess anti-seize on the joint face can affect sealing and torque accuracy." },
            { title: "Thin coat — not packed", color: "#059669", bg: "#F0FDF4", body: "A thin film provides full anti-seize protection. Heavy application does not improve performance and creates mess, contamination, and torque inaccuracy. Think coating, not packing." },
            { title: "Copper + aluminum = galvanic problem", color: "#DC2626", bg: "#FFF1F2", body: "Copper anti-seize on aluminum fasteners or aluminum components creates a galvanic couple that accelerates corrosion. Use nickel or zinc-based anti-seize for any aluminum application." },
            { title: "Anti-seize is not a threadlocker", color: "#D97706", bg: "#FFF8E7", body: "Anti-seize prevents seizing and aids disassembly. It does NOT prevent loosening from vibration. If vibration resistance is needed, use threadlocker. Anti-seize actually makes loosening easier." },
            { title: "Re-apply after disassembly", color: "#7C3AED", bg: "#F5F3FF", body: "Anti-seize does not survive repeated disassembly cleanly. When reassembling maintenance items (flanges, exhaust, hot systems), always clean old anti-seize from threads and apply fresh compound." },
            { title: "Oxygen service — nickel only", color: "#DC2626", bg: "#FFF1F2", body: "NEVER use copper or PTFE anti-seize in oxygen service. Copper can ignite in oxygen-enriched environments. PTFE is a fire hazard. Nickel-based anti-seize is the only safe option for oxygen systems." },
          ].map((tip, i) => (
            <div key={i} style={{ background: tip.bg, border: `1px solid ${BORDER}`, borderLeft: `4px solid ${tip.color}`, borderRadius: 12, padding: "12px 14px" }}>
              <div style={{ fontSize: 12, fontWeight: 800, color: tip.color, marginBottom: 6 }}>{tip.title}</div>
              <div style={{ fontSize: 12, color: TEXT, lineHeight: 1.6 }}>{tip.body}</div>
            </div>
          ))}
        </div>
      )}

      {/* DISCLAIMER */}
      <div style={{ margin: "0 16px 24px", background: "#FFF1F2", border: "1px solid #FECDD3", borderRadius: 10, padding: "10px 14px" }}>
        <div style={{ fontSize: 10, color: "#9F1239", lineHeight: 1.5 }}>
          <strong>⚠ Verify Before Use.</strong> Anti-seize data based on Jet-Lube, Henkel/Loctite, and Molykote technical data sheets. Always consult current manufacturer TDS and reduce torque values appropriately. Fastener Companion is a reference tool — not a substitute for engineering judgment.
        </div>
      </div>
    </div>
  );
}

// ─── DATA ─────────────────────────────────────────────────────────────────────
// Sources: ASTM B667 (galvanic corrosion), MIL-STD-889C (dissimilar metals),
// NASA Reference Publication 1124 (galvanic series),
// Corrosionpedia, Engineers Edge galvanic series,
// NACE International corrosion engineering reference

// Galvanic Series in Seawater (most noble/cathodic at top)
// Higher = more noble (cathodic, protected)
// Lower = less noble (anodic, corrodes preferentially)
// Source: MIL-STD-889C, NASA RP-1124, NACE

const GALVANIC_SERIES = [
  { rank: 1, metal: "Platinum", symbol: "Pt", potential: "+0.40 V", category: "noble", color: "#D97706" },
  { rank: 2, metal: "Gold", symbol: "Au", potential: "+0.18 V", category: "noble", color: "#D97706" },
  { rank: 3, metal: "Graphite / Carbon", symbol: "C", potential: "+0.12 V", category: "noble", color: "#374151" },
  { rank: 4, metal: "Silver", symbol: "Ag", potential: "+0.03 V", category: "noble", color: "#64748B" },
  { rank: 5, metal: "Titanium", symbol: "Ti", potential: "-0.05 V", category: "noble", color: "#7C3AED" },
  { rank: 6, metal: "316 Stainless Steel (passive)", symbol: "SS316", potential: "-0.05 V", category: "stainless", color: "#0891B2" },
  { rank: 7, metal: "304 Stainless Steel (passive)", symbol: "SS304", potential: "-0.08 V", category: "stainless", color: "#0891B2" },
  { rank: 8, metal: "Monel (Ni-Cu alloy)", symbol: "Monel", potential: "-0.08 V", category: "nickel", color: "#059669" },
  { rank: 9, metal: "Copper", symbol: "Cu", potential: "-0.20 V", category: "copper", color: "#D97706" },
  { rank: 10, metal: "Bronze (Cu-Sn)", symbol: "Bronze", potential: "-0.22 V", category: "copper", color: "#D97706" },
  { rank: 11, metal: "Brass (Cu-Zn)", symbol: "Brass", potential: "-0.26 V", category: "copper", color: "#D97706" },
  { rank: 12, metal: "Nickel (passive)", symbol: "Ni", potential: "-0.28 V", category: "nickel", color: "#059669" },
  { rank: 13, metal: "Tin", symbol: "Sn", potential: "-0.31 V", category: "other", color: "#64748B" },
  { rank: 14, metal: "Lead", symbol: "Pb", potential: "-0.40 V", category: "other", color: "#374151" },
  { rank: 15, metal: "316 Stainless (active)", symbol: "SS316a", potential: "-0.48 V", category: "stainless", color: "#0891B2" },
  { rank: 16, metal: "304 Stainless (active)", symbol: "SS304a", potential: "-0.53 V", category: "stainless", color: "#0891B2" },
  { rank: 17, metal: "Cast Iron", symbol: "CI", potential: "-0.58 V", category: "iron", color: "#374151" },
  { rank: 18, metal: "Carbon Steel / Iron", symbol: "Fe", potential: "-0.61 V", category: "iron", color: "#374151" },
  { rank: 19, metal: "Aluminum 2024-T3", symbol: "Al2024", potential: "-0.69 V", category: "aluminum", color: "#94A3B8" },
  { rank: 20, metal: "Cadmium", symbol: "Cd", potential: "-0.72 V", category: "coating", color: "#64748B" },
  { rank: 21, metal: "Aluminum 6061 / 7075", symbol: "Al6061", potential: "-0.76 V", category: "aluminum", color: "#94A3B8" },
  { rank: 22, metal: "Hot-Dip Galvanized (Zinc)", symbol: "HDG", potential: "-0.80 V", category: "coating", color: "#059669" },
  { rank: 23, metal: "Zinc", symbol: "Zn", potential: "-0.83 V", category: "coating", color: "#059669" },
  { rank: 24, metal: "Magnesium Alloy", symbol: "Mg", potential: "-1.60 V", category: "other", color: "#374151" },
];

const COMPATIBILITY_DATA = [
  // Format: [metal_a, metal_b, risk_level, description, recommendation]
  { a: "Stainless Steel", b: "Carbon Steel", risk: "high", desc: "Stainless is much more noble — carbon steel corrodes rapidly. Very common problematic combination.", rec: "Isolate with non-conductive washer. Use stainless throughout or carbon steel throughout." },
  { a: "Stainless Steel", b: "Aluminum", risk: "high", desc: "Stainless is more noble — aluminum corrodes. Common problem in structural aluminum with SS fasteners.", rec: "Use aluminum fasteners in aluminum, or isolate SS from aluminum with neoprene/plastic washers and sleeves." },
  { a: "Copper/Brass", b: "Aluminum", risk: "high", desc: "Copper is much more noble — aluminum corrodes aggressively. Common problem in plumbing and HVAC.", rec: "Avoid direct contact. Use isolating bushings or choose compatible materials." },
  { a: "Copper/Brass", b: "Carbon Steel", risk: "medium-high", desc: "Copper is more noble — steel corrodes. Worsened by large cathode/anode area ratio.", rec: "Isolate where possible. Hot-dip galvanizing steel improves compatibility." },
  { a: "Zinc (HDG)", b: "Carbon Steel", risk: "low", desc: "Zinc is anodic to steel — zinc sacrificially protects steel. This is the intended function of galvanizing.", rec: "Compatible — galvanizing is specifically designed to protect steel through sacrificial corrosion." },
  { a: "Aluminum", b: "Carbon Steel", risk: "medium", desc: "Moderate potential difference. Risk increases with moisture and salt exposure.", rec: "Acceptable in dry indoor environments. In wet/outdoor environments, isolate or use compatible coatings." },
  { a: "304 Stainless", b: "316 Stainless", risk: "low", desc: "Very close in potential — minimal galvanic risk between stainless grades.", rec: "Compatible — can be used together without significant galvanic concern." },
  { a: "Titanium", b: "Stainless Steel", risk: "low", desc: "Very close in potential in seawater. Low galvanic risk.", rec: "Generally compatible. Acceptable for most applications." },
  { a: "Nickel alloys", b: "Stainless Steel", risk: "low", desc: "Close in potential — minimal galvanic concern.", rec: "Generally compatible." },
  { a: "Carbon Steel", b: "Cast Iron", risk: "low", desc: "Very close in potential — minimal galvanic risk.", rec: "Compatible — commonly used together without isolation." },
  { a: "Brass", b: "Copper", risk: "low", desc: "Brass is a copper alloy — very close in potential.", rec: "Compatible — commonly used together in plumbing and marine applications." },
  { a: "Cadmium plated", b: "Aluminum", risk: "low", desc: "Cadmium is anodic to aluminum — cadmium sacrificially protects aluminum.", rec: "Compatible — cadmium plating was historically used on fasteners in aluminum aircraft for this reason." },
  { a: "Zinc plated", b: "Aluminum", risk: "low-medium", desc: "Zinc is slightly anodic to aluminum — some protection but potential for zinc corrosion.", rec: "Acceptable in most applications. Monitor in salt/marine environments." },
];

const PREVENTION_METHODS = [
  {
    method: "Use compatible metals",
    detail: "Best solution — choose fastener material close in the galvanic series to the mating material. Example: use aluminum fasteners in aluminum structures, or use 316 SS consistently throughout.",
    effectiveness: "Best",
    color: "#059669",
  },
  {
    method: "Isolating washers and bushings",
    detail: "Non-conductive neoprene, PTFE, or nylon washers break the electrical contact between dissimilar metals. Must isolate both the head/nut bearing surface AND the shank through the hole.",
    effectiveness: "Excellent",
    color: "#2563EB",
  },
  {
    method: "Protective coatings",
    detail: "Hot-dip galvanizing, zinc-rich primers, and epoxy coatings applied to the anodic (less noble) metal interrupt the galvanic circuit. Must be maintained — coating damage restores galvanic cell.",
    effectiveness: "Good — requires maintenance",
    color: "#D97706",
  },
  {
    method: "Minimize area ratio concerns",
    detail: "Galvanic corrosion accelerates when the cathodic (noble) area is large and the anodic area is small. Example: one small steel bolt through a large copper plate corrodes rapidly. Reverse (small copper in large steel) is much less severe.",
    effectiveness: "Design consideration",
    color: "#7C3AED",
  },
  {
    method: "Apply zinc chromate primer",
    detail: "Traditional aerospace method — zinc chromate primer applied to mating surfaces before assembly inhibits galvanic corrosion. Now largely replaced by newer primers due to toxicity concerns.",
    effectiveness: "Good (industrial/aerospace)",
    color: "#64748B",
  },
  {
    method: "Sealants and caulk",
    detail: "Sealing the joint with non-conductive sealant excludes the electrolyte (moisture) needed for galvanic action. Used in aerospace for aluminum structures with titanium or stainless fasteners.",
    effectiveness: "Good if maintained",
    color: "#0891B2",
  },
];

const riskColor = (r) => {
  if (r === "high") return "#DC2626";
  if (r === "medium-high") return "#D97706";
  if (r === "medium") return "#D97706";
  if (r === "low-medium") return "#2563EB";
  return "#059669";
};

const riskLabel = (r) => {
  if (r === "high") return "HIGH RISK";
  if (r === "medium-high") return "MED-HIGH";
  if (r === "medium") return "MEDIUM";
  if (r === "low-medium") return "LOW-MED";
  return "LOW RISK";
};

export default function GalvanicCorrosion() {
  const [activeTab, setActiveTab] = useState("series");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const categories = ["All", "noble", "stainless", "iron", "aluminum", "copper", "nickel", "coating", "other"];

  const filteredSeries = GALVANIC_SERIES.filter(m =>
    (filter === "All" || m.category === filter) &&
    m.metal.toLowerCase().includes(search.toLowerCase())
  );

  const filteredCompat = COMPATIBILITY_DATA.filter(c =>
    c.a.toLowerCase().includes(search.toLowerCase()) ||
    c.b.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ fontFamily: "'DM Sans','Segoe UI',sans-serif", background: BG, minHeight: "100vh", maxWidth: 430, margin: "0 auto" }}>

      {/* HEADER */}
      <div style={{ background: `linear-gradient(135deg, ${NAVY} 0%, #2C5282 100%)`, padding: "16px 20px 20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
          <span style={{ fontSize: 20 }}>⬡</span>
          <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 10, letterSpacing: 2, textTransform: "uppercase" }}>Fastener Companion</span>
        </div>
        <div style={{ color: WHITE, fontSize: 20, fontWeight: 800, marginBottom: 2 }}>Galvanic Corrosion Chart</div>
        <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 11 }}>MIL-STD-889C · NASA RP-1124 · NACE International · ASTM B667</div>
        <div style={{ background: WHITE, borderRadius: 12, display: "flex", alignItems: "center", padding: "10px 14px", gap: 8, marginTop: 14, boxShadow: "0 2px 8px rgba(0,0,0,0.15)" }}>
          <span style={{ color: MUTED }}>??</span>
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search metals..."
            style={{ background: "none", border: "none", outline: "none", color: TEXT, fontSize: 14, flex: 1, fontFamily: "inherit" }} />
          {search && <span onClick={() => setSearch("")} style={{ color: MUTED, cursor: "pointer" }}>✕</span>}
        </div>
      </div>

      {/* TABS */}
      <div style={{ background: WHITE, borderBottom: `1px solid ${BORDER}`, padding: "0 8px", display: "flex", overflowX: "auto", scrollbarWidth: "none" }}>
        {[
          { id: "series", label: "Galvanic Series" },
          { id: "compatibility", label: "Common Pairs" },
          { id: "prevention", label: "Prevention" },
          { id: "explainer", label: "How It Works" },
        ].map(t => (
          <button key={t.id} onClick={() => setActiveTab(t.id)}
            style={{
              background: "none", border: "none", cursor: "pointer", padding: "11px 10px",
              fontSize: 11, fontWeight: 700, fontFamily: "inherit", whiteSpace: "nowrap",
              color: activeTab === t.id ? NAVY : MUTED,
              borderBottom: activeTab === t.id ? `3px solid ${AMBER}` : "3px solid transparent",
            }}>{t.label}</button>
        ))}
      </div>

      {/* GALVANIC SERIES */}
      {activeTab === "series" && (
        <>
          <div style={{ padding: "10px 12px 0", display: "flex", gap: 6, overflowX: "auto", scrollbarWidth: "none" }}>
            {categories.map(cat => (
              <button key={cat} onClick={() => setFilter(cat)}
                style={{
                  flexShrink: 0, padding: "4px 10px", borderRadius: 20,
                  border: `1.5px solid ${filter === cat ? NAVY : BORDER}`,
                  background: filter === cat ? NAVY : WHITE,
                  color: filter === cat ? WHITE : MUTED,
                  fontSize: 10, fontWeight: 700, cursor: "pointer", fontFamily: "inherit",
                  textTransform: "capitalize",
                }}>{cat}</button>
            ))}
          </div>
          <div style={{ margin: "10px 16px 0", background: STAR_BG, border: `1px solid ${STAR_BORDER}`, borderRadius: 10, padding: "8px 12px" }}>
            <div style={{ fontSize: 11, color: "#92400E" }}>
              <strong>Top = Noble (Cathodic, protected).</strong> Bottom = Active (Anodic, corrodes). Greater separation = greater corrosion risk.
            </div>
          </div>
          <div style={{ margin: "10px 16px 24px", background: WHITE, borderRadius: 14, overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.06)", border: `1px solid ${BORDER}` }}>
            <div style={{ display: "grid", gridTemplateColumns: "0.5fr 1.5fr 0.8fr", background: NAVY, padding: "10px 12px" }}>
              {["Rank", "Metal / Alloy", "Potential"].map(h => (
                <div key={h} style={{ color: WHITE, fontSize: 10, fontWeight: 700 }}>{h}</div>
              ))}
            </div>
            {filteredSeries.map((m, i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "0.5fr 1.5fr 0.8fr", padding: "8px 12px", background: i % 2 === 0 ? WHITE : ROW_ALT, borderBottom: `1px solid ${BORDER}`, alignItems: "center", borderLeft: `3px solid ${m.color}` }}>
                <div style={{ fontSize: 11, color: MUTED, fontWeight: 600 }}>#{m.rank}</div>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: NAVY }}>{m.metal}</div>
                  <div style={{ fontSize: 10, color: MUTED, fontFamily: "monospace" }}>{m.symbol}</div>
                </div>
                <div style={{ fontSize: 12, fontWeight: 700, color: m.color, fontFamily: "monospace" }}>{m.potential}</div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* COMPATIBILITY */}
      {activeTab === "compatibility" && (
        <div style={{ padding: "12px 16px" }}>
          <div style={{ background: STAR_BG, border: `1px solid ${STAR_BORDER}`, borderRadius: 10, padding: "8px 12px", marginBottom: 12 }}>
            <div style={{ fontSize: 11, color: "#92400E" }}>Common fastener material combinations and their galvanic corrosion risk in wet environments.</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {filteredCompat.map((item, i) => (
              <div key={i} style={{ background: WHITE, border: `1px solid ${BORDER}`, borderLeft: `4px solid ${riskColor(item.risk)}`, borderRadius: 12, padding: "12px 14px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
                  <div style={{ fontSize: 13, fontWeight: 800, color: NAVY }}>{item.a} + {item.b}</div>
                  <div style={{ background: riskColor(item.risk) + "20", border: `1px solid ${riskColor(item.risk)}`, borderRadius: 6, padding: "2px 8px", fontSize: 9, fontWeight: 800, color: riskColor(item.risk), flexShrink: 0, marginLeft: 8 }}>{riskLabel(item.risk)}</div>
                </div>
                <div style={{ fontSize: 12, color: TEXT, lineHeight: 1.5, marginBottom: 6 }}>{item.desc}</div>
                <div style={{ background: "#EEF4FF", borderRadius: 8, padding: "6px 10px" }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: NAVY, marginBottom: 2 }}>RECOMMENDATION</div>
                  <div style={{ fontSize: 11, color: TEXT }}>{item.rec}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* PREVENTION */}
      {activeTab === "prevention" && (
        <div style={{ padding: "14px 16px", display: "flex", flexDirection: "column", gap: 10 }}>
          {PREVENTION_METHODS.map((method, i) => (
            <div key={i} style={{ background: WHITE, border: `1px solid ${BORDER}`, borderLeft: `4px solid ${method.color}`, borderRadius: 12, padding: "12px 14px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
                <div style={{ fontSize: 13, fontWeight: 800, color: NAVY, flex: 1 }}>{method.method}</div>
                <div style={{ background: method.color + "20", border: `1px solid ${method.color}`, borderRadius: 6, padding: "2px 8px", fontSize: 9, fontWeight: 700, color: method.color, flexShrink: 0, marginLeft: 8 }}>{method.effectiveness}</div>
              </div>
              <div style={{ fontSize: 12, color: TEXT, lineHeight: 1.6 }}>{method.detail}</div>
            </div>
          ))}
        </div>
      )}

      {/* EXPLAINER */}
      {activeTab === "explainer" && (
        <div style={{ padding: "14px 16px", display: "flex", flexDirection: "column", gap: 10 }}>
          {[
            { title: "What is galvanic corrosion?", color: NAVY, bg: "#EEF4FF", body: "When two dissimilar metals are in electrical contact in the presence of an electrolyte (moisture, saltwater, condensation), a galvanic cell forms. Current flows from the less noble (anodic) metal to the more noble (cathodic) metal — the anodic metal dissolves (corrodes)." },
            { title: "The three requirements", color: "#DC2626", bg: "#FFF1F2", body: "Galvanic corrosion requires ALL THREE: (1) Dissimilar metals in contact, (2) Electrical connection between them, (3) Electrolyte present (moisture). Remove any one of these and galvanic corrosion stops. This is how isolation methods work." },
            { title: "Area ratio matters enormously", color: "#D97706", bg: "#FFF8E7", body: "The ratio of cathodic (noble) to anodic (active) area dramatically affects corrosion rate. Large cathode + small anode = very rapid corrosion of the small anodic part. Example: one steel bolt in a large copper sheet corrodes very quickly. One copper rivet in a large steel plate — the steel corrodes slowly." },
            { title: "Why HDG protects steel", color: "#059669", bg: "#F0FDF4", body: "Hot-dip galvanizing works by intentionally creating a galvanic couple where zinc (less noble) sacrificially corrodes to protect the steel. The zinc 'sacrifices' itself so the steel doesn't corrode. This is called cathodic protection." },
            { title: "Stainless in stainless is safe", color: "#0891B2", bg: "#F0FDFE", body: "Using 304 stainless bolts with 316 stainless structure creates minimal galvanic risk — both are close in the galvanic series. The small potential difference and the protective passive oxide layer on stainless makes this a safe combination." },
            { title: "Active vs passive stainless", color: "#7C3AED", bg: "#F5F3FF", body: "Stainless steel can be in 'passive' or 'active' state. Passive state (normal) has a protective oxide layer and is noble. Active state (damaged oxide layer, often from chlorides) is much less noble. This is why 304 SS may corrode in marine environments — chlorides break down the passive layer." },
          ].map((item, i) => (
            <div key={i} style={{ background: item.bg, border: `1px solid ${BORDER}`, borderLeft: `4px solid ${item.color}`, borderRadius: 12, padding: "12px 14px" }}>
              <div style={{ fontSize: 12, fontWeight: 800, color: item.color, marginBottom: 6 }}>{item.title}</div>
              <div style={{ fontSize: 12, color: TEXT, lineHeight: 1.6 }}>{item.body}</div>
            </div>
          ))}
        </div>
      )}

      {/* DISCLAIMER */}
      <div style={{ margin: "0 16px 24px", background: "#FFF1F2", border: "1px solid #FECDD3", borderRadius: 10, padding: "10px 14px" }}>
        <div style={{ fontSize: 10, color: "#9F1239", lineHeight: 1.5 }}>
          <strong>⚠ Verify Before Use.</strong> Galvanic series data based on MIL-STD-889C, NASA RP-1124, and NACE International references. Values are approximate — actual corrosion depends on electrolyte composition, temperature, and specific alloy. Consult a corrosion engineer for critical applications. Fastener Companion is a reference tool — not a substitute for engineering judgment.
        </div>
      </div>
    </div>
  );
}


// ════════════════════════════════════════════════════
// ThreadlockerGuide
// ════════════════════════════════════════════════════

// ─── DATA ─────────────────────────────────────────────────────────────────────
// Sources: Henkel/Loctite product technical data sheets,
// 3M threadlocker technical bulletins, Permabond engineering adhesives,
// Engineers Edge chemical applications guide, IFI technical resources

const THREADLOCKER_GRADES = [
  {
    id: "purple",
    color_name: "Purple",
    color: "#7C3AED",
    hex: "#7C3AED",
    loctite_nums: "222, 2221",
    strength: "Low Strength",
    breakaway_torque: "~2.8 Nm (25 in-lb)",
    removal: "By hand or standard tools",
    temp_range: "-65°F to 300°F (-54°C to 149°C)",
    cure_time_handling: "10 minutes",
    cure_time_full: "24 hours",
    gap_fill: "Up to 0.15mm (0.006\")",
    best_for: [
      "Small fasteners M2–M12 (under 1/4\")",
      "Delicate instruments and electronics",
      "Set screws that need periodic adjustment",
      "Applications requiring frequent disassembly",
      "Plastic or soft material fasteners",
    ],
    not_for: [
      "Fasteners larger than M12",
      "High-vibration applications requiring permanent hold",
      "High-temperature applications above 300°F",
    ],
    notes: "The gentlest threadlocker. Prevents vibration loosening while still allowing easy removal. Good for instrument panels, electronics, and any application where disassembly is frequent.",
    star: false,
  },
  {
    id: "blue",
    color_name: "Blue",
    color: "#2563EB",
    hex: "#2563EB",
    loctite_nums: "243, 242, 248",
    strength: "Medium Strength",
    breakaway_torque: "~9.5 Nm (84 in-lb)",
    removal: "Standard hand tools",
    temp_range: "-65°F to 300°F (-54°C to 149°C)",
    cure_time_handling: "10 minutes",
    cure_time_full: "24 hours",
    gap_fill: "Up to 0.15mm (0.006\")",
    best_for: [
      "General purpose — most common grade",
      "M6–M20 (1/4\"–3/4\") fasteners",
      "Maintenance, repair, and assembly",
      "Vibration-prone machinery and equipment",
      "Fasteners that may need occasional removal",
      "Most automotive and industrial applications",
    ],
    not_for: [
      "Permanent assemblies (use red)",
      "Very high temperature above 300°F",
      "Passive metals (stainless, zinc) without activator",
    ],
    notes: "The most widely used grade. 243 is the 'extended use' formula that handles contaminated or oily threads better than 242. When someone says 'blue Loctite,' this is what they mean. Standard recommendation for most industrial applications.",
    star: true,
  },
  {
    id: "red",
    color_name: "Red",
    color: "#DC2626",
    hex: "#DC2626",
    loctite_nums: "271, 262, 268",
    strength: "High Strength (Permanent)",
    breakaway_torque: "~27 Nm (239 in-lb)",
    removal: "Heat to 250°C (482°F) then remove while hot",
    temp_range: "-65°F to 300°F (-54°C to 149°C)",
    cure_time_handling: "10 minutes",
    cure_time_full: "24 hours",
    gap_fill: "Up to 0.15mm (0.006\")",
    best_for: [
      "Permanent assemblies not intended for disassembly",
      "Large fasteners M20+ (3/4\" and larger)",
      "Studs and anchors",
      "High-vibration applications requiring maximum retention",
      "Press fits and cylindrical assemblies",
    ],
    not_for: [
      "Fasteners that need to be removed for maintenance",
      "Plastic substrates (may crack)",
      "Very small fasteners — use purple or blue",
    ],
    notes: "Permanent grade — requires heat for removal. Consider carefully before using: once cured, removal without heat is very difficult and may damage the fastener or mating threads. Reserve for truly permanent assemblies.",
    star: true,
  },
  {
    id: "green",
    color_name: "Green",
    color: "#059669",
    hex: "#059669",
    loctite_nums: "290",
    strength: "Medium-High (Wicking Grade)",
    breakaway_torque: "~9.5 Nm (84 in-lb)",
    removal: "Standard hand tools",
    temp_range: "-65°F to 300°F (-54°C to 149°C)",
    cure_time_handling: "15 minutes",
    cure_time_full: "24 hours",
    gap_fill: "Wicks into assembled joints — very low viscosity",
    best_for: [
      "Already-assembled fasteners that need threadlocking",
      "Fasteners in tight spaces where pre-application is difficult",
      "Capillary action applications — applies to assembled joint",
      "Fine threads where low viscosity is needed",
    ],
    not_for: [
      "New assemblies (use blue or red)",
      "Vertical surfaces where it may run before curing",
      "Large gaps — green is very low viscosity",
    ],
    notes: "The wicking grade — unique because it's applied AFTER assembly. Capillary action draws it into the thread gap. Valuable when fasteners are already installed and you need to add threadlocker without disassembly.",
    star: false,
  },
  {
    id: "orange",
    color_name: "Orange / Silver",
    color: "#D97706",
    hex: "#D97706",
    loctite_nums: "2400, 2700",
    strength: "Medium / High (Dry-to-Touch)",
    breakaway_torque: "Medium (2400) / High (2700)",
    removal: "Standard tools (2400) / Heat required (2700)",
    temp_range: "-65°F to 250°F (-54°C to 121°C)",
    cure_time_handling: "Dry to touch in minutes",
    cure_time_full: "24 hours",
    gap_fill: "Up to 0.15mm",
    best_for: [
      "Pre-applied (factory) applications",
      "Parts that need handling before assembly",
      "Production line applications",
      "Fasteners shipped with adhesive pre-applied",
    ],
    not_for: [
      "General maintenance use — use standard blue or red",
      "High temperature above 250°F",
    ],
    notes: "Dry-to-touch formula — remains inactive until compressed between threads. Useful for production environments where fasteners are pre-coated and then stored before assembly.",
    star: false,
  },
];

const APPLICATION_GUIDE = [
  {
    scenario: "General machinery maintenance",
    recommendation: "Blue (243)",
    reason: "Removable for maintenance, sufficient for vibration resistance",
  },
  {
    scenario: "Small fasteners (under 1/4\" / M6)",
    recommendation: "Purple (222)",
    reason: "Lower strength matches small fastener torque capacity",
  },
  {
    scenario: "Permanent stud installation",
    recommendation: "Red (271)",
    reason: "Maximum retention, no planned disassembly",
  },
  {
    scenario: "Pipe fittings / NPT threads",
    recommendation: "Pipe sealant (567 or Teflon tape)",
    reason: "Threadlocker is not a pipe sealant — use correct product",
  },
  {
    scenario: "Already-assembled loose fasteners",
    recommendation: "Green (290)",
    reason: "Wicks into assembled joint without disassembly",
  },
  {
    scenario: "High-vibration (>0.5G) applications",
    recommendation: "Red (271) or Blue + mechanical locking",
    reason: "Blue alone may be insufficient for severe vibration",
  },
  {
    scenario: "Stainless steel fasteners",
    recommendation: "Blue (243) + activator (7649)",
    reason: "Passive oxide layer on stainless inhibits cure — activator required",
  },
  {
    scenario: "Zinc-plated fasteners",
    recommendation: "Blue (243) + activator (7649)",
    reason: "Zinc inhibits anaerobic cure — activator ensures proper cure",
  },
  {
    scenario: "Plastics",
    recommendation: "Blue (243) or specialty grade",
    reason: "Red may stress-crack some plastics. Test first.",
  },
  {
    scenario: "Temperatures above 300°F (149°C)",
    recommendation: "High-temp grade (2620) or mechanical locking",
    reason: "Standard threadlockers lose strength above 300°F",
  },
];

const REMOVAL_GUIDE = [
  { grade: "Purple", method: "Standard hand tools — wrench or screwdriver", heat_needed: false },
  { grade: "Blue", method: "Standard hand tools — wrench or socket", heat_needed: false },
  { grade: "Green", method: "Standard hand tools", heat_needed: false },
  { grade: "Red", method: "Heat to 482°F (250°C), remove while hot. Use heat gun or torch.", heat_needed: true },
  { grade: "Any (when stuck)", method: "Apply heat to 482°F → attempt removal → reapply heat if needed. Impact wrench can help break cure.", heat_needed: true },
];

export default function ThreadlockerGuide() {
  const [activeTab, setActiveTab] = useState("grades");
  const [selected, setSelected] = useState(null);

  const selectedGrade = selected ? THREADLOCKER_GRADES.find(g => g.id === selected) : null;

  return (
    <div style={{ fontFamily: "'DM Sans','Segoe UI',sans-serif", background: BG, minHeight: "100vh", maxWidth: 430, margin: "0 auto" }}>

      {/* HEADER */}
      <div style={{ background: `linear-gradient(135deg, ${NAVY} 0%, #2C5282 100%)`, padding: "16px 20px 20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
          <span style={{ fontSize: 20 }}>⬡</span>
          <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 10, letterSpacing: 2, textTransform: "uppercase" }}>Fastener Companion</span>
        </div>
        <div style={{ color: WHITE, fontSize: 20, fontWeight: 800, marginBottom: 2 }}>Threadlocker Guide</div>
        <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 11 }}>Henkel/Loctite TDS · 3M Technical Bulletins · Permabond · IFI Technical Resources</div>
      </div>

      {/* TABS */}
      <div style={{ background: WHITE, borderBottom: `1px solid ${BORDER}`, padding: "0 8px", display: "flex", overflowX: "auto", scrollbarWidth: "none" }}>
        {[
          { id: "grades", label: "Grade Guide" },
          { id: "application", label: "Which Grade?" },
          { id: "removal", label: "Removal" },
          { id: "tips", label: "Field Tips" },
        ].map(t => (
          <button key={t.id} onClick={() => { setActiveTab(t.id); setSelected(null); }}
            style={{
              background: "none", border: "none", cursor: "pointer", padding: "11px 10px",
              fontSize: 11, fontWeight: 700, fontFamily: "inherit", whiteSpace: "nowrap",
              color: activeTab === t.id ? NAVY : MUTED,
              borderBottom: activeTab === t.id ? `3px solid ${AMBER}` : "3px solid transparent",
            }}>{t.label}</button>
        ))}
      </div>

      {/* GRADE GUIDE */}
      {activeTab === "grades" && !selectedGrade && (
        <div style={{ padding: "12px 16px", display: "flex", flexDirection: "column", gap: 10 }}>
          <div style={{ background: "#EEF4FF", border: `1px solid ${BORDER}`, borderRadius: 10, padding: "10px 14px", marginBottom: 4 }}>
            <div style={{ fontSize: 11, color: NAVY, lineHeight: 1.5 }}>
              Threadlockers are anaerobic adhesives — they cure in the absence of air when confined between metal surfaces. Color indicates strength. Always confirm with product data sheet for critical applications.
            </div>
          </div>
          {THREADLOCKER_GRADES.map(grade => (
            <div key={grade.id} onClick={() => setSelected(grade.id)}
              style={{
                background: grade.star ? STAR_BG : WHITE,
                border: `1px solid ${BORDER}`,
                borderLeft: `4px solid ${grade.hex}`,
                borderRadius: 12, padding: "14px", cursor: "pointer",
                boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
              }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 28, height: 28, borderRadius: "50%", background: grade.hex, flexShrink: 0 }} />
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      {grade.star && <span style={{ color: AMBER, fontSize: 11 }}>★</span>}
                      <span style={{ fontSize: 14, fontWeight: 800, color: NAVY }}>{grade.color_name}</span>
                    </div>
                    <div style={{ fontSize: 11, color: MUTED }}>Loctite {grade.loctite_nums}</div>
                  </div>
                </div>
                <div style={{ background: grade.hex + "20", border: `1px solid ${grade.hex}`, borderRadius: 8, padding: "4px 10px", fontSize: 11, fontWeight: 700, color: grade.hex }}>{grade.strength}</div>
              </div>
              <div style={{ fontSize: 12, color: TEXT, lineHeight: 1.5, marginBottom: 6 }}>{grade.notes}</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
                <div style={{ background: "#F1F5F9", borderRadius: 6, padding: "6px 8px" }}>
                  <div style={{ fontSize: 9, color: MUTED, textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 1 }}>Breakaway Torque</div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: TEXT }}>{grade.breakaway_torque}</div>
                </div>
                <div style={{ background: "#F1F5F9", borderRadius: 6, padding: "6px 8px" }}>
                  <div style={{ fontSize: 9, color: MUTED, textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 1 }}>Removal</div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: TEXT }}>{grade.removal.split(" ")[0]}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* GRADE DETAIL */}
      {activeTab === "grades" && selectedGrade && (
        <div style={{ padding: "14px 16px" }}>
          <button onClick={() => setSelected(null)}
            style={{ background: "none", border: "none", cursor: "pointer", color: NAVY, fontSize: 13, fontWeight: 700, fontFamily: "inherit", marginBottom: 14, display: "flex", alignItems: "center", gap: 6, padding: 0 }}>
            ← Back
          </button>
          <div style={{ background: WHITE, border: `1px solid ${BORDER}`, borderLeft: `4px solid ${selectedGrade.hex}`, borderRadius: 12, padding: "14px", marginBottom: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
              <div style={{ width: 40, height: 40, borderRadius: "50%", background: selectedGrade.hex }} />
              <div>
                <div style={{ fontSize: 18, fontWeight: 800, color: NAVY }}>{selectedGrade.color_name} — {selectedGrade.strength}</div>
                <div style={{ fontSize: 12, color: MUTED }}>Loctite {selectedGrade.loctite_nums}</div>
              </div>
            </div>
            <div style={{ fontSize: 12, color: TEXT, lineHeight: 1.6 }}>{selectedGrade.notes}</div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 12 }}>
            {[
              { label: "Breakaway Torque", value: selectedGrade.breakaway_torque },
              { label: "Removal Method", value: selectedGrade.removal },
              { label: "Temp Range", value: selectedGrade.temp_range },
              { label: "Handling Time", value: selectedGrade.cure_time_handling },
              { label: "Full Cure", value: selectedGrade.cure_time_full },
              { label: "Gap Fill", value: selectedGrade.gap_fill },
            ].map((item, i) => (
              <div key={i} style={{ background: ROW_ALT, borderRadius: 8, padding: "8px 10px", border: `1px solid ${BORDER}` }}>
                <div style={{ fontSize: 9, color: MUTED, textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 2 }}>{item.label}</div>
                <div style={{ fontSize: 11, fontWeight: 700, color: TEXT, lineHeight: 1.3 }}>{item.value}</div>
              </div>
            ))}
          </div>

          <div style={{ background: "#F0FDF4", border: `1px solid #BBF7D0`, borderRadius: 12, overflow: "hidden", marginBottom: 10 }}>
            <div style={{ background: "#059669", padding: "8px 14px" }}>
              <div style={{ color: WHITE, fontSize: 11, fontWeight: 700 }}>✓ Best Used For</div>
            </div>
            {selectedGrade.best_for.map((item, i) => (
              <div key={i} style={{ padding: "8px 14px", borderBottom: `1px solid #BBF7D0`, background: i % 2 === 0 ? WHITE : "#F0FDF4", display: "flex", gap: 8 }}>
                <span style={{ color: "#059669", flexShrink: 0 }}>✓</span>
                <div style={{ fontSize: 12, color: TEXT }}>{item}</div>
              </div>
            ))}
          </div>

          <div style={{ background: "#FFF1F2", border: `1px solid #FECDD3`, borderRadius: 12, overflow: "hidden", marginBottom: 14 }}>
            <div style={{ background: "#DC2626", padding: "8px 14px" }}>
              <div style={{ color: WHITE, fontSize: 11, fontWeight: 700 }}>✗ Not Suitable For</div>
            </div>
            {selectedGrade.not_for.map((item, i) => (
              <div key={i} style={{ padding: "8px 14px", borderBottom: `1px solid #FECDD3`, background: i % 2 === 0 ? WHITE : "#FFF5F5", display: "flex", gap: 8 }}>
                <span style={{ color: "#DC2626", flexShrink: 0 }}>✗</span>
                <div style={{ fontSize: 12, color: TEXT }}>{item}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* APPLICATION GUIDE */}
      {activeTab === "application" && (
        <div style={{ padding: "14px 16px" }}>
          <div style={{ background: WHITE, borderRadius: 14, overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.06)", border: `1px solid ${BORDER}` }}>
            <div style={{ background: NAVY, padding: "10px 14px" }}>
              <div style={{ color: WHITE, fontSize: 12, fontWeight: 700 }}>Which Grade for My Application?</div>
            </div>
            {APPLICATION_GUIDE.map((item, i) => (
              <div key={i} style={{ padding: "12px 14px", borderBottom: `1px solid ${BORDER}`, background: i % 2 === 0 ? WHITE : ROW_ALT }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: NAVY, marginBottom: 4 }}>{item.scenario}</div>
                <div style={{ display: "inline-block", background: "#EEF4FF", border: `1px solid ${NAVY}`, borderRadius: 6, padding: "2px 10px", fontSize: 11, fontWeight: 800, color: NAVY, marginBottom: 6 }}>→ {item.recommendation}</div>
                <div style={{ fontSize: 11, color: MUTED }}>{item.reason}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* REMOVAL */}
      {activeTab === "removal" && (
        <div style={{ padding: "14px 16px" }}>
          <div style={{ background: STAR_BG, border: `1px solid ${STAR_BORDER}`, borderRadius: 10, padding: "10px 14px", marginBottom: 12 }}>
            <div style={{ fontSize: 11, color: "#92400E", lineHeight: 1.5 }}>
              Red threadlocker requires heat for removal. Apply heat gun or torch to the fastener head/nut until you reach 250°C (482°F), then attempt removal while still hot. Do NOT force a cold red-locked fastener — you will break it.
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {REMOVAL_GUIDE.map((item, i) => (
              <div key={i} style={{ background: item.heat_needed ? "#FFF1F2" : WHITE, border: `1px solid ${item.heat_needed ? "#FECDD3" : BORDER}`, borderLeft: `4px solid ${item.heat_needed ? "#DC2626" : "#059669"}`, borderRadius: 12, padding: "12px 14px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                  <div style={{ fontSize: 13, fontWeight: 800, color: NAVY }}>{item.grade}</div>
                  {item.heat_needed && <div style={{ background: "#FFF1F2", border: "1px solid #FECDD3", borderRadius: 6, padding: "2px 8px", fontSize: 10, fontWeight: 700, color: "#DC2626" }}>?? HEAT REQUIRED</div>}
                </div>
                <div style={{ fontSize: 12, color: TEXT, lineHeight: 1.5 }}>{item.method}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* FIELD TIPS */}
      {activeTab === "tips" && (
        <div style={{ padding: "14px 16px", display: "flex", flexDirection: "column", gap: 10 }}>
          {[
            { title: "Threadlocker ≠ thread sealant", color: "#DC2626", bg: "#FFF1F2", body: "Threadlocker prevents loosening. Thread sealant seals against fluid/gas leakage. They are different products. Loctite 567 and 565 are thread sealants for pipe threads (NPT). Standard blue/red Loctite is NOT a pipe sealant." },
            { title: "Surface preparation matters", color: NAVY, bg: "#EEF4FF", body: "Clean, dry threads cure faster and stronger. Degrease with acetone or isopropyl alcohol. Oil, grease, and contamination slow cure and reduce bond strength. Allow surfaces to dry completely before applying." },
            { title: "Stainless and zinc need activator", color: "#D97706", bg: "#FFF8E7", body: "Passive oxide layers on stainless steel and zinc platings inhibit anaerobic cure. Apply Loctite 7649 activator to the female thread before applying threadlocker to ensure proper cure. Without activator, cure may be slow or incomplete." },
            { title: "Temperature affects cure time", color: "#059669", bg: "#F0FDF4", body: "Cold slows cure: at 50°F (10°C), full cure can take 72+ hours. Warm environments speed cure. For urgent applications at low temperatures, use a heat gun to warm the assembly (not hot — just warm, ~100°F/38°C) to accelerate cure." },
            { title: "Don't over-apply", color: "#7C3AED", bg: "#F5F3FF", body: "2–3 drops on male threads is sufficient. Excess threadlocker gets displaced and creates contamination. Excess on flange faces can affect sealing. Apply to the first engaged threads — not the lead threads which won't be covered." },
            { title: "Prevailing torque nuts vs threadlocker", color: "#64748B", bg: "#F8FAFC", body: "Threadlocker and nyloc prevailing torque nuts both prevent loosening but work differently. Don't combine them — the chemistry of threadlocker may interact with nylon and affect the nyloc nut's effectiveness." },
          ].map((tip, i) => (
            <div key={i} style={{ background: tip.bg, border: `1px solid ${BORDER}`, borderLeft: `4px solid ${tip.color}`, borderRadius: 12, padding: "12px 14px" }}>
              <div style={{ fontSize: 12, fontWeight: 800, color: tip.color, marginBottom: 6 }}>{tip.title}</div>
              <div style={{ fontSize: 12, color: TEXT, lineHeight: 1.6 }}>{tip.body}</div>
            </div>
          ))}
        </div>
      )}

      {/* DISCLAIMER */}
      <div style={{ margin: "0 16px 24px", background: "#FFF1F2", border: "1px solid #FECDD3", borderRadius: 10, padding: "10px 14px" }}>
        <div style={{ fontSize: 10, color: "#9F1239", lineHeight: 1.5 }}>
          <strong>⚠ Verify Before Use.</strong> Product data based on Henkel/Loctite technical data sheets. Always consult current manufacturer TDS for critical applications. Cure times and strength values are approximate. Fastener Companion is a reference tool — not a substitute for engineering judgment.
        </div>
      </div>
    </div>
  );
}
