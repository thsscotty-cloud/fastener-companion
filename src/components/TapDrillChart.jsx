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
// 2. TAP & DRILL CHART
// Sources: ANSI/ASME B1.1, ISO 724, DIN 336 — 75% thread engagement
// ─────────────────────────────────────────────────────────────────────────────

const UNC_DATA = [
  { size: "#0",     tpi: 80,  tapDrill: "3/64",     tapDrillDec: "0.0469", note: "" },
  { size: "#1",     tpi: 64,  tapDrill: "No. 53",   tapDrillDec: "0.0595", note: "" },
  { size: "#2",     tpi: 56,  tapDrill: "No. 50",   tapDrillDec: "0.0700", note: "" },
  { size: "#3",     tpi: 48,  tapDrill: "No. 47",   tapDrillDec: "0.0785", note: "" },
  { size: "#4",     tpi: 40,  tapDrill: "No. 43",   tapDrillDec: "0.0890", note: "" },
  { size: "#5",     tpi: 40,  tapDrill: "No. 38",   tapDrillDec: "0.1015", note: "" },
  { size: "#6",     tpi: 32,  tapDrill: "No. 36",   tapDrillDec: "0.1065", note: "" },
  { size: "#8",     tpi: 32,  tapDrill: "No. 29",   tapDrillDec: "0.1360", note: "" },
  { size: "#10",    tpi: 24,  tapDrill: "No. 25",   tapDrillDec: "0.1495", note: "" },
  { size: "#12",    tpi: 24,  tapDrill: "No. 16",   tapDrillDec: "0.1770", note: "★" },
  { size: '1/4"',   tpi: 20,  tapDrill: "No. 7",    tapDrillDec: "0.2010", note: "★" },
  { size: '5/16"',  tpi: 18,  tapDrill: "F",        tapDrillDec: "0.2570", note: "★" },
  { size: '3/8"',   tpi: 16,  tapDrill: '5/16"',    tapDrillDec: "0.3125", note: "★" },
  { size: '7/16"',  tpi: 14,  tapDrill: "U",        tapDrillDec: "0.3680", note: "" },
  { size: '1/2"',   tpi: 13,  tapDrill: '27/64"',   tapDrillDec: "0.4219", note: "★" },
  { size: '9/16"',  tpi: 12,  tapDrill: '31/64"',   tapDrillDec: "0.4844", note: "" },
  { size: '5/8"',   tpi: 11,  tapDrill: '17/32"',   tapDrillDec: "0.5312", note: "" },
  { size: '3/4"',   tpi: 10,  tapDrill: '21/32"',   tapDrillDec: "0.6562", note: "★" },
  { size: '7/8"',   tpi: 9,   tapDrill: '49/64"',   tapDrillDec: "0.7656", note: "" },
  { size: '1"',     tpi: 8,   tapDrill: '7/8"',     tapDrillDec: "0.8750", note: "" },
  { size: '1-1/8"', tpi: 7,   tapDrill: '63/64"',   tapDrillDec: "0.9844", note: "" },
  { size: '1-1/4"', tpi: 7,   tapDrill: '1-7/64"',  tapDrillDec: "1.1094", note: "" },
  { size: '1-3/8"', tpi: 6,   tapDrill: '1-7/32"',  tapDrillDec: "1.2188", note: "" },
  { size: '1-1/2"', tpi: 6,   tapDrill: '1-11/32"', tapDrillDec: "1.3438", note: "" },
];

const UNF_DATA = [
  { size: "#0",     tpi: 80, tapDrill: "3/64",     tapDrillDec: "0.0469", note: "" },
  { size: "#1",     tpi: 72, tapDrill: "No. 53",   tapDrillDec: "0.0595", note: "" },
  { size: "#2",     tpi: 64, tapDrill: "No. 50",   tapDrillDec: "0.0700", note: "" },
  { size: "#3",     tpi: 56, tapDrill: "No. 45",   tapDrillDec: "0.0820", note: "" },
  { size: "#4",     tpi: 48, tapDrill: "No. 42",   tapDrillDec: "0.0935", note: "" },
  { size: "#5",     tpi: 44, tapDrill: "No. 37",   tapDrillDec: "0.1040", note: "" },
  { size: "#6",     tpi: 40, tapDrill: "No. 33",   tapDrillDec: "0.1130", note: "" },
  { size: "#8",     tpi: 36, tapDrill: "No. 29",   tapDrillDec: "0.1360", note: "" },
  { size: "#10",    tpi: 32, tapDrill: "No. 21",   tapDrillDec: "0.1590", note: "" },
  { size: "#12",    tpi: 28, tapDrill: "No. 15",   tapDrillDec: "0.1800", note: "" },
  { size: '1/4"',   tpi: 28, tapDrill: "No. 3",    tapDrillDec: "0.2130", note: "★" },
  { size: '5/16"',  tpi: 24, tapDrill: "I",        tapDrillDec: "0.2720", note: "" },
  { size: '3/8"',   tpi: 24, tapDrill: "Q",        tapDrillDec: "0.3320", note: "" },
  { size: '7/16"',  tpi: 20, tapDrill: '25/64"',   tapDrillDec: "0.3906", note: "" },
  { size: '1/2"',   tpi: 20, tapDrill: '29/64"',   tapDrillDec: "0.4531", note: "" },
  { size: '9/16"',  tpi: 18, tapDrill: '33/64"',   tapDrillDec: "0.5156", note: "" },
  { size: '5/8"',   tpi: 18, tapDrill: '37/64"',   tapDrillDec: "0.5781", note: "" },
  { size: '3/4"',   tpi: 16, tapDrill: '11/16"',   tapDrillDec: "0.6875", note: "" },
  { size: '7/8"',   tpi: 14, tapDrill: '13/16"',   tapDrillDec: "0.8125", note: "" },
  { size: '1"',     tpi: 12, tapDrill: '15/16"',   tapDrillDec: "0.9375", note: "" },
];

const METRIC_COARSE_TD = [
  { size: "M1",   pitch: "0.25", tapDrill: "0.75",  note: "" },
  { size: "M1.2", pitch: "0.25", tapDrill: "0.95",  note: "" },
  { size: "M1.4", pitch: "0.30", tapDrill: "1.10",  note: "" },
  { size: "M1.6", pitch: "0.35", tapDrill: "1.25",  note: "" },
  { size: "M2",   pitch: "0.40", tapDrill: "1.60",  note: "" },
  { size: "M2.5", pitch: "0.45", tapDrill: "2.05",  note: "" },
  { size: "M3",   pitch: "0.50", tapDrill: "2.50",  note: "★" },
  { size: "M4",   pitch: "0.70", tapDrill: "3.30",  note: "★" },
  { size: "M5",   pitch: "0.80", tapDrill: "4.20",  note: "★" },
  { size: "M6",   pitch: "1.00", tapDrill: "5.00",  note: "★" },
  { size: "M8",   pitch: "1.25", tapDrill: "6.80",  note: "★" },
  { size: "M10",  pitch: "1.50", tapDrill: "8.50",  note: "★" },
  { size: "M12",  pitch: "1.75", tapDrill: "10.20", note: "★" },
  { size: "M14",  pitch: "2.00", tapDrill: "12.00", note: "" },
  { size: "M16",  pitch: "2.00", tapDrill: "14.00", note: "★" },
  { size: "M18",  pitch: "2.50", tapDrill: "15.50", note: "" },
  { size: "M20",  pitch: "2.50", tapDrill: "17.50", note: "★" },
  { size: "M22",  pitch: "2.50", tapDrill: "19.50", note: "" },
  { size: "M24",  pitch: "3.00", tapDrill: "21.00", note: "" },
  { size: "M27",  pitch: "3.00", tapDrill: "24.00", note: "" },
  { size: "M30",  pitch: "3.50", tapDrill: "26.50", note: "" },
  { size: "M33",  pitch: "3.50", tapDrill: "29.50", note: "" },
  { size: "M36",  pitch: "4.00", tapDrill: "32.00", note: "" },
  { size: "M42",  pitch: "4.50", tapDrill: "37.50", note: "" },
  { size: "M48",  pitch: "5.00", tapDrill: "43.00", note: "" },
  { size: "M56",  pitch: "5.50", tapDrill: "50.50", note: "" },
  { size: "M64",  pitch: "6.00", tapDrill: "58.00", note: "" },
];

const METRIC_FINE_TD = [
  { size: "M8",  pitch: "1.00", tapDrill: "7.00",  note: "" },
  { size: "M10", pitch: "1.00", tapDrill: "9.00",  note: "" },
  { size: "M10", pitch: "1.25", tapDrill: "8.75",  note: "" },
  { size: "M12", pitch: "1.25", tapDrill: "10.75", note: "" },
  { size: "M12", pitch: "1.50", tapDrill: "10.50", note: "" },
  { size: "M14", pitch: "1.50", tapDrill: "12.50", note: "" },
  { size: "M16", pitch: "1.50", tapDrill: "14.50", note: "" },
  { size: "M18", pitch: "1.50", tapDrill: "16.50", note: "" },
  { size: "M20", pitch: "1.50", tapDrill: "18.50", note: "" },
  { size: "M20", pitch: "2.00", tapDrill: "18.00", note: "" },
  { size: "M22", pitch: "1.50", tapDrill: "20.50", note: "" },
  { size: "M24", pitch: "2.00", tapDrill: "22.00", note: "" },
  { size: "M27", pitch: "2.00", tapDrill: "25.00", note: "" },
  { size: "M30", pitch: "2.00", tapDrill: "28.00", note: "" },
  { size: "M36", pitch: "3.00", tapDrill: "33.00", note: "" },
  { size: "M42", pitch: "3.00", tapDrill: "39.00", note: "" },
  { size: "M48", pitch: "3.00", tapDrill: "45.00", note: "" },
];

export default function TapDrillChart() {
  const [activeTab, setActiveTab] = useState("UNC");
  const [search, setSearch] = useState("");

  const tabs = ["UNC", "UNF", "Metric Coarse", "Metric Fine"];

  const getData = () => {
    switch (activeTab) {
      case "UNC": return UNC_DATA;
      case "UNF": return UNF_DATA;
      case "Metric Coarse": return METRIC_COARSE_TD;
      case "Metric Fine":   return METRIC_FINE_TD;
      default: return [];
    }
  };

  const filtered = getData().filter(r =>
    r.size.toLowerCase().includes(search.toLowerCase()) ||
    (r.tapDrill && r.tapDrill.toLowerCase().includes(search.toLowerCase()))
  );

  const isMetric = activeTab.startsWith("Metric");

  return (
    <div style={{ fontFamily: "'DM Sans','Segoe UI',sans-serif", background: BG, minHeight: "100vh", maxWidth: 430, margin: "0 auto" }}>
      <div style={{ background: `linear-gradient(135deg, ${NAVY} 0%, #2C5282 100%)`, padding: "16px 20px 20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
          <span style={{ fontSize: 22 }}>⬡</span>
          <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 10, letterSpacing: 2, textTransform: "uppercase" }}>Fastener Companion</span>
        </div>
        <div style={{ color: WHITE, fontSize: 20, fontWeight: 800, marginBottom: 2 }}>Tap & Drill Chart</div>
        <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 11 }}>75% thread engagement — ANSI/ASME B1.1 · ISO 724 · DIN 336</div>
        <div style={{ background: WHITE, borderRadius: 12, display: "flex", alignItems: "center", padding: "10px 14px", gap: 8, marginTop: 14, boxShadow: "0 2px 8px rgba(0,0,0,0.15)" }}>
          <span style={{ color: MUTED }}>🔍</span>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search size or drill..."
            style={{ background: "none", border: "none", outline: "none", color: TEXT, fontSize: 14, flex: 1, fontFamily: "inherit" }} />
          {search && <span onClick={() => setSearch("")} style={{ color: MUTED, cursor: "pointer" }}>✕</span>}
        </div>
      </div>

      <div style={{ background: WHITE, borderBottom: `1px solid ${BORDER}`, padding: "0 12px", display: "flex", gap: 2, overflowX: "auto", scrollbarWidth: "none" }}>
        {tabs.map(tab => (
          <button key={tab} onClick={() => { setActiveTab(tab); setSearch(""); }}
            style={{ background: "none", border: "none", cursor: "pointer", padding: "12px 10px", fontSize: 12, fontWeight: 700, fontFamily: "inherit", whiteSpace: "nowrap", flexShrink: 0, color: activeTab === tab ? NAVY : MUTED, borderBottom: activeTab === tab ? `3px solid ${AMBER}` : "3px solid transparent" }}>
            {tab}
          </button>
        ))}
      </div>

      <div style={{ margin: "12px 16px 0", background: STAR_BG, border: `1px solid ${STAR_BORDER}`, borderRadius: 10, padding: "10px 14px" }}>
        <div style={{ fontSize: 11, color: "#92400E", lineHeight: 1.5 }}>
          <strong>★ = Most common sizes.</strong> All values at 75% thread engagement — 95% of max thread strength.
          {isMetric && <span> <strong>Formula:</strong> Tap Drill = Major Ø − Pitch</span>}
        </div>
      </div>

      <div style={{ margin: "12px 16px 24px", background: WHITE, borderRadius: 14, overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.06)", border: `1px solid ${BORDER}` }}>
        <div style={{ display: "grid", gridTemplateColumns: isMetric ? "1fr 1fr 1fr" : "1fr 1fr 1fr 1fr", background: NAVY, padding: "10px 14px" }}>
          {(isMetric ? ["Size", "Pitch (mm)", "Tap Drill (mm)"] : ["Size", "TPI", "Tap Drill", 'Decimal"']).map(h => (
            <div key={h} style={{ color: WHITE, fontSize: 11, fontWeight: 700, letterSpacing: 0.5 }}>{h}</div>
          ))}
        </div>
        {filtered.length === 0
          ? <div style={{ padding: "24px", textAlign: "center", color: MUTED, fontSize: 13 }}>No results found</div>
          : filtered.map((row, i) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: isMetric ? "1fr 1fr 1fr" : "1fr 1fr 1fr 1fr", padding: "9px 14px", background: row.note === "★" ? STAR_BG : i % 2 === 0 ? WHITE : ROW_ALT, borderBottom: `1px solid ${BORDER}`, alignItems: "center" }}>
              <div style={{ fontSize: 13, fontWeight: row.note === "★" ? 700 : 500, color: row.note === "★" ? NAVY : TEXT, display: "flex", alignItems: "center", gap: 4 }}>
                {row.note === "★" && <span style={{ color: AMBER, fontSize: 10 }}>★</span>}
                {row.size}
              </div>
              <div style={{ fontSize: 13, color: TEXT }}>{isMetric ? row.pitch : row.tpi}</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: NAVY }}>{row.tapDrill}</div>
              {!isMetric && <div style={{ fontSize: 11, color: MUTED }}>{row.tapDrillDec}"</div>}
            </div>
          ))
        }
      </div>

      <div style={{ margin: "0 16px 16px", background: WHITE, borderRadius: 14, overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.06)", border: `1px solid ${BORDER}` }}>
        <div style={{ background: NAVY, padding: "10px 14px" }}><div style={{ color: WHITE, fontSize: 12, fontWeight: 700 }}>Material Guidance</div></div>
        {[
          { mat: "Mild Steel / Cast Iron", guidance: "Standard chart values. Use cutting oil." },
          { mat: "Stainless Steel",        guidance: "Go 0.1–0.2mm larger. Use cobalt tap + cutting paste." },
          { mat: "Aluminum / Brass",       guidance: "Standard values. High RPM, light feed." },
          { mat: "Titanium / Hardened",    guidance: "Go 0.2mm larger. Low RPM, flood coolant." },
          { mat: "Plastics",               guidance: "Go 0.1–0.2mm larger to reduce tap stress." },
        ].map((item, i) => (
          <div key={i} style={{ padding: "9px 14px", borderBottom: `1px solid ${BORDER}`, background: i % 2 === 0 ? WHITE : ROW_ALT }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: NAVY, marginBottom: 2 }}>{item.mat}</div>
            <div style={{ fontSize: 11, color: MUTED }}>{item.guidance}</div>
          </div>
        ))}
      </div>

      <div style={{ margin: "0 16px 24px", background: "#FFF1F2", border: "1px solid #FECDD3", borderRadius: 10, padding: "10px 14px" }}>
        <div style={{ fontSize: 10, color: "#9F1239", lineHeight: 1.5 }}>
          <strong>⚠ Verify Before Use.</strong> Values based on ANSI/ASME B1.1 and ISO 724 at 75% thread engagement. Fastener Companion is a reference tool — not a substitute for engineering judgment.
        </div>
      </div>
    </div>
  );
}
