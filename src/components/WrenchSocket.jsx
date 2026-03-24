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
// 7. WRENCH & SOCKET SIZES
// Sources: ASME B18.2.2, ISO 272, DIN 895, ANSI/ASME B107.5
// ─────────────────────────────────────────────────────────────────────────────

const SAE_WRENCH = [
  { size: "#10",   waf_in: '3/8"',     waf_dec: "0.375", waf_mm: "9.53",  drive: '1/4"', note: "★" },
  { size: '1/4"',  waf_in: '7/16"',    waf_dec: "0.438", waf_mm: "11.13", drive: '1/4"', note: "★" },
  { size: '5/16"', waf_in: '1/2"',     waf_dec: "0.500", waf_mm: "12.70", drive: '1/4"', note: "★" },
  { size: '3/8"',  waf_in: '9/16"',    waf_dec: "0.563", waf_mm: "14.29", drive: '3/8"', note: "★" },
  { size: '7/16"', waf_in: '5/8"',     waf_dec: "0.625", waf_mm: "15.88", drive: '3/8"', note: "" },
  { size: '1/2"',  waf_in: '3/4"',     waf_dec: "0.750", waf_mm: "19.05", drive: '3/8"', note: "★" },
  { size: '9/16"', waf_in: '7/8"',     waf_dec: "0.875", waf_mm: "22.23", drive: '3/8"', note: "" },
  { size: '5/8"',  waf_in: '15/16"',   waf_dec: "0.938", waf_mm: "23.83", drive: '1/2"', note: "" },
  { size: '3/4"',  waf_in: '1-1/8"',   waf_dec: "1.125", waf_mm: "28.58", drive: '1/2"', note: "★" },
  { size: '7/8"',  waf_in: '1-5/16"',  waf_dec: "1.313", waf_mm: "33.34", drive: '1/2"', note: "" },
  { size: '1"',    waf_in: '1-1/2"',   waf_dec: "1.500", waf_mm: "38.10", drive: '1/2"', note: "★" },
  { size: '1-1/4"', waf_in: '1-7/8"', waf_dec: "1.875", waf_mm: "47.63", drive: '3/4"', note: "" },
  { size: '1-1/2"', waf_in: '2-1/4"', waf_dec: "2.250", waf_mm: "57.15", drive: '3/4"', note: "" },
];

const METRIC_WRENCH = [
  { size: "M5",  waf_mm: "8",  waf_in: '5/16"',   drive: '1/4"', note: "★" },
  { size: "M6",  waf_mm: "10", waf_in: '3/8"',    drive: '1/4"', note: "★" },
  { size: "M8",  waf_mm: "13", waf_in: '1/2"',    drive: '3/8"', note: "★" },
  { size: "M10", waf_mm: "17", waf_in: '11/16"',  drive: '3/8"', note: "★" },
  { size: "M12", waf_mm: "19", waf_in: '3/4"',    drive: '3/8"', note: "★" },
  { size: "M14", waf_mm: "22", waf_in: '7/8"',    drive: '1/2"', note: "" },
  { size: "M16", waf_mm: "24", waf_in: '15/16"',  drive: '1/2"', note: "★" },
  { size: "M18", waf_mm: "27", waf_in: '1-1/16"', drive: '1/2"', note: "" },
  { size: "M20", waf_mm: "30", waf_in: '1-3/16"', drive: '1/2"', note: "★" },
  { size: "M24", waf_mm: "36", waf_in: '1-7/16"', drive: '3/4"', note: "★" },
  { size: "M27", waf_mm: "41", waf_in: '1-5/8"',  drive: '3/4"', note: "" },
  { size: "M30", waf_mm: "46", waf_in: '1-13/16"', drive: '3/4"', note: "" },
  { size: "M36", waf_mm: "55", waf_in: '2-3/16"', drive: '1"',   note: "" },
];

const HEX_KEY_SAE = [
  { size: '1/16"',  mm: "1.59", note: "" },  { size: '5/64"',  mm: "1.98", note: "" },
  { size: '3/32"',  mm: "2.38", note: "★" }, { size: '1/8"',   mm: "3.18", note: "★" },
  { size: '5/32"',  mm: "3.97", note: "★" }, { size: '3/16"',  mm: "4.76", note: "★" },
  { size: '1/4"',   mm: "6.35", note: "★" }, { size: '5/16"',  mm: "7.94", note: "★" },
  { size: '3/8"',   mm: "9.53", note: "★" }, { size: '7/16"',  mm: "11.11", note: "" },
  { size: '1/2"',   mm: "12.70", note: "★" },
];

const HEX_KEY_METRIC = [
  { size: "1.5mm", in: '0.059"', note: "" }, { size: "2mm",  in: '0.079"', note: "★" },
  { size: "2.5mm", in: '0.098"', note: "★" }, { size: "3mm",  in: '0.118"', note: "★" },
  { size: "4mm",   in: '0.157"', note: "★" }, { size: "5mm",  in: '0.197"', note: "★" },
  { size: "6mm",   in: '0.236"', note: "★" }, { size: "8mm",  in: '0.315"', note: "★" },
  { size: "10mm",  in: '0.394"', note: "★" }, { size: "12mm", in: '0.472"', note: "★" },
  { size: "14mm",  in: '0.551"', note: "" },  { size: "17mm", in: '0.669"', note: "" },
];

const DRIVE_SIZES = [
  { drive: '1/4" Drive', torqueRange: "Up to 150 in-lb (12.5 ft-lb)", typical: 'Small fasteners #4–3/8"', common: "Tight spaces, electronics, light duty" },
  { drive: '3/8" Drive', torqueRange: "150–250 ft-lb capable", typical: 'Medium fasteners 3/8"–3/4"', common: "Most common shop drive — automotive, general" },
  { drive: '1/2" Drive', torqueRange: "250–600 ft-lb capable", typical: 'Large fasteners 1/2"–1-1/4"', common: "Heavy duty, wheel bolts, structural" },
  { drive: '3/4" Drive', torqueRange: "500–1,500 ft-lb capable", typical: 'Extra large 1" and above', common: "Industrial, heavy equipment, large flanges" },
  { drive: '1" Drive',   torqueRange: "1,000–3,000+ ft-lb", typical: "Very large industrial bolts", common: "Heavy industrial, mining, oil & gas" },
];

export default function WrenchSocket() {
  const [activeTab, setActiveTab] = useState("SAE Bolts");
  const [search, setSearch]       = useState("");

  const tabs = ["SAE Bolts", "Metric Bolts", "Hex Key (SAE)", "Hex Key (Metric)", "Drive Sizes"];

  const getData = () => {
    if (activeTab === "SAE Bolts")       return SAE_WRENCH;
    if (activeTab === "Metric Bolts")    return METRIC_WRENCH;
    if (activeTab === "Hex Key (SAE)")   return HEX_KEY_SAE;
    if (activeTab === "Hex Key (Metric)") return HEX_KEY_METRIC;
    if (activeTab === "Drive Sizes")     return DRIVE_SIZES;
    return [];
  };

  const filtered = getData().filter(r =>
    !search ||
    (r.size  && r.size.toLowerCase().includes(search.toLowerCase())) ||
    (r.waf_mm && r.waf_mm.includes(search)) ||
    (r.waf_in && r.waf_in.toLowerCase().includes(search.toLowerCase())) ||
    (r.mm && r.mm.includes(search)) || (r.in && r.in.includes(search))
  );

  const isDrive    = activeTab === "Drive Sizes";
  const isHexSAE   = activeTab === "Hex Key (SAE)";
  const isHexMet   = activeTab === "Hex Key (Metric)";
  const isSAE      = activeTab === "SAE Bolts";

  return (
    <div style={{ fontFamily: "'DM Sans','Segoe UI',sans-serif", background: BG, minHeight: "100vh", maxWidth: 430, margin: "0 auto" }}>
      <div style={{ background: `linear-gradient(135deg, ${NAVY} 0%, #2C5282 100%)`, padding: "16px 20px 20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
          <span style={{ fontSize: 20 }}>⬡</span>
          <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 10, letterSpacing: 2, textTransform: "uppercase" }}>Fastener Companion</span>
        </div>
        <div style={{ color: WHITE, fontSize: 20, fontWeight: 800, marginBottom: 2 }}>Wrench & Socket Sizes</div>
        <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 11 }}>ASME B18.2.2 · ISO 272 · DIN 895 · ANSI/ASME B107.5</div>
        <div style={{ background: WHITE, borderRadius: 12, display: "flex", alignItems: "center", padding: "10px 14px", gap: 8, marginTop: 14, boxShadow: "0 2px 8px rgba(0,0,0,0.15)" }}>
          <span style={{ color: MUTED }}>🔍</span>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search bolt size or wrench size..."
            style={{ background: "none", border: "none", outline: "none", color: TEXT, fontSize: 14, flex: 1, fontFamily: "inherit" }} />
          {search && <span onClick={() => setSearch("")} style={{ color: MUTED, cursor: "pointer" }}>✕</span>}
        </div>
      </div>

      <div style={{ background: WHITE, borderBottom: `1px solid ${BORDER}`, padding: "0 8px", display: "flex", overflowX: "auto", scrollbarWidth: "none" }}>
        {tabs.map(tab => (
          <button key={tab} onClick={() => { setActiveTab(tab); setSearch(""); }}
            style={{ background: "none", border: "none", cursor: "pointer", padding: "11px 10px", fontSize: 11, fontWeight: 700, fontFamily: "inherit", whiteSpace: "nowrap", flexShrink: 0, color: activeTab === tab ? NAVY : MUTED, borderBottom: activeTab === tab ? `3px solid ${AMBER}` : "3px solid transparent" }}>
            {tab}
          </button>
        ))}
      </div>

      <div style={{ margin: "12px 16px 0", background: STAR_BG, border: `1px solid ${STAR_BORDER}`, borderRadius: 10, padding: "10px 14px" }}>
        <div style={{ fontSize: 11, color: "#92400E", lineHeight: 1.5 }}>
          {(isSAE || activeTab === "Metric Bolts") && <><strong>★ = Most common sizes.</strong> Wrench size = width across flats (WAF) of hex head or nut.</>}
          {isHexSAE   && <><strong>★ = Most common.</strong> Imperial hex key (Allen wrench) sizes for socket head cap screws and set screws.</>}
          {isHexMet   && <><strong>★ = Most common.</strong> Metric hex key sizes. M3=2.5mm, M4=3mm, M5=4mm, M6=5mm, M8=6mm, M10=8mm.</>}
          {isDrive    && <>Drive size determines torque capacity. Use the smallest drive that handles the required torque.</>}
        </div>
      </div>

      <div style={{ margin: "12px 16px 24px", background: WHITE, borderRadius: 14, overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.06)", border: `1px solid ${BORDER}` }}>
        {isDrive ? (
          <>
            <div style={{ background: NAVY, padding: "10px 14px" }}><div style={{ color: WHITE, fontSize: 11, fontWeight: 700 }}>Drive Size Reference</div></div>
            {DRIVE_SIZES.map((item, i) => (
              <div key={i} style={{ padding: "12px 14px", borderBottom: `1px solid ${BORDER}`, background: i % 2 === 0 ? WHITE : ROW_ALT }}>
                <div style={{ fontSize: 13, fontWeight: 800, color: NAVY, marginBottom: 4 }}>{item.drive}</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
                  <div><div style={{ fontSize: 9, color: MUTED, textTransform: "uppercase", letterSpacing: 0.8 }}>Torque Range</div><div style={{ fontSize: 11, fontWeight: 600, color: TEXT }}>{item.torqueRange}</div></div>
                  <div><div style={{ fontSize: 9, color: MUTED, textTransform: "uppercase", letterSpacing: 0.8 }}>Typical Bolt Size</div><div style={{ fontSize: 11, fontWeight: 600, color: TEXT }}>{item.typical}</div></div>
                </div>
                <div style={{ marginTop: 6, fontSize: 11, color: MUTED }}>{item.common}</div>
              </div>
            ))}
          </>
        ) : isHexSAE ? (
          <>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", background: NAVY, padding: "10px 14px" }}>
              <div style={{ color: WHITE, fontSize: 11, fontWeight: 700 }}>Hex Key (Imperial)</div>
              <div style={{ color: WHITE, fontSize: 11, fontWeight: 700 }}>Metric Equivalent</div>
            </div>
            {filtered.map((row, i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", padding: "9px 14px", background: row.note === "★" ? STAR_BG : i % 2 === 0 ? WHITE : ROW_ALT, borderBottom: `1px solid ${BORDER}`, alignItems: "center" }}>
                <div style={{ fontSize: 13, fontWeight: row.note === "★" ? 700 : 500, color: row.note === "★" ? NAVY : TEXT, display: "flex", alignItems: "center", gap: 4 }}>{row.note === "★" && <span style={{ color: AMBER, fontSize: 10 }}>★</span>}{row.size}</div>
                <div style={{ fontSize: 13, color: TEXT }}>{row.mm} mm</div>
              </div>
            ))}
          </>
        ) : isHexMet ? (
          <>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", background: NAVY, padding: "10px 14px" }}>
              <div style={{ color: WHITE, fontSize: 11, fontWeight: 700 }}>Hex Key (Metric)</div>
              <div style={{ color: WHITE, fontSize: 11, fontWeight: 700 }}>Imperial Equivalent</div>
            </div>
            {filtered.map((row, i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", padding: "9px 14px", background: row.note === "★" ? STAR_BG : i % 2 === 0 ? WHITE : ROW_ALT, borderBottom: `1px solid ${BORDER}`, alignItems: "center" }}>
                <div style={{ fontSize: 13, fontWeight: row.note === "★" ? 700 : 500, color: row.note === "★" ? NAVY : TEXT, display: "flex", alignItems: "center", gap: 4 }}>{row.note === "★" && <span style={{ color: AMBER, fontSize: 10 }}>★</span>}{row.size}</div>
                <div style={{ fontSize: 13, color: TEXT }}>{row.in}</div>
              </div>
            ))}
          </>
        ) : (
          <>
            <div style={{ display: "grid", gridTemplateColumns: "0.8fr 0.8fr 0.8fr 0.8fr", background: NAVY, padding: "10px 12px" }}>
              {["Bolt", `WAF ${isSAE ? "(in)" : "(mm)"}`, `WAF ${isSAE ? "(mm)" : "(in)"}`, "Drive"].map(h => (
                <div key={h} style={{ color: WHITE, fontSize: 10, fontWeight: 700 }}>{h}</div>
              ))}
            </div>
            {filtered.map((row, i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "0.8fr 0.8fr 0.8fr 0.8fr", padding: "9px 12px", background: row.note === "★" ? STAR_BG : i % 2 === 0 ? WHITE : ROW_ALT, borderBottom: `1px solid ${BORDER}`, alignItems: "center" }}>
                <div style={{ fontSize: 12, fontWeight: row.note === "★" ? 700 : 500, color: row.note === "★" ? NAVY : TEXT, display: "flex", alignItems: "center", gap: 3 }}>{row.note === "★" && <span style={{ color: AMBER, fontSize: 9 }}>★</span>}{row.size}</div>
                <div style={{ fontSize: 12, fontWeight: 700, color: NAVY }}>{isSAE ? row.waf_in : `${row.waf_mm}mm`}</div>
                <div style={{ fontSize: 11, color: TEXT }}>{isSAE ? `${row.waf_mm}mm` : row.waf_in}</div>
                <div style={{ fontSize: 11, color: MUTED }}>{row.drive}</div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
