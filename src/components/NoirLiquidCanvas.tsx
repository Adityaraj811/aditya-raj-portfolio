import React, { useEffect, useRef } from 'react';
import { prefersReducedMotion } from '../utils/motion';

interface NoirLiquidCanvasProps {
  className?: string;
}

/**
 * WebGL real-time turbulent crimson-on-obsidian fluid shader ("Liquid Signal")
 * inspired by the Framer Noir Signal hero backdrop, with smooth pointer velocity push
 * and graceful CSS fallback if WebGL is unavailable or reduced-motion is preferred.
 */
export const NoirLiquidCanvas: React.FC<NoirLiquidCanvasProps> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || typeof window === 'undefined') return;

    if (prefersReducedMotion()) return;

    const gl = canvas.getContext('webgl', {
      alpha: true,
      antialias: false,
      powerPreference: 'high-performance',
    });

    if (!gl) return;

    const vertexShaderSrc = `
      attribute vec2 a_position;
      varying vec2 v_uv;
      void main() {
        v_uv = a_position * 0.5 + 0.5;
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    // Ported multi-octave fluid turbulence shader using Framer Noir Signal palette
    const fragmentShaderSrc = `
      precision mediump float;
      varying vec2 v_uv;
      uniform float u_time;
      uniform vec2 u_resolution;
      uniform vec2 u_mouse;

      vec3 palette5(float t) {
        vec3 c0 = vec3(0.020, 0.020, 0.020); // #050505
        vec3 c1 = vec3(0.165, 0.000, 0.000); // #2A0000
        vec3 c2 = vec3(0.541, 0.000, 0.000); // #8A0000
        vec3 c3 = vec3(0.882, 0.024, 0.000); // #E10600
        vec3 c4 = vec3(0.020, 0.020, 0.020); // #050505

        float x = clamp(t, 0.0, 1.0) * 4.0;
        if (x < 1.0) return mix(c0, c1, smoothstep(0.0, 1.0, x));
        if (x < 2.0) return mix(c1, c2, smoothstep(0.0, 1.0, x - 1.0));
        if (x < 3.0) return mix(c2, c3, smoothstep(0.0, 1.0, x - 2.0));
        return mix(c3, c4, smoothstep(0.0, 1.0, x - 3.0));
      }

      float hash21(vec2 p) {
        p = fract(p * vec2(123.34, 456.21));
        p += dot(p, p + 45.32);
        return fract(p.x * p.y);
      }

      void main() {
        float aspect = u_resolution.x / max(u_resolution.y, 1.0);
        vec2 uv = v_uv;
        vec2 p = (uv - 0.5) * vec2(aspect, 1.0);

        // Pointer gravity warp
        vec2 m = (u_mouse - 0.5) * vec2(aspect, 1.0);
        float mDist = length(p - m);
        vec2 push = (p - m) * exp(-mDist * 2.2) * 0.32;
        p -= push;

        float t = u_time * 0.25;
        float totalVal = 0.0;
        float totalWeight = 0.0;

        for (int i = 0; i < 4; i++) {
          float fi = float(i);
          float eph = fi / 4.0;
          vec2 q = p * 0.55;
          float a = 0.42 + fi * 0.35;
          float d = 1.18 - fi * 0.21;

          for (int j = 2; j < 8; j++) {
            float fj = float(j);
            q += 0.62 * sin(q.yx * 1.45 * fj + t + vec2(a, d) + fi * 0.28) / fj;
            a += cos(fj + d * 1.2 + q.x * 2.0 - t);
            d += sin(fj * q.y + a + t);
          }

          float wave = 0.5 + 0.5 * sin(length(q.yx + vec2(a, d) * 0.2) * 3.8 + fi * fi);
          float weight = smoothstep(0.0, 0.5, eph + 0.15) * smoothstep(1.0, 0.45, eph);
          totalVal += wave * weight;
          totalWeight += weight;
        }

        float val = totalVal / max(totalWeight, 0.001);
        val = clamp((val - 0.28) / 0.44, 0.0, 1.0);

        // Subtle dithering to prevent dark gradient banding
        float dither = (hash21(gl_FragCoord.xy + u_time) - 0.5) * 0.04;
        val = clamp(val + dither, 0.0, 1.0);

        vec3 col = palette5(val) * 1.12;
        col = pow(max(col, vec3(0.0)), vec3(0.95));

        gl_FragColor = vec4(col, 1.0);
      }
    `;

    const compileShader = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vert = compileShader(gl.VERTEX_SHADER, vertexShaderSrc);
    const frag = compileShader(gl.FRAGMENT_SHADER, fragmentShaderSrc);
    if (!vert || !frag) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vert);
    gl.attachShader(program, frag);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;

    gl.useProgram(program);

    const posLoc = gl.getAttribLocation(program, 'a_position');
    const timeLoc = gl.getUniformLocation(program, 'u_time');
    const resLoc = gl.getUniformLocation(program, 'u_resolution');
    const mouseLoc = gl.getUniformLocation(program, 'u_mouse');

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    let targetMouse = { x: 0.5, y: 0.5 };
    let smoothMouse = { x: 0.5, y: 0.5 };
    let isInViewport = true;
    let rafId: number | null = null;
    const startTime = performance.now();

    const resize = () => {
      const parent = canvas.parentElement;
      const w = parent ? parent.clientWidth : window.innerWidth;
      const h = parent ? parent.clientHeight : window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.max(1, Math.floor(w * dpr * 0.65));
      canvas.height = Math.max(1, Math.floor(h * dpr * 0.65));
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    resize();
    window.addEventListener('resize', resize, { passive: true });

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      targetMouse.x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      targetMouse.y = 1.0 - Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));
    };
    window.addEventListener('pointermove', onPointerMove, { passive: true });

    const observer =
      typeof IntersectionObserver !== 'undefined'
        ? new IntersectionObserver(
            (entries) => {
              isInViewport = entries[0]?.isIntersecting ?? true;
            },
            { threshold: 0.01 }
          )
        : null;
    observer?.observe(canvas);

    const render = () => {
      if (isInViewport) {
        smoothMouse.x += (targetMouse.x - smoothMouse.x) * 0.06;
        smoothMouse.y += (targetMouse.y - smoothMouse.y) * 0.06;
        const elapsed = (performance.now() - startTime) * 0.001;
        gl.uniform1f(timeLoc, elapsed);
        gl.uniform2f(resLoc, canvas.width, canvas.height);
        gl.uniform2f(mouseLoc, smoothMouse.x, smoothMouse.y);
        gl.drawArrays(gl.TRIANGLES, 0, 6);
      }
      rafId = window.requestAnimationFrame(render);
    };

    rafId = window.requestAnimationFrame(render);

    return () => {
      if (rafId !== null) window.cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onPointerMove);
      observer?.disconnect();
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vert);
      gl.deleteShader(frag);
    };
  }, []);

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      {/* Fallback deep atmospheric gradient if WebGL fails */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(65% 70% at 62% 38%, rgba(225,6,0,0.28) 0%, rgba(138,0,0,0.16) 42%, rgba(5,5,5,0.92) 100%)',
        }}
      />
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full object-cover"
        style={{ mixBlendMode: 'screen', opacity: 0.56 }}
      />
    </div>
  );
};
