export interface Project {
  id: string;
  title: string;
  image: string;
  description?: string;
  category?: string;
}

export interface TechStack {
  name: string;
  url: string;
  category: 'framework' | 'tool';
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface ContactInfo {
  phone: string;
  email: string;
  address: {
    street: string;
    city: string;
    country: string;
  };
  social: SocialLink[];
}

export interface PortfolioData {
  personal: {
    name: string;
    title: string;
    description: string;
    location: string;
  };
  projects: Project[];
  techStack: TechStack[];
  contact: ContactInfo;
}
