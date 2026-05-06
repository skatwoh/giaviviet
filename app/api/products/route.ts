import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const res = await db.execute('SELECT * FROM products')
    const products = res.rows
    const now = new Date()

    const processedProducts = products.map((p: any) => {
      const isSaleActive =
        p.salePrice !== undefined &&
        p.salePrice !== null &&
        p.saleStart &&
        p.saleEnd &&
        new Date(p.saleStart) <= now &&
        new Date(p.saleEnd) >= now

      const price = isSaleActive ? p.salePrice : p.regularPrice
      const originalPrice = isSaleActive ? p.regularPrice : undefined

      return {
        ...p,
        price,
        originalPrice,
      }
    })

    return NextResponse.json({ products: processedProducts })
  } catch (error) {
    console.error('Error reading products:', error)
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { price, originalPrice, ...cleanBody } = body

    if (!cleanBody.id) {
        cleanBody.id = Date.now()
    }

    const keys = Object.keys(cleanBody)
    const placeholders = keys.map(() => '?').join(', ')
    const values = keys.map(k => cleanBody[k])

    await db.execute({
      sql: `INSERT INTO products (${keys.join(', ')}) VALUES (${placeholders})`,
      args: values
    })

    return NextResponse.json(cleanBody)
  } catch (error) {
    console.error('Error adding product:', error)
    return NextResponse.json({ error: 'Failed to add product' }, { status: 500 })
  }
}
