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

