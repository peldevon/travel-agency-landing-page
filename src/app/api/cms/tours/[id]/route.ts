import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { visualCmsTours } from '@/db/schema';
import { eq, and } from 'drizzle-orm';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;

    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        { 
          error: 'Valid ID is required',
          code: 'INVALID_ID' 
        },
        { status: 400 }
      );
    }

    const tour = await db.select()
      .from(visualCmsTours)
      .where(eq(visualCmsTours.id, parseInt(id)))
      .limit(1);

    if (tour.length === 0) {
      return NextResponse.json(
        { error: 'Tour not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(tour[0], { status: 200 });

  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error as Error).message },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;

    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        { 
          error: 'Valid ID is required',
          code: 'INVALID_ID' 
        },
        { status: 400 }
      );
    }

    const body = await request.json();

    // Check if tour exists
    const existingTour = await db.select()
      .from(visualCmsTours)
      .where(eq(visualCmsTours.id, parseInt(id)))
      .limit(1);

    if (existingTour.length === 0) {
      return NextResponse.json(
        { error: 'Tour not found' },
        { status: 404 }
      );
    }

    // Validate status if provided
    if (body.status && !['active', 'inactive'].includes(body.status)) {
      return NextResponse.json(
        { 
          error: 'Status must be either active or inactive',
          code: 'INVALID_STATUS' 
        },
        { status: 400 }
      );
    }

    // Check slug uniqueness if changed
    if (body.slug && body.slug !== existingTour[0].slug) {
      const slugExists = await db.select()
        .from(visualCmsTours)
        .where(
          and(
            eq(visualCmsTours.slug, body.slug),
            eq(visualCmsTours.id, parseInt(id))
          )
        )
        .limit(1);

      const otherTourWithSlug = await db.select()
        .from(visualCmsTours)
        .where(eq(visualCmsTours.slug, body.slug))
        .limit(1);

      if (otherTourWithSlug.length > 0 && otherTourWithSlug[0].id !== parseInt(id)) {
        return NextResponse.json(
          { 
            error: 'Slug already exists',
            code: 'SLUG_EXISTS' 
          },
          { status: 400 }
        );
      }
    }

    // Remove fields that cannot be updated
    const { id: _, created_at, createdAt, ...updateData } = body;

    // Prepare update object
    const updates: any = {
      ...updateData,
      updatedAt: new Date().toISOString()
    };

    // Update the tour
    const updated = await db.update(visualCmsTours)
      .set(updates)
      .where(eq(visualCmsTours.id, parseInt(id)))
      .returning();

    if (updated.length === 0) {
      return NextResponse.json(
        { error: 'Tour not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(updated[0], { status: 200 });

  } catch (error) {
    console.error('PUT error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error as Error).message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;

    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        { 
          error: 'Valid ID is required',
          code: 'INVALID_ID' 
        },
        { status: 400 }
      );
    }

    // Check if tour exists
    const existingTour = await db.select()
      .from(visualCmsTours)
      .where(eq(visualCmsTours.id, parseInt(id)))
      .limit(1);

    if (existingTour.length === 0) {
      return NextResponse.json(
        { error: 'Tour not found' },
        { status: 404 }
      );
    }

    // Delete the tour
    const deleted = await db.delete(visualCmsTours)
      .where(eq(visualCmsTours.id, parseInt(id)))
      .returning();

    if (deleted.length === 0) {
      return NextResponse.json(
        { error: 'Tour not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { 
        message: 'Tour deleted successfully',
        tour: deleted[0]
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