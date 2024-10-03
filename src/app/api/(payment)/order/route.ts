import Razorpay from 'razorpay';
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { Status } from '@prisma/client';
import { getAuth } from '@/lib/auth';


interface RequestBody {
    amount: number;
    currency: string;
    receipt: string;
    questionId: string;
}

export async function POST(request: NextRequest) {
    const razorpay = new Razorpay({
        key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY!,
        key_secret: process.env.RAZORPAY_SECRET,
    });
    const { user } = await getAuth();
    const { amount, currency, receipt, questionId } = (await request.json()) as RequestBody;

    var options = {
        amount: amount * 100,
        currency,
        receipt
    };

    const order = await razorpay.orders.create(options);
    console.log(order);

    await prisma.transaction.create({
        data: {
            orderId: order.id,
            amount: +order.amount,
            currency: order.currency,
            status: Status.PENDING,
            receipt: order.receipt,
            userId: user!.id,
            questionId: questionId,
        },
    });

    return NextResponse.json({ orderId: order.id }, { status: 200 });
}