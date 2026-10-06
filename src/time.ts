/** Local-time lighting. Visitors see their own timezone; `?hour=18` freezes a preview. */

type RGB = [number, number, number];

export type Period = 'morning' | 'day' | 'dusk' | 'night';

export interface Palette {
  skyTop: RGB;
  skyMid: RGB;
  skyHorizon: RGB;
  skyAbyss: RGB;
  cloud: RGB;
  cloudLite: RGB;
  hill: RGB;
  hillFar: RGB;
  grass: RGB;
  grassDark: RGB;
  grassLite: RGB;
  grassWarm: RGB;
  rock: RGB;
  rockDark: RGB;
  rockLite: RGB;
  rockEdge: RGB;
  water: RGB;
  waterDeep: RGB;
  waterLite: RGB;
  roof: RGB;
  roofLite: RGB;
  roofEdge: RGB;
  wall: RGB;
  wallDark: RGB;
  tree: RGB;
  treeLite: RGB;
  win: RGB;
  winHot: RGB;
  lantern: RGB;
  lanternDim: RGB;
  star: number;
  rainAmt: number;
  glow: number;
  lamp: number;
  celestial: 'sun' | 'moon';
  sunX: number;
  sunY: number;
  sunCore: RGB;
  sunGlow: RGB;
}

export interface TimeSample {
  period: Period;
  label: string;
  palette: Palette;
  skyCss: string;
}

const NIGHT: Palette = {
  skyTop: [8, 10, 24],
  skyMid: [22, 30, 68],
  skyHorizon: [36, 44, 88],
  skyAbyss: [6, 7, 16],
  cloud: [30, 38, 78],
  cloudLite: [54, 64, 114],
  hill: [12, 14, 32],
  hillFar: [20, 24, 48],
  grass: [40, 116, 58],
  grassDark: [24, 72, 40],
  grassLite: [92, 176, 82],
  grassWarm: [124, 138, 52],
  rock: [62, 56, 78],
  rockDark: [34, 30, 48],
  rockLite: [98, 92, 120],
  rockEdge: [20, 16, 30],
  water: [14, 64, 80],
  waterDeep: [8, 36, 52],
  waterLite: [52, 150, 158],
  roof: [44, 54, 78],
  roofLite: [84, 100, 132],
  roofEdge: [22, 26, 40],
  wall: [116, 100, 108],
  wallDark: [70, 56, 68],
  tree: [34, 28, 42],
  treeLite: [66, 58, 78],
  win: [255, 166, 46],
  winHot: [255, 230, 156],
  lantern: [255, 198, 86],
  lanternDim: [140, 86, 40],
  star: 1,
  rainAmt: 1,
  glow: 1,
  lamp: 1,
  celestial: 'moon',
  sunX: 246,
  sunY: 26,
  sunCore: [238, 242, 250],
  sunGlow: [64, 76, 124],
};

const MORNING: Palette = {
  skyTop: [112, 170, 222],
  skyMid: [244, 178, 132],
  skyHorizon: [255, 208, 146],
  skyAbyss: [48, 92, 142],
  cloud: [255, 232, 214],
  cloudLite: [255, 246, 236],
  hill: [42, 96, 84],
  hillFar: [72, 128, 104],
  grass: [58, 162, 74],
  grassDark: [32, 112, 48],
  grassLite: [132, 204, 102],
  grassWarm: [176, 154, 72],
  rock: [112, 102, 114],
  rockDark: [72, 64, 80],
  rockLite: [164, 154, 160],
  rockEdge: [58, 50, 66],
  water: [52, 132, 172],
  waterDeep: [28, 82, 122],
  waterLite: [224, 204, 170],
  roof: [86, 98, 122],
  roofLite: [140, 150, 170],
  roofEdge: [48, 52, 70],
  wall: [156, 138, 144],
  wallDark: [112, 92, 100],
  tree: [48, 72, 50],
  treeLite: [82, 108, 72],
  win: [186, 206, 214],
  winHot: [255, 224, 186],
  lantern: [150, 116, 82],
  lanternDim: [96, 74, 56],
  star: 0,
  rainAmt: 0,
  glow: 0.28,
  lamp: 0,
  celestial: 'sun',
  sunX: 52,
  sunY: 56,
  sunCore: [255, 236, 186],
  sunGlow: [255, 186, 120],
};

const DAY: Palette = {
  skyTop: [86, 182, 236],
  skyMid: [146, 212, 248],
  skyHorizon: [214, 238, 252],
  skyAbyss: [62, 142, 190],
  cloud: [248, 252, 255],
  cloudLite: [214, 234, 248],
  hill: [46, 112, 88],
  hillFar: [74, 146, 112],
  grass: [62, 178, 78],
  grassDark: [34, 126, 52],
  grassLite: [144, 224, 112],
  grassWarm: [154, 176, 64],
  rock: [136, 130, 146],
  rockDark: [88, 84, 100],
  rockLite: [190, 186, 200],
  rockEdge: [72, 68, 82],
  water: [46, 158, 200],
  waterDeep: [22, 102, 154],
  waterLite: [190, 238, 252],
  roof: [78, 108, 142],
  roofLite: [132, 160, 190],
  roofEdge: [42, 58, 82],
  wall: [172, 154, 160],
  wallDark: [124, 104, 114],
  tree: [44, 82, 48],
  treeLite: [80, 116, 72],
  win: [118, 186, 216],
  winHot: [214, 238, 250],
  lantern: [112, 92, 72],
  lanternDim: [82, 68, 54],
  star: 0,
  rainAmt: 0,
  glow: 0.16,
  lamp: 0,
  celestial: 'sun',
  sunX: 156,
  sunY: 18,
  sunCore: [255, 250, 220],
  sunGlow: [255, 232, 140],
};

const DUSK: Palette = {
  skyTop: [42, 24, 74],
  skyMid: [124, 48, 82],
  skyHorizon: [244, 118, 52],
  skyAbyss: [22, 14, 36],
  cloud: [98, 48, 78],
  cloudLite: [214, 112, 70],
  hill: [36, 22, 48],
  hillFar: [66, 36, 58],
  grass: [46, 98, 52],
  grassDark: [28, 64, 36],
  grassLite: [82, 124, 58],
  grassWarm: [148, 102, 42],
  rock: [80, 58, 74],
  rockDark: [42, 30, 48],
  rockLite: [122, 90, 102],
  rockEdge: [36, 24, 40],
  water: [48, 52, 102],
  waterDeep: [28, 28, 64],
  waterLite: [186, 112, 78],
  roof: [64, 48, 70],
  roofLite: [112, 78, 82],
  roofEdge: [32, 22, 40],
  wall: [104, 80, 88],
  wallDark: [66, 48, 58],
  tree: [40, 30, 46],
  treeLite: [74, 52, 66],
  win: [255, 150, 64],
  winHot: [255, 214, 140],
  lantern: [255, 180, 70],
  lanternDim: [160, 90, 40],
  star: 0.35,
  rainAmt: 0,
  glow: 0.8,
  lamp: 1,
  celestial: 'sun',
  sunX: 268,
  sunY: 62,
  sunCore: [255, 164, 64],
  sunGlow: [255, 96, 40],
};

const LABEL: Record<Period, string> = {
  morning: 'Morning',
  day: 'Day',
  dusk: 'Evening',
  night: 'Night',
};

const KEYS: Array<{ m: number; period: Period; p: Palette }> = [
  { m: 0, period: 'night', p: NIGHT },
  { m: 5 * 60, period: 'night', p: NIGHT },
  { m: 6 * 60 + 30, period: 'morning', p: MORNING },
  { m: 8 * 60 + 30, period: 'day', p: DAY },
  { m: 16 * 60, period: 'day', p: DAY },
  { m: 17 * 60 + 30, period: 'dusk', p: DUSK },
  { m: 19 * 60 + 30, period: 'night', p: NIGHT },
  { m: 24 * 60, period: 'night', p: NIGHT },
];

function mix(a: RGB, b: RGB, t: number): RGB {
  return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function mixPal(a: Palette, b: Palette, t: number): Palette {
  const bothSun = a.celestial === 'sun' && b.celestial === 'sun';
  const celestial = t < 0.5 ? a.celestial : b.celestial;
  return {
    skyTop: mix(a.skyTop, b.skyTop, t),
    skyMid: mix(a.skyMid, b.skyMid, t),
    skyHorizon: mix(a.skyHorizon, b.skyHorizon, t),
    skyAbyss: mix(a.skyAbyss, b.skyAbyss, t),
    cloud: mix(a.cloud, b.cloud, t),
    cloudLite: mix(a.cloudLite, b.cloudLite, t),
    hill: mix(a.hill, b.hill, t),
    hillFar: mix(a.hillFar, b.hillFar, t),
    grass: mix(a.grass, b.grass, t),
    grassDark: mix(a.grassDark, b.grassDark, t),
    grassLite: mix(a.grassLite, b.grassLite, t),
    grassWarm: mix(a.grassWarm, b.grassWarm, t),
    rock: mix(a.rock, b.rock, t),
    rockDark: mix(a.rockDark, b.rockDark, t),
    rockLite: mix(a.rockLite, b.rockLite, t),
    rockEdge: mix(a.rockEdge, b.rockEdge, t),
    water: mix(a.water, b.water, t),
    waterDeep: mix(a.waterDeep, b.waterDeep, t),
    waterLite: mix(a.waterLite, b.waterLite, t),
    roof: mix(a.roof, b.roof, t),
    roofLite: mix(a.roofLite, b.roofLite, t),
    roofEdge: mix(a.roofEdge, b.roofEdge, t),
    wall: mix(a.wall, b.wall, t),
    wallDark: mix(a.wallDark, b.wallDark, t),
    tree: mix(a.tree, b.tree, t),
    treeLite: mix(a.treeLite, b.treeLite, t),
    win: mix(a.win, b.win, t),
    winHot: mix(a.winHot, b.winHot, t),
    lantern: mix(a.lantern, b.lantern, t),
    lanternDim: mix(a.lanternDim, b.lanternDim, t),
    star: lerp(a.star, b.star, t),
    rainAmt: lerp(a.rainAmt, b.rainAmt, t),
    glow: lerp(a.glow, b.glow, t),
    lamp: lerp(a.lamp, b.lamp, t),
    celestial,
    sunX: bothSun ? lerp(a.sunX, b.sunX, t) : celestial === 'sun' ? (t < 0.5 ? a.sunX : b.sunX) : a.sunX,
    sunY: bothSun ? lerp(a.sunY, b.sunY, t) : celestial === 'sun' ? (t < 0.5 ? a.sunY : b.sunY) : a.sunY,
    sunCore: mix(a.sunCore, b.sunCore, t),
    sunGlow: mix(a.sunGlow, b.sunGlow, t),
  };
}

function css(c: RGB): string {
  return `rgb(${Math.round(c[0])}, ${Math.round(c[1])}, ${Math.round(c[2])})`;
}

/** Browser-local clock, unless `?hour=18` or `?hour=7:30` is set. */
export function viewDate(): Date {
  const raw = new URLSearchParams(location.search).get('hour');
  if (raw) {
    const [hs, ms = '0'] = raw.split(':');
    const h = Number(hs);
    const m = Number(ms);
    if (Number.isFinite(h) && h >= 0 && h <= 23 && Number.isFinite(m) && m >= 0 && m <= 59) {
      const date = new Date();
      date.setHours(h, m, 0, 0);
      return date;
    }
  }
  return new Date();
}

export function sampleTime(date: Date): TimeSample {
  const mins = date.getHours() * 60 + date.getMinutes();
  let index = 0;
  for (let i = 0; i < KEYS.length - 1; i++) {
    index = i;
    const next = KEYS[i + 1];
    if (next && mins <= next.m) break;
  }
  const from = KEYS[index] ?? KEYS[0];
  const to = KEYS[index + 1] ?? from;
  if (!from || !to) {
    return { period: 'night', label: LABEL.night, palette: NIGHT, skyCss: css(NIGHT.skyTop) };
  }
  const span = Math.max(1, to.m - from.m);
  const t = Math.min(1, Math.max(0, (mins - from.m) / span));
  const palette = mixPal(from.p, to.p, t);
  const period = t < 0.5 ? from.period : to.period;
  return { period, label: LABEL[period], palette, skyCss: css(palette.skyTop) };
}

export function sampleNow(): TimeSample {
  return sampleTime(viewDate());
}
