export interface Certification {
  name: string;
  issuer: string;
  date: string;
  credentialUrl?: string;
  badgeUrl?: string;
}

export const certifications: Certification[] = [
  // Add your certifications here. Example:
  {
    name: "CCNA",
    issuer: "with Eng. Ahmed Nabil",
    date: "2023",
    // credentialUrl: "",
  },
  {
    name: "RHCSA",
    issuer: "Self-study",
    date: "2024",
    // credentialUrl: "",
  },
  {
    name: "OSCP",
    issuer: "Self-study",
    date: "2025",
    // credentialUrl: "",
  },
  // {
  //   name: "RHEL System Administration I",
  //   issuer: "ITI - maharatech platform",
  //   date: "November 2024",
  //   credentialUrl: "https://drive.google.com/drive/u/2/folders/1dx47wRSE1Rqm3rahF56nMZ9OEJXXQxfJ",
  // },
  {
    name: "SOC T1",
    issuer: "Tryhackme Platform",
    date: "2026",
    credentialUrl: "https://drive.google.com/file/d/1KOHDvrha-F7NRrdM4pOxEzvT0kbpdl4d/view?usp=sharing",
  },
  {
    name: "SOC training labs",
    issuer: "SheftZero Training Platform",
    date: "2026",
    credentialUrl: "https://drive.google.com/file/d/1pTya-3xbVvyG4qEh5YuGx0NTgj338ohy/view?usp=sharing",
  },
  {
    name: "Jr Penetration Tester",
    issuer: "TryHackMe Platform",
    date: "November 2023",
    credentialUrl: "https://drive.google.com/file/d/1k8i3f_6caNmxzANVYRhB-SEv9H6V28P_/view?usp=sharing",
  },
  {
    name: "ICMTC Competition",
    issuer: "Military Technical College - الكلية الفنية العسكرية",
    date: "June 2024",
    credentialUrl: "https://drive.google.com/file/d/18fJ7S6tjY4kVyQ_Glmkd5ufe0-O3H5q6/view?usp=sharing",
  },
];
