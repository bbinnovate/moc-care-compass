import { useEffect, useMemo, useState, type FormEvent, type ReactNode } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import * as Accordion from "@radix-ui/react-accordion";
import {
  Stethoscope, MapPin, Users, Droplet, ShieldPlus, Target, Dna, Flower2, Salad, Home, Microscope, FlaskConical, Sparkles, Armchair,
  Search, Phone, Navigation, ArrowRight, ArrowLeft, Plus, Play, X, Hospital, Quote, Star,
} from "lucide-react";
import hero from "@/assets/moc-hopeful-care.jpg";
import tChemo from "@/assets/t-chemo.jpg";
import tImmuno from "@/assets/t-immuno.jpg";
import tTargeted from "@/assets/t-targeted.jpg";
import tGenetic from "@/assets/t-genetic.jpg";
import tPalliative from "@/assets/t-palliative.jpg";
import tSupportive from "@/assets/t-supportive.jpg";
import careTeam from "@/assets/care-team.jpg";
import careSpace from "@/assets/care-space.jpg";
import gReception from "@/assets/g-reception.jpg";
import gLounge from "@/assets/g-lounge.jpg";
import gConsult from "@/assets/g-consult.jpg";
import journeyDoctorPatient from "@/assets/journey-doctor-patient.jpg";
const tSurvivor1 = "/images/img1.jpg";
const tSurvivor2 = "/images/img2.jpg";
const tSurvivor3 = "/images/img3.jpg";
const tSurvivor4 = "/images/img4.jpg";
import logoLight from "@/assets/moc-logo-light.svg";
import { Button } from "@/components/ui/button";
import { centrePhone, searchCentres } from "@/lib/directory";
import { services, journey, centres, cities, articles, faqs, differentiators, stats } from "@/data/content";
import { useAppointment } from "./AppointmentModal";
import { CarouselControls, useCarousel } from "./Carousel";
export { DoctorDirectory as Specialists } from "./DoctorDirectory";

const CENTRE_SEARCH_EVENT = "moc:centre-search";

const Section = ({ id, className = "", children, labelledBy }: { id?: string; className?: string; children: ReactNode; labelledBy?: string }) => (
  <section id={id} aria-labelledby={labelledBy} className={`relative isolate overflow-hidden py-20 md:py-28 ${className}`}>
    <div className="container-moc relative">{children}</div>
  </section>
);

const Heading = ({ title, intro, id }: { title: ReactNode; intro?: string; id: string }) => (
  <div className="max-w-2xl">
    <h2 id={id} className="text-[34px] leading-[1.1] md:text-[52px]">{title}</h2>
    {intro && <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-muted-foreground">{intro}</p>}
  </div>
);

const Tag = ({ children }: { children: ReactNode }) => <span className="demo-tag">{children}</span>;

/* 2 · Hero */
export function Hero() {
  const [q, setQ] = useState("");
  const submit = (e: FormEvent) => {
    e.preventDefault();
    window.dispatchEvent(new CustomEvent(CENTRE_SEARCH_EVENT, { detail: q }));
    document.getElementById("centres")?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  };
  return (
    <section className="relative overflow-hidden bg-paper">
      <img src={hero} alt="A doctor in a warm conversation with a patient and her daughter" width={1920} height={1024} className="hero-photo" />
      <div className="hero-wash" aria-hidden />
      <div className="container-moc hero-content">
        <div className="hero-copy animate-rise">
          <h1 className="text-[42px] leading-[1.05] md:text-[68px]">Cancer care, close to home.</h1>
          <p className="mt-6 max-w-md text-[18px] leading-relaxed text-ink">Specialist oncology with guidance you can understand — for you and the people beside you.</p>
          <form role="search" onSubmit={submit} className="mt-10 max-w-xl">
            <label htmlFor="hero-centre" className="sr-only">Enter area, city or pincode</label>
            <div className="flex items-center gap-2 rounded-full border border-input bg-card p-1.5 pl-5 shadow-lift focus-within:border-primary">
              <MapPin className="size-5 shrink-0 text-primary" aria-hidden />
              <input id="hero-centre" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Enter area, city or pincode" className="h-12 min-w-0 flex-1 bg-transparent text-[16px] outline-none placeholder:text-muted-foreground/70" />
              <Button type="submit" className="h-12 rounded-full px-6 whitespace-nowrap shrink-0"><Search className="sm:hidden" aria-hidden /><span className="hidden sm:inline">Find center near you</span><span className="sr-only sm:hidden">Find center near you</span></Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

/* 3 · Why MOC */
const diffIcons = [Stethoscope, Home, Armchair, Microscope, Users, Flower2, FlaskConical, Sparkles];

export function WhyMoc() {
  const c = useCarousel();
  return (
    <Section id="why" labelledBy="why-h">
      <div className="deco-blob -right-40 -top-40" aria-hidden />
      <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-end">
        <Heading
          id="why-h"
          title={
            <>
              What makes{" "}
              <span className="whitespace-nowrap font-bold">
                M<span className="mx-1 text-primary/40 font-light select-none" aria-hidden>|</span>O<span className="mx-1 text-primary/40 font-light select-none" aria-hidden>|</span>C
              </span>{" "}
              different
            </>
          }
          intro="Specialist care and the support around it, brought closer to where you live."
        />
        <dl className="grid grid-cols-3 gap-6 border-t border-primary/20 pt-6">
          {stats.map((s) => (
            <div key={s.label}>
              <dt className="sr-only">{s.label}</dt>
              <dd className="font-display text-[44px] font-semibold leading-none text-primary md:text-[56px]">{s.value}</dd>
              <dd className="mt-2 text-sm font-semibold text-ink">{s.label}</dd>
              <dd className="mt-1 text-xs text-muted-foreground">{s.note}</dd>
            </div>
          ))}
        </dl>
      </div>
      <div className="mt-14 flex justify-end"><CarouselControls c={c} label="differentiator" /></div>
      <ul ref={c.ref} tabIndex={0} onKeyDown={c.onKeyDown} aria-label="What makes M | O | C different — use arrow keys to scroll" className="no-scrollbar mt-6 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-2">
        {differentiators.map((d, i) => {
          const Icon = diffIcons[i] ?? Stethoscope;
          return (
            <li key={d.title} className="flex min-h-[260px] w-[78%] shrink-0 snap-start flex-col justify-between rounded-xl bg-paper p-7 sm:w-[44%] lg:w-[calc((100%-72px)/4)]">
              <div className="flex items-start justify-between">
                <span className="grid size-12 place-items-center rounded-full bg-card text-primary"><Icon className="size-5" strokeWidth={1.6} aria-hidden /></span>
                <span className="font-display text-sm font-semibold text-primary/50">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <div>
                <h3 className="text-[22px] leading-tight">{d.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{d.text}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}

/* 4 · Treatments */
const treatmentCards = [
  ...services.map((s, i) => ({ title: s.title, text: s.text, img: [tChemo, tImmuno, tTargeted, tGenetic, tPalliative, tSupportive][i] ?? tChemo, icon: [Droplet, ShieldPlus, Target, Dna, Flower2, Salad][i] ?? Stethoscope, partner: false })),
  { title: "Surgery & Radiation", text: "Not delivered at MOC centres — coordinated through partner hospitals.", img: careTeam, icon: Hospital, partner: true },
];

export function Treatments() {
  const c = useCarousel();
  return (
    <Section id="treatments" labelledBy="treat-h" className="bg-paper">
      <div className="flex flex-wrap items-end justify-between gap-8">
        <Heading id="treat-h" title="Treatments & services" intro="Medical oncology and hemato-oncology, with care that continues beyond the infusion chair." />
        <CarouselControls c={c} label="treatment" />
      </div>
      <ul ref={c.ref} tabIndex={0} onKeyDown={c.onKeyDown} aria-label="Treatments — use arrow keys to scroll" className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-2">
        {treatmentCards.map(({ title, text, img, icon: Icon, partner }) => (
          <li key={title} className="w-[85%] shrink-0 snap-start sm:w-[calc((100%-24px)/2)] md:w-[calc((100%-48px)/3)] lg:w-[calc((100%-72px)/4)]">
            <a href="/treatments" className="group block">
              <div className="relative aspect-[4/5] overflow-hidden rounded-xl">
                <img src={img} alt="" loading="lazy" width={960} height={1200} className="size-full object-cover transition duration-700 group-hover:scale-[1.04]" />
                <span className="absolute left-4 top-4 grid size-11 place-items-center rounded-full bg-card text-primary"><Icon className="size-5" strokeWidth={1.7} aria-hidden /></span>
                {partner && <span className="absolute right-4 top-4 rounded-full bg-card px-3 py-1 text-xs font-semibold text-ink">Via partner hospitals</span>}
              </div>
              <div className="mt-5 flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-[24px] leading-tight">{title}</h3>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-muted-foreground">{text}</p>
                </div>
                <ArrowRight className="mt-2 size-5 shrink-0 text-primary transition group-hover:translate-x-1" aria-hidden />
              </div>
            </a>
          </li>
        ))}
      </ul>
    </Section>
  );
}

/* 5 · Journey */
const journeySteps = [
  {
    step: "01",
    line1: "Get an expert",
    line2: "doctor coach",
    badgeBg: "bg-[#f3e8ff]",
    badgeText: "text-[#7c3aed]",
    badgeBorder: "border-[#e9d5ff]",
    cardBg: "bg-[#faf8ff] hover:bg-[#f5f0ff]",
    cardBorder: "border-[#ede9fe]",
    iconBg: "bg-[#ede9fe]",
    iconColor: "text-[#7c3aed]",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="size-5 sm:size-5.5" aria-hidden>
        {/* Doctor coach with cap/scrub and badge */}
        <path d="M9 3h6" />
        <path d="M10 2.5a2 2 0 0 1 4 0" />
        <circle cx="12" cy="7.5" r="3.5" />
        <path d="M5.5 21v-2a4.5 4.5 0 0 1 4.5-4.5h4a4.5 4.5 0 0 1 4.5 4.5v2" />
        <rect x="15" y="14" width="4.5" height="4.5" rx="1" fill="currentColor" fillOpacity="0.15" />
        <path d="M17.25 15.2v2.1M16.2 16.25h2.1" strokeWidth="1.6" />
      </svg>
    ),
  },
  {
    step: "02",
    line1: "Consult with the",
    line2: "best Oncologist",
    badgeBg: "bg-[#e0f2fe]",
    badgeText: "text-[#0284c7]",
    badgeBorder: "border-[#bae6fd]",
    cardBg: "bg-[#f5faff] hover:bg-[#ecf5ff]",
    cardBorder: "border-[#e0f2fe]",
    iconBg: "bg-[#e0f2fe]",
    iconColor: "text-[#0284c7]",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="size-5 sm:size-5.5" aria-hidden>
        {/* Doctor with stethoscope */}
        <circle cx="12" cy="7" r="3.5" />
        <path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
        <path d="M8 12.5v1.2a3.8 3.8 0 0 0 7.6 0v-1.2" />
        <circle cx="11.8" cy="17.2" r="1.3" fill="currentColor" />
      </svg>
    ),
  },
  {
    step: "03",
    line1: "Consult with",
    line2: "integrative experts",
    badgeBg: "bg-[#dcfce7]",
    badgeText: "text-[#059669]",
    badgeBorder: "border-[#bbf7d0]",
    cardBg: "bg-[#f2faf6] hover:bg-[#e7f7ef]",
    cardBorder: "border-[#d1fae5]",
    iconBg: "bg-[#d1fae5]",
    iconColor: "text-[#059669]",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="size-5 sm:size-5.5" aria-hidden>
        {/* Three people team */}
        <circle cx="12" cy="7.5" r="3" />
        <circle cx="5.5" cy="9.5" r="2.2" />
        <circle cx="18.5" cy="9.5" r="2.2" />
        <path d="M7.5 20.5v-1.5a3.5 3.5 0 0 1 3.5-3.5h2a3.5 3.5 0 0 1 3.5 3.5v1.5" />
        <path d="M2 20.5v-1a2.8 2.8 0 0 1 2.8-2.8h.6" />
        <path d="M22 20.5v-1a2.8 2.8 0 0 0-2.8-2.8h-.6" />
      </svg>
    ),
  },
  {
    step: "04",
    line1: "Reduce growth of",
    line2: "cancer cells",
    badgeBg: "bg-[#ffedd5]",
    badgeText: "text-[#d97706]",
    badgeBorder: "border-[#fed7aa]",
    cardBg: "bg-[#fffbf6] hover:bg-[#fef3e7]",
    cardBorder: "border-[#fed7aa]",
    iconBg: "bg-[#ffedd5]",
    iconColor: "text-[#d97706]",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="size-5 sm:size-5.5" aria-hidden>
        {/* Rosette ring of cancer cells */}
        <circle cx="12" cy="12" r="3" />
        <circle cx="12" cy="4.8" r="1.8" />
        <circle cx="18.2" cy="8.4" r="1.8" />
        <circle cx="18.2" cy="15.6" r="1.8" />
        <circle cx="12" cy="19.2" r="1.8" />
        <circle cx="5.8" cy="15.6" r="1.8" />
        <circle cx="5.8" cy="8.4" r="1.8" />
      </svg>
    ),
  },
  {
    step: "05",
    line1: "Join the most trusted",
    line2: "cancer community",
    badgeBg: "bg-[#fce7f3]",
    badgeText: "text-[#db2777]",
    badgeBorder: "border-[#fbcfe8]",
    cardBg: "bg-[#fdf6f9] hover:bg-[#fdeef5]",
    cardBorder: "border-[#fbcfe8]",
    iconBg: "bg-[#fce7f3]",
    iconColor: "text-[#db2777]",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="size-5 sm:size-5.5" aria-hidden>
        {/* Connected cancer community */}
        <circle cx="8" cy="8.5" r="2.8" />
        <circle cx="16" cy="8.5" r="2.8" />
        <circle cx="12" cy="6" r="2" />
        <path d="M3.5 20.5v-1.5a3.8 3.8 0 0 1 3.8-3.8h9.4a3.8 3.8 0 0 1 3.8 3.8v1.5" />
      </svg>
    ),
  },
  {
    step: "06",
    line1: "Regular guidance",
    line2: "from the experts",
    badgeBg: "bg-[#e0f2fe]",
    badgeText: "text-[#0284c7]",
    badgeBorder: "border-[#bae6fd]",
    cardBg: "bg-[#f2f8fd] hover:bg-[#e7f3fc]",
    cardBorder: "border-[#bae6fd]",
    iconBg: "bg-[#e0f2fe]",
    iconColor: "text-[#0284c7]",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="size-5 sm:size-5.5" aria-hidden>
        {/* Speech dialog bubble with lines */}
        <path d="M20.5 14.5a2 2 0 0 1-2 2H7.2l-3.7 3.5V5.5a2 2 0 0 1 2-2h13a2 2 0 0 1 2 2z" />
        <path d="M8 8.5h8" />
        <path d="M8 12h5.5" />
      </svg>
    ),
  },
  {
    step: "07",
    line1: "Become Cancer",
    line2: "free",
    badgeBg: "bg-[#dcfce7]",
    badgeText: "text-[#16a34a]",
    badgeBorder: "border-[#bbf7d0]",
    cardBg: "bg-[#f2fbf5] hover:bg-[#e7f9ec]",
    cardBorder: "border-[#bbf7d0]",
    iconBg: "bg-[#dcfce7]",
    iconColor: "text-[#16a34a]",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="size-5 sm:size-5.5" aria-hidden>
        {/* Heart icon */}
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
      </svg>
    ),
  },
];

export function Journey() {
  return (
    <section id="journey" aria-labelledby="journey-h" className="relative isolate overflow-hidden pt-16 pb-10 md:pt-24 md:pb-14 bg-[#fafbfc]">
      {/* Ambient background soft pastel blobs */}
      <div className="absolute -top-28 -left-24 w-[500px] h-[400px] rounded-[50%] bg-[#eeebff]/60 blur-3xl pointer-events-none" aria-hidden />
      <div className="absolute top-1/2 -right-28 w-[520px] h-[520px] rounded-full bg-[#f0f9ff]/70 blur-3xl pointer-events-none" aria-hidden />
      <div className="absolute -bottom-28 left-1/4 w-[500px] h-[500px] rounded-full bg-[#e8f8f0]/60 blur-3xl pointer-events-none" aria-hidden />

      <div className="container-moc relative z-10">
        <div className="grid gap-8 lg:gap-10 md:grid-cols-[5.6fr_4.4fr] lg:grid-cols-[6fr_4fr] items-center">
          {/* Left Column (60%): Heading, Subtitle & End-to-End Image */}
          <div className="flex flex-col">
            <div>
              <h2 id="journey-h" className="font-display text-[34px] leading-[1.1] md:text-[50px] font-semibold text-ink tracking-tight">
                Your treatment journey,<br className="hidden sm:inline" /> with us at every step.
              </h2>
              <p className="mt-4 max-w-xl text-[16px] md:text-[17px] leading-relaxed text-muted-foreground font-sans">
                From consultation to recovery, we provide personalised care, expert guidance and continuous support.
              </p>
            </div>

            {/* Doctor & Patient Photo */}
            <div className="relative mt-8 sm:mt-10 w-full overflow-hidden rounded-2xl">
              <img
                src={journeyDoctorPatient}
                alt="A compassionate female doctor consulting and warmly holding hands with a smiling cancer patient"
                width={1280}
                height={800}
                className="w-full h-auto object-cover object-center aspect-[16/10] sm:aspect-[16/9] lg:aspect-[16/9.5] rounded-2xl"
                loading="lazy"
              />
            </div>
          </div>

          {/* Right Column (40%): Timeline & 7 Steps */}
          <div className="relative w-full">
            {/* Continuous vertical timeline connector line */}
            <div
              className="absolute left-[21px] sm:left-[23px] top-6 bottom-6 w-[1.5px] bg-[#dbe4ef] pointer-events-none"
              aria-hidden
            />

            <ol className="relative flex flex-col gap-3 sm:gap-3.5 list-none m-0 p-0">
              {journeySteps.map((s) => (
                <li key={s.step} className="group relative flex items-center gap-3.5 sm:gap-4">
                  {/* Number Badge */}
                  <span
                    className={`relative z-10 flex size-11 sm:size-12 shrink-0 items-center justify-center rounded-full font-display text-[14px] sm:text-[15px] font-bold shadow-[0_2px_8px_rgba(0,0,0,0.02)] transition-all duration-300 group-hover:scale-105 border ${s.badgeBg} ${s.badgeText} ${s.badgeBorder}`}
                  >
                    {s.step}
                  </span>

                  {/* Step Pill Card */}
                  <div
                    className={`flex flex-1 items-center gap-3.5 sm:gap-4 rounded-[22px] sm:rounded-[26px] border py-2.5 sm:py-3 px-4 sm:px-5 shadow-[0_2px_8px_rgba(15,35,60,0.02)] transition-all duration-300 hover:shadow-[0_6px_20px_rgba(15,35,60,0.06)] hover:-translate-y-0.5 ${s.cardBg} ${s.cardBorder}`}
                  >
                    {/* Icon Container */}
                    <div
                      className={`flex size-11 sm:size-12 shrink-0 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-105 ${s.iconBg} ${s.iconColor}`}
                    >
                      {s.icon}
                    </div>

                    {/* Step Title: 17px, 2 lines */}
                    <div className="font-sans text-[17px] font-semibold text-[#1e293b] leading-[1.3]">
                      <span className="block">{s.line1}</span>
                      <span className="block">{s.line2}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

/* 7 · Infrastructure & gallery */
const gallery = [
  { src: gReception, w: 1600, h: 1008, title: "A welcoming reception", alt: "Bright reception desk with a smiling receptionist" },
  { src: gLounge, w: 1200, h: 912, title: "Calm waiting spaces", alt: "Waiting lounge with soft blue seating and daylight" },
  { src: gConsult, w: 1200, h: 912, title: "Private consultation rooms", alt: "Consultation room with desk, chairs and examination bed" },
];

export function Gallery() {
  const [open, setOpen] = useState<number | null>(null);
  const move = (d: number) => setOpen((o) => (o === null ? o : (o + d + gallery.length) % gallery.length));
  const current = open === null ? null : gallery[open];
  return (
    <Section id="spaces" labelledBy="spaces-h" className="bg-paper">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <Heading id="spaces-h" title="Spaces designed for comfort" intro="Bright, calm settings for consultations and day-care treatment." />
      </div>
      <div className="mt-12 grid gap-6 lg:grid-cols-[1.7fr_1fr]">
        {gallery.map((g, i) => (
          <button key={g.title} type="button" onClick={() => setOpen(i)} aria-label={`Open image: ${g.title}`} className={`group relative overflow-hidden rounded-xl text-left ${i === 0 ? "aspect-[4/3] lg:row-span-2 lg:aspect-auto" : "aspect-[16/10]"}`}>
            <img src={g.src} alt={g.alt} loading="lazy" width={g.w} height={g.h} className="absolute inset-0 size-full object-cover transition duration-700 group-hover:scale-[1.03]" />
            <span className="image-shade absolute inset-x-0 bottom-0 h-1/2" aria-hidden />
            <span className="absolute bottom-5 left-6 font-display text-xl font-semibold text-ink-foreground md:text-2xl">{g.title}</span>
          </button>
        ))}
      </div>
      <Dialog.Root open={open !== null} onOpenChange={(o) => !o && setOpen(null)}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-ink/85" />
          <Dialog.Content onKeyDown={(e) => { if (e.key === "ArrowRight") move(1); if (e.key === "ArrowLeft") move(-1); }} className="fixed left-1/2 top-1/2 z-50 w-[calc(100%-2rem)] max-w-5xl -translate-x-1/2 -translate-y-1/2">
            {current && <>
              <img src={current.src} alt={current.alt} className="max-h-[78vh] w-full rounded-xl object-cover" />
              <div className="mt-4 flex items-center justify-between gap-4 text-ink-foreground">
                <div><Dialog.Title className="font-display text-xl">{current.title}</Dialog.Title><Dialog.Description className="text-xs opacity-75">{(open ?? 0) + 1} / {gallery.length}</Dialog.Description></div>
                <div className="flex gap-2">
                  <Button size="icon" variant="outline" className="rounded-full" aria-label="Previous image" onClick={() => move(-1)}><ArrowLeft /></Button>
                  <Button size="icon" variant="outline" className="rounded-full" aria-label="Next image" onClick={() => move(1)}><ArrowRight /></Button>
                  <Dialog.Close asChild><Button size="icon" variant="outline" className="rounded-full" aria-label="Close gallery"><X /></Button></Dialog.Close>
                </div>
              </div>
            </>}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </Section>
  );
}

/* 8 · Centres (city filter only; hero search can pre-fill results) */
export function CentreFinder() {
  const { open } = useAppointment();
  const [city, setCity] = useState("All");
  const [heroQuery, setHeroQuery] = useState("");
  const [limit, setLimit] = useState(6);

  useEffect(() => {
    const onSearch = (e: Event) => {
      const q = String((e as CustomEvent).detail ?? "").trim();
      const r = searchCentres(centres, q);
      setLimit(6);
      if (!q) { setHeroQuery(""); setCity("All"); }
      else if (r.city) { setHeroQuery(""); setCity(r.city); }
      else { setHeroQuery(q); setCity("All"); }
    };
    window.addEventListener(CENTRE_SEARCH_EVENT, onSearch);
    return () => window.removeEventListener(CENTRE_SEARCH_EVENT, onSearch);
  }, []);

  const results = useMemo(() => heroQuery ? searchCentres(centres, heroQuery).matches : centres.filter((c) => city === "All" || c.city === city), [city, heroQuery]);
  const pick = (c: string) => { setCity(c); setHeroQuery(""); setLimit(6); };

  return (
    <Section id="centres" labelledBy="centres-h">
      <div className="deco-blob -left-48 top-10" aria-hidden />
      <Heading id="centres-h" title="33 Centers. Find the center near you" intro="Browse by city. Each centre lists its address, phone and directions." />
      <div className="mt-10 flex flex-wrap gap-2" role="group" aria-label="Filter centres by city">
        {["All", ...cities].map((c) => {
          const count = c === "All" ? centres.length : centres.filter((item) => item.city === c).length;
          return (
            <Button
              variant="outline"
              key={c}
              type="button"
              aria-pressed={!heroQuery && city === c}
              onClick={() => pick(c)}
              className={`rounded-full px-4 ${!heroQuery && city === c ? "border-primary bg-primary text-primary-foreground hover:bg-ink hover:text-primary-foreground" : "border-input bg-card hover:border-primary"}`}
            >
              {c} ({count})
            </Button>
          );
        })}
      </div>
      {heroQuery && (
        <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground" aria-live="polite">
          <span>Search results for “{heroQuery}” ({results.length}):</span>
          <Button variant="outline" size="sm" className="rounded-full border-primary/30 text-primary" onClick={() => pick("All")} aria-label={`Clear search: ${heroQuery}`}>
            Clear<X className="size-3.5" />
          </Button>
        </div>
      )}
      <ul className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {results.slice(0, limit).map((c) => {
          const phone = centrePhone(c.phone);
          return (
            <li key={c.name} className="flex flex-col rounded-xl border bg-card p-7 transition hover:border-primary/40 hover:shadow-soft">
              <p className="text-[13px] font-semibold text-primary">{c.city}</p>
              <h3 className="mt-1 text-[24px]">MOC {c.name}</h3>
              <p className="mt-3 flex-1 text-[15px] leading-relaxed text-muted-foreground">{c.address}</p>
              <div className="mt-6 flex flex-wrap items-center gap-2 border-t pt-5">
                {phone && <a href={`tel:${phone}`} className="btn-outline min-h-10 rounded-full px-4 text-sm"><Phone className="size-4" aria-hidden />Call</a>}
                {c.map && <a href={c.map} target="_blank" rel="noreferrer" className="btn-outline min-h-10 rounded-full px-4 text-sm"><Navigation className="size-4" aria-hidden />Directions</a>}
                <Button variant="link" onClick={() => open(c.name)} className="ml-auto px-0 text-sm">Enquire <ArrowRight aria-hidden /></Button>
              </div>
            </li>
          );
        })}
      </ul>
      {results.length === 0 && (
        <div className="rounded-xl border border-dashed bg-card p-10 text-center">
          <p className="font-display text-2xl text-ink">No centre matches “{heroQuery}”</p>
          <p className="mt-2 text-muted-foreground">Try a nearby city below or browse all centres.</p>
          <Button variant="outline" onClick={() => pick("All")} className="mt-5 rounded-full">Show all centres</Button>
        </div>
      )}
      {results.length > limit && (
        <div className="mt-10 text-center"><Button variant="outline" onClick={() => setLimit((l) => l + 9)} className="rounded-full">Show more centres ({results.length - limit})</Button></div>
      )}
    </Section>
  );
}

/* 9 · Brand film */
export function BrandFilm() {
  return (
    <section aria-labelledby="film-h" className="py-8 md:py-10">
      <div className="container-moc">
        <Dialog.Root>
          <div className="relative overflow-hidden rounded-2xl">
            <img src={careTeam} alt="" loading="lazy" width={1600} height={900} className="aspect-[4/5] w-full object-cover sm:aspect-[21/9]" />
            <div className="film-scrim absolute inset-0" aria-hidden />
            <div className="absolute inset-0 flex flex-col justify-end p-7 md:p-14">
              <h2 id="film-h" className="mt-4 max-w-2xl text-[32px] leading-[1.1] text-ink-foreground md:text-[56px]">Care that feels human.</h2>
              <p className="mt-3 max-w-md text-ink-foreground/85">A short film about the people behind MOC care.</p>
            </div>
            <Dialog.Trigger asChild>
              <button type="button" aria-label="Play brand film" className="absolute left-1/2 top-1/2 grid size-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-card text-primary shadow-lift transition hover:scale-105 md:size-24">
                <span className="absolute inset-0 animate-ping rounded-full bg-card/40 motion-reduce:hidden" aria-hidden />
                <Play className="relative size-8 fill-current" aria-hidden />
              </button>
            </Dialog.Trigger>
          </div>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 z-50 bg-ink/85" />
            <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[calc(100%-2rem)] max-w-3xl -translate-x-1/2 -translate-y-1/2 rounded-xl bg-card p-3">
              <div className="grid aspect-video place-items-center rounded-lg bg-paper text-center">
                <div className="px-6"><Play className="mx-auto size-10 text-primary" aria-hidden /><Dialog.Title className="mt-4 font-display text-2xl text-ink">About MOC Cancer Care</Dialog.Title><Dialog.Description className="mt-2 text-sm text-muted-foreground">Specialist oncology and compassionate care close to home.</Dialog.Description></div>
              </div>
              <Dialog.Close asChild><Button size="icon" variant="ghost" className="absolute right-4 top-4" aria-label="Close video"><X /></Button></Dialog.Close>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </section>
  );
}

/* 10 · Testimonials (Stacked card deck matching reference mockup) */
const communityStories = [
  {
    name: "Priya Sharma",
    role: "Breast Cancer Survivor · Treated at MOC Mumbai",
    quote: "Love MOC! Exceptional care and compassionate doctors. They made every step of our treatment smooth and hopeful. The guidance from our doctor coach gave my entire family peace of mind.",
    image: tSurvivor1,
  },
  {
    name: "Sunita Verma",
    role: "Lymphoma Survivor · Treated at MOC Thane",
    quote: "From day one, the doctors treated me with immense warmth and clinical excellence. Today, I am back to living fully, healthy and cancer-free. MOC truly stands beside you at every step.",
    image: tSurvivor2,
  },
  {
    name: "Rajesh Kulkarni",
    role: "Caregiver & Son · MOC Pune",
    quote: "Having specialist cancer care so close to home changed everything. Less travel meant more time with family, and the clinical team was always accessible to answer every question with empathy.",
    image: tSurvivor3,
  },
  {
    name: "Arjun Mehta",
    role: "Leukemia Survivor · Treated at MOC Mumbai",
    quote: "MOC's integrative approach gave me confidence at every stage of my treatment. The doctor coach, the community, and the specialists — all working together for my recovery.",
    image: tSurvivor4,
  },
];

export function Stories() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isSliding, setIsSliding] = useState(false);
  const [slideDirection, setSlideDirection] = useState<"next" | "prev">("next");

  const changeStory = (direction: "next" | "prev") => {
    if (isSliding) return;
    setSlideDirection(direction);
    setIsSliding(true);
    setTimeout(() => {
      setActiveIndex((prev) =>
        direction === "next"
          ? (prev + 1) % communityStories.length
          : (prev - 1 + communityStories.length) % communityStories.length
      );
      setIsSliding(false);
    }, 400);
  };

  return (
    <section id="stories" aria-labelledby="stories-h" className="relative isolate overflow-hidden py-20 md:py-28 bg-[#e2f2ff]">
      {/* Subtle ambient glows */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(65,178,222,0.12),transparent_55%)] pointer-events-none" aria-hidden />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_75%,rgba(0,88,140,0.07),transparent_50%)] pointer-events-none" aria-hidden />

      <div className="container-moc relative z-10">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-[#00588c]/10 text-[#00588c] border border-[#00588c]/20 uppercase tracking-wider font-sans">
            Voices from our community
          </span>
          <h2 id="stories-h" className="mt-4 font-display text-[32px] sm:text-[44px] md:text-[50px] font-semibold text-[#054870] tracking-tight leading-[1.15]">
            Real stories of hope, strength and recovery.
          </h2>
          <p className="mt-3 text-[16px] md:text-[17px] text-[#054870]/75 max-w-xl mx-auto font-sans leading-relaxed">
            Genuine experiences from patients and caregivers who trusted MOC on their treatment journey.
          </p>
        </div>

        {/* Stacked Cards Deck Container: Each background layer is an actual testimonial card! */}
        <div className="relative max-w-4xl mx-auto mt-12 md:mt-16 px-3 sm:px-6 h-[440px] sm:h-[460px] md:h-[480px] flex items-center justify-center">
          {communityStories.map((story, idx) => {
            const diff = (idx - activeIndex + communityStories.length) % communityStories.length;

            let cardClasses = "";
            let zIndex = 10;

            if (diff === 0) {
              // Active Front Card
              zIndex = 30;
              cardClasses = isSliding
                ? `w-[88%] md:w-[90%] scale-y-100 opacity-0 ${
                    slideDirection === "next"
                      ? "translate-x-[115%] sm:translate-x-[125%] rotate-6"
                      : "-translate-x-[115%] sm:-translate-x-[125%] -rotate-6"
                  } pointer-events-none`
                : "w-[88%] md:w-[90%] scale-y-100 opacity-100 translate-x-0 rotate-0 shadow-[0_25px_60px_rgba(0,0,0,0.4)]";
            } else if (diff === 1) {
              // 1st Background Card (Immediately behind, visible on sides!)
              if (isSliding) {
                // Smoothly rises and expands to become the new front card!
                zIndex = 30;
                cardClasses = "w-[88%] md:w-[90%] scale-y-100 opacity-100 brightness-100 translate-x-0 rotate-0 shadow-[0_25px_60px_rgba(0,0,0,0.4)]";
              } else {
                zIndex = 20;
                cardClasses = "w-[94%] md:w-[95%] scale-y-[0.93] opacity-90 brightness-[0.88] translate-x-0 rotate-0 shadow-[0_20px_50px_rgba(0,0,0,0.3)] pointer-events-none";
              }
            } else {
              // 2nd Background Card (Deepest in stack, visible further on sides!)
              if (isSliding) {
                // Steps up to the 1st background position!
                zIndex = 20;
                cardClasses = "w-[94%] md:w-[95%] scale-y-[0.93] opacity-90 brightness-[0.88] translate-x-0 rotate-0 shadow-[0_20px_50px_rgba(0,0,0,0.3)] pointer-events-none";
              } else {
                zIndex = 10;
                cardClasses = "w-[100%] scale-y-[0.86] opacity-75 brightness-[0.78] translate-x-0 rotate-0 shadow-[0_15px_40px_rgba(0,0,0,0.2)] pointer-events-none";
              }
            }

            return (
              <article
                key={story.name}
                style={{ zIndex }}
                className={`absolute inset-y-0 mx-auto overflow-hidden rounded-[26px] md:rounded-[34px] border-2 border-[#00588c]/20 bg-[#054870] flex items-center shadow-[0_8px_32px_rgba(0,88,140,0.15)] transition-all duration-400 ease-out transform ${cardClasses}`}
              >
                {/* Full-width background image — photo fills right side, no overlay */}
                <img
                  src={story.image}
                  alt={story.name}
                  className="absolute inset-0 size-full object-cover object-right"
                />


                {/* Card Content */}
                <div className="relative z-10 p-7 sm:p-10 md:p-14 max-w-[60%] w-full flex flex-col justify-between min-h-[360px] md:min-h-[420px]">
                  <div>
                    {/* Quote icon */}
                    <div className="text-white/90">
                      <Quote className="size-9 sm:size-11 fill-white/90 text-white/90" />
                    </div>

                    {/* 5 Stars */}
                    <div className="flex items-center gap-1.5 mt-3.5 sm:mt-4 text-[#f59e0b]">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="size-4 sm:size-4.5 fill-[#f59e0b] text-[#f59e0b]" />
                      ))}
                    </div>

                    {/* Testimonial Quote */}
                    <blockquote className="mt-4 sm:mt-5 font-sans italic text-white text-[15px] sm:text-[17px] md:text-[19px] leading-relaxed font-normal">
                      "{story.quote}"
                    </blockquote>
                  </div>

                  {/* Author Name & Role — no avatar image */}
                  <div className="mt-6 pt-5 border-t border-white/25">
                    <span className="font-display font-semibold text-white text-[15.5px] sm:text-[17px] block">
                      {story.name}
                    </span>
                    <span className="text-xs sm:text-[14px] text-white/75 block mt-0.5">
                      {story.role}
                    </span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Carousel Arrow Controls Below the Stacked Card */}
        <div className="mt-8 sm:mt-10 flex items-center justify-center">
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              className="size-11 rounded-full border-[#00588c]/30 text-[#00588c] bg-white/70 hover:bg-[#00588c]/10 hover:text-[#00588c] shadow-none"
              aria-label="Previous story"
              disabled={isSliding}
              onClick={() => changeStory("prev")}
            >
              <ArrowLeft />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="size-11 rounded-full border-[#00588c]/30 text-[#00588c] bg-white/70 hover:bg-[#00588c]/10 hover:text-[#00588c] shadow-none"
              aria-label="Next story"
              disabled={isSliding}
              onClick={() => changeStory("next")}
            >
              <ArrowRight />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* 11 · Resources */
const tabs = ["Articles", "Doctor Videos", "Awareness", "FAQs"] as const;

export function Resources() {
  const [tab, setTab] = useState<(typeof tabs)[number]>("Articles");
  const featured = articles[0];
  return (
    <Section id="resources" labelledBy="res-h">
      <Heading id="res-h" title="Learn at your own pace" intro="Articles and answers for patients and families." />
      <div className="mt-12 grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
        {featured && (
          <a href={featured.href} target="_blank" rel="noreferrer" className="group block">
            <div className="overflow-hidden rounded-xl"><img src={tGenetic} alt="" loading="lazy" width={960} height={1200} className="aspect-[16/11] w-full object-cover transition duration-700 group-hover:scale-[1.03]" /></div>
            <p className="mt-6 text-sm font-semibold text-primary">Featured · {featured.tag}</p>
            <h3 className="mt-2 text-[26px] leading-snug group-hover:underline group-hover:decoration-1 group-hover:underline-offset-4 md:text-[30px]">{featured.title}</h3>
          </a>
        )}
        <div>
          <div role="tablist" aria-label="Resource category" className="flex flex-wrap gap-2">
            {tabs.map((t) => (
              <Button key={t} role="tab" id={`tab-${t}`} aria-selected={tab === t} aria-controls="res-panel" variant="outline" onClick={() => setTab(t)}
                className={`rounded-full ${tab === t ? "border-primary bg-primary text-primary-foreground hover:bg-ink hover:text-primary-foreground" : "bg-card"}`}>{t}</Button>
            ))}
          </div>
          <div role="tabpanel" id="res-panel" aria-labelledby={`tab-${tab}`} className="mt-6 border-t">
            {tab === "Articles" && <ul>{articles.slice(1).map((a) => (
              <li key={a.href} className="border-b"><a href={a.href} target="_blank" rel="noreferrer" className="group flex items-start justify-between gap-6 py-5">
                <div><p className="text-xs font-semibold text-primary">{a.tag}</p><h4 className="mt-1 font-display text-lg font-semibold leading-snug text-ink group-hover:underline group-hover:underline-offset-4">{a.title}</h4></div>
                <ArrowRight className="mt-5 size-5 shrink-0 text-primary transition group-hover:translate-x-1" aria-hidden /></a></li>
            ))}</ul>}
            {tab === "Doctor Videos" && <Placeholder text="Doctor explainer videos will appear here once MOC selects them." />}
            {tab === "Awareness" && <Placeholder text="Awareness and screening programme content from MOC centres." />}
            {tab === "FAQs" && (
              <Accordion.Root type="single" collapsible>
                {faqs.map((f, n) => (
                  <Accordion.Item key={f.q} value={`f${n}`} className="border-b">
                    <Accordion.Header><Accordion.Trigger className="group flex w-full items-center justify-between gap-4 py-4 text-left font-medium text-ink">{f.q}<Plus className="size-5 shrink-0 text-primary transition group-data-[state=open]:rotate-45" aria-hidden /></Accordion.Trigger></Accordion.Header>
                    <Accordion.Content className="pb-4 text-[15px] leading-relaxed text-muted-foreground">{f.a}</Accordion.Content>
                  </Accordion.Item>
                ))}
              </Accordion.Root>
            )}
          </div>
          <a href="https://www.mocindia.co.in/blogs" target="_blank" rel="noreferrer" className="link-arrow mt-6">Browse all articles <ArrowRight className="size-4" aria-hidden /></a>
          <p className="mt-6 text-xs text-muted-foreground">Educational content only — not a substitute for advice from your doctor.</p>
        </div>
      </div>
    </Section>
  );
}

const Placeholder = ({ text }: { text: string }) => <div className="py-8"><Tag>Placeholder</Tag><p className="mt-3 max-w-sm text-muted-foreground">{text}</p></div>;

/* 12 · Footer */
export function Footer() {
  return (
    <footer className="bg-ink text-ink-foreground">
      <div className="container-moc grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <img src={logoLight} alt="M | O | C Cancer Care & Research Centre" className="h-14 w-auto" width={93} height={56} loading="lazy" />
          <p className="mt-5 max-w-xs text-[15px] leading-relaxed opacity-75">Integrated multidisciplinary oncology and hematology care, at centres close to home.</p>
        </div>
        {[
          { h: "Explore", l: [["Find a Doctor", "/#specialists"], ["Our Centres", "/#centres"], ["About MOC", "https://www.mocindia.co.in/about-moc-india"]] },
          { h: "Treatments", l: services.slice(0, 4).map((s) => [s.title, "/treatments"]) },
          { h: "Resources", l: [["Blog", "https://www.mocindia.co.in/blogs"], ["Types of cancer", "https://www.mocindia.co.in/types-of-cancer"], ["All centre details", "https://www.mocindia.co.in/all/centers/details"]] },
        ].map((col) => (
          <nav key={col.h} aria-label={col.h}>
            <h2 className="font-sans text-sm font-semibold text-ink-foreground">{col.h}</h2>
            <ul className="mt-4 space-y-2.5 text-[15px]">
              {col.l.map(([t, h]) => <li key={t}><a href={h} className="opacity-80 hover:opacity-100 hover:underline">{t}</a></li>)}
            </ul>
          </nav>
        ))}
      </div>
      <div className="border-t border-ink-foreground/15">
        <div className="container-moc flex flex-wrap items-center justify-between gap-4 py-6 text-[13px] opacity-70">
          <p>© {new Date().getFullYear()} M | O | C Cancer Care &amp; Research Centre. All rights reserved.</p>
          <div className="flex gap-5">
            <a href="https://www.mocindia.co.in/privacy-policy" className="hover:underline">Privacy Policy</a>
            <a href="https://www.mocindia.co.in/term-and-condition" className="hover:underline">Terms &amp; Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
