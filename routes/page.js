// 网页中的涉及的数据接口
import Router from "koa-router"
import { getPageAccessToken } from '../utils/wx.js'
import { getResultAPI, startEquipmentAPI } from "../api/backend.js"


const router = new Router({prefix: "/page" })

// 获取微信授权 code
router.post("/config", async ctx => {
  const body = ctx.request.body
  console.log("微信授权", body)
  const { code } = JSON.parse(body)
  console.log("微信授权 code=", code)
  // 请求获取微信授权 access_token
  getPageAccessToken(code)
  ctx.body = {
    code: 0
  }
})


// 发送设备码
router.post("/code", async ctx => {
  console.log(ctx.request.body)
  console.log(typeof ctx.request.body)
  const { code, openid } = typeof ctx.request.body === 'string' ? JSON.parse(ctx.request.body) : ctx.request.body
  console.log('设备码', code)
  console.log('openid', openid)

  // 发送设备启动命令
  const res = await startEquipmentAPI(code, 'fake_openid')
  console.log('启动设备接口返回数据', res)
  // 解析接口返回数据
  if (res.meta.code === 0) {
    ctx.body = {
      code: 0,
      msg: '设备开启中'
    }
  } else if (res.meta.code === 40001) {
    ctx.body = {
      code: -1,
      msg: '该设备不在线'
    }
  }else {
    ctx.body = {
      code: -1,
      msg: res.meta.msg || '开启设备发生错误，请稍候再试'
    }
  }
})

// 轮询结果
router.get('/result', async ctx => {
  // 获取设备编号、用户编号
  const { no, uid } = ctx.query
  console.log(`轮询 no= ${no}, uid=${uid}`)
  // TODO: 发送后端请求，获取结果
  const res = await getResultAPI(no, uid)
  console.log('查询结果', res)
  if (res.meta.code === 0) {
    ctx.body = {
      code: 0,
      msg: '查询成功',
      data: res.data
    }
  } else {
    ctx.body = {
      code: -1,
      msg: '获取结果中'
    }
  }
})


export default router.routes()