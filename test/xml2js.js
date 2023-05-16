import xml2js from 'xml2js'

const xmlStr = `<xml><ToUserName><![CDATA[gh_a5f6c1753e34]]></ToUserName>
<FromUserName><![CDATA[omuEh5inDSVofhx8C6HUuTphWelA]]></FromUserName>
<CreateTime>1684213225</CreateTime>
<MsgType><![CDATA[text]]></MsgType>
<Content><![CDATA[142536]]></Content>
<MsgId>24112135889951207</MsgId>
</xml>`

xml2js.parseString(xmlStr, (err,result )=> {
  if (err) throw err
  console.log(result)
  console.log(typeof result)
  console.log(result.xml.ToUserName)

})