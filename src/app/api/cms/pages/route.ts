import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { visualCmsPages, visualCmsUsers } from '@/db/schema';
import { eq, like, or, and, desc } from 'drizzle-orm';

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

      const page = await db.select()
        .from(visualCmsPages)
        .where(eq(visualCmsPages.id, parseInt(id)))
        .limit(1);

      if (page.length === 0) {
        return NextResponse.json({ 
          error: 'Page not found',
          code: 'PAGE_NOT_FOUND' 
        }, { status: 404 });
      }

      return NextResponse.json(page[0], { status: 200 });
    }

    // List with filters and pagination
    const limit = Math.min(parseInt(searchParams.get('limit') ?? '10'), 100);
    const offset = parseInt(searchParams.get('offset') ?? '0');
    const search = searchParams.get('search');
    const status = searchParams.get('status');
    const sort = searchParams.get('sort') ?? 'createdAt';
    const order = searchParams.get('order') ?? 'desc';

    let query = db.select().from(visualCmsPages);

    // Build where conditions
    const conditions = [];

    if (status) {
      if (!['draft', 'published', 'archived'].includes(status)) {
        return NextResponse.json({ 
          error: "Invalid status. Must be one of: draft, published, archived",
          code: "INVALID_STATUS" 
        }, { status: 400 });
      }
      conditions.push(eq(visualCmsPages.status, status));
    }

    if (search) {
      conditions.push(
        or(
          like(visualCmsPages.title, `%${search}%`),
          like(visualCmsPages.slug, `%${search}%`),
          like(visualCmsPages.content, `%${search}%`)
        )
      );
    }

    if (conditions.length > 0) {
      query = query.where(conditions.length === 1 ? conditions[0] : and(...conditions));
    }

    // Apply sorting
    const sortColumn = sort === 'title' ? visualCmsPages.title :
                       sort === 'status' ? visualCmsPages.status :
                       sort === 'publishedAt' ? visualCmsPages.publishedAt :
                       visualCmsPages.createdAt;

    query = order === 'asc' 
      ? query.orderBy(sortColumn)
      : query.orderBy(desc(sortColumn));

    const results = await query.limit(limit).offset(offset);

    return NextResponse.json(results, { status: 200 });

  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + (error instanceof Error ? error.message : 'Unknown error')
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { slug, title, content, metaTitle, metaDescription, status, createdBy } = body;

    // Validate required fields
    if (!slug || slug.trim() === '') {
      return NextResponse.json({ 
        error: "Slug is required and cannot be empty",
        code: "MISSING_SLUG" 
      }, { status: 400 });
    }

    if (!title || title.trim() === '') {
      return NextResponse.json({ 
        error: "Title is required and cannot be empty",
        code: "MISSING_TITLE" 
      }, { status: 400 });
    }

    if (!content || content.trim() === '') {
      return NextResponse.json({ 
        error: "Content is required and cannot be empty",
        code: "MISSING_CONTENT" 
      }, { status: 400 });
    }

    if (!createdBy || isNaN(parseInt(createdBy))) {
      return NextResponse.json({ 
        error: "Valid created_by user ID is required",
        code: "MISSING_CREATED_BY" 
      }, { status: 400 });
    }

    // Validate status if provided
    const pageStatus = status || 'draft';
    if (!['draft', 'published', 'archived'].includes(pageStatus)) {
      return NextResponse.json({ 
        error: "Invalid status. Must be one of: draft, published, archived",
        code: "INVALID_STATUS" 
      }, { status: 400 });
    }

    // Check if user exists
    const userExists = await db.select()
      .from(visualCmsUsers)
      .where(eq(visualCmsUsers.id, parseInt(createdBy)))
      .limit(1);

    if (userExists.length === 0) {
      return NextResponse.json({ 
        error: "User with provided created_by ID does not exist",
        code: "INVALID_USER" 
      }, { status: 400 });
    }

    // Check slug uniqueness
    const existingPage = await db.select()
      .from(visualCmsPages)
      .where(eq(visualCmsPages.slug, slug.trim()))
      .limit(1);

    if (existingPage.length > 0) {
      return NextResponse.json({ 
        error: "A page with this slug already exists",
        code: "DUPLICATE_SLUG" 
      }, { status: 400 });
    }

    const now = new Date().toISOString();

    // Prepare insert data
    const insertData: any = {
      slug: slug.trim(),
      title: title.trim(),
      content: content.trim(),
      metaTitle: metaTitle ? metaTitle.trim() : null,
      metaDescription: metaDescription ? metaDescription.trim() : null,
      status: pageStatus,
      createdBy: parseInt(createdBy),
      createdAt: now,
      updatedAt: now,
    };

    // Set publishedAt if status is published
    if (pageStatus === 'published') {
      insertData.publishedAt = now;
    }

    const newPage = await db.insert(visualCmsPages)
      .values(insertData)
      .returning();

    return NextResponse.json(newPage[0], { status: 201 });

  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + (error instanceof Error ? error.message : 'Unknown error')
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
    const { slug, title, content, metaTitle, metaDescription, status, updatedBy } = body;

    // Check if page exists
    const existingPage = await db.select()
      .from(visualCmsPages)
      .where(eq(visualCmsPages.id, parseInt(id)))
      .limit(1);

    if (existingPage.length === 0) {
      return NextResponse.json({ 
        error: 'Page not found',
        code: 'PAGE_NOT_FOUND' 
      }, { status: 404 });
    }

    // Validate status if provided
    if (status && !['draft', 'published', 'archived'].includes(status)) {
      return NextResponse.json({ 
        error: "Invalid status. Must be one of: draft, published, archived",
        code: "INVALID_STATUS" 
      }, { status: 400 });
    }

    // Validate slug uniqueness if changed
    if (slug && slug.trim() !== existingPage[0].slug) {
      const duplicateSlug = await db.select()
        .from(visualCmsPages)
        .where(
          and(
            eq(visualCmsPages.slug, slug.trim()),
            eq(visualCmsPages.id, parseInt(id))
          )
        )
        .limit(1);

      // Check if slug exists for a different page
      const otherPageWithSlug = await db.select()
        .from(visualCmsPages)
        .where(eq(visualCmsPages.slug, slug.trim()))
        .limit(1);

      if (otherPageWithSlug.length > 0 && otherPageWithSlug[0].id !== parseInt(id)) {
        return NextResponse.json({ 
          error: "A page with this slug already exists",
          code: "DUPLICATE_SLUG" 
        }, { status: 400 });
      }
    }

    // Validate updatedBy if provided
    if (updatedBy) {
      if (isNaN(parseInt(updatedBy))) {
        return NextResponse.json({ 
          error: "Valid updated_by user ID is required",
          code: "INVALID_UPDATED_BY" 
        }, { status: 400 });
      }

      const userExists = await db.select()
        .from(visualCmsUsers)
        .where(eq(visualCmsUsers.id, parseInt(updatedBy)))
        .limit(1);

      if (userExists.length === 0) {
        return NextResponse.json({ 
          error: "User with provided updated_by ID does not exist",
          code: "INVALID_USER" 
        }, { status: 400 });
      }
    }

    const now = new Date().toISOString();

    // Prepare update data
    const updateData: any = {
      updatedAt: now,
    };

    if (slug !== undefined) updateData.slug = slug.trim();
    if (title !== undefined) updateData.title = title.trim();
    if (content !== undefined) updateData.content = content.trim();
    if (metaTitle !== undefined) updateData.metaTitle = metaTitle ? metaTitle.trim() : null;
    if (metaDescription !== undefined) updateData.metaDescription = metaDescription ? metaDescription.trim() : null;
    if (status !== undefined) updateData.status = status;
    if (updatedBy !== undefined) updateData.updatedBy = parseInt(updatedBy);

    // Set publishedAt if status changed to published and it wasn't published before
    if (status === 'published' && existingPage[0].status !== 'published' && !existingPage[0].publishedAt) {
      updateData.publishedAt = now;
    }

    const updated = await db.update(visualCmsPages)
      .set(updateData)
      .where(eq(visualCmsPages.id, parseInt(id)))
      .returning();

    return NextResponse.json(updated[0], { status: 200 });

  } catch (error) {
    console.error('PUT error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + (error instanceof Error ? error.message : 'Unknown error')
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

    // Check if page exists
    const existingPage = await db.select()
      .from(visualCmsPages)
      .where(eq(visualCmsPages.id, parseInt(id)))
      .limit(1);

    if (existingPage.length === 0) {
      return NextResponse.json({ 
        error: 'Page not found',
        code: 'PAGE_NOT_FOUND' 
      }, { status: 404 });
    }

    const deleted = await db.delete(visualCmsPages)
      .where(eq(visualCmsPages.id, parseInt(id)))
      .returning();

    return NextResponse.json({
      message: 'Page deleted successfully',
      deletedPage: deleted[0]
    }, { status: 200 });

  } catch (error) {
    console.error('DELETE error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + (error instanceof Error ? error.message : 'Unknown error')
    }, { status: 500 });
  }
}