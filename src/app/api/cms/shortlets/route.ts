import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { visualCmsShortlets } from '@/db/schema';
import { eq, like, gte, lte, and, or } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    // Single record fetch
    if (id) {
      if (!id || isNaN(parseInt(id))) {
        return NextResponse.json({ 
          error: "Valid ID is required",
          code: "INVALID_ID" 
        }, { status: 400 });
      }

      const shortlet = await db.select()
        .from(visualCmsShortlets)
        .where(eq(visualCmsShortlets.id, parseInt(id)))
        .limit(1);

      if (shortlet.length === 0) {
        return NextResponse.json({ error: 'Shortlet not found' }, { status: 404 });
      }

      return NextResponse.json(shortlet[0], { status: 200 });
    }

    // List with filters and pagination
    const limit = Math.min(parseInt(searchParams.get('limit') ?? '10'), 100);
    const offset = parseInt(searchParams.get('offset') ?? '0');
    const search = searchParams.get('search');
    const status = searchParams.get('status');
    const location = searchParams.get('location');
    const minPrice = searchParams.get('min_price');
    const maxPrice = searchParams.get('max_price');

    let query = db.select().from(visualCmsShortlets);

    // Build filter conditions
    const conditions = [];

    if (search) {
      conditions.push(
        or(
          like(visualCmsShortlets.title, `%${search}%`),
          like(visualCmsShortlets.description, `%${search}%`)
        )
      );
    }

    if (status) {
      conditions.push(eq(visualCmsShortlets.status, status));
    }

    if (location) {
      conditions.push(like(visualCmsShortlets.location, `%${location}%`));
    }

    if (minPrice) {
      const minPriceValue = parseInt(minPrice);
      if (!isNaN(minPriceValue)) {
        conditions.push(gte(visualCmsShortlets.pricePerNight, minPriceValue));
      }
    }

    if (maxPrice) {
      const maxPriceValue = parseInt(maxPrice);
      if (!isNaN(maxPriceValue)) {
        conditions.push(lte(visualCmsShortlets.pricePerNight, maxPriceValue));
      }
    }

    if (conditions.length > 0) {
      query = query.where(and(...conditions));
    }

    const results = await query.limit(limit).offset(offset);

    return NextResponse.json(results, { status: 200 });

  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + (error as Error).message 
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      title, 
      slug, 
      description, 
      location, 
      price_per_night, 
      bedrooms,
      amenities,
      images,
      rating,
      reviews_count,
      status 
    } = body;

    // Validate required fields
    if (!title || title.trim() === '') {
      return NextResponse.json({ 
        error: "Title is required and cannot be empty",
        code: "MISSING_TITLE" 
      }, { status: 400 });
    }

    if (!slug || slug.trim() === '') {
      return NextResponse.json({ 
        error: "Slug is required and cannot be empty",
        code: "MISSING_SLUG" 
      }, { status: 400 });
    }

    if (!description || description.trim() === '') {
      return NextResponse.json({ 
        error: "Description is required and cannot be empty",
        code: "MISSING_DESCRIPTION" 
      }, { status: 400 });
    }

    if (!location || location.trim() === '') {
      return NextResponse.json({ 
        error: "Location is required and cannot be empty",
        code: "MISSING_LOCATION" 
      }, { status: 400 });
    }

    if (!price_per_night) {
      return NextResponse.json({ 
        error: "Price per night is required",
        code: "MISSING_PRICE" 
      }, { status: 400 });
    }

    const pricePerNightValue = parseInt(price_per_night);
    if (isNaN(pricePerNightValue) || pricePerNightValue <= 0) {
      return NextResponse.json({ 
        error: "Price per night must be a positive integer",
        code: "INVALID_PRICE" 
      }, { status: 400 });
    }

    if (!bedrooms) {
      return NextResponse.json({ 
        error: "Bedrooms is required",
        code: "MISSING_BEDROOMS" 
      }, { status: 400 });
    }

    const bedroomsValue = parseInt(bedrooms);
    if (isNaN(bedroomsValue) || bedroomsValue <= 0) {
      return NextResponse.json({ 
        error: "Bedrooms must be a positive integer",
        code: "INVALID_BEDROOMS" 
      }, { status: 400 });
    }

    // Validate status if provided
    const validStatuses = ['active', 'inactive'];
    const shortletStatus = status || 'active';
    if (!validStatuses.includes(shortletStatus)) {
      return NextResponse.json({ 
        error: "Status must be one of: active, inactive",
        code: "INVALID_STATUS" 
      }, { status: 400 });
    }

    // Check slug uniqueness
    const existingShortlet = await db.select()
      .from(visualCmsShortlets)
      .where(eq(visualCmsShortlets.slug, slug.trim()))
      .limit(1);

    if (existingShortlet.length > 0) {
      return NextResponse.json({ 
        error: "Slug must be unique. This slug is already in use",
        code: "DUPLICATE_SLUG" 
      }, { status: 400 });
    }

    // Validate JSON fields if provided
    let parsedAmenities = amenities || [];
    let parsedImages = images || [];

    if (amenities) {
      if (!Array.isArray(amenities)) {
        return NextResponse.json({ 
          error: "Amenities must be a JSON array",
          code: "INVALID_AMENITIES" 
        }, { status: 400 });
      }
      parsedAmenities = amenities;
    }

    if (images) {
      if (!Array.isArray(images)) {
        return NextResponse.json({ 
          error: "Images must be a JSON array",
          code: "INVALID_IMAGES" 
        }, { status: 400 });
      }
      parsedImages = images;
    }

    const now = new Date().toISOString();

    const newShortlet = await db.insert(visualCmsShortlets)
      .values({
        title: title.trim(),
        slug: slug.trim(),
        description: description.trim(),
        location: location.trim(),
        pricePerNight: pricePerNightValue,
        bedrooms: bedroomsValue,
        amenities: parsedAmenities,
        images: parsedImages,
        rating: rating !== undefined ? parseFloat(rating) : 0,
        reviewsCount: reviews_count !== undefined ? parseInt(reviews_count) : 0,
        status: shortletStatus,
        createdAt: now,
        updatedAt: now,
      })
      .returning();

    return NextResponse.json(newShortlet[0], { status: 201 });

  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + (error as Error).message 
    }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json({ 
        error: "Valid ID is required",
        code: "INVALID_ID" 
      }, { status: 400 });
    }

    const body = await request.json();
    const { 
      title, 
      slug, 
      description, 
      location, 
      price_per_night, 
      bedrooms,
      amenities,
      images,
      rating,
      reviews_count,
      status 
    } = body;

    // Check if shortlet exists
    const existingShortlet = await db.select()
      .from(visualCmsShortlets)
      .where(eq(visualCmsShortlets.id, parseInt(id)))
      .limit(1);

    if (existingShortlet.length === 0) {
      return NextResponse.json({ error: 'Shortlet not found' }, { status: 404 });
    }

    // Build update object
    const updates: any = {
      updatedAt: new Date().toISOString()
    };

    if (title !== undefined) {
      if (title.trim() === '') {
        return NextResponse.json({ 
          error: "Title cannot be empty",
          code: "INVALID_TITLE" 
        }, { status: 400 });
      }
      updates.title = title.trim();
    }

    if (slug !== undefined) {
      if (slug.trim() === '') {
        return NextResponse.json({ 
          error: "Slug cannot be empty",
          code: "INVALID_SLUG" 
        }, { status: 400 });
      }

      // Check slug uniqueness (excluding current record)
      const duplicateSlug = await db.select()
        .from(visualCmsShortlets)
        .where(
          and(
            eq(visualCmsShortlets.slug, slug.trim()),
            eq(visualCmsShortlets.id, parseInt(id))
          )
        )
        .limit(1);

      if (duplicateSlug.length === 0) {
        const existingSlug = await db.select()
          .from(visualCmsShortlets)
          .where(eq(visualCmsShortlets.slug, slug.trim()))
          .limit(1);

        if (existingSlug.length > 0) {
          return NextResponse.json({ 
            error: "Slug must be unique. This slug is already in use",
            code: "DUPLICATE_SLUG" 
          }, { status: 400 });
        }
      }

      updates.slug = slug.trim();
    }

    if (description !== undefined) {
      if (description.trim() === '') {
        return NextResponse.json({ 
          error: "Description cannot be empty",
          code: "INVALID_DESCRIPTION" 
        }, { status: 400 });
      }
      updates.description = description.trim();
    }

    if (location !== undefined) {
      if (location.trim() === '') {
        return NextResponse.json({ 
          error: "Location cannot be empty",
          code: "INVALID_LOCATION" 
        }, { status: 400 });
      }
      updates.location = location.trim();
    }

    if (price_per_night !== undefined) {
      const pricePerNightValue = parseInt(price_per_night);
      if (isNaN(pricePerNightValue) || pricePerNightValue <= 0) {
        return NextResponse.json({ 
          error: "Price per night must be a positive integer",
          code: "INVALID_PRICE" 
        }, { status: 400 });
      }
      updates.pricePerNight = pricePerNightValue;
    }

    if (bedrooms !== undefined) {
      const bedroomsValue = parseInt(bedrooms);
      if (isNaN(bedroomsValue) || bedroomsValue <= 0) {
        return NextResponse.json({ 
          error: "Bedrooms must be a positive integer",
          code: "INVALID_BEDROOMS" 
        }, { status: 400 });
      }
      updates.bedrooms = bedroomsValue;
    }

    if (amenities !== undefined) {
      if (!Array.isArray(amenities)) {
        return NextResponse.json({ 
          error: "Amenities must be a JSON array",
          code: "INVALID_AMENITIES" 
        }, { status: 400 });
      }
      updates.amenities = amenities;
    }

    if (images !== undefined) {
      if (!Array.isArray(images)) {
        return NextResponse.json({ 
          error: "Images must be a JSON array",
          code: "INVALID_IMAGES" 
        }, { status: 400 });
      }
      updates.images = images;
    }

    if (rating !== undefined) {
      updates.rating = parseFloat(rating);
    }

    if (reviews_count !== undefined) {
      updates.reviewsCount = parseInt(reviews_count);
    }

    if (status !== undefined) {
      const validStatuses = ['active', 'inactive'];
      if (!validStatuses.includes(status)) {
        return NextResponse.json({ 
          error: "Status must be one of: active, inactive",
          code: "INVALID_STATUS" 
        }, { status: 400 });
      }
      updates.status = status;
    }

    const updated = await db.update(visualCmsShortlets)
      .set(updates)
      .where(eq(visualCmsShortlets.id, parseInt(id)))
      .returning();

    return NextResponse.json(updated[0], { status: 200 });

  } catch (error) {
    console.error('PUT error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + (error as Error).message 
    }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json({ 
        error: "Valid ID is required",
        code: "INVALID_ID" 
      }, { status: 400 });
    }

    // Check if shortlet exists
    const existingShortlet = await db.select()
      .from(visualCmsShortlets)
      .where(eq(visualCmsShortlets.id, parseInt(id)))
      .limit(1);

    if (existingShortlet.length === 0) {
      return NextResponse.json({ error: 'Shortlet not found' }, { status: 404 });
    }

    const deleted = await db.delete(visualCmsShortlets)
      .where(eq(visualCmsShortlets.id, parseInt(id)))
      .returning();

    return NextResponse.json({ 
      message: 'Shortlet deleted successfully',
      shortlet: deleted[0]
    }, { status: 200 });

  } catch (error) {
    console.error('DELETE error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + (error as Error).message 
    }, { status: 500 });
  }
}