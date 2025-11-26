import { NextRequest, NextResponse } from 'next/server';
import { removeAuthCookie } from '@/app/lib/auth';

export async function POST(req: NextRequest) {
  try {
    await removeAuthCookie();
    return NextResponse.json({ message: 'Logged out successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'An error occurred during logout' }, { status: 500 });
  }
}
