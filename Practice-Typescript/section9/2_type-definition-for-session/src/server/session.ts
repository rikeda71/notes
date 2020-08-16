import Express from 'express'
import session from 'express-session'
import redis from 'redis'
import connectRedis from 'connect-redis'
import { REDIS_HOST, REDIS_PORT } from '../constants'

export default (app: Express.Application) => {
  const RedisStore = connectRedis(session)
  const redisClient = redis.createClient()
  const option = {
    store: new RedisStore({
      client: redisClient,
      // 以下の方法で繋げなかったので、修正
      // host: REDIS_HOST,
      // port: REDIS_PORT,
    }),
    secret: 'keyboard cat',
    resave: false,
  }
  app.use(session(option))
}
