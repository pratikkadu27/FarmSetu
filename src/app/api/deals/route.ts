import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Deal from '@/models/Deal';

export async function GET() {
  try {
    await connectDB();
    const deals = await Deal.find({}).sort({ createdAt: -1 });
    return NextResponse.json(deals);
  } catch (error: any) {
    console.error('MONGO GET ERROR:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    const deal = await Deal.create(body);
    return NextResponse.json(deal);
  } catch (error: any) {
    console.error('MONGO POST ERROR:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
