// ============================================================
// BATCH 04 — CALCULATORS, DIMENSIONAL TOOLS & SYSTEMS/APPLICATIONS
// Fastener Companion App
//
// Named exports — import as:
//   import { TorqueCalculator, ThreadEngagement, PreloadCalculator,
//            BoltLengthGuide, FastenerTypeReference, ClearanceHoles,
//            CboreCsink, WeightCount, PipeThreadReference,
//            VibrationGuide, StandardsReference, ConditionAssessment,
//            StorageHandling, AnchorBoltReference, FlangeBoltChart,
//            CertificationGuide, IndustryGuide,
//            TempRatingReference } from './batch-04-calculators-systems'
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
// TorqueCalculator
// ════════════════════════════════════════════════════

// ─── DATA ─────────────────────────────────────────────────────────────────────
// Sources: IFI Fastener Standards 7th Edition, SAE J429, ASTM F3125,
// Machinery's Handbook 31st Ed., Bickford "Introduction to the Design and
// Behavior of Bolted Joints", Engineers Edge torque tables

// Torque formula: T = K × D × F
// K = nut factor (friction coefficient)
// D = nominal diameter (inches)
// F = desired clamp load (lbs) = proof load × stress area × target preload %

// Stress areas per ASME B1.1
const STRESS_AREAS = {
  "1/4-20":  { area: 0.0318, d: 0.250 },
  "1/4-28":  { area: 0.0364, d: 0.250 },
  "5/16-18": { area: 0.0524, d: 0.3125 },
  "5/16-24": { area: 0.0580, d: 0.3125 },
  "3/8-16":  { area: 0.0775, d: 0.375 },
  "3/8-24":  { area: 0.0878, d: 0.375 },
  "7/16-14": { area: 0.1063, d: 0.4375 },
  "7/16-20": { area: 0.1187, d: 0.4375 },
  "1/2-13":  { area: 0.1419, d: 0.500 },
  "1/2-20":  { area: 0.1599, d: 0.500 },
  "9/16-12": { area: 0.1820, d: 0.5625 },
  "9/16-18": { area: 0.2030, d: 0.5625 },
  "5/8-11":  { area: 0.2260, d: 0.625 },
  "5/8-18":  { area: 0.2560, d: 0.625 },
  "3/4-10":  { area: 0.3340, d: 0.750 },
  "3/4-16":  { area: 0.3730, d: 0.750 },
  "7/8-9":   { area: 0.4620, d: 0.875 },
  "7/8-14":  { area: 0.5090, d: 0.875 },
  "1-8":     { area: 0.6060, d: 1.000 },
  "1-12":    { area: 0.6630, d: 1.000 },
  "1-14":    { area: 0.6780, d: 1.000 },
  "1 1/8-7": { area: 0.7630, d: 1.125 },
  "1 1/4-7": { area: 0.9690, d: 1.250 },
  "1 3/8-6": { area: 1.155,  d: 1.375 },
  "1 1/2-6": { area: 1.405,  d: 1.500 },
};

const METRIC_STRESS_AREAS = {
  "M6 x 1.0":    { area: 0.00452, d: 0.00600 },  // m²
  "M8 x 1.25":   { area: 0.00845, d: 0.00800 },
  "M10 x 1.5":   { area: 0.01400, d: 0.01000 },
  "M12 x 1.75":  { area: 0.02030, d: 0.01200 },
  "M14 x 2.0":   { area: 0.02760, d: 0.01400 },
  "M16 x 2.0":   { area: 0.03570, d: 0.01600 },
  "M18 x 2.5":   { area: 0.04520, d: 0.01800 },
  "M20 x 2.5":   { area: 0.05450, d: 0.02000 },
  "M22 x 2.5":   { area: 0.07030, d: 0.02200 },
  "M24 x 3.0":   { area: 0.08430, d: 0.02400 },
  "M27 x 3.0":   { area: 0.10600, d: 0.02700 },
  "M30 x 3.5":   { area: 0.13000, d: 0.03000 },
  "M36 x 4.0":   { area: 0.19200, d: 0.03600 },
};

// Proof loads in PSI for imperial, MPa for metric
const GRADE_DATA = {
  imperial: {
    "Grade 2 (≤3/4\")":  { proof: 55000,  tensile: 74000,  name: "SAE Grade 2" },
    "Grade 2 (>3/4\")":  { proof: 33000,  tensile: 60000,  name: "SAE Grade 2 (large)" },
    "Grade 5 (≤1\")":    { proof: 85000,  tensile: 120000, name: "SAE Grade 5" },
    "Grade 5 (>1\")":    { proof: 74000,  tensile: 105000, name: "SAE Grade 5 (large)" },
    "Grade 8":           { proof: 120000, tensile: 150000, name: "SAE Grade 8" },
    "A307 Grade A":      { proof: 0,      tensile: 60000,  name: "ASTM A307" },
    "A325 (≤1\")":       { proof: 85000,  tensile: 120000, name: "ASTM A325" },
    "A325 (>1\")":       { proof: 74000,  tensile: 105000, name: "ASTM A325 (large)" },
    "A490":              { proof: 120000, tensile: 150000, name: "ASTM A490" },
    "A354 BD":           { proof: 120000, tensile: 150000, name: "ASTM A354 BD" },
    "A193 B7 (≤2.5\")":  { proof: 0,      tensile: 125000, name: "ASTM A193 B7" },
  },
  metric: {
    "8.8":   { proof: 580,  tensile: 800,  name: "ISO 8.8" },
    "10.9":  { proof: 830,  tensile: 1040, name: "ISO 10.9" },
    "12.9":  { proof: 970,  tensile: 1220, name: "ISO 12.9" },
    "A2-70": { proof: 450,  tensile: 700,  name: "ISO A2-70 (304 SS)" },
    "A4-70": { proof: 450,  tensile: 700,  name: "ISO A4-70 (316 SS)" },
    "A4-80": { proof: 600,  tensile: 800,  name: "ISO A4-80 (316 SS)" },
    "4.6":   { proof: 225,  tensile: 400,  name: "ISO 4.6" },
    "5.8":   { proof: 380,  tensile: 520,  name: "ISO 5.8" },
  },
};

// K-factors by condition
const K_FACTORS = {
  "Dry / No Lubrication":           { k: 0.20, color: "#64748B" },
  "Zinc Plated (dry)":              { k: 0.17, color: "#2563EB" },
  "Slightly Oiled":                 { k: 0.17, color: "#2563EB" },
  "Machine Oil (light lubrication)": { k: 0.15, color: "#059669" },
  "Anti-Seize — Copper":            { k: 0.13, color: "#D97706" },
  "Anti-Seize — Nickel":            { k: 0.13, color: "#D97706" },
  "Anti-Seize — Moly (MoS₂)":      { k: 0.11, color: "#7C3AED" },
  "Waxed / PTFE":                   { k: 0.15, color: "#059669" },
  "Hot-Dip Galvanized":             { k: 0.19, color: "#64748B" },
  "Cadmium Plated":                 { k: 0.14, color: "#0891B2" },
};

function calcTorque(size, gradeKey, kKey, preloadPct, system) {
  const kData = K_FACTORS[kKey];
  const gradeInfo = system === "imperial" ? GRADE_DATA.imperial[gradeKey] : GRADE_DATA.metric[gradeKey];
  const sizeData = system === "imperial" ? STRESS_AREAS[size] : METRIC_STRESS_AREAS[size];
  if (!kData || !gradeInfo || !sizeData) return null;

  const k = kData.k;
  const pct = preloadPct / 100;

  if (system === "imperial") {
    const proofLoad = gradeInfo.proof > 0 ? gradeInfo.proof : gradeInfo.tensile * 0.75;
    const clampLoad = proofLoad * sizeData.area * pct; // lbs
    const torque_inlb = k * sizeData.d * 12 * clampLoad; // in-lb (d in inches, multiply to get in-lb)
    const torque_ftlb = torque_inlb / 12;
    const torque_nm = torque_ftlb * 1.3558;
    return {
      clampLoad: Math.round(clampLoad),
      torque_ftlb: Math.round(torque_ftlb),
      torque_inlb: Math.round(torque_inlb),
      torque_nm: Math.round(torque_nm),
      k,
      proofLoad: gradeInfo.proof > 0 ? gradeInfo.proof : null,
      tensile: gradeInfo.tensile,
    };
  } else {
    // Metric: T = K × d × F, d in meters, F in N, T in Nm
    const proofLoad_mpa = gradeInfo.proof > 0 ? gradeInfo.proof : gradeInfo.tensile * 0.75;
    const proofLoad_pa = proofLoad_mpa * 1e6;
    const clampLoad_n = proofLoad_pa * sizeData.area * pct; // N
    const torque_nm = k * sizeData.d * clampLoad_n; // Nm
    const torque_ftlb = torque_nm / 1.3558;
    const torque_inlb = torque_ftlb * 12;
    return {
      clampLoad: Math.round(clampLoad_n),
      torque_nm: Math.round(torque_nm),
      torque_ftlb: Math.round(torque_ftlb),
      torque_inlb: Math.round(torque_inlb * 10) / 10,
      k,
      proofLoad: gradeInfo.proof > 0 ? gradeInfo.proof : null,
      tensile: gradeInfo.tensile,
    };
  }
}



// ════════════════════════════════════════════════════
// AnchorBoltReference
// ════════════════════════════════════════════════════

// ─── DATA ─────────────────────────────────────────────────────────────────────
// Sources: ASTM F1554 (anchor bolts), ACI 318 (concrete anchor design),
// ICC-ES ESR reports, ICC AC193 (adhesive anchors),
// Hilti and Simpson Strong-Tie technical resources,
// IFI 7th Edition, Portland Bolt anchor bolt guide

const ANCHOR_TYPES = [
  {
    id: "cast_in",
    name: "Cast-In-Place Anchors",
    icon: "??️",
    color: "#2563EB",
    types: [
      {
        name: "L-Bolt (L-Anchor)",
        description: "Steel rod bent 90° at embedded end. Standard anchor for base plates, equipment pads, structural posts.",
        standard: "ASTM F1554",
        material: "Grade 36 (36 ksi), Grade 55 (55 ksi), Grade 105 (105 ksi)",
        sizes: "1/2\" to 4\" diameter",
        embed_rule: "Minimum embed depth per ACI 318 — typically 12× diameter for Grade 36",
        use: "Equipment bases, column base plates, structural steel-to-concrete connections",
        cots: "★ COTS — Widely Available",
        cots_color: "#059669",
        star: true,
      },
      {
        name: "J-Bolt (Hook Bolt)",
        description: "Steel rod with J-shaped hook at embedded end. Smaller hook than L-bolt — lower pullout capacity.",
        standard: "ASTM F1554 (lighter applications)",
        material: "Low carbon steel, Grade 36 typical",
        sizes: "1/4\" to 1-1/2\" diameter common",
        embed_rule: "Same as L-bolt — minimum embed per ACI 318",
        use: "Light equipment, machinery anchoring, fence posts, sign bases",
        cots: "★ COTS — Widely Available",
        cots_color: "#059669",
        star: false,
      },
      {
        name: "Headed Anchor Bolt",
        description: "Straight rod with forged or welded hex head at embedded end. Highest pullout capacity of cast-in types.",
        standard: "ASTM F1554 / ASTM A307",
        material: "Grade 36, 55, or 105 per F1554",
        sizes: "1/2\" to 4\"",
        embed_rule: "ACI 318 Appendix D / Chapter 17 — headed anchors have higher breakout capacity than hooked",
        use: "Heavy equipment, transformers, large structural columns — maximum load applications",
        cots: "COTS — Available (less common than L-bolt)",
        cots_color: "#D97706",
        star: true,
      },
    ],
  },
  {
    id: "post_installed",
    name: "Post-Installed Anchors",
    icon: "??",
    color: "#D97706",
    types: [
      {
        name: "Wedge Anchor (Expansion Anchor)",
        description: "Torque-actuated expansion into concrete. Wedge expands as nut is tightened. Most common post-installed anchor.",
        standard: "ASTM F1554 (rod) / ICC-ES ESR",
        material: "Carbon steel (zinc plated) or 304/316 SS for corrosive",
        sizes: "1/4\" to 1-1/4\" common",
        embed_rule: "Minimum 1\" from slab edge, 4× diameter minimum embedment. Full embedment per ESR report.",
        use: "Equipment bases, machinery, light structural, concrete attachment",
        cots: "★ COTS — Widely Available",
        cots_color: "#059669",
        installation: "Drill hole (same diameter as anchor), clean hole, insert, tighten to specified torque.",
        he_warning: null,
        star: true,
      },
      {
        name: "Sleeve Anchor",
        description: "Expansion sleeve surrounds anchor body. Good for hollow or cracked concrete. Two-part installation.",
        standard: "ICC-ES ESR",
        material: "Carbon steel, zinc plated; 304 SS available",
        sizes: "3/16\" to 3/4\" common",
        embed_rule: "Per manufacturer ESR — typically 2.25–3.5× diameter minimum embedment",
        use: "Hollow block, hollow core, cracked concrete, where wedge anchor not suitable",
        cots: "★ COTS — Widely Available",
        cots_color: "#059669",
        installation: "Drill hole, insert anchor, tighten — sleeve expands into concrete.",
        star: false,
      },
      {
        name: "Drop-In Anchor (Internal Expansion)",
        description: "Hollow anchor body dropped into hole, expanding clip locks by setting tool. Accepts standard bolt.",
        standard: "ICC-ES ESR",
        material: "Carbon steel, zinc plated; SS available",
        sizes: "1/4\" to 1-1/4\"",
        embed_rule: "Flush with concrete surface. Hole depth critical — must match anchor length exactly.",
        use: "Overhead applications, threaded rod connections, where bolt must be removable",
        cots: "COTS — Available",
        cots_color: "#D97706",
        installation: "Drill to precise depth, clean hole, insert anchor, use setting tool to expand. Thread bolt in.",
        star: false,
      },
      {
        name: "Adhesive / Epoxy Anchor",
        description: "Chemical adhesive bonds threaded rod to concrete — highest capacity post-installed anchor type.",
        standard: "ICC AC193 / ICC-ES ESR / ACI 318 Chapter 17",
        material: "Threaded rod: ASTM A193 B7 or A307. Adhesive: specific approved product per ESR.",
        sizes: "3/8\" to 2\" threaded rod common",
        embed_rule: "Per specific ESR — typically 4.5–10× diameter. Critical: fully clean hole with brush + blow-out REQUIRED.",
        use: "High-load connections, seismic applications, rebar dowels, where mechanical anchors can't achieve required load",
        cots: "COTS — Available (adhesive is application-specific)",
        cots_color: "#D97706",
        installation: "Drill, clean thoroughly (brush + blow), inject adhesive, insert rod, do not disturb during cure time.",
        he_warning: "Hole cleaning is CRITICAL — failure to properly clean reduces capacity by up to 70%. Always brush AND blow out twice.",
        star: true,
      },
    ],
  },
];

const ASTM_F1554_GRADES = [
  {
    grade: "Grade 36",
    tensile: "58–80 ksi",
    yield: "36 ksi min",
    elong: "23% min",
    weldable: "Yes — low carbon",
    use: "Standard anchor bolts for most structural applications. Base plates, light to medium equipment.",
    hdg: "Compatible — can be hot-dip galvanized",
    color: "#059669",
    star: true,
  },
  {
    grade: "Grade 55",
    tensile: "75–95 ksi",
    yield: "55 ksi min",
    elong: "21% min",
    weldable: "Supplement S1 required — weldable grade available",
    use: "Medium-high load applications. Where Grade 36 is insufficient but Grade 105 is over-specified.",
    hdg: "Compatible",
    color: "#2563EB",
    star: false,
  },
  {
    grade: "Grade 105",
    tensile: "125 ksi min",
    yield: "105 ksi min",
    elong: "15% min",
    weldable: "Not weldable — alloy steel Q&T",
    use: "High load applications, seismic zones, heavy equipment, large structural columns.",
    hdg: "NOT recommended — high strength + HDG creates risk. Use zinc flake or mechanical galv.",
    color: "#DC2626",
    star: false,
  },
];

const EDGE_SPACING = [
  { anchor: "1/2\"",   min_edge: "2.5\"",  min_spacing: "3.0\"", min_embed: "3.5\"" },
  { anchor: "5/8\"",   min_edge: "3.125\"", min_spacing: "3.75\"", min_embed: "4.375\"" },
  { anchor: "3/4\"",   min_edge: "3.75\"", min_spacing: "4.5\"", min_embed: "5.25\""  },
  { anchor: "7/8\"",   min_edge: "4.375\"", min_spacing: "5.25\"", min_embed: "6.125\"" },
  { anchor: "1\"",     min_edge: "5.0\"",  min_spacing: "6.0\"", min_embed: "7.0\""   },
  { anchor: "1-1/4\"", min_edge: "6.25\"", min_spacing: "7.5\"", min_embed: "8.75\""  },
  { anchor: "1-1/2\"", min_edge: "7.5\"",  min_spacing: "9.0\"", min_embed: "10.5\""  },
];

export default function AnchorBoltReference() {
  const [activeTab, setActiveTab] = useState("types");
  const [expandedFamily, setExpandedFamily] = useState("cast_in");
  const [selected, setSelected] = useState(null);

  return (
    <div style={{ fontFamily: "'DM Sans','Segoe UI',sans-serif", background: BG, minHeight: "100vh", maxWidth: 430, margin: "0 auto" }}>
      <div style={{ background: `linear-gradient(135deg, ${NAVY} 0%, #2C5282 100%)`, padding: "16px 20px 20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
          <span style={{ fontSize: 20 }}>⬡</span>
          <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 10, letterSpacing: 2, textTransform: "uppercase" }}>Fastener Companion</span>
        </div>
        <div style={{ color: WHITE, fontSize: 20, fontWeight: 800, marginBottom: 2 }}>Anchor Bolt Reference</div>
        <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 11 }}>ASTM F1554 · ACI 318 · ICC AC193 · ICC-ES ESR · IFI 7th Ed.</div>
      </div>

      <div style={{ background: WHITE, borderBottom: `1px solid ${BORDER}`, padding: "0 8px", display: "flex", overflowX: "auto", scrollbarWidth: "none" }}>
        {[
          { id: "types", label: "Anchor Types" },
          { id: "f1554", label: "ASTM F1554" },
          { id: "spacing", label: "Edge & Spacing" },
        ].map(t => (
          <button key={t.id} onClick={() => { setActiveTab(t.id); setSelected(null); }}
            style={{ background: "none", border: "none", cursor: "pointer", padding: "11px 12px", fontSize: 11, fontWeight: 700, fontFamily: "inherit", whiteSpace: "nowrap", color: activeTab === t.id ? NAVY : MUTED, borderBottom: activeTab === t.id ? `3px solid ${AMBER}` : "3px solid transparent" }}>
            {t.label}
          </button>
        ))}
      </div>

      {activeTab === "types" && (
        <div style={{ padding: "14px 16px" }}>
          <div style={{ background: "#FFF1F2", border: "1px solid #FECDD3", borderRadius: 10, padding: "10px 14px", marginBottom: 14 }}>
            <div style={{ fontSize: 11, color: "#9F1239", lineHeight: 1.5 }}>
              <strong>Anchor bolt design requires engineering.</strong> This reference provides product identification and selection guidance. All anchor bolt sizing, embedment depth, and layout must be confirmed by a structural engineer per ACI 318 / local code.
            </div>
          </div>
          {ANCHOR_TYPES.map((family) => (
            <div key={family.id} style={{ marginBottom: 14 }}>
              <div onClick={() => setExpandedFamily(expandedFamily === family.id ? null : family.id)}
                style={{ background: WHITE, border: `1px solid ${BORDER}`, borderLeft: `4px solid ${family.color}`, borderRadius: expandedFamily === family.id ? "12px 12px 0 0" : 12, padding: "12px 14px", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: expandedFamily === family.id ? 0 : 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 20 }}>{family.icon}</span>
                  <div style={{ fontSize: 14, fontWeight: 800, color: family.color }}>{family.name}</div>
                </div>
                <span style={{ color: MUTED }}>{expandedFamily === family.id ? "▲" : "▼"}</span>
              </div>
              {expandedFamily === family.id && (
                <div style={{ border: `1px solid ${BORDER}`, borderTop: "none", borderRadius: "0 0 12px 12px", overflow: "hidden" }}>
                  {family.types.map((type, i) => (
                    <div key={i} style={{ padding: "12px 14px", borderBottom: `1px solid ${BORDER}`, background: type.star ? STAR_BG : i % 2 === 0 ? WHITE : ROW_ALT }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                          {type.star && <span style={{ color: AMBER, fontSize: 11 }}>★</span>}
                          <div style={{ fontSize: 13, fontWeight: 800, color: NAVY }}>{type.name}</div>
                        </div>
                        <div style={{ background: type.cots_color + "15", border: `1px solid ${type.cots_color}`, borderRadius: 6, padding: "2px 6px", fontSize: 9, fontWeight: 700, color: type.cots_color, flexShrink: 0, marginLeft: 8 }}>{type.cots.split(" — ")[0]}</div>
                      </div>
                      <div style={{ fontSize: 12, color: TEXT, lineHeight: 1.5, marginBottom: 6 }}>{type.description}</div>
                      {[
                        { label: "Standard", value: type.standard },
                        { label: "Material", value: type.material },
                        { label: "Sizes", value: type.sizes },
                        { label: "Embed Rule", value: type.embed_rule },
                      ].map((item, j) => (
                        <div key={j} style={{ display: "flex", gap: 8, marginBottom: 3 }}>
                          <div style={{ fontSize: 10, fontWeight: 700, color: MUTED, minWidth: 55, flexShrink: 0 }}>{item.label}</div>
                          <div style={{ fontSize: 11, color: TEXT, lineHeight: 1.4 }}>{item.value}</div>
                        </div>
                      ))}
                      {type.he_warning && (
                        <div style={{ marginTop: 8, background: "#FFF1F2", border: "1px solid #FECDD3", borderRadius: 8, padding: "6px 10px" }}>
                          <div style={{ fontSize: 11, color: "#9F1239" }}>⚠ {type.he_warning}</div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {activeTab === "f1554" && (
        <div style={{ padding: "14px 16px" }}>
          <div style={{ background: STAR_BG, border: `1px solid ${STAR_BORDER}`, borderRadius: 10, padding: "10px 14px", marginBottom: 12 }}>
            <div style={{ fontSize: 11, color: "#92400E", lineHeight: 1.5 }}>ASTM F1554 is the primary specification for cast-in-place anchor bolts. Three grades based on strength. Grade 36 is by far the most common for standard structural applications.</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {ASTM_F1554_GRADES.map((grade, i) => (
              <div key={i} style={{ background: WHITE, border: `1px solid ${BORDER}`, borderLeft: `4px solid ${grade.color}`, borderRadius: 12, padding: "14px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    {grade.star && <span style={{ color: AMBER, fontSize: 11 }}>★</span>}
                    <div style={{ fontSize: 16, fontWeight: 900, color: grade.color }}>ASTM F1554 {grade.grade}</div>
                  </div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, marginBottom: 8 }}>
                  {[
                    { label: "Tensile", value: grade.tensile },
                    { label: "Yield", value: grade.yield },
                    { label: "Elongation", value: grade.elong },
                    { label: "Weldable", value: grade.weldable },
                  ].map((item, j) => (
                    <div key={j} style={{ background: ROW_ALT, borderRadius: 8, padding: "6px 8px", border: `1px solid ${BORDER}` }}>
                      <div style={{ fontSize: 9, color: MUTED, textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 1 }}>{item.label}</div>
                      <div style={{ fontSize: 11, fontWeight: 700, color: TEXT, lineHeight: 1.3 }}>{item.value}</div>
                    </div>
                  ))}
                </div>
                <div style={{ fontSize: 12, color: TEXT, lineHeight: 1.5, marginBottom: 6 }}>{grade.use}</div>
                <div style={{ background: grade.color + "10", borderRadius: 8, padding: "6px 10px", fontSize: 11, color: TEXT }}>
                  <span style={{ fontWeight: 700 }}>Galvanizing:</span> {grade.hdg}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "spacing" && (
        <div style={{ padding: "14px 16px" }}>
          <div style={{ background: "#FFF1F2", border: "1px solid #FECDD3", borderRadius: 10, padding: "10px 14px", marginBottom: 12 }}>
            <div style={{ fontSize: 11, color: "#9F1239", lineHeight: 1.5 }}>
              <strong>These are minimum values from ACI 318.</strong> Project-specific engineering calculations may require larger edge distances and spacing based on applied loads, concrete strength, and seismic requirements. Always verify with structural engineer.
            </div>
          </div>
          <div style={{ background: WHITE, borderRadius: 14, overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.06)", border: `1px solid ${BORDER}` }}>
            <div style={{ display: "grid", gridTemplateColumns: "0.7fr 0.8fr 0.9fr 0.9fr", background: NAVY, padding: "10px 12px" }}>
              {["Anchor", "Edge Dist.", "Spacing", "Embed."].map(h => (
                <div key={h} style={{ color: WHITE, fontSize: 9, fontWeight: 700 }}>{h}</div>
              ))}
            </div>
            {EDGE_SPACING.map((row, i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "0.7fr 0.8fr 0.9fr 0.9fr", padding: "8px 12px", background: i % 2 === 0 ? WHITE : ROW_ALT, borderBottom: `1px solid ${BORDER}`, alignItems: "center" }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: NAVY }}>{row.anchor}</div>
                <div style={{ fontSize: 11, color: TEXT }}>{row.min_edge}</div>
                <div style={{ fontSize: 11, color: TEXT }}>{row.min_spacing}</div>
                <div style={{ fontSize: 11, color: TEXT }}>{row.min_embed}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 10, fontSize: 10, color: MUTED, padding: "0 2px" }}>Minimums per ACI 318 for cast-in hooked anchors (L-bolt/J-bolt) in normal-weight concrete. Post-installed anchor edge/spacing per specific ICC-ES ESR report.</div>
        </div>
      )}

      <div style={{ margin: "0 16px 24px", background: "#FFF1F2", border: "1px solid #FECDD3", borderRadius: 10, padding: "10px 14px" }}>
        <div style={{ fontSize: 10, color: "#9F1239", lineHeight: 1.5 }}>
          <strong>⚠ Verify Before Use.</strong> Anchor bolt data per ASTM F1554, ACI 318, and ICC-ES ESR reports. All anchor design must be performed by a licensed structural engineer. Fastener Companion is a reference tool — not a substitute for engineering judgment.
        </div>
      </div>
    </div>
  );
}
