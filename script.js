const pageLoader = document.getElementById('pageLoader');
const header = document.getElementById('siteHeader');
const menuToggle = document.getElementById('menuToggle');
const siteNav = document.getElementById('siteNav');
const year = document.getElementById('year');
const contactForm = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');
const heroVideo = document.getElementById('heroVideo');
const siteOceanVideo = document.getElementById('siteOceanVideo');
const oceanEntryVideo = document.getElementById('oceanEntryVideo');
const oceanParticleCanvas = document.getElementById('oceanParticleCanvas');

document.body.classList.add('no-scroll');

const hideLoader = () => {
  pageLoader?.classList.add('is-hidden');
  document.body.classList.remove('no-scroll');
};

window.addEventListener('load', () => setTimeout(hideLoader, 850));
setTimeout(hideLoader, 2400);

if (year) year.textContent = new Date().getFullYear();

const startVideo = (video) => {
  if (!video) return;
  video.muted = true;
  video.defaultMuted = true;
  video.playsInline = true;
  video.setAttribute('muted', '');
  video.setAttribute('playsinline', '');
  const playPromise = video.play();
  if (playPromise?.then) {
    playPromise
      .then(() => document.body.classList.add('video-live'))
      .catch(() => {
        video.classList.add('video-fallback');
        document.body.classList.add('video-fallback');
      });
  }
};

const startAllVideos = () => {
  startVideo(siteOceanVideo);
  startVideo(heroVideo);
  startVideo(oceanEntryVideo);
};

document.addEventListener('DOMContentLoaded', startAllVideos, { once: true });
window.addEventListener('pageshow', startAllVideos);
document.addEventListener('touchstart', startAllVideos, { once: true, passive: true });

const setHeaderState = () => header?.classList.toggle('is-scrolled', window.scrollY > 12);
setHeaderState();
window.addEventListener('scroll', setHeaderState, { passive: true });

const closeMenu = () => {
  menuToggle?.classList.remove('is-open');
  siteNav?.classList.remove('is-open');
  menuToggle?.setAttribute('aria-expanded', 'false');
  document.body.classList.remove('no-scroll');
};

menuToggle?.addEventListener('click', () => {
  const open = menuToggle.classList.toggle('is-open');
  siteNav.classList.toggle('is-open', open);
  menuToggle.setAttribute('aria-expanded', String(open));
  document.body.classList.toggle('no-scroll', open);
});

document.querySelectorAll('.site-nav a').forEach((link) => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeMenu(); });

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.16, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach((el, index) => {
  el.style.transitionDelay = `${Math.min(index % 5, 4) * 55}ms`;
  observer.observe(el);
});



/* Deep Dive Ocean Experience — scroll progress + particle wave */
const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));
const lerp = (from, to, amount) => from + (to - from) * amount;
let diveProgress = 0;
let targetDiveProgress = 0;

const updateDiveTarget = () => {
  const hero = document.querySelector('.hero');
  const entry = document.querySelector('.ocean-entry');
  if (!hero || !entry) return;

  const heroRect = hero.getBoundingClientRect();
  const entryRect = entry.getBoundingClientRect();
  const viewport = window.innerHeight || 1;
  const heroExit = clamp((viewport - heroRect.bottom) / (viewport * 0.72));
  const entryProgress = clamp((viewport - entryRect.top) / (viewport * 1.05));
  targetDiveProgress = clamp(Math.max(heroExit, entryProgress));

  document.body.classList.toggle('is-diving', targetDiveProgress > 0.04 && targetDiveProgress < 0.98);
};

const renderDiveVars = () => {
  diveProgress = lerp(diveProgress, targetDiveProgress, 0.12);
  const currentOpacity = clamp(Math.sin(diveProgress * Math.PI) * 0.86);
  document.documentElement.style.setProperty('--dive-progress', diveProgress.toFixed(3));
  document.documentElement.style.setProperty('--dive-current-opacity', currentOpacity.toFixed(3));
  document.documentElement.style.setProperty('--dive-portal-scale', (0.78 + diveProgress * 0.42).toFixed(3));
  document.documentElement.style.setProperty('--dive-portal-y', `${Math.round(44 - diveProgress * 88)}px`);
  document.documentElement.style.setProperty('--dive-content-y', `${Math.round(34 - diveProgress * 34)}px`);
  requestAnimationFrame(renderDiveVars);
};

updateDiveTarget();
window.addEventListener('scroll', updateDiveTarget, { passive: true });
window.addEventListener('resize', updateDiveTarget);
requestAnimationFrame(renderDiveVars);

const createOceanParticleWave = () => {
  if (!oceanParticleCanvas || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const ctx = oceanParticleCanvas.getContext('2d', { alpha: true });
  if (!ctx) return;

  let width = 0;
  let height = 0;
  let ratio = 1;
  const particles = [];
  const particleCount = 128;

  const resetParticles = () => {
    particles.length = 0;
    for (let index = 0; index < particleCount; index += 1) {
      particles.push({
        x: Math.random(),
        y: Math.random(),
        phase: Math.random() * Math.PI * 2,
        depth: Math.random(),
        speed: 0.38 + Math.random() * 0.72,
      });
    }
  };

  const resizeCanvas = () => {
    ratio = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    oceanParticleCanvas.width = Math.floor(width * ratio);
    oceanParticleCanvas.height = Math.floor(height * ratio);
    oceanParticleCanvas.style.width = `${width}px`;
    oceanParticleCanvas.style.height = `${height}px`;
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  };

  const draw = (time = 0) => {
    const t = time * 0.001;
    ctx.clearRect(0, 0, width, height);
    const intensity = clamp(Math.sin(diveProgress * Math.PI));

    if (intensity > 0.015) {
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      for (let wave = 0; wave < 4; wave += 1) {
        const baseY = height * (0.33 + wave * 0.135 + diveProgress * 0.12);
        const amp = (20 + wave * 10) * intensity;
        ctx.beginPath();
        for (let x = -40; x <= width + 40; x += 18) {
          const y = baseY + Math.sin(x * 0.009 + t * (0.7 + wave * 0.2)) * amp + Math.cos(x * 0.017 - t) * amp * 0.35;
          if (x === -40) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = wave % 2 === 0 ? `rgba(242, 210, 117, ${0.11 * intensity})` : `rgba(105, 190, 207, ${0.12 * intensity})`;
        ctx.lineWidth = 1 + wave * 0.45;
        ctx.stroke();
      }

      for (const point of particles) {
        point.x += 0.00018 * point.speed + 0.00016 * intensity;
        if (point.x > 1.08) point.x = -0.08;
        const x = point.x * width;
        const waveY = Math.sin(point.x * 9.5 + t * point.speed + point.phase) * (42 + 35 * point.depth) * intensity;
        const y = (0.22 + point.y * 0.68) * height + waveY - diveProgress * height * 0.09;
        const radius = (0.7 + point.depth * 1.9) * intensity;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fillStyle = point.depth > 0.54 ? `rgba(242, 210, 117, ${0.22 * intensity})` : `rgba(216, 246, 255, ${0.24 * intensity})`;
        ctx.fill();
      }
    }

    requestAnimationFrame(draw);
  };

  resizeCanvas();
  resetParticles();
  window.addEventListener('resize', resizeCanvas);
  requestAnimationFrame(draw);
};

createOceanParticleWave();

contactForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(contactForm);
  const name = String(data.get('name') || '').trim();
  const contact = String(data.get('contact') || '').trim();
  const service = String(data.get('service') || '').trim();
  const message = String(data.get('message') || '').trim();
  const briefing = `Olá, ATLÂNTICO STUDIO. Meu nome é ${name}. Tenho interesse em ${service}. Meu contato é ${contact}.${message ? ` Briefing: ${message}` : ''}`;

  if (navigator.clipboard) {
    navigator.clipboard.writeText(briefing).then(() => {
      formNote.textContent = 'Mensagem copiada. Agora é só colar no Instagram, WhatsApp ou e-mail da ATLÂNTICO STUDIO.';
    }).catch(() => { formNote.textContent = briefing; });
  } else {
    formNote.textContent = briefing;
  }
});
