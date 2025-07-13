import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import CLOUDS from "vanta/dist/vanta.clouds.min";
export const VantaCloudsBackground = () => {
    const vantaRef = useRef(null);
    const effectRef = useRef(null);
    useEffect(() => {
        if (vantaRef.current && !effectRef.current) {
            try {
                effectRef.current = CLOUDS({
                    el: vantaRef.current,
                    THREE,
                    mouseControls: false,
                    touchControls: false,
                    gyroControls: false,
                    minHeight: 200.0,
                    minWidth: 200.0,
                    skyColor: 0x000000,
                    cloudShadowColor: 0x3b18c8,
                    sunColor: 0xd618ff,
                    sunGlareColor: 0x30f2ff,
                    sunlightColor: 0x000000,
                    speed: 0.3,
                });
            }
            catch (error) {
                console.error("Error inicializando Vanta:", error);
            }
        }
        return () => {
            if (effectRef.current) {
                effectRef.current.destroy();
                effectRef.current = null;
            }
        };
    }, []);
    return (_jsx("div", { ref: vantaRef, style: {
            position: "fixed",
            inset: 0,
            width: "100vw",
            height: "100vh",
            zIndex: 0,
            pointerEvents: "none",
        } }));
};
