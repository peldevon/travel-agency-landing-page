# Amadeus API Integration Guide

This guide provides a comprehensive, step-by-step process to integrate Amadeus Flight and Hotel Search APIs into your Next.js travel booking platform.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Getting Amadeus API Credentials](#getting-amadeus-api-credentials)
3. [Environment Variables Setup](#environment-variables-setup)
4. [Installing Dependencies](#installing-dependencies)
5. [Amadeus Authentication](#amadeus-authentication)
6. [Flight Search Integration](#flight-search-integration)
7. [Hotel Search Integration](#hotel-search-integration)
8. [Frontend Integration](#frontend-integration)
9. [Error Handling](#error-handling)
10. [Testing](#testing)

---

## Prerequisites

- Next.js 15 application (already set up)
- Node.js 18+ or Bun runtime
- Basic understanding of REST APIs
- Amadeus for Developers account

---

## Getting Amadeus API Credentials

### Step 1: Create Amadeus Account

1. Visit [Amadeus for Developers](https://developers.amadeus.com/)
2. Click "Register" and create your account
3. Verify your email address
4. Log in to your account

### Step 2: Create a New App

1. Navigate to "My Apps" in the dashboard
2. Click "Create New App"
3. Fill in the app details:
   - **App Name**: `Ontour Travels Platform`
   - **Description**: `Travel booking platform for flights and hotels`
4. Click "Create"

### Step 3: Get Your API Credentials

1. Once the app is created, you'll see:
   - **API Key** (Client ID)
   - **API Secret** (Client Secret)
2. Copy both credentials
3. Choose your environment:
   - **Test Environment**: For development (free, with test data)
   - **Production Environment**: For live bookings (paid, real data)

---

## Environment Variables Setup

Add these variables to your `.env` file:

```env
# Amadeus API Credentials
AMADEUS_API_KEY=your_client_id_here
AMADEUS_API_SECRET=your_client_secret_here
AMADEUS_ENVIRONMENT=test  # Use 'test' for development, 'production' for live

# Amadeus API Base URLs
AMADEUS_API_BASE_URL=https://test.api.amadeus.com  # Use https://api.amadeus.com for production
```

**Security Note**: Never commit `.env` files to version control. Ensure `.env` is in your `.gitignore`.

---

## Installing Dependencies

Install the official Amadeus Node SDK:

```bash
bun add amadeus
# or
npm install amadeus
```

---

## Amadeus Authentication

### Step 1: Create Amadeus Client Utility

Create a file at `src/lib/amadeus.ts`:

```typescript
import Amadeus from 'amadeus';

// Initialize Amadeus client
const amadeus = new Amadeus({
  clientId: process.env.AMADEUS_API_KEY!,
  clientSecret: process.env.AMADEUS_API_SECRET!,
  hostname: process.env.AMADEUS_ENVIRONMENT === 'production' 
    ? 'production' 
    : 'test',
});

export default amadeus;
```

### Step 2: Test Authentication

Create a test API route at `src/app/api/test-amadeus/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server';
import amadeus from '@/lib/amadeus';

export async function GET(request: NextRequest) {
  try {
    // Test API call - Get airport information for Lagos
    const response = await amadeus.referenceData.locations.get({
      keyword: 'LOS',
      subType: 'AIRPORT',
    });

    return NextResponse.json({
      success: true,
      message: 'Amadeus API connection successful',
      data: response.data,
    });
  } catch (error: any) {
    console.error('Amadeus API Error:', error);
    return NextResponse.json({
      success: false,
      error: error.message,
      description: error.description,
    }, { status: 500 });
  }
}
```

Test by visiting: `http://localhost:3000/api/test-amadeus`

---

## Flight Search Integration

### Step 1: Create Flight Search API Route

Create `src/app/api/flights/search/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server';
import amadeus from '@/lib/amadeus';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const {
      originLocationCode,
      destinationLocationCode,
      departureDate,
      returnDate,
      adults = 1,
      children = 0,
      infants = 0,
      travelClass = 'ECONOMY',
      currencyCode = 'NGN',
      max = 50,
    } = body;

    // Validate required fields
    if (!originLocationCode || !destinationLocationCode || !departureDate) {
      return NextResponse.json({
        success: false,
        error: 'Missing required fields',
      }, { status: 400 });
    }

    // Build search parameters
    const searchParams: any = {
      originLocationCode,
      destinationLocationCode,
      departureDate,
      adults: parseInt(adults),
      currencyCode,
      max,
    };

    // Add optional parameters
    if (returnDate) {
      searchParams.returnDate = returnDate;
    }
    
    if (children > 0) {
      searchParams.children = parseInt(children);
    }
    
    if (infants > 0) {
      searchParams.infants = parseInt(infants);
    }
    
    if (travelClass) {
      searchParams.travelClass = travelClass.toUpperCase();
    }

    // Call Amadeus Flight Offers Search API
    const response = await amadeus.shopping.flightOffersSearch.get(searchParams);

    return NextResponse.json({
      success: true,
      data: response.data,
      meta: response.result?.meta || {},
      dictionaries: response.result?.dictionaries || {},
    });

  } catch (error: any) {
    console.error('Flight Search Error:', error);
    return NextResponse.json({
      success: false,
      error: error.message || 'Failed to search flights',
      description: error.description,
    }, { status: 500 });
  }
}
```

### Step 2: Create Flight Offer Pricing API Route

Create `src/app/api/flights/price/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server';
import amadeus from '@/lib/amadeus';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { flightOffers } = body;

    if (!flightOffers) {
      return NextResponse.json({
        success: false,
        error: 'Flight offers are required',
      }, { status: 400 });
    }

    // Get final pricing for selected flight offer
    const response = await amadeus.shopping.flightOffers.pricing.post(
      JSON.stringify({
        data: {
          type: 'flight-offers-pricing',
          flightOffers: Array.isArray(flightOffers) ? flightOffers : [flightOffers],
        },
      })
    );

    return NextResponse.json({
      success: true,
      data: response.data,
    });

  } catch (error: any) {
    console.error('Flight Pricing Error:', error);
    return NextResponse.json({
      success: false,
      error: error.message || 'Failed to get flight pricing',
      description: error.description,
    }, { status: 500 });
  }
}
```

---

## Hotel Search Integration

### Step 1: Create Hotel Search API Route

Create `src/app/api/hotels/search/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server';
import amadeus from '@/lib/amadeus';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const {
      cityCode,
      checkInDate,
      checkOutDate,
      adults = 1,
      rooms = 1,
      currency = 'NGN',
      radius = 50,
      radiusUnit = 'KM',
      ratings = [],
      amenities = [],
      priceRange,
    } = body;

    // Validate required fields
    if (!cityCode || !checkInDate || !checkOutDate) {
      return NextResponse.json({
        success: false,
        error: 'Missing required fields: cityCode, checkInDate, checkOutDate',
      }, { status: 400 });
    }

    // Step 1: Search for hotels by city
    const hotelsResponse = await amadeus.referenceData.locations.hotels.byCity.get({
      cityCode,
      radius,
      radiusUnit,
      ratings: ratings.join(',') || undefined,
      amenities: amenities.join(',') || undefined,
    });

    if (!hotelsResponse.data || hotelsResponse.data.length === 0) {
      return NextResponse.json({
        success: true,
        data: [],
        message: 'No hotels found for this location',
      });
    }

    // Extract hotel IDs
    const hotelIds = hotelsResponse.data
      .slice(0, 50)  // Limit to 50 hotels
      .map((hotel: any) => hotel.hotelId)
      .join(',');

    // Step 2: Get hotel offers with availability and pricing
    const offersResponse = await amadeus.shopping.hotelOffersSearch.get({
      hotelIds,
      checkInDate,
      checkOutDate,
      adults: parseInt(adults),
      roomQuantity: parseInt(rooms),
      currency,
      priceRange: priceRange || undefined,
    });

    return NextResponse.json({
      success: true,
      data: offersResponse.data,
    });

  } catch (error: any) {
    console.error('Hotel Search Error:', error);
    return NextResponse.json({
      success: false,
      error: error.message || 'Failed to search hotels',
      description: error.description,
    }, { status: 500 });
  }
}
```

### Step 2: Create Hotel Details API Route

Create `src/app/api/hotels/[hotelId]/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server';
import amadeus from '@/lib/amadeus';

export async function GET(
  request: NextRequest,
  { params }: { params: { hotelId: string } }
) {
  try {
    const { hotelId } = params;

    if (!hotelId) {
      return NextResponse.json({
        success: false,
        error: 'Hotel ID is required',
      }, { status: 400 });
    }

    // Get detailed hotel information
    const response = await amadeus.shopping.hotelOffersByHotel.get({
      hotelId,
    });

    return NextResponse.json({
      success: true,
      data: response.data,
    });

  } catch (error: any) {
    console.error('Hotel Details Error:', error);
    return NextResponse.json({
      success: false,
      error: error.message || 'Failed to get hotel details',
      description: error.description,
    }, { status: 500 });
  }
}
```

---

## Frontend Integration

### Update the Booking Page

Update `src/app/book/page.tsx` to integrate with the new APIs:

```typescript
// Add this function to handle flight search
const handleFlightSearch = async (formData: any) => {
  setSearching(true);
  setError(null);

  try {
    const response = await fetch('/api/flights/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        originLocationCode: formData.from,
        destinationLocationCode: formData.to,
        departureDate: formData.departDate,
        returnDate: formData.returnDate || undefined,
        adults: formData.adults || 1,
        children: formData.children || 0,
        infants: formData.infants || 0,
        travelClass: formData.cabin || 'ECONOMY',
        currencyCode: formData.currency || 'NGN',
      }),
    });

    const data = await response.json();

    if (data.success) {
      setFlightResults(data.data);
      setDictionaries(data.dictionaries);
    } else {
      setError(data.error || 'Failed to search flights');
    }
  } catch (error) {
    setError('An error occurred while searching flights');
    console.error(error);
  } finally {
    setSearching(false);
  }
};

// Add this function to handle hotel search
const handleHotelSearch = async (formData: any) => {
  setSearching(true);
  setError(null);

  try {
    const response = await fetch('/api/hotels/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        cityCode: formData.cityCode,
        checkInDate: formData.checkIn,
        checkOutDate: formData.checkOut,
        adults: formData.adults || 1,
        rooms: formData.rooms || 1,
        currency: formData.currency || 'NGN',
        ratings: formData.starRating || [],
        amenities: formData.amenities || [],
        priceRange: formData.priceRange || undefined,
      }),
    });

    const data = await response.json();

    if (data.success) {
      setHotelResults(data.data);
    } else {
      setError(data.error || 'Failed to search hotels');
    }
  } catch (error) {
    setError('An error occurred while searching hotels');
    console.error(error);
  } finally {
    setSearching(false);
  }
};
```

---

## Error Handling

### Common Amadeus API Errors

1. **Invalid API Credentials** (401 Unauthorized)
   - Check that `AMADEUS_API_KEY` and `AMADEUS_API_SECRET` are correct
   - Verify environment (test vs production)

2. **Rate Limiting** (429 Too Many Requests)
   - Implement request throttling
   - Cache results when possible

3. **Invalid Parameters** (400 Bad Request)
   - Validate all input parameters before API calls
   - Check date formats (YYYY-MM-DD)
   - Verify IATA codes for airports/cities

4. **No Results Found** (200 OK with empty data)
   - Show user-friendly message
   - Suggest alternative dates or destinations

### Error Handling Utility

Create `src/lib/amadeus-error-handler.ts`:

```typescript
export interface AmadeusError {
  code: number;
  title: string;
  detail?: string;
  source?: {
    parameter?: string;
    pointer?: string;
  };
}

export function handleAmadeusError(error: any): string {
  if (error.response?.body?.errors) {
    const errors: AmadeusError[] = error.response.body.errors;
    return errors.map(e => `${e.title}: ${e.detail || ''}`).join(', ');
  }
  
  if (error.response?.statusCode === 401) {
    return 'Authentication failed. Please check API credentials.';
  }
  
  if (error.response?.statusCode === 429) {
    return 'Rate limit exceeded. Please try again later.';
  }
  
  if (error.response?.statusCode === 400) {
    return 'Invalid search parameters. Please check your input.';
  }
  
  return error.message || 'An unexpected error occurred';
}
```

---

## Testing

### Step 1: Test Flight Search

```bash
# Test flight search API
curl -X POST http://localhost:3000/api/flights/search \
  -H "Content-Type: application/json" \
  -d '{
    "originLocationCode": "LOS",
    "destinationLocationCode": "LHR",
    "departureDate": "2025-12-15",
    "returnDate": "2025-12-22",
    "adults": 1,
    "travelClass": "ECONOMY",
    "currencyCode": "NGN"
  }'
```

### Step 2: Test Hotel Search

```bash
# Test hotel search API
curl -X POST http://localhost:3000/api/hotels/search \
  -H "Content-Type: application/json" \
  -d '{
    "cityCode": "LAG",
    "checkInDate": "2025-12-15",
    "checkOutDate": "2025-12-18",
    "adults": 2,
    "rooms": 1,
    "currency": "NGN"
  }'
```

### Step 3: Test in Browser

1. Navigate to `/book` in your browser
2. Search for flights: Lagos (LOS) → London (LHR)
3. Verify results display correctly
4. Switch to Hotels tab
5. Search for hotels in Lagos (LAG)
6. Verify hotel results display correctly

---

## Additional Resources

- [Amadeus for Developers Documentation](https://developers.amadeus.com/self-service)
- [Flight Offers Search API Reference](https://developers.amadeus.com/self-service/category/air/api-doc/flight-offers-search)
- [Hotel Search API Reference](https://developers.amadeus.com/self-service/category/hotels/api-doc/hotel-search)
- [Amadeus Node SDK on GitHub](https://github.com/amadeus4dev/amadeus-node)

---

## Next Steps

After integrating Amadeus APIs:

1. **Payment Integration**: Connect Paystack/Flutterwave for bookings
2. **Booking Confirmation**: Send email and WhatsApp confirmations
3. **Booking Management**: Create a dashboard to track bookings
4. **PNR Generation**: Implement Passenger Name Record creation
5. **Ticket Issuance**: Integrate flight ticketing workflow

---

**Need Help?** Contact the Amadeus support team or refer to their extensive documentation and community forums.
