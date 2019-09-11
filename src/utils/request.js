import axios from 'axios'
import hash from 'hash.js'
import { isEmptyObject } from '../utils/utils'

// 请求队列
let pending = []

// 获取纯Url，不包含?后面的参数
const getPureUrl = (url, start = 0) => {
	const index = url.indexOf('?')
	const pureUrl = url.substr(0, ~index ? index : url.length)
  return pureUrl.substr(start)
}

// 添加请求拦截器，动态设置参数
axios.interceptors.request.use(config => {

    // 中文转为decode编码
    config.url = encodeURI(config.url)

    // 设置公共URL http://datacenter.dgdatav.com:6080/api
    config.baseURL = process.env.NODE_ENV === 'development' ? 'http://datacenter.dgdatav.com:6080/api' : 'http://datacenter.dgdatav.com:6080/api'

    // 获取纯Url（不包含?后面的参数）(也不包含baseURL的前缀)
    const pureUrl =  getPureUrl(config.url) 

    // 如果需要去重复（默认noRepeat为 'on'，即开启去重复），则中止队列中所有相同请求地址的xhr
    config.noRepeat === 'on' && pending.forEach(_ => _.url === pureUrl && _.cancel('repeat abort' + pureUrl))

    // 配置 CancelToken
    config.cancelToken = new axios.CancelToken(cancel => {
       // 移除所有中止的请求，并且将新的请求推入缓存
       pending = [...pending.filter(_ => _.url != pureUrl), { url: pureUrl, cancel }]
    })

    // 返回最终配置
    return config
})

// 响应拦截器
axios.interceptors.response.use(res => {
  // 成功响应之后清空队列中所有相同Url的请求
  pending = pending.filter(_ => _.url != getPureUrl(res.config.url, res.config.baseURL.length))  
  // 返回 response
  return res
}, error => {
   return Promise.reject(error)
});


// 检查状态码
const checkStatus = (response) => {
	// 判断请求状态
    if (response.status >= 200 && response.status < 300) {
        // 返回Promise 
        return response.data
    } else {
      // 服务器响应异常
      throw new Error(response.statusText)
    }
}

// 缓存到sessionStorage
const cachedSave = (hashcode, content) => {
  try {
    // 返回code500是后端固定的报错反馈 && 不能为空对象 && 数据的小于2M
    if (content.code != 500 && !isEmptyObject(content) && (JSON.stringify(content).length / 1024).toFixed(2) < 2048) {
      // 设置缓存
      sessionStorage.setItem(hashcode, JSON.stringify(content))
      // 设置缓存时间
      sessionStorage.setItem(`${hashcode}:timestamp`, Date.now())
    }
  } catch (err) {
      // 超出缓存大小
      if (err.name === 'QuotaExceededError') {
        // 清空所有缓存
        sessionStorage.clear()
        // 重新设置缓存
        sessionStorage.setItem(hashcode, JSON.stringify(content))
        // 重新设置缓存时间
        sessionStorage.setItem(`${hashcode}:timestamp`, Date.now())
      }
  }
  
  // 返回Promise
  return content
}

// 公共请求
export const request = (url, options = {}) => {
    // 指纹（必须加入日月报来做区别。）
    const fingerprint = url + JSON.stringify(options)
    // 加密指纹
    const hashcode = hash.sha256().update(fingerprint).digest('hex')
    // 预设值指纹
    const _cachedSave = cachedSave.bind(null, hashcode)
    // 过期设置
    const expirys = options.expirys || 60
    // 本请求是否禁止缓存？
    if (expirys !== false) {
        // 获取缓存
        const cached = sessionStorage.getItem(hashcode)
        // 获取该缓存的时间
        const whenCached = sessionStorage.getItem(`${hashcode}:timestamp`)
        // 如果缓存都存在（只有生产模式才开启）
        if (cached !== null && whenCached !== null && process.env.NODE_ENV === 'production') {
          // 判断缓存是否过期
          const age = (Date.now() - whenCached) / 1000
          // 如果不过期的话直接返回该内容
          if (age < expirys) {
              // 新建一个response
              const response = new Response(new Blob([cached]))
              // 返回promise式的缓存
              return new Promise((resolve, reject) => resolve(response.json()))
          }
          // 删除缓存内容
          sessionStorage.removeItem(hashcode)
          // 删除缓存时间
          sessionStorage.removeItem(`${hashcode}:timestamp`)
        }
    }
    // 设置 noRepeat 默认为 true，即默认是去重复的。
    options.noRepeat = options.noRepeat || 'on'
    // 正式开始请求
    return axios(url, options).then(checkStatus).then(_cachedSave)
}