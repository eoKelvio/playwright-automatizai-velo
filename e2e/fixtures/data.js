import dotenv from 'dotenv'
import getEnv from '@/shared/selectEnv.js'

dotenv.config()

export default {
  URL: getEnv('BASE_URL'),
}
