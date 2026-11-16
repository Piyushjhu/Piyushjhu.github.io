// Exercise real magnification, panning and cleanup without loading image files.
"use strict";
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const source = fs.readFileSync(path.join(__dirname, "../research-figures.js"), "utf8");
let document;

function element(tag, className = "") {
  const classes = new Set();
  const attributes = {};
  const captures = new Set();
  const item = {
    tagName: tag.toUpperCase(), className, ownerDocument: document, parentNode: null,
    children: [], style: {}, listeners: {}, hidden: false, disabled: false, textContent: "",
    clientWidth: 320, clientHeight: 400, scrollLeft: 0, scrollTop: 0,
    classList: {
      add: name => classes.add(name), remove: name => classes.delete(name),
      toggle(name, active) { if (active) classes.add(name); else classes.delete(name); },
      contains: name => classes.has(name)
    },
    get nextSibling() { return this.parentNode?.children[this.parentNode.children.indexOf(this) + 1] || null; },
    setAttribute(name, value) { attributes[name] = String(value); },
    getAttribute(name) { return attributes[name] ?? null; },
    removeAttribute(name) { delete attributes[name]; if (name === "style") this.style = {}; },
    append(...nodes) { for (const node of nodes) { node.remove(); this.children.push(node); node.parentNode = this; } },
    insertBefore(node, sibling) { node.remove(); const index = this.children.indexOf(sibling); assert.ok(index >= 0); this.children.splice(index, 0, node); node.parentNode = this; },
    remove() { if (this.parentNode) this.parentNode.children.splice(this.parentNode.children.indexOf(this), 1); this.parentNode = null; },
    addEventListener(type, callback) { (this.listeners[type] ||= new Set()).add(callback); },
    removeEventListener(type, callback) { this.listeners[type]?.delete(callback); },
    dispatch(type, details = {}) { const event = {preventDefault() { this.prevented = true; }, ...details}; for (const callback of [...(this.listeners[type] || [])]) callback(event); return event; },
    click() { if (!this.disabled) this.dispatch("click"); },
    focus() { this.focused = true; },
    setPointerCapture(id) { captures.add(id); },
    hasPointerCapture(id) { return captures.has(id); },
    releasePointerCapture(id) { captures.delete(id); },
    querySelector(selector) { return this.children.find(child => child.tagName.toLowerCase() === selector) || this.children.map(child => child.querySelector(selector)).find(Boolean) || null; },
    closest(selector) { return this.tagName.toLowerCase() === selector ? this : this.parentNode?.closest(selector) || null; },
    getBoundingClientRect() {
      const width = parseFloat(this.style.width) || this.clientWidth;
      const height = parseFloat(this.style.height) || this.clientHeight;
      const canvas = this.parentNode;
      const viewport = canvas?.parentNode;
      const isImage = this.tagName === "IMG";
      return {
        width, height,
        left: isImage ? (parseFloat(canvas.style.width) - width) / 2 - viewport.scrollLeft : 0,
        top: isImage ? (parseFloat(canvas.style.height) - height) / 2 - viewport.scrollTop : 0
      };
    }
  };
  return item;
}

document = {createElement: tag => element(tag)};
const frames = new Map();
let frameId = 0;
let observer;
const window = {};
vm.runInNewContext(source, {
  window,
  ResizeObserver: class { constructor(callback) { this.callback = callback; observer = this; } observe() {} disconnect() { this.disconnected = true; } },
  requestAnimationFrame(callback) { frames.set(++frameId, callback); return frameId; },
  cancelAnimationFrame(id) { frames.delete(id); }
});
const dialog = element("dialog");
const figure = element("figure");
const caption = element("figcaption");
const image = element("img");
const links = element("div");
image.complete = true;
image.naturalWidth = 1200;
image.naturalHeight = 600;
dialog.append(figure);
figure.append(caption, image, links);
assert.equal(window.ResearchFigureViewer.setup(null), null);
window.ResearchFigureViewer.setup(figure);
const toolbar = figure.children.find(child => child.className === "research-figure-tools");
const viewport = figure.children.find(child => child.className === "research-figure-viewport");
const [out, inside, fit, status] = toolbar.children;
assert.equal(image.style.width, "320px");
assert.equal(image.style.height, "160px");
assert.equal(viewport.getAttribute("aria-busy"), "false");
assert.equal(out.disabled, true);
assert.equal(fit.disabled, true);
inside.click();
assert.equal(image.style.width, "640px");
assert.equal(status.textContent, "200%");
assert.equal(viewport.scrollLeft, 160);
assert.equal(viewport.classList.contains("is-zoomed"), true);
viewport.dispatch("keydown", {key: "+"});
assert.equal(image.style.width, "960px");
assert.equal(status.textContent, "300%");
const priorLeft = viewport.scrollLeft;
viewport.dispatch("keydown", {key: "ArrowRight"});
assert.equal(viewport.scrollLeft, priorLeft + 80);
viewport.dispatch("pointerdown", {pointerId: 7, button: 0, clientX: 220, clientY: 200});
viewport.dispatch("pointermove", {pointerId: 7, clientX: 120, clientY: 150, cancelable: true});
assert.equal(viewport.scrollLeft, priorLeft + 180);
assert.equal(viewport.classList.contains("is-dragging"), true);
viewport.dispatch("pointerup", {pointerId: 7});
assert.equal(viewport.classList.contains("is-dragging"), false);
inside.click();
assert.equal(status.textContent, "400%");
assert.equal(inside.disabled, true);
viewport.dispatch("keydown", {key: "+"});
assert.equal(image.style.width, "1280px");
viewport.dispatch("keydown", {key: "0"});
assert.equal(status.textContent, "100%");
assert.equal(viewport.scrollLeft, 0);
assert.equal(viewport.scrollTop, 0);
assert.equal(viewport.classList.contains("is-zoomed"), false);
viewport.dispatch("dblclick", {button: 0, clientX: 80, clientY: 200});
assert.equal(status.textContent, "200%");
viewport.clientWidth = 390;
observer.callback();
for (const callback of frames.values()) callback();
frames.clear();
assert.equal(image.style.width, "780px");
dialog.dispatch("close");
assert.equal(observer.disconnected, true);
assert.deepEqual(figure.children, [caption, image, links]);
assert.equal(image.getAttribute("draggable"), null);
assert.equal(image.style.width, "");
assert.equal(image.style.height, "");
assert.equal(dialog.listeners.close.size, 0);
window.ResearchFigureViewer.setup(figure);
window.ResearchFigureViewer.setup(figure);
assert.equal(figure.children.filter(child => child.className === "research-figure-tools").length, 1);
window.ResearchFigureViewer.destroy();
assert.deepEqual(figure.children, [caption, image, links]);
image.complete = false;
image.naturalWidth = 0;
window.ResearchFigureViewer.setup(figure);
const failedViewport = figure.children.find(child => child.className === "research-figure-viewport");
image.dispatch("error");
assert.equal(failedViewport.getAttribute("aria-busy"), "false");
assert.match(failedViewport.children[1].textContent, /could not be loaded/);
window.ResearchFigureViewer.destroy();
console.log("Figure viewer checks passed: 2×–4× magnification, center preservation, keyboard controls, drag pan, fit, resize, failure message and repeatable cleanup.");
