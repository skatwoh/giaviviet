import { createClient } from '@libsql/client'
import * as fs from 'fs'
import { join } from 'path'
import * as dotenv from 'dotenv'

dotenv.config()

const url = process.env.TURSO_DATABASE_URL || 'file:local.db'
const authToken = process.env.TURSO_AUTH_TOKEN

async function migrate() {
  const db = createClient({ url, authToken })
  const dataDir = join(process.cwd(), 'public/data')

  const files = [
    { name: 'categories.json', table: 'categories' },
    { name: 'units.json', table: 'units' },
    { name: 'products.json', table: 'products' },
    { name: 'users.json', table: 'users' },
    { name: 'orders.json', table: 'orders' },
    { name: 'messages.json', table: 'messages' },
  ]

  for (const file of files) {
    const filePath = join(dataDir, file.name)
    if (!fs.existsSync(filePath)) continue

    console.log(`Migrating ${file.name}...`)
    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
    const items = Array.isArray(data) ? data : (data.products || data.categories || data.units || data.users || data.orders || data.messages || [])

    for (const item of items) {
      const keys = Object.keys(item).filter(k => k !== 'price' && k !== 'originalPrice')
      const values = keys.map(k => {
        const val = item[k]
        if (k === 'items' && typeof val === 'object') return JSON.stringify(val)
        return val
      })

      if (file.table === 'orders' && item.customer) {
          const orderKeys = [
              'id', 'customerName', 'phoneNumber', 'email', 'address', 'city', 'district',
              'items', 'total', 'status', 'createdAt'
          ]
          const orderValues = [
              item.id,
              item.customer.customerName,
              item.customer.phoneNumber,
              item.customer.email,
              item.customer.address,
              item.customer.city,
              item.customer.district,
              JSON.stringify(item.items),
              item.total,
              item.status,
              item.createdAt
          ]
          const placeholders = orderKeys.map(() => '?').join(', ')
          await db.execute({
            sql: `INSERT OR REPLACE INTO ${file.table} (${orderKeys.join(', ')}) VALUES (${placeholders})`,
            args: orderValues
          })
      } else {
          const placeholders = keys.map(() => '?').join(', ')
          await db.execute({
            sql: `INSERT OR REPLACE INTO ${file.table} (${keys.join(', ')}) VALUES (${placeholders})`,
            args: values
          })
      }
    }
  }

  console.log('Migration complete.')
}

migrate().catch(console.error)
