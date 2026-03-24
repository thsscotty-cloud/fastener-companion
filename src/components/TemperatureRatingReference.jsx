import { useState } from "react";

const styles = {
  container: { fontFamily: "'DM Sans', 'Segoe UI', sans-serif", background: "#F7F9FC", minHeight: "100vh", maxWidth: 430, margin: "0 auto", paddingBottom: 80 },
  header: { background: "linear-gradient(135deg, #1B3A6B 0%, #2a5298 100%)", padding: "16px 16px 12px", color: "#fff" },
  headerTop: { display: "flex", alignItems: "center", gap: 8, marginBottom: 2 },
  logo: { fontSize: 20 },
  appName: { fontSize: 12, opacity: 0.75, letterSpacing: 0.3 },
  title: { fontSize: 18, fontWeight: 700, margin: 0 },
  subtitle: { fontSize: 11, opacity: 0.7, marginTop: 2 },
  tabBar: { display: "flex", overflowX: "auto", background: "#fff", borderBottom: "1px solid #E2E8F0", gap: 0 },
  tab: { padding: "10px 14px", fontSize: 12, fontWeight: 600, whiteSpace: "nowrap", cursor: "pointer", border: "none", background: "transparent", color: "#94A3B8", borderBottom: "3px solid transparent" },
  activeTab: { color: "#1B3A6B", borderBottom: "3px solid #F6AD55" },
  content: { padding: "12px 12px 0" },
  sectionTitle: { fontSize: 13, fontWeight: 700, color: "#1B3A6B", marginBottom: 8, marginTop: 4, textTransform: "uppercase", letterSpacing: 0.5 },
  card: { background: "#fff", borderRadius: 8, border: "1px solid #E2E8F0", marginBottom: 10, overflow: "hidden" },
  cardHeader: { padding: "10px 12px 8px", borderBottom: "1px solid #E2E8F0" },
  cardTitle: { fontSize: 13, fontWeight: 700, color: "#1B3A6B", margin: 0 },
  cardSub: { fontSize: 11, color: "#94A3B8", marginTop: 2 },
  table: { width: "100%", borderCollapse: "collapse", fontSize: 12 },
  th: { background: "#1B3A6B", color: "#fff", padding: "6px 8px", textAlign: "left", fontSize: 11, fontWeight: 600 },
  thCenter: { background: "#1B3A6B", color: "#fff", padding: "6px 8px", textAlign: "center", fontSize: 11, fontWeight: 600 },
  td: { padding: "6px 8px", borderBottom: "1px solid #E2E8F0", verticalAlign: "top", color: "#1E293B" },
  tdCenter: { padding: "6px 8px", borderBottom: "1px solid #E2E8F0", textAlign: "center", verticalAlign: "top", color: "#1E293B" },
  tdAlt: { padding: "6px 8px", borderBottom: "1px solid #E2E8F0", background: "#F8FAFC", verticalAlign: "top", color: "#1E293B" },
  tdAltCenter: { padding: "6px 8px", borderBottom: "1px solid #E2E8F0", background: "#F8FAFC", textAlign: "center", verticalAlign: "top", color: "#1E293B" },
  starRow: { background: "#FFF8E7", borderBottom: "1px solid #FDE68A" },
  badge: (color) => ({ display: "inline-block", padding: "2px 7px", borderRadius: 10, fontSize: 10, fontWeight: 700, background: color === "green" ? "#D1FAE5" : color === "yellow" ? "#FEF3C7" : color === "red" ? "#FEE2E2" : color === "blue" ? "#DBEAFE" : "#F1F5F9", color: color === "green" ? "#065F46" : color === "yellow" ? "#92400E" : color === "red" ? "#991B1B" : color === "blue" ? "#1E40AF" : "#475569" }),
  warn: { background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: 8, padding: "10px 12px", marginTop: 10, marginBottom: 4, display: "flex", gap: 8, alignItems: "flex-start" },
  warnIcon: { fontSize: 14, marginTop: 1 },
  warnText: { fontSize: 11, color: "#991B1B", lineHeight: 1.5 },
  infoBox: { background: "#EFF6FF", border: "1px solid #BFDBFE", borderRadius: 8, padding: "10px 12px", marginBottom: 10 },
  infoText: { fontSize: 11, color: "#1E40AF", lineHeight: 1.6, margin: 0 },
  searchBox: { width: "100%", boxSizing: "border-box", padding: "8px 10px", border: "1px solid #E2E8F0", borderRadius: 8, fontSize: 13, marginBottom: 10, outline: "none" },
  note: { fontSize: 10, color: "#94A3B8", marginTop: 4, fontStyle: "italic" },
  divider: { borderTop: "1px solid #E2E8F0", margin: "8px 0" },
};

const TABS = ["Material Ratings", "Coating Limits", "Lubrication Limits", "Application Guide", "Quick Lookup"];

// Material temperature data
const materialData = [
  { material: "Carbon Steel (A307, Gr.2, Gr.5)", minF: -20, maxF: 750, minC: -29, maxC: 399, notes: "Loses ductility below −20°F; use impact-tested if lower temps required", caution: "low", star: true },
  { material: "High-Strength Carbon Steel (Gr.8, A325, A490)", minF: -20, maxF: 450, minC: -29, maxC: 232, notes: "Tempering temperature concern above 450°F; strength loss possible", caution: "yellow", star: true },
  { material: "Alloy Steel — A354 BD, A193 B7", minF: -40, maxF: 700, minC: -40, maxC: 371, notes: "B7 studs widely used in elevated temp service; verify heat treat", caution: "green", star: true },
  { material: "A193 B7M (NACE/sour service)", minF: -40, maxF: 700, minC: -40, maxC: 371, notes: "Same temp range as B7 but lower hardness for SSC resistance", caution: "green" },
  { material: "A193 B8 / B8M (300 Series SS studs)", minF: -325, maxF: 1200, minC: -198, maxC: 649, notes: "B8=304 SS; B8M=316 SS. Excellent cryogenic and high-temp range", caution: "green", star: true },
  { material: "A193 B16 (Cr-Mo alloy)", minF: -20, maxF: 1100, minC: -29, maxC: 593, notes: "High-temp pressure vessels and piping; per ASME B16.5 use", caution: "green" },
  { material: "304 Stainless Steel", minF: -325, maxF: 1500, minC: -198, maxC: 816, notes: "Avoid 800–1650°F sustained (sensitization zone for 304)", caution: "yellow", star: true },
  { material: "316 Stainless Steel", minF: -325, maxF: 1500, minC: -198, maxC: 816, notes: "Better pitting resistance than 304; same sensitization concern", caution: "yellow", star: true },
  { material: "316L Stainless Steel", minF: -325, maxF: 800, minC: -198, maxC: 427, notes: "Low carbon prevents sensitization; max continuous 800°F", caution: "green" },
  { material: "Duplex SS (2205)", minF: -60, maxF: 600, minC: -51, maxC: 316, notes: "475°F embrittlement concern above 300°C sustained service", caution: "yellow" },
  { material: "Monel 400 (Ni-Cu)", minF: -350, maxF: 1000, minC: -212, maxC: 538, notes: "Marine and chemical service; good cryogenic properties", caution: "green" },
  { material: "Inconel 625 / 718 (Ni alloy)", minF: -423, maxF: 1800, minC: -252, maxC: 982, notes: "Extreme service; retains strength near cryogenic and very high temps", caution: "green" },
  { material: "Silicon Bronze / Naval Brass", minF: -100, maxF: 500, minC: -73, maxC: 260, notes: "Marine/electrical; avoid elevated temp structural loads", caution: "yellow" },
  { material: "Titanium Gr.2 / Gr.5 (Ti-6Al-4V)", minF: -320, maxF: 600, minC: -196, maxC: 316, notes: "Excellent cryogenic; Gr.5 up to 600°F sustained", caution: "green" },
  { material: "Nylon Patch (thread-lock insert)", minF: 32, maxF: 250, minC: 0, maxC: 121, notes: "NEVER use nylon patch in high-temp or autoclave service", caution: "red" },
  { material: "PTFE Thread Seal Tape", minF: -400, maxF: 500, minC: -240, maxC: 260, notes: "Pipe threads only; does not provide structural strength", caution: "green" },
];

// Coating temperature limits
const coatingData = [
  { coating: "Zinc Electroplate (B633)", maxF: 392, maxC: 200, notes: "De-embrittlement baking ~450°F/230°C; service limit lower", caution: "yellow", star: true },
  { coating: "Hot-Dip Galvanizing (A153)", maxF: 392, maxC: 200, notes: "Zinc melts ~787°F. Peeling and outgassing above 400°F", caution: "yellow", star: true },
  { coating: "Mechanical Galvanizing (B695)", maxF: 392, maxC: 200, notes: "Similar zinc-based limit; not for high-temp", caution: "yellow" },
  { coating: "Zinc Flake (Geomet / Dacromet / Magni)", maxF: 482, maxC: 250, notes: "Better high-temp resistance than electroplate; check TDS", caution: "green", star: true },
  { coating: "Black Oxide (MIL-DTL-13924)", maxF: 300, maxC: 149, notes: "Minimal corrosion protection; primarily cosmetic; low temp limit", caution: "red" },
  { coating: "Phosphate (MIL-DTL-16232)", maxF: 300, maxC: 149, notes: "Base for oil/wax; limit is for the supplemental oil, not phosphate itself", caution: "red" },
  { coating: "Cadmium Plate (AMS-QQ-P-416)", maxF: 450, maxC: 232, notes: "Cadmium melts 610°F; fumes toxic. Avoid in food/med. Restricted in EU", caution: "red" },
  { coating: "Nickel Plate (electroless)", maxF: 800, maxC: 427, notes: "Good high-temp; corrosion resistance maintained to ~800°F", caution: "green" },
  { coating: "Chrome Plate (hard)", maxF: 1200, maxC: 649, notes: "Hardness retained to 1200°F; corrosion protection only to ~800°F", caution: "green" },
  { coating: "PTFE / Xylan / Fluoropolymer", maxF: 500, maxC: 260, notes: "Low-friction coatings; PTFE fumes toxic above 500°F if inhaled", caution: "yellow" },
  { coating: "Ceramic / Thermal Barrier", maxF: 2200, maxC: 1204, notes: "Specialized; check manufacturer TDS for specific product limits", caution: "green" },
  { coating: "Passivation (SS only)", maxF: 1500, maxC: 816, notes: "Not a coating — removes free iron. Limit = base SS alloy limit", caution: "green" },
  { coating: "Paint / Organic Coating", maxF: 250, maxC: 121, notes: "Standard industrial paints; high-temp formulas available separately", caution: "red" },
  { coating: "High-Temp Paint (VHT / POR-15)", maxF: 2000, maxC: 1093, notes: "Specialty exhaust/engine coatings; must cure per manufacturer TDS", caution: "green" },
];

// Lubricant/anti-seize temperature limits
const lubricantData = [
  { product: "Standard Petroleum Grease", minF: -20, maxF: 250, minC: -29, maxC: 121, notes: "Not suitable for any elevated temp service", caution: "red", star: true },
  { product: "Moly-Based Anti-Seize (MoS₂)", minF: -40, maxF: 750, minC: -40, maxC: 399, notes: "Common field anti-seize; Jet-Lube and similar. Standard threaded fasteners.", caution: "green", star: true },
  { product: "Copper-Based Anti-Seize", minF: -30, maxF: 1800, minC: -34, maxC: 982, notes: "High-temp flanges, exhaust, furnace hardware. Most common for >750°F.", caution: "green", star: true },
  { product: "Nickel-Based Anti-Seize", minF: -30, maxF: 2400, minC: -34, maxC: 1316, notes: "Very high temp; nuclear and turbine service. Avoid copper when prohibited.", caution: "green" },
  { product: "Zinc-Based Anti-Seize", minF: -40, maxF: 750, minC: -40, maxC: 399, notes: "Similar to moly; check galvanic compatibility", caution: "green" },
  { product: "Loctite 243 (Medium Blue)", minF: -65, maxF: 300, minC: -54, maxC: 149, notes: "Standard vibration resistance; loses significant strength above 300°F", caution: "yellow", star: true },
  { product: "Loctite 263 (High-Strength Red)", minF: -65, maxF: 300, minC: -54, maxC: 149, notes: "High prevailing torque; same temp limit as 243. Not for high-temp.", caution: "yellow", star: true },
  { product: "Loctite 2701 / 272 (High-Temp Red)", minF: -65, maxF: 450, minC: -54, maxC: 232, notes: "Higher-temp formula from Henkel; verify current TDS", caution: "yellow" },
  { product: "Loctite 648 / 620 (Retaining)", minF: -65, maxF: 450, minC: -54, maxC: 232, notes: "Retaining compound; intermittent to 450°F", caution: "yellow" },
  { product: "Never-Seez Pure Nickel", minF: -30, maxF: 2600, minC: -34, maxC: 1427, notes: "Extreme service; turbines and furnaces", caution: "green" },
  { product: "Jet-Lube SS-30 (Stainless Steel)", minF: -20, maxF: 2000, minC: -29, maxC: 1093, notes: "Stainless and alloy fasteners in high-temp and chemical environments", caution: "green" },
  { product: "PTFE Paste / Tape", minF: -400, maxF: 500, minC: -240, maxC: 260, notes: "Pipe thread sealant only; not for structural fastener lubrication", caution: "yellow" },
  { product: "Silicone RTV Sealant", minF: -65, maxF: 600, minC: -54, maxC: 316, notes: "High-temp silicone only; not a thread lubricant — gasket/flange sealing", caution: "yellow" },
];

// Application guide data
const appGuide = [
  { app: "Indoor ambient (<120°F)", icon: "🏭", rec: "Any standard grade + zinc electroplate", mat: "Carbon steel", coat: "Zinc electroplate, black oxide", lub: "Standard petroleum or moly anti-seize", flag: "green" },
  { app: "Outdoor unheated (−20°F to 150°F)", icon: "🌧️", rec: "A307 / Gr.5 or Gr.8 + HDG or zinc plate", mat: "Carbon or alloy steel", coat: "Hot-dip galvanizing, zinc plate, zinc flake", lub: "Moly or copper anti-seize", flag: "green" },
  { app: "Cryogenic (<−20°F)", icon: "❄️", rec: "A193 B8/B8M, Monel, Inconel, Titanium", mat: "Austenitic SS, Ni-alloy, Ti", coat: "Passivation (SS only); no zinc coatings", lub: "PTFE paste or approved low-temp grease", flag: "blue" },
  { app: "Elevated Temp 400–750°F", icon: "🔥", rec: "A193 B7/B7M studs + A194 2H heavy hex nuts", mat: "Alloy steel (B7), 304/316 SS", coat: "Zinc flake (to 250°C), nickel plate, bare", lub: "Copper or moly anti-seize. NO standard Loctite.", flag: "yellow" },
  { app: "High Temp 750–1200°F", icon: "🌡️", rec: "A193 B8/B8M, B16, Inconel 625/718", mat: "Austenitic SS, Ni alloy, Inconel", coat: "Nickel plate, chrome plate, ceramic, bare", lub: "Copper anti-seize, nickel anti-seize", flag: "red" },
  { app: "Extreme Temp >1200°F", icon: "⚡", rec: "Inconel 625/718, Monel, specialized alloys", mat: "Ni-base superalloys only", coat: "Ceramic, bare alloy, or per OEM spec", lub: "Nickel or pure nickel anti-seize (Never-Seez)", flag: "red" },
  { app: "Steam service (ASME B16.5)", icon: "💨", rec: "A193 B7 + A194 2H per applicable flange rating", mat: "Alloy steel or SS per class", coat: "Bare or zinc flake below Class 300", lub: "Copper or nickel anti-seize on stud threads", flag: "yellow" },
  { app: "Exhaust / Automotive", icon: "🚗", rec: "Grade 8 or SS + copper anti-seize", mat: "Carbon steel, 304/316 SS", coat: "High-temp paint, bare, or ceramic", lub: "Copper anti-seize", flag: "yellow" },
];

function getBadgeColor(caution) {
  if (caution === "green") return "green";
  if (caution === "yellow") return "yellow";
  if (caution === "red") return "red";
  return "blue";
}
function getBadgeLabel(caution) {
  if (caution === "green") return "Suitable";
  if (caution === "yellow") return "Caution";
  if (caution === "red") return "Limited";
  return "Info";
}

export default function TemperatureRatingReference() {
  const [activeTab, setActiveTab] = useState(0);
  const [unit, setUnit] = useState("F");
  const [search, setSearch] = useState("");

  const fmt = (f, c) => unit === "F" ? `${f}°F` : `${c}°C`;

  const filteredMat = materialData.filter(r =>
    r.material.toLowerCase().includes(search.toLowerCase()) ||
    r.notes.toLowerCase().includes(search.toLowerCase())
  );
  const filteredCoat = coatingData.filter(r =>
    r.coating.toLowerCase().includes(search.toLowerCase()) ||
    r.notes.toLowerCase().includes(search.toLowerCase())
  );
  const filteredLub = lubricantData.filter(r =>
    r.product.toLowerCase().includes(search.toLowerCase()) ||
    r.notes.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerTop}>
          <span style={styles.logo}>⬡</span>
          <span style={styles.appName}>Fastener Companion</span>
        </div>
        <div style={styles.title}>Temperature Rating Reference</div>
        <div style={styles.subtitle}>Materials · Coatings · Lubricants · Application Guide</div>
        <div style={{ fontSize: 10, opacity: 0.6, marginTop: 4 }}>
          Sources: ASTM A193, A194, A307, A325, B633, B695, A153 · ASME B16.5 · MIL-DTL-13924, 16232 · Henkel/Loctite TDS · Jet-Lube TDS · Machinery's Handbook 31st Ed.
        </div>
      </div>

      {/* Unit toggle */}
      <div style={{ background: "#fff", padding: "8px 12px", borderBottom: "1px solid #E2E8F0", display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ fontSize: 12, color: "#94A3B8", fontWeight: 600 }}>Temperature units:</span>
        {["F", "C"].map(u => (
          <button key={u} onClick={() => setUnit(u)} style={{ padding: "4px 14px", borderRadius: 20, border: "1px solid", borderColor: unit === u ? "#1B3A6B" : "#E2E8F0", background: unit === u ? "#1B3A6B" : "#fff", color: unit === u ? "#fff" : "#1B3A6B", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>
            °{u}
          </button>
        ))}
      </div>

      {/* Tabs */}
      <div style={styles.tabBar}>
        {TABS.map((t, i) => (
          <button key={t} style={{ ...styles.tab, ...(activeTab === i ? styles.activeTab : {}) }} onClick={() => setActiveTab(i)}>{t}</button>
        ))}
      </div>

      <div style={styles.content}>

        {/* Tab 0: Material Ratings */}
        {activeTab === 0 && (
          <>
            <div style={styles.infoBox}>
              <p style={styles.infoText}>
                <strong>★</strong> marks most common fastener materials. Temperatures are continuous service ratings unless noted.
                Impact test certifications required for most applications below −20°F. Always verify current ASTM/ASME standards.
              </p>
            </div>
            <input
              style={styles.searchBox}
              placeholder="Search material or notes..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <div style={styles.card}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>Material</th>
                    <th style={{ ...styles.thCenter, width: 70 }}>Min</th>
                    <th style={{ ...styles.thCenter, width: 70 }}>Max</th>
                    <th style={{ ...styles.thCenter, width: 62 }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMat.map((r, i) => {
                    const rowStyle = r.star ? styles.starRow : (i % 2 === 0 ? {} : { background: "#F8FAFC" });
                    return (
                      <tr key={r.material} style={rowStyle}>
                        <td style={{ ...styles.td, background: "inherit" }}>
                          <div style={{ fontWeight: r.star ? 700 : 400, fontSize: 12 }}>
                            {r.star && <span style={{ color: "#F6AD55", marginRight: 4 }}>★</span>}{r.material}
                          </div>
                          <div style={{ fontSize: 10, color: "#94A3B8", marginTop: 2, lineHeight: 1.4 }}>{r.notes}</div>
                        </td>
                        <td style={{ ...styles.tdCenter, background: "inherit", fontWeight: 600, fontSize: 12, color: "#2563EB" }}>{fmt(r.minF, r.minC)}</td>
                        <td style={{ ...styles.tdCenter, background: "inherit", fontWeight: 600, fontSize: 12, color: "#DC2626" }}>{fmt(r.maxF, r.maxC)}</td>
                        <td style={{ ...styles.tdCenter, background: "inherit" }}>
                          <span style={styles.badge(getBadgeColor(r.caution))}>{getBadgeLabel(r.caution)}</span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div style={{ ...styles.infoBox, background: "#FFF7ED", borderColor: "#FED7AA" }}>
              <p style={{ ...styles.infoText, color: "#92400E" }}>
                <strong>Cryogenic note:</strong> ASTM A320 L7/L43 are impact-tested alloy steel studs for low-temperature service.
                Charpy V-notch testing required per ASME B31.3 below −20°F for most carbon steels.
              </p>
            </div>
          </>
        )}

        {/* Tab 1: Coating Limits */}
        {activeTab === 1 && (
          <>
            <div style={styles.infoBox}>
              <p style={styles.infoText}>
                <strong>Critical:</strong> Coating temperature limits often govern before the base fastener material limit.
                Zinc-based coatings (electroplate, HDG, mechanical galvanizing) are all limited to ~400°F / 200°C continuous service.
              </p>
            </div>
            <input
              style={styles.searchBox}
              placeholder="Search coating..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <div style={styles.card}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>Coating</th>
                    <th style={{ ...styles.thCenter, width: 80 }}>Max Temp</th>
                    <th style={{ ...styles.thCenter, width: 62 }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCoat.map((r, i) => {
                    const rowStyle = r.star ? styles.starRow : (i % 2 === 0 ? {} : { background: "#F8FAFC" });
                    return (
                      <tr key={r.coating} style={rowStyle}>
                        <td style={{ ...styles.td, background: "inherit" }}>
                          <div style={{ fontWeight: r.star ? 700 : 400, fontSize: 12 }}>
                            {r.star && <span style={{ color: "#F6AD55", marginRight: 4 }}>★</span>}{r.coating}
                          </div>
                          <div style={{ fontSize: 10, color: "#94A3B8", marginTop: 2, lineHeight: 1.4 }}>{r.notes}</div>
                        </td>
                        <td style={{ ...styles.tdCenter, background: "inherit", fontWeight: 700, fontSize: 12, color: "#DC2626" }}>{fmt(r.maxF, r.maxC)}</td>
                        <td style={{ ...styles.tdCenter, background: "inherit" }}>
                          <span style={styles.badge(getBadgeColor(r.caution))}>{getBadgeLabel(r.caution)}</span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div style={styles.warn}>
              <span style={styles.warnIcon}>⚠</span>
              <div style={styles.warnText}>
                <strong>HE + Temperature:</strong> De-embrittlement baking for electroplated high-strength fasteners (Gr.8, A354 BD, 10.9, 12.9) must occur within 4 hours of plating at 375–450°F for 3–24 hours. This baking temperature is NOT the service limit — it is a one-time post-plate process. Service limit for zinc electroplate remains ~400°F.
              </div>
            </div>
          </>
        )}

        {/* Tab 2: Lubrication Limits */}
        {activeTab === 2 && (
          <>
            <div style={styles.infoBox}>
              <p style={styles.infoText}>
                <strong>Key rule:</strong> Standard Loctite threadlockers (243 blue, 263 red) lose meaningful strength above 300°F.
                Use copper or nickel anti-seize in any elevated-temperature application.
                Anti-seize on stainless is always required — galling is permanent.
              </p>
            </div>
            <input
              style={styles.searchBox}
              placeholder="Search product..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <div style={styles.card}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>Product / Type</th>
                    <th style={{ ...styles.thCenter, width: 68 }}>Min</th>
                    <th style={{ ...styles.thCenter, width: 68 }}>Max</th>
                    <th style={{ ...styles.thCenter, width: 62 }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLub.map((r, i) => {
                    const rowStyle = r.star ? styles.starRow : (i % 2 === 0 ? {} : { background: "#F8FAFC" });
                    return (
                      <tr key={r.product} style={rowStyle}>
                        <td style={{ ...styles.td, background: "inherit" }}>
                          <div style={{ fontWeight: r.star ? 700 : 400, fontSize: 12 }}>
                            {r.star && <span style={{ color: "#F6AD55", marginRight: 4 }}>★</span>}{r.product}
                          </div>
                          <div style={{ fontSize: 10, color: "#94A3B8", marginTop: 2, lineHeight: 1.4 }}>{r.notes}</div>
                        </td>
                        <td style={{ ...styles.tdCenter, background: "inherit", fontWeight: 600, fontSize: 12, color: "#2563EB" }}>{fmt(r.minF, r.minC)}</td>
                        <td style={{ ...styles.tdCenter, background: "inherit", fontWeight: 700, fontSize: 12, color: "#DC2626" }}>{fmt(r.maxF, r.maxC)}</td>
                        <td style={{ ...styles.tdCenter, background: "inherit" }}>
                          <span style={styles.badge(getBadgeColor(r.caution))}>{getBadgeLabel(r.caution)}</span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div style={styles.warn}>
              <span style={styles.warnIcon}>⚠</span>
              <div style={styles.warnText}>
                <strong>Torque correction required:</strong> Anti-seize compounds change the K-factor (nut factor). Standard torque values assume dry or slightly oily conditions. When using anti-seize, reduce torque by 20–25% (copper) or per manufacturer TDS. Verify with Torque Chart or Torque Calculator.
              </div>
            </div>
          </>
        )}

        {/* Tab 3: Application Guide */}
        {activeTab === 3 && (
          <>
            <div style={styles.infoBox}>
              <p style={styles.infoText}>
                Recommended material, coating, and lubricant combinations by service temperature and environment.
                Always confirm with applicable codes (ASME, AISC, customer spec) for regulated applications.
              </p>
            </div>
            {appGuide.map((app, i) => (
              <div key={app.app} style={{ ...styles.card, borderLeft: `4px solid ${app.flag === "green" ? "#059669" : app.flag === "yellow" ? "#D97706" : app.flag === "red" ? "#DC2626" : "#2563EB"}` }}>
                <div style={{ padding: "10px 12px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                    <span style={{ fontSize: 16 }}>{app.icon}</span>
                    <span style={{ fontWeight: 700, fontSize: 13, color: "#1B3A6B" }}>{app.app}</span>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4px 12px" }}>
                    <div>
                      <div style={{ fontSize: 10, color: "#94A3B8", fontWeight: 600, textTransform: "uppercase" }}>Material</div>
                      <div style={{ fontSize: 12, color: "#1E293B" }}>{app.mat}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: 10, color: "#94A3B8", fontWeight: 600, textTransform: "uppercase" }}>Coating</div>
                      <div style={{ fontSize: 12, color: "#1E293B" }}>{app.coat}</div>
                    </div>
                    <div style={{ gridColumn: "1 / -1", marginTop: 4 }}>
                      <div style={{ fontSize: 10, color: "#94A3B8", fontWeight: 600, textTransform: "uppercase" }}>Lubrication</div>
                      <div style={{ fontSize: 12, color: "#1E293B" }}>{app.lub}</div>
                    </div>
                    <div style={{ gridColumn: "1 / -1", marginTop: 4 }}>
                      <div style={{ fontSize: 10, color: "#94A3B8", fontWeight: 600, textTransform: "uppercase" }}>Typical Spec</div>
                      <div style={{ fontSize: 12, color: "#2563EB", fontWeight: 600 }}>{app.rec}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}

        {/* Tab 4: Quick Lookup */}
        {activeTab === 4 && (
          <>
            <div style={styles.sectionTitle}>Common Thresholds — Quick Reference</div>
            <div style={styles.card}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>Threshold / Rule</th>
                    <th style={{ ...styles.thCenter, width: 110 }}>Temperature</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { rule: "Zinc coating service limit (all types)", f: "400°F", c: "204°C", note: "Applies to electroplate, HDG, mechanical galvanizing" },
                    { rule: "Loctite 243/263 max service temp", f: "300°F", c: "149°C", note: "Above this, standard threadlockers fail" },
                    { rule: "Carbon steel lower ductile limit", f: "−20°F", c: "−29°C", note: "Impact test required below this for most specs" },
                    { rule: "Gr.8/A490/10.9 strength retention limit", f: "450°F", c: "232°C", note: "Tempering temperature concern; confirm with mill cert" },
                    { rule: "304 SS sensitization range (avoid sustained)", f: "800–1650°F", c: "427–899°C", note: "Chromium carbide precipitation reduces corrosion resistance" },
                    { rule: "A193 B7 continuous service limit", f: "700°F", c: "371°C", note: "Primary stud material for elevated temp flanges" },
                    { rule: "Copper anti-seize upper limit", f: "1800°F", c: "982°C", note: "Most common high-temp anti-seize choice" },
                    { rule: "Moly (MoS₂) anti-seize upper limit", f: "750°F", c: "399°C", note: "Standard field anti-seize; switch to copper above this" },
                    { rule: "Nylon patch (prevailing torque) limit", f: "250°F", c: "121°C", note: "NEVER use in high-temp or autoclave service" },
                    { rule: "PTFE thread tape service limit", f: "500°F", c: "260°C", note: "Fumes toxic above this if burned" },
                    { rule: "Black oxide / phosphate service limit", f: "300°F", c: "149°C", note: "Minimal corrosion protection coating types" },
                    { rule: "Cryogenic service threshold (common def.)", f: "−150°F", c: "−101°C", note: "Below this, specialized alloys and testing required" },
                    { rule: "A193 B8/B8M useful lower limit", f: "−325°F", c: "−198°C", note: "Austenitic SS, no ductile-brittle transition" },
                    { rule: "Inconel 625 lower service limit", f: "−423°F", c: "−252°C", note: "Near liquid hydrogen; aerospace/cryogenic vessels" },
                  ].map((r, i) => (
                    <tr key={r.rule} style={i % 2 === 0 ? {} : { background: "#F8FAFC" }}>
                      <td style={{ ...styles.td, background: "inherit" }}>
                        <div style={{ fontSize: 12 }}>{r.rule}</div>
                        <div style={{ fontSize: 10, color: "#94A3B8", marginTop: 2 }}>{r.note}</div>
                      </td>
                      <td style={{ ...styles.tdCenter, background: "inherit", fontWeight: 700, fontSize: 12 }}>
                        {unit === "F" ? r.f : r.c}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div style={styles.sectionTitle}>8.8 ≠ Grade 8 — Temperature Reminder</div>
            <div style={{ ...styles.infoBox, background: "#FFF7ED", borderColor: "#FED7AA" }}>
              <p style={{ ...styles.infoText, color: "#92400E" }}>
                <strong>Metric 8.8</strong> (ISO 898-1, ~120 ksi) ≈ Grade 5 (SAE J429). <strong>Grade 8</strong> (SAE J429, 150 ksi) ≈ Metric <strong>10.9</strong>.
                This affects temperature limits: Grade 8 / 10.9 have a ~450°F strength retention concern that does not apply to 8.8 / Grade 5.
                Flag this everywhere high-strength bolts are used in elevated temperature service.
              </p>
            </div>
          </>
        )}

        {/* Universal disclaimer */}
        <div style={styles.warn}>
          <span style={styles.warnIcon}>⚠</span>
          <div style={styles.warnText}>
            <strong>Verify Before Use.</strong> Temperature ratings shown are general service guidelines compiled from published standards and manufacturer data. Actual limits depend on load, cycle frequency, chemical exposure, and application-specific requirements. Always consult current ASTM, ASME, and manufacturer documentation for engineered applications. This tool is a reference guide only.
          </div>
        </div>
      </div>
    </div>
  );
}
