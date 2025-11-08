import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { visualCmsMedia } from '@/db/schema';
import { eq, like, and, desc } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const limit = Math.min(parseInt(searchParams.get('limit') ?? '20'), 100);
    const offset = parseInt(searchParams.get('offset') ?? '0');
    const search = searchParams.get('search');
    const mimeType = searchParams.get('mime_type');

    let query = db.select().from(visualCmsMedia);

    const conditions = [];

    if (search) {
      conditions.push(like(visualCmsMedia.filename, `%${search}%`));
    }

    if (mimeType) {
      conditions.push(eq(visualCmsMedia.mimeType, mimeType));
    }

    if (conditions.length > 0) {
      query = query.where(and(...conditions));
    }

    const results = await query
      .orderBy(desc(visualCmsMedia.createdAt))
      .limit(limit)
      .offset(offset);

    return NextResponse.json(results, { status: 200 });
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
    const { filename, original_name, mime_type, size, url, uploaded_by, alt_text } = body;

    // Validation
    if (!filename || filename.trim() === '') {
      return NextResponse.json(
        { error: 'Filename is required', code: 'MISSING_FILENAME' },
        { status: 400 }
      );
    }

    if (!original_name || original_name.trim() === '') {
      return NextResponse.json(
        { error: 'Original name is required', code: 'MISSING_ORIGINAL_NAME' },
        { status: 400 }
      );
    }

    if (!mime_type || mime_type.trim() === '') {
      return NextResponse.json(
        { error: 'MIME type is required', code: 'MISSING_MIME_TYPE' },
        { status: 400 }
      );
    }

    if (!size || typeof size !== 'number' || size <= 0) {
      return NextResponse.json(
        { error: 'Size must be a positive integer', code: 'INVALID_SIZE' },
        { status: 400 }
      );
    }

    if (!url || url.trim() === '') {
      return NextResponse.json(
        { error: 'URL is required', code: 'MISSING_URL' },
        { status: 400 }
      );
    }

    if (!uploaded_by || typeof uploaded_by !== 'number' || isNaN(uploaded_by)) {
      return NextResponse.json(
        { error: 'Valid uploaded_by user ID is required', code: 'INVALID_UPLOADED_BY' },
        { status: 400 }
      );
    }

    const newMedia = await db
      .insert(visualCmsMedia)
      .values({
        filename: filename.trim(),
        originalName: original_name.trim(),
        mimeType: mime_type.trim(),
        size: size,
        url: url.trim(),
        altText: alt_text?.trim() || null,
        uploadedBy: uploaded_by,
        createdAt: new Date().toISOString(),
      })
      .returning();

    return NextResponse.json(newMedia[0], { status: 201 });
  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error as Error).message },
      { status: 500 }
    );
  }
}