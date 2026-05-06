import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function DELETE(
    req: Request,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await context.params
        await db.execute({
            sql: 'DELETE FROM messages WHERE id = ?',
            args: [Number(id)]
        })
        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Error deleting message:', error)
        return NextResponse.json({ error: 'Failed to delete message' }, { status: 500 })
    }
}
