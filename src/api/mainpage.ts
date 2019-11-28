import request from '@/utils/request'

export const jssdk = (data: any) => {
  return request({
    url: 'wechat/getSign',
    method: 'post',
    data
  })
}
// 用户--begin  login/index
// 账单/setRz
export const login = (data: any) => {
  return request({
    url: 'login/index',
    method: 'post',
    data
  })
}
// 账单/setRz
export const getAmount = (data: any) => {
  return request({
    url: 'user/getAmount',
    method: 'post',
    data
  })
}
// 提现
export const withdraw = (data: any) => {
  return request({
    url: 'user/withdraw',
    method: 'post',
    data
  })
}
// 微信解绑user/unBind
export const unBind = (data: any) => {
  return request({
    url: 'user/unBind',
    method: 'post',
    data
  })
}
// 实名认证/setRz
export const setRz = (data: any) => {
  return request({
    url: 'user/setRz',
    method: 'post',
    data
  })
}
// 获取验证码user/setRz
export const sendSms = (data: any) => {
  return request({
    url: 'login/sendSms',
    method: 'post',
    data
  })
}
// 重置密码
export const setPwd = (data: any) => {
  return request({
    url: 'login/setPwd',
    method: 'post',
    data
  })
}
// 充值
export const recharge = (data: any) => {
  return request({
    url: 'user/recharge',
    method: 'post',
    data
  })
}
// 用户信息
export const getUserInfo = (data: any) => {
  return request({
    url: 'user/getUserInfo',
    method: 'post',
    data
  })
}
// 修改用户信息
export const editUserInfo = (data: any) => {
  return request({
    url: 'user/setInfo',
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
// 商品-购买详情
export const sub1Order = (data: any) => {
  return request({
    url: 'order/index',
    method: 'post',
    data
  })
}
// 提交订单-吊起支付
export const subOrder = (data: any) => {
  return request({
    url: 'order/done',
    method: 'post',
    data
  })
}
// 订单列表-订单详情
export const getOrderInfo = (data: any) => {
  return request({
    url: 'order/getInfo',
    method: 'post',
    data
  })
}
// 订单再支付
export const orderpay = (data: any) => {
  return request({
    url: 'order/pay',
    method: 'post',
    data
  })
}
// 订单  取消，确认收货
export const setStatus = (data: any) => {
  return request({
    url: 'order/setStatus',
    method: 'post',
    data
  })
}
// 退款/换货
export const afterSale = (data: any) => {
  return request({
    url: 'order/afterSale',
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
    url: 'product/getProducts',
    method: 'post',
    data
  })
}
// 商品详情
export const getGdInfo = (data: any) => {
  return request({
    url: 'product/getInfo',
    method: 'post',
    data
  })
}
// 商品--end agent/invite
// 代邀请
export const invite = (data: any) => {
  return request({
    url: 'agent/invite',
    method: 'post',
    data
  })
}
// 代理等级
export const getLevel = (data: any) => {
  return request({
    url: 'agent/getLevel',
    method: 'post',
    data
  })
}
// 代理列表
export const getagList = (data: any) => {
  return request({
    url: 'agent/getList',
    method: 'post',
    data
  })
}
// 代理订单列表
export const getagOrderList = (data: any) => {
  return request({
    url: 'agent/getOrder',
    method: 'post',
    data
  })
}
// 代理操作
export const setagStatus = (data: any) => {
  return request({
    url: 'agent/setStatus',
    method: 'post',
    data
  })
}
// 工厂出货
export const shipment = (data: any) => {
  return request({
    url: 'agent/shipment',
    method: 'post',
    data
  })
}
// 零售出货
export const retail = (data: any) => {
  return request({
    url: 'agent/retail',
    method: 'post',
    data
  })
}
// 代理查询
export const agentsearch = (data: any) => {
  return request({
    url: 'agent/search',
    method: 'post',
    data
  })
}
// 平台待发
export const df = (data: any) => {
  return request({
    url: 'agent/df',
    method: 'post',
    data
  })
}
// 代理升级
export const upLevel = (data: any) => {
  return request({
    url: 'agent/upLevel',
    method: 'post',
    data
  })
}
// 扫描信息agent/retail
export const getScanGinfo = (data: any) => {
  return request({
    url: 'index/scan',
    method: 'post',
    data
  })
}
// 买家照片
export const getMshow = (data: any) => {
  return request({
    url: 'index/photo',
    method: 'post',
    data
  })
}
// 回邀
export const checkSn = (data: any) => {
  return request({
    url: 'index/checkSn',
    method: 'post',
    data
  })
}
// 回邀提交
export const register = (data: any) => {
  return request({
    url: 'index/register',
    method: 'post',
    data
  })
}
