import Express from 'express'
import config from './config'
import session from './session'
import webpack from './webpack'
import routes from './routes'
import error from './error'
import listen from './listen'

const app = Express()

config(app) // setting express server
session(app) // setting session middleware(Redis client)
webpack(app) // setting webpack middleware
routes(app) // setting routes handler
error(app) // setting error logs
listen(app) // run server
