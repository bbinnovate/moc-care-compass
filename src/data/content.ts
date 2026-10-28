// Content sourced from https://www.mocindia.co.in/ (checked Oct 2026).
// Items marked DEMO/PLACEHOLDER are not verified and must be replaced before launch.
import centresRaw from "./centres.json";

export type Centre = {
  name: string;
  address: string;
  phone: string;
  email: string;
  map: string;
  doctors: string[];
  city: string;
  pin: string;
};
export const centres = centresRaw as Centre[];

export const services = [
  { slug: "chemotherapy", title: "Chemotherapy", text: "Day-care infusion for solid and blood cancers, managed by trained oncology nursing teams." },
  { slug: "immunotherapy", title: "Immunotherapy", text: "Treatments that help the body's immune system recognise and respond to cancer." },
  { slug: "targeted-therapy", title: "Targeted Therapy", text: "Medicines chosen around the specific features of a person's cancer." },
  { slug: "genetic-counselling", title: "Genetic Counselling", text: "Guidance on genetic testing for patients and, where relevant, their families." },
  { slug: "palliative-care", title: "Palliative & Home Care", text: "Symptom relief and comfort-focused support, including care at home." },
  { slug: "supportive-care", title: "Supportive Care", text: "Psycho-oncology, onco nutrition and onco physiotherapy alongside treatment." },
] as const;

export const moreServices = ["Clinical Research", "Patient Support Group", "In-house Pathology", "Scalp Cooling", "Awareness & Screening"];

export const journey = [
  { step: "01", title: "Get an expert doctor coach", text: "A dedicated medical guide to steer your tests, reports and next steps." },
  { step: "02", title: "Consult with the best Oncologist", text: "Specialist consultation to shape an evidence-based treatment plan." },
  { step: "03", title: "Consult with integrative experts", text: "Nutritionists, counsellors and physiotherapists supporting your care." },
  { step: "04", title: "Reduce growth of cancer cells", text: "Evidence-based oncological treatments delivered close to home." },
  { step: "05", title: "Join the most trusted cancer community", text: "Peer support and shared strength with fellow patients and caregivers." },
  { step: "06", title: "Regular guidance from the experts", text: "Continuous monitoring, swift doubt resolution and follow-up care." },
  { step: "07", title: "Become Cancer free", text: "Post-remission surveillance, lifestyle support and celebration of wellness." },
];

// Points drawn from the MOC "Why MOC" content. Kept short on purpose.
export const differentiators = [
  { title: "Specialist cancer care", text: "Medical and hemato-oncologists focused only on cancer." },
  { title: "Centres closer to home", text: "Less travel during treatment, more time with family." },
  { title: "Patient-centric day care", text: "Comfortable day-care settings for infusions." },
  { title: "In-house pathology & genetics", text: "Pathology and genetic testing support under one network." },
  { title: "Multidisciplinary care", text: "Surgery and radiation coordinated through partner hospitals." },
  { title: "Home care & palliative support", text: "Comfort-focused care, including at home." },
  { title: "Clinical research", text: "Participation in oncology research and trials." },
  { title: "Scalp cooling", text: "Hair-loss prevention support during chemotherapy." },
];

// Stats: only the centre and city counts are derived from one source (the centre-details page
// mirrored in centres.json). Other figures conflict across MOC pages — CONFIRM WITH MOC.
export const stats: Array<{ value: string; label: string; note?: string }> = [
  { value: String(centresRaw.length), label: "Centres listed", note: "Across India" },
  { value: String(new Set((centresRaw as Centre[]).map((c) => c.city)).size), label: "Cities", note: "Nationwide presence" },
  { value: "60+", label: "Medical oncologist", note: "Expert cancer care" },
];

// Verified from mocindia.co.in homepage + centre details page.
export const doctors = [
  { name: "Dr. Vashistha Pankaj Maniar", speciality: "Medical and Pediatric Hemato-Oncologist", quals: "MD, DM (Medical Oncology), ECMO", photo: "/images/doc1.jpg", href: "https://www.mocindia.co.in/our-team/dr-vashistha-pankaj-maniar" },
  { name: "Dr. Ashish Joshi", speciality: "Medical and Pediatric Hemato-Oncologist", quals: "MD, DM (Medical Oncology)", photo: "/images/doc2.webp", href: "https://www.mocindia.co.in/our-team/dr-ashish-joshi" },
  { name: "Dr. Pritam Baban Kalaskar", speciality: "Medical and Pediatric Hemato-Oncologist", quals: "MD, DM (Medical Oncology)", photo: "/images/doc3.png", href: "https://www.mocindia.co.in/our-team/dr-pritam-baban-kalaskar" },
  { name: "Dr. Udip Maheshwari", speciality: "Medical Oncologist and Hemato-Oncologist", quals: "MD, DNB (Medical Oncology), ECMO", photo: "/images/doc4.png", href: "https://www.mocindia.co.in/our-team/dr-udip-maheshwari" },
].map((d) => ({
  ...d,
  centres: centres.filter((c) => c.doctors.some((n) => n.replace(/\s+/g, " ").includes(d.name.replace("Dr. ", "")))).map((c) => c.name),
}));

// Article titles/links taken from the official MOC blog.
export const articles = [
  { title: "One breast bigger than the other: normal or a warning sign?", tag: "Breast health", href: "https://www.mocindia.co.in/blog/one-breast-bigger-than-the-other-normal-or-a-warning-sign" },
  { title: "Multiple myeloma: when routine clinical findings point to a plasma cell disorder", tag: "Blood cancers", href: "https://www.mocindia.co.in/blog/multiple-myeloma-when-routine-clinical-findings-point-to-a-plasma-cell-disorder" },
  { title: "5 healthy habits that don't prevent liver cancer", tag: "Awareness", href: "https://www.mocindia.co.in/blog/5-healthy-habits-that-dont-prevent-liver-cancer" },
];

export const faqs = [
  { q: "Do I need a referral to see an MOC oncologist?", a: "PLACEHOLDER — confirm MOC's referral policy with the client before publishing." },
  { q: "What should I bring to my first consultation?", a: "PLACEHOLDER — typical guidance is previous reports, scans, biopsy results and a list of current medicines. To be confirmed by MOC's clinical team." },
  { q: "Is cashless treatment available?", a: "The current MOC site mentions empanelment with major insurers, TPAs and government schemes. Patients should confirm their specific policy with the centre." },
  { q: "Can a family member enquire on my behalf?", a: "PLACEHOLDER — confirm with the client how caregiver enquiries are handled." },
];

export const cities = Array.from(new Set(centres.map((c) => c.city))).sort();
