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
      "Trauma-Informed Classrooms in Post-Conflict Northern Uganda: A Longitudinal Study",
    authors: "Ebenezer, C. K., Acen, J., & Okello, D.",
    venue: "Journal of Community Psychology",
    year: 2024,
    type: "journal",
    keywords: ["trauma", "education", "Uganda", "mental health"],
    doi: "10.1000/jcp.2024.001",
  },
  {
    id: "p2",
    title:
      "Executive Function Training and Mathematics Outcomes in Adolescent Learners",
    authors: "Ebenezer, C. K., Naluwooza, P.",
    venue: "Educational Psychology Review",
    year: 2023,
    type: "journal",
    keywords: ["cognition", "mathematics", "adolescents"],
    doi: "10.1000/edpr.2023.882",
  },
  {
    id: "p3",
    title:
      "Stigma Reduction Interventions for Help-Seeking in Rural African Universities",
    authors: "Ochieng, M., Ebenezer, C. K., et al.",
    venue: "Proceedings of the International Conference on Higher Education Psychology",
    year: 2023,
    type: "conference",
    keywords: ["stigma", "help-seeking", "university"],
  },
  {
    id: "p4",
    title: "Psychometrics of a Localized Resilience Scale for Ugandan Youth",
    authors: "Ebenezer, C. K.",
    venue: "Assessment",
    year: 2022,
    type: "journal",
    keywords: ["psychometrics", "resilience", "youth", "Uganda"],
    doi: "10.1000/assess.2022.441",
  },
  {
    id: "p5",
    title: "Handbook of Community Psychology Practice in East Africa",
    authors: "Ebenezer, C. K. (Ed.)",
    venue: "Oxford University Press",
    year: 2022,
    type: "book",
    keywords: ["community psychology", "East Africa", "handbook"],
  },
  {
    id: "p6",
    title:
      "Teacher Burnout and Student Engagement: Evidence from Secondary Schools in Gulu",
    authors: "Lamwaka, R., Ebenezer, C. K.",
    venue: "Teaching and Teacher Education",
    year: 2022,
    type: "journal",
    keywords: ["burnout", "engagement", "teachers"],
  },
  {
    id: "p7",
    title:
      "Digital Literacy and Psychological Wellbeing Among First-Year Undergraduates",
    authors: "Ebenezer, C. K., Akena, F.",
    venue: "Computers in Human Behavior Reports",
    year: 2021,
    type: "journal",
    keywords: ["digital literacy", "wellbeing", "students"],
  },
  {
    id: "p8",
    title:
      "Cognitive-Behavioral Group Therapy for Anxiety in University Settings: A Pragmatic Trial",
    authors: "Ebenezer, C. K., team.",
    venue: "Behaviour Research and Therapy",
    year: 2021,
    type: "journal",
    keywords: ["CBT", "anxiety", "group therapy"],
  },
  {
    id: "p9",
    title: "Parental Involvement and Academic Self-Concept in Ugandan Adolescents",
    authors: "Okello, S., Ebenezer, C. K.",
    venue: "Journal of Adolescence",
    year: 2020,
    type: "journal",
    keywords: ["parenting", "self-concept", "adolescents"],
  },
  {
    id: "p10",
    title:
      "Mindfulness-Based Stress Reduction for Healthcare Trainees: Feasibility in a Resource-Limited Setting",
    authors: "Ebenezer, C. K., Atim, L.",
    venue: "Global Mental Health",
    year: 2020,
    type: "journal",
    keywords: ["mindfulness", "MBSR", "healthcare"],
  },
  {
    id: "p11",
    title:
      "Sleep Quality as a Mediator Between Screen Time and Academic Performance",
    authors: "Ebenezer, C. K., Komakech, H.",
    venue: "Sleep Health",
    year: 2019,
    type: "journal",
    keywords: ["sleep", "screen time", "performance"],
  },
  {
    id: "p12",
    title:
      "Cross-Cultural Validation of the Big Five Inventory in Luo- and Acholi-Speaking Samples",
    authors: "Ebenezer, C. K., Odwong, B.",
    venue: "European Journal of Personality",
    year: 2019,
    type: "journal",
    keywords: ["Big Five", "cross-cultural", "validation"],
  },
  {
    id: "p13",
    title:
      "Peer Counseling Programs and Depression Symptom Reduction on Campus",
    authors: "Aol, P., Ebenezer, C. K.",
    venue: "Proceedings of the African Congress of Psychology",
    year: 2018,
    type: "conference",
    keywords: ["peer counseling", "depression", "campus"],
  },
  {
    id: "p14",
    title: "Community-Based Participatory Research in Northern Uganda: Ethics and Impact",
    authors: "Ebenezer, C. K.",
    venue: "American Journal of Community Psychology",
    year: 2017,
    type: "journal",
    keywords: ["CBPR", "ethics", "community"],
  },
  {
    id: "p15",
    title:
      "Early-Life Adversity, Coping Styles, and Adult Mental Health: A 10-Year Cohort",
    authors: "Ebenezer, C. K., Lakot, A.",
    venue: "Journal of Abnormal Psychology",
    year: 2016,
    type: "journal",
    keywords: ["adversity", "coping", "cohort"],
  },
];

export function uniquePublicationYears(): number[] {
  return [...new Set(publications.map((p) => p.year))].sort((a, b) => b - a);
}
