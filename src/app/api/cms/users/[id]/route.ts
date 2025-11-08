import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { visualCmsUsers } from '@/db/schema';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcrypt';

const VALID_ROLES = ['admin', 'editor', 'viewer'] as const;
const SALT_ROUNDS = 10;

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

    const user = await db
      .select({
        id: visualCmsUsers.id,
        email: visualCmsUsers.email,
        fullName: visualCmsUsers.fullName,
        role: visualCmsUsers.role,
        createdAt: visualCmsUsers.createdAt,
        updatedAt: visualCmsUsers.updatedAt,
      })
      .from(visualCmsUsers)
      .where(eq(visualCmsUsers.id, parseInt(id)))
      .limit(1);

    if (user.length === 0) {
      return NextResponse.json(
        { error: 'User not found', code: 'USER_NOT_FOUND' },
        { status: 404 }
      );
    }

    return NextResponse.json(user[0], { status: 200 });
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
    const { email, password, full_name, role } = body;

    // Check if user exists
    const existingUser = await db
      .select()
      .from(visualCmsUsers)
      .where(eq(visualCmsUsers.id, parseInt(id)))
      .limit(1);

    if (existingUser.length === 0) {
      return NextResponse.json(
        { error: 'User not found', code: 'USER_NOT_FOUND' },
        { status: 404 }
      );
    }

    // Validate role if provided
    if (role && !VALID_ROLES.includes(role)) {
      return NextResponse.json(
        {
          error: `Invalid role. Must be one of: ${VALID_ROLES.join(', ')}`,
          code: 'INVALID_ROLE',
        },
        { status: 400 }
      );
    }

    // Check email uniqueness if email is being updated
    if (email && email !== existingUser[0].email) {
      const emailExists = await db
        .select()
        .from(visualCmsUsers)
        .where(eq(visualCmsUsers.email, email.toLowerCase().trim()))
        .limit(1);

      if (emailExists.length > 0) {
        return NextResponse.json(
          { error: 'Email already exists', code: 'EMAIL_EXISTS' },
          { status: 400 }
        );
      }
    }

    // Prepare update object
    const updateData: {
      email?: string;
      passwordHash?: string;
      fullName?: string;
      role?: string;
      updatedAt: string;
    } = {
      updatedAt: new Date().toISOString(),
    };

    if (email) {
      updateData.email = email.toLowerCase().trim();
    }

    if (password) {
      updateData.passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
    }

    if (full_name) {
      updateData.fullName = full_name.trim();
    }

    if (role) {
      updateData.role = role;
    }

    // Update user
    const updatedUser = await db
      .update(visualCmsUsers)
      .set(updateData)
      .where(eq(visualCmsUsers.id, parseInt(id)))
      .returning({
        id: visualCmsUsers.id,
        email: visualCmsUsers.email,
        fullName: visualCmsUsers.fullName,
        role: visualCmsUsers.role,
        createdAt: visualCmsUsers.createdAt,
        updatedAt: visualCmsUsers.updatedAt,
      });

    if (updatedUser.length === 0) {
      return NextResponse.json(
        { error: 'Failed to update user', code: 'UPDATE_FAILED' },
        { status: 500 }
      );
    }

    return NextResponse.json(updatedUser[0], { status: 200 });
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

    // Check if user exists
    const existingUser = await db
      .select({
        id: visualCmsUsers.id,
        email: visualCmsUsers.email,
        fullName: visualCmsUsers.fullName,
        role: visualCmsUsers.role,
        createdAt: visualCmsUsers.createdAt,
        updatedAt: visualCmsUsers.updatedAt,
      })
      .from(visualCmsUsers)
      .where(eq(visualCmsUsers.id, parseInt(id)))
      .limit(1);

    if (existingUser.length === 0) {
      return NextResponse.json(
        { error: 'User not found', code: 'USER_NOT_FOUND' },
        { status: 404 }
      );
    }

    // Delete user
    const deletedUser = await db
      .delete(visualCmsUsers)
      .where(eq(visualCmsUsers.id, parseInt(id)))
      .returning({
        id: visualCmsUsers.id,
        email: visualCmsUsers.email,
        fullName: visualCmsUsers.fullName,
        role: visualCmsUsers.role,
        createdAt: visualCmsUsers.createdAt,
        updatedAt: visualCmsUsers.updatedAt,
      });

    if (deletedUser.length === 0) {
      return NextResponse.json(
        { error: 'Failed to delete user', code: 'DELETE_FAILED' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        message: 'User deleted successfully',
        user: deletedUser[0],
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