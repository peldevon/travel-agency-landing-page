# Payment Gateway Integration Guide

This guide provides comprehensive instructions for integrating **Paystack** and **Flutterwave** payment gateways into your Ontour Travels platform for flight, hotel, shortlet, and tour bookings.

## Table of Contents

1. [Overview](#overview)
2. [Paystack Integration](#paystack-integration)
3. [Flutterwave Integration](#flutterwave-integration)
4. [Backend Implementation](#backend-implementation)
5. [Frontend Integration](#frontend-integration)
6. [Webhook Handling](#webhook-handling)
7. [Testing](#testing)
8. [Security Best Practices](#security-best-practices)
9. [Common Issues & Troubleshooting](#common-issues--troubleshooting)

---

## Overview

### Why Paystack & Flutterwave?

- **Paystack**: Excellent for Nigerian businesses, supports NGN, USD, and major African currencies
- **Flutterwave**: Broader international reach, supports 150+ currencies, mobile money
- Both offer: Secure card payments, bank transfers, USSD, mobile money, recurring payments

### Payment Flow

1. User selects service (flight, hotel, shortlet, tour)
2. User reviews booking details and total price
3. User clicks "Pay Now" → redirected to payment gateway
4. User completes payment on gateway's secure page
5. Gateway redirects back to your site with payment status
6. Webhook confirms payment (server-side verification)
7. Booking is confirmed and user receives email/WhatsApp notification

---

## Paystack Integration

### Step 1: Create Paystack Account

1. Visit [Paystack](https://paystack.com/)
2. Sign up for a business account
3. Complete KYC verification (required to go live)
4. Navigate to Settings → API Keys & Webhooks

### Step 2: Get API Keys

You'll receive:
- **Test Public Key**: `pk_test_xxxxx` (for development)
- **Test Secret Key**: `sk_test_xxxxx` (for development)
- **Live Public Key**: `pk_live_xxxxx` (for production)
- **Live Secret Key**: `sk_live_xxxxx` (for production)

### Step 3: Add to Environment Variables

Add to your `.env` file:

```env
# Paystack Credentials
PAYSTACK_PUBLIC_KEY=pk_test_your_key_here
PAYSTACK_SECRET_KEY=sk_test_your_key_here
PAYSTACK_ENVIRONMENT=test  # Change to 'live' for production
```

### Step 4: Install Paystack SDK

```bash
bun add @paystack/inline-js
# or
npm install @paystack/inline-js
```

### Step 5: Create Paystack Utility

Create `src/lib/paystack.ts`:

```typescript
import axios from 'axios';

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY!;
const PAYSTACK_BASE_URL = 'https://api.paystack.co';

interface InitializePaymentData {
  email: string;
  amount: number;  // Amount in kobo (NGN * 100)
  reference: string;
  callback_url?: string;
  metadata?: Record<string, any>;
  currency?: string;
}

export async function initializePaystackPayment(data: InitializePaymentData) {
  try {
    const response = await axios.post(
      `${PAYSTACK_BASE_URL}/transaction/initialize`,
      data,
      {
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return {
      success: true,
      data: response.data.data,
    };
  } catch (error: any) {
    console.error('Paystack initialization error:', error.response?.data);
    return {
      success: false,
      error: error.response?.data?.message || 'Payment initialization failed',
    };
  }
}

export async function verifyPaystackPayment(reference: string) {
  try {
    const response = await axios.get(
      `${PAYSTACK_BASE_URL}/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
        },
      }
    );

    return {
      success: true,
      data: response.data.data,
    };
  } catch (error: any) {
    console.error('Paystack verification error:', error.response?.data);
    return {
      success: false,
      error: error.response?.data?.message || 'Payment verification failed',
    };
  }
}
```

### Step 6: Create Paystack Initialize API Route

Create `src/app/api/payments/paystack/initialize/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { initializePaystackPayment } from '@/lib/paystack';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, amount, bookingId, bookingType, currency = 'NGN' } = body;

    // Validate inputs
    if (!email || !amount || !bookingId || !bookingType) {
      return NextResponse.json({
        success: false,
        error: 'Missing required fields',
      }, { status: 400 });
    }

    // Generate unique reference
    const reference = `ONT-${Date.now()}-${bookingId}`;

    // Initialize payment
    const result = await initializePaystackPayment({
      email,
      amount: Math.round(amount * 100), // Convert to kobo
      reference,
      callback_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/callback`,
      metadata: {
        bookingId,
        bookingType,  // 'flight', 'hotel', 'shortlet', 'tour'
      },
      currency,
    });

    if (result.success) {
      // Save payment reference to database for tracking
      // await savePaymentReference({ reference, bookingId, amount, gateway: 'paystack' });

      return NextResponse.json({
        success: true,
        authorization_url: result.data.authorization_url,
        access_code: result.data.access_code,
        reference: result.data.reference,
      });
    }

    return NextResponse.json({
      success: false,
      error: result.error,
    }, { status: 500 });

  } catch (error: any) {
    console.error('Payment initialization error:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to initialize payment',
    }, { status: 500 });
  }
}
```

### Step 7: Create Paystack Verify API Route

Create `src/app/api/payments/paystack/verify/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { verifyPaystackPayment } from '@/lib/paystack';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const reference = searchParams.get('reference');

    if (!reference) {
      return NextResponse.json({
        success: false,
        error: 'Payment reference is required',
      }, { status: 400 });
    }

    // Verify payment with Paystack
    const result = await verifyPaystackPayment(reference);

    if (result.success && result.data.status === 'success') {
      // Payment successful - update database
      const { metadata, amount, paid_at } = result.data;
      
      // TODO: Update booking status in database
      // await updateBookingPaymentStatus({
      //   bookingId: metadata.bookingId,
      //   status: 'paid',
      //   amount: amount / 100,
      //   paidAt: paid_at,
      //   reference,
      // });

      // TODO: Send confirmation email/WhatsApp

      return NextResponse.json({
        success: true,
        message: 'Payment verified successfully',
        data: {
          status: result.data.status,
          amount: result.data.amount / 100,
          reference: result.data.reference,
        },
      });
    }

    return NextResponse.json({
      success: false,
      error: 'Payment verification failed',
      status: result.data?.status,
    }, { status: 400 });

  } catch (error: any) {
    console.error('Payment verification error:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to verify payment',
    }, { status: 500 });
  }
}
```

---

## Flutterwave Integration

### Step 1: Create Flutterwave Account

1. Visit [Flutterwave](https://flutterwave.com/)
2. Sign up for a business account
3. Complete KYC verification
4. Navigate to Settings → API Keys

### Step 2: Get API Keys

You'll receive:
- **Test Public Key**: `FLWPUBK_TEST-xxxxx`
- **Test Secret Key**: `FLWSECK_TEST-xxxxx`
- **Live Public Key**: `FLWPUBK-xxxxx`
- **Live Secret Key**: `FLWSECK-xxxxx`
- **Encryption Key**: For securing payment data

### Step 3: Add to Environment Variables

```env
# Flutterwave Credentials
FLUTTERWAVE_PUBLIC_KEY=FLWPUBK_TEST-your_key_here
FLUTTERWAVE_SECRET_KEY=FLWSECK_TEST-your_key_here
FLUTTERWAVE_ENCRYPTION_KEY=your_encryption_key_here
FLUTTERWAVE_ENVIRONMENT=test  # Change to 'live' for production
```

### Step 4: Install Flutterwave SDK

```bash
bun add flutterwave-node-v3
# or
npm install flutterwave-node-v3
```

### Step 5: Create Flutterwave Utility

Create `src/lib/flutterwave.ts`:

```typescript
import Flutterwave from 'flutterwave-node-v3';

const flw = new Flutterwave(
  process.env.FLUTTERWAVE_PUBLIC_KEY!,
  process.env.FLUTTERWAVE_SECRET_KEY!
);

interface InitializePaymentData {
  email: string;
  phone_number: string;
  name: string;
  amount: number;
  tx_ref: string;
  redirect_url?: string;
  currency?: string;
  meta?: Record<string, any>;
}

export async function initializeFlutterwavePayment(data: InitializePaymentData) {
  try {
    const payload = {
      tx_ref: data.tx_ref,
      amount: data.amount,
      currency: data.currency || 'NGN',
      redirect_url: data.redirect_url || `${process.env.NEXT_PUBLIC_BASE_URL}/payment/callback`,
      payment_options: 'card,banktransfer,ussd,mobilemoney',
      customer: {
        email: data.email,
        phone_number: data.phone_number,
        name: data.name,
      },
      customizations: {
        title: 'Ontour Travels',
        description: 'Travel Booking Payment',
        logo: 'https://your-logo-url.com/logo.png',
      },
      meta: data.meta,
    };

    const response = await flw.Charge.card(payload);

    return {
      success: true,
      data: response,
    };
  } catch (error: any) {
    console.error('Flutterwave initialization error:', error);
    return {
      success: false,
      error: error.message || 'Payment initialization failed',
    };
  }
}

export async function verifyFlutterwavePayment(transactionId: string) {
  try {
    const response = await flw.Transaction.verify({ id: transactionId });

    return {
      success: true,
      data: response.data,
    };
  } catch (error: any) {
    console.error('Flutterwave verification error:', error);
    return {
      success: false,
      error: error.message || 'Payment verification failed',
    };
  }
}
```

### Step 6: Create Flutterwave Initialize API Route

Create `src/app/api/payments/flutterwave/initialize/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { initializeFlutterwavePayment } from '@/lib/flutterwave';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, phone, name, amount, bookingId, bookingType, currency = 'NGN' } = body;

    if (!email || !phone || !name || !amount || !bookingId || !bookingType) {
      return NextResponse.json({
        success: false,
        error: 'Missing required fields',
      }, { status: 400 });
    }

    const tx_ref = `ONT-FLW-${Date.now()}-${bookingId}`;

    const result = await initializeFlutterwavePayment({
      email,
      phone_number: phone,
      name,
      amount,
      tx_ref,
      currency,
      redirect_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/callback?gateway=flutterwave`,
      meta: {
        bookingId,
        bookingType,
      },
    });

    if (result.success) {
      return NextResponse.json({
        success: true,
        payment_link: result.data.link,
        tx_ref,
      });
    }

    return NextResponse.json({
      success: false,
      error: result.error,
    }, { status: 500 });

  } catch (error: any) {
    console.error('Flutterwave initialization error:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to initialize payment',
    }, { status: 500 });
  }
}
```

### Step 7: Create Flutterwave Verify API Route

Create `src/app/api/payments/flutterwave/verify/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { verifyFlutterwavePayment } from '@/lib/flutterwave';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const transaction_id = searchParams.get('transaction_id');

    if (!transaction_id) {
      return NextResponse.json({
        success: false,
        error: 'Transaction ID is required',
      }, { status: 400 });
    }

    const result = await verifyFlutterwavePayment(transaction_id);

    if (result.success && result.data.status === 'successful') {
      // Payment successful
      const { meta, amount, created_at } = result.data;
      
      // TODO: Update booking in database
      
      return NextResponse.json({
        success: true,
        message: 'Payment verified successfully',
        data: {
          status: result.data.status,
          amount,
          tx_ref: result.data.tx_ref,
        },
      });
    }

    return NextResponse.json({
      success: false,
      error: 'Payment verification failed',
      status: result.data?.status,
    }, { status: 400 });

  } catch (error: any) {
    console.error('Flutterwave verification error:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to verify payment',
    }, { status: 500 });
  }
}
```

---

## Frontend Integration

### Payment Component

Create `src/components/PaymentButton.tsx`:

```typescript
"use client";

import { useState } from 'react';
import { Button } from '@chakra-ui/react';

interface PaymentButtonProps {
  amount: number;
  email: string;
  phone?: string;
  name?: string;
  bookingId: string;
  bookingType: 'flight' | 'hotel' | 'shortlet' | 'tour';
  currency?: string;
  onSuccess: (reference: string) => void;
  onError: (error: string) => void;
}

export default function PaymentButton({
  amount,
  email,
  phone,
  name,
  bookingId,
  bookingType,
  currency = 'NGN',
  onSuccess,
  onError,
}: PaymentButtonProps) {
  const [loading, setLoading] = useState(false);

  const handlePaystackPayment = async () => {
    setLoading(true);

    try {
      // Initialize payment
      const response = await fetch('/api/payments/paystack/initialize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          amount,
          bookingId,
          bookingType,
          currency,
        }),
      });

      const data = await response.json();

      if (data.success) {
        // Redirect to Paystack payment page
        window.location.href = data.authorization_url;
      } else {
        onError(data.error || 'Payment initialization failed');
      }
    } catch (error) {
      onError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleFlutterwavePayment = async () => {
    setLoading(true);

    try {
      const response = await fetch('/api/payments/flutterwave/initialize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          phone: phone || email,
          name: name || 'Customer',
          amount,
          bookingId,
          bookingType,
          currency,
        }),
      });

      const data = await response.json();

      if (data.success) {
        window.location.href = data.payment_link;
      } else {
        onError(data.error || 'Payment initialization failed');
      }
    } catch (error) {
      onError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        onClick={handlePaystackPayment}
        loading={loading}
        colorPalette="blue"
        size="lg"
        w="full"
      >
        Pay with Paystack
      </Button>

      <Button
        onClick={handleFlutterwavePayment}
        loading={loading}
        colorPalette="green"
        variant="outline"
        size="lg"
        w="full"
        mt={3}
      >
        Pay with Flutterwave
      </Button>
    </>
  );
}
```

### Payment Callback Page

Create `src/app/payment/callback/page.tsx`:

```typescript
"use client";

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Box, Container, Heading, Text, Spinner, Button } from '@chakra-ui/react';

export default function PaymentCallbackPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [verifying, setVerifying] = useState(true);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const verifyPayment = async () => {
      const reference = searchParams.get('reference');  // Paystack
      const transaction_id = searchParams.get('transaction_id');  // Flutterwave
      const gateway = searchParams.get('gateway') || 'paystack';

      if (!reference && !transaction_id) {
        setMessage('Invalid payment reference');
        setVerifying(false);
        return;
      }

      try {
        let endpoint = '';
        if (gateway === 'paystack' && reference) {
          endpoint = `/api/payments/paystack/verify?reference=${reference}`;
        } else if (gateway === 'flutterwave' && transaction_id) {
          endpoint = `/api/payments/flutterwave/verify?transaction_id=${transaction_id}`;
        }

        const response = await fetch(endpoint);
        const data = await response.json();

        if (data.success) {
          setSuccess(true);
          setMessage('Payment successful! Your booking has been confirmed.');
        } else {
          setMessage(data.error || 'Payment verification failed');
        }
      } catch (error) {
        setMessage('An error occurred while verifying payment');
      } finally {
        setVerifying(false);
      }
    };

    verifyPayment();
  }, [searchParams]);

  if (verifying) {
    return (
      <Container maxW="lg" py={20} textAlign="center">
        <Spinner size="xl" color="blue.500" />
        <Heading mt={4}>Verifying Payment...</Heading>
        <Text color="gray.600">Please wait while we confirm your payment.</Text>
      </Container>
    );
  }

  return (
    <Container maxW="lg" py={20} textAlign="center">
      {success ? (
        <>
          <Heading color="green.500">Payment Successful!</Heading>
          <Text mt={4} color="gray.700">{message}</Text>
          <Button mt={6} onClick={() => router.push('/')} colorPalette="blue">
            Go to Homepage
          </Button>
        </>
      ) : (
        <>
          <Heading color="red.500">Payment Failed</Heading>
          <Text mt={4} color="gray.700">{message}</Text>
          <Button mt={6} onClick={() => router.back()} colorPalette="blue">
            Try Again
          </Button>
        </>
      )}
    </Container>
  );
}
```

---

## Webhook Handling

Webhooks provide server-side payment confirmation, which is more secure than relying solely on frontend callbacks.

### Paystack Webhook

Create `src/app/api/webhooks/paystack/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const hash = crypto
      .createHmac('sha512', process.env.PAYSTACK_SECRET_KEY!)
      .update(body)
      .digest('hex');

    const signature = request.headers.get('x-paystack-signature');

    if (hash !== signature) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    const event = JSON.parse(body);

    if (event.event === 'charge.success') {
      const { reference, amount, metadata } = event.data;
      
      // TODO: Update booking status in database
      console.log('Payment successful:', { reference, amount: amount / 100, metadata });

      // TODO: Send confirmation email/WhatsApp
    }

    return NextResponse.json({ status: 'success' });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}
```

### Flutterwave Webhook

Create `src/app/api/webhooks/flutterwave/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const hash = crypto
      .createHmac('sha256', process.env.FLUTTERWAVE_SECRET_KEY!)
      .update(body)
      .digest('hex');

    const signature = request.headers.get('verif-hash');

    if (hash !== signature) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    const event = JSON.parse(body);

    if (event.event === 'charge.completed' && event.data.status === 'successful') {
      const { tx_ref, amount, meta } = event.data;
      
      // TODO: Update booking in database
      console.log('Payment successful:', { tx_ref, amount, meta });

      // TODO: Send confirmation
    }

    return NextResponse.json({ status: 'success' });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}
```

---

## Testing

### Test Cards

**Paystack:**
- Success: `4084084084084081` (any CVV, future expiry)
- Decline: `5060666666666666064`

**Flutterwave:**
- Success: `5531886652142950` (CVV: 564, PIN: 3310, OTP: 12345)
- Decline: `4024007124382271`

### Testing Checklist

- [ ] Initialize payment with valid data
- [ ] Handle payment success
- [ ] Handle payment failure
- [ ] Verify payment on backend
- [ ] Test webhook delivery
- [ ] Test different currencies
- [ ] Test different payment methods

---

## Security Best Practices

1. **Never expose secret keys** in frontend code
2. **Always verify payments** server-side via webhooks
3. **Use HTTPS** for all payment-related endpoints
4. **Validate webhook signatures** to prevent fraud
5. **Log all transactions** for audit trails
6. **Implement rate limiting** on payment endpoints
7. **Store sensitive data encrypted** in database

---

## Common Issues & Troubleshooting

**Issue: Payment initializes but fails immediately**
- Check API keys are correct
- Verify account is active and KYC completed
- Ensure sufficient account balance (for test mode)

**Issue: Webhook not received**
- Verify webhook URL in gateway dashboard
- Check firewall/security settings
- Test webhook with gateway's testing tools

**Issue: Currency conversion errors**
- Verify currency is supported by the gateway
- Check amount formatting (kobo for Paystack)

---

## Next Steps

1. **Database Integration**: Store payment records in your database
2. **Email Notifications**: Send payment receipts
3. **WhatsApp Notifications**: Send payment confirmations
4. **Refund Handling**: Implement refund workflows
5. **Recurring Payments**: For subscription services
6. **Multi-currency**: Support multiple currencies

---

**Need Help?**
- Paystack Docs: https://paystack.com/docs
- Flutterwave Docs: https://developer.flutterwave.com/docs
- Support: Contact payment provider support teams
