import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Founder from '@/models/Founder';

// GET all founders
export async function GET() {
  try {
    await connectDB();
    const founders = await Founder.find({}).sort({ createdAt: 1 });
    return NextResponse.json(founders);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST new founder
export async function POST(req: Request) {
  try {
    await connectDB();
    const data = await req.json();
    const founder = await Founder.create(data);
    return NextResponse.json(founder, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
