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
      links: [{ label: "Energy transfer under underwater loading", url: "https://doi.org/10.1016/j.jmps.2024.105646" }, { label: "Composite laminate failure", url: "https://doi.org/10.1016/j.mechmat.2023.104685" }]
    },
    {
      id: "porous-materials", status: "past", label: "POROUS MATERIALS & WAVE PROPAGATION",
      title: "Stress waves in polymeric foams",
      summary: "During my Ph.D., I studied how closed-cell polymeric foams deform and transmit force under air shock and rapid hydrostatic loading.",
      institution: "Ph.D. research · University of Rhode Island", tags: ["Polymeric foams", "Stress waves", "Dynamic response"],
      details: [
        { title: "The question", text: "How do foam density and loading conditions affect deformation, stress-wave propagation, and the force transmitted through a protective layer?" },
        { title: "The approach", text: "I used air shock and water-filled shock tubes, with three-dimensional digital image correlation to measure deformation in the foams." }
      ],
      links: [{ label: "Stress waves and force transmission", url: "https://doi.org/10.1016/j.eml.2023.102061" }, { label: "Hydrostatic high-rate response", url: "https://doi.org/10.1016/j.compositesb.2022.110318" }]
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
      event: "TMS Annual Meeting & Exhibition", location: "",
      summary: "A. Shargh and C. Stiles will present coauthored work on active learning for spall experiments and autonomous experimentation in AIMD-L.",
      presentations: [
        { title: "Uncertainty-Guided Active Learning for Autonomous Spall Strength Experimentation", presenter: "A. Shargh", format: "Accepted oral presentation" },
        { title: "From Automated Materials Experiments to Trusted Autonomous Discovery in AIMD-L", presenter: "C. Stiles", format: "Accepted oral presentation" }
      ]
    },
    {
      id: "mrs-2026", date: "2026-11-29", endDate: "2026-12-04", dateLabel: "Nov 29 – Dec 4, 2026",
      category: "Coauthored presentations", title: "AIMD-L presentations at MRS Fall 2026",
      event: "MRS Fall Meeting", location: "Boston, MA",
      summary: "T.C. Hufnagel will give an invited presentation on integrated characterization workflows. C.D. Stiles will present an accepted talk on autonomous experimentation in AIMD-L. I’m a coauthor on both contributions.",
      presentations: [
        { title: "Integrated Workflows for Automated High-Throughput Characterization of Structure and Properties of Structural Materials", presenter: "T.C. Hufnagel", format: "Invited presentation · Symposium CH05" },
        { title: "Driving AIMD-L from Automated Experimentation to Trusted Autonomy to Enhance Materials Discovery", presenter: "C.D. Stiles", format: "Accepted oral presentation · Symposium MT01" }
      ]
    },
    {
      id: "ses-2026", date: "2026", dateLabel: "2026",
      category: "Accepted presentations", title: "Alloy shock response at SES 2026",
      event: "SES Annual Technical Meeting", location: "",
      summary: "My accepted talk focuses on high-throughput laser-driven flyer impact experiments in binary alloys. A second coauthored contribution examines shock response in the Al–Mg alloy system.",
      presentations: [
        { title: "High Throughput laser driven flyer impact system for evaluating shock response of binary alloys", presenter: "Piyush Wanchoo", format: "Accepted oral presentation · Track 7: New Frontiers in Mechanics" },
        { title: "A high-throughput exploration of shock response in Al-Mg binary alloy", presenter: "K.T. Ramesh", format: "Accepted oral presentation · Track 4: Advanced Materials" }
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
    { title: "Closed-loop automation of a high-throughput laser-driven impact system for accelerated shock physics discovery", authors: "A. Bhattacharjee, K. Muly, P. Wanchoo, S.A. Sreedhar, L. Rackers, J. Rentas-Velez, P. Addepalli, K.T. Ramesh, A. Krieger", venue: "Integrating Materials and Manufacturing Innovation", year: "Accepted", featured: true },
    { title: "High-throughput dynamic experiments: the statistics of spall failure at ultra-high strain rates", authors: "P. Wanchoo, R. Berlia, T.P. Weihs, K.T. Ramesh", venue: "Journal of the Mechanics and Physics of Solids · 210, 106523", year: "2026", url: "https://doi.org/10.1016/j.jmps.2026.106523", featured: true },
    { title: "Near-field underwater explosion and its interaction with a sandwich composite plate", authors: "A. Pandey, P. Wanchoo, H. Matos, J. LeBlanc, A. Shukla", venue: "International Journal of Impact Engineering · 196, 105155", year: "2025", url: "https://doi.org/10.1016/j.ijimpeng.2024.105155" },
    { title: "Shear constitutive behavior of closed-cell PVC foams at varied loading rates", authors: "A. Pandey, P. Wanchoo, A. Shukla", venue: "Journal of Dynamic Behavior of Materials · 11(4), 534–545", year: "2025", url: "https://doi.org/10.1007/s40870-025-00477-7" },
    { title: "Energy quantification framework for underwater explosive loading into PVC foam-cladded composite plates", authors: "P. Wanchoo, A. Pandey, M. Leger, J. LeBlanc, A. Shukla", venue: "Journal of the Mechanics and Physics of Solids · 187, 105646", year: "2024", url: "https://doi.org/10.1016/j.jmps.2024.105646", featured: true },
    { title: "Advances in naval composite and sandwich structures for blast and implosion mitigations", authors: "P. Wanchoo, S. Kishore, A. Pandey, A. Shukla", venue: "Journal of Sandwich Structures & Materials · 26(2), 152–174", year: "2024", url: "https://doi.org/10.1177/10996362221139562" },
    { title: "Shock response of sandwich panels with additively manufactured polymer gyroid lattice cores", authors: "B. Oladipo, S. Doner, G.A. Lyngdoh, J.T. Villada, P. Wanchoo, H. Matos, A. Shukla, S. Das", venue: "Materials Today Communications · 41, 110664", year: "2024", url: "https://doi.org/10.1016/j.mtcomm.2024.110664" },
    { title: "Curved polymeric sandwich composites subjected to air shock: an experimental investigation", authors: "A. Pandey, P. Wanchoo, H. Matos, A. Shukla", venue: "Experimental Mechanics · 64(6), 945–961", year: "2024", url: "https://doi.org/10.1007/s11340-024-01069-7" },
    { title: "Blast failure and energy analysis of rubber-modified carbon-fiber vinyl-ester composite laminates", authors: "P. Wanchoo, B. Chaudhary, H. Matos, A. Shukla", venue: "Mechanics of Materials · 183, 104685", year: "2023", url: "https://doi.org/10.1016/j.mechmat.2023.104685", note: "Selected as journal cover · Corrigendum: 185, 104784", featured: true },
    { title: "Stress wave propagation and force transmission in polymeric closed-cell foams subjected to air shock loading", authors: "P. Wanchoo, A. Pandey, A. Shukla", venue: "Extreme Mechanics Letters · 63, 102061", year: "2023", url: "https://doi.org/10.1016/j.eml.2023.102061", featured: true },
    { title: "Smooth mode decomposition: theory and its applications in full-field output-only modal analysis", authors: "H.-W.-X. Li, P. Wanchoo, A. Shukla, D. Chelidze", venue: "Mechanical Systems and Signal Processing · 200, 110541", year: "2023", url: "https://doi.org/10.1016/j.ymssp.2023.110541" },
    { title: "A large deformation model for quasi-static to high strain rate response of a rate-stiffening soft polymer", authors: "A. Konale, Z. Ahmed, P. Wanchoo, V. Srivastava", venue: "International Journal of Plasticity · 168, 103701", year: "2023", url: "https://doi.org/10.1016/j.ijplas.2023.103701" },
    { title: "Hydrostatic high strain rate loading response of closed-cell polymeric foams as a function of mass density", authors: "P. Wanchoo, S. Kishore, A. Shukla", venue: "Composites Part B: Engineering · 247, 110318", year: "2022", url: "https://doi.org/10.1016/j.compositesb.2022.110318" },
    { title: "Investigations on air and underwater blast mitigation in polymeric composite structures: a review", authors: "P. Wanchoo, H. Matos, C.E. Rousseau, A. Shukla", venue: "Composite Structures · 263, 113530", year: "2021", url: "https://doi.org/10.1016/j.compstruct.2020.113530" }
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
