document.addEventListener('DOMContentLoaded', function() {
    const autumnAudioControl = document.querySelector('.autumn-audio-control');
    const autumnMuteButton = document.getElementById('autumn-mute-button');
    const autumnVolumeSlider = document.getElementById('autumn-volume-slider');
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
            previousVolume = autumnVolumeSlider.value;
            autumnVolumeSlider.value = 0;
        } else {
            autumnVolumeSlider.value = previousVolume;
        }
        updateAudioState();
    }

    function updateAudioState() {
        const volume = parseFloat(autumnVolumeSlider.value);
        audioElements.forEach(audio => {
            audio.volume = volume;
            audio.muted = volume === 0;
        });
        isMuted = volume === 0;
        updateVolumeIcon(volume);
        autumnMuteButton.setAttribute('aria-label', isMuted ? 'Unmute' : 'Mute');
    }

    function updateVolumeIcon(volume) {
        if (volume === 0) {
            autumnMuteButton.innerHTML = volumeMutedIcon;
        } else if (volume < 0.5) {
            autumnMuteButton.innerHTML = volumeMediumIcon;
        } else {
            autumnMuteButton.innerHTML = volumeHighIcon;
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

    autumnMuteButton.addEventListener('click', toggleMute);
    autumnVolumeSlider.addEventListener('input', debouncedUpdateAudioState);

    updateAudioState();
});