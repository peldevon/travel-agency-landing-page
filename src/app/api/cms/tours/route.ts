import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { visualCmsTours } from '@/db/schema';
import { eq, like, or, and } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');

    // Single record fetch by ID
    if (id) {
      if (isNaN(parseInt(id))) {
        return NextResponse.json(
          { error: 'Valid ID is required', code: 'INVALID_ID' },
          { status: 400 }
        );
      }

      const tour = await db
        .select()
        .from(visualCmsTours)
        .where(eq(visualCmsTours.id, parseInt(id)))
        .limit(1);

      if (tour.length === 0) {
        return NextResponse.json(
          { error: 'Tour not found', code: 'NOT_FOUND' },
          { status: 404 }
        );
      }

      return NextResponse.json(tour[0], { status: 200 });
    }

    // List with pagination, search, and filters
    const limit = Math.min(parseInt(searchParams.get('limit') ?? '10'), 100);
    const offset = parseInt(searchParams.get('offset') ?? '0');
    const search = searchParams.get('search');
    const status = searchParams.get('status');
    const tag = searchParams.get('tag');
    const sort = searchParams.get('sort') ?? 'createdAt';
    const order = searchParams.get('order') ?? 'desc';

    let query = db.select().from(visualCmsTours);

    // Build WHERE conditions
    const conditions = [];

    if (search) {
      conditions.push(
        or(
          like(visualCmsTours.title, `%${search}%`),
          like(visualCmsTours.description, `%${search}%`),
          like(visualCmsTours.tag, `%${search}%`)
        )
      );
    }

    if (status) {
      conditions.push(eq(visualCmsTours.status, status));
    }

    if (tag) {
      conditions.push(eq(visualCmsTours.tag, tag));
    }

    if (conditions.length > 0) {
      query = query.where(and(...conditions));
    }

    // Apply sorting
    const sortColumn = visualCmsTours[sort as keyof typeof visualCmsTours] || visualCmsTours.createdAt;
    if (order === 'asc') {
      query = query.orderBy(sortColumn);
    } else {
      query = query.orderBy(sortColumn);
    }

    // Apply pagination
    const tours = await query.limit(limit).offset(offset);

    return NextResponse.json(tours, { status: 200 });
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error as Error).message },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      title,
      slug,
      description,
      duration,
      priceFrom,
      tag,
      images,
      itinerary,
      inclusions,
      exclusions,
      status = 'active',
    } = body;

    // Validate required fields
    if (!title || title.trim() === '') {
      return NextResponse.json(
        { error: 'Title is required', code: 'MISSING_TITLE' },
        { status: 400 }
      );
    }

    if (!slug || slug.trim() === '') {
      return NextResponse.json(
        { error: 'Slug is required', code: 'MISSING_SLUG' },
        { status: 400 }
      );
    }

    if (!description || description.trim() === '') {
      return NextResponse.json(
        { error: 'Description is required', code: 'MISSING_DESCRIPTION' },
        { status: 400 }
      );
    }

    if (!duration || duration.trim() === '') {
      return NextResponse.json(
        { error: 'Duration is required', code: 'MISSING_DURATION' },
        { status: 400 }
      );
    }

    if (!priceFrom || typeof priceFrom !== 'number' || priceFrom <= 0) {
      return NextResponse.json(
        { error: 'Price from must be a positive integer', code: 'INVALID_PRICE_FROM' },
        { status: 400 }
      );
    }

    if (!tag || tag.trim() === '') {
      return NextResponse.json(
        { error: 'Tag is required', code: 'MISSING_TAG' },
        { status: 400 }
      );
    }

    // Validate status
    if (status !== 'active' && status !== 'inactive') {
      return NextResponse.json(
        { error: 'Status must be either "active" or "inactive"', code: 'INVALID_STATUS' },
        { status: 400 }
      );
    }

    // Check if slug is unique
    const existingTour = await db
      .select()
      .from(visualCmsTours)
      .where(eq(visualCmsTours.slug, slug.trim()))
      .limit(1);

    if (existingTour.length > 0) {
      return NextResponse.json(
        { error: 'Slug must be unique', code: 'DUPLICATE_SLUG' },
        { status: 400 }
      );
    }

    // Validate JSON fields if provided
    if (images !== undefined && images !== null) {
      try {
        if (typeof images === 'string') {
          JSON.parse(images);
        } else if (!Array.isArray(images)) {
          throw new Error('Images must be an array');
        }
      } catch (e) {
        return NextResponse.json(
          { error: 'Images must be valid JSON array', code: 'INVALID_IMAGES_JSON' },
          { status: 400 }
        );
      }
    }

    if (itinerary !== undefined && itinerary !== null) {
      try {
        if (typeof itinerary === 'string') {
          JSON.parse(itinerary);
        }
      } catch (e) {
        return NextResponse.json(
          { error: 'Itinerary must be valid JSON', code: 'INVALID_ITINERARY_JSON' },
          { status: 400 }
        );
      }
    }

    if (inclusions !== undefined && inclusions !== null) {
      try {
        if (typeof inclusions === 'string') {
          JSON.parse(inclusions);
        } else if (!Array.isArray(inclusions)) {
          throw new Error('Inclusions must be an array');
        }
      } catch (e) {
        return NextResponse.json(
          { error: 'Inclusions must be valid JSON array', code: 'INVALID_INCLUSIONS_JSON' },
          { status: 400 }
        );
      }
    }

    if (exclusions !== undefined && exclusions !== null) {
      try {
        if (typeof exclusions === 'string') {
          JSON.parse(exclusions);
        } else if (!Array.isArray(exclusions)) {
          throw new Error('Exclusions must be an array');
        }
      } catch (e) {
        return NextResponse.json(
          { error: 'Exclusions must be valid JSON array', code: 'INVALID_EXCLUSIONS_JSON' },
          { status: 400 }
        );
      }
    }

    // Prepare insert data
    const now = new Date().toISOString();
    const insertData: any = {
      title: title.trim(),
      slug: slug.trim(),
      description: description.trim(),
      duration: duration.trim(),
      priceFrom: parseInt(priceFrom.toString()),
      tag: tag.trim(),
      status,
      createdAt: now,
      updatedAt: now,
    };

    if (images !== undefined && images !== null) {
      insertData.images = images;
    }

    if (itinerary !== undefined && itinerary !== null) {
      insertData.itinerary = itinerary;
    }

    if (inclusions !== undefined && inclusions !== null) {
      insertData.inclusions = inclusions;
    }

    if (exclusions !== undefined && exclusions !== null) {
      insertData.exclusions = exclusions;
    }

    // Create tour
    const newTour = await db
      .insert(visualCmsTours)
      .values(insertData)
      .returning();

    return NextResponse.json(newTour[0], { status: 201 });
  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error as Error).message },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');

    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        { error: 'Valid ID is required', code: 'INVALID_ID' },
        { status: 400 }
      );
    }

    const body = await request.json();
    const {
      title,
      slug,
      description,
      duration,
      priceFrom,
      tag,
      images,
      itinerary,
      inclusions,
      exclusions,
      status,
    } = body;

    // Check if tour exists
    const existingTour = await db
      .select()
      .from(visualCmsTours)
      .where(eq(visualCmsTours.id, parseInt(id)))
      .limit(1);

    if (existingTour.length === 0) {
      return NextResponse.json(
        { error: 'Tour not found', code: 'NOT_FOUND' },
        { status: 404 }
      );
    }

    // Validate fields if provided
    if (title !== undefined && (typeof title !== 'string' || title.trim() === '')) {
      return NextResponse.json(
        { error: 'Title must be a non-empty string', code: 'INVALID_TITLE' },
        { status: 400 }
      );
    }

    if (slug !== undefined) {
      if (typeof slug !== 'string' || slug.trim() === '') {
        return NextResponse.json(
          { error: 'Slug must be a non-empty string', code: 'INVALID_SLUG' },
          { status: 400 }
        );
      }

      // Check if slug is unique (excluding current tour)
      const duplicateSlug = await db
        .select()
        .from(visualCmsTours)
        .where(
          and(
            eq(visualCmsTours.slug, slug.trim()),
            eq(visualCmsTours.id, parseInt(id))
          )
        )
        .limit(1);

      if (duplicateSlug.length > 0 && duplicateSlug[0].id !== parseInt(id)) {
        return NextResponse.json(
          { error: 'Slug must be unique', code: 'DUPLICATE_SLUG' },
          { status: 400 }
        );
      }
    }

    if (description !== undefined && (typeof description !== 'string' || description.trim() === '')) {
      return NextResponse.json(
        { error: 'Description must be a non-empty string', code: 'INVALID_DESCRIPTION' },
        { status: 400 }
      );
    }

    if (duration !== undefined && (typeof duration !== 'string' || duration.trim() === '')) {
      return NextResponse.json(
        { error: 'Duration must be a non-empty string', code: 'INVALID_DURATION' },
        { status: 400 }
      );
    }

    if (priceFrom !== undefined && (typeof priceFrom !== 'number' || priceFrom <= 0)) {
      return NextResponse.json(
        { error: 'Price from must be a positive integer', code: 'INVALID_PRICE_FROM' },
        { status: 400 }
      );
    }

    if (tag !== undefined && (typeof tag !== 'string' || tag.trim() === '')) {
      return NextResponse.json(
        { error: 'Tag must be a non-empty string', code: 'INVALID_TAG' },
        { status: 400 }
      );
    }

    if (status !== undefined && status !== 'active' && status !== 'inactive') {
      return NextResponse.json(
        { error: 'Status must be either "active" or "inactive"', code: 'INVALID_STATUS' },
        { status: 400 }
      );
    }

    // Validate JSON fields if provided
    if (images !== undefined && images !== null) {
      try {
        if (typeof images === 'string') {
          JSON.parse(images);
        } else if (!Array.isArray(images)) {
          throw new Error('Images must be an array');
        }
      } catch (e) {
        return NextResponse.json(
          { error: 'Images must be valid JSON array', code: 'INVALID_IMAGES_JSON' },
          { status: 400 }
        );
      }
    }

    if (itinerary !== undefined && itinerary !== null) {
      try {
        if (typeof itinerary === 'string') {
          JSON.parse(itinerary);
        }
      } catch (e) {
        return NextResponse.json(
          { error: 'Itinerary must be valid JSON', code: 'INVALID_ITINERARY_JSON' },
          { status: 400 }
        );
      }
    }

    if (inclusions !== undefined && inclusions !== null) {
      try {
        if (typeof inclusions === 'string') {
          JSON.parse(inclusions);
        } else if (!Array.isArray(inclusions)) {
          throw new Error('Inclusions must be an array');
        }
      } catch (e) {
        return NextResponse.json(
          { error: 'Inclusions must be valid JSON array', code: 'INVALID_INCLUSIONS_JSON' },
          { status: 400 }
        );
      }
    }

    if (exclusions !== undefined && exclusions !== null) {
      try {
        if (typeof exclusions === 'string') {
          JSON.parse(exclusions);
        } else if (!Array.isArray(exclusions)) {
          throw new Error('Exclusions must be an array');
        }
      } catch (e) {
        return NextResponse.json(
          { error: 'Exclusions must be valid JSON array', code: 'INVALID_EXCLUSIONS_JSON' },
          { status: 400 }
        );
      }
    }

    // Prepare update data
    const updateData: any = {
      updatedAt: new Date().toISOString(),
    };

    if (title !== undefined) updateData.title = title.trim();
    if (slug !== undefined) updateData.slug = slug.trim();
    if (description !== undefined) updateData.description = description.trim();
    if (duration !== undefined) updateData.duration = duration.trim();
    if (priceFrom !== undefined) updateData.priceFrom = parseInt(priceFrom.toString());
    if (tag !== undefined) updateData.tag = tag.trim();
    if (status !== undefined) updateData.status = status;
    if (images !== undefined) updateData.images = images;
    if (itinerary !== undefined) updateData.itinerary = itinerary;
    if (inclusions !== undefined) updateData.inclusions = inclusions;
    if (exclusions !== undefined) updateData.exclusions = exclusions;

    // Update tour
    const updatedTour = await db
      .update(visualCmsTours)
      .set(updateData)
      .where(eq(visualCmsTours.id, parseInt(id)))
      .returning();

    return NextResponse.json(updatedTour[0], { status: 200 });
  } catch (error) {
    console.error('PUT error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error as Error).message },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');

    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        { error: 'Valid ID is required', code: 'INVALID_ID' },
        { status: 400 }
      );
    }

    // Check if tour exists
    const existingTour = await db
      .select()
      .from(visualCmsTours)
      .where(eq(visualCmsTours.id, parseInt(id)))
      .limit(1);

    if (existingTour.length === 0) {
      return NextResponse.json(
        { error: 'Tour not found', code: 'NOT_FOUND' },
        { status: 404 }
      );
    }

    // Delete tour
    const deletedTour = await db
      .delete(visualCmsTours)
      .where(eq(visualCmsTours.id, parseInt(id)))
      .returning();

    return NextResponse.json(
      {
        message: 'Tour deleted successfully',
        tour: deletedTour[0],
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('DELETE error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error as Error).message },
      { status: 500 }
    );
  }
}