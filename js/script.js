
    // دالة إرسال الرسالة إلى واتساب
  function sendWhatsAppMessage(event) {
    event.preventDefault(); // منع إعادة تحميل الصفحة

    const message = document.getElementById("waMessage").value.trim();
    if (!message || !whatsappNumber) {
      alert("الرجاء كتابة رسالة صالحة وانتظار تحميل الرقم.");
      return;
    }

    // إنشاء رابط واتساب
    const waUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    // فتح الرابط في تبويب جديد
    window.open(waUrl, '_blank');
  }
function updateTabsAndFilters(lang) {
  // نصوص التبويبات
  const tabsTexts = {
    ar: {
      myname:'م.فيصل الرازحي',
      profile: 'الملف الشخصي',
      services: 'الخدمات',
      impact: 'اعمالي السابقة',
      posts: 'مقالة',
      whyustab:'لماذا نحن؟',
      review: 'المراجع',
      filterAll: 'الكل',
      filterWeb: 'مشاريع الويب',
      filterGraphics: 'مشاريع جرافيكس',
      seo:'تحسين SEO',
      services:"خدماتي",
      btnDownloadCV: 'تحميل السيرة الذاتية',
      btnWhatsApp: 'طلب خدمة واتساب',
      footerTitle:'معلومات التواصل'
    },
    en: {
      myname:'eng.Faisal Al Razhy',
      profile: 'Profile',
      services: 'Services',
      impact: 'My Portfolio',
      posts: 'Articles',
      whyustab:'why us?',
      review: 'Reviews',
      filterAll: 'All',
      filterWeb: 'Web Projects',
      filterGraphics: 'Graphic Projects',
      seo:'SEO',
      services:"My Services",
      btnDownloadCV: 'Download CV',
btnWhatsApp: 'Request Service via WhatsApp',
     footerTitle:'contact info'
    }
  };

  // تحديث نص التبويبات
    document.getElementById('myname').textContent = tabsTexts[lang].myname;
  document.getElementById('profile-tab').textContent = tabsTexts[lang].profile;
  document.getElementById('services-tab').textContent = tabsTexts[lang].services;
  document.getElementById('impact-tab').textContent = tabsTexts[lang].impact;
  document.getElementById('posts-tab').textContent = tabsTexts[lang].posts;
  document.getElementById('whyus-tab').textContent = tabsTexts[lang].whyustab;
  document.getElementById('review-tab').textContent = tabsTexts[lang].review;
document.getElementById('service-title').textContent = tabsTexts[lang].services;
  // تحديث نصوص أزرار الفلترة
  document.getElementById('filter-all').textContent = tabsTexts[lang].filterAll;
  document.getElementById('filter-web').textContent = tabsTexts[lang].filterWeb;
  document.getElementById('filter-graphics').textContent = tabsTexts[lang].filterGraphics;
 document.getElementById('filter-seo').textContent = tabsTexts[lang].seo;
  // تحديث نصوص الأزرار
document.getElementById('btn-download-cv').innerHTML = `<i class="bi bi-download me-2"></i> ${tabsTexts[lang].btnDownloadCV}`;
document.getElementById('btn-whatsapp').innerHTML = `<i class="bi bi-whatsapp me-2"></i> ${tabsTexts[lang].btnWhatsApp}`;
document.getElementById('footerTitle').textContent = tabsTexts[lang].footerTitle;
}

  const toggleThemeBtn = document.getElementById('toggleThemeBtn');
  const toggleLangBtn = document.getElementById('toggleLangBtn');
  // تحميل الحالة من localStorage
const currentTheme = localStorage.getItem('theme') || 'light';
const currentLang = localStorage.getItem('lang') || 'ar';

 function applyTheme(theme) {
  if (theme === 'dark') {
    document.body.classList.add('dark-theme');
    toggleThemeBtn.innerHTML = '<i class="bi bi-moon-stars"></i>';
    toggleThemeBtn.title = 'تبديل إلى الثيم الفاتح';
    toggleThemeBtn.setAttribute('aria-label', 'تبديل إلى الثيم الفاتح');
  } else {
    document.body.classList.remove('dark-theme');
    toggleThemeBtn.innerHTML = '<i class="bi bi-sun"></i>';
    toggleThemeBtn.title = 'تبديل إلى الثيم الداكن';
    toggleThemeBtn.setAttribute('aria-label', 'تبديل إلى الثيم الداكن');
  }
  localStorage.setItem('theme', theme);
}

  function applyLanguage(lang) {
    if (lang === 'en') {
      document.documentElement.lang = 'en';
      document.documentElement.dir = 'ltr';
      toggleLangBtn.innerHTML = '<i class="bi bi-translate"></i>';
      toggleLangBtn.title = 'Switch to Arabic';
      toggleLangBtn.setAttribute('aria-label', 'Switch to Arabic');
    } else {
      document.documentElement.lang = 'ar';
      document.documentElement.dir = 'rtl';
      toggleLangBtn.innerHTML = '<i class="bi bi-translate"></i>';
      toggleLangBtn.title = 'تبديل إلى العربية';
      toggleLangBtn.setAttribute('aria-label', 'تبديل إلى العربية');
    }
    localStorage.setItem('lang', lang);
  }

  toggleThemeBtn.addEventListener('click', () => {
    const newTheme = document.body.classList.contains('dark-theme') ? 'light' : 'dark';
    applyTheme(newTheme);
  });

  toggleLangBtn.addEventListener('click', () => {
    const newLang = document.documentElement.lang === 'ar' ? 'en' : 'ar';
    applyLanguage(newLang);
    renderContent(newLang);
  });

  // تطبيق الحالة عند تحميل الصفحة
  applyTheme(currentTheme);
  applyLanguage(currentLang);

  // تحميل بيانات JSON وعرضها حسب اللغة
  let jsonData = null;

  function renderContent(lang) {
    if (!jsonData) return; // بيانات لم تُحمّل بعد
  updateTabsAndFilters(lang);
    // ====== تعبئة البروفايل ======
    document.getElementById('profileNameText').textContent =
  lang === 'ar' ? jsonData.profile.name_ar : jsonData.profile.name_en;
    document.getElementById('profileTitle').textContent = lang === 'ar' ? jsonData.profile.title_ar : jsonData.profile.title_en;
    document.getElementById('profileMeta').textContent = lang === 'ar' ? jsonData.profile.meta_ar : jsonData.profile.meta_en;
    document.querySelector('.profile-info img').src = jsonData.profile.image;

      // تعبئة الفوتر
      document.getElementById("footerEmail").textContent = lang === 'ar' ? jsonData.personal_info.email : jsonData.personal_info.email;
      document.getElementById("footerPhone").textContent = lang === 'ar' ? jsonData.personal_info.phone : jsonData.personal_info.phone;
      document.getElementById("footerAddress").textContent = lang === 'ar' ? jsonData.personal_info.address_ar : jsonData.personal_info.address_en;
      whatsappNumber = jsonData.personal_info.phone.replace(/\D/g, ''); // إزالة الرموز مثل "+" و"-"
      // ================== الخبرة ==================
const experienceList = document.getElementById('experience-list');
experienceList.innerHTML = '';
jsonData.experience.forEach(item => {
  const title = item[`title_${lang}`];
  const period = item[`period_${lang}`];
  const description = item[`description_${lang}`] || '';

  const p = document.createElement('p');
  p.innerHTML = `<strong>${title}</strong><br><small>${period}</small>${description ? `<br>${description}` : ''}`;
  experienceList.appendChild(p);
});

// ================== التعليم ==================
const educationData = jsonData.education; // مصفوفة من الكائنات
const educationContent = document.getElementById('education-content');

// مسح المحتوى الحالي (إن وُجد)
educationContent.innerHTML = '';

// إنشاء عناصر HTML لكل سجل تعليمي
educationData.forEach(edu => {
  educationContent.innerHTML += `
    <p><strong>${edu[`institution_${lang}`]}</strong><br>
    ${edu[`years_${lang}`]}<br>
    ${edu[`details_${lang}`]}</p>
  `;
});


// ================== المهارات ==================
const skillsList = document.getElementById('skills-list');
skillsList.innerHTML = '';
jsonData.skills.forEach(skill => {
  const span = document.createElement('span');
  span.className = 'tag';
  span.textContent = skill[`skill_${lang}`];
  skillsList.appendChild(span);
});

// ================== الشهادات والدورات ==================
const certificationsList = document.getElementById('certifications-list');
if(certificationsList) {
  certificationsList.innerHTML = '';
  jsonData.certifications.forEach(cert => {
    const div = document.createElement('div');
    div.className = 'cert-item';
    div.innerHTML = `<strong>${cert[`title_${lang}`]}</strong> - ${cert[`issuer_${lang}`]} (${cert.year})`;
    certificationsList.appendChild(div);
  });
}


// ================== الإنجازات ==================
const achievementsList = document.getElementById('achievements-list');
if(achievementsList) {
  achievementsList.innerHTML = '';
  jsonData.achievements.forEach(item => {
    const div = document.createElement('div');
    div.className = 'achievement-item';
    div.innerHTML = `<strong>${item[`title_${lang}`]}</strong> (${item.year || ''})<br>${item[`description_${lang}`] || ''}`;
    achievementsList.appendChild(div);
  });
}

// ================== اللغات ==================
const languagesList = document.getElementById('languages-list');
if(languagesList) {
  languagesList.innerHTML = '';
  jsonData.languages.forEach(langItem => {
    const p = document.createElement('p');
    p.textContent = `${langItem[`language_${lang}`]} - ${langItem[`level_${lang}`]}`;
    languagesList.appendChild(p);
  });
}

// ================== المعلومات الشخصية ==================
const personalInfoList = document.getElementById('personal-info-list');
if(personalInfoList) {
  const info = jsonData.personal_info;
  personalInfoList.innerHTML = `
    <li><strong>${lang === 'ar' ? 'الاسم الكامل' : 'Full Name'}:</strong> ${info[`full_name_${lang}`]}</li>
    <li><strong>${lang === 'ar' ? 'الجنسية' : 'Nationality'}:</strong> ${info[`nationality_${lang}`]}</li>
    <li><strong>${lang === 'ar' ? 'رقم الهاتف' : 'Phone'}:</strong> ${info.phone}</li>
    <li><strong>${lang === 'ar' ? 'البريد الإلكتروني' : 'Email'}:</strong> ${info.email}</li>
    <li><strong>${lang === 'ar' ? 'العنوان' : 'Address'}:</strong> ${info[`address_${lang}`]}</li>
  `;
}

// ================== روابط التواصل ==================
const contactLinksList = document.getElementById('contact-links-list');
if(contactLinksList) {
  contactLinksList.innerHTML = '';
  jsonData.contact_links.forEach(link => {
    const li = document.createElement('li');
    li.innerHTML = `<a href="${link.url}" target="_blank">${link.platform}</a>`;
    contactLinksList.appendChild(li);
  });
}


// ================== ترويسات العناوين ==================
document.getElementById('experience-title').textContent = lang === 'ar' ? 'الخبرة العملية' : 'Experience';
document.getElementById('education-title').textContent = lang === 'ar' ? 'التعليم' : 'Education';
document.getElementById('skills-title').textContent = lang === 'ar' ? 'المهارات' : 'Skills';
if(document.getElementById('certifications-title'))
  document.getElementById('certifications-title').textContent = lang === 'ar' ? 'الشهادات والدورات' : 'Certifications';
if(document.getElementById('projects-title'))
  document.getElementById('projects-title').textContent = lang === 'ar' ? 'المشاريع' : 'Projects';
if(document.getElementById('achievements-title'))
  document.getElementById('achievements-title').textContent = lang === 'ar' ? 'الإنجازات' : 'Achievements';
if(document.getElementById('languages-title'))
  document.getElementById('languages-title').textContent = lang === 'ar' ? 'اللغات' : 'Languages';
if(document.getElementById('personal-info-title'))
  document.getElementById('personal-info-title').textContent = lang === 'ar' ? 'المعلومات الشخصية' : 'Personal Information';
if(document.getElementById('contact-links-title'))
  document.getElementById('contact-links-title').textContent = lang === 'ar' ? 'روابط التواصل' : 'Contact Links';


      
  const carouselInner = document.querySelector('#coverCarousel .carousel-inner');
carouselInner.innerHTML = '';

const seoProjects = jsonData.projects.filter(project => project.category === 'web');

seoProjects.forEach((project, index) => {
  const div = document.createElement('div');
  div.className = 'carousel-item' + (index === 0 ? ' active' : '');
  div.innerHTML = `<img src="${project.image}" class="d-block w-100" alt="SEO Project ${index + 1}">`;
  carouselInner.appendChild(div);
});


  
  // ====== الخدمات ======
 const servicesContainer = document.getElementById('services-container');
servicesContainer.innerHTML = '';

jsonData.services.forEach(service => {
  const title = lang === 'ar' ? service.ar : service.en;
  const description = lang === 'ar' ? service.description_ar : service.description_en;
  const icon = service.icon;
  const colorClass = service.colorClass;
  const col = document.createElement('div');
  col.className = 'col-md-6';
  col.innerHTML = `
<div class="p-3 border rounded bg-light h-100 shadow-sm">
<h4 class="${colorClass} mb-2">${icon}${title}</h4>
<p>${description}</p>
</div>`;
    
servicesContainer.appendChild(col);
});



function renderSocialLinks() {
  const socialIconsContainer = document.getElementById('social-icons');

  // امسح المحتوى أولًا لتجنب التكرار
  socialIconsContainer.innerHTML = `<h6 class="mb-4">${lang === 'ar' ? '' : ''}</h6>`;
  function getIconClass(platform) {
    switch (platform.toLowerCase()) {
      case 'facebook': return 'bi bi-facebook';
      case 'twitter': return 'bi bi-twitter';
      case 'linkedin': return 'bi bi-linkedin';
      case 'github': return 'bi bi-github';
      default: return 'bi bi-globe';
    }
  }

  jsonData.contact_links.forEach(link => {
    const a = document.createElement('a');
    a.href = link.url;
    a.target = '_blank';
    a.title = link.platform;
    a.className = link.platform.toLowerCase();
    a.style.marginRight = '10px';

    a.innerHTML = `<i class="${getIconClass(link.platform)}"></i>`;
    socialIconsContainer.appendChild(a);
  });
}

// استدعِ هذه الدالة فقط مرة واحدة عند تغيير اللغة
renderSocialLinks();

// ====== المشاريع ======
const projectsContainer = document.querySelector('#impact .section-box');
const filterButtons = projectsContainer.querySelector('div.mb-4')?.outerHTML || '';
const projectsPerPage = 6;
let currentProjectPage = 1;
let currentProjectFilter = 'all';

function renderProjects(page = 1, filter = currentProjectFilter) {
  currentProjectPage = page;
  currentProjectFilter = filter;

  const filteredProjects = filter === 'all'
    ? jsonData.projects
    : jsonData.projects.filter(project => project.category === filter);

  const start = (page - 1) * projectsPerPage;
  const end = start + projectsPerPage;
  const visibleProjects = filteredProjects.slice(start, end);

  projectsContainer.innerHTML = filterButtons;
 visibleProjects.forEach(project => {
  const div = document.createElement('div');
  div.className = `col-12 col-md-6 col-lg-4 project-item mb-3 ${project.category}`;

  const maxChars = 50;
  let description = lang === 'ar' ? project.description_ar : project.description_en;

  if (description.length > maxChars) {
    description = description.substring(0, maxChars) + '...';
  }

  // تحقق إذا كانت الفئة هي "graphics"
  if (project.category === 'graphics') {
      div.innerHTML = ` 
  <div class="border rounded bg-light shadow-sm text-center">

    <div class="project-img-container" style="height: 350px; overflow: hidden;">
      <img src="${project.image}" 
           alt="${lang === 'ar' ? project.title_ar : project.title_en}" 
           style="width: 100%; height: 100%; object-fit: contain;" 
           class="img-fluid rounded-top">
    </div>
  </div>
`;
  } else if (project.category === 'seo') {
  // تصميم خاص لـ "seo"
  div.innerHTML = ` 
  <div class="border rounded bg-light shadow-sm text-center">

    <div class="project-img-container" style="height: 350px; overflow: hidden;">
      <img src="${project.image}" 
           alt="${lang === 'ar' ? project.title_ar : project.title_en}" 
           style="width: 100%; height: 100%; object-fit: contain;" 
           class="img-fluid rounded-top">
    </div>
  </div>
`;

  } else {
    // الشكل الافتراضي للمشاريع الأخرى
    div.innerHTML = `
      <div class="d-flex flex-row-reverse align-items-center h-100 border rounded bg-light shadow-sm">
        <div class="project-img-container" style="width:40%;">
          <img src="${project.image}" alt="${lang === 'ar' ? project.title_ar : project.title_en}" class="img-fluid rounded-start">
        </div>
        <div class="p-3" style="width:60%;">
          <h6 class="mb-1">${lang === 'ar' ? project.title_ar : project.title_en}</h6>
          <p class="mb-2 small">${description}</p>
       <button class="btn btn-sm btn-outline-primary view-project-btn" 
  data-title="${lang === 'ar' ? project.title_ar : project.title_en}"
  data-description="${lang === 'ar' ? project.description_ar : project.description_en}"
  data-link="${project.link}"
  data-images='${JSON.stringify(project.images || [project.image])}'
  data-category="${project.category}">
  ${lang === 'ar' ? 'عرض المزيد' : 'View More'}
</button>

        </div>
      </div>
    `;
  }

  projectsContainer.appendChild(div);
});

  renderPagination(filteredProjects.length, projectsPerPage, page, projectsContainer, (newPage) => renderProjects(newPage, filter));
  setupFiltering();
}

projectsContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('view-project-btn')) {
    const btn = e.target;
    const category = btn.dataset.category;
    const title = btn.dataset.title || '';
    const description = btn.dataset.description || '';
     const link = btn.dataset.link || '#';
    const images = JSON.parse(btn.dataset.images || '[]');
// إظهار أو إخفاء العناصر حسب الفئة
document.getElementById('projectModalLabel').textContent = category === 'graphics' ? '' : title;
document.getElementById('projectModalDescription').textContent = category === 'graphics' ? '' : description;
document.getElementById('projectModalLink').href = link;
document.getElementById('projectModalLinkContainer').style.display = category === 'graphics' ? 'none' : 'block';
document.getElementById('projectModalDescription').style.display = category === 'graphics' ? 'none' : 'block';
document.getElementById('projectModalLabel').style.display = category === 'graphics' ? 'none' : 'block';
    // مشاركة الروابط
    const encodedLink = encodeURIComponent(link);
    const encodedTitle = encodeURIComponent(title);

    document.getElementById('shareWhatsApp').onclick = () =>
      window.open(`https://wa.me/?text=${encodedTitle}%0A${encodedLink}`, '_blank');

    document.getElementById('shareTelegram').onclick = () =>
      window.open(`https://t.me/share/url?url=${encodedLink}&text=${encodedTitle}`, '_blank');

    document.getElementById('shareTwitter').onclick = () =>
      window.open(`https://twitter.com/intent/tweet?url=${encodedLink}&text=${encodedTitle}`, '_blank');

    document.getElementById('shareFacebook').onclick = () =>
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedLink}`, '_blank');

    document.getElementById('copyLink').onclick = () => {
      navigator.clipboard.writeText(link).then(() => {
        const originalText = document.querySelector('.copy-text').textContent;
        document.querySelector('.copy-text').textContent = lang === 'ar' ? 'تم النسخ' : 'Copied!';
        setTimeout(() => {
          document.querySelector('.copy-text').textContent = originalText;
        }, 2000);
      });
    };

    // إعداد الكاروسيل
    const carouselInner = document.getElementById('carouselInner');
    const carouselThumbnails = document.getElementById('carouselThumbnails');
    carouselInner.innerHTML = '';
    carouselThumbnails.innerHTML = '';

    images.forEach((src, index) => {
      const isActive = index === 0 ? 'active' : '';

      const item = document.createElement('div');
      item.className = `carousel-item ${isActive}`;
      item.innerHTML = `<img src="${src}" class="d-block w-100 h-100 rounded" alt="Project image ${index + 1}">`;
      carouselInner.appendChild(item);

      const thumb = document.createElement('img');
      thumb.src = src;
      thumb.alt = `Thumb ${index + 1}`;
      thumb.style.width = '60px';
      thumb.style.height = '60px';
      thumb.className = 'rounded border border-secondary cursor-pointer';
      thumb.style.objectFit = 'cover';
      thumb.addEventListener('click', () => {
        const carousel = bootstrap.Carousel.getOrCreateInstance(document.getElementById('projectCarousel'));
        carousel.to(index);
      });
      carouselThumbnails.appendChild(thumb);
    });

    // عرض المودال
    const modal = new bootstrap.Modal(document.getElementById('projectModal'));
    modal.show();
  }
});

renderProjects();


    // ====== المقالات ======
    const postsContainer = document.querySelector('#posts .section-box');
    const postsPerPage = 6;
    function renderPosts(page = 1) {
  postsContainer.innerHTML = `<h6 class="mb-4">${lang === 'ar' ? 'مقالات ومشاركات' : 'Articles & Posts'}</h6>`;
  const start = (page - 1) * postsPerPage;
  const end = start + postsPerPage;

  const visiblePosts = jsonData.posts.slice(start, end);
  visiblePosts.forEach(post => {
    const article = document.createElement('article');
    article.className = 'p-4 mb-4 bg-light rounded border-start border-4 border-warning shadow-sm';

    const title = lang === 'ar' ? (post.title_ar || '') : (post.title_en || '');
const excerpt = lang === 'ar' ? (post.excerpt_ar || '') : (post.excerpt_en || '');
const author = post.author || '';
const date = post.date ? new Date(post.date).toLocaleDateString(lang === 'ar' ? 'ar-EG' : 'en-US', { month: 'long', year: 'numeric' }) : '';
const link = post.link || '#';

// تأكد من ترميز القيم داخل data attributes لتجنب أخطاء HTML (خاصة إذا فيها علامات اقتباس)
const safeTitle = title.replace(/"/g, '&quot;');
const safeExcerpt = excerpt.replace(/"/g, '&quot;');

article.innerHTML = `
  <h5 class="fw-bold mb-2 text-warning">${title}</h5>
  <p class="text-muted">${excerpt}</p>
  <small class="text-muted">✍️ ${lang === 'ar' ? 'بقلم' : 'By'}: ${author} - ${date}</small><br />
  <button class="btn btn-sm btn-outline-warning view-post-btn mt-2" 
    data-title="${safeTitle}"
    data-content="${safeExcerpt}">
    ${lang === 'ar' ? 'عرض المزيد' : 'View More'}
  </button>
`;

    postsContainer.appendChild(article);
  });

  renderPagination(jsonData.posts.length, postsPerPage, page, postsContainer, renderPosts);
}
    renderPosts(1);

postsContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('view-post-btn')) {
    const btn = e.target;
    const title = btn.dataset.title;
    const content = btn.dataset.content;

    // تحديث بيانات المودال
    document.getElementById('postModalLabel').textContent = title;
    document.getElementById('postModalContent').textContent = content;

    // عرض المودال
    const modal = new bootstrap.Modal(document.getElementById('postModal'));
    modal.show();
  }
});

    // ====== المراجعات ======
    const reviewsContainer = document.querySelector('#review .section-box');
    const reviewsPerPage = 6;
    function renderReviews(page = 1) {
      reviewsContainer.innerHTML = `<h6 class="mb-4">${lang === 'ar' ? 'المراجع والتوصيات' : 'Reviews & Testimonials'}</h6>`;
      const start = (page - 1) * reviewsPerPage;
      const end = start + reviewsPerPage;

      const visibleReviews = jsonData.reviews.slice(start, end);
      visibleReviews.forEach(review => {
        const container = document.createElement('div');
        container.className = 'p-4 mb-4 position-relative border-start border-4 bg-white shadow-sm rounded border-primary';
        container.innerHTML = `
          <h5 class="fw-bold mb-2 text-primary">${lang === 'ar' ? review.author_ar : review.author_en}</h5>
          <blockquote class="blockquote fst-italic mb-2 mt-3">"${lang === 'ar' ? review.content_ar : review.content_en}"</blockquote>
          <small class="text-muted">${new Date(review.date).toLocaleDateString(lang === 'ar' ? 'ar-EG' : 'en-US')}</small>
        `;
        reviewsContainer.appendChild(container);
      });

      renderPagination(jsonData.reviews.length, reviewsPerPage, page, reviewsContainer, renderReviews);
    }
    renderReviews(1);

function renderPagination(totalItems, itemsPerPage, currentPage, container, renderFunc) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const maxVisiblePages = 5;
  if (totalPages <= 1) return;

  const labels = {
    previous: lang === 'ar' ? 'السابق' : 'Previous',
    next: lang === 'ar' ? 'التالي' : 'Next',
  };

  const existingNav = container.querySelector('nav');
  if (existingNav) existingNav.remove();

  const pagination = document.createElement('nav');
  pagination.className = 'd-flex justify-content-center';

  let paginationHTML = '<ul class="pagination">';

  // زر السابق
  if (currentPage > 1) {
    paginationHTML += `
      <li class="page-item">
        <button class="page-link" data-page="${currentPage - 1}">${labels.previous}</button>
      </li>`;
  } else {
    paginationHTML += `
      <li class="page-item disabled">
        <span class="page-link">${labels.previous}</span>
      </li>`;
  }

  // حساب الصفحات
  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = startPage + maxVisiblePages - 1;
  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  for (let page = startPage; page <= endPage; page++) {
    paginationHTML += `
      <li class="page-item ${page === currentPage ? 'active' : ''}">
        <button class="page-link" data-page="${page}">${page}</button>
      </li>`;
  }

  // زر التالي
  if (currentPage < totalPages) {
    paginationHTML += `
      <li class="page-item">
        <button class="page-link" data-page="${currentPage + 1}">${labels.next}</button>
      </li>`;
  } else {
    paginationHTML += `
      <li class="page-item disabled">
        <span class="page-link">${labels.next}</span>
      </li>`;
  }

  paginationHTML += '</ul>';
  pagination.innerHTML = paginationHTML;

  // الأحداث
  pagination.querySelectorAll('button.page-link').forEach(btn => {
    btn.addEventListener('click', () => {
      const selectedPage = Number(btn.getAttribute('data-page'));
      renderFunc(selectedPage);

      const target = document.getElementById('scroll-target');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  container.appendChild(pagination);
}


    
function setupFiltering() {
  const filterBtns = projectsContainer.querySelectorAll('.filter-btn');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const selectedFilter = btn.getAttribute('data-filter');

      // إعادة عرض المشاريع بالفلتر الجديد
      renderProjects(1, selectedFilter);
    });

    // تفعيل الزر الحالي وإلغاء التفعيل عن البقية
    if (btn.getAttribute('data-filter') === currentProjectFilter) {
      btn.classList.add('active', 'btn-primary');
      btn.classList.remove('btn-outline-primary');
    } else {
      btn.classList.remove('active', 'btn-primary');
      btn.classList.add('btn-outline-primary');
    }
  });
}


    // إعادة ضبط التصفية كل مرة بعد تحديث العرض
    setupFiltering();
  }

 


  // تحميل JSON ثم عرض المحتوى
  fetch('data.json')
    .then(response => response.json())
    .then(data => {
      jsonData = data;
      renderContent(currentLang);
    })
    .catch(err => {
      console.error('Failed to load JSON data:', err);
    });

