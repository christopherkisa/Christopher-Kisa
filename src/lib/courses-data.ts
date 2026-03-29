export type Course = {
  id: string;
  code: string;
  title: string;
  term: string;
  role: "instructor" | "co-instructor";
  level: "undergraduate" | "graduate";
  status: "current" | "past";
  description: string;
  syllabusUrl: string;
};

export const courses: Course[] = [
  {
    id: "c1",
    code: "PSY 310",
    title: "Cognitive Psychology",
    term: "Semester I 2025",
    role: "instructor",
    level: "undergraduate",
    status: "current",
    description:
      "Perception, attention, memory, language, and decision-making with applied labs.",
    syllabusUrl: "/syllabi/cognitive-psychology.pdf",
  },
  {
    id: "c2",
    code: "PSY 420",
    title: "Community & Health Psychology",
    term: "Semester I 2025",
    role: "instructor",
    level: "undergraduate",
    status: "current",
    description:
      "Prevention, stigma, resilience, and participatory approaches in community settings.",
    syllabusUrl: "/syllabi/community-health-psychology.pdf",
  },
  {
    id: "c3",
    code: "PSY 501",
    title: "Research Methods in Psychology",
    term: "Semester I 2025",
    role: "co-instructor",
    level: "graduate",
    status: "current",
    description:
      "Quantitative and qualitative designs, ethics, preregistration, and open science.",
    syllabusUrl: "/syllabi/research-methods-grad.pdf",
  },
  {
    id: "c4",
    code: "PSY 240",
    title: "Developmental Psychology Across the Lifespan",
    term: "Semester II 2024",
    role: "instructor",
    level: "undergraduate",
    status: "past",
    description:
      "Physical, cognitive, and social development from infancy through late adulthood.",
    syllabusUrl: "/syllabi/developmental-psychology.pdf",
  },
  {
    id: "c5",
    code: "PSY 360",
    title: "Psychological Assessment & Measurement",
    term: "Semester I 2024",
    role: "instructor",
    level: "undergraduate",
    status: "past",
    description:
      "Reliability, validity, scale construction, and culturally fair assessment.",
    syllabusUrl: "/syllabi/psychological-assessment.pdf",
  },
  {
    id: "c6",
    code: "PSY 530",
    title: "Advanced Statistics for Behavioral Science",
    term: "Semester II 2023",
    role: "co-instructor",
    level: "graduate",
    status: "past",
    description:
      "Regression, multilevel models, and introductory structural equation modeling.",
    syllabusUrl: "/syllabi/advanced-statistics.pdf",
  },
];

export function coursesByStatus(status: Course["status"]) {
  return courses.filter((c) => c.status === status);
}
