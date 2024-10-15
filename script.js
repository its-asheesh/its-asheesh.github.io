let currentSlide = 0;
const slides = document.querySelectorAll('.slide');

function showSlide(index) {
    if (index >= slides.length) {
        currentSlide = 0; // Loop back to the first slide
    } else if (index < 0) {
        currentSlide = slides.length - 1; // Go to the last slide
    } else {
        currentSlide = index;
    }

    slides.forEach((slide, i) => {
        slide.classList.remove('show-slide');
        slide.classList.add('hide-slide');
    });

    slides[currentSlide].classList.remove('hide-slide');
    slides[currentSlide].classList.add('show-slide');
}

function changeSlide(direction) {
    showSlide(currentSlide + direction);
}

window.onload = function() {
    showSlide(currentSlide); // Show the first slide initially
};
