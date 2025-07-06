// Get form elements
const donationForm = document.querySelector('.info-form');

const nameOnInvoice = document.getElementById('name');
const cardNumber = document.getElementById('card-number');
const donationAmount = document.getElementById('amount');
const cvv = document.getElementById('cvv');
const email = document.getElementById('email');
const country = document.getElementById('country');
const street = document.getElementById('street');
const city = document.getElementById('city');
const state = document.getElementById('state');
const postal = document.getElementById('postal-code');

// Get buttons
const submitButton = document.querySelector('.form-actions .btn-primary');
const backButton = document.querySelector('.form-actions .btn-secondary');

// Popups
const successPopup = document.getElementById('success-popup');
const confirmPopup = document.getElementById('confirm-popup');
const successCloseBtn = document.getElementById('success-close-btn');
const confirmYesBtn = document.getElementById('confirm-yes-btn');
const confirmNoBtn = document.getElementById('confirm-no-btn');
const closePopupBtns = document.querySelectorAll('.close-popup');

// Submit button
if (submitButton) {
    submitButton.addEventListener('click', function(e) {
        e.preventDefault();
        
        clearErrors();
        let isValid = true;

        if (!validateField(nameOnInvoice, 'Name on invoice is required')) isValid = false;
        if (!validateCardNumber(cardNumber)) isValid = false;
        if (!validateAmount(donationAmount)) isValid = false;
        if (!validateCVV(cvv)) isValid = false;
        if (!validateEmail(email)) isValid = false;
        if (!validateDropdown(country, 'Please select a country')) isValid = false;
        if (!validateField(street, 'Street address is required')) isValid = false;
        if (!validateField(city, 'City is required')) isValid = false;
        if (!validateField(state, 'State is required')) isValid = false;
        if (!validateField(postal, 'Postal code is required')) isValid = false;

        if (isValid) {
            successPopup.style.display = 'flex';
        }
    });
}

// Back button
if (backButton) {
    backButton.addEventListener('click', function(e) {
        e.preventDefault();
        confirmPopup.style.display = 'flex';
    });
}

// Popup close buttons
closePopupBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        btn.closest('.popup').style.display = 'none';
    });
});

// Success popup close
if (successCloseBtn) {
    successCloseBtn.addEventListener('click', function(e) {
        e.preventDefault();
        successPopup.style.display = 'none';
        clearForm();
    });
}

// Confirm popup buttons
if (confirmYesBtn) {
    confirmYesBtn.addEventListener('click', function(e) {
        e.preventDefault();
        confirmPopup.style.display = 'none';
        clearForm();
    });
}

if (confirmNoBtn) {
    confirmNoBtn.addEventListener('click', function(e) {
        e.preventDefault();
        confirmPopup.style.display = 'none';
    });
}

// Validation functions
function validateField(field, message) {
    if (!field) return false;
    if (field.value.trim() === '') {
        showError(field, message);
        return false;
    }
    return true;
}

function validateCardNumber(field) {
    if (!field) return false;
    const cardRegex = /^[0-9]{13,19}$/;
    if (field.value.trim() === '') {
        showError(field, 'Card number is required');
        return false;
    } else if (!cardRegex.test(field.value.replace(/\s+/g, ''))) {
        showError(field, 'Invalid card number');
        return false;
    }
    return true;
}

function validateAmount(field) {
    if (!field) return false;
    const amount = parseFloat(field.value);
    if (field.value.trim() === '') {
        showError(field, 'Donation amount is required');
        return false;
    } else if (isNaN(amount) || amount <= 0) {
        showError(field, 'Enter a valid donation amount');
        return false;
    }
    return true;
}

function validateCVV(field) {
    if (!field) return false;
    const cvvRegex = /^[0-9]{3,4}$/;
    if (field.value.trim() === '') {
        showError(field, 'CVV is required');
        return false;
    } else if (!cvvRegex.test(field.value)) {
        showError(field, 'Invalid CVV');
        return false;
    }
    return true;
}

function validateEmail(field) {
    if (!field) return false;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (field.value.trim() === '') {
        showError(field, 'Email address is required');
        return false;
    } else if (!emailRegex.test(field.value)) {
        showError(field, 'Invalid email address');
        return false;
    }
    return true;
}

function validateDropdown(field, message) {
    if (!field) return false;
    if (field.value.trim() === '') {
        showError(field, message);
        return false;
    }
    return true;
}

// Error handlers
function showError(field, message) {
    field.classList.add('error-input');

    let errorElement = field.parentElement.querySelector('.error-message');
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        field.parentElement.appendChild(errorElement);
    }
    errorElement.textContent = message;
}

function clearErrors() {
    const errorInputs = document.querySelectorAll('.error-input');
    const errorMessages = document.querySelectorAll('.error-message');

    errorInputs.forEach(input => input.classList.remove('error-input'));
    errorMessages.forEach(message => message.remove());
}

function clearForm() {
    if (donationForm) {
        donationForm.reset();
        clearErrors();
    }
}
