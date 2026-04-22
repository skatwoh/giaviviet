import { NextResponse } from 'next/server'
import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'

const filePath = join(process.cwd(), 'public/data/categories.json')

function readCategories() {
  const fileContent = readFileSync(filePath, 'utf-8')
  return JSON.parse(fileContent)
}

function writeCategories(data: any) {
  writeFileSync(filePath, JSON.stringify(data, null, 2))
}

export async function GET() {
  try {
    const data = readCategories()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error reading categories:', error)
    return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const categories = readCategories()

    // Check if ID already exists
    if (categories.find((c: any) => c.id === body.id)) {
      return NextResponse.json({ error: 'Category ID already exists' }, { status: 400 })
    }

    categories.push(body)
    writeCategories(categories)

    return NextResponse.json(body)
  } catch (error) {
    console.error('Error adding category:', error)
    return NextResponse.json({ error: 'Failed to add category' }, { status: 500 })
  }
}
