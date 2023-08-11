import Express from 'express'
import { HttpError } from 'http-errors'
import { GET } from './get'
import { POST } from './post'
import { PUT } from './put'

declare module 'express' {
  interface RequestParams {
    query?: any
    params?: any
    body?: any
  }
  // ExRequest型はプログラマによって拡張された型定義
  // Expressにはこのような型は存在しないが、`declare module 'express'`によって、
  // Expressに定義されているものとして参照できる
  interface ExRequest<T extends RequestParams> extends Express.Request {
    params: T['params']
    query: T['query']
    body: T['body']
  }
  // res.sendを拡張するために設けた型
  interface ExResponse<T> extends Express.Response {
    send: (body?: T) => ExResponse<T>
  }
  // エラーハンドルの時、err?: HttpErrorを引数に取らなければならない指定
  interface ExNextFunction {
    (err?: HttpError): void
  }
  interface ExRequestHandler<T extends { req?: any; res?: any }> {
    (
      req: ExRequest<T['req']>,
      res: ExResponse<T['res']>,
      next: ExNextFunction
    ): any
  }
  interface Application {
    get: (<P extends keyof GET>(
      path: P,
      ...requestHandlers: ExRequestHandler<GET[P]>[]
    ) => any) &
      IRouterMatcher<this>
    post: (<P extends keyof POST>(
      path: P,
      ...requestHandlers: ExRequestHandler<POST[P]>[]
    ) => any) &
      IRouterMatcher<this>
    put: (<P extends keyof PUT>(
      path: P,
      ...requestHandlers: ExRequestHandler<PUT[P]>[]
    ) => any) &
      IRouterMatcher<this>
  }
}
