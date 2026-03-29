"use client";

import { motion } from "framer-motion";
import { Microscope, Users, BookMarked } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const items = [
  {
    icon: Microscope,
    title: "Community-engaged interventions",
    text: "Designing stigma-reduction and resilience programs with local partners and student co-researchers.",
  },
  {
    icon: Users,
    title: "Higher-education wellbeing",
    text: "Longitudinal work on sleep, screen use, and academic engagement in resource-conscious settings.",
  },
  {
    icon: BookMarked,
    title: "Open scholarship",
    text: "Preregistered studies, replication-friendly materials, and mentoring in transparent methods.",
  },
];

export function ResearchHighlights() {
  return (
    <section
      className="border-t border-border/80 bg-muted/20 py-16"
      aria-labelledby="research-highlights-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2
          id="research-highlights-heading"
          className="font-display text-3xl font-bold tracking-tight"
        >
          Research highlights
        </h2>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Themes that shape teaching, mentoring, and collaborations across Northern Uganda and beyond.
        </p>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.45 }}
            >
              <Card className="h-full border-border/80 bg-card/80 backdrop-blur">
                <CardContent className="space-y-3 p-6">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-accent/15 text-accent">
                    <item.icon className="h-5 w-5" aria-hidden />
                  </div>
                  <h3 className="font-display text-lg font-semibold">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {item.text}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
