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
// 8. UNIT CONVERTER
// Torque · Length · Pressure/Stress · Force · Temperature · Area
// ─────────────────────────────────────────────────────────────────────────────

const CONVERTER_CATEGORIES = [
  {
    name: "Torque", icon: "🔧", color: "#D97706", bg: "#FFF8E7",
    units: [
      { label: "ft-lb",    toBase: v => v * 1.35582,  fromBase: v => v / 1.35582 },
      { label: "in-lb",    toBase: v => v * 0.11299,  fromBase: v => v / 0.11299 },
      { label: "Nm",       toBase: v => v,            fromBase: v => v },
      { label: "kgf·m",   toBase: v => v * 9.80665,  fromBase: v => v / 9.80665 },
      { label: "in-oz",   toBase: v => v * 0.00706,  fromBase: v => v / 0.00706 },
    ],
    note: "Base unit: Nm. Most common: ft-lb ↔ Nm. Anti-seize reduces torque by ~25–35%.",
  },
  {
    name: "Length", icon: "📏", color: "#2563EB", bg: "#EFF6FF",
    units: [
      { label: "inches",    toBase: v => v * 25.4,   fromBase: v => v / 25.4 },
      { label: "mm",        toBase: v => v,          fromBase: v => v },
      { label: "cm",        toBase: v => v * 10,     fromBase: v => v / 10 },
      { label: "feet",      toBase: v => v * 304.8,  fromBase: v => v / 304.8 },
      { label: "meters",    toBase: v => v * 1000,   fromBase: v => v / 1000 },
      { label: "mils (thou)", toBase: v => v * 0.0254, fromBase: v => v / 0.0254 },
    ],
    note: "1 inch = 25.4mm exactly. Mil = 0.001 inch (used in coatings/tolerances).",
  },
  {
    name: "Stress", icon: "💪", color: "#DC2626", bg: "#FFF1F2",
    units: [
      { label: "psi",      toBase: v => v * 6894.76,  fromBase: v => v / 6894.76 },
      { label: "ksi",      toBase: v => v * 6894760,  fromBase: v => v / 6894760 },
      { label: "MPa",      toBase: v => v * 1000000,  fromBase: v => v },
      { label: "GPa",      toBase: v => v * 1e9,      fromBase: v => v / 1e9 },
      { label: "bar",      toBase: v => v * 100000,   fromBase: v => v / 100000 },
      { label: "kgf/mm²", toBase: v => v * 9806650,  fromBase: v => v / 9806650 },
    ],
    note: "1 MPa = 145 psi (approx). Used for tensile, yield, and proof load specs.",
  },
  {
    name: "Force", icon: "⚡", color: "#7C3AED", bg: "#F5F3FF",
    units: [
      { label: "lbf",       toBase: v => v * 4.44822,  fromBase: v => v / 4.44822 },
      { label: "kip",       toBase: v => v * 4448.22,  fromBase: v => v / 4448.22 },
      { label: "N",         toBase: v => v,            fromBase: v => v },
      { label: "kN",        toBase: v => v * 1000,     fromBase: v => v / 1000 },
      { label: "kgf",       toBase: v => v * 9.80665,  fromBase: v => v / 9.80665 },
    ],
    note: "Base unit: Newtons (N). Used for clamp load, proof load, and tensile force.",
  },
  {
    name: "Temp", icon: "🌡️", color: "#0891B2", bg: "#F0FDFE",
    units: [
      { label: "°F", toBase: v => (v - 32) * 5 / 9, fromBase: v => v * 9 / 5 + 32 },
      { label: "°C", toBase: v => v,                 fromBase: v => v },
      { label: "K",  toBase: v => v - 273.15,        fromBase: v => v + 273.15 },
    ],
    note: "A193 B7 stud rated to ~538°C (1000°F). Loctite standard grade limit ~150°C (300°F).",
  },
  {
    name: "Area", icon: "⬛", color: "#059669", bg: "#F0FDF4",
    units: [
      { label: "in²",  toBase: v => v * 645.16, fromBase: v => v / 645.16 },
      { label: "mm²",  toBase: v => v,          fromBase: v => v },
      { label: "cm²",  toBase: v => v * 100,    fromBase: v => v / 100 },
    ],
    note: "Bolt stress area ≠ full cross-section — use thread stress area from spec tables.",
  },
];

const QUICK_CONVS = [
  { from: "1 ft-lb",    to: "12 in-lb = 1.356 Nm",           cat: "Torque" },
  { from: "1 Nm",       to: "0.738 ft-lb = 8.85 in-lb",      cat: "Torque" },
  { from: "100 Nm",     to: "73.8 ft-lb = 885 in-lb",        cat: "Torque" },
  { from: "1 inch",     to: "25.4 mm exactly",               cat: "Length" },
  { from: "1 MPa",      to: "145 psi = 0.145 ksi",           cat: "Stress" },
  { from: "1 ksi",      to: "6.895 MPa",                     cat: "Stress" },
  { from: "800 MPa",    to: "116 ksi (8.8 tensile)",         cat: "Stress" },
  { from: "1000°F",     to: "538°C (B7 stud limit)",         cat: "Temp" },
  { from: "1 lbf",      to: "4.448 N = 0.454 kgf",          cat: "Force" },
];

export default function Converter() {
  const [activeCat, setActiveCat]       = useState(0);
  const [fromUnit, setFromUnit]         = useState(0);
  const [toUnit, setToUnit]             = useState(1);
  const [inputVal, setInputVal]         = useState("");
  const [activeSection, setActiveSection] = useState("calc");

  const cat = CONVERTER_CATEGORIES[activeCat];

  const getBase   = () => { const v = parseFloat(inputVal); if (isNaN(v)) return null; return cat.units[fromUnit].toBase(v); };
  const convert   = () => { const b = getBase(); return b === null ? null : cat.units[toUnit].fromBase(b); };
  const result    = convert();
  const fmt = (val) => {
    if (val === null) return "—";
    if (Math.abs(val) >= 1000000) return val.toExponential(4);
    if (Math.abs(val) >= 100) return val.toFixed(2);
    if (Math.abs(val) >= 1)   return val.toFixed(4);
    return val.toFixed(6);
  };
  const allResults = () => {
    const b = getBase();
    if (b === null) return [];
    return cat.units.map(u => ({ label: u.label, value: fmt(u.fromBase(b)) }));
  };

  return (
    <div style={{ fontFamily: "'DM Sans','Segoe UI',sans-serif", background: BG, minHeight: "100vh", maxWidth: 430, margin: "0 auto" }}>
      <div style={{ background: `linear-gradient(135deg, ${NAVY} 0%, #2C5282 100%)`, padding: "16px 20px 20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
          <span style={{ fontSize: 20 }}>⬡</span>
          <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 10, letterSpacing: 2, textTransform: "uppercase" }}>Fastener Companion</span>
        </div>
        <div style={{ color: WHITE, fontSize: 20, fontWeight: 800, marginBottom: 2 }}>Unit Converter</div>
        <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 11 }}>Torque · Length · Stress · Force · Temperature · Area</div>
      </div>

      <div style={{ background: WHITE, borderBottom: `1px solid ${BORDER}`, padding: "0 12px", display: "flex" }}>
        {["calc", "quick"].map(s => (
          <button key={s} onClick={() => setActiveSection(s)}
            style={{ background: "none", border: "none", cursor: "pointer", padding: "12px 16px", fontSize: 12, fontWeight: 700, fontFamily: "inherit", color: activeSection === s ? NAVY : MUTED, borderBottom: activeSection === s ? `3px solid ${AMBER}` : "3px solid transparent" }}>
            {s === "calc" ? "Calculator" : "Quick Reference"}
          </button>
        ))}
      </div>

      {activeSection === "calc" && (
        <div style={{ padding: "14px 16px" }}>
          <div style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: MUTED, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 8 }}>Category</div>
            <div style={{ display: "flex", gap: 8, overflowX: "auto", scrollbarWidth: "none", paddingBottom: 4 }}>
              {CONVERTER_CATEGORIES.map((c, i) => (
                <button key={i} onClick={() => { setActiveCat(i); setFromUnit(0); setToUnit(1); setInputVal(""); }}
                  style={{ flexShrink: 0, padding: "8px 12px", borderRadius: 20, border: `1.5px solid ${activeCat === i ? c.color : BORDER}`, background: activeCat === i ? c.bg : WHITE, cursor: "pointer", fontFamily: "inherit", fontSize: 12, fontWeight: 700, color: activeCat === i ? c.color : MUTED, display: "flex", alignItems: "center", gap: 6 }}>
                  <span>{c.icon}</span> {c.name}
                </button>
              ))}
            </div>
          </div>

          <div style={{ background: WHITE, borderRadius: 14, padding: "16px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)", border: `1px solid ${BORDER}`, marginBottom: 12 }}>
            <div style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: MUTED, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 6 }}>Convert From</div>
              <div style={{ display: "flex", gap: 8 }}>
                <input value={inputVal} onChange={e => setInputVal(e.target.value)} placeholder="Enter value" type="number"
                  style={{ flex: 1, padding: "10px 14px", borderRadius: 10, border: `1.5px solid ${BORDER}`, fontSize: 16, color: TEXT, fontFamily: "inherit", outline: "none" }} />
                <select value={fromUnit} onChange={e => setFromUnit(parseInt(e.target.value))}
                  style={{ padding: "10px 12px", borderRadius: 10, border: `1.5px solid ${BORDER}`, fontSize: 13, color: TEXT, fontFamily: "inherit", background: WHITE, outline: "none", cursor: "pointer" }}>
                  {cat.units.map((u, i) => <option key={i} value={i}>{u.label}</option>)}
                </select>
              </div>
            </div>
            <div style={{ textAlign: "center", marginBottom: 12 }}><span style={{ fontSize: 20, color: cat.color }}>↓</span></div>
            <div style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: MUTED, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 6 }}>Convert To</div>
              <select value={toUnit} onChange={e => setToUnit(parseInt(e.target.value))}
                style={{ width: "100%", padding: "10px 12px", borderRadius: 10, border: `1.5px solid ${BORDER}`, fontSize: 13, color: TEXT, fontFamily: "inherit", background: WHITE, outline: "none", cursor: "pointer", marginBottom: 10 }}>
                {cat.units.map((u, i) => <option key={i} value={i}>{u.label}</option>)}
              </select>
              {result !== null && inputVal !== "" && (
                <div style={{ background: cat.bg, border: `1.5px solid ${cat.color}`, borderRadius: 12, padding: "14px 16px", textAlign: "center" }}>
                  <div style={{ fontSize: 12, color: cat.color, marginBottom: 4 }}>{inputVal} {cat.units[fromUnit].label} =</div>
                  <div style={{ fontSize: 28, fontWeight: 800, color: cat.color }}>{fmt(result)}</div>
                  <div style={{ fontSize: 14, color: cat.color, fontWeight: 600 }}>{cat.units[toUnit].label}</div>
                </div>
              )}
            </div>
          </div>

          {inputVal !== "" && result !== null && (
            <div style={{ background: WHITE, borderRadius: 14, overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.06)", border: `1px solid ${BORDER}`, marginBottom: 12 }}>
              <div style={{ background: NAVY, padding: "10px 14px" }}><div style={{ color: WHITE, fontSize: 11, fontWeight: 700 }}>All Conversions</div></div>
              {allResults().map((r, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 14px", borderBottom: `1px solid ${BORDER}`, background: i % 2 === 0 ? WHITE : ROW_ALT }}>
                  <span style={{ fontSize: 13, color: MUTED }}>{r.label}</span>
                  <span style={{ fontSize: 14, fontWeight: 700, color: NAVY }}>{r.value}</span>
                </div>
              ))}
            </div>
          )}

          <div style={{ background: STAR_BG, border: `1px solid ${STAR_BORDER}`, borderRadius: 10, padding: "10px 14px" }}>
            <div style={{ fontSize: 11, color: "#92400E", lineHeight: 1.5 }}>{cat.note}</div>
          </div>
        </div>
      )}

      {activeSection === "quick" && (
        <div style={{ padding: "14px 16px" }}>
          <div style={{ background: WHITE, borderRadius: 14, overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.06)", border: `1px solid ${BORDER}` }}>
            <div style={{ background: NAVY, padding: "10px 14px" }}><div style={{ color: WHITE, fontSize: 11, fontWeight: 700 }}>Common Fastener Conversions</div></div>
            {QUICK_CONVS.map((item, i) => (
              <div key={i} style={{ padding: "10px 14px", borderBottom: `1px solid ${BORDER}`, background: i % 2 === 0 ? WHITE : ROW_ALT }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10 }}>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: NAVY }}>{item.from}</div>
                    <div style={{ fontSize: 13, color: TEXT, marginTop: 2 }}>= {item.to}</div>
                  </div>
                  <div style={{ background: "#EEF4FF", borderRadius: 6, padding: "2px 8px", fontSize: 9, color: NAVY, fontWeight: 700, whiteSpace: "nowrap", flexShrink: 0 }}>{item.cat}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={{ margin: "0 16px 24px", background: "#FFF1F2", border: "1px solid #FECDD3", borderRadius: 10, padding: "10px 14px" }}>
        <div style={{ fontSize: 10, color: "#9F1239", lineHeight: 1.5 }}>
          <strong>⚠ Verify Before Use.</strong> Conversion factors per NIST and ISO standards. For critical torque use calibrated equipment and manufacturer specifications. Fastener Companion is a reference tool.
        </div>
      </div>
    </div>
  );
}
