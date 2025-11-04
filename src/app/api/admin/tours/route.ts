import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const TOURS_FILE = path.join(process.cwd(), "src/lib/cms/tours.json");

// Simple auth check
function isAuthenticated(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  return authHeader?.startsWith("Bearer ");
}

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    if (!isAuthenticated(request)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const tourData = await request.json();

    // Read existing tours
    const fileContent = await fs.readFile(TOURS_FILE, "utf-8");
    const data = JSON.parse(fileContent);

    // Check if slug already exists
    const exists = data.tours.some((t: any) => t.slug === tourData.slug);
    if (exists) {
      return NextResponse.json(
        { error: "A tour with this slug already exists" },
        { status: 400 }
      );
    }

    // Add ID and timestamps
    const newTour = {
      id: `tour-${Date.now()}`,
      ...tourData,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    // Add to tours array
    data.tours.push(newTour);

    // Write back to file
    await fs.writeFile(TOURS_FILE, JSON.stringify(data, null, 2), "utf-8");

    return NextResponse.json({
      success: true,
      tour: newTour,
    });
  } catch (error) {
    console.error("Error creating tour:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const fileContent = await fs.readFile(TOURS_FILE, "utf-8");
    const data = JSON.parse(fileContent);

    return NextResponse.json({
      tours: data.tours || [],
    });
  } catch (error) {
    console.error("Error fetching tours:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
