import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { visualCmsPages } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;

    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        { error: 'Valid ID is required', code: 'INVALID_ID' },
        { status: 400 }
      );
    }

    const page = await db
      .select()
      .from(visualCmsPages)
      .where(eq(visualCmsPages.id, parseInt(id)))
      .limit(1);

    if (page.length === 0) {
      return NextResponse.json(
        { error: 'Page not found', code: 'PAGE_NOT_FOUND' },
        { status: 404 }
      );
    }

    return NextResponse.json(page[0], { status: 200 });
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
        { error: 'Valid ID is required', code: 'INVALID_ID' },
        { status: 400 }
      );
    }

    const body = await request.json();
    const {
      slug,
      title,
      content,
      metaTitle,
      metaDescription,
      status,
      updatedBy,
    } = body;

    // Check if page exists
    const existingPage = await db
      .select()
      .from(visualCmsPages)
      .where(eq(visualCmsPages.id, parseInt(id)))
      .limit(1);

    if (existingPage.length === 0) {
      return NextResponse.json(
        { error: 'Page not found', code: 'PAGE_NOT_FOUND' },
        { status: 404 }
      );
    }

    // Validate status if provided
    if (status && !['draft', 'published', 'archived'].includes(status)) {
      return NextResponse.json(
        {
          error: 'Status must be one of: draft, published, archived',
          code: 'INVALID_STATUS',
        },
        { status: 400 }
      );
    }

    // Check slug uniqueness if slug is being updated
    if (slug && slug !== existingPage[0].slug) {
      const slugExists = await db
        .select()
        .from(visualCmsPages)
        .where(eq(visualCmsPages.slug, slug))
        .limit(1);

      if (slugExists.length > 0) {
        return NextResponse.json(
          { error: 'Slug already exists', code: 'SLUG_EXISTS' },
          { status: 400 }
        );
      }
    }

    // Prepare update object
    const updateData: Record<string, any> = {
      updatedAt: new Date().toISOString(),
    };

    if (slug !== undefined) updateData.slug = slug.trim();
    if (title !== undefined) updateData.title = title.trim();
    if (content !== undefined) updateData.content = content;
    if (metaTitle !== undefined) updateData.metaTitle = metaTitle?.trim() || null;
    if (metaDescription !== undefined)
      updateData.metaDescription = metaDescription?.trim() || null;
    if (updatedBy !== undefined) updateData.updatedBy = updatedBy;

    // Handle status change and published_at
    if (status !== undefined) {
      updateData.status = status;
      
      // If status changes to 'published' and published_at is null, set it
      if (
        status === 'published' &&
        existingPage[0].publishedAt === null
      ) {
        updateData.publishedAt = new Date().toISOString();
      }
    }

    const updated = await db
      .update(visualCmsPages)
      .set(updateData)
      .where(eq(visualCmsPages.id, parseInt(id)))
      .returning();

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
        { error: 'Valid ID is required', code: 'INVALID_ID' },
        { status: 400 }
      );
    }

    // Check if page exists
    const existingPage = await db
      .select()
      .from(visualCmsPages)
      .where(eq(visualCmsPages.id, parseInt(id)))
      .limit(1);

    if (existingPage.length === 0) {
      return NextResponse.json(
        { error: 'Page not found', code: 'PAGE_NOT_FOUND' },
        { status: 404 }
      );
    }

    const deleted = await db
      .delete(visualCmsPages)
      .where(eq(visualCmsPages.id, parseInt(id)))
      .returning();

    return NextResponse.json(
      {
        message: 'Page deleted successfully',
        deletedPage: deleted[0],
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