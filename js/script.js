// ===== HAMBURGER MENU =====
const navbarNav = document.querySelector(".navbar-nav");
const hamburger = document.querySelector('#hamburger-menu');

hamburger.onclick = (e) => {
  e.preventDefault();
  navbarNav.classList.toggle("active");
};

// Klik luar sidebar otomatis tutup
document.addEventListener('click', function(e) {
  if (!hamburger.contains(e.target) && !navbarNav.contains(e.target)) {
    navbarNav.classList.remove('active');
  }
});


// ===== ACTIVE NAVBAR (SCROLL SPY) =====
const navLinks = document.querySelectorAll('.navbar-nav a');
const sections = document.querySelectorAll('section[id]');

function setActiveNav() {
  let current = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
}

window.addEventListener('scroll', setActiveNav);
setActiveNav();

// Klik link tetap aktif juga
navLinks.forEach(link => {
  link.addEventListener('click', function() {
    navLinks.forEach(l => l.classList.remove('active'));
    this.classList.add('active');
  });
});


// ===== ANIMASI SCROLL DARI ATAS (1 per 1) =====
const animElements = document.querySelectorAll('.animate');

const scrollObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const allVisible = [...animElements].filter(el =>
        el.getBoundingClientRect().top < window.innerHeight
      );
      const delay = allVisible.indexOf(entry.target) * 150;

      setTimeout(() => {
        entry.target.classList.add('visible');
      }, delay);

    } else {
      entry.target.classList.remove('visible');
    }
  });
}, { threshold: 0.15 });

animElements.forEach(el => scrollObserver.observe(el));


// ===== COUNTER =====
const counters = document.querySelectorAll('.counter');

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const target = +entry.target.dataset.target;
      let count = 0;

      const update = () => {
        count++;
        entry.target.textContent = count;
        if (count < target) setTimeout(update, 50);
      };

      update();
      counterObserver.unobserve(entry.target);
    }
  });
});

counters.forEach(counter => counterObserver.observe(counter));


// ===== ANGGOTA KELAS =====
const members = [
  { name: "Affan Hilmy Sitepu", cita: "Cita-cita", img: "assets/images/affan.jpeg" },
  { name: "Ahmad Nur Rizki", cita: "Cita-cita", img: "assets/images/amad.jpeg" },
  { name: "Asyifa Putri Ramadhani", cita: "Cita-cita", img: "assets/images/putri.jpeg" },
  { name: "Azmi Nizam Alnazwa", cita: "Cita-cita", img: "assets/images/nizam.jpeg" },
  { name: "Cindy Anggun Kirana", cita: "Cita-cita", img: "assets/images/cindy.jpeg" },
  { name: "Dzaky Al Fitriansyah", cita: "Cita-cita", img: "assets/images/dzaki.jpeg" },
  { name: "Embun Rahayu", cita: "Cita-cita", img: "assets/images/embun.jpeg" },
  { name: "Filza Khairunnisa Surbakti", cita: "Cita-cita", img: "assets/images/filza.jpeg" },
  { name: "Hanifah Winarso Putri", cita: "Cita-cita", img: "assets/images/hanifah.jpeg" },
  { name: "Humairoh Aliyah Annazwa Lubis", cita: "Cita-cita", img: "assets/images/humai.jpeg" },
  { name: "Ilham Al Zaky Vandiawi Batubara", cita: "Cita-cita", img: "assets/images/ilham.jpeg" },
  { name: "Imam Setiawan", cita: "Cita-cita", img: "assets/images/imam.jpeg" },
  { name: "Izza Nailah Syafiqah", cita: "Cita-cita", img: "assets/images/naila.jpeg" },
  { name: "Keyzha Divanya", cita: "Cita-cita", img: "assets/images/keja.jpeg" },
  { name: "Khoiri Fitra Nasution", cita: "Cita-cita", img: "assets/images/joker.jpeg" },
  { name: "Mhd Al-Fuadi Pasaribu", cita: "Cita-cita", img: "assets/images/aldi.jpeg" },
  { name: "Muhammad Dastan Fahreza", cita: "Cita-cita", img: "assets/images/dastan.jpeg" },
  { name: "Natasya Pricilia", cita: "Cita-cita", img: "assets/images/tasya.jpeg" },
  { name: "R. Muhammad Arif Surya Wardhana", cita: "Cita-cita", img: "assets/images/arif.jpeg" },
  { name: "Raja Adlan Siyasi", cita: "Cita-cita", img: "assets/images/raja.jpeg" },
  { name: "Rifa Rizqullah", cita: "Cita-cita", img: "assets/images/gimun.jpeg" },
  { name: "Rizky Aprillia", cita: "Cita-cita", img: "assets/images/april.jpeg" },
  { name: "Satria Alfikri Ramadhan Nasution", cita: "Cita-cita", img: "assets/images/satria.jpeg" },
  { name: "Sonia Mutiara", cita: "Cita-cita", img: "assets/images/sonia.jpeg" },
  { name: "Yafi Kayana", cita: "Cita-cita", img: "assets/images/yafi.jpeg" },
  { name: "Zaid Aulia Rizky", cita: "Cita-cita", img: "assets/images/zaid1.jpg" },
];

const perPage = 6;
let currentPage = 1;
const totalPages = Math.ceil(members.length / perPage);

function renderMembers(page) {
  const grid = document.getElementById('members-grid');
  const start = (page - 1) * perPage;
  const end = start + perPage;
  const slice = members.slice(start, end);

  grid.innerHTML = slice.map(m => `
    <div class="member-card animate">
      <img src="${m.img}" alt="${m.name}" />
      <h3>${m.name}</h3>
      <p>${m.cita}</p>
    </div>
  `).join('');

  // Animasi 1 per 1 untuk card yang baru dibuat
  grid.querySelectorAll('.animate').forEach((el, i) => {
    setTimeout(() => el.classList.add('visible'), i * 100);
  });
}

function renderPagination(page) {
  const pagination = document.getElementById('members-pagination');

  let html = `<button ${page === 1 ? 'disabled' : ''} onclick="changePage(${page - 1})">Previous</button>`;

  for (let i = 1; i <= totalPages; i++) {
    html += `<button class="${i === page ? 'active' : ''}" onclick="changePage(${i})">${i}</button>`;
  }

  html += `<button ${page === totalPages ? 'disabled' : ''} onclick="changePage(${page + 1})">Next</button>`;

  pagination.innerHTML = html;
}

function changePage(page) {
  currentPage = page;
  renderMembers(page);
  renderPagination(page);
  document.getElementById('class-members').scrollIntoView({ behavior: 'smooth' });
}

renderMembers(currentPage);
renderPagination(currentPage);