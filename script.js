// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background on scroll
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.background = 'rgba(15, 23, 42, 0.98)';
        navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.5)';
    } else {
        navbar.style.background = 'rgba(15, 23, 42, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
    }
    
    lastScroll = currentScroll;
});

// Active navigation link
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Add animation to elements
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll(
        '.skill-card, .timeline-item, .tool-item, .about-content, .contact-content'
    );
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Form submission handler
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const formData = new FormData(contactForm);
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const message = contactForm.querySelector('textarea').value;
        
        // Here you would typically send the data to a server
        console.log('Form submitted:', { name, email, message });
        
        // Show success message
        alert('¡Gracias por tu mensaje! Te contactaré pronto.');
        
        // Reset form
        contactForm.reset();
    });
}

// Add typing effect to hero section
const typingText = document.querySelector('.tagline');
if (typingText) {
    const originalText = typingText.textContent;
    typingText.textContent = '';
    let i = 0;
    
    const typeWriter = () => {
        if (i < originalText.length) {
            typingText.textContent += originalText.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    };
    
    // Start typing effect after page loads
    setTimeout(typeWriter, 500);
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector('.hero-image');
    if (heroImage) {
        heroImage.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// Add hover effect to skill cards
const skillCards = document.querySelectorAll('.skill-card');
skillCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Counter animation for experience years
const animateCounter = (element, target, duration) => {
    let start = 0;
    const increment = target / (duration / 16);
    
    const updateCounter = () => {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };
    
    updateCounter();
};

// Observe timeline date for counter animation
const timelineDate = document.querySelector('.timeline-date');
if (timelineDate && timelineDate.textContent.includes('3')) {
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.dataset.animated) {
                entry.target.dataset.animated = 'true';
                // You could add counter animation here if needed
            }
        });
    }, { threshold: 0.5 });
    
    counterObserver.observe(timelineDate);
}

// Add click effect to buttons
const buttons = document.querySelectorAll('.btn');
buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple effect styles dynamically
const style = document.createElement('style');
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Console message
console.log('%c👋 Hola! Gracias por visitar mi portafolio.', 'color: #4facfe; font-size: 16px; font-weight: bold;');
console.log('%c🔒 Especialista en Redes y Ciberseguridad', 'color: #667eea; font-size: 14px;');
console.log('%c💻 ¿Interesado en colaborar? ¡Contáctame!', 'color: #f5576c; font-size: 14px;');

// ============== CHATBOT CONFIGURATION ==============

// IMPORTANTE: Reemplaza esto con tu propia API key de Google Gemini
// Obtén tu API key en: https://aistudio.google.com/app/apikeys
const GEMINI_API_KEY = 'YOUR_GEMINI_API_KEY'; // Reemplaza aquí

const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

// ============== CHATBOT DOM ELEMENTS ==============
const chatbotToggleBtn = document.getElementById('chatbot-toggle');
const chatbotWidget = document.getElementById('chatbot-widget');
const closeBtn = document.getElementById('close-chatbot');
const chatbotInput = document.getElementById('chatbot-input');
const sendBtn = document.getElementById('send-btn');
const messagesContainer = document.getElementById('chatbot-messages');

// ============== CHATBOT EVENT LISTENERS ==============
chatbotToggleBtn.addEventListener('click', openChatbot);
closeBtn.addEventListener('click', closeChatbot);
sendBtn.addEventListener('click', sendMessage);

// Enviar mensaje con Enter
chatbotInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
});

// ============== CHATBOT FUNCTIONS ==============

function openChatbot() {
    chatbotWidget.classList.add('active');
    chatbotToggleBtn.classList.add('hidden');
    chatbotInput.focus();
}

function closeChatbot() {
    chatbotWidget.classList.remove('active');
    chatbotToggleBtn.classList.remove('hidden');
}

function sendMessage() {
    const message = chatbotInput.value.trim();
    
    if (!message) return;
    
    // Agregar mensaje del usuario
    addUserMessage(message);
    
    // Limpiar input
    chatbotInput.value = '';
    sendBtn.disabled = true;
    
    // Validar API key
    if (GEMINI_API_KEY === 'YOUR_GEMINI_API_KEY') {
        addBotMessage('❌ Error: Por favor, configura tu API key de Google Gemini primero.\n\n1. Ve a https://aistudio.google.com/app/apikeys\n2. Copia tu API key\n3. Pega en la línea 8 de script.js donde dice "YOUR_GEMINI_API_KEY"');
        sendBtn.disabled = false;
        return;
    }
    
    // Llamar a Gemini API
    callGeminiAPI(message);
}

function addUserMessage(text) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message user-message';
    messageDiv.innerHTML = `<div class="message-content"><p>${escapeHtml(text)}</p></div>`;
    messagesContainer.appendChild(messageDiv);
    scrollToBottom();
}

function addBotMessage(text) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message bot-message';
    messageDiv.innerHTML = `<div class="message-content"><p>${escapeHtml(text)}</p></div>`;
    messagesContainer.appendChild(messageDiv);
    scrollToBottom();
}

function addLoadingMessage() {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message bot-message loading';
    messageDiv.id = 'loading-message';
    messageDiv.innerHTML = `<div class="loading-dots"><div class="loading-dot"></div><div class="loading-dot"></div><div class="loading-dot"></div></div>`;
    messagesContainer.appendChild(messageDiv);
    scrollToBottom();
}

function removeLoadingMessage() {
    const loadingMsg = document.getElementById('loading-message');
    if (loadingMsg) {
        loadingMsg.remove();
    }
}

function scrollToBottom() {
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

async function callGeminiAPI(userMessage) {
    addLoadingMessage();
    
    try {
        const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: userMessage
                    }]
                }],
                generationConfig: {
                    temperature: 0.7,
                    topP: 0.95,
                    topK: 40,
                    maxOutputTokens: 1024,
                }
            })
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error?.message || `Error: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Extraer el texto de la respuesta
        const botReply = data.candidates?.[0]?.content?.parts?.[0]?.text || 'No se pudo obtener respuesta';
        
        removeLoadingMessage();
        addBotMessage(botReply);
        
    } catch (error) {
        removeLoadingMessage();
        console.error('Error:', error);
        
        let errorMessage = '❌ Error al conectar con Gemini API.\n\n';
        
        if (error.message.includes('API key')) {
            errorMessage += 'Posible problema: API key incorrecta o inválida.\n\n';
            errorMessage += 'Solución: Ve a https://aistudio.google.com/app/apikeys y obtén una nueva API key.';
        } else if (error.message.includes('PERMISSION_DENIED')) {
            errorMessage += 'Permiso denegado: Verifica que tu API key tenga permisos activos.';
        } else {
            errorMessage += `Detalles: ${error.message}`;
        }
        
        addBotMessage(errorMessage);
    } finally {
        sendBtn.disabled = false;
        chatbotInput.focus();
    }
}

