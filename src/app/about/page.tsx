import type { Metadata } from "next";
import { profile } from "../../../data/profile";
import { timeline } from "../../../data/timeline";
import { certifications } from "../../../data/certifications";
import { skills, type SkillCategory } from "../../../data/skills";
import { SocialLinks } from "@/components/SocialLinks";
import { SkillIcon } from "@/components/SkillIcon";
import { Download, GraduationCap, Award, Globe, Trophy, User, Mail } from "lucide-react";
import { siteConfig } from "../../../data/site-config";

const pageDescription = "Professional profile, education, certifications, skills, and contact information.";

export const metadata: Metadata = {
  title: "About",
  description: pageDescription,
  openGraph: {
    title: "About",
    description: pageDescription,
    url: `${siteConfig.url}/about`,
  },
  twitter: {
    card: "summary",
    title: "About",
    description: pageDescription,
  },
};

export default function AboutPage() {
  const education = timeline.filter((t) => t.type === "education");
  const experience = timeline.filter((t) => t.type === "experience");

  return (
    <main className="max-w-3xl mx-auto px-4 py-16 w-full">
      <h1 className="text-3xl font-bold text-foreground mb-10">About</h1>

      {/* Professional Summary */}
      <Section icon={<User size={22} />} title="Whoami">
        {Array.isArray(profile.summary) ? (
          <div className="space-y-4 text-foreground-secondary leading-relaxed">
            {profile.summary.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        ) : (
          <p className="text-foreground-secondary leading-relaxed">
            {profile.summary}
          </p>
        )}
      </Section>

      {/* Experience */}
      {experience.length > 0 && (
        <Section icon={<Award size={20} />} title="Experience">
          <TimelineList entries={experience} />
        </Section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <Section icon={<GraduationCap size={20} />} title="Education">
          <TimelineList entries={education} />
        </Section>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <Section icon={<Award size={20} />} title="Certifications & Courses">
          <div className="space-y-3">
            {certifications.map((cert) => (
              <div
                key={cert.name}
                className="flex items-start justify-between gap-4 p-4 rounded-lg border border-card-border bg-card"
              >
                <div>
                  <h3 className="text-sm font-semibold text-foreground">
                    {cert.name}
                  </h3>
                  <p className="text-xs text-foreground-muted">
                    {cert.issuer} · {cert.date}
                  </p>
                </div>
                {cert.credentialUrl && (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-accent hover:text-accent-hover transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
                  >
                    Verify →
                  </a>
                )}
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Technical Skills */}
      <Section icon={<Award size={20} />} title="Technical Skills">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {skills.map((category: SkillCategory) => (
            <div key={category.category}>
              <h3 className="text-sm font-semibold text-accent mb-3 uppercase tracking-wider">
                {category.category}
              </h3>
              <ul className="space-y-2">
                {category.skills.map((skill) => (
                  <li
                    key={skill.name}
                    className="flex items-center gap-2.5 text-sm text-foreground-secondary"
                  >
                    <SkillIcon icon={skill.icon} size={14} />
                    <span>{skill.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      {/* Achievements */}
      {profile.achievements.length > 0 && (
        <Section icon={<Trophy size={20} />} title="Achievements">
          <ul className="space-y-3">
            {profile.achievements.map((a) => (
              <li key={a.title} className="flex items-start gap-3">
                <span className="text-accent mt-1 shrink-0">•</span>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {a.title}
                  </p>
                  {a.description && (
                    <p className="text-xs text-foreground-muted mt-0.5">
                      {a.description}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </Section>
      )}

      {/* Languages */}
      {profile.languages.length > 0 && (
        <Section icon={<Globe size={20} />} title="Languages">
          <div className="flex flex-wrap gap-3">
            {profile.languages.map((lang) => (
              <div
                key={lang.name}
                className="px-4 py-2 rounded-lg border border-card-border bg-card text-sm"
              >
                <span className="font-medium text-foreground">
                  {lang.name}
                </span>
                <span className="text-foreground-muted ml-1.5">
                  — {lang.level}
                </span>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Resume */}
      <Section icon={<Download size={20} />} title="Resume">
        <div className="p-6 rounded-xl border border-card-border bg-card text-center">
          <p className="text-sm text-foreground-secondary mb-4">
            Download my CV to learn more about my experience and
            qualifications.
          </p>
          <a
            href="/resume/Mahmoud_Abdelnaby_CV.pdf"
            download
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-accent text-accent-foreground text-sm font-medium hover:bg-accent-hover transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <Download size={16} />
            Download CV (PDF)
          </a>
        </div>
      </Section>

      {/* Contact */}
      <Section icon={<Mail size={20} />} title="Contact">
        <p className="text-sm text-foreground-secondary mb-4">
          Feel free to reach out through any of these channels.
        </p>
        <SocialLinks size={22} />
      </Section>
    </main>
  );
}

/* ============================================
   Helper components (page-local)
   ============================================ */

function Section({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-12">
      <div className="flex items-center gap-2.5 mb-5">
        <span className="text-accent">{icon}</span>
        <h2 className="text-xl font-bold text-foreground">{title}</h2>
      </div>
      {children}
    </section>
  );
}

function TimelineList({
  entries,
}: {
  entries: { title: string; organization: string; period: string; description?: string }[];
}) {
  return (
    <div className="space-y-4">
      {entries.map((entry) => (
        <div
          key={`${entry.title}-${entry.organization}`}
          className="relative pl-6 border-l-2 border-border"
        >
          <div className="absolute left-[-5px] top-1.5 w-2 h-2 rounded-full bg-accent" />
          <h3 className="text-sm font-semibold text-foreground">
            {entry.title}
          </h3>
          <p className="text-xs text-foreground-muted">
            {entry.organization} · {entry.period}
          </p>
          {entry.description && (
            <p className="text-sm text-foreground-secondary mt-1">
              {entry.description}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
