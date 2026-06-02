import dotenv from 'dotenv'
import getEnv from '@/shared/selectEnv.js'

dotenv.config()

export default {
  URL: getEnv('BASE_URL'),
  SUPABASE_URL: getEnv('SUPABASE_URL'),
  SUPABASE_ANON_KEY: getEnv('SUPABASE_ANON_KEY'),
}
