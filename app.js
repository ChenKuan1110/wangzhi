import path from 'path'
import Koa from 'koa'
import { koaBody } from 'koa-body'
// import koaCors from 'koa-cors'
import serve from 'koa-static'
import KoaLogger from 'koa-logger'
import 'dot-env'

import wxRouter from './routes/wx.js'
import pageRouter from './routes/page.js'
import apiRouter from './routes/api.js'
import { PORT, STATIC_DIR } from './config/index.js'
import initDB from './utils/db.js'
import errorMiddleware from './middleware/error.js'


const app = new Koa()

// 全局错误处理
app.use(errorMiddleware())

// 挂载数据库
app.use(async (ctx, next) => {
  const db = await initDB()
  app.context.db = db
  await next()
})

app.use(KoaLogger())
// app.use(koaCors())
app.use(koaBody())
app.use(wxRouter)
app.use(pageRouter)
app.use(apiRouter)

app.use(serve(path.join(STATIC_DIR), {
  index: true
}))


app.listen(PORT, () => {
  console.log(`[ 望知先生 ] 微信服务器已在 http://127.0.0.1:${PORT} 上启动`)
})