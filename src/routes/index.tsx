import { createFileRoute } from "@tanstack/react-router";
import { Hero, WhyMoc, Treatments, Journey, Specialists, Gallery, CentreFinder, BrandFilm, Stories, Resources } from "@/components/moc/Sections";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "MOC India — Cancer care, close to home" },
      { name: "description", content: "Specialist medical oncology and hemato-oncology care, treatment guidance and support at MOC centres close to home." },
      { property: "og:title", content: "MOC India — Cancer care, close to home" },
      { property: "og:description", content: "Find an MOC centre, meet our oncologists and explore treatments and support." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Hero />
      <WhyMoc />
      <Treatments />
      <Journey />
      <Specialists />
      <Gallery />
      <CentreFinder />
      <BrandFilm />
      <Stories />
      <Resources />
    </>
  );
}
