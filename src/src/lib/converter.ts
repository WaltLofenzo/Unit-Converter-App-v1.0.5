export const LENGTH_CONVERSION_FACTORS = {
  inches: 1.0,
  feet: 12.0,
  yards: 36.0,
  miles: 63360.0,
  millimeters: 0.0393701,
  centimeters: 0.393701,
  meters: 39.3701,
  kilometers: 39370.1,
} as const;

export const VOLUME_CONVERSION_FACTORS = {
  'teaspoons': 0.166667,
  'tablespoons': 0.5,
  'fluid ounces': 1.0,
  'cups': 8.0,
  'pints': 16.0,
  'quarts': 32.0,
  'gallons': 128.0,
  'milliliters': 0.033814,
  'liters': 33.814,
} as const;

export const WEIGHT_CONVERSION_FACTORS = {
  'ounces': 1.0,
  'pounds': 16.0,
  'grams': 0.035274,
  'kilograms': 35.274,
} as const;

export const TIME_CONVERSION_FACTORS = {
  'seconds': 1.0,
  'minutes': 60.0,
  'hours': 3600.0,
  'days': 86400.0,
  'weeks': 604800.0,
} as const;

export const SPEED_CONVERSION_FACTORS = {
  'meters per second': 1.0,
  'kilometers per hour': 0.277778,
  'miles per hour': 0.44704,
  'feet per second': 0.3048,
  'knots': 0.514444,
} as const;

export type LengthUnit = keyof typeof LENGTH_CONVERSION_FACTORS;
export type VolumeUnit = keyof typeof VOLUME_CONVERSION_FACTORS;
export type TemperatureUnit = 'celsius' | 'fahrenheit' | 'kelvin';
export type WeightUnit = keyof typeof WEIGHT_CONVERSION_FACTORS;
export type TimeUnit = keyof typeof TIME_CONVERSION_FACTORS;
export type SpeedUnit = keyof typeof SPEED_CONVERSION_FACTORS;

export const LENGTH_UNITS: LengthUnit[] = [
  'inches',
  'feet',
  'yards',
  'miles',
  'millimeters',
  'centimeters',
  'meters',
  'kilometers',
];

export const VOLUME_UNITS: VolumeUnit[] = [
  'teaspoons',
  'tablespoons',
  'fluid ounces',
  'cups',
  'pints',
  'quarts',
  'gallons',
  'milliliters',
  'liters',
];

export const TEMPERATURE_UNITS: TemperatureUnit[] = [
  'celsius',
  'fahrenheit',
  'kelvin',
];

export const WEIGHT_UNITS: WeightUnit[] = [
  'ounces',
  'pounds',
  'grams',
  'kilograms',
];

export const TIME_UNITS: TimeUnit[] = [
  'seconds',
  'minutes',
  'hours',
  'days',
  'weeks',
];

export const SPEED_UNITS: SpeedUnit[] = [
  'meters per second',
  'kilometers per hour',
  'miles per hour',
  'feet per second',
  'knots',
];

export function convertLength(
  value: number,
  fromUnit: LengthUnit,
  toUnit: LengthUnit
): number {
  const valueInBase = value * LENGTH_CONVERSION_FACTORS[fromUnit];
  const result = valueInBase / LENGTH_CONVERSION_FACTORS[toUnit];
  return result;
}

export function convertVolume(
  value: number,
  fromUnit: VolumeUnit,
  toUnit: VolumeUnit
): number {
  const valueInBase = value * VOLUME_CONVERSION_FACTORS[fromUnit];
  const result = valueInBase / VOLUME_CONVERSION_FACTORS[toUnit];
  return result;
}

export function convertTemperature(
  value: number,
  fromUnit: TemperatureUnit,
  toUnit: TemperatureUnit
): number {
  if (fromUnit === toUnit) return value;

  let celsius: number;
  
  // Convert to Celsius first
  switch (fromUnit) {
    case 'celsius':
      celsius = value;
      break;
    case 'fahrenheit':
      celsius = (value - 32) * 5 / 9;
      break;
    case 'kelvin':
      celsius = value - 273.15;
      break;
  }

  // Convert from Celsius to target unit
  switch (toUnit) {
    case 'celsius':
      return celsius;
    case 'fahrenheit':
      return (celsius * 9 / 5) + 32;
    case 'kelvin':
      return celsius + 273.15;
  }
}

export function convertWeight(
  value: number,
  fromUnit: WeightUnit,
  toUnit: WeightUnit
): number {
  const valueInBase = value * WEIGHT_CONVERSION_FACTORS[fromUnit];
  const result = valueInBase / WEIGHT_CONVERSION_FACTORS[toUnit];
  return result;
}

export function convertTime(
  value: number,
  fromUnit: TimeUnit,
  toUnit: TimeUnit
): number {
  const valueInBase = value * TIME_CONVERSION_FACTORS[fromUnit];
  const result = valueInBase / TIME_CONVERSION_FACTORS[toUnit];
  return result;
}

export function convertSpeed(
  value: number,
  fromUnit: SpeedUnit,
  toUnit: SpeedUnit
): number {
  const valueInBase = value * SPEED_CONVERSION_FACTORS[fromUnit];
  const result = valueInBase / SPEED_CONVERSION_FACTORS[toUnit];
  return result;
}
