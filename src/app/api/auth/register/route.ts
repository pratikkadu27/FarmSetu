import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';

export async function POST(req: Request) {
  try {
    await connectDB();
    const { name, email, phone, city, password } = await req.json();

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: 'User already exists' }, { status: 400 });
    }

    // Create new user (using plain text password for now as per minimal requirements, but in production use bcrypt)
    const newUser = await User.create({
      name,
      email,
      phone,
      city,
      password,
      status: 'pending',
      role: 'user'
    });

    return NextResponse.json({ message: 'User registered successfully', user: { id: newUser._id, name: newUser.name } }, { status: 201 });
  } catch (error: any) {
    console.error('Registration Error:', error);
    return NextResponse.json({ error: 'Failed to register user' }, { status: 500 });
  }
}
