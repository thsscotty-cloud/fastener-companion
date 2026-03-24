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


// ════════════════════════════════════════════════════
// Nomenclature
// ════════════════════════════════════════════════════

// ─── DATA ─────────────────────────────────────────────────────────────────────
// Sources: ASME B18.2.1, ASME B18.24, ASME B1.1, ISO 898-1,
// Portland Bolt designation guides, Bolt Depot, Engineers Edge,
// IFI Fastener Standards 7th Edition

const CALLOUT_EXAMPLES = [
  {
    id: "imperial_bolt",
    label: "Imperial Hex Bolt",
    example: "1/2\"-13 UNC × 2\" Hex Bolt — ASTM A307 Gr.A — HDG",
    color: "#2563EB",
    bg: "#EFF6FF",
    parts: [
      { segment: "1/2\"", name: "Nominal Diameter", detail: "Outside diameter of the shank in inches. This is the bolt 'size'." },
      { segment: "13", name: "Threads Per Inch (TPI)", detail: "Number of thread crests per inch. Separated from diameter by a dash. 13 TPI = coarse thread for 1/2\"." },
      { segment: "UNC", name: "Thread Series", detail: "UNC = Unified National Coarse. Other options: UNF (fine), UNEF (extra fine), UN (constant pitch e.g. 8UN)." },
      { segment: "×", name: "Separator", detail: "An × or dash separates thread callout from length. Both are acceptable." },
      { segment: "2\"", name: "Length", detail: "From bearing surface of head to tip. For hex bolts this does NOT include head height." },
      { segment: "Hex Bolt", name: "Product Type", detail: "Head and body style. Could also be: Hex Cap Screw, Heavy Hex Bolt, Carriage Bolt, etc." },
      { segment: "ASTM A307 Gr.A", name: "Material / Grade Standard", detail: "Material specification and grade. This determines mechanical properties. Could also be: SAE Gr.5, ASTM A325, ISO 8.8, etc." },
      { segment: "HDG", name: "Finish / Coating", detail: "Hot-Dip Galvanized. Other common codes: ZP (zinc plated), BLK (black oxide), SS (stainless), Plain (uncoated)." },
    ],
    notes: "The minimum complete callout for ordering is: diameter-TPI × length, product type, material/grade. Finish is optional but recommended to avoid ambiguity.",
  },
  {
    id: "metric_bolt",
    label: "Metric Hex Bolt",
    example: "M12 × 1.75 × 50mm Hex Bolt — ISO 8.8 — Zinc Plated",
    color: "#059669",
    bg: "#F0FDF4",
    parts: [
      { segment: "M12", name: "Metric Designation + Nominal Diameter", detail: "'M' prefix indicates metric. 12 = nominal diameter in millimeters. This is the bolt 'size'." },
      { segment: "× 1.75", name: "Thread Pitch (mm)", detail: "Distance in mm between adjacent thread crests. For coarse threads this can be omitted — M12 alone implies 1.75mm coarse pitch. Always specify when using fine pitch." },
      { segment: "× 50mm", name: "Length", detail: "From bearing surface of head to tip in millimeters. Same rule as imperial — hex bolt length does NOT include head height." },
      { segment: "Hex Bolt", name: "Product Type", detail: "Head and body style. Same descriptors as imperial: Hex Bolt, Hex Cap Screw, Flange Bolt, etc." },
      { segment: "ISO 8.8", name: "Property Class", detail: "Metric strength designation per ISO 898-1. 8.8 = 800 MPa tensile, 80% yield ratio. Common classes: 4.6, 8.8, 10.9, 12.9." },
      { segment: "Zinc Plated", name: "Finish / Coating", detail: "Electrogalvanized zinc. Common metric finishes: Plain, Zinc Plated, Hot-Dip Galvanized, Black Oxide, Stainless (A2/A4)." },
    ],
    notes: "For coarse pitch metric bolts, pitch can be omitted: 'M12 × 50mm' implies M12 coarse (1.75mm pitch). Always include pitch for fine thread: 'M12 × 1.25 × 50mm'.",
  },
  {
    id: "imperial_screw",
    label: "Imperial Machine Screw",
    example: "#10-32 × 1\" Pan Head Phillips — SAE Gr.5 — ZP",
    color: "#D97706",
    bg: "#FFF8E7",
    parts: [
      { segment: "#10", name: "Machine Screw Size Number", detail: "Machine screw sizes use # prefix. Range: #0 through #12, then 1/4\" and up. #10 nominal diameter = 0.190\". Formula: diameter = (#size × 0.013) + 0.060\"." },
      { segment: "32", name: "Threads Per Inch", detail: "Same as bolts. #10-32 is fine thread (UNF). #10-24 would be coarse (UNC). Always specify for machine screws." },
      { segment: "× 1\"", name: "Length", detail: "Same rules as bolts apply — measurement depends on head type. Pan head = from underside. Flat head = from top." },
      { segment: "Pan Head", name: "Head Style", detail: "Head style is critical for machine screws. Common styles: Pan, Flat (countersunk), Round, Oval, Truss, Fillister, Binding, Hex, Button." },
      { segment: "Phillips", name: "Drive Type", detail: "Drive style. Common: Phillips (#0–#3), Slotted, Combo (Phillips/Slot), Hex Socket (Allen), Torx, Square (Robertson)." },
      { segment: "SAE Gr.5", name: "Material / Grade", detail: "Machine screws are often specified by material type rather than full ASTM designation. Common: SAE Gr.5, SAE Gr.8, 18-8 SS, 316 SS, Brass, Nylon." },
      { segment: "ZP", name: "Finish", detail: "Zinc Plated (electrogalvanized). Common finishes for machine screws: ZP, Black Oxide (BLK), Plain, 18-8 SS (self-describing)." },
    ],
    notes: "For machine screws, head style and drive type are both critical to include — a #10-32 pan head Phillips and a #10-32 flat head slotted are completely different parts.",
  },
  {
    id: "stud_bolt",
    label: "Stud Bolt",
    example: "1\"-8 UNC × 8\" Stud Bolt — ASTM A193 Gr.B7 — Plain",
    color: "#7C3AED",
    bg: "#F5F3FF",
    parts: [
      { segment: "1\"", name: "Nominal Diameter", detail: "Outside thread diameter in inches. Stud bolts are typically larger — common for flanges and pressure vessels." },
      { segment: "8 UNC", name: "Thread Series", detail: "1\"-8 is the 8-UN (8 thread per inch) constant pitch series — the most common for large industrial stud bolts. Per ASME B18.31.2." },
      { segment: "× 8\"", name: "Length", detail: "Full length of stud. Stud bolts have no head — measured full length from end to end. Specify engagement depth when required." },
      { segment: "Stud Bolt", name: "Product Type", detail: "Fully threaded rod with no head. Types: Full Thread (fully threaded), Double End (specific thread length each end), Tap End (different thread each end)." },
      { segment: "ASTM A193 Gr.B7", name: "Material Standard", detail: "B7 = chromium-molybdenum alloy steel (4140), quenched and tempered. Standard for flanges, pressure vessels, high temperature. Specify A194 Gr.2H nuts to match." },
      { segment: "Plain", name: "Finish", detail: "No coating. B7 stud bolts are commonly supplied plain or with phosphate coating. Avoid galvanizing A490 and high-strength bolts — hydrogen embrittlement risk." },
    ],
    notes: "Always specify nut grade for stud bolts. B7 studs require A194 Gr.2H heavy hex nuts. Never mix nut grades with stud bolt grades — this is a common and dangerous procurement error.",
  },
];

const SCREW_VS_BOLT = [
  {
    question: "The technical definition",
    bolt: "An externally threaded fastener designed to be used with a nut. Passes through a clearance hole and is tightened by turning the nut.",
    screw: "An externally threaded fastener designed to mate with a pre-formed internal thread (tapped hole) or to form its own thread. Tightened by turning the head.",
    verdict: "Technical distinction is about how the fastener is used, not what it looks like.",
  },
  {
    question: "In common industrial usage",
    bolt: "Often used loosely to mean any large externally threaded fastener with a hex head — even when used in a tapped hole (technically a screw).",
    screw: "Often used for smaller fasteners or those with non-hex drive types (Phillips, Torx, socket). Also used correctly for fasteners threaded into tapped holes.",
    verdict: "In practice, 'bolt' and 'screw' are often used interchangeably. For ordering, always specify the full callout rather than relying on the noun alone.",
  },
  {
    question: "Hex Cap Screw vs Hex Bolt",
    bolt: "Hex Bolt: partially threaded, coarser tolerances, used with a nut through a clearance hole. Covered by ASME B18.2.1.",
    screw: "Hex Cap Screw: tighter dimensional tolerances, washer face under head, used in tapped holes. Also covered by ASME B18.2.1 but to tighter tolerances.",
    verdict: "These look nearly identical but have different tolerances. For precision applications, specify 'hex cap screw' not 'hex bolt'.",
  },
  {
    question: "For ordering purposes",
    bolt: "Always use the full technical callout: diameter-TPI × length, product type, material, finish. The noun 'bolt' or 'screw' matters less than the complete specification.",
    screw: "Same rule applies. A complete callout eliminates ambiguity regardless of what noun you use.",
    verdict: "Bottom line: use the complete callout. Don't rely on 'bolt' or 'screw' alone to communicate what you need.",
  },
];

const COMMON_ABBREVIATIONS = [
  { abbr: "UNC", full: "Unified National Coarse thread" },
  { abbr: "UNF", full: "Unified National Fine thread" },
  { abbr: "UNEF", full: "Unified National Extra Fine thread" },
  { abbr: "8UN / 8-UN", full: "8 Unified National (constant pitch)" },
  { abbr: "TPI", full: "Threads Per Inch" },
  { abbr: "WAF", full: "Width Across Flats (wrench size)" },
  { abbr: "WAC", full: "Width Across Corners" },
  { abbr: "HDG", full: "Hot-Dip Galvanized" },
  { abbr: "ZP / EG", full: "Zinc Plated / Electrogalvanized" },
  { abbr: "BLK / BO", full: "Black Oxide" },
  { abbr: "Plain / A/R", full: "As Received / No finish" },
  { abbr: "SS", full: "Stainless Steel (must specify grade: 18-8, 316, etc.)" },
  { abbr: "GR / Gr.", full: "Grade (e.g. Gr.5, Gr.8, Gr.B7)" },
  { abbr: "PC", full: "Property Class (metric, e.g. PC 8.8)" },
  { abbr: "HH", full: "Heavy Hex (larger head than standard)" },
  { abbr: "FT / TF", full: "Full Thread (threaded entire length)" },
  { abbr: "PT / HT", full: "Partial Thread / Half Thread" },
  { abbr: "SHCS", full: "Socket Head Cap Screw" },
  { abbr: "BHCS", full: "Button Head Cap Screw" },
  { abbr: "FHCS", full: "Flat Head Cap Screw" },
  { abbr: "HHCS", full: "Hex Head Cap Screw" },
  { abbr: "LH", full: "Left Hand thread" },
  { abbr: "RH", full: "Right Hand thread (default — never needs to be specified)" },
  { abbr: "CoC", full: "Certificate of Conformance" },
  { abbr: "MTR", full: "Mill Test Report" },
  { abbr: "Q&T", full: "Quenched and Tempered (heat treatment)" },
  { abbr: "A2 / A4", full: "Stainless steel grade per ISO 3506 (A2=304, A4=316)" },
];

export default function Nomenclature() {
  const [activeTab, setActiveTab] = useState("callout");
  const [activeExample, setActiveExample] = useState("imperial_bolt");
  const [expandedPart, setExpandedPart] = useState(null);
  const [search, setSearch] = useState("");

  const current = CALLOUT_EXAMPLES.find(e => e.id === activeExample);

  const filteredAbbr = COMMON_ABBREVIATIONS.filter(a =>
    a.abbr.toLowerCase().includes(search.toLowerCase()) ||
    a.full.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ fontFamily: "'DM Sans','Segoe UI',sans-serif", background: BG, minHeight: "100vh", maxWidth: 430, margin: "0 auto" }}>

      {/* HEADER */}
      <div style={{ background: `linear-gradient(135deg, ${NAVY} 0%, #2C5282 100%)`, padding: "16px 20px 20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
          <span style={{ fontSize: 20 }}>⬡</span>
          <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 10, letterSpacing: 2, textTransform: "uppercase" }}>Fastener Companion</span>
        </div>
        <div style={{ color: WHITE, fontSize: 20, fontWeight: 800, marginBottom: 2 }}>Fastener Nomenclature</div>
        <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 11 }}>ASME B18.2.1 · ASME B18.24 · ASME B1.1 · ISO 898-1 · IFI 7th Ed.</div>
      </div>

      {/* SECTION TABS */}
      <div style={{ background: WHITE, borderBottom: `1px solid ${BORDER}`, padding: "0 8px", display: "flex" }}>
        {[
          { id: "callout", label: "Callout Guide" },
          { id: "screw_vs_bolt", label: "Bolt vs Screw" },
          { id: "abbreviations", label: "Abbreviations" },
        ].map(t => (
          <button key={t.id} onClick={() => setActiveTab(t.id)}
            style={{
              background: "none", border: "none", cursor: "pointer", padding: "12px 10px",
              fontSize: 11, fontWeight: 700, fontFamily: "inherit", whiteSpace: "nowrap",
              color: activeTab === t.id ? NAVY : MUTED,
              borderBottom: activeTab === t.id ? `3px solid ${AMBER}` : "3px solid transparent",
            }}>{t.label}</button>
        ))}
      </div>

      {/* CALLOUT GUIDE */}
      {activeTab === "callout" && (
        <div style={{ padding: "14px 16px" }}>
          {/* Example selector */}
          <div style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: MUTED, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 8 }}>Select Example</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {CALLOUT_EXAMPLES.map(ex => (
                <button key={ex.id} onClick={() => { setActiveExample(ex.id); setExpandedPart(null); }}
                  style={{
                    background: activeExample === ex.id ? ex.bg : WHITE,
                    border: `1.5px solid ${activeExample === ex.id ? ex.color : BORDER}`,
                    borderRadius: 10, padding: "10px 14px", cursor: "pointer", fontFamily: "inherit",
                    textAlign: "left",
                  }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: activeExample === ex.id ? ex.color : NAVY }}>{ex.label}</div>
                  <div style={{ fontSize: 11, color: MUTED, marginTop: 2, fontFamily: "monospace" }}>{ex.example}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Callout display */}
          <div style={{ background: current.bg, border: `1px solid ${BORDER}`, borderLeft: `4px solid ${current.color}`, borderRadius: 12, padding: "12px 14px", marginBottom: 14 }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: current.color, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 6 }}>Complete Callout</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: NAVY, fontFamily: "monospace", lineHeight: 1.6 }}>{current.example}</div>
          </div>

          {/* Parts breakdown */}
          <div style={{ fontSize: 10, fontWeight: 700, color: MUTED, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 8 }}>Tap Each Part to Explain</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {current.parts.map((part, i) => (
              <div key={i}>
                <div onClick={() => setExpandedPart(expandedPart === i ? null : i)}
                  style={{
                    background: WHITE, border: `1px solid ${expandedPart === i ? current.color : BORDER}`,
                    borderRadius: expandedPart === i ? "12px 12px 0 0" : 12,
                    padding: "10px 14px", cursor: "pointer",
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                  }}>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 800, color: current.color, fontFamily: "monospace" }}>{part.segment}</div>
                    <div style={{ fontSize: 11, color: MUTED, marginTop: 1 }}>{part.name}</div>
                  </div>
                  <span style={{ color: expandedPart === i ? current.color : MUTED, fontSize: 16 }}>{expandedPart === i ? "▲" : "▼"}</span>
                </div>
                {expandedPart === i && (
                  <div style={{ background: current.bg, border: `1px solid ${current.color}`, borderTop: "none", borderRadius: "0 0 12px 12px", padding: "10px 14px" }}>
                    <div style={{ fontSize: 12, color: TEXT, lineHeight: 1.6 }}>{part.detail}</div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Notes */}
          <div style={{ marginTop: 12, background: STAR_BG, border: `1px solid ${STAR_BORDER}`, borderRadius: 10, padding: "10px 14px" }}>
            <div style={{ fontSize: 11, color: "#92400E", lineHeight: 1.5 }}>?? {current.notes}</div>
          </div>
        </div>
      )}

      {/* BOLT VS SCREW */}
      {activeTab === "screw_vs_bolt" && (
        <div style={{ padding: "14px 16px", display: "flex", flexDirection: "column", gap: 10 }}>
          {SCREW_VS_BOLT.map((item, i) => (
            <div key={i} style={{ background: WHITE, border: `1px solid ${BORDER}`, borderRadius: 12, overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
              <div style={{ background: NAVY, padding: "10px 14px" }}>
                <div style={{ color: WHITE, fontSize: 12, fontWeight: 700 }}>{item.question}</div>
              </div>
              <div style={{ padding: "12px 14px" }}>
                <div style={{ marginBottom: 8 }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: "#2563EB", textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>Bolt</div>
                  <div style={{ fontSize: 12, color: TEXT, lineHeight: 1.5 }}>{item.bolt}</div>
                </div>
                <div style={{ marginBottom: 10 }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: "#059669", textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>Screw</div>
                  <div style={{ fontSize: 12, color: TEXT, lineHeight: 1.5 }}>{item.screw}</div>
                </div>
                <div style={{ background: STAR_BG, borderRadius: 8, padding: "8px 12px" }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#92400E", marginBottom: 2 }}>Bottom Line</div>
                  <div style={{ fontSize: 11, color: "#92400E", lineHeight: 1.5 }}>{item.verdict}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ABBREVIATIONS */}
      {activeTab === "abbreviations" && (
        <div style={{ padding: "14px 16px" }}>
          <div style={{ background: WHITE, borderRadius: 12, display: "flex", alignItems: "center", padding: "10px 14px", gap: 8, marginBottom: 12, boxShadow: "0 1px 4px rgba(0,0,0,0.06)", border: `1px solid ${BORDER}` }}>
            <span style={{ color: MUTED }}>??</span>
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search abbreviations..."
              style={{ background: "none", border: "none", outline: "none", color: TEXT, fontSize: 14, flex: 1, fontFamily: "inherit" }} />
            {search && <span onClick={() => setSearch("")} style={{ color: MUTED, cursor: "pointer" }}>✕</span>}
          </div>
          <div style={{ background: WHITE, borderRadius: 14, overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.06)", border: `1px solid ${BORDER}` }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", background: NAVY, padding: "10px 14px" }}>
              <div style={{ color: WHITE, fontSize: 11, fontWeight: 700 }}>Abbreviation</div>
              <div style={{ color: WHITE, fontSize: 11, fontWeight: 700 }}>Meaning</div>
            </div>
            {filteredAbbr.length === 0
              ? <div style={{ padding: 24, textAlign: "center", color: MUTED, fontSize: 13 }}>No results found</div>
              : filteredAbbr.map((item, i) => (
                <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 2fr", padding: "9px 14px", background: i % 2 === 0 ? WHITE : ROW_ALT, borderBottom: `1px solid ${BORDER}`, alignItems: "center" }}>
                  <div style={{ fontSize: 12, fontWeight: 800, color: NAVY, fontFamily: "monospace" }}>{item.abbr}</div>
                  <div style={{ fontSize: 12, color: TEXT, lineHeight: 1.4 }}>{item.full}</div>
                </div>
              ))
            }
          </div>
        </div>
      )}

      {/* DISCLAIMER */}
      <div style={{ margin: "0 16px 24px", background: "#FFF1F2", border: "1px solid #FECDD3", borderRadius: 10, padding: "10px 14px" }}>
        <div style={{ fontSize: 10, color: "#9F1239", lineHeight: 1.5 }}>
          <strong>⚠ Verify Before Use.</strong> Nomenclature guidance based on ASME B18.2.1, ASME B18.24, ASME B1.1, and IFI 7th Edition. Always confirm complete specifications with supplier documentation for critical applications. Fastener Companion is a reference tool — not a substitute for engineering judgment.
        </div>
      </div>
    </div>
  );
}
