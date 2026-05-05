const ease = "power4.inOut";

document.addEventListener("DOMContentLoaded", () => {
    // 1. Initial reveal when the page loads
    revealTransition().then(() => {
        // Hide blocks completely so they don't block clicks
        gsap.set(".block", { visibility: "hidden" });
    });

    const links = document.querySelectorAll("a");

    links.forEach((link) => {
        link.addEventListener("click", (event) => {
            const href = link.getAttribute("href");

            // Only trigger if it's a real link to another page
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
        // Make blocks visible and scaled up first
        gsap.set(".block", { visibility: "visible", scaleY: 1 });
        gsap.to(".block", {
            scaleY: 0,
            duration: 1,
            stagger: {
                each: 0.1,
                from: "start",
                grid: [2, 6], // MATCHES YOUR HTML: 2 rows, 6 columns
                axis: "x",
            },
            ease: ease,
            onComplete: resolve,
        });
    });
}

function animateTransition() {
    return new Promise((resolve) => {
        // Reset blocks to be ready to scale back up
        gsap.set(".block", { visibility: "visible", scaleY: 0 });
        gsap.to(".block", {
            scaleY: 1,
            duration: 1,
            stagger: {
                each: 0.1,
                from: "start",
                grid: [2, 6], // MATCHES YOUR HTML: 2 rows, 6 columns
                axis: "x",
            },
            ease: ease,
            onComplete: resolve,
        });
    });
}