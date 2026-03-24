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
// Glossary
// ════════════════════════════════════════════════════

// ─── DATA ─────────────────────────────────────────────────────────────────────
// Sources: ASME B18.12 (Glossary of Terms for Mechanical Fasteners),
// IFI Fastener Standards 7th Edition, ASTM International terminology,
// ISO 1891:2009, Bolt Depot, AFT Fasteners, Electronic Fasteners,
// Portland Bolt, Engineers Edge, Nylok technical glossary

const GLOSSARY_TERMS = [
  // A
  { term: "Acme Thread", category: "Thread", definition: "A thread form with a 29° included angle. Used for power transmission and lead screws (vises, clamps, presses). Not a standard fastening thread — designed for axial force transmission." },
  { term: "Alloy Steel", category: "Material", definition: "Steel containing deliberate additions of alloying elements (chromium, molybdenum, nickel, vanadium) beyond standard carbon steel. Used for Grade 8, A193 B7, and other high-strength fasteners. Example: 4140 (Cr-Mo), 4340 (Ni-Cr-Mo)." },
  { term: "Anchor Bolt", category: "Product", definition: "A fastener embedded in concrete or masonry to attach structural elements. Types include cast-in-place (L-bolt, J-bolt, headed) and post-installed (wedge, sleeve, adhesive). Governed by ACI 318 and ASTM F1554." },
  { term: "Anneal / Annealing", category: "Process", definition: "Heat treatment process that softens metal by heating to a specific temperature then slowly cooling. Used to relieve internal stresses and improve machinability. The opposite of quench and temper." },
  { term: "Anti-Seize", category: "Chemical", definition: "A lubricating compound applied to fastener threads to prevent galling, corrosion welding, and seizing — especially in stainless steel and high-temperature applications. Contains metallic particles (copper, nickel, moly) suspended in grease. Reduces required torque by 25–35%." },
  { term: "ASTM", category: "Standards", definition: "American Society for Testing and Materials. Develops and publishes voluntary consensus technical standards for materials, products, systems, and services. Key fastener standards include A307, A325, A354, A490, A193, F593, and F3125." },
  { term: "Austenitic", category: "Material", definition: "The most common class of stainless steel (300 series — 304, 316, etc.). Non-magnetic, non-heat-treatable, excellent corrosion resistance. Prone to galling — always lubricate during assembly." },
  // B
  { term: "Bearing Surface", category: "Geometry", definition: "The contact surface between a fastener (head underside or nut face) and the clamped part. Quality and flatness of the bearing surface directly affects clamping force accuracy. Washers improve bearing surface conditions." },
  { term: "Belleville Washer", category: "Product", definition: "A conical spring washer that maintains load under vibration and thermal cycling. Also called a disc spring or conical washer. Used in high-vibration applications where standard lock washers are insufficient." },
  { term: "Blind Rivet", category: "Product", definition: "A fastener installed from one side of an assembly. A mandrel (pull stem) is pulled through the rivet body, expanding it to clamp the material. Also called a pop rivet. Common in sheet metal work." },
  { term: "Body", category: "Geometry", definition: "The unthreaded shank portion of a bolt between the head and the start of threads. Also called the grip or shank. Body diameter determines fit in a clearance hole." },
  { term: "Breakloose Torque", category: "Torque", definition: "The torque required to initiate reverse rotation of a tightened fastener. Breakloose torque is typically lower than installation torque due to reduced friction after initial embedment. Used to verify a fastener hasn't loosened." },
  { term: "Brinell Hardness (HB)", category: "Mechanical", definition: "A hardness measurement method using a hardened steel ball pressed into the metal surface. Common for fasteners and raw materials. Brinell values can be converted to Rockwell (HRC) values using standard tables." },
  { term: "Buttress Thread", category: "Thread", definition: "A thread form with one steep flank and one gentle flank. Designed to resist large forces in one direction only. Used in vises, jackscrews, and applications with high unidirectional loading." },
  // C
  { term: "Cadmium Plating", category: "Coating", definition: "An electroplated coating providing excellent corrosion resistance and lubricity. Historically common in aerospace and military. Now largely replaced by zinc due to cadmium toxicity. REACH/RoHS restricted in EU. Still used in specific mil-spec applications." },
  { term: "Cap Screw", category: "Product", definition: "A threaded fastener with a head designed to mate with a tapped hole (not a nut). Manufactured to tighter tolerances than a bolt. Hex cap screw has a washer face under the head — standard hex bolt does not." },
  { term: "Carriage Bolt", category: "Product", definition: "A bolt with a smooth dome head and a square section beneath the head that prevents rotation when inserted into a square hole or wood. Used for wood construction and light structural applications." },
  { term: "Case Hardening", category: "Process", definition: "A heat treatment that hardens only the outer surface (case) of a fastener while leaving the core softer and tougher. Used for self-drilling screws, tapping screws, and some drive screws. Different from through-hardening used for structural fasteners." },
  { term: "Certificate of Conformance (CoC)", category: "Quality", definition: "A document from the manufacturer or distributor stating that a product meets specified requirements. Required for most industrial fastener applications. The minimum acceptable certification. Does not include specific test data — that requires an MTR." },
  { term: "Clamping Force", category: "Mechanical", definition: "The compressive force generated between clamped parts when a fastener is tightened. The primary purpose of any bolted joint. Clamping force = preload. Generated by converting torque into bolt stretch (tension)." },
  { term: "Class (Thread)", category: "Thread", definition: "A designation indicating the tolerance range of a thread. Class 1 = loose fit (easy assembly, allows damage). Class 2 = standard (most common). Class 3 = tight (precision, critical applications). 'A' = external thread, 'B' = internal thread. Example: 2A (standard external)." },
  { term: "Clearance Hole", category: "Geometry", definition: "A hole through which a bolt passes without threading — the bolt head or nut clamps the part. Clearance hole is always larger than bolt nominal diameter. Close, normal, and loose clearance fits are defined per ASME B18.2.8." },
  { term: "Clinch Nut / Clinch Fastener", category: "Product", definition: "A nut or stud pressed or clinched into a thin metal panel. Creates a permanent threaded feature in sheet metal. Common types: PEM, RIVNUT, captive nut. Eliminates need for welded nuts." },
  { term: "Coarse Thread (UNC)", category: "Thread", definition: "Thread series with fewer threads per inch than fine thread. More resistant to cross-threading and stripping. Easier to assemble in dirty conditions. Standard for most general industrial applications. Designated UNC (Unified National Coarse)." },
  { term: "Cold Heading", category: "Process", definition: "The most common fastener manufacturing process. Bolt blanks are cold-formed (not machined) using high-speed presses. Cold heading work-hardens the material, improving strength. Most standard bolts and screws are cold headed." },
  { term: "Corrosion", category: "Material", definition: "The chemical or electrochemical degradation of a metal. Types relevant to fasteners: galvanic (dissimilar metals), crevice (trapped moisture), stress corrosion cracking (SCC), uniform/general, and pitting. Coating selection directly addresses corrosion risk." },
  { term: "Counterbore", category: "Geometry", definition: "A flat-bottomed cylindrical recess that allows a socket head cap screw or button head to sit flush with or below the surface. Specified by diameter and depth." },
  { term: "Countersink", category: "Geometry", definition: "A conical recess that allows a flat head (countersunk) screw to sit flush with the surface. Standard countersink angle for most machine screws is 82°. Metric flat heads use 90°." },
  { term: "Crest", category: "Thread", definition: "The outermost tip of a male (external) thread, or the innermost tip of a female (internal) thread. Crest diameter = major diameter for external threads." },
  // D
  { term: "DIN", category: "Standards", definition: "Deutsches Institut für Normung — German standards organization. DIN fastener standards (e.g. DIN 931, DIN 933, DIN 912) are widely used in European and globally manufactured equipment. Many DIN standards have been superseded by ISO standards but remain in common use." },
  { term: "Double Shear", category: "Mechanical", definition: "A loading condition where a bolt or pin is cut by two parallel forces — loaded at three points. Strength is approximately twice single shear. Common in clevises and lug connections." },
  { term: "Drive Type", category: "Geometry", definition: "The recess or protrusion on a fastener head that accepts a tool. Common types: Phillips, Slotted, Torx/Star, Hex Socket (Allen), Square (Robertson), Combination, Pozidriv, Security (Torx Plus, Pentagon, Tri-Wing, Spanner)." },
  // E
  { term: "Effective Thread Length", category: "Thread", definition: "The length of thread that actually bears load in a joint — not the total threaded length. Minimum effective engagement (usually 1× diameter for steel-to-steel) is required to develop full bolt strength." },
  { term: "Electroplating", category: "Coating", definition: "An electrolytic process that deposits a thin metal coating (zinc, cadmium, nickel, chrome) on a fastener. Provides corrosion resistance and appearance. Typical zinc plate thickness: 0.0002\"–0.0005\" (5–13 microns). Thinner than hot-dip galvanizing." },
  { term: "Embedment Relaxation", category: "Mechanical", definition: "The loss of bolt preload (clamping force) that occurs naturally after initial tightening as surface asperities flatten out. Typically 5–10% of initial preload. Reason for re-torquing in critical applications." },
  // F
  { term: "Fatigue", category: "Mechanical", definition: "Failure of a fastener due to cyclic (repeated) loading at stress levels below static tensile strength. Fatigue cracks initiate at stress concentrations (thread roots, head-to-shank transition). The most common cause of in-service bolt failure." },
  { term: "Fine Thread (UNF)", category: "Thread", definition: "Thread series with more threads per inch than coarse. Higher strength in tension, better vibration resistance, more precise adjustment. More sensitive to cross-threading and contamination. Used in automotive, aerospace, and precision applications." },
  { term: "Flange Bolt", category: "Product", definition: "A bolt with an integral washer-like flange beneath the head. The flange distributes clamping load, eliminating need for a separate washer. Common in automotive and flange connections. Serrated flange provides additional locking." },
  { term: "Flange (Pipe)", category: "Product", definition: "A disc-shaped fitting used to connect pipe sections, valves, and equipment. Bolted flanges use stud bolts (A193 B7) through aligned bolt holes. Governed by ASME B16.5 (pipe flanges) for bolt size, count, and torque." },
  { term: "Friction Coefficient (K-Factor)", category: "Torque", definition: "A dimensionless value representing the friction between mating surfaces during torquing. Also called the nut factor. Dry steel K ≈ 0.20. Lubricated K ≈ 0.15. Anti-seize K ≈ 0.13–0.15. Used in torque-tension formula: T = K × D × F." },
  { term: "Full Thread (FT)", category: "Geometry", definition: "A bolt or stud that is threaded its entire length — no smooth shank/body. Also called 'all-thread' or 'fully threaded.' Common for stud bolts and threaded rod. Length measured end-to-end." },
  // G
  { term: "Galling", category: "Failure", definition: "Cold welding or adhesive wear between mating metal surfaces during assembly — especially common with stainless steel. Caused by high contact pressure and friction. Prevented by lubrication (anti-seize), slower assembly speed, or using dissimilar materials. Once galled, the fastener typically must be destroyed to remove." },
  { term: "Galvanic Corrosion", category: "Material", definition: "Accelerated corrosion that occurs when dissimilar metals are in electrical contact in the presence of an electrolyte (moisture). The less noble (anodic) metal corrodes preferentially. Prevention: use similar metals, isolate with non-conductive washers, apply protective coatings, or use stainless steel." },
  { term: "Galvanizing (Hot-Dip)", category: "Coating", definition: "A coating process where fasteners are immersed in molten zinc (450°C/842°F) to form a zinc-iron alloy layer. Provides superior corrosion resistance compared to electroplating. Typical thickness: 1.7–3.9 mils (43–99 microns). Per ASTM A153. Increases fastener size — threads must be oversized or re-tapped." },
  { term: "Grade Marking", category: "Identification", definition: "Raised or stamped symbols on a bolt head or nut indicating the strength grade. Required by ASTM and SAE standards. SAE: radial lines (3 = Grade 5, 6 = Grade 8). Metric: property class numbers (8.8, 10.9, 12.9). Manufacturer ID mark also required." },
  { term: "Grip Length", category: "Geometry", definition: "The distance from the bearing surface of the bolt head to the first full thread — the unthreaded shank length that grips the joint material. For best joint performance, grip length should equal the thickness of clamped material." },
  // H
  { term: "Hardness", category: "Mechanical", definition: "A material's resistance to surface indentation or scratching. Measured on Rockwell (HRC, HRB), Brinell (HB), or Vickers (HV) scales. For fasteners, higher hardness generally means higher strength but lower toughness. Grade 8 typically HRC 33–39." },
  { term: "Head Height", category: "Geometry", definition: "The distance from the bearing surface (underside) to the top of the fastener head. A critical dimension for clearance and socket engagement. Standard and heavy hex heads have different heights for the same diameter." },
  { term: "Helicoil", category: "Product", definition: "A brand name (Heli-Coil) for a threaded wire insert used to repair stripped threads or provide stronger threads in soft materials. Installed in an oversized tapped hole. Generic term: thread insert or coil insert. Alternatives: E-Z Lok, Keensert, Recoil." },
  { term: "Hot-Dip Galvanized (HDG)", category: "Coating", definition: "See Galvanizing. HDG is the standard abbreviation. Provides the best corrosion protection of common zinc coatings. Required for exterior structural steel per ASTM A123 (shapes) and A153 (hardware/fasteners)." },
  { term: "Hydrogen Embrittlement (HE)", category: "Failure", definition: "A form of fastener failure caused by absorption of hydrogen during plating, pickling, or service in hydrogen-rich environments. High-strength fasteners (Grade 8, 10.9, 12.9, A490) are most susceptible. Causes sudden brittle fracture below rated load. Prevention: bake after plating (per ASTM F1941), avoid galvanizing high-strength steels." },
  // I
  { term: "IFI", category: "Standards", definition: "Industrial Fasteners Institute. A trade association that publishes technical standards and reference data for fasteners. The IFI Fastener Standards manual (7th Edition) is a key industry reference for torque values, dimensions, and specifications." },
  { term: "Inch-Pound (in-lb)", category: "Torque", definition: "A unit of torque. 1 ft-lb = 12 in-lb. Used for small fasteners where foot-pounds would give very small numbers. Most common for fasteners under 1/4\" diameter. 1 in-lb = 0.113 Nm." },
  { term: "ISO", category: "Standards", definition: "International Organization for Standardization. Develops international standards including ISO 898-1 (metric bolt property classes), ISO 3506 (stainless fasteners), ISO 261/262 (metric thread dimensions), and ISO 68-1 (thread form)." },
  // J
  { term: "JIS", category: "Standards", definition: "Japanese Industrial Standards. Japan's national standards body. JIS fastener standards (e.g. JIS B1051 for bolts) specify Japanese alloy steels (SCM435, SCM440) not readily available in US supply chains. JIS fasteners are common in Japanese-manufactured equipment and present sourcing challenges in North America." },
  { term: "Joint Relaxation", category: "Mechanical", definition: "The loss of clamping force in a bolted joint over time due to embedment, stress relaxation, and creep. Most relaxation occurs within the first few hours after tightening. Re-torquing after initial relaxation (especially on gasketed joints) restores clamping force." },
  // K
  { term: "K-Factor", category: "Torque", definition: "See Friction Coefficient. The nut factor used in torque-tension calculations. Typical values: dry uncoated K=0.20, zinc plated K=0.17, lubricated K=0.15, anti-seize K=0.13." },
  { term: "Keensert", category: "Product", definition: "A brand name for a solid threaded insert (key-locking insert) that provides stronger thread repair than coil inserts. Driven in with a special tool and locked with keys that deform into the parent material. Better for soft metals and high-load applications." },
  // L
  { term: "Lead (Thread)", category: "Thread", definition: "The distance a fastener advances axially in one complete revolution. For single-start threads (standard fasteners), lead equals pitch. For multi-start threads, lead = pitch × number of starts." },
  { term: "Left-Hand Thread (LH)", category: "Thread", definition: "A thread that advances when rotated counterclockwise (opposite of standard). Designated by 'LH' in callout. Used on left side wheel lug nuts, turnbuckles, and applications where right-hand rotation would loosen the fastener. Identified in field by chamfered end or LH marking." },
  { term: "Lock Washer", category: "Product", definition: "A washer designed to resist fastener loosening through mechanical means. Types: split (helical spring), tooth (internal/external serrated), wave, and toothed lock. Effectiveness is debated — Nordlock and Belleville designs are more reliable for high-vibration applications." },
  { term: "Locking Element", category: "Product", definition: "Any feature that prevents fastener loosening: nylon insert (nyloc nut), distorted thread, adhesive (Loctite), prevailing torque, lock wire, or cotter pin. Choice depends on application, temperature, and whether disassembly is needed." },
  { term: "Loctite", category: "Chemical", definition: "Brand name for anaerobic adhesive threadlockers made by Henkel. Common grades: Blue (242/243) = medium strength, removable. Red (262/271) = high strength, permanent. Green (290) = wicking grade for assembled parts. Purple (222) = low strength, small fasteners." },
  // M
  { term: "Major Diameter", category: "Thread", definition: "The largest diameter of a screw thread. For external (male) threads, measured at the crest. For internal (female) threads, measured at the root. The nominal bolt diameter corresponds to the major diameter." },
  { term: "Mill Test Report (MTR)", category: "Quality", definition: "A document from the steel mill certifying the chemical composition and mechanical properties of the specific heat/lot of steel used to manufacture a fastener. Required for pressure vessels, structural, and safety-critical applications. More rigorous than a CoC — contains actual test data." },
  { term: "Minor Diameter", category: "Thread", definition: "The smallest diameter of a screw thread. For external threads, measured at the root (valley). For internal threads, measured at the crest. Also called root diameter. The minor diameter determines the thread's tensile stress area." },
  { term: "Metric Thread", category: "Thread", definition: "Thread system using millimeter dimensions. Designated with 'M' prefix (e.g. M10 × 1.5). Pitch measured in mm distance between thread crests. Governed by ISO 261, ISO 262, and ISO 68-1. Standard thread angle is 60° — same as unified inch threads." },
  // N
  { term: "Nominal Diameter", category: "Geometry", definition: "The reference diameter used to identify a fastener size (e.g. 1/2\", M10). Actual measured diameter will be slightly smaller than nominal due to manufacturing tolerances. A 1/2\" bolt typically measures 0.490\"–0.498\"." },
  { term: "Nut Factor", category: "Torque", definition: "See K-Factor / Friction Coefficient." },
  { term: "Nyloc Nut (Nylon Insert Lock Nut)", category: "Product", definition: "A prevailing torque nut with a nylon collar that deforms over the bolt threads, creating resistance to loosening. Effective for vibration resistance. Maximum service temperature approximately 250°F (121°C) — the nylon degrades at higher temperatures. Single-use preferred but can be reused if torque remains acceptable." },
  // P
  { term: "Pitch", category: "Thread", definition: "For metric threads: the distance in millimeters between adjacent thread crests. For imperial threads: the reciprocal of TPI (1÷TPI = pitch in inches). A coarser pitch = larger number = fewer threads per inch." },
  { term: "Pitch Diameter", category: "Thread", definition: "The diameter at which the thread width equals the space between threads. The most important thread dimension for fit and function. Thread gages check pitch diameter. Approximately halfway between major and minor diameter." },
  { term: "Preload", category: "Mechanical", definition: "The tension (stretch) induced in a bolt during tightening. Preload = clamping force. The fundamental purpose of torquing a bolt. Preload keeps joint members in compression, preventing fatigue, loosening, and leakage. Approximately 75% of proof load is typical target preload." },
  { term: "Prevailing Torque", category: "Torque", definition: "The torque required to run a self-locking nut down the bolt threads before seating — caused by the locking mechanism (nylon insert, distorted thread, etc.). Must be added to the tightening torque when calculating total installation torque." },
  { term: "Proof Load", category: "Mechanical", definition: "The maximum load a fastener can withstand without permanent deformation. Approximately 85–92% of yield strength. The basis for torque table calculations. A fastener torqued to 75% of proof load is typically at the design clamping force." },
  { term: "Property Class (Metric)", category: "Mechanical", definition: "The metric equivalent of SAE grade markings. Two numbers: first × 100 = tensile strength in MPa; second × 10% = yield/tensile ratio. Example: 8.8 = 800 MPa tensile, 80% yield ratio (640 MPa yield). Per ISO 898-1." },
  // Q
  { term: "Quench and Temper (Q&T)", category: "Process", definition: "A two-stage heat treatment: quenching (rapid cooling in water or oil) hardens the steel; tempering (reheating to lower temperature) reduces brittleness. Used to achieve the mechanical properties of Grade 5, Grade 8, A325, A193 B7, and other high-strength fasteners." },
  // R
  { term: "Rockwell Hardness (HRC)", category: "Mechanical", definition: "A common hardness test for fasteners using a diamond indenter. The C scale (HRC) is used for hard materials like high-strength fasteners. Grade 8 = HRC 33–39. Can be converted to tensile strength using published conversion tables." },
  { term: "Root", category: "Thread", definition: "The innermost surface connecting the flanks of adjacent threads. Root diameter = minor diameter for external threads. Thread failures (fatigue cracks) typically initiate at the root due to stress concentration." },
  { term: "Rust", category: "Material", definition: "Iron oxide formed when steel is exposed to oxygen and moisture. The visible red/orange product of corrosion on unprotected carbon steel fasteners. Prevented by coatings, alloy selection (stainless), or environmental control." },
  // S
  { term: "SAE", category: "Standards", definition: "Society of Automotive Engineers (now SAE International). Develops technical standards for the automotive and aerospace industries. Key fastener standard: SAE J429 (mechanical properties of externally threaded fasteners — defines Grades 2, 5, and 8)." },
  { term: "Self-Drilling Screw", category: "Product", definition: "A screw with a drill point that eliminates the need for a pre-drilled pilot hole. The drill point (designated #1–#5 based on material thickness capacity) drills through the material before threads engage. Also called Tek screws (brand name)." },
  { term: "Set Screw", category: "Product", definition: "A headless screw threaded its full length, tightened with a hex key into the driver recess. Used to secure components onto shafts or in housings. Point types: cup (most common), cone, flat, dog, oval, knurl cup — each with different grip characteristics." },
  { term: "Shank", category: "Geometry", definition: "The cylindrical body of a bolt between the head and the thread. Also called the body or grip. The shank bears shear load when a bolt is loaded laterally. Shank diameter is the nominal diameter." },
  { term: "Single Shear", category: "Mechanical", definition: "A loading condition where a bolt is cut by one shear plane — loaded at two points. Standard shear load condition for most bolted connections." },
  { term: "Snug Tight", category: "Torque", definition: "A tightening condition in structural bolting (AISC) where the full effort of a worker using a standard wrench or a few impacts of an impact wrench brings the joint to full contact. The minimum tightening condition for A325/A490 bolts — not the same as pretensioned." },
  { term: "Stress Area", category: "Mechanical", definition: "The effective cross-sectional area used to calculate bolt tensile strength — based on pitch diameter, not full cross section or minor diameter. Used in all tensile strength calculations. Always less than the full cross-section area." },
  { term: "Stud Bolt", category: "Product", definition: "A cylindrical fastener threaded on both ends (or fully threaded) with no head. Used in flanged connections, pressure vessels, and engine applications. Types: full thread, double end (equal thread length each end), tap end (one end shorter for threading into a tapped hole)." },
  // T
  { term: "Tap", category: "Tool", definition: "A cutting tool used to create internal threads in a drilled hole. Types: taper (starting), plug (general purpose), bottoming (threads to the bottom of a blind hole). Must match thread pitch and size of intended fastener." },
  { term: "Tensile Strength", category: "Mechanical", definition: "The maximum stress a material can withstand before fracturing. The highest load a fastener can carry before breaking. For fasteners, specified as minimum tensile strength in psi or MPa. Grade 8 = 150,000 psi (1034 MPa). Not to be confused with proof load or yield strength." },
  { term: "Thread Engagement", category: "Thread", definition: "The length of thread contact between a bolt and nut or tapped hole. Minimum engagement for full strength: 1× bolt diameter in steel, 1.5× in aluminum, 2× in cast iron/soft materials. Insufficient engagement causes stripping before bolt breakage." },
  { term: "Thread Pitch", category: "Thread", definition: "The distance between adjacent thread crests, measured in mm (metric) or as TPI (threads per inch, imperial). Coarse pitch = fewer threads per inch / larger mm value. Fine pitch = more threads per inch / smaller mm value." },
  { term: "Threadlocker", category: "Chemical", definition: "An anaerobic adhesive applied to threads before assembly to prevent loosening and seal against leakage. Cures in the absence of air when confined between metal surfaces. Loctite is the dominant brand. Strength depends on grade (color): purple < blue < red." },
  { term: "Torque", category: "Torque", definition: "A rotational force applied to a fastener to generate clamping force (preload). Measured in ft-lb, in-lb, or Nm. Torque is a means to an end — the actual goal is correct preload. Friction variation means equal torque does not guarantee equal preload." },
  { term: "Torque-Tension Relationship", category: "Torque", definition: "The relationship between applied torque and resulting bolt tension (preload). Approximately 90% of applied torque overcomes friction — only 10% goes into actual bolt stretch. This is why lubrication so dramatically affects required torque for a given preload." },
  { term: "TPI (Threads Per Inch)", category: "Thread", definition: "The number of complete thread crests in one inch of thread length. Used for imperial threads. Higher TPI = finer thread. 1/2\"-13 UNC = 13 TPI. Metric equivalent is pitch in mm. Conversion: TPI = 25.4 ÷ pitch (mm)." },
  // U
  { term: "UNC", category: "Thread", definition: "Unified National Coarse. The standard coarse thread series for imperial fasteners. Fewer threads per inch than UNF. Most common for general industrial, construction, and maintenance applications. Defined in ASME B1.1." },
  { term: "UNF", category: "Thread", definition: "Unified National Fine. Imperial fine thread series with more threads per inch than UNC for the same diameter. Better vibration resistance, higher clamp load precision, used in automotive, aerospace, and thin-section applications. Defined in ASME B1.1." },
  { term: "UNEF", category: "Thread", definition: "Unified National Extra Fine. Highest TPI of the standard inch thread series. Used in thin-walled parts, instruments, and aerospace where maximum thread engagement in minimum length is required." },
  // W
  { term: "Washer Face", category: "Geometry", definition: "A circular bearing surface machined under the head of a hex cap screw or nut. Provides consistent, flat bearing contact. Hex cap screws have washer faces — standard hex bolts do not. Improves load distribution and torque consistency." },
  { term: "Width Across Flats (WAF)", category: "Geometry", definition: "The distance between two opposite flat faces of a hex head or nut. The WAF determines the wrench/socket size. Also called 'across flats' or 'AF'. Not the same as width across corners (WAC), which is larger." },
  // Y
  { term: "Yield Strength", category: "Mechanical", definition: "The stress at which a material begins to permanently deform (yield). Below yield = elastic (returns to original shape). Above yield = permanent deformation (stretch). Fasteners should not be loaded above yield in service. Grade 8 yield = 130,000 psi (896 MPa)." },
  // Z
  { term: "Zinc Flake Coating", category: "Coating", definition: "A coating system (Geomet, Dacromet, Magni) applying zinc and aluminum flakes in an inorganic binder. Very thin (8–12 microns) but excellent corrosion resistance (1,000+ hours salt spray). Does not affect thread dimensions. Does not cause hydrogen embrittlement. Per ISO 10683." },
  { term: "Zinc Plating", category: "Coating", definition: "An electroplated zinc coating providing moderate corrosion resistance. Most common fastener finish. Typical thickness: 0.0002\"–0.0005\" (5–13 microns). Much thinner than HDG. Per ASTM B633. Also called electrogalvanizing or EG." },
];

const CATEGORIES = ["All", "Thread", "Material", "Product", "Mechanical", "Torque", "Coating", "Geometry", "Standards", "Quality", "Process", "Chemical", "Failure", "Identification"];

const CAT_COLORS = {
  Thread: "#2563EB", Material: "#059669", Product: "#7C3AED",
  Mechanical: "#DC2626", Torque: "#D97706", Coating: "#0891B2",
  Geometry: "#64748B", Standards: "#1B3A6B", Quality: "#D97706",
  Process: "#7C3AED", Chemical: "#059669", Failure: "#DC2626",
  Identification: "#D97706",
};

export default function Glossary() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [expanded, setExpanded] = useState(null);

  const filtered = GLOSSARY_TERMS.filter(t =>
    (category === "All" || t.category === category) &&
    (t.term.toLowerCase().includes(search.toLowerCase()) ||
      t.definition.toLowerCase().includes(search.toLowerCase()))
  );

  const alphabet = [...new Set(filtered.map(t => t.term[0].toUpperCase()))].sort();

  return (
    <div style={{ fontFamily: "'DM Sans','Segoe UI',sans-serif", background: BG, minHeight: "100vh", maxWidth: 430, margin: "0 auto" }}>

      {/* HEADER */}
      <div style={{ background: `linear-gradient(135deg, ${NAVY} 0%, #2C5282 100%)`, padding: "16px 20px 20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
          <span style={{ fontSize: 20 }}>⬡</span>
          <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 10, letterSpacing: 2, textTransform: "uppercase" }}>Fastener Companion</span>
        </div>
        <div style={{ color: WHITE, fontSize: 20, fontWeight: 800, marginBottom: 2 }}>Glossary of Terms</div>
        <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 11 }}>ASME B18.12 · IFI 7th Ed. · ASTM · ISO 1891 · {GLOSSARY_TERMS.length} terms defined</div>
        <div style={{ background: WHITE, borderRadius: 12, display: "flex", alignItems: "center", padding: "10px 14px", gap: 8, marginTop: 14, boxShadow: "0 2px 8px rgba(0,0,0,0.15)" }}>
          <span style={{ color: MUTED }}>??</span>
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search terms or definitions..."
            style={{ background: "none", border: "none", outline: "none", color: TEXT, fontSize: 14, flex: 1, fontFamily: "inherit" }} />
          {search && <span onClick={() => setSearch("")} style={{ color: MUTED, cursor: "pointer" }}>✕</span>}
        </div>
      </div>

      {/* CATEGORY FILTER */}
      <div style={{ background: WHITE, borderBottom: `1px solid ${BORDER}`, padding: "8px 12px", display: "flex", gap: 6, overflowX: "auto", scrollbarWidth: "none" }}>
        {CATEGORIES.map(cat => (
          <button key={cat} onClick={() => setCategory(cat)}
            style={{
              flexShrink: 0, padding: "5px 12px", borderRadius: 20,
              border: `1.5px solid ${category === cat ? (CAT_COLORS[cat] || NAVY) : BORDER}`,
              background: category === cat ? (CAT_COLORS[cat] || NAVY) : WHITE,
              color: category === cat ? WHITE : MUTED,
              fontSize: 11, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", whiteSpace: "nowrap",
            }}>{cat}</button>
        ))}
      </div>

      {/* COUNT */}
      <div style={{ padding: "10px 16px 0" }}>
        <div style={{ fontSize: 11, color: MUTED }}>{filtered.length} term{filtered.length !== 1 ? "s" : ""} {category !== "All" ? `in ${category}` : ""}{search ? ` matching "${search}"` : ""}</div>
      </div>

      {/* TERMS LIST */}
      <div style={{ padding: "8px 16px 24px" }}>
        {alphabet.map(letter => (
          <div key={letter}>
            <div style={{ fontSize: 18, fontWeight: 800, color: AMBER, padding: "12px 0 6px", borderBottom: `2px solid ${AMBER}`, marginBottom: 8 }}>{letter}</div>
            {filtered.filter(t => t.term[0].toUpperCase() === letter).map((term, i) => (
              <div key={i} style={{ marginBottom: 6 }}>
                <div onClick={() => setExpanded(expanded === `${letter}-${i}` ? null : `${letter}-${i}`)}
                  style={{
                    background: WHITE, border: `1px solid ${BORDER}`,
                    borderLeft: `3px solid ${CAT_COLORS[term.category] || NAVY}`,
                    borderRadius: expanded === `${letter}-${i}` ? "10px 10px 0 0" : 10,
                    padding: "10px 14px", cursor: "pointer",
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                  }}>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: NAVY }}>{term.term}</div>
                    <div style={{ fontSize: 10, color: CAT_COLORS[term.category] || MUTED, fontWeight: 600, marginTop: 1 }}>{term.category}</div>
                  </div>
                  <span style={{ color: MUTED, fontSize: 14 }}>{expanded === `${letter}-${i}` ? "▲" : "▼"}</span>
                </div>
                {expanded === `${letter}-${i}` && (
                  <div style={{ background: "#F8FAFC", border: `1px solid ${BORDER}`, borderTop: "none", borderRadius: "0 0 10px 10px", padding: "10px 14px" }}>
                    <div style={{ fontSize: 12, color: TEXT, lineHeight: 1.7 }}>{term.definition}</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: 40, color: MUTED, fontSize: 13 }}>No terms found matching your search.</div>
        )}
      </div>
    </div>
  );
}
