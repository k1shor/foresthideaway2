import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

/**
 * On-demand ISR invalidation for admin saves, so an edit shows up on the next
 * request instead of waiting out the 60s revalidate window. Auth is delegated
 * to the backend: the caller's bearer token must pass /api/auth/me there —
 * no separate secret to manage, reuses the existing admin login.
 */
export async function POST(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  if (!authHeader) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  const meRes = await fetch(`${BACKEND_URL}/api/auth/me`, {
    headers: { Authorization: authHeader },
  });
  if (!meRes.ok) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  const body = (await req.json().catch(() => ({}))) as { path?: string };
  revalidatePath(body.path || "/");

  return NextResponse.json({ success: true, data: null });
}
