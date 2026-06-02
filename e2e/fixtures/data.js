import dotenv from 'dotenv'
import getEnv from '@/shared/selectEnv.js'

dotenv.config()

const getOptionalEnv = (key) => {
  try {
    return getEnv(key)
  } catch {
    return ''
  }
}

export default {
  URL: getEnv('BASE_URL'),
  SUPABASE_URL: getOptionalEnv('SUPABASE_URL'),
  SUPABASE_ANON_KEY: getOptionalEnv('SUPABASE_ANON_KEY'),
}
