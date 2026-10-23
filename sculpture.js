/* An original, gently moving torus-knot sculpture. No libraries or downloads. */
(() => {
  "use strict";
  const canvas = document.getElementById("sculpture");
  if (!canvas) return;
  const gl = canvas.getContext("webgl", { alpha: true, antialias: true, powerPreference: "low-power" });
  const fallback = () => {
    canvas.style.background = 'url("./assets/sculpture.svg") center / auto 95% no-repeat';
    canvas.style.opacity = "1";
  };
  if (!gl) { fallback(); return; }

  const vertexSource = `
    attribute vec3 aPosition;
    attribute vec3 aNormal;
    uniform mat3 uRotation;
    uniform float uAspect;
    uniform float uWidth;
    varying vec3 vNormal;
    varying vec3 vPosition;
    void main() {
      vec3 p = uRotation * aPosition;
      vPosition = p;
      vNormal = uRotation * aNormal;
      gl_Position = vec4(p.x / uWidth, (p.y * .78 + .02) * uAspect / uWidth, -p.z / 12.0, 1.0);
    }`;
  const fragmentSource = `
    precision mediump float;
    varying vec3 vNormal;
    varying vec3 vPosition;
    void main() {
      vec3 n = normalize(vNormal);
      vec3 view = vec3(0.0, 0.0, 1.0);
      vec3 key = normalize(vec3(-.6, .9, 1.2));
      vec3 fill = normalize(vec3(.8, .1, .7));
      float gradient = smoothstep(-2.7, 2.7, vPosition.x + vPosition.y * .2);
      vec3 peach = vec3(.88, .59, .40);
      vec3 lilac = vec3(.62, .57, .79);
      vec3 base = mix(peach, lilac, gradient);
      float diffuse = max(dot(n, key), 0.0);
      float softFill = max(dot(n, fill), 0.0);
      vec3 reflection = reflect(-view, n);
      float softbox = pow(max(dot(reflection, normalize(vec3(-.5, 1.0, 1.4))), 0.0), 11.0);
      float strip = pow(max(dot(reflection, normalize(vec3(.4, 1.0, .4))), 0.0), 38.0);
      float darkBand = .82 + .18 * sin(reflection.y * 5.0 + reflection.x * 1.5);
      float fresnel = pow(1.0 - max(dot(n, view), 0.0), 3.0);
      vec3 color = base * (.38 + diffuse * .54 + softFill * .18) * darkBand;
      color += vec3(1.0, .96, .94) * softbox * .56;
      color += vec3(.94, .89, 1.0) * strip * .32;
      color += vec3(.18, .16, .22) * fresnel;
      color = pow(color, vec3(.85));
      gl_FragColor = vec4(color, 1.0);
    }`;
  const compile = (type, source) => {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) { gl.deleteShader(shader); return null; }
    return shader;
  };
  const vertexShader = compile(gl.VERTEX_SHADER, vertexSource);
  const fragmentShader = compile(gl.FRAGMENT_SHADER, fragmentSource);
  if (!vertexShader || !fragmentShader) { fallback(); return; }
  const program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) { fallback(); return; }
  gl.useProgram(program);

  const normalize = vector => { const length = Math.hypot(...vector); return vector.map(value => value / length); };
  const cross = (a, b) => [a[1]*b[2]-a[2]*b[1], a[2]*b[0]-a[0]*b[2], a[0]*b[1]-a[1]*b[0]];
  const curve = t => [(2 + Math.cos(3*t)) * Math.cos(2*t), (2 + Math.cos(3*t)) * Math.sin(2*t), Math.sin(3*t)];
  const positions = [], normals = [], indices = [];
  const segments = 360, sides = 32, radius = .43;
  for (let i = 0; i <= segments; i++) {
    const t = i / segments * Math.PI * 2;
    const center = curve(t);
    const next = curve(t + .001);
    const tangent = normalize(next.map((value, index) => value - center[index]));
    const normal = normalize(cross(tangent, [0, 0, 1]));
    const binormal = normalize(cross(tangent, normal));
    for (let j = 0; j <= sides; j++) {
      const angle = j / sides * Math.PI * 2;
      const direction = normal.map((value, index) => value * Math.cos(angle) + binormal[index] * Math.sin(angle));
      positions.push(...center.map((value, index) => value + radius * direction[index]));
      normals.push(...direction);
      if (i < segments && j < sides) {
        const a = i * (sides + 1) + j;
        const b = a + sides + 1;
        indices.push(a, b, a + 1, b, b + 1, a + 1);
      }
    }
  }
  const bufferAttribute = (name, values) => {
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(values), gl.STATIC_DRAW);
    const location = gl.getAttribLocation(program, name);
    gl.enableVertexAttribArray(location);
    gl.vertexAttribPointer(location, 3, gl.FLOAT, false, 0, 0);
  };
  bufferAttribute("aPosition", positions);
  bufferAttribute("aNormal", normals);
  const indexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
  const rotationLocation = gl.getUniformLocation(program, "uRotation");
  const aspectLocation = gl.getUniformLocation(program, "uAspect");
  const widthLocation = gl.getUniformLocation(program, "uWidth");
  gl.enable(gl.DEPTH_TEST);
  gl.clearColor(0, 0, 0, 0);

  const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  let visible = true, frame = 0, lastTime = 0, phase = 0;
  let pointerX = 0, pointerY = 0;
  let currentX = 0, currentY = 0;
  const multiply = (a, b) => {
    const result = [];
    for (let col = 0; col < 3; col++) for (let row = 0; row < 3; row++) result[col*3+row] = a[row]*b[col*3] + a[3+row]*b[col*3+1] + a[6+row]*b[col*3+2];
    return result;
  };
  const render = time => {
    frame = 0;
    if (!visible || document.hidden || gl.isContextLost()) return;
    if (time - lastTime < 1000/30 && !motionQuery.matches) { frame = requestAnimationFrame(render); return; }
    const delta = lastTime ? Math.min(time - lastTime, 100) : 0;
    lastTime = time;
    if (!motionQuery.matches) phase += delta * .00009;
    currentX += (pointerX-currentX)*.06;
    currentY += (pointerY-currentY)*.06;
    const x = 1.07 + Math.sin(phase)*.085 + currentY*.07;
    const y = -.22 + Math.sin(phase*.7)*.1 + currentX*.13;
    const z = -.12 + Math.sin(phase*.5)*.04;
    const rx = [1,0,0,0,Math.cos(x),Math.sin(x),0,-Math.sin(x),Math.cos(x)];
    const ry = [Math.cos(y),0,-Math.sin(y),0,1,0,Math.sin(y),0,Math.cos(y)];
    const rz = [Math.cos(z),Math.sin(z),0,-Math.sin(z),Math.cos(z),0,0,0,1];
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.uniformMatrix3fv(rotationLocation, false, new Float32Array(multiply(rz, multiply(ry, rx))));
    gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);
    if (!motionQuery.matches) frame = requestAnimationFrame(render);
  };
  const start = () => { if (!frame && visible && !document.hidden) { lastTime = 0; frame = requestAnimationFrame(render); } };
  const resize = () => {
    const rect = canvas.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.75);
    canvas.width = Math.round(rect.width * pixelRatio);
    canvas.height = Math.round(rect.height * pixelRatio);
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.uniform1f(aspectLocation, rect.width / rect.height);
    gl.uniform1f(widthLocation, Math.max(4.4, rect.width / rect.height * 2.05));
    start();
  };
  if ("ResizeObserver" in window) new ResizeObserver(resize).observe(canvas);
  else window.addEventListener("resize", resize);
  if ("IntersectionObserver" in window) new IntersectionObserver(entries => {
    visible = entries[0].isIntersecting;
    if (visible) start();
    else { cancelAnimationFrame(frame); frame = 0; }
  }).observe(canvas);
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) { cancelAnimationFrame(frame); frame = 0; }
    else start();
  });
  motionQuery.addEventListener("change", () => { cancelAnimationFrame(frame); frame = 0; start(); });
  if (window.matchMedia("(pointer: fine)").matches) {
    document.querySelector(".hero").addEventListener("pointermove", event => {
      if (motionQuery.matches) return;
      const rect = canvas.getBoundingClientRect();
      pointerX = Math.max(-1, Math.min(1, (event.clientX-rect.left)/rect.width*2-1));
      pointerY = Math.max(-1, Math.min(1, (event.clientY-rect.top)/rect.height*2-1));
    });
    document.querySelector(".hero").addEventListener("pointerleave", () => { pointerX = 0; pointerY = 0; });
  }
  canvas.addEventListener("webglcontextlost", event => { event.preventDefault(); cancelAnimationFrame(frame); frame = 0; fallback(); });
  resize();
})();
