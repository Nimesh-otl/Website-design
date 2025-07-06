// Get form and all input fields
const form = document.getElementById('contact-form');
const firstName = document.getElementById('first-name');
const lastName = document.getElementById('last-name');
const email = document.getElementById('email');
const phone = document.getElementById('phone');
const topic = document.getElementById('topic');
const message = document.getElementById('message');
const terms = document.getElementById('terms');
const submitBtn = document.querySelector('.info-form .btn-primary');

// Helper function to create error messages
function showError(input, message) {
    // Remove previous error
    const existingError = input.parentElement.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }

    // Create error message element
    const error = document.createElement('div');
    error.className = 'error-message';
    error.style.color = 'red';
    error.style.fontSize = '0.8rem';
    error.style.marginTop = '5px';
    error.textContent = message;
    input.parentElement.appendChild(error);
}

// Remove all error messages
function clearErrors() {
    const errors = document.querySelectorAll('.error-message');
    errors.forEach(error => error.remove());
}

// Validate email format
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Validate phone number (only numbers allowed)
function isValidPhone(phone) {
    const re = /^\d+$/;
    return re.test(phone);
}

// Handle submit
submitBtn.addEventListener('click', (e) => {
    e.preventDefault(); // Stop form from submitting
    clearErrors();

    let hasError = false;

    if (firstName.value.trim() === '') {
        showError(firstName, 'First name is required');
        hasError = true;
    }
    if (lastName.value.trim() === '') {
        showError(lastName, 'Last name is required');
        hasError = true;
    }
    if (email.value.trim() === '') {
        showError(email, 'Email is required');
        hasError = true;
    } else if (!isValidEmail(email.value.trim())) {
        showError(email, 'Please enter a valid email address');
        hasError = true;
    }
    if (phone.value.trim() === '') {
        showError(phone, 'Phone number is required');
        hasError = true;
    } else if (!isValidPhone(phone.value.trim())) {
        showError(phone, 'Phone number must only contain numbers');
        hasError = true;
    }
    if (topic.value.trim() === '') {
        showError(topic, 'Please choose a topic');
        hasError = true;
    }
    if (message.value.trim() === '') {
        showError(message, 'Message is required');
        hasError = true;
    }
    if (!terms.checked) {
        showError(terms, 'You must accept the terms');
        hasError = true;
    }

    if (!hasError) {
        // Show success popup
        const successPopup = document.getElementById('popup');
        successPopup.style.display = 'block';
    
        //Reset form fields
        form.reset();
    }
    
});
