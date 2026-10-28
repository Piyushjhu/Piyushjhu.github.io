/* Schematic sphere impact and ejecta, followed by an illustrative response and material map. */
(() => {
  "use strict";
  const root = document.getElementById("hero-discovery");
  if (!root) return;
  const find = id => root.querySelector(`#${id}`);
  const sphere = find("impact-sphere"), crater = find("sphere-crater"), rim = find("sphere-crater-lip");
  const wave = find("sphere-stress-wave"), innerWave = find("sphere-stress-inner"), guide = find("sphere-flight-guide");
  const ejecta = find("sphere-ejecta"), trace = find("discovery-trace"), toggle = find("discovery-motion-toggle");
  if ([sphere, crater, rim, wave, innerWave, guide, ejecta, trace, toggle].some(node => !node)) return;
  const points = [...root.querySelectorAll(".discovery-map-new circle")];
  const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const clamp = value => Math.max(0, Math.min(1, value));
  const smooth = (start, end, value) => { const p = clamp((value - start) / (end - start)); return p * p * (3 - 2 * p); };
  const seed = index => { const n = Math.sin(index * 127.1 + 311.7) * 43758.5453; return n - Math.floor(n); };
  const svgNS = "http://www.w3.org/2000/svg";
  const fragments = Array.from({length: 36}, (_, index) => {
    const side = index % 2 ? 1 : -1;
    const size = index % 6 === 0 ? 2.1 + seed(index + 4) * .8 : .7 + seed(index + 4) * 1.2;
    const group = document.createElementNS(svgNS, "g");
    const fragment = document.createElementNS(svgNS, index % 6 === 0 ? "path" : "ellipse");
    if (index % 6 === 0) fragment.setAttribute("d", `M${-size} ${-size * .5}L${size * .8} ${-size}L${size} ${size * .65}L${-size * .4} ${size}Z`);
    else { fragment.setAttribute("rx", String(size)); fragment.setAttribute("ry", String(size * .65)); }
    fragment.setAttribute("fill", index % 6 === 0 ? "#9c81b0" : "#b6a0c4");
    group.setAttribute("opacity", "0"); group.append(fragment);
    const trail = document.createElementNS(svgNS, "path");
    trail.setAttribute("fill", "none"); trail.setAttribute("stroke", "#b9a3c6");
    trail.setAttribute("stroke-width", ".7"); trail.setAttribute("opacity", "0");
    ejecta.append(trail, group);
    return {group, trail, visible: false, x: 150 + side * (7 + seed(index + 12) * 10), y: 107 + seed(index + 9) * 1.4,
      vx: side * (30 + seed(index + 17) * 56), vy: -(100 + seed(index + 23) * 58),
      delay: seed(index + 30) * .32, spin: (seed(index + 45) - .5) * 240};
  });
  let time = 0, cycle = 0, frame = 0, last = null;
  let paused = false, visible = true;
  function draw(t, staticView = false) {
    sphere.setAttribute("transform", `translate(0 ${69 * clamp((t - .45) / 1.8) + 40 * clamp((t - 2.25) / .65)})`);
    const formation = smooth(2.25, 2.7, t) * (1 - smooth(9.2, 10, t));
    crater.setAttribute("transform", `translate(150 108) scale(${formation})`);
    rim.setAttribute("opacity", String(formation));
    guide.setAttribute("opacity", String(.8 * (1 - smooth(1.35, 2, t))));
    const age = t - 2.3;
    const waveOpacity = age >= 0 && age < 1.8 ? .46 * (1 - age / 1.8) : 0;
    wave.setAttribute("r", String(8 + Math.max(0, age) * 52)); wave.setAttribute("opacity", String(waveOpacity));
    innerWave.setAttribute("r", String(5 + Math.max(0, age) * 43)); innerWave.setAttribute("opacity", String(waveOpacity * .65));
    for (const part of fragments) {
      const a = t - 2.3 - part.delay;
      const x = part.x + part.vx * a, y = part.y + part.vy * a + 105 * a * a;
      const alive = a >= 0 && a < 1.65 && y <= 108 && x > 8 && x < 292;
      if (!alive) {
        if (part.visible) { part.group.setAttribute("opacity", "0"); part.trail.setAttribute("opacity", "0"); part.visible = false; }
        continue;
      }
      part.visible = true;
      const alpha = clamp((1.65 - a) / .35);
      part.group.setAttribute("opacity", String(alpha));
      part.group.setAttribute("transform", `translate(${x} ${y}) rotate(${part.spin * a})`);
      const dx = part.vx * .035, dy = (part.vy + 210 * a) * .035;
      part.trail.setAttribute("d", `M${x - dx} ${y - dy}L${x} ${y}`); part.trail.setAttribute("opacity", String(alpha * .32));
    }
    trace.style.strokeDashoffset = String(staticView ? 0 : 1 - clamp((t - 3.15) / 2.8));
    points.forEach((point, index) => {
      point.style.opacity = staticView ? "1" : index === cycle ? String(smooth(6.7, 7.5, t)) : index < cycle ? ".7" : "0";
    });
  }
  const running = () => !paused && visible && !document.hidden && !motion.matches;
  function tick(now) {
    frame = 0;
    if (!running()) { last = null; return; }
    if (last !== null && now - last < 1000 / 30) { frame = window.requestAnimationFrame(tick); return; }
    if (last !== null) {
      time += Math.min((now - last) / 1000, .1);
      if (time >= 10) { time %= 10; cycle = points.length ? (cycle + 1) % points.length : 0; }
    }
    last = now; draw(time); frame = window.requestAnimationFrame(tick);
  }
  function update() {
    root.classList.toggle("discovery-static", motion.matches);
    root.classList.toggle("discovery-paused", paused || !visible || document.hidden);
    toggle.hidden = motion.matches;
    toggle.setAttribute("aria-pressed", String(paused));
    toggle.textContent = paused ? "Resume animation" : "Pause animation";
    if (!running()) { if (frame) window.cancelAnimationFrame(frame); frame = 0; last = null; }
    draw(motion.matches ? 2.5 : time, motion.matches);
    if (running() && !frame) { last = null; frame = window.requestAnimationFrame(tick); }
  }
  toggle.addEventListener("click", () => { paused = !paused; update(); });
  document.addEventListener("visibilitychange", update);
  motion.addEventListener("change", update);
  if ("IntersectionObserver" in window) new window.IntersectionObserver(entries => { visible = entries[0].isIntersecting; update(); }).observe(root);
  update(); root.classList.add("discovery-motion-ready");
})();
