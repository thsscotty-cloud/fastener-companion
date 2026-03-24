/**
 * FASTENER COMPANION — Batch 01: Quick Access Components (1–9)
 * 
 * Named exports ready for import into the main app:
 *   import { NavigationShell } from './batch-01-quick-access'
 *   import { TapDrillChart } from './batch-01-quick-access'
 *   import { TorqueChart } from './batch-01-quick-access'
 *   import { ThreadPitchChart } from './batch-01-quick-access'
 *   import { GradeMarkings } from './batch-01-quick-access'
 *   import { DecimalEquivalent } from './batch-01-quick-access'
 *   import { WrenchSocket } from './batch-01-quick-access'
 *   import { Converter } from './batch-01-quick-access'
 *   import { HowToMeasure } from './batch-01-quick-access'
 *
 * Design system: Navy #1B3A6B · Amber #F6AD55 · DM Sans · 430px mobile-first
 * Sources: SAE J429 · ASTM · ISO 898-1 · ASME B1.1 · ISO 261/262 · ANSI/ASME B94.11M
 * All components: navy gradient header · amber tabs · ★ common sizes · ⚠ disclaimer
 */

import { useState } from "react";

// ─── SHARED DESIGN TOKENS ────────────────────────────────────────────────────
const NAVY    = "#1B3A6B";
const AMBER   = "#F6AD55";
const BG      = "#F7F9FC";
const WHITE   = "#FFFFFF";
const BORDER  = "#E2E8F0";
const TEXT    = "#1E293B";
const MUTED   = "#94A3B8";
const ROW_ALT = "#F8FAFC";
const STAR_BG     = "#FFF8E7";
const STAR_BORDER = "#FDE68A";

// ─────────────────────────────────────────────────────────────────────────────
// 1. NAVIGATION SHELL
// ─────────────────────────────────────────────────────────────────────────────

const CATEGORIES = [
  { icon: "🔍", label: "Identify",     sub: "Lookup & Substitute" },
  { icon: "📐", label: "Dimensions",   sub: "Bolts, Nuts, Washers" },
  { icon: "🔩", label: "Threads",      sub: "Pitch, Tap & Drill" },
  { icon: "💪", label: "Strength",     sub: "Grade & Load Data" },
  { icon: "🔧", label: "Torque",       sub: "Charts & Sequences" },
  { icon: "📋", label: "Standards",    sub: "ASTM, ISO, DIN & More" },
  { icon: "🧪", label: "Materials",    sub: "Coatings & Compatibility" },
  { icon: "🛠️", label: "Tools",        sub: "Calculators & Exports" },
  { icon: "⚠️", label: "Troubleshoot", sub: "Failure & Installation" },
  { icon: "📖", label: "Reference",    sub: "Glossary & Guides" },
];

const QUICK_ACCESS = [
  "Tap & Drill", "Torque Chart", "Thread Pitch",
  "Grade Markings", "Decimal Equiv.", "Wrench Sizes",
  "Converter", "UNC/UNF", "Drill Bits"
];

const RECENTS = [
  { label: "Torque Chart — Grade 8",     icon: "🔧", time: "2m ago" },
  { label: "M10 x 1.5 Tap Drill Size",  icon: "🔩", time: "1h ago" },
  { label: "ASTM A325 vs A490",         icon: "📋", time: "3h ago" },
  { label: "JIS → ASTM Substitution",   icon: "🔍", time: "Yesterday" },
];

const NAV_ITEMS = [
  { icon: "⊞", label: "Home" },
  { icon: "◎", label: "Search" },
  { icon: "★", label: "Saved" },
  { icon: "◉", label: "Account" },
];


// ─────────────────────────────────────────────────────────────────────────────
// 9. HOW TO MEASURE FASTENERS
// Sources: ASME B18.2.1, ASME B18.2.3.1M, ASME B1.1, ISO 68-1
// ─────────────────────────────────────────────────────────────────────────────

const MEASURE_TYPES = [
  {
    id: "diameter", label: "Diameter", icon: "⊙", color: "#2563EB", bg: "#EFF6FF",
    title: "How to Measure Bolt/Screw Diameter",
    standard: "ASME B18.2.1 · ISO 272",
    steps: [
      { step: "1. Identify nominal vs actual diameter", detail: "Nominal diameter is the reference size used for ordering (e.g. 1/2\"). Actual measured diameter will be slightly less — a 1/2\" bolt typically measures 0.490\"–0.498\". This is normal per ASME B18.2.1 tolerances.", warning: false },
      { step: "2. Use calipers or a bolt gauge", detail: "Measure the SHANK (unthreaded body) with digital calipers or a bolt gauge. Do not measure across thread crests — this gives an inflated reading. Measure at least 2–3 locations and take the average.", warning: false },
      { step: "3. Measure across thread crests only if no shank", detail: "If the bolt is threaded full length, measure the major diameter (across outside of threads). Add a small allowance for thread crests at maximum material condition.", warning: false },
    ],
    tips: [
      { label: "Common mistake",    text: "Measuring across thread crests gives major diameter, not nominal. Always measure the smooth shank when possible.", type: "warning" },
      { label: "Bolt gauge",        text: "A bolt gauge (go/no-go) is the fastest field method. Slot the bolt through until it drops cleanly — that's your nominal size.", type: "tip" },
      { label: "Metric ID",         text: "M-sizes are measured in mm. M10 = 10mm nominal diameter. Actual measurement will be 9.97–10.00mm.", type: "info" },
    ],
  },
  {
    id: "length", label: "Length", icon: "↕", color: "#DC2626", bg: "#FFF1F2",
    title: "How to Measure Bolt/Screw Length",
    standard: "ASME B18.2.1 · ASME B18.2.3.1M",
    steps: [
      { step: "1. Length measurement varies by head type", detail: "The rule: length is measured from the bearing surface of the head (where it contacts the joint) to the tip. For most heads this is the underside. For flat/countersunk heads it is the TOP of the head.", warning: true },
      { step: "2. Hex head, pan head, round head, truss head", detail: "Measure from the underside of the head (bearing surface) to the tip. The head height is NOT included in the length.", warning: false },
      { step: "3. Flat head / countersunk head", detail: "Measure from the TOP of the head to the tip. The entire head IS included in the length because a flat head sits flush with the surface.", warning: false },
    ],
    tips: [
      { label: "Most common mistake", text: "Ordering a flat head screw with the head height NOT included. Flat head length ALWAYS includes the head.", type: "warning" },
      { label: "Thread length (imperial)", text: "For L ≤ 6\": Thread = (2 × D) + 0.25\". For L > 6\": Thread = (2 × D) + 0.50\". Per ASME B18.2.1.", type: "info" },
      { label: "Thread length (metric)", text: "For L ≤ 125mm: Thread = (2 × D) + 6mm. For L > 125mm: Thread = (2 × D) + 12mm. Per ASME B18.2.3.1M.", type: "info" },
    ],
    headTypes: [
      { head: "Hex / Heavy Hex",     measure: "Underside of head to tip", includesHead: "No" },
      { head: "Pan / Round / Truss", measure: "Underside of head to tip", includesHead: "No" },
      { head: "Flat / Countersunk",  measure: "Top of head to tip",       includesHead: "Yes" },
      { head: "Socket Head Cap",     measure: "Underside of head to tip", includesHead: "No" },
      { head: "Button Head",         measure: "Underside of head to tip", includesHead: "No" },
      { head: "Carriage Bolt",       measure: "Underside of head to tip", includesHead: "No" },
      { head: "Set Screw",           measure: "Full length (no head)",    includesHead: "N/A" },
    ],
  },
  {
    id: "thread", label: "Thread Pitch", icon: "〰", color: "#059669", bg: "#F0FDF4",
    title: "How to Measure Thread Pitch",
    standard: "ASME B1.1 · ISO 68-1",
    steps: [
      { step: "1. Use a thread pitch gauge — fastest method", detail: "Lay the teeth of the gauge along the threads. Try different blade sizes until the teeth seat flush with no rocking. The number on the blade is your pitch (mm) or TPI (imperial).", warning: false },
      { step: "2. Count threads per inch — manual method", detail: "Place a ruler along the bolt threads. Count the number of thread crests within exactly 1 inch. That number is your TPI. Count peaks, not valleys.", warning: false },
      { step: "3. Confirm metric vs imperial", detail: "Metric and imperial threads look similar but are NOT interchangeable. Use a pitch gauge to confirm. If neither system fits, the thread may be damaged, unusual pitch, or non-standard.", warning: true },
    ],
    tips: [
      { label: "Never mix metric and imperial", text: "A 3/8\"-16 UNC bolt and an M10 × 1.5 bolt are close in diameter but completely different threads. Forcing mismatched threads strips the mating part instantly.", type: "warning" },
      { label: "Conversion",                   text: "TPI to mm: divide 25.4 by TPI. mm to TPI: divide 25.4 by pitch. Example: 20 TPI = 25.4÷20 = 1.27mm pitch.", type: "info" },
    ],
  },
];

const MEASURING_TOOLS = [
  { name: "Digital Calipers",          use: "Most versatile. Measures diameter, length, head height, WAF. Essential for any serious fastener work.", accuracy: "±0.001\" / ±0.02mm", cost: "$15–$200", star: true },
  { name: "Bolt/Fastener Gauge",        use: "Quick go/no-go size ID. Slotted gauge — drop bolt through slots to find nominal diameter. Fastest field method.", accuracy: "Nominal size only", cost: "$10–$30", star: true },
  { name: "Thread Pitch Gauge (Comb)", use: "Identifies thread pitch or TPI. Fan of blades. Lay against threads until flush.", accuracy: "Identifies standard pitches", cost: "$8–$25", star: true },
  { name: "Micrometer",                use: "Precision diameter measurement. More accurate than calipers for critical applications.", accuracy: '±0.0001"', cost: "$30–$300+", star: false },
  { name: "Ruler / Tape Measure",      use: "Rough length measurement ONLY. NOT suitable for diameter, thread pitch, or head dimensions.", accuracy: "±1/16\" at best", cost: "$1–$20", star: false },
];

export default function HowToMeasure() {
  const [activeType, setActiveType]       = useState("diameter");
  const [activeSection, setActiveSection] = useState("steps");

  const current = MEASURE_TYPES.find(t => t.id === activeType);

  return (
    <div style={{ fontFamily: "'DM Sans','Segoe UI',sans-serif", background: BG, minHeight: "100vh", maxWidth: 430, margin: "0 auto" }}>
      <div style={{ background: `linear-gradient(135deg, ${NAVY} 0%, #2C5282 100%)`, padding: "16px 20px 20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
          <span style={{ fontSize: 20 }}>⬡</span>
          <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 10, letterSpacing: 2, textTransform: "uppercase" }}>Fastener Companion</span>
        </div>
        <div style={{ color: WHITE, fontSize: 20, fontWeight: 800, marginBottom: 2 }}>How to Measure Fasteners</div>
        <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 11 }}>ASME B18.2.1 · ASME B18.2.3.1M · ASME B1.1 · ISO 68-1</div>
      </div>

      <div style={{ background: WHITE, borderBottom: `1px solid ${BORDER}`, padding: "0 8px", display: "flex", overflowX: "auto", scrollbarWidth: "none" }}>
        {[...MEASURE_TYPES, { id: "tools", label: "Tools", icon: "🔬", color: "#D97706", bg: STAR_BG }].map(t => (
          <button key={t.id} onClick={() => { setActiveType(t.id); setActiveSection("steps"); }}
            style={{ background: "none", border: "none", cursor: "pointer", padding: "12px 12px", fontSize: 12, fontWeight: 700, fontFamily: "inherit", whiteSpace: "nowrap", flexShrink: 0, color: activeType === t.id ? NAVY : MUTED, borderBottom: activeType === t.id ? `3px solid ${AMBER}` : "3px solid transparent", display: "flex", alignItems: "center", gap: 6 }}>
            <span>{t.icon}</span> {t.label}
          </button>
        ))}
      </div>

      <div style={{ padding: "14px 16px" }}>
        {activeType === "tools" ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {MEASURING_TOOLS.map((tool, i) => (
              <div key={i} style={{ background: tool.star ? STAR_BG : WHITE, border: `1px solid ${BORDER}`, borderLeft: tool.star ? `4px solid ${AMBER}` : `4px solid ${BORDER}`, borderRadius: 12, padding: "12px 14px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    {tool.star && <span style={{ color: AMBER, fontSize: 11 }}>★</span>}
                    <span style={{ fontSize: 13, fontWeight: 800, color: NAVY }}>{tool.name}</span>
                  </div>
                  <span style={{ fontSize: 11, color: "#D97706", fontWeight: 700, background: STAR_BG, padding: "2px 8px", borderRadius: 6 }}>{tool.cost}</span>
                </div>
                <div style={{ fontSize: 12, color: TEXT, marginBottom: 4, lineHeight: 1.5 }}>{tool.use}</div>
                <div style={{ fontSize: 11, color: MUTED }}>Accuracy: {tool.accuracy}</div>
              </div>
            ))}
          </div>
        ) : current ? (
          <>
            <div style={{ background: current.bg, border: `1px solid ${BORDER}`, borderLeft: `4px solid ${current.color}`, borderRadius: 12, padding: "12px 14px", marginBottom: 14 }}>
              <div style={{ fontSize: 14, fontWeight: 800, color: current.color, marginBottom: 2 }}>{current.title}</div>
              <div style={{ fontSize: 11, color: MUTED }}>{current.standard}</div>
            </div>

            <div style={{ display: "flex", gap: 4, background: "#EEF2F7", borderRadius: 10, padding: 3, marginBottom: 14 }}>
              {["steps", "tips", activeType === "length" ? "heads" : ""].filter(Boolean).map(s => (
                <button key={s} onClick={() => setActiveSection(s)}
                  style={{ flex: 1, padding: "7px 0", borderRadius: 8, border: "none", cursor: "pointer", fontSize: 11, fontWeight: 700, fontFamily: "inherit", background: activeSection === s ? WHITE : "transparent", color: activeSection === s ? NAVY : MUTED, boxShadow: activeSection === s ? "0 1px 4px rgba(0,0,0,0.1)" : "none" }}>
                  {s === "steps" ? "How To" : s === "tips" ? "Tips & Notes" : "Head Types"}
                </button>
              ))}
            </div>

            {activeSection === "steps" && (
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {current.steps.map((s, i) => (
                  <div key={i} style={{ background: s.warning ? "#FFF1F2" : WHITE, border: `1px solid ${BORDER}`, borderLeft: `4px solid ${s.warning ? "#DC2626" : current.color}`, borderRadius: 12, padding: "12px 14px" }}>
                    <div style={{ fontSize: 12, fontWeight: 800, color: s.warning ? "#DC2626" : current.color, marginBottom: 6 }}>{s.step}</div>
                    <div style={{ fontSize: 12, color: TEXT, lineHeight: 1.6 }}>{s.detail}</div>
                  </div>
                ))}
              </div>
            )}

            {activeSection === "tips" && (
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {current.tips.map((tip, i) => (
                  <div key={i} style={{ background: tip.type === "warning" ? "#FFF1F2" : tip.type === "info" ? "#EFF6FF" : STAR_BG, border: `1px solid ${BORDER}`, borderLeft: `4px solid ${tip.type === "warning" ? "#DC2626" : tip.type === "info" ? "#2563EB" : AMBER}`, borderRadius: 12, padding: "12px 14px" }}>
                    <div style={{ fontSize: 11, fontWeight: 800, color: tip.type === "warning" ? "#DC2626" : tip.type === "info" ? "#2563EB" : "#92400E", marginBottom: 4, textTransform: "uppercase", letterSpacing: 0.5 }}>{tip.label}</div>
                    <div style={{ fontSize: 12, color: TEXT, lineHeight: 1.5 }}>{tip.text}</div>
                  </div>
                ))}
              </div>
            )}

            {activeSection === "heads" && current.headTypes && (
              <div style={{ background: WHITE, borderRadius: 14, overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.06)", border: `1px solid ${BORDER}` }}>
                <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1.5fr 0.8fr", background: NAVY, padding: "10px 12px" }}>
                  {["Head Type", "Measure From", "Head Included?"].map(h => (
                    <div key={h} style={{ color: WHITE, fontSize: 10, fontWeight: 700 }}>{h}</div>
                  ))}
                </div>
                {current.headTypes.map((row, i) => (
                  <div key={i} style={{ display: "grid", gridTemplateColumns: "1.2fr 1.5fr 0.8fr", padding: "9px 12px", background: i % 2 === 0 ? WHITE : ROW_ALT, borderBottom: `1px solid ${BORDER}`, alignItems: "center" }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: NAVY }}>{row.head}</div>
                    <div style={{ fontSize: 11, color: TEXT }}>{row.measure}</div>
                    <div style={{ fontSize: 11, fontWeight: 700, color: row.includesHead === "Yes" ? "#DC2626" : row.includesHead === "No" ? "#059669" : "#D97706" }}>{row.includesHead}</div>
                  </div>
                ))}
              </div>
            )}
          </>
        ) : null}
      </div>

      <div style={{ margin: "0 16px 24px", background: "#FFF1F2", border: "1px solid #FECDD3", borderRadius: 10, padding: "10px 14px" }}>
        <div style={{ fontSize: 10, color: "#9F1239", lineHeight: 1.5 }}>
          <strong>⚠ Verify Before Use.</strong> Measurement guidance based on ASME B18.2.1, ASME B18.2.3.1M, and ASME B1.1. Use calibrated instruments for critical applications. Fastener Companion is a reference tool.
        </div>
      </div>
    </div>
  );
}
