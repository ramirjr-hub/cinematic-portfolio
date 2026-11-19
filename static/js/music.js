

document.addEventListener("DOMContentLoaded", () => {

    const music = document.getElementById("background-music");
    const musicToggle = document.getElementById("music-toggle");
    const musicIcon = document.getElementById("music-icon");

    if (!music || !musicToggle) return;

    const targetVolume = 0.25;
    const fadeDuration = 1000;

    let isPlaying = false;
    let fadeTimer = null;

    music.volume = 0;
    music.loop = true;

    function updateButton() {
        musicToggle.classList.toggle("active", isPlaying);

        musicToggle.setAttribute(
            "aria-label",
            isPlaying ? "Turn background music off" : "Music is paused"
        );

        musicToggle.setAttribute("aria-pressed", isPlaying);

        if (musicIcon) {
            musicIcon.textContent = isPlaying ? "♫" : "♪";
        }
    }

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

            console.warn(
                "Autoplay was blocked by the browser. Music needs user interaction.",
                error
            );
        }
    }

    function stopMusic() {
        if (!isPlaying) return;

        isPlaying = false;
        updateButton();

        fadeVolume(music.volume, 0, fadeDuration, () => {
            music.pause();
            music.currentTime = 0;
        });
    }

    // Button only stops the music
    musicToggle.addEventListener("click", stopMusic);

    // Initial button state
    updateButton();

    // Automatically start music when the website opens
    playMusic();

});
