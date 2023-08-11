import Express from 'express'
import createError, { NotExtended } from 'http-errors'
import { Health } from '../types/api'

export default (app: Express.Application) => {
  app.use((req, res, next) => {
    if (req.session !== undefined) {
      if (req.session.count === undefined || req.session.count === null) {
        req.session.count = 0
      }
    }
    next()
  })

  // 画面表示
  app.get('/', (req, res, next) => {
    if (req.session) {
      if (req.session.count !== undefined) {
        const data: { count: number } = { count: req.session.count }
        res.render('index.ejs', data)
        return
      }
    }
    next(createError(401))
  })

  // pingボタン押下時のルートハンドラー
  app.get('/ping', (req, res, next) => {
    if (req.session) {
      if (req.session.count !== undefined) {
        req.session.count++
        const data: Health = { message: 'pong', count: req.session.count }
        res.send(data)
        return
      }
    }
    next(createError(401))
  })
}
