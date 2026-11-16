/** VIN helpers shared by the browser and the server. A VIN never contains I, O or Q. */

export const VIN_PATTERN = /^[A-HJ-NPR-Z0-9]{17}$/;

export function normaliseVin(input: string): string {
  return input.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 17);
}

export type VinResult = {
  vin: string;
  year?: string;
  make?: string;
  model?: string;
  trim?: string;
  bodyClass?: string;
  engine?: string;
  fuel?: string;
  transmission?: string;
  driveType?: string;
  manufacturer?: string;
  builtIn?: string;
  /** "full" when the specification database answered, "basic" when only the VIN itself was decoded */
  source: "full" | "basic";
};

const YEAR_CODES = "ABCDEFGHJKLMNPRSTVWXY123456789";

// World manufacturer identifiers for the brands we see most often.
const MAKES: [prefix: string, make: string][] = [
  ["WDB", "Mercedes-Benz"],
  ["WDC", "Mercedes-Benz"],
  ["WDD", "Mercedes-Benz"],
  ["WDF", "Mercedes-Benz"],
  ["W1K", "Mercedes-Benz"],
  ["W1N", "Mercedes-Benz"],
  ["W1V", "Mercedes-Benz"],
  ["4JG", "Mercedes-Benz"],
  ["55S", "Mercedes-Benz"],
  ["WMX", "Mercedes-AMG"],
  ["SAL", "Land Rover"],
  ["SCA", "Rolls-Royce"],
  ["SCB", "Bentley"],
  ["SCF", "Aston Martin"],
  ["SBM", "McLaren"],
  ["SAJ", "Jaguar"],
  ["WP0", "Porsche"],
  ["WP1", "Porsche"],
  ["WBA", "BMW"],
  ["WBS", "BMW M"],
  ["WBX", "BMW"],
  ["5UX", "BMW"],
  ["WAU", "Audi"],
  ["WA1", "Audi"],
  ["WVW", "Volkswagen"],
  ["WVG", "Volkswagen"],
  ["ZFF", "Ferrari"],
  ["ZHW", "Lamborghini"],
  ["ZPB", "Lamborghini"],
  ["ZAM", "Maserati"],
  ["ZN6", "Maserati"],
  ["VF9", "Bugatti"],
  ["JTH", "Lexus"],
  ["JTJ", "Lexus"],
  ["2T2", "Lexus"],
  ["JT", "Toyota"],
  ["4T", "Toyota"],
  ["5T", "Toyota"],
  ["JH", "Honda"],
  ["1HG", "Honda"],
  ["JN", "Nissan"],
  ["KMH", "Hyundai"],
  ["KNA", "Kia"],
  ["1F", "Ford"],
  ["1G", "General Motors"],
  ["5YJ", "Tesla"],
];

const REGIONS: [chars: string, region: string][] = [
  ["12345", "North America"],
  ["67", "Oceania"],
  ["89", "South America"],
  ["ABCDEFGH", "Africa"],
  ["JKLMNPR", "Asia"],
  ["STUVWXYZ", "Europe"],
];

const COUNTRIES: [prefix: string, country: string][] = [
  ["W", "Germany"],
  ["SA", "United Kingdom"],
  ["SB", "United Kingdom"],
  ["SC", "United Kingdom"],
  ["ZA", "Italy"],
  ["ZF", "Italy"],
  ["ZH", "Italy"],
  ["ZN", "Italy"],
  ["ZP", "Italy"],
  ["VF", "France"],
  ["J", "Japan"],
  ["KM", "South Korea"],
  ["KN", "South Korea"],
  ["1", "United States"],
  ["4", "United States"],
  ["5", "United States"],
  ["2", "Canada"],
  ["3", "Mexico"],
];

/** Decodes what the VIN itself reveals: maker, where it was built and the model year. */
export function decodeVinBasics(vin: string): VinResult {
  const make = MAKES.find(([prefix]) => vin.startsWith(prefix))?.[1];
  const country = COUNTRIES.find(([prefix]) => vin.startsWith(prefix))?.[1];
  const region = REGIONS.find(([chars]) => chars.includes(vin[0]))?.[1];

  // The 10th character repeats every 30 years. A letter in position 7 marks 2010 onwards.
  const yearIndex = YEAR_CODES.indexOf(vin[9]);
  let year: string | undefined;
  if (yearIndex >= 0) {
    const modern = /[A-Z]/.test(vin[6]);
    let value = (modern ? 2010 : 1980) + yearIndex;
    const nextYear = new Date().getFullYear() + 1;
    if (value > nextYear) value -= 30;
    year = String(value);
  }

  return { vin, make, year, builtIn: country ?? region, source: "basic" };
}
