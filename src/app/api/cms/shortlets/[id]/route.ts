import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { visualCmsShortlets } from '@/db/schema';
import { eq, and, ne } from 'drizzle-orm';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;

    // Validate ID
    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        { error: 'Valid ID is required', code: 'INVALID_ID' },
        { status: 400 }
      );
    }

    // Fetch shortlet by ID
    const shortlet = await db
      .select()
      .from(visualCmsShortlets)
      .where(eq(visualCmsShortlets.id, parseInt(id)))
      .limit(1);

    if (shortlet.length === 0) {
      return NextResponse.json(
        { error: 'Shortlet not found', code: 'NOT_FOUND' },
        { status: 404 }
      );
    }

    return NextResponse.json(shortlet[0], { status: 200 });
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

    // Validate ID
    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        { error: 'Valid ID is required', code: 'INVALID_ID' },
        { status: 400 }
      );
    }

    // Check if shortlet exists
    const existing = await db
      .select()
      .from(visualCmsShortlets)
      .where(eq(visualCmsShortlets.id, parseInt(id)))
      .limit(1);

    if (existing.length === 0) {
      return NextResponse.json(
        { error: 'Shortlet not found', code: 'NOT_FOUND' },
        { status: 404 }
      );
    }

    const body = await request.json();

    // Remove fields that should not be updated
    const { id: bodyId, created_at, createdAt, ...updateData } = body;

    // Validate status if provided
    if (updateData.status && !['active', 'inactive'].includes(updateData.status)) {
      return NextResponse.json(
        { error: 'Status must be either active or inactive', code: 'INVALID_STATUS' },
        { status: 400 }
      );
    }

    // Validate slug uniqueness if changed
    if (updateData.slug && updateData.slug !== existing[0].slug) {
      const slugExists = await db
        .select()
        .from(visualCmsShortlets)
        .where(
          and(
            eq(visualCmsShortlets.slug, updateData.slug),
            ne(visualCmsShortlets.id, parseInt(id))
          )
        )
        .limit(1);

      if (slugExists.length > 0) {
        return NextResponse.json(
          { error: 'Slug already exists', code: 'DUPLICATE_SLUG' },
          { status: 400 }
        );
      }
    }

    // Sanitize string fields
    if (updateData.title) updateData.title = updateData.title.trim();
    if (updateData.slug) updateData.slug = updateData.slug.trim();
    if (updateData.description) updateData.description = updateData.description.trim();
    if (updateData.location) updateData.location = updateData.location.trim();

    // Update shortlet with updated_at timestamp
    const updated = await db
      .update(visualCmsShortlets)
      .set({
        ...updateData,
        updatedAt: new Date().toISOString(),
      })
      .where(eq(visualCmsShortlets.id, parseInt(id)))
      .returning();

    if (updated.length === 0) {
      return NextResponse.json(
        { error: 'Failed to update shortlet', code: 'UPDATE_FAILED' },
        { status: 500 }
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

    // Validate ID
    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        { error: 'Valid ID is required', code: 'INVALID_ID' },
        { status: 400 }
      );
    }

    // Check if shortlet exists before deleting
    const existing = await db
      .select()
      .from(visualCmsShortlets)
      .where(eq(visualCmsShortlets.id, parseInt(id)))
      .limit(1);

    if (existing.length === 0) {
      return NextResponse.json(
        { error: 'Shortlet not found', code: 'NOT_FOUND' },
        { status: 404 }
      );
    }

    // Delete shortlet
    const deleted = await db
      .delete(visualCmsShortlets)
      .where(eq(visualCmsShortlets.id, parseInt(id)))
      .returning();

    if (deleted.length === 0) {
      return NextResponse.json(
        { error: 'Failed to delete shortlet', code: 'DELETE_FAILED' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        message: 'Shortlet deleted successfully',
        deleted: deleted[0],
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