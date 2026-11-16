/* Edit your professional content here. CV details are dated September 2026.
   Scholar metrics and publications are refreshed in scholar-data.js.
   Optional empty links are hidden. All career details were supplied by Piyush. */
window.SITE_CONTENT = {
  name: "Piyush Wanchoo",
  firstName: "Piyush",
  initials: "PW",
  title: "Piyush Wanchoo | Experimental Mechanics & Materials Research",
  description: "Piyush Wanchoo studies materials under extreme conditions through experimental mechanics, high-throughput experiments, and data-driven discovery at Johns Hopkins.",
  heroDescription: "My research combines experimental mechanics and data-driven discovery to understand materials under extreme conditions. I’m a postdoctoral fellow at Johns Hopkins.",
  bio: [
    "I’m Piyush, a postdoctoral fellow at the Hopkins Extreme Materials Institute at Johns Hopkins University, working with K.T. Ramesh. My research is in experimental mechanics, with a focus on impact, shock, and material failure.",
    "Much of my work involves building the equipment and analysis tools for these experiments. I designed and built HELIX, an automated laser-driven impact facility, and co-developed AIMD-L, a laboratory for high-throughput materials characterization. I use these systems to study how composition, microstructure, and loading conditions affect material strength.",
    "I got started with robotics workshops and all-terrain vehicle teams. I later earned my master’s at the Indian Institute of Science in Bangalore, worked in industrial R&D, and completed my Ph.D. with Arun Shukla at the University of Rhode Island. I still enjoy the hands-on parts of research: building a setup, working through a measurement, and helping a student do the same."
  ],
  portrait: "./logo.jpg",
  interests: ["Experimental mechanics", "Autonomous laboratories", "Data-driven materials"],
  email: "pwanchoo@jhu.edu",
  github: "https://github.com/Piyushjhu",
  scholar: "https://scholar.google.com/citations?user=L0GoOBAAAAAJ&hl=en&oi=ao",
  linkedin: "https://www.linkedin.com/in/piyush-wanchoo/",
  resume: "",
  location: "Baltimore, Maryland",
  affiliation: "Hopkins Extreme Materials Institute · Johns Hopkins University",
  researchDescription: "I study how metals, composites, and foams respond to impact and shock. My current work combines automated experiments and statistical models to measure dynamic strength, explain failure, and choose which materials and loading conditions to test next.",
  researchVision: {
    title: "Materials design and qualification",
    description: "My goal is to shorten the design and qualification process for materials in aerospace and defense. That requires data across many compositions, microstructures, and loading conditions. I develop automated experiments to collect these measurements and use models to identify which tests would reduce uncertainty.",
    steps: [
      { title: "Measure", text: "Measure dynamic properties across alloy compositions, microstructures, and loading conditions." },
      { title: "Explain", text: "Identify the mechanisms behind the measured strength, damage, and failure." },
      { title: "Choose the next test", text: "Use model predictions and their uncertainty to decide which experiment would be most informative." }
    ]
  },
  // Add research stories here; status is "active" or "past".
  // Video entries use a local MP4, poster, and a visible descriptive caption.
  researchStudies: [
    {
      id: "spall-strength", status: "active", label: "DYNAMIC STRENGTH & FAILURE",
      title: "Spall strength in metals",
      summary: "Spall is internal fracture caused by tensile waves after impact. I use high-throughput experiments to study how alloy composition, microstructure, and loading rate affect a metal’s resistance to this failure.",
      institution: "Johns Hopkins University", tags: ["Cu–Ti", "Al–Mg", "Ti–V", "Spall failure"],
      video: "./assets/research/cuti-plate-impact-spall.mp4", poster: "./assets/research/cuti-spall-poster.jpg",
      mediaLabel: "Plate impact and spall formation in Cu–Ti",
      caption: "Schematic animation: a flyer strikes a Cu–Ti target, launching compression waves. Release waves create internal tension, followed by void nucleation, growth, and coalescence into a spall plane. Microstructure, dislocation evolution, and void kinetics are illustrative.",
      details: [
        { title: "The question", text: "How much of the variation in spall strength comes from the material, and how much comes from the experiment? I study the effects of composition, microstructure, and loading history, using repeated measurements to distinguish trends from experimental variability." },
        { title: "Current work", text: "After studying the statistics of spall in copper, I’m now examining Cu–Ti, Al–Mg, and Ti–V alloys. I’m interested in how composition and loading rate change their dynamic strength, and which physical mechanisms explain those changes." }
      ],
      papers: [
        {
          id: "copper-spall-statistics",
          title: "What repeated impact tests reveal about copper failure",
          publicationTitle: "High-throughput dynamic experiments: The statistics of spall failure at ultra-high strain rates",
          authors: "P. Wanchoo, R. Berlia, T.P. Weihs, K.T. Ramesh",
          venue: "Journal of the Mechanics and Physics of Solids · 210, 106523",
          year: "2026",
          publicationType: "Journal article",
          url: "https://doi.org/10.1016/j.jmps.2026.106523",
          summary: "Spall is internal fracture caused by tensile waves after impact. To understand how copper resists this failure, we combined automated laser-driven microflyer experiments with automated analysis of surface-velocity measurements. Repeated tests on two well-characterized copper microstructures let us examine how grain structure, loading rate, and prior shock stress influence strength and its variability.",
          highlight: {
            value: "173",
            label: "Spall experiments across two high-purity copper microstructures: 98 on submicron-grained copper and 75 on microcrystalline copper."
          },
          results: [
            "Spall strength increased strongly with tensile strain rate. Within comparable shock-stress groups, faster tensile loading produced higher measured spall strength.",
            "Copper with an area-weighted mean grain size of 300 nm generally showed higher spall strength than the annealed material with a mean grain size of 8.21 µm under the tested laser-driven impact conditions.",
            "Prior shock stress had a weaker, microstructure-dependent influence. The microcrystalline dataset showed softening at high shock stresses, while the submicron-grained material did not show the same clear trend."
          ],
          importance: "Dynamic failure cannot be characterized by a single strength value. A statistically rich dataset helps compare microstructures under relevant loading conditions, test models of void-driven fracture, and identify where additional measurements could reduce uncertainty when designing materials for extreme loading.",
          figures: [
            {
              "image": "./assets/research/papers/copper-spall-figure-2.png",
              "width": 2070,
              "height": 825,
              "label": "Figure 2 · A package for repeated impacts",
              "caption": "The launch package holds an array of flyers and a copper target at a controlled spacing, allowing many localized impact experiments on one sample.",
              "alt": "Cross-sectional launch-package schematic showing aluminum flyer discs, the copper target, Kapton spacers, and the catch box.",
              "sourceUrl": "https://doi.org/10.1016/j.jmps.2026.106523",
              "credit": "Wanchoo et al. (2026), Fig. 2"
            },
            {
              "image": "./assets/research/papers/copper-spall-figure-12.png",
              "width": 2070,
              "height": 1515,
              "label": "Figure 12 · Separating rate and shock effects",
              "caption": "Grouping the measurements by shock stress or strain rate helps separate two coupled influences on spall strength and shows how the Micro and Nano materials respond differently.",
              "alt": "Four original scatter plots compare spall strength with tensile strain rate and shock stress in Micro and Nano copper, using color to group the other loading variable.",
              "sourceUrl": "https://doi.org/10.1016/j.jmps.2026.106523",
              "credit": "Wanchoo et al. (2026), Fig. 12"
            }
          ],
          methods: "Laser-launched microflyers impacted high-purity copper specimens. Photonic Doppler velocimetry measured rear-surface motion, and an automated analysis pipeline extracted spall strength, tensile strain rate, and shock stress. Electron backscatter diffraction characterized grain-size distributions; statistical binning and Gaussian-process regression examined coupled loading effects."
        }
      ],
      links: [{ label: "Read the copper spall study", url: "https://doi.org/10.1016/j.jmps.2026.106523" }]
    },
    {
      id: "helix", status: "active", label: "EXPERIMENTAL PLATFORMS",
      title: "HELIX: automated impact experiments",
      summary: "I designed and built HELIX, a laser-driven microflyer impact facility at Johns Hopkins. Automation allows us to run repeated tests across many samples and loading conditions.",
      institution: "Johns Hopkins University", tags: ["Laser-driven impact", "Robotics", "AIMD-L"],
      image: "./assets/research/helix-facility.jpg",
      imageAlt: "HELIX laser-driven microflyer impact facility with robotic arms, optical equipment, and sample trays at Johns Hopkins",
      caption: "HELIX is part of AIMD-L, an automated laboratory I co-developed for characterizing structural materials in extreme environments.",
      details: [
        { title: "The facility", text: "HELIX combines automated experiments with rapid data analysis. This makes it practical to collect repeated measurements and compare strength and failure across compositions, microstructures, and loading conditions." },
        { title: "Part of AIMD-L", text: "HELIX provides dynamic measurements within AIMD-L, alongside material synthesis, characterization, and machine-learning workflows. The goal is to use results from each stage to guide the materials and experiments we try next." }
      ],
      papers: [
        {
          id: "helix-automation",
          title: "Making repeated impact experiments faster and more consistent",
          publicationTitle: "A Closed-Loop Automation Framework for High-Throughput Laser-Driven Micro-flyer Impact Experiments",
          authors: "A. Bhattacharjee, K. Muly, P. Wanchoo, S. A. Sreedhar, L. Rackers, J. Rentas-Velez, P. Addepalli, K. T. Ramesh, A. Krieger",
          venue: "Integrating Materials and Manufacturing Innovation",
          year: "2026",
          url: "https://doi.org/10.1007/s40192-026-00482-1",
          publicationType: "Journal article",
          summary: "Repeated impact tests require precise positioning, controlled laser power, and reliable velocity measurements. We developed an integrated automation framework for laser-driven micro-flyer experiments that uses camera and diagnostic feedback to coordinate these steps, regulate flyer velocity, and record experimental parameters and results.",
          results: [
            "Twenty-five impact tests took approximately four minutes, about eight times faster than the manual operation used for comparison.",
            "Detection succeeded for 100.0% of aluminum, 97.3% of copper, and 100.0% of titanium flyers, although the model trained only on aluminum and copper images.",
            "Positioning root-mean-square errors were 31.4 μm in x and 35.2 μm in y. Feedback also supported shoot/skip decisions and diagnostic signal optimization during operation."
          ],
          importance: "Reliable repeated experiments make it practical to collect richer datasets on dynamic material behavior. Integrating positioning, feedback, and logging helps reduce repetitive work and preserve the information needed to compare results and trace experimental conditions.",
          figures: [
            {
              "image": "./assets/research/papers/helix-automation-figure-1.png",
              "width": 2037,
              "height": 1038,
              "label": "Figure 1 · Closing the experimental loop",
              "caption": "The HELIX control application links laser energy, specimen positioning, triggering, and velocity diagnostics into one experimental workflow.",
              "alt": "HELIX automation layout showing the laser and waveplate, camera-guided flyer positioning, PDV diagnostics, and control application connected by feedback links.",
              "sourceUrl": "https://link.springer.com/article/10.1007/s40192-026-00482-1/figures/1",
              "credit": "Bhattacharjee et al. (2026)"
            },
            {
              "image": "./assets/research/papers/helix-automation-figure-15.png",
              "width": 1500,
              "height": 657,
              "label": "Figure 15 · Recovering velocity signals",
              "caption": "Closed-loop adjustment of the PDV reference power recovered acceptable return signals at 9 of 13 initially unsuitable specimen locations.",
              "alt": "Before and after maps of PDV return at specimen positions, with circles for acceptable signals and crosses for signals outside the allowed range.",
              "sourceUrl": "https://link.springer.com/article/10.1007/s40192-026-00482-1/figures/15",
              "credit": "Bhattacharjee et al. (2026)"
            }
          ],
          methods: "An EfficientNet-based vision model guided positioning. A unified control interface coordinated laser power, triggering, photonic Doppler velocimetry, and feedback, with validation across multiple flyer materials.",
          note: "Published October 23, 2026.",
          highlight: {
            value: "8×",
            label: "Approximate experimental throughput improvement compared with manual operation in this study."
          }
        },
        {
          id: "flyer-positioning",
          title: "Finding and aligning tiny flyers automatically",
          publicationTitle: "Closed Loop Vision Guided Control of Flyer Position for High-Throughput Laser Shock Experiments",
          authors: "H. Wang, J. M. Diamond, A. Bhattacharjee, P. Wanchoo, A. Mirzaei, L. Li, T. J. Nkansah-Mahaney, K. Ramesh, A. Krieger",
          venue: "ASME IMECE 2024 · Volume 5: Dynamics, Vibration, and Control · V005T07A065",
          year: "2024",
          url: "https://doi.org/10.1115/IMECE2024-145264",
          publicationType: "Conference paper",
          summary: "Positioning tiny flyers by hand can slow laser-impact testing and introduce variability. We combined a camera-based neural-network detector with two motorized stages in a closed-loop “see-move-shoot” routine that finds a flyer, centers it, triggers the laser, checks the impact, and advances to the next sample.",
          results: [
            "An EfficientNetB0 detector trained on 16,000 labeled images achieved a detection root-mean-square error of 0.038 mm under challenging exposure, low-light, and blurry-image conditions.",
            "The automated see-move-shoot cycle took 7.46 seconds per shot, compared with 19.2 seconds for an expert and 30.6 seconds for a novice.",
            "For that tested cycle, automation was approximately 2.5 times faster than the expert and four times faster than the novice. These comparisons describe the cycle rather than total daily facility throughput."
          ],
          importance: "Automated alignment addresses a repetitive bottleneck in high-throughput impact testing. Pairing vision with motion control can make positioning more consistent, while the timed comparison shows how this component contributes to a broader automated experimental workflow.",
          figures: [
            {
              "image": "./assets/research/papers/flyer-positioning-related-copper-figure-5.png",
              "width": 1820,
              "height": 950,
              "label": "Related schematic · Flyer alignment",
              "caption": "The camera and CNN guide the positioning stage through the alignment and firing loop. This schematic appears as Figure 5 in the 2026 copper study, where it is credited to Wang et al. (2024).",
              "alt": "Closed-loop flyer alignment schematic connects a camera and CNN to the positioning stage, laser shutter, and PDV measurement system.",
              "sourceUrl": "https://doi.org/10.1016/j.jmps.2026.106523",
              "credit": "Wanchoo et al. (2026), Fig. 5"
            }
          ],
          methods: "Two automated linear stages positioned flyers using camera feedback. The study trained a convolutional neural network under varied lighting and compared automated operation with novice and expert users.",
          note: "IMECE 2024 proceedings; published online January 23, 2025."
        },
        {
          id: "aimdl-laboratory",
          title: "Connecting materials measurements in an automated laboratory",
          publicationTitle: "AIMD-L: An automated laboratory for high-throughput characterization of structural materials for extreme environments",
          authors: "T.C. Hufnagel, P. Addepalli, A. Bhattacharjee, R. Berlia, J. El-Awady, D. Elbert, L. Graham-Brady, A. Krieger, H. Neralla, T.J. Nkansah-Mahaney, M.M. Omar, H.S. Park, K.T. Ramesh, M. Shaeffer, E. Walker, P. Wanchoo, T.P. Weihs",
          venue: "arXiv:2603.06835v1",
          year: "2026",
          publicationType: "Preprint",
          url: "https://arxiv.org/abs/2603.06835v1",
          summary: "Understanding structural materials requires measurements that connect composition and microstructure to mechanical behavior. AIMD-L combines robotic sample transport, complementary instruments, and automated data processing in one laboratory. The preprint describes how this infrastructure collects and connects measurements of bulk metals and ceramics, providing data that people and AI tools can use to guide further experiments.",
          results: [
            "Robotic handling links HELIX impact testing, MAXIMA X-ray diffraction and fluorescence, and SPHINX nanoindentation. A shared data layer automates data transfer and processing, making results available through a common portal.",
            "HELIX and MAXIMA report data-collection rates two to three orders of magnitude faster than conventional counterparts. For HELIX, the comparison is thousands of impact tests per day versus a handful using conventional gun-driven experiments.",
            "In the Cu–Ti demonstration, elastic modulus, shock elastic limit, and copper lattice parameter peaked near 3 atomic percent Ti, while hardness continued to increase across the tested composition range. Different measurements therefore revealed distinct property trends."
          ],
          importance: "Combining measurements on a shared set of materials makes it easier to connect chemistry, structure, and performance. The Cu–Ti example shows why several probes are needed. This infrastructure supports rapid screening and future model-guided experiments while preserving the context behind each measurement.",
          figures: [
            {
              "image": "./assets/research/papers/aimdl-figure-2-layout.png",
              "width": 5078,
              "height": 3451,
              "label": "Figure 2 (layout panel) · Connecting laboratory stations",
              "caption": "A shared sample carrier and robotic transport connect the characterization stations, so measurements from different instruments can be linked to the same material location.",
              "alt": "AIMD-L layout with robotic sample transport connecting laser shock testing, X-ray diffraction and fluorescence, nanoindentation, profilometry, and a flexible station.",
              "sourceUrl": "https://arxiv.org/html/2603.06835v1#S3.F2",
              "credit": "Hufnagel et al. (2026)",
              "licenseUrl": "https://creativecommons.org/licenses/by-nc-nd/4.0/",
              "licenseLabel": "CC BY-NC-ND 4.0"
            },
            {
              "image": "./assets/research/papers/aimdl-figure-10-results.png",
              "width": 1540,
              "height": 1090,
              "label": "Figure 10 · Composition and measured properties",
              "caption": "Measurements across compositionally graded Cu–Ti foils connect structure, quasistatic properties, and shock response. The four properties follow different trends, which makes combined characterization useful for alloy selection.",
              "alt": "Four plots show elastic modulus, hardness, copper lattice parameter, and Hugoniot elastic limit versus titanium composition, distinguishing regions with Cu4Ti precipitates.",
              "sourceUrl": "https://arxiv.org/html/2603.06835v1#S10.F10",
              "credit": "Hufnagel et al. (2026)",
              "licenseUrl": "https://creativecommons.org/licenses/by-nc-nd/4.0/",
              "licenseLabel": "CC BY-NC-ND 4.0"
            }
          ],
          methods: "A central run manager coordinates instruments and robotic sample transfers. Event-driven workflows stream, reduce, and index measurements and metadata. A compositionally graded Cu–Ti sample demonstrates the combined measurements. The current configuration characterizes materials; fully automated optimization that also changes microstructure remains a future development.",
          links: [
            {
              label: "Read the preprint PDF",
              url: "https://arxiv.org/pdf/2603.06835v1"
            }
          ],
          linkLabel: "Read preprint",
          note: "Preprint posted March 6, 2026; not peer reviewed."
        }
      ],
      links: [{ label: "Read the AIMD-L preprint", url: "https://arxiv.org/abs/2603.06835" }]
    },
    {
      id: "autonomous-discovery", status: "active", label: "MODELS & AUTONOMY",
      title: "Active learning for impact experiments",
      summary: "I work on Gaussian-process models, Bayesian optimization, and active learning to help choose the next impact experiment based on the measurements already available.",
      institution: "Johns Hopkins University", tags: ["Active learning", "Uncertainty", "Materials discovery"],
      details: [
        { title: "The approach", text: "I develop and contribute to workflows that feed processed experimental data into models of material response. The models estimate both properties and uncertainty, helping us identify where another measurement would be useful." },
        { title: "Research goal", text: "I’m working toward a loop in which experiments update a model and the model recommends the next test. This requires reliable measurements, meaningful uncertainty estimates, and predictions we can check against the physics." }
      ],
      links: [{ label: "Explore the software", url: "https://github.com/Piyushjhu/bayesian-optimization-on-LMI-data" }]
    },
    {
      id: "blast-composites", status: "past", label: "COMPOSITES & PROTECTIVE STRUCTURES",
      title: "Composite structures under blast loading",
      summary: "During my Ph.D., I developed air-blast and underwater-shock experiments to study damage, energy transfer, and failure in composite laminates and sandwich structures.",
      institution: "Ph.D. research · University of Rhode Island", tags: ["Air blast", "Underwater shock", "Composites"],
      details: [
        { title: "The approach", text: "Working with Arun Shukla, I designed and built experimental facilities and combined high-speed imaging, full-field measurements, and pressure instrumentation to characterize structural response under rapid loading." },
        { title: "Materials studied", text: "I examined how material architecture and protective layers affect damage and energy transfer in rubber-modified composite laminates and PVC foam-cladded composite plates." }
      ],
      papers: [
        {
          id: "underwater-energy",
          title: "Why bubble collapse matters in underwater blast",
          publicationTitle: "Energy quantification framework for underwater explosive loading into PVC foam cladded composite plates",
          authors: "P. Wanchoo, A. Pandey, M. Leger, J. LeBlanc, A. Shukla",
          venue: "Journal of the Mechanics and Physics of Solids · 187, 105646",
          year: "2024", url: "https://doi.org/10.1016/j.jmps.2024.105646",
          summary: "An underwater explosion can load a structure through both an initial shock and the later collapse of the explosion bubble. We developed an energy framework and experiments to follow this sequence in clamped carbon-fiber composite plates, then tested whether sacrificial PVC foam on the explosive-facing surface could reduce deformation and damage.",
          highlight: { value: "50%", label: "Less center-point deflection during bubble collapse vs. an uncladded plate, in these tests." },
          results: [
            "The largest energy transfer and most severe observed damage occurred during bubble collapse. The energy analysis identified the accompanying water flow as a major contributor to this later loading.",
            "Foam cladding reduced center-point deflection by about 22% during the initial shock and 50% during bubble-collapse loading, compared with the uncladded plate.",
            "Cladding density changed the energy response: H80 foam reduced plate kinetic energy, while the denser H130 and H200 claddings increased it. Deflection alone therefore did not capture every design tradeoff."
          ],
          importance: "Marine protection must account for the full underwater loading sequence, including bubble collapse. This framework helps compare protective layers by tracing how the explosion transfers energy into a structure, while the experiments show why cladding density should be assessed alongside deformation and damage.",
          figures: [
            {
              "width": 1890,
              "height": 1600,
              "label": "Figure 3 · The blast continues after the first shock",
              "caption": "The image sequence follows the initial explosion, cavitation, bubble growth and collapse. The late water jet is directed back toward the composite plate, explaining why the first pressure pulse does not capture the entire threat.",
              "alt": "Underwater high-speed image sequence showing the explosive, plate, pressure sensors, cavitation, growing explosion bubble and late jet directed at the plate.",
              "credit": "Wanchoo et al. (2024)",
              "image": "./assets/research/papers/underwater-bubble.jpg"
            },
            {
              "width": 1580,
              "height": 870,
              "label": "Figure 13 · Comparing foam cladding densities",
              "caption": "Center-point deflection and velocity compare the bare panel with three foam-cladded panels. Foam lowers the initial deflection and the later deflection associated with bubble collapse in these tests.",
              "alt": "Displacement and velocity histories of a base composite plate and plates with H80, H130 and H200 foam cladding over 60 milliseconds.",
              "credit": "Wanchoo et al. (2024)",
              "image": "./assets/research/papers/underwater-deflection.jpg"
            }
          ],
          methods: "Pressure sensors and high-speed cameras tracked the blast, bubble, and plate motion. Stereo digital image correlation measured surface deformation and strain. The analytical model accounted for a spherical incident wave and separated radiated and after-flow energy; its strain-energy estimates assume no substantial structural damage."
        },
        {
          id: "rubber-composites",
          title: "Changing the resin to control blast damage",
          publicationTitle: "Blast failure and energy analysis of rubber-modified carbon-fiber vinyl-ester composite laminates",
          authors: "P. Wanchoo, B. Chaudhary, H.-W.-X. Li, H. Matos, A. Shukla",
          venue: "Mechanics of Materials · 183, 104685",
          year: "2023", url: "https://doi.org/10.1016/j.mechmat.2023.104685",
          summary: "The resin surrounding reinforcing fibers can change a composite's response to blast. We fabricated carbon-fiber laminates with conventional and rubber-modified vinyl-ester resins, characterized their properties, and compared their response to controlled air shock. Full-field measurements let us examine vibration, deformation energy, and crack development under loads below and above the onset of damage.",
          results: [
            "Under low-intensity shock, rubber-modified panels showed a roughly 50% higher damping factor and greater energy dissipation than panels with conventional resin.",
            "Under damaging shock loads, modified panels deformed more slowly and showed greater crack arrest and shorter through-panel cracks.",
            "Rubber modification reduced resin stiffness and strength. The damping and damage benefits therefore came with a material-property tradeoff."
          ],
          importance: "A composite's matrix can influence how blast-induced motion dies out and how cracks spread. These results give designers a way to assess resin modification alongside fiber architecture, balancing stiffness and strength against damping and resistance to damage growth.",
          figures: [
            {
              "width": 1940,
              "height": 980,
              "label": "Figure 13 · Deformation across the whole panel",
              "caption": "Full-field displacement maps compare the unmodified resin (A) and rubber-modified resin (B) at successive vibration peaks. Spatial measurements reveal differences that a center-point displacement alone would miss.",
              "alt": "Two rows of displacement contours for Resin A and Resin B composite panels at their first four response peaks, with the original displacement scale in millimeters.",
              "credit": "Wanchoo et al. (2023)",
              "image": "./assets/research/papers/rubber-deformation.jpg"
            },
            {
              "width": 1960,
              "height": 1130,
              "label": "Figure 20 · Following crack growth",
              "caption": "High-speed images compare damage propagation after failure begins. The original dashed overlays identify surface crack paths; the rubber-modified Resin B panel shows less extensive crack growth in this comparison.",
              "alt": "Four high-speed frames each for Resin A and Resin B panels, with green clamped boundaries and yellow dashed crack paths at 350, 500, 800 and 1000 microseconds.",
              "credit": "Wanchoo et al. (2023)",
              "image": "./assets/research/papers/rubber-cracks.jpg"
            }
          ],
          methods: "A shock tube applied repeatable air-shock loads to clamped panels. High-speed stereo imaging and 3D digital image correlation measured deformation and strain, supporting estimates of kinetic and strain energy. Resin characterization and structural vibration tests connected the panel response to material behavior.",
          links: [{ label: "Read the corrigendum", url: "https://doi.org/10.1016/j.mechmat.2023.104784" }]
        },
        {
          "id": "sandwich-undex-interaction",
          "title": "How an underwater explosion bubble reloads a sandwich panel",
          "publicationTitle": "Near-field underwater explosion and its interaction with a sandwich composite plate",
          "authors": "A. Pandey, P. Wanchoo, H. Matos, J. LeBlanc, A. Shukla",
          "venue": "International Journal of Impact Engineering · 196, 105155",
          "year": "2025",
          "url": "https://doi.org/10.1016/j.ijimpeng.2024.105155",
          "publicationType": "Journal article",
          "summary": "This collaborative study examined carbon-fiber sandwich panels exposed to nearby underwater explosions. High-speed measurements connected panel motion with the explosion gas bubble and the temporary cavity that forms at the water–panel surface, showing how their interaction can produce damaging loading after the initial shock.",
          "results": [
            "Coincident collapse of the explosion bubble and surface cavity produced intense local loading and catastrophic failure in low-density-core panels.",
            "Higher-density-core panels showed about 40% lower out-of-plane deflection in the reported experiments.",
            "Reducing explosive stand-off distance delayed bubble collapse and increased horizontal bubble migration."
          ],
          "importance": "A panel changes the surrounding bubble dynamics while responding to the blast. Accounting for this coupled loading can help guide core selection and marine-structure design beyond the initial pressure pulse.",
          "methods": "Laboratory underwater explosions at two stand-off distances, high-speed imaging and stereo digital image correlation.",
          "note": "Second-author collaboration. This description is based on the publisher’s abstract and highlights; the full paper was not accessible for this update.",
          "links": [
            {
              "label": "Publisher",
              "url": "https://www.sciencedirect.com/science/article/abs/pii/S0734743X2400280X"
            }
          ]
        },
        {
          "id": "curved-sandwich-air-shock",
          "title": "Why curvature and edge support must be designed together",
          "publicationTitle": "Curved Polymeric Sandwich Composites Subjected to Air Shock: An Experimental Investigation",
          "authors": "A. Pandey, P. Wanchoo, H. Matos, A. Shukla",
          "venue": "Experimental Mechanics · 64(6), 945–961",
          "year": "2024",
          "url": "https://doi.org/10.1007/s11340-024-01069-7",
          "publicationType": "Journal article",
          "summary": "Curved sandwich panels are common in ship structures, yet curvature alone does not determine their response to a blast. This collaborative investigation compared flat panels with two curved geometries and measured their motion and damage in real time. The results show how edge restraint, curvature and foam-core density act together.",
          "results": [
            "Increasing curvature increased deflection with simple edge support, but reduced deflection when horizontal and vertical edge motion were restrained.",
            "The net shock impulse differed by less than 1% among the tested geometries, helping distinguish structural effects from differences in applied loading.",
            "Denser cores reduced panel deflection. The dominant failure mode changed from shear cracking in low-density cores to separation at the core–facesheet interface in high-density cores."
          ],
          "importance": "A more curved panel can resist damage better while still deflecting more under some supports. The findings give designers experimental evidence for choosing geometry, attachment conditions and core density together when developing lightweight blast-resistant structures.",
          "methods": "Shock-tube loading of carbon-fiber/PVC-foam sandwich panels with radii of 112 mm, 305 mm and infinity (flat), using H45 and H130 cores. High-speed stereo digital image correlation measured back-face deformation, while a side camera recorded damage progression.",
          "note": "Second-author collaboration.",
          "links": [
            {
              "label": "Open-access paper",
              "url": "https://link.springer.com/article/10.1007/s11340-024-01069-7"
            }
          ],
          "figures": [
            {
              "image": "./assets/research/papers/curved-air-fig4.png",
              "width": 990,
              "height": 835,
              "label": "Figure 4 · Experiment and edge supports",
              "caption": "Shock-tube experiment and the two support conditions. Stereo cameras measure back-face deformation; a side camera records damage. Reproduced from Fig. 4.",
              "alt": "Shock tube, three high-speed cameras and curved sandwich panel fixture, with diagrams comparing simple edge support and restrained edge displacement.",
              "credit": "Pandey et al. (2024)",
              "sourceUrl": "https://link.springer.com/article/10.1007/s11340-024-01069-7",
              "licenseUrl": "https://creativecommons.org/licenses/by/4.0/",
              "licenseLabel": "CC BY 4.0"
            },
            {
              "image": "./assets/research/papers/curved-air-fig7.png",
              "width": 1000,
              "height": 740,
              "label": "Figure 7 · Curvature depends on support",
              "caption": "Back-face deformation under low-intensity shock for H130-core panels. Panel A has a 112 mm radius, B a 305 mm radius, and C is flat. Curvature increases deflection with simple support (b), but reduces it with restrained edge displacement (c). Reproduced from Fig. 7.",
              "alt": "Colored displacement maps for three sandwich panels and displacement-time curves showing a reversal in curvature effects between support conditions.",
              "credit": "Pandey et al. (2024)",
              "sourceUrl": "https://link.springer.com/article/10.1007/s11340-024-01069-7",
              "licenseUrl": "https://creativecommons.org/licenses/by/4.0/",
              "licenseLabel": "CC BY 4.0"
            }
          ]
        },
        {
          "id": "gyroid-core-shock",
          "title": "Comparing 3D-printed gyroid cores under shock loading",
          "publicationTitle": "Shock response of sandwich panels with additively manufactured polymer gyroid lattice cores",
          "authors": "B. Oladipo, S. Doner, G.A. Lyngdoh, J.T. Villada, P. Wanchoo, H. Matos, A. Shukla, S. Das",
          "venue": "Materials Today Communications · 41, 110664",
          "year": "2024",
          "url": "https://doi.org/10.1016/j.mtcomm.2024.110664",
          "publicationType": "Journal article",
          "summary": "This collaborative study compared sandwich panels containing 3D-printed gyroid cores made from PLA, ABS and flexible TPU. Shock-tube experiments measured how the core material changed panel deflection and energy measures, revealing tradeoffs between flexibility and the different ways energy is carried or dissipated.",
          "results": [
            "Maximum panel deflection was approximately 6 mm for TPU, compared with 0.9 mm for ABS and 0.82 mm for PLA.",
            "TPU had the greatest specific deformation energy: 0.146 J/g, versus 0.104 J/g for ABS and 0.070 J/g for PLA.",
            "The ranking differed for reported specific total energy, emphasizing that deformation energy and total energy should be assessed separately."
          ],
          "importance": "The results help frame material choices for lightweight, architected sandwich cores: large deformation and high deformation energy do not automatically imply the highest total energy measure.",
          "methods": "Fused-filament-fabricated polymer gyroid cores, shock-tube loading, high-speed photography and digital image correlation.",
          "note": "Fifth-author collaboration. This description is based on the publisher’s abstract; the full paper was not accessible for this update.",
          "links": [
            {
              "label": "Publisher",
              "url": "https://www.sciencedirect.com/science/article/pii/S235249282402645X"
            }
          ]
        }
      ],
      links: [{ label: "Energy transfer under underwater loading", url: "https://doi.org/10.1016/j.jmps.2024.105646" }, { label: "Composite laminate failure", url: "https://doi.org/10.1016/j.mechmat.2023.104685" }]
    },
    {
      id: "porous-materials", status: "past", label: "POROUS MATERIALS & WAVE PROPAGATION",
      title: "Stress waves in polymeric foams",
      summary: "During my Ph.D., I studied how closed-cell polymeric foams deform and transmit force under air shock and rapid hydrostatic loading.",
      institution: "Ph.D. research · University of Rhode Island", tags: ["Polymeric foams", "Stress waves", "Dynamic response"],
      details: [
        { title: "The question", text: "How do foam density and loading conditions affect deformation, stress-wave propagation, and the force transmitted through a protective layer?" },
        { title: "The approach", text: "I combined controlled air shock and rapid underwater pressure loading with high-speed imaging and digital image correlation to measure deformation in the foams." }
      ],
      papers: [
        {
          id: "foam-stress-waves",
          title: "When a foam cushion can amplify transmitted force",
          publicationTitle: "Stress wave propagation and force transmission in polymeric closed cell foams subjected to air shock loading",
          authors: "P. Wanchoo, A. Pandey, A. Shukla",
          venue: "Extreme Mechanics Letters · 63, 102061",
          year: "2023", url: "https://doi.org/10.1016/j.eml.2023.102061",
          summary: "Foam is commonly used to cushion structures, yet a stress wave passing through it can temporarily amplify the transmitted force. We tested unconfined PVC foam blocks under air shock, tracking waves and deformation alongside input and output forces to understand when the foam amplifies loading and when plastic crushing reduces force transmission.",
          results: [
            "During initial wave propagation in the elastic regime, transmitted peak force exceeded input by about 20% for H45 foam and 40% for H100 foam, across three trials per grade.",
            "Under stronger loading that produced plastic deformation, transmitted force fell below input after the initial wave passage. A compaction front still produced a sharp rise in the transmitted signal.",
            "Elastic waves traveled faster in denser foam. Predictions that accounted for the material's rate-dependent stiffness agreed with the measured wave speeds."
          ],
          importance: "Foam protection depends on how the material deforms during the loading pulse. Tracking elastic response, crushing, and densification helps explain force transmission. These measurements can guide selection of a protective layer by matching foam density and deformation behavior to the expected loading conditions.",
          figures: [
            {
              "width": 1700,
              "height": 2180,
              "label": "Figure 3 · Tracking a stress wave through foam",
              "caption": "Virtual gauges and full-field displacement maps track the moving disturbance. The strain histories distinguish low-intensity elastic response from the large, localized deformation produced at higher loading intensity.",
              "alt": "Gauge positions, axial strain histories, displacement maps and position–time wave-speed measurements for H45 and H100 foams.",
              "credit": "Wanchoo, Pandey & Shukla (2023)",
              "image": "./assets/research/papers/foam-wave-propagation.jpg"
            },
            {
              "width": 1930,
              "height": 1816,
              "label": "Figure 5 · When foam transmits or reduces force",
              "caption": "Input and transmitted forces are normalized by the peak input force. Low-intensity loading produces an amplified transmitted peak; with plastic crushing, force transmission falls after the initial wave propagation phase.",
              "alt": "Normalized input and output force histories for H45 and H100 foam at low and high shock intensities, including experimental dispersion bands.",
              "credit": "Wanchoo, Pandey & Shukla (2023)",
              "image": "./assets/research/papers/foam-force-transmission.jpg"
            }
          ],
          methods: "High-speed imaging at up to one million frames per second and digital image correlation tracked elastic, plastic, and compaction waves. Pressure and force sensors measured the applied and transmitted loads, while material tests at different strain rates supported wave-speed predictions."
        },
        {
          id: "foam-hydrostatic",
          title: "Measuring how foams respond to rapid pressure",
          publicationTitle: "Hydrostatic high strain rate loading response of closed-cell polymeric foams as a function of mass density",
          authors: "P. Wanchoo, S. Kishore, A. Shukla",
          venue: "Composites Part B: Engineering · 247, 110318",
          year: "2022", url: "https://doi.org/10.1016/j.compositesb.2022.110318",
          summary: "Underwater loading can compress foam from all directions, a condition that ordinary compression tests do not reproduce. We established a rapid hydrostatic characterization procedure for five grades of closed-cell PVC foam. Measuring pressure and volume change together revealed how material density and loading rate affect stiffness and the pressure at which cells begin to collapse.",
          results: [
            "All five grades became stiffer under rapid hydrostatic loading: measured bulk moduli were about 2.1 to 2.7 times their quasi-static values.",
            "Collapse pressure rose from 1.50 to 3.60 MPa for H130 foam, compared with 0.50 to 0.55 MPa for H45 foam. The denser foam showed a much stronger rate effect.",
            "Full-field measurements captured localized cell collapse and its progression into bulk deformation, linking the measured pressure-volume response to changes within the foam."
          ],
          importance: "Material models for underwater protection need properties measured under relevant pressure and loading rates. These results show why slow tests alone can misrepresent foam stiffness and collapse, and provide measurements for comparing densities when designing marine sandwich cores and other foam-based structures.",
          figures: [
            {
              "width": 1560,
              "height": 1430,
              "label": "Figure 15 · Watching cells collapse",
              "caption": "High-speed digital image correlation tracks volumetric strain across five foam densities. The lower-density specimens develop large deformations earlier in the loading sequence.",
              "alt": "Volumetric strain maps for H130, H100, H80, H60 and H45 foam from 0 to 350 microseconds, with a color scale from zero to minus 0.5.",
              "credit": "Wanchoo, Kishore & Shukla (2022)",
              "image": "./assets/research/papers/hydrostatic-strain.jpg"
            },
            {
              "width": 1020,
              "height": 1020,
              "label": "Figure 16 · Loading rate changes the response",
              "caption": "Black curves show rapid hydrostatic loading and blue curves show quasi-static loading. The increase in collapse pressure is much larger for the denser foams.",
              "alt": "Pressure versus volumetric strain comparing dynamic and quasi-static loading for five PVC foam density grades.",
              "credit": "Wanchoo, Kishore & Shukla (2022)",
              "image": "./assets/research/papers/hydrostatic-rate.jpg"
            }
          ],
          methods: "A water-filled dynamic loading setup applied rapid pressure while ultra-high-speed stereo imaging and 3D digital image correlation measured volumetric strain. The five grades covered nominal densities of 45–130 kg/m³, with average measured volumetric strain rates ranging from about 340 to 1,260 s⁻¹."
        },
        {
          "id": "foam-shear-loading-rate",
          "title": "Measuring foam strength in shear from slow loading to impact rates",
          "publicationTitle": "Shear Constitutive Behavior of Closed-Cell PVC Foams at Varied Loading Rates",
          "authors": "A. Pandey, P. Wanchoo, A. Shukla",
          "venue": "Journal of Dynamic Behavior of Materials · 11(4), 534–545",
          "year": "2025",
          "url": "https://doi.org/10.1007/s40870-025-00477-7",
          "publicationType": "Journal article",
          "summary": "The foam inside a sandwich structure must carry shear as well as compression. This collaborative study measured how three PVC foam grades resist shear over loading rates spanning six orders of magnitude, and compared that response with compression along the foam-rise direction. The measurements reveal why compression data alone cannot describe core performance.",
          "results": [
            "Both shear and compressive plateau stresses increased with foam density and loading rate.",
            "Shear plateau stress was only 30–50% of the compressive plateau stress at the corresponding loading rate and foam grade.",
            "Compression strengthened more strongly with increasing loading rate. The increase in shear plateau stress became smaller between approximately 1 and 1,000 per second."
          ],
          "importance": "Sandwich cores can fail in shear before their compressive strength is reached. These measurements supply rate-dependent material behavior for selecting foam cores and improving models of structures exposed to impacts and shock loads.",
          "methods": "H45, H80 and H130 foams were tested at approximately 0.001, 1 and 1,000 per second using a universal testing machine and a modified split Hopkinson pressure bar. Surface strains from 2D digital image correlation and tensor transformations were used to evaluate shear response from specimens cut at 45° to the foam-rise direction.",
          "note": "Second-author collaboration with the University of Rhode Island team; published in 2025.",
          "highlight": {
            "value": "30–50%",
            "label": "Shear plateau stress relative to compression for the tested grades and loading rates."
          },
          "links": [
            {
              "label": "Open-access paper",
              "url": "https://link.springer.com/article/10.1007/s40870-025-00477-7"
            }
          ],
          "figures": [
            {
              "image": "./assets/research/papers/shear-fig10.png",
              "width": 1335,
              "height": 390,
              "label": "Figure 10 · Shear versus compression",
              "caption": "Shear and compression at approximately 1,000 per second in the foam-rise direction: (a) H45, (b) H80 and (c) H130. Shear plateau stress remains substantially below compression for every grade. Reproduced from Fig. 10.",
              "alt": "Stress-strain curves at approximately 1000 per second for H45, H80 and H130 PVC foam, comparing lower shear stresses with higher compressive stresses.",
              "credit": "Pandey et al. (2025)",
              "sourceUrl": "https://link.springer.com/article/10.1007/s40870-025-00477-7",
              "licenseUrl": "https://creativecommons.org/licenses/by/4.0/",
              "licenseLabel": "CC BY 4.0"
            },
            {
              "image": "./assets/research/papers/shear-fig11.png",
              "width": 985,
              "height": 420,
              "label": "Figure 11 · Different loading-rate effects",
              "caption": "Plateau stress versus loading rate for three foam grades, comparing (a) compression and (b) shear. The stress scales differ between panels. Reproduced from Fig. 11.",
              "alt": "Compression and shear plateau stresses versus logarithmic strain rate for H45, H80 and H130 foam, showing different rate dependence.",
              "credit": "Pandey et al. (2025)",
              "sourceUrl": "https://link.springer.com/article/10.1007/s40870-025-00477-7",
              "licenseUrl": "https://creativecommons.org/licenses/by/4.0/",
              "licenseLabel": "CC BY 4.0"
            }
          ]
        }
      ],
      links: [{ label: "Stress waves and force transmission", url: "https://doi.org/10.1016/j.eml.2023.102061" }, { label: "Hydrostatic high-rate response", url: "https://doi.org/10.1016/j.compositesb.2022.110318" }]
    },
    {
      "id": "models-and-measurements",
      "status": "past",
      "label": "MODELS & MEASUREMENTS",
      "title": "Measuring motion and modeling soft materials",
      "summary": "Collaborations during my Ph.D. extended from camera-based vibration measurements to the large-deformation response of rate-stiffening polymers. These studies connect experimental data with methods that explain or reconstruct mechanical behavior.",
      "institution": "University of Rhode Island · Collaborative Ph.D. research",
      "tags": [
        "Digital image correlation",
        "Modal analysis",
        "Constitutive modeling"
      ],
      "papers": [
        {
          "id": "smooth-mode-decomposition",
          "title": "Recovering vibration modes from fewer images",
          "publicationTitle": "Smooth mode decomposition: Theory and its applications in full-field output-only modal analysis",
          "authors": "H.-W.-X. Li, P. Wanchoo, A. Shukla, D. Chelidze",
          "venue": "Mechanical Systems and Signal Processing · 200, 110541",
          "year": "2023",
          "publicationType": "Journal article",
          "url": "https://doi.org/10.1016/j.ymssp.2023.110541",
          "summary": "Camera-based vibration measurements reveal how an entire structure moves, but produce large datasets. We developed smooth mode decomposition to recover vibration mode shapes by using the spatial smoothness of the measured motion. Numerical studies and an aluminum-beam experiment showed that this approach can extract useful structural information even when images are captured too slowly or at irregular intervals.",
          "results": [
            "For simulated beams and membranes, smooth mode decomposition recovered physically meaningful vibration modes, including systems with nonuniform mass or stiffness where conventional proper orthogonal decomposition was less accurate.",
            "In the cantilever-beam experiment, truncated smooth mode decomposition recovered mode shapes from undersampled image data with accuracy close to conventional methods using the fully sampled dataset.",
            "Randomly selected camera snapshots also supported mode identification. Using spatial information reduced the dependence on dense, evenly spaced measurements in time."
          ],
          "importance": "Full-field vibration measurements can become limited by camera bandwidth, storage, and processing. Recovering structural modes from fewer images offers a route to more practical image-based modal testing and structural monitoring while preserving the spatial detail that sparse point sensors cannot provide.",
          "methods": "A variational formulation imposed spatial smoothness and led to a generalized eigenvalue problem. Numerical beam and membrane examples were compared with established decomposition methods. Stereo digital image correlation recorded a vibrating aluminum cantilever at 5000 frames per second, with laser displacement sensors providing an independent measurement reference.",
          "note": "Coauthored Ph.D. research; second author of four.",
          "figures": [
            {
              "image": "./assets/research/papers/smooth-mode-fig-9.png",
              "width": 1420,
              "height": 1425,
              "label": "Figure 9 · Measuring beam motion",
              "caption": "Stereo digital image correlation tracks motion across the entire cantilever beam. The color maps reveal how its displacement changes during vibration.",
              "alt": "Stereo camera setup and measured color displacement fields along a vibrating aluminum cantilever beam.",
              "credit": "Li et al. (2023)"
            },
            {
              "image": "./assets/research/papers/smooth-mode-fig-11.png",
              "width": 1420,
              "height": 1345,
              "label": "Figure 11 · Recovering modes from fewer images",
              "caption": "Truncated smooth mode decomposition recovers beam mode shapes from undersampled images; the plots compare these estimates with conventional methods and a finite element reference.",
              "alt": "Five beam mode shapes and error plots comparing POD, SOD, and truncated smooth mode decomposition for fully sampled and undersampled image data.",
              "credit": "Li et al. (2023)"
            }
          ]
        },
        {
          "id": "rate-stiffening-soft-polymer",
          "title": "Explaining how a soft polymer stiffens during impact",
          "publicationTitle": "A large deformation model for quasi-static to high strain rate response of a rate-stiffening soft polymer",
          "authors": "A. Konale, Z. Ahmed, P. Wanchoo, V. Srivastava",
          "venue": "International Journal of Plasticity · 168, 103701",
          "year": "2023",
          "publicationType": "Journal article",
          "url": "https://doi.org/10.1016/j.ijplas.2023.103701",
          "summary": "Polyborosiloxane (PBS) slowly flows under its own weight but stiffens dramatically when compressed quickly. We combined large-strain compression experiments with a model of its reversible polymer networks to explain this change and predict loading, unloading, and relaxation. The work connects macroscopic impact response to proposed crosslink mechanisms and tests the model in three-dimensional deformation experiments.",
          "results": [
            "Slow compression reached true strains of about 125%; compression tests overall spanned loading rates from 0.001 to 8500 per second. At comparable strain, the measured stress increased by more than three orders of magnitude across that range.",
            "A model with reversible boron–oxygen crosslinks and temporary entanglement lockups reasonably captured the strong rate dependence, loading–unloading response, and stress relaxation. The two proposed mechanisms were represented by relaxation times of about 3 seconds and 0.5 milliseconds.",
            "Finite element simulations were checked against separate conical and triangular-prism indentation experiments, providing a test of the model beyond uniform compression."
          ],
          "importance": "Impact-mitigating soft materials must remain compliant during ordinary motion yet resist rapid deformation. A model that connects their rate dependence to reversible network mechanisms helps evaluate realistic protective geometries and provides a framework for studying related dynamically crosslinked polymers and gels.",
          "methods": "Rheometry and slow compression characterized the low-rate response, while a split Hopkinson pressure bar with a low-impedance striker measured rapid compression. A finite-deformation constitutive model was implemented in ABAQUS and evaluated using three-dimensional indentation experiments.",
          "note": "Coauthored Ph.D. research; third author of four. The paper identifies early portions of the highest-rate compression traces where dynamic force equilibrium had not yet been reached.",
          "figures": [
            {
              "image": "./assets/research/papers/rate-stiffening-pbs-fig-1.png",
              "width": 1200,
              "height": 945,
              "label": "Figure 1 · Slow flow and rapid recovery",
              "caption": "The same polymer flows slowly under its own weight but undergoes substantial shape recovery after rapid compression. The two sequences show behavior over an hour and over milliseconds.",
              "alt": "A polyborosiloxane sphere flattening under its own weight over one hour, and a compressed PBS specimen recovering its shape over milliseconds.",
              "credit": "Konale et al. (2023)"
            },
            {
              "image": "./assets/research/papers/rate-stiffening-pbs-fig-7.png",
              "width": 1390,
              "height": 1230,
              "label": "Figure 7 · Testing the network model",
              "caption": "The network model captures the strong change in compression response with loading rate and predicts stress relaxation. Dotted early portions of the highest-rate traces indicate that dynamic force equilibrium had not yet been achieved.",
              "alt": "Experimental and modeled PBS stress–strain curves at loading rates from 0.001 to 8500 per second, with a comparison of predicted and measured stress relaxation.",
              "credit": "Konale et al. (2023)"
            }
          ],
          "links": [
            {
              "label": "Open author preprint",
              "url": "https://arxiv.org/abs/2304.04892"
            }
          ]
        }
      ]
    },
    {
      "id": "reviews-and-design",
      "status": "past",
      "label": "REVIEWS & DESIGN",
      "title": "Connecting the evidence for protective structures",
      "summary": "These reviews bring together blast and implosion physics, experiments, and material design strategies. Their takeaways synthesize the literature and frame the experimental questions explored in the studies above.",
      "institution": "University of Rhode Island",
      "tags": [
        "Reviews",
        "Naval composites",
        "Blast & implosion"
      ],
      "papers": [
        {
          "id": "air-underwater-blast-review",
          "title": "How polymer composites mitigate air and underwater blast",
          "publicationTitle": "Investigations on air and underwater blast mitigation in polymeric composite structures – A review",
          "authors": "P. Wanchoo, H. Matos, C.-E. Rousseau, A. Shukla",
          "venue": "Composite Structures · 263, 113530",
          "year": "2021",
          "publicationType": "Review article",
          "url": "https://doi.org/10.1016/j.compstruct.2020.113530",
          "summary": "Protective composites behave differently in air and underwater explosions because the surrounding fluid changes how momentum reaches the structure. This review brings together blast-loading physics, observed damage mechanisms, and design strategies for polymer composite sandwich panels. It examines how face sheets, foam cores, interfaces, and emerging manufactured architectures can be tailored to the loading scenario.",
          "resultsHeading": "Key takeaways",
          "results": [
            "Air and underwater blast require different design reasoning. Underwater response depends strongly on fluid–structure interaction, cavitation, and later bubble-related loading, alongside the initial shock.",
            "Protection is a property of the complete sandwich: face-sheet material and layup, core crushing, and interfaces all influence deformation and damage. A design that limits deflection may dissipate energy through different damage mechanisms.",
            "Graded foam cores, compliant interlayers, hybrid laminates, and architected cores offer ways to tailor the response. Their performance depends on the loading conditions; arrangements suited to impact cannot automatically be assumed optimal for blast."
          ],
          "importance": "The review links material choices to the physical mechanisms they are intended to control. This helps researchers compare protective concepts under relevant conditions and identify where better characterization is needed, including near-field loading, environmental exposure, and new core architectures.",
          "methods": "A literature synthesis compares air- and underwater-blast theory, experimental observations, and sandwich design studies, then examines constituent-level choices and emerging auxetic and additively manufactured cores.",
          "note": "First-author Ph.D. review article. The takeaways synthesize published studies rather than report a new experiment."
        },
        {
          "id": "naval-blast-implosion-review",
          "title": "Designing naval sandwich structures for blast and implosion",
          "publicationTitle": "Advances in naval composite and sandwich structures for blast and implosion mitigations",
          "authors": "P. Wanchoo, S. Kishore, A. Pandey, A. Shukla",
          "venue": "Journal of Sandwich Structures & Materials · 26(2), 152–174",
          "year": "2024",
          "publicationType": "Review article",
          "url": "https://doi.org/10.1177/10996362221139562",
          "summary": "Naval sandwich structures face both explosive shocks and rapid collapse under external water pressure. This review connects analytical models, experimental evidence, environmental effects, and mitigation strategies across those hazards. It considers how material selection and structural geometry influence blast response, and how an imploding structure can generate damaging pressure pulses that threaten its neighbors.",
          "resultsHeading": "Key takeaways",
          "results": [
            "Simplified blast models provide useful physical insight, but their assumptions matter. Near-field wave curvature, transient stress propagation through the core, and structural damage can require more detailed fluid–structure and material models.",
            "Implosion resistance and the pressure pulse released during collapse are separate design concerns. Ambient pressure, confinement, shock initiation, and the shell or sandwich architecture influence the collapse and its consequences.",
            "The reviewed literature identifies gaps in curved sandwich panels, core and interface damage measurements, and loading combined with temperature or weathering. These conditions matter when moving from laboratory demonstrations to naval service."
          ],
          "importance": "A lightweight naval structure must withstand its operating environment and limit the consequences of failure. Bringing blast and implosion into a common review helps frame both requirements and directs experiments toward coupled conditions, realistic geometries, and the pressure pulses produced by collapse.",
          "methods": "A focused literature review synthesizes analytical and numerical models, shock and implosion experiments, and mitigation concepts for marine composite and sandwich structures, with particular attention to fluid–structure interaction and environmental conditions.",
          "note": "First-author Ph.D. review article; first published online November 14, 2022 and assigned to the 2024 journal issue. The takeaways synthesize published studies rather than report a new experiment."
        }
      ]
    }
  ],
  teachingApproach: {
    intro: "I like teaching mechanics through problems students can observe and test. A demonstration gives us something concrete to discuss: what do we expect to happen, which assumptions does our model need, and how would we check the result?",
    principles: [
      { title: "Observe", text: "Start with a demonstration or a design problem that everyone in the class can examine." },
      { title: "Predict", text: "Build a simple model, state its assumptions, and predict the result before running the experiment." },
      { title: "Discuss", text: "Compare predictions with measurements and ask students to explain where they agree or differ." }
    ],
    areas: ["Solid mechanics", "Experimental methods", "Fracture & composites", "Impact & shock"],
    outlook: {
      title: "Courses I’d like to develop",
      text: "I’d like to develop an Impact and Shock elective covering wave mechanics, high-rate experiments, and material response. I’m also interested in teaching AI-assisted materials design, with students checking model predictions against physical principles and experimental data."
    }
  },
  outreach: "I’ve taught robotics workshops, mentored BAJA vehicle teams, taken part in science-fair outreach at IISc, and led industry training. I’ve also demonstrated hydrostatic loading and impact protection for middle and high school students, and completed training through the JHU Teaching Institute.",
  gallery: [
    {
      id: "helix-facility", title: "The HELIX facility",
      image: "./assets/research/helix-facility.jpg", width: 1680, height: 1036,
      alt: "HELIX facility showing robotic arms, optical equipment, and trays for automated sample handling",
      event: "HELIX · AIMD-L", location: "Johns Hopkins University", dateLabel: "In the lab",
      caption: "The laser-driven microflyer impact facility I designed and built at Johns Hopkins. HELIX is part of AIMD-L, an automated materials laboratory I co-developed."
    },
    {
      id: "rising-stars-2026", title: "Rising Stars at Stanford",
      image: "./assets/gallery/rising-stars-stanford-2026.jpg", width: 2200, height: 1202,
      alt: "Rising Stars in Mechanical Engineering 2026 cohort gathered outdoors at Stanford University",
      event: "Rising Stars in Mechanical Engineering", location: "Stanford University", dateLabel: "September 24–25, 2026",
      caption: "With the 2026 Rising Stars in Mechanical Engineering cohort at Stanford. The workshop covered research programs, mentoring, and academic careers."
    },
    {
      id: "ramesh-lab-pasadena-2026", title: "Ramesh lab dinner in Pasadena",
      image: "./assets/gallery/ramesh-lab-pasadena-2026.jpg", width: 2000, height: 1500,
      alt: "Ramesh lab group gathered for dinner during USNC/TAM 2026 in Pasadena",
      event: "Ramesh lab group dinner · USNC/TAM", location: "Pasadena, California", dateLabel: "June 2026",
      caption: "An evening with the Ramesh lab during the U.S. National Congress on Theoretical and Applied Mechanics in Pasadena."
    },
    {
      id: "sem-symposium-2027", title: "SEM 2027 symposium", kind: "document",
      image: "./assets/gallery/sem-symposium-2027.jpg", width: 920, height: 1190,
      alt: "Call for papers for the SEM 2027 symposium Data-Driven Mechanics: From High-Throughput Experiments to Predictive Models",
      event: "SEM Annual Conference", location: "Vancouver, Washington", dateLabel: "June 7–10, 2027",
      caption: "The call for papers for our symposium on high-throughput experiments and predictive models. The flyer lists the original abstract deadline of October 12, 2026.",
      sourceUrl: "https://sem.org/Files/events/27s/27s%20CFP/CFP-27s-Data-Driven-Mechanics-From-High-Throughput-Experiments-to-Predictive-Models.pdf", sourceLabel: "View official call for papers"
    }
  ],
  // Conference presentations from my CV, plus workshop and organizing updates.
  // Dates are event dates. Year-only dates preserve the precision of the CV.
  // Presenting authors follow the CV's asterisks; coauthorship is not a speaking role.
  newsPublicationStartYear: 2025,
  news: [
    {
      id: "sem-symposium-2027", date: "2027-06-07", endDate: "2027-06-10", dateLabel: "Jun 7–10, 2027",
      category: "Symposium organizer", title: "Co-organizing a data-driven mechanics symposium at SEM 2027",
      event: "SEM Annual Conference", location: "Vancouver, WA",
      summary: "I’m co-organizing Data-Driven Mechanics: From High-Throughput Experiments to Predictive Models with Konrad Muly, Angkur Jyoti Dipanka Shaikeea, and Akash Pandey. The symposium covers automated experiments and their use in developing and testing predictive models.",
      detailsTitle: "About the symposium",
      detailsText: ["Topics include high-throughput mechanics, full-field and multi-sensor measurements, autonomous laboratories, physics-informed models, active learning, and uncertainty quantification.", "We’re interested in how experiments can test model predictions, and how models can help select the next experiment. We welcome work from mechanics, materials science, robotics, and scientific machine learning."],
      note: "Original abstract deadline: October 12, 2026.",
      links: [
        { label: "Conference details", url: "https://sem.org/annual" },
        { label: "Symposium call for papers", url: "https://sem.org/Files/events/27s/27s%20CFP/CFP-27s-Data-Driven-Mechanics-From-High-Throughput-Experiments-to-Predictive-Models.pdf" }
      ]
    },
    {
      id: "tms-2027", date: "2027", dateLabel: "2027",
      category: "Coauthored presentations", title: "Two coauthored talks accepted at TMS 2027",
      titlePast: "Coauthored talks at TMS 2027",
      event: "TMS Annual Meeting & Exhibition", location: "",
      summary: "A. Shargh and C. Stiles will present coauthored work on active learning for spall experiments and autonomous experimentation in AIMD-L.",
      summaryOngoing: "Our coauthored contributions cover active learning for spall experiments and autonomous experimentation in AIMD-L, with A. Shargh and C. Stiles as presenting authors.",
      summaryPast: "Our coauthored contributions covered active learning for spall experiments and autonomous experimentation in AIMD-L, with A. Shargh and C. Stiles as presenting authors.",
      presentations: [
        { title: "Uncertainty-Guided Active Learning for Autonomous Spall Strength Experimentation", presenter: "A. Shargh", format: "Accepted oral presentation", formatPast: "Oral presentation" },
        { title: "From Automated Materials Experiments to Trusted Autonomous Discovery in AIMD-L", presenter: "C. Stiles", format: "Accepted oral presentation", formatPast: "Oral presentation" }
      ]
    },
    {
      id: "mrs-2026", date: "2026-11-29", endDate: "2026-12-04", dateLabel: "Nov 29 – Dec 4, 2026",
      category: "Coauthored presentations", title: "AIMD-L presentations at MRS Fall 2026",
      event: "MRS Fall Meeting", location: "Boston, MA",
      summary: "T.C. Hufnagel will give an invited presentation on integrated characterization workflows. C.D. Stiles will present an accepted talk on autonomous experimentation in AIMD-L. I’m a coauthor on both contributions.",
      summaryOngoing: "Our coauthored contributions cover integrated characterization workflows and autonomous experimentation in AIMD-L. T.C. Hufnagel and C.D. Stiles are the presenting authors.",
      summaryPast: "Our coauthored contributions covered integrated characterization workflows and autonomous experimentation in AIMD-L, with T.C. Hufnagel and C.D. Stiles as presenting authors.",
      presentations: [
        { title: "Integrated Workflows for Automated High-Throughput Characterization of Structure and Properties of Structural Materials", presenter: "T.C. Hufnagel", format: "Invited presentation · Symposium CH05" },
        { title: "Driving AIMD-L from Automated Experimentation to Trusted Autonomy to Enhance Materials Discovery", presenter: "C.D. Stiles", format: "Accepted oral presentation · Symposium MT01", formatPast: "Oral presentation · Symposium MT01" }
      ]
    },
    {
      id: "ses-2026", date: "2026-10-14", dateLabel: "Oct 14, 2026",
      category: "Conference presentations", title: "Alloy shock response at SES 2026",
      event: "SES Annual Technical Meeting", location: "",
      summary: "I presented high-throughput laser-driven flyer impact experiments for measuring shock response in binary alloys on October 14. A second coauthored contribution examined shock response in the Al–Mg alloy system.",
      presentations: [
        { title: "High Throughput laser driven flyer impact system for evaluating shock response of binary alloys", presenter: "Piyush Wanchoo", format: "Oral presentation · Track 7: New Frontiers in Mechanics" },
        { title: "A high-throughput exploration of shock response in Al-Mg binary alloy", presenter: "K.T. Ramesh", format: "Oral presentation · Track 4: Advanced Materials" }
      ]
    },
    {
      id: "rising-stars-2026", date: "2026-09-24", endDate: "2026-09-25", dateLabel: "Sep 24–25, 2026",
      category: "Academic community", title: "Rising Stars in Mechanical Engineering at Stanford",
      event: "Rising Stars in Mechanical Engineering Workshop", location: "Stanford University, CA",
      summary: "I took part in the 2026 Rising Stars workshop at Stanford. We discussed starting a research group, mentoring students, and preparing for academic careers with researchers from across mechanical engineering.",
      detailsTitle: "Acknowledgments",
      detailsText: ["Thank you to Xun Wendy Gu, Allison Okamura, the faculty at Stanford and UC Berkeley, the Stanford staff, and the other participants for the discussions and advice.", "I’m grateful to K.T. Ramesh for nominating me and for his mentorship."],
      links: [{ label: "Workshop details", url: "https://risingstarsme.stanford.edu/" }], gallery: true
    },
    {
      id: "usnctam-2026", date: "2026-06-21", endDate: "2026-06-25", dateLabel: "Jun 21–25, 2026",
      category: "Conference presentations", title: "Impact experiments at USNC/TAM 2026",
      event: "20th U.S. National Congress on Theoretical and Applied Mechanics", location: "Pasadena, CA",
      summary: "Our two contributions covered spall strength mapping in binary alloys and statistical measurements of elastic–plastic transition and failure in metals and alloys.",
      presentations: [
        { title: "A laser-driven approach for high-throughput spall strength mapping and data-driven exploration in binary alloys", presenter: "Piyush Wanchoo; K.T. Ramesh", format: "Conference presentation" },
        { title: "Statistical characterization of shock-induced elastic–plastic transition and spall failure in metals and alloys using high-throughput laser-driven impact experiments", presenter: "Piyush Wanchoo", format: "Conference presentation" }
      ]
    },
    {
      id: "sem-2026", date: "2026-06-01", endDate: "2026-06-04", dateLabel: "Jun 1–4, 2026",
      category: "Conference presentation", title: "Binary alloy impact studies at SEM 2026",
      event: "SEM Annual Conference", location: "Norfolk, VA",
      summary: "My presentation covered high-throughput measurements of shock response and spall strength in binary metals.",
      presentations: [
        { title: "Toward impact-resistant alloys: high-throughput studies of shock response and spall strength in binary metals", presenter: "Piyush Wanchoo", format: "Conference presentation" }
      ]
    },
    {
      id: "tms-2026", date: "2026-03-15", endDate: "2026-03-19", dateLabel: "Mar 15–19, 2026",
      category: "Coauthored presentation", title: "Cu–Ti alloy characterization at TMS 2026",
      event: "TMS Annual Meeting & Exhibition", location: "San Diego, CA",
      summary: "R. Berlia presented our coauthored work on high-throughput processing and characterization of Cu–Ti alloys.",
      presentations: [
        { title: "High-throughput processing and accelerated characterization of Cu–Ti alloys", presenter: "R. Berlia", format: "Conference presentation" }
      ]
    },
    {
      id: "iisc-2025", date: "2025-11-10", dateLabel: "Nov 10, 2025",
      category: "Invited seminar", title: "Invited seminar at the Indian Institute of Science",
      event: "Department of Aerospace Engineering, Indian Institute of Science", location: "Online",
      summary: "An invited department seminar on designing materials for space, defense, and other extreme applications.",
      presentations: [
        { title: "From Shock to Shield: Designing Materials for Space, Defense, and Beyond", presenter: "Piyush Wanchoo", format: "Invited department seminar" }
      ]
    },
    {
      id: "ses-2025", date: "2025-10-13", endDate: "2025-10-15", dateLabel: "Oct 13–15, 2025",
      category: "Conference presentation", title: "Dynamic strength mapping at SES 2025",
      event: "SES Annual Technical Meeting", location: "Atlanta, GA",
      summary: "I presented a laser-driven experimental approach for measuring dynamic strength across binary alloy compositions.",
      presentations: [
        { title: "A scalable laser-driven approach for high-throughput dynamic strength mapping and data-driven exploration in binary alloys", presenter: "Piyush Wanchoo", format: "Conference presentation" }
      ]
    },
    {
      id: "amerimech-2025", date: "2025-09-22", endDate: "2025-09-24", dateLabel: "Sep 22–24, 2025",
      category: "Conference presentation", title: "Automated impact experiments at AmeriMech 2025",
      event: "AmeriMech Symposium · Brown University", location: "Providence, RI",
      summary: "I presented our automated laser-driven impact system for high-throughput measurements of material shock response.",
      presentations: [
        { title: "An automated high-throughput laser-driven impact system for accelerated characterization of material shock response", presenter: "Piyush Wanchoo", format: "Conference presentation" }
      ]
    },
    {
      id: "aps-sccm-2025", date: "2025-06-22", endDate: "2025-06-27", dateLabel: "Jun 22–27, 2025",
      category: "Conference presentation", title: "Spall strength measurements at APS SCCM 2025",
      event: "APS SCCM · 24th Biennial Conference on Shock Compression of Condensed Matter", location: "Washington, DC",
      summary: "I presented high-throughput laser-driven micro-plate impact experiments examining the factors that affect spall strength.",
      presentations: [
        { title: "Unraveling spall strength dependencies through laser-driven micro-plate impact high-throughput experiments", presenter: "Piyush Wanchoo", format: "Conference presentation" }
      ]
    },
    {
      id: "mach-2025", date: "2025-04-09", endDate: "2025-04-11", dateLabel: "Apr 9–11, 2025",
      category: "Conference presentation", title: "Copper spall experiments at MACH 2025",
      event: "MACH Conference", location: "Annapolis, MD",
      summary: "A high-throughput investigation of how grain size and crystallographic orientation influence spall in copper.",
      presentations: [
        { title: "High-throughput investigation of spall in copper: the influence of grain size and crystallographic orientation", presenter: "Piyush Wanchoo", format: "Conference presentation" }
      ]
    },
    {
      id: "tms-2025", date: "2025-03-23", endDate: "2025-03-27", dateLabel: "Mar 23–27, 2025",
      category: "Coauthored presentation", title: "Copper and Cu–Ti characterization at TMS 2025",
      event: "TMS Annual Meeting & Exhibition", location: "Las Vegas, NV",
      summary: "R. Berlia presented our coauthored work on high-throughput synthesis and rapid characterization of copper and Cu–Ti alloys.",
      presentations: [
        { title: "High-throughput synthesis and rapid characterization of Cu and Cu–Ti alloys", presenter: "R. Berlia", format: "Conference presentation" }
      ]
    },
    {
      id: "uri-2025", date: "2025-02-25", dateLabel: "Feb 25, 2025",
      category: "Invited talk", title: "Invited talk at the University of Rhode Island",
      event: "University of Rhode Island", location: "Kingston, RI",
      summary: "An invited talk on how high-throughput experiments can support AI-driven materials design.",
      presentations: [
        { title: "Unlocking material performance at extremes: high-throughput experiments for AI-driven design", presenter: "Piyush Wanchoo", format: "Invited talk" }
      ]
    }
  ],
  projects: [
    {
      title: "HELIX impact facility", category: "experiments", label: "AUTOMATED IMPACT EXPERIMENTS",
      description: "An automated laser-driven impact platform for exploring material strength and failure at extreme strain rates.",
      detail: "I designed and built HELIX, an automated laser-driven microflyer impact facility at Johns Hopkins. It combines robotic sample handling, impact experiments, and rapid data analysis to measure dynamic strength and failure across compositions, microstructures, and loading conditions. We use it to study spall in copper and shock response in Cu–Ti, Al–Mg, and Ti–V alloys. HELIX is part of AIMD-L, an automated laboratory I co-developed for characterizing structural materials under extreme loading.",
      tags: ["Shock physics", "Automation", "AIMD-L"], art: "lab", image: "./assets/research/helix-facility.jpg",
      imageAlt: "HELIX laser-driven microflyer impact facility with robotic arms, optical equipment, and sample trays at Johns Hopkins",
      url: "https://arxiv.org/abs/2603.06835", linkLabel: "Read the AIMD-L preprint"
    },
    {
      id: "dynamic-ashby-atlas", title: "Dynamic Ashby Atlas", category: "code", label: "INTERACTIVE MATERIAL MAPS",
      description: "Explore spall strength and Hugoniot elastic limit across published shock-physics studies, with links to the original sources.",
      detail: "Dynamic Ashby Atlas plots published spall strength and Hugoniot elastic limit measurements on interactive material maps. Each measurement links to its source so you can check the original publication. The website also includes a source library, downloadable literature records, and reviewed property data.",
      tags: ["Material maps", "Shock physics", "Literature data"], art: "orb",
      image: "./assets/dynamic-ashby-atlas.svg",
      imageAlt: "Schematic dynamic Ashby map showing illustrative clusters against Hugoniot elastic limit and spall strength, not measured data",
      links: [
        { label: "Explore the atlas", url: "https://piyushwanchoo.com/Dynamic-Ashby-Atlas/" },
        { label: "View on GitHub", url: "https://github.com/Piyushjhu/Dynamic-Ashby-Atlas" }
      ]
    },
    {
      title: "HELIX Toolbox", category: "code", label: "OPEN-SOURCE RESEARCH SOFTWARE",
      description: "A Python toolbox for processing velocimetry signals and analyzing high-rate impact experiments.",
      detail: "HELIX Toolbox brings together signal processing and automated analysis for laser-driven microflyer impact experiments. It supports analysis of photonic Doppler velocimetry data, extraction of spall strength and Hugoniot elastic limits, and uncertainty quantification. The repository includes ALPSS and SPADE workflows, with graphical and batch-processing interfaces.",
      tags: ["Python", "PDV", "Signal processing"], art: "code",
      url: "https://github.com/Piyushjhu/HELIX_Toolbox", linkLabel: "View on GitHub"
    },
    {
      title: "Bayesian optimization for spall data", category: "code", label: "BAYESIAN OPTIMIZATION & MACHINE LEARNING",
      description: "Gaussian processes, uncertainty-aware predictions, and Bayesian optimization for spall strength data.",
      detail: "A package for analyzing laser-driven microflyer impact data with Gaussian-process models and Bayesian optimization. It includes tools for visualizing spall strength predictions and their uncertainty, and for selecting further experiments.",
      tags: ["Bayesian optimization", "Gaussian processes"], art: "data",
      url: "https://github.com/Piyushjhu/bayesian-optimization-on-LMI-data", linkLabel: "Explore the repository"
    },
    {
      title: "pyko-enhanced", category: "code", label: "COMPUTATIONAL SHOCK PHYSICS",
      description: "Extending one-dimensional shock simulation with hybrid spall detection and interface-separation modeling.",
      detail: "An extension of the open-source PyKO elastic–plastic finite-difference shock simulation framework. My work includes hybrid spall detection, interface-separation analysis, and example problems for investigating shock-driven material response. PyKO was originally developed by Sarah T. Stewart; the repository credits the original authors and contributors.",
      tags: ["Python", "Simulation", "Wave propagation"], art: "wave",
      url: "https://github.com/Piyushjhu/pyko-enhanced", linkLabel: "View on GitHub"
    },
    {
      title: "SPADE", category: "code", label: "AUTOMATED DATA REDUCTION",
      description: "Shock Physics Automated Data Extraction: a toolkit for processing VISAR and PDV time series.",
      detail: "SPADE processes time-series data from shock experiments and extracts material response from VISAR and PDV measurements. It is part of HELIX Toolbox.",
      tags: ["Data extraction", "VISAR", "PDV"], art: "signal",
      url: "https://github.com/Piyushjhu/HELIX_Toolbox/tree/main/SPADE", linkLabel: "Explore SPADE"
    },
    {
      title: "Underwater bubble tracking", category: "experiments", label: "HIGH-SPEED IMAGING & UNDERWATER SHOCK",
      description: "A Jupyter workflow for tracking the evolution of underwater spark-generated bubbles.",
      detail: "Jupyter notebooks for tracking underwater spark-generated bubbles in high-speed images.",
      tags: ["Image analysis", "Jupyter", "Fluid dynamics"], art: "bubble",
      url: "https://github.com/Piyushjhu/Underwater_spark_bubble_tracking", linkLabel: "View the workflow"
    }
  ],
  publications: [
    { title: "A Closed-Loop Automation Framework for High-Throughput Laser-Driven Micro-flyer Impact Experiments", authors: "A. Bhattacharjee, K. Muly, P. Wanchoo, S. A. Sreedhar, L. Rackers, J. Rentas-Velez, P. Addepalli, K. T. Ramesh, A. Krieger", venue: "Integrating Materials and Manufacturing Innovation", year: "2026", url: "https://doi.org/10.1007/s40192-026-00482-1", note: "Published October 23, 2026", featured: true },
    { title: "High-throughput dynamic experiments: the statistics of spall failure at ultra-high strain rates", authors: "P. Wanchoo, R. Berlia, T.P. Weihs, K.T. Ramesh", venue: "Journal of the Mechanics and Physics of Solids · 210, 106523", year: "2026", url: "https://doi.org/10.1016/j.jmps.2026.106523", featured: true },
    { title: "Near-field underwater explosion and its interaction with a sandwich composite plate", authors: "A. Pandey, P. Wanchoo, H. Matos, J. LeBlanc, A. Shukla", venue: "International Journal of Impact Engineering · 196, 105155", year: "2025", url: "https://doi.org/10.1016/j.ijimpeng.2024.105155" },
    { title: "Shear constitutive behavior of closed-cell PVC foams at varied loading rates", authors: "A. Pandey, P. Wanchoo, A. Shukla", venue: "Journal of Dynamic Behavior of Materials · 11(4), 534–545", year: "2025", url: "https://doi.org/10.1007/s40870-025-00477-7" },
    { title: "Energy quantification framework for underwater explosive loading into PVC foam-cladded composite plates", authors: "P. Wanchoo, A. Pandey, M. Leger, J. LeBlanc, A. Shukla", venue: "Journal of the Mechanics and Physics of Solids · 187, 105646", year: "2024", url: "https://doi.org/10.1016/j.jmps.2024.105646", featured: true },
    { title: "Advances in naval composite and sandwich structures for blast and implosion mitigations", authors: "P. Wanchoo, S. Kishore, A. Pandey, A. Shukla", venue: "Journal of Sandwich Structures & Materials · 26(2), 152–174", year: "2024", url: "https://doi.org/10.1177/10996362221139562" },
    { title: "Shock response of sandwich panels with additively manufactured polymer gyroid lattice cores", authors: "B. Oladipo, S. Doner, G.A. Lyngdoh, J.T. Villada, P. Wanchoo, H. Matos, A. Shukla, S. Das", venue: "Materials Today Communications · 41, 110664", year: "2024", url: "https://doi.org/10.1016/j.mtcomm.2024.110664" },
    { title: "Curved polymeric sandwich composites subjected to air shock: an experimental investigation", authors: "A. Pandey, P. Wanchoo, H. Matos, A. Shukla", venue: "Experimental Mechanics · 64(6), 945–961", year: "2024", url: "https://doi.org/10.1007/s11340-024-01069-7" },
    { title: "Blast failure and energy analysis of rubber-modified carbon-fiber vinyl-ester composite laminates", authors: "P. Wanchoo, B. Chaudhary, H.-W.-X. Li, H. Matos, A. Shukla", venue: "Mechanics of Materials · 183, 104685", year: "2023", url: "https://doi.org/10.1016/j.mechmat.2023.104685", note: "Selected as journal cover · Corrigendum: 185, 104784", featured: true },
    { title: "Stress wave propagation and force transmission in polymeric closed-cell foams subjected to air shock loading", authors: "P. Wanchoo, A. Pandey, A. Shukla", venue: "Extreme Mechanics Letters · 63, 102061", year: "2023", url: "https://doi.org/10.1016/j.eml.2023.102061", featured: true },
    { title: "Smooth mode decomposition: theory and its applications in full-field output-only modal analysis", authors: "H.-W.-X. Li, P. Wanchoo, A. Shukla, D. Chelidze", venue: "Mechanical Systems and Signal Processing · 200, 110541", year: "2023", url: "https://doi.org/10.1016/j.ymssp.2023.110541" },
    { title: "A large deformation model for quasi-static to high strain rate response of a rate-stiffening soft polymer", authors: "A. Konale, Z. Ahmed, P. Wanchoo, V. Srivastava", venue: "International Journal of Plasticity · 168, 103701", year: "2023", url: "https://doi.org/10.1016/j.ijplas.2023.103701" },
    { title: "Hydrostatic high strain rate loading response of closed-cell polymeric foams as a function of mass density", authors: "P. Wanchoo, S. Kishore, A. Shukla", venue: "Composites Part B: Engineering · 247, 110318", year: "2022", url: "https://doi.org/10.1016/j.compositesb.2022.110318" },
    { title: "Investigations on air and underwater blast mitigation in polymeric composite structures: a review", authors: "P. Wanchoo, H. Matos, C.E. Rousseau, A. Shukla", venue: "Composite Structures · 263, 113530", year: "2021", url: "https://doi.org/10.1016/j.compstruct.2020.113530" }
  ],
  conferencePublications: [
    { title: "Closed Loop Vision Guided Control of Flyer Position for High-Throughput Laser Shock Experiments", authors: "H. Wang, J. M. Diamond, A. Bhattacharjee, P. Wanchoo, A. Mirzaei, L. Li, T. J. Nkansah-Mahaney, K. Ramesh, A. Krieger", venue: "ASME IMECE 2024 · Volume 5: Dynamics, Vibration, and Control · V005T07A065", year: "2024", url: "https://doi.org/10.1115/IMECE2024-145264", note: "IMECE 2024 proceedings; published online January 23, 2025." }
  ],
  manuscripts: [
    { title: "AIMD-L: an automated laboratory for high-throughput characterization of structural materials for extreme environments", authors: "T.C. Hufnagel, P. Addepalli, A. Bhattacharjee, R. Berlia, J. El-Awady, D. Elbert, L. Graham-Brady, A. Krieger, H. Neralla, T.J. Nkansah-Mahaney, M.M. Omar, H.S. Park, K.T. Ramesh, M. Shaeffer, E. Walker, P. Wanchoo, T.P. Weihs", venue: "arXiv:2603.06835", year: "2026 · Preprint", url: "https://arxiv.org/abs/2603.06835", pdf: "https://arxiv.org/pdf/2603.06835" },
    { title: "High-throughput extreme laser impact experiments (HELIX): an automated platform for rapid evaluation of material shock response", authors: "P. Wanchoo, A. Sreedhar, K. Muly, L. Rackers, A. Bhattacharjee, J.M. Diamond, C. DiMarco, P. Addepalli, E. Walker, R. Ali, D. Elbert, A. Krieger, K.T. Ramesh", year: "Under review" },
    { title: "Independent control of Hugoniot elastic limit and spall strength via composition and aging in a binary Cu–Ti alloy", authors: "P. Wanchoo, K.T. Ramesh, A. Sreedhar, R. Berlia, T.C. Hufnagel, H.S. Park, T.P. Weihs", year: "In preparation" },
    { title: "A high-throughput exploration of Hugoniot Elastic Limit and spall strength in an Al–Mg binary alloy system", authors: "A. Sreedhar, P. Wanchoo, R. Mehta, T.P. Weihs, K.T. Ramesh", year: "In preparation" },
    { title: "Gaussian process regression for uncertainty-aware prediction of spall strength across materials and shock conditions", authors: "A. Shargh, P. Wanchoo, J. El-Awady, K.T. Ramesh", year: "In preparation" }
  ],
  metrics: [
    { value: "HELIX", label: "Automated impact facility" },
    { value: "1,000×", label: "Throughput vs. plate impact, up to" },
    { source: "scholar-publications", value: "14", label: "Journal articles · 7 first-authored" },
    { source: "scholar-citations", value: "272", label: "Citations · September 2026" }
  ],
  experience: [
    { period: "SEP 2023 — PRESENT", role: "Postdoctoral Fellow", organization: "Hopkins Extreme Materials Institute · Johns Hopkins University", description: "Working with K.T. Ramesh on autonomous, high-throughput experimental mechanics. Designed and built the HELIX laser-driven impact facility, established spall failure statistics through 173 copper experiments, and co-developed AIMD-L for accelerated materials discovery.", current: true },
    { period: "SEP 2019 — AUG 2023", role: "Graduate Research Assistant", organization: "University of Rhode Island · Kingston, RI", description: "Advised by Arun Shukla. Designed and built underwater shock and air-blast facilities to characterize the constitutive and failure response of composite laminates, polymeric foams, and sandwich materials." },
    { period: "JUL 2016 — AUG 2019", role: "Assistant Manager, Research & Development", organization: "Fouress Engineering · Bangalore, India", description: "Led design optimization of industrial valves, dampers, and diverters for extreme service conditions. Built FEA and CFD frameworks for structural and fluid–structure analysis, reducing fabrication cost and shortening design cycles." }
  ],
  education: [
    { period: "2019 — 2023", degree: "Ph.D., Mechanical Engineering", institution: "University of Rhode Island", detail: "Characterization & Dynamic Response of Novel Composite Structures to Air Blast and Underwater Shock. Advisor: Arun Shukla." },
    { period: "2014 — 2016", degree: "M.E., Mechanical Engineering", institution: "Indian Institute of Science, Bangalore", detail: "Novel Notched Fracture Specimen for Fatigue Loading: Mechanics of V-notches and Applications." },
    { period: "2010 — 2014", degree: "B.E., Mechanical Engineering", institution: "University of Pune", detail: "" }
  ],
  awards: [
    { year: "2026", text: "Participant, Rising Stars in Mechanical Engineering Academic Career Workshop · Stanford University, September 24–25" },
    { year: "2025", text: "SES Postdoctoral Travel Award · Society of Engineering Science" },
    { year: "2023", text: "3rd Prize, Michael Sutton International Student Paper Competition · Society for Experimental Mechanics" },
    { year: "2023", text: "Journal cover · Mechanics of Materials, Volume 183" },
    { year: "2021–22", text: "Enhancement of Graduate Research Award · University of Rhode Island" }
  ],
  teaching: [
    { label: "Mechanics & materials", title: "Forces, deformation, and material response", detail: "I use examples from impact protection and aerospace to discuss how material structure and loading rate affect deformation. Students work through the assumptions behind a model and consider how those assumptions affect material selection." },
    { label: "Experimental methods", title: "Measurement and uncertainty", detail: "Methods such as photoelasticity and digital image correlation let students compare a calculation with an observed response. We discuss what each method measures, where uncertainty enters, and how to design an experiment around a specific question." },
    { label: "Fracture & design", title: "Cracks, interfaces, and energy absorption", detail: "I use problems in fracture and composites to examine how cracks and interfaces affect structural failure. We discuss what those mechanisms mean for durability and impact protection, and how to use the evidence when making design decisions." }
  ],
  capabilities: [
    { title: "Dynamic experiments", text: "Laser-driven microflyer impact; PDV and VISAR interferometry; shock tube and underwater blast; ultra-high-speed imaging; 3D digital image correlation; photoelasticity; pressure instrumentation." },
    { title: "Automation & data", text: "Closed-loop robotic control; automated data-reduction pipelines; Bayesian optimization and active learning; uncertainty quantification; the Python scientific stack." },
    { title: "Computation", text: "Finite-element analysis; computational fluid dynamics; one-dimensional finite-difference shock physics simulation; physics-informed machine learning." }
  ],
  talks: [
    { year: "2025", title: "From Shock to Shield: Designing Materials for Space, Defense, and Beyond", detail: "Invited department seminar · Aerospace Engineering, Indian Institute of Science · November 10" },
    { year: "2025", title: "Unlocking material performance at extremes: high-throughput experiments for AI-driven design", detail: "Invited talk · University of Rhode Island · February 25" },
    { year: "2026", title: "A laser-driven approach for high-throughput spall strength mapping and data-driven exploration in binary alloys", detail: "20th U.S. National Congress on Theoretical and Applied Mechanics · Pasadena · June 21–25" },
    { year: "2026", title: "Toward impact-resistant alloys: high-throughput studies of shock response and spall strength in binary metals", detail: "SEM Annual Conference · Norfolk · June 1–4" }
  ],
  service: [
    "Lead symposium organizer, Data-Driven Mechanics: From High-Throughput Experiments to Predictive Models · SEM Annual Conference, Vancouver, Washington, June 7–10, 2027. Co-organizers: Konrad Muly, Angkur Jyoti Dipanka Shaikeea, and Akash Pandey.",
    "Organizing committee member · 2026 Materials Genome Initiative PI Workshop, Materials Research Data Alliance (MaRDA).",
    "Session chair · SEM Annual Conferences, Dynamic Behavior of Materials · 2023–2026.",
    "Contributor · SEM Technical Division on Dynamic Behavior of Materials.",
    "Journal reviewer for Extreme Mechanics Letters, European Journal of Mechanics – A/Solids, Experimental Mechanics, Journal of Dynamic Behavior of Materials, Journal of Sandwich Structures and Materials, Textile Research Journal, Flow, Journal of Marine Science and Engineering, Applied Sciences, and Buildings."
  ],
  mentorship: "I co-mentor doctoral, master’s, and undergraduate researchers at Johns Hopkins University and the University of Rhode Island, and co-supervised an industrial master’s dissertation at Fouress Engineering. My mentoring spans experimental mechanics, shock physics, instrumentation, and research problem formulation."
};
