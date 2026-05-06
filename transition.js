const ease = "power4.inOut";

document.addEventListener("DOMContentLoaded", () => {
    revealTransition().then(() => {
        gsap.set(".block", { visibility: "hidden" });
    });

    const links = document.querySelectorAll("a");

    links.forEach((link) => {
        link.addEventListener("click", (event) => {
            const href = link.getAttribute("href");

            if (href && !href.startsWith("#") && !window.location.href.endsWith(href)) {
                event.preventDefault();
                console.log("Animation started for:", href);

                animateTransition().then(() => {
                    console.log("Animation complete. Navigating...");
                    window.location.href = href;
                });
            }
        });
    });
});

function revealTransition() {
    return new Promise((resolve) => {
        gsap.set(".block", { visibility: "visible", scaleY: 1 });
        gsap.to(".block", {
            scaleY: 0,
            duration: 1,
            stagger: {
                each: 0.1,
                from: "start",
                grid: [2, 6],
                axis: "x",
            },
            ease: ease,
            onComplete: resolve,
        });
    });
}

function animateTransition() {
    return new Promise((resolve) => {
        gsap.set(".block", { visibility: "visible", scaleY: 0 });
        gsap.to(".block", {
            scaleY: 1,
            duration: 1,
            stagger: {
                each: 0.1,
                from: "start",
                grid: [2, 6],
                axis: "x",
            },
            ease: ease,
            onComplete: resolve,
        });
    });
}
let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}