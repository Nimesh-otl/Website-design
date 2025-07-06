
document.addEventListener('DOMContentLoaded', function() {
    // Hide all error messages on page load
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(function(message) {
        message.style.display = 'none';
    });
    
    // Function to validate email
    function validateEmail(emailId, errorId, formatErrorId, submitId) {
        const submitButton = document.getElementById(submitId);
        if (!submitButton) return; // Skip if element doesn't exist
        
        submitButton.addEventListener('click', function(event) {
            event.preventDefault();
            
            // Get email value and error elements
            const emailInput = document.getElementById(emailId);
            const emailError = document.getElementById(errorId);
            const emailErrorFormat = document.getElementById(formatErrorId);
            
            if (!emailInput || !emailError || !emailErrorFormat) return; // Skip if elements don't exist
            
            // Hide all error messages initially
            emailError.style.display = 'none';
            emailErrorFormat.style.display = 'none';
            
            // Remove any previous error styling
            emailInput.classList.remove('error-input');
            
            // Validate email
            const emailValue = emailInput.value;
            if (emailValue === '') {
                // Show empty email error
                emailError.style.display = 'block';
                emailInput.classList.add('error-input');
            } else if (!emailValue.includes('@')) {
                // Show invalid email format error
                emailErrorFormat.style.display = 'block';
                emailInput.classList.add('error-input');
            } else {
                // Email is valid, show popup
                const popup = document.getElementById('popup');
                if (popup) popup.style.display = 'block';
            }
        });
    }
    
    // Setup validation for main newsletter
    validateEmail('main-email', 'main-email-error', 'main-email-error-format', 'main-submit');
    
    // Setup validation for footer newsletter
    validateEmail('footer-email', 'footer-email-error', 'footer-email-error-format', 'footer-submit');
    
    // Setup popup close button
    const closeBtn = document.getElementById('close-btn');
    if (closeBtn) {
        closeBtn.addEventListener('click', function(event) {
            event.preventDefault();
            const popup = document.getElementById('popup');
            if (popup) popup.style.display = 'none';
        });
    }
    
    // Also close popup when clicking on X button
    const closePopupX = document.querySelector('.close-popup');
    if (closePopupX) {
        closePopupX.addEventListener('click', function() {
            const popup = document.getElementById('popup');
            if (popup) popup.style.display = 'none';
        });
    }
});