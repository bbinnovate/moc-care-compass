import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronDown, Menu, X, MapPin, Globe, ArrowRight, Droplet, ShieldPlus, Target, Dna, Flower2, Salad, Stethoscope } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/moc-logo.svg";
import careSpace from "@/assets/care-space.jpg";
import { services, moreServices } from "@/data/content";
import { useAppointment } from "./AppointmentModal";

const nav = [
  { label: "Find a Doctor", href: "/#specialists" },
  { label: "Our Centres", href: "/#centres" },
  { label: "Patient Resources", href: "/#resources" },
  { label: "About MOC", href: "/#why" },
];
const icons = [Droplet, ShieldPlus, Target, Dna, Flower2, Salad];
const languages = ["English", "हिन्दी", "मराठी", "ગુજરાતી"];

function LanguageSelect({ id }: { id: string }) {
  const [lang, setLang] = useState("English");
  return (
    <div className="flex items-center gap-1.5">
      <Globe className="size-3.5 text-primary" aria-hidden />
      <label htmlFor={id} className="sr-only">Language (preview — content stays in English)</label>
      <select id={id} value={lang} onChange={(e) => setLang(e.target.value)} className="cursor-pointer bg-transparent text-[13px] font-medium text-ink outline-none">
        {languages.map((l) => <option key={l}>{l}</option>)}
      </select>
      {lang !== "English" && <span className="text-[11px] text-muted-foreground">Translation preview</span>}
    </div>
  );
}

export function Header() {
  const { open } = useAppointment();
  const [mobile, setMobile] = useState(false);
  const [mega, setMega] = useState(false);
  const megaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && (setMega(false), setMobile(false));
    const onClick = (e: MouseEvent) => megaRef.current && !megaRef.current.contains(e.target as Node) && setMega(false);
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => { document.removeEventListener("keydown", onKey); document.removeEventListener("mousedown", onClick); };
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur">
      <div className="hidden border-b bg-paper text-[13px] text-muted-foreground md:block">
        <div className="container-moc flex h-9 items-center justify-between">
          <p>Medical oncology &amp; hemato-oncology centres across India</p>
          <div className="flex items-center gap-6">
            <a href="/#centres" className="inline-flex items-center gap-1.5 hover:text-foreground"><MapPin className="size-3.5" aria-hidden />Call your nearest centre</a>
            {/* PLACEHOLDER: no central helpline is published on the current site. */}
            <LanguageSelect id="lang-top" />
          </div>
        </div>
      </div>
      <div ref={megaRef} className="container-moc relative flex h-[80px] items-center justify-between gap-6">
        <Link to="/" aria-label="MOC Cancer Care & Research Centre — home" className="shrink-0">
          <img src={logo} alt="M | O | C Cancer Care & Research Centre" className="h-13 w-auto" width={73} height={44} />
        </Link>
        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          <Button variant="ghost" className="gap-1 px-3 text-[14px] font-medium hover:text-primary" aria-expanded={mega} aria-controls="mega" onClick={() => setMega((m) => !m)}>
            Treatments <ChevronDown className={`size-4 transition ${mega ? "rotate-180" : ""}`} aria-hidden />
          </Button>
          {nav.map((n) => <a key={n.label} href={n.href} className="rounded px-3 py-2 text-[14px] font-medium hover:text-primary">{n.label}</a>)}
        </nav>
        <div className="flex items-center gap-2">
          <Button onClick={() => open()} className="hidden rounded-full px-5 text-sm sm:inline-flex">Request an Appointment</Button>
          <Button variant="ghost" size="icon" className="lg:hidden" aria-label={mobile ? "Close menu" : "Open menu"} aria-expanded={mobile} aria-controls="mobile-nav" onClick={() => setMobile((m) => !m)}>
            {mobile ? <X className="size-6" /> : <Menu className="size-6" />}
          </Button>
        </div>
        {mega && (
          <div id="mega" className="absolute inset-x-5 top-full mt-2 hidden grid-cols-[1.7fr_1fr_1fr] overflow-hidden rounded-2xl border bg-card shadow-lift animate-rise md:inset-x-10 lg:grid">
            <div className="p-8">
              <p className="text-sm font-semibold text-ink">Cancer treatments</p>
              <ul className="mt-4 grid grid-cols-2 gap-1">
                {services.map((s, i) => {
                  const Icon = icons[i] ?? Stethoscope;
                  return <li key={s.slug}><Link to="/treatments" onClick={() => setMega(false)} className="flex gap-3 rounded-lg p-3 hover:bg-accent">
                    <span className="grid size-9 shrink-0 place-items-center rounded-full bg-paper text-primary"><Icon className="size-4" aria-hidden /></span>
                    <span><span className="block text-[15px] font-semibold text-ink">{s.title}</span><span className="mt-0.5 line-clamp-1 block text-xs text-muted-foreground">{s.text}</span></span>
                  </Link></li>;
                })}
              </ul>
            </div>
            <div className="border-l bg-paper/50 p-8">
              <p className="text-sm font-semibold text-ink">Also at MOC</p>
              <ul className="mt-4 space-y-3 text-[14px] text-muted-foreground">{moreServices.map((s) => <li key={s}>{s}</li>)}</ul>
              <p className="mt-6 text-xs text-muted-foreground">Surgery &amp; radiation via partner hospitals.</p>
            </div>
            <Link to="/treatments" onClick={() => setMega(false)} className="group relative block min-h-64">
              <img src={careSpace} alt="" className="absolute inset-0 size-full object-cover" loading="lazy" />
              <span className="image-shade absolute inset-0" aria-hidden />
              <span className="absolute bottom-6 left-6 right-6 font-display text-lg font-semibold text-ink-foreground">All treatments &amp; services <ArrowRight className="inline size-4 transition group-hover:translate-x-1" aria-hidden /></span>
            </Link>
          </div>
        )}
      </div>
      {mobile && (
        <nav id="mobile-nav" aria-label="Mobile" className="max-h-[calc(100vh-80px)] overflow-y-auto border-t bg-background lg:hidden">
          <div className="container-moc py-4">
            <details className="border-b">
              <summary className="flex cursor-pointer items-center justify-between py-3.5 text-lg font-medium">Treatments <ChevronDown className="size-5" aria-hidden /></summary>
              <ul className="pb-3">{services.map((s) => <li key={s.slug}><Link to="/treatments" onClick={() => setMobile(false)} className="block py-2 pl-3 text-muted-foreground">{s.title}</Link></li>)}</ul>
            </details>
            {nav.map((n) => <a key={n.label} href={n.href} onClick={() => setMobile(false)} className="block border-b py-3.5 text-lg font-medium">{n.label}</a>)}
            <div className="border-b py-3.5"><LanguageSelect id="lang-mobile" /></div>
            <Button onClick={() => { setMobile(false); open(); }} className="mt-5 w-full rounded-full">Request an Appointment</Button>
          </div>
        </nav>
      )}
    </header>
  );
}
