// xml js 相互转换
import { parseString, Builder } from 'xml2js'

export function parseMessage (xmlString) {
  return new Promise((resolve, reject) => {
    parseString(xmlString, (err, result) => {
      if (err) reject(err)
      console.dir('util parseMessage',result)
      resolve(result)
    })
  })
}

export function stringifyToXML (obj) {
  const builder = new Builder({cdata: true, rootName: 'xml'})
  return builder.buildObject(obj)
}