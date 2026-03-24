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
// 5. BOLT GRADE MARKINGS
// Sources: SAE J429, ASTM A307/A325/A354/A449/A490/A193/A574, ISO 898-1, ISO 3506
// ─────────────────────────────────────────────────────────────────────────────

const SAE_GRADES = [
  { grade: "Grade 2", standard: "SAE J429", astmEquiv: "ASTM A307 Gr.A", marking: "No markings (plain head)", material: "Low carbon steel", proofPsi: "55,000", yieldPsi: "57,000", tensilePsi: "74,000", tensileKsi: "74", tensileMpa: "510", hardness: "B70–B100", sizeRange: '1/4" – 3/4"', color: "#64748B", use: "Non-critical, light duty, general purpose", notes: "No heat treatment required. Not for structural or high-stress applications.", star: false },
  { grade: "Grade 5", standard: "SAE J429", astmEquiv: "ASTM A449", marking: "3 equally spaced radial lines", material: "Medium carbon steel, Q&T", proofPsi: "85,000", yieldPsi: "92,000", tensilePsi: "120,000", tensileKsi: "120", tensileMpa: "827", hardness: "C25–C34", sizeRange: '1/4" – 1"', color: "#2563EB", use: "Automotive, machinery, general industrial", notes: "Most common mid-strength fastener in North America. Good balance of strength and cost.", star: true },
  { grade: "Grade 8", standard: "SAE J429", astmEquiv: "ASTM A354 Gr.BD", marking: "6 equally spaced radial lines", material: "Alloy steel (4140/4340), Q&T", proofPsi: "120,000", yieldPsi: "130,000", tensilePsi: "150,000", tensileKsi: "150", tensileMpa: "1034", hardness: "C33–C39", sizeRange: '1/4" – 1-1/2"', color: "#DC2626", use: "Heavy machinery, structural, high-stress", notes: "Most common high-strength bolt in North America.", star: true },
];

const ASTM_GRADES = [
  { grade: "A307 Gr.A",    standard: "ASTM A307", saeEquiv: "≈ SAE Grade 2",           marking: "A307 stamped on head", material: "Low carbon steel", proofPsi: "—", yieldPsi: "—", tensilePsi: "60,000 min", tensileKsi: "60",  tensileMpa: "414",  hardness: "—",       sizeRange: '1/4" – 4"',         color: "#64748B", use: "General purpose, non-structural",                 notes: "Piping and mechanical applications. No proof load requirement.",                  star: false },
  { grade: "A325 Type 1",  standard: "ASTM A325", saeEquiv: "≈ SAE Grade 5 (structural)", marking: "A325 stamped on head", material: "Medium carbon steel, Q&T", proofPsi: "85,000", yieldPsi: "92,000", tensilePsi: "120,000", tensileKsi: "120", tensileMpa: "827", hardness: "C25–C34", sizeRange: '1/2" – 1-1/2"', color: "#2563EB", use: "Structural steel connections (AISC)", notes: "Heavy hex head only. Must be used with A563 heavy hex nuts and F436 hardened washers.", star: true },
  { grade: "A490 Type 1",  standard: "ASTM A490", saeEquiv: "≈ SAE Grade 8 (structural)", marking: "A490 stamped on head", material: "Alloy steel, Q&T", proofPsi: "120,000", yieldPsi: "130,000", tensilePsi: "150,000–173,000", tensileKsi: "150", tensileMpa: "1034", hardness: "C33–C38", sizeRange: '1/2" – 1-1/2"', color: "#DC2626", use: "High-strength structural steel connections", notes: "Heavy hex head only. CANNOT be galvanized — hydrogen embrittlement risk.", star: true },
  { grade: "A193 Gr.B7",  standard: "ASTM A193", saeEquiv: "≈ SAE Grade 5 (HT alloy)", marking: "B7 stamped on head/end", material: "Cr-Mo alloy steel (4140), Q&T", proofPsi: "—", yieldPsi: "105,000", tensilePsi: "125,000", tensileKsi: "125", tensileMpa: "862", hardness: "C35 max", sizeRange: "All sizes (stud bolts)", color: "#7C3AED", use: "High temp/pressure — flanges, pressure vessels, valves", notes: "Standard stud bolt material. Use with A194 Gr.2H nuts. Rated to 1000°F.", star: true },
  { grade: "A354 Gr.BD",  standard: "ASTM A354", saeEquiv: "SAE Grade 8 equivalent", marking: "BD stamped on head", material: "Alloy steel (4140/4340), Q&T", proofPsi: "120,000", yieldPsi: "130,000", tensilePsi: "150,000", tensileKsi: "150", tensileMpa: "1034", hardness: "C33–C39", sizeRange: '1/4" – 4"', color: "#DC2626", use: "Grade 8 equivalent for larger diameters", notes: "Extends Grade 8 strength to 4\" diameter.", star: true },
  { grade: "A574",         standard: "ASTM A574", saeEquiv: "≈ ISO 12.9", marking: "Manufacturer mark + dot on socket", material: "Alloy steel, Q&T", proofPsi: "140,000", yieldPsi: "—", tensilePsi: "180,000", tensileKsi: "180", tensileMpa: "1241", hardness: "C39–C45", sizeRange: '#0 – 1-1/2"', color: "#DC2626", use: "Socket head cap screws, high-strength", notes: "Standard for socket head cap screws. Equivalent to ISO 12.9 property class.", star: false },
];

const METRIC_GRADES_GM = [
  { grade: "4.6",  standard: "ISO 898-1", imperialEquiv: "≈ SAE Grade 2",              marking: "4.6 stamped on head",  material: "Low/medium carbon steel",       proofMpa: "225",  yieldMpa: "240",  tensileMpa: "400",  tensileKsi: "58",  hardness: "B67–B95", color: "#64748B", use: "General purpose, light duty",             notes: "First number × 100 = tensile (MPa). Second × 10% = yield ratio.", star: false },
  { grade: "8.8",  standard: "ISO 898-1", imperialEquiv: "≈ SAE Grade 5 / ASTM A325", marking: "8.8 stamped on head",  material: "Medium carbon steel, Q&T",      proofMpa: "600",  yieldMpa: "640",  tensileMpa: "800",  tensileKsi: "116", hardness: "C22–C32", color: "#2563EB", use: "General industrial, machinery, automotive", notes: "Most common metric fastener. 800 MPa tensile. 80% yield ratio.", star: true },
  { grade: "10.9", standard: "ISO 898-1", imperialEquiv: "≈ SAE Grade 8 / ASTM A490", marking: "10.9 stamped on head", material: "Alloy steel, Q&T",              proofMpa: "830",  yieldMpa: "940",  tensileMpa: "1040", tensileKsi: "151", hardness: "C32–C39", color: "#D97706", use: "High-strength, automotive, heavy machinery", notes: "1040 MPa tensile. 90% yield ratio. Do not substitute 8.8 for 10.9.", star: true },
  { grade: "12.9", standard: "ISO 898-1", imperialEquiv: "≈ ASTM A574 (socket head)",  marking: "12.9 on head (often recessed)", material: "Alloy steel, Q&T (highest grade)", proofMpa: "970", yieldMpa: "1100", tensileMpa: "1220", tensileKsi: "177", hardness: "C38–C44", color: "#DC2626", use: "Highest strength — critical, socket head cap screws", notes: "Never substitute lower grade. HE risk — verify coating+baking.", star: true },
];

const STAINLESS_GRADES_GM = [
  { grade: "A2-70", standard: "ISO 3506-1", astmEquiv: "ASTM F593 (304 SS)",  marking: "A2-70 on head", material: "304 Stainless steel (18-8)", proofMpa: "450", yieldMpa: "450", tensileMpa: "700", tensileKsi: "102", color: "#0891B2", use: "General corrosion resistance, indoor/outdoor", notes: "Most common stainless. Non-magnetic. Not suitable for marine/chloride.", star: true },
  { grade: "A4-70", standard: "ISO 3506-1", astmEquiv: "ASTM F593 (316 SS)",  marking: "A4-70 on head", material: "316 Stainless steel (18-8-3 Mo)", proofMpa: "450", yieldMpa: "450", tensileMpa: "700", tensileKsi: "102", color: "#0891B2", use: "Marine, chemical, chloride environments", notes: "Molybdenum addition provides superior chloride resistance vs A2.", star: true },
  { grade: "A4-80", standard: "ISO 3506-1", astmEquiv: "ASTM F593 (316 SS high str.)", marking: "A4-80 on head", material: "316 Stainless steel, strain hardened", proofMpa: "600", yieldMpa: "600", tensileMpa: "800", tensileKsi: "116", color: "#0284C7", use: "High-strength marine/chemical applications", notes: "Higher strength than A4-70. Use where both strength and corrosion resistance required.", star: false },
];

const NO_MARKING_GUIDE = [
  { clue: "Plain head, no markings, zinc plated",   likely: "Grade 2 or A307",                      action: "Check with supplier for certification" },
  { clue: "Plain head, black oxide finish",         likely: "Could be any grade",                   action: "Request material certification — cannot ID by appearance alone" },
  { clue: "Dull silver, no markings, magnetic",     likely: "Grade 2 carbon steel",                 action: "Do not use in structural or high-stress applications without cert" },
  { clue: "Shiny silver, non-magnetic",             likely: "Stainless steel (304 or 316)",         action: "Magnet test helps — verify grade with spark test or cert" },
  { clue: "Gold/yellow color",                      likely: "Zinc-chromate or cadmium — grade unknown", action: "Request cert — color indicates coating not grade" },
  { clue: "Metric bolt, no property class stamped", likely: "Likely 4.6 or 4.8 — low strength",    action: "Never assume higher grade without marking" },
];

export default function GradeMarkings() {
  const [activeTab, setActiveTab]     = useState("SAE");
  const [selected, setSelected]       = useState(null);
  const [activeSection, setActiveSection] = useState("grades");

  const tabs = ["SAE", "ASTM", "Metric", "Stainless"];

  const getData = () => {
    if (activeTab === "SAE")      return SAE_GRADES;
    if (activeTab === "ASTM")     return ASTM_GRADES;
    if (activeTab === "Metric")   return METRIC_GRADES_GM;
    if (activeTab === "Stainless") return STAINLESS_GRADES_GM;
    return [];
  };

  const isMetric = activeTab === "Metric" || activeTab === "Stainless";

  return (
    <div style={{ fontFamily: "'DM Sans','Segoe UI',sans-serif", background: BG, minHeight: "100vh", maxWidth: 430, margin: "0 auto" }}>
      <div style={{ background: `linear-gradient(135deg, ${NAVY} 0%, #2C5282 100%)`, padding: "16px 20px 20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
          <span style={{ fontSize: 20 }}>⬡</span>
          <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 10, letterSpacing: 2, textTransform: "uppercase" }}>Fastener Companion</span>
        </div>
        <div style={{ color: WHITE, fontSize: 20, fontWeight: 800, marginBottom: 2 }}>Bolt Grade Markings</div>
        <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 11 }}>SAE J429 · ASTM A307/A325/A354/A449/A490/A193/A574 · ISO 898-1 · ISO 3506</div>
      </div>

      <div style={{ background: WHITE, borderBottom: `1px solid ${BORDER}`, padding: "0 12px", display: "flex" }}>
        {["grades", "no-marking"].map(s => (
          <button key={s} onClick={() => { setActiveSection(s); setSelected(null); }}
            style={{ background: "none", border: "none", cursor: "pointer", padding: "12px 10px", fontSize: 11, fontWeight: 700, fontFamily: "inherit", color: activeSection === s ? NAVY : MUTED, borderBottom: activeSection === s ? `3px solid ${AMBER}` : "3px solid transparent" }}>
            {s === "grades" ? "Grade Chart" : "No Markings?"}
          </button>
        ))}
      </div>

      {activeSection === "grades" && (
        <>
          <div style={{ background: WHITE, borderBottom: `1px solid ${BORDER}`, padding: "0 8px", display: "flex" }}>
            {tabs.map(tab => (
              <button key={tab} onClick={() => { setActiveTab(tab); setSelected(null); }}
                style={{ background: "none", border: "none", cursor: "pointer", padding: "10px 12px", fontSize: 12, fontWeight: 700, fontFamily: "inherit", color: activeTab === tab ? NAVY : MUTED, borderBottom: activeTab === tab ? `3px solid ${AMBER}` : "3px solid transparent" }}>
                {tab}
              </button>
            ))}
          </div>
          <div style={{ padding: "12px 16px", display: "flex", flexDirection: "column", gap: 10 }}>
            {getData().map((g, i) => (
              <div key={i}>
                <div onClick={() => setSelected(selected === i ? null : i)}
                  style={{ background: g.star ? STAR_BG : WHITE, borderRadius: 14, padding: "14px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)", border: `1px solid ${BORDER}`, borderLeft: `4px solid ${g.color}`, cursor: "pointer" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 3 }}>
                        {g.star && <span style={{ color: AMBER, fontSize: 11 }}>★</span>}
                        <span style={{ fontSize: 15, fontWeight: 800, color: g.color }}>{g.grade}</span>
                        <span style={{ fontSize: 10, color: MUTED, background: "#F1F5F9", padding: "2px 6px", borderRadius: 4 }}>{g.standard}</span>
                      </div>
                      <div style={{ fontSize: 11, color: TEXT, fontWeight: 600, marginBottom: 2 }}>{g.astmEquiv || g.saeEquiv || g.imperialEquiv || ""}</div>
                      <div style={{ fontSize: 11, color: MUTED }}>{g.material}</div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: 10, color: MUTED, marginBottom: 2 }}>Tensile</div>
                      <div style={{ fontSize: 14, fontWeight: 800, color: g.color }}>{isMetric ? `${g.tensileMpa} MPa` : `${g.tensileKsi} ksi`}</div>
                      <div style={{ fontSize: 10, color: MUTED }}>{isMetric ? `${g.tensileKsi} ksi` : `${g.tensileMpa} MPa`}</div>
                    </div>
                  </div>
                  <div style={{ marginTop: 10, background: "#F1F5F9", borderRadius: 8, padding: "8px 12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <div style={{ fontSize: 9, color: MUTED, textTransform: "uppercase", letterSpacing: 1, marginBottom: 2 }}>Head Marking</div>
                      <div style={{ fontSize: 12, fontWeight: 700, color: NAVY }}>{g.marking}</div>
                    </div>
                    <span style={{ color: selected === i ? AMBER : MUTED, fontSize: 18 }}>{selected === i ? "▲" : "▼"}</span>
                  </div>
                </div>
                {selected === i && (
                  <div style={{ background: WHITE, borderRadius: "0 0 14px 14px", border: `1px solid ${BORDER}`, borderTop: "none", padding: "14px", marginTop: -4 }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 12 }}>
                      {[
                        { label: "Proof Load",        value: isMetric ? `${g.proofMpa} MPa` : `${g.proofPsi} psi` },
                        { label: "Yield Strength",    value: isMetric ? `${g.yieldMpa} MPa` : `${g.yieldPsi} psi` },
                        { label: "Tensile Strength",  value: isMetric ? `${g.tensileMpa} MPa` : `${g.tensilePsi} psi` },
                        { label: "Hardness",          value: g.hardness || "—" },
                        { label: "Size Range",        value: g.sizeRange || "All sizes" },
                        { label: "Standard",          value: g.standard },
                      ].map((item, j) => (
                        <div key={j} style={{ background: ROW_ALT, borderRadius: 8, padding: "8px 10px" }}>
                          <div style={{ fontSize: 9, color: MUTED, textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 2 }}>{item.label}</div>
                          <div style={{ fontSize: 12, fontWeight: 700, color: TEXT }}>{item.value}</div>
                        </div>
                      ))}
                    </div>
                    <div style={{ background: "#EEF4FF", borderRadius: 8, padding: "10px 12px", marginBottom: 8 }}>
                      <div style={{ fontSize: 10, fontWeight: 700, color: NAVY, marginBottom: 3 }}>Applications</div>
                      <div style={{ fontSize: 12, color: TEXT }}>{g.use}</div>
                    </div>
                    <div style={{ background: STAR_BG, borderRadius: 8, padding: "10px 12px" }}>
                      <div style={{ fontSize: 10, fontWeight: 700, color: "#92400E", marginBottom: 3 }}>Notes</div>
                      <div style={{ fontSize: 11, color: "#92400E", lineHeight: 1.5 }}>{g.notes}</div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      )}

      {activeSection === "no-marking" && (
        <div style={{ padding: "14px 16px" }}>
          <div style={{ background: "#FFF1F2", border: "1px solid #FECDD3", borderRadius: 12, padding: "12px 14px", marginBottom: 12 }}>
            <div style={{ fontSize: 12, fontWeight: 800, color: "#9F1239", marginBottom: 4 }}>⚠ No marking = unknown grade</div>
            <div style={{ fontSize: 12, color: "#9F1239", lineHeight: 1.5 }}>An unmarked fastener should never be assumed to be any grade higher than Grade 2 or property class 4.6. Always request a material certification when in doubt.</div>
          </div>
          <div style={{ background: WHITE, borderRadius: 14, overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.06)", border: `1px solid ${BORDER}` }}>
            <div style={{ background: NAVY, padding: "10px 14px" }}><div style={{ color: WHITE, fontSize: 12, fontWeight: 700 }}>Field Identification Guide</div></div>
            {NO_MARKING_GUIDE.map((item, i) => (
              <div key={i} style={{ padding: "12px 14px", borderBottom: `1px solid ${BORDER}`, background: i % 2 === 0 ? WHITE : ROW_ALT }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: NAVY, marginBottom: 3 }}>{item.clue}</div>
                <div style={{ fontSize: 11, color: TEXT, marginBottom: 3 }}>Likely: <strong>{item.likely}</strong></div>
                <div style={{ fontSize: 11, color: "#D97706" }}>→ {item.action}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={{ margin: "0 16px 24px", background: "#FFF1F2", border: "1px solid #FECDD3", borderRadius: 10, padding: "10px 14px" }}>
        <div style={{ fontSize: 10, color: "#9F1239", lineHeight: 1.5 }}>
          <strong>⚠ Verify Before Use.</strong> Grade marking data based on SAE J429, ASTM standards, ISO 898-1, and ISO 3506. Request material certifications for critical applications. Fastener Companion is a reference tool.
        </div>
      </div>
    </div>
  );
}
