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
      "Parental Roles and Choice of Subject Combinations at Advanced Level in Jinja District, Uganda",
    authors: "Ebenezer, Christopher Kisa",
    venue: "East African Journal of Arts and Social Sciences, Vol. 9, No. 3",
    year: 2026,
    type: "journal",
    keywords: [
      "parental influence",
      "subject combinations",
      "Advanced Level",
      "Jinja District",
      "Uganda",
      "mixed methods",
    ],
    link: "https://www.researchgate.net/publication/412325866_Parental_Roles_and_Choice_of_Subject_Combinations_at_Advanced_Level_in_Jinja_District_Uganda",
  },
];

export function uniquePublicationYears(): number[] {
  return [...new Set(publications.map((p) => p.year))].sort((a, b) => b - a);
}