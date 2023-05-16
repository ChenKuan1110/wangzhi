https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxa803340de403a050&redirect_uri=https%3A%2F%2Fwww.fengyenongye.cn%2Fwangzhi_wx&response_type=code&scope=snsapi_base&state=wx#wechat_redirect

本地测试：

http%3A%2F%2F127.0.0.1%3A3001%2Findex.html

https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxa803340de403a050&redirect_uri=http%3A%2F%2F127.0.0.1%3A3001%2Findex.html&response_type=code&scope=snsapi_base&state=wx#wechat_redirect



## 公共接口说明

### 获取 access_token

接口地址： `/api/token`

请求方式： `GET`


### 刷新 access_token

接口地址： `/api/token/refresh`

请求方式: `GET`



## 更新记录

2023.05.16

> 因微信公众号模版消息业务限制，模版消息中字段值被截断，导致诊断结果模版中诊断结果显示不完全。
>
> 更新后的模式变更为： 
>
> 通过点击菜单按钮 ""
