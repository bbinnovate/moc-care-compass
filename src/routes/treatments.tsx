import { createFileRoute, Link } from "@tanstack/react-router";
import { services, moreServices } from "@/data/content";

export const Route = createFileRoute("/treatments")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "Treatments & Services — MOC India" },
      { name: "description", content: "Chemotherapy, immunotherapy, targeted therapy, genetic counselling, palliative and supportive care at MOC." },
      { property: "og:title", content: "Treatments & Services — MOC India" },
      { property: "og:description", content: "Overview of cancer treatments and supportive services at MOC centres." },
    ],
  }),
  component: Treatments,
});

function Treatments() {
  return (
    <div className="container-moc py-20">
      <span className="demo-tag">Placeholder listing page</span>
      <h1 className="mt-4 text-[44px] leading-tight md:text-[56px]">Treatments &amp; services</h1>
      <ul className="mt-10 grid gap-px overflow-hidden rounded-lg border bg-border md:grid-cols-2">
        {services.map((s) => (
          <li key={s.slug} className="bg-card p-7">
            <h2 className="text-2xl">{s.title}</h2>
            <p className="mt-2 text-muted-foreground">{s.text}</p>
          </li>
        ))}
      </ul>
      <p className="mt-8 text-muted-foreground">Also: {moreServices.join(" · ")}</p>
      <Link to="/" className="link-arrow mt-8">← Back to home</Link>
    </div>
  );
}
