"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { toast } from "sonner";
import confetti from "canvas-confetti";
import { achievements, type AchievementId } from "@/lib/achievements";
import InfiniteStartButton from "@/components/InfiniteStartButton";
import ExcuseGenerator from "@/components/ExcuseGenerator";
import PomodoroTimer from "@/components/PomodoroTimer";
import ReverseProgressBar from "@/components/ReverseProgressBar";
import DarkModeToggle from "@/components/DarkModeToggle";
import AchievementSystem from "@/components/AchievementSystem";

export default function Home() {
  const [unlocked, setUnlocked] = useState<Set<AchievementId>>(new Set());
  const [excuseCount, setExcuseCount] = useState(0);
  const [pomodoroResets, setPomodoroResets] = useState(0);
  const [settingsClicks, setSettingsClicks] = useState(0);
  const [brightnessLevel, setBrightnessLevel] = useState(0);
  const timeOnPageRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const unlock = useCallback((id: AchievementId) => {
    setUnlocked((prev) => {
      if (prev.has(id)) return prev;
      const next = new Set(prev);
      next.add(id);
      const ach = achievements.find((a) => a.id === id)!;
      // Fire confetti
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 },
        colors: ["#FDFD96", "#FF6B6B", "#00C897", "#4FC3F7", "#000"],
      });
      toast(`${ach.emoji} Achievement Unlocked!`, {
        description: `"${ach.name}" — ${ach.secret}`,
        duration: 6000,
      });
      return next;
    });
  }, []);

  // Master Procrastinator: 2 min on page
  useEffect(() => {
    timeOnPageRef.current = setInterval(() => {
      unlock("master_procrastinator");
      clearInterval(timeOnPageRef.current!);
    }, 2 * 60 * 1000);
    return () => clearInterval(timeOnPageRef.current!);
  }, [unlock]);

  // Excuse Artist: 5 excuses generated
  useEffect(() => {
    if (excuseCount >= 5) unlock("excuse_artist");
  }, [excuseCount, unlock]);

  // Time Bender: 3 pomodoro resets
  useEffect(() => {
    if (pomodoroResets >= 3) unlock("time_bender");
  }, [pomodoroResets, unlock]);

  // Professional Overthinker: 3 settings clicks
  useEffect(() => {
    if (settingsClicks >= 3) unlock("professional_overthinker");
  }, [settingsClicks, unlock]);

  // Darkness Embracer: dark mode activated (handled by callback)
  const handleDarkModeActivated = useCallback(() => {
    unlock("darkness_embracer");
  }, [unlock]);

  // Deadline Dodger: handled by callback from start button
  const handleDodge = useCallback(() => {
    unlock("deadline_dodger");
  }, [unlock]);

  // Global brightness level for background fade
  const bgAlpha = Math.round(brightnessLevel * 2.55);
  const whiteOverlay = `rgba(255,255,255,${brightnessLevel / 100})`;

  return (
    <div
      className="min-h-screen relative"
      style={{
        backgroundColor: "#f5f0e8",
        backgroundImage: "radial-gradient(circle, #00000012 1px, transparent 1px)",
        backgroundSize: "24px 24px",
      }}
    >
      {/* Global brightness overlay for dark mode joke */}
      {brightnessLevel > 0 && (
        <div
          className="fixed inset-0 pointer-events-none z-40 transition-all duration-300"
          style={{ backgroundColor: whiteOverlay }}
        />
      )}

      {/* ── NAVBAR ── */}
      <header className="border-b-4 border-black bg-black text-white sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#FDFD96] border-2 border-white flex items-center justify-center">
              <span className="text-black text-sm font-black">PN</span>
            </div>
            <div>
              <h1 className="font-black text-sm uppercase tracking-widest leading-none">
                ProcrastiNation™
              </h1>
              <p className="text-[10px] font-mono text-gray-400 mt-0.5">
                v6.9.0 • Enterprise Idle Edition
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Fake settings */}
            <button
              id="settings-btn"
              onClick={() => {
                setSettingsClicks((c) => c + 1);
                toast("⚙️ Settings", {
                  description: "There are no settings. We believe rigid inflexibility drives success.",
                  duration: 3000,
                });
              }}
              className="neo-btn bg-white text-black text-xs px-3 py-1.5 border-white hover:bg-[#FDFD96]"
            >
              ⚙️ Settings
            </button>

            <AchievementSystem unlocked={unlocked} />
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* ── HERO ── */}
        <section className="mb-10 text-center">
          <div className="inline-block border-4 border-black bg-[#FDFD96] px-6 py-2 mb-4" style={{ boxShadow: "6px 6px 0px #000" }}>
            <p className="font-mono text-xs font-bold uppercase tracking-widest">
              🏆 #1 Most Downloaded Productivity App for People Who Don't Produce Anything
            </p>
          </div>
          <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tighter leading-none mb-3">
            Stop Working.
            <br />
            <span className="text-[#FF6B6B]">Start Appearing To.</span>
          </h2>
          <p className="text-base font-mono text-gray-600 max-w-2xl mx-auto">
            ProcrastiNation is the world's first productivity suite specifically engineered
            to eliminate all productivity while maintaining the aesthetic of getting things done.
          </p>

          {/* Fake stats */}
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            {[
              { label: "Tasks Not Started", value: "847M" },
              { label: "Hours Wasted", value: "∞" },
              { label: "Excuses Generated", value: "12B" },
              { label: "Deadlines Dodged", value: "All of them" },
            ].map((stat) => (
              <div key={stat.label} className="border-2 border-black bg-white px-4 py-2" style={{ boxShadow: "3px 3px 0px #000" }}>
                <div className="font-black text-xl">{stat.value}</div>
                <div className="text-[10px] font-mono text-gray-500 uppercase">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── FEATURE GRID ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Row 1 */}
          <InfiniteStartButton onDodge={handleDodge} />
          <ExcuseGenerator
            onExcuseGenerated={() => setExcuseCount((c) => c + 1)}
          />

          {/* Row 2 */}
          <PomodoroTimer onReset={() => setPomodoroResets((c) => c + 1)} />
          <ReverseProgressBar />

          {/* Row 3 — full width dark mode */}
          <div className="md:col-span-2">
            <DarkModeToggle
              onDarkModeActivated={handleDarkModeActivated}
              onBrightnessChange={setBrightnessLevel}
            />
          </div>
        </div>

        {/* ── TESTIMONIALS ── */}
        <section className="mt-12">
          <h3 className="font-black text-2xl uppercase tracking-tight mb-4 text-center">
            What Our Users Are Saying<br />
            <span className="text-sm font-mono text-gray-500 normal-case font-normal">
              (while avoiding their actual work)
            </span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                quote: "I've been 'about to start' for 6 months. ProcrastiNation makes me feel great about it.",
                author: "Brenda K., Head of Pending Initiatives",
                color: "bg-[#FFD6D6]",
              },
              {
                quote: "The Reverse Progress Bar perfectly captures the essence of my entire career.",
                author: "Marcus T., Senior Avoider",
                color: "bg-[#D6EEFF]",
              },
              {
                quote: "I turned on Dark Mode and now I'm legally blind, 10/10 would recommend.",
                author: "Sandra M., Former Visual Cortex Owner",
                color: "bg-[#E8D5FF]",
              },
            ].map((t) => (
              <div key={t.author} className={`neo-card ${t.color} text-sm`}>
                <p className="font-medium leading-relaxed mb-3">"{t.quote}"</p>
                <p className="font-mono text-xs text-gray-600 font-bold">— {t.author}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* ── FOOTER ── */}
      <footer className="border-t-4 border-black bg-black text-white mt-12 py-6">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="font-mono text-xs text-gray-400">
            © 2026 ProcrastiNation Inc. All rights reserved but never exercised.
            <br />
            Patent Pending: "Method and System for Reducing Output While Maximizing the Appearance of Effort" (USPTO App. #69420-IDLE)
          </p>
        </div>
      </footer>
    </div>
  );
}
