// Smooth scrolling para links de navegação
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Fechar menu mobile ao clicar em um link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Header background change on scroll
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        }
    });

    // Animação de entrada dos elementos
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Elementos para animar
    const animateElements = document.querySelectorAll('.valor-card, .funcionario-card, .info-card');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });

    // Efeito de hover nos cards da equipe
    const funcionarioCards = document.querySelectorAll('.funcionario-card');
    
    funcionarioCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Animação dos churros flutuantes
    function createFloatingChurro() {
        const churro = document.createElement('div');
        churro.innerHTML = '🥖';
        churro.style.position = 'fixed';
        churro.style.fontSize = '2rem';
        churro.style.pointerEvents = 'none';
        churro.style.zIndex = '1';
        churro.style.opacity = '0.3';
        churro.style.left = Math.random() * window.innerWidth + 'px';
        churro.style.top = window.innerHeight + 'px';
        churro.style.transform = 'rotate(' + Math.random() * 360 + 'deg)';
        
        document.body.appendChild(churro);
        
        // Animação de subida
        let position = window.innerHeight;
        const speed = 1 + Math.random() * 2;
        
        const animate = () => {
            position -= speed;
            churro.style.top = position + 'px';
            churro.style.transform = 'rotate(' + (position * 0.5) + 'deg)';
            
            if (position < -100) {
                document.body.removeChild(churro);
            } else {
                requestAnimationFrame(animate);
            }
        };
        
        animate();
    }

    // Criar churros flutuantes periodicamente
    setInterval(createFloatingChurro, 3000);

    // Efeito parallax suave no hero
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroImage = document.querySelector('.hero-image');
        const floatingChurros = document.querySelector('.floating-churros');
        
        if (heroImage) {
            heroImage.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
        
        if (floatingChurros) {
            floatingChurros.style.transform = `translateY(${scrolled * 0.2}px)`;
        }
    });

    // Contador animado (se necessário no futuro)
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        const timer = setInterval(() => {
            start += increment;
            element.textContent = Math.floor(start);
            
            if (start >= target) {
                element.textContent = target;
                clearInterval(timer);
            }
        }, 16);
    }

    // Efeito de digitação para o título (opcional)
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }

    // Adicionar efeito de brilho aos botões
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 8px 25px rgba(78, 205, 196, 0.4)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        });
    });

    // Efeito de rotação nas rodas do food truck
    const wheels = document.querySelectorAll('.wheel');
    let isScrolling = false;
    
    window.addEventListener('scroll', function() {
        if (!isScrolling) {
            wheels.forEach(wheel => {
                wheel.style.animationPlayState = 'running';
            });
            isScrolling = true;
            
            setTimeout(() => {
                wheels.forEach(wheel => {
                    wheel.style.animationPlayState = 'paused';
                });
                isScrolling = false;
            }, 1000);
        }
    });

    // Adicionar efeito de shake ao logo quando clicado
    const logo = document.querySelector('.logo-text');
    
    logo.addEventListener('click', function() {
        this.style.animation = 'none';
        setTimeout(() => {
            this.style.animation = 'shake 0.5s ease-in-out';
        }, 10);
        
        setTimeout(() => {
            this.style.animation = 'none';
        }, 500);
    });

    // Lazy loading para imagens (quando adicionadas)
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));

    // Adicionar classe ativa ao link de navegação baseado na seção visível
    const sections = document.querySelectorAll('section[id]');
    
    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                const activeLink = document.querySelector(`.nav-link[href="#${id}"]`);
                
                // Remover classe ativa de todos os links
                navLinks.forEach(link => link.classList.remove('active'));
                
                // Adicionar classe ativa ao link atual
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }, {
        threshold: 0.3
    });
    
    sections.forEach(section => navObserver.observe(section));
});

// Adicionar animação de shake ao CSS
const shakeKeyframes = `
@keyframes shake {
    0%, 100% { transform: translateX(0); }
    10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
    20%, 40%, 60%, 80% { transform: translateX(5px); }
}
`;

const style = document.createElement('style');
style.textContent = shakeKeyframes;
document.head.appendChild(style);

// Função para adicionar confetes (efeito especial)
function createConfetti() {
    const colors = ['#4ECDC4', '#FFB6C1', '#FFD700', '#FF6B6B', '#4ECDC4'];
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * window.innerWidth + 'px';
        confetti.style.top = '-10px';
        confetti.style.pointerEvents = 'none';
        confetti.style.zIndex = '9999';
        confetti.style.borderRadius = '50%';
        
        document.body.appendChild(confetti);
        
        let position = -10;
        const speed = 2 + Math.random() * 3;
        const sway = Math.random() * 2 - 1;
        let swayPosition = 0;
        
        const animate = () => {
            position += speed;
            swayPosition += sway;
            confetti.style.top = position + 'px';
            confetti.style.transform = `translateX(${Math.sin(swayPosition * 0.1) * 20}px) rotate(${position}deg)`;
            
            if (position > window.innerHeight + 10) {
                document.body.removeChild(confetti);
            } else {
                requestAnimationFrame(animate);
            }
        };
        
        animate();
    }
}

// Adicionar confetes quando clicar no título principal
document.addEventListener('DOMContentLoaded', function() {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        heroTitle.addEventListener('click', createConfetti);
    }
});
