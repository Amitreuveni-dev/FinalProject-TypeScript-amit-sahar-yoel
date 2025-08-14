class SoundManager {
  private backgroundMusic: HTMLAudioElement;
  setVolume(volume: number) {
    this.backgroundMusic.volume = Math.max(0, Math.min(1, volume));
  }
  getVolume() {
    return this.backgroundMusic.volume;
  }
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

const sound = new SoundManager("../assets/backmusic.mp3");
sound.setVolume(0.3);
let started = false;
const startOnce = () => {
  if (started) return;
  started = true;
  sound.playBackground();
  document.removeEventListener("pointerdown", startOnce);
};

document.addEventListener("pointerdown", startOnce, { once: false });
document.addEventListener("keydown", startOnce);

document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("muteBtn") as HTMLButtonElement | null;
  if (!btn) {
    console.warn("Mute button not found!");
    return;
  }

  btn.innerHTML = sound.isMuted()
    ? `<i class="fa fa-volume-off fa-lg" aria-hidden="true"></i>`
    : `<i class="fa fa-volume-up fa-lg" aria-hidden="true"></i>`;

  btn.addEventListener("click", () => {
    const muted = sound.toggleMute();
    btn.innerHTML = muted
      ? `<i class="fa fa-volume-off fa-lg" aria-hidden="true"></i>`
      : `<i class="fa fa-volume-up fa-lg" aria-hidden="true"></i>`;
  });
});
