export interface ProfileData {
  summary: string | string[];
  achievements: Achievement[];
  languages: Language[];
}

export interface Achievement {
  title: string;
  description?: string;
}

export interface Language {
  name: string;
  level: string;
}

export const profile: ProfileData = {
  summary: [
    "Mahmoud is a Computer and Systems Engineer whose foundation was built on understanding how complex systems are designed, connected, and kept running, a vantage point that now shapes how he approaches securing them.",
    "His work centers on Security Operations and Digital Forensics & Incident Response: monitoring environments for signs of compromise, investigating alerts, and reconstructing incidents to understand not just what happened, but why it happened and what it means. Behind that analytical instinct sits a solid grounding in networking, and in Linux and Windows administration, the kind of context that turns a raw alert into a real story. ",
    "That same engineering curiosity pulls him toward the offensive side of security as well. Through penetration testing and malware analysis, he studies how systems fail from the attacker's perspective, which sharpens the way he defends them from his own. Scripting and automation tie it all together, turning repetitive analysis into something faster and more reliable.",

    "What stays constant across all of it is adaptability: a readiness to step into unfamiliar technical territory, take ownership of ambiguous problems, and work them through to something concrete."
  ],

  achievements: [
    // Add your achievements here. Example:
    // {
    //   title: "Built a SIEM detection pipeline processing 10M+ events/day",
    //   description: "Using Splunk, Sigma rules, and custom automation.",
    // },
  ],

  languages: [
    // Add your languages here. Example:
    // { name: "English", level: "Native" },
    // { name: "Arabic", level: "Native" },
  ],
};
