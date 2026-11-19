
document.addEventListener("DOMContentLoaded", () => {

    // =====================================
    // 1. SELECT NAVIGATION ELEMENTS
    // =====================================

    const menuToggle = document.getElementById("menu-toggle");
    const navLinks = document.querySelector(".nav-links");
    const navItems = document.querySelectorAll(".nav-links a");


    // =====================================
    // 2. MOBILE MENU TOGGLE
    // =====================================

    if (menuToggle && navLinks) {

        menuToggle.addEventListener("click", () => {

            navLinks.classList.toggle("active");

            const isOpen = navLinks.classList.contains("active");

            menuToggle.setAttribute("aria-expanded", isOpen);

        });


        // Close menu after clicking a link
        navItems.forEach((link) => {

            link.addEventListener("click", () => {

                navLinks.classList.remove("active");

                menuToggle.setAttribute("aria-expanded", "false");

            });

        });


        // Close menu using Escape key
        document.addEventListener("keydown", (event) => {

            if (event.key === "Escape") {

                navLinks.classList.remove("active");

                menuToggle.setAttribute("aria-expanded", "false");

            }

        });

    }


    // =====================================
    // 3. SMOOTH SCROLLING
    // =====================================

    navItems.forEach((link) => {

        link.addEventListener("click", (event) => {

            const targetId = link.getAttribute("href");

            if (targetId && targetId.startsWith("#")) {

                const targetSection = document.querySelector(targetId);

                if (targetSection) {

                    event.preventDefault();

                    targetSection.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }

            }

        });

    });


    // =====================================
    // 4. ACTIVE NAVIGATION HIGHLIGHT
    // =====================================

    const sections = document.querySelectorAll("main section[id]");

    if ("IntersectionObserver" in window) {

        const sectionObserver = new IntersectionObserver(
            (entries) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        const currentId = entry.target.id;

                        navItems.forEach((link) => {

                            link.classList.toggle(
                                "active-link",
                                link.getAttribute("href") === `#${currentId}`
                            );

                        });

                    }

                });

            },
            {
                threshold: 0.35
            }
        );

        sections.forEach((section) => {
            sectionObserver.observe(section);
        });

    }

});
