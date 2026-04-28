import { NextResponse } from 'next/server'
import { readFileSync, existsSync } from 'fs'
import { join } from 'path'

const filePath = join(process.cwd(), 'public/data/users.json')

function readUsers() {
  if (!existsSync(filePath)) return { users: [] }
  const fileContent = readFileSync(filePath, 'utf-8')
  return JSON.parse(fileContent)
}

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json()
    const data = readUsers()

    const user = data.users.find((u: any) => u.email === email && u.password === password)

    if (!user) {
      return NextResponse.json({ error: 'Email hoặc mật khẩu không chính xác' }, { status: 401 })
    }

    const { password: _, ...userWithoutPassword } = user
    return NextResponse.json(userWithoutPassword)
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json({ error: 'Lỗi đăng nhập' }, { status: 500 })
  }
}
