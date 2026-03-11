import { NextResponse, NextRequest } from 'next/server'
import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'

const ordersPath = join(process.cwd(), 'public/data/orders.json')
const productsPath = join(process.cwd(), 'public/data/products.json')

export async function GET() {
  try {
    const fileContent = readFileSync(ordersPath, 'utf-8')
    const data = JSON.parse(fileContent)

    return NextResponse.json(data.orders)
  } catch (error) {
    console.error('Error reading orders:', error)
    return NextResponse.json(
        { error: 'Failed to fetch orders' },
        { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // 1. Lưu đơn hàng
    const ordersFile = readFileSync(ordersPath, 'utf-8')
    const ordersData = JSON.parse(ordersFile)

    const newOrder = {
      id: Date.now(),
      ...body,
      createdAt: new Date().toISOString(),
      status: 'pending',
    }

    ordersData.orders.push(newOrder)
    writeFileSync(ordersPath, JSON.stringify(ordersData, null, 2))

    // 2. Trừ stock sản phẩm
    const productsFile = readFileSync(productsPath, 'utf-8')
    const productsData = JSON.parse(productsFile)

    for (const item of body.items) {
      const product = productsData.products.find(
          (p: any) => p.id === item.id || p.name === item.name
      )
      if (product) {
        product.stock = Math.max(0, product.stock - item.quantity)
      }
    }

    writeFileSync(productsPath, JSON.stringify(productsData, null, 2))

    return NextResponse.json(newOrder, { status: 201 })
  } catch (error) {
    console.error('Error creating order:', error)
    return NextResponse.json(
        { error: 'Failed to create order' },
        { status: 500 }
    )
  }
}