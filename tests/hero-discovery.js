"use strict";
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
function element(tag = "div") {
  const classes = new Set();
  return {tag, listeners:{}, attrs:{}, children:[], style:{}, hidden:true, textContent:"",
    classList:{add:name=>classes.add(name), contains:name=>classes.has(name), toggle(name,active){if(active)classes.add(name);else classes.delete(name);}},
    setAttribute(name,value){this.attrs[name]=String(value);}, getAttribute(name){return this.attrs[name];},
    append(...nodes){this.children.push(...nodes);}, addEventListener(name,callback){this.listeners[name]=callback;}};
}
const ids = Object.fromEntries(["hero-discovery","discovery-motion-toggle","discovery-trace","impact-sphere","sphere-crater","sphere-crater-lip","sphere-stress-wave","sphere-stress-inner","sphere-flight-guide","sphere-ejecta"].map(id=>[id,element()]));
const root=ids["hero-discovery"], toggle=ids["discovery-motion-toggle"], trace=ids["discovery-trace"];
const points=Array.from({length:6},()=>element("circle"));
root.querySelector=selector=>ids[selector.slice(1)]; root.querySelectorAll=()=>points;
const document={hidden:false,listeners:{},getElementById:id=>ids[id],createElementNS:(_,tag)=>element(tag),addEventListener(name,callback){this.listeners[name]=callback;}};
const motion={matches:false,addEventListener(_,callback){this.change=callback;}};
const frames=new Map(); let clock=0, serial=0, intersection;
const window={matchMedia:()=>motion,requestAnimationFrame(callback){frames.set(++serial,callback);return serial;},cancelAnimationFrame(id){frames.delete(id);},IntersectionObserver:class{constructor(callback){intersection=callback;}observe(){}}};
function advance(milliseconds){let left=milliseconds;while(left>0){const delta=Math.min(34,left);clock+=delta;left-=delta;const current=[...frames.values()];frames.clear();for(const callback of current)callback(clock);}}
const source=fs.readFileSync(path.join(__dirname,"../hero-discovery.js"),"utf8");
vm.runInNewContext(source,{document,window});
const flying=()=>ids["sphere-ejecta"].children.filter(node=>node.tag==="g"&&Number(node.attrs.opacity)>0).length;
assert.equal(toggle.hidden,false);
advance(2000);assert.equal(flying(),0);assert.ok(ids["sphere-crater"].attrs.transform.includes("scale(0)"));
advance(800);assert.ok(flying()>12);assert.ok(ids["sphere-crater"].attrs.transform.includes("scale(1)"));
toggle.listeners.click();const stopped=ids["impact-sphere"].attrs.transform;
assert.equal(toggle.attrs["aria-pressed"],"true");assert.equal(toggle.textContent,"Resume animation");assert.equal(frames.size,0);
advance(1000);assert.equal(ids["impact-sphere"].attrs.transform,stopped);
intersection([{isIntersecting:false}]);intersection([{isIntersecting:true}]);assert.equal(frames.size,0);
toggle.listeners.click();assert.equal(frames.size,1);
document.hidden=true;document.listeners.visibilitychange();assert.equal(frames.size,0);
advance(2000);assert.equal(ids["impact-sphere"].attrs.transform,stopped);
document.hidden=false;document.listeners.visibilitychange();assert.equal(frames.size,1);
motion.matches=true;motion.change();assert.equal(frames.size,0);assert.equal(toggle.hidden,true);
assert.ok(root.classList.contains("discovery-static"));assert.equal(trace.style.strokeDashoffset,"0");assert.ok(points.every(point=>point.style.opacity==="1"));assert.ok(flying()>0);
motion.matches=false;motion.change();advance(7000);assert.equal(points[0].style.opacity,"1");
advance(1000);assert.equal(points[0].style.opacity,".7");
intersection([{isIntersecting:false}]);assert.equal(frames.size,0);intersection([{isIntersecting:true}]);assert.equal(frames.size,1);
vm.runInNewContext(source,{document:{getElementById:()=>null}});
console.log("Hero checks passed: sphere contact, ejecta timing, map accumulation, pause/resume, offscreen and inactive suspension, reduced motion, and absent-hero fallback.");
