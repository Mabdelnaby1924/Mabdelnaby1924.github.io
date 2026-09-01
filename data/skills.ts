export interface Skill {
  name: string;
  /** Simple Icons slug (e.g., "docker", "python") or lucide icon name prefixed with "lucide:" (e.g., "lucide:shield") */
  icon: string;
}

export interface SkillCategory {
  category: string;
  skills: Skill[];
}

export const skills: SkillCategory[] = [
  {
    category: "Security Operations & SOC",
    skills: [
      { name: "Alert Triage", icon: "lucide:shield-check" },
      { name: "Threat Detection", icon: "lucide:radar" },
      { name: "MITRE ATT&CK", icon: "lucide:crosshair" },
      // { name: "Sigma Rules", icon: "sigma" },
      { name: "Splunk", icon: "splunk" },
      { name: "Elastic (ELK)", icon: "elastic" },
      // { name: "Wazuh", icon: "local:wazuh" },
      // { name: "Microsoft Sentinel", icon: "lucide:shield" },
      // { name: "IBM QRadar", icon: "lucide:activity" },
    ],
  },
  {
    category: "Digital Forensics & Incident Response",
    skills: [
      { name: "Digital Forensics", icon: "lucide:search" },
      { name: "Incident Response", icon: "lucide:siren" },
      { name: "Timeline Reconstruction", icon: "lucide:git-commit-horizontal" },
      { name: "Wireshark", icon: "wireshark" },
      { name: "VirusTotal", icon: "virustotal" },
      { name: "Sysinternals", icon: "lucide:terminal" },
      { name: "KAPE", icon: "lucide:package-search" },
      { name: "FTK Imager", icon: "lucide:hard-drive" },
    ],
  },
  {
    category: "Networking",
    skills: [
      // { name: "TCP/IP", icon: "lucide:network" },
      // { name: "DNS", icon: "lucide:globe" },
      { name: "Cisco / CCNA", icon: "cisco" },
      { name: "Network Security", icon: "lucide:shield-alert" },
    ],
  },
  {
    category: "Systems Administration",
    skills: [
      // { name: "RHEL", icon: "redhat" },
      // { name: "Ubuntu", icon: "ubuntu" },
      // { name: "Kali Linux", icon: "kalilinux" },
      { name: "Linux", icon: "linux" },
      // { name: "PowerShell", icon: "powershell" },
      { name: "Bash", icon: "gnubash" },
    ],
  },
  {
    category: "Penetration Testing",
    skills: [
      { name: "Nmap", icon: "lucide:network" },
      { name: "Burp Suite", icon: "lucide:bug" },
      { name: "Metasploit", icon: "metasploit" },
      // { name: "Hydra", icon: "lucide:key-round" },
      // { name: "Hashcat", icon: "hashcat" },
      // { name: "Gobuster", icon: "lucide:search-code" },
      // { name: "SQLmap", icon: "lucide:database-zap" },
      { name: "OWASP Top 10", icon: "owasp" },
    ],
  },
  {
    category: "Malware Analysis & Reverse Engineering",
    skills: [
      { name: "Static & Dynamic Analysis", icon: "lucide:microscope" },
      { name: "Ghidra", icon: "lucide:cpu" },
      { name: "GDB", icon: "gnu" },
      { name: "x64dbg", icon: "lucide:bug-play" },
      { name: "CyberChef", icon: "lucide:flask-conical" },
      { name: "YARA", icon: "lucide:file-search" },
      { name: "Process Explorer", icon: "lucide:list-tree" },
    ],
  },
  {
    category: "Cloud & DevOps",
    skills: [
      { name: "AWS", icon: "local:aws" },
      { name: "Google Cloud", icon: "googlecloud" },
      { name: "Docker", icon: "docker" },
      { name: "Git", icon: "git" },
      { name: "GitHub", icon: "github" },
      { name: "GitHub Actions", icon: "githubactions" },
      { name: "Kubernetes", icon: "kubernetes" },
      // { name: "Terraform", icon: "terraform" },
      // { name: "Ansible", icon: "ansible" },
    ],
  },
  {
    category: "Programming & Scripting",
    skills: [
      // { name: "Python", icon: "python" },
      // { name: "Bash", icon: "gnubash" },
      // { name: "PowerShell", icon: "powershell" },
      { name: "C++", icon: "cplusplus" },
      { name: "JavaScript", icon: "javascript" },
      // { name: "TypeScript", icon: "typescript" },
      { name: "Java", icon: "openjdk" },
    ],
  },
  {
    category: "Backend & Software Engineering",
    skills: [
      { name: "Node.js", icon: "nodedotjs" },
      // { name: "Express.js", icon: "express" },
      { name: "MongoDB", icon: "mongodb" },
      { name: "SQL", icon: "lucide:database" },
      // { name: "DynamoDB", icon: "amazondynamodb" },
      // { name: "Socket.io", icon: "socketdotio" },
      // { name: "Swagger", icon: "swagger" },
    ],
  }
];
