# Payment Integration Guide
## Paystack & Flutterwave Integration for Ontour Travels

**Last Updated:** November 2024  
**Status:** Ready for Implementation

---

## Table of Contents
1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [Paystack Integration](#paystack-integration)
4. [Flutterwave Integration](#flutterwave-integration)
5. [Implementation Steps](#implementation-steps)
6. [Testing](#testing)
7. [Production Checklist](#production-checklist)
8. [Troubleshooting](#troubleshooting)

---

## Overview

This guide provides step-by-step instructions for integrating Paystack and Flutterwave payment gateways into the Ontour Travels platform. Both gateways are PCI-DSS compliant and support Nigerian Naira (NGN) and international currencies.

### Why Both Gateways?
- **Redundancy:** If one gateway experiences downtime, the other serves as a backup
- **Currency Options:** Paystack optimized for NGN, Flutterwave for multi-currency
- **Customer Preference:** Give customers options based on their card/bank preferences
- **Success Rates:** Different gateways have varying success rates with different banks

---

## Prerequisites

### 1. Business Requirements
- [ ] Registered business entity in Nigeria
- [ ] Valid business registration documents (CAC certificate, etc.)
- [ ] Bank account in the business name
- [ ] Business email address
- [ ] Business phone number
- [ ] Business address

### 2. Technical Requirements
- [ ] Next.js 15 project (already setup ✅)
- [ ] Node.js 18+ (already setup ✅)
- [ ] Environment variables configuration capability
- [ ] HTTPS-enabled domain for production
- [ ] Webhook endpoint capability

### 3. Account Setup
#### Paystack
1. Visit [https://paystack.com](https://paystack.com)
2. Click "Sign Up" → Choose "Start as a business"
3. Complete registration with business details
4. Submit KYC documents for verification
5. Wait for approval (typically 1-3 business days)
6. Once approved, access API keys from Dashboard → Settings → API Keys & Webhooks

#### Flutterwave
1. Visit [https://flutterwave.com](https://flutterwave.com)
2. Click "Sign Up" → Select "Business"
3. Complete business profile
4. Submit verification documents
5. Wait for approval (typically 1-5 business days)
6. Access API keys from Dashboard → Settings → API Keys

---

## Paystack Integration

### Step 1: Install Paystack SDK

```bash
npm install @paystack/inline-js
# or
bun add @paystack/inline-js
```

### Step 2: Environment Variables

Add to `.env.local`:

```env
# Paystack API Keys
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=pk_test_xxxxxxxxxxxx  # Test public key
PAYSTACK_SECRET_KEY=sk_test_xxxxxxxxxxxx             # Test secret key

# Production keys (add when ready to go live)
# NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=pk_live_xxxxxxxxxxxx
# PAYSTACK_SECRET_KEY=sk_live_xxxxxxxxxxxx
```

### Step 3: Create Paystack Payment Component

Create `src/components/payments/PaystackCheckout.tsx`:

```typescript
"use client";

import { useState } from "react";
import { Button } from "@chakra-ui/react";
import { usePaystackPayment } from "react-paystack";

interface PaystackCheckoutProps {
  amount: number; // Amount in kobo (₦1 = 100 kobo)
  email: string;
  metadata: {
    bookingId: string;
    bookingType: "flight" | "hotel" | "shortlet" | "tour";
    customerName: string;
    customerId?: string;
  };
  onSuccess?: (reference: any) => void;
  onClose?: () => void;
}

export const PaystackCheckout = ({
  amount,
  email,
  metadata,
  onSuccess,
  onClose,
}: PaystackCheckoutProps) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const config = {
    reference: `ONTOUR-${Date.now()}`,
    email,
    amount, // Amount in kobo
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!,
    currency: "NGN",
    metadata: {
      ...metadata,
      custom_fields: [
        {
          display_name: "Booking ID",
          variable_name: "booking_id",
          value: metadata.bookingId,
        },
        {
          display_name: "Booking Type",
          variable_name: "booking_type",
          value: metadata.bookingType,
        },
      ],
    },
  };

  const initializePayment = usePaystackPayment(config);

  const handlePayment = () => {
    setIsProcessing(true);
    initializePayment(
      async (reference) => {
        // Payment successful
        console.log("Payment successful:", reference);
        
        // Verify payment on backend
        const verifyResponse = await fetch("/api/payments/verify-paystack", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ reference: reference.reference }),
        });

        if (verifyResponse.ok) {
          onSuccess?.(reference);
        }
        setIsProcessing(false);
      },
      () => {
        // Payment closed/cancelled
        console.log("Payment closed");
        setIsProcessing(false);
        onClose?.();
      }
    );
  };

  return (
    <Button
      onClick={handlePayment}
      loading={isProcessing}
      colorPalette="green"
      size="lg"
      w="full"
    >
      Pay ₦{(amount / 100).toLocaleString()} with Paystack
    </Button>
  );
};
```

### Step 4: Create Paystack Verification API Route

Create `src/app/api/payments/verify-paystack/route.ts`:

```typescript
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { reference } = await req.json();

    if (!reference) {
      return NextResponse.json(
        { error: "Payment reference is required" },
        { status: 400 }
      );
    }

    // Verify payment with Paystack
    const response = await fetch(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      }
    );

    const data = await response.json();

    if (data.status && data.data.status === "success") {
      // Payment verified successfully
      const {
        amount,
        currency,
        customer,
        metadata,
        paid_at,
        channel,
      } = data.data;

      // TODO: Save transaction to database
      // TODO: Update booking status to "paid"
      // TODO: Send confirmation email/WhatsApp

      console.log("Payment verified:", {
        reference,
        amount: amount / 100, // Convert from kobo to naira
        currency,
        customerEmail: customer.email,
        metadata,
        paidAt: paid_at,
        channel,
      });

      return NextResponse.json({
        success: true,
        message: "Payment verified successfully",
        data: {
          reference,
          amount: amount / 100,
          currency,
          status: "success",
        },
      });
    } else {
      return NextResponse.json(
        { error: "Payment verification failed", details: data },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Paystack verification error:", error);
    return NextResponse.json(
      { error: "Internal server error during verification" },
      { status: 500 }
    );
  }
}
```

### Step 5: Setup Paystack Webhooks

Webhooks notify your server of payment events in real-time.

Create `src/app/api/webhooks/paystack/route.ts`:

```typescript
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    const signature = req.headers.get("x-paystack-signature");

    // Verify webhook signature
    const hash = crypto
      .createHmac("sha512", process.env.PAYSTACK_SECRET_KEY!)
      .update(body)
      .digest("hex");

    if (hash !== signature) {
      return NextResponse.json(
        { error: "Invalid signature" },
        { status: 401 }
      );
    }

    const event = JSON.parse(body);

    // Handle different event types
    switch (event.event) {
      case "charge.success":
        // Payment successful
        console.log("Payment successful:", event.data);
        // TODO: Update booking status, send confirmation
        break;

      case "charge.failed":
        // Payment failed
        console.log("Payment failed:", event.data);
        // TODO: Update booking status, notify customer
        break;

      case "transfer.success":
        // Payout successful (for refunds)
        console.log("Transfer successful:", event.data);
        break;

      case "transfer.failed":
        // Payout failed
        console.log("Transfer failed:", event.data);
        break;

      default:
        console.log("Unhandled event:", event.event);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    );
  }
}
```

**Configure Webhook URL in Paystack Dashboard:**
1. Go to Dashboard → Settings → API Keys & Webhooks
2. Add webhook URL: `https://yourdomain.com/api/webhooks/paystack`
3. Save changes

---

## Flutterwave Integration

### Step 1: Install Flutterwave SDK

```bash
npm install flutterwave-react-v3
# or
bun add flutterwave-react-v3
```

### Step 2: Environment Variables

Add to `.env.local`:

```env
# Flutterwave API Keys
NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY=FLWPUBK_TEST-xxxxxxxxxxxx  # Test public key
FLUTTERWAVE_SECRET_KEY=FLWSECK_TEST-xxxxxxxxxxxx             # Test secret key
FLUTTERWAVE_ENCRYPTION_KEY=FLWSECK_TESTxxxxxxxxxxxx          # Encryption key

# Production keys (add when ready to go live)
# NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY=FLWPUBK-xxxxxxxxxxxx
# FLUTTERWAVE_SECRET_KEY=FLWSECK-xxxxxxxxxxxx
# FLUTTERWAVE_ENCRYPTION_KEY=xxxxxxxxxxxx
```

### Step 3: Create Flutterwave Payment Component

Create `src/components/payments/FlutterwaveCheckout.tsx`:

```typescript
"use client";

import { useState } from "react";
import { Button } from "@chakra-ui/react";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";

interface FlutterwaveCheckoutProps {
  amount: number; // Amount in NGN or USD
  currency?: "NGN" | "USD";
  email: string;
  phoneNumber: string;
  name: string;
  metadata: {
    bookingId: string;
    bookingType: "flight" | "hotel" | "shortlet" | "tour";
  };
  onSuccess?: (response: any) => void;
  onClose?: () => void;
}

export const FlutterwaveCheckout = ({
  amount,
  currency = "NGN",
  email,
  phoneNumber,
  name,
  metadata,
  onSuccess,
  onClose,
}: FlutterwaveCheckoutProps) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const config = {
    public_key: process.env.NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY!,
    tx_ref: `ONTOUR-${Date.now()}`,
    amount,
    currency,
    payment_options: "card,ussd,mobilemoney,banktransfer",
    customer: {
      email,
      phone_number: phoneNumber,
      name,
    },
    customizations: {
      title: "Ontour Travels",
      description: `Payment for ${metadata.bookingType} booking`,
      logo: "https://your-logo-url.com/logo.png",
    },
    meta: metadata,
  };

  const handleFlutterPayment = useFlutterwave(config);

  const handlePayment = () => {
    setIsProcessing(true);
    handleFlutterPayment({
      callback: async (response) => {
        console.log("Payment response:", response);
        closePaymentModal();

        if (response.status === "successful") {
          // Verify payment on backend
          const verifyResponse = await fetch(
            "/api/payments/verify-flutterwave",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ 
                transactionId: response.transaction_id,
                txRef: response.tx_ref 
              }),
            }
          );

          if (verifyResponse.ok) {
            onSuccess?.(response);
          }
        }
        setIsProcessing(false);
      },
      onClose: () => {
        console.log("Payment closed");
        setIsProcessing(false);
        onClose?.();
      },
    });
  };

  return (
    <Button
      onClick={handlePayment}
      loading={isProcessing}
      colorPalette="orange"
      size="lg"
      w="full"
    >
      Pay {currency === "NGN" ? "₦" : "$"}{amount.toLocaleString()} with Flutterwave
    </Button>
  );
};
```

### Step 4: Create Flutterwave Verification API Route

Create `src/app/api/payments/verify-flutterwave/route.ts`:

```typescript
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { transactionId, txRef } = await req.json();

    if (!transactionId) {
      return NextResponse.json(
        { error: "Transaction ID is required" },
        { status: 400 }
      );
    }

    // Verify payment with Flutterwave
    const response = await fetch(
      `https://api.flutterwave.com/v3/transactions/${transactionId}/verify`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.FLUTTERWAVE_SECRET_KEY}`,
        },
      }
    );

    const data = await response.json();

    if (data.status === "success" && data.data.status === "successful") {
      // Payment verified successfully
      const {
        amount,
        currency,
        customer,
        meta,
        created_at,
        payment_type,
      } = data.data;

      // TODO: Save transaction to database
      // TODO: Update booking status to "paid"
      // TODO: Send confirmation email/WhatsApp

      console.log("Payment verified:", {
        transactionId,
        txRef,
        amount,
        currency,
        customerEmail: customer.email,
        meta,
        createdAt: created_at,
        paymentType: payment_type,
      });

      return NextResponse.json({
        success: true,
        message: "Payment verified successfully",
        data: {
          transactionId,
          amount,
          currency,
          status: "success",
        },
      });
    } else {
      return NextResponse.json(
        { error: "Payment verification failed", details: data },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Flutterwave verification error:", error);
    return NextResponse.json(
      { error: "Internal server error during verification" },
      { status: 500 }
    );
  }
}
```

### Step 5: Setup Flutterwave Webhooks

Create `src/app/api/webhooks/flutterwave/route.ts`:

```typescript
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    const signature = req.headers.get("verif-hash");

    // Verify webhook signature
    const secretHash = process.env.FLUTTERWAVE_SECRET_KEY!;

    if (signature !== secretHash) {
      return NextResponse.json(
        { error: "Invalid signature" },
        { status: 401 }
      );
    }

    const event = JSON.parse(body);

    // Handle payment event
    if (event.event === "charge.completed" && event.data.status === "successful") {
      console.log("Payment successful:", event.data);
      // TODO: Update booking status, send confirmation
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    );
  }
}
```

**Configure Webhook URL in Flutterwave Dashboard:**
1. Go to Dashboard → Settings → Webhooks
2. Add webhook URL: `https://yourdomain.com/api/webhooks/flutterwave`
3. Copy the Secret Hash and add to `.env` as `FLUTTERWAVE_WEBHOOK_SECRET`
4. Save changes

---

## Implementation Steps

### Phase 1: Development Setup (Test Mode)

1. **Install Dependencies**
   ```bash
   bun add @paystack/inline-js flutterwave-react-v3 react-paystack
   ```

2. **Configure Environment Variables**
   - Add test API keys to `.env.local`
   - Never commit API keys to version control

3. **Implement Payment Components**
   - Create `PaystackCheckout.tsx`
   - Create `FlutterwaveCheckout.tsx`
   - Create unified payment selection UI

4. **Setup API Routes**
   - Payment verification endpoints
   - Webhook handlers
   - Error handling

5. **Database Integration**
   - Create `payments` table in database
   - Store transaction records
   - Link payments to bookings

6. **Test Thoroughly**
   - Test with Paystack test cards
   - Test with Flutterwave test cards
   - Test webhook deliveries
   - Test failure scenarios

### Phase 2: Production Deployment

1. **Business Verification**
   - Complete KYC for both Paystack and Flutterwave
   - Get accounts approved for live transactions

2. **Update to Live Keys**
   - Replace test keys with production keys in environment variables
   - Update webhook URLs to production domain

3. **Security Hardening**
   - Enable HTTPS on domain
   - Implement rate limiting
   - Add transaction logging
   - Setup monitoring and alerts

4. **Go Live**
   - Start with small test transactions
   - Monitor for issues
   - Gradually increase transaction limits

---

## Testing

### Paystack Test Cards

**Success Scenarios:**
```
Card Number: 4084 0840 8408 4081
CVV: 408
Expiry: Any future date
Pin: 0000
OTP: 123456
```

**Failed Transaction:**
```
Card Number: 5060 6666 6666 6666 6666
CVV: Any 3 digits
Expiry: Any future date
```

### Flutterwave Test Cards

**Success Scenarios:**
```
Card Number: 5531 8866 5214 2950
CVV: 564
Expiry: 09/32
Pin: 3310
OTP: 12345
```

**Insufficient Funds:**
```
Card Number: 5143 0109 1355 5853
CVV: 276
Expiry: 09/32
```

---

## Production Checklist

- [ ] Business accounts verified and approved
- [ ] Production API keys configured
- [ ] Webhook URLs updated to production domain
- [ ] HTTPS enabled on domain
- [ ] Database schema for payments created
- [ ] Transaction logging implemented
- [ ] Error monitoring setup (e.g., Sentry)
- [ ] Email/WhatsApp confirmation system ready
- [ ] Refund process documented
- [ ] Customer support trained on payment issues
- [ ] Legal terms updated (refund policy, etc.)
- [ ] PCI-DSS compliance reviewed
- [ ] Backup payment gateway tested
- [ ] Load testing completed
- [ ] Security audit performed

---

## Troubleshooting

### Common Issues

1. **"Invalid API Key" Error**
   - Verify API keys are correct in `.env`
   - Ensure using correct environment (test vs live)
   - Check for whitespace in environment variables

2. **Payment Modal Not Opening**
   - Check if public key is loaded correctly
   - Verify SDK is installed
   - Check browser console for JavaScript errors

3. **Webhook Not Receiving Events**
   - Verify webhook URL is publicly accessible
   - Check webhook signature verification logic
   - Test webhook with dashboard testing tools

4. **Payment Successful But Not Verified**
   - Check API verification endpoint
   - Verify secret key is correct
   - Check server logs for errors

5. **Double Charging**
   - Implement idempotency checks
   - Use unique transaction references
   - Verify before charging again

### Support Contacts

**Paystack Support:**
- Email: support@paystack.com
- Phone: +234 1 888 0000
- Docs: https://paystack.com/docs/api

**Flutterwave Support:**
- Email: hi@flutterwavego.com
- Phone: +234 1 904 9200
- Docs: https://developer.flutterwave.com/docs

---

## Next Steps

1. **Implement Payment UI**: Create unified payment selection interface
2. **Database Integration**: Link payments to bookings table
3. **Email/WhatsApp Confirmation**: Integrate with confirmation system (see BOOKING_CONFIRMATION_GUIDE.md)
4. **Refund System**: Implement refund workflow
5. **Analytics**: Track payment success rates and issues
6. **Optimization**: A/B test payment flows for better conversion

---

**Document Version:** 1.0  
**Last Reviewed:** November 2024  
**Next Review:** Before production launch