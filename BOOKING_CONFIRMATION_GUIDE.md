# Booking Confirmation System Guide
## Email + WhatsApp Confirmation for Ontour Travels

**Last Updated:** November 2024  
**Status:** Ready for Implementation

---

## Table of Contents
1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [Email Confirmation Setup](#email-confirmation-setup)
4. [WhatsApp Confirmation Setup](#whatsapp-confirmation-setup)
5. [Implementation Steps](#implementation-steps)
6. [Templates](#templates)
7. [Testing](#testing)
8. [Production Checklist](#production-checklist)
9. [Troubleshooting](#troubleshooting)

---

## Overview

This guide provides comprehensive instructions for implementing automated booking confirmation via Email and WhatsApp. The system will send instant confirmations when bookings are completed and payments are verified.

### Confirmation Triggers
- Flight booking completed
- Hotel reservation confirmed
- Shortlet booking paid
- Tour package reserved
- Payment successful
- Booking cancelled/modified

---

## Prerequisites

### 1. Services Needed
- **Email Service:** Resend (recommended) or SendGrid/Mailgun
- **WhatsApp Service:** WhatsApp Business API via Twilio or official WhatsApp Business Platform
- **Database:** Already setup with Turso ✅

### 2. Technical Requirements
- [ ] Next.js 15 project (already setup ✅)
- [ ] Environment variables configuration
- [ ] API routes capability ✅
- [ ] Payment system integrated (see PAYMENT_INTEGRATION_GUIDE.md)

---

## Email Confirmation Setup

### Option A: Resend (Recommended - Easiest Setup)

#### Step 1: Create Resend Account

1. Visit [https://resend.com](https://resend.com)
2. Sign up for free account (100 emails/day free tier)
3. Verify your email address
4. Add and verify your domain (optional, but recommended for production)

#### Step 2: Install Resend SDK

```bash
bun add resend
```

#### Step 3: Configure Environment Variables

Add to `.env.local`:

```env
# Resend API Key
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxx

# Email Configuration
EMAIL_FROM=noreply@ontourtravels.com.ng  # or your verified domain
EMAIL_REPLY_TO=info@ontourtravels.com.ng
EMAIL_BCC=bookings@ontourtravels.com.ng  # Optional: BCC all confirmations for records
```

#### Step 4: Create Email Service

Create `src/lib/email.ts`:

```typescript
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface SendEmailProps {
  to: string | string[];
  subject: string;
  html: string;
  replyTo?: string;
  bcc?: string;
}

export async function sendEmail({
  to,
  subject,
  html,
  replyTo,
  bcc,
}: SendEmailProps) {
  try {
    const { data, error } = await resend.emails.send({
      from: process.env.EMAIL_FROM || "noreply@ontourtravels.com.ng",
      to: Array.isArray(to) ? to : [to],
      subject,
      html,
      replyTo: replyTo || process.env.EMAIL_REPLY_TO,
      bcc: bcc || process.env.EMAIL_BCC,
    });

    if (error) {
      console.error("Email sending failed:", error);
      throw new Error(`Failed to send email: ${error.message}`);
    }

    console.log("Email sent successfully:", data);
    return { success: true, data };
  } catch (error) {
    console.error("Email error:", error);
    throw error;
  }
}

// Helper function for booking confirmations
export async function sendBookingConfirmation({
  customerEmail,
  customerName,
  bookingId,
  bookingType,
  bookingDetails,
  amount,
  paymentStatus,
}: {
  customerEmail: string;
  customerName: string;
  bookingId: string;
  bookingType: "flight" | "hotel" | "shortlet" | "tour";
  bookingDetails: any;
  amount: number;
  paymentStatus: "paid" | "pending";
}) {
  const subject = `Booking Confirmation - ${bookingType.toUpperCase()} - ${bookingId}`;
  
  const html = generateBookingEmail({
    customerName,
    bookingId,
    bookingType,
    bookingDetails,
    amount,
    paymentStatus,
  });

  return sendEmail({
    to: customerEmail,
    subject,
    html,
  });
}
```

#### Step 5: Create Email Templates

Create `src/lib/email-templates.ts`:

```typescript
interface BookingEmailData {
  customerName: string;
  bookingId: string;
  bookingType: "flight" | "hotel" | "shortlet" | "tour";
  bookingDetails: any;
  amount: number;
  paymentStatus: "paid" | "pending";
}

export function generateBookingEmail({
  customerName,
  bookingId,
  bookingType,
  bookingDetails,
  amount,
  paymentStatus,
}: BookingEmailData): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Booking Confirmation</title>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
        .header {
          background: #152852;
          color: white;
          padding: 30px 20px;
          text-align: center;
          border-radius: 8px 8px 0 0;
        }
        .content {
          background: #f9f9f9;
          padding: 30px 20px;
        }
        .booking-details {
          background: white;
          padding: 20px;
          border-radius: 8px;
          margin: 20px 0;
          border-left: 4px solid #C9A449;
        }
        .detail-row {
          display: flex;
          justify-content: space-between;
          padding: 10px 0;
          border-bottom: 1px solid #eee;
        }
        .detail-label {
          font-weight: 600;
          color: #666;
        }
        .detail-value {
          color: #333;
        }
        .status-badge {
          display: inline-block;
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 14px;
          font-weight: 600;
        }
        .status-paid {
          background: #d4edda;
          color: #155724;
        }
        .status-pending {
          background: #fff3cd;
          color: #856404;
        }
        .cta-button {
          display: inline-block;
          background: #25D366;
          color: white;
          padding: 12px 30px;
          text-decoration: none;
          border-radius: 6px;
          margin: 20px 0;
          font-weight: 600;
        }
        .footer {
          text-align: center;
          padding: 20px;
          color: #666;
          font-size: 14px;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>🎉 Booking Confirmed!</h1>
      </div>
      
      <div class="content">
        <p>Dear ${customerName},</p>
        
        <p>Thank you for booking with Ontour Travels! Your ${bookingType} booking has been confirmed.</p>
        
        <div class="booking-details">
          <h3>Booking Details</h3>
          
          <div class="detail-row">
            <span class="detail-label">Booking ID:</span>
            <span class="detail-value">${bookingId}</span>
          </div>
          
          <div class="detail-row">
            <span class="detail-label">Booking Type:</span>
            <span class="detail-value">${bookingType.toUpperCase()}</span>
          </div>
          
          <div class="detail-row">
            <span class="detail-label">Amount:</span>
            <span class="detail-value">₦${amount.toLocaleString()}</span>
          </div>
          
          <div class="detail-row">
            <span class="detail-label">Payment Status:</span>
            <span class="status-badge status-${paymentStatus}">
              ${paymentStatus === "paid" ? "✓ PAID" : "⏳ PENDING"}
            </span>
          </div>
          
          ${generateBookingTypeSpecificDetails(bookingType, bookingDetails)}
        </div>
        
        <p><strong>What's Next?</strong></p>
        <ul>
          <li>Save this email for your records</li>
          <li>Check your WhatsApp for immediate confirmation</li>
          <li>Our team will contact you within 24 hours if any additional information is needed</li>
          ${paymentStatus === "pending" ? "<li><strong>Please complete your payment to confirm your booking</strong></li>" : ""}
        </ul>
        
        <center>
          <a href="https://wa.me/2348123456789?text=Hi,%20I%20have%20a%20question%20about%20booking%20${bookingId}" 
             class="cta-button">
            💬 Chat on WhatsApp
          </a>
        </center>
      </div>
      
      <div class="footer">
        <p><strong>Ontour Travels</strong></p>
        <p>📞 +234 812 345 6789 | 📧 info@ontourtravels.com.ng</p>
        <p>Mon–Sat, 9:00 AM – 6:00 PM WAT</p>
        <p style="font-size: 12px; color: #999; margin-top: 20px;">
          This is an automated email. Please do not reply directly to this email.
          For support, contact us via WhatsApp or email.
        </p>
      </div>
    </body>
    </html>
  `;
}

function generateBookingTypeSpecificDetails(
  bookingType: string,
  details: any
): string {
  switch (bookingType) {
    case "flight":
      return `
        <div class="detail-row">
          <span class="detail-label">Route:</span>
          <span class="detail-value">${details.from} → ${details.to}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Departure:</span>
          <span class="detail-value">${details.departureDate} at ${details.departureTime}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Passengers:</span>
          <span class="detail-value">${details.passengers} Adult(s)</span>
        </div>
      `;
    
    case "hotel":
      return `
        <div class="detail-row">
          <span class="detail-label">Hotel:</span>
          <span class="detail-value">${details.hotelName}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Check-in:</span>
          <span class="detail-value">${details.checkIn}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Check-out:</span>
          <span class="detail-value">${details.checkOut}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Nights:</span>
          <span class="detail-value">${details.nights}</span>
        </div>
      `;
    
    case "shortlet":
      return `
        <div class="detail-row">
          <span class="detail-label">Property:</span>
          <span class="detail-value">${details.propertyName}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Location:</span>
          <span class="detail-value">${details.location}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Check-in:</span>
          <span class="detail-value">${details.checkIn}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Check-out:</span>
          <span class="detail-value">${details.checkOut}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Guests:</span>
          <span class="detail-value">${details.guests}</span>
        </div>
      `;
    
    case "tour":
      return `
        <div class="detail-row">
          <span class="detail-label">Tour Package:</span>
          <span class="detail-value">${details.tourName}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Destination:</span>
          <span class="detail-value">${details.destination}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Departure Date:</span>
          <span class="detail-value">${details.departureDate}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Duration:</span>
          <span class="detail-value">${details.duration}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Travelers:</span>
          <span class="detail-value">${details.adults} Adult(s), ${details.children || 0} Child(ren)</span>
        </div>
      `;
    
    default:
      return "";
  }
}
```

---

## WhatsApp Confirmation Setup

### Option A: WhatsApp Business API via Twilio (Recommended)

#### Step 1: Create Twilio Account

1. Visit [https://www.twilio.com](https://www.twilio.com)
2. Sign up for account
3. Verify phone number
4. Navigate to WhatsApp section
5. Apply for WhatsApp Business API access
6. Wait for approval (typically 1-5 business days)

#### Step 2: Install Twilio SDK

```bash
bun add twilio
```

#### Step 3: Configure Environment Variables

Add to `.env.local`:

```env
# Twilio WhatsApp Credentials
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=xxxxxxxxxxxxxxxxx
TWILIO_WHATSAPP_NUMBER=whatsapp:+14155238886  # Twilio WhatsApp Sandbox number (for testing)
# Production: whatsapp:+2348123456789 (your approved number)
```

#### Step 4: Create WhatsApp Service

Create `src/lib/whatsapp.ts`:

```typescript
import twilio from "twilio";

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

interface SendWhatsAppProps {
  to: string; // Format: +2348123456789
  message: string;
}

export async function sendWhatsApp({ to, message }: SendWhatsAppProps) {
  try {
    // Ensure phone number is in correct format
    const phoneNumber = to.startsWith("+") ? to : `+${to}`;
    const whatsappNumber = `whatsapp:${phoneNumber}`;

    const messageResponse = await client.messages.create({
      from: process.env.TWILIO_WHATSAPP_NUMBER,
      to: whatsappNumber,
      body: message,
    });

    console.log("WhatsApp message sent:", messageResponse.sid);
    return { success: true, messageId: messageResponse.sid };
  } catch (error: any) {
    console.error("WhatsApp error:", error);
    throw new Error(`Failed to send WhatsApp: ${error.message}`);
  }
}

// Helper function for booking confirmations
export async function sendBookingWhatsApp({
  customerPhone,
  customerName,
  bookingId,
  bookingType,
  bookingDetails,
  amount,
  paymentStatus,
}: {
  customerPhone: string;
  customerName: string;
  bookingId: string;
  bookingType: "flight" | "hotel" | "shortlet" | "tour";
  bookingDetails: any;
  amount: number;
  paymentStatus: "paid" | "pending";
}) {
  const message = generateWhatsAppMessage({
    customerName,
    bookingId,
    bookingType,
    bookingDetails,
    amount,
    paymentStatus,
  });

  return sendWhatsApp({
    to: customerPhone,
    message,
  });
}
```

#### Step 5: Create WhatsApp Message Templates

Add to `src/lib/whatsapp.ts`:

```typescript
interface WhatsAppMessageData {
  customerName: string;
  bookingId: string;
  bookingType: "flight" | "hotel" | "shortlet" | "tour";
  bookingDetails: any;
  amount: number;
  paymentStatus: "paid" | "pending";
}

function generateWhatsAppMessage({
  customerName,
  bookingId,
  bookingType,
  bookingDetails,
  amount,
  paymentStatus,
}: WhatsAppMessageData): string {
  const statusEmoji = paymentStatus === "paid" ? "✅" : "⏳";
  const statusText = paymentStatus === "paid" ? "CONFIRMED" : "PENDING PAYMENT";

  let detailsText = "";
  switch (bookingType) {
    case "flight":
      detailsText = `
📍 Route: ${bookingDetails.from} → ${bookingDetails.to}
🛫 Departure: ${bookingDetails.departureDate} at ${bookingDetails.departureTime}
👥 Passengers: ${bookingDetails.passengers}`;
      break;

    case "hotel":
      detailsText = `
🏨 Hotel: ${bookingDetails.hotelName}
📅 Check-in: ${bookingDetails.checkIn}
📅 Check-out: ${bookingDetails.checkOut}
🌙 Nights: ${bookingDetails.nights}`;
      break;

    case "shortlet":
      detailsText = `
🏠 Property: ${bookingDetails.propertyName}
📍 Location: ${bookingDetails.location}
📅 Check-in: ${bookingDetails.checkIn}
📅 Check-out: ${bookingDetails.checkOut}
👥 Guests: ${bookingDetails.guests}`;
      break;

    case "tour":
      detailsText = `
🌍 Tour: ${bookingDetails.tourName}
📍 Destination: ${bookingDetails.destination}
📅 Departure: ${bookingDetails.departureDate}
⏱️ Duration: ${bookingDetails.duration}
👥 Travelers: ${bookingDetails.adults} Adult(s)${bookingDetails.children ? `, ${bookingDetails.children} Child(ren)` : ""}`;
      break;
  }

  return `
🎉 *Booking ${statusText}* ${statusEmoji}

Hello ${customerName},

Thank you for booking with *Ontour Travels*!

*Booking Details:*
🆔 Booking ID: *${bookingId}*
📝 Type: ${bookingType.toUpperCase()}
💰 Amount: ₦${amount.toLocaleString()}
${detailsText}

${paymentStatus === "pending" ? "⚠️ *Please complete your payment to confirm this booking.*\n" : ""}
✅ Confirmation email sent to your inbox.
✅ Our team will contact you within 24 hours if needed.

*Need Help?*
Reply to this message or call us at +234 812 345 6789

📧 info@ontourtravels.com.ng
🕒 Mon–Sat, 9 AM – 6 PM WAT

_This is an automated message from Ontour Travels._
`.trim();
}
```

### Option B: WhatsApp Business Platform (Direct Integration)

This requires Facebook Business Manager approval. Follow Meta's official documentation:
- [WhatsApp Business Platform Docs](https://developers.facebook.com/docs/whatsapp/business-platform)
- More control but more complex setup
- Lower costs at scale

---

## Implementation Steps

### Step 1: Create Unified Confirmation API

Create `src/app/api/send-confirmation/route.ts`:

```typescript
import { NextRequest, NextResponse } from "next/server";
import { sendBookingConfirmation } from "@/lib/email";
import { sendBookingWhatsApp } from "@/lib/whatsapp";

export async function POST(req: NextRequest) {
  try {
    const {
      customerEmail,
      customerPhone,
      customerName,
      bookingId,
      bookingType,
      bookingDetails,
      amount,
      paymentStatus,
    } = await req.json();

    // Validate required fields
    if (!customerEmail || !customerPhone || !bookingId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Send Email Confirmation
    let emailSent = false;
    try {
      await sendBookingConfirmation({
        customerEmail,
        customerName,
        bookingId,
        bookingType,
        bookingDetails,
        amount,
        paymentStatus,
      });
      emailSent = true;
      console.log(`Email confirmation sent to ${customerEmail}`);
    } catch (emailError) {
      console.error("Email sending failed:", emailError);
      // Continue even if email fails - WhatsApp might still work
    }

    // Send WhatsApp Confirmation
    let whatsappSent = false;
    try {
      await sendBookingWhatsApp({
        customerPhone,
        customerName,
        bookingId,
        bookingType,
        bookingDetails,
        amount,
        paymentStatus,
      });
      whatsappSent = true;
      console.log(`WhatsApp confirmation sent to ${customerPhone}`);
    } catch (whatsappError) {
      console.error("WhatsApp sending failed:", whatsappError);
      // Continue even if WhatsApp fails - Email might have worked
    }

    if (!emailSent && !whatsappSent) {
      return NextResponse.json(
        {
          error: "Failed to send confirmations via both email and WhatsApp",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Confirmation sent successfully",
      channels: {
        email: emailSent,
        whatsapp: whatsappSent,
      },
    });
  } catch (error) {
    console.error("Confirmation error:", error);
    return NextResponse.json(
      { error: "Failed to send confirmation" },
      { status: 500 }
    );
  }
}
```

### Step 2: Integrate with Payment System

Update payment verification handlers to send confirmations:

```typescript
// In src/app/api/payments/verify-paystack/route.ts
// After payment verification succeeds:

if (data.status && data.data.status === "success") {
  // ... existing verification code ...

  // Send confirmation
  await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/send-confirmation`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      customerEmail: customer.email,
      customerPhone: metadata.customerPhone,
      customerName: metadata.customerName,
      bookingId: metadata.bookingId,
      bookingType: metadata.bookingType,
      bookingDetails: metadata.bookingDetails,
      amount: amount / 100, // Convert from kobo
      paymentStatus: "paid",
    }),
  });

  // ... rest of code ...
}
```

---

## Testing

### Email Testing

1. **Development Mode:**
   ```bash
   # Test email sending in development
   curl -X POST http://localhost:3000/api/send-confirmation \
     -H "Content-Type: application/json" \
     -d '{
       "customerEmail": "test@example.com",
       "customerPhone": "+2348123456789",
       "customerName": "Test User",
       "bookingId": "TEST-001",
       "bookingType": "flight",
       "bookingDetails": {
         "from": "Lagos",
         "to": "London",
         "departureDate": "2025-12-15",
         "departureTime": "10:30 AM",
         "passengers": 2
       },
       "amount": 500000,
       "paymentStatus": "paid"
     }'
   ```

2. **Check Spam Folder:** Test emails often go to spam initially
3. **Use Real Email:** Test with your own email address first

### WhatsApp Testing

1. **Twilio Sandbox:** 
   - Join sandbox by sending code to Twilio's WhatsApp number
   - Test messages will only work with sandbox-approved numbers

2. **Production:** Once approved, test with real numbers

---

## Production Checklist

- [ ] Resend account created and domain verified
- [ ] Twilio WhatsApp Business API approved
- [ ] Environment variables configured
- [ ] Email templates tested and approved
- [ ] WhatsApp messages tested and approved
- [ ] Confirmation API endpoint secured
- [ ] Error handling implemented
- [ ] Logging and monitoring setup
- [ ] Fallback mechanisms in place (if email fails, WhatsApp works and vice versa)
- [ ] Unsubscribe mechanism for marketing emails
- [ ] Compliance with Nigerian data protection laws
- [ ] Rate limiting implemented (prevent spam)
- [ ] Customer support trained on confirmation issues

---

## Troubleshooting

### Common Issues

1. **Emails Not Received**
   - Check spam/junk folder
   - Verify sender domain
   - Check Resend logs
   - Verify API key is correct

2. **WhatsApp Messages Not Delivered**
   - Verify phone number format (+234...)
   - Check Twilio logs
   - Ensure WhatsApp number is approved
   - Verify recipient has WhatsApp installed

3. **Slow Delivery**
   - Check API response times
   - Monitor service status pages
   - Implement retry logic

4. **Template Rendering Issues**
   - Test HTML email rendering across clients
   - Keep templates simple
   - Use inline CSS

---

## Next Steps

1. **Rich Media:** Add images, buttons, and better formatting
2. **Personalization:** Use customer preferences for messaging
3. **Multi-language:** Support English, Pidgin, and local languages
4. **Analytics:** Track open rates, click rates
5. **A/B Testing:** Test different message formats
6. **Automated Reminders:** Send check-in reminders, departure reminders
7. **Post-Trip Follow-up:** Request reviews and feedback

---

**Document Version:** 1.0  
**Last Reviewed:** November 2024  
**Next Review:** Before production launch