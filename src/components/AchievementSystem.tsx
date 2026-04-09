"use client";

import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { achievements, type AchievementId } from "@/lib/achievements";

interface AchievementSystemProps {
  unlocked: Set<AchievementId>;
}

export default function AchievementSystem({ unlocked }: AchievementSystemProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger
          id="achievements-btn"
          className="relative neo-btn bg-[#FDFD96] text-black border-2 border-black px-2 py-1 sm:px-3 sm:py-1.5"
        >
            <span className="hidden sm:inline">🏅 Achievements</span>
            <span className="sm:hidden text-lg">🏅</span>
            {unlocked.size > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#FF6B6B] text-white text-[10px] sm:text-xs w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center border-2 border-black font-bold">
                {unlocked.size}
              </span>
            )}
        </SheetTrigger>

        <SheetContent className="bg-white border-l-4 border-black w-[400px]">
          <SheetHeader>
            <SheetTitle className="font-black text-xl uppercase tracking-tight flex items-center gap-2">
              🏅 Hall of Shame
            </SheetTitle>
            <p className="text-sm text-gray-500 font-mono">
              {unlocked.size}/{achievements.length} achievements unlocked — mostly by accident.
            </p>
          </SheetHeader>

          <div className="mt-6 space-y-3 overflow-y-auto max-h-[calc(100vh-160px)] pr-1">
            {achievements.map((ach) => {
              const isUnlocked = unlocked.has(ach.id);
              return (
                <div
                  key={ach.id}
                  className={`border-2 border-black p-3 transition-all ${
                    isUnlocked
                      ? "bg-[#FDFD96]"
                      : "bg-gray-100 opacity-50 grayscale"
                  }`}
                  style={isUnlocked ? { boxShadow: "3px 3px 0px #000" } : {}}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-3xl">{ach.emoji}</span>
                    <div className="flex-1">
                      <p className="font-black text-sm uppercase tracking-wide">
                        {isUnlocked ? ach.name : "???"}
                      </p>
                      <p className="text-xs text-gray-600 mt-0.5">
                        {isUnlocked ? ach.description : "Keep procrastinating to unlock."}
                      </p>
                      {isUnlocked && (
                        <p className="text-xs italic text-gray-500 mt-1 border-l-2 border-black pl-2">
                          {ach.secret}
                        </p>
                      )}
                    </div>
                    {isUnlocked && (
                      <span className="text-xs font-mono bg-black text-white px-2 py-0.5">
                        UNLOCKED
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-4 p-3 border-2 border-black bg-[#FFD6D6] text-xs font-mono text-center">
            These achievements have no real-world value. <br />
            Congrats anyway.
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
