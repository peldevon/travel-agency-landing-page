# Email & WhatsApp Confirmation System Integration Guide

This guide provides comprehensive instructions for implementing automated email and WhatsApp notifications for booking confirmations in your Ontour Travels platform.

## Table of Contents

1. [Overview](#overview)
2. [Email Service Integration](#email-service-integration)
3. [WhatsApp Integration](#whatsapp-integration)
4. [Notification Templates](#notification-templates)
5. [Automation Workflows](#automation-workflows)
6. [Testing](#testing)
7. [Best Practices](#best-practices)

---

## Overview

### Notification Types

1. **Booking Confirmation** (immediate after payment)
2. **Booking Details** (comprehensive itinerary)
3. **Payment Receipt** (transaction details)
4. **Booking Reminders** (24-48 hours before travel)
5. **Booking Updates** (changes, cancellations)

### Services We'll Use

- **Email**: Resend (modern, developer-friendly) or SendGrid (enterprise-grade)
- **WhatsApp**: Twilio WhatsApp Business API or WhatsApp Business Platform

---

## Email Service Integration

### Option 1: Resend (Recommended for Startups)

#### Why Resend?
- Modern, simple API
- Generous free tier (3,000 emails/month)
- Built-in email templates with React
- Excellent deliverability

#### Step 1: Create Resend Account

1. Visit [Resend.com](https://resend.com/)
2. Sign up for a free account
3. Verify your email domain
4. Generate API key

#### Step 2: Add to Environment Variables

```env
# Resend Configuration
RESEND_API_KEY=re_your_api_key_here
EMAIL_FROM=bookings@ontourtravels.com.ng
EMAIL_REPLY_TO=info@ontourtravels.com.ng
```

#### Step 3: Install Resend SDK

```bash
bun add resend
# or
npm install resend
```

#### Step 4: Create Email Utility

Create `src/lib/email.ts`:

```typescript
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

interface SendEmailParams {
  to: string;
  subject: string;
  html: string;
  text?: string;
  from?: string;
  replyTo?: string;
  attachments?: Array<{
    filename: string;
    content: Buffer | string;
  }>;
}

export async function sendEmail({
  to,
  subject,
  html,
  text,
  from = process.env.EMAIL_FROM,
  replyTo = process.env.EMAIL_REPLY_TO,
  attachments = [],
}: SendEmailParams) {
  try {
    const { data, error } = await resend.emails.send({
      from: from!,
      to,
      subject,
      html,
      text: text || undefined,
      replyTo: replyTo!,
      attachments: attachments.length > 0 ? attachments : undefined,
    });

    if (error) {
      console.error('Email sending error:', error);
      return { success: false, error: error.message };
    }

    console.log('Email sent successfully:', data);
    return { success: true, data };
  } catch (error: any) {
    console.error('Email sending error:', error);
    return { success: false, error: error.message };
  }
}

// Booking confirmation email
export async function sendBookingConfirmation({
  to,
  customerName,
  bookingId,
  bookingType,
  bookingDetails,
  amount,
  paymentReference,
}: {
  to: string;
  customerName: string;
  bookingId: string;
  bookingType: string;
  bookingDetails: string;
  amount: number;
  paymentReference: string;
}) {
  const subject = `Booking Confirmed - ${bookingType.toUpperCase()} #${bookingId}`;
  
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #152852; color: white; padding: 20px; text-align: center; }
        .content { padding: 30px 20px; background: #f9f9f9; }
        .booking-card { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
        .button { display: inline-block; padding: 12px 30px; background: #152852; color: white; text-decoration: none; border-radius: 5px; margin: 10px 0; }
        .highlight { font-weight: bold; color: #152852; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Booking Confirmed! ✅</h1>
        </div>
        <div class="content">
          <p>Dear ${customerName},</p>
          <p>Thank you for booking with <strong>Ontour Travels</strong>! Your ${bookingType} booking has been confirmed.</p>
          
          <div class="booking-card">
            <h2>Booking Details</h2>
            <p><span class="highlight">Booking ID:</span> ${bookingId}</p>
            <p><span class="highlight">Type:</span> ${bookingType.toUpperCase()}</p>
            <p>${bookingDetails}</p>
            <hr>
            <p><span class="highlight">Amount Paid:</span> ₦${amount.toLocaleString()}</p>
            <p><span class="highlight">Payment Reference:</span> ${paymentReference}</p>
          </div>
          
          <p>Your booking confirmation and travel documents have been sent to this email. Please check your inbox and spam folder.</p>
          
          <p><strong>What's Next?</strong></p>
          <ul>
            <li>Check your travel documents attached to this email</li>
            <li>Ensure your passport is valid (6+ months for international travel)</li>
            <li>Contact us on WhatsApp if you need any assistance</li>
          </ul>
          
          <center>
            <a href="https://wa.me/2348123456789?text=Hi%20Ontour%2C%20regarding%20booking%20${bookingId}" class="button">Contact Us on WhatsApp</a>
          </center>
        </div>
        <div class="footer">
          <p>Ontour Travels | Lagos, Nigeria</p>
          <p>Phone: +234 812 345 6789 | Email: info@ontourtravels.com.ng</p>
          <p>© 2024 Ontour Travels. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  const text = `
    Booking Confirmed!
    
    Dear ${customerName},
    
    Thank you for booking with Ontour Travels! Your ${bookingType} booking has been confirmed.
    
    Booking ID: ${bookingId}
    Type: ${bookingType.toUpperCase()}
    ${bookingDetails}
    
    Amount Paid: ₦${amount.toLocaleString()}
    Payment Reference: ${paymentReference}
    
    Contact us on WhatsApp: https://wa.me/2348123456789
    
    Ontour Travels | +234 812 345 6789 | info@ontourtravels.com.ng
  `;

  return sendEmail({ to, subject, html, text });
}

// Payment receipt email
export async function sendPaymentReceipt({
  to,
  customerName,
  amount,
  paymentReference,
  paymentDate,
  bookingId,
}: {
  to: string;
  customerName: string;
  amount: number;
  paymentReference: string;
  paymentDate: string;
  bookingId: string;
}) {
  const subject = `Payment Receipt - ${paymentReference}`;
  
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #152852; color: white; padding: 20px; text-align: center; }
        .receipt { background: white; padding: 30px; border: 1px solid #ddd; margin: 20px 0; }
        .row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #eee; }
        .total { font-size: 20px; font-weight: bold; color: #152852; }
        .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Payment Receipt</h1>
        </div>
        <div class="receipt">
          <h2>Payment Confirmation</h2>
          <p>Dear ${customerName},</p>
          <p>Thank you for your payment. Here are your transaction details:</p>
          
          <div class="row">
            <span>Payment Reference:</span>
            <strong>${paymentReference}</strong>
          </div>
          <div class="row">
            <span>Booking ID:</span>
            <strong>${bookingId}</strong>
          </div>
          <div class="row">
            <span>Payment Date:</span>
            <strong>${paymentDate}</strong>
          </div>
          <div class="row total">
            <span>Amount Paid:</span>
            <span>₦${amount.toLocaleString()}</span>
          </div>
          
          <p style="margin-top: 20px;">This receipt serves as proof of payment for your booking with Ontour Travels.</p>
        </div>
        <div class="footer">
          <p>Ontour Travels | Lagos, Nigeria</p>
          <p>Phone: +234 812 345 6789 | Email: info@ontourtravels.com.ng</p>
        </div>
      </div>
    </body>
    </html>
  `;

  return sendEmail({ to, subject, html });
}
```

#### Step 5: Create Email Sending API Route

Create `src/app/api/notifications/email/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { sendBookingConfirmation, sendPaymentReceipt } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, ...data } = body;

    let result;

    switch (type) {
      case 'booking-confirmation':
        result = await sendBookingConfirmation(data);
        break;
      case 'payment-receipt':
        result = await sendPaymentReceipt(data);
        break;
      default:
        return NextResponse.json({
          success: false,
          error: 'Invalid email type',
        }, { status: 400 });
    }

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: 'Email sent successfully',
      });
    }

    return NextResponse.json({
      success: false,
      error: result.error,
    }, { status: 500 });

  } catch (error: any) {
    console.error('Email API error:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to send email',
    }, { status: 500 });
  }
}
```

---

### Option 2: SendGrid (Enterprise Alternative)

If you prefer SendGrid, here's a quick setup:

#### Install SDK

```bash
bun add @sendgrid/mail
```

#### Configuration

```typescript
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export async function sendEmailViaSendGrid({
  to,
  subject,
  html,
  text,
}: {
  to: string;
  subject: string;
  html: string;
  text?: string;
}) {
  try {
    await sgMail.send({
      to,
      from: process.env.EMAIL_FROM!,
      subject,
      html,
      text: text || undefined,
    });

    return { success: true };
  } catch (error: any) {
    console.error('SendGrid error:', error);
    return { success: false, error: error.message };
  }
}
```

---

## WhatsApp Integration

### Option 1: Twilio WhatsApp Business API

#### Why Twilio?
- Reliable, well-documented API
- Pay-as-you-go pricing
- Template message support
- Sandbox for testing

#### Step 1: Create Twilio Account

1. Visit [Twilio.com](https://www.twilio.com/)
2. Sign up and verify your account
3. Navigate to Messaging → Try WhatsApp
4. Get your Account SID and Auth Token
5. Set up WhatsApp Sandbox for testing

#### Step 2: Add to Environment Variables

```env
# Twilio WhatsApp Configuration
TWILIO_ACCOUNT_SID=your_account_sid_here
TWILIO_AUTH_TOKEN=your_auth_token_here
TWILIO_WHATSAPP_FROM=whatsapp:+14155238886  # Sandbox number
TWILIO_WHATSAPP_TO_PREFIX=whatsapp:+234  # Nigeria prefix
```

#### Step 3: Install Twilio SDK

```bash
bun add twilio
# or
npm install twilio
```

#### Step 4: Create WhatsApp Utility

Create `src/lib/whatsapp.ts`:

```typescript
import twilio from 'twilio';

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

interface SendWhatsAppParams {
  to: string;  // Phone number in format: +2348123456789
  message: string;
}

export async function sendWhatsAppMessage({ to, message }: SendWhatsAppParams) {
  try {
    // Format phone number for WhatsApp
    const formattedTo = `whatsapp:${to}`;
    const from = process.env.TWILIO_WHATSAPP_FROM!;

    const result = await client.messages.create({
      from,
      to: formattedTo,
      body: message,
    });

    console.log('WhatsApp message sent:', result.sid);
    return { success: true, messageId: result.sid };
  } catch (error: any) {
    console.error('WhatsApp sending error:', error);
    return { success: false, error: error.message };
  }
}

// Booking confirmation WhatsApp
export async function sendBookingConfirmationWhatsApp({
  to,
  customerName,
  bookingId,
  bookingType,
  bookingDetails,
  amount,
  paymentReference,
}: {
  to: string;
  customerName: string;
  bookingId: string;
  bookingType: string;
  bookingDetails: string;
  amount: number;
  paymentReference: string;
}) {
  const message = `
🎉 *Booking Confirmed!*

Hi ${customerName},

Your ${bookingType} booking is confirmed!

📋 *Booking Details:*
🆔 Booking ID: ${bookingId}
📄 Type: ${bookingType.toUpperCase()}
${bookingDetails}

💰 *Payment:*
Amount: ₦${amount.toLocaleString()}
Reference: ${paymentReference}

✅ What's Next?
• Check your email for full details
• Ensure valid travel documents
• Contact us if you need help

Need assistance? Reply to this message or call us at +234 812 345 6789.

Thank you for choosing Ontour Travels! ✈️

_Ontour Travels - Your trusted travel partner_
  `.trim();

  return sendWhatsAppMessage({ to, message });
}

// Payment receipt WhatsApp
export async function sendPaymentReceiptWhatsApp({
  to,
  customerName,
  amount,
  paymentReference,
  bookingId,
}: {
  to: string;
  customerName: string;
  amount: number;
  paymentReference: string;
  bookingId: string;
}) {
  const message = `
🧾 *Payment Receipt*

Hi ${customerName},

Payment received successfully!

💳 *Transaction Details:*
Amount: ₦${amount.toLocaleString()}
Reference: ${paymentReference}
Booking ID: ${bookingId}
Status: ✅ Confirmed

Your receipt has been sent to your email.

Thank you for your payment!

_Ontour Travels_
  `.trim();

  return sendWhatsAppMessage({ to, message });
}

// Booking reminder WhatsApp
export async function sendBookingReminderWhatsApp({
  to,
  customerName,
  bookingType,
  travelDate,
  bookingDetails,
}: {
  to: string;
  customerName: string;
  bookingType: string;
  travelDate: string;
  bookingDetails: string;
}) {
  const message = `
⏰ *Travel Reminder*

Hi ${customerName},

Your ${bookingType} is coming up soon!

📅 *Travel Date:* ${travelDate}

📋 ${bookingDetails}

✅ *Pre-Travel Checklist:*
• Valid passport/ID
• Confirmed bookings
• Travel insurance (recommended)
• Contact details saved

Need to make changes? Contact us ASAP.

Safe travels! ✈️

_Ontour Travels | +234 812 345 6789_
  `.trim();

  return sendWhatsAppMessage({ to, message });
}
```

#### Step 5: Create WhatsApp API Route

Create `src/app/api/notifications/whatsapp/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server';
import {
  sendBookingConfirmationWhatsApp,
  sendPaymentReceiptWhatsApp,
  sendBookingReminderWhatsApp,
} from '@/lib/whatsapp';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, ...data } = body;

    let result;

    switch (type) {
      case 'booking-confirmation':
        result = await sendBookingConfirmationWhatsApp(data);
        break;
      case 'payment-receipt':
        result = await sendPaymentReceiptWhatsApp(data);
        break;
      case 'booking-reminder':
        result = await sendBookingReminderWhatsApp(data);
        break;
      default:
        return NextResponse.json({
          success: false,
          error: 'Invalid message type',
        }, { status: 400 });
    }

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: 'WhatsApp message sent successfully',
        messageId: result.messageId,
      });
    }

    return NextResponse.json({
      success: false,
      error: result.error,
    }, { status: 500 });

  } catch (error: any) {
    console.error('WhatsApp API error:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to send WhatsApp message',
    }, { status: 500 });
  }
}
```

---

### Option 2: WhatsApp Business Platform (Official API)

For production-grade WhatsApp messaging with templates and higher limits:

1. Apply for WhatsApp Business API access via Meta
2. Set up message templates (required for business-initiated messages)
3. Integrate via Meta's Business SDK or cloud API

**Note**: This requires business verification and has a more complex setup. Use Twilio for initial development.

---

## Notification Templates

### Template Variables

Common variables across all notifications:

```typescript
interface NotificationData {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  bookingId: string;
  bookingType: 'flight' | 'hotel' | 'shortlet' | 'tour';
  amount: number;
  currency: string;
  paymentReference: string;
  paymentDate: string;
  bookingDetails: {
    // Flight-specific
    from?: string;
    to?: string;
    departure?: string;
    return?: string;
    airline?: string;
    pnr?: string;
    
    // Hotel-specific
    hotelName?: string;
    checkIn?: string;
    checkOut?: string;
    roomType?: string;
    
    // Shortlet-specific
    propertyName?: string;
    address?: string;
    checkInTime?: string;
    checkOutTime?: string;
    
    // Tour-specific
    tourName?: string;
    startDate?: string;
    endDate?: string;
    duration?: string;
  };
}
```

---

## Automation Workflows

### Trigger Points

1. **Immediate (After Payment Confirmation)**:
   - Email: Booking confirmation + Payment receipt
   - WhatsApp: Booking confirmation

2. **24-48 Hours Before Travel**:
   - Email: Travel reminder + Checklist
   - WhatsApp: Travel reminder

3. **On Booking Modification**:
   - Email: Update notification
   - WhatsApp: Update notification

### Implementation Example

Create `src/lib/notifications.ts`:

```typescript
import { sendBookingConfirmation, sendPaymentReceipt } from './email';
import { sendBookingConfirmationWhatsApp, sendPaymentReceiptWhatsApp } from './whatsapp';

interface SendBookingNotificationsParams {
  email: string;
  phone: string;
  customerName: string;
  bookingId: string;
  bookingType: string;
  bookingDetails: string;
  amount: number;
  paymentReference: string;
}

export async function sendBookingNotifications(params: SendBookingNotificationsParams) {
  const { email, phone, ...rest } = params;

  // Send email notifications
  const emailPromises = [
    sendBookingConfirmation({ to: email, ...rest }),
    sendPaymentReceipt({
      to: email,
      customerName: rest.customerName,
      amount: rest.amount,
      paymentReference: rest.paymentReference,
      paymentDate: new Date().toISOString(),
      bookingId: rest.bookingId,
    }),
  ];

  // Send WhatsApp notifications
  const whatsappPromises = [
    sendBookingConfirmationWhatsApp({ to: phone, ...rest }),
  ];

  // Execute all notifications in parallel
  const [emailResults, whatsappResults] = await Promise.all([
    Promise.allSettled(emailPromises),
    Promise.allSettled(whatsappPromises),
  ]);

  // Log results
  console.log('Email results:', emailResults);
  console.log('WhatsApp results:', whatsappResults);

  return {
    success: true,
    emailsSent: emailResults.filter(r => r.status === 'fulfilled').length,
    whatsappSent: whatsappResults.filter(r => r.status === 'fulfilled').length,
  };
}
```

---

## Testing

### Email Testing

1. **Resend Test Mode**: Use test API key and send to your own email
2. **Mailtrap**: Use Mailtrap for development (catches all emails)
3. **Litmus/Email on Acid**: Test email rendering across clients

### WhatsApp Testing

1. **Twilio Sandbox**: Join sandbox with your phone number
2. **Test Messages**: Send test messages to yourself
3. **Template Verification**: Ensure templates are approved before production

### Testing Checklist

- [ ] Send test booking confirmation email
- [ ] Verify email formatting on mobile and desktop
- [ ] Send test WhatsApp message
- [ ] Test all notification triggers
- [ ] Verify links work correctly
- [ ] Check spam/junk folders
- [ ] Test with international phone numbers
- [ ] Verify unsubscribe/opt-out works

---

## Best Practices

### Email Best Practices

1. **Deliverability**:
   - Use verified domain
   - Implement SPF, DKIM, DMARC
   - Keep bounce rates low (<5%)
   - Monitor spam complaints

2. **Design**:
   - Mobile-responsive templates
   - Clear call-to-action buttons
   - Consistent branding
   - Plain text fallback

3. **Content**:
   - Clear subject lines
   - Personalized greetings
   - Important info at the top
   - Unsubscribe link (required for marketing emails)

### WhatsApp Best Practices

1. **Compliance**:
   - Get explicit opt-in from users
   - Don't spam (max 1-2 messages per booking)
   - Respect do-not-disturb hours (9AM-9PM)
   - Honor opt-out requests immediately

2. **Messaging**:
   - Keep messages concise (max 1600 characters)
   - Use emojis sparingly for clarity
   - Include company name
   - Provide clear action items

3. **Templates** (for production):
   - Pre-approve all templates with Meta
   - Use variables for personalization
   - Keep templates under 1024 characters
   - Follow Meta's formatting guidelines

---

## Next Steps After Implementation

1. **Analytics**: Track open rates, click-through rates, delivery rates
2. **A/B Testing**: Test different subject lines and content
3. **Automation**: Schedule reminders using cron jobs or queue systems
4. **Feedback Loop**: Ask customers for feedback on notifications
5. **Localization**: Add support for multiple languages

---

## Troubleshooting

**Email not received:**
- Check spam/junk folder
- Verify email address is correct
- Check email service logs
- Ensure domain is verified

**WhatsApp not delivered:**
- Verify phone number format (+234...)
- Check Twilio account balance
- Ensure number is WhatsApp-enabled
- Review Twilio error logs

**Slow delivery:**
- Use background jobs for notifications
- Implement queue system (Bull, BullMQ)
- Don't block payment confirmation on email/WhatsApp

---

**Need Help?**
- Resend Docs: https://resend.com/docs
- SendGrid Docs: https://docs.sendgrid.com/
- Twilio Docs: https://www.twilio.com/docs/whatsapp
- WhatsApp Business API: https://developers.facebook.com/docs/whatsapp
