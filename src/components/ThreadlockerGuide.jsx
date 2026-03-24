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
// Sources: Henkel/Loctite product technical data sheets,
// 3M threadlocker technical bulletins, Permabond engineering adhesives,
// Engineers Edge chemical applications guide, IFI technical resources

const THREADLOCKER_GRADES = [
  {
    id: "purple",
    color_name: "Purple",
    color: "#7C3AED",
    hex: "#7C3AED",
    loctite_nums: "222, 2221",
    strength: "Low Strength",
    breakaway_torque: "~2.8 Nm (25 in-lb)",
    removal: "By hand or standard tools",
    temp_range: "-65°F to 300°F (-54°C to 149°C)",
    cure_time_handling: "10 minutes",
    cure_time_full: "24 hours",
    gap_fill: "Up to 0.15mm (0.006\")",
    best_for: [
      "Small fasteners M2–M12 (under 1/4\")",
      "Delicate instruments and electronics",
      "Set screws that need periodic adjustment",
      "Applications requiring frequent disassembly",
      "Plastic or soft material fasteners",
    ],
    not_for: [
      "Fasteners larger than M12",
      "High-vibration applications requiring permanent hold",
      "High-temperature applications above 300°F",
    ],
    notes: "The gentlest threadlocker. Prevents vibration loosening while still allowing easy removal. Good for instrument panels, electronics, and any application where disassembly is frequent.",
    star: false,
  },
  {
    id: "blue",
    color_name: "Blue",
    color: "#2563EB",
    hex: "#2563EB",
    loctite_nums: "243, 242, 248",
    strength: "Medium Strength",
    breakaway_torque: "~9.5 Nm (84 in-lb)",
    removal: "Standard hand tools",
    temp_range: "-65°F to 300°F (-54°C to 149°C)",
    cure_time_handling: "10 minutes",
    cure_time_full: "24 hours",
    gap_fill: "Up to 0.15mm (0.006\")",
    best_for: [
      "General purpose — most common grade",
      "M6–M20 (1/4\"–3/4\") fasteners",
      "Maintenance, repair, and assembly",
      "Vibration-prone machinery and equipment",
      "Fasteners that may need occasional removal",
      "Most automotive and industrial applications",
    ],
    not_for: [
      "Permanent assemblies (use red)",
      "Very high temperature above 300°F",
      "Passive metals (stainless, zinc) without activator",
    ],
    notes: "The most widely used grade. 243 is the 'extended use' formula that handles contaminated or oily threads better than 242. When someone says 'blue Loctite,' this is what they mean. Standard recommendation for most industrial applications.",
    star: true,
  },
  {
    id: "red",
    color_name: "Red",
    color: "#DC2626",
    hex: "#DC2626",
    loctite_nums: "271, 262, 268",
    strength: "High Strength (Permanent)",
    breakaway_torque: "~27 Nm (239 in-lb)",
    removal: "Heat to 250°C (482°F) then remove while hot",
    temp_range: "-65°F to 300°F (-54°C to 149°C)",
    cure_time_handling: "10 minutes",
    cure_time_full: "24 hours",
    gap_fill: "Up to 0.15mm (0.006\")",
    best_for: [
      "Permanent assemblies not intended for disassembly",
      "Large fasteners M20+ (3/4\" and larger)",
      "Studs and anchors",
      "High-vibration applications requiring maximum retention",
      "Press fits and cylindrical assemblies",
    ],
    not_for: [
      "Fasteners that need to be removed for maintenance",
      "Plastic substrates (may crack)",
      "Very small fasteners — use purple or blue",
    ],
    notes: "Permanent grade — requires heat for removal. Consider carefully before using: once cured, removal without heat is very difficult and may damage the fastener or mating threads. Reserve for truly permanent assemblies.",
    star: true,
  },
  {
    id: "green",
    color_name: "Green",
    color: "#059669",
    hex: "#059669",
    loctite_nums: "290",
    strength: "Medium-High (Wicking Grade)",
    breakaway_torque: "~9.5 Nm (84 in-lb)",
    removal: "Standard hand tools",
    temp_range: "-65°F to 300°F (-54°C to 149°C)",
    cure_time_handling: "15 minutes",
    cure_time_full: "24 hours",
    gap_fill: "Wicks into assembled joints — very low viscosity",
    best_for: [
      "Already-assembled fasteners that need threadlocking",
      "Fasteners in tight spaces where pre-application is difficult",
      "Capillary action applications — applies to assembled joint",
      "Fine threads where low viscosity is needed",
    ],
    not_for: [
      "New assemblies (use blue or red)",
      "Vertical surfaces where it may run before curing",
      "Large gaps — green is very low viscosity",
    ],
    notes: "The wicking grade — unique because it's applied AFTER assembly. Capillary action draws it into the thread gap. Valuable when fasteners are already installed and you need to add threadlocker without disassembly.",
    star: false,
  },
  {
    id: "orange",
    color_name: "Orange / Silver",
    color: "#D97706",
    hex: "#D97706",
    loctite_nums: "2400, 2700",
    strength: "Medium / High (Dry-to-Touch)",
    breakaway_torque: "Medium (2400) / High (2700)",
    removal: "Standard tools (2400) / Heat required (2700)",
    temp_range: "-65°F to 250°F (-54°C to 121°C)",
    cure_time_handling: "Dry to touch in minutes",
    cure_time_full: "24 hours",
    gap_fill: "Up to 0.15mm",
    best_for: [
      "Pre-applied (factory) applications",
      "Parts that need handling before assembly",
      "Production line applications",
      "Fasteners shipped with adhesive pre-applied",
    ],
    not_for: [
      "General maintenance use — use standard blue or red",
      "High temperature above 250°F",
    ],
    notes: "Dry-to-touch formula — remains inactive until compressed between threads. Useful for production environments where fasteners are pre-coated and then stored before assembly.",
    star: false,
  },
];

const APPLICATION_GUIDE = [
  {
    scenario: "General machinery maintenance",
    recommendation: "Blue (243)",
    reason: "Removable for maintenance, sufficient for vibration resistance",
  },
  {
    scenario: "Small fasteners (under 1/4\" / M6)",
    recommendation: "Purple (222)",
    reason: "Lower strength matches small fastener torque capacity",
  },
  {
    scenario: "Permanent stud installation",
    recommendation: "Red (271)",
    reason: "Maximum retention, no planned disassembly",
  },
  {
    scenario: "Pipe fittings / NPT threads",
    recommendation: "Pipe sealant (567 or Teflon tape)",
    reason: "Threadlocker is not a pipe sealant — use correct product",
  },
  {
    scenario: "Already-assembled loose fasteners",
    recommendation: "Green (290)",
    reason: "Wicks into assembled joint without disassembly",
  },
  {
    scenario: "High-vibration (>0.5G) applications",
    recommendation: "Red (271) or Blue + mechanical locking",
    reason: "Blue alone may be insufficient for severe vibration",
  },
  {
    scenario: "Stainless steel fasteners",
    recommendation: "Blue (243) + activator (7649)",
    reason: "Passive oxide layer on stainless inhibits cure — activator required",
  },
  {
    scenario: "Zinc-plated fasteners",
    recommendation: "Blue (243) + activator (7649)",
    reason: "Zinc inhibits anaerobic cure — activator ensures proper cure",
  },
  {
    scenario: "Plastics",
    recommendation: "Blue (243) or specialty grade",
    reason: "Red may stress-crack some plastics. Test first.",
  },
  {
    scenario: "Temperatures above 300°F (149°C)",
    recommendation: "High-temp grade (2620) or mechanical locking",
    reason: "Standard threadlockers lose strength above 300°F",
  },
];

const REMOVAL_GUIDE = [
  { grade: "Purple", method: "Standard hand tools — wrench or screwdriver", heat_needed: false },
  { grade: "Blue", method: "Standard hand tools — wrench or socket", heat_needed: false },
  { grade: "Green", method: "Standard hand tools", heat_needed: false },
  { grade: "Red", method: "Heat to 482°F (250°C), remove while hot. Use heat gun or torch.", heat_needed: true },
  { grade: "Any (when stuck)", method: "Apply heat to 482°F → attempt removal → reapply heat if needed. Impact wrench can help break cure.", heat_needed: true },
];

export default function ThreadlockerGuide() {
  const [activeTab, setActiveTab] = useState("grades");
  const [selected, setSelected] = useState(null);

  const selectedGrade = selected ? THREADLOCKER_GRADES.find(g => g.id === selected) : null;

  return (
    <div style={{ fontFamily: "'DM Sans','Segoe UI',sans-serif", background: BG, minHeight: "100vh", maxWidth: 430, margin: "0 auto" }}>

      {/* HEADER */}
      <div style={{ background: `linear-gradient(135deg, ${NAVY} 0%, #2C5282 100%)`, padding: "16px 20px 20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
          <span style={{ fontSize: 20 }}>⬡</span>
          <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 10, letterSpacing: 2, textTransform: "uppercase" }}>Fastener Companion</span>
        </div>
        <div style={{ color: WHITE, fontSize: 20, fontWeight: 800, marginBottom: 2 }}>Threadlocker Guide</div>
        <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 11 }}>Henkel/Loctite TDS · 3M Technical Bulletins · Permabond · IFI Technical Resources</div>
      </div>

      {/* TABS */}
      <div style={{ background: WHITE, borderBottom: `1px solid ${BORDER}`, padding: "0 8px", display: "flex", overflowX: "auto", scrollbarWidth: "none" }}>
        {[
          { id: "grades", label: "Grade Guide" },
          { id: "application", label: "Which Grade?" },
          { id: "removal", label: "Removal" },
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

      {/* GRADE GUIDE */}
      {activeTab === "grades" && !selectedGrade && (
        <div style={{ padding: "12px 16px", display: "flex", flexDirection: "column", gap: 10 }}>
          <div style={{ background: "#EEF4FF", border: `1px solid ${BORDER}`, borderRadius: 10, padding: "10px 14px", marginBottom: 4 }}>
            <div style={{ fontSize: 11, color: NAVY, lineHeight: 1.5 }}>
              Threadlockers are anaerobic adhesives — they cure in the absence of air when confined between metal surfaces. Color indicates strength. Always confirm with product data sheet for critical applications.
            </div>
          </div>
          {THREADLOCKER_GRADES.map(grade => (
            <div key={grade.id} onClick={() => setSelected(grade.id)}
              style={{
                background: grade.star ? STAR_BG : WHITE,
                border: `1px solid ${BORDER}`,
                borderLeft: `4px solid ${grade.hex}`,
                borderRadius: 12, padding: "14px", cursor: "pointer",
                boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
              }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 28, height: 28, borderRadius: "50%", background: grade.hex, flexShrink: 0 }} />
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      {grade.star && <span style={{ color: AMBER, fontSize: 11 }}>★</span>}
                      <span style={{ fontSize: 14, fontWeight: 800, color: NAVY }}>{grade.color_name}</span>
                    </div>
                    <div style={{ fontSize: 11, color: MUTED }}>Loctite {grade.loctite_nums}</div>
                  </div>
                </div>
                <div style={{ background: grade.hex + "20", border: `1px solid ${grade.hex}`, borderRadius: 8, padding: "4px 10px", fontSize: 11, fontWeight: 700, color: grade.hex }}>{grade.strength}</div>
              </div>
              <div style={{ fontSize: 12, color: TEXT, lineHeight: 1.5, marginBottom: 6 }}>{grade.notes}</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
                <div style={{ background: "#F1F5F9", borderRadius: 6, padding: "6px 8px" }}>
                  <div style={{ fontSize: 9, color: MUTED, textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 1 }}>Breakaway Torque</div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: TEXT }}>{grade.breakaway_torque}</div>
                </div>
                <div style={{ background: "#F1F5F9", borderRadius: 6, padding: "6px 8px" }}>
                  <div style={{ fontSize: 9, color: MUTED, textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 1 }}>Removal</div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: TEXT }}>{grade.removal.split(" ")[0]}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* GRADE DETAIL */}
      {activeTab === "grades" && selectedGrade && (
        <div style={{ padding: "14px 16px" }}>
          <button onClick={() => setSelected(null)}
            style={{ background: "none", border: "none", cursor: "pointer", color: NAVY, fontSize: 13, fontWeight: 700, fontFamily: "inherit", marginBottom: 14, display: "flex", alignItems: "center", gap: 6, padding: 0 }}>
            ← Back
          </button>
          <div style={{ background: WHITE, border: `1px solid ${BORDER}`, borderLeft: `4px solid ${selectedGrade.hex}`, borderRadius: 12, padding: "14px", marginBottom: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
              <div style={{ width: 40, height: 40, borderRadius: "50%", background: selectedGrade.hex }} />
              <div>
                <div style={{ fontSize: 18, fontWeight: 800, color: NAVY }}>{selectedGrade.color_name} — {selectedGrade.strength}</div>
                <div style={{ fontSize: 12, color: MUTED }}>Loctite {selectedGrade.loctite_nums}</div>
              </div>
            </div>
            <div style={{ fontSize: 12, color: TEXT, lineHeight: 1.6 }}>{selectedGrade.notes}</div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 12 }}>
            {[
              { label: "Breakaway Torque", value: selectedGrade.breakaway_torque },
              { label: "Removal Method", value: selectedGrade.removal },
              { label: "Temp Range", value: selectedGrade.temp_range },
              { label: "Handling Time", value: selectedGrade.cure_time_handling },
              { label: "Full Cure", value: selectedGrade.cure_time_full },
              { label: "Gap Fill", value: selectedGrade.gap_fill },
            ].map((item, i) => (
              <div key={i} style={{ background: ROW_ALT, borderRadius: 8, padding: "8px 10px", border: `1px solid ${BORDER}` }}>
                <div style={{ fontSize: 9, color: MUTED, textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 2 }}>{item.label}</div>
                <div style={{ fontSize: 11, fontWeight: 700, color: TEXT, lineHeight: 1.3 }}>{item.value}</div>
              </div>
            ))}
          </div>

          <div style={{ background: "#F0FDF4", border: `1px solid #BBF7D0`, borderRadius: 12, overflow: "hidden", marginBottom: 10 }}>
            <div style={{ background: "#059669", padding: "8px 14px" }}>
              <div style={{ color: WHITE, fontSize: 11, fontWeight: 700 }}>✓ Best Used For</div>
            </div>
            {selectedGrade.best_for.map((item, i) => (
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
            {selectedGrade.not_for.map((item, i) => (
              <div key={i} style={{ padding: "8px 14px", borderBottom: `1px solid #FECDD3`, background: i % 2 === 0 ? WHITE : "#FFF5F5", display: "flex", gap: 8 }}>
                <span style={{ color: "#DC2626", flexShrink: 0 }}>✗</span>
                <div style={{ fontSize: 12, color: TEXT }}>{item}</div>
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
              <div style={{ color: WHITE, fontSize: 12, fontWeight: 700 }}>Which Grade for My Application?</div>
            </div>
            {APPLICATION_GUIDE.map((item, i) => (
              <div key={i} style={{ padding: "12px 14px", borderBottom: `1px solid ${BORDER}`, background: i % 2 === 0 ? WHITE : ROW_ALT }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: NAVY, marginBottom: 4 }}>{item.scenario}</div>
                <div style={{ display: "inline-block", background: "#EEF4FF", border: `1px solid ${NAVY}`, borderRadius: 6, padding: "2px 10px", fontSize: 11, fontWeight: 800, color: NAVY, marginBottom: 6 }}>→ {item.recommendation}</div>
                <div style={{ fontSize: 11, color: MUTED }}>{item.reason}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* REMOVAL */}
      {activeTab === "removal" && (
        <div style={{ padding: "14px 16px" }}>
          <div style={{ background: STAR_BG, border: `1px solid ${STAR_BORDER}`, borderRadius: 10, padding: "10px 14px", marginBottom: 12 }}>
            <div style={{ fontSize: 11, color: "#92400E", lineHeight: 1.5 }}>
              Red threadlocker requires heat for removal. Apply heat gun or torch to the fastener head/nut until you reach 250°C (482°F), then attempt removal while still hot. Do NOT force a cold red-locked fastener — you will break it.
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {REMOVAL_GUIDE.map((item, i) => (
              <div key={i} style={{ background: item.heat_needed ? "#FFF1F2" : WHITE, border: `1px solid ${item.heat_needed ? "#FECDD3" : BORDER}`, borderLeft: `4px solid ${item.heat_needed ? "#DC2626" : "#059669"}`, borderRadius: 12, padding: "12px 14px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                  <div style={{ fontSize: 13, fontWeight: 800, color: NAVY }}>{item.grade}</div>
                  {item.heat_needed && <div style={{ background: "#FFF1F2", border: "1px solid #FECDD3", borderRadius: 6, padding: "2px 8px", fontSize: 10, fontWeight: 700, color: "#DC2626" }}>?? HEAT REQUIRED</div>}
                </div>
                <div style={{ fontSize: 12, color: TEXT, lineHeight: 1.5 }}>{item.method}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* FIELD TIPS */}
      {activeTab === "tips" && (
        <div style={{ padding: "14px 16px", display: "flex", flexDirection: "column", gap: 10 }}>
          {[
            { title: "Threadlocker ≠ thread sealant", color: "#DC2626", bg: "#FFF1F2", body: "Threadlocker prevents loosening. Thread sealant seals against fluid/gas leakage. They are different products. Loctite 567 and 565 are thread sealants for pipe threads (NPT). Standard blue/red Loctite is NOT a pipe sealant." },
            { title: "Surface preparation matters", color: NAVY, bg: "#EEF4FF", body: "Clean, dry threads cure faster and stronger. Degrease with acetone or isopropyl alcohol. Oil, grease, and contamination slow cure and reduce bond strength. Allow surfaces to dry completely before applying." },
            { title: "Stainless and zinc need activator", color: "#D97706", bg: "#FFF8E7", body: "Passive oxide layers on stainless steel and zinc platings inhibit anaerobic cure. Apply Loctite 7649 activator to the female thread before applying threadlocker to ensure proper cure. Without activator, cure may be slow or incomplete." },
            { title: "Temperature affects cure time", color: "#059669", bg: "#F0FDF4", body: "Cold slows cure: at 50°F (10°C), full cure can take 72+ hours. Warm environments speed cure. For urgent applications at low temperatures, use a heat gun to warm the assembly (not hot — just warm, ~100°F/38°C) to accelerate cure." },
            { title: "Don't over-apply", color: "#7C3AED", bg: "#F5F3FF", body: "2–3 drops on male threads is sufficient. Excess threadlocker gets displaced and creates contamination. Excess on flange faces can affect sealing. Apply to the first engaged threads — not the lead threads which won't be covered." },
            { title: "Prevailing torque nuts vs threadlocker", color: "#64748B", bg: "#F8FAFC", body: "Threadlocker and nyloc prevailing torque nuts both prevent loosening but work differently. Don't combine them — the chemistry of threadlocker may interact with nylon and affect the nyloc nut's effectiveness." },
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
          <strong>⚠ Verify Before Use.</strong> Product data based on Henkel/Loctite technical data sheets. Always consult current manufacturer TDS for critical applications. Cure times and strength values are approximate. Fastener Companion is a reference tool — not a substitute for engineering judgment.
        </div>
      </div>
    </div>
  );
}

