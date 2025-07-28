import { NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.NEON_DATABASE_URL!)

export async function GET() {
  try {
    const result = await sql`
      SELECT DISTINCT category 
      FROM products 
      WHERE category IS NOT NULL AND category != ''
      ORDER BY category
    `
    const categories = result.map((row: any) => row.category)

    return NextResponse.json(categories)
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 })
  }
}
