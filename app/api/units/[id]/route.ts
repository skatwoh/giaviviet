import { NextResponse } from 'next/server'
import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'

const filePath = join(process.cwd(), 'public/data/units.json')

function readUnits() {
    const fileContent = readFileSync(filePath, 'utf-8')
    return JSON.parse(fileContent)
}

function writeUnits(data: any) {
    writeFileSync(filePath, JSON.stringify(data, null, 2))
}

export async function PUT(
    req: Request,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await context.params
        const body = await req.json()
        const units = readUnits()

        const index = units.findIndex((u: any) => u.id === id)
        if (index === -1) {
            return NextResponse.json({ error: 'Unit not found' }, { status: 404 })
        }

        units[index] = { ...units[index], name: body.name }
        writeUnits(units)

        return NextResponse.json(units[index])
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
        const units = readUnits()

        const filtered = units.filter((u: any) => u.id !== id)
        writeUnits(filtered)

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Error deleting unit:', error)
        return NextResponse.json({ error: 'Failed to delete unit' }, { status: 500 })
    }
}
