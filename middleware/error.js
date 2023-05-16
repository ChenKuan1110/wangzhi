// 全局统一错误处理中间件
import createHttpError from "http-errors"

export default function () {
  return async (ctx, next) => {
    try {
      await next()
    } catch (err) {
      console.log('全局统一错误处理', err)
      ctx.status = err.status || 500
      ctx.body = createHttpError(ctx.status, err.message)
    }
  }
}