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
// Sources: ASME PCC-1 (pressure vessel bolt assembly), AISC (structural bolting),
// IFI Fastener Standards 7th Edition, Nord-Lock Group installation guidance,
// Portland Bolt installation resources, Henkel/Loctite technical data,
// Engineers Edge, MachineDesign.com fastener installation guides

const INSTALLATION_STEPS = [
  {
    phase: "Before You Start",
    color: "#2563EB",
    bg: "#EFF6FF",
    icon: "??",
    steps: [
      {
        title: "Verify you have the correct fastener",
        detail: "Check head markings against specification. Grade 8 = 6 radial lines. Grade 5 = 3 radial lines. Metric 10.9 = stamped on head. Never assume — always verify before installing.",
        critical: true,
      },
      {
        title: "Check the torque specification",
        detail: "Know your target torque before picking up a wrench. Confirm whether it's a dry or lubricated value. Never apply dry torque values to lubricated fasteners — this will overtorque the joint.",
        critical: true,
      },
      {
        title: "Inspect fasteners for damage",
        detail: "Check for bent shanks, crossed or damaged threads, corrosion, or deformed heads. Reject any damaged fasteners — never install a questionable fastener.",
        critical: false,
      },
      {
        title: "Inspect holes and tapped threads",
        detail: "Clear debris, chips, and old threadlocker from holes. Verify thread condition with finger or tap. Check for damaged threads in tapped holes before assembly.",
        critical: false,
      },
      {
        title: "Prepare bearing surfaces",
        detail: "Clean bearing surfaces (under heads, nut faces, washer contact areas) of dirt, paint, scale, and debris. Rough or dirty bearing surfaces dramatically increase torque scatter.",
        critical: false,
      },
    ],
  },
  {
    phase: "Chemical Application",
    color: "#059669",
    bg: "#F0FDF4",
    icon: "??",
    steps: [
      {
        title: "Apply threadlocker if specified",
        detail: "Apply to male threads before assembly. Apply 2–3 drops to the first engaged threads. Do not apply to the first 1–2 threads — this prevents contamination of the joint surface. Allow cure time before loading.",
        critical: false,
      },
      {
        title: "Apply anti-seize if required",
        detail: "Required for stainless fasteners, high-temperature applications, and dissimilar metals. Apply to male threads only. Thin coat — do not pack the threads. REDUCE torque by 25–35% when using anti-seize.",
        critical: true,
      },
      {
        title: "Apply lubrication if specified",
        detail: "If lubricant is specified in the torque procedure, apply consistently to bearing surfaces and threads. Inconsistent lubrication causes torque scatter — the most common source of incorrect preload.",
        critical: false,
      },
    ],
  },
  {
    phase: "Assembly",
    color: "#D97706",
    bg: "#FFF8E7",
    icon: "??",
    steps: [
      {
        title: "Start all fasteners by hand",
        detail: "Thread every fastener in by hand for at least 3–4 full turns before using tools. This confirms thread engagement and prevents cross-threading. One cross-threaded fastener can ruin an expensive part.",
        critical: true,
      },
      {
        title: "Snug all fasteners before torquing",
        detail: "Run all fasteners to snug contact (joint members touching) before torquing any to final value. This seats the joint and prevents warping during sequential tightening.",
        critical: true,
      },
      {
        title: "Follow the correct tightening pattern",
        detail: "Circular/flange patterns: use a star or cross pattern (opposite bolts). Linear patterns: start from the center and work outward. Never torque in a rotational circle — creates uneven clamping.",
        critical: true,
      },
      {
        title: "Tighten in multiple passes",
        detail: "Pass 1: 30% of final torque. Pass 2: 70% of final torque. Pass 3: 100% of final torque. Follow same pattern each pass. Multiple passes equalize bolt load and allow joint to seat properly.",
        critical: false,
      },
      {
        title: "Use a calibrated torque wrench",
        detail: "Never use an impact wrench for final torque. Use a calibrated click-type or digital torque wrench. Apply torque smoothly and continuously — jerky application reduces accuracy. Stop when the wrench clicks.",
        critical: true,
      },
    ],
  },
  {
    phase: "Verification",
    color: "#7C3AED",
    bg: "#F5F3FF",
    icon: "✓",
    steps: [
      {
        title: "Verify final torque",
        detail: "After completing all passes, spot-check 10–20% of fasteners by attempting to advance the torque. A properly torqued fastener should not advance. If it advances easily, re-torque the entire pattern.",
        critical: false,
      },
      {
        title: "Re-torque after initial operation",
        detail: "For gasketed joints, flanges, and high-temperature applications: re-torque after first heat cycle or after initial operation. Embedment relaxation can reduce preload 10–15% in the first cycle.",
        critical: false,
      },
      {
        title: "Mark fasteners after final torque",
        detail: "For maintenance tracking, mark torqued fasteners with paint pen or torque seal. Allows quick visual verification during inspection that fasteners haven't loosened.",
        critical: false,
      },
    ],
  },
];

const TORQUE_SEQUENCE_PATTERNS = [
  {
    name: "Circular Flange Pattern",
    description: "Star/cross pattern — torque opposite bolts in sequence",
    pattern: "1→5→3→7→2→6→4→8 (for 8-bolt flange)",
    why: "Prevents flange distortion and uneven gasket compression. Equal preload distribution essential for leak-free gasketed joints.",
    applies: "Pipe flanges, cylinder heads, pressure vessel covers, any circular bolt pattern",
  },
  {
    name: "Linear Pattern (Multiple Bolts)",
    description: "Start from center, work outward in both directions",
    pattern: "Center → Left of center → Right of center → Continue outward",
    why: "Prevents warping of long joints. Center-out loading seats the joint evenly without creating bow or camber in the mating surfaces.",
    applies: "Machine bases, long covers, structural connections with multiple bolts in a line",
  },
  {
    name: "Two-Bolt Pattern",
    description: "Alternating tightening in passes",
    pattern: "Bolt 1 at 30% → Bolt 2 at 30% → Bolt 1 at 70% → Bolt 2 at 70% → Bolt 1 at 100% → Bolt 2 at 100%",
    why: "Alternating prevents one side from being fully clamped while the other is loose.",
    applies: "Two-bolt flanges, clamps, couplings",
  },
  {
    name: "Four-Bolt Pattern",
    description: "Opposite pairs in sequence",
    pattern: "12 o'clock → 6 o'clock → 3 o'clock → 9 o'clock (repeat for each pass)",
    why: "Distributes load evenly across four points simultaneously.",
    applies: "Small 4-bolt flanges, mounting plates, bearing housings",
  },
];

const REUSE_GUIDE = [
  { type: "Standard hex bolts (Grade 5, 8)", reuse: "Generally acceptable if undamaged", limit: "Inspect threads, shank, and head. Replace if any damage, corrosion, or deformation visible.", color: "#059669" },
  { type: "Torque-to-yield (TTY) bolts", reuse: "NEVER reuse", limit: "TTY bolts are designed to yield during tightening. They cannot be accurately re-torqued. Common in automotive (head bolts, rod bolts).", color: "#DC2626" },
  { type: "Nyloc / prevailing torque nuts", reuse: "Limited reuse — max 3–5 times", limit: "Nylon insert degrades with each use. Replace when prevailing torque drops below minimum or nylon shows damage.", color: "#D97706" },
  { type: "Structural bolts (A325/A490)", reuse: "Generally not recommended", limit: "AISC does not permit reuse of pretensioned structural bolts. Snug-tight bolts may be reused if undamaged.", color: "#DC2626" },
  { type: "Stud bolts (A193 B7)", reuse: "Acceptable with inspection", limit: "Inspect threads, check for elongation. Measure diameter at shank — if necking visible, replace.", color: "#D97706" },
  { type: "Flange bolts with anti-seize", reuse: "Acceptable with cleaning and reapplication", limit: "Clean old anti-seize, inspect threads and sealing surfaces, apply fresh anti-seize before reinstallation.", color: "#059669" },
  { type: "Snap-off or tension indicator bolts", reuse: "NEVER reuse", limit: "Designed for single use only. Head breaks off at calibrated torque — cannot be reused.", color: "#DC2626" },
];

export default function InstallationBestPractices() {
  const [activeTab, setActiveTab] = useState("steps");
  const [expandedStep, setExpandedStep] = useState(null);

  return (
    <div style={{ fontFamily: "'DM Sans','Segoe UI',sans-serif", background: BG, minHeight: "100vh", maxWidth: 430, margin: "0 auto" }}>

      {/* HEADER */}
      <div style={{ background: `linear-gradient(135deg, ${NAVY} 0%, #2C5282 100%)`, padding: "16px 20px 20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
          <span style={{ fontSize: 20 }}>⬡</span>
          <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 10, letterSpacing: 2, textTransform: "uppercase" }}>Fastener Companion</span>
        </div>
        <div style={{ color: WHITE, fontSize: 20, fontWeight: 800, marginBottom: 2 }}>Installation Best Practices</div>
        <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 11 }}>ASME PCC-1 · AISC · IFI 7th Ed. · Nord-Lock · Portland Bolt</div>
      </div>

      {/* TABS */}
      <div style={{ background: WHITE, borderBottom: `1px solid ${BORDER}`, padding: "0 8px", display: "flex", overflowX: "auto", scrollbarWidth: "none" }}>
        {[
          { id: "steps", label: "Step by Step" },
          { id: "patterns", label: "Torque Patterns" },
          { id: "reuse", label: "Reuse Guide" },
        ].map(t => (
          <button key={t.id} onClick={() => setActiveTab(t.id)}
            style={{
              background: "none", border: "none", cursor: "pointer", padding: "12px 14px",
              fontSize: 12, fontWeight: 700, fontFamily: "inherit", whiteSpace: "nowrap",
              color: activeTab === t.id ? NAVY : MUTED,
              borderBottom: activeTab === t.id ? `3px solid ${AMBER}` : "3px solid transparent",
            }}>{t.label}</button>
        ))}
      </div>

      {activeTab === "steps" && (
        <div style={{ padding: "12px 16px" }}>
          <div style={{ background: STAR_BG, border: `1px solid ${STAR_BORDER}`, borderRadius: 10, padding: "10px 14px", marginBottom: 14 }}>
            <div style={{ fontSize: 11, color: "#92400E", lineHeight: 1.5 }}>
              <strong>95% of fastener failures occur during installation.</strong> Following proper procedure — especially correct torque, multiple passes, and star pattern — prevents nearly all installation-related failures.
            </div>
          </div>
          {INSTALLATION_STEPS.map((phase, pi) => (
            <div key={pi} style={{ marginBottom: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                <span style={{ fontSize: 18 }}>{phase.icon}</span>
                <div style={{ fontSize: 14, fontWeight: 800, color: phase.color }}>{phase.phase}</div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {phase.steps.map((step, si) => {
                  const key = `${pi}-${si}`;
                  return (
                    <div key={si}>
                      <div onClick={() => setExpandedStep(expandedStep === key ? null : key)}
                        style={{
                          background: step.critical ? phase.bg : WHITE,
                          border: `1px solid ${step.critical ? phase.color : BORDER}`,
                          borderLeft: `4px solid ${step.critical ? phase.color : BORDER}`,
                          borderRadius: expandedStep === key ? "10px 10px 0 0" : 10,
                          padding: "10px 14px", cursor: "pointer",
                          display: "flex", justifyContent: "space-between", alignItems: "center",
                        }}>
                        <div style={{ flex: 1 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                            {step.critical && <span style={{ fontSize: 10, fontWeight: 800, color: phase.color, background: phase.bg, padding: "1px 6px", borderRadius: 4, border: `1px solid ${phase.color}` }}>CRITICAL</span>}
                          </div>
                          <div style={{ fontSize: 13, fontWeight: 700, color: NAVY, marginTop: step.critical ? 4 : 0 }}>{step.title}</div>
                        </div>
                        <span style={{ color: MUTED, fontSize: 14, marginLeft: 8 }}>{expandedStep === key ? "▲" : "▼"}</span>
                      </div>
                      {expandedStep === key && (
                        <div style={{ background: "#F8FAFC", border: `1px solid ${BORDER}`, borderTop: "none", borderRadius: "0 0 10px 10px", padding: "10px 14px" }}>
                          <div style={{ fontSize: 12, color: TEXT, lineHeight: 1.7 }}>{step.detail}</div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "patterns" && (
        <div style={{ padding: "14px 16px", display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ background: STAR_BG, border: `1px solid ${STAR_BORDER}`, borderRadius: 10, padding: "10px 14px" }}>
            <div style={{ fontSize: 11, color: "#92400E", lineHeight: 1.5 }}>
              <strong>The pattern matters as much as the torque value.</strong> Torquing in the wrong sequence can warp joint surfaces, damage gaskets, and create uneven clamping that causes leaks and failures even at correct torque.
            </div>
          </div>
          {TORQUE_SEQUENCE_PATTERNS.map((pattern, i) => (
            <div key={i} style={{ background: WHITE, border: `1px solid ${BORDER}`, borderRadius: 12, overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
              <div style={{ background: NAVY, padding: "10px 14px" }}>
                <div style={{ color: WHITE, fontSize: 13, fontWeight: 800 }}>{pattern.name}</div>
                <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 11, marginTop: 2 }}>{pattern.description}</div>
              </div>
              <div style={{ padding: "12px 14px" }}>
                <div style={{ background: STAR_BG, border: `1px solid ${STAR_BORDER}`, borderRadius: 8, padding: "8px 12px", marginBottom: 10 }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: "#92400E", marginBottom: 3, textTransform: "uppercase", letterSpacing: 0.8 }}>Sequence</div>
                  <div style={{ fontSize: 12, fontFamily: "monospace", color: NAVY, fontWeight: 700 }}>{pattern.pattern}</div>
                </div>
                <div style={{ marginBottom: 8 }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: MUTED, textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 3 }}>Why This Pattern</div>
                  <div style={{ fontSize: 12, color: TEXT, lineHeight: 1.5 }}>{pattern.why}</div>
                </div>
                <div style={{ background: "#EFF6FF", borderRadius: 8, padding: "8px 12px" }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: "#2563EB", marginBottom: 2, textTransform: "uppercase", letterSpacing: 0.8 }}>Applies To</div>
                  <div style={{ fontSize: 12, color: TEXT }}>{pattern.applies}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "reuse" && (
        <div style={{ padding: "14px 16px" }}>
          <div style={{ background: "#FFF1F2", border: "1px solid #FECDD3", borderRadius: 10, padding: "10px 14px", marginBottom: 12 }}>
            <div style={{ fontSize: 11, color: "#9F1239", lineHeight: 1.5 }}>
              <strong>When in doubt, replace.</strong> Fastener cost is trivial compared to the cost of a joint failure. Always replace torque-to-yield bolts, severely corroded fasteners, and any fastener with visible damage.
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {REUSE_GUIDE.map((item, i) => (
              <div key={i} style={{ background: WHITE, border: `1px solid ${BORDER}`, borderLeft: `4px solid ${item.color}`, borderRadius: 12, padding: "12px 14px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
                <div style={{ fontSize: 13, fontWeight: 800, color: NAVY, marginBottom: 4 }}>{item.type}</div>
                <div style={{ display: "inline-block", background: item.color + "20", border: `1px solid ${item.color}`, borderRadius: 6, padding: "2px 10px", fontSize: 11, fontWeight: 800, color: item.color, marginBottom: 8 }}>{item.reuse}</div>
                <div style={{ fontSize: 12, color: TEXT, lineHeight: 1.5 }}>{item.limit}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* DISCLAIMER */}
      <div style={{ margin: "0 16px 24px", background: "#FFF1F2", border: "1px solid #FECDD3", borderRadius: 10, padding: "10px 14px" }}>
        <div style={{ fontSize: 10, color: "#9F1239", lineHeight: 1.5 }}>
          <strong>⚠ Verify Before Use.</strong> Installation guidance based on ASME PCC-1, AISC specification, IFI 7th Edition, and Nord-Lock Group technical resources. Always follow equipment manufacturer specifications for critical applications. Fastener Companion is a reference tool — not a substitute for engineering judgment.
        </div>
      </div>
    </div>
  );
}

