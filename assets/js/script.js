// AOS Animation Init
AOS.init({
    duration: 800,
    once: true,
    offset: 100
});

// Vanilla Tilt Init
VanillaTilt.init(document.querySelectorAll(".tilt-element"), {
    max: 15,
    speed: 400,
    glare: true,
    "max-glare": 0.2
});

// Theme System
const themeToggle = document.getElementById('theme-toggle');
const root = document.documentElement;

function initTheme() {
    const stored = localStorage.getItem('ken-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = stored || (prefersDark ? 'dark' : 'light');
    root.setAttribute('data-theme', theme);
    updateThemeIcon(theme);
}

function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    icon.className = theme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
}

themeToggle.addEventListener('click', () => {
    const current = root.getAttribute('data-theme');
    const target = current === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', target);
    localStorage.setItem('ken-theme', target);
    updateThemeIcon(target);
});

initTheme();

// Navbar Scroll & Mobile Menu
const navbar = document.getElementById('navbar');
const mobileToggle = document.getElementById('mobile-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-menu a');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
// Scroll Progress
const winScroll = document.documentElement.scrollTop;
const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
const scrolled = Math.round((winScroll / height) * 100);

document.getElementById("scroll-progress").style.width = scrolled + "%";
document.getElementById("scroll-percent").textContent = scrolled + "%";

const circle = document.querySelector(".progress-ring-fill");
const circumference = 170;

circle.style.strokeDashoffset =
    circumference - (scrolled / 100) * circumference;

// Back To Top Button
const scrollTopBtn = document.getElementById("scroll-top-btn");

if (window.scrollY > 300) {
    scrollTopBtn.classList.add("show");
} else {
    scrollTopBtn.classList.remove("show");
}

});

document.getElementById('scroll-top-btn').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

mobileToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    mobileToggle.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileToggle.classList.remove('active');
    });
});

// Typing Effect
const typingEl = document.getElementById('typing-text');
const words = ['Full Stack Web Developer', 'Computer Programmer', 'IT Support Specialist', 'WordPress Developer', 'Virtual Assistant'];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    const currentWord = words[wordIndex];
    if (isDeleting) {
        typingEl.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingEl.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentWord.length) {
        typeSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typeSpeed = 500;
    }

    setTimeout(type, typeSpeed);
}
setTimeout(type, 1000);

// Animated Counters
const counters = document.querySelectorAll('.counter');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.counted) {
            entry.target.dataset.counted = 'true';
            const target = +entry.target.dataset.target;
            let count = 0;
            const speed = 2000 / target;
            const updateCount = () => {
                if (count < target) {
                    count++;
                    entry.target.innerText = count + "+";
                    setTimeout(updateCount, speed);
                } else {
                    entry.target.innerText = target + "+";
                }
            };
            updateCount();
        }
    });
}, { threshold: 0.5 });

counters.forEach(counter => observer.observe(counter));

// Project Filters
const filterBtns = document.querySelectorAll('.filter-btn');
const projects = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter;
        
        projects.forEach(project => {
            if (filter === 'all' || project.dataset.category === filter) {
                project.style.display = 'block';
                setTimeout(() => project.style.opacity = '1', 50);
            } else {
                project.style.opacity = '0';
                setTimeout(() => project.style.display = 'none', 300);
            }
        });
    });
});

// Lightbox
const lightbox = document.getElementById('lightbox');
const lightboxContent = document.getElementById('lightbox-content');
const lightboxClose = document.getElementById('lightbox-close');

window.openLightbox = function(src, type) {
    lightboxContent.innerHTML = '';
    if (type === 'pdf') {
        lightboxContent.innerHTML = `<iframe src="${src}" frameborder="0"></iframe>`;
    } else {
        lightboxContent.innerHTML = `<img src="${src}" alt="Preview">`;
    }
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
};

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
    lightboxContent.innerHTML = '';
}

lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
});
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
});

// Contact Form
document.getElementById('contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const mailto = `mailto:roveglenton123@gmail.com?subject=${encodeURIComponent(formData.get('subject'))}&body=${encodeURIComponent(`Name: ${formData.get('name')}\nEmail: ${formData.get('email')}\n\n${formData.get('message')}`)}`;
    window.location.href = mailto;
    e.target.reset();
});

// Simple Canvas Particles Background
const canvas = document.getElementById('particles-js');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x > canvas.width) this.x = 0;
        else if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        else if (this.y < 0) this.y = canvas.height;
    }
    draw() {
        ctx.fillStyle = root.getAttribute('data-theme') === 'dark' ? 'rgba(59, 130, 246, 0.5)' : 'rgba(59, 130, 246, 0.3)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    particlesArray = [];
    const numberOfParticles = (canvas.width * canvas.height) / 15000;
    for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
    }
    requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();
});

document.getElementById("copyright").innerHTML =
"&copy; " + new Date().getFullYear() + " <span>Rove Glenton Colong</span>. All Rights Reserved.";