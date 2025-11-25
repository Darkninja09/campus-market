
import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../lib/db';
import { users } from '../../models/schema';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
import { signToken } from '../../lib/auth';

export async function POST(req: NextRequest) {
  const { name, email, password } = await req.json();

  if (!name || !email || !password) {
    return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
  }

  try {
    const userExists = await db.select().from(users).where(eq(users.email, email));
    if (userExists.length > 0) {
      return NextResponse.json({ message: 'User already exists' }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.insert(users).values({ name, email, password: hashedPassword });

    const newUser = await db.select().from(users).where(eq(users.email, email));
    
    const token = signToken({ id: newUser[0].id });
    
    const response = NextResponse.json({ message: 'User created successfully', user: { id: newUser[0].id, name: newUser[0].name, email: newUser[0].email } }, { status: 201 });
    response.cookies.set('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60, // 1 hour
      path: '/',
    });

    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
