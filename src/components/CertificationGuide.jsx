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
// CertificationGuide
// ════════════════════════════════════════════════════

// ─── DATA ─────────────────────────────────────────────────────────────────────
// Sources: ASTM F3125 (certification requirements), ASTM A193/A194,
// Fastener Quality Act (FQA) — 15 U.S.C. §5401,
// IFI Fastener Standards 7th Edition, AISC certification requirements,
// ISO 9001:2015, ASME NQA-1 (nuclear quality)

const CERT_TYPES = [
  {
    id: "coc",
    name: "Certificate of Conformance (CoC)",
    abbrev: "CoC",
    also_called: "C of C, Cert, Certification",
    required_for: "Most industrial fasteners as minimum documentation",
    what_it_says: "Manufacturer or distributor certifies that the product meets specified requirements. Does NOT include specific test data.",
    what_it_doesnt: "Does not include actual measured values. Does not certify the specific heat/lot tested. Cannot be used to verify actual mechanical properties.",
    color: "#2563EB",
    strength: 2,
    use_when: "General industrial use, non-critical applications, documentation for receiving inspection",
    red_flags: "No letterhead. No signature. Vague language ('meets or exceeds'). No specific standard reference.",
    star: true,
  },
  {
    id: "mtr",
    name: "Mill Test Report (MTR)",
    abbrev: "MTR",
    also_called: "Material Test Report, Certified Material Test Report (CMTR), Mill Cert",
    required_for: "Pressure vessels (ASME VIII), structural connections, safety-critical applications, nuclear",
    what_it_says: "Contains actual chemical composition and mechanical test results from the steel mill for the specific heat of steel used to manufacture the fasteners. Heat/lot number ties the MTR to specific product.",
    what_it_doesnt: "MTR covers the raw steel, not necessarily the finished fastener. Fastener processing (heat treatment, threading) adds additional variables.",
    color: "#059669",
    strength: 4,
    use_when: "Pressure vessels, pipelines, structural, safety-critical, nuclear, any application requiring material traceability",
    red_flags: "No heat number. Generic 'typical values' rather than specific test data. No steel mill identification.",
    star: true,
  },
  {
    id: "test_report",
    name: "Fastener Test Report",
    abbrev: "Test Report",
    also_called: "Proof Load Test Report, Tensile Test Report, Hardness Report",
    required_for: "Critical structural fasteners (A325/A490), pressure vessel applications, ASTM F3125",
    what_it_says: "Results of actual tests performed on the finished fasteners — hardness, tensile strength, proof load, wedge tensile. Most rigorous documentation for finished product.",
    what_it_doesnt: "Test samples are taken statistically — not every fastener is tested. Cannot guarantee every individual fastener meets requirements.",
    color: "#D97706",
    strength: 5,
    use_when: "Structural bolting (A325/A490), safety-critical, applications requiring proof that finished fasteners meet spec",
    red_flags: "No test date. No sample size. No accreditation of testing lab. No specific lot/heat number.",
    star: true,
  },
  {
    id: "third_party",
    name: "Third-Party Test Report",
    abbrev: "3rd Party",
    also_called: "Independent Lab Report, Witnessed Test Report",
    required_for: "Nuclear (ASME NQA-1), aerospace, safety-critical where independent verification is required",
    what_it_says: "Testing performed by an independent, accredited laboratory — not the manufacturer. Highest confidence in results because no conflict of interest.",
    what_it_doesnt: "More expensive and slower than in-house testing. Still statistical sampling — not 100% inspection.",
    color: "#7C3AED",
    strength: 5,
    use_when: "Nuclear, military, aerospace, critical infrastructure, or any application where manufacturer's own testing is insufficient",
    red_flags: "Lab not accredited (A2LA, NVLAP, etc.). Tester and manufacturer are related entities.",
    star: false,
  },
  {
    id: "dtr",
    name: "Distributor Test Report (DTR)",
    abbrev: "DTR",
    also_called: "Distributor Certification, Re-Test Report",
    required_for: "When distributor performs additional testing (receiving inspection, sample testing)",
    what_it_says: "Distributor has tested samples from the lot they received and can certify based on their own testing. Provides additional confidence beyond manufacturer's CoC.",
    what_it_doesnt: "Not equivalent to MTR — distributor does not have mill-level traceability unless they obtained the MTR from the manufacturer.",
    color: "#0891B2",
    strength: 3,
    use_when: "When original mill certs are unavailable and distributor testing is required. Better than CoC alone for critical applications.",
    red_flags: "No lot/heat number. No test date. No equipment calibration reference.",
    star: false,
  },
];

const HOW_TO_READ = [
  {
    doc: "Mill Test Report (MTR)",
    fields: [
      { field: "Heat Number", what: "Unique identifier for the steel batch. Critical for traceability — must match your product lot number." },
      { field: "Chemical Analysis", what: "Actual measured composition of carbon, manganese, silicon, sulfur, phosphorus, and alloying elements. Compare to ASTM/SAE specification limits." },
      { field: "Tensile Strength", what: "Actual measured ultimate tensile strength. Must meet or exceed the minimum per specification." },
      { field: "Yield Strength", what: "Actual measured yield (0.2% offset). Must meet minimum per specification." },
      { field: "Elongation %", what: "Measured ductility. Lower elongation = more brittle. Very low elongation on a high-strength grade is a red flag." },
      { field: "Reduction of Area %", what: "Another ductility measure. Failure to meet minimum may indicate problems with heat treatment." },
      { field: "Hardness", what: "Rockwell or Brinell hardness. Must fall within the grade range. Out-of-range hardness = wrong material or improper heat treat." },
      { field: "Charpy Impact (if required)", what: "Impact toughness at specified temperature. Required for low-temperature grades (A320 L7). Must meet minimum energy at test temperature." },
    ],
  },
];

const FQA_REQUIREMENTS = [
  { req: "Grade markings required", detail: "All ASTM and SAE-grade fasteners must bear the manufacturer's identification symbol and grade marking. Grade-marked products imply compliance with the specification." },
  { req: "Certifications must accompany product", detail: "Distributors of grade-marked fasteners must maintain records of manufacturer certifications. Upon request, certifications must be provided to the purchaser." },
  { req: "Recordkeeping", detail: "Records of the manufacturer/source and certifications must be maintained for a defined period (typically 3 years minimum). Good practice is to retain permanently for safety-critical applications." },
  { req: "Criminal penalties for fraud", detail: "The FQA (15 U.S.C. §5401) provides criminal penalties for knowingly selling mismarked or mislabeled fasteners. Counterfeit grade markings are a federal crime." },
  { req: "Applies to imported fasteners too", detail: "The FQA applies to all fasteners sold in the US market, including imports. Importers are responsible for ensuring compliance of imported product." },
];

export default function CertificationGuide() {
  const [activeTab, setActiveTab] = useState("types");
  const [selected, setSelected] = useState(null);

  const selectedCert = selected ? CERT_TYPES.find(c => c.id === selected) : null;

  const StrengthBar = ({ value }) => (
    <div style={{ display: "flex", gap: 3 }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} style={{ width: 16, height: 8, borderRadius: 3, background: i < value ? "#059669" : "#E2E8F0" }} />
      ))}
    </div>
  );

  return (
    <div style={{ fontFamily: "'DM Sans','Segoe UI',sans-serif", background: BG, minHeight: "100vh", maxWidth: 430, margin: "0 auto" }}>
      <div style={{ background: `linear-gradient(135deg, ${NAVY} 0%, #2C5282 100%)`, padding: "16px 20px 20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
          <span style={{ fontSize: 20 }}>⬡</span>
          <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 10, letterSpacing: 2, textTransform: "uppercase" }}>Fastener Companion</span>
        </div>
        <div style={{ color: WHITE, fontSize: 20, fontWeight: 800, marginBottom: 2 }}>Certification & Documentation</div>
        <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 11 }}>ASTM F3125 · FQA (15 U.S.C. §5401) · ISO 9001 · IFI 7th Ed. · ASME NQA-1</div>
      </div>

      <div style={{ background: WHITE, borderBottom: `1px solid ${BORDER}`, padding: "0 8px", display: "flex", overflowX: "auto", scrollbarWidth: "none" }}>
        {[
          { id: "types", label: "Cert Types" },
          { id: "read", label: "Reading an MTR" },
          { id: "fqa", label: "FQA Requirements" },
          { id: "checklist", label: "Procurement Checklist" },
        ].map(t => (
          <button key={t.id} onClick={() => { setActiveTab(t.id); setSelected(null); }}
            style={{ background: "none", border: "none", cursor: "pointer", padding: "11px 10px", fontSize: 11, fontWeight: 700, fontFamily: "inherit", whiteSpace: "nowrap", color: activeTab === t.id ? NAVY : MUTED, borderBottom: activeTab === t.id ? `3px solid ${AMBER}` : "3px solid transparent" }}>
            {t.label}
          </button>
        ))}
      </div>

      {activeTab === "types" && !selectedCert && (
        <div style={{ padding: "14px 16px", display: "flex", flexDirection: "column", gap: 10 }}>
          <div style={{ background: STAR_BG, border: `1px solid ${STAR_BORDER}`, borderRadius: 10, padding: "10px 14px" }}>
            <div style={{ fontSize: 11, color: "#92400E", lineHeight: 1.5 }}>
              Documentation strength from weakest to strongest: CoC → DTR → MTR → Test Report → Third-Party Test Report. Match documentation level to application criticality.
            </div>
          </div>
          {CERT_TYPES.map((cert) => (
            <div key={cert.id} onClick={() => setSelected(cert.id)}
              style={{ background: cert.star ? STAR_BG : WHITE, border: `1px solid ${BORDER}`, borderLeft: `4px solid ${cert.color}`, borderRadius: 12, padding: "14px", cursor: "pointer", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }}>
                    {cert.star && <span style={{ color: AMBER, fontSize: 11 }}>★</span>}
                    <span style={{ fontSize: 13, fontWeight: 800, color: NAVY }}>{cert.name}</span>
                  </div>
                  <div style={{ fontSize: 10, color: MUTED }}>Also called: {cert.also_called}</div>
                </div>
                <span style={{ color: MUTED }}>›</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                <div style={{ fontSize: 9, color: MUTED }}>STRENGTH</div>
                <StrengthBar value={cert.strength} />
              </div>
              <div style={{ fontSize: 11, color: TEXT, lineHeight: 1.5 }}>{cert.what_it_says.slice(0, 100)}...</div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "types" && selectedCert && (
        <div style={{ padding: "14px 16px" }}>
          <button onClick={() => setSelected(null)} style={{ background: "none", border: "none", cursor: "pointer", color: NAVY, fontSize: 13, fontWeight: 700, fontFamily: "inherit", marginBottom: 14, padding: 0 }}>← Back</button>
          <div style={{ background: selectedCert.color + "15", border: `1px solid ${selectedCert.color}`, borderLeft: `4px solid ${selectedCert.color}`, borderRadius: 12, padding: "14px", marginBottom: 12 }}>
            <div style={{ fontSize: 16, fontWeight: 800, color: NAVY, marginBottom: 4 }}>{selectedCert.name}</div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <div style={{ fontSize: 10, color: MUTED }}>DOCUMENTATION STRENGTH</div>
              <StrengthBar value={selectedCert.strength} />
            </div>
            <div style={{ fontSize: 11, color: MUTED, marginBottom: 4 }}>Also called: {selectedCert.also_called}</div>
          </div>
          {[
            { label: "What it certifies", value: selectedCert.what_it_says, color: "#059669" },
            { label: "What it doesn't certify", value: selectedCert.what_it_doesnt, color: "#D97706" },
            { label: "Use when", value: selectedCert.use_when, color: "#2563EB" },
            { label: "Red flags to watch for", value: selectedCert.red_flags, color: "#DC2626" },
            { label: "Required for", value: selectedCert.required_for, color: NAVY },
          ].map((item, i) => (
            <div key={i} style={{ background: WHITE, border: `1px solid ${BORDER}`, borderLeft: `3px solid ${item.color}`, borderRadius: 10, padding: "10px 14px", marginBottom: 8 }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: item.color, textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 4 }}>{item.label}</div>
              <div style={{ fontSize: 12, color: TEXT, lineHeight: 1.6 }}>{item.value}</div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "read" && (
        <div style={{ padding: "14px 16px" }}>
          <div style={{ background: STAR_BG, border: `1px solid ${STAR_BORDER}`, borderRadius: 10, padding: "10px 14px", marginBottom: 14 }}>
            <div style={{ fontSize: 11, color: "#92400E", lineHeight: 1.5 }}>The MTR is the most important certification document in industrial fastening. This guide covers every field and what to look for.</div>
          </div>
          {HOW_TO_READ[0].fields.map((field, i) => (
            <div key={i} style={{ background: WHITE, border: `1px solid ${BORDER}`, borderLeft: `3px solid ${NAVY}`, borderRadius: 10, padding: "10px 14px", marginBottom: 8 }}>
              <div style={{ fontSize: 12, fontWeight: 800, color: NAVY, marginBottom: 4 }}>{field.field}</div>
              <div style={{ fontSize: 12, color: TEXT, lineHeight: 1.6 }}>{field.what}</div>
            </div>
          ))}
          <div style={{ marginTop: 6, background: "#FFF1F2", border: "1px solid #FECDD3", borderRadius: 10, padding: "10px 14px" }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#DC2626", marginBottom: 4 }}>The Heat Number is Everything</div>
            <div style={{ fontSize: 12, color: TEXT, lineHeight: 1.6 }}>The heat number ties the physical product to the MTR. If the heat number on the fastener packaging doesn't match the heat number on the MTR, the certification is not valid for that product. Always verify the chain of custody.</div>
          </div>
        </div>
      )}

      {activeTab === "fqa" && (
        <div style={{ padding: "14px 16px" }}>
          <div style={{ background: "#EEF4FF", border: `1px solid ${BORDER}`, borderRadius: 10, padding: "10px 14px", marginBottom: 14 }}>
            <div style={{ fontSize: 12, fontWeight: 800, color: NAVY, marginBottom: 4 }}>Fastener Quality Act (FQA)</div>
            <div style={{ fontSize: 11, color: TEXT, lineHeight: 1.5 }}>Federal law (15 U.S.C. §5401) governing the sale of fasteners in the United States. Establishes requirements for grade markings, certification, and recordkeeping. Violations carry criminal penalties.</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {FQA_REQUIREMENTS.map((item, i) => (
              <div key={i} style={{ background: WHITE, border: `1px solid ${BORDER}`, borderLeft: `4px solid ${NAVY}`, borderRadius: 12, padding: "12px 14px" }}>
                <div style={{ fontSize: 12, fontWeight: 800, color: NAVY, marginBottom: 6 }}>{item.req}</div>
                <div style={{ fontSize: 12, color: TEXT, lineHeight: 1.6 }}>{item.detail}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "checklist" && (
        <div style={{ padding: "14px 16px" }}>
          <div style={{ background: STAR_BG, border: `1px solid ${STAR_BORDER}`, borderRadius: 10, padding: "10px 14px", marginBottom: 14 }}>
            <div style={{ fontSize: 11, color: "#92400E" }}>Use this checklist when ordering or receiving fasteners for critical applications.</div>
          </div>
          {[
            { phase: "At Time of Order", color: "#2563EB", items: [
              "Specify required documentation level: CoC / MTR / Test Report / 3rd Party",
              "Specify the applicable standard: ASTM A193, SAE Grade 8, ISO 10.9, etc.",
              "Request lot/heat numbers to be identified on shipping paperwork",
              "For structural bolts: request AISC-compliant certification package (CoC + test data)",
              "For nuclear/pressure vessel: specify NQA-1 or ASME Section III requirements",
            ]},
            { phase: "At Receipt Inspection", color: "#059669", items: [
              "Verify grade markings on fasteners match order specification",
              "Confirm manufacturer identification mark is present",
              "Check heat/lot number on packaging matches certification documents",
              "Verify certification documents are original (not photocopies of photocopies)",
              "Spot-check dimensions with calipers on sample",
              "For Grade 8/A490: verify hardness test data is within acceptable range",
            ]},
            { phase: "For Storage & Traceability", color: "#D97706", items: [
              "File certification documents with receiving records",
              "Label storage bins with lot/heat number and certification reference",
              "Maintain records for minimum 3 years (longer for safety-critical)",
              "Never mix lots of the same specification in the same bin",
              "Record which certified lot was used for each critical installation",
            ]},
          ].map((section, i) => (
            <div key={i} style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 13, fontWeight: 800, color: section.color, marginBottom: 8 }}>{section.phase}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {section.items.map((item, j) => (
                  <div key={j} style={{ background: WHITE, border: `1px solid ${BORDER}`, borderRadius: 10, padding: "9px 14px", display: "flex", gap: 10 }}>
                    <div style={{ width: 18, height: 18, borderRadius: 4, border: `2px solid ${BORDER}`, flexShrink: 0, marginTop: 1 }} />
                    <div style={{ fontSize: 12, color: TEXT, lineHeight: 1.5 }}>{item}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      <div style={{ margin: "0 16px 24px", background: "#FFF1F2", border: "1px solid #FECDD3", borderRadius: 10, padding: "10px 14px" }}>
        <div style={{ fontSize: 10, color: "#9F1239", lineHeight: 1.5 }}>
          <strong>⚠ Verify Before Use.</strong> Certification requirements based on ASTM F3125, FQA, IFI 7th Edition, and ASME NQA-1. Requirements vary by industry, application, and jurisdiction. Consult applicable code and qualified personnel for safety-critical applications. Fastener Companion is a reference tool.
        </div>
      </div>
    </div>
  );
}
