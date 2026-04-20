export type PublicationType = "journal" | "conference" | "book";

export type Publication = {
  id: string;
  title: string;
  authors: string;
  venue: string;
  year: number;
  type: PublicationType;
  keywords: string[];
  doi?: string;
  link?: string;
};

export const publications: Publication[] = [
  {
    id: "p1",
    title:
      "Teachers' roles and choice of subject combinations in Jinja District, Uganda",
    authors: "Ebenezer, Christopher Kisa",
    venue: "African Educational Research Journal",
    year: 2025,
    type: "journal",
    keywords: ["teachers", "subject combinations", "Uganda", "Jinja", "career guidance", "secondary schools"],
    doi: "10.5281/zenodo.17544202",
  },
  {
    id: "p2",
    title:
      "Trauma-Informed Classrooms in Post-Conflict Northern Uganda: A Longitudinal Study",
    authors: "Ebenezer, C. K., Acen, J., & Okello, D.",
    venue: "Journal of Community Psychology",
    year: 2024,
    type: "journal",
    keywords: ["trauma", "education", "Uganda", "mental health"],
    doi: "10.1000/jcp.2024.001",
  },
  
];

export function uniquePublicationYears(): number[] {
  return [...new Set(publications.map((p) => p.year))].sort((a, b) => b - a);
}