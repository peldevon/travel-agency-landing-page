import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { visualCmsUsers } from '@/db/schema';
import { eq, like, or } from 'drizzle-orm';
import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;
const VALID_ROLES = ['admin', 'editor', 'viewer'] as const;

// Helper function to validate email format
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Helper function to exclude password_hash from user objects
function sanitizeUser(user: any) {
  const { passwordHash, ...sanitizedUser } = user;
  return sanitizedUser;
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const limit = Math.min(parseInt(searchParams.get('limit') ?? '10'), 100);
    const offset = parseInt(searchParams.get('offset') ?? '0');
    const role = searchParams.get('role');
    const search = searchParams.get('search');

    let query = db.select().from(visualCmsUsers);

    // Apply filters
    const conditions = [];

    if (role) {
      if (!VALID_ROLES.includes(role as any)) {
        return NextResponse.json(
          { 
            error: `Invalid role. Must be one of: ${VALID_ROLES.join(', ')}`,
            code: 'INVALID_ROLE' 
          },
          { status: 400 }
        );
      }
      conditions.push(eq(visualCmsUsers.role, role));
    }

    if (search) {
      conditions.push(like(visualCmsUsers.email, `%${search}%`));
    }

    if (conditions.length > 0) {
      query = query.where(conditions.length === 1 ? conditions[0] : or(...conditions));
    }

    const results = await query.limit(limit).offset(offset);

    // Remove password_hash from all results
    const sanitizedResults = results.map(sanitizeUser);

    return NextResponse.json(sanitizedResults);
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
    const { email, password, full_name, role = 'viewer' } = body;

    // Validate required fields
    if (!email) {
      return NextResponse.json(
        { 
          error: 'Email is required',
          code: 'MISSING_EMAIL' 
        },
        { status: 400 }
      );
    }

    if (!password) {
      return NextResponse.json(
        { 
          error: 'Password is required',
          code: 'MISSING_PASSWORD' 
        },
        { status: 400 }
      );
    }

    if (!full_name || full_name.trim() === '') {
      return NextResponse.json(
        { 
          error: 'Full name is required',
          code: 'MISSING_FULL_NAME' 
        },
        { status: 400 }
      );
    }

    // Validate email format
    if (!isValidEmail(email)) {
      return NextResponse.json(
        { 
          error: 'Invalid email format',
          code: 'INVALID_EMAIL_FORMAT' 
        },
        { status: 400 }
      );
    }

    // Validate password length
    if (password.length < 8) {
      return NextResponse.json(
        { 
          error: 'Password must be at least 8 characters',
          code: 'PASSWORD_TOO_SHORT' 
        },
        { status: 400 }
      );
    }

    // Validate role
    if (!VALID_ROLES.includes(role as any)) {
      return NextResponse.json(
        { 
          error: `Invalid role. Must be one of: ${VALID_ROLES.join(', ')}`,
          code: 'INVALID_ROLE' 
        },
        { status: 400 }
      );
    }

    // Check if email already exists
    const existingUser = await db.select()
      .from(visualCmsUsers)
      .where(eq(visualCmsUsers.email, email.toLowerCase().trim()))
      .limit(1);

    if (existingUser.length > 0) {
      return NextResponse.json(
        { 
          error: 'Email already exists',
          code: 'EMAIL_EXISTS' 
        },
        { status: 400 }
      );
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

    // Create timestamps
    const now = new Date().toISOString();

    // Insert new user
    const newUser = await db.insert(visualCmsUsers)
      .values({
        email: email.toLowerCase().trim(),
        passwordHash,
        fullName: full_name.trim(),
        role,
        createdAt: now,
        updatedAt: now,
      })
      .returning();

    // Remove password_hash from response
    const sanitizedUser = sanitizeUser(newUser[0]);

    return NextResponse.json(sanitizedUser, { status: 201 });
  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error as Error).message },
      { status: 500 }
    );
  }
}