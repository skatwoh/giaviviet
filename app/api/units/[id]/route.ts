import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function PUT(
    req: Request,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await context.params
        const body = await req.json()
        await db.execute({
            sql: 'UPDATE units SET name = ? WHERE id = ?',
            args: [body.name, id]
        })
        return NextResponse.json(body)
    } catch (error) {
        console.error('Error updating unit:', error)
        return NextResponse.json({ error: 'Failed to update unit' }, { status: 500 })
    }
}

export async function DELETE(
    req: Request,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await context.params
        await db.execute({
            sql: 'DELETE FROM units WHERE id = ?',
            args: [id]
        })
        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Error deleting unit:', error)
        return NextResponse.json({ error: 'Failed to delete unit' }, { status: 500 })
    }
}
