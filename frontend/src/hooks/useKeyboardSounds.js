const KeyStrokeSounds = [
  "/sounds/keyboard1.mp3",
  "/sounds/keyboard4.mp3",
  "/sounds/keyboard3.mp3",
  "/sounds/keyboard2.mp3"
];

function useKeyboardSound() {
  const playRandomKeyboardSound = () => {
    const randomSound =
      KeyStrokeSounds[Math.floor(Math.random() * KeyStrokeSounds.length)];

    const audio = new Audio(randomSound);
    audio.currentTime = 0;
    audio.volume = 1.0; 
    audio
      .play()
      .catch((err) =>
        console.log("⚠️ Browser blocked sound (needs user interaction)", err)
      );

    setTimeout(() => {
      audio.pause();
      audio.currentTime = 0;
    }, 200);
  };

  return { playRandomKeyboardSound };
}

export default useKeyboardSound;
