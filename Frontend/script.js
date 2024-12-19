// Responsive Navigation Bar Toggle
const navToggle = document.querySelector('.navbar-toggle');
const navMenu = document.querySelector('.navbar-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Contact Form Validation
const contactForm = document.getElementById('contact-form');
const formInputs = contactForm.querySelectorAll('input, textarea, select');
const submitButton = contactForm.querySelector('button[type="submit"]');

// Validate Form Fields
contactForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting immediately

    let isValid = true;
    formInputs.forEach(input => {
        if (input.value.trim() === '') {
            input.classList.add('error');
            isValid = false;
        } else {
            input.classList.remove('error');
        }
    });

    // Check if at least one contact method is selected
    const contactMethod = document.getElementById('contact-method').value;
    if (contactMethod === '') {
        document.getElementById('contact-method').classList.add('error');
        isValid = false;
    } else {
        document.getElementById('contact-method').classList.remove('error');
    }

    if (isValid) {
        // Submit form if valid (can add AJAX here to submit form without refreshing)
        alert('Form submitted successfully!');
        contactForm.submit(); // You can send the form data to the backend here
    } else {
        alert('Please fill in all required fields!');
    }
});

// Add an event listener to input fields for real-time validation
formInputs.forEach(input => {
    input.addEventListener('input', () => {
        if (input.value.trim() !== '') {
            input.classList.remove('error');
        }
    });
});

// Responsive Layout Adjustments for Mobile View
window.addEventListener('resize', adjustLayoutForMobile);

function adjustLayoutForMobile() {
    const screenWidth = window.innerWidth;

    // Example of adjusting the layout when the screen width is smaller than 768px (Mobile)
    if (screenWidth <= 768) {
        // Example: Adjust navbar layout for mobile
        document.querySelector('.navbar').classList.add('mobile-nav');
        // Adjust any other elements here based on the screen width
    } else {
        document.querySelector('.navbar').classList.remove('mobile-nav');
    }
}

// Call the function once to adjust layout on page load
adjustLayoutForMobile();

// Scroll to top functionality
const scrollToTopButton = document.getElementById('scroll-to-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollToTopButton.style.display = 'block';
    } else {
        scrollToTopButton.style.display = 'none';
    }
});

scrollToTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});