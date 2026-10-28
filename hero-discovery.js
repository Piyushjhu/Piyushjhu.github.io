/* A schematic experiment-to-discovery sequence; no measured data or network requests. */
(() => {
  "use strict";
  const root = document.getElementById("hero-discovery");
  const toggle = document.getElementById("discovery-motion-toggle");
  const trace = document.getElementById("discovery-trace");
  if (!root || !toggle || !trace) return;
  const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const points = [...root.querySelectorAll(".discovery-map-new circle")];
  let paused = false;
  let visible = true;
  let nextPoint = 0;

  const update = () => {
    root.classList.toggle("discovery-static", motion.matches);
    root.classList.toggle("discovery-paused", paused || !visible || document.hidden);
    toggle.hidden = motion.matches;
    toggle.setAttribute("aria-pressed", String(paused));
    toggle.textContent = paused ? "Resume animation" : "Pause animation";
  };
  const selectPoint = () => points.forEach((point, index) => point.classList.toggle("is-incoming", index === nextPoint));
  trace.addEventListener("animationiteration", event => {
    if (event.animationName !== "discovery-record" || motion.matches || paused || !visible || document.hidden || !points.length) return;
    points[nextPoint].classList.add("is-recorded");
    nextPoint = (nextPoint + 1) % points.length;
    if (nextPoint === 0) points.forEach(point => point.classList.remove("is-recorded"));
    selectPoint();
  });
  toggle.addEventListener("click", () => { paused = !paused; update(); });
  document.addEventListener("visibilitychange", update);
  motion.addEventListener("change", update);
  if ("IntersectionObserver" in window) new window.IntersectionObserver(entries => {
    visible = entries[0].isIntersecting;
    update();
  }).observe(root);
  selectPoint();
  root.classList.add("discovery-motion-ready");
  update();
})();
