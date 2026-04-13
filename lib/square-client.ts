import { SquareClient, SquareEnvironment } from "square";

/** Raw process.env values + resolved Square credentials (for diagnostics only). */
export function getSquareCheckoutDebugSnapshot(): {
  env: {
    SQUARE_LOCATION_ID: string | null;
    SQUARE_SANDBOX_LOCATION_ID: string | null;
    SQUARE_PRODUCTION_LOCATION_ID: string | null;
    SQUARE_ENVIRONMENT: string | null;
    SQUARE_ACCESS_TOKEN: string | null;
    SQUARE_SANDBOX_ACCESS_TOKEN: string | null;
    SQUARE_PRODUCTION_ACCESS_TOKEN: string | null;
  };
  resolvedLocationId: string | null;
  resolvedAccessToken: string | null;
} {
  return {
    env: {
      SQUARE_LOCATION_ID: process.env.SQUARE_LOCATION_ID ?? null,
      SQUARE_SANDBOX_LOCATION_ID: process.env.SQUARE_SANDBOX_LOCATION_ID ?? null,
      SQUARE_PRODUCTION_LOCATION_ID: process.env.SQUARE_PRODUCTION_LOCATION_ID ?? null,
      SQUARE_ENVIRONMENT: process.env.SQUARE_ENVIRONMENT ?? null,
      SQUARE_ACCESS_TOKEN: process.env.SQUARE_ACCESS_TOKEN ?? null,
      SQUARE_SANDBOX_ACCESS_TOKEN: process.env.SQUARE_SANDBOX_ACCESS_TOKEN ?? null,
      SQUARE_PRODUCTION_ACCESS_TOKEN:
        process.env.SQUARE_PRODUCTION_ACCESS_TOKEN ?? null,
    },
    resolvedLocationId: getSquareLocationId(),
    resolvedAccessToken: getSquareAccessToken() ?? null,
  };
}

function getSquareAccessToken(): string | undefined {
  const direct = process.env.SQUARE_ACCESS_TOKEN?.trim();
  if (direct) return direct;
  const prod =
    process.env.SQUARE_ENVIRONMENT?.toLowerCase() === "production";
  if (prod) {
    return (
      process.env.SQUARE_PRODUCTION_ACCESS_TOKEN?.trim() ||
      process.env.SQUARE_ACCESS_TOKEN_PRODUCTION?.trim()
    );
  }
  return (
    process.env.SQUARE_SANDBOX_ACCESS_TOKEN?.trim() ||
    process.env.SQUARE_ACCESS_TOKEN_SANDBOX?.trim()
  );
}

export function getSquareClient(): SquareClient | null {
  const token = getSquareAccessToken();
  if (!token) return null;
  const env =
    process.env.SQUARE_ENVIRONMENT?.toLowerCase() === "production"
      ? SquareEnvironment.Production
      : SquareEnvironment.Sandbox;
  return new SquareClient({ token, environment: env });
}

export function getSquareLocationId(): string | null {
  const id =
    process.env.SQUARE_LOCATION_ID?.trim() ||
    process.env.SQUARE_SANDBOX_LOCATION_ID?.trim() ||
    process.env.SQUARE_PRODUCTION_LOCATION_ID?.trim();
  return id || null;
}

export function getOrderDayTz(): string {
  return process.env.ORDER_DAY_TZ?.trim() || "America/Chicago";
}
