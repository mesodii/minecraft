// Инициализация EmailJS
(function() {
    emailjs.init("x0I8WzIy80sGXvSVm");
})();

// Мобильное меню
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });
    
    // Закрытие меню при клике на ссылку
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
        });
    });
    
    // Форма обратной связи
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');
    
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Показываем загрузку
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Отправка...';
        submitBtn.disabled = true;
        
        // Отправка через EmailJS
        emailjs.sendForm('dz6iucm', 'jorf4mh', this)
            .then(function() {
                formMessage.textContent = 'Сообщение отправлено успешно!';
                formMessage.className = 'form-message success';
                contactForm.reset();
            }, function(error) {
                formMessage.textContent = 'Ошибка при отправке. Попробуйте ещё раз.';
                formMessage.className = 'form-message error';
                console.log('EmailJS error:', error);
            })
            .finally(function() {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            });
    });
});