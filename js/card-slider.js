// Timeline slider functionality
document.addEventListener('DOMContentLoaded', function() {
    const timelineItems = document.querySelector('.timeline-items');
    const items = document.querySelectorAll('.timeline-item');
    const prevButton = document.querySelector('.timeline-nav:first-child a');
    const nextButton = document.querySelector('.timeline-nav:last-child a');

    let itemsToShow = getItemsToShow();
    let currentIndex = 0;

    // Determine how many items to show based on screen width
    function getItemsToShow() {
        const width = window.innerWidth;
        if (width <= 425) return 1;
        if (width <= 768) return 2;
        return 3;
    }

    // Set item widths and update slider
    function initializeSlider() {
        itemsToShow = getItemsToShow();

        items.forEach(item => {
            item.style.flex = '0 0 calc(100% / ' + itemsToShow + ')';
        });

        updateSlider();
    }

    // Show only the current set of items
    function updateSlider() {
        items.forEach(item => {
            item.style.display = 'none';
        });

        for (let i = currentIndex; i < currentIndex + itemsToShow; i++) {
            if (items[i]) {
                items[i].style.display = 'block';
            }
        }

        updateButtonStates();
    }

    // Enable/disable navigation buttons based on position
    function updateButtonStates() {
        prevButton.style.opacity = currentIndex === 0 ? '0.5' : '1';
        prevButton.style.cursor = currentIndex === 0 ? 'default' : 'pointer';

        nextButton.style.opacity = currentIndex >= items.length - itemsToShow ? '0.5' : '1';
        nextButton.style.cursor = currentIndex >= items.length - itemsToShow ? 'default' : 'pointer';
    }

    // Button click events
    prevButton.addEventListener('click', function(e) {
        e.preventDefault();
        if (currentIndex > 0) {
            currentIndex--;
            updateSlider();
        }
    });

    nextButton.addEventListener('click', function(e) {
        e.preventDefault();
        if (currentIndex < items.length - itemsToShow) {
            currentIndex++;
            updateSlider();
        }
    });

    // Reinitialize on window resize
    window.addEventListener('resize', () => {
        const newItemsToShow = getItemsToShow();
        if (newItemsToShow !== itemsToShow) {
            currentIndex = 0;
            initializeSlider();
        }
    });

    // Initialize on load
    initializeSlider();
});
