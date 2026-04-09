"use client";

import { useState, useEffect, useRef } from "react";
import { Switch } from "@/components/ui/switch";

interface DarkModeToggleProps {
  onDarkModeActivated: () => void;
  onBrightnessChange: (level: number) => void;
}

export default function DarkModeToggle({ onDarkModeActivated, onBrightnessChange }: DarkModeToggleProps) {
  const [enabled, setEnabled] = useState(false);
  const [brightness, setBrightness] = useState(0); // 0 = dark, 100 = blinding white
  const [restored, setRestored] = useState(false);
  const animRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const hasFiredRef = useRef(false);

  useEffect(() => {
    if (animRef.current) clearInterval(animRef.current);

    if (enabled) {
      if (!hasFiredRef.current) {
        hasFiredRef.current = true;
        onDarkModeActivated();
      }
      setRestored(false);
      const start = Date.now();
      const duration = 4000;
      animRef.current = setInterval(() => {
        const elapsed = Date.now() - start;
        const pct = Math.min((elapsed / duration) * 100, 100);
        setBrightness(pct);
        onBrightnessChange(pct);
        if (pct >= 100) clearInterval(animRef.current!);
      }, 50);
    } else {
      setBrightness(0);
      onBrightnessChange(0);
      hasFiredRef.current = false;
    }

    return () => clearInterval(animRef.current!);
  }, [enabled]);

  const restore = () => {
    setEnabled(false);
    setRestored(true);
    setBrightness(0);
    onBrightnessChange(0);
    hasFiredRef.current = false;
    setTimeout(() => setRestored(false), 2000);
  };

  const getLabel = () => {
    if (!enabled) return "Dark Mode";
    if (brightness < 30) return "Getting darker...";
    if (brightness < 60) return "Wait, this feels wrong...";
    if (brightness < 90) return "Something is very off...";
    return "☀️ YOU'RE BLIND NOW";
  };

  const bgLightness = Math.round(18 + (brightness / 100) * (255 - 18));
  const bgHex = `rgb(${bgLightness}, ${bgLightness}, ${bgLightness})`;

  return (
    <div className="neo-card" style={{ backgroundColor: bgLightness > 200 ? "#FFE55C" : "#1a1a2e" }}>
      <div className="flex items-center gap-2 mb-2">
        <span className="text-2xl">{brightness > 50 ? "☀️" : "🌙"}</span>
        <h2 className="neo-title" style={{ color: bgLightness > 180 ? "#000" : "#fff" }}>
          Dark Mode Toggle
        </h2>
      </div>
      <p
        className="neo-desc mb-5"
        style={{ color: bgLightness > 180 ? "#333" : "#aaa" }}
      >
        Enable dark mode for a comfortable, eye-friendly experience designed by
        our UX team of raccoons.
      </p>

      {/* Toggle row */}
      <div
        className="border-2 p-4 flex items-center justify-between mb-4"
        style={{
          borderColor: bgLightness > 180 ? "#000" : "#fff",
          backgroundColor: bgLightness > 200 ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.3)",
          boxShadow: `4px 4px 0px ${bgLightness > 180 ? "#000" : "#fff"}`,
        }}
      >
        <div>
          <p
            className="font-black text-sm uppercase tracking-wider"
            style={{ color: bgLightness > 180 ? "#000" : "#fff" }}
          >
            {getLabel()}
          </p>
          <p
            className="text-xs font-mono mt-0.5"
            style={{ color: bgLightness > 180 ? "#555" : "#888" }}
          >
            {enabled
              ? `Brightness: ${brightness.toFixed(0)}% (Target: Dark, Actual: Blinding)`
              : "Currently: Off (Relatively Safe)"}
          </p>
        </div>
        <Switch
          id="dark-mode-switch"
          checked={enabled}
          onCheckedChange={setEnabled}
          className="scale-125"
        />
      </div>

      {/* Brightness overlay indicator */}
      {enabled && (
        <div
          className="border-2 border-black h-6 mb-4 overflow-hidden"
          style={{ borderColor: bgLightness > 180 ? "#000" : "#fff" }}
        >
          <div
            className="h-full transition-all"
            style={{
              width: `${brightness}%`,
              background:
                "linear-gradient(90deg, #1a1a2e, #ff9f43, #ffff66, #ffffff)",
            }}
          />
        </div>
      )}

      {brightness >= 99 && (
        <button
          id="restore-eyes-btn"
          onClick={restore}
          className="neo-btn bg-black text-white w-full"
        >
          😭 Restore My Eyes
        </button>
      )}

      {restored && (
        <p className="text-center text-xs font-mono mt-2 text-green-700 font-bold">
          ✅ Vision partially restored. No guarantees.
        </p>
      )}

      <p
        className="text-[10px] font-mono mt-3 text-center"
        style={{ color: bgLightness > 180 ? "#666" : "#666" }}
      >
        ⚠️ ProcrastiNation is not liable for retinal damage.
      </p>
    </div>
  );
}
