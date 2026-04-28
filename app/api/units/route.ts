import { NextResponse } from 'next/server'
import { readFileSync, writeFileSync, existsSync } from 'fs'
import { join } from 'path'

const filePath = join(process.cwd(), 'public/data/units.json')

function readUnits() {
  if (!existsSync(filePath)) return []
  const fileContent = readFileSync(filePath, 'utf-8')
  return JSON.parse(fileContent)
}

function writeUnits(data: any) {
  writeFileSync(filePath, JSON.stringify(data, null, 2))
}

export async function GET() {
  try {
    const data = readUnits()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error reading units:', error)
    return NextResponse.json({ error: 'Failed to fetch units' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const units = readUnits()

    // Check if name already exists
    if (units.find((u: any) => u.name.toLowerCase() === body.name.toLowerCase())) {
      return NextResponse.json({ error: 'Unit already exists' }, { status: 400 })
    }

    const newUnit = {
        id: Date.now().toString(),
        name: body.name
    }

    units.push(newUnit)
    writeUnits(units)

    return NextResponse.json(newUnit)
  } catch (error) {
    console.error('Error adding unit:', error)
    return NextResponse.json({ error: 'Failed to add unit' }, { status: 500 })
  }
}
