import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
const NUM_STARS = 8;
const STAR_RADIUS = 36;
const STAR_SIZE_MIN = 2;
const STAR_SIZE_MAX = 5;
function random(min, max) {
    return Math.random() * (max - min) + min;
}
export const StarryFogCursor = () => {
    const groupRef = useRef(null);
    const starRefs = useRef([]);
    const starsMeta = useRef(Array.from({ length: NUM_STARS }).map(() => ({
        angle: random(0, Math.PI * 2),
        speed: random(0.001, 0.005),
        radius: random(STAR_RADIUS * 0.7, STAR_RADIUS * 1.3),
        size: random(STAR_SIZE_MIN, STAR_SIZE_MAX),
    })));
    useEffect(() => {
        const onMove = (e) => {
            if (groupRef.current) {
                gsap.to(groupRef.current, {
                    x: e.clientX - 50,
                    y: e.clientY - 50,
                    duration: 0.25,
                    ease: "power2.out",
                });
            }
        };
        window.addEventListener("mousemove", onMove);
        return () => window.removeEventListener("mousemove", onMove);
    }, []);
    useEffect(() => {
        let running = true;
        function animate() {
            starsMeta.current.forEach((meta, i) => {
                meta.angle += meta.speed;
                const x = 50 + Math.cos(meta.angle) * meta.radius;
                const y = 50 + Math.sin(meta.angle) * meta.radius;
                const star = starRefs.current[i];
                if (star) {
                    star.style.left = `${x}px`;
                    star.style.top = `${y}px`;
                }
            });
            if (running)
                requestAnimationFrame(animate);
        }
        animate();
        return () => {
            running = false;
        };
    }, []);
    return (_jsxs("div", { className: "pointer-events-none fixed top-0 left-0 z-50", style: { width: 100, height: 100 }, ref: groupRef, children: [_jsx("div", { className: "absolute w-full h-full rounded-full", style: {
                    filter: "blur(16px)",
                    background: "radial-gradient(circle at 50% 50%, #fff5 60%, #fff0 100%)",
                    opacity: 0.6,
                    zIndex: 1,
                } }), starsMeta.current.map((meta, i) => (_jsx("div", { ref: el => { starRefs.current[i] = el; }, className: "absolute", style: {
                    width: meta.size,
                    height: meta.size,
                    borderRadius: "50%",
                    background: "#fff",
                    boxShadow: `0 0 6px 2px #fff8`,
                    left: 50,
                    top: 50,
                    zIndex: 2,
                } }, i)))] }));
};
