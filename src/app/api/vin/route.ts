import { NextResponse } from "next/server";
import { decodeVinBasics, normaliseVin, VIN_PATTERN, type VinResult } from "@/lib/vin";

/*
 * Free VIN decoder.
 * The browser only ever talks to this route. The VIN is validated here before
 * anything is sent to the public NHTSA vPIC database, so no user input can
 * change the address we call, and no third party script runs on the page.
 */

const clean = (value: unknown): string | undefined => {
  if (typeof value !== "string") return undefined;
  const text = value.replace(/[<>]/g, "").trim().slice(0, 80);
  return text && text !== "Not Applicable" && text !== "0" ? text : undefined;
};

export async function GET(request: Request) {
  const vin = normaliseVin(new URL(request.url).searchParams.get("vin") ?? "");

  if (!VIN_PATTERN.test(vin)) {
    return NextResponse.json(
      { error: "Please enter a valid 17 character VIN. A VIN never contains the letters I, O or Q." },
      { status: 400, headers: { "Cache-Control": "no-store" } },
    );
  }

  const result: VinResult = decodeVinBasics(vin);

  try {
    const response = await fetch(`https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVinValues/${vin}?format=json`, {
      signal: AbortSignal.timeout(7000),
      headers: { Accept: "application/json" },
      next: { revalidate: 86400 },
    });

    if (response.ok) {
      const data: unknown = await response.json();
      const row = (data as { Results?: Record<string, unknown>[] })?.Results?.[0];

      if (row && (clean(row.Make) || clean(row.Model))) {
        const litres = clean(row.DisplacementL);
        const cylinders = clean(row.EngineCylinders);
        const power = clean(row.EngineHP);
        const engine = [
          litres && `${Number(litres).toFixed(1)}L`,
          cylinders && `${cylinders} cylinder`,
          clean(row.EngineModel),
          power && `${Math.round(Number(power))} hp`,
        ]
          .filter(Boolean)
          .join(", ");

        result.source = "full";
        result.year = clean(row.ModelYear) ?? result.year;
        result.make = clean(row.Make) ?? result.make;
        result.model = clean(row.Model);
        result.trim = clean(row.Trim) ?? clean(row.Series);
        result.bodyClass = clean(row.BodyClass);
        result.engine = engine || undefined;
        result.fuel = clean(row.FuelTypePrimary);
        result.transmission = clean(row.TransmissionStyle);
        result.driveType = clean(row.DriveType);
        result.manufacturer = clean(row.Manufacturer);
        result.builtIn = clean(row.PlantCountry) ?? result.builtIn;
      }
    }
  } catch {
    // The specification database did not answer. The basic decode is still returned.
  }

  return NextResponse.json(result, {
    headers: { "Cache-Control": "public, max-age=3600, s-maxage=86400" },
  });
}
