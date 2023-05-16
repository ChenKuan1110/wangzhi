// 设备
import axios from 'axios'
import { BACKEND_BASE_URL } from '../config/index.js'


const axiosInstance = axios.create({
  baseURL: BACKEND_BASE_URL,
  timeout: 5000
})

axiosInstance.interceptors.request.use(config => {
  // console.log('Axios request config', config)
  return config
}, (err) => {
  console.log('请求异常', err)
  return Promise.reject(err)
})

axiosInstance.interceptors.response.use(response => {
  // console.log('Axios response', response)
  return response.data
}, err => {
  console.log('响应异常', err)
  return Promise.reject(err)
})


/**
 * 启动设备
 * @param {Number} code 设备编号
 * @param {Number} openid 用户id
 * @returns 
 */
export function startEquipmentAPI (code, openid) {
  return axiosInstance({
    url: `/equipment/start?id=${code}&openId=${openid}`,
    method: 'GET'
  })
}


/**
 * 获取指定设备的诊断结果
 * @param {Number} code 设备编号
 * @param {Number} openid 用户id
 * @returns 设备诊断结果
 */
export function getResultAPI (code, openid) {
  return axiosInstance({
    url: `/equipment/result?id=${code}&openId=${openid}`,
    method: 'GET'
  })
}
