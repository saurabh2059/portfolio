/* ============================================================
   script.js — all behaviour, split into small init functions.
   Depends on: data.js (SITE_DATA) and projects.js (PROJECTS)
   ============================================================ */

(() => {
  'use strict';

  const DATA = window.SITE_DATA || {};
  const PROJECT_LIST = window.PROJECTS || [];

  /* ---------- Tiny DOM helpers ---------- */
  const $  = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

  /* ---------- Inline SVG icon set (no external icon library) ---------- */
  const ICONS = {
    github:
      '<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.9a3.4 3.4 0 0 0-.9-2.6c3-.3 6.2-1.5 6.2-6.7A5.2 5.2 0 0 0 19.9 5a4.9 4.9 0 0 0-.1-3.6s-1.1-.3-3.7 1.4a12.6 12.6 0 0 0-6.6 0C6.9 1.1 5.8 1.4 5.8 1.4A4.9 4.9 0 0 0 5.7 5a5.2 5.2 0 0 0-1.4 3.6c0 5.2 3.2 6.4 6.2 6.7a3.4 3.4 0 0 0-.9 2.6V22"/>',
    linkedin:
      '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>',
    mail:
      '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/>',
    download:
      '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5"/><path d="M12 15V3"/>',
    external:
      '<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><path d="M15 3h6v6"/><path d="M10 14 21 3"/>',
    folder:
      '<path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.7-.9l-.8-1.2A2 2 0 0 0 7.9 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2z"/>',
    send:
      '<path d="m22 2-7 20-4-9-9-4 20-7z"/><path d="M22 2 11 13"/>',
    sun:
      '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
    moon:
      '<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>',
    'arrow-up':   '<path d="M12 19V5"/><path d="m5 12 7-7 7 7"/>',
    'arrow-down': '<path d="M12 5v14"/><path d="m19 12-7 7-7-7"/>',
    layout:
      '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/>',
    server:
      '<rect x="2" y="3" width="20" height="8" rx="2"/><rect x="2" y="13" width="20" height="8" rx="2"/><path d="M6 7h.01M6 17h.01"/>',
    database:
      '<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.7 4 3 9 3s9-1.3 9-3V5"/><path d="M3 12c0 1.7 4 3 9 3s9-1.3 9-3"/>',
    code:
      '<path d="m16 18 6-6-6-6"/><path d="m8 6-6 6 6 6"/>',
    pen:
      '<path d="M12 19h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/>',
    tool:
      '<path d="M14.7 6.3a4 4 0 0 0 5 5l-9.4 9.4a2.1 2.1 0 0 1-3-3z"/><path d="M14.7 6.3 18 3l3 3-3.3 3.3"/>',
  };

  /** Build an inline SVG string for a given icon key. */
  const svg = (name) =>
    ICONS[name]
      ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9"
              stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name]}</svg>`
      : '';

  /** Replace every <span data-icon="x"> placeholder with its SVG. */
  function paintIcons(root = document) {
    $$('[data-icon]', root).forEach((el) => {
      if (el.dataset.painted) return;
      el.innerHTML = svg(el.dataset.icon);
      el.dataset.painted = '1';
    });
  }

  /* ------------------------------------------------------------
     Content injection — keeps HTML free of duplicated copy
     ------------------------------------------------------------ */
  function renderStaticText() {
    // Simple [data-site="key"] bindings
    $$('[data-site]').forEach((el) => {
      const value = DATA[el.dataset.site];
      if (typeof value === 'string') el.textContent = value;
    });

    $('#year').textContent = new Date().getFullYear();

    // CV buttons (download + view in new tab)
    const { path, downloadName } = DATA.cv || {};
    if (path) {
      ['#nav-cv', '#hero-cv'].forEach((sel) => {
        const el = $(sel);
        if (!el) return;
        el.href = path;
        el.setAttribute('download', downloadName || '');
      });
      const view = $('#hero-cv-view');
      if (view) view.href = path;
    }

    // Contact copy
    if (DATA.contact) {
      $('#contact-heading').textContent = DATA.contact.heading;
      $('#contact-blurb').textContent = DATA.contact.blurb;
    }
    const mail = $('#contact-mail');
    if (mail && DATA.email) {
      mail.href = `mailto:${DATA.email}`;
      mail.textContent = DATA.email;
    }

    // Profile photo: fall back to an initials placeholder if the file is missing
    const img = $('#profile-img');
    if (img) {
      img.addEventListener('error', () => {
        const wrap = img.closest('.avatar');
        wrap.classList.add('is-placeholder');
        wrap.dataset.initials = DATA.initials || '';
      });
    }
  }

  function renderNav() {
    const list = $('#nav-list');
    if (!list) return;
    list.innerHTML = (DATA.nav || [])
      .map(
        (item) =>
          `<li><a class="nav__link" href="#${item.id}" data-scroll>${item.label}</a></li>`
      )
      .join('');
  }

  function renderSocials() {
    const items = DATA.socials || [];
    const markup = (compact) =>
      items
        .map((s) => {
          const label = compact ? '' : `<span>${s.label}</span>`;
          const external = s.url.startsWith('mailto:')
            ? ''
            : ' target="_blank" rel="noopener noreferrer"';
          return `<li><a href="${s.url}"${external} aria-label="${s.label}"
                    title="${s.label}"><span class="icon" data-icon="${s.icon}"></span>${label}</a></li>`;
        })
        .join('');

    const hero = $('#hero-socials');
    const footer = $('#footer-socials');
    const contact = $('#contact-socials');
    if (hero) hero.innerHTML = markup(true);
    if (footer) footer.innerHTML = markup(true);
    if (contact) contact.innerHTML = markup(false);
  }

  function renderAbout() {
    const about = DATA.about || {};
    const text = $('#about-text');
    if (text) text.innerHTML = (about.paragraphs || []).map((p) => `<p>${p}</p>`).join('');

    const stats = $('#about-highlights');
    if (stats) {
      stats.innerHTML = (about.highlights || [])
        .map((h) => `<li><strong>${h.value}</strong><span>${h.label}</span></li>`)
        .join('');
    }

    const fact = $('#about-fact');
    if (fact) fact.textContent = about.funFact || '';
  }

  function renderSkills() {
    const grid = $('#skills-grid');
    if (!grid) return;
    grid.innerHTML = (DATA.skills || [])
      .map(
        (group, i) => `
        <article class="skill-group reveal" style="--reveal-delay:${i * 70}ms">
          <div class="skill-group__head">
            <span class="skill-group__icon"><span class="icon" data-icon="${group.icon}"></span></span>
            <h3 class="skill-group__title">${group.group}</h3>
          </div>
          <ul class="skill-tags">
            ${group.items.map((it) => `<li class="tag">${it}</li>`).join('')}
          </ul>
        </article>`
      )
      .join('');
  }

  /** Renders project cards from the PROJECTS array in projects.js */
  function renderProjects() {
    const grid = $('#projects-grid');
    if (!grid) return;

    if (!PROJECT_LIST.length) {
      grid.innerHTML = '<p class="projects__empty">// No projects yet — add some in js/projects.js</p>';
      return;
    }

    grid.innerHTML = PROJECT_LIST.map((p, i) => {
      const media = p.image
        ? `<img src="${p.image}" alt="Screenshot of ${p.title}" loading="lazy" />`
        : `<div class="card__placeholder"><span>${p.title.split(' ')[0]}</span></div>`;

      const badge = p.featured ? '<span class="card__badge">Featured</span>' : '';

      const links = [
        p.repo &&
          `<a class="card__link" href="${p.repo}" target="_blank" rel="noopener noreferrer">
             <span class="icon" data-icon="github"></span> Code</a>`,
        p.demo &&
          `<a class="card__link" href="${p.demo}" target="_blank" rel="noopener noreferrer">
             <span class="icon" data-icon="external"></span> Live demo</a>`,
      ]
        .filter(Boolean)
        .join('');

      return `
        <article class="card reveal" style="--reveal-delay:${(i % 3) * 90}ms">
          <div class="card__media">${media}${badge}</div>
          <div class="card__body">
            <h3 class="card__title">${p.title}</h3>
            <p class="card__desc">${p.description}</p>
            <ul class="card__tags">
              ${(p.tech || []).map((t) => `<li class="tag">${t}</li>`).join('')}
            </ul>
            ${links ? `<div class="card__links">${links}</div>` : ''}
          </div>
        </article>`;
    }).join('');
  }

  /* ------------------------------------------------------------
     Behaviour
     ------------------------------------------------------------ */

  /** Mobile menu, smooth scroll, sticky state, active-link highlighting. */
  function initNav() {
    const nav = $('#nav');
    const menu = $('#nav-menu');
    const burger = $('#hamburger');
    const backdrop = $('#nav-backdrop');

    const closeMenu = () => {
      menu.classList.remove('is-open');
      burger.setAttribute('aria-expanded', 'false');
      burger.setAttribute('aria-label', 'Open menu');
      backdrop.classList.remove('is-open');
      backdrop.hidden = true;
      document.body.classList.remove('is-locked');
    };

    const openMenu = () => {
      menu.classList.add('is-open');
      burger.setAttribute('aria-expanded', 'true');
      burger.setAttribute('aria-label', 'Close menu');
      backdrop.hidden = false;
      requestAnimationFrame(() => backdrop.classList.add('is-open'));
      document.body.classList.add('is-locked');
    };

    burger.addEventListener('click', () =>
      menu.classList.contains('is-open') ? closeMenu() : openMenu()
    );
    backdrop.addEventListener('click', closeMenu);

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && menu.classList.contains('is-open')) {
        closeMenu();
        burger.focus();
      }
    });

    // Smooth scroll for in-page anchors (works even if CSS smooth is disabled)
    $$('a[data-scroll]').forEach((link) => {
      link.addEventListener('click', (e) => {
        const target = document.querySelector(link.getAttribute('href'));
        if (!target) return;
        e.preventDefault();
        closeMenu();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // Keep keyboard focus in sync with the visual jump
        target.setAttribute('tabindex', '-1');
        target.focus({ preventScroll: true });
      });
    });

    // Close the mobile drawer when a link is tapped
    menu.addEventListener('click', (e) => {
      if (e.target.closest('a')) closeMenu();
    });

    // Reset drawer state if the viewport grows past the mobile breakpoint
    window.matchMedia('(min-width: 769px)').addEventListener('change', (e) => {
      if (e.matches) closeMenu();
    });

    // Sticky shadow + scroll progress bar
    const progress = $('#scroll-progress');
    const toTop = $('#to-top');

    const onScroll = () => {
      const y = window.scrollY;
      nav.classList.toggle('is-stuck', y > 8);
      toTop.classList.toggle('is-visible', y > 600);

      const max = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.width = `${max > 0 ? (y / max) * 100 : 0}%`;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    toTop.addEventListener('click', () =>
      window.scrollTo({ top: 0, behavior: 'smooth' })
    );
  }

  /** Highlights the nav link of the section currently in view. */
  function initActiveSection() {
    const links = $$('.nav__link');
    const sections = links
      .map((l) => document.querySelector(l.getAttribute('href')))
      .filter(Boolean);
    if (!sections.length) return;

    const setActive = (id) =>
      links.forEach((l) =>
        l.classList.toggle('is-active', l.getAttribute('href') === `#${id}`)
      );

    const observer = new IntersectionObserver(
      (entries) => {
        entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
          .slice(0, 1)
          .forEach((e) => setActive(e.target.id));
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: [0, 0.25, 0.5, 1] }
    );

    sections.forEach((s) => observer.observe(s));
  }

  /** Fade/slide elements in as they enter the viewport. */
  function initScrollAnimations() {
    const items = $$('.reveal');
    if (!('IntersectionObserver' in window)) {
      items.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target); // reveal once
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );

    items.forEach((el) => observer.observe(el));
  }

  /** Dark/light toggle persisted in localStorage, defaults to system preference. */
  function initThemeToggle() {
    const KEY = 'portfolio-theme';
    const btn = $('#theme-toggle');
    const root = document.documentElement;

    const stored = localStorage.getItem(KEY);
    const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    const initial = stored || (prefersLight ? 'light' : 'dark');

    const apply = (theme) => {
      root.setAttribute('data-theme', theme);
      btn.setAttribute('aria-pressed', String(theme === 'light'));
      btn.setAttribute('aria-label', `Switch to ${theme === 'light' ? 'dark' : 'light'} theme`);
    };

    apply(initial);

    btn.addEventListener('click', () => {
      const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      apply(next);
      localStorage.setItem(KEY, next);
    });
  }

  /**
   * Contact form → mailto.
   * Validates fields, then opens the visitor's mail client with a
   * pre-filled subject and body addressed to SITE_DATA.email.
   */
  function initContactForm() {
    const form = $('#contact-form');
    if (!form) return;
    const status = $('#form-status');

    const showError = (input, message) => {
      const field = input.closest('.field');
      field.classList.toggle('has-error', Boolean(message));
      const slot = $(`[data-error-for="${input.id}"]`, field);
      if (slot) slot.textContent = message;
      return !message;
    };

    const validate = () => {
      const name = $('#cf-name');
      const email = $('#cf-email');
      const message = $('#cf-message');

      const okName = showError(name, name.value.trim() ? '' : 'Please enter your name.');
      const okEmail = showError(
        email,
        /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.value.trim())
          ? ''
          : 'Please enter a valid email address.'
      );
      const okMessage = showError(
        message,
        message.value.trim().length >= 10 ? '' : 'Message should be at least 10 characters.'
      );

      return okName && okEmail && okMessage;
    };

    // Clear an error as soon as the user starts fixing it
    $$('input, textarea', form).forEach((el) =>
      el.addEventListener('input', () => {
        if (el.closest('.field').classList.contains('has-error')) showError(el, '');
      })
    );

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      status.textContent = '';

      if (!validate()) {
        status.textContent = 'Please fix the highlighted fields.';
        return;
      }

      const name = $('#cf-name').value.trim();
      const email = $('#cf-email').value.trim();
      const message = $('#cf-message').value.trim();

      const subject = encodeURIComponent(`Portfolio enquiry from ${name}`);
      const body = encodeURIComponent(`${message}\n\n—\n${name}\n${email}`);

      window.location.href = `mailto:${DATA.email}?subject=${subject}&body=${body}`;
      status.textContent = 'Opening your email app…';
      form.reset();
    });
  }

  /* ---------- Boot ---------- */
  function init() {
    renderStaticText();
    renderNav();
    renderSocials();
    renderAbout();
    renderSkills();
    renderProjects();
    paintIcons(); // after all markup exists

    initThemeToggle();
    initNav();
    initActiveSection();
    initScrollAnimations();
    initContactForm();
  }

  document.readyState === 'loading'
    ? document.addEventListener('DOMContentLoaded', init)
    : init();
})();
