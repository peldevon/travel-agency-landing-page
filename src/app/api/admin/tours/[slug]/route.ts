import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const TOURS_FILE = path.join(process.cwd(), "src/lib/cms/tours.json");

function isAuthenticated(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  return authHeader?.startsWith("Bearer ");
}

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const fileContent = await fs.readFile(TOURS_FILE, "utf-8");
    const data = JSON.parse(fileContent);

    const tour = data.tours.find((t: any) => t.slug === params.slug);

    if (!tour) {
      return NextResponse.json({ error: "Tour not found" }, { status: 404 });
    }

    return NextResponse.json({ tour });
  } catch (error) {
    console.error("Error fetching tour:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    if (!isAuthenticated(request)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const updates = await request.json();
    const fileContent = await fs.readFile(TOURS_FILE, "utf-8");
    const data = JSON.parse(fileContent);

    const index = data.tours.findIndex((t: any) => t.slug === params.slug);

    if (index === -1) {
      return NextResponse.json({ error: "Tour not found" }, { status: 404 });
    }

    // Update tour
    data.tours[index] = {
      ...data.tours[index],
      ...updates,
      updated_at: new Date().toISOString(),
    };

    await fs.writeFile(TOURS_FILE, JSON.stringify(data, null, 2), "utf-8");

    return NextResponse.json({
      success: true,
      tour: data.tours[index],
    });
  } catch (error) {
    console.error("Error updating tour:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    if (!isAuthenticated(request)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const fileContent = await fs.readFile(TOURS_FILE, "utf-8");
    const data = JSON.parse(fileContent);

    const index = data.tours.findIndex((t: any) => t.slug === params.slug);

    if (index === -1) {
      return NextResponse.json({ error: "Tour not found" }, { status: 404 });
    }

    // Remove tour
    data.tours.splice(index, 1);

    await fs.writeFile(TOURS_FILE, JSON.stringify(data, null, 2), "utf-8");

    return NextResponse.json({
      success: true,
      message: "Tour deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting tour:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
