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

        data.products[index] = body

        writeProducts(data)

        return NextResponse.json(body)

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