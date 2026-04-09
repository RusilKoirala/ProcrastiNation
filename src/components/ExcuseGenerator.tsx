"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getRandomExcuse } from "@/lib/excuses";

interface ExcuseGeneratorProps {
  onExcuseGenerated: () => void;
}

export default function ExcuseGenerator({ onExcuseGenerated }: ExcuseGeneratorProps) {
  const [excuse, setExcuse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [count, setCount] = useState(0);

  const generate = () => {
    setLoading(true);
    setExcuse(null);
    setCopied(false);
    setTimeout(() => {
      const newExcuse = getRandomExcuse();
      setExcuse(newExcuse);
      setLoading(false);
      const newCount = count + 1;
      setCount(newCount);
      onExcuseGenerated();
    }, 1500);
  };

  const copyToClipboard = () => {
    if (!excuse) return;
    navigator.clipboard.writeText(excuse).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="neo-card bg-[#C8F7C5]">
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🤖</span>
          <h2 className="neo-title">AI Excuse Generator</h2>
        </div>
        <div className="flex flex-col items-end gap-1">
          <Badge className="bg-black text-white text-[10px] px-2 py-0.5 rounded-none border-0 font-mono">
            ProcrastiAI™ v0.0.1-beta
          </Badge>
          <Badge className="bg-[#FF6B6B] text-white text-[10px] px-2 py-0.5 rounded-none border-0 font-mono">
            NOT REAL AI
          </Badge>
        </div>
      </div>
      <p className="neo-desc mb-4">
        Generate a scientifically-unvalidated, professionally-worded reason for why
        you cannot possibly start working right now.
      </p>

      <button
        id="generate-excuse-btn"
        onClick={generate}
        disabled={loading}
        className="neo-btn bg-black text-white w-full mb-4 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? "🧠 AI is thinking very hard..." : "⚡ Generate Excuse"}
      </button>

      {loading && (
        <div className="border-2 border-black p-4 bg-white">
          <div className="flex gap-1 justify-center">
            {[0, 1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="w-3 h-3 bg-black rounded-full animate-bounce"
                style={{ animationDelay: `${i * 0.15}s` }}
              />
            ))}
          </div>
          <p className="text-center text-xs font-mono mt-2 text-gray-500">
            Consulting the universe...
          </p>
        </div>
      )}

      {excuse && !loading && (
        <div className="border-2 border-black p-4 bg-white relative">
          <div className="absolute -top-3 left-3 bg-[#FDFD96] border-2 border-black px-2 text-xs font-bold">
            EXCUSE #{count}
          </div>
          <p className="font-medium text-sm leading-relaxed mt-1">"{excuse}"</p>
          <div className="mt-3 flex gap-2">
            <button
              onClick={copyToClipboard}
              className="neo-btn-sm bg-[#C8F7C5] text-black text-xs"
            >
              {copied ? "✅ Copied for Slack!" : "📋 Copy for Slack"}
            </button>
            <button
              onClick={generate}
              className="neo-btn-sm bg-[#FDFD96] text-black text-xs"
            >
              🔄 Another One
            </button>
          </div>
        </div>
      )}

      <p className="text-[10px] font-mono text-gray-500 mt-3 text-center">
        ⚠️ ProcrastiAI™ is not responsible for career consequences. Use responsibly. Or don't.
      </p>
    </div>
  );
}
