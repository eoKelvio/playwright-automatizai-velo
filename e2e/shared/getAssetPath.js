import { existsSync } from 'fs'
import path from 'path'

export const getAssetPath = filename => {
  const assetPath = path.join(process.cwd(), 'assets', filename)
  return existsSync(assetPath) ? assetPath : path.join(process.cwd(), 'assets', filename)
}
