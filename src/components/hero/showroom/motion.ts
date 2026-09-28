export const clamp = (value: number, min: number, max: number): number => Math.min(max, Math.max(min, value));

export const lerp = (from: number, to: number, t: number): number => from + (to - from) * t;

export const smoothstep = (edge0: number, edge1: number, value: number): number => {
  const t = clamp((value - edge0) / (edge1 - edge0), 0, 1);
  return t * t * (3 - 2 * t);
};

export const easeOutExpo = (t: number): number => (t >= 1 ? 1 : 1 - 2 ** (-10 * t));

export const easeInOutCubic = (t: number): number => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);

/** Tween de un escalar con duración fija; `progress` avanza con el reloj del render loop. */
export class ScalarTween {
  private from: number;
  private to: number;
  private elapsed = 0;
  private duration = 0;

  constructor(
    initial: number,
    private readonly easing: (t: number) => number,
  ) {
    this.from = initial;
    this.to = initial;
  }

  get value(): number {
    return lerp(this.from, this.to, this.easing(this.progress));
  }

  get progress(): number {
    return this.duration === 0 ? 1 : clamp(this.elapsed / this.duration, 0, 1);
  }

  get target(): number {
    return this.to;
  }

  start(to: number, durationSeconds: number): void {
    this.from = this.value;
    this.to = to;
    this.elapsed = 0;
    this.duration = durationSeconds;
  }

  update(deltaSeconds: number): void {
    this.elapsed += deltaSeconds;
  }
}
