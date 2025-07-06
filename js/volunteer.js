
    // Get the form element
    const form = document.querySelector('.info-form');
    
    // Get all required form fields
    const firstName = document.getElementById('firstName');
    const lastName = document.getElementById('lastName');
    const email = document.getElementById('email');
    const country = document.getElementById('country');
    const street = document.getElementById('street');
    const city = document.getElementById('city');
    const state = document.getElementById('state');
    const postal = document.getElementById('postal');
    
    // Get buttons - use more specific selectors
    const submitButton = document.querySelector('.form-buttons .btn-primary');
    const backButton = document.querySelector('.form-buttons .btn-secondary');
    
    // Get popup elements
    const successPopup = document.getElementById('success-popup');
    const confirmPopup = document.getElementById('confirm-popup');
    const successCloseBtn = document.getElementById('success-popup-close-btn');
    const confirmYesBtn = document.getElementById('confirm-yes-btn');
    const confirmNoBtn = document.getElementById('confirm-no-btn');
    const closePopupBtn = document.querySelector('.close-popup');
    

    // Add form submission listener
    if (submitButton) {
        submitButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Reset previous error states
            clearErrors();
            
            // Validate all fields
            let isValid = true;
            
            // Check required fields
            if (!validateField(firstName, 'First name is required')) isValid = false;
            else if (!validateNameField(firstName, 'First name cannot contain numbers')) isValid = false;
            
            if (!validateField(lastName, 'Last name is required')) isValid = false;
            else if (!validateNameField(lastName, 'Last name cannot contain numbers')) isValid = false;
            
            if (!validateEmail(email)) isValid = false;
            if (!validateDropdown(country, 'Please select a country')) isValid = false;
            if (!validateField(street, 'Street address is required')) isValid = false;
            if (!validateField(city, 'City is required')) isValid = false;
            if (!validateField(state, 'State is required')) isValid = false;
            if (!validateField(postal, 'Postal code is required')) isValid = false;
            
            // If the form is valid, show success popup instead of alert
            if (isValid) {
                // Show success popup
                successPopup.style.display = 'flex';
            }
        });
    } else {
        console.error('Submit button not found');
    }
    
    // Back button functionality
    if (backButton) {
        backButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Show confirmation popup instead of using browser confirm
            confirmPopup.style.display = 'flex';
        });
    } else {
    }
    
    // Success popup close button
    if (successCloseBtn) {
        successCloseBtn.addEventListener('click', function() {
            successPopup.style.display = 'none';
            clearForm(); // Clear the form after successful submission
        });
    }
    
    // Confirmation popup yes button (go back)
    if (confirmYesBtn) {
        confirmYesBtn.addEventListener('click', function() {
            confirmPopup.style.display = 'none';
            clearForm();
        });
    }
    
    // Confirmation popup no button (continue editing)
    if (confirmNoBtn) {
        confirmNoBtn.addEventListener('click', function() {
            confirmPopup.style.display = 'none';
        });
    }
    
    // Confirmation popup close button
    if (closePopupBtn) {
        closePopupBtn.addEventListener('click', function() {
            confirmPopup.style.display = 'none';
        });
    }
    
    // Function to validate a required field
    function validateField(field, errorMessage) {
        if (!field) {
            console.error('Field not found:', errorMessage);
            return false;
        }
        
        if (field.value.trim() === '') {
            showError(field, errorMessage);
            return false;
        }
        return true;
    }
    
    // Function to validate name fields (no numbers)
    function validateNameField(field, errorMessage) {
        if (!field) {
            console.error('Field not found:', errorMessage);
            return false;
        }
        
        // Skip if field is empty (the required validation will catch this)
        if (field.value.trim() === '') {
            return true;
        }
        
        if (/[0-9]/.test(field.value)) {
            showError(field, errorMessage);
            return false;
        }
        return true;
    }
    
    // Function to validate email
    function validateEmail(field) {
        if (!field) {
            console.error('Email field not found');
            return false;
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (field.value.trim() === '') {
            showError(field, 'Email address is required');
            return false;
        } else if (!emailRegex.test(field.value)) {
            showError(field, 'Please enter a valid email address');
            return false;
        }
        return true;
    }
    
    // Function to validate dropdown
    function validateDropdown(field, errorMessage) {
        if (!field) {
            console.error('Dropdown field not found');
            return false;
        }
        
        if (field.selectedIndex === 0) {
            showError(field, errorMessage);
            return false;
        }
        return true;
    }
    
    // Function to display error message
    function showError(field, message) {
        field.classList.add('error-input');
        
        // Create error message element if it doesn't exist
        let errorElement = field.parentElement.querySelector('.error-message');
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            field.parentElement.appendChild(errorElement);
        }
        
        errorElement.textContent = message;
    }
    
    // Function to clear all errors
    function clearErrors() {
        const errorInputs = document.querySelectorAll('.error-input');
        const errorMessages = document.querySelectorAll('.error-message');
        
        errorInputs.forEach(input => {
            input.classList.remove('error-input');
        });
        
        errorMessages.forEach(message => {
            message.remove();
        });
    }
    
    // Function to clear the form
    function clearForm() {
        form.reset();
        clearErrors();
    }
    
    // Add real-time validation on blur and input
    const allInputs = [firstName, lastName, email, country, street, city, state, postal].filter(input => input !== null);
    
    allInputs.forEach(input => {
        // Validate on blur (when field loses focus)
        input.addEventListener('blur', function() {
            // Clear previous error for this field
            if (input.classList.contains('error-input')) {
                input.classList.remove('error-input');
                const errorElement = input.parentElement.querySelector('.error-message');
                if (errorElement) errorElement.remove();
            }
            
            // Validate based on input type
            if (input === email) {
                validateEmail(email);
            } else if (input === country) {
                validateDropdown(country, 'Please select a country');
            } else if (input === firstName || input === lastName) {
                if (validateField(input, `${input.previousElementSibling.textContent.trim()} is required`)) {
                    validateNameField(input, `${input.previousElementSibling.textContent.trim()} cannot contain numbers`);
                }
            } else if (input.previousElementSibling) {
                validateField(input, `${input.previousElementSibling.textContent.trim()} is required`);
            }
        });
        
        // Special handling for name fields - validate on input to catch numbers immediately
        if (input === firstName || input === lastName) {
            input.addEventListener('input', function() {
                // Skip if input is empty
                if (input.value.trim() === '') {
                    if (input.classList.contains('error-input')) {
                        input.classList.remove('error-input');
                        const errorElement = input.parentElement.querySelector('.error-message');
                        if (errorElement) errorElement.remove();
                    }
                    return;
                }
                
                // Check for numbers
                if (/[0-9]/.test(input.value)) {
                    showError(input, `${input.previousElementSibling.textContent.trim()} cannot contain numbers`);
                } else {
                    // Clear error if no numbers
                    if (input.classList.contains('error-input')) {
                        input.classList.remove('error-input');
                        const errorElement = input.parentElement.querySelector('.error-message');
                        if (errorElement) errorElement.remove();
                    }
                }
            });
        } else {
            // For other fields, just remove error styling when the user starts typing
            input.addEventListener('input', function() {
                if (input.classList.contains('error-input')) {
                    input.classList.remove('error-input');
                    const errorElement = input.parentElement.querySelector('.error-message');
                    if (errorElement) errorElement.remove();
                }
            });
        }
    });
