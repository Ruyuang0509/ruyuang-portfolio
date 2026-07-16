export const clamp = (value, min = 0, max = 1) =>
  Math.min(max, Math.max(min, Number.isFinite(value) ? value : min));

export const mapLinear = (value, outputMin, outputMax) => {
  const normalized = clamp(value);
  return outputMin + (outputMax - outputMin) * normalized;
};

export const mapLogarithmic = (value, outputAtTop, outputAtBottom) => {
  const normalized = clamp(value);
  return outputAtTop * Math.pow(outputAtBottom / outputAtTop, normalized);
};

export const normalizePointerSpeed = (pixelsPerMillisecond) =>
  clamp(pixelsPerMillisecond / 1.2);

export const getSoundParameters = ({ x = 0.5, y = 0.5, speed = 0, size = 0.5 } = {}) => ({
  pan: mapLinear(x, -0.85, 0.85),
  frequency: mapLogarithmic(y, 660, 110),
  filterFrequency: mapLinear(speed, 700, 5000),
  voiceGain: mapLinear(size, 0.04, 0.12),
});