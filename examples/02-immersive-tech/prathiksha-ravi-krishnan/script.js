// Immersive Tech uses progressive enhancement: all content works without JavaScript.
document.documentElement.classList.remove("no-js");
document.documentElement.classList.add("js");

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
const smallScreen = window.matchMedia("(max-width: 48rem)");

const menuButton = document.querySelector(".menu-button");
const navigationLinks = document.querySelector(".navigation__links");

if (menuButton && navigationLinks) {
  const closeMenu = () => {
    menuButton.setAttribute("aria-expanded", "false");
    navigationLinks.classList.remove("is-open");
  };

  menuButton.addEventListener("click", () => {
    const willOpen = menuButton.getAttribute("aria-expanded") !== "true";
    menuButton.setAttribute("aria-expanded", String(willOpen));
    navigationLinks.classList.toggle("is-open", willOpen);
  });

  navigationLinks.addEventListener("click", (event) => {
    if (event.target.closest("a")) closeMenu();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menuButton.getAttribute("aria-expanded") === "true") {
      closeMenu();
      menuButton.focus();
    }
  });

  smallScreen.addEventListener("change", closeMenu);
}

const revealElements = document.querySelectorAll(".reveal");

if (reducedMotion.matches || !("IntersectionObserver" in window)) {
  revealElements.forEach((element) => element.classList.add("is-visible"));
} else {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { rootMargin: "0px 0px -8%", threshold: 0.12 });

  revealElements.forEach((element) => revealObserver.observe(element));
}

const animatedSections = document.querySelectorAll(".section");

if (reducedMotion.matches || !("IntersectionObserver" in window)) {
  animatedSections.forEach((section) => section.classList.add("is-current"));
} else {
  const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      entry.target.classList.toggle("is-current", entry.isIntersecting);
    });
  }, { rootMargin: "20% 0px", threshold: 0.01 });

  animatedSections.forEach((section) => animationObserver.observe(section));
}

const sectionLinks = [...document.querySelectorAll('.navigation__links a[href^="#"]')];
const linkedSections = sectionLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

if ("IntersectionObserver" in window && linkedSections.length) {
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      sectionLinks.forEach((link) => {
        const active = link.getAttribute("href") === `#${entry.target.id}`;
        if (active) link.setAttribute("aria-current", "true");
        else link.removeAttribute("aria-current");
      });
    });
  }, { rootMargin: "-35% 0px -55%", threshold: 0 });

  linkedSections.forEach((section) => sectionObserver.observe(section));
}

const timeline = document.querySelector(".timeline");
let scrollFrame = 0;

const updateTimeline = () => {
  scrollFrame = 0;
  if (!timeline || reducedMotion.matches) return;
  const bounds = timeline.getBoundingClientRect();
  const viewportPoint = window.innerHeight * 0.7;
  const progress = Math.min(1, Math.max(0, (viewportPoint - bounds.top) / bounds.height));
  timeline.style.setProperty("--timeline-progress", `${progress * 100}%`);
};

window.addEventListener("scroll", () => {
  if (!scrollFrame) scrollFrame = requestAnimationFrame(updateTimeline);
}, { passive: true });
updateTimeline();

const heroVisual = document.querySelector("[data-parallax]");

if (heroVisual && finePointer.matches && !reducedMotion.matches) {
  window.addEventListener("pointermove", (event) => {
    const x = event.clientX / window.innerWidth;
    const y = event.clientY / window.innerHeight;
    document.documentElement.style.setProperty("--pointer-x", `${x * 100}%`);
    document.documentElement.style.setProperty("--pointer-y", `${y * 100}%`);
    heroVisual.style.transform = `translate3d(${(x - 0.5) * 16}px, ${(y - 0.5) * 12}px, 0)`;
  }, { passive: true });
}

document.querySelectorAll("[data-tilt]").forEach((card) => {
  if (!finePointer.matches || reducedMotion.matches) return;

  card.addEventListener("pointermove", (event) => {
    const bounds = card.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width;
    const y = (event.clientY - bounds.top) / bounds.height;
    const rotateX = (0.5 - y) * 4;
    const rotateY = (x - 0.5) * 5;
    card.style.setProperty("--glow-x", `${x * 100}%`);
    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  card.addEventListener("pointerleave", () => {
    card.style.transform = "";
  });
});

const metricValues = document.querySelectorAll("[data-count]");

if (!reducedMotion.matches && "IntersectionObserver" in window) {
  const countObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const element = entry.target;
      const target = Number(element.dataset.count);
      const suffix = element.dataset.suffix || "";
      const start = performance.now();

      const updateCount = (now) => {
        const progress = Math.min(1, (now - start) / 900);
        const eased = 1 - Math.pow(1 - progress, 3);
        element.textContent = `${Math.round(target * eased)}${suffix}`;
        if (progress < 1) requestAnimationFrame(updateCount);
      };

      requestAnimationFrame(updateCount);
      observer.unobserve(element);
    });
  }, { threshold: 0.7 });

  metricValues.forEach((metric) => countObserver.observe(metric));
}

const orbitCanvas = document.querySelector("#orbit-scene");

if (orbitCanvas) {
  const orbitContainer = orbitCanvas.closest(".hero-visual");
  const gl = orbitCanvas.getContext("webgl", {
    alpha: true,
    antialias: true,
    powerPreference: smallScreenSubmit() ? "low-power" : "high-performance"
  });

  function smallScreenSubmit() {
    return window.innerWidth < 768;
  }

  if (!gl) {
    orbitContainer.classList.add("webgl-unavailable");
  } else {
    const vertexShaderSource = `
      attribute vec3 aPosition;
      attribute vec3 aNormal;
      uniform mat4 uMvp;
      uniform mat4 uModel;
      varying vec3 vNormal;
      varying vec3 vPosition;
      void main() {
        vec4 worldPosition = uModel * vec4(aPosition, 1.0);
        vPosition = worldPosition.xyz;
        vNormal = normalize(mat3(uModel) * aNormal);
        gl_Position = uMvp * vec4(aPosition, 1.0);
      }
    `;

    const fragmentShaderSource = `
      precision mediump float;
      varying vec3 vNormal;
      varying vec3 vPosition;
      uniform vec3 uCamera;
      uniform vec3 uShadowColor;
      uniform vec3 uLightColor;
      uniform float uOpacity;
      void main() {
        vec3 normal = normalize(vNormal);
        vec3 lightDirection = normalize(vec3(-0.55, 0.75, 0.9));
        vec3 viewDirection = normalize(uCamera - vPosition);
        float diffuse = max(dot(normal, lightDirection), 0.0);
        float rim = pow(1.0 - max(dot(normal, viewDirection), 0.0), 2.4);
        vec3 halfVector = normalize(lightDirection + viewDirection);
        float specular = pow(max(dot(normal, halfVector), 0.0), 42.0);
        vec3 color = mix(uShadowColor, uLightColor, 0.08 + diffuse * 0.62);
        color += vec3(0.26, 0.96, 0.88) * rim * 0.58;
        color += vec3(0.72, 1.0, 0.96) * specular * 0.7;
        gl_FragColor = vec4(color, uOpacity);
      }
    `;

    const orbitVertexSource = `
      attribute vec3 aPosition;
      uniform mat4 uViewProjection;
      uniform float uPointSize;
      void main() {
        vec4 clipPosition = uViewProjection * vec4(aPosition, 1.0);
        gl_Position = clipPosition;
        gl_PointSize = uPointSize * (8.0 / max(1.0, clipPosition.w));
      }
    `;

    const orbitFragmentSource = `
      precision mediump float;
      uniform vec4 uColor;
      uniform float uIsPoint;
      void main() {
        if (uIsPoint > 0.5) {
          float distanceFromCenter = distance(gl_PointCoord, vec2(0.5));
          if (distanceFromCenter > 0.5) discard;
          float glow = 1.0 - smoothstep(0.12, 0.5, distanceFromCenter);
          gl_FragColor = vec4(uColor.rgb, uColor.a * glow);
        } else {
          gl_FragColor = uColor;
        }
      }
    `;

    const compileShader = (type, source) => {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const createProgram = (vertexSource, fragmentSource) => {
      const vertexShader = compileShader(gl.VERTEX_SHADER, vertexSource);
      const fragmentShader = compileShader(gl.FRAGMENT_SHADER, fragmentSource);
      if (!vertexShader || !fragmentShader) return null;
      const program = gl.createProgram();
      gl.attachShader(program, vertexShader);
      gl.attachShader(program, fragmentShader);
      gl.linkProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
      return gl.getProgramParameter(program, gl.LINK_STATUS) ? program : null;
    };

    const sphereProgram = createProgram(vertexShaderSource, fragmentShaderSource);
    const orbitProgram = createProgram(orbitVertexSource, orbitFragmentSource);

    if (!sphereProgram || !orbitProgram) {
      orbitContainer.classList.add("webgl-unavailable");
    } else {
      const multiply = (a, b) => {
        const out = new Float32Array(16);
        for (let column = 0; column < 4; column += 1) {
          for (let row = 0; row < 4; row += 1) {
            out[column * 4 + row] =
              a[row] * b[column * 4] +
              a[4 + row] * b[column * 4 + 1] +
              a[8 + row] * b[column * 4 + 2] +
              a[12 + row] * b[column * 4 + 3];
          }
        }
        return out;
      };

      const perspective = (fieldOfView, aspect, near, far) => {
        const scale = 1 / Math.tan(fieldOfView / 2);
        const range = 1 / (near - far);
        return new Float32Array([
          scale / aspect, 0, 0, 0,
          0, scale, 0, 0,
          0, 0, (near + far) * range, -1,
          0, 0, near * far * range * 2, 0
        ]);
      };

      const normalize = (vector) => {
        const length = Math.hypot(...vector) || 1;
        return vector.map((value) => value / length);
      };

      const cross = (a, b) => [
        a[1] * b[2] - a[2] * b[1],
        a[2] * b[0] - a[0] * b[2],
        a[0] * b[1] - a[1] * b[0]
      ];

      const lookAt = (eye, target) => {
        const z = normalize([eye[0] - target[0], eye[1] - target[1], eye[2] - target[2]]);
        const x = normalize(cross([0, 1, 0], z));
        const y = cross(z, x);
        return new Float32Array([
          x[0], y[0], z[0], 0,
          x[1], y[1], z[1], 0,
          x[2], y[2], z[2], 0,
          -(x[0] * eye[0] + x[1] * eye[1] + x[2] * eye[2]),
          -(y[0] * eye[0] + y[1] * eye[1] + y[2] * eye[2]),
          -(z[0] * eye[0] + z[1] * eye[1] + z[2] * eye[2]), 1
        ]);
      };

      const rotationY = (angle) => {
        const cosine = Math.cos(angle);
        const sine = Math.sin(angle);
        return new Float32Array([
          cosine, 0, -sine, 0,
          0, 1, 0, 0,
          sine, 0, cosine, 0,
          0, 0, 0, 1
        ]);
      };

      const scaleMatrix = (scale) => new Float32Array([
        scale, 0, 0, 0,
        0, scale, 0, 0,
        0, 0, scale, 0,
        0, 0, 0, 1
      ]);

      const createCore = () => {
        const goldenRatio = (1 + Math.sqrt(5)) / 2;
        const sourceVertices = [
          [-1, goldenRatio, 0], [1, goldenRatio, 0], [-1, -goldenRatio, 0], [1, -goldenRatio, 0],
          [0, -1, goldenRatio], [0, 1, goldenRatio], [0, -1, -goldenRatio], [0, 1, -goldenRatio],
          [goldenRatio, 0, -1], [goldenRatio, 0, 1], [-goldenRatio, 0, -1], [-goldenRatio, 0, 1]
        ].map((vertex) => normalize(vertex));
        const faces = [
          [0, 11, 5], [0, 5, 1], [0, 1, 7], [0, 7, 10], [0, 10, 11],
          [1, 5, 9], [5, 11, 4], [11, 10, 2], [10, 7, 6], [7, 1, 8],
          [3, 9, 4], [3, 4, 2], [3, 2, 6], [3, 6, 8], [3, 8, 9],
          [4, 9, 5], [2, 4, 11], [6, 2, 10], [8, 6, 7], [9, 8, 1]
        ];
        const vertices = [];
        const indices = [];
        faces.forEach((face) => {
          const a = sourceVertices[face[0]];
          const b = sourceVertices[face[1]];
          const c = sourceVertices[face[2]];
          const normal = normalize(cross([b[0] - a[0], b[1] - a[1], b[2] - a[2]], [c[0] - a[0], c[1] - a[1], c[2] - a[2]]));
          [a, b, c].forEach((vertex) => {
            vertices.push(...vertex, ...normal);
            indices.push(indices.length);
          });
        });
        return { vertices: new Float32Array(vertices), indices: new Uint16Array(indices), sourceVertices, faces };
      };

      const rotatePoint = (point, tiltX, tiltZ) => {
        const cosX = Math.cos(tiltX);
        const sinX = Math.sin(tiltX);
        const cosZ = Math.cos(tiltZ);
        const sinZ = Math.sin(tiltZ);
        const y = point[1] * cosX - point[2] * sinX;
        const z = point[1] * sinX + point[2] * cosX;
        return [point[0] * cosZ - y * sinZ, point[0] * sinZ + y * cosZ, z];
      };

      const createTorus = (radius, tube, tiltX, tiltZ) => {
        const radialSegments = smallScreenSubmit() ? 44 : 64;
        const tubeSegments = smallScreenSubmit() ? 5 : 7;
        const vertices = [];
        const indices = [];
        for (let radial = 0; radial <= radialSegments; radial += 1) {
          const u = radial / radialSegments * Math.PI * 2;
          for (let side = 0; side <= tubeSegments; side += 1) {
            const v = side / tubeSegments * Math.PI * 2;
            const normal = rotatePoint([
              Math.cos(u) * Math.cos(v),
              Math.sin(v),
              Math.sin(u) * Math.cos(v)
            ], tiltX, tiltZ);
            const position = rotatePoint([
              (radius + tube * Math.cos(v)) * Math.cos(u),
              tube * Math.sin(v),
              (radius + tube * Math.cos(v)) * Math.sin(u)
            ], tiltX, tiltZ);
            vertices.push(...position, ...normal);
          }
        }
        for (let radial = 0; radial < radialSegments; radial += 1) {
          for (let side = 0; side < tubeSegments; side += 1) {
            const first = radial * (tubeSegments + 1) + side;
            const next = first + tubeSegments + 1;
            indices.push(first, next, first + 1, next, next + 1, first + 1);
          }
        }
        return { vertices: new Float32Array(vertices), indices: new Uint16Array(indices) };
      };

      const ringSettings = [
        { mesh: createTorus(1.72, 0.025, 0.52, -0.3), shadow: [0.02, 0.08, 0.1], light: [0.18, 0.74, 0.7] },
        { mesh: createTorus(2.34, 0.032, -0.86, 0.48), shadow: [0.08, 0.055, 0.025], light: [0.58, 0.39, 0.19] }
      ];

      const sphere = createCore();
      const sphereVertexBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, sphereVertexBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, sphere.vertices, gl.STATIC_DRAW);
      const sphereIndexBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, sphereIndexBuffer);
      gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, sphere.indices, gl.STATIC_DRAW);

      const ringBuffers = ringSettings.map((ring) => {
        const vertexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, ring.mesh.vertices, gl.STATIC_DRAW);
        const indexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, ring.mesh.indices, gl.STATIC_DRAW);
        return { vertexBuffer, indexBuffer };
      });

      const shellEdges = [];
      const seenEdges = new Set();
      sphere.faces.forEach((face) => {
        [[face[0], face[1]], [face[1], face[2]], [face[2], face[0]]].forEach(([start, end]) => {
          const key = [start, end].sort((a, b) => a - b).join("-");
          if (seenEdges.has(key)) return;
          seenEdges.add(key);
          shellEdges.push(...sphere.sourceVertices[start].map((value) => value * 1.38));
          shellEdges.push(...sphere.sourceVertices[end].map((value) => value * 1.38));
        });
      });
      const shellBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, shellBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(shellEdges), gl.STATIC_DRAW);
      const spherePosition = gl.getAttribLocation(sphereProgram, "aPosition");
      const sphereNormal = gl.getAttribLocation(sphereProgram, "aNormal");
      const sphereMvp = gl.getUniformLocation(sphereProgram, "uMvp");
      const sphereModel = gl.getUniformLocation(sphereProgram, "uModel");
      const sphereCamera = gl.getUniformLocation(sphereProgram, "uCamera");
      const sphereShadowColor = gl.getUniformLocation(sphereProgram, "uShadowColor");
      const sphereLightColor = gl.getUniformLocation(sphereProgram, "uLightColor");
      const sphereOpacity = gl.getUniformLocation(sphereProgram, "uOpacity");
      const orbitPosition = gl.getAttribLocation(orbitProgram, "aPosition");
      const orbitViewProjection = gl.getUniformLocation(orbitProgram, "uViewProjection");
      const orbitColor = gl.getUniformLocation(orbitProgram, "uColor");
      const orbitPointSize = gl.getUniformLocation(orbitProgram, "uPointSize");
      const orbitIsPoint = gl.getUniformLocation(orbitProgram, "uIsPoint");

      let orbitFrame = 0;
      let orbitPageVisible = !document.hidden;
      let orbitInViewport = true;
      let pointerTarget = [0, 0];
      let pointerCurrent = [0, 0];

      if (finePointer.matches && !reducedMotion.matches) {
        orbitCanvas.addEventListener("pointermove", (event) => {
          const bounds = orbitCanvas.getBoundingClientRect();
          pointerTarget = [
            ((event.clientX - bounds.left) / bounds.width - 0.5) * 0.7,
            ((event.clientY - bounds.top) / bounds.height - 0.5) * 0.45
          ];
        }, { passive: true });
        orbitCanvas.addEventListener("pointerleave", () => { pointerTarget = [0, 0]; });
      }

      const resizeOrbit = () => {
        const bounds = orbitCanvas.getBoundingClientRect();
        const ratio = Math.min(window.devicePixelRatio || 1, smallScreenSubmit() ? 1.15 : 1.6);
        const width = Math.max(1, Math.round(bounds.width * ratio));
        const height = Math.max(1, Math.round(bounds.height * ratio));
        if (orbitCanvas.width !== width || orbitCanvas.height !== height) {
          orbitCanvas.width = width;
          orbitCanvas.height = height;
        }
      };

      const renderOrbit = (now = 0) => {
        if (!orbitPageVisible || !orbitInViewport) return;
        resizeOrbit();
        gl.viewport(0, 0, orbitCanvas.width, orbitCanvas.height);
        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        gl.enable(gl.DEPTH_TEST);
        gl.enable(gl.BLEND);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

        pointerCurrent[0] += (pointerTarget[0] - pointerCurrent[0]) * 0.045;
        pointerCurrent[1] += (pointerTarget[1] - pointerCurrent[1]) * 0.045;
        const time = reducedMotion.matches ? 2.4 : now * 0.001;
        const eye = [pointerCurrent[0], pointerCurrent[1] + 0.25, 7.2];
        const projection = perspective(Math.PI / 4.2, orbitCanvas.width / orbitCanvas.height, 0.1, 30);
        const view = lookAt(eye, [0, 0, 0]);
        const viewProjection = multiply(projection, view);
        const model = rotationY(time * 0.1);

        gl.useProgram(sphereProgram);
        gl.enableVertexAttribArray(spherePosition);
        gl.enableVertexAttribArray(sphereNormal);
        gl.uniform3fv(sphereCamera, eye);

        ringSettings.forEach((ring, index) => {
          const ringModel = rotationY(time * (index === 0 ? 0.045 : -0.03));
          gl.bindBuffer(gl.ARRAY_BUFFER, ringBuffers[index].vertexBuffer);
          gl.vertexAttribPointer(spherePosition, 3, gl.FLOAT, false, 24, 0);
          gl.vertexAttribPointer(sphereNormal, 3, gl.FLOAT, false, 24, 12);
          gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ringBuffers[index].indexBuffer);
          gl.uniformMatrix4fv(sphereMvp, false, multiply(viewProjection, ringModel));
          gl.uniformMatrix4fv(sphereModel, false, ringModel);
          gl.uniform3fv(sphereShadowColor, ring.shadow);
          gl.uniform3fv(sphereLightColor, ring.light);
          gl.uniform1f(sphereOpacity, 0.9);
          gl.drawElements(gl.TRIANGLES, ring.mesh.indices.length, gl.UNSIGNED_SHORT, 0);
        });

        gl.bindBuffer(gl.ARRAY_BUFFER, sphereVertexBuffer);
        gl.vertexAttribPointer(spherePosition, 3, gl.FLOAT, false, 24, 0);
        gl.vertexAttribPointer(sphereNormal, 3, gl.FLOAT, false, 24, 12);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, sphereIndexBuffer);

        const innerModel = multiply(model, scaleMatrix(0.54));
        gl.uniformMatrix4fv(sphereMvp, false, multiply(viewProjection, innerModel));
        gl.uniformMatrix4fv(sphereModel, false, innerModel);
        gl.uniform3f(sphereShadowColor, 0.015, 0.18, 0.2);
        gl.uniform3f(sphereLightColor, 0.42, 1.0, 0.86);
        gl.uniform1f(sphereOpacity, 1);
        gl.drawElements(gl.TRIANGLES, sphere.indices.length, gl.UNSIGNED_SHORT, 0);

        gl.depthMask(false);
        gl.uniformMatrix4fv(sphereMvp, false, multiply(viewProjection, model));
        gl.uniformMatrix4fv(sphereModel, false, model);
        gl.uniform3f(sphereShadowColor, 0.008, 0.028, 0.05);
        gl.uniform3f(sphereLightColor, 0.08, 0.34, 0.36);
        gl.uniform1f(sphereOpacity, 0.72);
        gl.drawElements(gl.TRIANGLES, sphere.indices.length, gl.UNSIGNED_SHORT, 0);
        gl.depthMask(true);

        gl.useProgram(orbitProgram);
        gl.enableVertexAttribArray(orbitPosition);
        gl.depthMask(false);
        const shellModel = rotationY(-time * 0.075 + 0.6);
        gl.uniformMatrix4fv(orbitViewProjection, false, multiply(viewProjection, shellModel));
        gl.bindBuffer(gl.ARRAY_BUFFER, shellBuffer);
        gl.vertexAttribPointer(orbitPosition, 3, gl.FLOAT, false, 0, 0);
        gl.uniform4f(orbitColor, 0.28, 0.88, 0.82, 0.3);
        gl.uniform1f(orbitPointSize, 1);
        gl.uniform1f(orbitIsPoint, 0);
        gl.drawArrays(gl.LINES, 0, shellEdges.length / 3);

        gl.depthMask(true);

        if (!reducedMotion.matches) orbitFrame = requestAnimationFrame(renderOrbit);
      };

      document.addEventListener("visibilitychange", () => {
        orbitPageVisible = !document.hidden;
        if (orbitPageVisible && orbitInViewport && !orbitFrame) renderOrbit(performance.now());
        if (!orbitPageVisible) {
          cancelAnimationFrame(orbitFrame);
          orbitFrame = 0;
        }
      });

      if ("IntersectionObserver" in window) {
        const heroObserver = new IntersectionObserver(([entry]) => {
          orbitInViewport = entry.isIntersecting;
          if (orbitInViewport && orbitPageVisible && !orbitFrame) renderOrbit(performance.now());
          if (!orbitInViewport) {
            cancelAnimationFrame(orbitFrame);
            orbitFrame = 0;
          }
        }, { rootMargin: "12% 0px", threshold: 0 });
        heroObserver.observe(document.querySelector(".hero"));
      }

      renderOrbit(performance.now());
    }
  }
}

const canvas = document.querySelector("#atmosphere");

if (canvas && !reducedMotion.matches) {
  const context = canvas.getContext("2d");
  let particles = [];
  let animationFrame = 0;
  let isVisible = !document.hidden;
  let lastParticleFrame = 0;

  const resizeCanvas = () => {
    const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
    canvas.width = Math.round(window.innerWidth * ratio);
    canvas.height = Math.round(window.innerHeight * ratio);
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    context.setTransform(ratio, 0, 0, ratio, 0, 0);

    const count = window.innerWidth < 768 ? 12 : 26;
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.12,
      vy: (Math.random() - 0.5) * 0.12,
      radius: Math.random() * 1.2 + 0.35
    }));
  };

  const draw = (now = 0) => {
    if (!isVisible) return;
    const frameInterval = window.innerWidth < 768 ? 42 : 33;
    if (now - lastParticleFrame < frameInterval) {
      animationFrame = requestAnimationFrame(draw);
      return;
    }
    lastParticleFrame = now;
    context.clearRect(0, 0, window.innerWidth, window.innerHeight);

    particles.forEach((particle, index) => {
      particle.x += particle.vx;
      particle.y += particle.vy;
      if (particle.x < 0 || particle.x > window.innerWidth) particle.vx *= -1;
      if (particle.y < 0 || particle.y > window.innerHeight) particle.vy *= -1;

      context.beginPath();
      context.fillStyle = "rgba(135, 220, 215, 0.42)";
      context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      context.fill();

      for (let next = index + 1; next < particles.length; next += 1) {
        const other = particles[next];
        const distance = Math.hypot(particle.x - other.x, particle.y - other.y);
        if (distance < 115) {
          context.beginPath();
          context.strokeStyle = `rgba(88, 201, 194, ${(1 - distance / 115) * 0.08})`;
          context.moveTo(particle.x, particle.y);
          context.lineTo(other.x, other.y);
          context.stroke();
        }
      }
    });

    animationFrame = requestAnimationFrame(draw);
  };

  let resizeTimer;
  window.addEventListener("resize", () => {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(resizeCanvas, 160);
  });

  document.addEventListener("visibilitychange", () => {
    isVisible = !document.hidden;
    if (isVisible && !animationFrame) draw();
    if (!isVisible) {
      cancelAnimationFrame(animationFrame);
      animationFrame = 0;
    }
  });

  resizeCanvas();
  draw();
}

const currentYear = document.querySelector("#current-year");
if (currentYear) currentYear.textContent = new Date().getFullYear();

document.querySelectorAll("[data-contact-form]").forEach((form) => {
  const button = form.querySelector('button[type="submit"]');
  const status = form.querySelector(".form-status");
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const originalLabel = button.innerHTML;
    button.disabled = true;
    button.textContent = "Sending…";
    status.textContent = "";
    status.removeAttribute("data-state");
    try {
      const response = await fetch(form.action, { method: "POST", body: new FormData(form), headers: { Accept: "application/json" } });
      if (!response.ok) throw new Error("Form submission failed");
      form.reset();
      status.textContent = "Message sent. Thank you — I’ll be in touch.";
      status.dataset.state = "success";
    } catch {
      status.textContent = "Message could not be sent. Please try again or use the email link below.";
      status.dataset.state = "error";
    } finally {
      button.disabled = false;
      button.innerHTML = originalLabel;
    }
  });
});
