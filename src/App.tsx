import { useState } from 'react'
import { FaGithub, FaLinkedin, FaMedium } from 'react-icons/fa6'
import VisitorCounter from './components/VisitorCounter.tsx'

type Certification = {
  title: string
  date: string
}

type Experience = {
  company: string
  role: string
  dates: string
  accomplishments: string[]
}

const socialLinks = [
  {
    href: 'https://www.linkedin.com/in/rgmartinez-cloud/',
    label: 'LinkedIn',
    icon: <FaLinkedin />
  },
  {
    href: 'https://medium.com/@terminalsandcoffee',
    label: 'Medium',
    icon: <FaMedium />
  },
  {
    href: 'https://github.com/TerminalsandCoffee',
    label: 'GitHub',
    icon: <FaGithub />
  }
]

const certifications: Certification[] = [
  { title: 'AWS Certified Security – Specialty SCS-C02', date: 'April 2024' },
  { title: 'AWS Certified SysOps Administrator', date: 'March 2024' },
  { title: 'HashiCorp Certified: Terraform Associate (003)', date: 'November 2025' },
  { title: 'KCNA: Kubernetes and Cloud Native Associate', date: 'October 2025' },
  { title: 'Linux Essentials', date: 'January 2023' },
  { title: 'CompTIA IT Operations Specialist', date: 'September 2022' },
  { title: 'AWS Certified Cloud Practitioner', date: 'May 2022' },
  { title: 'Azure Administrator Associate AZ-104', date: 'April 2022' },
  { title: 'University of Central Florida — B.S. Business Management', date: 'December 2013' }
]

const experiences: Experience[] = [
  {
    company: 'ClearDATA',
    role: 'Cloud Support Engineer',
    dates: 'October 2023 – Present',
    accomplishments: [
      'Serve as the first line of escalation for complex AWS infrastructure incidents, resolving break/fix cases involving EC2, VPC, IAM, and containerized workloads.',
      'Own production EKS and ECS clusters by debugging pod evictions, OOMKills, and node drains, then applying fleet-wide fixes with AWS Systems Manager.',
      'Leverage Terraform and CloudFormation modules to deliver compliant provisioning and patching pipelines for regulated workloads.',
      'Automate support runbooks with Python, Bash, and PowerShell, reducing manual patching effort by 60% through reusable scripts committed to the team repository.',
      'Build and maintain Elastic observability dashboards, alerts, and traces that reduced MTTR for customer incidents by 25%.'
    ]
  },
  {
    company: 'Level Up In Tech',
    role: 'Containers Specialist Coach',
    dates: 'July 2023 – October 2023',
    accomplishments: [
      'Mentored engineers on containerization best practices and production-ready Docker workflows.',
      'Guided teams through Kubernetes fundamentals, cluster design, and troubleshooting techniques.',
      'Championed secure image pipelines, registry hardening, and resource optimization strategies.'
    ]
  },
  {
    company: 'PAR Technology',
    role: 'Technical Support Agent',
    dates: 'November 2022 – October 2023',
    accomplishments: [
      'Resolved complex network issues covering IP addressing, firewalls, DHCP, and DNS under tight SLAs.',
      'Automated triage tasks with PowerShell and Batch scripts, reducing manual effort across the team.',
      'Partnered with product and engineering groups to troubleshoot SaaS platform and hardware incidents.'
    ]
  },
  {
    company: 'Dataprise',
    role: 'Desktop Support Engineer & Azure Administrator',
    dates: 'April 2021 – November 2022',
    accomplishments: [
      'Designed Azure AD implementations with conditional access and MFA for regulated clients.',
      'Developed disaster recovery playbooks using Azure Site Recovery and geo-redundant storage.',
      'Automated Microsoft 365 and Azure administrative workflows using advanced PowerShell modules.'
    ]
  }
]

const navLinks = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#resume', label: 'Certifications' },
  { href: '#work', label: 'Experience' },
  { href: '#views', label: 'Views' },
  { href: '#contact', label: 'Contact' }
]

function App() {
  const [isNavOpen, setIsNavOpen] = useState(false)

  const handleNavToggle = () => setIsNavOpen((open) => !open)
  const handleNavItemClick = () => setIsNavOpen(false)

  return (
    <div className="page">
      <header id="home" className="hero">
        <nav className="navbar">
          <a className="brand" href="#home">
            Rafael Martinez<span>Cloud DevOps Engineer</span>
          </a>
          <button
            className="nav-toggle"
            onClick={handleNavToggle}
            aria-expanded={isNavOpen}
            aria-label="Toggle navigation"
          >
            <span />
            <span />
            <span />
          </button>
          <div className={`nav-links ${isNavOpen ? 'nav-links--open' : ''}`}>
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} onClick={handleNavItemClick}>
                {link.label}
              </a>
            ))}
          </div>
        </nav>
        <div className="hero-content">
          <p className="eyebrow">Howdy, I&apos;m Rafael 🤠👋</p>
          <h1>Cloud DevOps automation for regulated environments.</h1>
          <p className="lede">
            Cloud DevOps Engineer focused on codifying infrastructure with Terraform and Kubernetes.
            I help teams ship reliable, secure platforms that balance automation, performance, and
            cost.
          </p>
          <div className="hero-actions">
            <a className="primary" href="#contact">
              Let&apos;s talk
            </a>
            <a className="secondary" href="#resume">
              View certifications
            </a>
          </div>
          <ul className="social-links">
            {socialLinks.map((social) => (
              <li key={social.label}>
                <a href={social.href} aria-label={social.label} target="_blank" rel="noreferrer">
                  {social.icon}
                </a>
              </li>
            ))}
          </ul>
          <a className="scroll-down" href="#about">
            Scroll for more
          </a>
        </div>
      </header>

      <main>
        <section id="about" className="section about">
          <div className="about-image">
            <img src="/images/newimage.jpg" alt="Rafael Martinez" loading="lazy" />
          </div>
          <div className="about-copy">
            <h2>About Me</h2>
            <p>
              I&apos;m a Cloud DevOps Engineer focused on building secure, scalable infrastructure
              with Terraform and Kubernetes. I design cloud-native systems that balance automation,
              performance, and cost-efficiency&mdash;turning complex architectures into simple,
              repeatable code.
            </p>
            <p>
              From IaC pipelines and container orchestration to monitoring and incident response, I
              bridge development and operations through smart automation and a security-first
              mindset.
            </p>
          </div>
        </section>

        <section id="resume" className="section certifications">
          <div className="section-header">
            <h2>Certifications & Education</h2>
            <p>Validated expertise across cloud security, automation, and enterprise operations.</p>
          </div>
          <ul className="certification-grid">
            {certifications.map((item) => (
              <li key={item.title}>
                <h3>{item.title}</h3>
                <span>{item.date}</span>
              </li>
            ))}
          </ul>
        </section>

        <section id="work" className="section experience">
          <div className="section-header">
            <h2>Experience</h2>
            <p>Leading cloud security initiatives, mentoring engineers, and automating operations.</p>
          </div>
          <div className="experience-timeline">
            {experiences.map((job) => (
              <article key={job.company} className="experience-card">
                <header>
                  <h3>{job.company}</h3>
                  <span className="role">{job.role}</span>
                  <span className="dates">{job.dates}</span>
                </header>
                <ul>
                  {job.accomplishments.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section id="views" className="section stats">
          <div className="section-header">
            <h2>Page Statistics</h2>
            <p>Real-time visitors with retry logic and animation.</p>
          </div>
          <VisitorCounter />
        </section>

        <section id="contact" className="section contact">
          <div className="section-header">
            <h2>Let&apos;s Build Something</h2>
            <p>
              Hiring or need a security-focused partner? I&apos;d love to learn more about your
              cloud roadmap.
            </p>
          </div>
          <a className="email-link" href="mailto:rafael@terminalsandcoffee.com">
            rafael@terminalsandcoffee.com
          </a>
        </section>
      </main>

      <footer className="footer">
        <div className="footer__links">
          {socialLinks.map((social) => (
            <a key={social.label} href={social.href} target="_blank" rel="noreferrer">
              {social.label}
            </a>
          ))}
        </div>
        <p>
          © {new Date().getFullYear()} Rafael Martinez. Built with React, TypeScript, and Vite. Template evolved
          from the original CeeVee design.
        </p>
      </footer>
    </div>
  )
}

export default App

