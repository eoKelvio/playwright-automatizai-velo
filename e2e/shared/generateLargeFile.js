import fs from 'fs'

async function generateLargeFile(filePath, sizeInMB) {
  const stream = fs.createWriteStream(filePath)
  const content = 'a'.repeat(1024 * 1024)

  for (let i = 0; i < sizeInMB; i++) {
    stream.write(content)
  }

  stream.end()
}

export default generateLargeFile
