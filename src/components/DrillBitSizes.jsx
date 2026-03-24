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

// Number drills #1–#80 (decimal inches)
const NUMBER_DRILLS = [
  { n: 1,  dec: 0.2280 }, { n: 2,  dec: 0.2210 }, { n: 3,  dec: 0.2130 }, { n: 4,  dec: 0.2090 },
  { n: 5,  dec: 0.2055 }, { n: 6,  dec: 0.2040 }, { n: 7,  dec: 0.2010 }, { n: 8,  dec: 0.1990 },
  { n: 9,  dec: 0.1960 }, { n: 10, dec: 0.1935 }, { n: 11, dec: 0.1910 }, { n: 12, dec: 0.1890 },
  { n: 13, dec: 0.1850 }, { n: 14, dec: 0.1820 }, { n: 15, dec: 0.1800 }, { n: 16, dec: 0.1770 },
  { n: 17, dec: 0.1730 }, { n: 18, dec: 0.1695 }, { n: 19, dec: 0.1660 }, { n: 20, dec: 0.1610 },
  { n: 21, dec: 0.1590 }, { n: 22, dec: 0.1570 }, { n: 23, dec: 0.1540 }, { n: 24, dec: 0.1520 },
  { n: 25, dec: 0.1495 }, { n: 26, dec: 0.1470 }, { n: 27, dec: 0.1440 }, { n: 28, dec: 0.1405 },
  { n: 29, dec: 0.1360 }, { n: 30, dec: 0.1285 }, { n: 31, dec: 0.1200 }, { n: 32, dec: 0.1160 },
  { n: 33, dec: 0.1130 }, { n: 34, dec: 0.1110 }, { n: 35, dec: 0.1100 }, { n: 36, dec: 0.1065 },
  { n: 37, dec: 0.1040 }, { n: 38, dec: 0.1015 }, { n: 39, dec: 0.0995 }, { n: 40, dec: 0.0980 },
  { n: 41, dec: 0.0960 }, { n: 42, dec: 0.0935 }, { n: 43, dec: 0.0890 }, { n: 44, dec: 0.0860 },
  { n: 45, dec: 0.0820 }, { n: 46, dec: 0.0810 }, { n: 47, dec: 0.0785 }, { n: 48, dec: 0.0760 },
  { n: 49, dec: 0.0730 }, { n: 50, dec: 0.0700 }, { n: 51, dec: 0.0670 }, { n: 52, dec: 0.0635 },
  { n: 53, dec: 0.0595 }, { n: 54, dec: 0.0550 }, { n: 55, dec: 0.0520 }, { n: 56, dec: 0.0465 },
  { n: 57, dec: 0.0430 }, { n: 58, dec: 0.0420 }, { n: 59, dec: 0.0410 }, { n: 60, dec: 0.0400 },
  { n: 61, dec: 0.0390 }, { n: 62, dec: 0.0380 }, { n: 63, dec: 0.0370 }, { n: 64, dec: 0.0360 },
  { n: 65, dec: 0.0350 }, { n: 66, dec: 0.0330 }, { n: 67, dec: 0.0320 }, { n: 68, dec: 0.0310 },
  { n: 69, dec: 0.0292 }, { n: 70, dec: 0.0280 }, { n: 71, dec: 0.0260 }, { n: 72, dec: 0.0250 },
  { n: 73, dec: 0.0240 }, { n: 74, dec: 0.0225 }, { n: 75, dec: 0.0210 }, { n: 76, dec: 0.0200 },
  { n: 77, dec: 0.0180 }, { n: 78, dec: 0.0160 }, { n: 79, dec: 0.0145 }, { n: 80, dec: 0.0135 },
];

// Letter drills A–Z
const LETTER_DRILLS = [
  { l: "A", dec: 0.2340 }, { l: "B", dec: 0.2380 }, { l: "C", dec: 0.2420 }, { l: "D", dec: 0.2460 },
  { l: "E", dec: 0.2500 }, { l: "F", dec: 0.2570 }, { l: "G", dec: 0.2610 }, { l: "H", dec: 0.2660 },
  { l: "I", dec: 0.2720 }, { l: "J", dec: 0.2770 }, { l: "K", dec: 0.2810 }, { l: "L", dec: 0.2900 },
  { l: "M", dec: 0.2950 }, { l: "N", dec: 0.3020 }, { l: "O", dec: 0.3160 }, { l: "P", dec: 0.3230 },
  { l: "Q", dec: 0.3320 }, { l: "R", dec: 0.3390 }, { l: "S", dec: 0.3480 }, { l: "T", dec: 0.3580 },
  { l: "U", dec: 0.3680 }, { l: "V", dec: 0.3770 }, { l: "W", dec: 0.3860 }, { l: "X", dec: 0.3970 },
  { l: "Y", dec: 0.4040 }, { l: "Z", dec: 0.4130 },
];

// Fractional drills (common sizes, inches)
const FRACTIONAL_DRILLS = [
  { frac: "1/64",   dec: 0.0156 }, { frac: "1/32",   dec: 0.0313 }, { frac: "3/64",   dec: 0.0469 },
  { frac: "1/16",   dec: 0.0625 }, { frac: "5/64",   dec: 0.0781 }, { frac: "3/32",   dec: 0.0938 },
  { frac: "7/64",   dec: 0.1094 }, { frac: "1/8",    dec: 0.1250 }, { frac: "9/64",   dec: 0.1406 },
  { frac: "5/32",   dec: 0.1563 }, { frac: "11/64",  dec: 0.1719 }, { frac: "3/16",   dec: 0.1875 },
  { frac: "13/64",  dec: 0.2031 }, { frac: "7/32",   dec: 0.2188 }, { frac: "15/64",  dec: 0.2344 },
  { frac: "1/4",    dec: 0.2500 }, { frac: "17/64",  dec: 0.2656 }, { frac: "9/32",   dec: 0.2813 },
  { frac: "19/64",  dec: 0.2969 }, { frac: "5/16",   dec: 0.3125 }, { frac: "21/64",  dec: 0.3281 },
  { frac: "11/32",  dec: 0.3438 }, { frac: "23/64",  dec: 0.3594 }, { frac: "3/8",    dec: 0.3750 },
  { frac: "25/64",  dec: 0.3906 }, { frac: "13/32",  dec: 0.4063 }, { frac: "27/64",  dec: 0.4219 },
  { frac: "7/16",   dec: 0.4375 }, { frac: "29/64",  dec: 0.4531 }, { frac: "15/32",  dec: 0.4688 },
  { frac: "31/64",  dec: 0.4844 }, { frac: "1/2",    dec: 0.5000 }, { frac: "33/64",  dec: 0.5156 },
  { frac: "17/32",  dec: 0.5313 }, { frac: "35/64",  dec: 0.5469 }, { frac: "9/16",   dec: 0.5625 },
  { frac: "37/64",  dec: 0.5781 }, { frac: "19/32",  dec: 0.5938 }, { frac: "39/64",  dec: 0.6094 },
  { frac: "5/8",    dec: 0.6250 }, { frac: "41/64",  dec: 0.6406 }, { frac: "21/32",  dec: 0.6563 },
  { frac: "43/64",  dec: 0.6719 }, { frac: "11/16",  dec: 0.6875 }, { frac: "45/64",  dec: 0.7031 },
  { frac: "23/32",  dec: 0.7188 }, { frac: "47/64",  dec: 0.7344 }, { frac: "3/4",    dec: 0.7500 },
  { frac: "49/64",  dec: 0.7656 }, { frac: "25/32",  dec: 0.7813 }, { frac: "51/64",  dec: 0.7969 },
  { frac: "13/16",  dec: 0.8125 }, { frac: "53/64",  dec: 0.8281 }, { frac: "27/32",  dec: 0.8438 },
  { frac: "55/64",  dec: 0.8594 }, { frac: "7/8",    dec: 0.8750 }, { frac: "57/64",  dec: 0.8906 },
  { frac: "29/32",  dec: 0.9063 }, { frac: "59/64",  dec: 0.9219 }, { frac: "15/16",  dec: 0.9375 },
  { frac: "61/64",  dec: 0.9531 }, { frac: "31/32",  dec: 0.9688 }, { frac: "63/64",  dec: 0.9844 },
  { frac: "1",      dec: 1.0000 },
];

// Metric drills (common mm sizes)
const METRIC_DRILLS = [
  { mm: 0.5,  dec: 0.0197 }, { mm: 0.6,  dec: 0.0236 }, { mm: 0.7,  dec: 0.0276 }, { mm: 0.8,  dec: 0.0315 },
  { mm: 0.9,  dec: 0.0354 }, { mm: 1.0,  dec: 0.0394 }, { mm: 1.1,  dec: 0.0433 }, { mm: 1.2,  dec: 0.0472 },
  { mm: 1.4,  dec: 0.0551 }, { mm: 1.5,  dec: 0.0591 }, { mm: 1.6,  dec: 0.0630 }, { mm: 1.8,  dec: 0.0709 },
  { mm: 2.0,  dec: 0.0787 }, { mm: 2.2,  dec: 0.0866 }, { mm: 2.4,  dec: 0.0945 }, { mm: 2.5,  dec: 0.0984 },
  { mm: 2.6,  dec: 0.1024 }, { mm: 2.8,  dec: 0.1102 }, { mm: 3.0,  dec: 0.1181 }, { mm: 3.2,  dec: 0.1260 },
  { mm: 3.3,  dec: 0.1299 }, { mm: 3.4,  dec: 0.1339 }, { mm: 3.5,  dec: 0.1378 }, { mm: 3.6,  dec: 0.1417 },
  { mm: 3.8,  dec: 0.1496 }, { mm: 4.0,  dec: 0.1575 }, { mm: 4.2,  dec: 0.1654 }, { mm: 4.5,  dec: 0.1772 },
  { mm: 4.8,  dec: 0.1890 }, { mm: 5.0,  dec: 0.1969 }, { mm: 5.2,  dec: 0.2047 }, { mm: 5.5,  dec: 0.2165 },
  { mm: 5.8,  dec: 0.2283 }, { mm: 6.0,  dec: 0.2362 }, { mm: 6.2,  dec: 0.2441 }, { mm: 6.5,  dec: 0.2559 },
  { mm: 6.8,  dec: 0.2677 }, { mm: 7.0,  dec: 0.2756 }, { mm: 7.5,  dec: 0.2953 }, { mm: 8.0,  dec: 0.3150 },
  { mm: 8.5,  dec: 0.3346 }, { mm: 9.0,  dec: 0.3543 }, { mm: 9.5,  dec: 0.3740 }, { mm: 10.0, dec: 0.3937 },
  { mm: 10.5, dec: 0.4134 }, { mm: 11.0, dec: 0.4331 }, { mm: 11.5, dec: 0.4528 }, { mm: 12.0, dec: 0.4724 },
  { mm: 12.5, dec: 0.4921 }, { mm: 13.0, dec: 0.5118 }, { mm: 13.5, dec: 0.5315 }, { mm: 14.0, dec: 0.5512 },
  { mm: 14.5, dec: 0.5709 }, { mm: 15.0, dec: 0.5906 }, { mm: 15.5, dec: 0.6102 }, { mm: 16.0, dec: 0.6299 },
  { mm: 17.0, dec: 0.6693 }, { mm: 17.5, dec: 0.6890 }, { mm: 18.0, dec: 0.7087 }, { mm: 19.0, dec: 0.7480 },
  { mm: 19.5, dec: 0.7677 }, { mm: 20.0, dec: 0.7874 }, { mm: 21.0, dec: 0.8268 }, { mm: 22.0, dec: 0.8661 },
  { mm: 23.0, dec: 0.9055 }, { mm: 24.0, dec: 0.9449 }, { mm: 25.0, dec: 0.9843 }, { mm: 25.4, dec: 1.0000 },
];

const TABS = ["Number (#1–#80)", "Letter (A–Z)", "Fractional", "Metric (mm)"];

export default function DrillBitSizes() {
  const [tab, setTab] = useState(0);
  const [search, setSearch] = useState("");

  const filterNum = () => {
    if (!search) return NUMBER_DRILLS;
    const q = search.replace("#", "").trim();
    return NUMBER_DRILLS.filter(r => String(r.n) === q || r.dec.toFixed(4).includes(q));
  };

  const filterLetter = () => {
    if (!search) return LETTER_DRILLS;
    return LETTER_DRILLS.filter(r => r.l.toLowerCase() === search.toLowerCase() || r.dec.toFixed(4).includes(search));
  };

  const filterFrac = () => {
    if (!search) return FRACTIONAL_DRILLS;
    return FRACTIONAL_DRILLS.filter(r => r.frac.includes(search) || r.dec.toFixed(4).includes(search));
  };

  const filterMetric = () => {
    if (!search) return METRIC_DRILLS;
    return METRIC_DRILLS.filter(r => String(r.mm).includes(search) || r.dec.toFixed(4).includes(search));
  };

  const mmToInch = (mm) => (mm / 25.4).toFixed(4);

  return (
    <div style={S.container}>
      <div style={S.header}>
        <div style={S.headerTop}>
          <span style={S.logo}>⬡</span>
          <span style={S.appName}>Fastener Companion</span>
        </div>
        <div style={S.title}>Drill Bit Sizes</div>
        <div style={S.subtitle}>Number · Letter · Fractional · Metric — Complete Reference</div>
        <div style={S.src}>Sources: ASME B94.11M · ANSI/ASME B1.1 · Machinery's Handbook · ISO 286</div>
      </div>

      <div style={S.tabBar}>
        {TABS.map((t, i) => (
          <button key={t} style={{ ...S.tab, ...(tab === i ? S.activeTab : {}) }} onClick={() => { setTab(i); setSearch(""); }}>{t}</button>
        ))}
      </div>

      <div style={S.content}>
        <input
          style={S.search}
          placeholder={
            tab === 0 ? "Search by number (e.g. 29) or decimal..." :
            tab === 1 ? "Search by letter (e.g. F) or decimal..." :
            tab === 2 ? "Search by fraction (e.g. 1/4) or decimal..." :
            "Search by mm (e.g. 6.5) or decimal..."
          }
          value={search}
          onChange={e => setSearch(e.target.value)}
        />

        {tab === 0 && (
          <>
            <div style={S.info}>
              <p style={S.infoT}>Number drills range from <strong>#1 (0.2280")</strong> to <strong>#80 (0.0135")</strong>. Larger number = smaller diameter. Most commonly used for tap drilling small screws.</p>
            </div>
            <div style={{ overflowX: "auto", borderRadius: 8, border: `1px solid ${BORDER}`, marginBottom: 10 }}>
              <table style={S.table}>
                <thead>
                  <tr>
                    <th style={S.thC}>Drill #</th>
                    <th style={S.thC}>Decimal (in)</th>
                    <th style={S.thC}>mm</th>
                    <th style={S.th}>Common Use</th>
                  </tr>
                </thead>
                <tbody>
                  {filterNum().map((r, i) => {
                    const commonUses = { 21: "#10-32 UNF tap", 25: "#10-24 UNC tap", 29: "#8-32 tap", 33: "#8-36 tap", 36: "#6-32 tap", 43: "#4-40 tap", 50: "#2-56 tap", 53: "#0-80 / #1-64 tap" };
                    return (
                      <tr key={r.n} style={commonUses[r.n] ? S.starRow : i % 2 === 0 ? {} : { background: ROW_ALT }}>
                        <td style={{ ...S.tdC, fontWeight: 700, color: NAVY }}>
                          {commonUses[r.n] && <span style={{ color: AMBER, marginRight: 2 }}>★</span>}#{r.n}
                        </td>
                        <td style={{ ...S.tdC, fontFamily: "monospace" }}>{r.dec.toFixed(4)}</td>
                        <td style={S.tdC}>{(r.dec * 25.4).toFixed(3)}</td>
                        <td style={{ ...S.td, fontSize: 10, color: MUTED }}>{commonUses[r.n] || ""}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </>
        )}

        {tab === 1 && (
          <>
            <div style={S.info}>
              <p style={S.infoT}>Letter drills range from <strong>A (0.2340")</strong> to <strong>Z (0.4130")</strong>. Used for larger tap drilling where number drills end. Common for 1/4" and larger tap sizes.</p>
            </div>
            <div style={{ overflowX: "auto", borderRadius: 8, border: `1px solid ${BORDER}`, marginBottom: 10 }}>
              <table style={S.table}>
                <thead>
                  <tr>
                    <th style={S.thC}>Letter</th>
                    <th style={S.thC}>Decimal (in)</th>
                    <th style={S.thC}>mm</th>
                    <th style={S.th}>Common Use</th>
                  </tr>
                </thead>
                <tbody>
                  {filterLetter().map((r, i) => {
                    const uses = { F: "5/16-18 UNC tap", I: "5/16-24 UNF tap", Q: "3/8-24 UNF tap", U: "7/16-14 UNC tap" };
                    return (
                      <tr key={r.l} style={uses[r.l] ? S.starRow : i % 2 === 0 ? {} : { background: ROW_ALT }}>
                        <td style={{ ...S.tdC, fontWeight: 700, fontSize: 14, color: NAVY }}>
                          {uses[r.l] && <span style={{ color: AMBER, marginRight: 2 }}>★</span>}{r.l}
                        </td>
                        <td style={{ ...S.tdC, fontFamily: "monospace" }}>{r.dec.toFixed(4)}</td>
                        <td style={S.tdC}>{(r.dec * 25.4).toFixed(3)}</td>
                        <td style={{ ...S.td, fontSize: 10, color: MUTED }}>{uses[r.l] || ""}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </>
        )}

        {tab === 2 && (
          <>
            <div style={S.info}>
              <p style={S.infoT}>Fractional drills in 1/64" increments from 1/64" to 1". Most common for clearance holes and general drilling. Standard set: 1/16" to 1/2" by 1/64".</p>
            </div>
            <div style={{ overflowX: "auto", borderRadius: 8, border: `1px solid ${BORDER}`, marginBottom: 10 }}>
              <table style={S.table}>
                <thead>
                  <tr>
                    <th style={S.thC}>Fraction</th>
                    <th style={S.thC}>Decimal (in)</th>
                    <th style={S.thC}>mm</th>
                  </tr>
                </thead>
                <tbody>
                  {filterFrac().map((r, i) => {
                    const isWhole = r.frac.split("/").length === 1 || r.dec === Math.round(r.dec);
                    const isCommon = ["1/16","1/8","3/16","1/4","5/16","3/8","7/16","1/2","9/16","5/8","11/16","3/4","13/16","7/8","15/16","1"].includes(r.frac);
                    return (
                      <tr key={r.frac} style={isCommon ? S.starRow : i % 2 === 0 ? {} : { background: ROW_ALT }}>
                        <td style={{ ...S.tdC, fontWeight: isCommon ? 700 : 500, color: isCommon ? NAVY : TEXT }}>
                          {isCommon && <span style={{ color: AMBER, marginRight: 2 }}>★</span>}{r.frac}
                        </td>
                        <td style={{ ...S.tdC, fontFamily: "monospace" }}>{r.dec.toFixed(4)}</td>
                        <td style={S.tdC}>{(r.dec * 25.4).toFixed(3)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </>
        )}

        {tab === 3 && (
          <>
            <div style={S.info}>
              <p style={S.infoT}>Metric drills in standard increments. Decimal inch equivalent shown for cross-reference with inch tap drill charts.</p>
            </div>
            <div style={{ overflowX: "auto", borderRadius: 8, border: `1px solid ${BORDER}`, marginBottom: 10 }}>
              <table style={S.table}>
                <thead>
                  <tr>
                    <th style={S.thC}>mm</th>
                    <th style={S.thC}>Decimal (in)</th>
                    <th style={S.th}>Common Metric Tap Use</th>
                  </tr>
                </thead>
                <tbody>
                  {filterMetric().map((r, i) => {
                    const tapUses = {
                      1.6: "M2 × 0.4 tap", 2.5: "M3 × 0.5 tap", 3.3: "M4 × 0.7 tap", 4.2: "M5 × 0.8 tap",
                      5.0: "M6 × 1.0 tap", 6.8: "M8 × 1.25 tap", 8.5: "M10 × 1.5 tap", 10.2: "M12 × 1.75 tap",
                      14.0: "M16 × 2.0 tap", 17.5: "M20 × 2.5 tap", 21.0: "M24 × 3.0 tap",
                    };
                    const isTap = !!tapUses[r.mm];
                    return (
                      <tr key={r.mm} style={isTap ? S.starRow : i % 2 === 0 ? {} : { background: ROW_ALT }}>
                        <td style={{ ...S.tdC, fontWeight: isTap ? 700 : 500, color: isTap ? NAVY : TEXT }}>
                          {isTap && <span style={{ color: AMBER, marginRight: 2 }}>★</span>}{r.mm}
                        </td>
                        <td style={{ ...S.tdC, fontFamily: "monospace" }}>{r.dec.toFixed(4)}</td>
                        <td style={{ ...S.td, fontSize: 10, color: isTap ? "#059669" : MUTED }}>{tapUses[r.mm] || ""}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </>
        )}

        <div style={S.warn}>
          <span style={{ fontSize: 14, marginTop: 1 }}>⚠</span>
          <div style={S.warnT}>
            <strong>Reference only.</strong> Drill sizes shown per ASME B94.11M. Actual drill diameter may vary by manufacturer tolerance. Verify with calipers for precision work.
          </div>
        </div>
      </div>
    </div>
  );
}
