import { useMemo, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { ArrowRight, ChevronDown, MapPin, Search, UserRound, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { doctors } from "@/data/content";
import { emptyDoctorFilters, filterDoctors, withPreviewFilters, type DirectoryDoctor, type DoctorFilters } from "@/lib/directory";
import { useAppointment } from "./AppointmentModal";

const previewDoctors = withPreviewFilters(doctors);
const selectors = [
  { key: "centre", label: "Centre", all: "All centres", options: ["Borivali", "Thane"] },
  { key: "speciality", label: "Speciality", all: "All specialities", options: ["Medical oncology", "Hemato-oncology"] },
] as const;

function Portrait({ className = "" }: { className?: string }) {
  return <div className={`portrait-placeholder flex flex-col items-center justify-center ${className}`}>
    <UserRound className="size-28" strokeWidth={0.6} aria-hidden />
    <span className="mt-2 text-xs font-medium text-ink">Portrait to be supplied</span>
  </div>;
}

export function DoctorDirectory() {
  const [filters, setFilters] = useState<DoctorFilters>(emptyDoctorFilters);
  const [profile, setProfile] = useState<DirectoryDoctor | null>(null);
  const { open } = useAppointment();
  const results = useMemo(() => filterDoctors(previewDoctors, filters), [filters]);
  const update = (key: keyof DoctorFilters, value: string) => setFilters((c) => ({ ...c, [key]: value }));
  const active = (Object.entries(filters) as [keyof DoctorFilters, string][]).filter(([, v]) => v);
  return <section id="specialists" aria-labelledby="doc-h" className="py-20 md:py-28">
    <div className="container-moc">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div className="max-w-2xl">
          <h2 id="doc-h" className="text-[34px] leading-[1.1] md:text-[52px]">Meet our specialists</h2>
          <p className="mt-5 text-[17px] leading-relaxed text-muted-foreground">Oncologists who make time for your questions.</p>
        </div>
        <span className="demo-tag">Preview / demo data</span>
      </div>
      <div className="mt-12 rounded-2xl border border-primary/10 bg-paper p-5 md:p-6">
        <div className="grid gap-3 md:grid-cols-[1.8fr_1fr_1fr]">
          <div>
            <label htmlFor="doctor-keyword" className="sr-only">Doctor name or speciality</label>
            <div className="flex h-13 items-center gap-3 rounded-full border border-input bg-card px-5 focus-within:border-primary">
              <Search className="size-4 shrink-0 text-primary" aria-hidden />
              <input id="doctor-keyword" value={filters.keyword} onChange={(e) => update("keyword", e.target.value)} placeholder="Search by doctor name or speciality" className="h-12 min-w-0 flex-1 bg-transparent text-[15px] outline-none" />
            </div>
          </div>
          {selectors.map(({ key, label, all, options }) => <div key={key} className="relative">
            <label htmlFor={`doctor-${key}`} className="sr-only">{label}</label>
            <select
              id={`doctor-${key}`}
              value={filters[key]}
              onChange={(e) => update(key, e.target.value)}
              className="h-[50px] w-full appearance-none rounded-full border border-input bg-card pl-5 pr-11 text-[15px] outline-none focus:border-primary cursor-pointer"
            >
              <option value="">{all}</option>
              {options.map((o) => <option key={o}>{o}</option>)}
            </select>
            <ChevronDown className="pointer-events-none absolute right-5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
          </div>)}
        </div>
        <div className="mt-4 flex min-h-8 flex-wrap items-center gap-2 px-1">
          <p aria-live="polite" className="mr-2 text-sm font-semibold text-ink">{results.length} {results.length === 1 ? "specialist" : "specialists"}</p>
          {active.map(([key, value]) => <Button key={key} variant="outline" size="sm" onClick={() => update(key, "")} aria-label={`Remove ${key} filter: ${value}`} className="rounded-full border-primary/25 bg-card text-primary">{value}<X /></Button>)}
          {active.length > 0 && <Button variant="link" size="sm" onClick={() => setFilters(emptyDoctorFilters)}>Clear All</Button>}
          <p className="ml-auto text-xs text-muted-foreground">Centre &amp; speciality assignments are sample data</p>
        </div>
      </div>
      <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {results.map((d) => <li key={d.name} className="group flex flex-col">
          <Portrait className="aspect-[4/5] rounded-xl transition group-hover:shadow-soft" />
          <div className="flex flex-1 flex-col pt-5">
            <h3 className="text-[21px] leading-snug">{d.name}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{d.speciality}</p>
            <p className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground"><MapPin className="size-3.5 shrink-0 text-primary" aria-hidden />{d.previewCentre} · sample</p>
            <div className="mt-auto grid grid-cols-2 gap-2 pt-5">
              <Button variant="outline" className="rounded-full text-[13px]" onClick={() => setProfile(d)}>View Profile</Button>
              <Button className="rounded-full text-[13px]" onClick={() => open(undefined, d.name)} aria-label={`Book with ${d.name}`}>Book</Button>
            </div>
          </div>
        </li>)}
      </ul>
      {results.length === 0 && <div className="py-14 text-center"><h3 className="text-2xl">No specialists match these filters.</h3><Button variant="outline" className="mt-5 rounded-full" onClick={() => setFilters(emptyDoctorFilters)}>Clear All</Button></div>}
      <Dialog.Root open={Boolean(profile)} onOpenChange={(o) => { if (!o) setProfile(null); }}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-ink/50" />
          <Dialog.Content className="fixed left-1/2 top-1/2 z-50 max-h-[90vh] w-[calc(100%-2rem)] max-w-2xl -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-2xl bg-card p-6 shadow-lift">
            <Dialog.Close asChild><Button size="icon" variant="ghost" className="absolute right-3 top-3" aria-label="Close profile"><X /></Button></Dialog.Close>
            {profile && <div className="grid gap-6 sm:grid-cols-[200px_1fr]">
              <Portrait className="aspect-[4/5] rounded-xl" />
              <div><p className="demo-tag">Profile preview</p><Dialog.Title className="mt-4 font-display text-2xl text-ink">{profile.name}</Dialog.Title><Dialog.Description className="mt-3 text-sm leading-relaxed text-muted-foreground">{profile.speciality}<br />{profile.quals}</Dialog.Description><p className="mt-4 text-sm">Centre shown is sample data; confirm details with MOC.</p><a className="link-arrow mt-4 text-sm" href={profile.href} target="_blank" rel="noreferrer">Official MOC profile<ArrowRight className="size-4" /></a><Button className="mt-6 w-full rounded-full" onClick={() => { setProfile(null); open(undefined, profile.name); }}>Book with this doctor</Button></div>
            </div>}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  </section>;
}
