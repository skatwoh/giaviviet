import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
    try {
        const res = await db.execute('SELECT * FROM orders')
        const orders = res.rows.map((row: any) => ({
            ...row,
            items: JSON.parse(row.items),
            customer: {
                customerName: row.customerName,
                phoneNumber: row.phoneNumber,
                email: row.email,
                address: row.address,
                city: row.city,
                district: row.district
            }
        }))
        return NextResponse.json(orders)
    } catch (error) {
        console.error('Error fetching orders:', error)
        return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 })
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const id = body.id || Date.now()
        const createdAt = new Date().toISOString()

        // Start a transaction for order creation and stock update
        const tx = await db.transaction('write')
        try {
            await tx.execute({
                sql: `INSERT INTO orders (
                    id, customerName, phoneNumber, email, address, city, district,
                    items, total, status, createdAt
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                args: [
                    id,
                    body.customer.customerName,
                    body.customer.phoneNumber,
                    body.customer.email,
                    body.customer.address,
                    body.customer.city,
                    body.customer.district,
                    JSON.stringify(body.items),
                    body.total,
                    body.status || 'pending',
                    createdAt
                ]
            })

            // Update stock for each item
            for (const item of body.items) {
                await tx.execute({
                    sql: 'UPDATE products SET stock = MAX(0, stock - ?) WHERE id = ? OR name = ?',
                    args: [item.quantity, item.id || 0, item.name]
                })
            }
            await tx.commit()
        } catch (err) {
            await tx.rollback()
            throw err
        }

        return NextResponse.json({ id, ...body, createdAt }, { status: 201 })
    } catch (error) {
        console.error('Error creating order:', error)
        return NextResponse.json({ error: 'Failed to create order' }, { status: 500 })
    }
}
