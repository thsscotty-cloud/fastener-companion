import { useState } from "react";

const S = {
  container: { fontFamily: "'DM Sans', 'Segoe UI', sans-serif", background: "#F7F9FC", minHeight: "100vh", maxWidth: 430, margin: "0 auto", paddingBottom: 80 },
  header: { background: "linear-gradient(135deg, #1B3A6B 0%, #2a5298 100%)", padding: "16px 16px 12px", color: "#fff" },
  headerTop: { display: "flex", alignItems: "center", gap: 8, marginBottom: 2 },
  logo: { fontSize: 20 },
  appName: { fontSize: 12, opacity: 0.75, letterSpacing: 0.3 },
  title: { fontSize: 18, fontWeight: 700, margin: 0 },
  subtitle: { fontSize: 11, opacity: 0.7, marginTop: 2 },
  src: { fontSize: 10, opacity: 0.6, marginTop: 4 },
  tabBar: { display: "flex", overflowX: "auto", background: "#fff", borderBottom: "1px solid #E2E8F0" },
  tab: { padding: "10px 13px", fontSize: 12, fontWeight: 600, whiteSpace: "nowrap", cursor: "pointer", border: "none", background: "transparent", color: "#94A3B8", borderBottom: "3px solid transparent" },
  activeTab: { color: "#1B3A6B", borderBottom: "3px solid #F6AD55" },
  content: { padding: "12px 12px 0" },
  card: { background: "#fff", borderRadius: 8, border: "1px solid #E2E8F0", marginBottom: 10, overflow: "hidden" },
  table: { width: "100%", borderCollapse: "collapse", fontSize: 11 },
  th: { background: "#1B3A6B", color: "#fff", padding: "6px 7px", textAlign: "left", fontSize: 10, fontWeight: 700 },
  thC: { background: "#1B3A6B", color: "#fff", padding: "6px 5px", textAlign: "center", fontSize: 10, fontWeight: 700 },
  td: { padding: "6px 7px", borderBottom: "1px solid #E2E8F0", verticalAlign: "top" },
  tdC: { padding: "6px 5px", borderBottom: "1px solid #E2E8F0", textAlign: "center", verticalAlign: "middle" },
  warn: { background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: 8, padding: "10px 12px", marginTop: 10, marginBottom: 4, display: "flex", gap: 8, alignItems: "flex-start" },
  warnT: { fontSize: 11, color: "#991B1B", lineHeight: 1.5 },
  info: { background: "#EFF6FF", border: "1px solid #BFDBFE", borderRadius: 8, padding: "10px 12px", marginBottom: 10 },
  infoT: { fontSize: 11, color: "#1E40AF", lineHeight: 1.6, margin: 0 },
  search: { width: "100%", boxSizing: "border-box", padding: "8px 10px", border: "1px solid #E2E8F0", borderRadius: 8, fontSize: 13, marginBottom: 10, outline: "none" },
  secTitle: { fontSize: 13, fontWeight: 700, color: "#1B3A6B", marginBottom: 8, marginTop: 4, textTransform: "uppercase", letterSpacing: 0.5 },
};

// Rating key: E=Excellent, G=Good, F=Fair/Limited, P=Poor/Avoid, N=Not Recommended, "-"=No data
const R = { E: "E", G: "G", F: "F", P: "P", N: "N" };
const MATS = ["CS", "304SS", "316SS", "316L", "Duplex", "Monel", "Inconel", "Ti", "Brass", "Al"];
const MAT_LABELS = { CS: "Carbon\nSteel", "304SS": "304 SS", "316SS": "316 SS", "316L": "316L SS", Duplex: "2205\nDuplex", Monel: "Monel\n400", Inconel: "Inconel\n625", Ti: "Titanium\nGr.2", Brass: "Naval\nBrass", Al: "Aluminum" };

// Color for resistance rating cell
function ratingColor(r) {
  if (r === "E") return { background: "#D1FAE5", color: "#065F46", fontWeight: 700 };
  if (r === "G") return { background: "#DBEAFE", color: "#1E40AF", fontWeight: 700 };
  if (r === "F") return { background: "#FEF3C7", color: "#92400E", fontWeight: 600 };
  if (r === "P") return { background: "#FEE2E2", color: "#991B1B", fontWeight: 700 };
  if (r === "N") return { background: "#F1F5F9", color: "#94A3B8", fontWeight: 400 };
  return { background: "transparent", color: "#94A3B8" };
}

// Chemical resistance matrix
// Order: CS, 304SS, 316SS, 316L, Duplex, Monel, Inconel, Ti, Brass, Al
const chemicals = [
  // Acids
  { group: "Acids", name: "Acetic Acid (dilute, <10%)", cas: "64-19-7", r: ["F","G","E","E","G","E","E","E","F","F"], note: "316/316L and Ti preferred for concentration >5%" },
  { group: "Acids", name: "Acetic Acid (concentrated, >50%)", cas: "", r: ["P","F","G","G","F","E","E","E","P","P"], note: "Use Ti, Monel, or Inconel for concentrated service" },
  { group: "Acids", name: "Hydrochloric Acid (HCl, all conc.)", cas: "7647-01-0", r: ["P","P","P","P","F","G","E","G","P","P"], note: "CRITICAL: All SS attacked. Monel, Inconel, Ti preferred. Avoid all standard grades.", star: true },
  { group: "Acids", name: "Hydrofluoric Acid (HF)", cas: "7664-39-3", r: ["P","P","P","P","P","G","G","P","P","P"], note: "EXTREMELY DANGEROUS. Monel best practical choice. Ti severely attacked.", star: true },
  { group: "Acids", name: "Nitric Acid (<65%)", cas: "7697-37-2", r: ["P","E","E","E","E","F","G","E","P","F"], note: "SS and Ti excellent. Monel NOT suitable for nitric acid." },
  { group: "Acids", name: "Nitric Acid (>65%, fuming)", cas: "", r: ["P","F","F","F","F","P","F","E","P","P"], note: "Ti only reliably suitable for fuming nitric; verify current TDS" },
  { group: "Acids", name: "Phosphoric Acid (<50%)", cas: "7664-38-2", r: ["F","G","E","E","G","G","E","E","F","F"], note: "316/316L and Ti strongly preferred over 304" },
  { group: "Acids", name: "Sulfuric Acid (<10%)", cas: "7664-93-9", r: ["P","F","G","G","F","G","E","F","P","P"], note: "316 and Inconel preferred. Concentration and temp critical — verify.", star: true },
  { group: "Acids", name: "Sulfuric Acid (>50%, concentrated)", cas: "", r: ["F","P","P","P","P","F","G","P","P","P"], note: "High concentration: carbon steel may be suitable if cold; Inconel for hot service" },
  { group: "Acids", name: "Citric Acid", cas: "77-92-9", r: ["F","G","E","E","G","E","E","E","F","F"], note: "Food processing common. 316 preferred over 304." },
  { group: "Acids", name: "Oxalic Acid", cas: "144-62-7", r: ["P","F","G","G","G","G","E","E","P","P"], note: "316/316L acceptable; Ti and Inconel for aggressive service" },
  // Caustics / Bases
  { group: "Caustics & Bases", name: "Sodium Hydroxide / NaOH (<20%)", cas: "1310-73-2", r: ["G","G","G","G","G","G","E","F","F","F"], note: "Most materials acceptable. Ti can crack in hot strong NaOH." },
  { group: "Caustics & Bases", name: "Sodium Hydroxide (>50%, hot)", cas: "", r: ["F","F","F","F","F","G","E","P","F","F"], note: "Stress corrosion cracking risk for SS in hot concentrated NaOH" },
  { group: "Caustics & Bases", name: "Ammonia (aqueous)", cas: "1336-21-8", r: ["G","G","G","G","G","F","G","G","P","G"], note: "Avoid brass/copper alloys — ammonia causes SCC. CS and SS acceptable." },
  { group: "Caustics & Bases", name: "Sodium Carbonate (Na₂CO₃)", cas: "497-19-8", r: ["G","E","E","E","E","E","E","E","G","G"], note: "Generally benign to most metals at ambient temps" },
  // Chlorine / Chlorides
  { group: "Chlorides & Halogens", name: "Seawater / Saltwater", cas: "", r: ["P","F","G","G","E","E","E","E","G","P"], note: "Pitting risk for 304 in seawater. 316 better but not immune. Duplex and Ti excellent.", star: true },
  { group: "Chlorides & Halogens", name: "Sodium Chloride (NaCl, brine)", cas: "7647-14-5", r: ["F","F","G","G","E","E","E","E","G","F"], note: "Same concern as seawater. Chloride pitting starts at ~200 ppm for 304 in warm service" },
  { group: "Chlorides & Halogens", name: "Chlorine Gas (dry)", cas: "7782-50-5", r: ["F","G","G","G","G","G","E","E","F","P"], note: "Dry chlorine: SS acceptable. Moisture present = HCl formation — re-evaluate." },
  { group: "Chlorides & Halogens", name: "Chlorine (wet / aqueous)", cas: "", r: ["P","P","F","F","F","G","E","E","P","P"], note: "Wet chlorine attacks all SS to varying degrees. Ti and Inconel preferred." },
  { group: "Chlorides & Halogens", name: "Hydrochloric Acid (HCl) — see Acids", cas: "", r: ["P","P","P","P","F","G","E","G","P","P"], note: "See HCl entry under Acids. Listed here for cross-reference only.", star: true },
  // Solvents / Organic
  { group: "Solvents & Organics", name: "Acetone", cas: "67-64-1", r: ["G","E","E","E","E","E","E","E","G","G"], note: "Benign to metals; most metals suitable" },
  { group: "Solvents & Organics", name: "Methanol / Methyl Alcohol", cas: "67-56-1", r: ["G","E","E","E","E","E","E","E","G","G"], note: "Generally benign. Zinc/cadmium coatings attacked by methanol." },
  { group: "Solvents & Organics", name: "Ethanol / Ethyl Alcohol", cas: "64-17-5", r: ["G","E","E","E","E","E","E","E","G","E"], note: "No attack on common fastener metals; coatings may be affected" },
  { group: "Solvents & Organics", name: "Toluene / Xylene (hydrocarbons)", cas: "", r: ["E","E","E","E","E","E","E","E","E","E"], note: "Aromatic hydrocarbons — no metal attack. Sealing compounds may be affected." },
  { group: "Solvents & Organics", name: "Hydraulic Fluid (petroleum-based)", cas: "", r: ["E","E","E","E","E","E","E","E","E","E"], note: "No attack on metals; zinc/cadmium coatings may soften in some formulations" },
  // Gases / Process
  { group: "Gases & Process", name: "H₂S / Sour Gas (NACE service)", cas: "7783-06-4", r: ["F","F","F","F","F","G","E","E","P","P"], note: "CRITICAL: SSC risk for high-hardness fasteners (HRC >22). NACE MR0175 required. B7M preferred.", star: true },
  { group: "Gases & Process", name: "Carbon Dioxide (CO₂, dry)", cas: "124-38-9", r: ["G","E","E","E","E","E","E","E","G","G"], note: "Dry CO₂ — no concern. Wet CO₂ forms carbonic acid — re-evaluate as acid." },
  { group: "Gases & Process", name: "Carbon Dioxide (CO₂, wet)", cas: "", r: ["P","G","G","G","G","E","E","E","F","F"], note: "Carbonic acid (H₂CO₃) forms. CS corrodes rapidly. SS and alloys preferred." },
  { group: "Gases & Process", name: "Chlorine Dioxide (ClO₂, bleach plant)", cas: "10049-04-4", r: ["P","P","F","F","F","F","E","E","P","P"], note: "Pulp & paper industry. Ti and Inconel best choices." },
  { group: "Gases & Process", name: "Hydrogen Peroxide (<30%)", cas: "7722-84-1", r: ["F","G","G","G","G","E","E","E","F","F"], note: "Higher concentrations aggressive; verify with manufacturer" },
  // Food / Pharma
  { group: "Food & Pharma", name: "Bleach / Sodium Hypochlorite (NaOCl)", cas: "7681-52-9", r: ["P","F","G","G","G","G","E","E","F","P"], note: "Pitting risk for 304; 316 preferred for sanitary/CIP service. Ti and Inconel excellent.", star: true },
  { group: "Food & Pharma", name: "CIP Cleaner (CIP-100 type, caustic)", cas: "", r: ["G","E","E","E","E","E","E","G","F","F"], note: "Caustic-based CIP: SS excellent. Avoid brass in food-contact CIP service." },
  { group: "Food & Pharma", name: "Phosphoric Acid CIP (<5%)", cas: "", r: ["F","G","E","E","G","G","E","E","F","F"], note: "Low-concentration acid CIP; 316 standard for food grade" },
  { group: "Food & Pharma", name: "Citric Acid CIP", cas: "", r: ["F","G","E","E","G","E","E","E","F","F"], note: "316L SS widely used; FDA-compliant finishes required for food contact" },
];

const GROUPS = [...new Set(chemicals.map(c => c.group))];

const TABS = ["Resistance Matrix", "By Chemical Group", "Quick Guide", "Legend & Notes"];

export default function ChemicalResistanceReference() {
  const [activeTab, setActiveTab] = useState(0);
  const [search, setSearch] = useState("");
  const [selectedGroup, setSelectedGroup] = useState("All");

  const filtered = chemicals.filter(c => {
    const matchSearch = !search || c.name.toLowerCase().includes(search.toLowerCase()) || (c.note && c.note.toLowerCase().includes(search.toLowerCase()));
    const matchGroup = selectedGroup === "All" || c.group === selectedGroup;
    return matchSearch && matchGroup;
  });

  return (
    <div style={S.container}>
      {/* Header */}
      <div style={S.header}>
        <div style={S.headerTop}>
          <span style={S.logo}>⬡</span>
          <span style={S.appName}>Fastener Companion</span>
        </div>
        <div style={S.title}>Chemical Resistance Reference</div>
        <div style={S.subtitle}>Stainless · Alloy Steel · Specialty Metals vs. Common Chemicals</div>
        <div style={S.src}>Sources: Corrosion Engineering (Fontana) · MIL-HDBK-729 · NACE International · ASM Metals Handbook Vol.13 · Rolled Alloys, Outokumpu corrosion data · ASTM G31, G48 · Perry's Chemical Engineers' Handbook</div>
      </div>

      {/* Tabs */}
      <div style={S.tabBar}>
        {TABS.map((t, i) => (
          <button key={t} style={{ ...S.tab, ...(activeTab === i ? S.activeTab : {}) }} onClick={() => { setActiveTab(i); setSearch(""); setSelectedGroup("All"); }}>{t}</button>
        ))}
      </div>

      <div style={S.content}>

        {/* Tab 0: Full matrix with search */}
        {activeTab === 0 && (
          <>
            <div style={S.info}>
              <p style={S.infoT}><strong>E</strong> = Excellent · <strong>G</strong> = Good · <strong>F</strong> = Fair/Limited · <strong>P</strong> = Poor, avoid · <strong>N</strong> = No data. Ratings assume ambient temperature and typical concentrations unless noted. ★ = critical awareness item.</p>
            </div>
            <input style={S.search} placeholder="Search chemical name or notes..." value={search} onChange={e => setSearch(e.target.value)} />
            {/* Horizontal scroll wrapper for matrix */}
            <div style={{ overflowX: "auto", borderRadius: 8, border: "1px solid #E2E8F0", marginBottom: 10 }}>
              <table style={{ ...S.table, minWidth: 620 }}>
                <thead>
                  <tr>
                    <th style={{ ...S.th, width: 160, position: "sticky", left: 0, zIndex: 2 }}>Chemical</th>
                    {MATS.map(m => (
                      <th key={m} style={{ ...S.thC, width: 44 }}>{MAT_LABELS[m].replace("\n", " ")}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((c, i) => (
                    <tr key={c.name + i} style={c.star ? { background: "#FFF8E7" } : i % 2 === 0 ? {} : { background: "#F8FAFC" }}>
                      <td style={{ ...S.td, background: "inherit", position: "sticky", left: 0, zIndex: 1 }}>
                        <div style={{ fontWeight: c.star ? 700 : 500, fontSize: 11, color: "#1E293B" }}>
                          {c.star && <span style={{ color: "#F6AD55", marginRight: 3 }}>★</span>}{c.name}
                        </div>
                        <div style={{ fontSize: 10, color: "#94A3B8", lineHeight: 1.3, marginTop: 2 }}>{c.note}</div>
                      </td>
                      {c.r.map((rating, ri) => (
                        <td key={ri} style={{ ...S.tdC, ...ratingColor(rating), background: ratingColor(rating).background, fontSize: 11 }}>
                          {rating}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {filtered.length === 0 && <div style={{ textAlign: "center", color: "#94A3B8", padding: 20 }}>No results. Try a different search term.</div>}
          </>
        )}

        {/* Tab 1: By Chemical Group */}
        {activeTab === 1 && (
          <>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 10 }}>
              {["All", ...GROUPS].map(g => (
                <button key={g} onClick={() => setSelectedGroup(g)} style={{ padding: "4px 10px", borderRadius: 20, border: "1px solid", borderColor: selectedGroup === g ? "#1B3A6B" : "#E2E8F0", background: selectedGroup === g ? "#1B3A6B" : "#fff", color: selectedGroup === g ? "#fff" : "#1B3A6B", fontSize: 11, fontWeight: 600, cursor: "pointer" }}>
                  {g}
                </button>
              ))}
            </div>
            {(selectedGroup === "All" ? GROUPS : [selectedGroup]).map(group => {
              const groupChems = chemicals.filter(c => c.group === group);
              return (
                <div key={group}>
                  <div style={S.secTitle}>{group}</div>
                  {groupChems.map((c, i) => (
                    <div key={c.name} style={{ ...S.card, borderLeft: `4px solid ${c.star ? "#F6AD55" : "#1B3A6B"}`, marginBottom: 8 }}>
                      <div style={{ padding: "8px 10px" }}>
                        <div style={{ fontWeight: 700, fontSize: 12, color: "#1B3A6B", marginBottom: 4 }}>
                          {c.star && <span style={{ color: "#F6AD55", marginRight: 4 }}>★</span>}{c.name}
                          {c.cas && <span style={{ fontSize: 10, color: "#94A3B8", fontWeight: 400, marginLeft: 6 }}>CAS {c.cas}</span>}
                        </div>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 6 }}>
                          {MATS.map((m, mi) => (
                            <div key={m} style={{ display: "flex", flexDirection: "column", alignItems: "center", minWidth: 36 }}>
                              <div style={{ fontSize: 9, color: "#94A3B8", marginBottom: 1, textAlign: "center", lineHeight: 1.2 }}>{MAT_LABELS[m].replace("\n", " ")}</div>
                              <div style={{ padding: "2px 5px", borderRadius: 4, fontSize: 11, fontWeight: 700, ...ratingColor(c.r[mi]) }}>{c.r[mi]}</div>
                            </div>
                          ))}
                        </div>
                        <div style={{ fontSize: 10, color: "#475569", lineHeight: 1.4 }}>{c.note}</div>
                      </div>
                    </div>
                  ))}
                </div>
              );
            })}
          </>
        )}

        {/* Tab 2: Quick Guide */}
        {activeTab === 2 && (
          <>
            <div style={S.secTitle}>Critical Compatibility Rules</div>
            {[
              { icon: "🔴", title: "HCl attacks ALL stainless steels", body: "Hydrochloric acid is the most aggressive common acid for SS. Even 316 and duplex have limited resistance. Use Monel 400, Inconel 625, or titanium for HCl service. Do not assume any SS grade is acceptable." },
              { icon: "🔴", title: "H₂S / Sour Gas — NACE MR0175 required", body: "Sulfide stress cracking (SSC) is a function of hardness, not just material. Any fastener with HRC >22 (Grade 8, 10.9, 12.9, A354 BD) is at risk in H₂S environments. Use A193 B7M (NACE grade) studs. NACE MR0175/ISO 15156 governs." },
              { icon: "🟡", title: "Chloride pitting — 304 vs 316", body: "304 SS is susceptible to pitting and crevice corrosion in chloride environments (seawater, brines, bleach, CIP). 316 SS contains 2–3% Mo which dramatically improves chloride resistance. Always use 316 or 316L in chloride service above ~200 ppm Cl⁻ or in warm conditions." },
              { icon: "🟡", title: "Ammonia destroys brass and copper alloys", body: "Ammoniacal solutions cause stress corrosion cracking (SCC) of brass and all copper alloys — this is well-documented and fast. Never use brass or bronze fasteners in fertilizer, refrigeration (R-717), or any ammonia-containing environment." },
              { icon: "🟡", title: "Nitric acid — Monel NOT suitable", body: "Monel 400 is attacked by nitric acid. This is counterintuitive given Monel's broad acid resistance. Use 304/316 SS or titanium for nitric acid service." },
              { icon: "🟡", title: "304 SS sensitization in caustic", body: "Hot concentrated NaOH (>50%, >150°F) can cause SCC in 304 and 316 SS. Use higher-Ni alloys or ensure stress relief for welded assemblies in hot caustic service." },
              { icon: "🔵", title: "Titanium excellent in most acids", body: "Ti Gr.2 is outstanding in chlorine, wet chlorine, dilute HCl, and most oxidizing acids. Exception: HF attacks titanium severely, and it is not suitable for dry chlorine gas above 150°F (ignition risk)." },
              { icon: "🔵", title: "Carbon steel in concentrated H₂SO₄", body: "Counterintuitively, carbon steel can be suitable in cold concentrated (>95%) sulfuric acid due to passivation. However, dilute or hot H₂SO₄ rapidly attacks carbon steel. Concentration and temperature determine compatibility." },
            ].map((r, i) => (
              <div key={r.title} style={{ ...S.card, borderLeft: `4px solid ${r.icon === "🔴" ? "#DC2626" : r.icon === "🟡" ? "#D97706" : "#2563EB"}`, marginBottom: 8 }}>
                <div style={{ padding: "8px 10px" }}>
                  <div style={{ fontWeight: 700, fontSize: 12, color: "#1B3A6B", marginBottom: 4 }}>{r.icon} {r.title}</div>
                  <div style={{ fontSize: 11, color: "#1E293B", lineHeight: 1.5 }}>{r.body}</div>
                </div>
              </div>
            ))}

            <div style={S.secTitle}>Material Selection Summary</div>
            <div style={S.card}>
              <table style={S.table}>
                <thead>
                  <tr>
                    <th style={S.th}>Material</th>
                    <th style={S.th}>Best For</th>
                    <th style={S.th}>Avoid</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { mat: "Carbon Steel", best: "Dry, indoor, petroleum", avoid: "Acids, chlorides, moisture" },
                    { mat: "304 SS", best: "Mild chemicals, food, indoor", avoid: "Chlorides, HCl, reducing acids" },
                    { mat: "316 SS ★", best: "Chlorides, marine, seawater, CIP", avoid: "Concentrated HCl, HF, hot H₂SO₄" },
                    { mat: "2205 Duplex", best: "High-chloride, seawater, brine", avoid: "Elevated temp (>300°C) sustained" },
                    { mat: "Monel 400", best: "HF, HCl, seawater, alkalies", avoid: "Nitric acid, oxidizing acids" },
                    { mat: "Inconel 625", best: "H₂SO₄, HCl, wide pH range", avoid: "Cost-sensitive applications" },
                    { mat: "Titanium Gr.2 ★", best: "Chlorine, wet Cl₂, most acids", avoid: "HF, dry Cl₂ above 150°F, fuming H₂SO₄" },
                    { mat: "Brass / Bronze", best: "Freshwater, mild environments", avoid: "Ammonia, amines, HCl, acidic" },
                  ].map((r, i) => (
                    <tr key={r.mat} style={i % 2 === 0 ? {} : { background: "#F8FAFC" }}>
                      <td style={{ ...S.td, fontWeight: 600, fontSize: 11 }}>{r.mat}</td>
                      <td style={{ ...S.td, fontSize: 11, color: "#059669" }}>{r.best}</td>
                      <td style={{ ...S.td, fontSize: 11, color: "#DC2626" }}>{r.avoid}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* Tab 3: Legend & Notes */}
        {activeTab === 3 && (
          <>
            <div style={S.secTitle}>Rating Key</div>
            <div style={S.card}>
              <table style={S.table}>
                <thead>
                  <tr>
                    <th style={{ ...S.thC, width: 36 }}>Code</th>
                    <th style={S.th}>Meaning</th>
                    <th style={S.th}>Practical Guidance</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { code: "E", label: "Excellent", color: "green", note: "No appreciable corrosion. Suitable for long-term service." },
                    { code: "G", label: "Good", color: "blue", note: "Acceptable corrosion rate. Suitable for most service conditions." },
                    { code: "F", label: "Fair / Limited", color: "yellow", note: "Usable in some conditions. Verify concentration, temperature, aeration." },
                    { code: "P", label: "Poor — Avoid", color: "red", note: "High corrosion rate. Not recommended. Find alternative material." },
                    { code: "N", label: "No data", color: "none", note: "Insufficient data for rating. Consult a corrosion engineer." },
                  ].map(r => (
                    <tr key={r.code}>
                      <td style={{ ...S.tdC, ...ratingColor(r.code), fontWeight: 700, fontSize: 14 }}>{r.code}</td>
                      <td style={{ ...S.td, fontWeight: 700, fontSize: 12 }}>{r.label}</td>
                      <td style={{ ...S.td, fontSize: 11, color: "#475569" }}>{r.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div style={S.secTitle}>Important Limitations</div>
            {[
              "Ratings are guidelines for ambient temperature (68–77°F / 20–25°C) and typical concentrations unless otherwise noted. Temperature, concentration, aeration, velocity, and stress state all significantly affect actual corrosion rates.",
              "Crevice corrosion can occur in materials rated 'Excellent' in stagnant or low-velocity chloride service. Duplex and 316L are significantly better than 304 for crevice resistance.",
              "Galvanic corrosion is not captured in this matrix — it is a contact phenomenon between two dissimilar metals. See Galvanic Corrosion Chart for paired material compatibility.",
              "Stress corrosion cracking (SCC) and hydrogen embrittlement (HE) are not always reflected in general corrosion ratings. SS + chlorides under tensile stress = SCC risk regardless of corrosion rating. Brass + ammonia = SCC regardless of general rating.",
              "Data compiled from published corrosion databases and manufacturer data. Verify with current material supplier documentation for specific applications.",
            ].map((note, i) => (
              <div key={i} style={{ background: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: 8, padding: "8px 12px", marginBottom: 8 }}>
                <div style={{ fontSize: 11, color: "#475569", lineHeight: 1.5 }}>{note}</div>
              </div>
            ))}

            <div style={S.secTitle}>Column Key</div>
            <div style={S.card}>
              <table style={S.table}>
                <thead><tr><th style={S.th}>Code</th><th style={S.th}>Material</th><th style={S.th}>Standard / Spec</th></tr></thead>
                <tbody>
                  {[
                    ["CS", "Carbon Steel (general)", "ASTM A307, A325, A36"],
                    ["304SS", "Type 304 Stainless", "ASTM A193 B8, F593 (Gr.1)"],
                    ["316SS", "Type 316 Stainless", "ASTM A193 B8M, F593 (Gr.2)"],
                    ["316L", "Type 316L Stainless (low carbon)", "ASTM A193 B8ML"],
                    ["Duplex", "Duplex 2205 SS", "UNS S31803 / S32205"],
                    ["Monel", "Monel 400", "UNS N04400"],
                    ["Inconel", "Inconel 625", "UNS N06625"],
                    ["Ti", "Titanium Grade 2", "ASTM B348, UNS R50400"],
                    ["Brass", "Naval Brass / Silicon Bronze", "UNS C46400 / C65500"],
                    ["Al", "Aluminum (general)", "2024, 6061, 7075 alloys"],
                  ].map((r, i) => (
                    <tr key={r[0]} style={i % 2 === 0 ? {} : { background: "#F8FAFC" }}>
                      <td style={{ ...S.td, fontWeight: 700, fontSize: 12 }}>{r[0]}</td>
                      <td style={{ ...S.td, fontSize: 11 }}>{r[1]}</td>
                      <td style={{ ...S.td, fontSize: 11, color: "#94A3B8" }}>{r[2]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* Universal disclaimer */}
        <div style={S.warn}>
          <span style={{ fontSize: 14, marginTop: 1 }}>⚠</span>
          <div style={S.warnT}>
            <strong>Verify Before Use.</strong> Chemical compatibility depends on concentration, temperature, aeration, velocity, stress state, and combined chemical exposures. This matrix provides general guidance only. Consult current material supplier data, NACE standards, and a qualified corrosion engineer for critical applications. This tool is a reference guide, not an engineering specification.
          </div>
        </div>
      </div>
    </div>
  );
}
