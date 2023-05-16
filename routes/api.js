// 对外暴露接口
import Router from "koa-router"
import fs from 'node:fs'
import axios from 'axios'

import { APPID, APPSCRET, TOKEN_FILE_PATH } from '../config/index.js'



const apiRouter = new Router({ prefix: '/api' })

const GET_ACCESS_TOKEN_URL = ' https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=APPID&secret=APPSECRET'


function isValid (time) {
  const now = Date.now()
  return (now - time) < (1000 * 7000)
}

async function fetchToken () {
  console.log('API 请求获取 token')
  // 请求
  const url = GET_ACCESS_TOKEN_URL.replace('APPID', APPID).replace('APPSECRET', APPSCRET)
  const {data} = await axios.get(url)
  const { access_token:token } = data
  // 保存到文件
  saveToFile(token)
  return token
}

// 保存到文件
function saveToFile (token) {
  fs.writeFile(TOKEN_FILE_PATH, JSON.stringify({
    token,
    time: Date.now()
  }), (err) => {
    if (err) {
      console.log('保存文件失败')
    }
    console.log('保存 token 文件成功')
  })
}


function getToken () {
  if (fs.existsSync(TOKEN_FILE_PATH)) {
    const fileStr = fs.readFileSync(TOKEN_FILE_PATH, { encoding: 'utf-8' })
    const { token, time } = fileStr && JSON.parse(fileStr)
    console.log('从文件中读取')
    if (token && time && isValid(time)) {
      console.log('token 有效')
      return token
    } else { 
      console.log('token 失效')
      return fetchToken()
    }
  } else {
    return fetchToken()
  }
}

// 获取/缓存 token
apiRouter.get('/token', async (ctx) => {
  // 1. 获取 token
  // 2. 验证 token
  // 3. 返回 token
  const token = await getToken()
  console.log('token=', token)
  ctx.body = {
    code: 0,
    msg: 'ok',
    data: {
      token
    }
  }
})

// 强制刷新 token
apiRouter.get('/token/refresh', async ctx => {
  const token = await fetchToken()
  ctx.body = {
    code: 0,
    msg: 'ok',
    data: {
      token
    }
  }
})



export default apiRouter.routes()
