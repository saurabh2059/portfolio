/* ============================================================
   data.js — ALL personal content lives here.
   Edit this file to update the site. No HTML changes needed.
   ============================================================ */

const SITE_DATA = {
  /* ---------- Identity ---------- */
  name: 'Saurabh Aryal',
  shortName: 'Saurabh',
  initials: 'SA',
  role: 'Full Stack Developer',

  // One-liner shown under the name in the hero
  tagline: 'MERN stack developer building responsive web apps and REST APIs.',

  // 1–2 sentence hero intro
  heroIntro:
    'I build practical, user-friendly and scalable web solutions — from database schema to polished UI.',

  /* ---------- About ---------- */
  about: {
    // REPLACE: your bio paragraphs (each string = one paragraph)
    paragraphs: [
      'Full Stack Developer skilled in the MERN stack, with experience building responsive web applications and REST APIs. Familiar with PostgreSQL and MySQL, with basic knowledge of Figma and Canva for UI design and visual content creation.',
      'I care about clean architecture, readable code and interfaces that feel effortless to use. Most of my work sits somewhere between designing a sane data model and shipping an interface people actually enjoy.',
    ],
    // Small "fun fact" / personal touch line
    funFact:
      'Fun fact: I started with C/C++ before the web — which is probably why I still enjoy chasing down performance problems.',
    // Quick stat chips shown beside the bio
    highlights: [
      { value: 'MERN', label: 'Primary stack' },
      { value: 'REST', label: 'API design' },
      { value: 'SQL + NoSQL', label: 'Databases' },
      { value: 'UI/UX', label: 'Figma & Canva' },
    ],
  },

  /* ---------- CV ----------
     Drop your PDF at assets/cv.pdf (relative path works locally + deployed). */
  cv: {
    path: 'assets/cv.pdf',
    downloadName: 'Saurabh-Aryal-CV.pdf',
  },

  /* ---------- Contact / socials ----------
     `icon` maps to an inline SVG defined in script.js (ICONS object). */
  email: 'aryalsaurabh141@gmail.com',
  socials: [
    { id: 'github', label: 'GitHub', url: 'https://github.com/saurabh2059', icon: 'github' },
    { id: 'linkedin', label: 'LinkedIn', url: 'https://www.linkedin.com/in/saurabh-aryal-b326932ab/', icon: 'linkedin' },
    { id: 'email', label: 'Email', url: 'mailto:aryalsaurabh141@gmail.com', icon: 'mail' },
  ],

  /* ---------- Nav ---------- */
  nav: [
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
  ],

  /* ---------- Skills ----------
     Grouped display, no percentage bars. Add/remove freely. */
  skills: [
    {
      group: 'Frontend',
      icon: 'layout',
      items: ['React', 'JavaScript (ES6+)', 'HTML5', 'CSS3', 'Responsive Design'],
    },
    {
      group: 'Backend',
      icon: 'server',
      items: ['Node.js', 'Express.js', 'REST APIs', 'Authentication (JWT)', 'Nodemailer'],
    },
    {
      group: 'Databases',
      icon: 'database',
      items: ['MongoDB', 'PostgreSQL', 'MySQL', 'Mongoose'],
    },
    {
      group: 'Languages',
      icon: 'code',
      items: ['JavaScript', 'C', 'C++', 'SQL'],
    },
    {
      group: 'Design',
      icon: 'pen',
      items: ['Figma', 'Canva', 'UI Prototyping'],
    },
    {
      group: 'Tools',
      icon: 'tool',
      items: ['Git', 'GitHub', 'VS Code', 'Postman', ],
    },
  ],

  /* ---------- Contact section copy ---------- */
  contact: {
    heading: "Let's build something",
    blurb:
      "Open to internships, freelance work and full-time roles. Send a message and I'll get back to you.",
  },
};

// Expose globally (plain script tags, no modules/bundler).
window.SITE_DATA = SITE_DATA;
