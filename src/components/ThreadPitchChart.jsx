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
// 4. THREAD PITCH CHART
// Sources: ASME/ANSI B1.1-2024 (UNC/UNF/UNEF), ISO 261, ISO 262, ISO 68-1
// ─────────────────────────────────────────────────────────────────────────────

const UNC_PITCH = [
  { size: "#6",     majorIn: "0.1380", majorMm: "3.505",  tpi: 32,   pitchMm: "0.794", pitchIn: "0.0313", use: "Light duty, panels",     star: true },
  { size: "#8",     majorIn: "0.1640", majorMm: "4.166",  tpi: 32,   pitchMm: "0.794", pitchIn: "0.0313", use: "Light duty, sheet metal", star: true },
  { size: "#10",    majorIn: "0.1900", majorMm: "4.826",  tpi: 24,   pitchMm: "1.058", pitchIn: "0.0417", use: "General purpose, light",  star: true },
  { size: '#1/4"',  majorIn: "0.2500", majorMm: "6.350",  tpi: 20,   pitchMm: "1.270", pitchIn: "0.0500", use: "General purpose",         star: true },
  { size: '5/16"',  majorIn: "0.3125", majorMm: "7.938",  tpi: 18,   pitchMm: "1.411", pitchIn: "0.0556", use: "General purpose",         star: true },
  { size: '3/8"',   majorIn: "0.3750", majorMm: "9.525",  tpi: 16,   pitchMm: "1.588", pitchIn: "0.0625", use: "General purpose",         star: true },
  { size: '7/16"',  majorIn: "0.4375", majorMm: "11.113", tpi: 14,   pitchMm: "1.814", pitchIn: "0.0714", use: "General purpose",         star: false },
  { size: '1/2"',   majorIn: "0.5000", majorMm: "12.700", tpi: 13,   pitchMm: "1.954", pitchIn: "0.0769", use: "General purpose",         star: true },
  { size: '9/16"',  majorIn: "0.5625", majorMm: "14.288", tpi: 12,   pitchMm: "2.117", pitchIn: "0.0833", use: "General purpose",         star: false },
  { size: '5/8"',   majorIn: "0.6250", majorMm: "15.875", tpi: 11,   pitchMm: "2.309", pitchIn: "0.0909", use: "General purpose",         star: false },
  { size: '3/4"',   majorIn: "0.7500", majorMm: "19.050", tpi: 10,   pitchMm: "2.540", pitchIn: "0.1000", use: "Heavy duty",              star: true },
  { size: '7/8"',   majorIn: "0.8750", majorMm: "22.225", tpi: 9,    pitchMm: "2.822", pitchIn: "0.1111", use: "Heavy duty",              star: false },
  { size: '1"',     majorIn: "1.0000", majorMm: "25.400", tpi: 8,    pitchMm: "3.175", pitchIn: "0.1250", use: "Heavy duty",              star: true },
  { size: '1-1/4"', majorIn: "1.2500", majorMm: "31.750", tpi: 7,    pitchMm: "3.629", pitchIn: "0.1429", use: "Heavy structural",        star: false },
  { size: '1-1/2"', majorIn: "1.5000", majorMm: "38.100", tpi: 6,    pitchMm: "4.233", pitchIn: "0.1667", use: "Heavy structural",        star: false },
  { size: '2"',     majorIn: "2.0000", majorMm: "50.800", tpi: 4.5,  pitchMm: "5.644", pitchIn: "0.2222", use: "Heavy structural",        star: false },
];

const UNF_PITCH = [
  { size: "#10",   majorIn: "0.1900", majorMm: "4.826",  tpi: 32, pitchMm: "0.794", pitchIn: "0.0313", use: "Precision, automotive", star: true },
  { size: '1/4"',  majorIn: "0.2500", majorMm: "6.350",  tpi: 28, pitchMm: "0.907", pitchIn: "0.0357", use: "Automotive, precision",  star: true },
  { size: '5/16"', majorIn: "0.3125", majorMm: "7.938",  tpi: 24, pitchMm: "1.058", pitchIn: "0.0417", use: "Automotive, precision",  star: false },
  { size: '3/8"',  majorIn: "0.3750", majorMm: "9.525",  tpi: 24, pitchMm: "1.058", pitchIn: "0.0417", use: "Automotive, precision",  star: false },
  { size: '7/16"', majorIn: "0.4375", majorMm: "11.113", tpi: 20, pitchMm: "1.270", pitchIn: "0.0500", use: "Automotive",             star: false },
  { size: '1/2"',  majorIn: "0.5000", majorMm: "12.700", tpi: 20, pitchMm: "1.270", pitchIn: "0.0500", use: "Automotive, precision",  star: true },
  { size: '5/8"',  majorIn: "0.6250", majorMm: "15.875", tpi: 18, pitchMm: "1.411", pitchIn: "0.0556", use: "Precision",              star: false },
  { size: '3/4"',  majorIn: "0.7500", majorMm: "19.050", tpi: 16, pitchMm: "1.588", pitchIn: "0.0625", use: "Precision, vibration",   star: true },
  { size: '1"',    majorIn: "1.0000", majorMm: "25.400", tpi: 12, pitchMm: "2.117", pitchIn: "0.0833", use: "Precision, vibration",   star: true },
];

const METRIC_PITCH = [
  { size: "M3",  coarse: "0.50", fine1: "-",    fine2: "-",    tpiCoarse: "50.8", use: "General purpose", star: true },
  { size: "M4",  coarse: "0.70", fine1: "-",    fine2: "-",    tpiCoarse: "36.3", use: "General purpose", star: true },
  { size: "M5",  coarse: "0.80", fine1: "-",    fine2: "-",    tpiCoarse: "31.8", use: "General purpose", star: true },
  { size: "M6",  coarse: "1.00", fine1: "-",    fine2: "-",    tpiCoarse: "25.4", use: "General purpose", star: true },
  { size: "M8",  coarse: "1.25", fine1: "1.00", fine2: "-",    tpiCoarse: "20.3", use: "General purpose", star: true },
  { size: "M10", coarse: "1.50", fine1: "1.25", fine2: "1.00", tpiCoarse: "16.9", use: "General purpose", star: true },
  { size: "M12", coarse: "1.75", fine1: "1.50", fine2: "1.25", tpiCoarse: "14.5", use: "General purpose", star: true },
  { size: "M14", coarse: "2.00", fine1: "1.50", fine2: "-",    tpiCoarse: "12.7", use: "General purpose", star: true },
  { size: "M16", coarse: "2.00", fine1: "1.50", fine2: "-",    tpiCoarse: "12.7", use: "General purpose", star: true },
  { size: "M18", coarse: "2.50", fine1: "2.00", fine2: "1.50", tpiCoarse: "10.2", use: "Heavy duty",      star: false },
  { size: "M20", coarse: "2.50", fine1: "2.00", fine2: "1.50", tpiCoarse: "10.2", use: "Heavy duty",      star: true },
  { size: "M22", coarse: "2.50", fine1: "2.00", fine2: "1.50", tpiCoarse: "10.2", use: "Heavy duty",      star: false },
  { size: "M24", coarse: "3.00", fine1: "2.00", fine2: "-",    tpiCoarse: "8.5",  use: "Heavy duty",      star: true },
  { size: "M30", coarse: "3.50", fine1: "2.00", fine2: "-",    tpiCoarse: "7.3",  use: "Heavy structural", star: false },
  { size: "M36", coarse: "4.00", fine1: "3.00", fine2: "-",    tpiCoarse: "6.4",  use: "Heavy structural", star: false },
  { size: "M42", coarse: "4.50", fine1: "3.00", fine2: "-",    tpiCoarse: "5.6",  use: "Heavy structural", star: false },
  { size: "M48", coarse: "5.00", fine1: "3.00", fine2: "-",    tpiCoarse: "5.1",  use: "Heavy structural", star: false },
];

export default function ThreadPitchChart() {
  const [activeTab, setActiveTab]     = useState("UNC");
  const [search, setSearch]           = useState("");
  const [activeSection, setActiveSection] = useState("chart");
  const [pitchInput, setPitchInput]   = useState("");
  const [convertResult, setConvertResult] = useState(null);

  const tabs = ["UNC", "UNF", "Metric"];

  const getData = () => {
    if (activeTab === "UNC")    return UNC_PITCH;
    if (activeTab === "UNF")    return UNF_PITCH;
    if (activeTab === "Metric") return METRIC_PITCH;
    return [];
  };

  const filtered = getData().filter(r => r.size.toLowerCase().includes(search.toLowerCase()));
  const isMetric = activeTab === "Metric";

  const handleConvert = (fromMm) => {
    const val = parseFloat(pitchInput);
    if (!val || val <= 0) return;
    if (fromMm) {
      setConvertResult({ tpi: (25.4 / val).toFixed(2), pitchMm: val.toFixed(3), pitchIn: (val / 25.4).toFixed(4) });
    } else {
      setConvertResult({ tpi: val.toFixed(0), pitchMm: (25.4 / val).toFixed(3), pitchIn: (1 / val).toFixed(4) });
    }
  };

  return (
    <div style={{ fontFamily: "'DM Sans','Segoe UI',sans-serif", background: BG, minHeight: "100vh", maxWidth: 430, margin: "0 auto" }}>
      <div style={{ background: `linear-gradient(135deg, ${NAVY} 0%, #2C5282 100%)`, padding: "16px 20px 20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
          <span style={{ fontSize: 20 }}>⬡</span>
          <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 10, letterSpacing: 2, textTransform: "uppercase" }}>Fastener Companion</span>
        </div>
        <div style={{ color: WHITE, fontSize: 20, fontWeight: 800, marginBottom: 2 }}>Thread Pitch Chart</div>
        <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 11 }}>ASME/ANSI B1.1-2024 · ISO 261 · ISO 262 · ISO 68-1</div>
        <div style={{ background: WHITE, borderRadius: 12, display: "flex", alignItems: "center", padding: "10px 14px", gap: 8, marginTop: 14, boxShadow: "0 2px 8px rgba(0,0,0,0.15)" }}>
          <span style={{ color: MUTED }}>🔍</span>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search size..."
            style={{ background: "none", border: "none", outline: "none", color: TEXT, fontSize: 14, flex: 1, fontFamily: "inherit" }} />
          {search && <span onClick={() => setSearch("")} style={{ color: MUTED, cursor: "pointer" }}>✕</span>}
        </div>
      </div>

      <div style={{ background: WHITE, borderBottom: `1px solid ${BORDER}`, padding: "0 12px", display: "flex" }}>
        {["chart", "convert"].map(s => (
          <button key={s} onClick={() => setActiveSection(s)}
            style={{ background: "none", border: "none", cursor: "pointer", padding: "12px 14px", fontSize: 12, fontWeight: 700, fontFamily: "inherit", color: activeSection === s ? NAVY : MUTED, borderBottom: activeSection === s ? `3px solid ${AMBER}` : "3px solid transparent" }}>
            {s === "chart" ? "Chart" : "TPI ↔ mm Converter"}
          </button>
        ))}
      </div>

      {activeSection === "chart" && (
        <>
          <div style={{ background: WHITE, borderBottom: `1px solid ${BORDER}`, padding: "0 8px", display: "flex", overflowX: "auto", scrollbarWidth: "none" }}>
            {tabs.map(tab => (
              <button key={tab} onClick={() => { setActiveTab(tab); setSearch(""); }}
                style={{ background: "none", border: "none", cursor: "pointer", padding: "10px 10px", fontSize: 11, fontWeight: 700, fontFamily: "inherit", whiteSpace: "nowrap", flexShrink: 0, color: activeTab === tab ? NAVY : MUTED, borderBottom: activeTab === tab ? `3px solid ${AMBER}` : "3px solid transparent" }}>
                {tab}
              </button>
            ))}
          </div>

          <div style={{ margin: "12px 16px 0", background: STAR_BG, border: `1px solid ${STAR_BORDER}`, borderRadius: 10, padding: "10px 14px" }}>
            <div style={{ fontSize: 11, color: "#92400E", lineHeight: 1.6 }}>
              {activeTab === "UNC" && <><strong>UNC — Unified National Coarse</strong> · ASME B1.1 · Most common for general industrial use. Faster assembly, more resistant to cross-threading.</>}
              {activeTab === "UNF" && <><strong>UNF — Unified National Fine</strong> · ASME B1.1 · Better vibration resistance, higher clamp load accuracy. Use for automotive, aerospace, thin sections.</>}
              {activeTab === "Metric" && <><strong>ISO Metric Threads</strong> · ISO 261/262 · Pitch = mm between threads. Coarse is default (e.g. M10). Fine must be specified (e.g. M10×1.25).</>}
            </div>
          </div>

          <div style={{ margin: "12px 16px 24px", background: WHITE, borderRadius: 14, overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.06)", border: `1px solid ${BORDER}` }}>
            {isMetric ? (
              <div style={{ display: "grid", gridTemplateColumns: "0.8fr 0.7fr 0.7fr 0.7fr 1fr", background: NAVY, padding: "10px 10px" }}>
                {["Size", "Coarse", "Fine 1", "Fine 2", "TPI (Crs)"].map(h => <div key={h} style={{ color: WHITE, fontSize: 10, fontWeight: 700 }}>{h}</div>)}
              </div>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "0.9fr 0.6fr 0.7fr 0.7fr 1fr", background: NAVY, padding: "10px 10px" }}>
                {["Size", "TPI", "Pitch mm", "Pitch in", "Application"].map(h => <div key={h} style={{ color: WHITE, fontSize: 10, fontWeight: 700 }}>{h}</div>)}
              </div>
            )}
            {filtered.map((row, i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: isMetric ? "0.8fr 0.7fr 0.7fr 0.7fr 1fr" : "0.9fr 0.6fr 0.7fr 0.7fr 1fr", padding: "9px 10px", background: row.star ? STAR_BG : i % 2 === 0 ? WHITE : ROW_ALT, borderBottom: `1px solid ${BORDER}`, alignItems: "center" }}>
                {isMetric ? (
                  <>
                    <div style={{ fontSize: 12, fontWeight: row.star ? 700 : 600, color: row.star ? NAVY : TEXT, display: "flex", alignItems: "center", gap: 3 }}>{row.star && <span style={{ color: AMBER, fontSize: 9 }}>★</span>}{row.size}</div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: NAVY }}>{row.coarse}</div>
                    <div style={{ fontSize: 12, color: row.fine1 === "-" ? MUTED : TEXT }}>{row.fine1}</div>
                    <div style={{ fontSize: 12, color: row.fine2 === "-" ? MUTED : TEXT }}>{row.fine2}</div>
                    <div style={{ fontSize: 10, color: MUTED }}>{row.tpiCoarse} TPI</div>
                  </>
                ) : (
                  <>
                    <div style={{ fontSize: 12, fontWeight: row.star ? 700 : 600, color: row.star ? NAVY : TEXT, display: "flex", alignItems: "center", gap: 3 }}>{row.star && <span style={{ color: AMBER, fontSize: 9 }}>★</span>}{row.size}</div>
                    <div style={{ fontSize: 13, fontWeight: 800, color: NAVY }}>{row.tpi}</div>
                    <div style={{ fontSize: 12, color: TEXT }}>{row.pitchMm}</div>
                    <div style={{ fontSize: 11, color: MUTED }}>{row.pitchIn}"</div>
                    <div style={{ fontSize: 10, color: MUTED, lineHeight: 1.3 }}>{row.use}</div>
                  </>
                )}
              </div>
            ))}
          </div>
        </>
      )}

      {activeSection === "convert" && (
        <div style={{ padding: "16px" }}>
          <div style={{ background: WHITE, borderRadius: 14, padding: "16px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)", border: `1px solid ${BORDER}`, marginBottom: 12 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: NAVY, marginBottom: 12 }}>Pitch ↔ TPI Converter</div>
            <input value={pitchInput} onChange={e => { setPitchInput(e.target.value); setConvertResult(null); }} placeholder="e.g. 1.25 (mm pitch) or 20 (TPI)"
              style={{ width: "100%", padding: "10px 14px", borderRadius: 10, border: `1.5px solid ${BORDER}`, fontSize: 14, color: TEXT, fontFamily: "inherit", outline: "none", boxSizing: "border-box", marginBottom: 10 }} />
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={() => handleConvert(true)} style={{ flex: 1, padding: "10px", background: NAVY, color: WHITE, border: "none", borderRadius: 10, fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>mm Pitch → TPI</button>
              <button onClick={() => handleConvert(false)} style={{ flex: 1, padding: "10px", background: "#EEF4FF", color: NAVY, border: `1.5px solid ${BORDER}`, borderRadius: 10, fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>TPI → mm Pitch</button>
            </div>
          </div>
          {convertResult && (
            <div style={{ background: STAR_BG, border: `1px solid ${STAR_BORDER}`, borderRadius: 14, padding: "16px" }}>
              <div style={{ fontSize: 12, fontWeight: 800, color: "#92400E", marginBottom: 10 }}>Result:</div>
              {[
                { label: "TPI (Threads Per Inch)", value: convertResult.tpi },
                { label: "Pitch (mm)",             value: `${convertResult.pitchMm} mm` },
                { label: "Pitch (inches)",          value: `${convertResult.pitchIn}"` },
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: i < 2 ? `1px solid ${STAR_BORDER}` : "none" }}>
                  <span style={{ fontSize: 12, color: "#92400E" }}>{item.label}</span>
                  <span style={{ fontSize: 14, fontWeight: 800, color: NAVY }}>{item.value}</span>
                </div>
              ))}
              <div style={{ marginTop: 10, fontSize: 10, color: "#92400E" }}>Formula: Pitch (mm) = 25.4 ÷ TPI</div>
            </div>
          )}
        </div>
      )}

      <div style={{ margin: "0 16px 24px", background: "#FFF1F2", border: "1px solid #FECDD3", borderRadius: 10, padding: "10px 14px" }}>
        <div style={{ fontSize: 10, color: "#9F1239", lineHeight: 1.5 }}>
          <strong>⚠ Verify Before Use.</strong> Thread pitch data based on ASME/ANSI B1.1-2024 and ISO 261/262. Always confirm thread compatibility before assembly. Fastener Companion is a reference tool.
        </div>
      </div>
    </div>
  );
}
