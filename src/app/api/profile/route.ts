
import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../lib/db';
import { users } from '../../models/schema';
import { eq } from 'drizzle-orm';
import { verifyToken } from '../../lib/auth';

export async function GET(req: NextRequest) {
  const token = req.cookies.get('auth_token')?.value;

  if (!token) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const decoded = verifyToken(token);

  if (!decoded) {
    return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
  }

  try {
    const user = await db.select().from(users).where(eq(users.id, decoded.id));

    if (user.length === 0) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ user: user[0] }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const token = req.cookies.get('auth_token')?.value;

  if (!token) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const decoded = verifyToken(token);

  if (!decoded) {
    return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
  }

  const { college } = await req.json();

  try {
    const updatedUser = await db.update(users).set({ college }).where(eq(users.id, decoded.id)).returning();

    return NextResponse.json({ user: updatedUser[0] }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
