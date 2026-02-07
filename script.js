// ===== HEARTS ANIMATION =====
function createHeart() {
    const container = document.getElementById('heartsContainer');
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.textContent = ['💕', '💖', '💗', '💓', '💝', '🌸', '✨'][Math.floor(Math.random() * 7)];
    heart.style.left = Math.random() * 100 + '%';
    heart.style.animationDuration = (Math.random() * 5 + 5) + 's';
    heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
    container.appendChild(heart);
    
    setTimeout(() => heart.remove(), 10000);
}

setInterval(createHeart, 400);

// ===== SPARKLES ON CLICK =====
function createSparkle(x, y) {
    const container = document.getElementById('sparkleContainer');
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.style.left = x + 'px';
    sparkle.style.top = y + 'px';
    container.appendChild(sparkle);
    
    setTimeout(() => sparkle.remove(), 1000);
}

document.addEventListener('click', (e) => {
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            createSparkle(
                e.clientX + (Math.random() - 0.5) * 50,
                e.clientY + (Math.random() - 0.5) * 50
            );
        }, i * 50);
    }
});

// ===== SCROLL NAVIGATION =====
function scrollToStory() {
    document.getElementById('story').scrollIntoView({ behavior: 'smooth' });
}

function scrollToReasons() {
    document.getElementById('reasons').scrollIntoView({ behavior: 'smooth' });
}

function scrollToQuestion() {
    document.getElementById('question').scrollIntoView({ behavior: 'smooth' });
}

// ===== SCROLL OBSERVER =====
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

document.querySelectorAll('.fade-in-scroll').forEach(el => observer.observe(el));

// ===== NO BUTTON (PLAYFUL) =====
const noBtn = document.getElementById('noBtn');
let noClickCount = 0;

function moveNoButton() {
    const section = document.getElementById('question');
    const rect = section.getBoundingClientRect();
    const maxX = rect.width - 150;
    const maxY = rect.height - 80;
    
    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;
    
    noBtn.style.position = 'absolute';
    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';
    
    noClickCount++;
    
    const messages = [
        'Really? 😢',
        'Are you sure? 🥺',
        'Think again! 💭',
        'My heart! 💔',
        'Pretty please? 🙏',
        'Wrong button! 🚫',
        'Try the other one! ✅'
    ];
    
    if (noClickCount < messages.length) {
        noBtn.textContent = messages[noClickCount];
    }
}

// ===== YES RESPONSE =====
function sayYes() {
    const questionSection = document.getElementById('question');
    const yesSection = document.getElementById('yesResponse');
    
    questionSection.style.display = 'none';
    yesSection.classList.remove('hidden');
    
    // Start confetti
    startConfetti();
    
    // Burst of hearts
    for (let i = 0; i < 50; i++) {
        setTimeout(createHeart, i * 50);
    }
    
    // Trigger music if not playing
    const music = document.getElementById('bgMusic');
    if (music.paused) {
        music.play();
        document.getElementById('musicBtn').classList.add('playing');
    }
}

// ===== CONFETTI =====
function startConfetti() {
    const canvas = document.getElementById('confettiCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles = [];
    const colors = ['#f43f5e', '#8b5cf6', '#10b981', '#f59e0b', '#ec4899', '#06b6d4'];
    
    for (let i = 0; i < 200; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            vx: (Math.random() - 0.5) * 4,
            vy: Math.random() * 3 + 2,
            color: colors[Math.floor(Math.random() * colors.length)],
            size: Math.random() * 8 + 4,
            rotation: Math.random() * 360,
            rotationSpeed: (Math.random() - 0.5) * 10
        });
    }
    
    let animationId;
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach((p, i) => {
            p.x += p.vx;
            p.y += p.vy;
            p.rotation += p.rotationSpeed;
            
            if (p.y > canvas.height) {
                p.y = -20;
                p.x = Math.random() * canvas.width;
            }
            
            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate(p.rotation * Math.PI / 180);
            ctx.fillStyle = p.color;
            ctx.fillRect(-p.size/2, -p.size/2, p.size, p.size);
            ctx.restore();
        });
        
        animationId = requestAnimationFrame(animate);
    }
    
    animate();
    
    // Stop after 30 seconds
    setTimeout(() => {
        cancelAnimationFrame(animationId);
    }, 30000);
}

// ===== MUSIC CONTROL =====
function toggleMusic() {
    const music = document.getElementById('bgMusic');
    const btn = document.getElementById('musicBtn');
    const icon = document.getElementById('musicIcon');
    
    if (music.paused) {
        music.play();
        btn.classList.add('playing');
        icon.textContent = '🎵';
    } else {
        music.pause();
        btn.classList.remove('playing');
        icon.textContent = '🔇';
    }
}

// ===== PREVENT SCROLL ON HIDDEN SECTIONS =====
window.addEventListener('scroll', () => {
    const yesSection = document.getElementById('yesResponse');
    if (!yesSection.classList.contains('hidden')) {
        // User said yes! Keep them in celebration
    }
});

// ===== INITIALIZE =====
document.addEventListener('DOMContentLoaded', () => {
    // Preload some hearts
    for (let i = 0; i < 10; i++) {
        setTimeout(createHeart, i * 200);
    }
});