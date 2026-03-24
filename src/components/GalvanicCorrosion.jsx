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
// Sources: ASTM B667 (galvanic corrosion), MIL-STD-889C (dissimilar metals),
// NASA Reference Publication 1124 (galvanic series),
// Corrosionpedia, Engineers Edge galvanic series,
// NACE International corrosion engineering reference

// Galvanic Series in Seawater (most noble/cathodic at top)
// Higher = more noble (cathodic, protected)
// Lower = less noble (anodic, corrodes preferentially)
// Source: MIL-STD-889C, NASA RP-1124, NACE

const GALVANIC_SERIES = [
  { rank: 1, metal: "Platinum", symbol: "Pt", potential: "+0.40 V", category: "noble", color: "#D97706" },
  { rank: 2, metal: "Gold", symbol: "Au", potential: "+0.18 V", category: "noble", color: "#D97706" },
  { rank: 3, metal: "Graphite / Carbon", symbol: "C", potential: "+0.12 V", category: "noble", color: "#374151" },
  { rank: 4, metal: "Silver", symbol: "Ag", potential: "+0.03 V", category: "noble", color: "#64748B" },
  { rank: 5, metal: "Titanium", symbol: "Ti", potential: "-0.05 V", category: "noble", color: "#7C3AED" },
  { rank: 6, metal: "316 Stainless Steel (passive)", symbol: "SS316", potential: "-0.05 V", category: "stainless", color: "#0891B2" },
  { rank: 7, metal: "304 Stainless Steel (passive)", symbol: "SS304", potential: "-0.08 V", category: "stainless", color: "#0891B2" },
  { rank: 8, metal: "Monel (Ni-Cu alloy)", symbol: "Monel", potential: "-0.08 V", category: "nickel", color: "#059669" },
  { rank: 9, metal: "Copper", symbol: "Cu", potential: "-0.20 V", category: "copper", color: "#D97706" },
  { rank: 10, metal: "Bronze (Cu-Sn)", symbol: "Bronze", potential: "-0.22 V", category: "copper", color: "#D97706" },
  { rank: 11, metal: "Brass (Cu-Zn)", symbol: "Brass", potential: "-0.26 V", category: "copper", color: "#D97706" },
  { rank: 12, metal: "Nickel (passive)", symbol: "Ni", potential: "-0.28 V", category: "nickel", color: "#059669" },
  { rank: 13, metal: "Tin", symbol: "Sn", potential: "-0.31 V", category: "other", color: "#64748B" },
  { rank: 14, metal: "Lead", symbol: "Pb", potential: "-0.40 V", category: "other", color: "#374151" },
  { rank: 15, metal: "316 Stainless (active)", symbol: "SS316a", potential: "-0.48 V", category: "stainless", color: "#0891B2" },
  { rank: 16, metal: "304 Stainless (active)", symbol: "SS304a", potential: "-0.53 V", category: "stainless", color: "#0891B2" },
  { rank: 17, metal: "Cast Iron", symbol: "CI", potential: "-0.58 V", category: "iron", color: "#374151" },
  { rank: 18, metal: "Carbon Steel / Iron", symbol: "Fe", potential: "-0.61 V", category: "iron", color: "#374151" },
  { rank: 19, metal: "Aluminum 2024-T3", symbol: "Al2024", potential: "-0.69 V", category: "aluminum", color: "#94A3B8" },
  { rank: 20, metal: "Cadmium", symbol: "Cd", potential: "-0.72 V", category: "coating", color: "#64748B" },
  { rank: 21, metal: "Aluminum 6061 / 7075", symbol: "Al6061", potential: "-0.76 V", category: "aluminum", color: "#94A3B8" },
  { rank: 22, metal: "Hot-Dip Galvanized (Zinc)", symbol: "HDG", potential: "-0.80 V", category: "coating", color: "#059669" },
  { rank: 23, metal: "Zinc", symbol: "Zn", potential: "-0.83 V", category: "coating", color: "#059669" },
  { rank: 24, metal: "Magnesium Alloy", symbol: "Mg", potential: "-1.60 V", category: "other", color: "#374151" },
];

const COMPATIBILITY_DATA = [
  // Format: [metal_a, metal_b, risk_level, description, recommendation]
  { a: "Stainless Steel", b: "Carbon Steel", risk: "high", desc: "Stainless is much more noble — carbon steel corrodes rapidly. Very common problematic combination.", rec: "Isolate with non-conductive washer. Use stainless throughout or carbon steel throughout." },
  { a: "Stainless Steel", b: "Aluminum", risk: "high", desc: "Stainless is more noble — aluminum corrodes. Common problem in structural aluminum with SS fasteners.", rec: "Use aluminum fasteners in aluminum, or isolate SS from aluminum with neoprene/plastic washers and sleeves." },
  { a: "Copper/Brass", b: "Aluminum", risk: "high", desc: "Copper is much more noble — aluminum corrodes aggressively. Common problem in plumbing and HVAC.", rec: "Avoid direct contact. Use isolating bushings or choose compatible materials." },
  { a: "Copper/Brass", b: "Carbon Steel", risk: "medium-high", desc: "Copper is more noble — steel corrodes. Worsened by large cathode/anode area ratio.", rec: "Isolate where possible. Hot-dip galvanizing steel improves compatibility." },
  { a: "Zinc (HDG)", b: "Carbon Steel", risk: "low", desc: "Zinc is anodic to steel — zinc sacrificially protects steel. This is the intended function of galvanizing.", rec: "Compatible — galvanizing is specifically designed to protect steel through sacrificial corrosion." },
  { a: "Aluminum", b: "Carbon Steel", risk: "medium", desc: "Moderate potential difference. Risk increases with moisture and salt exposure.", rec: "Acceptable in dry indoor environments. In wet/outdoor environments, isolate or use compatible coatings." },
  { a: "304 Stainless", b: "316 Stainless", risk: "low", desc: "Very close in potential — minimal galvanic risk between stainless grades.", rec: "Compatible — can be used together without significant galvanic concern." },
  { a: "Titanium", b: "Stainless Steel", risk: "low", desc: "Very close in potential in seawater. Low galvanic risk.", rec: "Generally compatible. Acceptable for most applications." },
  { a: "Nickel alloys", b: "Stainless Steel", risk: "low", desc: "Close in potential — minimal galvanic concern.", rec: "Generally compatible." },
  { a: "Carbon Steel", b: "Cast Iron", risk: "low", desc: "Very close in potential — minimal galvanic risk.", rec: "Compatible — commonly used together without isolation." },
  { a: "Brass", b: "Copper", risk: "low", desc: "Brass is a copper alloy — very close in potential.", rec: "Compatible — commonly used together in plumbing and marine applications." },
  { a: "Cadmium plated", b: "Aluminum", risk: "low", desc: "Cadmium is anodic to aluminum — cadmium sacrificially protects aluminum.", rec: "Compatible — cadmium plating was historically used on fasteners in aluminum aircraft for this reason." },
  { a: "Zinc plated", b: "Aluminum", risk: "low-medium", desc: "Zinc is slightly anodic to aluminum — some protection but potential for zinc corrosion.", rec: "Acceptable in most applications. Monitor in salt/marine environments." },
];

const PREVENTION_METHODS = [
  {
    method: "Use compatible metals",
    detail: "Best solution — choose fastener material close in the galvanic series to the mating material. Example: use aluminum fasteners in aluminum structures, or use 316 SS consistently throughout.",
    effectiveness: "Best",
    color: "#059669",
  },
  {
    method: "Isolating washers and bushings",
    detail: "Non-conductive neoprene, PTFE, or nylon washers break the electrical contact between dissimilar metals. Must isolate both the head/nut bearing surface AND the shank through the hole.",
    effectiveness: "Excellent",
    color: "#2563EB",
  },
  {
    method: "Protective coatings",
    detail: "Hot-dip galvanizing, zinc-rich primers, and epoxy coatings applied to the anodic (less noble) metal interrupt the galvanic circuit. Must be maintained — coating damage restores galvanic cell.",
    effectiveness: "Good — requires maintenance",
    color: "#D97706",
  },
  {
    method: "Minimize area ratio concerns",
    detail: "Galvanic corrosion accelerates when the cathodic (noble) area is large and the anodic area is small. Example: one small steel bolt through a large copper plate corrodes rapidly. Reverse (small copper in large steel) is much less severe.",
    effectiveness: "Design consideration",
    color: "#7C3AED",
  },
  {
    method: "Apply zinc chromate primer",
    detail: "Traditional aerospace method — zinc chromate primer applied to mating surfaces before assembly inhibits galvanic corrosion. Now largely replaced by newer primers due to toxicity concerns.",
    effectiveness: "Good (industrial/aerospace)",
    color: "#64748B",
  },
  {
    method: "Sealants and caulk",
    detail: "Sealing the joint with non-conductive sealant excludes the electrolyte (moisture) needed for galvanic action. Used in aerospace for aluminum structures with titanium or stainless fasteners.",
    effectiveness: "Good if maintained",
    color: "#0891B2",
  },
];

const riskColor = (r) => {
  if (r === "high") return "#DC2626";
  if (r === "medium-high") return "#D97706";
  if (r === "medium") return "#D97706";
  if (r === "low-medium") return "#2563EB";
  return "#059669";
};

const riskLabel = (r) => {
  if (r === "high") return "HIGH RISK";
  if (r === "medium-high") return "MED-HIGH";
  if (r === "medium") return "MEDIUM";
  if (r === "low-medium") return "LOW-MED";
  return "LOW RISK";
};

export default function GalvanicCorrosion() {
  const [activeTab, setActiveTab] = useState("series");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const categories = ["All", "noble", "stainless", "iron", "aluminum", "copper", "nickel", "coating", "other"];

  const filteredSeries = GALVANIC_SERIES.filter(m =>
    (filter === "All" || m.category === filter) &&
    m.metal.toLowerCase().includes(search.toLowerCase())
  );

  const filteredCompat = COMPATIBILITY_DATA.filter(c =>
    c.a.toLowerCase().includes(search.toLowerCase()) ||
    c.b.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ fontFamily: "'DM Sans','Segoe UI',sans-serif", background: BG, minHeight: "100vh", maxWidth: 430, margin: "0 auto" }}>

      {/* HEADER */}
      <div style={{ background: `linear-gradient(135deg, ${NAVY} 0%, #2C5282 100%)`, padding: "16px 20px 20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
          <span style={{ fontSize: 20 }}>⬡</span>
          <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 10, letterSpacing: 2, textTransform: "uppercase" }}>Fastener Companion</span>
        </div>
        <div style={{ color: WHITE, fontSize: 20, fontWeight: 800, marginBottom: 2 }}>Galvanic Corrosion Chart</div>
        <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 11 }}>MIL-STD-889C · NASA RP-1124 · NACE International · ASTM B667</div>
        <div style={{ background: WHITE, borderRadius: 12, display: "flex", alignItems: "center", padding: "10px 14px", gap: 8, marginTop: 14, boxShadow: "0 2px 8px rgba(0,0,0,0.15)" }}>
          <span style={{ color: MUTED }}>??</span>
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search metals..."
            style={{ background: "none", border: "none", outline: "none", color: TEXT, fontSize: 14, flex: 1, fontFamily: "inherit" }} />
          {search && <span onClick={() => setSearch("")} style={{ color: MUTED, cursor: "pointer" }}>✕</span>}
        </div>
      </div>

      {/* TABS */}
      <div style={{ background: WHITE, borderBottom: `1px solid ${BORDER}`, padding: "0 8px", display: "flex", overflowX: "auto", scrollbarWidth: "none" }}>
        {[
          { id: "series", label: "Galvanic Series" },
          { id: "compatibility", label: "Common Pairs" },
          { id: "prevention", label: "Prevention" },
          { id: "explainer", label: "How It Works" },
        ].map(t => (
          <button key={t.id} onClick={() => setActiveTab(t.id)}
            style={{
              background: "none", border: "none", cursor: "pointer", padding: "11px 10px",
              fontSize: 11, fontWeight: 700, fontFamily: "inherit", whiteSpace: "nowrap",
              color: activeTab === t.id ? NAVY : MUTED,
              borderBottom: activeTab === t.id ? `3px solid ${AMBER}` : "3px solid transparent",
            }}>{t.label}</button>
        ))}
      </div>

      {/* GALVANIC SERIES */}
      {activeTab === "series" && (
        <>
          <div style={{ padding: "10px 12px 0", display: "flex", gap: 6, overflowX: "auto", scrollbarWidth: "none" }}>
            {categories.map(cat => (
              <button key={cat} onClick={() => setFilter(cat)}
                style={{
                  flexShrink: 0, padding: "4px 10px", borderRadius: 20,
                  border: `1.5px solid ${filter === cat ? NAVY : BORDER}`,
                  background: filter === cat ? NAVY : WHITE,
                  color: filter === cat ? WHITE : MUTED,
                  fontSize: 10, fontWeight: 700, cursor: "pointer", fontFamily: "inherit",
                  textTransform: "capitalize",
                }}>{cat}</button>
            ))}
          </div>
          <div style={{ margin: "10px 16px 0", background: STAR_BG, border: `1px solid ${STAR_BORDER}`, borderRadius: 10, padding: "8px 12px" }}>
            <div style={{ fontSize: 11, color: "#92400E" }}>
              <strong>Top = Noble (Cathodic, protected).</strong> Bottom = Active (Anodic, corrodes). Greater separation = greater corrosion risk.
            </div>
          </div>
          <div style={{ margin: "10px 16px 24px", background: WHITE, borderRadius: 14, overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.06)", border: `1px solid ${BORDER}` }}>
            <div style={{ display: "grid", gridTemplateColumns: "0.5fr 1.5fr 0.8fr", background: NAVY, padding: "10px 12px" }}>
              {["Rank", "Metal / Alloy", "Potential"].map(h => (
                <div key={h} style={{ color: WHITE, fontSize: 10, fontWeight: 700 }}>{h}</div>
              ))}
            </div>
            {filteredSeries.map((m, i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "0.5fr 1.5fr 0.8fr", padding: "8px 12px", background: i % 2 === 0 ? WHITE : ROW_ALT, borderBottom: `1px solid ${BORDER}`, alignItems: "center", borderLeft: `3px solid ${m.color}` }}>
                <div style={{ fontSize: 11, color: MUTED, fontWeight: 600 }}>#{m.rank}</div>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: NAVY }}>{m.metal}</div>
                  <div style={{ fontSize: 10, color: MUTED, fontFamily: "monospace" }}>{m.symbol}</div>
                </div>
                <div style={{ fontSize: 12, fontWeight: 700, color: m.color, fontFamily: "monospace" }}>{m.potential}</div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* COMPATIBILITY */}
      {activeTab === "compatibility" && (
        <div style={{ padding: "12px 16px" }}>
          <div style={{ background: STAR_BG, border: `1px solid ${STAR_BORDER}`, borderRadius: 10, padding: "8px 12px", marginBottom: 12 }}>
            <div style={{ fontSize: 11, color: "#92400E" }}>Common fastener material combinations and their galvanic corrosion risk in wet environments.</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {filteredCompat.map((item, i) => (
              <div key={i} style={{ background: WHITE, border: `1px solid ${BORDER}`, borderLeft: `4px solid ${riskColor(item.risk)}`, borderRadius: 12, padding: "12px 14px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
                  <div style={{ fontSize: 13, fontWeight: 800, color: NAVY }}>{item.a} + {item.b}</div>
                  <div style={{ background: riskColor(item.risk) + "20", border: `1px solid ${riskColor(item.risk)}`, borderRadius: 6, padding: "2px 8px", fontSize: 9, fontWeight: 800, color: riskColor(item.risk), flexShrink: 0, marginLeft: 8 }}>{riskLabel(item.risk)}</div>
                </div>
                <div style={{ fontSize: 12, color: TEXT, lineHeight: 1.5, marginBottom: 6 }}>{item.desc}</div>
                <div style={{ background: "#EEF4FF", borderRadius: 8, padding: "6px 10px" }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: NAVY, marginBottom: 2 }}>RECOMMENDATION</div>
                  <div style={{ fontSize: 11, color: TEXT }}>{item.rec}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* PREVENTION */}
      {activeTab === "prevention" && (
        <div style={{ padding: "14px 16px", display: "flex", flexDirection: "column", gap: 10 }}>
          {PREVENTION_METHODS.map((method, i) => (
            <div key={i} style={{ background: WHITE, border: `1px solid ${BORDER}`, borderLeft: `4px solid ${method.color}`, borderRadius: 12, padding: "12px 14px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
                <div style={{ fontSize: 13, fontWeight: 800, color: NAVY, flex: 1 }}>{method.method}</div>
                <div style={{ background: method.color + "20", border: `1px solid ${method.color}`, borderRadius: 6, padding: "2px 8px", fontSize: 9, fontWeight: 700, color: method.color, flexShrink: 0, marginLeft: 8 }}>{method.effectiveness}</div>
              </div>
              <div style={{ fontSize: 12, color: TEXT, lineHeight: 1.6 }}>{method.detail}</div>
            </div>
          ))}
        </div>
      )}

      {/* EXPLAINER */}
      {activeTab === "explainer" && (
        <div style={{ padding: "14px 16px", display: "flex", flexDirection: "column", gap: 10 }}>
          {[
            { title: "What is galvanic corrosion?", color: NAVY, bg: "#EEF4FF", body: "When two dissimilar metals are in electrical contact in the presence of an electrolyte (moisture, saltwater, condensation), a galvanic cell forms. Current flows from the less noble (anodic) metal to the more noble (cathodic) metal — the anodic metal dissolves (corrodes)." },
            { title: "The three requirements", color: "#DC2626", bg: "#FFF1F2", body: "Galvanic corrosion requires ALL THREE: (1) Dissimilar metals in contact, (2) Electrical connection between them, (3) Electrolyte present (moisture). Remove any one of these and galvanic corrosion stops. This is how isolation methods work." },
            { title: "Area ratio matters enormously", color: "#D97706", bg: "#FFF8E7", body: "The ratio of cathodic (noble) to anodic (active) area dramatically affects corrosion rate. Large cathode + small anode = very rapid corrosion of the small anodic part. Example: one steel bolt in a large copper sheet corrodes very quickly. One copper rivet in a large steel plate — the steel corrodes slowly." },
            { title: "Why HDG protects steel", color: "#059669", bg: "#F0FDF4", body: "Hot-dip galvanizing works by intentionally creating a galvanic couple where zinc (less noble) sacrificially corrodes to protect the steel. The zinc 'sacrifices' itself so the steel doesn't corrode. This is called cathodic protection." },
            { title: "Stainless in stainless is safe", color: "#0891B2", bg: "#F0FDFE", body: "Using 304 stainless bolts with 316 stainless structure creates minimal galvanic risk — both are close in the galvanic series. The small potential difference and the protective passive oxide layer on stainless makes this a safe combination." },
            { title: "Active vs passive stainless", color: "#7C3AED", bg: "#F5F3FF", body: "Stainless steel can be in 'passive' or 'active' state. Passive state (normal) has a protective oxide layer and is noble. Active state (damaged oxide layer, often from chlorides) is much less noble. This is why 304 SS may corrode in marine environments — chlorides break down the passive layer." },
          ].map((item, i) => (
            <div key={i} style={{ background: item.bg, border: `1px solid ${BORDER}`, borderLeft: `4px solid ${item.color}`, borderRadius: 12, padding: "12px 14px" }}>
              <div style={{ fontSize: 12, fontWeight: 800, color: item.color, marginBottom: 6 }}>{item.title}</div>
              <div style={{ fontSize: 12, color: TEXT, lineHeight: 1.6 }}>{item.body}</div>
            </div>
          ))}
        </div>
      )}

      {/* DISCLAIMER */}
      <div style={{ margin: "0 16px 24px", background: "#FFF1F2", border: "1px solid #FECDD3", borderRadius: 10, padding: "10px 14px" }}>
        <div style={{ fontSize: 10, color: "#9F1239", lineHeight: 1.5 }}>
          <strong>⚠ Verify Before Use.</strong> Galvanic series data based on MIL-STD-889C, NASA RP-1124, and NACE International references. Values are approximate — actual corrosion depends on electrolyte composition, temperature, and specific alloy. Consult a corrosion engineer for critical applications. Fastener Companion is a reference tool — not a substitute for engineering judgment.
        </div>
      </div>
    </div>
  );
}

