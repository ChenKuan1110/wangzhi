// 微信消息处理
import Router from "koa-router"
import { TOKEN } from '../config/index.js'
import sha1 from 'sha1'
import {parseMessage, stringifyToXML} from '../utils/message.js'


const router = new Router({ prefix: '/wx' })


// 微信接入
router.get('/wechat', async (ctx, next) => {
  const { signature, timestamp, nonce, echostr } = ctx.query;
  const arr = [TOKEN, timestamp, nonce].sort();
  const str = arr.join('');
  const sign = sha1(str);
  if (signature === sign) {
    ctx.body = echostr; // 返回echostr表示验证通过
  } else {
    ctx.status = 401; // 返回401表示验证失败
  }
});


// 消息处理
router.post('/wechat', async (ctx, next) => {
  const message = ctx.request.body;
  console.log("message", message)
  const parsedMessage = await parseMessage(message)
  console.log(JSON.stringify(parsedMessage.xml, null, 2))
  console.log('-------')
  console.dir(parsedMessage)
  console.log('-------')

  // 统一消息回复
  // 所有类型的消息统一转换为 文本回复
  const xmlStr = stringifyToXML({
    ToUserName: parsedMessage.xml.FromUserName[0],
    FromUserName: parsedMessage.xml.ToUserName[0],
    CreateTime: Date.now() /1000,
    MsgType: 'text',
    Content: `👏欢迎使用望知先生公众号，点击菜单【我要体验】即可使用`
  })
  // console.log(xmlStr)
  ctx.body = xmlStr
});



export default router.routes()