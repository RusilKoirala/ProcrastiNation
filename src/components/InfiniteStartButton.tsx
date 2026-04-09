"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

type Stage = "idle" | "confirm1" | "confirm2" | "quote" | "loading" | "reset";

const quotes = [
  "\"The secret to getting ahead is getting started.\" – Mark Twain (You're already behind.)",
  "\"A journey of a thousand miles begins with a single step.\" – Lao Tzu (You haven't taken it.)",
  "\"Done is better than perfect.\" – Sheryl Sandberg (Neither applies here.)",
  "\"You miss 100% of the shots you don't take.\" – Wayne Gretzky (You haven't aimed yet.)",
];

interface InfiniteStartButtonProps {
  onDodge: () => void;
}

export default function InfiniteStartButton({ onDodge }: InfiniteStartButtonProps) {
  const [stage, setStage] = useState<Stage>("idle");
  const [progress, setProgress] = useState(0);
  const [quote] = useState(() => quotes[Math.floor(Math.random() * quotes.length)]);

  useEffect(() => {
    if (stage !== "loading") return;
    setProgress(0);
    const start = Date.now();
    const duration = 4000;
    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const pct = Math.min((elapsed / duration) * 100, 99);
      setProgress(pct);
      if (elapsed >= duration) {
        clearInterval(interval);
        setStage("reset");
        toast("📅 Let's try again tomorrow.", {
          description: "Your focus was rescheduled to next quarter.",
          duration: 5000,
        });
      }
    }, 50);
    return () => clearInterval(interval);
  }, [stage]);

  const handleReset = () => {
    onDodge();
    setStage("idle");
    setProgress(0);
  };

  return (
    <div className="neo-card bg-[#FDFD96]">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-2xl">🚀</span>
        <h2 className="neo-title">The Start Button</h2>
      </div>
      <p className="neo-desc mb-5">
        The mythical button that will finally get you working. One click away from total
        productivity.
      </p>

      <button
        id="start-working-btn"
        onClick={() => setStage("confirm1")}
        className="neo-btn bg-black text-white w-full text-lg py-4"
      >
        🎯 START WORKING
      </button>

      {/* First confirmation */}
      <Dialog open={stage === "confirm1"} onOpenChange={() => handleReset()}>
        <DialogContent className="neo-dialog">
          <DialogHeader>
            <DialogTitle className="neo-dialog-title">⚠️ Are you sure?</DialogTitle>
            <DialogDescription className="neo-dialog-desc">
              Starting work is an irreversible action. It may result in actual productivity.
              Please confirm you understand the risks.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2">
            <Button variant="outline" className="neo-btn-outline" onClick={handleReset}>
              Not Really
            </Button>
            <Button className="neo-btn bg-[#FF6B6B] text-white" onClick={() => setStage("confirm2")}>
              I Accept the Consequences
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Second confirmation */}
      <Dialog open={stage === "confirm2"} onOpenChange={() => handleReset()}>
        <DialogContent className="neo-dialog">
          <DialogHeader>
            <DialogTitle className="neo-dialog-title">🤔 Are you REALLY sure?</DialogTitle>
            <DialogDescription className="neo-dialog-desc">
              Our AI has detected that you might regret this. Working now conflicts with
              your scheduled staring-at-the-ceiling session at 3:00 PM.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2">
            <Button variant="outline" className="neo-btn-outline" onClick={handleReset}>
              You're Right, Abort
            </Button>
            <Button className="neo-btn bg-[#00C897] text-white" onClick={() => setStage("quote")}>
              Proceed Anyway
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Motivational Quote */}
      <Dialog open={stage === "quote"} onOpenChange={() => handleReset()}>
        <DialogContent className="neo-dialog">
          <DialogHeader>
            <DialogTitle className="neo-dialog-title">✨ Before You Begin...</DialogTitle>
            <DialogDescription className="neo-dialog-desc text-base leading-relaxed">
              {quote}
            </DialogDescription>
          </DialogHeader>
          <div className="mt-2 p-3 bg-[#FDFD96] border-2 border-black font-bold text-sm text-center">
            Take a moment. Let this sink in.
          </div>
          <DialogFooter>
            <Button className="neo-btn bg-black text-white w-full" onClick={() => setStage("loading")}>
              OK I'm Inspired, Let's Go
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Loading overlay */}
      <Dialog open={stage === "loading" || stage === "reset"} onOpenChange={() => {}}>
        <DialogContent className="neo-dialog [&>button]:hidden">
          <DialogHeader>
            <DialogTitle className="neo-dialog-title">⚙️ Initializing Productivity...</DialogTitle>
            <DialogDescription className="neo-dialog-desc">
              Calibrating focus. Warming up motivation engines. Please wait.
            </DialogDescription>
          </DialogHeader>
          <div className="my-4 space-y-2">
            <Progress value={progress} className="h-4 border-2 border-black" />
            <p className="text-xs font-mono text-center">
              {progress < 30 && "Loading ambition..."}
              {progress >= 30 && progress < 60 && "Defragmenting willpower..."}
              {progress >= 60 && progress < 85 && "Reticulating existential splines..."}
              {progress >= 85 && "Almost productive... (99% forever)"}
            </p>
          </div>
          {stage === "reset" && (
            <Button className="neo-btn bg-[#FF6B6B] text-white w-full" onClick={handleReset}>
              Let's Try Again Tomorrow 😔
            </Button>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
