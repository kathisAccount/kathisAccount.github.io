// ============================================
// Mobile Navigation Toggle
// ============================================
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navMenu || !mobileMenuToggle) return;
    if (!navMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
        navMenu.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
    }
});

// ============================================
// Smooth Scrolling for Navigation Links
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = targetElement.offsetTop - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// Navbar Background on Scroll
// ============================================
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        navbar.style.backgroundColor = 'rgba(245, 239, 230, 0.98)';
        navbar.style.boxShadow = '0 2px 15px rgba(62, 48, 33, 0.15)';
    } else {
        navbar.style.backgroundColor = 'rgba(245, 239, 230, 0.95)';
        navbar.style.boxShadow = '0 2px 10px rgba(62, 48, 33, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// ============================================
// Scroll to Top Button
// ============================================
const scrollToTopButton = document.getElementById('scrollToTop');

if (scrollToTopButton) {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollToTopButton.classList.add('visible');
        } else {
            scrollToTopButton.classList.remove('visible');
        }
    });

    scrollToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ============================================
// Intersection Observer for Animations
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe service cards and other elements
document.addEventListener('DOMContentLoaded', () => {
    const serviceCards = document.querySelectorAll('.service-card');
    const aboutContent = document.querySelector('.about-content');
    
    serviceCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
    
    if (aboutContent) {
        aboutContent.style.opacity = '0';
        aboutContent.style.transform = 'translateY(20px)';
        aboutContent.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(aboutContent);
    }
});

// ============================================
// Form Validation (only when Kontaktformular im DOM ist)
// ============================================
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const messageError = document.getElementById('messageError');

if (
    nameInput &&
    emailInput &&
    messageInput &&
    nameError &&
    emailError &&
    messageError
) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    function validateName() {
        const name = nameInput.value.trim();
        if (name.length < 2) {
            nameError.textContent =
                'Bitte gib einen gültigen Namen ein (mindestens 2 Zeichen)';
            nameInput.style.borderColor = '#d32f2f';
            return false;
        }
        nameError.textContent = '';
        nameInput.style.borderColor = '';
        return true;
    }

    function validateEmail() {
        const email = emailInput.value.trim();
        if (!email) {
            emailError.textContent = 'Bitte gib eine E-Mail-Adresse ein';
            emailInput.style.borderColor = '#d32f2f';
            return false;
        }
        if (!emailRegex.test(email)) {
            emailError.textContent = 'Bitte gib eine gültige E-Mail-Adresse ein';
            emailInput.style.borderColor = '#d32f2f';
            return false;
        }
        emailError.textContent = '';
        emailInput.style.borderColor = '';
        return true;
    }

    function validateMessage() {
        const message = messageInput.value.trim();
        if (message.length < 10) {
            messageError.textContent =
                'Bitte gib eine Nachricht ein (mindestens 10 Zeichen)';
            messageInput.style.borderColor = '#d32f2f';
            return false;
        }
        messageError.textContent = '';
        messageInput.style.borderColor = '';
        return true;
    }

    nameInput.addEventListener('blur', validateName);
    nameInput.addEventListener('input', () => {
        if (nameError.textContent) {
            validateName();
        }
    });

    emailInput.addEventListener('blur', validateEmail);
    emailInput.addEventListener('input', () => {
        if (emailError.textContent) {
            validateEmail();
        }
    });

    messageInput.addEventListener('blur', validateMessage);
    messageInput.addEventListener('input', () => {
        if (messageError.textContent) {
            validateMessage();
        }
    });
}

// ============================================
// Initialize on page load
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Check if page was loaded with hash (e.g., #contact)
    if (window.location.hash) {
        const targetElement = document.querySelector(window.location.hash);
        if (targetElement) {
            setTimeout(() => {
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }, 100);
        }
    }
});

// ============================================
// Portfolio Carousel (mehrere .carousel-widget auf der Seite möglich)
// ============================================
const carouselResizeFallbackRefreshers = [];

function initCarousel(root) {
    const track = root.querySelector('.carousel-track');
    const prevBtn = root.querySelector('.carousel-btn.prev');
    const nextBtn = root.querySelector('.carousel-btn.next');
    const dotsContainer = root.querySelector('.carousel-dots');

    if (!track || !prevBtn || !nextBtn) {
        return;
    }

    const trackContainer = track.closest('.carousel-track-container');
    if (!trackContainer) {
        return;
    }

    const slides = Array.from(track.children).filter((el) =>
        el.matches('.carousel-slide')
    );
    if (!slides.length) {
        return;
    }

    if (slides.length <= 1) {
        prevBtn.hidden = true;
        nextBtn.hidden = true;
        if (dotsContainer) {
            dotsContainer.hidden = true;
        }
        return;
    }

    const dotButtons = [];

    if (dotsContainer) {
        dotsContainer.replaceChildren();
        slides.forEach((slide, i) => {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'dot';
            const heading = slide.querySelector('h2, h3')?.textContent?.trim();
            btn.setAttribute(
                'aria-label',
                heading ? `${heading} anzeigen` : `Projekt ${i + 1}`
            );
            btn.addEventListener('click', () => {
                currentIndex = i;
                updateCarousel();
            });
            dotsContainer.appendChild(btn);
            dotButtons.push(btn);
        });
    }

    let currentIndex = 0;

    function slideStepPx() {
        const w = slides[0]?.offsetWidth;
        return w > 0 ? w : trackContainer.clientWidth;
    }

    function updateCarousel(options = {}) {
        const instant = options.instant === true;
        if (instant) {
            track.style.transition = 'none';
        }
        const step = slideStepPx();
        track.style.transform = `translate3d(-${currentIndex * step}px, 0, 0)`;
        if (instant) {
            void track.offsetHeight;
            track.style.removeProperty('transition');
        }

        dotButtons.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    const refreshInstant = () => updateCarousel({ instant: true });

    if (typeof ResizeObserver !== 'undefined') {
        const resizeObserver = new ResizeObserver(refreshInstant);
        resizeObserver.observe(trackContainer);
    } else {
        carouselResizeFallbackRefreshers.push(refreshInstant);
    }

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % slides.length;
        updateCarousel();
    });

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateCarousel();
    });

    updateCarousel();
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.carousel-widget').forEach(initCarousel);

    if (typeof ResizeObserver === 'undefined' && carouselResizeFallbackRefreshers.length) {
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                carouselResizeFallbackRefreshers.forEach((fn) => fn());
            }, 100);
        });
    }
});
