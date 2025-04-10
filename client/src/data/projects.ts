interface Project {
  id: number;
  title: string;
  description: string;
  icon: string;
  gradient: {
    from: string;
    to: string;
  };
  technologies: string[];
}

export const projects: Project[] = [
  {
    id: 1,
    title: "NFC Cards Management System",
    description: "A complete system for managing NFC cards with user authentication, card tracking, and admin panel.",
    icon: "id-card",
    gradient: {
      from: "blue-500",
      to: "purple-600"
    },
    technologies: ["React.js", "Node.js", "MongoDB"]
  },
  {
    id: 2,
    title: "Surgical Scheduling Management",
    description: "Software for hospitals to manage surgical schedules, staff, and patient records efficiently.",
    icon: "hospital",
    gradient: {
      from: "green-500",
      to: "teal-600"
    },
    technologies: ["React.js", "Express", "Redux"]
  },
  {
    id: 3,
    title: "Language Learning App",
    description: "Mobile application for language learning with interactive lessons and progress tracking.",
    icon: "language",
    gradient: {
      from: "yellow-500",
      to: "orange-600"
    },
    technologies: ["React Native", "Firebase", "Redux"]
  },
  {
    id: 4,
    title: "Admin Panel for Learning App",
    description: "Comprehensive admin dashboard for managing users, content, and analytics for the language app.",
    icon: "user-shield",
    gradient: {
      from: "purple-500",
      to: "indigo-600"
    },
    technologies: ["React.js", "Material UI", "Node.js"]
  }
];
