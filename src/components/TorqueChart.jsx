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
// 3. TORQUE CHART
// Sources: SAE J429, ASTM A307/A325/A354/A490, ISO 898-1, IFI 7th Ed.
// T = K × D × F — 75% proof load, K=0.20 dry / K=0.15 lubricated
// ─────────────────────────────────────────────────────────────────────────────

const SAE_TORQUE = [
  // Grade 2
  { size: '1/4"-20',   grade: "2", dryFtLb: 6,    lubFtLb: 5,    dryNm: 8,    lubNm: 6,    note: "★" },
  { size: '5/16"-18',  grade: "2", dryFtLb: 11,   lubFtLb: 9,    dryNm: 15,   lubNm: 12,   note: "★" },
  { size: '3/8"-16',   grade: "2", dryFtLb: 20,   lubFtLb: 15,   dryNm: 27,   lubNm: 20,   note: "★" },
  { size: '7/16"-14',  grade: "2", dryFtLb: 30,   lubFtLb: 25,   dryNm: 41,   lubNm: 34,   note: "" },
  { size: '1/2"-13',   grade: "2", dryFtLb: 45,   lubFtLb: 35,   dryNm: 61,   lubNm: 47,   note: "★" },
  { size: '9/16"-12',  grade: "2", dryFtLb: 65,   lubFtLb: 50,   dryNm: 88,   lubNm: 68,   note: "" },
  { size: '5/8"-11',   grade: "2", dryFtLb: 90,   lubFtLb: 70,   dryNm: 122,  lubNm: 95,   note: "" },
  { size: '3/4"-10',   grade: "2", dryFtLb: 150,  lubFtLb: 120,  dryNm: 203,  lubNm: 163,  note: "" },
  // Grade 5
  { size: '1/4"-20',   grade: "5", dryFtLb: 8,    lubFtLb: 6,    dryNm: 11,   lubNm: 8,    note: "★" },
  { size: '5/16"-18',  grade: "5", dryFtLb: 17,   lubFtLb: 13,   dryNm: 23,   lubNm: 18,   note: "★" },
  { size: '3/8"-16',   grade: "5", dryFtLb: 31,   lubFtLb: 23,   dryNm: 42,   lubNm: 31,   note: "★" },
  { size: '7/16"-14',  grade: "5", dryFtLb: 49,   lubFtLb: 37,   dryNm: 66,   lubNm: 50,   note: "" },
  { size: '1/2"-13',   grade: "5", dryFtLb: 75,   lubFtLb: 56,   dryNm: 102,  lubNm: 76,   note: "★" },
  { size: '9/16"-12',  grade: "5", dryFtLb: 109,  lubFtLb: 82,   dryNm: 148,  lubNm: 111,  note: "" },
  { size: '5/8"-11',   grade: "5", dryFtLb: 150,  lubFtLb: 113,  dryNm: 203,  lubNm: 153,  note: "" },
  { size: '3/4"-10',   grade: "5", dryFtLb: 267,  lubFtLb: 200,  dryNm: 362,  lubNm: 271,  note: "★" },
  { size: '7/8"-9',    grade: "5", dryFtLb: 400,  lubFtLb: 300,  dryNm: 542,  lubNm: 407,  note: "" },
  { size: '1"-8',      grade: "5", dryFtLb: 600,  lubFtLb: 450,  dryNm: 814,  lubNm: 610,  note: "" },
  { size: '1-1/4"-7',  grade: "5", dryFtLb: 1100, lubFtLb: 825,  dryNm: 1492, lubNm: 1119, note: "" },
  // Grade 8
  { size: '1/4"-20',   grade: "8", dryFtLb: 12,   lubFtLb: 9,    dryNm: 16,   lubNm: 12,   note: "★" },
  { size: '5/16"-18',  grade: "8", dryFtLb: 24,   lubFtLb: 18,   dryNm: 33,   lubNm: 24,   note: "★" },
  { size: '3/8"-16',   grade: "8", dryFtLb: 44,   lubFtLb: 33,   dryNm: 60,   lubNm: 45,   note: "★" },
  { size: '7/16"-14',  grade: "8", dryFtLb: 70,   lubFtLb: 53,   dryNm: 95,   lubNm: 72,   note: "" },
  { size: '1/2"-13',   grade: "8", dryFtLb: 110,  lubFtLb: 85,   dryNm: 149,  lubNm: 115,  note: "★" },
  { size: '9/16"-12',  grade: "8", dryFtLb: 155,  lubFtLb: 116,  dryNm: 210,  lubNm: 157,  note: "" },
  { size: '5/8"-11',   grade: "8", dryFtLb: 220,  lubFtLb: 165,  dryNm: 298,  lubNm: 224,  note: "" },
  { size: '3/4"-10',   grade: "8", dryFtLb: 380,  lubFtLb: 285,  dryNm: 515,  lubNm: 386,  note: "★" },
  { size: '7/8"-9',    grade: "8", dryFtLb: 600,  lubFtLb: 450,  dryNm: 814,  lubNm: 610,  note: "" },
  { size: '1"-8',      grade: "8", dryFtLb: 900,  lubFtLb: 675,  dryNm: 1220, lubNm: 915,  note: "" },
  { size: '1-1/4"-7',  grade: "8", dryFtLb: 1800, lubFtLb: 1350, dryNm: 2441, lubNm: 1831, note: "" },
  { size: '1-1/2"-6',  grade: "8", dryFtLb: 3200, lubFtLb: 2400, dryNm: 4339, lubNm: 3254, note: "" },
];

const METRIC_TORQUE = [
  // 8.8
  { size: "M5",  grade: "8.8", dryFtLb: 5,    lubFtLb: 4,    dryNm: 7,    lubNm: 5,    note: "" },
  { size: "M6",  grade: "8.8", dryFtLb: 9,    lubFtLb: 7,    dryNm: 12,   lubNm: 9,    note: "★" },
  { size: "M8",  grade: "8.8", dryFtLb: 21,   lubFtLb: 16,   dryNm: 29,   lubNm: 22,   note: "★" },
  { size: "M10", grade: "8.8", dryFtLb: 43,   lubFtLb: 32,   dryNm: 58,   lubNm: 43,   note: "★" },
  { size: "M12", grade: "8.8", dryFtLb: 74,   lubFtLb: 56,   dryNm: 100,  lubNm: 76,   note: "★" },
  { size: "M14", grade: "8.8", dryFtLb: 118,  lubFtLb: 89,   dryNm: 160,  lubNm: 120,  note: "" },
  { size: "M16", grade: "8.8", dryFtLb: 181,  lubFtLb: 136,  dryNm: 245,  lubNm: 184,  note: "★" },
  { size: "M20", grade: "8.8", dryFtLb: 355,  lubFtLb: 266,  dryNm: 481,  lubNm: 361,  note: "★" },
  { size: "M24", grade: "8.8", dryFtLb: 610,  lubFtLb: 457,  dryNm: 827,  lubNm: 620,  note: "" },
  { size: "M30", grade: "8.8", dryFtLb: 1217, lubFtLb: 913,  dryNm: 1650, lubNm: 1237, note: "" },
  // 10.9
  { size: "M5",  grade: "10.9", dryFtLb: 7,   lubFtLb: 5,    dryNm: 10,   lubNm: 7,    note: "" },
  { size: "M6",  grade: "10.9", dryFtLb: 13,  lubFtLb: 10,   dryNm: 17,   lubNm: 13,   note: "★" },
  { size: "M8",  grade: "10.9", dryFtLb: 30,  lubFtLb: 23,   dryNm: 41,   lubNm: 31,   note: "★" },
  { size: "M10", grade: "10.9", dryFtLb: 61,  lubFtLb: 46,   dryNm: 83,   lubNm: 62,   note: "★" },
  { size: "M12", grade: "10.9", dryFtLb: 105, lubFtLb: 79,   dryNm: 142,  lubNm: 107,  note: "★" },
  { size: "M16", grade: "10.9", dryFtLb: 258, lubFtLb: 193,  dryNm: 350,  lubNm: 262,  note: "★" },
  { size: "M20", grade: "10.9", dryFtLb: 502, lubFtLb: 376,  dryNm: 680,  lubNm: 510,  note: "★" },
  { size: "M24", grade: "10.9", dryFtLb: 862, lubFtLb: 647,  dryNm: 1169, lubNm: 877,  note: "" },
  { size: "M30", grade: "10.9", dryFtLb: 1720, lubFtLb: 1290, dryNm: 2332, lubNm: 1749, note: "" },
  // 12.9
  { size: "M5",  grade: "12.9", dryFtLb: 8,   lubFtLb: 6,    dryNm: 11,   lubNm: 8,    note: "" },
  { size: "M6",  grade: "12.9", dryFtLb: 15,  lubFtLb: 11,   dryNm: 20,   lubNm: 15,   note: "★" },
  { size: "M8",  grade: "12.9", dryFtLb: 35,  lubFtLb: 26,   dryNm: 47,   lubNm: 35,   note: "★" },
  { size: "M10", grade: "12.9", dryFtLb: 71,  lubFtLb: 53,   dryNm: 96,   lubNm: 72,   note: "★" },
  { size: "M12", grade: "12.9", dryFtLb: 123, lubFtLb: 92,   dryNm: 167,  lubNm: 125,  note: "★" },
  { size: "M16", grade: "12.9", dryFtLb: 301, lubFtLb: 226,  dryNm: 408,  lubNm: 306,  note: "★" },
  { size: "M20", grade: "12.9", dryFtLb: 587, lubFtLb: 440,  dryNm: 796,  lubNm: 597,  note: "★" },
  { size: "M24", grade: "12.9", dryFtLb: 1008, lubFtLb: 756, dryNm: 1367, lubNm: 1025, note: "" },
];

const GRADE_INFO_TORQUE = {
  "2":    { marks: "No markings",       material: "Low carbon steel",           tensile: "74,000 PSI",  color: "#64748B" },
  "5":    { marks: "3 radial lines",    material: "Medium carbon steel",        tensile: "120,000 PSI", color: "#2563EB" },
  "8":    { marks: "6 radial lines",    material: "Alloy steel",                tensile: "150,000 PSI", color: "#DC2626" },
  "8.8":  { marks: "8.8 on head",       material: "Medium carbon steel Q&T",   tensile: "800 MPa",     color: "#2563EB" },
  "10.9": { marks: "10.9 on head",      material: "Alloy steel Q&T",           tensile: "1000 MPa",    color: "#D97706" },
  "12.9": { marks: "12.9 on head",      material: "Alloy steel Q&T (highest)", tensile: "1200 MPa",    color: "#DC2626" },
};

const LUB_FACTORS_TORQUE = [
  { lubricant: "Dry / As received",       factor: "1.00", note: "Baseline — use standard values" },
  { lubricant: "Motor oil / Light oil",   factor: "0.75", note: "Multiply dry value × 0.75" },
  { lubricant: "Anti-seize compound",     factor: "0.65", note: "Multiply dry value × 0.65" },
  { lubricant: "Zinc plated (dry)",       factor: "0.85", note: "Multiply dry value × 0.85" },
  { lubricant: "Hot-dip galvanized",      factor: "0.90", note: "Multiply dry value × 0.90" },
  { lubricant: "Moly paste (MoS₂)",      factor: "0.65", note: "Multiply dry value × 0.65" },
  { lubricant: "Threadlocker (Loctite)",  factor: "0.90", note: "Follow manufacturer spec" },
  { lubricant: "Cadmium plated",          factor: "0.85", note: "Multiply dry value × 0.85" },
];

export default function TorqueChart() {
  const [system, setSystem] = useState("SAE");
  const [grade, setGrade] = useState("5");
  const [condition, setCondition] = useState("dry");
  const [units, setUnits] = useState("ftlb");
  const [activeSection, setActiveSection] = useState("chart");
  const [search, setSearch] = useState("");

  const metricGrades = ["8.8", "10.9", "12.9"];
  const saeGrades    = ["2", "5", "8"];
  const currentGrades = system === "SAE" ? saeGrades : metricGrades;
  const currentData   = (system === "SAE" ? SAE_TORQUE : METRIC_TORQUE).filter(r => r.grade === grade).filter(r => !search || r.size.toLowerCase().includes(search.toLowerCase()));

  const getValue = (row) => {
    if (condition === "dry")  return units === "ftlb" ? row.dryFtLb : row.dryNm;
    return units === "ftlb" ? row.lubFtLb : row.lubNm;
  };

  const gradeInfo = GRADE_INFO_TORQUE[grade];

  return (
    <div style={{ fontFamily: "'DM Sans','Segoe UI',sans-serif", background: BG, minHeight: "100vh", maxWidth: 430, margin: "0 auto" }}>
      <div style={{ background: `linear-gradient(135deg, ${NAVY} 0%, #2C5282 100%)`, padding: "16px 20px 20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
          <span style={{ fontSize: 20 }}>⬡</span>
          <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 10, letterSpacing: 2, textTransform: "uppercase" }}>Fastener Companion</span>
        </div>
        <div style={{ color: WHITE, fontSize: 20, fontWeight: 800, marginBottom: 2 }}>Torque Chart</div>
        <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 11 }}>SAE J429 · ASTM A307/A325/A354/A490 · ISO 898-1 · IFI 7th Ed.</div>
        <div style={{ background: WHITE, borderRadius: 12, display: "flex", alignItems: "center", padding: "10px 14px", gap: 8, marginTop: 14, boxShadow: "0 2px 8px rgba(0,0,0,0.15)" }}>
          <span style={{ color: MUTED }}>🔍</span>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search bolt size..."
            style={{ background: "none", border: "none", outline: "none", color: TEXT, fontSize: 14, flex: 1, fontFamily: "inherit" }} />
          {search && <span onClick={() => setSearch("")} style={{ color: MUTED, cursor: "pointer" }}>✕</span>}
        </div>
      </div>

      <div style={{ background: WHITE, borderBottom: `1px solid ${BORDER}`, padding: "0 12px", display: "flex" }}>
        {["chart", "lubricants", "tips"].map(s => (
          <button key={s} onClick={() => setActiveSection(s)}
            style={{ background: "none", border: "none", cursor: "pointer", padding: "12px 14px", fontSize: 12, fontWeight: 700, fontFamily: "inherit", textTransform: "capitalize", color: activeSection === s ? NAVY : MUTED, borderBottom: activeSection === s ? `3px solid ${AMBER}` : "3px solid transparent" }}>
            {s === "tips" ? "Field Tips" : s.charAt(0).toUpperCase() + s.slice(1)}
          </button>
        ))}
      </div>

      {activeSection === "chart" && (
        <>
          <div style={{ padding: "14px 16px 0", display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ display: "flex", gap: 4, background: "#EEF2F7", borderRadius: 10, padding: 3 }}>
              {["SAE", "Metric"].map(s => (
                <button key={s} onClick={() => { setSystem(s); setGrade(s === "SAE" ? "5" : "8.8"); setSearch(""); }}
                  style={{ flex: 1, padding: "8px 0", borderRadius: 8, border: "none", cursor: "pointer", fontSize: 13, fontWeight: 700, fontFamily: "inherit", background: system === s ? WHITE : "transparent", color: system === s ? NAVY : MUTED, boxShadow: system === s ? "0 1px 4px rgba(0,0,0,0.1)" : "none" }}>
                  {s}
                </button>
              ))}
            </div>
            <div>
              <div style={{ fontSize: 10, fontWeight: 700, color: MUTED, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 6 }}>Grade / Property Class</div>
              <div style={{ display: "flex", gap: 8 }}>
                {currentGrades.map(g => (
                  <button key={g} onClick={() => setGrade(g)}
                    style={{ flex: 1, padding: "10px 0", borderRadius: 10, border: `2px solid ${grade === g ? GRADE_INFO_TORQUE[g].color : BORDER}`, cursor: "pointer", fontSize: 13, fontWeight: 800, fontFamily: "inherit", background: grade === g ? GRADE_INFO_TORQUE[g].color : WHITE, color: grade === g ? WHITE : TEXT }}>
                    Gr. {g}
                  </button>
                ))}
              </div>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              {[
                { label: "Condition", options: [["dry", "Dry"], ["lubricated", "Lubricated"]], val: condition, set: setCondition },
                { label: "Units",     options: [["ftlb", "ft-lb"], ["nm", "Nm"]],              val: units,     set: setUnits },
              ].map(ctrl => (
                <div key={ctrl.label} style={{ flex: 1 }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: MUTED, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 6 }}>{ctrl.label}</div>
                  <div style={{ display: "flex", gap: 3, background: "#EEF2F7", borderRadius: 8, padding: 3 }}>
                    {ctrl.options.map(([id, lbl]) => (
                      <button key={id} onClick={() => ctrl.set(id)}
                        style={{ flex: 1, padding: "6px 0", borderRadius: 6, border: "none", cursor: "pointer", fontSize: 11, fontWeight: 700, fontFamily: "inherit", background: ctrl.val === id ? WHITE : "transparent", color: ctrl.val === id ? NAVY : MUTED, boxShadow: ctrl.val === id ? "0 1px 3px rgba(0,0,0,0.1)" : "none" }}>
                        {lbl}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ margin: "12px 16px 0", background: STAR_BG, border: `1px solid ${STAR_BORDER}`, borderRadius: 10, padding: "10px 14px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontSize: 12, fontWeight: 800, color: gradeInfo.color }}>Grade {grade}</div>
                <div style={{ fontSize: 11, color: "#92400E", marginTop: 2 }}>{gradeInfo.material} — {gradeInfo.tensile}</div>
                <div style={{ fontSize: 11, color: "#92400E" }}>Head marking: {gradeInfo.marks}</div>
              </div>
            </div>
          </div>

          <div style={{ margin: "12px 16px 24px", background: WHITE, borderRadius: 14, overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.06)", border: `1px solid ${BORDER}` }}>
            <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", background: NAVY, padding: "10px 14px" }}>
              <div style={{ color: WHITE, fontSize: 11, fontWeight: 700 }}>Size</div>
              <div style={{ color: WHITE, fontSize: 11, fontWeight: 700 }}>Torque ({units === "ftlb" ? "ft-lb" : "Nm"}) — {condition === "dry" ? "Dry" : "Lubricated"}</div>
            </div>
            {currentData.length === 0
              ? <div style={{ padding: 24, textAlign: "center", color: MUTED, fontSize: 13 }}>No results found</div>
              : currentData.map((row, i) => (
                <div key={i} style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", padding: "10px 14px", background: row.note === "★" ? STAR_BG : i % 2 === 0 ? WHITE : ROW_ALT, borderBottom: `1px solid ${BORDER}`, alignItems: "center" }}>
                  <div style={{ fontSize: 13, fontWeight: row.note === "★" ? 700 : 500, color: row.note === "★" ? NAVY : TEXT, display: "flex", alignItems: "center", gap: 4 }}>
                    {row.note === "★" && <span style={{ color: AMBER, fontSize: 10 }}>★</span>}
                    {row.size}
                  </div>
                  <div style={{ fontSize: 15, fontWeight: 800, color: gradeInfo.color }}>
                    {getValue(row)} <span style={{ fontSize: 11, fontWeight: 500, color: MUTED }}>{units === "ftlb" ? "ft-lb" : "Nm"}</span>
                  </div>
                </div>
              ))
            }
          </div>
        </>
      )}

      {activeSection === "lubricants" && (
        <div style={{ padding: "14px 16px" }}>
          <div style={{ background: STAR_BG, border: `1px solid ${STAR_BORDER}`, borderRadius: 10, padding: "10px 14px", marginBottom: 12 }}>
            <div style={{ fontSize: 11, color: "#92400E", lineHeight: 1.5 }}>
              <strong>Using dry torque values on lubricated fasteners will over-torque the joint.</strong> Multiply the dry value by the factor below.
            </div>
          </div>
          <div style={{ background: WHITE, borderRadius: 14, overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.06)", border: `1px solid ${BORDER}` }}>
            <div style={{ display: "grid", gridTemplateColumns: "1.5fr 0.6fr", background: NAVY, padding: "10px 14px" }}>
              <div style={{ color: WHITE, fontSize: 11, fontWeight: 700 }}>Lubricant / Condition</div>
              <div style={{ color: WHITE, fontSize: 11, fontWeight: 700 }}>Factor</div>
            </div>
            {LUB_FACTORS_TORQUE.map((item, i) => (
              <div key={i} style={{ padding: "10px 14px", borderBottom: `1px solid ${BORDER}`, background: i % 2 === 0 ? WHITE : ROW_ALT }}>
                <div style={{ display: "grid", gridTemplateColumns: "1.5fr 0.6fr", alignItems: "center" }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: TEXT }}>{item.lubricant}</div>
                  <div style={{ fontSize: 14, fontWeight: 800, color: item.factor === "1.00" ? MUTED : NAVY }}>{item.factor}</div>
                </div>
                <div style={{ fontSize: 11, color: MUTED, marginTop: 2 }}>{item.note}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeSection === "tips" && (
        <div style={{ padding: "14px 16px", display: "flex", flexDirection: "column", gap: 10 }}>
          {[
            { title: "Never use dry specs on lubricated fasteners", body: "Lubrication reduces friction — same torque produces 25–40% more clamp load. This over-stresses the bolt and can cause immediate or delayed failure.", color: "#DC2626", bg: "#FFF1F2" },
            { title: "Anti-seize changes your torque value", body: "Anti-seize acts as a lubricant. Always reduce torque by 25–35% when using anti-seize, even if threads look dry. Using full dry torque with anti-seize will yield or break the bolt.", color: "#D97706", bg: STAR_BG },
            { title: "Impact wrenches for run-down only", body: "Use impact wrenches to run the fastener down, then switch to a calibrated torque wrench for final tightening. Impact wrenches deliver 2–10× required torque in milliseconds.", color: NAVY, bg: "#EEF4FF" },
            { title: "Tighten in passes — not all at once", body: "For multi-bolt patterns, tighten in 3 passes: 30% → 70% → 100% of final torque. This ensures even clamp load distribution and prevents joint distortion.", color: "#059669", bg: "#F0FDF4" },
            { title: "Stainless steel — always lubricate", body: "Stainless is highly prone to galling (cold welding). Always apply anti-seize or thread lubricant and reduce torque by 25–30% from steel values.", color: "#7C3AED", bg: "#F5F3FF" },
          ].map((tip, i) => (
            <div key={i} style={{ background: tip.bg, border: `1px solid ${BORDER}`, borderLeft: `4px solid ${tip.color}`, borderRadius: 12, padding: "12px 14px" }}>
              <div style={{ fontSize: 12, fontWeight: 800, color: tip.color, marginBottom: 4 }}>{tip.title}</div>
              <div style={{ fontSize: 12, color: TEXT, lineHeight: 1.5 }}>{tip.body}</div>
            </div>
          ))}
        </div>
      )}

      <div style={{ margin: "0 16px 24px", background: "#FFF1F2", border: "1px solid #FECDD3", borderRadius: 10, padding: "10px 14px" }}>
        <div style={{ fontSize: 10, color: "#9F1239", lineHeight: 1.5 }}>
          <strong>⚠ Verify Before Use.</strong> Torque values based on IFI 7th Ed., SAE J429, and ISO 898-1 at 75% proof load. Variables affect torque-tension relationships. Always use manufacturer specifications for critical applications. Fastener Companion is a reference tool.
        </div>
      </div>
    </div>
  );
}
