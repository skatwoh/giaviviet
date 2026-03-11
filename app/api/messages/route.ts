import { NextResponse, NextRequest } from 'next/server'
import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'

export async function GET() {
  try {
    const filePath = join(process.cwd(), 'public/data/messages.json')
    const fileContent = readFileSync(filePath, 'utf-8')
    const data = JSON.parse(fileContent)
    
    return NextResponse.json(data.messages)
  } catch (error) {
    console.error('Error reading messages:', error)
    return NextResponse.json(
      { error: 'Failed to fetch messages' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const filePath = join(process.cwd(), 'public/data/messages.json')
    const fileContent = readFileSync(filePath, 'utf-8')
    const data = JSON.parse(fileContent)
    
    const newMessage = {
      id: Date.now(),
      ...body,
      createdAt: new Date().toISOString()
    }
    
    data.messages.push(newMessage)
    writeFileSync(filePath, JSON.stringify(data, null, 2))
    
    return NextResponse.json(newMessage, { status: 201 })
  } catch (error) {
    console.error('Error creating message:', error)
    return NextResponse.json(
      { error: 'Failed to create message' },
      { status: 500 }
    )
  }
}
