document.addEventListener("DOMContentLoaded", () => {

    // =====================================
    // 1. SELECT ELEMENTS
    // =====================================

    const music = document.getElementById("background-music");
    const musicToggle = document.getElementById("music-toggle");
    const musicIcon = document.getElementById("music-icon");

    if (!music || !musicToggle) return;


    // =====================================
    // 2. MUSIC SETTINGS
    // =====================================

    const targetVolume = 0.25;
    const fadeDuration = 1000;

    let isPlaying = false;
    let fadeTimer = null;

    music.volume = 0;


    // =====================================
    // 3. UPDATE BUTTON
    // =====================================

    function updateButton() {

        musicToggle.classList.toggle("active", isPlaying);

        musicToggle.setAttribute(
            "aria-label",
            isPlaying ? "Turn background music off" : "Turn background music on"
        );

        musicToggle.setAttribute("aria-pressed", isPlaying);

        if (musicIcon) {
            musicIcon.textContent = isPlaying ? "♫" : "♪";
        }

    }


    // =====================================
    // 4. FADE MUSIC VOLUME
    // =====================================

    function fadeVolume(start, end, duration, callback) {

        clearInterval(fadeTimer);

        const steps = 20;
        const intervalTime = duration / steps;
        let currentStep = 0;

        music.volume = start;

        fadeTimer = setInterval(() => {

            currentStep++;

            const progress = currentStep / steps;

            music.volume = Math.max(
                0,
                Math.min(1, start + (end - start) * progress)
            );

            if (currentStep >= steps) {

                clearInterval(fadeTimer);

                music.volume = end;

                if (callback) callback();

            }

        }, intervalTime);

    }


    // =====================================
    // 5. TURN MUSIC ON
    // =====================================

    async function playMusic() {

        try {

            music.volume = 0;

            await music.play();

            isPlaying = true;

            updateButton();

            fadeVolume(0, targetVolume, fadeDuration);

        } catch (error) {

            isPlaying = false;

            updateButton();

            console.error("Unable to play music:", error);

            alert(
                "Music could not be played. Please check your audio file."
            );

        }

    }


    // =====================================
    // 6. TURN MUSIC OFF
    // =====================================

    function stopMusic() {

        isPlaying = false;

        updateButton();

        fadeVolume( music.volume, 0, fadeDuration, () => {

            music.pause();

            music.currentTime = 0;

        });

    }


    // =====================================
    // 7. TOGGLE BUTTON
    // =====================================

    musicToggle.addEventListener("click", () => {

        if (isPlaying) {

            stopMusic();

        } else {

            playMusic();

        }

    });


    // =====================================
    // 8. INITIAL STATE
    // =====================================

    updateButton();

});
