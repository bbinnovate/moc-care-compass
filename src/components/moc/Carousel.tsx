import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function useCarousel() {
  const ref = useRef<HTMLUListElement>(null);
  const [state, setState] = useState({ progress: 0, start: true, end: false });
  const update = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setState({ progress: max > 0 ? el.scrollLeft / max : 1, start: el.scrollLeft < 4, end: el.scrollLeft >= max - 4 });
  }, []);
  useEffect(() => {
    const el = ref.current;
    update();
    el?.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => { el?.removeEventListener("scroll", update); window.removeEventListener("resize", update); };
  }, [update]);
  const scroll = (dir: 1 | -1) => {
    const el = ref.current;
    if (!el) return;
    const card = el.querySelector("li");
    const step = card ? card.getBoundingClientRect().width + 24 : el.clientWidth * 0.8;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: dir * step, behavior: reduce ? "auto" : "smooth" });
  };
  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight") { e.preventDefault(); scroll(1); }
    if (e.key === "ArrowLeft") { e.preventDefault(); scroll(-1); }
  };
  return { ref, ...state, scroll, onKeyDown };
}

export function CarouselControls({ c, label }: { c: ReturnType<typeof useCarousel>; label: string }) {
  return (
    <div className="flex items-center gap-5">
      <div className="hidden h-[3px] w-32 overflow-hidden rounded-full bg-border sm:block" aria-hidden>
        <div className="h-full rounded-full bg-primary transition-[width] duration-300" style={{ width: `${Math.max(12, c.progress * 100)}%` }} />
      </div>
      <div className="flex gap-2">
        <Button variant="outline" size="icon" className="size-11 rounded-full border-primary/25 text-primary" aria-label={`Previous ${label}`} disabled={c.start} onClick={() => c.scroll(-1)}><ArrowLeft /></Button>
        <Button variant="outline" size="icon" className="size-11 rounded-full border-primary/25 text-primary" aria-label={`Next ${label}`} disabled={c.end} onClick={() => c.scroll(1)}><ArrowRight /></Button>
      </div>
    </div>
  );
}
