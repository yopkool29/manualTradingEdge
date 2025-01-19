import { build } from 'esbuild'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))

build({
  entryPoints: [join(__dirname, '../prisma/seed.ts')],
  outfile: join(__dirname, '../prisma/seed.js'),
  platform: 'node',
  format: 'esm',
  target: 'node16',
}).catch(() => process.exit(1))
