import { NextRequest, NextResponse } from "next/server";

const GALLERIES_URL = "https://fester-backend.vercel.app/api/v1/galleries";

async function forward(id: string, init: RequestInit) {
  try {
    const response = await fetch(`${GALLERIES_URL}/${encodeURIComponent(id)}`, {
      ...init,
      headers: {
        Accept: "application/json",
        ...(init.body ? { "Content-Type": "application/json" } : {}),
      },
      signal: AbortSignal.timeout(10000),
      cache: "no-store",
    });
    const body = await response.json().catch(() => null);

    if (!response.ok) {
      return NextResponse.json(
        { success: false, message: body?.message ?? "The gallery service returned an error." },
        { status: response.status },
      );
    }

    return NextResponse.json(body);
  } catch {
    return NextResponse.json(
      { success: false, message: "We could not reach the gallery service. Please try again." },
      { status: 502 },
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const body = await request.text().catch(() => "");
  return forward(id, { method: "PATCH", body });
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  return forward(id, { method: "DELETE" });
}
