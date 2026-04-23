import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';

export async function GET() {
  try {
    await connectDB();
    
    // Check if admin exists
    const adminExists = await User.findOne({ email: 'admin@farmsetu.com' });
    
    if (!adminExists) {
      await User.create({
        name: 'Admin User',
        email: 'admin@farmsetu.com',
        password: 'admin123',
        role: 'admin',
        status: 'active',
        city: 'System'
      });
      return NextResponse.json({ message: 'Admin user created successfully' });
    }
    
    return NextResponse.json({ message: 'Admin user already exists' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
