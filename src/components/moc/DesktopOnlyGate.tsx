import { useState } from "react";
import { Monitor, Copy, Check, ShieldCheck } from "lucide-react";
import logoLight from "@/assets/moc-logo-light.svg";

export function DesktopOnlyGate() {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    if (typeof window !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Desktop view recommended"
      className="desktop-only-gate fixed inset-0 z-[999999] flex-col justify-between overflow-y-auto bg-black text-white p-6 sm:p-10 select-none"
    >
      {/* Top Bar: Official Logo & Status Indicator */}
      <div className="flex items-center justify-between border-b border-white/10 pb-5">
        <img
          src={logoLight}
          alt="M | O | C Cancer Care & Research Centre"
          className="h-10 sm:h-12 w-auto"
          width={73}
          height={44}
        />
        <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-white/80">
          <span className="size-2 rounded-full bg-[#54ae47] animate-pulse" aria-hidden />
          Desktop Experience
        </span>
      </div>

      {/* Center Content: Professional Desktop Request */}
      <div className="my-auto py-10 flex flex-col items-center text-center max-w-lg mx-auto">
        <div className="relative mb-6">
          <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-[#41b2de]/20 via-[#54ae47]/20 to-[#fdb913]/20 blur-xl opacity-70" />
          <div className="relative grid size-20 sm:size-24 place-items-center rounded-2xl border border-white/15 bg-zinc-950/90 shadow-2xl">
            <Monitor className="size-10 sm:size-12 text-[#41b2de]" strokeWidth={1.5} aria-hidden />
          </div>
        </div>

        <h1 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-white">
          Please view on a desktop browser
        </h1>

        {/* <p className="mt-4 text-[15px] sm:text-[16px] leading-relaxed text-zinc-300 font-sans">
          The <span className="font-semibold text-white">M | O | C</span> website is designed for desktop and laptop displays to give patients, families, and clinical partners the clearest view of our specialist oncologists, care pathways, and day-care centres.
        </p> */}

        <p className="mt-2 text-[15px] sm:text-[16px] text-zinc-400">
          For the complete interactive experience, please open this website on your desktop or laptop.
        </p>


      </div>
    </div>
  );
}
