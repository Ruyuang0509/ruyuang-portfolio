import test from "node:test";
import assert from "node:assert/strict";
import {
  clamp,
  getSoundParameters,
  mapLinear,
  mapLogarithmic,
  normalizePointerSpeed,
} from "../src/audio/soundMapping.js";

test("clamp contains invalid and out-of-range input", () => {
  assert.equal(clamp(-2), 0);
  assert.equal(clamp(2), 1);
  assert.equal(clamp(Number.NaN), 0);
});

test("linear mapping preserves declared boundaries", () => {
  assert.equal(mapLinear(0, -0.85, 0.85), -0.85);
  assert.equal(mapLinear(1, -0.85, 0.85), 0.85);
});

test("pitch mapping is logarithmic and descends from top to bottom", () => {
  assert.equal(mapLogarithmic(0, 660, 110), 660);
  assert.equal(mapLogarithmic(1, 660, 110), 110);
  const midpoint = mapLogarithmic(0.5, 660, 110);
  assert.ok(midpoint < 660 && midpoint > 110);
});

test("pointer speed is normalized and capped", () => {
  assert.equal(normalizePointerSpeed(0), 0);
  assert.equal(normalizePointerSpeed(1.2), 1);
  assert.equal(normalizePointerSpeed(4), 1);
});

test("sound parameter mapping remains inside safety ranges", () => {
  const low = getSoundParameters({ x: -4, y: -2, speed: -1, size: -5 });
  const high = getSoundParameters({ x: 4, y: 2, speed: 5, size: 3 });
  assert.deepEqual(low, { pan: -0.85, frequency: 660, filterFrequency: 700, voiceGain: 0.04 });
  assert.deepEqual(high, { pan: 0.85, frequency: 110, filterFrequency: 5000, voiceGain: 0.12 });
});