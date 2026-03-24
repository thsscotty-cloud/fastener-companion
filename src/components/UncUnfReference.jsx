import { useState } from "react";

const NAVY  = "#1B3A6B";
const AMBER = "#F6AD55";
const BG    = "#F7F9FC";
const WHITE = "#FFFFFF";
const BORDER = "#E2E8F0";
const TEXT  = "#1E293B";
const MUTED = "#94A3B8";
const ROW_ALT = "#F8FAFC";
const STAR_BG = "#FFF8E7";

const S = {
  container: { fontFamily: "'DM Sans', 'Segoe UI', sans-serif", background: BG, minHeight: "100vh", maxWidth: 430, margin: "0 auto", paddingBottom: 80 },
  header: { background: "linear-gradient(135deg, #1B3A6B 0%, #2a5298 100%)", padding: "16px 16px 12px", color: WHITE },
  headerTop: { display: "flex", alignItems: "center", gap: 8, marginBottom: 2 },
  logo: { fontSize: 20 },
  appName: { fontSize: 12, opacity: 0.75, letterSpacing: 0.3 },
  title: { fontSize: 18, fontWeight: 700, margin: 0 },
  subtitle: { fontSize: 11, opacity: 0.7, marginTop: 2 },
  src: { fontSize: 10, opacity: 0.6, marginTop: 4 },
  tabBar: { display: "flex", overflowX: "auto", background: WHITE, borderBottom: `1px solid ${BORDER}`, scrollbarWidth: "none" },
  tab: { padding: "10px 13px", fontSize: 12, fontWeight: 600, whiteSpace: "nowrap", cursor: "pointer", border: "none", background: "transparent", color: MUTED, borderBottom: "3px solid transparent" },
  activeTab: { color: NAVY, borderBottom: `3px solid ${AMBER}` },
  content: { padding: "12px 12px 0" },
  card: { background: WHITE, borderRadius: 8, border: `1px solid ${BORDER}`, marginBottom: 10, overflow: "hidden" },
  table: { width: "100%", borderCollapse: "collapse", fontSize: 11 },
  th: { background: NAVY, color: WHITE, padding: "6px 7px", textAlign: "left", fontSize: 10, fontWeight: 700 },
  thC: { background: NAVY, color: WHITE, padding: "6px 5px", textAlign: "center", fontSize: 10, fontWeight: 700 },
  td: { padding: "6px 7px", borderBottom: `1px solid ${BORDER}`, verticalAlign: "top", fontSize: 11 },
  tdC: { padding: "6px 5px", borderBottom: `1px solid ${BORDER}`, textAlign: "center", fontSize: 11 },
  search: { width: "100%", boxSizing: "border-box", padding: "8px 10px", border: `1px solid ${BORDER}`, borderRadius: 8, fontSize: 13, marginBottom: 10, outline: "none" },
  info: { background: "#EFF6FF", border: "1px solid #BFDBFE", borderRadius: 8, padding: "10px 12px", marginBottom: 10 },
  infoT: { fontSize: 11, color: "#1E40AF", lineHeight: 1.6, margin: 0 },
  warn: { background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: 8, padding: "10px 12px", marginBottom: 4, display: "flex", gap: 8 },
  warnT: { fontSize: 11, color: "#991B1B", lineHeight: 1.5 },
  secTitle: { fontSize: 12, fontWeight: 700, color: NAVY, marginBottom: 6, marginTop: 8, textTransform: "uppercase", letterSpacing: 0.5 },
  starRow: { background: STAR_BG },
};

// UNC — Unified National Coarse
// columns: size, tpi, nomDia (in), pitch (mm), class2A_maj_min, tap_drill
const UNC = [
  { size: "#0",    tpi: 80,  dia: 0.0600, pitch: 0.318, tapDrill: "3/64",    common: false },
  { size: "#1",    tpi: 64,  dia: 0.0730, pitch: 0.397, tapDrill: "No.53",   common: false },
  { size: "#2",    tpi: 56,  dia: 0.0860, pitch: 0.454, tapDrill: "No.50",   common: false },
  { size: "#3",    tpi: 48,  dia: 0.0990, pitch: 0.529, tapDrill: "No.47",   common: false },
  { size: "#4",    tpi: 40,  dia: 0.1120, pitch: 0.635, tapDrill: "No.43",   common: false },
  { size: "#5",    tpi: 40,  dia: 0.1250, pitch: 0.635, tapDrill: "No.38",   common: false },
  { size: "#6",    tpi: 32,  dia: 0.1380, pitch: 0.794, tapDrill: "No.36",   common: true  },
  { size: "#8",    tpi: 32,  dia: 0.1640, pitch: 0.794, tapDrill: "No.29",   common: true  },
  { size: "#10",   tpi: 24,  dia: 0.1900, pitch: 1.058, tapDrill: "No.25",   common: true  },
  { size: "#12",   tpi: 24,  dia: 0.2160, pitch: 1.058, tapDrill: "No.16",   common: false },
  { size: "1/4",   tpi: 20,  dia: 0.2500, pitch: 1.270, tapDrill: "No.7",    common: true  },
  { size: "5/16",  tpi: 18,  dia: 0.3125, pitch: 1.411, tapDrill: "F",       common: true  },
  { size: "3/8",   tpi: 16,  dia: 0.3750, pitch: 1.588, tapDrill: "5/16",    common: true  },
  { size: "7/16",  tpi: 14,  dia: 0.4375, pitch: 1.814, tapDrill: "U",       common: false },
  { size: "1/2",   tpi: 13,  dia: 0.5000, pitch: 1.954, tapDrill: "27/64",   common: true  },
  { size: "9/16",  tpi: 12,  dia: 0.5625, pitch: 2.117, tapDrill: "31/64",   common: false },
  { size: "5/8",   tpi: 11,  dia: 0.6250, pitch: 2.309, tapDrill: "17/32",   common: true  },
  { size: "3/4",   tpi: 10,  dia: 0.7500, pitch: 2.540, tapDrill: "21/32",   common: true  },
  { size: "7/8",   tpi: 9,   dia: 0.8750, pitch: 2.822, tapDrill: "49/64",   common: false },
  { size: "1",     tpi: 8,   dia: 1.0000, pitch: 3.175, tapDrill: "7/8",     common: true  },
  { size: "1-1/8", tpi: 7,   dia: 1.1250, pitch: 3.629, tapDrill: "63/64",   common: false },
  { size: "1-1/4", tpi: 7,   dia: 1.2500, pitch: 3.629, tapDrill: "1-7/64",  common: false },
  { size: "1-3/8", tpi: 6,   dia: 1.3750, pitch: 4.233, tapDrill: "1-7/32",  common: false },
  { size: "1-1/2", tpi: 6,   dia: 1.5000, pitch: 4.233, tapDrill: "1-11/32", common: false },
  { size: "1-3/4", tpi: 5,   dia: 1.7500, pitch: 5.080, tapDrill: "1-9/16",  common: false },
  { size: "2",     tpi: 4.5, dia: 2.0000, pitch: 5.644, tapDrill: "1-25/32", common: false },
];

// UNF — Unified National Fine
const UNF = [
  { size: "#0",    tpi: 80,  dia: 0.0600, pitch: 0.318, tapDrill: "3/64",    common: false },
  { size: "#1",    tpi: 72,  dia: 0.0730, pitch: 0.353, tapDrill: "No.53",   common: false },
  { size: "#2",    tpi: 64,  dia: 0.0860, pitch: 0.397, tapDrill: "No.50",   common: false },
  { size: "#3",    tpi: 56,  dia: 0.0990, pitch: 0.454, tapDrill: "No.45",   common: false },
  { size: "#4",    tpi: 48,  dia: 0.1120, pitch: 0.529, tapDrill: "No.42",   common: false },
  { size: "#5",    tpi: 44,  dia: 0.1250, pitch: 0.577, tapDrill: "No.37",   common: false },
  { size: "#6",    tpi: 40,  dia: 0.1380, pitch: 0.635, tapDrill: "No.33",   common: false },
  { size: "#8",    tpi: 36,  dia: 0.1640, pitch: 0.706, tapDrill: "No.29",   common: false },
  { size: "#10",   tpi: 32,  dia: 0.1900, pitch: 0.794, tapDrill: "No.21",   common: true  },
  { size: "#12",   tpi: 28,  dia: 0.2160, pitch: 0.907, tapDrill: "No.14",   common: false },
  { size: "1/4",   tpi: 28,  dia: 0.2500, pitch: 0.907, tapDrill: "No.3",    common: true  },
  { size: "5/16",  tpi: 24,  dia: 0.3125, pitch: 1.058, tapDrill: "I",       common: true  },
  { size: "3/8",   tpi: 24,  dia: 0.3750, pitch: 1.058, tapDrill: "Q",       common: true  },
  { size: "7/16",  tpi: 20,  dia: 0.4375, pitch: 1.270, tapDrill: "25/64",   common: false },
  { size: "1/2",   tpi: 20,  dia: 0.5000, pitch: 1.270, tapDrill: "29/64",   common: true  },
  { size: "9/16",  tpi: 18,  dia: 0.5625, pitch: 1.411, tapDrill: "33/64",   common: false },
  { size: "5/8",   tpi: 18,  dia: 0.6250, pitch: 1.411, tapDrill: "37/64",   common: false },
  { size: "3/4",   tpi: 16,  dia: 0.7500, pitch: 1.588, tapDrill: "11/16",   common: true  },
  { size: "7/8",   tpi: 14,  dia: 0.8750, pitch: 1.814, tapDrill: "13/16",   common: false },
  { size: "1",     tpi: 12,  dia: 1.0000, pitch: 2.117, tapDrill: "59/64",   common: false },
  { size: "1-1/8", tpi: 12,  dia: 1.1250, pitch: 2.117, tapDrill: "1-3/64",  common: false },
  { size: "1-1/4", tpi: 12,  dia: 1.2500, pitch: 2.117, tapDrill: "1-11/64", common: false },
  { size: "1-3/8", tpi: 12,  dia: 1.3750, pitch: 2.117, tapDrill: "1-19/64", common: false },
  { size: "1-1/2", tpi: 12,  dia: 1.5000, pitch: 2.117, tapDrill: "1-27/64", common: false },
];

const TABS = ["UNC", "UNF", "Compare", "Quick Guide"];

export default function UncUnfReference() {
  const [tab, setTab] = useState(0);
  const [search, setSearch] = useState("");
  const [showCommon, setShowCommon] = useState(false);

  const filter = (rows) => {
    let r = showCommon ? rows.filter(r => r.common) : rows;
    if (search) r = r.filter(x => x.size.toLowerCase().includes(search.toLowerCase()) || String(x.tpi).includes(search));
    return r;
  };

  const ThreadTable = ({ rows }) => (
    <div style={{ overflowX: "auto", borderRadius: 8, border: `1px solid ${BORDER}`, marginBottom: 10 }}>
      <table style={S.table}>
        <thead>
          <tr>
            <th style={S.th}>Size</th>
            <th style={S.thC}>TPI</th>
            <th style={S.thC}>Nom. Dia (in)</th>
            <th style={S.thC}>Pitch (mm)</th>
            <th style={S.thC}>Tap Drill</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={r.size + i} style={r.common ? S.starRow : i % 2 === 0 ? {} : { background: ROW_ALT }}>
              <td style={{ ...S.td, fontWeight: r.common ? 700 : 500, color: r.common ? NAVY : TEXT }}>
                {r.common && <span style={{ color: AMBER, marginRight: 3 }}>★</span>}{r.size}
              </td>
              <td style={{ ...S.tdC, fontWeight: 700 }}>{r.tpi}</td>
              <td style={S.tdC}>{r.dia.toFixed(4)}</td>
              <td style={S.tdC}>{r.pitch.toFixed(3)}</td>
              <td style={{ ...S.tdC, fontWeight: 600, color: NAVY }}>{r.tapDrill}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div style={S.container}>
      <div style={S.header}>
        <div style={S.headerTop}>
          <span style={S.logo}>⬡</span>
          <span style={S.appName}>Fastener Companion</span>
        </div>
        <div style={S.title}>UNC / UNF Reference</div>
        <div style={S.subtitle}>Unified National Coarse & Fine Thread Series</div>
        <div style={S.src}>Sources: ASME B1.1 — Unified Inch Screw Threads · SAE J1515 · Machinery's Handbook</div>
      </div>

      <div style={S.tabBar}>
        {TABS.map((t, i) => (
          <button key={t} style={{ ...S.tab, ...(tab === i ? S.activeTab : {}) }} onClick={() => { setTab(i); setSearch(""); }}>{t}</button>
        ))}
      </div>

      <div style={S.content}>

        {(tab === 0 || tab === 1) && (
          <>
            <div style={S.info}>
              <p style={S.infoT}><strong>★ = Common sizes.</strong> TPI = Threads Per Inch. Tap drill sizes are for ~75% thread engagement — standard for most applications.</p>
            </div>
            <div style={{ display: "flex", gap: 8, marginBottom: 10, alignItems: "center" }}>
              <input style={{ ...S.search, marginBottom: 0, flex: 1 }} placeholder="Search size or TPI..." value={search} onChange={e => setSearch(e.target.value)} />
              <button onClick={() => setShowCommon(!showCommon)} style={{ padding: "7px 12px", borderRadius: 8, border: `1px solid ${showCommon ? NAVY : BORDER}`, background: showCommon ? NAVY : WHITE, color: showCommon ? WHITE : NAVY, fontSize: 12, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap" }}>
                {showCommon ? "★ Common" : "All Sizes"}
              </button>
            </div>
            <ThreadTable rows={filter(tab === 0 ? UNC : UNF)} />
          </>
        )}

        {tab === 2 && (
          <>
            <div style={S.info}>
              <p style={S.infoT}>Side-by-side comparison of UNC vs UNF for the same nominal diameter. UNF has more TPI = finer pitch = stronger in thin materials.</p>
            </div>
            <div style={{ overflowX: "auto", borderRadius: 8, border: `1px solid ${BORDER}`, marginBottom: 10 }}>
              <table style={S.table}>
                <thead>
                  <tr>
                    <th style={S.th}>Size</th>
                    <th style={S.thC}>UNC TPI</th>
                    <th style={S.thC}>UNF TPI</th>
                    <th style={S.thC}>Δ TPI</th>
                    <th style={S.th}>Use Case</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { size: "#6",   unc: 32, unf: 40, note: "Electronics, small assemblies" },
                    { size: "#8",   unc: 32, unf: 36, note: "Light structural, electronics" },
                    { size: "#10",  unc: 24, unf: 32, note: "General purpose — very common" },
                    { size: "1/4",  unc: 20, unf: 28, note: "Most common fastener size" },
                    { size: "5/16", unc: 18, unf: 24, note: "Medium structural work" },
                    { size: "3/8",  unc: 16, unf: 24, note: "Heavy machinery, automotive" },
                    { size: "7/16", unc: 14, unf: 20, note: "Automotive, equipment" },
                    { size: "1/2",  unc: 13, unf: 20, note: "Structural, heavy equipment" },
                    { size: "5/8",  unc: 11, unf: 18, note: "Heavy structural" },
                    { size: "3/4",  unc: 10, unf: 16, note: "Heavy structural, anchor bolts" },
                    { size: "7/8",  unc: 9,  unf: 14, note: "Heavy structural" },
                    { size: "1",    unc: 8,  unf: 12, note: "Heavy structural, pressure vessels" },
                  ].map((r, i) => (
                    <tr key={r.size} style={i % 2 === 0 ? {} : { background: ROW_ALT }}>
                      <td style={{ ...S.td, fontWeight: 700, color: NAVY }}>{r.size}</td>
                      <td style={{ ...S.tdC, color: "#059669", fontWeight: 600 }}>{r.unc}</td>
                      <td style={{ ...S.tdC, color: "#2563EB", fontWeight: 600 }}>{r.unf}</td>
                      <td style={{ ...S.tdC, color: MUTED }}>+{r.unf - r.unc}</td>
                      <td style={{ ...S.td, fontSize: 10, color: MUTED }}>{r.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {tab === 3 && (
          <>
            <div style={S.secTitle}>When to Use UNC vs UNF</div>
            {[
              { icon: "🟢", title: "UNC — Use for general purpose", body: "Coarser thread is easier to assemble, more resistant to cross-threading and damage, and better for cast iron, aluminum, and soft materials. Standard for structural bolts (A325, A490, Grade 5/8). Preferred for field assembly and frequent removal." },
              { icon: "🔵", title: "UNF — Use for higher strength or fine adjustment", body: "Finer thread provides more threads per inch = larger stress area = higher tensile strength for the same nominal diameter. Used in aerospace, automotive (wheel studs, cylinder heads), precision equipment, and thin-walled materials where more thread engagement per inch matters." },
              { icon: "🟡", title: "UNEF — Extra fine (not shown above)", body: "Used in very thin-walled sections or when very fine adjustment is required. Less common. Sizes from #12 through 2\" — not covered in this quick reference. See ASME B1.1 for full UNEF tables." },
              { icon: "⚪", title: "Thread class (2A / 2B / 3A / 3B)", body: "Class 2A/2B is the standard fit for most commercial bolts and nuts. Class 3A/3B is a tighter tolerance — used for precision assemblies. Class 1A/1B is a looser tolerance for easy assembly in dirty or damaged conditions. Most tap drills assume Class 2 fit (75% thread engagement)." },
            ].map((item, i) => (
              <div key={i} style={{ ...S.card, borderLeft: `4px solid ${item.icon === "🟢" ? "#059669" : item.icon === "🔵" ? "#2563EB" : item.icon === "🟡" ? "#D97706" : BORDER}`, marginBottom: 8 }}>
                <div style={{ padding: "8px 10px" }}>
                  <div style={{ fontWeight: 700, fontSize: 12, color: NAVY, marginBottom: 4 }}>{item.icon} {item.title}</div>
                  <div style={{ fontSize: 11, color: TEXT, lineHeight: 1.5 }}>{item.body}</div>
                </div>
              </div>
            ))}

            <div style={S.secTitle}>Calling Out a Thread</div>
            <div style={S.card}>
              <div style={{ padding: "10px 12px" }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: NAVY, marginBottom: 8 }}>Format: Nominal Size – TPI – Series – Class</div>
                {[
                  { ex: "1/4-20 UNC-2A", note: "1/4\" bolt, 20 TPI, coarse, Class 2A (external thread)" },
                  { ex: "1/4-20 UNC-2B", note: "1/4\" nut, 20 TPI, coarse, Class 2B (internal thread)" },
                  { ex: "3/8-24 UNF-3A", note: "3/8\" bolt, 24 TPI, fine, Class 3A (precision)" },
                  { ex: "#10-32 UNF-2A", note: "#10 screw, 32 TPI, fine, standard class" },
                ].map((r, i) => (
                  <div key={i} style={{ borderBottom: i < 3 ? `1px solid ${BORDER}` : "none", paddingBottom: 6, marginBottom: 6 }}>
                    <div style={{ fontFamily: "monospace", fontSize: 13, fontWeight: 700, color: NAVY }}>{r.ex}</div>
                    <div style={{ fontSize: 11, color: MUTED, marginTop: 2 }}>{r.note}</div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        <div style={S.warn}>
          <span style={{ fontSize: 14, marginTop: 1 }}>⚠</span>
          <div style={S.warnT}>
            <strong>Reference only.</strong> Tap drill sizes shown are for standard 75% thread engagement. Verify against current ASME B1.1 and tool manufacturer specs for critical applications.
          </div>
        </div>
      </div>
    </div>
  );
}
