/** Original pixel diorama. A floating island whose light follows the visitor's local time. */

import { sampleNow, type Palette, type Period } from './time';

export const DESIGN_W = 320;
export const DESIGN_H = 180;

export type PanelId = 'about' | 'work' | 'contact';

export interface Spot {
  id: PanelId;
  label: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

const ISLAND_CX = 160;
const ISLAND_RX = 142;
const POND_L = 38;
const POND_R = 100;
const WATER_TOP = 104;
const WATER_BOT = 113;
const HOUSE_X = 132;
const HOUSE_W = 64;
const LAMP_X = 116;
const MAIL_X = 104;
const FIRE_X = 208;
const CHAR_X = 232;
const TREE_X = 270;

/** Hotspots in design pixels. Kept in sync with the props below. */
export const SPOTS: readonly Spot[] = [
  { id: 'about', label: 'About', x: 122, y: 40, w: 84, h: 70 },
  { id: 'work', label: 'Work', x: 200, y: 58, w: 70, h: 54 },
  { id: 'contact', label: 'Contact', x: 30, y: 72, w: 90, h: 46 },
];

type RGB = [number, number, number];

let SKY_TOP: RGB = [8, 10, 24];
let SKY_MID: RGB = [22, 30, 68];
let SKY_HORIZON: RGB = [36, 44, 88];
let SKY_ABYSS: RGB = [6, 7, 16];
const STAR: RGB = [232, 236, 250];
const STAR_DIM: RGB = [150, 164, 204];
const MOON: RGB = [238, 242, 250];
const MOON_SHADE: RGB = [176, 190, 214];
const MOON_CRATER: RGB = [148, 164, 190];
const MOON_GLOW: RGB = [64, 76, 124];
let CLOUD: RGB = [30, 38, 78];
let CLOUD_LITE: RGB = [54, 64, 114];
let HILL: RGB = [12, 14, 32];
let HILL_FAR: RGB = [20, 24, 48];
let GRASS: RGB = [40, 116, 58];
let GRASS_DARK: RGB = [24, 72, 40];
let GRASS_LITE: RGB = [92, 176, 82];
let GRASS_WARM: RGB = [124, 138, 52];
const DIRT: RGB = [84, 58, 44];
let ROCK: RGB = [62, 56, 78];
let ROCK_DARK: RGB = [34, 30, 48];
let ROCK_LITE: RGB = [98, 92, 120];
let ROCK_EDGE: RGB = [20, 16, 30];
let WATER: RGB = [14, 64, 80];
let WATER_DEEP: RGB = [8, 36, 52];
let WATER_LITE: RGB = [52, 150, 158];
const ORB: RGB = [64, 230, 210];
const ORB_HOT: RGB = [226, 255, 248];
const ORB_DIM: RGB = [18, 110, 122];
const FALL: RGB = [78, 206, 212];
const FALL_HI: RGB = [214, 246, 248];
const MIST: RGB = [110, 170, 180];
let ROOF: RGB = [44, 54, 78];
let ROOF_LITE: RGB = [84, 100, 132];
let ROOF_EDGE: RGB = [22, 26, 40];
let WALL: RGB = [116, 100, 108];
let WALL_DARK: RGB = [70, 56, 68];
const TIMBER: RGB = [54, 36, 38];
const DOOR: RGB = [48, 30, 26];
const DOOR_LITE: RGB = [96, 60, 42];
const KNOB: RGB = [232, 184, 92];
let WIN: RGB = [255, 166, 46];
let WIN_HOT: RGB = [255, 230, 156];

let starAmt = 1;
let rainAmt = 1;
let glowStrength = 1;
let lampLit = 1;
let celestial: 'sun' | 'moon' = 'moon';
let sunAtX = 156;
let sunAtY = 18;
let sunCore: RGB = [255, 250, 220];
let sunGlow: RGB = [255, 232, 140];

function applyPalette(p: Palette): void {
  SKY_TOP = p.skyTop;
  SKY_MID = p.skyMid;
  SKY_HORIZON = p.skyHorizon;
  SKY_ABYSS = p.skyAbyss;
  CLOUD = p.cloud;
  CLOUD_LITE = p.cloudLite;
  HILL = p.hill;
  HILL_FAR = p.hillFar;
  GRASS = p.grass;
  GRASS_DARK = p.grassDark;
  GRASS_LITE = p.grassLite;
  GRASS_WARM = p.grassWarm;
  ROCK = p.rock;
  ROCK_DARK = p.rockDark;
  ROCK_LITE = p.rockLite;
  ROCK_EDGE = p.rockEdge;
  WATER = p.water;
  WATER_DEEP = p.waterDeep;
  WATER_LITE = p.waterLite;
  ROOF = p.roof;
  ROOF_LITE = p.roofLite;
  ROOF_EDGE = p.roofEdge;
  WALL = p.wall;
  WALL_DARK = p.wallDark;
  TREE = p.tree;
  TREE_LITE = p.treeLite;
  WIN = p.win;
  WIN_HOT = p.winHot;
  LANTERN = p.lantern;
  LANTERN_DIM = p.lanternDim;
  starAmt = p.star;
  rainAmt = p.rainAmt;
  glowStrength = p.glow;
  lampLit = p.lamp;
  celestial = p.celestial;
  sunAtX = p.sunX;
  sunAtY = p.sunY;
  sunCore = p.sunCore;
  sunGlow = p.sunGlow;
}
const WIN_FRAME: RGB = [36, 24, 22];
const CHIMNEY: RGB = [88, 60, 56];
const CHIMNEY_DARK: RGB = [48, 34, 34];
const CHIMNEY_LITE: RGB = [126, 90, 78];
const SMOKE: RGB = [154, 160, 174];
const SMOKE_LITE: RGB = [200, 204, 214];
const SMOKE_WARM: RGB = [186, 142, 118];
const LOG: RGB = [90, 54, 36];
const LOG_DARK: RGB = [52, 32, 24];
const LOG_LITE: RGB = [136, 86, 50];
const FLAME_Y: RGB = [255, 226, 112];
const FLAME_O: RGB = [255, 114, 36];
const FLAME_R: RGB = [176, 40, 28];
const COAT: RGB = [200, 102, 48];
const COAT_DARK: RGB = [136, 64, 32];
const SKIN: RGB = [238, 192, 156];
const HAIR: RGB = [40, 30, 28];
const EYE: RGB = [26, 20, 22];
const PANTS: RGB = [40, 44, 72];
const SHOE: RGB = [28, 22, 26];
const UMBRELLA: RGB = [190, 48, 44];
const UMB_DARK: RGB = [112, 28, 32];
const UMB_LITE: RGB = [232, 112, 86];
const UMB_POLE: RGB = [72, 54, 48];
let TREE: RGB = [34, 28, 42];
let TREE_LITE: RGB = [66, 58, 78];
let LANTERN: RGB = [255, 198, 86];
let LANTERN_DIM: RGB = [140, 86, 40];
const CRYSTAL: RGB = [46, 214, 222];
const CRYSTAL_HOT: RGB = [196, 255, 250];
const CRYSTAL_MAG: RGB = [220, 92, 176];
const CRYSTAL_PALE: RGB = [170, 198, 255];
const BONE: RGB = [216, 210, 198];
const GOLD: RGB = [242, 198, 98];
const POST: RGB = [98, 66, 42];
const MAIL: RGB = [172, 44, 42];
const MAIL_DARK: RGB = [112, 28, 32];
const DOCK: RGB = [122, 80, 48];
const DOCK_LITE: RGB = [160, 112, 66];
const DOCK_DARK: RGB = [72, 46, 32];
const STONE: RGB = [96, 92, 108];
const STONE_LITE: RGB = [148, 144, 158];
const FLOWER_PINK: RGB = [232, 112, 142];
const FLOWER_YEL: RGB = [242, 204, 84];
const VINE: RGB = [38, 118, 64];
const VINE_DARK: RGB = [18, 62, 38];
const RAIN: RGB = [154, 174, 216];
const RAIN_HI: RGB = [226, 234, 252];
const LAMP_GLOW: RGB = [255, 198, 124];
const REED: RGB = [28, 86, 52];

function mix(a: RGB, b: RGB, t: number): RGB {
  const u = t < 0 ? 0 : t > 1 ? 1 : t;
  return [a[0] + (b[0] - a[0]) * u, a[1] + (b[1] - a[1]) * u, a[2] + (b[2] - a[2]) * u];
}

function hash(x: number, y: number): number {
  let n = (x | 0) * 374761393 + (y | 0) * 668265263;
  n = Math.imul(n ^ (n >>> 13), 1274126177);
  return (n ^ (n >>> 16)) >>> 0;
}

function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function groundAt(x: number): number {
  const dx = (x - ISLAND_CX) / ISLAND_RX;
  const n = 1 - dx * dx;
  if (n <= 0) return 108;
  return 108 - Math.round(Math.sqrt(n) * 5);
}

function rockBottom(x: number): number {
  const dx = (x - ISLAND_CX) / ISLAND_RX;
  const n = 1 - dx * dx;
  if (n <= 0) return groundAt(x);
  const jag = (hash(x, 4) % 3) - 1;
  return groundAt(x) + Math.round(Math.sqrt(n) * 52) + jag;
}

function onIsland(x: number): boolean {
  const dx = (x - ISLAND_CX) / ISLAND_RX;
  return dx * dx < 1;
}

class Pix {
  readonly data: Uint8ClampedArray;
  readonly img: ImageData;

  constructor(
    readonly w: number,
    readonly h: number,
  ) {
    this.img = new ImageData(w, h);
    this.data = this.img.data;
  }

  set(x: number, y: number, c: RGB): void {
    x |= 0;
    y |= 0;
    if (x < 0 || y < 0 || x >= this.w || y >= this.h) return;
    const i = (y * this.w + x) * 4;
    this.data[i] = c[0];
    this.data[i + 1] = c[1];
    this.data[i + 2] = c[2];
    this.data[i + 3] = 255;
  }

  hline(x: number, y: number, w: number, c: RGB): void {
    for (let i = 0; i < w; i++) this.set(x + i, y, c);
  }

  rect(x: number, y: number, w: number, h: number, c: RGB): void {
    for (let yy = 0; yy < h; yy++) this.hline(x, y + yy, w, c);
  }
}

class Layer {
  constructor(
    private buf: Pix,
    private ox: number,
    private oy: number,
    private mask: Uint8Array,
  ) {}

  maskAt(x: number, y: number): number {
    x |= 0;
    y |= 0;
    if (x < 0 || y < 0 || x >= DESIGN_W || y >= DESIGN_H) return 4;
    return this.mask[y * DESIGN_W + x] ?? 0;
  }

  set(x: number, y: number, c: RGB, m = 4): void {
    x |= 0;
    y |= 0;
    if (x < 0 || y < 0 || x >= DESIGN_W || y >= DESIGN_H) return;
    this.mask[y * DESIGN_W + x] = m;
    this.buf.set(this.ox + x, this.oy + y, c);
  }

  hline(x: number, y: number, w: number, c: RGB, m = 4): void {
    for (let i = 0; i < w; i++) this.set(x + i, y, c, m);
  }

  vline(x: number, y: number, h: number, c: RGB, m = 4): void {
    for (let i = 0; i < h; i++) this.set(x, y + i, c, m);
  }

  rect(x: number, y: number, w: number, h: number, c: RGB, m = 4): void {
    for (let yy = 0; yy < h; yy++) this.hline(x, y + yy, w, c, m);
  }
}

function line(layer: Layer, x0: number, y0: number, x1: number, y1: number, c: RGB): void {
  let x = x0 | 0;
  let y = y0 | 0;
  const dx = Math.abs(x1 - x);
  const sx = x < x1 ? 1 : -1;
  const dy = -Math.abs(y1 - y);
  const sy = y < y1 ? 1 : -1;
  let err = dx + dy;
  for (;;) {
    layer.set(x, y, c);
    if (x === x1 && y === y1) break;
    const e2 = 2 * err;
    if (e2 >= dy) {
      err += dy;
      x += sx;
    }
    if (e2 <= dx) {
      err += dx;
      y += sy;
    }
  }
}

interface Layout {
  bw: number;
  bh: number;
  ox: number;
  oy: number;
  cssLeft: number;
  cssTop: number;
  cssW: number;
  cssH: number;
}

export interface Metrics {
  bw: number;
  bh: number;
  ox: number;
  oy: number;
}

function computeLayout(vw: number, vh: number): Layout {
  const fit = Math.min(vw / DESIGN_W, vh / DESIGN_H);
  if (fit < 1) {
    const cssW = Math.max(1, Math.floor(DESIGN_W * fit));
    const cssH = Math.max(1, Math.floor(DESIGN_H * fit));
    return {
      bw: DESIGN_W,
      bh: DESIGN_H,
      ox: 0,
      oy: 0,
      cssW,
      cssH,
      cssLeft: Math.floor((vw - cssW) / 2),
      cssTop: Math.floor((vh - cssH) / 2),
    };
  }
  const pixel = Math.floor(fit);
  const bw = Math.ceil(vw / pixel);
  const bh = Math.ceil(vh / pixel);
  const cssW = bw * pixel;
  const cssH = bh * pixel;
  const extraY = bh - DESIGN_H;
  const oy = extraY <= 2 ? 0 : Math.round(extraY * 0.42);
  return {
    bw,
    bh,
    ox: Math.floor((bw - DESIGN_W) / 2),
    oy,
    cssW,
    cssH,
    cssLeft: Math.floor((vw - cssW) / 2),
    cssTop: Math.floor((vh - cssH) / 2),
  };
}

interface Drop {
  x: number;
  y: number;
  s: number;
  len: number;
}

interface Puff {
  x: number;
  y: number;
  life: number;
  warm: boolean;
}

function skyAt(y: number, groundBuf: number, h: number): RGB {
  if (y < groundBuf) {
    const span = Math.max(1, groundBuf);
    const t = y / span;
    if (t < 0.7) return mix(SKY_TOP, SKY_MID, t / 0.7);
    return mix(SKY_MID, SKY_HORIZON, (t - 0.7) / 0.3);
  }
  const span = Math.max(1, h - groundBuf);
  const t = (y - groundBuf) / span;
  return mix(SKY_HORIZON, SKY_ABYSS, Math.min(1, t * 1.15));
}

function cloud(buf: Pix, x: number, y: number, w: number, h: number): void {
  buf.rect(x, y, w, h, CLOUD);
  buf.rect(x - 6, y + 2, w + 12, Math.max(2, h - 2), CLOUD);
  buf.rect(x + 4, y - 3, Math.floor(w * 0.55), h, CLOUD);
  buf.rect(x + 8, y - 1, Math.floor(w * 0.3), 2, CLOUD_LITE);
}

function drawMoon(buf: Pix, cx: number, cy: number): void {
  const glowR = 22;
  for (let y = -glowR; y <= glowR; y++) {
    for (let x = -glowR; x <= glowR; x++) {
      const d2 = x * x + y * y;
      if (d2 > glowR * glowR || d2 < 15 * 15) continue;
      if (hash(cx + x, cy + y) % 3 !== 0) continue;
      buf.set(cx + x, cy + y, MOON_GLOW);
    }
  }
  const r = 13;
  for (let y = -r; y <= r; y++) {
    for (let x = -r; x <= r; x++) {
      if (x * x + y * y > r * r) continue;
      let c = x > 3 ? MOON : MOON_SHADE;
      if (x > 6 && y < -2) c = MOON;
      buf.set(cx + x, cy + y, c);
    }
  }
  const craters: Array<[number, number, number]> = [
    [-3, -2, 2],
    [2, 3, 2],
    [-1, 4, 1],
  ];
  for (const [ox, oy, cr] of craters) {
    for (let y = -cr; y <= cr; y++) {
      for (let x = -cr; x <= cr; x++) {
        if (x * x + y * y <= cr * cr) buf.set(cx + ox + x, cy + oy + y, MOON_CRATER);
      }
    }
  }
}

function drawSun(buf: Pix, cx: number, cy: number): void {
  const glowR = 20;
  for (let y = -glowR; y <= glowR; y++) {
    for (let x = -glowR; x <= glowR; x++) {
      const d2 = x * x + y * y;
      if (d2 > glowR * glowR || d2 < 10 * 10) continue;
      if (hash(cx + x, cy + y) % 2 !== 0) continue;
      buf.set(cx + x, cy + y, sunGlow);
    }
  }
  const r = 8;
  for (let y = -r; y <= r; y++) {
    for (let x = -r; x <= r; x++) {
      if (x * x + y * y > r * r) continue;
      const shade = x < -2 && y > 1;
      buf.set(cx + x, cy + y, shade ? mix(sunCore, sunGlow, 0.35) : sunCore);
    }
  }
  const rays: Array<[number, number]> = [
    [0, -1],
    [0, 1],
    [-1, 0],
    [1, 0],
  ];
  for (const [dx, dy] of rays) {
    for (let i = r + 2; i <= r + 8; i += 2) buf.set(cx + dx * i, cy + dy * i, sunCore);
  }
}

function drawHills(buf: Pix, groundBuf: number): void {
  for (let x = 0; x < buf.w; x++) {
    const far = 8 + Math.round(Math.sin(x * 0.02 + 0.6) * 5 + Math.sin(x * 0.008) * 7);
    for (let i = 0; i < far; i++) {
      buf.set(x, groundBuf - 16 - far + i, i < 1 ? HILL_FAR : HILL_FAR);
    }
    const near = 12 + Math.round(Math.sin(x * 0.027) * 5 + Math.sin(x * 0.011 + 2) * 6);
    for (let i = 0; i < near; i++) {
      const shade = i < 2 ? HILL_FAR : HILL;
      buf.set(x, groundBuf - near + i, shade);
    }
  }
}

function warmAmount(x: number): number {
  const sources: Array<[number, number, number]> = [
    [LAMP_X, 22, 1],
    [FIRE_X + 6, 20, 1],
    [HOUSE_X + 32, 14, 0.65],
  ];
  let m = 0;
  for (const [sx, rad, amp] of sources) {
    const d = Math.abs(x - sx);
    if (d < rad) m = Math.max(m, amp * (1 - d / rad));
  }
  return m * glowStrength;
}

function drawIsland(layer: Layer): void {
  for (let x = ISLAND_CX - ISLAND_RX; x <= ISLAND_CX + ISLAND_RX; x++) {
    if (!onIsland(x)) continue;
    const top = groundAt(x);
    const bot = rockBottom(x);
    const pond = x >= POND_L && x <= POND_R;
    const rockStart = pond ? WATER_BOT : top;
    for (let y = rockStart; y <= bot; y++) {
      const depth = (y - top) / Math.max(1, bot - top);
      let c = mix(ROCK_LITE, ROCK_DARK, Math.min(1, depth * 1.2));
      if (hash(x, y) % 8 === 0) c = mix(c, ROCK_LITE, 0.65);
      else if (hash(x, y) % 11 === 0) c = mix(c, ROCK_EDGE, 0.75);
      const dx = (x - ISLAND_CX) / ISLAND_RX;
      const dy = (y - top) / 52;
      if (dy > 0.28 && dy < 0.78 && Math.abs(dx) < 0.32) c = mix(c, ROCK_EDGE, 0.5);
      if (y >= bot - 1) c = ROCK_EDGE;
      if (!pond && y === top) c = mix(ROCK, ROCK_LITE, 0.35);
      layer.set(x, y, c, 1);
    }
    if (pond) {
      for (let y = WATER_TOP; y < WATER_BOT; y++) {
        const deep = y > WATER_TOP + 4;
        let c: RGB = deep ? WATER_DEEP : WATER;
        if (y === WATER_TOP && hash(x, 2) % 4 === 0) c = WATER_LITE;
        if (hash(x, y) % 9 === 0) c = mix(c, WATER_LITE, 0.35);
        layer.set(x, y, c, 3);
      }
      continue;
    }
    layer.set(x, top, DIRT, 2);
    const blades = 3 + (hash(x, 1) % 2);
    for (let g = 1; g <= blades; g++) {
      const warm = warmAmount(x);
      let c: RGB = hash(x, g) % 5 === 0 ? GRASS_LITE : hash(x, g) % 3 === 0 ? GRASS_DARK : GRASS;
      if (warm > 0.05) c = mix(c, GRASS_WARM, warm * 0.8);
      layer.set(x, top - g, c, 2);
    }
    if (hash(x, 6) % 11 === 0) layer.set(x, top - blades - 1, GRASS_LITE, 2);
    if (hash(x, 8) % 19 === 0) {
      layer.set(x, top - blades - 2, hash(x, 3) % 2 ? FLOWER_PINK : FLOWER_YEL, 2);
    }
  }
}

function drawCrystals(layer: Layer): void {
  const clusters: Array<[number, number, RGB, RGB]> = [
    [58, 10, CRYSTAL, CRYSTAL_HOT],
    [74, 7, CRYSTAL, CRYSTAL_HOT],
    [92, 8, CRYSTAL_PALE, [230, 246, 255]],
    [148, 12, CRYSTAL, CRYSTAL_HOT],
    [166, 8, CRYSTAL_MAG, [255, 186, 224]],
    [184, 6, CRYSTAL_MAG, [255, 186, 224]],
    [214, 9, CRYSTAL_PALE, [214, 232, 255]],
    [236, 7, CRYSTAL, CRYSTAL_HOT],
    [258, 10, CRYSTAL, CRYSTAL_HOT],
  ];
  for (const [x, h, body, hot] of clusters) {
    const tip = rockBottom(x) + 5;
    const top = tip - h;
    for (let i = 0; i < h; i++) {
      const y = top + i;
      const w = Math.max(1, Math.ceil((h - i) / 3));
      for (let dx = 0; dx < w; dx++) {
        const px = x + dx - (w >> 1);
        const m = layer.maskAt(px, y);
        if (m === 3 || m === 4) continue;
        layer.set(px, y, dx === 0 || i === h - 1 ? hot : body, m === 0 ? 4 : 1);
      }
    }
  }
}

function drawFossil(layer: Layer): void {
  const pixels: Array<[number, number]> = [
    [0, 2],
    [1, 1],
    [2, 2],
    [3, 2],
    [4, 1],
    [5, 2],
    [2, 3],
    [3, 3],
    [1, 4],
    [4, 4],
    [0, 5],
    [5, 5],
  ];
  const x = 152;
  const y = 130;
  for (const [dx, dy] of pixels) {
    if (layer.maskAt(x + dx, y + dy) === 1) layer.set(x + dx, y + dy, BONE, 1);
  }
}

function drawVines(layer: Layer): void {
  const xs = [50, 86, 122, 206, 246, 288];
  for (const x of xs) {
    const y0 = rockBottom(x);
    const len = 5 + (hash(x, 2) % 8);
    for (let i = 0; i < len; i++) {
      const xx = x + (i % 5 === 4 ? 1 : 0);
      const yy = y0 + i;
      const m = layer.maskAt(xx, yy);
      if (m === 3 || m === 4) continue;
      layer.set(xx, yy, i % 2 ? VINE : VINE_DARK, 4);
    }
  }
}

function drawWindow(layer: Layer, x: number, y: number, w: number, h: number, hot: boolean): void {
  layer.rect(x - 1, y - 1, w + 2, h + 2, WIN_FRAME);
  layer.rect(x, y, w, h, hot ? WIN_HOT : WIN);
  layer.vline(x + (w >> 1), y, h, WIN_FRAME);
  layer.hline(x, y + (h >> 1), w, WIN_FRAME);
  layer.set(x + 1, y + 1, WIN_HOT);
  layer.set(x + 2, y + 1, WIN_HOT);
}

function drawHouse(layer: Layer, frame: number): { chimneyX: number; chimneyY: number } {
  const base = groundAt(HOUSE_X + (HOUSE_W >> 1)) + 2;
  const wallH = 30;
  const wallTop = base - wallH;
  const roofH = 18;
  const peakY = wallTop - roofH;
  const mid = HOUSE_X + (HOUSE_W >> 1);

  for (let row = 0; row < roofH; row++) {
    const yy = peakY + row;
    const half = Math.max(3, Math.floor(((row + 1) / roofH) * (HOUSE_W / 2 + 6)));
    const x0 = mid - half;
    const ww = half * 2;
    const shingle: RGB = row % 4 === 0 ? ROOF_LITE : ROOF;
    layer.hline(x0, yy, ww, shingle);
    layer.set(x0, yy, ROOF_EDGE);
    layer.set(x0 + ww - 1, yy, ROOF_EDGE);
    if (row % 2 === 0) layer.set(x0 + ww - 2, yy, ROOF_LITE);
  }
  layer.hline(HOUSE_X - 2, wallTop, HOUSE_W + 4, ROOF_EDGE);

  layer.rect(HOUSE_X, wallTop + 1, HOUSE_W, wallH - 1, WALL);
  layer.vline(HOUSE_X, wallTop + 1, wallH - 1, TIMBER);
  layer.vline(HOUSE_X + HOUSE_W - 1, wallTop + 1, wallH - 1, TIMBER);
  layer.vline(mid, wallTop + 1, wallH - 1, TIMBER);
  layer.hline(HOUSE_X, wallTop + 14, HOUSE_W, TIMBER);
  for (let y = wallTop + 2; y < base - 1; y += 2) layer.set(HOUSE_X + 1, y, WALL_DARK);

  const gableX = mid - 10;
  const gableY = peakY + 9;
  layer.rect(gableX, gableY, 6, 5, WIN_FRAME);
  layer.rect(gableX + 1, gableY + 1, 4, 3, (frame >> 4) % 13 === 0 ? WIN : WIN_HOT);

  const chimneyX = mid + 12;
  const chimneyTop = peakY - 6;
  const chimneyH = wallTop - 6 - chimneyTop;
  layer.rect(chimneyX, chimneyTop, 7, chimneyH, CHIMNEY);
  layer.rect(chimneyX - 1, chimneyTop, 9, 2, CHIMNEY_DARK);
  layer.rect(chimneyX + 2, chimneyTop + 2, 3, 2, [28, 22, 26]);
  layer.vline(chimneyX + 6, chimneyTop, chimneyH, CHIMNEY_LITE);

  const upperDim = (frame >> 3) % 14 === 0;
  drawWindow(layer, HOUSE_X + 8, wallTop + 4, 10, 8, !upperDim);
  drawWindow(layer, HOUSE_X + HOUSE_W - 18, wallTop + 4, 10, 8, (frame >> 3) % 18 !== 0);
  drawWindow(layer, HOUSE_X + 6, wallTop + 17, 8, 8, true);
  drawWindow(layer, HOUSE_X + HOUSE_W - 15, wallTop + 17, 8, 8, true);

  const doorX = mid - 5;
  layer.rect(doorX, base - 15, 11, 14, DOOR);
  layer.vline(doorX, base - 15, 14, DOOR_LITE);
  layer.set(doorX + 8, base - 8, KNOB);
  layer.vline(doorX + 10, base - 13, 8, glowStrength > 0.5 ? [255, 166, 46] : [78, 68, 62]);
  layer.hline(doorX - 2, base, 15, STONE);

  return { chimneyX: chimneyX + 3, chimneyY: chimneyTop - 1 };
}

function drawLamp(layer: Layer, frame: number): void {
  const ground = groundAt(LAMP_X);
  layer.vline(LAMP_X, ground - 24, 24, TIMBER);
  layer.vline(LAMP_X + 1, ground - 24, 24, [78, 56, 50]);
  layer.rect(LAMP_X - 3, ground - 28, 8, 5, [36, 28, 26]);
  const lit = lampLit > 0.5;
  const hot = lit && (frame >> 3) % 6 !== 0;
  const glass: RGB = lit ? (hot ? [255, 230, 156] : [255, 186, 70]) : [72, 64, 58];
  layer.rect(LAMP_X - 2, ground - 27, 6, 3, glass);
}

function drawMailbox(layer: Layer): void {
  const ground = groundAt(MAIL_X + 4);
  layer.vline(MAIL_X + 3, ground - 11, 11, POST);
  layer.rect(MAIL_X, ground - 16, 9, 6, MAIL);
  layer.rect(MAIL_X, ground - 17, 9, 2, MAIL_DARK);
  layer.vline(MAIL_X + 8, ground - 20, 4, KNOB);
  layer.set(MAIL_X + 8, ground - 20, GOLD);
  layer.set(MAIL_X + 2, ground - 14, WIN_HOT);
}

function drawDock(layer: Layer): void {
  const y = WATER_TOP + 1;
  layer.rect(POND_R - 6, y, 18, 3, DOCK);
  layer.hline(POND_R - 6, y, 18, DOCK_LITE);
  layer.vline(POND_R - 4, y, 7, DOCK_DARK);
  layer.vline(POND_R + 8, y, 7, DOCK_DARK);
}

function drawOrbs(layer: Layer, frame: number): void {
  const orbs: Array<[number, number, number]> = [
    [52, 108, 0],
    [68, 110, 1.4],
    [84, 107, 2.6],
  ];
  for (const [x, y, phase] of orbs) {
    const oy = Math.round(Math.sin(frame / 14 + phase) * 1);
    const cy = y + oy;
    layer.set(x, cy, ORB_HOT, 3);
    layer.set(x - 1, cy, ORB, 3);
    layer.set(x + 1, cy, ORB, 3);
    layer.set(x, cy - 1, ORB, 3);
    layer.set(x, cy + 1, ORB, 3);
    layer.set(x - 2, cy, ORB_DIM, 3);
    layer.set(x + 2, cy, ORB_DIM, 3);
  }
}

function drawReeds(layer: Layer): void {
  const xs = [42, 46, 96, 99];
  for (const x of xs) {
    const h = 6 + (hash(x, 5) % 3);
    layer.vline(x, WATER_TOP - h, h, REED, 2);
    layer.set(x, WATER_TOP - h - 1, GRASS_LITE, 2);
  }
}

function drawFire(layer: Layer, frame: number): number {
  const ground = groundAt(FIRE_X + 6);
  layer.hline(FIRE_X, ground - 2, 14, LOG_DARK);
  layer.hline(FIRE_X + 1, ground - 3, 12, LOG);
  layer.hline(FIRE_X + 3, ground - 4, 8, LOG_LITE);
  const step = (frame >> 2) % 4;
  const height = [8, 10, 9, 7][step] ?? 8;
  const sway = [0, 1, 0, -1][step] ?? 0;
  for (let i = 0; i < height; i++) {
    const wide = i > height - 2 ? 1 : i > height - 4 ? 2 : i > 2 ? 3 : 4;
    const c: RGB = i > height - 3 ? FLAME_Y : i > 2 ? FLAME_O : FLAME_R;
    const yy = ground - 5 - i;
    layer.hline(FIRE_X + 7 - (wide >> 1) + (i > 3 ? sway : 0), yy, wide, c);
  }
  if (frame % 5 < 3) layer.set(FIRE_X + 4 + (frame % 4), ground - 16 - (frame % 4), FLAME_Y);
  if (frame % 7 < 3) layer.set(FIRE_X + 9, ground - 14 - ((frame >> 1) % 3), FLAME_O);
  return ground - 6 - height;
}

function drawCharacter(layer: Layer, frame: number): void {
  const ground = groundAt(CHAR_X + 4);
  const bob = (frame >> 5) & 1;
  const foot = ground - bob;
  const x = CHAR_X;
  layer.hline(x - 1, ground, 16, [24, 36, 32]);

  layer.rect(x + 1, foot - 6, 3, 5, PANTS);
  layer.rect(x + 6, foot - 5, 3, 4, PANTS);
  layer.rect(x, foot - 2, 4, 2, SHOE);
  layer.rect(x + 5, foot - 2, 4, 2, SHOE);

  layer.rect(x, foot - 15, 11, 10, COAT);
  layer.vline(x, foot - 15, 10, COAT_DARK);
  layer.hline(x - 4, foot - 11, 4, COAT);
  layer.set(x - 5, foot - 11, SKIN);

  layer.rect(x + 2, foot - 22, 8, 7, SKIN);
  layer.rect(x + 2, foot - 24, 8, 3, HAIR);
  layer.rect(x + 1, foot - 22, 2, 4, HAIR);
  const blink = (frame >> 4) % 18 === 0;
  if (!blink) {
    layer.set(x + 3, foot - 20, EYE);
    layer.set(x + 6, foot - 20, EYE);
  }

  if (rainAmt > 0.45) {
    const uy = foot - 31;
    layer.vline(x + 14, uy, foot - uy - 1, UMB_POLE);
    layer.hline(x - 1, uy, 20, UMB_DARK);
    layer.hline(x - 3, uy + 1, 24, UMBRELLA);
    layer.hline(x - 4, uy + 2, 26, UMBRELLA);
    layer.hline(x - 3, uy + 3, 24, UMB_LITE);
    layer.hline(x - 1, uy + 4, 20, UMB_DARK);
  }
}

function drawTree(layer: Layer): { wireFrom: [number, number]; wireTo: [number, number] } {
  const ground = groundAt(TREE_X + 2);
  layer.rect(TREE_X, ground - 32, 5, 32, TREE);
  layer.vline(TREE_X + 4, ground - 32, 32, TREE_LITE);
  line(layer, TREE_X + 2, ground - 26, TREE_X - 22, ground - 44, TREE);
  line(layer, TREE_X + 2, ground - 25, TREE_X - 22, ground - 43, TREE_LITE);
  line(layer, TREE_X + 3, ground - 20, TREE_X + 20, ground - 40, TREE);
  line(layer, TREE_X + 3, ground - 19, TREE_X + 20, ground - 39, TREE_LITE);
  line(layer, TREE_X - 12, ground - 38, TREE_X - 22, ground - 34, TREE);
  line(layer, TREE_X + 10, ground - 34, TREE_X + 18, ground - 30, TREE);
  line(layer, TREE_X - 16, ground - 42, TREE_X - 8, ground - 48, TREE);
  // A small bird on the right branch.
  const bx = TREE_X + 14;
  const by = ground - 40;
  layer.set(bx, by, HAIR);
  layer.set(bx + 1, by, HAIR);
  layer.set(bx + 2, by, HAIR);
  layer.set(bx + 3, by - 1, KNOB);
  layer.set(bx + 1, by + 1, TREE);
  return {
    wireFrom: [HOUSE_X + HOUSE_W - 2, groundAt(HOUSE_X + HOUSE_W) - 34],
    wireTo: [TREE_X - 16, ground - 42],
  };
}

function drawLanterns(
  layer: Layer,
  from: [number, number],
  to: [number, number],
  frame: number,
): void {
  line(layer, from[0], from[1], to[0], to[1], [64, 52, 44]);
  for (const t of [0.28, 0.52, 0.76]) {
    const x = Math.round(from[0] + (to[0] - from[0]) * t);
    const y = Math.round(from[1] + (to[1] - from[1]) * t);
    const dim = ((frame >> 4) + x) % 11 === 0;
    layer.vline(x + 1, y, 3, TREE);
    layer.rect(x, y + 3, 4, 5, dim ? LANTERN_DIM : LANTERN);
    if (!dim) {
      layer.set(x + 1, y + 4, WIN_HOT);
      layer.set(x + 2, y + 5, WIN);
    }
  }
}

function drawStones(layer: Layer): void {
  for (const x of [186, 194, 201]) {
    const y = groundAt(x);
    layer.hline(x, y, 4, STONE, 2);
    layer.set(x + 1, y - 1, STONE_LITE, 2);
  }
}

function drawFalls(layer: Layer, frame: number): void {
  for (let x = 26; x <= 40; x++) {
    const shift = (frame * (1 + (x & 1)) + x * 3) >> 0;
    const top = WATER_TOP - 1;
    for (let y = top; y < 176; y++) {
      const band = (y + shift) % 6;
      if (band > 2) continue;
      const c: RGB = band === 0 || (x + y) % 4 === 0 ? FALL_HI : FALL;
      layer.set(x, y, c, 4);
    }
  }
  for (let y = 158; y < 176; y++) {
    for (let x = 22; x < 50; x++) {
      if (hash(x, y) % 5 !== 0) continue;
      layer.set(x, y, MIST, 4);
    }
  }
}

function drawDrips(layer: Layer, frame: number): void {
  const xs = [48, 72, 118, 178, 224, 262, 296];
  for (let i = 0; i < xs.length; i++) {
    const x = xs[i] ?? 0;
    const cycle = 32;
    const t = (frame + i * 9) % cycle;
    const len = Math.floor((t / cycle) * 12);
    const y0 = rockBottom(x);
    for (let k = 0; k < len; k++) {
      layer.set(x, y0 + k, k > len - 2 ? FALL_HI : FALL, 4);
    }
    if (t > cycle - 6) {
      layer.set(x, y0 + len + (t - (cycle - 6)) * 2, FALL_HI, 4);
    }
  }
}

function drawMarker(layer: Layer, x: number, y: number, frame: number): void {
  const bob = (frame >> 4) & 1;
  const yy = y - bob;
  layer.set(x, yy, GOLD, 4);
  layer.set(x - 1, yy + 1, GOLD, 4);
  layer.set(x + 1, yy + 1, GOLD, 4);
  layer.set(x, yy + 2, GOLD, 4);
  layer.set(x, yy + 1, [255, 236, 190], 4);
}

function drawCone(buf: Pix, ox: number, oy: number, x: number, y: number, h: number, spread: number, frame: number): void {
  for (let i = 0; i < h; i++) {
    const w = Math.max(1, Math.floor((i / h) * spread));
    for (let dx = -w; dx <= w; dx++) {
      if (hash(x + dx, y + i + (frame >> 3)) % 4 !== 0) continue;
      buf.set(ox + x + dx, oy + y + i, i < 4 ? LAMP_GLOW : [255, 170, 80]);
    }
  }
}

export class IslandScene {
  private ctx: CanvasRenderingContext2D;
  private raf = 0;
  private frame = 0;
  private running = false;
  private layout: Layout = {
    bw: DESIGN_W,
    bh: DESIGN_H,
    ox: 0,
    oy: 0,
    cssLeft: 0,
    cssTop: 0,
    cssW: DESIGN_W,
    cssH: DESIGN_H,
  };
  private buf: Pix | null = null;
  private mask = new Uint8Array(DESIGN_W * DESIGN_H);
  private drops: Drop[] = [];
  private smoke: Puff[] = [];
  private chimneyX = 180;
  private chimneyY = 46;
  private fireY = 80;
  private lastKey = '';
  onTime: ((period: Period, label: string, sky: string) => void) | null = null;

  redraw(): void {
    this.render();
  }

  constructor(
    private canvas: HTMLCanvasElement,
    private reduced: boolean,
  ) {
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) throw new Error('2D canvas is unavailable');
    this.ctx = ctx;
  }

  metrics(): Metrics {
    return { bw: this.layout.bw, bh: this.layout.bh, ox: this.layout.ox, oy: this.layout.oy };
  }

  start(): void {
    this.resize();
    if (this.reduced || this.running) return;
    this.running = true;
    const loop = () => {
      this.frame += 1;
      this.render();
      if (this.running) this.raf = requestAnimationFrame(loop);
    };
    this.raf = requestAnimationFrame(loop);
  }

  stop(): void {
    this.running = false;
    cancelAnimationFrame(this.raf);
  }

  resize(): void {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    this.layout = computeLayout(vw, vh);
    const stage = this.canvas.parentElement;
    if (stage) {
      stage.style.left = `${this.layout.cssLeft}px`;
      stage.style.top = `${this.layout.cssTop}px`;
      stage.style.width = `${this.layout.cssW}px`;
      stage.style.height = `${this.layout.cssH}px`;
    }
    if (!this.buf || this.buf.w !== this.layout.bw || this.buf.h !== this.layout.bh) {
      this.buf = new Pix(this.layout.bw, this.layout.bh);
      this.canvas.width = this.layout.bw;
      this.canvas.height = this.layout.bh;
      this.seedDrops();
    }
    this.render();
  }

  private seedDrops(): void {
    const { bw, bh } = this.layout;
    const rng = mulberry32(11);
    const count = Math.max(48, Math.min(160, Math.floor((bw * bh) / 420)));
    this.drops = [];
    for (let i = 0; i < count; i++) {
      this.drops.push({
        x: rng() * bw,
        y: rng() * bh,
        s: 0.45 + rng() * 0.9,
        len: 2 + ((rng() * 3) | 0),
      });
    }
  }

  private render(): void {
    const buf = this.buf;
    if (!buf) return;
    const sample = sampleNow();
    applyPalette(sample.palette);
    const key = `${sample.period}:${sample.skyCss}`;
    if (key !== this.lastKey) {
      this.lastKey = key;
      this.onTime?.(sample.period, sample.label, sample.skyCss);
    }
    const { bw, bh, ox, oy } = this.layout;
    const groundBuf = oy + 104;

    for (let y = 0; y < bh; y++) {
      const base = skyAt(y, groundBuf, bh);
      for (let x = 0; x < bw; x++) {
        const j = (hash(x, y) & 3) - 1;
        buf.set(x, y, [base[0] + j, base[1] + j, base[2] + j]);
      }
    }

    const rng = mulberry32(99);
    const stars = Math.floor(((bw * bh) / 220) * starAmt);
    for (let i = 0; i < stars; i++) {
      const x = (rng() * bw) | 0;
      const y = (rng() * Math.max(8, groundBuf - 6)) | 0;
      if (!this.reduced && hash(x, y) % 48 === this.frame % 48) continue;
      if (rng() > 0.86) {
        buf.set(x, y, STAR);
        buf.set(x - 1, y, STAR_DIM);
        buf.set(x + 1, y, STAR_DIM);
        buf.set(x, y - 1, STAR_DIM);
        buf.set(x, y + 1, STAR_DIM);
      } else {
        buf.set(x, y, rng() > 0.5 ? STAR : STAR_DIM);
      }
    }

    if (celestial === 'sun') drawSun(buf, ox + Math.round(sunAtX), oy + Math.round(sunAtY));
    else drawMoon(buf, ox + 246, oy + 26);
    cloud(buf, ox + 214, oy + 16, 34, 7);
    cloud(buf, ox + 18, oy + 28, 40, 8);
    cloud(buf, ox + 96, oy + 14, 26, 6);
    cloud(buf, ox + 286, oy + 40, 22, 6);
    if (ox > 24) {
      cloud(buf, Math.floor(ox * 0.28), oy + 22, 30, 7);
    }
    if (bw - (ox + DESIGN_W) > 24) {
      cloud(buf, ox + DESIGN_W + 12, oy + 30, 28, 7);
    }

    drawHills(buf, groundBuf);
    if (lampLit > 0.5) {
      const lampGround = groundAt(LAMP_X);
      drawCone(buf, ox, oy, LAMP_X, lampGround - 24, 22, 14, this.frame);
    }

    this.mask.fill(0);
    const layer = new Layer(buf, ox, oy, this.mask);
    drawIsland(layer);
    drawCrystals(layer);
    drawFossil(layer);
    drawVines(layer);

    const chimney = drawHouse(layer, this.frame);
    this.chimneyX = chimney.chimneyX;
    this.chimneyY = chimney.chimneyY;
    drawLamp(layer, this.frame);
    drawDock(layer);
    drawMailbox(layer);
    drawOrbs(layer, this.reduced ? 0 : this.frame);
    drawReeds(layer);
    this.fireY = drawFire(layer, this.reduced ? 2 : this.frame);
    const wire = drawTree(layer);
    drawLanterns(layer, wire.wireFrom, wire.wireTo, this.frame);
    drawCharacter(layer, this.reduced ? 0 : this.frame);
    drawStones(layer);
    drawFalls(layer, this.reduced ? 3 : this.frame);
    drawDrips(layer, this.reduced ? 8 : this.frame);
    this.tickSmoke();
    this.drawSmoke(layer);
    drawMarker(layer, HOUSE_X + 32, groundAt(HOUSE_X) - 58, this.frame);
    drawMarker(layer, FIRE_X + 6, groundAt(FIRE_X) - 28, this.frame);
    drawMarker(layer, MAIL_X + 4, groundAt(MAIL_X) - 26, this.frame);

    if (rainAmt > 0.45) this.drawRain(buf);
    this.ctx.putImageData(buf.img, 0, 0);
  }

  private tickSmoke(): void {
    if (this.reduced) {
      if (this.smoke.length === 0) {
        for (let i = 0; i < 5; i++) {
          this.smoke.push({ x: this.chimneyX + (i % 2), y: this.chimneyY - i * 3, life: 10 + i * 8, warm: false });
        }
      }
      return;
    }
    if (this.frame % 8 === 0) {
      this.smoke.push({ x: this.chimneyX, y: this.chimneyY, life: 0, warm: false });
    }
    if (this.frame % 12 === 0) {
      this.smoke.push({ x: FIRE_X + 6, y: this.fireY, life: 0, warm: true });
    }
    for (const puff of this.smoke) {
      puff.life += 1;
      puff.y -= 0.28;
      puff.x += Math.sin((this.frame + puff.life) / 10) * 0.12;
    }
    if (this.smoke.length > 40) this.smoke.splice(0, this.smoke.length - 40);
    this.smoke = this.smoke.filter((puff) => puff.life < 64);
  }

  private drawSmoke(layer: Layer): void {
    for (const puff of this.smoke) {
      const t = puff.life / 64;
      if (t > 0.92) continue;
      const c = puff.warm ? mix(SMOKE_WARM, SMOKE, t) : mix(SMOKE, SMOKE_LITE, t);
      const x = Math.round(puff.x);
      const y = Math.round(puff.y);
      layer.set(x, y, c);
      if (t < 0.45) {
        layer.set(x + 1, y, c);
        layer.set(x, y + 1, c);
      }
    }
  }

  private drawRain(buf: Pix): void {
    const { bw, bh } = this.layout;
    for (const drop of this.drops) {
      if (!this.reduced) {
        drop.y += drop.s;
        drop.x -= 0.18;
        if (drop.y > bh + 2) {
          drop.y = -drop.len;
          drop.x = (hash((drop.x * 10) | 0, this.frame) % Math.max(1, bw));
        }
        if (drop.x < -2) drop.x += bw;
      }
      const x = drop.x | 0;
      const y = drop.y | 0;
      for (let i = 0; i < drop.len; i++) {
        buf.set(x - (i >> 1), y + i, i === 0 ? RAIN_HI : RAIN);
      }
    }
  }
}
