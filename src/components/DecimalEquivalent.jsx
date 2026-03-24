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
// 6. DECIMAL EQUIVALENT CHART
// Sources: ANSI/ASME B94.11M — Fractional, Number, Letter drill sizes
// ─────────────────────────────────────────────────────────────────────────────

const FRACTIONAL = [
  { frac: "1/64",   dec: "0.0156", mm: "0.397" }, { frac: "1/32",  dec: "0.0313", mm: "0.794" },
  { frac: "3/64",   dec: "0.0469", mm: "1.191" }, { frac: "1/16",  dec: "0.0625", mm: "1.588", star: true },
  { frac: "5/64",   dec: "0.0781", mm: "1.984" }, { frac: "3/32",  dec: "0.0938", mm: "2.381" },
  { frac: "7/64",   dec: "0.1094", mm: "2.778" }, { frac: "1/8",   dec: "0.1250", mm: "3.175", star: true },
  { frac: "5/32",   dec: "0.1563", mm: "3.969" }, { frac: "3/16",  dec: "0.1875", mm: "4.763", star: true },
  { frac: "1/4",    dec: "0.2500", mm: "6.350",  star: true }, { frac: "5/16",  dec: "0.3125", mm: "7.938",  star: true },
  { frac: "3/8",    dec: "0.3750", mm: "9.525",  star: true }, { frac: "7/16",  dec: "0.4375", mm: "11.113", star: true },
  { frac: "1/2",    dec: "0.5000", mm: "12.700", star: true }, { frac: "9/16",  dec: "0.5625", mm: "14.288", star: true },
  { frac: "5/8",    dec: "0.6250", mm: "15.875", star: true }, { frac: "11/16", dec: "0.6875", mm: "17.463", star: true },
  { frac: "3/4",    dec: "0.7500", mm: "19.050", star: true }, { frac: "7/8",   dec: "0.8750", mm: "22.225", star: true },
  { frac: "1",      dec: "1.0000", mm: "25.400", star: true }, { frac: "1-1/4", dec: "1.2500", mm: "31.750", star: true },
  { frac: "1-1/2",  dec: "1.5000", mm: "38.100", star: true }, { frac: "1-3/4", dec: "1.7500", mm: "44.450", star: true },
  { frac: "2",      dec: "2.0000", mm: "50.800", star: true },
];

const NUMBER_DRILLS = [
  { num: "#80", dec: "0.0135", mm: "0.343" }, { num: "#79", dec: "0.0145", mm: "0.368" },
  { num: "#75", dec: "0.0210", mm: "0.533" }, { num: "#70", dec: "0.0280", mm: "0.711" },
  { num: "#65", dec: "0.0350", mm: "0.889" }, { num: "#60", dec: "0.0400", mm: "1.016" },
  { num: "#56", dec: "0.0465", mm: "1.181" }, { num: "#53", dec: "0.0595", mm: "1.511", star: true },
  { num: "#50", dec: "0.0700", mm: "1.778", star: true }, { num: "#47", dec: "0.0785", mm: "1.994", star: true },
  { num: "#43", dec: "0.0890", mm: "2.261", star: true }, { num: "#38", dec: "0.1015", mm: "2.578", star: true },
  { num: "#36", dec: "0.1065", mm: "2.705", star: true }, { num: "#29", dec: "0.1360", mm: "3.454", star: true },
  { num: "#25", dec: "0.1495", mm: "3.797", star: true }, { num: "#21", dec: "0.1590", mm: "4.039", star: true },
  { num: "#16", dec: "0.1770", mm: "4.496", star: true }, { num: "#15", dec: "0.1800", mm: "4.572", star: true },
  { num: "#7",  dec: "0.2010", mm: "5.105", star: true }, { num: "#3",  dec: "0.2130", mm: "5.410", star: true },
  { num: "#1",  dec: "0.2280", mm: "5.791" },
];

const LETTER_DRILLS = [
  { letter: "A", dec: "0.2340", mm: "5.944" }, { letter: "B", dec: "0.2380", mm: "6.045" },
  { letter: "C", dec: "0.2420", mm: "6.147" }, { letter: "D", dec: "0.2460", mm: "6.248" },
  { letter: "E", dec: "0.2500", mm: "6.350", star: true },
  { letter: "F", dec: "0.2570", mm: "6.528", star: true },
  { letter: "G", dec: "0.2610", mm: "6.629" }, { letter: "H", dec: "0.2660", mm: "6.756" },
  { letter: "I", dec: "0.2720", mm: "6.909", star: true },
  { letter: "J", dec: "0.2770", mm: "7.036" }, { letter: "K", dec: "0.2810", mm: "7.137" },
  { letter: "L", dec: "0.2900", mm: "7.366" }, { letter: "M", dec: "0.2950", mm: "7.493" },
  { letter: "N", dec: "0.3020", mm: "7.671", star: true },
  { letter: "O", dec: "0.3160", mm: "8.026" }, { letter: "P", dec: "0.3230", mm: "8.204" },
  { letter: "Q", dec: "0.3320", mm: "8.433", star: true },
  { letter: "R", dec: "0.3390", mm: "8.611" }, { letter: "S", dec: "0.3480", mm: "8.839" },
  { letter: "T", dec: "0.3580", mm: "9.093" },
  { letter: "U", dec: "0.3680", mm: "9.347", star: true },
  { letter: "V", dec: "0.3770", mm: "9.576" }, { letter: "W", dec: "0.3860", mm: "9.804" },
  { letter: "X", dec: "0.3970", mm: "10.084" }, { letter: "Y", dec: "0.4040", mm: "10.262" },
  { letter: "Z", dec: "0.4130", mm: "10.490", star: true },
];

export default function DecimalEquivalent() {
  const [activeTab, setActiveTab] = useState("Fractional");
  const [search, setSearch]       = useState("");

  const tabs = ["Fractional", "Number", "Letter"];

  const getData = () => {
    if (activeTab === "Fractional") return FRACTIONAL;
    if (activeTab === "Number")     return NUMBER_DRILLS;
    if (activeTab === "Letter")     return LETTER_DRILLS;
    return [];
  };

  const filtered = getData().filter(r =>
    (r.frac   && r.frac.toLowerCase().includes(search.toLowerCase())) ||
    (r.num    && r.num.toLowerCase().includes(search.toLowerCase())) ||
    (r.letter && r.letter.toLowerCase().includes(search.toLowerCase())) ||
    r.dec.includes(search) || r.mm.includes(search)
  );

  const getKey = (row) => row.frac || row.num || row.letter;

  return (
    <div style={{ fontFamily: "'DM Sans','Segoe UI',sans-serif", background: BG, minHeight: "100vh", maxWidth: 430, margin: "0 auto" }}>
      <div style={{ background: `linear-gradient(135deg, ${NAVY} 0%, #2C5282 100%)`, padding: "16px 20px 20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
          <span style={{ fontSize: 20 }}>⬡</span>
          <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 10, letterSpacing: 2, textTransform: "uppercase" }}>Fastener Companion</span>
        </div>
        <div style={{ color: WHITE, fontSize: 20, fontWeight: 800, marginBottom: 2 }}>Decimal Equivalent Chart</div>
        <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 11 }}>ANSI/ASME B94.11M · Fractional, Number & Letter Drill Sizes</div>
        <div style={{ background: WHITE, borderRadius: 12, display: "flex", alignItems: "center", padding: "10px 14px", gap: 8, marginTop: 14, boxShadow: "0 2px 8px rgba(0,0,0,0.15)" }}>
          <span style={{ color: MUTED }}>🔍</span>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search fraction, #, letter, or decimal..."
            style={{ background: "none", border: "none", outline: "none", color: TEXT, fontSize: 14, flex: 1, fontFamily: "inherit" }} />
          {search && <span onClick={() => setSearch("")} style={{ color: MUTED, cursor: "pointer" }}>✕</span>}
        </div>
      </div>

      <div style={{ background: WHITE, borderBottom: `1px solid ${BORDER}`, padding: "0 12px", display: "flex" }}>
        {tabs.map(tab => (
          <button key={tab} onClick={() => { setActiveTab(tab); setSearch(""); }}
            style={{ background: "none", border: "none", cursor: "pointer", padding: "12px 16px", fontSize: 12, fontWeight: 700, fontFamily: "inherit", color: activeTab === tab ? NAVY : MUTED, borderBottom: activeTab === tab ? `3px solid ${AMBER}` : "3px solid transparent" }}>
            {tab}
          </button>
        ))}
      </div>

      <div style={{ margin: "12px 16px 0", background: STAR_BG, border: `1px solid ${STAR_BORDER}`, borderRadius: 10, padding: "10px 14px" }}>
        <div style={{ fontSize: 11, color: "#92400E", lineHeight: 1.5 }}>
          {activeTab === "Fractional" && <><strong>★ = Common sizes.</strong> Fractional drill sizes in 1/64" increments. All decimals in inches. Formula: mm = inches × 25.4</>}
          {activeTab === "Number"     && <><strong>★ = Common tap drill sizes.</strong> Number drills #80 (smallest) to #1 (largest). Higher number = smaller drill.</>}
          {activeTab === "Letter"     && <><strong>★ = Common tap drill sizes.</strong> Letter drills A (smallest) to Z (largest). F, I, Q, U, Z most common in tap charts.</>}
        </div>
      </div>

      <div style={{ margin: "12px 16px 24px", background: WHITE, borderRadius: 14, overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.06)", border: `1px solid ${BORDER}` }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", background: NAVY, padding: "10px 14px" }}>
          {[activeTab === "Fractional" ? "Fraction" : activeTab === "Number" ? "Number" : "Letter", "Decimal (in)", "mm"].map(h => (
            <div key={h} style={{ color: WHITE, fontSize: 11, fontWeight: 700 }}>{h}</div>
          ))}
        </div>
        {filtered.length === 0
          ? <div style={{ padding: 24, textAlign: "center", color: MUTED, fontSize: 13 }}>No results found</div>
          : filtered.map((row, i) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", padding: "8px 14px", background: row.star ? STAR_BG : i % 2 === 0 ? WHITE : ROW_ALT, borderBottom: `1px solid ${BORDER}`, alignItems: "center" }}>
              <div style={{ fontSize: 13, fontWeight: row.star ? 700 : 500, color: row.star ? NAVY : TEXT, display: "flex", alignItems: "center", gap: 4 }}>
                {row.star && <span style={{ color: AMBER, fontSize: 10 }}>★</span>}
                {getKey(row)}
              </div>
              <div style={{ fontSize: 13, fontWeight: 600, color: NAVY }}>{row.dec}"</div>
              <div style={{ fontSize: 13, color: TEXT }}>{row.mm}</div>
            </div>
          ))
        }
      </div>
    </div>
  );
}
