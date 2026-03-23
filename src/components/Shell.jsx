import { useState } from "react";

// ─── DESIGN TOKENS ────────────────────────────────────────────────────────────
const C = {
  navy:    "#1B3A6B",
  navyD:   "#142d54",
  amber:   "#F6AD55",
  amberD:  "#E59534",
  bg:      "#F7F9FC",
  text:    "#1E293B",
  muted:   "#94A3B8",
  border:  "#E2E8F0",
  rowAlt:  "#F8FAFC",
  starBg:  "#FFF8E7",
  starBdr: "#FDE68A",
  success: "#059669",
  warning: "#D97706",
  error:   "#DC2626",
  info:    "#2563EB",
  white:   "#ffffff",
};

const font = "'DM Sans', 'Segoe UI', system-ui, sans-serif";

// ─── SCREEN REGISTRY ──────────────────────────────────────────────────────────
// Each entry: { id, label, category, tier, description }
// tier: "free" | "pro"
// category matches Browse Categories

const SCREENS = {
  // Quick Access (all free)
  "tap-drill":        { label: "Tap & Drill Chart",          category: "quick",        tier: "free", desc: "UNC/UNF/Metric tap drill sizes with material guidance" },
  "torque-chart":     { label: "Torque Chart",               category: "quick",        tier: "free", desc: "SAE & Metric torque values, dry/lube, K-factors" },
  "thread-pitch":     { label: "Thread Pitch Chart",         category: "quick",        tier: "free", desc: "UNC/UNF/UNEF/Metric M1–M100, TPI↔mm converter" },
  "grade-markings":   { label: "Grade Markings",             category: "quick",        tier: "free", desc: "SAE/ASTM/Metric/Stainless grade identification" },
  "decimal-equiv":    { label: "Decimal Equivalent",         category: "quick",        tier: "free", desc: "Fractional, number & letter drill decimal reference" },
  "wrench-socket":    { label: "Wrench & Socket Sizes",      category: "quick",        tier: "free", desc: "SAE & Metric bolt/hex key/drive sizes" },
  "conversion-calc":  { label: "Conversion Calculator",      category: "quick",        tier: "free", desc: "Torque, length, stress, force, temperature, area" },
  "unc-unf":          { label: "UNC / UNF Reference",        category: "quick",        tier: "free", desc: "Unified thread series quick reference" },
  "drill-bit-sizes":  { label: "Drill Bit Sizes",            category: "quick",        tier: "free", desc: "Complete drill bit size chart" },

  // Reference Guides
  "how-to-measure":   { label: "How to Measure Fasteners",   category: "reference",    tier: "free", desc: "Diameter, length, thread pitch, head dims, tools" },
  "nomenclature":     { label: "Fastener Nomenclature",      category: "reference",    tier: "free", desc: "Imperial, metric, machine screw, stud callouts" },
  "standards-plain":  { label: "Top 10 Standards",           category: "reference",    tier: "free", desc: "A307–A490, F593, Gr.5/8/8.8/10.9 plain language" },
  "glossary":         { label: "Glossary of Terms",          category: "reference",    tier: "free", desc: "80+ terms, 13 categories, A–Z indexed" },
  "failure-analysis": { label: "Fastener Failure Analysis",  category: "reference",    tier: "pro",  desc: "8 failure modes + decision tree" },
  "installation":     { label: "Installation Best Practices",category: "reference",    tier: "pro",  desc: "Step by step, torque patterns, reuse guide" },
  "threadlocker":     { label: "Threadlocker Guide",         category: "reference",    tier: "pro",  desc: "Purple/blue/red/green grades, removal, field tips" },
  "anti-seize":       { label: "Anti-Seize Compound Guide",  category: "reference",    tier: "pro",  desc: "5 types, torque factors, which type, field tips" },
  "galvanic":         { label: "Galvanic Corrosion Chart",   category: "reference",    tier: "pro",  desc: "Galvanic series 24 metals, common pairs, prevention" },
  "coating-plating":  { label: "Coating & Plating Guide",    category: "reference",    tier: "pro",  desc: "9 coatings, HE risk matrix, baking guide" },
  "bolt-dims":        { label: "Bolt Dimensions Chart",      category: "reference",    tier: "free", desc: "Hex imperial, heavy hex, hex metric, thread length" },
  "nut-dims":         { label: "Nut Dimensions Chart",       category: "reference",    tier: "free", desc: "Hex, jam, heavy hex, metric, grade compatibility" },
  "washer-sizes":     { label: "Washer Sizes Chart",         category: "reference",    tier: "free", desc: "SAE, USS, F436 structural, metric, which washer" },
  "proof-load":       { label: "Proof Load & Tensile",       category: "reference",    tier: "pro",  desc: "SAE/ASTM/Metric grades, comparison chart" },
  "hardness":         { label: "Hardness Reference Chart",   category: "reference",    tier: "pro",  desc: "HRC/HRB tables, by grade, scales explained" },
  "material-guide":   { label: "Fastener Material Guide",    category: "reference",    tier: "pro",  desc: "8 materials, properties, which material?" },
  "temp-rating":      { label: "Temperature Rating Ref.",    category: "reference",    tier: "pro",  desc: "Materials, coatings & lubes by service temperature" },
  "chemical-resist":  { label: "Chemical Resistance Ref.",   category: "reference",    tier: "pro",  desc: "Stainless, alloy & specialty metals vs chemicals" },
  "drive-types":      { label: "Drive Type & Security Guide",category: "reference",    tier: "pro",  desc: "All drive types, tamper-resistant, bit compatibility" },

  // Advisory / Intelligence
  "design-advisor":   { label: "Design Advisor",             category: "advisory",     tier: "pro",  desc: "6-step intake → complete fastener spec with conflicts" },
  "sub-advisor":      { label: "Substitution Advisor",       category: "advisory",     tier: "pro",  desc: "Any spec → sourcing explanation + substitute + ECR" },
  "spec-conflict":    { label: "Spec Conflict Checker",      category: "advisory",     tier: "pro",  desc: "Enter any partial spec → flags 10 conflict types" },

  // Calculators
  "torque-calc":      { label: "Torque Calculator",          category: "calculators",  tier: "pro",  desc: "Size/grade/lube/preload% → ft-lb/in-lb/Nm" },
  "thread-engage":    { label: "Thread Engagement Calc.",    category: "calculators",  tier: "pro",  desc: "Size/material → min & recommended engagement depth" },
  "preload-calc":     { label: "Preload & Clamp Load Calc.", category: "calculators",  tier: "pro",  desc: "Size/grade/K-factor/% → clamp load + required torque" },
  "bolt-length":      { label: "Bolt Length Selection",      category: "calculators",  tier: "pro",  desc: "Grip/nut/washer inputs → recommended bolt length" },

  // Dimensional Reference
  "visual-ref":       { label: "Fastener Type Visual Ref.",  category: "dimensional",  tier: "free", desc: "6 families, 30+ types, callout examples, drive types" },
  "clearance-holes":  { label: "Clearance Hole Sizes",       category: "dimensional",  tier: "free", desc: "Imperial + metric, close/normal/loose fit" },
  "counterbore":      { label: "Counterbore & Countersink",  category: "dimensional",  tier: "free", desc: "SHCS counterbore, flat head countersink, angle ref" },
  "weight-count":     { label: "Fastener Weight & Count",    category: "dimensional",  tier: "pro",  desc: "Hex bolts/nuts/washers, weight calculator, pieces/lb" },

  // Systems & Applications
  "pipe-thread":      { label: "Pipe Thread Reference (NPT)",category: "systems",      tier: "free", desc: "NPT size table, thread types, sealant guide" },
  "vibration":        { label: "Vibration-Resistant Guide",  category: "systems",      tier: "pro",  desc: "By vibration level, 8 locking methods, Junker ratings" },
  "anchor-bolt":      { label: "Anchor Bolt Reference",      category: "systems",      tier: "pro",  desc: "Cast-in, post-installed, ASTM F1554, edge/spacing" },
  "flange-bolt":      { label: "Flange Bolt Chart (B16.5)",  category: "systems",      tier: "pro",  desc: "150#/300#/600# tables, NPS → bolt size/count/BCD" },
  "condition-assess": { label: "Fastener Condition Assess.", category: "systems",      tier: "pro",  desc: "Inspection checklist, reuse matrix, tools needed" },
  "standards-xref":   { label: "Standards Cross-Reference",  category: "systems",      tier: "pro",  desc: "30+ standards across ASTM/SAE/ISO/ASME/DIN/JIS" },
  "storage-handling": { label: "Storage, Handling & Quality",category: "systems",      tier: "pro",  desc: "Storage by type, handling rules, counterfeit ID" },
  "cert-docs":        { label: "Certification & Docs Guide", category: "systems",      tier: "pro",  desc: "CoC/MTR/test reports, how to read an MTR, FQA" },
  "industry-app":     { label: "Industry Application Guide", category: "systems",      tier: "pro",  desc: "Oil & Gas, Structural, Food & Bev, Mining, Aerospace..." },
};

// ─── BROWSE CATEGORIES ────────────────────────────────────────────────────────
const CATEGORIES = [
  { id: "reference",   label: "Reference Guides",      icon: "📖", color: C.navy },
  { id: "advisory",    label: "Advisor / Intelligence", icon: "🧠", color: "#6D28D9" },
  { id: "calculators", label: "Calculators",            icon: "🔢", color: "#0F766E" },
  { id: "dimensional", label: "Dimensional Reference",  icon: "📐", color: "#B45309" },
  { id: "systems",     label: "Systems & Applications", icon: "⚙️", color: "#BE185D" },
];

// ─── QUICK ACCESS CHIPS ───────────────────────────────────────────────────────
const QUICK_ACCESS = [
  "tap-drill", "torque-chart", "thread-pitch", "grade-markings",
  "decimal-equiv", "wrench-socket", "conversion-calc", "unc-unf", "drill-bit-sizes"
];

// ─── SHARED STYLES ─────────────────────────────────────────────────────────────
const t = {
  // layout
  page:    { fontFamily: font, background: C.bg, minHeight: "100vh", maxWidth: 430, margin: "0 auto", paddingBottom: 72, position: "relative" },
  // header
  header:  { background: C.navy, padding: "14px 16px 12px", color: C.white, position: "sticky", top: 0, zIndex: 100 },
  hTop:    { display: "flex", alignItems: "center", justifyContent: "space-between" },
  hLogo:   { display: "flex", alignItems: "center", gap: 8 },
  hHex:    { fontSize: 22, lineHeight: 1 },
  hName:   { fontSize: 13, fontWeight: 700, letterSpacing: 0.2 },
  hSub:    { fontSize: 10, opacity: 0.65 },
  proBadge:{ background: C.amber, color: C.navyD, fontSize: 10, fontWeight: 800, padding: "2px 8px", borderRadius: 10, letterSpacing: 0.5 },
  // search
  searchWrap:  { padding: "10px 12px 8px", background: C.white, borderBottom: `1px solid ${C.border}`, position: "sticky", top: 62, zIndex: 99 },
  searchInner: { display: "flex", alignItems: "center", gap: 8, background: C.bg, borderRadius: 10, border: `1px solid ${C.border}`, padding: "7px 12px" },
  searchIcon:  { fontSize: 14, color: C.muted },
  searchInput: { border: "none", background: "transparent", outline: "none", fontSize: 14, color: C.text, flex: 1, fontFamily: font },
  // content
  content: { padding: "10px 12px 0" },
  // section label
  secLabel:{ fontSize: 11, fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: 0.7, marginBottom: 8, marginTop: 4 },
  // quick access chips
  chipRow: { display: "flex", gap: 8, overflowX: "auto", paddingBottom: 6, marginBottom: 4, scrollbarWidth: "none" },
  chip:    { display: "inline-flex", alignItems: "center", gap: 5, background: C.white, border: `1px solid ${C.border}`, borderRadius: 20, padding: "6px 12px", whiteSpace: "nowrap", cursor: "pointer", fontSize: 12, fontWeight: 600, color: C.navy, flexShrink: 0 },
  chipA:   { background: C.navy, color: C.white, border: `1px solid ${C.navy}` },
  // category grid
  grid:    { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 10 },
  catCard: { background: C.white, border: `1px solid ${C.border}`, borderRadius: 10, padding: "14px 12px", cursor: "pointer", display: "flex", alignItems: "center", gap: 10 },
  catIcon: { fontSize: 22 },
  catLabel:{ fontSize: 13, fontWeight: 700, color: C.text, lineHeight: 1.3 },
  catCount:{ fontSize: 11, color: C.muted, marginTop: 2 },
  // recommendation banner
  recBanner:{ background: C.navy, borderRadius: 12, padding: "14px 14px", marginBottom: 10, color: C.white, cursor: "pointer", border: `1px solid ${C.navyD}` },
  recTitle: { fontSize: 14, fontWeight: 800, marginBottom: 3, letterSpacing: 0.1 },
  recSub:   { fontSize: 11, opacity: 0.8, marginBottom: 8, lineHeight: 1.5 },
  recBtns:  { display: "flex", gap: 8 },
  recBtn:   { background: C.amber, color: C.navyD, fontSize: 11, fontWeight: 800, padding: "6px 12px", borderRadius: 20, border: "none", cursor: "pointer" },
  recBtnO:  { background: "transparent", color: C.white, fontSize: 11, fontWeight: 700, padding: "6px 12px", borderRadius: 20, border: `1px solid rgba(255,255,255,0.4)`, cursor: "pointer" },
  // screen list
  listCard: { background: C.white, border: `1px solid ${C.border}`, borderRadius: 10, overflow: "hidden", marginBottom: 10 },
  listItem: { display: "flex", alignItems: "center", padding: "11px 14px", borderBottom: `1px solid ${C.border}`, cursor: "pointer", gap: 10 },
  listItemL:{ borderBottom: "none" },
  liLabel:  { fontSize: 13, fontWeight: 600, color: C.navy, flex: 1 },
  liDesc:   { fontSize: 11, color: C.muted, marginTop: 2 },
  liArrow:  { fontSize: 12, color: C.muted },
  // pro lock
  proLock:  { background: C.amber, color: C.navyD, fontSize: 9, fontWeight: 800, padding: "2px 6px", borderRadius: 8, marginLeft: 4, letterSpacing: 0.3 },
  // screen header (back nav)
  screenHdr:{ background: C.navy, padding: "12px 16px", color: C.white, display: "flex", alignItems: "center", gap: 10, position: "sticky", top: 0, zIndex: 100 },
  backBtn:  { background: "rgba(255,255,255,0.15)", border: "none", color: C.white, borderRadius: 8, padding: "5px 10px", fontSize: 12, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 4 },
  screenTitle:{ fontSize: 15, fontWeight: 700, flex: 1 },
  // pro paywall
  paywallWrap:{ padding: 20, textAlign: "center" },
  paywallHex: { fontSize: 48, marginBottom: 8 },
  paywallTitle:{ fontSize: 18, fontWeight: 800, color: C.navy, marginBottom: 8 },
  paywallSub: { fontSize: 13, color: C.muted, marginBottom: 20, lineHeight: 1.6 },
  paywallBtn: { background: C.amber, color: C.navyD, border: "none", borderRadius: 25, padding: "12px 28px", fontSize: 14, fontWeight: 800, cursor: "pointer", display: "block", width: "100%", marginBottom: 10 },
  paywallLink:{ fontSize: 12, color: C.muted, cursor: "pointer", textDecoration: "underline" },
  // bottom nav
  bottomNav:{ position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: 430, background: C.white, borderTop: `1px solid ${C.border}`, display: "flex", zIndex: 200 },
  navItem:  { flex: 1, display: "flex", flexDirection: "column", alignItems: "center", padding: "8px 0 6px", cursor: "pointer", border: "none", background: "transparent" },
  navIcon:  { fontSize: 20, marginBottom: 2 },
  navLabel: { fontSize: 10, fontWeight: 600, color: C.muted },
  navLabelA:{ fontSize: 10, fontWeight: 700, color: C.navy },
  // recent
  recentRow:{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 6, scrollbarWidth: "none" },
  recentChip:{ display: "inline-flex", alignItems: "center", gap: 5, background: C.white, border: `1px solid ${C.border}`, borderRadius: 8, padding: "5px 10px", whiteSpace: "nowrap", cursor: "pointer", fontSize: 11, color: C.text, flexShrink: 0 },
  // search results
  srItem:   { display: "flex", alignItems: "flex-start", padding: "10px 14px", borderBottom: `1px solid ${C.border}`, cursor: "pointer", gap: 8 },
  srLabel:  { fontSize: 13, fontWeight: 600, color: C.navy },
  srDesc:   { fontSize: 11, color: C.muted, marginTop: 2 },
  srCat:    { fontSize: 10, background: C.bg, border: `1px solid ${C.border}`, borderRadius: 6, padding: "1px 6px", color: C.muted, whiteSpace: "nowrap", marginTop: 4, display: "inline-block" },
  // info / warn boxes
  info:     { background: "#EFF6FF", border: `1px solid #BFDBFE`, borderRadius: 8, padding: "10px 12px", marginBottom: 10 },
  infoT:    { fontSize: 11, color: C.info, lineHeight: 1.6, margin: 0 },
  warn:     { background: "#FEF2F2", border: `1px solid #FECACA`, borderRadius: 8, padding: "10px 12px", marginBottom: 4, display: "flex", gap: 8 },
  warnT:    { fontSize: 11, color: C.error, lineHeight: 1.5 },
};

// ─── PLACEHOLDER SCREEN ───────────────────────────────────────────────────────
function PlaceholderScreen({ id, onBack, onUpgrade }) {
  const screen = SCREENS[id];
  if (!screen) return null;
  const isPro = screen.tier === "pro";
  return (
    <div style={t.page}>
      <div style={t.screenHdr}>
        <button style={t.backBtn} onClick={onBack}>← Back</button>
        <div style={t.screenTitle}>{screen.label}</div>
        {isPro && <span style={t.proBadge}>PRO</span>}
      </div>
      <div style={{ ...t.content, paddingTop: 20 }}>
        {isPro ? (
          <div style={t.paywallWrap}>
            <div style={t.paywallHex}>⬡</div>
            <div style={t.paywallTitle}>{screen.label}</div>
            <div style={t.paywallSub}>
              {screen.desc}
              <br /><br />
              This tool is included in <strong>Fastener Companion Pro</strong>.
              Unlock all calculators, advisors, and advanced reference guides.
            </div>
            <button style={t.paywallBtn} onClick={onUpgrade}>Upgrade to Pro — $9/mo</button>
            <div style={t.paywallLink} onClick={onBack}>Maybe later</div>
          </div>
        ) : (
          <div style={{ textAlign: "center", padding: 40 }}>
            <div style={{ fontSize: 36, marginBottom: 12 }}>🔧</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: C.navy, marginBottom: 8 }}>{screen.label}</div>
            <div style={{ fontSize: 13, color: C.muted, lineHeight: 1.6, marginBottom: 20 }}>{screen.desc}</div>
            <div style={{ fontSize: 12, color: C.muted, background: C.bg, border: `1px solid ${C.border}`, borderRadius: 8, padding: "10px 14px" }}>
              This screen wires to artifact #{Object.keys(SCREENS).indexOf(id) + 1} from the claude.ai chat history.<br />
              Replace this placeholder with the real component during integration.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── CATEGORY SCREEN ──────────────────────────────────────────────────────────
function CategoryScreen({ categoryId, onBack, onNavigate, onUpgrade }) {
  const cat = CATEGORIES.find(c => c.id === categoryId);
  const items = Object.entries(SCREENS).filter(([, v]) => v.category === categoryId);
  return (
    <div style={t.page}>
      <div style={t.screenHdr}>
        <button style={t.backBtn} onClick={onBack}>← Back</button>
        <div style={t.screenTitle}>{cat?.icon} {cat?.label}</div>
      </div>
      <div style={{ ...t.content, paddingTop: 8 }}>
        <div style={t.listCard}>
          {items.map(([id, screen], i) => (
            <div
              key={id}
              style={{ ...t.listItem, ...(i === items.length - 1 ? t.listItemL : {}) }}
              onClick={() => onNavigate(id)}
            >
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <span style={t.liLabel}>{screen.label}</span>
                  {screen.tier === "pro" && <span style={t.proLock}>PRO</span>}
                </div>
                <div style={t.liDesc}>{screen.desc}</div>
              </div>
              <span style={t.liArrow}>›</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── UPGRADE SCREEN ───────────────────────────────────────────────────────────
function UpgradeScreen({ onBack }) {
  return (
    <div style={t.page}>
      <div style={t.screenHdr}>
        <button style={t.backBtn} onClick={onBack}>← Back</button>
        <div style={t.screenTitle}>Upgrade to Pro</div>
      </div>
      <div style={{ ...t.content, paddingTop: 20 }}>
        <div style={{ textAlign: "center", marginBottom: 20 }}>
          <div style={{ fontSize: 40, marginBottom: 8 }}>⬡</div>
          <div style={{ fontSize: 20, fontWeight: 800, color: C.navy, marginBottom: 6 }}>Fastener Companion Pro</div>
          <div style={{ fontSize: 13, color: C.muted, lineHeight: 1.6 }}>Everything a technician, engineer, or buyer needs in the field.</div>
        </div>
        <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 12, padding: "16px 16px", marginBottom: 14 }}>
          <div style={{ fontSize: 22, fontWeight: 800, color: C.navy, marginBottom: 4 }}>$9 <span style={{ fontSize: 14, fontWeight: 400, color: C.muted }}>/month</span></div>
          <div style={{ fontSize: 11, color: C.muted, marginBottom: 14 }}>Cancel anytime. Price TBD at launch.</div>
          {[
            "All 9 Quick Access tools (free forever)",
            "All Reference Guides — 25 topics",
            "Design Advisor + Substitution Advisor",
            "Spec Conflict Checker",
            "4 Engineering Calculators",
            "Systems & Applications guides (9 topics)",
            "Exportable spec sheets (coming soon)",
            "Saved favorites + search history",
          ].map((f, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 7 }}>
              <span style={{ color: C.success, fontWeight: 800, fontSize: 14 }}>✓</span>
              <span style={{ fontSize: 13, color: C.text }}>{f}</span>
            </div>
          ))}
        </div>
        <button style={t.paywallBtn}>Start Pro — $9/mo</button>
        <div style={{ textAlign: "center", marginTop: 8 }}>
          <span style={{ ...t.paywallLink, color: C.muted }} onClick={onBack}>Stay on free plan</span>
        </div>
        <div style={{ ...t.info, marginTop: 16 }}>
          <p style={t.infoT}><strong>Team/Department pricing</strong> coming soon — Pro for groups, sold to managers. Contact us for early access.</p>
        </div>
      </div>
    </div>
  );
}

// ─── SAVED / FAVORITES SCREEN ─────────────────────────────────────────────────
function SavedScreen({ favorites, recent, onNavigate }) {
  return (
    <div style={t.page}>
      <div style={t.header}>
        <div style={t.hTop}>
          <div style={t.hLogo}>
            <span style={t.hHex}>⬡</span>
            <div>
              <div style={t.hName}>Fastener Companion</div>
              <div style={t.hSub}>Saved & Recent</div>
            </div>
          </div>
        </div>
      </div>
      <div style={t.content}>
        {favorites.length > 0 ? (
          <>
            <div style={t.secLabel}>Favorites</div>
            <div style={t.listCard}>
              {favorites.map((id, i) => {
                const s = SCREENS[id];
                return s ? (
                  <div key={id} style={{ ...t.listItem, ...(i === favorites.length - 1 ? t.listItemL : {}) }} onClick={() => onNavigate(id)}>
                    <div style={{ flex: 1 }}>
                      <span style={t.liLabel}>★ {s.label}</span>
                      <div style={t.liDesc}>{s.desc}</div>
                    </div>
                    <span style={t.liArrow}>›</span>
                  </div>
                ) : null;
              })}
            </div>
          </>
        ) : (
          <div style={{ textAlign: "center", padding: "30px 20px" }}>
            <div style={{ fontSize: 32, marginBottom: 8 }}>★</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: C.navy, marginBottom: 6 }}>No favorites yet</div>
            <div style={{ fontSize: 12, color: C.muted }}>Tap ★ on any tool to save it here.</div>
          </div>
        )}
        {recent.length > 0 && (
          <>
            <div style={t.secLabel}>Recently Viewed</div>
            <div style={t.listCard}>
              {recent.map((id, i) => {
                const s = SCREENS[id];
                return s ? (
                  <div key={id} style={{ ...t.listItem, ...(i === recent.length - 1 ? t.listItemL : {}) }} onClick={() => onNavigate(id)}>
                    <div style={{ flex: 1 }}>
                      <span style={t.liLabel}>{s.label}</span>
                    </div>
                    <span style={t.liArrow}>›</span>
                  </div>
                ) : null;
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ─── ACCOUNT SCREEN ───────────────────────────────────────────────────────────
function AccountScreen({ onUpgrade }) {
  return (
    <div style={t.page}>
      <div style={t.header}>
        <div style={t.hTop}>
          <div style={t.hLogo}>
            <span style={t.hHex}>⬡</span>
            <div>
              <div style={t.hName}>Fastener Companion</div>
              <div style={t.hSub}>Account</div>
            </div>
          </div>
        </div>
      </div>
      <div style={t.content}>
        <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 12, padding: 16, marginBottom: 12, textAlign: "center" }}>
          <div style={{ width: 56, height: 56, borderRadius: "50%", background: C.bg, border: `2px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 10px", fontSize: 24 }}>👤</div>
          <div style={{ fontSize: 15, fontWeight: 700, color: C.navy }}>Guest User</div>
          <div style={{ fontSize: 12, color: C.muted, marginBottom: 12 }}>Free plan</div>
          <button style={{ ...t.paywallBtn, marginBottom: 8 }} onClick={onUpgrade}>Upgrade to Pro — $9/mo</button>
          <button style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 25, padding: "10px 28px", fontSize: 13, fontWeight: 700, color: C.navy, cursor: "pointer", width: "100%" }}>Sign In / Create Account</button>
        </div>
        <div style={t.secLabel}>App Info</div>
        <div style={t.listCard}>
          {[
            { label: "Version", val: "1.0 MVP" },
            { label: "Total Reference Tools", val: "55" },
            { label: "Standards Referenced", val: "80+" },
            { label: "No Ads", val: "✓ Always" },
          ].map((r, i, arr) => (
            <div key={r.label} style={{ display: "flex", justifyContent: "space-between", padding: "10px 14px", borderBottom: i < arr.length - 1 ? `1px solid ${C.border}` : "none" }}>
              <span style={{ fontSize: 13, color: C.text }}>{r.label}</span>
              <span style={{ fontSize: 13, fontWeight: 600, color: C.navy }}>{r.val}</span>
            </div>
          ))}
        </div>
        <div style={{ ...t.info, marginTop: 8 }}>
          <p style={t.infoT}>Fastener Companion is a reference tool only. All data should be verified against current published standards before use in engineered applications.</p>
        </div>
      </div>
    </div>
  );
}

// ─── SEARCH RESULTS ───────────────────────────────────────────────────────────
function SearchResults({ query, onNavigate }) {
  const q = query.toLowerCase();
  const results = Object.entries(SCREENS).filter(([id, s]) =>
    s.label.toLowerCase().includes(q) || s.desc.toLowerCase().includes(q) || id.includes(q)
  );
  return (
    <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 10, overflow: "hidden", marginBottom: 10 }}>
      {results.length === 0 ? (
        <div style={{ padding: "20px 14px", textAlign: "center", color: C.muted, fontSize: 13 }}>No results for "{query}"</div>
      ) : results.map(([id, s], i) => (
        <div key={id} style={{ ...t.srItem, ...(i === results.length - 1 ? { borderBottom: "none" } : {}) }} onClick={() => onNavigate(id)}>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={t.srLabel}>{s.label}</span>
              {s.tier === "pro" && <span style={t.proLock}>PRO</span>}
            </div>
            <div style={t.srDesc}>{s.desc}</div>
            <span style={t.srCat}>{CATEGORIES.find(c => c.id === s.category)?.label || s.category}</span>
          </div>
          <span style={t.liArrow}>›</span>
        </div>
      ))}
    </div>
  );
}

// ─── HOME SCREEN ──────────────────────────────────────────────────────────────
function HomeScreen({ recent, onNavigate, onCategory, searchQuery, setSearchQuery }) {
  const catCounts = Object.fromEntries(
    CATEGORIES.map(c => [c.id, Object.values(SCREENS).filter(s => s.category === c.id).length])
  );

  return (
    <div style={t.page}>
      {/* Header */}
      <div style={t.header}>
        <div style={t.hTop}>
          <div style={t.hLogo}>
            <span style={t.hHex}>⬡</span>
            <div>
              <div style={t.hName}>Fastener Companion</div>
              <div style={t.hSub}>Industrial Fastener Reference</div>
            </div>
          </div>
          <span style={t.proBadge}>PRO</span>
        </div>
      </div>

      {/* Search */}
      <div style={t.searchWrap}>
        <div style={t.searchInner}>
          <span style={t.searchIcon}>🔍</span>
          <input
            style={t.searchInput}
            placeholder="Search tools, grades, standards..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <span style={{ fontSize: 14, color: C.muted, cursor: "pointer" }} onClick={() => setSearchQuery("")}>✕</span>
          )}
        </div>
      </div>

      <div style={t.content}>
        {/* Search results */}
        {searchQuery.length > 1 && (
          <>
            <div style={t.secLabel}>Search Results</div>
            <SearchResults query={searchQuery} onNavigate={onNavigate} />
          </>
        )}

        {!searchQuery && (
          <>
            {/* Recently viewed */}
            {recent.length > 0 && (
              <>
                <div style={t.secLabel}>Recently Viewed</div>
                <div style={t.recentRow}>
                  {recent.map(id => {
                    const s = SCREENS[id];
                    return s ? (
                      <div key={id} style={t.recentChip} onClick={() => onNavigate(id)}>
                        {s.label}
                      </div>
                    ) : null;
                  })}
                </div>
              </>
            )}

            {/* Quick Access */}
            <div style={t.secLabel}>Quick Access</div>
            <div style={t.chipRow}>
              {QUICK_ACCESS.map(id => (
                <div key={id} style={t.chip} onClick={() => onNavigate(id)}>
                  {SCREENS[id]?.label}
                </div>
              ))}
            </div>

            {/* Recommendation Engine Banner */}
            <div style={t.recBanner} onClick={() => onNavigate("design-advisor")}>
              <div style={t.recTitle}>🧠 Fastener Recommendation Engine</div>
              <div style={t.recSub}>
                Describe your joint — get a complete fastener specification with conflict detection and availability guidance.
              </div>
              <div style={t.recBtns}>
                <button style={t.recBtn} onClick={e => { e.stopPropagation(); onNavigate("design-advisor"); }}>Design Advisor</button>
                <button style={t.recBtnO} onClick={e => { e.stopPropagation(); onNavigate("sub-advisor"); }}>Substitution Advisor</button>
                <button style={t.recBtnO} onClick={e => { e.stopPropagation(); onNavigate("spec-conflict"); }}>Spec Check</button>
              </div>
            </div>

            {/* Browse Categories */}
            <div style={t.secLabel}>Browse Categories</div>
            <div style={t.grid}>
              {CATEGORIES.map(cat => (
                <div key={cat.id} style={t.catCard} onClick={() => onCategory(cat.id)}>
                  <span style={t.catIcon}>{cat.icon}</span>
                  <div>
                    <div style={t.catLabel}>{cat.label}</div>
                    <div style={t.catCount}>{catCounts[cat.id]} tools</div>
                  </div>
                </div>
              ))}
              {/* Standards as a direct link */}
              <div style={t.catCard} onClick={() => onNavigate("standards-xref")}>
                <span style={t.catIcon}>📋</span>
                <div>
                  <div style={t.catLabel}>Standards X-Ref</div>
                  <div style={t.catCount}>ASTM · ISO · DIN · JIS</div>
                </div>
              </div>
            </div>

            {/* Pro teaser if on free */}
            <div style={{ background: `linear-gradient(135deg, #FFF8E7, #FEFCE8)`, border: `1px solid ${C.starBdr}`, borderRadius: 10, padding: "12px 14px", marginBottom: 10 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: C.navyD, marginBottom: 4 }}>🔓 Unlock Pro Features</div>
              <div style={{ fontSize: 11, color: "#92400E", lineHeight: 1.5, marginBottom: 8 }}>
                Calculators, Advisors, Failure Analysis, Coating Guide, Chemical Resistance, and 30+ more tools — $9/month.
              </div>
              <button style={{ background: C.amber, border: "none", borderRadius: 20, padding: "6px 16px", fontSize: 12, fontWeight: 800, color: C.navyD, cursor: "pointer" }}
                onClick={() => onNavigate("__upgrade__")}>
                See what's included →
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ─── BOTTOM NAV ───────────────────────────────────────────────────────────────
function BottomNav({ active, onChange }) {
  const items = [
    { id: "home",    icon: "🏠", label: "Home" },
    { id: "search",  icon: "🔍", label: "Search" },
    { id: "saved",   icon: "★",  label: "Saved" },
    { id: "account", icon: "👤", label: "Account" },
  ];
  return (
    <div style={t.bottomNav}>
      {items.map(item => (
        <button key={item.id} style={t.navItem} onClick={() => onChange(item.id)}>
          <span style={{ ...t.navIcon, color: active === item.id ? C.navy : C.muted }}>{item.icon}</span>
          <span style={active === item.id ? t.navLabelA : t.navLabel}>{item.label}</span>
        </button>
      ))}
    </div>
  );
}

// ─── ROOT APP ─────────────────────────────────────────────────────────────────
export default function FastenerCompanion() {
  const [navTab, setNavTab]         = useState("home");
  const [screen, setScreen]         = useState(null);   // null = tab view, string = screen id, "cat:X" = category
  const [recent, setRecent]         = useState([]);
  const [favorites]                 = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = (id) => {
    if (id === "__upgrade__") { setScreen("__upgrade__"); return; }
    setRecent(prev => [id, ...prev.filter(r => r !== id)].slice(0, 8));
    setScreen(id);
  };

  const goCategory = (catId) => setScreen(`cat:${catId}`);

  const goBack = () => { setScreen(null); setSearchQuery(""); };

  const goUpgrade = () => setScreen("__upgrade__");

  // Route to appropriate screen
  if (screen) {
    if (screen === "__upgrade__") return (
      <>
        <UpgradeScreen onBack={goBack} />
        <BottomNav active={navTab} onChange={id => { setNavTab(id); setScreen(null); }} />
      </>
    );
    if (screen.startsWith("cat:")) {
      const catId = screen.replace("cat:", "");
      return (
        <>
          <CategoryScreen categoryId={catId} onBack={goBack} onNavigate={navigate} onUpgrade={goUpgrade} />
          <BottomNav active={navTab} onChange={id => { setNavTab(id); setScreen(null); }} />
        </>
      );
    }
    return (
      <>
        <PlaceholderScreen id={screen} onBack={goBack} onUpgrade={goUpgrade} />
        <BottomNav active={navTab} onChange={id => { setNavTab(id); setScreen(null); }} />
      </>
    );
  }

  // Tab-level routing
  if (navTab === "saved") return (
    <>
      <SavedScreen favorites={favorites} recent={recent} onNavigate={navigate} />
      <BottomNav active={navTab} onChange={id => { setNavTab(id); setScreen(null); }} />
    </>
  );

  if (navTab === "account") return (
    <>
      <AccountScreen onUpgrade={goUpgrade} />
      <BottomNav active={navTab} onChange={id => { setNavTab(id); setScreen(null); }} />
    </>
  );

  if (navTab === "search") return (
    <>
      <div style={t.page}>
        <div style={t.header}>
          <div style={t.hTop}>
            <div style={t.hLogo}>
              <span style={t.hHex}>⬡</span>
              <div><div style={t.hName}>Fastener Companion</div><div style={t.hSub}>Search All Tools</div></div>
            </div>
          </div>
        </div>
        <div style={t.searchWrap}>
          <div style={t.searchInner}>
            <span style={t.searchIcon}>🔍</span>
            <input style={t.searchInput} placeholder="Search 55 tools and references..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} autoFocus />
            {searchQuery && <span style={{ fontSize: 14, color: C.muted, cursor: "pointer" }} onClick={() => setSearchQuery("")}>✕</span>}
          </div>
        </div>
        <div style={t.content}>
          {searchQuery.length > 1 ? (
            <SearchResults query={searchQuery} onNavigate={navigate} />
          ) : (
            <>
              <div style={t.secLabel}>All Tools — Browse</div>
              {CATEGORIES.map(cat => (
                <div key={cat.id} style={{ marginBottom: 10 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: cat.color, marginBottom: 6 }}>{cat.icon} {cat.label}</div>
                  <div style={t.listCard}>
                    {Object.entries(SCREENS).filter(([, v]) => v.category === cat.id).map(([id, s], i, arr) => (
                      <div key={id} style={{ ...t.srItem, ...(i === arr.length - 1 ? { borderBottom: "none" } : {}) }} onClick={() => navigate(id)}>
                        <div style={{ flex: 1 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                            <span style={t.srLabel}>{s.label}</span>
                            {s.tier === "pro" && <span style={t.proLock}>PRO</span>}
                          </div>
                          <div style={t.srDesc}>{s.desc}</div>
                        </div>
                        <span style={t.liArrow}>›</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
      <BottomNav active={navTab} onChange={id => { setNavTab(id); setScreen(null); }} />
    </>
  );

  // Default: Home
  return (
    <>
      <HomeScreen
        recent={recent}
        onNavigate={navigate}
        onCategory={goCategory}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <BottomNav active={navTab} onChange={id => { setNavTab(id); setScreen(null); setSearchQuery(""); }} />
    </>
  );
}
