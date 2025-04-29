document.addEventListener('DOMContentLoaded', function() {
    // Theme toggle functionality
    const themeBtn = document.getElementById('themeBtn');
    themeBtn.addEventListener('click', function() {
        document.body.dataset.theme = document.body.dataset.theme === 'dark' ? 'light' : 'dark';
        themeBtn.textContent = document.body.dataset.theme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode';
    });

    // Form validation with real-time feedback
    const form = document.getElementById('myForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');

    // Real-time validation
    nameInput.addEventListener('input', validateName);
    emailInput.addEventListener('input', validateEmail);
    passwordInput.addEventListener('input', validatePassword);

    function validateName() {
        if (nameInput.value.length === 0) {
            nameError.textContent = 'Name is required';
            return false;
        } else {
            nameError.textContent = '';
            return true;
        }
    }

    function validateEmail() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value)) {
            emailError.textContent = 'Please enter a valid email';
            return false;
        } else {
            emailError.textContent = '';
            return true;
        }
    }

    function validatePassword() {
        if (passwordInput.value.length < 8) {
            passwordError.textContent = 'Password must be at least 8 characters';
            return false;
        } else {
            passwordError.textContent = '';
            return true;
        }
    }

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();
        
        if (isNameValid && isEmailValid && isPasswordValid) {
            alert('Form submitted successfully!');
            form.reset();
        }
    });

    // Image gallery functionality
    const images = document.querySelectorAll('.gallery img');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const indicators = document.querySelectorAll('.indicator');
    let currentIndex = 0;

    function showImage(index) {
        images.forEach(img => img.classList.remove('active'));
        indicators.forEach(ind => ind.classList.remove('active'));
        
        images[index].classList.add('active');
        indicators[index].classList.add('active');
        currentIndex = index;
    }

    function nextImage() {
        currentIndex = (currentIndex + 1) % images.length;
        showImage(currentIndex);
    }

    function prevImage() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        showImage(currentIndex);
    }

    nextBtn.addEventListener('click', nextImage);
    prevBtn.addEventListener('click', prevImage);

    // Keyboard navigation for gallery
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowRight') {
            nextImage();
        } else if (e.key === 'ArrowLeft') {
            prevImage();
        }
    });

    // Indicator click events
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => showImage(index));
    });

    // Auto-rotate gallery
    let galleryInterval = setInterval(nextImage, 3000);

    // Pause auto-rotation on hover
    const gallery = document.querySelector('.gallery');
    gallery.addEventListener('mouseenter', () => clearInterval(galleryInterval));
    gallery.addEventListener('mouseleave', () => {
        galleryInterval = setInterval(nextImage, 3000);
    });
});