import { NextResponse } from 'next/server'
import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'

const filePath = join(process.cwd(), 'public/data/products.json')

function readProducts() {
  const fileContent = readFileSync(filePath, 'utf-8')
  return JSON.parse(fileContent)
}

function writeProducts(data: any) {
  writeFileSync(filePath, JSON.stringify(data, null, 2))
}

export async function GET() {
  try {
    const data = readProducts()
    const now = new Date()

    const processedProducts = data.products.map((p: any) => {
      const isSaleActive =
        p.salePrice &&
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

    // Ensure product has an ID
    if (!body.id) {
      body.id = Date.now()
    }

    const data = readProducts()

    // Check if ID already exists to avoid duplicates
    const exists = data.products.find((p: any) => p.id === body.id)
    if (exists) {
      const maxId = data.products.reduce((max: number, p: any) => {
        const id = Number(p.id)
        return isNaN(id) ? max : Math.max(max, id)
      }, 0)
      body.id = maxId + 1
    }

    // Filter out effective fields if they were accidentally sent from client
    const { price, originalPrice, ...cleanBody } = body
    data.products.push(cleanBody)

    writeProducts(data)

    return NextResponse.json(cleanBody)
  } catch (error) {
    console.error('Error adding product:', error)
    return NextResponse.json({ error: 'Failed to add product' }, { status: 500 })
  }
}
