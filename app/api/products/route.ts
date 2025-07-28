import { type NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.NEON_DATABASE_URL!)

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get("search")
    const category = searchParams.get("category")
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "5")
    const offset = (page - 1) * limit

    let products

    if (search && category) {
      products = await sql`
        SELECT * FROM products 
        WHERE (
          name ILIKE ${`%${search}%`} 
          OR description ILIKE ${`%${search}%`} 
          OR company_name ILIKE ${`%${search}%`}
          OR barcode ILIKE ${`%${search}%`}
          OR barcode = ${search}
        )
        AND category = ${category}
        ORDER BY 
          CASE WHEN barcode = ${search} THEN 1 ELSE 2 END,
          created_at DESC 
        LIMIT ${limit} OFFSET ${offset}
      `
    } else if (search) {
      products = await sql`
        SELECT * FROM products 
        WHERE 
          name ILIKE ${`%${search}%`} 
          OR description ILIKE ${`%${search}%`} 
          OR company_name ILIKE ${`%${search}%`}
          OR barcode ILIKE ${`%${search}%`}
          OR barcode = ${search}
        ORDER BY 
          CASE WHEN barcode = ${search} THEN 1 ELSE 2 END,
          created_at DESC 
        LIMIT ${limit} OFFSET ${offset}
      `
    } else if (category) {
      products = await sql`
        SELECT * FROM products 
        WHERE category = ${category}
        ORDER BY created_at DESC 
        LIMIT ${limit} OFFSET ${offset}
      `
    } else {
      products = await sql`
        SELECT * FROM products 
        ORDER BY created_at DESC 
        LIMIT ${limit} OFFSET ${offset}
      `
    }

    return NextResponse.json(products)
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 })
  }
}
