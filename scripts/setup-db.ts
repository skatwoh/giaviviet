import { createClient } from '@libsql/client'
import * as dotenv from 'dotenv'

dotenv.config()

const url = process.env.TURSO_DATABASE_URL || 'file:local.db'
const authToken = process.env.TURSO_AUTH_TOKEN

async function setup() {
  const db = createClient({
    url,
    authToken,
  })

  console.log('Creating tables...')

  await db.execute(`
    CREATE TABLE IF NOT EXISTS categories (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL
    )
  `)

  await db.execute(`
    CREATE TABLE IF NOT EXISTS units (
      id TEXT PRIMARY KEY,
      name TEXT UNIQUE NOT NULL
    )
  `)

  await db.execute(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      category TEXT,
      stock INTEGER DEFAULT 0,
      unit TEXT,
      weight TEXT,
      origin TEXT,
      description TEXT,
      image TEXT,
      regularPrice REAL NOT NULL,
      salePrice REAL,
      saleStart TEXT,
      saleEnd TEXT,
      FOREIGN KEY (category) REFERENCES categories (id),
      FOREIGN KEY (unit) REFERENCES units (name)
    )
  `)

  await db.execute(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      name TEXT,
      role TEXT DEFAULT 'user',
      createdAt TEXT
    )
  `)

  await db.execute(`
    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY,
      customerName TEXT NOT NULL,
      phoneNumber TEXT NOT NULL,
      email TEXT,
      address TEXT NOT NULL,
      city TEXT NOT NULL,
      district TEXT NOT NULL,
      items TEXT NOT NULL, -- JSON string
      total REAL NOT NULL,
      status TEXT DEFAULT 'pending',
      createdAt TEXT NOT NULL
    )
  `)

  await db.execute(`
    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      subject TEXT NOT NULL,
      message TEXT NOT NULL,
      createdAt TEXT NOT NULL
    )
  `)

  console.log('Tables created successfully.')
}

setup().catch(console.error)
