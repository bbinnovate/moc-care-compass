export type DirectoryDoctor = {
  name: string;
  speciality: string;
  quals: string;
  href: string;
  centres: string[];
  previewCentre: string;
  previewSpeciality: string;
};

export type DoctorFilters = { keyword: string; centre: string; speciality: string };
export const emptyDoctorFilters: DoctorFilters = { keyword: "", centre: "", speciality: "" };

// These assignments demonstrate filtering only, not the doctors' real schedules.
const assignments = [
  { previewCentre: "Borivali", previewSpeciality: "Hemato-oncology" },
  { previewCentre: "Thane", previewSpeciality: "Medical oncology" },
  { previewCentre: "Borivali", previewSpeciality: "Hemato-oncology" },
  { previewCentre: "Thane", previewSpeciality: "Medical oncology" },
] as const;

export function withPreviewFilters<T extends Omit<DirectoryDoctor, "previewCentre" | "previewSpeciality">>(doctors: T[]): DirectoryDoctor[] {
  return doctors.map((doctor, index) => ({ ...doctor, ...(assignments[index % assignments.length] ?? assignments[0]) }));
}

export function filterDoctors(doctors: DirectoryDoctor[], filters: DoctorFilters) {
  const keyword = filters.keyword.trim().toLowerCase();
  return doctors.filter((doctor) =>
    (!keyword || `${doctor.name} ${doctor.speciality} ${doctor.previewSpeciality}`.toLowerCase().includes(keyword)) &&
    (!filters.centre || doctor.previewCentre === filters.centre) &&
    (!filters.speciality || doctor.previewSpeciality === filters.speciality),
  );
}

type SearchableCentre = { name: string; city: string; address: string; pin: string };

/** Hero search: an exact city name selects that city; otherwise match area, address or pincode. */
export function searchCentres<T extends SearchableCentre>(centres: T[], query: string): { city?: string; matches: T[] } {
  const q = query.trim().toLowerCase();
  if (!q) return { matches: centres };
  const city = centres.find((c) => c.city.toLowerCase() === q)?.city;
  if (city) return { city, matches: centres.filter((c) => c.city === city) };
  return { matches: centres.filter((c) => `${c.name} ${c.city} ${c.address}`.toLowerCase().includes(q) || c.pin.startsWith(q)) };
}

export function centrePhone(phone?: string): string | undefined {
  const digits = (phone?.split("/")[0] ?? "").replace(/\D/g, "").slice(-10);
  return digits.length === 10 ? `+91${digits}` : undefined;
}
