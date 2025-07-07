import { Injectable } from '@angular/core';
import { PortfolioData, Project, TechStack, SocialLink } from '../models/portfolio.interface';

@Injectable({
  providedIn: 'root'
})
export class PortfolioDataService {
  private portfolioData: PortfolioData = {
    personal: {
      name: 'Shahnshah Malik',
      title: 'Freelance Web Designer & Developer based in New Delhi, India',
      description: 'Highly experienced in designing and developing responsive websites and web applications.',
      location: 'New Delhi, India'
    },
    projects: [
      {
        id: 'em_i',
        title: 'E-commerce Platform',
        image: 'assets/projects/em_i.png',
        description: 'Modern e-commerce solution',
        category: 'Web Application'
      },
      {
        id: 'em_m_1',
        title: 'Mobile E-commerce',
        image: 'assets/projects/em_m_1.png',
        description: 'Mobile-first e-commerce design',
        category: 'Mobile Design'
      },
      {
        id: 'em_m_2',
        title: 'E-commerce Dashboard',
        image: 'assets/projects/em_m_2.png',
        description: 'Admin dashboard for e-commerce',
        category: 'Dashboard'
      },
      {
        id: 'fn_i',
        title: 'Financial Platform',
        image: 'assets/projects/fn_i.png',
        description: 'Financial services platform',
        category: 'FinTech'
      },
      {
        id: 'fn_m_1',
        title: 'Mobile Banking',
        image: 'assets/projects/fn_m_1.png',
        description: 'Mobile banking application',
        category: 'Mobile App'
      },
      {
        id: 'fn_m_2',
        title: 'Investment Dashboard',
        image: 'assets/projects/fn_m_2.png',
        description: 'Investment tracking dashboard',
        category: 'Dashboard'
      },
      {
        id: 'ta_m_1',
        title: 'Task Management',
        image: 'assets/projects/ta_m_1.png',
        description: 'Project management tool',
        category: 'Productivity'
      },
      {
        id: 'ta_m_2',
        title: 'Team Collaboration',
        image: 'assets/projects/ta_m_2.png',
        description: 'Team collaboration platform',
        category: 'Collaboration'
      }
    ],
    techStack: [
      { name: 'Angular', url: 'https://angular.io/', category: 'framework' },
      { name: 'ReactJs', url: 'https://reactjs.org/', category: 'framework' },
      { name: 'CodeIgniter', url: 'https://codeigniter.com/', category: 'framework' },
      { name: 'Laravel', url: 'https://laravel.com/', category: 'framework' },
      { name: 'ExpressJs', url: 'https://expressjs.com/', category: 'framework' },
      { name: 'Loopback', url: 'https://loopback.io/', category: 'framework' },
      { name: 'Apache', url: 'https://httpd.apache.org/', category: 'tool' },
      { name: 'MySQL', url: 'https://www.mysql.com/', category: 'tool' },
      { name: 'NodeJs', url: 'https://nodejs.org/en/', category: 'framework' },
      { name: 'Jira', url: 'https://www.atlassian.com/software/jira', category: 'tool' },
      { name: 'Git', url: 'https://git-scm.com/', category: 'tool' },
      { name: 'Adobe XD', url: 'https://www.adobe.com/in/products/xd.html', category: 'tool' }
    ],
    contact: {
      phone: '+91 888 267 0684',
      email: 'shahnshahmalik@protonmail.com',
      address: {
        street: 'Okhla',
        city: 'New Delhi',
        country: 'India'
      },
      social: [
        {
          platform: 'Facebook',
          url: 'https://www.facebook.com/shahenshah.malik.98',
          icon: 'fab fa-facebook'
        },
        {
          platform: 'Twitter',
          url: 'https://twitter.com/shah3nshah',
          icon: 'fab fa-twitter'
        },
        {
          platform: 'Stack Overflow',
          url: 'https://stackoverflow.com/users/5668376/shahnshah',
          icon: 'fab fa-stack-overflow'
        },
        {
          platform: 'Medium',
          url: 'https://medium.com/@luv200',
          icon: 'fab fa-medium'
        }
      ]
    }
  };

  getPortfolioData(): PortfolioData {
    return this.portfolioData;
  }

  getProjects(): Project[] {
    return this.portfolioData.projects;
  }

  getTechStack(): TechStack[] {
    return this.portfolioData.techStack;
  }

  getFrameworks(): TechStack[] {
    return this.portfolioData.techStack.filter(tech => tech.category === 'framework');
  }

  getTools(): TechStack[] {
    return this.portfolioData.techStack.filter(tech => tech.category === 'tool');
  }
}
