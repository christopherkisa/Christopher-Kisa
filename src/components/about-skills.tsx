"use client";

import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";

const skills: { name: string; value: number }[] = [
  { name: "Research design & preregistration", value: 96 },
  { name: "Quantitative methods (SEM, MLM)", value: 92 },
  { name: "Qualitative & mixed methods", value: 88 },
  { name: "Psychometrics & scale adaptation", value: 94 },
  { name: "Teaching & curriculum design", value: 95 },
  { name: "Grant writing & partnerships", value: 82 },
];

export function AboutSkills() {
  return (
    <ul className="space-y-6" aria-label="Core competencies">
      {skills.map((s, i) => (
        <motion.li
          key={s.name}
          className="space-y-2"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ delay: i * 0.06, duration: 0.4 }}
        >
          <div className="flex justify-between text-sm font-medium">
            <span>{s.name}</span>
            <span className="text-muted-foreground">{s.value}%</span>
          </div>
          <Progress value={s.value} aria-label={`${s.name} proficiency ${s.value} percent`} />
        </motion.li>
      ))}
    </ul>
  );
}
