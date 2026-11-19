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
    // 5. CYBER HUD LOADING SCREEN
    // =====================================

    const loadingScreen = document.getElementById("loading-screen");
    const loadingBar = document.getElementById("loading-bar");
    const loadingPercent = document.getElementById("loading-percent");

    if (loadingScreen && loadingBar && loadingPercent) {

        let progress = 0;

        const loadingInterval = setInterval(() => {

            if (progress < 90) {

                progress += Math.floor(Math.random() * 4) + 1;

                progress = Math.min(progress, 90);

                loadingBar.style.width = progress + "%";
                loadingPercent.textContent = progress + "%";

            }

        }, 100);


        function finishLoading() {

            clearInterval(loadingInterval);

            progress = 100;

            loadingBar.style.width = "100%";
            loadingPercent.textContent = "100%";

            setTimeout(() => {

                loadingScreen.classList.add("hide");

                setTimeout(() => {
                    loadingScreen.remove();
                }, 800);

            }, 500);

        }


        // Handle normal load and already-loaded pages
        if (document.readyState === "complete") {
            finishLoading();
        } else {
            window.addEventListener("load", finishLoading, {
                once: true
            });
        }

    }


    // =====================================
    // 6. CONSOLE MESSAGE
    // =====================================

    console.log(
        "%cWelcome to my portfolio!",
        "color: #00ff88; font-size: 18px; font-weight: bold;"
    );

});