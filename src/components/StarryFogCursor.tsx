import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const NUM_STARS = 8;
const STAR_RADIUS = 36; // px (radio de la órbita)
const STAR_SIZE_MIN = 2;
const STAR_SIZE_MAX = 5;

type StarMeta = {
    angle: number;
    speed: number;
    radius: number;
    size: number;
};

function random(min: number, max: number) {
    return Math.random() * (max - min) + min;
}

export const StarryFogCursor = () => {
    const groupRef = useRef<HTMLDivElement>(null);
    const starRefs = useRef<(HTMLDivElement | null)[]>([]);

    const starsMeta = useRef<StarMeta[]>(
        Array.from({ length: NUM_STARS }).map(() => ({
            angle: random(0, Math.PI * 2),
            speed: random(0.001, 0.005), // <<< Ahora lento y suave!
            radius: random(STAR_RADIUS * 0.7, STAR_RADIUS * 1.3),
            size: random(STAR_SIZE_MIN, STAR_SIZE_MAX),
        }))
    );

    useEffect(() => {
        const onMove = (e: MouseEvent) => {
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
            if (running) requestAnimationFrame(animate);
        }
        animate();
        return () => {
            running = false;
        };
    }, []);

    return (
        <div
            className="pointer-events-none fixed top-0 left-0 z-50"
            style={{ width: 100, height: 100 }}
            ref={groupRef}
        >
            {/* Niebla */}
            <div
                className="absolute w-full h-full rounded-full"
                style={{
                    filter: "blur(16px)",
                    background:
                        "radial-gradient(circle at 50% 50%, #fff5 60%, #fff0 100%)",
                    opacity: 0.6,
                    zIndex: 1,
                }}
            />
            {/* Estrellitas */}
            {starsMeta.current.map((meta, i) => (
                <div
                    key={i}
                    ref={el => { starRefs.current[i] = el; }} // <--- ¡Corregido!
                    className="absolute"
                    style={{
                        width: meta.size,
                        height: meta.size,
                        borderRadius: "50%",
                        background: "#fff",
                        boxShadow: `0 0 6px 2px #fff8`,
                        left: 50,
                        top: 50,
                        zIndex: 2,
                    }}
                />
            ))}

        </div>
    );
};
