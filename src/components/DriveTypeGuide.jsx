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
  table: { width: "100%", borderCollapse: "collapse", fontSize: 12 },
  th: { background: "#1B3A6B", color: "#fff", padding: "6px 8px", textAlign: "left", fontSize: 11, fontWeight: 700 },
  thC: { background: "#1B3A6B", color: "#fff", padding: "6px 6px", textAlign: "center", fontSize: 11, fontWeight: 700 },
  td: { padding: "7px 8px", borderBottom: "1px solid #E2E8F0", verticalAlign: "top", color: "#1E293B" },
  tdC: { padding: "7px 6px", borderBottom: "1px solid #E2E8F0", textAlign: "center", verticalAlign: "top", color: "#1E293B" },
  warn: { background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: 8, padding: "10px 12px", marginTop: 10, marginBottom: 4, display: "flex", gap: 8, alignItems: "flex-start" },
  warnT: { fontSize: 11, color: "#991B1B", lineHeight: 1.5 },
  info: { background: "#EFF6FF", border: "1px solid #BFDBFE", borderRadius: 8, padding: "10px 12px", marginBottom: 10 },
  infoT: { fontSize: 11, color: "#1E40AF", lineHeight: 1.6, margin: 0 },
  search: { width: "100%", boxSizing: "border-box", padding: "8px 10px", border: "1px solid #E2E8F0", borderRadius: 8, fontSize: 13, marginBottom: 10, outline: "none" },
  secTitle: { fontSize: 13, fontWeight: 700, color: "#1B3A6B", marginBottom: 8, marginTop: 4, textTransform: "uppercase", letterSpacing: 0.5 },
  badge: { display: "inline-block", padding: "2px 8px", borderRadius: 10, fontSize: 10, fontWeight: 700 },
};

const badge = (color, text) => {
  const styles = {
    green: { background: "#D1FAE5", color: "#065F46" },
    yellow: { background: "#FEF3C7", color: "#92400E" },
    red: { background: "#FEE2E2", color: "#991B1B" },
    blue: { background: "#DBEAFE", color: "#1E40AF" },
    gray: { background: "#F1F5F9", color: "#475569" },
    amber: { background: "#FFF8E7", color: "#92400E" },
  };
  return <span style={{ ...S.badge, ...(styles[color] || styles.gray) }}>{text}</span>;
};

// Drive shapes with ASCII representation and details
const driveTypes = [
  // Standard drives
  {
    group: "Standard Drives",
    name: "Phillips (PH)",
    iso: "ISO 8764-1 Type H",
    asme: "ASME B18.6.3",
    bits: "PH0, PH1, PH2, PH3",
    camOut: "Yes — by design",
    torque: "Low-medium",
    recess: "#1: M2–M4\n#2: M5–M8 ★\n#3: M8–M12",
    uses: "Sheet metal, light assembly, consumer electronics, automotive trim",
    pros: "Universal availability; self-centering; very fast installation",
    cons: "Cam-out at moderate torque; bit wear; strip-out common",
    security: "None",
    star: true,
  },
  {
    group: "Standard Drives",
    name: "Slotted (SL)",
    iso: "ISO 2380-1",
    asme: "ASME B18.6.3",
    bits: "Flat blade — varies by width/thickness",
    camOut: "Yes",
    torque: "Low",
    recess: "Varies by screw OD",
    uses: "Electrical terminals, legacy equipment, clamps, set screws",
    pros: "Universal; works with improvised tools; low-cost production",
    cons: "Low torque capacity; slips easily; poor power tool compatibility",
    security: "None",
    star: false,
  },
  {
    group: "Standard Drives",
    name: "Combination Phillips/Slotted",
    iso: "—",
    asme: "ASME B18.6.3",
    bits: "PH2 or flat blade",
    camOut: "Yes",
    torque: "Low-medium",
    recess: "#2 most common",
    uses: "General hardware, woodworking, consumer products",
    pros: "Two-tool compatibility; widely stocked",
    cons: "Phillips performance limitations still apply",
    security: "None",
    star: false,
  },
  {
    group: "Standard Drives",
    name: "Square / Robertson (SQ)",
    iso: "ISO 8764-1 Type Z (approx.)",
    asme: "—",
    bits: "SQ0, SQ1, SQ2 ★, SQ3",
    camOut: "Minimal",
    torque: "Medium-high",
    recess: "#1: #6–#10\n#2: #8–#14 ★\n#3: 5/16\"–3/8\"",
    uses: "Woodworking, decking, framing, Canadian/industrial construction",
    pros: "No cam-out; excellent power tool performance; self-holding bit",
    cons: "Less common in non-construction environments; not universal",
    security: "None",
    star: true,
  },
  {
    group: "Standard Drives",
    name: "Torx® / 6-Lobe Star (TX)",
    iso: "ISO 10664",
    asme: "—",
    bits: "T6–T100 (T20, T25, T27, T30 ★ most common)",
    camOut: "Essentially none",
    torque: "High",
    recess: "T6–T100 per size; T20=M3–M4, T25=M5, T30=M6–M8 ★",
    uses: "Automotive, machinery, electronics, structural, modern assembly",
    pros: "Highest torque transfer; minimal cam-out; excellent power tool life",
    cons: "Less universal than Phillips; branded (Acument Global Technologies)",
    security: "Standard = none; Torx Plus and TR versions add tamper resistance",
    star: true,
  },
  {
    group: "Standard Drives",
    name: "Torx Plus® (IP / TP)",
    iso: "ISO 10664 variant",
    asme: "—",
    bits: "IP5–IP100 (not interchangeable with TX)",
    camOut: "None",
    torque: "Very high",
    recess: "IP6 for M3, IP40 for M8+",
    uses: "High-torque industrial, aerospace, automotive engines",
    pros: "Even higher torque transfer than TX; extended bit life",
    cons: "Dedicated tooling required; not field-friendly",
    security: "None standard; TR variant adds tamper pin",
    star: false,
  },
  {
    group: "Standard Drives",
    name: "Hex Socket / Allen (HEX / IM)",
    iso: "ISO 10642 / DIN 912",
    asme: "ASME B18.3",
    bits: "Hex key (L-key) or bit; SAE: 5/64\"–3/4\" · Metric: 1.5mm–19mm ★",
    camOut: "None",
    torque: "Very high",
    recess: "M3=2.5mm, M4=3mm, M5=4mm ★, M6=5mm ★, M8=6mm ★, M10=8mm, M12=10mm",
    uses: "SHCS (cap screws), set screws, precision machinery, bicycles, industrial",
    pros: "Very high torque; no cam-out; compact head; SAE and metric standards",
    cons: "Requires exact size; rounded-out if worn; L-keys awkward in tight spaces",
    security: "None standard",
    star: true,
  },
  {
    group: "Standard Drives",
    name: "Hex External (wrenching / bolt head)",
    iso: "ISO 4014 / DIN 931",
    asme: "ASME B18.2.1",
    bits: "Open-end, box, socket wrench (SAE or Metric)",
    camOut: "No",
    torque: "Highest",
    recess: "N/A — external drive",
    uses: "Standard hex bolts, nuts — most common structural fastener drive form",
    pros: "Maximum torque; standard across all industries; easy inspection",
    cons: "Requires clearance for wrench swing; not recessed",
    security: "None",
    star: true,
  },
  {
    group: "Standard Drives",
    name: "Pozidriv (PZ)",
    iso: "ISO 8764-1 Type Z",
    asme: "—",
    bits: "PZ0, PZ1, PZ2 ★, PZ3",
    camOut: "Less than Phillips",
    torque: "Medium",
    recess: "#2: M4–M8 most common ★",
    uses: "European woodworking, furniture, electrical, UK/EU market",
    pros: "Better cam-out resistance than Phillips; higher torque than Phillips",
    cons: "PZ and PH bits are NOT fully interchangeable; visual ID needed",
    security: "None",
    star: false,
  },
  {
    group: "Standard Drives",
    name: "Tri-Wing",
    iso: "—",
    asme: "—",
    bits: "TW1–TW4 (dedicated tools only)",
    camOut: "Low",
    torque: "Medium",
    recess: "TW1–TW4",
    uses: "Consumer electronics (game consoles, cameras), some aerospace",
    pros: "Tamper-deterrent without full security classification; decent torque",
    cons: "Dedicated tools required; not common in industrial supply",
    security: "Semi-tamper (hard to find tools, not impossible)",
    star: false,
  },
  // Security / Tamper-Resistant
  {
    group: "Security / Tamper-Resistant",
    name: "Torx Tamper-Resistant (TR / T-Star+pin)",
    iso: "ISO 10664 + pin",
    asme: "—",
    bits: "TR6–TR100 (T-pin bits required; standard Torx does NOT fit)",
    camOut: "None",
    torque: "High",
    recess: "Same as TX but center post blocks standard bits",
    uses: "Public infrastructure, ATMs, utility boxes, vandal-resistant panels",
    pros: "Excellent torque; widely used tamper-resistant standard; available bits",
    cons: "TR bits are accessible to determined users; not high-security",
    security: "★★★ Moderate",
    star: true,
  },
  {
    group: "Security / Tamper-Resistant",
    name: "One-Way / Clutch Head",
    iso: "—",
    asme: "—",
    bits: "Slots drive on install; freewheels on removal",
    camOut: "N/A",
    torque: "Low",
    recess: "Varies",
    uses: "Hinges, public restrooms, vehicle plates — permanent-only attachment",
    pros: "Cannot be removed with standard tools; simple and cheap",
    cons: "One use only; no torque control; difficult legitimate maintenance",
    security: "★★★★ High (removal requires destruction or extraction tools)",
    star: false,
  },
  {
    group: "Security / Tamper-Resistant",
    name: "Pin-In Hex (Hex with center pin)",
    iso: "—",
    asme: "—",
    bits: "Dedicated pin-in hex (spanner hex) bits required",
    camOut: "None",
    torque: "High",
    recess: "M3–M12 range; 5/64\"–3/8\" SAE",
    uses: "High-security panels, electronics enclosures, public fixtures",
    pros: "Torx-level torque; standard hex key blocked by pin",
    cons: "Dedicated bits; not universal",
    security: "★★★ Moderate",
    star: false,
  },
  {
    group: "Security / Tamper-Resistant",
    name: "Spanner / Snake-Eye (2-hole)",
    iso: "—",
    asme: "—",
    bits: "Spanner bits (2-prong) required",
    camOut: "Low",
    torque: "Low-medium",
    recess: "Various; matched by OD and pin spacing",
    uses: "Elevator buttons, public furniture, electrical boxes, bathroom fixtures",
    pros: "Very effective against common tools; simple design",
    cons: "Bits widely available online; lower torque capacity",
    security: "★★★ Moderate",
    star: false,
  },
  {
    group: "Security / Tamper-Resistant",
    name: "Pin-In Torx Tamper-Resistant (TP)",
    iso: "—",
    asme: "—",
    bits: "TP/IP-TR dedicated bits",
    camOut: "None",
    torque: "Very high",
    recess: "TP5–TP40",
    uses: "Critical infrastructure, electronics OEM, defense",
    pros: "Highest torque + tamper combination; very difficult to defeat",
    cons: "Highly specialized tooling; expensive",
    security: "★★★★★ Very High",
    star: false,
  },
  {
    group: "Security / Tamper-Resistant",
    name: "Bristol / 6-Lobe Spline",
    iso: "—",
    asme: "—",
    bits: "Bristol spline drivers (uncommon)",
    camOut: "None",
    torque: "Medium-high",
    recess: "0.048\"–0.250\" range",
    uses: "Aerospace, scientific instruments, optical equipment",
    pros: "High torque; obscure enough to deter casual tampering",
    cons: "Very specialized; niche supply chain",
    security: "★★★ Moderate",
    star: false,
  },
  // Specialty
  {
    group: "Specialty",
    name: "12-Point / Double Hex (HX12)",
    iso: "DIN 7984 variant",
    asme: "ASME B18.3",
    bits: "12-pt socket required; standard hex keys do NOT fit",
    camOut: "None",
    torque: "High",
    recess: "M4–M12 most common",
    uses: "Engine fasteners, aerospace, tight-clearance structural",
    pros: "High torque; more engagement angles than hex; tighter socket fit",
    cons: "Requires 12-pt socket; less field-friendly",
    security: "None",
    star: false,
  },
  {
    group: "Specialty",
    name: "Flange Hex / Serrated Flange",
    iso: "ISO 4161 / DIN 6921",
    asme: "—",
    bits: "Standard hex socket/wrench (same as hex bolt)",
    camOut: "No",
    torque: "High",
    recess: "N/A — external",
    uses: "Automotive, HVAC, vibration environments, thinwall sections",
    pros: "Integrated washer function; distributes load; vibration resistance",
    cons: "Not interchangeable with standard hex where flange creates interference",
    security: "None",
    star: false,
  },
  {
    group: "Specialty",
    name: "PoziSquare / PZ+SQ Combo",
    iso: "—",
    asme: "—",
    bits: "PZ2 or SQ2 both fit",
    camOut: "Low",
    torque: "Medium",
    recess: "#2 most common",
    uses: "Decking, construction — works with both PZ and SQ bits",
    pros: "Field flexibility with two common bit types",
    cons: "Not as strong as dedicated square or Torx",
    security: "None",
    star: false,
  },
];

const GROUPS = [...new Set(driveTypes.map(d => d.group))];
const TABS = ["All Drive Types", "By Group", "Bit Selection", "Security Guide"];

export default function DriveTypeGuide() {
  const [activeTab, setActiveTab] = useState(0);
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState(null);

  const filtered = driveTypes.filter(d =>
    !search || d.name.toLowerCase().includes(search.toLowerCase()) ||
    d.uses.toLowerCase().includes(search.toLowerCase()) ||
    d.bits.toLowerCase().includes(search.toLowerCase())
  );

  const secLevel = (s) => {
    if (!s || s === "None") return badge("gray", "None");
    if (s.includes("★★★★★")) return badge("red", "Very High");
    if (s.includes("★★★★")) return badge("red", "High");
    if (s.includes("★★★")) return badge("yellow", "Moderate");
    return badge("blue", "Low");
  };

  const torqueColor = (t) => {
    if (!t) return "gray";
    if (t.toLowerCase().includes("very high") || t.toLowerCase().includes("highest")) return "green";
    if (t.toLowerCase().includes("high")) return "blue";
    if (t.toLowerCase().includes("medium")) return "yellow";
    return "gray";
  };

  const DriveCard = ({ d, i }) => (
    <div style={{ ...S.card, borderLeft: `4px solid ${d.star ? "#F6AD55" : d.group === "Security / Tamper-Resistant" ? "#DC2626" : "#1B3A6B"}`, marginBottom: 8 }}>
      <div
        style={{ padding: "10px 12px", cursor: "pointer" }}
        onClick={() => setExpanded(expanded === d.name ? null : d.name)}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <div style={{ fontWeight: 700, fontSize: 13, color: "#1B3A6B" }}>
              {d.star && <span style={{ color: "#F6AD55", marginRight: 4 }}>★</span>}
              {d.name}
            </div>
            <div style={{ fontSize: 11, color: "#94A3B8", marginTop: 2 }}>{d.iso}</div>
          </div>
          <div style={{ display: "flex", gap: 4, flexDirection: "column", alignItems: "flex-end" }}>
            {badge(torqueColor(d.torque), d.torque)}
            {secLevel(d.security)}
          </div>
        </div>
        <div style={{ fontSize: 11, color: "#475569", marginTop: 6, lineHeight: 1.4 }}>{d.uses}</div>
        <div style={{ fontSize: 10, color: "#F6AD55", marginTop: 4, fontWeight: 600 }}>{expanded === d.name ? "▲ Less" : "▼ More"}</div>
      </div>
      {expanded === d.name && (
        <div style={{ borderTop: "1px solid #E2E8F0", padding: "10px 12px", background: "#F8FAFC" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px 12px", marginBottom: 8 }}>
            <div>
              <div style={{ fontSize: 10, color: "#94A3B8", fontWeight: 700, textTransform: "uppercase" }}>Bit / Driver</div>
              <div style={{ fontSize: 11, color: "#1E293B", whiteSpace: "pre-line" }}>{d.bits}</div>
            </div>
            <div>
              <div style={{ fontSize: 10, color: "#94A3B8", fontWeight: 700, textTransform: "uppercase" }}>Recess Size Guide</div>
              <div style={{ fontSize: 11, color: "#1E293B", whiteSpace: "pre-line" }}>{d.recess}</div>
            </div>
            <div>
              <div style={{ fontSize: 10, color: "#94A3B8", fontWeight: 700, textTransform: "uppercase" }}>Cam-Out</div>
              <div style={{ fontSize: 11, color: d.camOut === "None" || d.camOut === "Essentially none" ? "#059669" : d.camOut === "Yes — by design" ? "#DC2626" : "#D97706" }}>{d.camOut}</div>
            </div>
            <div>
              <div style={{ fontSize: 10, color: "#94A3B8", fontWeight: 700, textTransform: "uppercase" }}>Standard</div>
              <div style={{ fontSize: 11, color: "#1E293B" }}>{d.asme || d.iso}</div>
            </div>
          </div>
          <div style={{ marginBottom: 6 }}>
            <div style={{ fontSize: 10, color: "#94A3B8", fontWeight: 700, textTransform: "uppercase", marginBottom: 2 }}>Advantages</div>
            <div style={{ fontSize: 11, color: "#059669" }}>{d.pros}</div>
          </div>
          <div style={{ marginBottom: 6 }}>
            <div style={{ fontSize: 10, color: "#94A3B8", fontWeight: 700, textTransform: "uppercase", marginBottom: 2 }}>Limitations</div>
            <div style={{ fontSize: 11, color: "#DC2626" }}>{d.cons}</div>
          </div>
          <div>
            <div style={{ fontSize: 10, color: "#94A3B8", fontWeight: 700, textTransform: "uppercase", marginBottom: 2 }}>Security Level</div>
            <div style={{ fontSize: 11, color: "#1E293B" }}>{d.security}</div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div style={S.container}>
      <div style={S.header}>
        <div style={S.headerTop}>
          <span style={S.logo}>⬡</span>
          <span style={S.appName}>Fastener Companion</span>
        </div>
        <div style={S.title}>Drive Type & Security Fastener Guide</div>
        <div style={S.subtitle}>All Drive Types · Tamper-Resistant · Bit Compatibility</div>
        <div style={S.src}>Sources: ASME B18.3, B18.6.3 · ISO 8764-1, 10664, 4014 · DIN 912, 931, 934 · IFI 7th Ed. · Acument Global Technologies · Textron Fastening Systems</div>
      </div>

      <div style={S.tabBar}>
        {TABS.map((t, i) => (
          <button key={t} style={{ ...S.tab, ...(activeTab === i ? S.activeTab : {}) }} onClick={() => { setActiveTab(i); setSearch(""); setExpanded(null); }}>{t}</button>
        ))}
      </div>

      <div style={S.content}>

        {activeTab === 0 && (
          <>
            <div style={S.info}>
              <p style={S.infoT}>★ marks most common drive types. Tap any card to expand details. Torque rating and cam-out resistance are key selection factors.</p>
            </div>
            <input style={S.search} placeholder="Search drive type, use, or bit..." value={search} onChange={e => setSearch(e.target.value)} />
            {filtered.map((d, i) => <DriveCard key={d.name} d={d} i={i} />)}
            {filtered.length === 0 && <div style={{ textAlign: "center", color: "#94A3B8", padding: 20 }}>No results.</div>}
          </>
        )}

        {activeTab === 1 && (
          <>
            {GROUPS.map(group => (
              <div key={group}>
                <div style={S.secTitle}>{group}</div>
                {driveTypes.filter(d => d.group === group).map((d, i) => <DriveCard key={d.name} d={d} i={i} />)}
              </div>
            ))}
          </>
        )}

        {activeTab === 2 && (
          <>
            <div style={S.secTitle}>Hex Key (Allen) — Metric</div>
            <div style={S.card}>
              <table style={S.table}>
                <thead>
                  <tr>
                    <th style={S.th}>Screw Size</th>
                    <th style={S.thC}>Hex Key</th>
                    <th style={S.thC}>SHCS Head ⌀</th>
                    <th style={S.thC}>Set Screw</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { sz: "M2", key: "1.5mm", head: "3.8mm", ss: "1.5mm" },
                    { sz: "M2.5", key: "2mm", head: "4.5mm", ss: "1.5mm" },
                    { sz: "M3", key: "2.5mm ★", head: "5.5mm", ss: "2mm" },
                    { sz: "M4", key: "3mm ★", head: "7mm", ss: "2.5mm" },
                    { sz: "M5", key: "4mm ★", head: "8.5mm", ss: "3mm" },
                    { sz: "M6", key: "5mm ★", head: "10mm", ss: "4mm" },
                    { sz: "M8", key: "6mm ★", head: "13mm", ss: "5mm" },
                    { sz: "M10", key: "8mm ★", head: "16mm", ss: "6mm" },
                    { sz: "M12", key: "10mm ★", head: "18mm", ss: "8mm" },
                    { sz: "M14", key: "12mm", head: "21mm", ss: "10mm" },
                    { sz: "M16", key: "14mm", head: "24mm", ss: "12mm" },
                    { sz: "M20", key: "17mm", head: "30mm", ss: "14mm" },
                    { sz: "M24", key: "19mm", head: "36mm", ss: "17mm" },
                  ].map((r, i) => (
                    <tr key={r.sz} style={r.key.includes("★") ? { background: "#FFF8E7", borderBottom: "1px solid #FDE68A" } : i % 2 === 0 ? {} : { background: "#F8FAFC" }}>
                      <td style={{ ...S.td, fontWeight: r.key.includes("★") ? 700 : 400, background: "inherit" }}>{r.sz}</td>
                      <td style={{ ...S.tdC, fontWeight: 700, background: "inherit" }}>{r.key}</td>
                      <td style={{ ...S.tdC, background: "inherit" }}>{r.head}</td>
                      <td style={{ ...S.tdC, background: "inherit" }}>{r.ss}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div style={S.secTitle}>Hex Key (Allen) — SAE Imperial</div>
            <div style={S.card}>
              <table style={S.table}>
                <thead>
                  <tr>
                    <th style={S.th}>Screw Size</th>
                    <th style={S.thC}>Hex Key</th>
                    <th style={S.thC}>SHCS Head ⌀</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { sz: "#4 (0.112\")", key: "5/64\"", head: "7/32\"" },
                    { sz: "#5 (0.125\")", key: "3/32\"", head: "1/4\"" },
                    { sz: "#6 (0.138\")", key: "7/64\"", head: "9/32\"" },
                    { sz: "#8 (0.164\")", key: "9/64\" ★", head: "5/16\"" },
                    { sz: "#10 (0.190\")", key: "5/32\" ★", head: "3/8\"" },
                    { sz: "1/4\"", key: "3/16\" ★", head: "7/16\"" },
                    { sz: "5/16\"", key: "1/4\" ★", head: "9/16\"" },
                    { sz: "3/8\"", key: "5/16\" ★", head: "5/8\"" },
                    { sz: "7/16\"", key: "3/8\"", head: "3/4\"" },
                    { sz: "1/2\"", key: "3/8\" ★", head: "7/8\"" },
                    { sz: "5/8\"", key: "1/2\"", head: "1-1/16\"" },
                    { sz: "3/4\"", key: "5/8\"", head: "1-1/4\"" },
                  ].map((r, i) => (
                    <tr key={r.sz} style={r.key.includes("★") ? { background: "#FFF8E7", borderBottom: "1px solid #FDE68A" } : i % 2 === 0 ? {} : { background: "#F8FAFC" }}>
                      <td style={{ ...S.td, fontWeight: r.key.includes("★") ? 700 : 400, background: "inherit" }}>{r.sz}</td>
                      <td style={{ ...S.tdC, fontWeight: 700, background: "inherit" }}>{r.key}</td>
                      <td style={{ ...S.tdC, background: "inherit" }}>{r.head}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div style={S.secTitle}>Torx (TX) Size Reference</div>
            <div style={S.card}>
              <table style={S.table}>
                <thead>
                  <tr>
                    <th style={S.th}>Torx Size</th>
                    <th style={S.thC}>Screw Size (approx.)</th>
                    <th style={S.thC}>Across Flats</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { tx: "T6", sz: "M1.6 / #1", af: "2.57mm" },
                    { tx: "T8", sz: "M2 / #2", af: "3.35mm" },
                    { tx: "T10", sz: "M2.5 / #4", af: "3.99mm" },
                    { tx: "T15", sz: "M3 / #6", af: "4.64mm" },
                    { tx: "T20 ★", sz: "M4 / #8–10", af: "5.58mm" },
                    { tx: "T25 ★", sz: "M5 / 1/4\"", af: "6.35mm" },
                    { tx: "T27 ★", sz: "M5–M6", af: "7.11mm" },
                    { tx: "T30 ★", sz: "M6 / 5/16\"", af: "8.13mm" },
                    { tx: "T40 ★", sz: "M8 / 3/8\"", af: "9.90mm" },
                    { tx: "T45", sz: "M10 / 7/16\"", af: "11.43mm" },
                    { tx: "T50", sz: "M10–M12 / 1/2\"", af: "12.70mm" },
                    { tx: "T55", sz: "M12", af: "13.97mm" },
                  ].map((r, i) => (
                    <tr key={r.tx} style={r.tx.includes("★") ? { background: "#FFF8E7", borderBottom: "1px solid #FDE68A" } : i % 2 === 0 ? {} : { background: "#F8FAFC" }}>
                      <td style={{ ...S.td, fontWeight: 700, background: "inherit" }}>{r.tx}</td>
                      <td style={{ ...S.tdC, background: "inherit" }}>{r.sz}</td>
                      <td style={{ ...S.tdC, background: "inherit" }}>{r.af}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div style={S.secTitle}>Phillips Recess Size Reference</div>
            <div style={S.card}>
              <table style={S.table}>
                <thead>
                  <tr>
                    <th style={S.th}>Phillips Size</th>
                    <th style={S.th}>Screw Sizes</th>
                    <th style={S.thC}>Bit Code</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { ph: "PH0", sz: "#1–#3 / M1.6–M2", bit: "PH0" },
                    { ph: "PH1", sz: "#4–#6 / M2.5–M3", bit: "PH1", star: true },
                    { ph: "PH2 ★", sz: "#6–#16 / M3.5–M8", bit: "PH2", star: true },
                    { ph: "PH3", sz: "#14 and up / M8–M12", bit: "PH3" },
                    { ph: "PH4", sz: "Rare — very large", bit: "PH4" },
                  ].map((r, i) => (
                    <tr key={r.ph} style={r.ph.includes("★") ? { background: "#FFF8E7", borderBottom: "1px solid #FDE68A" } : i % 2 === 0 ? {} : { background: "#F8FAFC" }}>
                      <td style={{ ...S.td, fontWeight: 700, background: "inherit" }}>{r.ph}</td>
                      <td style={{ ...S.td, background: "inherit" }}>{r.sz}</td>
                      <td style={{ ...S.tdC, fontWeight: 700, background: "inherit" }}>{r.bit}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {activeTab === 3 && (
          <>
            <div style={S.info}>
              <p style={S.infoT}>Security fasteners deter tampering rather than prevent it. The goal is to raise the effort required to defeat the fastener above what a casual or opportunistic intruder will bother with. No fastener drive is absolutely tamper-proof.</p>
            </div>

            <div style={S.secTitle}>Security Level Comparison</div>
            <div style={S.card}>
              <table style={S.table}>
                <thead>
                  <tr>
                    <th style={S.th}>Drive Type</th>
                    <th style={S.thC}>Security</th>
                    <th style={S.thC}>Torque</th>
                    <th style={S.thC}>Tool Availability</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: "One-Way / Clutch", sec: "High", torque: "Low", tool: "Rare", secC: "red" },
                    { name: "Pin-In Torx Plus", sec: "Very High", torque: "Very High", tool: "Specialty only", secC: "red" },
                    { name: "Torx TR (tamper-resistant)", sec: "Moderate", torque: "High", tool: "Specialty stores", secC: "yellow" },
                    { name: "Pin-In Hex", sec: "Moderate", torque: "High", tool: "Specialty stores", secC: "yellow" },
                    { name: "Spanner / Snake-Eye", sec: "Moderate", torque: "Low-Med", tool: "Online easily", secC: "yellow" },
                    { name: "Bristol / Spline", sec: "Moderate", torque: "Med-High", tool: "Specialty", secC: "yellow" },
                    { name: "Tri-Wing", sec: "Low-Moderate", torque: "Medium", tool: "Online easily", secC: "blue" },
                    { name: "Standard Phillips/Slotted", sec: "None", torque: "Low", tool: "Universal", secC: "gray" },
                    { name: "Standard Hex / Torx", sec: "None", torque: "High", tool: "Universal", secC: "gray" },
                  ].map((r, i) => (
                    <tr key={r.name} style={i % 2 === 0 ? {} : { background: "#F8FAFC" }}>
                      <td style={{ ...S.td, fontSize: 12 }}>{r.name}</td>
                      <td style={{ ...S.tdC }}>{badge(r.secC, r.sec)}</td>
                      <td style={{ ...S.tdC, fontSize: 11 }}>{r.torque}</td>
                      <td style={{ ...S.tdC, fontSize: 11 }}>{r.tool}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div style={S.secTitle}>Application Matching Guide</div>
            {[
              { app: "Public restrooms / fixtures", rec: "One-way screws, Spanner (snake-eye), Torx TR", why: "Need to deter casual removal; maintenance access required with proper tools" },
              { app: "Utility boxes / electrical panels", rec: "Torx TR, Pin-In Hex", why: "Balance tamper resistance with field serviceability" },
              { app: "ATMs / cash handling", rec: "Pin-In Torx Plus, custom proprietary", why: "High-security requirement; specialized teams handle maintenance" },
              { app: "Consumer electronics (OEM)", rec: "Tri-Wing, Torx TR, Pentalobe (Apple)", why: "Warranty protection; deter repair by untrained users" },
              { app: "Automotive exterior trim", rec: "Torx, Torx TR", why: "Good torque, minor tamper deterrence" },
              { app: "Critical infrastructure / defense", rec: "Pin-In Torx Plus, proprietary drives", why: "Maximum security; complete tooling control" },
              { app: "General industrial (no security need)", rec: "Torx (TX), Hex Socket, Square Robertson", why: "Best torque-to-cam-out ratio; fast assembly; bit life" },
            ].map((r, i) => (
              <div key={r.app} style={{ ...S.card, marginBottom: 8 }}>
                <div style={{ padding: "8px 12px" }}>
                  <div style={{ fontWeight: 700, fontSize: 12, color: "#1B3A6B", marginBottom: 3 }}>{r.app}</div>
                  <div style={{ fontSize: 11, color: "#2563EB", fontWeight: 600, marginBottom: 3 }}>Recommended: {r.rec}</div>
                  <div style={{ fontSize: 11, color: "#475569" }}>{r.why}</div>
                </div>
              </div>
            ))}

            <div style={S.warn}>
              <span style={{ fontSize: 14, marginTop: 1 }}>⚠</span>
              <div style={S.warnT}>
                <strong>Phillips vs Pozidriv:</strong> PZ (Pozidriv) and PH (Phillips) bits are NOT fully interchangeable despite looking similar. Using a PH bit in a PZ recess (or vice versa) causes cam-out and head damage. PZ recesses have a secondary cross marked at 45° to the primary slots — use this to identify them visually.
              </div>
            </div>
          </>
        )}

        <div style={S.warn}>
          <span style={{ fontSize: 14, marginTop: 1 }}>⚠</span>
          <div style={S.warnT}>
            <strong>Verify Before Use.</strong> Drive type compatibility, bit sizes, and recess dimensions should be verified against current ASME/ISO standards and manufacturer data for critical applications. Torx® is a registered trademark of Acument Global Technologies. This tool is a reference guide only.
          </div>
        </div>
      </div>
    </div>
  );
}
