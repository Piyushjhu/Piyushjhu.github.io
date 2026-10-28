"use strict";
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

function element() {
  const classes = new Set();
  return {
    listeners: {}, attrs: {}, hidden: true, textContent: "",
    classList: {add: name => classes.add(name), remove: name => classes.delete(name), contains: name => classes.has(name), toggle(name, active) { if (active) classes.add(name); else classes.delete(name); }},
    setAttribute(name, value) { this.attrs[name] = String(value); },
    addEventListener(name, callback) { this.listeners[name] = callback; }
  };
}
const root = element(), toggle = element(), trace = element();
const points = Array.from({length: 6}, element);
root.querySelectorAll = () => points;
const document = {hidden: false, listeners: {}, getElementById: id => ({"hero-discovery":root, "discovery-motion-toggle":toggle, "discovery-trace":trace})[id], addEventListener(name, callback) { this.listeners[name] = callback; }};
const motion = {matches:false, addEventListener(name, callback) { this.change = callback; }};
let intersection;
const window = {matchMedia: () => motion, IntersectionObserver: class {constructor(callback) { intersection = callback; } observe() {}}};
vm.runInNewContext(fs.readFileSync(path.join(__dirname, "../hero-discovery.js"), "utf8"), {document, window});
const cycle = () => trace.listeners.animationiteration({animationName: "discovery-record"});
const recorded = () => points.filter(point => point.classList.contains("is-recorded")).length;

assert.equal(toggle.hidden, false);
cycle();
assert.equal(recorded(), 1);
assert.ok(points[1].classList.contains("is-incoming"));
toggle.listeners.click();
assert.equal(toggle.attrs["aria-pressed"], "true");
assert.equal(toggle.textContent, "Resume animation");
assert.ok(root.classList.contains("discovery-paused"));
cycle();
assert.equal(recorded(), 1);
intersection([{isIntersecting:false}]);
intersection([{isIntersecting:true}]);
assert.ok(root.classList.contains("discovery-paused")); // Returning to view respects the visitor's pause.
toggle.listeners.click();
assert.ok(!root.classList.contains("discovery-paused"));
document.hidden = true;
document.listeners.visibilitychange();
assert.ok(root.classList.contains("discovery-paused"));
cycle();
assert.equal(recorded(), 1);
document.hidden = false;
document.listeners.visibilitychange();
motion.matches = true;
motion.change();
assert.ok(root.classList.contains("discovery-static"));
assert.equal(toggle.hidden, true);
cycle();
assert.equal(recorded(), 1);
motion.matches = false;
motion.change();
for (let index=0; index<5; index++) cycle();
assert.equal(recorded(), 0);
assert.ok(points[0].classList.contains("is-incoming"));
console.log("Hero checks passed: repeated experiments, pause/resume, offscreen and inactive suspension, reduced motion, and clean looping.");
