/* Edit your professional content here. Metrics are dated September 2026.
   Optional empty links are hidden. All career details were supplied by Piyush. */
window.SITE_CONTENT = {
  name: "Piyush Wanchoo",
  firstName: "Piyush",
  initials: "PW",
  title: "Piyush Wanchoo — Materials at extremes. Discovery, accelerated.",
  description: "Piyush Wanchoo is a postdoctoral fellow at Johns Hopkins University working on experimental mechanics, autonomous experiments, and materials under extreme conditions.",
  heroDescription: "I build experiments and tools to understand materials at their limits—and accelerate what we can discover.",
  bio: [
    "I’m a Postdoctoral Fellow at the Hopkins Extreme Materials Institute, Johns Hopkins University, working with K.T. Ramesh. My research connects experimental mechanics, laboratory automation, and data-driven materials discovery.",
    "I designed and built an automated laser-driven microflyer impact facility for high-throughput studies of dynamic strength and failure. I’m interested in how microstructure, composition, and loading conditions shape a material’s response—and how better experiments can help us see the whole picture.",
    "Previously, I earned my Ph.D. in Mechanical Engineering at the University of Rhode Island with Arun Shukla, studying composite structures under air blast and underwater shock. Before that, I worked in industrial R&D in Bangalore."
  ],
  portrait: "./logo.jpg",
  interests: ["Experimental mechanics", "Autonomous laboratories", "Data-driven materials"],
  email: "pwanchoo@jhu.edu",
  github: "https://github.com/Piyushjhu",
  scholar: "https://scholar.google.com/citations?user=L0GoOBAAAAAJ&hl=en&oi=ao",
  linkedin: "",
  resume: "",
  location: "Baltimore, Maryland",
  affiliation: "Hopkins Extreme Materials Institute · Johns Hopkins University",
  researchDescription: "How do materials deform and fail under extreme loading? I combine high-throughput experiments, shock physics, and machine learning to uncover the relationships that drive their performance.",
  projects: [
    {
      title: "HELIX. Experiments, accelerated.", category: "experiments", label: "AUTONOMOUS EXPERIMENTAL MECHANICS",
      description: "An automated laser-driven impact platform for exploring material strength and failure at extreme strain rates.",
      detail: "I designed and built an automated laser-driven microflyer impact facility at Johns Hopkins that has enabled more than 1,700 impact experiments. The platform achieves up to 1,000× the throughput of conventional plate-impact methods at approximately one-hundredth the cost per data point. It has supported studies of spall failure in copper and composition- and kinetics-resolved measurements in Cu–Ti, Al–Mg, and Ti–V alloys. HELIX is part of AIMD-L, an automated laboratory I co-developed for characterizing structural materials in extreme environments.",
      tags: ["Shock physics", "Automation", "AIMD-L"], art: "lab", image: "./assets/aimdl-laboratory.png",
      imageAlt: "The AIMD-L laboratory at Johns Hopkins University, showing experimental stations and robotic sample handling",
      imageCredit: "AIMD-L photograph: Hufnagel et al. (2026), Figure 2a. CC BY-NC-ND 4.0.",
      url: "https://arxiv.org/abs/2603.06835", linkLabel: "Read the AIMD-L preprint"
    },
    {
      title: "HELIX Toolbox.", category: "code", label: "OPEN-SOURCE RESEARCH SOFTWARE",
      description: "From raw velocimetry signals to useful insights. A Python toolbox for automated analysis of high-rate impact experiments.",
      detail: "HELIX Toolbox brings together signal processing and automated analysis for laser-driven microflyer impact experiments. It supports analysis of photonic Doppler velocimetry data, extraction of spall strength and Hugoniot elastic limits, and uncertainty quantification. The repository includes ALPSS and SPADE workflows, with graphical and batch-processing interfaces.",
      tags: ["Python", "PDV", "Signal processing"], art: "code",
      url: "https://github.com/Piyushjhu/HELIX_Toolbox", linkLabel: "View on GitHub"
    },
    {
      title: "Learning what to test next.", category: "code", label: "BAYESIAN OPTIMIZATION & MACHINE LEARNING",
      description: "Gaussian processes, uncertainty-aware predictions, and Bayesian optimization for spall strength data.",
      detail: "A machine-learning package for analyzing laser-driven microflyer impact data. The project combines enhanced Bayesian optimization, Gaussian processes, and visualization to explore spall strength and support data-driven experimental decisions.",
      tags: ["Bayesian optimization", "Gaussian processes"], art: "data",
      url: "https://github.com/Piyushjhu/bayesian-optimization-on-LMI-data", linkLabel: "Explore the repository"
    },
    {
      title: "pyko-enhanced.", category: "code", label: "COMPUTATIONAL SHOCK PHYSICS",
      description: "Extending one-dimensional shock simulation with hybrid spall detection and interface-separation modeling.",
      detail: "An extension of the open-source PyKO elastic–plastic finite-difference shock simulation framework. My work includes hybrid spall detection, interface-separation analysis, and example problems for investigating shock-driven material response. PyKO was originally developed by Sarah T. Stewart; the repository credits the original authors and contributors.",
      tags: ["Python", "Simulation", "Wave propagation"], art: "wave",
      url: "https://github.com/Piyushjhu/pyko-enhanced", linkLabel: "View on GitHub"
    },
    {
      title: "SPADE.", category: "code", label: "AUTOMATED DATA REDUCTION",
      description: "Shock Physics Automated Data Extraction: turning VISAR and PDV time series into reproducible measurements.",
      detail: "SPADE is a toolkit for processing time-series data from shock experiments. It supports automated extraction of material response from VISAR and PDV measurements and forms part of the HELIX Toolbox analysis ecosystem.",
      tags: ["Data extraction", "VISAR", "PDV"], art: "signal",
      url: "https://github.com/Piyushjhu/HELIX_Toolbox/tree/main/SPADE", linkLabel: "Explore SPADE"
    },
    {
      title: "Following the bubble.", category: "experiments", label: "HIGH-SPEED IMAGING & UNDERWATER SHOCK",
      description: "A Jupyter workflow for tracking the evolution of underwater spark-generated bubbles.",
      detail: "An image-analysis workflow for tracking underwater spark-generated bubbles. The project connects high-speed experimental imaging with reproducible analysis in Jupyter notebooks.",
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
    { value: "1,700+", label: "Automated impact experiments" },
    { value: "1,000×", label: "Throughput vs. plate impact, up to" },
    { value: "14", label: "Journal articles · 7 first-authored" },
    { value: "272", label: "Citations · September 2026" }
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
    { role: "Instructor", title: "Mechanics and Materials for Extreme Applications", institution: "Johns Hopkins University · EN.500.111 · Fall 2024", detail: "Designed and taught an undergraduate HEART course with no prerequisites, integrating experimental demonstrations, laboratory tours, and open-ended case-study analysis." },
    { role: "Teaching Assistant", title: "Mechanical Engineering Experimentation", institution: "University of Rhode Island · MCE 414 · 2021–2022", detail: "Laboratory lectures on photoelasticity, digital image correlation, and dynamic testing." },
    { role: "Teaching Assistant", title: "Introduction to Fracture Mechanics", institution: "University of Rhode Island · MCE 576 · 2021", detail: "" }
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
    "Symposium organizer, Data-Driven Mechanics: From High-Throughput Experiments to Predictive Models · 2027 SEM Annual Conference.",
    "Organizing committee member · 2026 Materials Genome Initiative PI Workshop, Materials Research Data Alliance (MaRDA).",
    "Session chair · SEM Annual Conferences, Dynamic Behavior of Materials · 2023–2026.",
    "Contributor · SEM Technical Division on Dynamic Behavior of Materials.",
    "Journal reviewer for Extreme Mechanics Letters, European Journal of Mechanics – A/Solids, Experimental Mechanics, Journal of Dynamic Behavior of Materials, Journal of Sandwich Structures and Materials, Textile Research Journal, Flow, Journal of Marine Science and Engineering, Applied Sciences, and Buildings."
  ],
  mentorship: "I co-mentor doctoral, master’s, and undergraduate researchers at Johns Hopkins University and the University of Rhode Island, and co-supervised an industrial master’s dissertation at Fouress Engineering. My mentoring spans experimental mechanics, shock physics, instrumentation, and research problem formulation."
};
