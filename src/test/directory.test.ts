import { describe, expect, it } from "vitest";
import { centrePhone, emptyDoctorFilters, filterDoctors, searchCentres, withPreviewFilters } from "@/lib/directory";
import { centres, doctors } from "@/data/content";
import { validateEnquiry } from "@/components/moc/AppointmentModal";

const samples = withPreviewFilters(doctors);
describe("Preview doctor filters", () => {
  it("searches names", () => expect(filterDoctors(samples, { ...emptyDoctorFilters, keyword: "ashish" }).map((d) => d.name)).toEqual(["Dr. Ashish Joshi"]));
  it("searches speciality keywords", () => expect(filterDoctors(samples, { ...emptyDoctorFilters, keyword: "pediatric" })).toHaveLength(3));
  it("filters centres", () => expect(filterDoctors(samples, { ...emptyDoctorFilters, centre: "Borivali" })).toHaveLength(2));
  it("filters specialities", () => expect(filterDoctors(samples, { ...emptyDoctorFilters, speciality: "Hemato-oncology" })).toHaveLength(2));
  it("combines selected filters", () => expect(filterDoctors(samples, { keyword: "maniar", centre: "Borivali", speciality: "Hemato-oncology" }).map((d) => d.name)).toEqual(["Dr. Vashistha Pankaj Maniar"]));
  it("has no language filter", () => expect(Object.keys(emptyDoctorFilters)).toEqual(["keyword", "centre", "speciality"]));
  it("returns all four when cleared", () => expect(filterDoctors(samples, emptyDoctorFilters)).toHaveLength(4));
});
describe("Hero centre search", () => {
  it("selects a city when the city name is entered", () => { const r = searchCentres(centres, "pune"); expect(r.city).toBe("Pune"); expect(r.matches).toHaveLength(5); });
  it("matches an area name", () => expect(searchCentres(centres, "thane").matches.length).toBeGreaterThan(0));
  it("returns nothing for an unknown place", () => expect(searchCentres(centres, "zzzz").matches).toHaveLength(0));
});
describe("Centre phone guards", () => {
  it("handles absent and empty numbers", () => { expect(centrePhone()).toBeUndefined(); expect(centrePhone("")).toBeUndefined(); });
  it("creates a callable number", () => expect(centrePhone("9876543210 / 9999999999")).toBe("+919876543210"));
});
describe("Demo enquiry validation", () => {
  it("accepts complete valid enquiry details", () => expect(validateEnquiry({ name: "Preview Patient", phone: "9876543210", location: "Not sure" })).toEqual({}));
  it("rejects missing required details", () => expect(Object.keys(validateEnquiry({ name: "", phone: "", location: "" }))).toEqual(["name", "phone", "location"]));
});
