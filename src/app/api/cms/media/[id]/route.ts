import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { visualCmsMedia } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;

    // Validate ID
    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        { 
          error: 'Valid ID is required',
          code: 'INVALID_ID' 
        },
        { status: 400 }
      );
    }

    const mediaId = parseInt(id);

    // Check if media exists before deleting
    const existingMedia = await db
      .select()
      .from(visualCmsMedia)
      .where(eq(visualCmsMedia.id, mediaId))
      .limit(1);

    if (existingMedia.length === 0) {
      return NextResponse.json(
        { 
          error: 'Media not found',
          code: 'MEDIA_NOT_FOUND' 
        },
        { status: 404 }
      );
    }

    // Delete media record from database
    const deleted = await db
      .delete(visualCmsMedia)
      .where(eq(visualCmsMedia.id, mediaId))
      .returning();

    return NextResponse.json({
      message: 'Media record deleted successfully',
      media: deleted[0]
    }, { status: 200 });

  } catch (error) {
    console.error('DELETE error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error: ' + (error instanceof Error ? error.message : 'Unknown error')
      },
      { status: 500 }
    );
  }
}