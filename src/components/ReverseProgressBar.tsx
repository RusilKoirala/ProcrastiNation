"use client";

import { useState } from "react";
import { toast } from "sonner";

export default function ReverseProgressBar() {
  const [progress, setProgress] = useState(0);
  const [clicks, setClicks] = useState(0);

  const makeProgress = () => {
    setProgress((prev) => {
      let next: number;

      if (prev >= 99) {
        toast("✨ Perfection takes time.", {
          description: "Progress reset to 1%. Rome wasn't built in a day. Neither will this.",
          duration: 5000,
        });
        return 1;
      }

      if (prev < 80) {
        // Normal forward progress, small random jump
        next = prev + Math.random() * 4 + 1;
      } else if (prev >= 80 && prev < 95) {
        // Secretly subtract a tiny bit
        next = prev - Math.random() * 1.5;
      } else {
        // 95–99 range: creep toward 99 very slowly
        next = prev + 0.2;
      }

      return Math.min(Math.max(next, 0), 99);
    });
    setClicks((c) => c + 1);
  };

  const getBarColor = () => {
    if (progress < 50) return "#00C897";
    if (progress < 80) return "#FDFD96";
    if (progress < 95) return "#FF9F43";
    return "#FF6B6B";
  };

  const getLabel = () => {
    if (progress < 10) return "Haven't really started yet...";
    if (progress < 30) return "Gaining momentum! (False alarm)";
    if (progress < 60) return "Making great progress! (Allegedly)";
    if (progress < 80) return "Almost there! (Statistically unlikely)";
    if (progress < 90) return "Hmm. Something feels off...";
    if (progress < 95) return "Wait, is this going backwards?";
    if (progress < 99) return "So close... so very close...";
    return "💀 Perfection Protocol Engaged";
  };

  return (
    <div className="neo-card bg-[#E8D5FF]">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-2xl">📊</span>
        <h2 className="neo-title">Progress Tracker</h2>
      </div>
      <p className="neo-desc mb-4">
        Track your project progress with our patented Reverse-Growth™ algorithm.
        The closer you get to done, the further you are from done.
      </p>

      {/* Progress display */}
      <div className="border-4 border-black p-4 bg-white mb-4" style={{ boxShadow: "4px 4px 0px #000" }}>
        <div className="flex justify-between items-baseline mb-2">
          <span className="font-bold text-sm">Project: {'"'} The Thing {'"'}</span>
          <span
            className="font-mono font-black text-2xl tabular-nums transition-all duration-500"
            style={{ color: getBarColor() }}
          >
            {progress.toFixed(1)}%
          </span>
        </div>

        <div className="h-6 border-2 border-black bg-gray-100 overflow-hidden mb-2">
          <div
            className="h-full transition-all duration-700 ease-in-out relative"
            style={{ width: `${progress}%`, backgroundColor: getBarColor() }}
          >
            {progress > 10 && (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-[10px] font-bold text-black opacity-70">
                  {progress >= 80 ? "REGRESSING" : "PROGRESSING"}
                </span>
              </div>
            )}
          </div>
        </div>

        <p className="text-xs font-mono text-gray-600 text-center">{getLabel()}</p>
      </div>

      <button
        id="make-progress-btn"
        onClick={makeProgress}
        className="neo-btn bg-black text-white w-full mb-3"
      >
        {progress >= 80 ? "🪄 Apply More Effort (lol)" : "💪 Make Progress"}
      </button>

      <div className="flex gap-2 text-xs font-mono text-gray-600">
        <span className="border border-black px-2 py-1">Clicks: {clicks}</span>
        <span className="border border-black px-2 py-1">
          {progress >= 80 ? "⚠️ Sabotage Mode: ON" : "✅ Good Faith Mode: ON"}
        </span>
        {progress >= 95 && (
          <span className="border-2 border-black px-2 py-1 bg-[#FF6B6B] text-white font-bold animate-pulse">
            RESET IMMINENT
          </span>
        )}
      </div>
    </div>
  );
}
