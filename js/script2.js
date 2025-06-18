function updateTabsAndFilters(lang) {
  // نصوص التبويبات
  const tabsTexts = {
    ar: {
      Portfolio:'محفظة اعمالي السابقة',
      myname:'الصفحة الرئسية',
      filterAll: 'الكل',
      filterWeb: 'مشاريع الويب',
      filterGraphics: 'مشاريع جرافيكس',
      seo:'تحسين SEO',
      footerTitle:'تواصل معنا'
    },
    en: {
      Portfolio:'My Portfolio',
      myname:'main',
      filterAll: 'All',
      filterWeb: 'Web Projects',
      filterGraphics: 'Graphic Projects',
      seo:'SEO',
      services:"My Services",
     footerTitle:'contact us'
    }
  };
  

  // تحديث نص التبويبات
document.getElementById('myname').textContent = tabsTexts[lang].myname;
document.getElementById('myname').href = "index.html";

    document.getElementById('Portfolio').textContent = tabsTexts[lang].Portfolio;
  document.getElementById('filter-all').textContent = tabsTexts[lang].filterAll;
  document.getElementById('filter-web').textContent = tabsTexts[lang].filterWeb;
  document.getElementById('filter-graphics').textContent = tabsTexts[lang].filterGraphics;
 document.getElementById('filter-seo').textContent = tabsTexts[lang].seo;
  // تحديث نصوص الأزرار
document.getElementById('footerTitle').textContent = tabsTexts[lang].footerTitle;
}


  // تعريف متغير الرقم إن لم يكن موجودًا مسبقًا
  let whatsappNumber = '967779289621';

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


  
  const toggleThemeBtn = document.getElementById('toggleThemeBtn');
  const toggleLangBtn = document.getElementById('toggleLangBtn');

  const currentTheme = localStorage.getItem('theme') || 'light';
  const currentLang = localStorage.getItem('lang') || 'ar';

  let jsonData = null;
  
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

  function applyLanguage(selectedLang) {
    lang = selectedLang;
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
    renderProjects();
    updateTabsAndFilters(lang);
  });
  applyTheme(currentTheme);
  applyLanguage(currentLang);


  const projectsContainer = document.querySelector('#impact .section-box');
  const filterButtons = projectsContainer.querySelector('div.mb-4')?.outerHTML || '';
  const projectsPerPage = 6;
  let currentProjectPage = 1;
  let currentProjectFilter = 'all';

  function renderProjects(page = 1, filter = currentProjectFilter) {
    if (!jsonData) return;
    currentProjectPage = page;
    currentProjectFilter = filter;
    const filteredProjects = filter === 'all'
      ? jsonData.projects
      : jsonData.projects.filter(project => project.category === filter);

    const start = (page - 1) * projectsPerPage;
    const visibleProjects = filteredProjects.slice(start, start + projectsPerPage);

    projectsContainer.innerHTML = filterButtons;
    visibleProjects.forEach(project => {
      const div = document.createElement('div');
      div.className = `col-12 col-md-6 col-lg-4 project-item mb-3 ${project.category}`;

      const maxChars = 50;
      let description = lang === 'ar' ? project.description_ar : project.description_en;
      if (description.length > maxChars) {
        description = description.substring(0, maxChars) + '...';
      }

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
        div.innerHTML = `
          <div class="d-flex flex-row-reverse align-items-center h-100 border rounded bg-light shadow-sm">
            <div class="project-img-container" style="width:40%;">
              <img src="${project.image}" alt="${lang === 'ar' ? project.title_ar : project.title_en}" class="img-fluid rounded-start">
            </div>
            <div class="p-3" style="width:60%;">
              <h6>${lang === 'ar' ? project.title_ar : project.title_en}</h6>
              <p class="small">${description}</p>
              <button class="btn btn-sm btn-outline-primary view-project-btn"
                data-title="${lang === 'ar' ? project.title_ar : project.title_en}"
                data-description="${lang === 'ar' ? project.description_ar : project.description_en}"
                data-link="${project.link}"
                data-images='${JSON.stringify(project.images || [project.image])}'
                data-category="${project.category}">
                ${lang === 'ar' ? 'عرض المزيد' : 'View More'}
              </button>
            </div>
          </div>`;
      }

      projectsContainer.appendChild(div);
    });

    renderPagination(filteredProjects.length, projectsPerPage, page, projectsContainer, (newPage) => renderProjects(newPage, filter));
    setupFiltering();
  }

  projectsContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('view-project-btn')) {
      const btn = e.target;
      const title = btn.dataset.title || '';
      const description = btn.dataset.description || '';
      const link = btn.dataset.link || '#';
      const images = JSON.parse(btn.dataset.images || '[]');
      const category = btn.dataset.category;

      // تحديث المودال حسب الفئة
      const modalLabel = document.getElementById('projectModalLabel');
      const modalDescription = document.getElementById('projectModalDescription');
      const modalLink = document.getElementById('projectModalLink');
      const modalLinkContainer = document.getElementById('projectModalLinkContainer');

      if (category === 'graphics') {
        modalLabel.style.display = 'none';
        modalDescription.style.display = 'none';
        modalLinkContainer.style.display = 'none';
      } else {
        modalLabel.style.display = 'block';
        modalDescription.style.display = 'block';
        modalLinkContainer.style.display = 'block';
      }

      modalLabel.textContent = category === 'graphics' ? '' : title;
      modalDescription.textContent = category === 'graphics' ? '' : description;
      modalLink.href = link;

      // روابط المشاركة
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
          const copyTextElem = document.querySelector('.copy-text');
          if (!copyTextElem) return;
          const originalText = copyTextElem.textContent;
          copyTextElem.textContent = lang === 'ar' ? 'تم النسخ' : 'Copied!';
          setTimeout(() => {
            copyTextElem.textContent = originalText;
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
        item.innerHTML = `<img src="${src}" class="img d-block w-100 h-100 rounded" alt="Project image ${index + 1}">`;
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
      const selected = btn.getAttribute('data-filter');
      btn.classList.toggle('active', selected === currentProjectFilter);
      btn.classList.toggle('btn-primary', selected === currentProjectFilter);
      btn.classList.toggle('btn-outline-primary', selected !== currentProjectFilter);
      btn.onclick = () => renderProjects(1, selected);
    });
  }

    
  fetch('data.json')
    .then(res => res.json())
    .then(data => {
      jsonData = data;
      renderProjects();
      
    })
    .catch(err => console.error('فشل في تحميل البيانات:', err));

