import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  // Authentication and redirection logic moved from middleware
  // For admin routes, check auth here or in a layout/guard
  return NextResponse.json({ message: "Proxy active" });
}

export async function POST(req: NextRequest) {
  return NextResponse.json({ message: "Proxy active" });
}