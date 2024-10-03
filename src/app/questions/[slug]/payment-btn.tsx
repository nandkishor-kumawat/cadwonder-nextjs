"use client";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import Script from "next/script";
import { useSession } from "@/hooks";

const PaymentBtn = ({ questionId, amount }: { questionId: string; amount: number }) => {
    const router = useRouter();
    const pathname = usePathname();
    const [loading, setLoading] = React.useState(false);
    const { session } = useSession();

    const processPayment = async () => {
        setLoading(true);
        if (!session) {
            router.push(`/login?callbackUrl=${pathname}`);
            return;
        }
        try {
            const response = await fetch('/api/order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount: +amount,
                    currency: 'INR',
                    receipt: 'receipt#1',
                    questionId
                }),
            });

            const data = await response.json();
            if (data.error) {
                alert(data.error);
                return;
            }

            const { orderId, amount: orderAmount, currency } = data;

            // Initialize Razorpay checkout
            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Use the key from Razorpay dashboard
                amount: orderAmount,
                currency,
                name: 'CadWonder',
                description: 'Test Transaction',
                order_id: orderId, // The order id from Razorpay
                handler: async (response: any) => {

                    const res = await fetch('/api/verify', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            orderId: response.razorpay_order_id,
                            paymentId: response.razorpay_payment_id,
                            signature: response.razorpay_signature,
                        }),
                    });

                    if (res.ok) {
                        alert('Payment successful');
                        router.refresh();
                    }
                },
                prefill: {
                    name: 'Test User',
                    email: 'test@example.com',
                    contact: '9999999999',
                },
                theme: {
                    color: '#F37254',
                },
            };

            const paymentObject = new (window as any).Razorpay(options);


            paymentObject.on("payment.failed", function (response: any) {
                alert(response.error.description);
            });

            setLoading(false);
            paymentObject.open();
        } catch (error) {
            setLoading(false);
            alert('An error occurred. Please try again later.');
            console.error(error);
        }
    };

    return (
        <>
            <Script
                id="razorpay-checkout-js"
                src="https://checkout.razorpay.com/v1/checkout.js"
            />

            <Button
                className="rounded-none py-1 my-3 h-8 bg-orange-400 hover:bg-orange-500"
                onClick={processPayment}
            >
                {loading ? "Processing..." : "Pay ₹" + amount}
            </Button>
        </>
    );
}

export default PaymentBtn;