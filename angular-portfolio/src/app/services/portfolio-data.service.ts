import { Injectable } from '@angular/core';
import { Project, TechStack, ContactInfo } from '../models/portfolio.interface';

@Injectable({
  providedIn: 'root'
})
export class PortfolioDataService {

  private projects: Project[] = [
    {
      id: '1',
      title: 'SaaS Analytics Platform',
      description: 'A comprehensive analytics dashboard for SaaS businesses with real-time metrics, user behavior tracking, and revenue insights. Built with modern web technologies for scalability.',
      image: 'assets/web-development-1.jpg',
      category: 'SaaS Platform'
    },
    {
      id: '2',
      title: 'E-commerce Marketplace',
      description: 'Full-stack e-commerce solution with advanced search, payment integration, and vendor management. Optimized for performance and user experience.',
      image: 'assets/web-development-2.jpg',
      category: 'E-commerce'
    },
    {
      id: '3',
      title: 'Project Management Tool',
      description: 'Collaborative project management platform with real-time updates, team communication, and advanced reporting features. Perfect for remote teams.',
      image: 'assets/web-development-3.jpg',
      category: 'Productivity'
    },
    {
      id: '4',
      title: 'FinTech Dashboard',
      description: 'Financial technology platform with portfolio tracking, investment analytics, and risk assessment tools. Secure and compliant with industry standards.',
      image: 'assets/web-development-4.jpg',
      category: 'FinTech'
    },
    {
      id: '5',
      title: 'Learning Management System',
      description: 'Modern LMS with interactive courses, progress tracking, and certification management. Designed for educational institutions and corporate training.',
      image: 'assets/web-development-5.jpg',
      category: 'EdTech'
    },
    {
      id: '6',
      title: 'Healthcare Portal',
      description: 'Patient management system with appointment scheduling, medical records, and telemedicine capabilities. HIPAA compliant and user-friendly.',
      image: 'assets/web-development-6.jpg',
      category: 'HealthTech'
    },
    {
      id: '7',
      title: 'Social Media Platform',
      description: 'Next-generation social platform with advanced privacy controls, content moderation, and community building features. Built for the modern web.',
      image: 'assets/web-development-7.jpg',
      category: 'Social Media'
    },
    {
      id: '8',
      title: 'AI-Powered CRM',
      description: 'Customer relationship management system enhanced with AI for lead scoring, automated workflows, and predictive analytics. Boost your sales efficiency.',
      image: 'assets/web-development-8.jpg',
      category: 'AI/CRM'
    }
  ];

  private frameworks: TechStack[] = [
    { name: 'Angular', url: 'https://angular.io', category: 'framework' },
    { name: 'React', url: 'https://reactjs.org', category: 'framework' },
    { name: 'Vue.js', url: 'https://vuejs.org', category: 'framework' },
    { name: 'Next.js', url: 'https://nextjs.org', category: 'framework' },
    { name: 'Node.js', url: 'https://nodejs.org', category: 'framework' },
    { name: 'Express', url: 'https://expressjs.com', category: 'framework' },
    { name: 'NestJS', url: 'https://nestjs.com', category: 'framework' },
    { name: 'FastAPI', url: 'https://fastapi.tiangolo.com', category: 'framework' }
  ];

  private tools: TechStack[] = [
    { name: 'TypeScript', url: 'https://typescriptlang.org', category: 'tool' },
    { name: 'JavaScript', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript', category: 'tool' },
    { name: 'Python', url: 'https://python.org', category: 'tool' },
    { name: 'PostgreSQL', url: 'https://postgresql.org', category: 'tool' },
    { name: 'MongoDB', url: 'https://mongodb.com', category: 'tool' },
    { name: 'Redis', url: 'https://redis.io', category: 'tool' },
    { name: 'Docker', url: 'https://docker.com', category: 'tool' },
    { name: 'AWS', url: 'https://aws.amazon.com', category: 'tool' },
    { name: 'Vercel', url: 'https://vercel.com', category: 'tool' },
    { name: 'Figma', url: 'https://figma.com', category: 'tool' }
  ];

  private contactInfo: ContactInfo = {
    email: 'shahenshah.malik@hotmail.com',
    phone: '+91 9999999999',
    location: 'New Delhi, India',
    socialLinks: [
      { platform: 'GitHub', url: 'https://github.com/shahnshahmalik', icon: 'fab fa-github' },
      { platform: 'LinkedIn', url: 'https://linkedin.com/in/shahnshahmalik', icon: 'fab fa-linkedin' },
      { platform: 'Twitter', url: 'https://twitter.com/shahnshahmalik', icon: 'fab fa-twitter' },
      { platform: 'Dribbble', url: 'https://dribbble.com/shahnshahmalik', icon: 'fab fa-dribbble' }
    ]
  };

  getProjects(): Project[] {
    return this.projects;
  }

  getFrameworks(): TechStack[] {
    return this.frameworks;
  }

  getTools(): TechStack[] {
    return this.tools;
  }

  getContactInfo(): ContactInfo {
    return this.contactInfo;
  }
}
