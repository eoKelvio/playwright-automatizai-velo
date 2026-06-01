import dotenv from 'dotenv'
import getEnv from '@/shared/selectEnv.js'

dotenv.config()

export default {
  URL: getEnv('BASE_URL'),
  USER_EMAIL: getEnv('USER_EMAIL'),
  USER_PASSWORD: getEnv('USER_PASSWORD')
}
