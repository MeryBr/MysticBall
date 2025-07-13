import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useState } from 'react';
import { Html } from '@react-three/drei';
const normalFragmentShader = `
  uniform float time;
  varying vec2 vUv;
  void main() {
    vec2 uv = vUv - 0.5;
    float r = length(uv) * 2.0;
    float visible = step(0.5, fract(time * 0.5));
    if (r > 1.0 || visible < 0.5) discard;
    vec3 color = vec3(0.2, 0.6, 1.0);
    float alpha = 0.6;
    gl_FragColor = vec4(color, alpha);
  }
`;
const brokenFragmentShader = `
  uniform float time;
  varying vec2 vUv;

  float random(vec2 p) {
    return fract(sin(dot(p, vec2(23.1407, 42.1231))) * 43758.5453);
  }

  float lightning(vec2 uv) {
    float l1 = smoothstep(0.01, 0.02, abs(sin(uv.y * 20.0 + time * 5.0) - uv.x));
    float l2 = smoothstep(0.005, 0.015, abs(cos(uv.x * 40.0 - time * 3.0) - uv.y));
    return max(l1, l2);
  }

  void main() {
    vec2 uv = vUv - 0.5;
    float r = length(uv) * 2.0;
    if (r > 1.0) discard;

    float noise = random(uv + time * 0.8);
    float cracks = lightning(uv + noise * 0.1);

    vec3 baseColor = mix(vec3(0.05, 0.05, 0.1), vec3(0.8, 0.2, 1.0), cracks);
    float alpha = 0.75 + 0.25 * cracks;

    gl_FragColor = vec4(baseColor, alpha);
  }
`;
const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
  }
`;
function Orb({ answer, broken }) {
    const materialRef = useRef(null);
    const [lastUpdate, setLastUpdate] = useState(0);
    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        if (t - lastUpdate > 0.1) {
            if (materialRef.current) {
                // @ts-ignore
                materialRef.current.uniforms.time.value = t;
                setLastUpdate(t);
                state.invalidate();
            }
        }
    }, 1);
    return (_jsxs("mesh", { children: [_jsx("planeGeometry", { args: [2, 2, 1, 1] }), _jsx("shaderMaterial", { ref: materialRef, uniforms: { time: { value: 0 } }, vertexShader: vertexShader, fragmentShader: broken ? brokenFragmentShader : normalFragmentShader, transparent: true, depthWrite: false }), answer && (_jsx(Html, { center: true, zIndexRange: [100, 0], children: _jsx("div", { className: "answer-inside-ball", children: answer }) }))] }));
}
export default function MagicSphere({ answer, broken, }) {
    return (_jsxs("div", { className: `magic-sphere-wrapper ${broken ? 'broken' : ''}`, style: {
            width: 360,
            height: 360,
            margin: '0 auto',
            position: 'relative',
            zIndex: 5,
            pointerEvents: 'none',
        }, children: [broken && _jsx("div", { className: "broken-overlay" }), broken && _jsx("div", { className: "lightning-flash" }), _jsxs(Canvas, { dpr: [1, 1.5], frameloop: "demand", camera: { position: [0, 0, 2.8], fov: 50 }, style: {
                    borderRadius: 180,
                    boxShadow: '0 0 60px #44aaff',
                }, children: [_jsx("ambientLight", { intensity: 1.18 }), _jsx(Orb, { answer: answer, broken: broken })] })] }));
}
