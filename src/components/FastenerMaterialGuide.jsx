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
// FastenerMaterialGuide
// ════════════════════════════════════════════════════

// ─── DATA ─────────────────────────────────────────────────────────────────────
// Sources: ASTM A108 (carbon steel bars), ASTM A193/A194 (alloy/SS studs),
// ASTM F593/F594 (SS fasteners), ISO 3506 (SS metric), ASTM B211 (aluminum),
// ASTM B150 (bronze/brass), ASTM B164 (Monel), ASTM B637 (Inconel 718),
// IFI Fastener Standards 7th Ed., Engineers Edge material selection guide,
// Fastenal Engineering Reference, Portland Bolt material guide

const MATERIALS = [
  {
    id: "low_carbon",
    name: "Low Carbon Steel",
    category: "Carbon Steel",
    color: "#64748B",
    bg: "#F8FAFC",
    grades: "AISI 1006–1022, SAE Grade 1–2, A307",
    tensile_range: "60,000–80,000 psi (414–552 MPa)",
    yield_range: "36,000–57,000 psi (248–393 MPa)",
    hardness: "HRB 69–100",
    he_risk: "NONE",
    corrosion: "Poor — requires coating for any outdoor/wet use",
    temp_rating: "Up to ~400°F (204°C)",
    weldability: "Excellent",
    machinability: "Excellent",
    cots: "COTS — Widely Available",
    cots_color: "#059669",
    applications: [
      "General purpose non-structural assemblies",
      "Wood construction and furniture",
      "Non-critical indoor applications",
      "Sheet metal screws and light-duty fasteners",
    ],
    not_for: [
      "High-strength structural applications",
      "Outdoor environments without coating",
      "High-temperature applications",
    ],
    common_specs: "SAE Grade 2, ASTM A307, SAE J429 Grade 2",
    notes: "Most economical fastener material. Cannot be strengthened by heat treatment — only cold working. Sufficient for most non-critical assemblies.",
    star: false,
  },
  {
    id: "medium_carbon",
    name: "Medium Carbon Steel",
    category: "Carbon Steel",
    color: "#2563EB",
    bg: "#EFF6FF",
    grades: "AISI 1035–1045 (Grade 5), 4140/4340 (Grade 8)",
    tensile_range: "105,000–180,000 psi (724–1241 MPa) after Q&T",
    yield_range: "81,000–160,000 psi (558–1103 MPa) after Q&T",
    hardness: "HRC 25–44",
    he_risk: "MODERATE–HIGH at higher grades",
    corrosion: "Poor — requires coating",
    temp_rating: "Up to ~400°F (204°C) without strength loss",
    weldability: "Fair — preheat required, post-weld heat treat recommended",
    machinability: "Good",
    cots: "COTS — Widely Available",
    cots_color: "#059669",
    applications: [
      "Grade 5 and Grade 8 hex bolts",
      "A325 and A490 structural bolts",
      "High-load machinery and equipment",
      "Automotive and transportation",
      "Pressure vessel studs (4140 = B7)",
    ],
    not_for: [
      "Corrosive environments without appropriate coating",
      "Marine applications without stainless upgrade",
      "Above 400°F without alloy specification",
    ],
    common_specs: "SAE Grade 5 (1038–1045), SAE Grade 8 (alloy), ASTM A325, ASTM A490, ASTM A193 B7 (4140/4142 Cr-Mo)",
    notes: "The workhorse of industrial fasteners. Achieves high strength through quench and temper heat treatment. 4140 chromoly is the gold standard for stud bolts (A193 B7). Subject to HE risk at higher strength levels.",
    star: true,
  },
  {
    id: "ss_304",
    name: "304 Stainless Steel (A2)",
    category: "Stainless Steel",
    color: "#0891B2",
    bg: "#F0FDFE",
    grades: "AISI 304/304L — ISO A2",
    tensile_range: "70,000–125,000 psi (483–862 MPa) depending on condition",
    yield_range: "30,000–100,000 psi (207–689 MPa) depending on condition",
    hardness: "HRB 70–HRC 35 depending on condition",
    he_risk: "VERY LOW (austenitic SS less susceptible)",
    corrosion: "Excellent — most indoor/outdoor environments. NOT marine/chloride.",
    temp_rating: "Up to ~800°F (427°C) for standard use",
    weldability: "Good",
    machinability: "Fair — work hardens rapidly — lubricate",
    cots: "COTS — Widely Available",
    cots_color: "#059669",
    applications: [
      "Food processing and food service",
      "Chemical processing (mild chemicals)",
      "Outdoor applications in non-marine environments",
      "Architectural and decorative fasteners",
      "Medical equipment (non-implant)",
    ],
    not_for: [
      "Marine/saltwater (use 316)",
      "High-chloride environments",
      "High-strength structural applications (lower strength than carbon steel)",
      "Applications requiring non-magnetic (SS can become slightly magnetic after cold work)",
    ],
    common_specs: "ASTM F593 (304 SS fasteners), ISO 3506 A2-70, ASTM A193 B8",
    notes: "Most common stainless grade. Good general corrosion resistance but NOT marine-grade. MUST use anti-seize on assembly — stainless on stainless will gall. A2-70 is the most common metric stainless bolt specification.",
    star: true,
  },
  {
    id: "ss_316",
    name: "316 Stainless Steel (A4)",
    category: "Stainless Steel",
    color: "#059669",
    bg: "#F0FDF4",
    grades: "AISI 316/316L — ISO A4",
    tensile_range: "70,000–125,000 psi (483–862 MPa) depending on condition",
    yield_range: "30,000–100,000 psi (207–689 MPa)",
    hardness: "HRB 70–HRC 32",
    he_risk: "VERY LOW",
    corrosion: "Superior — chloride and marine environments. Best common SS grade.",
    temp_rating: "Up to ~800°F (427°C)",
    weldability: "Good",
    machinability: "Fair — work hardens — lubricate",
    cots: "COTS — Available (less common than 304)",
    cots_color: "#D97706",
    applications: [
      "Marine and saltwater environments",
      "Chemical processing with chlorides, acids",
      "Food and beverage — FDA compliant",
      "Pharmaceutical and medical",
      "Coastal outdoor applications",
      "Pulp and paper industry",
    ],
    not_for: [
      "Concentrated sulfuric or hydrochloric acids",
      "Extreme high-temperature above 800°F",
      "High-strength structural (lower strength than carbon steel)",
    ],
    common_specs: "ASTM F593 (316 SS), ISO 3506 A4-70/A4-80, ASTM A193 B8M",
    notes: "The marine-grade stainless. Molybdenum addition (2–3%) provides chloride resistance that 304 lacks. More expensive than 304. Standard specification for any coastal, marine, or chemical application. Always use anti-seize on assembly.",
    star: true,
  },
  {
    id: "alloy_b7",
    name: "Chromoly Steel (4140/4142)",
    category: "Alloy Steel",
    color: "#7C3AED",
    bg: "#F5F3FF",
    grades: "AISI 4140, 4142, 4145 — ASTM A193 B7",
    tensile_range: "100,000–150,000 psi (689–1034 MPa) after Q&T",
    yield_range: "75,000–130,000 psi (517–896 MPa)",
    hardness: "HRC 28–35",
    he_risk: "MODERATE",
    corrosion: "Poor — requires coating",
    temp_rating: "Up to ~700°F (371°C) — retains strength better than plain carbon",
    weldability: "Fair — preheat required",
    machinability: "Good",
    cots: "COTS — Widely Available",
    cots_color: "#059669",
    applications: [
      "Flange studs and bolts (A193 B7 is the standard)",
      "Pressure vessel and pipeline bolting",
      "High-temperature industrial applications",
      "Heavy equipment and mining",
      "Oil and gas applications",
    ],
    not_for: [
      "Marine environments without coating",
      "Sour gas (H2S) service — use B7M low hardness version",
      "Very high temperature above 800°F — use Inconel",
    ],
    common_specs: "ASTM A193 Grade B7, ASTM A354 Grade BD (close equivalent)",
    notes: "The industry standard for stud bolts. Chromium-molybdenum alloy provides higher strength and better temperature resistance than plain carbon steel. B7 with 2H nuts is the universal flange bolting combination across industrial applications.",
    star: true,
  },
  {
    id: "brass",
    name: "Brass (Cu-Zn Alloy)",
    category: "Copper Alloy",
    color: "#D97706",
    bg: "#FFF8E7",
    grades: "360 Free-Machining Brass, 260 Cartridge Brass",
    tensile_range: "49,000–70,000 psi (338–483 MPa)",
    yield_range: "18,000–60,000 psi (124–414 MPa)",
    hardness: "HRB 50–HRB 80",
    he_risk: "NONE (non-ferrous)",
    corrosion: "Good — not marine saltwater",
    temp_rating: "Up to ~300°F (149°C)",
    weldability: "Poor",
    machinability: "Excellent (360 grade is the best-machinable common alloy)",
    cots: "COTS — Available",
    cots_color: "#D97706",
    applications: [
      "Electrical and electronics",
      "Plumbing fittings",
      "Musical instruments",
      "Decorative applications",
      "Non-magnetic applications",
      "Low-voltage electrical connectors",
    ],
    not_for: [
      "High-strength structural",
      "Marine saltwater",
      "Contact with ammonia (stress corrosion cracking risk)",
      "Contact with aluminum (galvanic corrosion)",
    ],
    common_specs: "ASTM B16 (brass rod), ASTM B36 (brass plate)",
    notes: "Low strength but excellent machinability and electrical conductivity. Non-magnetic. Never use where galvanic corrosion with aluminum is a concern — copper/brass is significantly more noble than aluminum.",
    star: false,
  },
  {
    id: "aluminum",
    name: "Aluminum Alloy",
    category: "Aluminum",
    color: "#94A3B8",
    bg: "#F8FAFC",
    grades: "2024-T4, 6061-T6, 7075-T6",
    tensile_range: "30,000–83,000 psi (207–572 MPa) depending on alloy/temper",
    yield_range: "14,000–73,000 psi (96–503 MPa)",
    hardness: "HRB 40–HRB 87",
    he_risk: "LOW (aluminum can be susceptible in special conditions)",
    corrosion: "Good — forms protective oxide layer. NOT marine grade without anodizing.",
    temp_rating: "Up to ~300°F (149°C) without significant strength loss",
    weldability: "Fair — specialized process required",
    machinability: "Excellent",
    cots: "COTS — Available (limited size range vs steel)",
    cots_color: "#D97706",
    applications: [
      "Aerospace and aircraft (7075-T6)",
      "Marine (anodized)",
      "Aluminum structure fastening (avoids galvanic corrosion)",
      "Electronics and instrumentation",
      "Lightweight applications",
    ],
    not_for: [
      "High-strength structural",
      "Contact with copper or brass (galvanic corrosion)",
      "High-temperature above 300°F",
    ],
    common_specs: "ASTM B211 (aluminum bar/rod), MIL-S-7742 (aerospace aluminum fasteners)",
    notes: "Very lightweight. Best choice when fastening aluminum structures to avoid galvanic corrosion. Much lower strength than steel — verify adequacy. 7075-T6 is highest strength common aluminum alloy (used in aerospace).",
    star: false,
  },
  {
    id: "inconel",
    name: "Inconel / Nickel Alloy",
    category: "Nickel Alloy",
    color: "#374151",
    bg: "#F8FAFC",
    grades: "Inconel 625, 718; Monel 400; Hastelloy C-276",
    tensile_range: "80,000–200,000+ psi (552–1379 MPa)",
    yield_range: "35,000–180,000+ psi (241–1241 MPa)",
    hardness: "HRC 20–40+",
    he_risk: "LOW (nickel alloys generally more resistant)",
    corrosion: "Exceptional — extreme chemical and temperature environments",
    temp_rating: "Up to 1,800°F+ (982°C+) for Inconel 625/718",
    weldability: "Good with specialized technique",
    machinability: "Difficult — specialty tooling required",
    cots: "LIMITED — Specialty/Special Order",
    cots_color: "#DC2626",
    applications: [
      "High-temperature furnace and exhaust applications",
      "Chemical processing with aggressive acids",
      "Marine submersible applications",
      "Oil and gas sour service",
      "Nuclear and aerospace critical applications",
    ],
    not_for: [
      "General purpose — far too expensive",
      "Applications where B7 or 316 SS is adequate",
    ],
    common_specs: "ASTM B637 (Inconel 718 bar), ASTM B164 (Monel 400 bar), ASTM B574 (Hastelloy rod)",
    notes: "Reserve for applications where no common alloy is adequate. Extremely expensive — 10–50× cost of B7 carbon steel. If specifying Inconel, verify supply chain and lead time early. Common in petrochemical, aerospace, and nuclear.",
    star: false,
  },
];

const MATERIAL_SELECTION = [
  { situation: "General indoor machinery", recommendation: "Medium carbon steel (Grade 5/8)", reason: "Most cost-effective, adequate strength, COTS everywhere." },
  { situation: "Outdoor structural steel", recommendation: "Grade 5 or A325 + HDG coating", reason: "Industry standard for outdoor structural connections." },
  { situation: "Food processing / FDA", recommendation: "316 Stainless (A4)", reason: "FDA-compliant, chloride resistant, cleanable surface." },
  { situation: "Marine / saltwater", recommendation: "316 Stainless (A4) or Monel", reason: "304 SS will pit in chloride. 316 provides molybdenum for chloride resistance." },
  { situation: "Flange and pressure vessel studs", recommendation: "ASTM A193 B7 (4140 Cr-Mo)", reason: "Industry standard — pairs with A194 2H nuts." },
  { situation: "High temperature (>400°F)", recommendation: "A193 B7 or Inconel (>800°F)", reason: "B7 Cr-Mo retains strength to ~700°F. Inconel for extreme temperatures." },
  { situation: "Sour gas / H2S service", recommendation: "A193 B7M (HRC 22 max)", recommendation2: "Low hardness version", reason: "NACE MR0175/ISO 15156 compliant. Low hardness required for SSC resistance." },
  { situation: "Aluminum structure", recommendation: "Aluminum or 316 SS with isolation", reason: "Aluminum fasteners avoid galvanic corrosion. If SS used, isolate with washers." },
  { situation: "Electrical / electronics", recommendation: "Brass or 304 SS", reason: "Brass for conductivity, SS for non-magnetic and corrosion resistance." },
  { situation: "Non-magnetic required", recommendation: "304/316 SS or brass", reason: "Carbon steel is magnetic. Austenitic SS is non-magnetic (unless severely cold worked)." },
];

const heRiskColor = (r) => {
  if (r.includes("VERY HIGH") || r.includes("HIGH")) return "#DC2626";
  if (r.includes("MODERATE")) return "#D97706";
  if (r.includes("LOW")) return "#2563EB";
  return "#059669";
};

export default function FastenerMaterialGuide() {
  const [activeTab, setActiveTab] = useState("materials");
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");

  const selectedMat = selected ? MATERIALS.find(m => m.id === selected) : null;

  const filtered = MATERIALS.filter(m =>
    m.name.toLowerCase().includes(search.toLowerCase()) ||
    m.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ fontFamily: "'DM Sans','Segoe UI',sans-serif", background: BG, minHeight: "100vh", maxWidth: 430, margin: "0 auto" }}>

      {/* HEADER */}
      <div style={{ background: `linear-gradient(135deg, ${NAVY} 0%, #2C5282 100%)`, padding: "16px 20px 20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
          <span style={{ fontSize: 20 }}>⬡</span>
          <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 10, letterSpacing: 2, textTransform: "uppercase" }}>Fastener Companion</span>
        </div>
        <div style={{ color: WHITE, fontSize: 20, fontWeight: 800, marginBottom: 2 }}>Fastener Material Guide</div>
        <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 11 }}>ASTM A108 · A193 · F593 · ISO 3506 · ASTM B211/B150/B164 · IFI 7th Ed.</div>
        <div style={{ background: WHITE, borderRadius: 12, display: "flex", alignItems: "center", padding: "10px 14px", gap: 8, marginTop: 14, boxShadow: "0 2px 8px rgba(0,0,0,0.15)" }}>
          <span style={{ color: MUTED }}>??</span>
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search material..."
            style={{ background: "none", border: "none", outline: "none", color: TEXT, fontSize: 14, flex: 1, fontFamily: "inherit" }} />
          {search && <span onClick={() => setSearch("")} style={{ color: MUTED, cursor: "pointer" }}>✕</span>}
        </div>
      </div>

      {/* TABS */}
      <div style={{ background: WHITE, borderBottom: `1px solid ${BORDER}`, padding: "0 8px", display: "flex", overflowX: "auto", scrollbarWidth: "none" }}>
        {[
          { id: "materials", label: "Materials" },
          { id: "selection", label: "Which Material?" },
        ].map(t => (
          <button key={t.id} onClick={() => { setActiveTab(t.id); setSelected(null); }}
            style={{
              background: "none", border: "none", cursor: "pointer", padding: "12px 14px",
              fontSize: 12, fontWeight: 700, fontFamily: "inherit", whiteSpace: "nowrap",
              color: activeTab === t.id ? NAVY : MUTED,
              borderBottom: activeTab === t.id ? `3px solid ${AMBER}` : "3px solid transparent",
            }}>{t.label}</button>
        ))}
      </div>

      {/* MATERIALS LIST */}
      {activeTab === "materials" && !selectedMat && (
        <div style={{ padding: "12px 16px", display: "flex", flexDirection: "column", gap: 10 }}>
          {filtered.map(mat => (
            <div key={mat.id} onClick={() => setSelected(mat.id)}
              style={{
                background: mat.star ? STAR_BG : WHITE,
                border: `1px solid ${BORDER}`,
                borderLeft: `4px solid ${mat.color}`,
                borderRadius: 12, padding: "14px", cursor: "pointer",
                boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
              }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }}>
                    {mat.star && <span style={{ color: AMBER, fontSize: 11 }}>★</span>}
                    <span style={{ fontSize: 14, fontWeight: 800, color: NAVY }}>{mat.name}</span>
                  </div>
                  <div style={{ fontSize: 10, color: MUTED }}>{mat.category} · {mat.grades}</div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 4, alignItems: "flex-end" }}>
                  <div style={{ background: mat.cots_color + "15", border: `1px solid ${mat.cots_color}`, borderRadius: 6, padding: "2px 6px", fontSize: 9, fontWeight: 700, color: mat.cots_color }}>{mat.cots.split(" — ")[1]}</div>
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, marginBottom: 8 }}>
                <div style={{ background: ROW_ALT, borderRadius: 8, padding: "5px 8px", border: `1px solid ${BORDER}` }}>
                  <div style={{ fontSize: 9, color: MUTED, textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 1 }}>Tensile</div>
                  <div style={{ fontSize: 10, fontWeight: 700, color: NAVY, lineHeight: 1.3 }}>{mat.tensile_range.split("(")[0].trim()}</div>
                </div>
                <div style={{ background: ROW_ALT, borderRadius: 8, padding: "5px 8px", border: `1px solid ${BORDER}` }}>
                  <div style={{ fontSize: 9, color: MUTED, textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 1 }}>HE Risk</div>
                  <div style={{ fontSize: 10, fontWeight: 700, color: heRiskColor(mat.he_risk) }}>{mat.he_risk.split(" ")[0]}</div>
                </div>
              </div>
              <div style={{ fontSize: 11, color: TEXT, lineHeight: 1.4 }}>{mat.notes}</div>
            </div>
          ))}
        </div>
      )}

      {/* MATERIAL DETAIL */}
      {activeTab === "materials" && selectedMat && (
        <div style={{ padding: "14px 16px" }}>
          <button onClick={() => setSelected(null)}
            style={{ background: "none", border: "none", cursor: "pointer", color: NAVY, fontSize: 13, fontWeight: 700, fontFamily: "inherit", marginBottom: 14, display: "flex", alignItems: "center", gap: 6, padding: 0 }}>
            ← Back
          </button>

          <div style={{ background: selectedMat.bg, border: `1px solid ${BORDER}`, borderLeft: `4px solid ${selectedMat.color}`, borderRadius: 12, padding: "14px", marginBottom: 12 }}>
            <div style={{ fontSize: 16, fontWeight: 800, color: NAVY, marginBottom: 2 }}>{selectedMat.name}</div>
            <div style={{ fontSize: 11, color: MUTED, marginBottom: 8 }}>{selectedMat.category} · {selectedMat.grades}</div>
            <div style={{ display: "inline-block", background: selectedMat.cots_color + "15", border: `1px solid ${selectedMat.cots_color}`, borderRadius: 6, padding: "2px 10px", fontSize: 10, fontWeight: 700, color: selectedMat.cots_color, marginBottom: 8 }}>{selectedMat.cots}</div>
            <div style={{ fontSize: 12, color: TEXT, lineHeight: 1.6 }}>{selectedMat.notes}</div>
          </div>

          <div style={{ background: WHITE, border: `1px solid ${BORDER}`, borderRadius: 12, overflow: "hidden", marginBottom: 12, boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
            <div style={{ background: NAVY, padding: "10px 14px" }}>
              <div style={{ color: WHITE, fontSize: 12, fontWeight: 700 }}>Material Properties</div>
            </div>
            {[
              { label: "Tensile Strength", val: selectedMat.tensile_range },
              { label: "Yield Strength", val: selectedMat.yield_range },
              { label: "Hardness", val: selectedMat.hardness },
              { label: "HE Risk", val: selectedMat.he_risk },
              { label: "Corrosion Resistance", val: selectedMat.corrosion },
              { label: "Temp Rating", val: selectedMat.temp_rating },
              { label: "Weldability", val: selectedMat.weldability },
              { label: "Machinability", val: selectedMat.machinability },
              { label: "Common Specs", val: selectedMat.common_specs },
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "9px 14px", borderBottom: `1px solid ${BORDER}`, background: i % 2 === 0 ? WHITE : ROW_ALT, gap: 12 }}>
                <div style={{ fontSize: 11, color: MUTED, fontWeight: 600, flexShrink: 0 }}>{item.label}</div>
                <div style={{ fontSize: 11, fontWeight: 700, color: item.label === "HE Risk" ? heRiskColor(item.val) : NAVY, textAlign: "right" }}>{item.val}</div>
              </div>
            ))}
          </div>

          <div style={{ background: "#F0FDF4", border: `1px solid #BBF7D0`, borderRadius: 12, overflow: "hidden", marginBottom: 10 }}>
            <div style={{ background: "#059669", padding: "8px 14px" }}>
              <div style={{ color: WHITE, fontSize: 11, fontWeight: 700 }}>✓ Best Applications</div>
            </div>
            {selectedMat.applications.map((item, i) => (
              <div key={i} style={{ padding: "7px 14px", borderBottom: `1px solid #BBF7D0`, background: i % 2 === 0 ? WHITE : "#F0FDF4", display: "flex", gap: 8 }}>
                <span style={{ color: "#059669", flexShrink: 0 }}>✓</span>
                <div style={{ fontSize: 12, color: TEXT }}>{item}</div>
              </div>
            ))}
          </div>

          <div style={{ background: "#FFF1F2", border: `1px solid #FECDD3`, borderRadius: 12, overflow: "hidden", marginBottom: 14 }}>
            <div style={{ background: "#DC2626", padding: "8px 14px" }}>
              <div style={{ color: WHITE, fontSize: 11, fontWeight: 700 }}>✗ Avoid For</div>
            </div>
            {selectedMat.not_for.map((item, i) => (
              <div key={i} style={{ padding: "7px 14px", borderBottom: `1px solid #FECDD3`, background: i % 2 === 0 ? WHITE : "#FFF5F5", display: "flex", gap: 8 }}>
                <span style={{ color: "#DC2626", flexShrink: 0 }}>✗</span>
                <div style={{ fontSize: 12, color: TEXT }}>{item}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SELECTION GUIDE */}
      {activeTab === "selection" && (
        <div style={{ padding: "14px 16px" }}>
          <div style={{ background: WHITE, borderRadius: 14, overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.06)", border: `1px solid ${BORDER}` }}>
            <div style={{ background: NAVY, padding: "10px 14px" }}>
              <div style={{ color: WHITE, fontSize: 12, fontWeight: 700 }}>Which Material for My Application?</div>
            </div>
            {MATERIAL_SELECTION.map((item, i) => (
              <div key={i} style={{ padding: "12px 14px", borderBottom: `1px solid ${BORDER}`, background: i % 2 === 0 ? WHITE : ROW_ALT }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: NAVY, marginBottom: 4 }}>{item.situation}</div>
                <div style={{ display: "inline-block", background: "#EEF4FF", border: `1px solid ${NAVY}`, borderRadius: 6, padding: "2px 10px", fontSize: 11, fontWeight: 800, color: NAVY, marginBottom: 6 }}>→ {item.recommendation}</div>
                <div style={{ fontSize: 11, color: MUTED }}>{item.reason}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={{ margin: "0 16px 24px", background: "#FFF1F2", border: "1px solid #FECDD3", borderRadius: 10, padding: "10px 14px" }}>
        <div style={{ fontSize: 10, color: "#9F1239", lineHeight: 1.5 }}>
          <strong>⚠ Verify Before Use.</strong> Material data based on ASTM A108, A193, F593, ISO 3506, and IFI 7th Edition. Strength ranges shown reflect typical fastener conditions — actual properties depend on heat treatment, size, and manufacturing process. Fastener Companion is a reference tool — not a substitute for engineering judgment.
        </div>
      </div>
    </div>
  );
}
