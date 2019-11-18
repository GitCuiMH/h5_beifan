import request from '@/utils/request'

export const jssdk = (data: any) => {
  return request({
    url: 'wechat/getSign',
    method: 'post',
    data
  })
}
// 用户--begin
// 用户信息
export const getUserInfo = (data: any) => {
  return request({
    url: 'user/getUserInfo',
    method: 'post',
    data
  })
}
// 地址列表
export const getAddress = (data: any) => {
  return request({
    url: 'user/getAddress',
    method: 'post',
    data
  })
}
// 地址编辑
export const editAddress = (data: any) => {
  return request({
    url: 'user/editAddress',
    method: 'post',
    data
  })
}
// 设置默认地址
export const setDefault = (data: any) => {
  return request({
    url: 'user/setDefault',
    method: 'post',
    data
  })
}
// 获取单个地址
export const getAddressInfo = (data: any) => {
  return request({
    url: 'user/getAddressInfo',
    method: 'post',
    data
  })
}
// 用户--end
// 订单--begin
export const getList = (data: any) => {
  return request({
    url: 'order/getList',
    method: 'post',
    data
  })
}
// 订单--end

// 商品--begin
// 商品分类
export const getCate = (data: any) => {
  return request({
    url: 'product/getCate',
    method: 'post',
    data
  })
}
// 商品列表
export const getGdList = (data: any) => {
  return request({
    url: 'product/getLists',
    method: 'post',
    data
  })
}
// 商品--end