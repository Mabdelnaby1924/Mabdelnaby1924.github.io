"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FileText, FolderGit2, Download } from "lucide-react";
import { SocialLinks } from "./SocialLinks";

/**
 * Multilingual name variants for the typing animation.
 * PRD requires "Animated multilingual name" in the Hero.
 */
const NAME_ENGLISH = "Hello.. I'm Mahmoud";
const NAME_ARABIC = "مرحبًا.. أنا محمود";
const OTHER_NAMES = [
  "Bonjour.. Je suis Mahmoud",     // French
  "Hallo.. Ich bin Mahmoud",     // German
  "Ciao.. Io sono Mahmoud",   // Italian
  "Hola.. Soy Mahmoud",     // Spanish
  "Merhaba.. Ben Mehmut",        // Turkish
  "سلام.. من محمود هستم",       // Persian (Farsi)
  "Здравствуйте.. Я Махмуд",      // Russian
  "你好.. 我是马哈茂德",      // Chinese
  "こんにちは.. 私はマハメドです",   // Japanese
];

const TYPING_SPEED = 80;
const DELETING_SPEED = 50;
const PAUSE_DURATION = 2000;

const getRandomName = () => {
  const rand = Math.random();
  if (rand < 0.3) return NAME_ENGLISH; // 30% probability
  if (rand < 0.7) return NAME_ARABIC; // 40% probability
  return OTHER_NAMES[Math.floor(Math.random() * OTHER_NAMES.length)]; // 30% remaining
};

export function Hero() {
  const [currentName, setCurrentName] = useState(NAME_ENGLISH);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          // Typing
          if (displayText.length < currentName.length) {
            setDisplayText(currentName.slice(0, displayText.length + 1));
          } else {
            // Finished typing — pause then start deleting
            setTimeout(() => setIsDeleting(true), PAUSE_DURATION);
          }
        } else {
          // Deleting
          if (displayText.length > 0) {
            setDisplayText(displayText.slice(0, -1));
          } else {
            // Finished deleting — select next name
            setIsDeleting(false);

            // Pick a new random name that is different from the current one (if possible)
            let nextName = getRandomName();
            while (nextName === currentName && OTHER_NAMES.length > 0) {
              nextName = getRandomName();
            }
            setCurrentName(nextName);
          }
        }
      },
      isDeleting ? DELETING_SPEED : TYPING_SPEED
    );

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentName]);

  return (
    <section className="py-20 md:py-28">
      <div className="max-w-5xl mx-auto px-4">
        <div className="max-w-2xl">
          {/* Multilingual animated name */}
          <div className="mb-4 h-12 md:h-14 flex items-center">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              {displayText}
              <span className="animate-pulse text-accent">|</span>
            </h1>
          </div>

          {/* Title */}
          <p className="text-lg md:text-xl text-accent font-medium mb-4">
            Security Analyst | DevOps Engineer
          </p>

          {/* Introduction */}
          <p className="text-foreground-secondary leading-relaxed mb-8 max-w-xl">
            Focused on security analysis, incident response, and building
            resilient infrastructure. Sharing reports, projects, and technical
            knowledge.
          </p>

          {/* Action buttons */}
          <div className="flex flex-wrap gap-3 mb-8">
            <Link
              href="/reports"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-accent text-accent-foreground text-sm font-medium hover:bg-accent-hover transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <FileText size={16} />
              View Reports
            </Link>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border text-foreground text-sm font-medium hover:bg-card-hover transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <FolderGit2 size={16} />
              View Projects
            </Link>
            <a
              href="/resume/Mahmoud_Abdelnaby_CV.pdf"
              download
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border text-foreground text-sm font-medium hover:bg-card-hover transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <Download size={16} />
              Download CV
            </a>
          </div>

          {/* Social icons */}
          <SocialLinks />
        </div>
      </div>
    </section>
  );
}
