
document.addEventListener("DOMContentLoaded", () => {

    // =====================================
    // 1. CINEMATIC INTRO SCREEN
    // =====================================

    const introScreen = document.getElementById("intro-screen");

    if (introScreen) {
        const reducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        const introDuration = reducedMotion ? 0 : 3000;

        setTimeout(() => {
            introScreen.classList.add("hide");

            setTimeout(() => {
                introScreen.remove();
            }, 1000);

        }, introDuration);
    }


    // =====================================
    // 2. SCROLL REVEAL ANIMATIONS
    // =====================================

    const revealElements = document.querySelectorAll(
        ".section-heading, " +
        ".about-text, " +
        ".about-cards, " +
        ".skill-card, " +
        ".timeline-item, " +
        ".education-card, " +
        ".project-card, " +
        ".contact-content"
    );

    revealElements.forEach((element, index) => {
        element.classList.add("reveal");

        // Slight delay between nearby elements
        element.style.transitionDelay = `${(index % 3) * 100}ms`;
    });


    // =====================================
    // 3. INTERSECTION OBSERVER
    // =====================================

    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver(
            (entries, observerInstance) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {
                        entry.target.classList.add("active");

                        observerInstance.unobserve(entry.target);
                    }

                });

            },
            {
                threshold: 0.15,
                rootMargin: "0px 0px -50px 0px"
            }
        );

        revealElements.forEach((element) => {
            observer.observe(element);
        });

    } else {

        // Fallback for older browsers
        revealElements.forEach((element) => {
            element.classList.add("active");
        });

    }

});
