const pageLoader = document.getElementById('pageLoader');
const header = document.getElementById('siteHeader');
const menuToggle = document.getElementById('menuToggle');
const siteNav = document.getElementById('siteNav');
const year = document.getElementById('year');
const contactForm = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');
const siteOceanVideo = document.getElementById('siteOceanVideo');
const oceanVideos = Array.from(document.querySelectorAll('[data-ocean-video]'));
const videoActivate = document.getElementById('videoActivate');

document.body.classList.add('no-scroll');

const hideLoader = () => {
  pageLoader?.classList.add('is-hidden');
  document.body.classList.remove('no-scroll');
};

window.addEventListener('load', () => setTimeout(hideLoader, 700));
setTimeout(hideLoader, 2200);

if (year) year.textContent = new Date().getFullYear();

const markVideoPlaying = () => {
  document.body.classList.add('video-playing');
  document.body.classList.remove('video-needs-interaction');
};

const markVideoNeedsInteraction = () => {
  const hasVideo = oceanVideos.length > 0;
  const anyPlaying = oceanVideos.some((video) => !video.paused && video.readyState >= 2);
  if (!hasVideo || anyPlaying || document.body.classList.contains('video-playing')) return;
  document.body.classList.add('video-needs-interaction');
};

const prepareOceanVideo = (video) => {
  video.muted = true;
  video.defaultMuted = true;
  video.playsInline = true;
  video.setAttribute('muted', '');
  video.setAttribute('playsinline', '');
  video.setAttribute('webkit-playsinline', '');
};

const startVideo = async () => {
  if (!oceanVideos.length) return;

  try {
    await Promise.all(oceanVideos.map(async (video) => {
      prepareOceanVideo(video);
      if (video.readyState === 0) video.load();
      const playPromise = video.play();
      if (playPromise?.then) await playPromise;
    }));
    markVideoPlaying();
  } catch (error) {
    markVideoNeedsInteraction();
  }
};

oceanVideos.forEach((video) => {
  video.addEventListener('playing', markVideoPlaying);
  video.addEventListener('canplay', startVideo, { once: true });
  video.addEventListener('pause', () => {
    if (!document.hidden) markVideoNeedsInteraction();
  });
  video.addEventListener('error', () => {
    document.body.classList.remove('video-playing');
    markVideoNeedsInteraction();
  });
});

const startVideoFromGesture = () => startVideo();
document.addEventListener('DOMContentLoaded', startVideo, { once: true });
window.addEventListener('pageshow', startVideo);
document.addEventListener('touchstart', startVideoFromGesture, { once: true, passive: true });
document.addEventListener('pointerdown', startVideoFromGesture, { once: true, passive: true });
document.addEventListener('keydown', startVideoFromGesture, { once: true });
videoActivate?.addEventListener('click', startVideo);
setTimeout(() => {
  const shouldAskInteraction = oceanVideos.length && oceanVideos.every((video) => video.paused || video.readyState < 2);
  if (shouldAskInteraction) markVideoNeedsInteraction();
}, 1800);

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
