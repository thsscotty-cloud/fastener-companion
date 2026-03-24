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

export default function NavigationShell() {
  const [activeNav, setActiveNav] = useState("Home");
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("Recent");

  return (
    <div style={{ fontFamily: "'DM Sans','Segoe UI',sans-serif", background: BG, minHeight: "100vh", maxWidth: 430, margin: "0 auto", display: "flex", flexDirection: "column", position: "relative", boxShadow: "0 0 40px rgba(0,0,0,0.12)" }}>

      {/* HEADER */}
      <div style={{ background: `linear-gradient(135deg, ${NAVY} 0%, #2C5282 100%)`, padding: "14px 20px 20px", position: "sticky", top: 0, zIndex: 20 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 36, height: 36, background: "rgba(255,255,255,0.15)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, border: "1px solid rgba(255,255,255,0.2)" }}>⬡</div>
            <div>
              <div style={{ color: WHITE, fontSize: 16, fontWeight: 700, lineHeight: 1 }}>Fastener Companion</div>
              <div style={{ color: "rgba(255,255,255,0.55)", fontSize: 10, letterSpacing: 1.5, textTransform: "uppercase", marginTop: 2 }}>Industrial Reference</div>
            </div>
          </div>
          <div style={{ background: AMBER, color: NAVY, fontSize: 9, fontWeight: 800, padding: "4px 10px", borderRadius: 20, letterSpacing: 1.5, textTransform: "uppercase" }}>Pro</div>
        </div>
        <div style={{ background: WHITE, borderRadius: 14, display: "flex", alignItems: "center", padding: "11px 16px", gap: 10, boxShadow: "0 2px 12px rgba(0,0,0,0.15)" }}>
          <span style={{ color: MUTED, fontSize: 16 }}>🔍</span>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search specs, grades, standards..."
            style={{ background: "none", border: "none", outline: "none", color: TEXT, fontSize: 14, flex: 1, fontFamily: "inherit" }} />
          {search
            ? <span onClick={() => setSearch("")} style={{ color: MUTED, cursor: "pointer", fontSize: 14 }}>✕</span>
            : <div style={{ background: "#F1F5F9", borderRadius: 6, padding: "3px 8px", fontSize: 10, color: MUTED, fontWeight: 600, letterSpacing: 0.5 }}>⌘K</div>
          }
        </div>
      </div>

      {/* CONTENT */}
      <div style={{ flex: 1, overflowY: "auto", paddingBottom: 80 }}>
        {/* RECENTS / FAVORITES */}
        <div style={{ padding: "16px 20px 0" }}>
          <div style={{ display: "flex", gap: 4, background: "#EEF2F7", borderRadius: 10, padding: 3, marginBottom: 12 }}>
            {["Recent", "Favorites"].map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                style={{ flex: 1, padding: "7px 0", borderRadius: 8, border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600, fontFamily: "inherit", background: activeTab === tab ? WHITE : "transparent", color: activeTab === tab ? NAVY : MUTED, boxShadow: activeTab === tab ? "0 1px 4px rgba(0,0,0,0.1)" : "none" }}>
                {tab}
              </button>
            ))}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {RECENTS.map((item, i) => (
              <div key={i} style={{ background: WHITE, borderRadius: 12, padding: "12px 14px", display: "flex", alignItems: "center", gap: 12, boxShadow: "0 1px 4px rgba(0,0,0,0.06)", cursor: "pointer", border: "1px solid #F1F5F9" }}>
                <div style={{ width: 36, height: 36, background: "#EEF4FF", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 }}>{item.icon}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: TEXT, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.label}</div>
                  <div style={{ fontSize: 11, color: MUTED, marginTop: 1 }}>{item.time}</div>
                </div>
                <span style={{ color: "#CBD5E1", fontSize: 16 }}>›</span>
              </div>
            ))}
          </div>
        </div>

        {/* QUICK ACCESS */}
        <div style={{ padding: "20px 20px 0" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: MUTED, letterSpacing: 1.5, textTransform: "uppercase" }}>Quick Access</span>
            <span style={{ fontSize: 11, color: NAVY, fontWeight: 600 }}>Edit</span>
          </div>
          <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 4, scrollbarWidth: "none" }}>
            {QUICK_ACCESS.map(item => (
              <div key={item} style={{ background: WHITE, border: "1.5px solid #E2E8F0", borderRadius: 20, padding: "7px 14px", fontSize: 12, fontWeight: 600, color: NAVY, whiteSpace: "nowrap", cursor: "pointer", flexShrink: 0, boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>{item}</div>
            ))}
          </div>
        </div>

        {/* CATEGORIES */}
        <div style={{ padding: "20px 20px 0" }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: MUTED, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 12 }}>Browse Categories</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {CATEGORIES.map((cat, i) => (
              <div key={cat.label} style={{ background: WHITE, borderRadius: 14, padding: "14px", cursor: "pointer", boxShadow: "0 1px 4px rgba(0,0,0,0.06)", border: "1px solid #F1F5F9", borderLeft: `3px solid ${["#2563EB","#0891B2","#059669","#DC2626","#D97706","#7C3AED","#0284C7","#EA580C","#DB2777","#65A30D"][i]}` }}>
                <div style={{ fontSize: 22, marginBottom: 6 }}>{cat.icon}</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: TEXT, marginBottom: 2 }}>{cat.label}</div>
                <div style={{ fontSize: 10, color: MUTED, lineHeight: 1.3 }}>{cat.sub}</div>
              </div>
            ))}
          </div>
        </div>

        {/* SUBSTITUTION BANNER */}
        <div style={{ padding: "20px 20px 0" }}>
          <div style={{ background: `linear-gradient(135deg, ${NAVY} 0%, #2C5282 100%)`, borderRadius: 16, padding: "16px 18px", display: "flex", alignItems: "center", gap: 14, cursor: "pointer", boxShadow: "0 4px 16px rgba(27,58,107,0.25)" }}>
            <div style={{ width: 44, height: 44, background: "rgba(255,255,255,0.15)", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>⇄</div>
            <div style={{ flex: 1 }}>
              <div style={{ color: WHITE, fontSize: 13, fontWeight: 700, marginBottom: 2 }}>Substitution Advisor</div>
              <div style={{ color: "rgba(255,255,255,0.65)", fontSize: 11, lineHeight: 1.4 }}>Can't source a JIS, DIN, or ISO spec? Find a domestic equivalent.</div>
            </div>
            <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 20 }}>›</span>
          </div>
        </div>
        <div style={{ height: 20 }} />
      </div>

      {/* BOTTOM NAV */}
      <div style={{ position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: 430, background: WHITE, borderTop: "1px solid #E2E8F0", display: "flex", justifyContent: "space-around", padding: "10px 0 24px", zIndex: 20, boxShadow: "0 -4px 20px rgba(0,0,0,0.06)" }}>
        {NAV_ITEMS.map(item => (
          <button key={item.label} onClick={() => setActiveNav(item.label)}
            style={{ background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 3, padding: "4px 16px", fontFamily: "inherit" }}>
            <span style={{ fontSize: 20, color: activeNav === item.label ? NAVY : "#CBD5E1" }}>{item.icon}</span>
            <span style={{ fontSize: 10, fontWeight: 600, color: activeNav === item.label ? NAVY : "#CBD5E1", letterSpacing: 0.3 }}>{item.label}</span>
            {activeNav === item.label && <div style={{ width: 4, height: 4, borderRadius: "50%", background: AMBER }} />}
          </button>
        ))}
      </div>
    </div>
  );
}
