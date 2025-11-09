# Integration Guides for Ontour Travels

This document provides comprehensive guides for integrating the excluded features: **Payment Gateway Integration** and **Booking Confirmation System (Email + WhatsApp)**.

---

## Table of Contents
1. [Payment Gateway Integration (Paystack/Flutterwave)](#payment-gateway-integration)
2. [Booking Confirmation System (Email + WhatsApp)](#booking-confirmation-system)
3. [Testing & Deployment Checklist](#testing--deployment-checklist)

---

## Payment Gateway Integration

The website currently displays "Safe payments via Paystack/Flutterwave" but does not process actual payments. Here's how to integrate payment processing.

### Option 1: Paystack Integration (Recommended for Nigeria)

#### Step 1: Setup Paystack Account
1. Sign up at [https://paystack.com](https://paystack.com)
2. Complete business verification (required for live mode)
3. Get your API keys from Settings → API Keys & Webhooks
   - **Test Secret Key**: `sk_test_...`
   - **Live Secret Key**: `sk_live_...`
   - **Test Public Key**: `pk_test_...`
   - **Live Public Key**: `pk_live_...`

#### Step 2: Install Paystack Package
```bash
npm install @paystack/inline-js
# or
bun add @paystack/inline-js
```

#### Step 3: Add Environment Variables
Create/update `.env.local`:
```env
# Paystack Keys
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=pk_test_your_public_key_here
PAYSTACK_SECRET_KEY=sk_test_your_secret_key_here

# For production, use live keys:
# NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=pk_live_your_public_key_here
# PAYSTACK_SECRET_KEY=sk_live_your_secret_key_here
```

#### Step 4: Create Payment API Route
Create `src/app/api/payments/initialize/route.ts`:
```typescript
import { NextRequest, NextResponse } from "next/server";

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, amount, reference, metadata } = body;

    // Initialize Paystack transaction
    const response = await fetch("https://api.paystack.co/transaction/initialize", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        amount: Math.round(amount * 100), // Convert to kobo (NGN) or cents (USD)
        reference,
        metadata, // Include booking details: service type, dates, passengers, etc.
        callback_url: `${process.env.NEXT_PUBLIC_BASE_URL}/booking/confirmation`,
      }),
    });

    const data = await response.json();

    if (!data.status) {
      return NextResponse.json(
        { error: "Failed to initialize payment", details: data.message },
        { status: 400 }
      );
    }

    return NextResponse.json({
      authorization_url: data.data.authorization_url,
      access_code: data.data.access_code,
      reference: data.data.reference,
    });
  } catch (error: any) {
    console.error("Payment initialization error:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 }
    );
  }
}
```

#### Step 5: Create Payment Verification API Route
Create `src/app/api/payments/verify/route.ts`:
```typescript
import { NextRequest, NextResponse } from "next/server";

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;

export async function GET(request: NextRequest) {
  try {
    const reference = request.nextUrl.searchParams.get("reference");

    if (!reference) {
      return NextResponse.json({ error: "Reference is required" }, { status: 400 });
    }

    // Verify transaction with Paystack
    const response = await fetch(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
        },
      }
    );

    const data = await response.json();

    if (!data.status) {
      return NextResponse.json(
        { error: "Payment verification failed", details: data.message },
        { status: 400 }
      );
    }

    const transaction = data.data;

    // Check if payment was successful
    if (transaction.status === "success") {
      // TODO: Update booking status in database
      // TODO: Trigger confirmation email/WhatsApp (see next section)

      return NextResponse.json({
        status: "success",
        amount: transaction.amount / 100, // Convert back from kobo/cents
        reference: transaction.reference,
        metadata: transaction.metadata,
        paid_at: transaction.paid_at,
      });
    }

    return NextResponse.json(
      { error: "Payment not successful", status: transaction.status },
      { status: 400 }
    );
  } catch (error: any) {
    console.error("Payment verification error:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 }
    );
  }
}
```

#### Step 6: Create Payment Component
Create `src/components/PaymentButton.tsx`:
```typescript
"use client";

import { Button } from "@chakra-ui/react";
import { useState } from "react";

interface PaymentButtonProps {
  email: string;
  amount: number;
  bookingData: {
    serviceType: string;
    reference: string;
    [key: string]: any;
  };
  onSuccess?: (reference: string) => void;
  onClose?: () => void;
}

export function PaymentButton({
  email,
  amount,
  bookingData,
  onSuccess,
  onClose,
}: PaymentButtonProps) {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);

    try {
      // Initialize payment
      const response = await fetch("/api/payments/initialize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          amount,
          reference: bookingData.reference,
          metadata: bookingData,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to initialize payment");
      }

      const data = await response.json();

      // Redirect to Paystack checkout
      window.location.href = data.authorization_url;
    } catch (error) {
      console.error("Payment error:", error);
      alert("Failed to initiate payment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handlePayment}
      loading={loading}
      bg="#152852"
      color="white"
      _hover={{ bg: "#0d1a35" }}
      size="lg"
      w="full"
    >
      Pay ₦{amount.toLocaleString()}
    </Button>
  );
}
```

#### Step 7: Integrate into Booking Flow
Example for flight booking in `src/app/book/page.tsx`:
```typescript
import { PaymentButton } from "@/components/PaymentButton";

// In your booking form/confirmation page:
<PaymentButton
  email={userEmail}
  amount={totalPrice}
  bookingData={{
    serviceType: "flight",
    reference: `FLIGHT-${Date.now()}`,
    from: "Lagos",
    to: "London",
    departDate: "2025-12-01",
    passengers: 2,
  }}
  onSuccess={(reference) => {
    // Redirect to confirmation page or show success message
    router.push(`/booking/confirmation?reference=${reference}`);
  }}
/>
```

### Option 2: Flutterwave Integration

#### Step 1: Setup Flutterwave Account
1. Sign up at [https://flutterwave.com](https://flutterwave.com)
2. Complete business verification
3. Get API keys from Settings → API Keys
   - **Test Public Key**: `FLWPUBK_TEST-...`
   - **Test Secret Key**: `FLWSECK_TEST-...`
   - **Live Public Key**: `FLWPUBK-...`
   - **Live Secret Key**: `FLWSECK-...`

#### Step 2: Install Flutterwave Package
```bash
npm install flutterwave-react-v3
# or
bun add flutterwave-react-v3
```

#### Step 3: Implementation
Similar to Paystack but uses Flutterwave's API endpoints and SDK. Follow Flutterwave's official documentation at [https://developer.flutterwave.com/docs](https://developer.flutterwave.com/docs)

---

## Booking Confirmation System

After successful payment (or manual booking confirmation), send confirmation via Email and WhatsApp.

### Email Confirmation Integration

#### Option 1: Using Resend (Recommended - Easy Setup)

##### Step 1: Setup Resend Account
1. Sign up at [https://resend.com](https://resend.com)
2. Verify your domain (or use Resend's free test domain)
3. Get your API key from Settings

##### Step 2: Install Resend
```bash
npm install resend
# or
bun add resend
```

##### Step 3: Add Environment Variable
```env
RESEND_API_KEY=re_your_api_key_here
```

##### Step 4: Create Email Template
Create `src/lib/email-templates/booking-confirmation.tsx`:
```typescript
interface BookingConfirmationEmailProps {
  customerName: string;
  bookingReference: string;
  serviceType: string;
  bookingDetails: {
    [key: string]: any;
  };
  totalAmount: number;
  paymentStatus: string;
}

export const BookingConfirmationEmail = ({
  customerName,
  bookingReference,
  serviceType,
  bookingDetails,
  totalAmount,
  paymentStatus,
}: BookingConfirmationEmailProps) => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #152852; color: white; padding: 20px; text-align: center; }
          .content { background: #f9f9f9; padding: 30px; margin: 20px 0; }
          .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
          .button { background: #152852; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 10px 0; }
          .detail-row { margin: 10px 0; }
          .detail-label { font-weight: bold; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Booking Confirmed! 🎉</h1>
          </div>
          
          <div class="content">
            <h2>Hello ${customerName},</h2>
            <p>Thank you for choosing Ontour Travels! Your booking has been confirmed.</p>
            
            <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3>Booking Details</h3>
              <div class="detail-row">
                <span class="detail-label">Reference Number:</span> ${bookingReference}
              </div>
              <div class="detail-row">
                <span class="detail-label">Service Type:</span> ${serviceType}
              </div>
              <div class="detail-row">
                <span class="detail-label">Total Amount:</span> ₦${totalAmount.toLocaleString()}
              </div>
              <div class="detail-row">
                <span class="detail-label">Payment Status:</span> ${paymentStatus}
              </div>
            </div>
            
            <p>Your travel documents will be sent to you within 2-6 hours. For urgent inquiries, contact us on WhatsApp.</p>
            
            <a href="https://wa.me/2348123456789?text=Hi%20Ontour,%20my%20booking%20reference%20is%20${bookingReference}" class="button">Contact Support on WhatsApp</a>
          </div>
          
          <div class="footer">
            <p>Ontour Travels | +234 812 345 6789 | info@ontourtravels.com.ng</p>
            <p>&copy; 2025 Ontour Travels. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `;
};
```

##### Step 5: Create Email Sending API
Create `src/app/api/send-confirmation-email/route.ts`:
```typescript
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { BookingConfirmationEmail } from "@/lib/email-templates/booking-confirmation";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      customerEmail,
      customerName,
      bookingReference,
      serviceType,
      bookingDetails,
      totalAmount,
      paymentStatus,
    } = body;

    const { data, error } = await resend.emails.send({
      from: "Ontour Travels <bookings@ontourtravels.com.ng>", // Use your verified domain
      to: [customerEmail],
      bcc: ["info@ontourtravels.com.ng"], // Send copy to your team
      subject: `Booking Confirmed - ${bookingReference}`,
      html: BookingConfirmationEmail({
        customerName,
        bookingReference,
        serviceType,
        bookingDetails,
        totalAmount,
        paymentStatus,
      }),
    });

    if (error) {
      console.error("Email sending error:", error);
      return NextResponse.json(
        { error: "Failed to send email", details: error },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true, messageId: data?.id });
  } catch (error: any) {
    console.error("Email API error:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 }
    );
  }
}
```

#### Option 2: Using SendGrid
Similar process but uses SendGrid API. Follow SendGrid's documentation at [https://docs.sendgrid.com](https://docs.sendgrid.com).

---

### WhatsApp Confirmation Integration

#### Option 1: Using WhatsApp Business API (Official - Requires Business Verification)

##### Requirements:
- Meta Business Account
- Verified business
- WhatsApp Business API access
- Phone number verification

##### Setup:
1. Apply for WhatsApp Business API at [https://business.whatsapp.com](https://business.whatsapp.com)
2. Get API credentials from Meta Business Manager
3. Install WhatsApp Cloud API client

##### Implementation:
Create `src/app/api/send-whatsapp-confirmation/route.ts`:
```typescript
import { NextRequest, NextResponse } from "next/server";

const WHATSAPP_API_TOKEN = process.env.WHATSAPP_API_TOKEN;
const WHATSAPP_PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { customerPhone, customerName, bookingReference, serviceType, totalAmount } = body;

    const message = `
🎉 *Booking Confirmed!*

Hello ${customerName},

Your booking with Ontour Travels has been confirmed.

📋 *Booking Details:*
Reference: ${bookingReference}
Service: ${serviceType}
Amount: ₦${totalAmount.toLocaleString()}

Your travel documents will be sent shortly. For urgent inquiries, reply to this message.

Thank you for choosing Ontour Travels! ✈️🏨

_Ontour Travels_
+234 812 345 6789
info@ontourtravels.com.ng
    `.trim();

    const response = await fetch(
      `https://graph.facebook.com/v18.0/${WHATSAPP_PHONE_NUMBER_ID}/messages`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${WHATSAPP_API_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          to: customerPhone.replace(/^\+/, ""), // Remove + prefix if present
          type: "text",
          text: { body: message },
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("WhatsApp API error:", data);
      return NextResponse.json(
        { error: "Failed to send WhatsApp message", details: data },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true, messageId: data.messages[0].id });
  } catch (error: any) {
    console.error("WhatsApp confirmation error:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 }
    );
  }
}
```

#### Option 2: Using Third-Party Services (Easier - No Business Verification)

Popular options:
- **Twilio WhatsApp API**: [https://www.twilio.com/whatsapp](https://www.twilio.com/whatsapp)
- **Vonage WhatsApp API**: [https://www.vonage.com/communications-apis/messages/](https://www.vonage.com/communications-apis/messages/)
- **WATI (WhatsApp Team Inbox)**: [https://www.wati.io](https://www.wati.io)

##### Example with Twilio:
```bash
npm install twilio
```

```typescript
import { NextRequest, NextResponse } from "next/server";
import twilio from "twilio";

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { customerPhone, message } = body;

    const whatsappMessage = await client.messages.create({
      from: "whatsapp:+14155238886", // Twilio Sandbox number or your verified number
      to: `whatsapp:${customerPhone}`,
      body: message,
    });

    return NextResponse.json({ success: true, sid: whatsappMessage.sid });
  } catch (error: any) {
    console.error("Twilio WhatsApp error:", error);
    return NextResponse.json(
      { error: "Failed to send WhatsApp message", details: error.message },
      { status: 500 }
    );
  }
}
```

---

### Complete Booking Flow Integration

Here's how to tie everything together in your payment verification:

Update `src/app/api/payments/verify/route.ts`:
```typescript
// ... (previous code)

if (transaction.status === "success") {
  // 1. Update booking status in database
  // await updateBookingStatus(reference, "confirmed");

  // 2. Send email confirmation
  await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/send-confirmation-email`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      customerEmail: transaction.customer.email,
      customerName: transaction.metadata.customerName,
      bookingReference: transaction.reference,
      serviceType: transaction.metadata.serviceType,
      bookingDetails: transaction.metadata,
      totalAmount: transaction.amount / 100,
      paymentStatus: "Paid",
    }),
  });

  // 3. Send WhatsApp confirmation
  await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/send-whatsapp-confirmation`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      customerPhone: transaction.metadata.customerPhone,
      customerName: transaction.metadata.customerName,
      bookingReference: transaction.reference,
      serviceType: transaction.metadata.serviceType,
      totalAmount: transaction.amount / 100,
    }),
  });

  return NextResponse.json({
    status: "success",
    amount: transaction.amount / 100,
    reference: transaction.reference,
    metadata: transaction.metadata,
    paid_at: transaction.paid_at,
  });
}
```

---

## Testing & Deployment Checklist

### Payment Gateway Testing
- [ ] Test successful payment flow
- [ ] Test failed payment flow
- [ ] Test payment verification
- [ ] Test webhook handling (if implemented)
- [ ] Test with different amounts
- [ ] Test NGN and USD transactions
- [ ] Verify database updates on successful payment
- [ ] Test redirect to confirmation page

### Email Confirmation Testing
- [ ] Test email delivery to customer
- [ ] Test BCC copy to admin email
- [ ] Verify email formatting on desktop
- [ ] Verify email formatting on mobile
- [ ] Test with different booking types (flight, hotel, shortlet, tour)
- [ ] Verify all booking details are correct in email
- [ ] Test spam folder delivery

### WhatsApp Confirmation Testing
- [ ] Test message delivery to customer
- [ ] Verify message formatting
- [ ] Test with international phone numbers
- [ ] Test with Nigerian phone numbers (+234)
- [ ] Verify customer can reply to messages
- [ ] Test message rate limits

### Production Deployment
- [ ] Switch from test API keys to live keys
- [ ] Update callback URLs to production domain
- [ ] Enable webhook signing verification
- [ ] Set up error monitoring (Sentry, LogRocket, etc.)
- [ ] Configure rate limiting for APIs
- [ ] Set up backup notification channel
- [ ] Document emergency contact procedures
- [ ] Train team on handling payment disputes
- [ ] Set up refund process workflow

### Security Checklist
- [ ] Never expose secret keys in client-side code
- [ ] Validate all payment amounts server-side
- [ ] Implement request signing for webhooks
- [ ] Use HTTPS for all API communications
- [ ] Sanitize user inputs before processing
- [ ] Implement rate limiting on payment endpoints
- [ ] Log all transactions for audit trail
- [ ] Set up alerts for suspicious activities

---

## Additional Resources

### Paystack Documentation
- Getting Started: [https://paystack.com/docs/](https://paystack.com/docs/)
- API Reference: [https://paystack.com/docs/api/](https://paystack.com/docs/api/)
- Test Cards: [https://paystack.com/docs/payments/test-payments/](https://paystack.com/docs/payments/test-payments/)

### Flutterwave Documentation
- Getting Started: [https://developer.flutterwave.com/docs/getting-started](https://developer.flutterwave.com/docs/getting-started)
- API Reference: [https://developer.flutterwave.com/reference](https://developer.flutterwave.com/reference)

### Email Services
- Resend Docs: [https://resend.com/docs](https://resend.com/docs)
- SendGrid Docs: [https://docs.sendgrid.com](https://docs.sendgrid.com)

### WhatsApp Business API
- Official API: [https://developers.facebook.com/docs/whatsapp/](https://developers.facebook.com/docs/whatsapp/)
- Twilio WhatsApp: [https://www.twilio.com/docs/whatsapp](https://www.twilio.com/docs/whatsapp)

---

## Support

For questions or issues implementing these integrations:
- Email: info@ontourtravels.com.ng
- WhatsApp: +234 812 345 6789

---

**Last Updated**: January 2025
**Version**: 1.0
