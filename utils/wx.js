import * as fs from 'fs'
import {
  PAGE_ACCESS_TOKEN_FILE_PATH,
  GET_PAGE_ACCESS_TOEKN_URL,
  APPID,
  APPSCRET,
  CHECK_PAGE_ACCESS_TOKEN_URL
} from '../config/index.js'
import axios from 'axios'


// 页面相关工具方法

async function getPageTokenAPI (code) {
  console.log("调用微信接口获取 网页授权 access_token")
  const url = GET_PAGE_ACCESS_TOEKN_URL
    .replace("APPID", APPID)
    .replace("SECRET", APPSCRET)
    .replace("CODE", code)
  console.log(url)
  const { data: res } = await axios.get(url)
  console.log("微信返回结果", res)
  const { access_token} = res
  if (access_token) {
    console.log('保存 page access_token 文件')
    // 保存到文件
    fs.writeFile(PAGE_ACCESS_TOKEN_FILE_PATH, JSON.stringify(res), { encoding: "utf-8" })
    return access_token
  } else {
    return ''
  }
}

async function checkPageAccessTokenValid (accessToken) {
  const url = CHECK_PAGE_ACCESS_TOKEN_URL.replace("ACCESS_TOKEN", AccessToken).replace('OPEN')
}


export async function getPageAccessToken (code) {
  if (fs.existsSync(PAGE_ACCESS_TOKEN_FILE_PATH)) {
    fs.readFile(PAGE_ACCESS_TOKEN_FILE_PATH, { encoding: "utf-8" }, (err, data) => {
      if (err) return null
      console.log('读取本地保存的文件', data)
      console.log('typeof data=', typeof data)
      const { access_token} = JSON.parse(data)
      // 判断 access_token 是否有效
      const valid = checkPageAccessTokenValid(access_token)
      if (valid) {
        return access_token
      } else {
        
      }
    })
  } else {
    const accessToken = getPageTokenAPI(code)
    return accessToken
  }
}