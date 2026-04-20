export const siteConfig = {
  name: " Kisa Christopher Ebenezer",
  title: "Lecturer, Head of department, Faculty of Education and Humanities ",
  university: "Gulu University",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.pages.dev",
  ogImage: "/og-default.png",
  email: "ebenezer.kisa@gu.ac.ug",
  description:
    "Academic profile of  Kisa Christopher Ebenezer — lecturer, Head of department, Faculty of Education and Humanities at Gulu University.",
  links: {
    linkedin: "https://www.linkedin.com/in/",
    github: "https://github.com/christopherkisa/",
    x:"",
    orchid:'',
    scholar:'',
  },
  office: {
    room: "Faculty Block C, Room 204",
    hours: "Tue & Thu, 14:00–16:00 EAT (by appointment)",
  },
  bioShort:
    "12+ years of university teaching with 1 peer-reviewed publication; . Passionate about evidence-based pedagogy and community-engaged research.",
  heroImage:
    "/my photo.jpeg",
} as const;