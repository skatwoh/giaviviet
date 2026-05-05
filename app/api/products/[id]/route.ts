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

export async function GET(
    req: Request,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await context.params
        const data = readProducts()
        const product = data.products.find((p: any) => p.id === Number(id))

        if (!product) {
            return NextResponse.json({ error: 'Product not found' }, { status: 404 })
        }

        const now = new Date()
        const isSaleActive =
            product.salePrice !== undefined &&
            product.salePrice !== null &&
            product.saleStart &&
            product.saleEnd &&
            new Date(product.saleStart) <= now &&
            new Date(product.saleEnd) >= now

        const price = isSaleActive ? product.salePrice : product.regularPrice
        const originalPrice = isSaleActive ? product.regularPrice : undefined

        return NextResponse.json({
            ...product,
            price,
            originalPrice,
        })
    } catch (error) {
        console.error('Error fetching product:', error)
        return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 })
    }
}

export async function PUT(
    req: Request,
    context: { params: Promise<{ id: string }> }
) {
    try {

        const { id } = await context.params
        const body = await req.json()

        const data = readProducts()

        const index = data.products.findIndex(
            (p: any) => p.id === Number(id)
        )

        if (index === -1) {
            return NextResponse.json({ error: 'Product not found' }, { status: 404 })
        }

        // Filter out effective fields if they were accidentally sent from client
        const { price, originalPrice, ...cleanBody } = body
        data.products[index] = cleanBody

        writeProducts(data)

        return NextResponse.json(cleanBody)

    } catch (error) {
        console.error('Error updating product:', error)
        return NextResponse.json(
            { error: 'Failed to update product' },
            { status: 500 }
        )
    }
}

export async function DELETE(
    req: Request,
    context: { params: Promise<{ id: string }> }
) {
    try {

        const { id } = await context.params

        const data = readProducts()

        data.products = data.products.filter(
            (p: any) => p.id !== Number(id)
        )

        writeProducts(data)

        return NextResponse.json({ success: true })

    } catch (error) {
        console.error('Error deleting product:', error)
        return NextResponse.json(
            { error: 'Failed to delete product' },
            { status: 500 }
        )
    }
}