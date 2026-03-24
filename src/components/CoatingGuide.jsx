// ============================================================
// BATCH 03 — DIMENSIONAL REFERENCE, STRENGTH DATA & ADVISORY TOOLS
// Fastener Companion App
//
// Named exports — import as:
//   import { CoatingGuide, BoltDimensions, NutDimensions,
//            WasherSizes, ProofLoadTensile, HardnessReference,
//            DesignAdvisor, SubstitutionAdvisor,
//            ConflictChecker } from './batch-03-dimensional-advisory'
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
// CoatingGuide
// ════════════════════════════════════════════════════

// ─── DATA ─────────────────────────────────────────────────────────────────────
// Sources: ASTM F1941/F1941M, ASTM A153, ASTM B633, ASTM F2329,
// ISO 10683 (zinc flake), MIL-STD-171, Fastenal Engineering Resources,
// Portland Bolt coating guide, Boltcouncil.org HE research (Brahimi),
// Southwestern Plating technical data, IFI Fastener Standards 7th Ed.

const COATINGS = [
  {
    id: "zinc_electroplate",
    name: "Zinc Electroplating",
    shortName: "Zinc Plate / EG",
    category: "Electroplated",
    he_risk: "HIGH",
    standard: "ASTM F1941/F1941M",
    color: "#2563EB",
    bg: "#EFF6FF",
    cots: "COTS — Widely Available",
    cots_color: "#059669",
    appearance: "Bright silver (clear chromate) or yellow (yellow chromate) or black",
    thickness: "0.0002\"–0.0005\" (5–13 microns) typical",
    corrosion_resistance: "48–200 hours salt spray (ASTM B117) depending on chromate",
    temp_limit: "Up to ~250°F (121°C) — chromate degrades above this",
    thread_effect: "May affect thread fit — check after plating on tight tolerance threads",
    he_detail: "Electroplating introduces hydrogen during acid cleaning/pickling stage. Hydrogen is absorbed into the steel and trapped by the zinc coating. HIGH RISK for Grade 8, A490, 10.9, 12.9, and any fastener above HRC 39.",
    baking_required: "REQUIRED for fasteners above HRC 40. Strongly recommended for HRC 35–39. Must bake within 4 hours of plating at 375°F (191°C) for minimum 3 hours (commercial standard) to 8+ hours for high-strength.",
    baking_standard: "ASTM F1941 — bake within 4 hours of plating. Temperature 350–450°F (177–232°C). Typical duration 3–8 hours. Grade BD (A354) requires 10 hours minimum per revised standard.",
    safe_for: ["Grade 2 (unthreaded)", "Grade 5", "SAE Grade 2", "Low-carbon steel", "Fasteners below HRC 34"],
    not_safe_for: ["Grade 8 without baking", "A490 without baking", "10.9 without baking", "12.9 without baking", "SHCS A574 without baking", "Any fastener above HRC 39 without baking"],
    substitution_note: "Widely available. Most common fastener finish. Clear, yellow, and black chromate variants all standard COTS.",
    star: true,
  },
  {
    id: "hot_dip_galv",
    name: "Hot-Dip Galvanizing",
    shortName: "HDG / Hot-Dip Galv",
    category: "Hot-Dip",
    he_risk: "NONE",
    standard: "ASTM A153 (hardware) / ASTM F2329 (fasteners)",
    color: "#059669",
    bg: "#F0FDF4",
    cots: "COTS — Widely Available",
    cots_color: "#059669",
    appearance: "Dull gray/matte silver — rough texture",
    thickness: "1.0–4.3 mils (25–109 microns) — much thicker than electroplate",
    corrosion_resistance: "1,000+ hours salt spray. Provides sacrificial cathodic protection.",
    temp_limit: "Up to ~392°F (200°C) — zinc-iron alloy layer stable at moderate temperatures",
    thread_effect: "SIGNIFICANT — HDG adds substantial thickness. External threads must be oversized (class 2A tolerance) before galvanizing. Internal threads must be re-tapped or chased after galvanizing. Specify with supplier.",
    he_detail: "Hot-dip galvanizing does NOT introduce hydrogen embrittlement. The process uses molten zinc at 450°C (842°F) — no acid absorption mechanism. No HE risk from the coating process itself.",
    baking_required: "NOT REQUIRED — no HE risk from process",
    baking_standard: "N/A — however, NEVER galvanize Grade 8, A490, or 12.9 fasteners. Not because of HE from galvanizing, but because the high temperature of galvanizing can affect the temper of high-strength fasteners and the combination with service conditions creates HE risk.",
    safe_for: ["Grade 2", "Grade 5", "A307", "A325 (with oversized threads)", "A36 structural steel", "F1554 anchor bolts", "General structural applications"],
    not_safe_for: ["Grade 8 — PROHIBITED per AISC", "A490 — PROHIBITED", "12.9 — PROHIBITED", "10.9 — NOT recommended", "Any fastener above 150,000 psi tensile — check with engineer"],
    substitution_note: "Widely available. Standard for outdoor structural and construction fasteners. Nuts must be tapped oversize to account for zinc buildup.",
    star: true,
  },
  {
    id: "mechanical_galv",
    name: "Mechanical Galvanizing",
    shortName: "Mech. Galv / Mech. Zinc",
    category: "Mechanical",
    he_risk: "VERY LOW",
    standard: "ASTM B695",
    color: "#059669",
    bg: "#F0FDF4",
    cots: "COTS — Available (less common than electroplate or HDG)",
    cots_color: "#D97706",
    appearance: "Matte silver/gray — similar to HDG but smoother",
    thickness: "0.5–3.0 mils (13–76 microns) — thicker than electroplate, thinner than HDG",
    corrosion_resistance: "500–1,000+ hours salt spray depending on thickness",
    temp_limit: "Similar to electroplate — ~250°F",
    thread_effect: "Less thread impact than HDG. Still adds measurable thickness — verify thread fit.",
    he_detail: "Mechanical galvanizing uses abrasive blasting (not acid cleaning) to prepare the surface, then tumbles parts with zinc powder and glass beads. No acid = no hydrogen introduction. Very low HE risk — the preferred alternative to electroplating for high-strength fasteners.",
    baking_required: "NOT REQUIRED — process does not introduce significant hydrogen",
    baking_standard: "ASTM B695. No baking requirement. This is the key advantage over electroplating for high-strength fasteners.",
    safe_for: ["Grade 8", "Grade 5", "A354 BD", "A325", "High-strength fasteners where HDG is not acceptable", "Lock washers (spring steel)"],
    not_safe_for: ["A490 — still not recommended even with mechanical galvanizing due to HE risk from service environment", "Applications requiring very tight thread tolerances"],
    substitution_note: "Available but less commonly stocked than zinc electroplate. May require ordering. Good COTS substitute for electroplated coating on high-strength fasteners.",
    star: true,
  },
  {
    id: "zinc_flake",
    name: "Zinc Flake Coating",
    shortName: "Zinc Flake (Geomet / Dacromet / Magni)",
    category: "Dip-Spin",
    he_risk: "NONE",
    standard: "ISO 10683 / ASTM F1136",
    color: "#059669",
    bg: "#F0FDF4",
    cots: "COTS — Available (specialty finish, not all distributors stock)",
    cots_color: "#D97706",
    appearance: "Matte silver-gray — thin, uniform coating",
    thickness: "0.3–0.8 mils (8–20 microns) — very thin but highly effective",
    corrosion_resistance: "500–1,500+ hours salt spray. Superior to electroplate at equivalent thickness.",
    temp_limit: "Up to ~570°F (300°C) depending on formulation",
    thread_effect: "Minimal — thin coating, negligible effect on thread dimensions. One major advantage.",
    he_detail: "Zinc flake coatings use dip-spin application with no acid cleaning. Abrasive blasting for surface prep means no hydrogen is introduced. Zero HE risk. The premium choice for high-strength fasteners requiring corrosion protection.",
    baking_required: "NOT REQUIRED — no hydrogen introduced",
    baking_standard: "ISO 10683. No baking requirement. Increasingly specified for Grade 8, 10.9, and 12.9 fasteners in automotive and industrial applications.",
    safe_for: ["Grade 8", "Grade 5", "10.9", "12.9", "A574 SHCS", "A490 (where corrosion protection needed)", "High-strength fasteners of all types", "Applications requiring tight tolerances"],
    not_safe_for: ["Not for applications requiring bright/decorative appearance", "Some formulations not compatible with all chemicals"],
    substitution_note: "Specialty finish — not widely stocked at general distributors. May require special order. Worth specifying for critical high-strength applications. Geomet, Dacromet, and Magni are the major brands.",
    star: true,
  },
  {
    id: "black_oxide",
    name: "Black Oxide",
    shortName: "Black Oxide / BLK",
    category: "Chemical Conversion",
    he_risk: "VERY LOW",
    standard: "MIL-DTL-13924",
    color: "#374151",
    bg: "#F8FAFC",
    cots: "COTS — Widely Available",
    cots_color: "#059669",
    appearance: "Matte black — distinctive appearance",
    thickness: "Essentially zero — no measurable dimensional change",
    corrosion_resistance: "Very limited — 2–4 hours salt spray without oil. With oil: 24–100 hours. NOT a corrosion-resistant finish without supplemental oil.",
    temp_limit: "Up to ~300°F (149°C)",
    thread_effect: "None — no dimensional change. A major advantage for precision threads.",
    he_detail: "Black oxide process uses alkaline (hot or cold) solutions — no acid cleaning required. Very low HE risk. Specifically chosen for socket head cap screws (Grade 12.9/A574) for this reason. Case-hardened parts do NOT need baking after black oxide.",
    baking_required: "NOT REQUIRED — no HE risk",
    baking_standard: "MIL-DTL-13924. No baking requirement for black oxide.",
    safe_for: ["Grade 8", "12.9", "A574 SHCS", "Case-hardened fasteners", "Precision thread applications", "Tooling and machinery"],
    not_safe_for: ["Outdoor or wet environments without supplemental coating", "Marine applications", "Applications requiring corrosion resistance"],
    substitution_note: "Widely available. Standard finish for socket head cap screws. Provides minimal corrosion protection — primarily for appearance and light rust prevention.",
    star: false,
  },
  {
    id: "phosphate",
    name: "Phosphate Coating",
    shortName: "Phosphate / Parkerizing",
    category: "Chemical Conversion",
    he_risk: "LOW-MEDIUM",
    standard: "MIL-DTL-16232",
    color: "#64748B",
    bg: "#F8FAFC",
    cots: "COTS — Available",
    cots_color: "#D97706",
    appearance: "Matte gray-black or dark gray — porous surface",
    thickness: "Minimal — 0.1–1.0 mil",
    corrosion_resistance: "Very limited alone. Used as a base for paint, oil, or wax — combined protection can be significant.",
    temp_limit: "Up to ~300°F with oil",
    thread_effect: "Minimal dimensional change",
    he_detail: "Phosphate process uses acidic phosphoric acid solutions — moderate HE risk. Less aggressive than electroplating but can introduce some hydrogen. Typically not specified for Grade 8 or higher without baking.",
    baking_required: "RECOMMENDED for high-strength fasteners (Grade 8 and above)",
    baking_standard: "MIL-DTL-16232. Baking recommended for high-hardness parts.",
    safe_for: ["Grade 5 and below", "Applications where paint adhesion is needed", "Indoor applications with supplemental oil"],
    not_safe_for: ["Outdoor or corrosive environments without supplemental coating", "Grade 8 without baking"],
    substitution_note: "Primarily used as a base coat for paint or as a temporary rust preventative. Not a standalone corrosion coating.",
    star: false,
  },
  {
    id: "cadmium",
    name: "Cadmium Plating",
    shortName: "Cadmium / Cad Plate",
    category: "Electroplated",
    he_risk: "HIGH",
    standard: "AMS-QQ-P-416 / ASTM B766",
    color: "#DC2626",
    bg: "#FFF1F2",
    cots: "LIMITED — Specialty/Military Only",
    cots_color: "#DC2626",
    appearance: "Bright silver — similar to zinc but slightly more yellow",
    thickness: "0.0002\"–0.0005\" (5–13 microns)",
    corrosion_resistance: "Excellent — superior to zinc in marine and salt environments. 200–500 hours salt spray.",
    temp_limit: "Up to ~450°F (232°C) — cadmium melts at 610°F — baking temperature must stay below this",
    thread_effect: "Similar to zinc electroplate — affects tight tolerances",
    he_detail: "Cadmium electroplating carries same HE risk as zinc electroplating — acid cleaning introduces hydrogen. Baking required for high-strength fasteners. Special consideration: cadmium melts at 610°F — baking temperature must be carefully controlled below this.",
    baking_required: "REQUIRED for high-strength fasteners. Baking temperature must NOT exceed 450°F (232°C) — cadmium melts at 610°F (321°C).",
    baking_standard: "AMS-QQ-P-416. Bake within 4 hours of plating. Temperature 250–375°F (121–191°C) — lower than zinc due to cadmium melt point concern.",
    safe_for: ["Military/aerospace specified applications", "Marine environments where cadmium is specified", "Applications with aluminum contact (good galvanic compatibility)"],
    not_safe_for: ["EU RoHS/REACH regulated products — cadmium is restricted", "Food contact applications", "Most commercial applications — largely replaced by zinc flake"],
    substitution_note: "NOT widely available commercially — primarily military/aerospace. Regulated under RoHS/REACH in EU. Most commercial applications have substituted zinc flake (Geomet/Dacromet) or zinc-nickel electroplate.",
    star: false,
  },
  {
    id: "nickel_chrome",
    name: "Nickel / Chrome Plating",
    shortName: "Nickel / Chrome",
    category: "Electroplated",
    he_risk: "HIGH",
    standard: "ASTM B456 / ASTM B177",
    color: "#7C3AED",
    bg: "#F5F3FF",
    cots: "COTS — Available (decorative/specialty)",
    cots_color: "#D97706",
    appearance: "Bright chrome or nickel finish — decorative",
    thickness: "Varies — 0.0002\"–0.001\" typical",
    corrosion_resistance: "Good to excellent depending on thickness and substrate preparation",
    temp_limit: "Chrome: up to 1,200°F. Nickel: up to 800°F.",
    thread_effect: "Affects thread dimensions — verify fit after plating",
    he_detail: "Both nickel and chrome electroplating use acid cleaning — same HE risk as zinc electroplating. Chrome plating particularly aggressive — chromic acid cleaning. Baking essential for high-strength fasteners.",
    baking_required: "REQUIRED for high-strength fasteners. Standard baking procedure applies.",
    baking_standard: "ASTM B456. Baking conditions per ASTM F1941 principles.",
    safe_for: ["Decorative applications", "Moderate strength fasteners", "Corrosion-resistant applications where appearance matters"],
    not_safe_for: ["High-strength fasteners without baking", "Hexavalent chrome now restricted under RoHS/REACH"],
    substitution_note: "Used primarily for decorative and specialty applications. Not typically a standard fastener finish for industrial use.",
    star: false,
  },
  {
    id: "passivation",
    name: "Passivation (Stainless)",
    shortName: "Passivation",
    category: "Chemical Treatment",
    he_risk: "NONE",
    standard: "ASTM A967 / AMS 2700",
    color: "#0891B2",
    bg: "#F0FDFE",
    cots: "Standard treatment for stainless — not a visible coating",
    cots_color: "#059669",
    appearance: "No visual change — enhances existing stainless appearance",
    thickness: "No measurable thickness — chemical treatment only",
    corrosion_resistance: "Restores and enhances natural passive oxide layer on stainless steel",
    temp_limit: "Same as base stainless material",
    thread_effect: "None — no dimensional change",
    he_detail: "Passivation is a chemical treatment that removes free iron and contaminants from the stainless surface, restoring the chromium oxide passive layer. Uses nitric or citric acid solutions. Very low HE risk — stainless is not susceptible to same HE mechanism as carbon steel.",
    baking_required: "NOT REQUIRED",
    baking_standard: "ASTM A967. No baking requirement.",
    safe_for: ["All stainless steel fasteners", "Standard treatment after machining or fabrication of stainless parts"],
    not_safe_for: ["Carbon steel — passivation is only for stainless"],
    substitution_note: "Not a coating — a standard treatment for stainless. Most quality stainless fasteners are passivated as part of standard manufacturing.",
    star: false,
  },
];

const HE_RISK_MATRIX = [
  { grade: "Grade 2", hrc: "B70–B100", tensile: "74 ksi", he_susceptibility: "VERY LOW", safe_coatings: "All coatings — no restriction", restricted_coatings: "None", color: "#059669" },
  { grade: "Grade 5", hrc: "C25–C34", tensile: "120 ksi", he_susceptibility: "LOW", safe_coatings: "All coatings. Baking recommended but not mandatory for electroplate.", restricted_coatings: "None restricted, baking best practice", color: "#2563EB" },
  { grade: "Grade 8", hrc: "C33–C39", tensile: "150 ksi", he_susceptibility: "MODERATE", safe_coatings: "HDG, mechanical galv, zinc flake, black oxide. Electroplate with baking.", restricted_coatings: "Electroplate without baking — HIGH RISK. HDG technically permitted but not recommended.", color: "#D97706" },
  { grade: "A325", hrc: "C25–C34", tensile: "120 ksi", he_susceptibility: "LOW", safe_coatings: "HDG standard for A325. Mechanical galv acceptable.", restricted_coatings: "Electroplate not typical for structural bolts", color: "#2563EB" },
  { grade: "A490", hrc: "C33–C38", tensile: "150 ksi", he_susceptibility: "HIGH", safe_coatings: "Plain (uncoated) or zinc flake only. Mechanical galv with caution.", restricted_coatings: "HDG — PROHIBITED. Electroplate — PROHIBITED. Hot-dip galvanizing PROHIBITED.", color: "#DC2626" },
  { grade: "A354 BD", hrc: "C33–C39", tensile: "150 ksi", he_susceptibility: "MODERATE-HIGH", safe_coatings: "Zinc flake, mechanical galv, black oxide. Electroplate with extended baking (10 hrs).", restricted_coatings: "Electroplate without baking — HIGH RISK", color: "#D97706" },
  { grade: "A193 B7", hrc: "C35 max", tensile: "125 ksi", he_susceptibility: "MODERATE", safe_coatings: "Usually plain or phosphate + oil. Zinc flake for corrosion resistance.", restricted_coatings: "Electroplate with caution — baking required", color: "#D97706" },
  { grade: "ISO 8.8", hrc: "C22–C32", tensile: "116 ksi", he_susceptibility: "LOW", safe_coatings: "All coatings with appropriate baking for electroplate.", restricted_coatings: "None restricted with proper procedure", color: "#2563EB" },
  { grade: "ISO 10.9", hrc: "C32–C39", tensile: "151 ksi", he_susceptibility: "MODERATE-HIGH", safe_coatings: "Zinc flake, mechanical galv, black oxide preferred. Electroplate with baking.", restricted_coatings: "Electroplate without baking — HIGH RISK", color: "#D97706" },
  { grade: "ISO 12.9", hrc: "C38–C44", tensile: "177 ksi", he_susceptibility: "VERY HIGH", safe_coatings: "Black oxide standard. Zinc flake acceptable. Mechanical galv with special process.", restricted_coatings: "Electroplate — VERY HIGH RISK even with baking. HDG — PROHIBITED.", color: "#DC2626" },
  { grade: "A574 SHCS", hrc: "C39–C45", tensile: "180 ksi", he_susceptibility: "VERY HIGH", safe_coatings: "Black oxide standard and safest. Zinc flake acceptable. Special processing required for any electroplate.", restricted_coatings: "Electroplate — VERY HIGH RISK. Acid cleaning processes prohibited without special controls.", color: "#DC2626" },
];

const BAKING_GUIDE = [
  { aspect: "When to bake", detail: "Required for all electroplated fasteners above HRC 40. Strongly recommended for HRC 35–39. Not required for HRC 34 and below per ASTM F1941." },
  { aspect: "Timing — critical", detail: "Must bake within 4 hours of electroplating. Hydrogen diffuses into steel during plating — the longer you wait, the more it migrates to grain boundaries and the harder it is to remove." },
  { aspect: "Temperature range", detail: "350–450°F (177–232°C) for most fasteners. Must stay below original tempering temperature to avoid reducing fastener strength. Cadmium-plated parts: max 375°F (191°C) due to cadmium melt point." },
  { aspect: "Duration", detail: "Minimum 3 hours (commercial standard per Southwestern Plating). 8+ hours for Grade 8. 10 hours minimum for A354 BD per revised standard. Longer baking provides more thorough hydrogen removal." },
  { aspect: "Grade BD special requirement", detail: "ASTM revised standard requires 10 hours minimum baking for A354 BD (Grade 8 equivalent) electroplated fasteners. Previous requirement was 4 hours — verify supplier is using current standard." },
  { aspect: "After baking", detail: "Apply chromate finish AFTER baking — temperatures above 150°F (66°C) damage chromate films. Baking must be complete before chromate application." },
  { aspect: "Verification", detail: "ASTM F1940 provides test methods for process control verification. For critical applications, require certification of baking time and temperature from plating supplier." },
];

const heRiskColor = (r) => {
  if (r === "VERY HIGH" || r === "HIGH") return "#DC2626";
  if (r === "MODERATE-HIGH" || r === "MODERATE") return "#D97706";
  if (r === "LOW-MEDIUM" || r === "LOW") return "#2563EB";
  return "#059669";
};

const heRiskBg = (r) => {
  if (r === "VERY HIGH" || r === "HIGH") return "#FFF1F2";
  if (r === "MODERATE-HIGH" || r === "MODERATE") return "#FFF8E7";
  if (r === "LOW-MEDIUM" || r === "LOW") return "#EFF6FF";
  return "#F0FDF4";
};

export default function CoatingGuide() {
  const [activeTab, setActiveTab] = useState("coatings");
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");

  const selectedCoating = selected ? COATINGS.find(c => c.id === selected) : null;

  const filtered = COATINGS.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.shortName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ fontFamily: "'DM Sans','Segoe UI',sans-serif", background: BG, minHeight: "100vh", maxWidth: 430, margin: "0 auto" }}>

      {/* HEADER */}
      <div style={{ background: `linear-gradient(135deg, ${NAVY} 0%, #2C5282 100%)`, padding: "16px 20px 20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
          <span style={{ fontSize: 20 }}>⬡</span>
          <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 10, letterSpacing: 2, textTransform: "uppercase" }}>Fastener Companion</span>
        </div>
        <div style={{ color: WHITE, fontSize: 20, fontWeight: 800, marginBottom: 2 }}>Coating & Plating Guide</div>
        <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 11 }}>ASTM F1941 · ASTM A153 · ASTM B695 · ISO 10683 · MIL-STD-171 · IFI 7th Ed.</div>
        <div style={{ background: WHITE, borderRadius: 12, display: "flex", alignItems: "center", padding: "10px 14px", gap: 8, marginTop: 14, boxShadow: "0 2px 8px rgba(0,0,0,0.15)" }}>
          <span style={{ color: MUTED }}>??</span>
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search coatings..."
            style={{ background: "none", border: "none", outline: "none", color: TEXT, fontSize: 14, flex: 1, fontFamily: "inherit" }} />
          {search && <span onClick={() => setSearch("")} style={{ color: MUTED, cursor: "pointer" }}>✕</span>}
        </div>
      </div>

      {/* CRITICAL WARNING */}
      <div style={{ margin: "12px 16px 0", background: "#FFF1F2", border: "1px solid #FECDD3", borderLeft: "4px solid #DC2626", borderRadius: 10, padding: "10px 14px" }}>
        <div style={{ fontSize: 12, fontWeight: 800, color: "#DC2626", marginBottom: 4 }}>⚡ Critical Safety Note</div>
        <div style={{ fontSize: 11, color: "#9F1239", lineHeight: 1.5 }}>Electroplating introduces hydrogen that can cause sudden brittle fracture — hydrogen embrittlement (HE). Grade 8, A490, 10.9, and 12.9 fasteners are highly susceptible. Wrong coating + wrong grade = catastrophic failure with no warning.</div>
      </div>

      {/* TABS */}
      <div style={{ background: WHITE, borderBottom: `1px solid ${BORDER}`, padding: "0 8px", display: "flex", overflowX: "auto", scrollbarWidth: "none", marginTop: 12 }}>
        {[
          { id: "coatings", label: "Coatings" },
          { id: "he_matrix", label: "HE Risk Matrix" },
          { id: "baking", label: "Baking Guide" },
          { id: "selection", label: "Which Coating?" },
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

      {/* COATINGS LIST */}
      {activeTab === "coatings" && !selectedCoating && (
        <div style={{ padding: "12px 16px", display: "flex", flexDirection: "column", gap: 10 }}>
          {filtered.map(coating => (
            <div key={coating.id} onClick={() => setSelected(coating.id)}
              style={{
                background: coating.star ? STAR_BG : WHITE,
                border: `1px solid ${BORDER}`,
                borderLeft: `4px solid ${coating.color}`,
                borderRadius: 12, padding: "14px", cursor: "pointer",
                boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
              }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }}>
                    {coating.star && <span style={{ color: AMBER, fontSize: 11 }}>★</span>}
                    <span style={{ fontSize: 14, fontWeight: 800, color: NAVY }}>{coating.name}</span>
                  </div>
                  <div style={{ fontSize: 10, color: MUTED }}>{coating.standard} · {coating.category}</div>
                </div>
                <div style={{
                  background: heRiskBg(coating.he_risk),
                  border: `1px solid ${heRiskColor(coating.he_risk)}`,
                  borderRadius: 6, padding: "2px 8px",
                  fontSize: 9, fontWeight: 800,
                  color: heRiskColor(coating.he_risk),
                  whiteSpace: "nowrap", flexShrink: 0, marginLeft: 8,
                }}>HE: {coating.he_risk}</div>
              </div>
              <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
                <div style={{
                  background: coating.cots_color + "15",
                  border: `1px solid ${coating.cots_color}`,
                  borderRadius: 6, padding: "2px 8px",
                  fontSize: 9, fontWeight: 700, color: coating.cots_color,
                }}>{coating.cots}</div>
              </div>
              <div style={{ fontSize: 11, color: TEXT, lineHeight: 1.5, marginBottom: 4 }}>
                <span style={{ fontWeight: 700 }}>Appearance:</span> {coating.appearance}
              </div>
              <div style={{ fontSize: 11, color: TEXT, lineHeight: 1.5 }}>
                <span style={{ fontWeight: 700 }}>Corrosion:</span> {coating.corrosion_resistance}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* COATING DETAIL */}
      {activeTab === "coatings" && selectedCoating && (
        <div style={{ padding: "14px 16px" }}>
          <button onClick={() => setSelected(null)}
            style={{ background: "none", border: "none", cursor: "pointer", color: NAVY, fontSize: 13, fontWeight: 700, fontFamily: "inherit", marginBottom: 14, display: "flex", alignItems: "center", gap: 6, padding: 0 }}>
            ← Back
          </button>

          <div style={{ background: selectedCoating.bg, border: `1px solid ${BORDER}`, borderLeft: `4px solid ${selectedCoating.color}`, borderRadius: 12, padding: "14px", marginBottom: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
              <div>
                <div style={{ fontSize: 16, fontWeight: 800, color: NAVY }}>{selectedCoating.name}</div>
                <div style={{ fontSize: 11, color: MUTED, marginTop: 2 }}>{selectedCoating.standard}</div>
              </div>
              <div style={{ background: heRiskBg(selectedCoating.he_risk), border: `1px solid ${heRiskColor(selectedCoating.he_risk)}`, borderRadius: 6, padding: "3px 10px", fontSize: 10, fontWeight: 800, color: heRiskColor(selectedCoating.he_risk) }}>
                HE Risk: {selectedCoating.he_risk}
              </div>
            </div>
            <div style={{ display: "inline-block", background: selectedCoating.cots_color + "15", border: `1px solid ${selectedCoating.cots_color}`, borderRadius: 6, padding: "2px 10px", fontSize: 10, fontWeight: 700, color: selectedCoating.cots_color }}>
              {selectedCoating.cots}
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 12 }}>
            {[
              { label: "Appearance", value: selectedCoating.appearance },
              { label: "Thickness", value: selectedCoating.thickness },
              { label: "Corrosion Resistance", value: selectedCoating.corrosion_resistance },
              { label: "Temp Limit", value: selectedCoating.temp_limit },
              { label: "Thread Effect", value: selectedCoating.thread_effect },
              { label: "Baking Required?", value: selectedCoating.baking_required },
            ].map((item, i) => (
              <div key={i} style={{ background: ROW_ALT, borderRadius: 8, padding: "8px 10px", border: `1px solid ${BORDER}` }}>
                <div style={{ fontSize: 9, color: MUTED, textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 2 }}>{item.label}</div>
                <div style={{ fontSize: 11, fontWeight: 600, color: TEXT, lineHeight: 1.3 }}>{item.value}</div>
              </div>
            ))}
          </div>

          <div style={{ background: heRiskBg(selectedCoating.he_risk), border: `1px solid ${heRiskColor(selectedCoating.he_risk)}`, borderLeft: `4px solid ${heRiskColor(selectedCoating.he_risk)}`, borderRadius: 12, padding: "12px 14px", marginBottom: 10 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: heRiskColor(selectedCoating.he_risk), marginBottom: 6 }}>⚡ Hydrogen Embrittlement Detail</div>
            <div style={{ fontSize: 12, color: TEXT, lineHeight: 1.6, marginBottom: 8 }}>{selectedCoating.he_detail}</div>
            <div style={{ fontSize: 11, fontWeight: 700, color: heRiskColor(selectedCoating.he_risk) }}>Baking: {selectedCoating.baking_standard}</div>
          </div>

          <div style={{ background: "#F0FDF4", border: `1px solid #BBF7D0`, borderRadius: 12, overflow: "hidden", marginBottom: 10 }}>
            <div style={{ background: "#059669", padding: "8px 14px" }}>
              <div style={{ color: WHITE, fontSize: 11, fontWeight: 700 }}>✓ Safe For</div>
            </div>
            {selectedCoating.safe_for.map((item, i) => (
              <div key={i} style={{ padding: "7px 14px", borderBottom: `1px solid #BBF7D0`, background: i % 2 === 0 ? WHITE : "#F0FDF4", display: "flex", gap: 8 }}>
                <span style={{ color: "#059669", flexShrink: 0 }}>✓</span>
                <div style={{ fontSize: 12, color: TEXT }}>{item}</div>
              </div>
            ))}
          </div>

          <div style={{ background: "#FFF1F2", border: `1px solid #FECDD3`, borderRadius: 12, overflow: "hidden", marginBottom: 10 }}>
            <div style={{ background: "#DC2626", padding: "8px 14px" }}>
              <div style={{ color: WHITE, fontSize: 11, fontWeight: 700 }}>✗ Not Safe For / Restrictions</div>
            </div>
            {selectedCoating.not_safe_for.map((item, i) => (
              <div key={i} style={{ padding: "7px 14px", borderBottom: `1px solid #FECDD3`, background: i % 2 === 0 ? WHITE : "#FFF5F5", display: "flex", gap: 8 }}>
                <span style={{ color: "#DC2626", flexShrink: 0 }}>✗</span>
                <div style={{ fontSize: 12, color: TEXT }}>{item}</div>
              </div>
            ))}
          </div>

          <div style={{ background: STAR_BG, border: `1px solid ${STAR_BORDER}`, borderLeft: `4px solid ${AMBER}`, borderRadius: 12, padding: "12px 14px", marginBottom: 14 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#92400E", marginBottom: 4 }}>?? COTS Availability & Substitution</div>
            <div style={{ fontSize: 12, color: "#92400E", lineHeight: 1.5 }}>{selectedCoating.substitution_note}</div>
          </div>
        </div>
      )}

      {/* HE RISK MATRIX */}
      {activeTab === "he_matrix" && (
        <div style={{ padding: "12px 16px" }}>
          <div style={{ background: "#FFF1F2", border: "1px solid #FECDD3", borderRadius: 10, padding: "10px 14px", marginBottom: 12 }}>
            <div style={{ fontSize: 11, color: "#9F1239", lineHeight: 1.5 }}>
              <strong>Hydrogen embrittlement susceptibility increases with fastener hardness/strength.</strong> The threshold for serious risk is approximately HRC 35 (Grade 8 / 10.9 range). Above HRC 39, extreme caution required.
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {HE_RISK_MATRIX.map((item, i) => (
              <div key={i} style={{
                background: WHITE, border: `1px solid ${BORDER}`,
                borderLeft: `4px solid ${heRiskColor(item.he_susceptibility)}`,
                borderRadius: 12, padding: "12px 14px",
                boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 800, color: item.color }}>{item.grade}</div>
                    <div style={{ fontSize: 10, color: MUTED }}>{item.hrc} · {item.tensile}</div>
                  </div>
                  <div style={{
                    background: heRiskBg(item.he_susceptibility),
                    border: `1px solid ${heRiskColor(item.he_susceptibility)}`,
                    borderRadius: 6, padding: "2px 8px",
                    fontSize: 9, fontWeight: 800,
                    color: heRiskColor(item.he_susceptibility),
                  }}>{item.he_susceptibility}</div>
                </div>
                <div style={{ marginBottom: 6 }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: "#059669", textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 2 }}>Safe Coatings</div>
                  <div style={{ fontSize: 11, color: TEXT, lineHeight: 1.4 }}>{item.safe_coatings}</div>
                </div>
                <div style={{ background: "#FFF1F2", borderRadius: 8, padding: "6px 10px" }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: "#DC2626", textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 2 }}>Restricted / Prohibited</div>
                  <div style={{ fontSize: 11, color: "#9F1239" }}>{item.restricted_coatings}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* BAKING GUIDE */}
      {activeTab === "baking" && (
        <div style={{ padding: "14px 16px" }}>
          <div style={{ background: "#FFF8E7", border: `1px solid ${STAR_BORDER}`, borderRadius: 10, padding: "10px 14px", marginBottom: 12 }}>
            <div style={{ fontSize: 11, color: "#92400E", lineHeight: 1.5 }}>
              <strong>Baking (embrittlement relief) drives hydrogen out of the fastener after electroplating.</strong> Timing is critical — must be done within 4 hours of plating before hydrogen migrates to grain boundaries.
            </div>
          </div>
          <div style={{ background: WHITE, borderRadius: 14, overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.06)", border: `1px solid ${BORDER}` }}>
            <div style={{ background: NAVY, padding: "10px 14px" }}>
              <div style={{ color: WHITE, fontSize: 12, fontWeight: 700 }}>Baking Requirements — ASTM F1941</div>
            </div>
            {BAKING_GUIDE.map((item, i) => (
              <div key={i} style={{ padding: "12px 14px", borderBottom: `1px solid ${BORDER}`, background: i % 2 === 0 ? WHITE : ROW_ALT }}>
                <div style={{ fontSize: 12, fontWeight: 800, color: NAVY, marginBottom: 4 }}>{item.aspect}</div>
                <div style={{ fontSize: 12, color: TEXT, lineHeight: 1.6 }}>{item.detail}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SELECTION GUIDE */}
      {activeTab === "selection" && (
        <div style={{ padding: "14px 16px", display: "flex", flexDirection: "column", gap: 10 }}>
          {[
            { situation: "General purpose low/medium strength (Grade 2, 5, 8.8)", recommendation: "Zinc Electroplate (clear or yellow chromate)", reason: "Most economical, widely available COTS, sufficient corrosion protection for most indoor/light outdoor applications." },
            { situation: "High-strength fasteners (Grade 8, 10.9, A354 BD)", recommendation: "Zinc Flake (Geomet/Dacromet) or Mechanical Galvanizing", reason: "No HE risk. Zinc flake preferred — thin, excellent corrosion resistance, no thread dimension issues. Mechanical galv is good COTS alternative." },
            { situation: "Highest strength (12.9, A574, A490)", recommendation: "Black Oxide or Zinc Flake ONLY", reason: "Black oxide has zero HE risk, no dimensional change. Zinc flake is acceptable. Electroplating extremely risky even with baking." },
            { situation: "Structural outdoor applications (A307, A325)", recommendation: "Hot-Dip Galvanizing (ASTM A153)", reason: "Industry standard for structural outdoor fasteners. Best long-term corrosion protection. Sacrificial zinc protection." },
            { situation: "Marine / saltwater environment", recommendation: "316 Stainless or Zinc Flake", reason: "316 SS provides best corrosion resistance without coating. Zinc flake if carbon steel must be used. HDG acceptable for structural." },
            { situation: "Tight tolerance precision threads", recommendation: "Black Oxide or Zinc Flake", reason: "Both add minimal or no measurable thickness to threads. Electroplate and HDG can affect thread fit." },
            { situation: "High temperature above 300°F", recommendation: "Black Oxide or Nickel/Inconel plating", reason: "Zinc coatings degrade at elevated temperatures. Black oxide stable to ~300°F. For higher temperatures, consult engineer." },
            { situation: "Food grade / FDA applications", recommendation: "316 Stainless (passivated)", reason: "No coating needed — stainless is the standard for food contact. Passivation ensures clean surface." },
          ].map((item, i) => (
            <div key={i} style={{ background: WHITE, border: `1px solid ${BORDER}`, borderRadius: 12, overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
              <div style={{ background: NAVY, padding: "10px 14px" }}>
                <div style={{ color: WHITE, fontSize: 12, fontWeight: 700 }}>{item.situation}</div>
              </div>
              <div style={{ padding: "12px 14px" }}>
                <div style={{ display: "inline-block", background: "#EEF4FF", border: `1px solid ${NAVY}`, borderRadius: 6, padding: "3px 10px", fontSize: 11, fontWeight: 800, color: NAVY, marginBottom: 8 }}>→ {item.recommendation}</div>
                <div style={{ fontSize: 12, color: TEXT, lineHeight: 1.5 }}>{item.reason}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* DISCLAIMER */}
      <div style={{ margin: "0 16px 24px", background: "#FFF1F2", border: "1px solid #FECDD3", borderRadius: 10, padding: "10px 14px" }}>
        <div style={{ fontSize: 10, color: "#9F1239", lineHeight: 1.5 }}>
          <strong>⚠ Verify Before Use.</strong> Coating data based on ASTM F1941, ASTM A153, ASTM B695, ISO 10683, MIL-STD-171, and IFI 7th Edition. HE risk classifications based on Brahimi/Boltcouncil research and Fastenal Engineering Resources. Always consult coating supplier and engineer for safety-critical applications. Fastener Companion is a reference tool — not a substitute for engineering judgment.
        </div>
      </div>
    </div>
  );
}
