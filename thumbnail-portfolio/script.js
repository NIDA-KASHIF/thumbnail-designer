// ================================
// CURSOR GLOW EFFECT
// ================================
const cursorGlow = document.getElementById('cursorGlow');

document.addEventListener('mousemove', (e) => {
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top = e.clientY + 'px';
});

// ================================
// NAVBAR SCROLL BEHAVIOR
// ================================
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link[data-section]');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    // Navbar background
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Active link highlighting
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        const sectionHeight = section.offsetHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-section') === current) {
            link.classList.add('active');
        }
    });
});

// ================================
// MOBILE NAV TOGGLE
// ================================
const navToggle = document.getElementById('navToggle');
const navLinksContainer = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinksContainer.classList.toggle('open');
});

// Close mobile nav on link click
navLinksContainer.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navLinksContainer.classList.remove('open');
    });
});

// ================================
// STAT COUNTER ANIMATION
// ================================
const statNumbers = document.querySelectorAll('.stat-number');
let statsAnimated = false;

function animateStats() {
    if (statsAnimated) return;

    const heroStats = document.querySelector('.hero-stats');
    if (!heroStats) return;

    const rect = heroStats.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.8) {
        statsAnimated = true;

        statNumbers.forEach(num => {
            const target = parseInt(num.getAttribute('data-count'));
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;

            const timer = setInterval(() => {
                current += step;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                num.textContent = Math.floor(current);
            }, 16);
        });
    }
}

window.addEventListener('scroll', animateStats);
animateStats(); // Check on load

// ================================
// INTERSECTION OBSERVER - SCROLL ANIMATIONS
// ================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all thumb cards
document.querySelectorAll('.thumb-card').forEach(card => {
    observer.observe(card);
});

// Observe section headers
document.querySelectorAll('.section-header').forEach(header => {
    observer.observe(header);
});

// Observe contact items
document.querySelectorAll('.contact-item, .service-card').forEach(item => {
    observer.observe(item);
});

// ================================
// SMOOTH SCROLL FOR NAV LINKS
// ================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ================================
// THUMBNAIL CARD TILT EFFECT
// ================================
document.querySelectorAll('.thumb-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;

        card.style.transform = `translateY(-8px) perspective(600px) rotateX(${-y * 5}deg) rotateY(${x * 5}deg)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) perspective(600px) rotateX(0deg) rotateY(0deg)';
    });
});

// ================================
// PARALLAX HERO SHAPES
// ================================
const shapes = document.querySelectorAll('.shape');

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    shapes.forEach((shape, index) => {
        const speed = (index + 1) * 0.15;
        shape.style.transform = `translateY(${scrollY * speed}px)`;
    });
});

// ================================
// LIGHTBOX FOR THUMBNAILS
// ================================
const lightbox = document.createElement('div');
lightbox.id = 'lightbox';
lightbox.innerHTML = `
    <div class="lightbox-overlay"></div>
    <div class="lightbox-content">
        <button class="lightbox-close">&times;</button>
        <img src="" alt="Thumbnail Preview">
        <div class="lightbox-info">
            <h3></h3>
            <p></p>
        </div>
    </div>
`;

// Add lightbox styles
const lightboxStyles = document.createElement('style');
lightboxStyles.textContent = `
    #lightbox {
        position: fixed;
        inset: 0;
        z-index: 9999;
        display: none;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    #lightbox.active {
        display: flex;
        opacity: 1;
    }
    .lightbox-overlay {
        position: absolute;
        inset: 0;
        background: rgba(0, 0, 0, 0.9);
        backdrop-filter: blur(10px);
    }
    .lightbox-content {
        position: relative;
        max-width: 90vw;
        max-height: 90vh;
        z-index: 1;
        animation: lightboxIn 0.3s ease;
    }
    @keyframes lightboxIn {
        from { transform: scale(0.9); opacity: 0; }
        to { transform: scale(1); opacity: 1; }
    }
    .lightbox-content img {
        max-width: 100%;
        max-height: 75vh;
        border-radius: 16px;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
    }
    .lightbox-close {
        position: absolute;
        top: -20px;
        right: -20px;
        width: 44px;
        height: 44px;
        background: rgba(124, 58, 237, 0.9);
        border: none;
        border-radius: 50%;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: transform 0.2s;
        z-index: 2;
    }
    .lightbox-close:hover { transform: scale(1.1); }
    .lightbox-info {
        text-align: center;
        margin-top: 16px;
        color: white;
    }
    .lightbox-info h3 {
        font-family: 'Space Grotesk', sans-serif;
        font-size: 1.2rem;
        margin-bottom: 4px;
    }
    .lightbox-info p {
        color: rgba(255,255,255,0.6);
        font-size: 0.9rem;
    }
`;
document.head.appendChild(lightboxStyles);
document.body.appendChild(lightbox);

// Add click handlers for thumbnail cards with images
document.querySelectorAll('.thumb-card:not(.css-thumb)').forEach(card => {
    card.style.cursor = 'pointer';
    card.addEventListener('click', () => {
        const img = card.querySelector('img');
        const title = card.querySelector('.thumb-info h3');
        const desc = card.querySelector('.thumb-info p');

        if (img) {
            lightbox.querySelector('img').src = img.src;
            lightbox.querySelector('.lightbox-info h3').textContent = title ? title.textContent : '';
            lightbox.querySelector('.lightbox-info p').textContent = desc ? desc.textContent : '';
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    });
});

// Close lightbox
lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
lightbox.querySelector('.lightbox-overlay').addEventListener('click', closeLightbox);
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
});

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

// ================================
// PAGE LOAD ANIMATION
// ================================
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

console.log('🎨 Portfolio loaded — Designed by Nida Kashif');
