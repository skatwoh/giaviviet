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
    return NextResponse.json(data.products)
  } catch (error) {
    console.error('Error reading products:', error)
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const data = readProducts()

    data.products.push(body)

    writeProducts(data)

    return NextResponse.json(body)
  } catch (error) {
    console.error('Error adding product:', error)
    return NextResponse.json({ error: 'Failed to add product' }, { status: 500 })
  }
}