document.addEventListener('DOMContentLoaded', function() {
    const audioControl = document.querySelector('.audio-control');
    const muteButton = document.getElementById('mute-button');
    const volumeSlider = document.getElementById('volume-slider');
    const audioElements = document.querySelectorAll('audio, video');
    let isMuted = false;
    let previousVolume = 1;

    const volumeHighIcon = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
        </svg>
    `;

    const volumeMediumIcon = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
        </svg>
    `;

    const volumeMutedIcon = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
            <line x1="23" y1="9" x2="17" y2="15"></line>
            <line x1="17" y1="9" x2="23" y2="15"></line>
        </svg>
    `;

    function toggleMute() {
        isMuted = !isMuted;
        if (isMuted) {
            previousVolume = volumeSlider.value;
            volumeSlider.value = 0;
        } else {
            volumeSlider.value = previousVolume;
        }
        updateAudioState();
    }

    function updateAudioState() {
        const volume = parseFloat(volumeSlider.value);
        audioElements.forEach(audio => {
            audio.volume = volume;
            audio.muted = volume === 0;
        });
        isMuted = volume === 0;
        updateVolumeIcon(volume);
        muteButton.setAttribute('aria-label', isMuted ? 'Unmute' : 'Mute');
    }

    function updateVolumeIcon(volume) {
        if (volume === 0) {
            muteButton.innerHTML = volumeMutedIcon;
        } else if (volume < 0.5) {
            muteButton.innerHTML = volumeMediumIcon;
        } else {
            muteButton.innerHTML = volumeHighIcon;
        }
    }

    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    const debouncedUpdateAudioState = debounce(updateAudioState, 50);

    muteButton.addEventListener('click', toggleMute);
    volumeSlider.addEventListener('input', debouncedUpdateAudioState);

    // Function to toggle autumn theme
    function toggleAutumnTheme() {
        const autumnThemeLink = document.getElementById('autumn-theme');
        if (autumnThemeLink) {
            autumnThemeLink.remove();
        } else {
            const link = document.createElement('link');
            link.id = 'autumn-theme';
            link.rel = 'stylesheet';
            link.href = 'assets/stylesheets/autumn-theme.css';
            document.head.appendChild(link);
        }
    }

    // Add event listener for toggling autumn theme (e.g., double-click on mute button)
    muteButton.addEventListener('dblclick', toggleAutumnTheme);

    // Initialize volume
    updateAudioState();
});