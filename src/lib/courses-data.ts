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
  ];

export function coursesByStatus(status: Course["status"]) {
  return courses.filter((c) => c.status === status);
}
