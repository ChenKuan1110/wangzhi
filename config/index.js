export const title = '望知'
export const PORT = 3001
export const STATIC_DIR = 'public'

// 真实环境
// export const APPID = 'wxa803340de403a050'
// export const APPSCRET= 'd443769ced64022f640921e823740e7e'
// export const TOKEN = "wangzhi"

//测试环境
export const APPID = 'wxea4c1a271d231129'
export const APPSCRET= 'bff305946858377c27317fa6bc02d99d'
export const TOKEN = "wangzhi"

export const DB_DIR = "db/database.db"
export const PAGE_ACCESS_TOKEN_FILE_PATH = "config/page_access_token.json"
export const TOKEN_FILE_PATH = "config/access_token.json"

// 后台服务接口地址
export const BACKEND_BASE_URL = 'http://192.168.10.115:8999/tongue_public'


// 获取微信网页授权的 access_token 的 URL
export const GET_PAGE_ACCESS_TOEKN_URL = 'https://api.weixin.qq.com/sns/oauth2/access_token?appid=APPID&secret=SECRET&code=CODE&grant_type=authorization_code'

// 拉取用户信息的 URL
export const GET_USER_INFO_URL = 'https://api.weixin.qq.com/sns/userinfo?access_token=ACCESS_TOKEN&openid=OPENID&lang=zh_CN'

// 检验授权凭证(access_token) 是否有效的 URL
export const CHECK_PAGE_ACCESS_TOKEN_URL = 'https://api.weixin.qq.com/sns/auth?access_token=ACCESS_TOKEN&openid=OPENID'
