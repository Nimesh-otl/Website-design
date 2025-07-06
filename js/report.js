// report.js

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.info-form'); // Form selector
    const popup = document.getElementById('popup');
    const closePopup = document.querySelector('.close-popup');
    const closeBtn = document.getElementById('close-btn');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        clearErrors();

        let hasError = false;

        const firstName = document.getElementById('first-name');
        const lastName = document.getElementById('last-name');
        const address = document.getElementById('address');
        const phone = document.getElementById('phone');
        const message = document.getElementById('message');
        const terms = document.getElementById('terms');
        const wasteTypeRadios = document.querySelectorAll('input[name="wasteType"]');

        // Validate fields
        if (firstName.value.trim() === '') {
            showError(firstName, 'First name is required');
            hasError = true;
        }

        if (lastName.value.trim() === '') {
            showError(lastName, 'Last name is required');
            hasError = true;
        }

        if (address.value.trim() === '') {
            showError(address, 'Address is required');
            hasError = true;
        }

        if (phone.value.trim() === '') {
            showError(phone, 'Phone number is required');
            hasError = true;
        } else if (!/^\d+$/.test(phone.value.trim())) {
            showError(phone, 'Phone number must contain only numbers');
            hasError = true;
        }

        if (message.value.trim() === '') {
            showError(message, 'Message is required');
            hasError = true;
        }

        if (!Array.from(wasteTypeRadios).some(radio => radio.checked)) {
            const wasteTypeContainer = document.querySelector('.radio-options');
            showError(wasteTypeContainer, 'Please select a type of waste');
            hasError = true;
        }

        if (!terms.checked) {
            showError(terms, 'You must accept the terms');
            hasError = true;
        }

        if (!hasError) {
            // Show the popup
            popup.style.display = 'block';
            form.reset();
        }
    });

    closePopup.addEventListener('click', () => {
        popup.style.display = 'none';
    });

    closeBtn.addEventListener('click', () => {
        popup.style.display = 'none';
    });

    function showError(input, message) {
        let error = document.createElement('div');
        error.className = 'error-message';
        error.innerText = message;

        // If the input is a radio group container, insert error after it
        if (input.classList.contains('radio-options')) {
            input.parentNode.insertBefore(error, input.nextSibling);
        } else {
            input.parentNode.appendChild(error);
        }

        input.classList.add('input-error');
    }

    function clearErrors() {
        const errors = document.querySelectorAll('.error-message');
        errors.forEach(error => error.remove());

        const errorInputs = document.querySelectorAll('.input-error');
        errorInputs.forEach(input => input.classList.remove('input-error'));
    }
});
