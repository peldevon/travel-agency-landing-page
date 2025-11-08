import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { visualCmsPages } from '@/db/schema';
import { eq, and } from 'drizzle-orm';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;

    // Validate slug parameter
    if (!slug || typeof slug !== 'string' || slug.trim() === '') {
      return NextResponse.json(
        { 
          error: 'Valid slug is required',
          code: 'INVALID_SLUG'
        },
        { status: 400 }
      );
    }

    // Query page by slug with published status filter
    const page = await db
      .select()
      .from(visualCmsPages)
      .where(
        and(
          eq(visualCmsPages.slug, slug.trim()),
          eq(visualCmsPages.status, 'published')
        )
      )
      .limit(1);

    // Return 404 if page not found or not published
    if (page.length === 0) {
      return NextResponse.json(
        { 
          error: 'Page not found or not published',
          code: 'PAGE_NOT_FOUND'
        },
        { status: 404 }
      );
    }

    // Return the published page
    return NextResponse.json(page[0], { status: 200 });

  } catch (error) {
    console.error('GET page by slug error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error: ' + (error instanceof Error ? error.message : 'Unknown error')
      },
      { status: 500 }
    );
  }
}