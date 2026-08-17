const overlay      = document.getElementById('modalOverlay');
const closeBtn     = document.getElementById('closeBtn');
const submitBtn    = document.getElementById('submitBtn');
const formSection  = document.getElementById('formSection');
const successState = document.getElementById('successState');

if (overlay && closeBtn && submitBtn) {
  function openModal() {
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
    setTimeout(() => {
      formSection.style.display = '';
      successState.classList.remove('visible');
      document.querySelectorAll('input, textarea').forEach(el => {
        el.value = '';
        el.classList.remove('error');
      });
      document.querySelectorAll('.service-item').forEach(el => el.classList.remove('selected'));
    }, 300);
  }

  document.querySelectorAll('.open-dialog').forEach(btn => {
    btn.addEventListener('click', openModal);
  });

  closeBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

  document.querySelectorAll('.service-item').forEach(item => {
    item.addEventListener('click', () => {
      const cb = item.querySelector('input[type="checkbox"]');
      cb.checked = !cb.checked;
      item.classList.toggle('selected', cb.checked);
    });
  });

  submitBtn.addEventListener('click', () => {
    const firstName = document.getElementById('firstName');
    const phone     = document.getElementById('phone');
    let valid = true;

    [firstName, phone].forEach(el => {
      el.classList.remove('error');
      if (!el.value.trim()) { el.classList.add('error'); valid = false; }
    });

    if (!valid) {
      firstName.closest('.modal').scrollTop = 0;
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = 'Надсилаємо...';

    setTimeout(() => {
      formSection.style.display = 'none';
      successState.classList.add('visible');
      submitBtn.disabled = false;
      submitBtn.textContent = 'Відправити Заявку';
    }, 1200);
  });
}


const trigger = document.getElementById('servicesViewTrigger');
const modal = document.getElementById('servicesModal');

if (trigger && modal) {
  const servicesCloseBtn = document.getElementById('servicesCloseBtn');
  const viewCards = modal.querySelector('.view-cards');
  const viewDetail = modal.querySelector('.view-detail');
  const detailBtns = modal.querySelectorAll('.detail-btn');
  const tabBtns = modal.querySelectorAll('.tab-btn');
  const tabContents = modal.querySelectorAll('.tab-content');
  const backBtn = modal.querySelector('.back-btn');

  trigger.addEventListener('click', () => modal.classList.add('open'));
  servicesCloseBtn.addEventListener('click', closeServicesModal);
  modal.addEventListener('click', e => { if (e.target === modal) closeServicesModal(); });

  function closeServicesModal() {
    modal.classList.remove('open');
    showCards();
  }

  detailBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const service = btn.dataset.service;
      switchTab(service);
      viewCards.classList.add('hidden');
      viewDetail.classList.remove('hidden');
    });
  });

  backBtn.addEventListener('click', showCards);

  function showCards() {
    viewDetail.classList.add('hidden');
    viewCards.classList.remove('hidden');
  }

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => switchTab(btn.dataset.tab));
  });

  function switchTab(tabName) {
    tabBtns.forEach(b => b.classList.toggle('active', b.dataset.tab === tabName));
    tabContents.forEach(c => {
      if (c.id === `tab-${tabName}`) {
        c.classList.remove('hidden');
        c.classList.add('active');
      } else {
        c.classList.add('hidden');
        c.classList.remove('active');
      }
    });
  }
}


const slides = document.querySelectorAll('.service-slider .service-slide');
if (slides.length) {
  const prevBtn = document.querySelector('.service-slider .prev');
  const nextBtn = document.querySelector('.service-slider .next');
  let current = 0;

  function goTo(index) {
    slides[current].classList.remove('active');
    current = (index + slides.length) % slides.length;
    slides[current].classList.add('active');
  }

  prevBtn.addEventListener('click', () => goTo(current - 1));
  nextBtn.addEventListener('click', () => goTo(current + 1));
}


const burgerBtn = document.getElementById('burgerBtn');
const mainNav = document.getElementById('mainNav');

if (burgerBtn && mainNav) {
  burgerBtn.addEventListener('click', () => {
    burgerBtn.classList.toggle('active');
    mainNav.classList.toggle('open');
    document.body.style.overflow = mainNav.classList.contains('open') ? 'hidden' : '';
  });

  mainNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      burgerBtn.classList.remove('active');
      mainNav.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}