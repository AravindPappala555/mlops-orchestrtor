// Spider Web Background Animation
const canvas = document.getElementById('webCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];
const numberOfParticles = 100;

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
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
    }
    
    draw() {
        ctx.fillStyle = 'rgba(230, 57, 70, 0.5)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function init() {
    particlesArray = [];
    for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
    }
}

function connect() {
    for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
            let distance = Math.hypot(
                particlesArray[a].x - particlesArray[b].x,
                particlesArray[a].y - particlesArray[b].y
            );
            
            if (distance < 150) {
                ctx.strokeStyle = `rgba(230, 57, 70, ${1 - distance / 150})`;
                ctx.lineWidth = 0.5;
                ctx.beginPath();
                ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                ctx.stroke();
            }
        }
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particlesArray.forEach(particle => {
        particle.update();
        particle.draw();
    });
    
    connect();
    requestAnimationFrame(animate);
}

init();
animate();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});

// Smooth Scrolling
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

// Chatbot Functionality
const spiderIcon = document.getElementById('spiderIcon');
const chatbotContainer = document.getElementById('chatbotContainer');
const closeChatbot = document.getElementById('closeChatbot');
const chatInput = document.getElementById('chatInput');
const sendMessage = document.getElementById('sendMessage');
const chatMessages = document.getElementById('chatMessages');

// Toggle chatbot
spiderIcon.addEventListener('click', () => {
    chatbotContainer.classList.toggle('active');
});

closeChatbot.addEventListener('click', () => {
    chatbotContainer.classList.remove('active');
});

// Chatbot Knowledge Base
const chatbotKnowledge = {
    skills: {
        keywords: ['skills', 'technology', 'tech stack', 'tools', 'languages', 'programming'],
        responses: [
            "I specialize in MLOps with expertise in TensorFlow, PyTorch, Kubernetes, Docker, and cloud platforms like AWS and GCP. I'm proficient in Python, SQL, and have experience with monitoring tools like Prometheus and Grafana.",
            "My tech stack includes ML frameworks (TensorFlow, PyTorch), MLOps tools (Kubeflow, MLflow), cloud platforms (AWS, GCP, Azure), and DevOps technologies (Docker, Kubernetes, CI/CD)."
        ]
    },
    projects: {
        keywords: ['projects', 'work', 'portfolio', 'built', 'created', 'developed'],
        responses: [
            "I've built several impactful projects including a Real-Time Fraud Detection Pipeline processing 10M+ transactions/day, Computer Vision models for edge deployment, an AutoML platform, and NLP fine-tuning pipelines.",
            "My featured projects include fraud detection systems with 95% accuracy, CV models optimized with TensorRT, and distributed training pipelines that reduced costs by 70%."
        ]
    },
    experience: {
        keywords: ['experience', 'work history', 'job', 'career', 'background'],
        responses: [
            "I'm currently a Senior MLOps Engineer at Tech Innovations Inc., where I've deployed 30+ ML models serving 5M+ daily predictions. Previously, I worked at Data Solutions Corp and Analytics Hub.",
            "I have 5+ years of experience in ML and MLOps, progressing from Data Scientist to Senior MLOps Engineer. I've led teams, reduced deployment times by 75%, and implemented comprehensive monitoring systems."
        ]
    },
    mlops: {
        keywords: ['mlops', 'deployment', 'production', 'pipeline', 'automation'],
        responses: [
            "I specialize in end-to-end MLOps pipelines including model versioning, A/B testing, automated retraining, monitoring, and CI/CD. I've achieved 99.8% uptime on production systems.",
            "My MLOps expertise covers Kubernetes orchestration, Docker containerization, model monitoring with drift detection, and building scalable ML infrastructure on cloud platforms."
        ]
    },
    contact: {
        keywords: ['contact', 'email', 'reach', 'hire', 'connect', 'linkedin', 'github'],
        responses: [
            "You can reach me at assam@mlops.dev or connect with me on LinkedIn and GitHub. I'm open to new opportunities and collaborations!",
            "Feel free to contact me via email at assam@mlops.dev. You can also find me on GitHub and LinkedIn. Let's connect!"
        ]
    }
};

// Simple chatbot response function (simulating vector.pkl and chatbot.pkl)
function getChatbotResponse(userMessage) {
    const message = userMessage.toLowerCase();
    
    // Check knowledge base
    for (const [category, data] of Object.entries(chatbotKnowledge)) {
        for (const keyword of data.keywords) {
            if (message.includes(keyword)) {
                const randomIndex = Math.floor(Math.random() * data.responses.length);
                return data.responses[randomIndex];
            }
        }
    }
    
    // Default responses
    const defaultResponses = [
        "That's an interesting question! Could you be more specific about what you'd like to know about my MLOps experience, projects, or skills?",
        "I'd be happy to help! Feel free to ask me about my technical skills, featured projects, work experience, or how to get in touch.",
        "I can tell you about my MLOps expertise, the projects I've built, my professional background, or how we can connect. What interests you most?"
    ];
    
    const randomIndex = Math.floor(Math.random() * defaultResponses.length);
    return defaultResponses[randomIndex];
}

// Send message function
function handleSendMessage() {
    const message = chatInput.value.trim();
    
    if (message === '') return;
    
    // Add user message
    addMessage(message, 'user');
    
    // Clear input
    chatInput.value = '';
    
    // Simulate typing delay
    setTimeout(() => {
        const response = getChatbotResponse(message);
        addMessage(response, 'bot');
    }, 500);
}

// Add message to chat
function addMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    contentDiv.textContent = text;
    
    messageDiv.appendChild(contentDiv);
    chatMessages.appendChild(messageDiv);
    
    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Event listeners
sendMessage.addEventListener('click', handleSendMessage);

chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleSendMessage();
    }
});

// Intersection Observer for scroll animations
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

// Observe all sections
document.querySelectorAll('.skill-card, .project-card, .timeline-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});