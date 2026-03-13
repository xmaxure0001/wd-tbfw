// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.offsetTop - navHeight;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// 导航栏滚动效果
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        navbar.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// 滚动动画
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

// 页面加载完成后初始化动画
document.addEventListener('DOMContentLoaded', () => {
    // 为卡片添加动画
    const animatedElements = document.querySelectorAll('.card, .flow-card, .guarantee-item, .credential-card, .strength-card, .expert-item, .product-item, .ai-feature');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // 表单提交处理
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const nameInput = contactForm.querySelector('input[type="text"]');
            const phoneInput = contactForm.querySelector('input[type="tel"]');
            
            if (nameInput.value.trim() && phoneInput.value.trim()) {
                alert('感谢您的咨询！我们的专属顾问将尽快与您联系。');
                nameInput.value = '';
                phoneInput.value = '';
            } else {
                alert('请填写完整信息');
            }
        });
    }

    // 统计数字动画
    const animateNumbers = () => {
        const stats = document.querySelectorAll('.stat-num');
        stats.forEach(stat => {
            const text = stat.textContent;
            if (text.includes('+') || text.includes(',')) {
                stat.style.opacity = '0';
                setTimeout(() => {
                    stat.style.transition = 'opacity 0.8s ease';
                    stat.style.opacity = '1';
                }, 300);
            }
        });
    };

    // 延迟执行数字动画
    setTimeout(animateNumbers, 500);
});

// 移动端菜单切换（如果需要）
const createMobileMenu = () => {
    const navMenu = document.querySelector('.nav-menu');
    const navbar = document.querySelector('.navbar .container');
    
    if (window.innerWidth <= 768 && !document.querySelector('.mobile-toggle')) {
        const toggle = document.createElement('button');
        toggle.className = 'mobile-toggle';
        toggle.innerHTML = '☰';
        toggle.style.cssText = 'background: none; border: none; font-size: 24px; cursor: pointer; display: block;';
        
        navbar.insertBefore(toggle, navMenu);
        navMenu.style.display = 'none';
        
        toggle.addEventListener('click', () => {
            if (navMenu.style.display === 'none') {
                navMenu.style.display = 'flex';
                navMenu.style.flexDirection = 'column';
                navMenu.style.position = 'absolute';
                navMenu.style.top = '100%';
                navMenu.style.left = '0';
                navMenu.style.right = '0';
                navMenu.style.background = 'white';
                navMenu.style.padding = '20px';
                navMenu.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
            } else {
                navMenu.style.display = 'none';
            }
        });
    }
};

// 响应式处理
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        const navMenu = document.querySelector('.nav-menu');
        const toggle = document.querySelector('.mobile-toggle');
        if (navMenu) {
            navMenu.style.display = 'flex';
            navMenu.style.flexDirection = 'row';
            navMenu.style.position = 'static';
            navMenu.style.padding = '0';
            navMenu.style.boxShadow = 'none';
        }
        if (toggle) {
            toggle.remove();
        }
    }
});

// 初始化移动端菜单
if (window.innerWidth <= 768) {
    createMobileMenu();
}
