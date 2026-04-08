// Product Data
const products = [
  {
    id: 1,
    title: "Blender Add-on",
    image: "backgrounds/theme.jpg",
    description: "Powerful modeling tools for Blender artists.",
    download: "#"
  },
  {
    id: 2,
    title: "VFX Pack",
    image: "backgrounds/theme.jpg",
    description: "High-quality particle and explosion effects for 3D scenes.",
    download: "#"
  },
  {
    id: 3,
    title: "3D Architecture Set",
    image: "backgrounds/theme.jpg",
    description: "A detailed modern architecture model pack for Blender & Unreal.",
    download: "#"
  },
  {
    id: 4,
    title: "Game Dev Props",
    image: "backgrounds/theme.jpg",
    description: "Low-poly props optimized for real-time engines.",
    download: "#"
  },
  {
    id: 5,
    title: "Unreal Plugin",
    image: "backgrounds/theme.jpg",
    description: "Custom Unreal Engine plugin tools for developers.",
    download: "#"
  },
  {
    id: 6,
    title: "Blender Brush Kit",
    image: "backgrounds/theme.jpg",
    description: "Essential sculpting brushes for Blender artists.",
    download: "#"
  },
  {
    id: 7,
    title: "After Effects Motion Graphics",
    image: "backgrounds/theme.jpg",
    description: "Professional motion graphics templates for After Effects.",
    download: "#"
  },
  {
    id: 8,
    title: "Premiere Pro Transitions",
    image: "backgrounds/theme.jpg",
    description: "Smooth and stylish transitions for Premiere Pro projects.",
    download: "#"
  },
  {
    id: 9,
    title: "AE Text Animation Pack",
    image: "backgrounds/theme.jpg",
    description: "Collection of customizable text animations for After Effects.",
    download: "#"
  },
  {
    id: 10,
    title: "PP Color Grading Presets",
    image: "backgrounds/theme.jpg",
    description: "Professional color grading presets for Premiere Pro.",
    download: "#"
  },
  {
    id: 11,
    title: "Photoshop Layer Styles",
    image: "backgrounds/theme.jpg",
    description: "Premium layer styles for Adobe Photoshop projects.",
    download: "#"
  },
  {
    id: 12,
    title: "Houdini Pro Assets",
    image: "backgrounds/theme.jpg",
    description: "Professional 3D assets for SideFX Houdini projects.",
    download: "#"
  },
  {
    id: 13,
    title: "Software Utilities Pack",
    image: "backgrounds/theme.jpg",
    description: "Essential utilities and tools for creative software.",
    download: "#"
  },
  {
    id: 14,
    title: "Modern Website Template",
    image: "backgrounds/theme.jpg",
    description: "Responsive HTML template for modern websites.",
    download: "#"
  },
  {
    id: 15,
    title: "Geometry Nodes Toolkit",
    image: "https://drive.google.com/uc?export=view&id=1kGaM_JdzaooZBNZjmvhyN0vPLQMVnq0W",
    description: "A complete Geometry Nodes toolkit for Blender with ready-to-use node setups.",
    category: "blender-addons",
    download: "#"
  }
];

let currentPage = 1;
const itemsPerPage = 30;

// DOMContentLoaded event listeners
function initHome() {
  displayProducts();
  initSlideshows();
}

function displayProducts() {
  const grid = document.getElementById("productsGrid");
  if (!grid) return; // Exit if grid doesn't exist on current page
  
  grid.innerHTML = "";

  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const currentProducts = products.slice(start, end);

  currentProducts.forEach((p) => {
    const card = document.createElement("div");
    card.classList.add("product-card");
    card.innerHTML = `
      <img src="${p.image}" alt="${p.title}" loading="lazy">
      <div class="product-info">
        <h3>${p.title}</h3>
        <p>${p.description}</p>
        <button class="view-btn" onclick="viewProduct(${p.id})">View Details</button>
      </div>
    `;
    grid.appendChild(card);
  });

  const pageElement = document.getElementById("pageNumber");
  if (pageElement) {
    pageElement.innerText = `Page ${currentPage}`;
  }
}

function viewProduct(id) {
  const product = products.find(p => p.id === id);
  if (product) {
    const homePage = document.getElementById("homePage");
    const productPage = document.getElementById("productPage");
    
    if (homePage && productPage) {
      const detailImage = document.getElementById("detailImage");
      const detailTitle = document.getElementById("detailTitle");
      const detailDesc = document.getElementById("detailDesc");
      const detailDownload = document.getElementById("detailDownload");
      
      if (detailImage) detailImage.src = product.image;
      if (detailTitle) detailTitle.innerText = product.title;
      if (detailDesc) detailDesc.innerText = product.description;
      if (detailDownload) detailDownload.href = product.download;

      homePage.classList.add("hidden");
      productPage.classList.remove("hidden");
    }
  }
}

function nextPage() {
  const totalPages = Math.ceil(products.length / itemsPerPage);
  if (currentPage < totalPages) {
    currentPage++;
    displayProducts();
  }
}

function previousPage() {
  if (currentPage > 1) {
    currentPage--;
    displayProducts();
  }
}

function toggleSubmenu(event) {
  event.preventDefault();
  event.stopPropagation();
  
  // Get the parent dropdown item - handle clicks on icon, text, or anchor
  let parent = event.target.closest(".dropdown-item");
  
  if (!parent) return;
  
  const submenu = parent.querySelector(".submenu");
  const chevron = parent.querySelector(".chevron");
  
  if (!submenu) return;
  
  // Close all other open submenus first
  const allDropdowns = document.querySelectorAll(".dropdown-item");
  allDropdowns.forEach(dropdown => {
    if (dropdown !== parent) {
      const otherSubmenu = dropdown.querySelector(".submenu");
      const otherChevron = dropdown.querySelector(".chevron");
      if (otherSubmenu) {
        otherSubmenu.classList.remove("open");
      }
      if (otherChevron) {
        otherChevron.classList.remove("rotate");
      }
    }
  });
  
  // Toggle submenu visibility
  submenu.classList.toggle("open");
  
  // Toggle chevron rotation
  if (chevron) {
    chevron.classList.toggle("rotate");
  }
}

// Close dropdowns when clicking outside
function closeAllDropdowns(event) {
  if (!event.target.closest(".dropdown-item")) {
    const allSubmenus = document.querySelectorAll(".submenu");
    const allChevrons = document.querySelectorAll(".chevron");
    allSubmenus.forEach(submenu => submenu.classList.remove("open"));
    allChevrons.forEach(chevron => chevron.classList.remove("rotate"));
  }
}

// ===== SLIDESHOW FUNCTIONALITY =====
let slideIndexMain = 0;
let slideIndexLeft = 0;
let slideIndexRight = 0;
let slideTimerMain, slideTimerLeft, slideTimerRight;

function showSlides(type) {
  if (type === 'main') {
    let slides = document.querySelectorAll('.main-slideshow .slide');
    let dots = document.querySelectorAll('.main-slideshow .dot');
    
    // Hide all slides
    for (let i = 0; i < slides.length; i++) {
      slides[i].classList.remove('active');
    }
    
    // Remove active class from all dots
    for (let i = 0; i < dots.length; i++) {
      dots[i].classList.remove('active');
    }
    
    // Increment slide index
    slideIndexMain++;
    if (slideIndexMain > slides.length) {
      slideIndexMain = 1;
    }
    
    // Show current slide and activate dot
    if (slides[slideIndexMain - 1]) {
      slides[slideIndexMain - 1].classList.add('active');
    }
    if (dots[slideIndexMain - 1]) {
      dots[slideIndexMain - 1].classList.add('active');
    }
    
    // Change slide every 5 seconds
    slideTimerMain = setTimeout(() => showSlides('main'), 5000);
  }
  else if (type === 'left') {
    let slides = document.querySelectorAll('#leftSlideshow .slide-small');
    let dots = document.querySelectorAll('#leftSlideshow .dot-small');
    
    // Hide all slides
    for (let i = 0; i < slides.length; i++) {
      slides[i].classList.remove('active');
    }
    
    // Remove active class from all dots
    for (let i = 0; i < dots.length; i++) {
      dots[i].classList.remove('active');
    }
    
    // Increment slide index
    slideIndexLeft++;
    if (slideIndexLeft > slides.length) {
      slideIndexLeft = 1;
    }
    
    // Show current slide and activate dot
    if (slides[slideIndexLeft - 1]) {
      slides[slideIndexLeft - 1].classList.add('active');
    }
    if (dots[slideIndexLeft - 1]) {
      dots[slideIndexLeft - 1].classList.add('active');
    }
    
    // Change slide every 5 seconds
    slideTimerLeft = setTimeout(() => showSlides('left'), 5000);
  }
  else if (type === 'right') {
    let slides = document.querySelectorAll('#rightSlideshow .slide-small');
    let dots = document.querySelectorAll('#rightSlideshow .dot-small');
    
    // Hide all slides
    for (let i = 0; i < slides.length; i++) {
      slides[i].classList.remove('active');
    }
    
    // Remove active class from all dots
    for (let i = 0; i < dots.length; i++) {
      dots[i].classList.remove('active');
    }
    
    // Increment slide index
    slideIndexRight++;
    if (slideIndexRight > slides.length) {
      slideIndexRight = 1;
    }
    
    // Show current slide and activate dot
    if (slides[slideIndexRight - 1]) {
      slides[slideIndexRight - 1].classList.add('active');
    }
    if (dots[slideIndexRight - 1]) {
      dots[slideIndexRight - 1].classList.add('active');
    }
    
    // Change slide every 5 seconds
    slideTimerRight = setTimeout(() => showSlides('right'), 5000);
  }
}

function currentSlide(n, type) {
  if (type === 'main') {
    clearTimeout(slideTimerMain);
    slideIndexMain = n - 1;
    showSlides('main');
  } else if (type === 'left') {
    clearTimeout(slideTimerLeft);
    slideIndexLeft = n - 1;
    showSlides('left');
  } else if (type === 'right') {
    clearTimeout(slideTimerRight);
    slideIndexRight = n - 1;
    showSlides('right');
  }
}

function initSlideshows() {
  // Show the first slide of each slideshow immediately
  showFirstSlide('main');
  showFirstSlide('left');
  showFirstSlide('right');
  
  // Then start the automatic slideshow
  slideTimerMain = setTimeout(() => showSlides('main'), 5000);
  slideTimerLeft = setTimeout(() => showSlides('left'), 5000);
  slideTimerRight = setTimeout(() => showSlides('right'), 5000);
}

function showFirstSlide(type) {
  if (type === 'main') {
    let slides = document.querySelectorAll('.main-slideshow .slide');
    let dots = document.querySelectorAll('.main-slideshow .dot');
    
    // Show first slide
    if (slides[0]) {
      slides[0].classList.add('active');
    }
    
    // Activate first dot
    if (dots[0]) {
      dots[0].classList.add('active');
    }
  }
  else if (type === 'left') {
    let slides = document.querySelectorAll('#leftSlideshow .slide-small');
    let dots = document.querySelectorAll('#leftSlideshow .dot-small');
    
    // Show first slide
    if (slides[0]) {
      slides[0].classList.add('active');
    }
    
    // Activate first dot
    if (dots[0]) {
      dots[0].classList.add('active');
    }
  }
  else if (type === 'right') {
    let slides = document.querySelectorAll('#rightSlideshow .slide-small');
    let dots = document.querySelectorAll('#rightSlideshow .dot-small');
    
    // Show first slide
    if (slides[0]) {
      slides[0].classList.add('active');
    }
    
    // Activate first dot
    if (dots[0]) {
      dots[0].classList.add('active');
    }
  }
}

// Optimized event listeners
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initHome);
  document.addEventListener('DOMContentLoaded', () => {
    document.addEventListener("click", closeAllDropdowns);
  });
} else {
  initHome();
  document.addEventListener("click", closeAllDropdowns);
}

// Fallback to ensure slideshows work even if initial load fails
window.addEventListener('load', function() {
  // If no slides are active, initialize slideshows
  const activeSlides = document.querySelectorAll('.slide.active, .slide-small.active');
  if (activeSlides.length === 0) {
    initSlideshows();
  }
});

