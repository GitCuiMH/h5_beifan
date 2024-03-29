import Cookies from 'js-cookie'
import { Md5 } from 'ts-md5/dist/md5'
const TokenKey = 'vue_admin_template_token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token: string) {
  return Cookies.set(TokenKey, token, { expires: 1.33 })
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getURLParams() {
  const hrefurl = location.href
  const theRequest: any = {}
  if (hrefurl.lastIndexOf('?') !== -1) {
    const str = hrefurl.substr(hrefurl.lastIndexOf('?') + 1)
    const strs = str.split('&')
    for (const it of strs) {
      const tempData = it.split('=')
      theRequest[tempData[0]] = decodeURIComponent(tempData[1])
    }
    // for (let i = 0; i < strs.length; i++) {
    //   const tempData = strs[i].split('=')
    //   theRequest[tempData[0]] = decodeURIComponent(tempData[1])
    // }
  }
  return theRequest
}
import Clipboard from 'clipboard'

export function copy() {
  return new Clipboard('.copy')
}
export function upload(files: any, callback: any= () => {}) {
  let file: any[] = []
  const imgs: string[] = []
  file = files[0] ? files : [files]
  // const client = new OSS({
  //   region: 'oss-cn-qingdao',
  //   accessKeyId: 'LTAI4Fh4GqSydQQNrgPnBaGY',
  //   accessKeySecret: 'FWPYlHaaZkvqd7EnXgzLsJE9ke3jW3',
  //   bucket: 'quansuwangluo'
  // })
  // file.forEach((it) => {
  //   const name =
  //     'insurance/pic/' +
  //     getRandomString(6) +
  //     new Date().getTime() +
  //     it.file.name.substr(it.file.name.lastIndexOf('.'));
  //   client.multipartUpload(name, it.file, {
  //     }).then((data) => {
  //       imgs.push(data.name)
  //       if (imgs.length >= file.length) {
  //         callback(imgs)
  //       }
  //     }).catch((err) => {
  //     });
  // })
}
export function getSign(param: any) {
  return param
}

export function md5s(params: any) {
  return getSign(params)
}
