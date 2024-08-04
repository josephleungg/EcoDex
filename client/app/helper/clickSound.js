// clickSound.js
const soundFile = '/sound/click-sound.mp3'; // Adjust the path as necessary

export function playSound() {
    const audio = new Audio(soundFile);
    audio.play();
}