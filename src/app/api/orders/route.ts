import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Order from '@/models/Order';
import Deal from '@/models/Deal';

// POST a new order
export async function POST(req: Request) {
  try {
    await connectDB();
    const data = await req.json();
    const { dealId, userId, userName, userEmail, userCity, quantity, totalAmount } = data;

    const newOrder = await Order.create({
      dealId,
      userId,
      userName,
      userEmail,
      userCity,
      quantity,
      totalAmount,
      status: 'pending'
    });

    // Update Deal's currentAmount
    await Deal.findByIdAndUpdate(dealId, {
      $inc: { currentAmount: quantity }
    });

    return NextResponse.json(newOrder, { status: 201 });
  } catch (error: any) {
    console.error('Order Error:', error);
    return NextResponse.json({ error: 'Failed to place order' }, { status: 500 });
  }
}

// GET orders for a specific user
export async function GET(req: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');
    const dealId = searchParams.get('dealId');

    let query: any = {};
    if (userId) query.userId = userId;
    if (dealId) query.dealId = dealId;

    const orders = await Order.find(query).populate('dealId').sort({ createdAt: -1 });
    return NextResponse.json(orders);
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
  }
}
