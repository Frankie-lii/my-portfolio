document.addEventListener('DOMContentLoaded', function() {
    // Smooth Scroll for anchor links
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            window.scrollTo({
                top: targetElement.offsetTop - 50, // Offset for header height
                behavior: 'smooth'
            });
        });
    });

    // Contact Form Validation
    const form = document.getElementById('contact-form');
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        // Form fields
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const message = document.getElementById('message').value;

        // Simple validation
        if (name === "" || email === "" || phone === "" || message === "") {
            alert("All fields are required!");
            return;
        }

        // Check if phone number matches the pattern (optional)
        const phonePattern = /^[0-9]{10}$/;
        if (!phone.match(phonePattern)) {
            alert("Please enter a valid phone number (10 digits).");
            return;
        }

        // If validation is successful, simulate form submission (for now)
        alert("Message sent successfully!");

        // You can replace the above with an actual fetch or Ajax call to send data to your Flask backend
        // Example:
        // fetch('/contact', {
        //     method: 'POST',
        //     body: new FormData(form)
        // })
        // .then(response => response.json())
        // .then(data => {
        //     if (data.status === 'success') {
        //         alert("Message sent successfully!");
        //     } else {
        //         alert("Failed to send message.");
        //     }
        // });
    });
});