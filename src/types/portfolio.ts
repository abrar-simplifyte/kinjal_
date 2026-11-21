export interface Education {
  degree: string;
  institution: string;
  year: string;
  status: string;
}

export interface Principle {
  title: string;
  desc: string;
}

export interface WorkExperience {
  role: string;
  company: string;
  period: string;
  highlights: string[];
}

export interface ProfileData {
  name: string;
  title: string;
  location: string;
  city: string;
  bio: string;
  status: string;
  email: string;
  phone: string;
  phoneRaw: string;
  portfolioUrl: string;
  linkedin: string;
  figma: string;
  github: string;
  behance?: string;
  experience: string;
  workExperience?: WorkExperience[];
  education: Education[];
  skillsUIUX: string[];
  skillsTechnical: string[];
  skillsGraphic?: string[];
  skillsTools?: string[];
  skillsSoft: string[];
  languages: string[];
  hobbies: string[];
  principles: Principle[];
}
