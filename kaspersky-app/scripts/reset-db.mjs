import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const sourceFile = path.join(__dirname, '../mock/db.original.json')
const targetFile = path.join(__dirname, '../mock/db.json')

try {
  const data = fs.readFileSync(sourceFile, 'utf8')
  fs.writeFileSync(targetFile, data, 'utf8')
  console.log('✅ Database reset successfully')
} catch (err) {
  console.error('❌ Error resetting database:', err.message)
  process.exit(1)
}
