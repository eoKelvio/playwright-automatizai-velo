import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Change to switch environments: 'PROD' | 'STAGING' | 'DEV' | 'QA'
const ENVIRONMENT = 'PROD'

/**
 * Resolves an environment variable with multiple fallback strategies.
 *
 * Priority order:
 * 1. .env.local  (local developer overrides)
 * 2. .env.[environment]  (e.g. .env.staging, .env.prod)
 * 3. .env  (default file)
 * 4. process.env  (system / CI variables)
 *
 * @param {string} varName
 * @returns {string}
 */
function getEnv(varName) {
  // 1. .env.local
  dotenv.config({ path: path.resolve(__dirname, '..', '.env.local'), override: false })
  if (process.env[varName]) return process.env[varName]

  // 2. .env.[environment]
  dotenv.config({ path: path.resolve(__dirname, '..', `.env.${ENVIRONMENT.toLowerCase()}`), override: false })
  if (process.env[varName]) return process.env[varName]

  // 3. .env
  dotenv.config({ override: false })
  if (process.env[varName]) return process.env[varName]

  throw new Error(
    `❌ Variable '${varName}' not found!\n` +
      `Environment: ${ENVIRONMENT}\n` +
      `Tried: .env.local, .env.${ENVIRONMENT.toLowerCase()}, .env\n` +
      `Make sure one of these files exists and contains: ${varName}=your-value`
  )
}

export default getEnv
export { getEnv, ENVIRONMENT }
