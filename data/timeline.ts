export interface TimelineEntry {
  title: string;
  organization: string;
  period: string;
  description?: string;
  type: "education" | "experience";
}

export const timeline: TimelineEntry[] = [
  // Add your education and experience entries here. Example:
  {
    title: "B.Sc. in Computer and Systems Engineering",
    organization: "Zagazig University",
    period: "2020 - 2026",
    description: "Information Security and Systems Engineering.",
    type: "education",
  },
];
