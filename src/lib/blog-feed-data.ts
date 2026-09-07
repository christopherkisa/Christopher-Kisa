export type FeedPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
};

export const feedPosts: FeedPost[] = [
  {
    slug: "open-science-in-the-classroom",
    title: "Open science in the psychology classroom",
    description:
      "Practical ways to bring preregistration and data literacy into undergraduate labs without overwhelming students.",
    date: "2025-01-15",
  },
  {
    slug: "trauma-informed-syllabus-design",
    title: "Trauma-informed syllabus design (that still has standards)",
    description:
      "Balancing rigor with predictability, choice, and care—especially after community disruption.",
    date: "2024-11-02",
  },
  {
    slug: "field-notes-from-gulu",
    title: "Field notes from community listening sessions in Gulu",
    description:
      "What we heard when we slowed down, translated carefully, and paid facilitators as experts.",
    date: "2024-09-18",
  },
  {
    slug: "mentoring-graduate-students-remotely",
    title: "Mentoring graduate students when supervision is hybrid",
    description:
      "Structures that protect focus time, writing momentum, and honest feedback across time zones.",
    date: "2024-07-07",
  },
  {
    slug: "adapting-scales-with-cultural-humility",
    title: "Adapting scales with cultural humility",
    description:
      "A workflow for item review, cognitive interviewing, and local piloting before you claim measurement invariance.",
    date: "2024-04-21",
  },
  {
    slug: "reading-strategies-for-busy-scholars",
    title: "Reading strategies for busy scholars (and their students)",
    description:
      "A tiered approach: skim widely, slow-read deeply, and keep a living map of what matters for your questions.",
    date: "2023-12-05",
  },
];
