import sharp from 'sharp'
import { readdirSync, mkdirSync } from 'fs'
import { join, extname, basename } from 'path'

const INPUT_DIR = './Images'
const OUTPUT_DIR = './Images/web'

mkdirSync(OUTPUT_DIR, { recursive: true })

const files = readdirSync(INPUT_DIR).filter(f =>
  ['.jpg', '.jpeg'].includes(extname(f).toLowerCase()) && !f.startsWith('.')
)

for (const file of files) {
  const input = join(INPUT_DIR, file)
  const output = join(OUTPUT_DIR, basename(file, extname(file)) + '.jpg')

  await sharp(input)
    .rotate()  // auto-rotate based on EXIF orientation
    .resize(1800, null, { withoutEnlargement: true })
    .jpeg({ quality: 82, progressive: true })
    .toFile(output)

  const { size: inSize } = (await import('fs')).statSync(input)
  const { size: outSize } = (await import('fs')).statSync(output)
  console.log(`✓ ${file} — ${(inSize/1024/1024).toFixed(1)}MB → ${(outSize/1024).toFixed(0)}KB`)
}

console.log('\nDone. Compressed images saved to Images/web/')
