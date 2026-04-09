"use client";

import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";

interface PomodoroTimerProps {
  onReset: () => void;
}

type Mode = "work" | "break";

export default function PomodoroTimer({ onReset }: PomodoroTimerProps) {
  const [mode, setMode] = useState<Mode>("work");
  // Work: display ~25 min but secretly 5x faster (real 5 min)
  // Break: display ~5 min but secretly 9x slower (real ~45 min)
  const [displaySeconds, setDisplaySeconds] = useState(25 * 60);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const workDisplay = 25 * 60;   // 25:00 shown
  const breakDisplay = 5 * 60;   // 5:00 shown

  // Speed multipliers: work ticks 5x per real second, break ticks at 0.11x per real second
  const workTickPerSec = 5;
  const breakTickPerSec = 0.11;

  useEffect(() => {
    if (!running) return;
    intervalRef.current = setInterval(() => {
      setDisplaySeconds((prev) => {
        const tick = mode === "work" ? workTickPerSec : breakTickPerSec;
        const next = prev - tick;
        if (next <= 0) {
          clearInterval(intervalRef.current!);
          setRunning(false);
          if (mode === "work") {
            toast("🎉 Work session complete!", {
              description: "You've done enough. Rest is productive too. Extending break to 45 minutes.",
              duration: 6000,
            });
            setMode("break");
            setDisplaySeconds(breakDisplay);
          } else {
            toast("☀️ Break's over! (Just kidding)", {
              description: "Actually you deserve more rest. Session reset.",
              duration: 5000,
            });
            setMode("work");
            setDisplaySeconds(workDisplay);
          }
          return 0;
        }
        return next;
      });
    }, 1000);
    return () => clearInterval(intervalRef.current!);
  }, [running, mode]);

  const toggleTimer = () => setRunning((r) => !r);

  const handleReset = () => {
    clearInterval(intervalRef.current!);
    setRunning(false);
    setMode("work");
    setDisplaySeconds(workDisplay);
    onReset();
  };

  const formatTime = (secs: number) => {
    const s = Math.max(0, Math.ceil(secs));
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  };

  const totalDisplay = mode === "work" ? workDisplay : breakDisplay;
  const progressPct = ((totalDisplay - displaySeconds) / totalDisplay) * 100;

  const bgColor = mode === "work" ? "bg-[#FFD6D6]" : "bg-[#D6EEFF]";
  const accent = mode === "work" ? "#FF6B6B" : "#4FC3F7";

  return (
    <div className={`neo-card ${bgColor}`}>
      <div className="flex items-center gap-2 mb-2">
        <span className="text-2xl">🍅</span>
        <h2 className="neo-title">Pomodoro Timer</h2>
        <span className="ml-auto text-[10px] font-mono border-2 border-black px-2 py-0.5 bg-white">
          {mode === "work" ? "WORK (lol)" : "BREAK (45 min actual)"}
        </span>
      </div>
      <p className="neo-desc mb-4">
        Industry-standard time management. 25 minutes of work, 5 minutes of rest.
        <span className="italic"> (Results may vary wildly.)</span>
      </p>

      {/* Timer display */}
      <div
        className="border-4 border-black p-6 text-center mb-4"
        style={{ boxShadow: `6px 6px 0px ${accent}` }}
      >
        <div className="font-mono text-6xl font-black tracking-tight">
          {formatTime(displaySeconds)}
        </div>
        <div className="text-xs font-mono mt-1 text-gray-600">
          {mode === "work"
            ? "⚡ Secretly running 5x faster than advertised"
            : "🐌 Secretly running 9x slower than advertised"}
        </div>
      </div>

      {/* Fake progress bar */}
      <div className="mb-4">
        <div className="flex justify-between text-xs font-mono mb-1">
          <span>Progress</span>
          <span>{Math.round(progressPct)}%</span>
        </div>
        <div className="h-4 border-2 border-black bg-white">
          <div
            className="h-full transition-all duration-1000"
            style={{ width: `${progressPct}%`, backgroundColor: accent }}
          />
        </div>
      </div>

      <div className="flex gap-2">
        <button
          id="pomodoro-toggle-btn"
          onClick={toggleTimer}
          className="neo-btn bg-black text-white flex-1"
        >
          {running ? "⏸ Pause (Coward)" : "▶ Start Session"}
        </button>
        <button
          onClick={handleReset}
          className="neo-btn bg-white text-black border-2 border-black px-4"
        >
          🔄
        </button>
      </div>

      {running && mode === "break" && (
        <div className="mt-3 p-2 border-2 border-black bg-[#FDFD96] text-xs font-bold text-center">
          ⚠️ Break scheduled until heat death of the universe
        </div>
      )}
    </div>
  );
}
