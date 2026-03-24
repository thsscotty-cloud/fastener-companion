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
// Sources: ASTM International, SAE International, ISO standards bodies,
// Portland Bolt technical library, Fastenal Engineering & Design Support,
// Engineers Edge, American Institute of Steel Construction (AISC),
// IFI Fastener Standards 7th Edition

const STANDARDS = [
  {
    id: "a307",
    code: "ASTM A307",
    nickname: "The Basic Bolt",
    category: "ASTM",
    color: "#64748B",
    bg: "#F8FAFC",
    grade: "Grade A / Grade B",
    saeEquiv: "≈ SAE Grade 2",
    metricEquiv: "≈ ISO 4.6",
    material: "Low carbon steel",
    tensile: "60,000 psi min (414 MPa)",
    yield: "Not specified",
    proof: "Not specified",
    marking: "A307 on head",
    sizes: "1/4\" – 4\"",
    star: false,
    plain_english: "The most basic, lowest-strength common bolt. No heat treatment required. Use for non-critical, general purpose applications where strength is not a design factor — wood connections, light framing, non-structural mechanical attachments.",
    when_to_use: "Light duty brackets, wood connections, non-structural attachments, any application where load is minimal and failure is not safety-critical.",
    when_not_to_use: "Structural steel connections, pressure vessels, high-vibration machinery, any safety-critical application.",
    common_confusion: "Often confused with Grade 2 — they are similar but A307 is the ASTM structural bolt standard while Grade 2 is the SAE mechanical fastener standard. A307 Grade B is specifically for cast iron flanged joints.",
    certifications: "A307 bolts should come with a basic CoC. MTR not always required but recommended for critical applications.",
  },
  {
    id: "a325",
    code: "ASTM A325",
    nickname: "The Structural Bolt",
    category: "ASTM",
    color: "#2563EB",
    bg: "#EFF6FF",
    grade: "Type 1 (carbon steel) / Type 3 (weathering steel)",
    saeEquiv: "≈ SAE Grade 5",
    metricEquiv: "≈ ISO 8.8",
    material: "Medium carbon steel, quenched & tempered",
    tensile: "120,000 psi (827 MPa) for ≤1\"",
    yield: "92,000 psi (634 MPa)",
    proof: "85,000 psi (586 MPa)",
    marking: "A325 on head",
    sizes: "1/2\" – 1-1/2\" (heavy hex head only)",
    star: true,
    plain_english: "The standard high-strength bolt for structural steel construction. Used in steel buildings, bridges, and industrial structures per AISC specifications. HEAVY HEX HEAD ONLY — not a standard hex bolt. Must be used with A563 heavy hex nuts and F436 hardened washers. Now technically part of ASTM F3125.",
    when_to_use: "Structural steel connections per AISC. Steel buildings, bridges, industrial structures, anywhere AISC structural bolt specification is required.",
    when_not_to_use: "General mechanical applications — overspec'd and expensive. Not for threaded into tapped holes — structural bolts are not designed for that.",
    common_confusion: "People often order 'A325 bolts' for general industrial use not realizing they only come in heavy hex, specific sizes, and must be used in snug-tight, pretensioned, or slip-critical connections with specific nuts and washers.",
    certifications: "Always requires CoC and MTR. Lot traceability required. Manufacturer's identification mark required on head.",
  },
  {
    id: "a354",
    code: "ASTM A354",
    nickname: "Grade 8 for Big Bolts",
    category: "ASTM",
    color: "#DC2626",
    bg: "#FFF1F2",
    grade: "Grade BC (≈Gr.5) / Grade BD (≈Gr.8)",
    saeEquiv: "BD ≈ SAE Grade 8",
    metricEquiv: "BD ≈ ISO 10.9",
    material: "Alloy steel, quenched & tempered",
    tensile: "BD: 150,000 psi (1034 MPa) for ≤2.5\"",
    yield: "BD: 130,000 psi (896 MPa)",
    proof: "BD: 120,000 psi (827 MPa)",
    marking: "BD stamped on head (may be BD/8 for dual marking)",
    sizes: "1/4\" – 4\"",
    star: true,
    plain_english: "The ASTM equivalent of SAE Grade 8, but covers larger diameters (up to 4\") that Grade 8 doesn't cover. If you need Grade 8 strength in a bolt larger than 1-1/2\", you need A354 BD. Grade BC is the lower-strength option equivalent to Grade 5.",
    when_to_use: "High-strength applications requiring larger diameters than SAE Grade 8 covers. Heavy equipment, large machinery, structural applications needing certified documentation.",
    when_not_to_use: "Standard 1/4\"–1\" applications where SAE Grade 8 or 5 is specified — unless documentation requires ASTM designation specifically.",
    common_confusion: "BD is Grade 8 equivalent but A354 is often dual-marked BD/8. When you see BD on a large bolt head, it's Grade 8 equivalent strength. Grade BC is NOT Grade 8 — it's closer to Grade 5.",
    certifications: "MTR and CoC typically required. Manufacturer identification mark required.",
  },
  {
    id: "a490",
    code: "ASTM A490",
    nickname: "The High-Strength Structural Bolt",
    category: "ASTM",
    color: "#DC2626",
    bg: "#FFF1F2",
    grade: "Type 1 / Type 3",
    saeEquiv: "≈ SAE Grade 8 (structural)",
    metricEquiv: "≈ ISO 10.9",
    material: "Alloy steel, quenched & tempered",
    tensile: "150,000–173,000 psi (1034–1193 MPa)",
    yield: "130,000 psi min (896 MPa)",
    proof: "120,000 psi (827 MPa)",
    marking: "A490 on head",
    sizes: "1/2\" – 1-1/2\" (heavy hex head only)",
    star: true,
    plain_english: "High-strength structural bolt — the heavy-duty version of A325. Used in structural connections requiring higher strength. CRITICAL: A490 bolts CANNOT be galvanized — hot-dip galvanizing causes hydrogen embrittlement in high-strength steels. Now technically part of ASTM F3125.",
    when_to_use: "High-strength structural steel connections per AISC where A325 strength is insufficient. Heavy industrial structures, bridges, high-load connections.",
    when_not_to_use: "Never galvanize A490. Never use in corrosive environments without proper coating (not galvanizing). Not for general mechanical use.",
    common_confusion: "People try to galvanize A490 bolts — this is PROHIBITED. The hydrogen embrittlement risk from galvanizing can cause sudden brittle failure at loads well below rated capacity.",
    certifications: "Always requires CoC and MTR. Lot traceability required. Manufacturer ID mark required.",
  },
  {
    id: "a193b7",
    code: "ASTM A193 Gr.B7",
    nickname: "The Pressure & High-Temp Stud",
    category: "ASTM",
    color: "#7C3AED",
    bg: "#F5F3FF",
    grade: "Grade B7 (most common) / B7M (lower hardness)",
    saeEquiv: "≈ SAE Grade 5 strength, different alloy",
    metricEquiv: "≈ ISO 8.8 (different temp rating)",
    material: "4140 Cr-Mo alloy steel, quenched & tempered",
    tensile: "125,000 psi (862 MPa) for ≤2.5\"",
    yield: "105,000 psi (724 MPa)",
    proof: "Not specified (use yield as reference)",
    marking: "B7 stamped on end or head",
    sizes: "All sizes (primarily stud bolts)",
    star: true,
    plain_english: "The standard stud bolt material for flanges, pressure vessels, and high-temperature piping. Rated to 1000°F (538°C) continuous service. The '7' doesn't mean Grade 7 strength — it identifies the alloy (4140 Cr-Mo steel). Always pair with A194 Grade 2H heavy hex nuts. If you're working on flanges, this is your bolt.",
    when_to_use: "Flanged connections, pressure vessels, valves, any high-temperature or high-pressure bolting application. Standard for ASME B16.5 flange bolting.",
    when_not_to_use: "Room temperature, low-stress applications where less expensive Grade 5 or 8 works fine. B7 is more expensive than needed for general use.",
    common_confusion: "B7 must be used with A194 Gr.2H nuts — not standard hex nuts. Using standard nuts with B7 studs is a frequent procurement error that reduces joint integrity.",
    certifications: "MTR required for pressure vessel and ASME-coded work. CoC required. Heat/lot traceability required.",
  },
  {
    id: "f593",
    code: "ASTM F593 / F594",
    nickname: "The US Stainless Standard",
    category: "ASTM",
    color: "#0891B2",
    bg: "#F0FDFE",
    grade: "Groups 1–4 (different alloys). Most common: Group 1 (304), Group 2 (316)",
    saeEquiv: "No direct SAE equivalent",
    metricEquiv: "F593 ≈ ISO A2 (304SS) or A4 (316SS)",
    material: "Austenitic stainless steel (304, 316, 303, 305, 384)",
    tensile: "Condition CW: 100,000 psi (689 MPa) min",
    yield: "Condition CW: 65,000 psi (448 MPa) min",
    proof: "Not specified",
    marking: "F593 or manufacturer mark",
    sizes: "#0 – 1-1/2\"",
    star: false,
    plain_english: "The American standard for stainless steel bolts and screws (F593) and nuts (F594). Most stainless bolts sold in the US are either F593 or the ISO equivalent (A2/A4). The alloy group matters more than the standard number — always specify 304 or 316 stainless, not just 'stainless steel'.",
    when_to_use: "Corrosive environments, food processing, marine (use 316), chemical exposure, outdoor applications, anywhere galvanic corrosion from carbon steel is a concern.",
    when_not_to_use: "High temperature above 700°F (371°C) — austenitic stainless loses strength at elevated temps. High-strength structural applications — stainless is significantly weaker than Grade 8.",
    common_confusion: "304 and 316 stainless look identical but have very different corrosion resistance. 304 (18-8) is general purpose. 316 adds molybdenum for chloride resistance — use 316 for marine and chemical environments.",
    certifications: "CoC typically required. Chemical analysis certification for critical applications.",
  },
  {
    id: "sae5",
    code: "SAE Grade 5",
    nickname: "The All-Purpose Workhorse",
    category: "SAE",
    color: "#2563EB",
    bg: "#EFF6FF",
    grade: "Grade 5",
    astmEquiv: "ASTM A449",
    metricEquiv: "≈ ISO 8.8",
    material: "Medium carbon steel, quenched & tempered",
    tensile: "120,000 psi (827 MPa) for ≤1\"",
    yield: "92,000 psi (634 MPa)",
    proof: "85,000 psi (586 MPa)",
    marking: "3 radial lines on hex head",
    sizes: "1/4\" – 1\" (standard), up to 1-1/2\" at reduced strength",
    star: true,
    plain_english: "The most commonly used mid-strength bolt in North America. Three radial lines on the head. Used for automotive, machinery, general industrial, and moderate-stress applications. Good balance of strength, availability, and cost. If you're not sure what grade to use and you need more than Grade 2, Grade 5 is often the right answer.",
    when_to_use: "General machinery, automotive, moderate-stress industrial applications, most everyday bolting needs where Grade 2 isn't strong enough but Grade 8 is overkill.",
    when_not_to_use: "Structural steel connections (use A325), high-temperature applications (use A193 B7), highest-stress applications (use Grade 8).",
    common_confusion: "Grade 5 and A325 are often confused — both have similar strength but A325 is a structural bolt (heavy hex, specific sizes) while Grade 5 is a mechanical fastener. They are not interchangeable.",
    certifications: "CoC typically sufficient. MTR for critical applications.",
  },
  {
    id: "sae8",
    code: "SAE Grade 8",
    nickname: "The High-Strength Standard",
    category: "SAE",
    color: "#DC2626",
    bg: "#FFF1F2",
    grade: "Grade 8",
    astmEquiv: "ASTM A354 Gr.BD",
    metricEquiv: "≈ ISO 10.9",
    material: "Alloy steel (4140/4340), quenched & tempered",
    tensile: "150,000 psi (1034 MPa)",
    yield: "130,000 psi (896 MPa)",
    proof: "120,000 psi (827 MPa)",
    marking: "6 radial lines on hex head",
    sizes: "1/4\" – 1-1/2\"",
    star: true,
    plain_english: "The strongest commonly available SAE fastener. Six radial lines on the head. Used for heavy machinery, high-stress joints, and applications where maximum strength is needed. NOT always better than Grade 5 — Grade 8 is more brittle and more susceptible to hydrogen embrittlement and stress corrosion. Use Grade 8 when you need it, not just because it's 'stronger'.",
    when_to_use: "High-stress machinery, heavy equipment, critical joints requiring maximum clamp load, applications where fatigue or high dynamic loading is present.",
    when_not_to_use: "Galvanized applications (hydrogen embrittlement risk). Corrosive environments without proper coating. Applications where toughness matters more than strength — Grade 8 is less tough (more brittle) than Grade 5.",
    common_confusion: "More common mistake: using Grade 8 everywhere because it's 'stronger.' Grade 8 is harder and more brittle — in impact or fatigue applications, Grade 5 can actually outperform Grade 8 because it absorbs energy better.",
    certifications: "CoC typically sufficient. MTR for critical applications.",
  },
  {
    id: "iso88",
    code: "ISO 8.8",
    nickname: "The Metric Grade 5",
    category: "ISO",
    color: "#059669",
    bg: "#F0FDF4",
    grade: "Property Class 8.8",
    imperialEquiv: "≈ SAE Grade 5 / ASTM A325",
    astmEquiv: "≈ ASTM A325 (approximate)",
    material: "Medium carbon steel, quenched & tempered",
    tensile: "800 MPa (116,000 psi)",
    yield: "640 MPa (92,800 psi) — 80% of tensile",
    proof: "600 MPa (87,000 psi)",
    marking: "8.8 stamped on head",
    sizes: "M5 – M100",
    star: true,
    plain_english: "The most common metric fastener grade for industrial use. How to read it: first number (8) × 100 = tensile strength in MPa (800 MPa). Second number (8) × 10% = yield/tensile ratio (80%). Equivalent to SAE Grade 5 in strength. Used throughout European, Asian, and globally-manufactured equipment.",
    when_to_use: "Any metric machinery or equipment specification calling for 8.8. Standard for most industrial metric bolting needs.",
    when_not_to_use: "Applications requiring 10.9 strength. Do not substitute 8.8 for 10.9 — 20% strength reduction.",
    common_confusion: "People assume 8.8 metric means 88,000 psi tensile. It means 800 MPa = 116,000 psi. The number system is MPa based, not PSI based.",
    certifications: "CoC typically sufficient. MTR for critical applications.",
  },
  {
    id: "iso109",
    code: "ISO 10.9",
    nickname: "The Metric Grade 8",
    category: "ISO",
    color: "#D97706",
    bg: "#FFF8E7",
    grade: "Property Class 10.9",
    imperialEquiv: "≈ SAE Grade 8 / ASTM A490",
    astmEquiv: "≈ ASTM A490 (approximate)",
    material: "Alloy steel, quenched & tempered",
    tensile: "1040 MPa (150,800 psi)",
    yield: "940 MPa (136,300 psi) — 90% of tensile",
    proof: "830 MPa (120,000 psi)",
    marking: "10.9 stamped on head",
    sizes: "M5 – M100",
    star: true,
    plain_english: "High-strength metric fastener. Equivalent to SAE Grade 8. Used in automotive, heavy machinery, and high-stress metric applications. The 90% yield ratio (vs 80% for 8.8) means less margin before yielding — tighter torque control required. Common in European automotive and machinery where the original manufacturer specified 10.9.",
    when_to_use: "High-stress metric applications, OEM-specified 10.9 replacement, automotive and heavy machinery where metric high-strength is required.",
    when_not_to_use: "General industrial metric use where 8.8 is sufficient. Never substitute with 8.8 when 10.9 is specified.",
    common_confusion: "10.9 is NOT 10 × 100 MPa. It IS (10 × 100) = 1000 MPa nominal, but the actual minimum tensile is 1040 MPa. The '9' = 90% yield ratio × 1040 MPa = 940 MPa yield.",
    certifications: "CoC typically sufficient. MTR for critical applications. Automotive applications often require additional traceability.",
  },
];

export default function TopStandards() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");

  const filters = ["All", "ASTM", "SAE", "ISO"];

  const filtered = STANDARDS.filter(s =>
    (activeFilter === "All" || s.category === activeFilter) &&
    (s.code.toLowerCase().includes(search.toLowerCase()) ||
      s.nickname.toLowerCase().includes(search.toLowerCase()) ||
      s.plain_english.toLowerCase().includes(search.toLowerCase()))
  );

  const selectedStandard = selected !== null ? STANDARDS.find(s => s.id === selected) : null;

  return (
    <div style={{ fontFamily: "'DM Sans','Segoe UI',sans-serif", background: BG, minHeight: "100vh", maxWidth: 430, margin: "0 auto" }}>

      {/* HEADER */}
      <div style={{ background: `linear-gradient(135deg, ${NAVY} 0%, #2C5282 100%)`, padding: "16px 20px 20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
          <span style={{ fontSize: 20 }}>⬡</span>
          <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 10, letterSpacing: 2, textTransform: "uppercase" }}>Fastener Companion</span>
        </div>
        <div style={{ color: WHITE, fontSize: 20, fontWeight: 800, marginBottom: 2 }}>Fastener Standards</div>
        <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 11 }}>ASTM · SAE J429 · ISO 898-1 · Plain language explanations</div>
        <div style={{ background: WHITE, borderRadius: 12, display: "flex", alignItems: "center", padding: "10px 14px", gap: 8, marginTop: 14, boxShadow: "0 2px 8px rgba(0,0,0,0.15)" }}>
          <span style={{ color: MUTED }}>??</span>
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search standards..."
            style={{ background: "none", border: "none", outline: "none", color: TEXT, fontSize: 14, flex: 1, fontFamily: "inherit" }} />
          {search && <span onClick={() => setSearch("")} style={{ color: MUTED, cursor: "pointer" }}>✕</span>}
        </div>
      </div>

      {/* FILTER TABS */}
      <div style={{ background: WHITE, borderBottom: `1px solid ${BORDER}`, padding: "0 12px", display: "flex" }}>
        {filters.map(f => (
          <button key={f} onClick={() => setActiveFilter(f)}
            style={{
              background: "none", border: "none", cursor: "pointer", padding: "12px 16px",
              fontSize: 12, fontWeight: 700, fontFamily: "inherit",
              color: activeFilter === f ? NAVY : MUTED,
              borderBottom: activeFilter === f ? `3px solid ${AMBER}` : "3px solid transparent",
            }}>{f}</button>
        ))}
      </div>

      {/* STANDARDS LIST */}
      {!selectedStandard && (
        <div style={{ padding: "12px 16px", display: "flex", flexDirection: "column", gap: 10 }}>
          {filtered.map((s, i) => (
            <div key={s.id} onClick={() => setSelected(s.id)}
              style={{
                background: s.star ? STAR_BG : WHITE,
                border: `1px solid ${BORDER}`,
                borderLeft: `4px solid ${s.color}`,
                borderRadius: 12, padding: "14px", cursor: "pointer",
                boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
              }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }}>
                    {s.star && <span style={{ color: AMBER, fontSize: 11 }}>★</span>}
                    <span style={{ fontSize: 15, fontWeight: 800, color: s.color }}>{s.code}</span>
                  </div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: NAVY }}>{s.nickname}</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 9, color: MUTED, marginBottom: 2 }}>Tensile</div>
                  <div style={{ fontSize: 12, fontWeight: 800, color: s.color }}>{s.tensile.split(" ")[0]}</div>
                  <div style={{ fontSize: 9, color: MUTED }}>{s.tensile.includes("MPa") ? s.tensile.split("(")[1]?.replace(")", "") : s.tensile.split("(")[1]?.replace(")", "")}</div>
                </div>
              </div>
              <div style={{ fontSize: 11, color: MUTED, marginBottom: 6 }}>{s.material} · {s.marking}</div>
              <div style={{ fontSize: 12, color: TEXT, lineHeight: 1.5, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{s.plain_english}</div>
              <div style={{ marginTop: 8, fontSize: 11, color: s.color, fontWeight: 600 }}>Tap to read full explanation →</div>
            </div>
          ))}
        </div>
      )}

      {/* DETAIL VIEW */}
      {selectedStandard && (
        <div style={{ padding: "14px 16px" }}>
          <button onClick={() => setSelected(null)}
            style={{ background: "none", border: "none", cursor: "pointer", color: NAVY, fontSize: 13, fontWeight: 700, fontFamily: "inherit", marginBottom: 14, display: "flex", alignItems: "center", gap: 6, padding: 0 }}>
            ← Back to list
          </button>

          {/* Header card */}
          <div style={{ background: selectedStandard.bg, border: `1px solid ${BORDER}`, borderLeft: `4px solid ${selectedStandard.color}`, borderRadius: 12, padding: "14px", marginBottom: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <div style={{ fontSize: 18, fontWeight: 800, color: selectedStandard.color, marginBottom: 2 }}>{selectedStandard.code}</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: NAVY }}>{selectedStandard.nickname}</div>
                <div style={{ fontSize: 11, color: MUTED, marginTop: 2 }}>{selectedStandard.material}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 9, color: MUTED }}>Tensile</div>
                <div style={{ fontSize: 14, fontWeight: 800, color: selectedStandard.color }}>{selectedStandard.tensile.split(" ")[0]}</div>
              </div>
            </div>
          </div>

          {/* Plain English */}
          <div style={{ background: WHITE, border: `1px solid ${BORDER}`, borderRadius: 12, padding: "14px", marginBottom: 10, boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: NAVY, textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>Plain English Explanation</div>
            <div style={{ fontSize: 13, color: TEXT, lineHeight: 1.7 }}>{selectedStandard.plain_english}</div>
          </div>

          {/* Specs grid */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 10 }}>
            {[
              { label: "Tensile Strength", value: selectedStandard.tensile },
              { label: "Yield Strength", value: selectedStandard.yield },
              { label: "Proof Load", value: selectedStandard.proof },
              { label: "Head Marking", value: selectedStandard.marking },
              { label: "Size Range", value: selectedStandard.sizes },
              { label: "Grade / Class", value: selectedStandard.grade },
              { label: "SAE Equiv.", value: selectedStandard.saeEquiv || selectedStandard.imperialEquiv || "—" },
              { label: "Metric Equiv.", value: selectedStandard.metricEquiv || selectedStandard.astmEquiv || "—" },
            ].map((item, i) => (
              <div key={i} style={{ background: ROW_ALT, borderRadius: 8, padding: "8px 10px", border: `1px solid ${BORDER}` }}>
                <div style={{ fontSize: 9, color: MUTED, textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 2 }}>{item.label}</div>
                <div style={{ fontSize: 11, fontWeight: 700, color: TEXT, lineHeight: 1.3 }}>{item.value}</div>
              </div>
            ))}
          </div>

          {/* When to use / not use */}
          <div style={{ background: "#F0FDF4", border: `1px solid ${BORDER}`, borderLeft: "4px solid #059669", borderRadius: 12, padding: "12px 14px", marginBottom: 10 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#059669", marginBottom: 6 }}>✓ When to Use</div>
            <div style={{ fontSize: 12, color: TEXT, lineHeight: 1.5 }}>{selectedStandard.when_to_use}</div>
          </div>

          <div style={{ background: "#FFF1F2", border: `1px solid ${BORDER}`, borderLeft: "4px solid #DC2626", borderRadius: 12, padding: "12px 14px", marginBottom: 10 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#DC2626", marginBottom: 6 }}>✗ When NOT to Use</div>
            <div style={{ fontSize: 12, color: TEXT, lineHeight: 1.5 }}>{selectedStandard.when_not_to_use}</div>
          </div>

          <div style={{ background: STAR_BG, border: `1px solid ${STAR_BORDER}`, borderRadius: 12, padding: "12px 14px", marginBottom: 10 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#92400E", marginBottom: 6 }}>⚠ Common Confusion</div>
            <div style={{ fontSize: 12, color: "#92400E", lineHeight: 1.5 }}>{selectedStandard.common_confusion}</div>
          </div>

          <div style={{ background: "#EEF4FF", border: `1px solid ${BORDER}`, borderLeft: "4px solid #2563EB", borderRadius: 12, padding: "12px 14px", marginBottom: 14 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: NAVY, marginBottom: 6 }}>?? Certification Requirements</div>
            <div style={{ fontSize: 12, color: TEXT, lineHeight: 1.5 }}>{selectedStandard.certifications}</div>
          </div>
        </div>
      )}

      {/* DISCLAIMER */}
      <div style={{ margin: "0 16px 24px", background: "#FFF1F2", border: "1px solid #FECDD3", borderRadius: 10, padding: "10px 14px" }}>
        <div style={{ fontSize: 10, color: "#9F1239", lineHeight: 1.5 }}>
          <strong>⚠ Verify Before Use.</strong> Standards data sourced from ASTM International, SAE International, ISO, Portland Bolt, and IFI 7th Edition. Always obtain current standard documents for critical applications. Fastener Companion is a reference tool — not a substitute for engineering judgment.
        </div>
      </div>
    </div>
  );
}
