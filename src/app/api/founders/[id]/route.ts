import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Founder from '@/models/Founder';

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const { id } = await params;
    const body = await req.json();
    const founder = await Founder.findByIdAndUpdate(id, body, { new: true });
    if (!founder) return NextResponse.json({ error: 'Founder not found' }, { status: 404 });
    return NextResponse.json(founder);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const { id } = await params;
    const founder = await Founder.findByIdAndDelete(id);
    if (!founder) return NextResponse.json({ error: 'Founder not found' }, { status: 404 });
    return NextResponse.json({ message: 'Founder deleted successfully' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
