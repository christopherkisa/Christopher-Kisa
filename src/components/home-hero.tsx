"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, BookOpen, Mail } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { Button } from "@/components/ui/button";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
},
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function HomeHero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0.15]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden border-b border-border/80 bg-gradient-to-b from-secondary/40 via-background to-background"
      aria-labelledby="hero-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-accent/10 via-transparent to-transparent"
        aria-hidden
      />
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-[1.1fr_0.9fr] md:items-center md:py-24">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="relative z-10"
        >
          <motion.p
            variants={item}
            className="font-display text-sm font-medium uppercase tracking-widest text-accent"
          >
            {siteConfig.university}
          </motion.p>
          <motion.h1
            id="hero-heading"
            variants={item}
            className="mt-3 font-display text-4xl font-bold leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl"
          >
            {siteConfig.name}
          </motion.h1>
          <motion.p
            variants={item}
            className="mt-4 max-w-xl text-lg text-muted-foreground md:text-xl"
          >
            {siteConfig.title}. {siteConfig.bioShort}
          </motion.p>
          <motion.div
            variants={item}
            className="mt-8 flex flex-wrap gap-3"
          >
            <Button asChild size="lg" className="gap-2">
              <Link href="/publications" aria-label="View publications">
                <BookOpen className="h-4 w-4" />
                Publications
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="gap-2">
              <Link href="/contact" aria-label="Get in touch">
                <Mail className="h-4 w-4" />
                Contact
              </Link>
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          style={{ y, opacity }}
          className="relative z-0 mx-auto w-full max-w-md md:max-w-none"
        >
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-border bg-muted shadow-2xl shadow-primary/10 ring-1 ring-black/5 dark:ring-white/10">
            <Image
              src={siteConfig.heroImage}
              alt={`Professional portrait of ${siteConfig.name}`}
              fill
              priority
              className="object-cover"
              sizes="(min-width: 768px) 40vw, 90vw"
            />
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/40 to-transparent"
              aria-hidden
            />
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="absolute -bottom-6 -left-4 hidden rounded-xl border border-border bg-card/95 p-4 shadow-lg backdrop-blur sm:block md:-left-8"
          >
            <p className="font-display text-2xl font-bold text-primary dark:text-primary-foreground">
            </p>
            <p className="text-xs text-muted-foreground"></p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
