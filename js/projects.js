/* ============================================================
   projects.js — Project data only.
   Add a new object to the array and the card renders automatically.

   Fields:
     title       (string)  required
     description (string)  required — 1–2 short sentences
     tech        (string[]) required — shown as tags
     image       (string)  path to screenshot, e.g. 'assets/images/my-app.png'
                           leave '' to auto-generate a gradient placeholder
     repo        (string)  GitHub URL — omit or '' to hide the button
     demo        (string)  live URL — omit or '' to hide the button
     featured    (boolean) optional — highlights the card
   ============================================================ */

const PROJECTS = [
  {
    title: 'Gig Worker Platform',
    description:
      'Collaborative gig-economy platform where users register as workers, upload verification documents and manage profiles. Django REST + JWT backend with a React dashboard featuring maps and analytics charts.',
    tech: ['React', 'Django REST', 'Python', 'JWT', 'Leaflet', 'Chart.js'],
    image: 'assets/images/gig-worker.png', // REPLACE: 'assets/images/gig-worker.png'
    repo: 'https://github.com/saurabh2059/gig_worker_deployed_project',
    demo: '',
    featured: true,
  },
  {
    title: 'IRD Prize Checker',
    description:
      'Unofficial MERN app for checking Nepal Taxpayer Incentive Gift Programme coupon numbers against published winner lists, with scheduled scraping of the IRD JSON API and browsable draws by date range.',
    tech: ['React', 'Node.js', 'Express', 'MongoDB', 'node-cron', 'Helmet'],
    image: '', // REPLACE: 'assets/images/ird-prize.png'
    repo: 'https://github.com/saurabh2059/ird-prize',
    demo: '',
    featured: true,
  },
  {
    title: 'Eventora — Event Booking System',
    description:
      'Full-stack event booking platform with JWT authentication, email notifications via Nodemailer and a Tailwind-styled React client for browsing and reserving events.',
    tech: ['React', 'Tailwind CSS', 'Express', 'MongoDB', 'JWT', 'Nodemailer'],
    image: '', // REPLACE: 'assets/images/eventora.png'
    repo: 'https://github.com/saurabh2059/eventora',
    demo: '',
  },
  {
    title: 'YouTube Backend API',
    description:
      'Production-style video platform REST API with user auth, refresh tokens, Cloudinary media uploads via Multer and aggregate pagination for feeds and comments.',
    tech: ['Node.js', 'Express', 'MongoDB', 'Mongoose', 'JWT', 'Cloudinary'],
    image: '', // REPLACE: 'assets/images/youtube-backend.png'
    repo: 'https://github.com/saurabh2059/youtube_backend',
    demo: '',
  },
  {
    title: 'React Grocery E-Commerce',
    description:
      'Responsive storefront with category browsing, product detail pages and client-side routing, styled with SCSS and built on Vite for fast reloads.',
    tech: ['React', 'React Router', 'SCSS', 'Vite'],
    image: '', // REPLACE: 'assets/images/grocery.png'
    repo: 'https://github.com/saurabh2059/groceryUpdated',
    demo: '',
  },
];

window.PROJECTS = PROJECTS;
