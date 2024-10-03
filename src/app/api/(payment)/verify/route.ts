import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import prisma from '@/lib/prisma';


const verifySignature = (orderId: string, paymentId: string, signature: string) => {
    const razorpaySignature = process.env.RAZORPAY_SECRET;
    if (!razorpaySignature) {
        throw new Error('Razorpay secret key is not defined');
    }
    const hmac = crypto.createHmac('sha256', razorpaySignature);
    hmac.update(`${orderId}|${paymentId}`);
    const generatedSignature = hmac.digest('hex');
    return signature === generatedSignature;
}


export async function POST(request: NextRequest) {
    const { orderId, paymentId, signature } = await request.json();

    const isVerified = verifySignature(orderId, paymentId, signature);
    if (!isVerified) {
        return NextResponse.json(
            { message: 'payment verification failed', isOk: false },
            { status: 400 }
        );
    }

    await prisma.transaction.update({
        where: {
            orderId: orderId,
        },
        data: {
            paymentId: paymentId,
            status: 'SUCCESS',
            signature: signature,
        },
    });
    return NextResponse.json(
        { message: 'payment verified successfully', isOk: true },
        { status: 200 }
    );
}