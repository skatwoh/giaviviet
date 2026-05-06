import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(
    req: Request,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await context.params
        const res = await db.execute({
            sql: 'SELECT * FROM products WHERE id = ?',
            args: [Number(id)]
        })
        const product = res.rows[0] as any

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
        const { price, originalPrice, ...cleanBody } = body

        const keys = Object.keys(cleanBody)
        const setClause = keys.map(k => `${k} = ?`).join(', ')
        const values = keys.map(k => cleanBody[k])

        await db.execute({
          sql: `UPDATE products SET ${setClause} WHERE id = ?`,
          args: [...values, Number(id)]
        })

        return NextResponse.json(cleanBody)
    } catch (error) {
        console.error('Error updating product:', error)
        return NextResponse.json({ error: 'Failed to update product' }, { status: 500 })
    }
}

export async function DELETE(
    req: Request,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await context.params
        await db.execute({
            sql: 'DELETE FROM products WHERE id = ?',
            args: [Number(id)]
        })
        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Error deleting product:', error)
        return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 })
    }
}
