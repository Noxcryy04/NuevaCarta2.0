document.querySelector('.card').addEventListener('click', () => {
    document.querySelector('.card').classList.toggle('flipped');
});

function createMovingParticles() {
    const particleBackground = document.querySelector('.particle-background');
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.style.width = `${Math.random() * 20 + 10}px`;
        particle.style.height = particle.style.width;
        particle.style.left = `${Math.random() * 100}vw`;
        particle.style.top = `${Math.random() * 100}vh`;
        particle.style.animationDuration = `${Math.random() * 5 + 5}s`;
        particleBackground.appendChild(particle);
    }
}

function createTextParticles() {
    const particleBackground = document.querySelector('.particle-background');
    const text = "Feliz San Valentín";
    const fontSize = 100;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.font = `${fontSize}px Arial`;
    ctx.fillStyle = 'white';
    ctx.fillText(text, (canvas.width - ctx.measureText(text).width) / 2, canvas.height / 2);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    const particles = [];
    for (let y = 0; y < canvas.height; y += 10) {
        for (let x = 0; x < canvas.width; x += 10) {
            const index = (y * canvas.width + x) * 4;
            if (imageData[index + 3] > 128) {
                particles.push({ x, y });
            }
        }
    }

    particles.forEach(({ x, y }) => {
        const particle = document.createElement('div');
        particle.classList.add('heart-particle');
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        particle.dataset.originalX = x;
        particle.dataset.originalY = y;
        particleBackground.appendChild(particle);
    });
}

function createHeartParticles() {
    const particleBackground = document.querySelector('.particle-background');
    const numParticles = 100;
    const heartFunction = (t) => {
        const x = 16 * Math.sin(t) ** 3;
        const y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
        return { x, y };
    };

    for (let i = 0; i < numParticles; i++) {
        const particle = document.createElement('div');
        particle.classList.add('heart-particle');
        const t = (i / numParticles) * 2 * Math.PI;
        const { x, y } = heartFunction(t);
        particle.style.left = `${50 + x * 2}%`;
        particle.style.top = `${50 - y * 2}%`;
        particleBackground.appendChild(particle);
    }
}

function moveParticles(event) {
    const particles = document.querySelectorAll('.heart-particle');
    particles.forEach(particle => {
        const rect = particle.getBoundingClientRect();
        const dx = event.clientX - (rect.left + rect.width / 2);
        const dy = event.clientY - (rect.top + rect.height / 2);
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 100;
        const moveDist = Math.min(maxDist, maxDist - dist);
        const angle = Math.atan2(dy, dx);
        const moveX = Math.cos(angle) * moveDist;
        const moveY = Math.sin(angle) * moveDist;
        particle.style.transform = `translate(${moveX}px, ${moveY}px) translateZ(${moveDist / 2}px)`;
    });
}

function resetParticles() {
    const particles = document.querySelectorAll('.heart-particle');
    particles.forEach(particle => {
        particle.style.transform = `translate(0, 0) translateZ(0)`;
    });
}

function updateCounter() {
    const startDate = new Date('2022-10-02T00:00:00');
    const now = new Date();
    const diff = now - startDate;

    const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
    const months = Math.floor((diff % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30));
    const days = Math.floor((diff % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById('counter').innerHTML = `
        <div class="counter-item"><span>${years}</span> años</div>
        <div class="counter-item"><span>${months}</span> meses</div>
        <div class="counter-item"><span>${days}</span> días</div>
        <div class="counter-item"><span>${hours}</span> horas</div>
        <div class="counter-item"><span>${minutes}</span> minutos</div>
        <div class="counter-item"><span>${seconds}</span> segundos</div>
    `;
}

document.querySelector('.card').addEventListener('mouseenter', resetParticles);
document.addEventListener('mousemove', moveParticles);

document.getElementById('show-counter').addEventListener('click', () => {
    document.getElementById('counter').style.display = 'block';
    updateCounter();
    setInterval(updateCounter, 1000);
});

createMovingParticles();
createTextParticles();
