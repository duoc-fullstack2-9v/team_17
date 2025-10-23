document.addEventListener("DOMContentLoaded", () => {
    const slides = document.querySelector(".slides");
    const images = document.querySelectorAll(".slides img");
    const prevBtn = document.querySelector(".prev");
    const nextBtn = document.querySelector(".next");

    let index = 0;

    function showSlide(i) {
        if (i < 0) index = images.length - 1;
        else if (i >= images.length) index = 0;
        else index = i;

        slides.style.transform = `translateX(${-index * 100}%)`;
    }

    prevBtn.addEventListener("click", () => showSlide(index - 1));
    nextBtn.addEventListener("click", () => showSlide(index + 1));

    setInterval(() => {
        showSlide(index + 1);
    }, 2000);
});