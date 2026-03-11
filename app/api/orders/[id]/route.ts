import { NextResponse } from 'next/server'
import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'

const ordersPath = join(process.cwd(), 'public/data/orders.json')
const productsPath = join(process.cwd(), 'public/data/products.json')

function readOrders() {
    const fileContent = readFileSync(ordersPath, 'utf-8')
    return JSON.parse(fileContent)
}

function writeOrders(data: any) {
    writeFileSync(ordersPath, JSON.stringify(data, null, 2))
}

function readProducts() {
    const fileContent = readFileSync(productsPath, 'utf-8')
    return JSON.parse(fileContent)
}

function writeProducts(data: any) {
    writeFileSync(productsPath, JSON.stringify(data, null, 2))
}

function restoreStock(items: Array<{ id?: number; name?: string; quantity: number }>) {
    const productsData = readProducts()

    for (const item of items) {
        const product = productsData.products.find(
            (p: any) => p.id === item.id || p.name === item.name
        )
        if (product) {
            product.stock = product.stock + item.quantity
        }
    }

    writeProducts(productsData)
}

// UPDATE ORDER STATUS
export async function PUT(
    req: Request,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await context.params
        const body = await req.json()

        const data = readOrders()

        const index = data.orders.findIndex((o: any) => o.id === Number(id))

        if (index === -1) {
            return NextResponse.json({ error: 'Order not found' }, { status: 404 })
        }

        const currentOrder = data.orders[index]
        const isBeingCancelled =
            body.status === 'cancelled' && currentOrder.status !== 'cancelled'

        // Hoàn stock nếu đơn bị hủy (và chưa bị hủy trước đó)
        if (isBeingCancelled && currentOrder.items?.length > 0) {
            restoreStock(currentOrder.items)
        }

        data.orders[index] = {
            ...currentOrder,
            ...body,
        }

        writeOrders(data)

        return NextResponse.json(data.orders[index])
    } catch (error) {
        console.error('Error updating order:', error)
        return NextResponse.json({ error: 'Failed to update order' }, { status: 500 })
    }
}

// DELETE ORDER
export async function DELETE(
    req: Request,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await context.params

        const data = readOrders()

        const order = data.orders.find((o: any) => o.id === Number(id))

        // Hoàn stock nếu xóa đơn chưa giao
        if (order && order.status !== 'delivered' && order.status !== 'cancelled') {
            if (order.items?.length > 0) {
                restoreStock(order.items)
            }
        }

        data.orders = data.orders.filter((o: any) => o.id !== Number(id))

        writeOrders(data)

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Error deleting order:', error)
        return NextResponse.json({ error: 'Failed to delete order' }, { status: 500 })
    }
}