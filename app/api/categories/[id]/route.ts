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

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await req.json()
    const categories = readCategories()

    const index = categories.findIndex((c: any) => c.id === id)
    if (index === -1) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 })
    }

    categories[index] = { ...categories[index], ...body }
    writeCategories(categories)

    return NextResponse.json(categories[index])
  } catch (error) {
    console.error('Error updating category:', error)
    return NextResponse.json({ error: 'Failed to update category' }, { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const categories = readCategories()

    const filtered = categories.filter((c: any) => c.id !== id)
    if (filtered.length === categories.length) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 })
    }

    writeCategories(filtered)

    return NextResponse.json({ message: 'Category deleted' })
  } catch (error) {
    console.error('Error deleting category:', error)
    return NextResponse.json({ error: 'Failed to delete category' }, { status: 500 })
  }
}
