import { NextResponse } from "next/server";

const PACKAGES_URL = "https://fester-backend.vercel.app/api/v1/packages";

export async function GET() {
  try {
    const response = await fetch(PACKAGES_URL, {
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(10000),
      cache: "no-store",
    });
    const body = await response.json().catch(() => null);

    if (!response.ok) {
      return NextResponse.json(
        { success: false, message: body?.message ?? "The packages service returned an error." },
        { status: response.status },
      );
    }

    return NextResponse.json(body);
  } catch {
    return NextResponse.json(
      { success: false, message: "We could not reach the packages service. Please try again." },
      { status: 502 },
    );
  }
}
