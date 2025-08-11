class SoundManager {
  private backgroundMusic: HTMLAudioElement;

  constructor(musicPath: string) {
    this.backgroundMusic = new Audio(musicPath);
    this.backgroundMusic.loop = true;
    this.backgroundMusic.preload = "auto";

    this.backgroundMusic.addEventListener("ended", () => {
      this.backgroundMusic.currentTime = 0;
      this.backgroundMusic.play().catch(() => {});
    });

    this.backgroundMusic.addEventListener("stalled", () => {
      this.backgroundMusic.load();
      this.backgroundMusic.play().catch(() => {});
    });
  }

  async playBackground() {
    try {
      await this.backgroundMusic.play();
    } catch (err) {
      console.warn("Play failed:", err);
    }
  }

  stopBackground() {
    this.backgroundMusic.pause();
    this.backgroundMusic.currentTime = 0;
  }

  playEffect(effectPath: string) {
    const effect = new Audio(effectPath);
    effect.play().catch(() => {});
  }

  toggleMute(): boolean {
    this.backgroundMusic.muted = !this.backgroundMusic.muted;
    return this.backgroundMusic.muted;
  }

  isMuted(): boolean {
    return this.backgroundMusic.muted;
  }
}

// יצירת מופע יחיד
const sound = new SoundManager("../assets/backmusic.mp3");

// הפעלה על אינטראקציה ראשונה: עכבר/טאצ' או חיצים/Enter/Space
let started = false;
const startOnce = () => {
  if (started) return;
  started = true;
  sound.playBackground();
  document.removeEventListener("pointerdown", startOnce);
  document.removeEventListener("keydown", keyStartHandler);
};
const keyStartHandler = (e: KeyboardEvent) => {
  const keys = [
    "ArrowUp",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "Enter",
    " ",
  ]; // Space הוא " "
  if (keys.includes(e.key)) startOnce();
};

document.addEventListener("pointerdown", startOnce, { once: false });
document.addEventListener("keydown", keyStartHandler);

// כפתור השתקה
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("muteBtn") as HTMLButtonElement | null;
  if (!btn) {
    console.warn("Mute button not found!");
    return;
  }
  btn.textContent = sound.isMuted() ? "🔈" : "🔇";
  btn.addEventListener("click", () => {
    const muted = sound.toggleMute();
    btn.textContent = muted ? "🔈" : "🔇";
  });
});
