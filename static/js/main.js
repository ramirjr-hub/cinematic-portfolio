
document.addEventListener("DOMContentLoaded", () => {

    // =====================================
    // 1. AUTOMATIC FOOTER YEAR
    // =====================================

    const yearElement = document.getElementById("current-year");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }


    // =====================================
    // 2. NAVBAR SCROLL EFFECT
    // =====================================

    const navbar = document.querySelector(".navbar");

    function updateNavbar() {

        if (!navbar) return;

        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }

    }

    window.addEventListener("scroll", updateNavbar, {
        passive: true
    });

    updateNavbar();


    // =====================================
    // 3. SCROLL TO TOP BUTTON
    // =====================================

    const backToTop = document.getElementById("back-to-top");

    if (backToTop) {

        window.addEventListener("scroll", () => {

            backToTop.classList.toggle(
                "visible",
                window.scrollY > 500
            );

        }, { passive: true });


        backToTop.addEventListener("click", () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    }


    // =====================================
    // 4. IMAGE LOADING EFFECT
    // =====================================

    const images = document.querySelectorAll("img");

    images.forEach((image) => {

        image.addEventListener("load", () => {
            image.classList.add("loaded");
        });

        if (image.complete) {
            image.classList.add("loaded");
        }

    });


    // =====================================
    // 5. CONSOLE MESSAGE
    // =====================================

    console.log(
        "%cWelcome to my portfolio!",
        "color: #FF1E42; font-size: 18px; font-weight: bold;"
    );

});

// =====================================
// CYBER HUD LOADING SCREEN
// =====================================

(() => {

    const loadingScreen = document.getElementById("loading-screen");
    const loadingBar = document.getElementById("loading-bar");
    const loadingPercent = document.getElementById("loading-percent");

    if (!loadingScreen) return;

    let progress = 0;

    // Simulated loading progress
    const loadingInterval = setInterval(() => {

        if (progress < 90) {
            progress += Math.floor(Math.random() * 4) + 1;

            if (progress > 90) {
                progress = 90;
            }

            loadingBar.style.width = progress + "%";
            loadingPercent.textContent = progress + "%";
        }

    }, 100);


    // Wait until the page is fully loaded
    window.addEventListener("load", () => {

        clearInterval(loadingInterval);

        progress = 100;

        loadingBar.style.width = "100%";
        loadingPercent.textContent = "100%";

        // Small delay for the visual effect
        setTimeout(() => {

            loadingScreen.classList.add("hide");

            // Remove loading screen after fade
            setTimeout(() => {
                loadingScreen.remove();
            }, 800);

        }, 500);

    });

})();