import request from '@/utils/request'

// 获取默认查询时间
export const getDate = () => {
  return request({
    url: '/Index/getDate',
    method: 'post'
  })
}
// 获取科室列表
export const getDepts = (data: any) => {
  return request({
    url: '/index/getDept',
    method: 'post',
    data
  })
}

// 获取科室信息
export const getDeptInfo = (data: any) => {
  return request({
    url: '/index/getDeptInfo',
    method: 'post',
    data
  })
}
// 获取医生介绍信息
export const getDocInfo = (data: any) => {
  return request({
    url: '/index/getDoctorInfo',
    method: 'post',
    data
  })
}
// 获取就诊人列表
export const getUsers = (data: any) => {
  return request({
    url: '/Patient/getUsers',
    method: 'post',
    data
  })
}

// 就诊人详情
export const getUsersInfo = (data: any) => {
  return request({
    url: '/Patient/getUserInfo',
    method: 'post',
    data
  })
}

// 判断当前就诊卡是否有效
export const getUserStatus = (data: any) => {
  return request({
    url: '/Patient/getUserInfo1',
    method: 'post',
    data
  })
}

// 添加就诊人
export const addUser = (data: any) => {
  return request({
    url: '/Patient/addUser',
    method: 'post',
    data
  })
}

// 删除就诊人
export const delUser = (data: any) => {
  return request({
    url: '/Patient/delUser',
    method: 'post',
    data
  })
}

// 个人中心信息
export const getSelfInfo = (data: any) => {
  return request({
    url: '/user/getUserInfo',
    method: 'post',
    data
  })
}
// 切换就诊人
export const setDefault = (data: any) => {
  return request({
    url: '/user/setDefault',
    method: 'post',
    data
  })
}

// 查询余额
export const getBalance = (data: any) => {
  return request({
    url: '/user/getBalance',
    method: 'post',
    data
  })
}

// 充值缴费记录
export const getRecord = (data: any) => {
  return request({
    url: '/user/getRecord',
    method: 'post',
    data
  })
}

// 门诊待缴费记录
export const getPending = (data: any) => {
  return request({
    url: '/user/getPending',
    method: 'post',
    data
  })
}

// 门诊待缴费记录详情
export const getPendingShow = (data: any) => {
  return request({
    url: '/user/getPendingShow',
    method: 'post',
    data
  })
}
// 门诊支付
export const setPay = (data: any) => {
  return request({
    url: '/user/setPay',
    method: 'post',
    data
  })
}

// 缴费记录
export const getPayment = (data: any) => {
  return request({
    url: '/user/getPayment',
    method: 'post',
    data
  })
}

// 缴费记录
export const wxPay = (data: any) => {
  return request({
    url: '/pay/pay',
    method: 'post',
    data
  })
}

// 科室列表
export const getKSList = (data: any) => {
  return request({
    url: '/Register/getDept',
    method: 'post',
    data
  })
}

// 医生列表
export const getDoctor = (data: any) => {
  return request({
    url: '/Register/getDoctor',
    method: 'post',
    data
  })
}

// 挂号搜索
export const search = (data: any) => {
  return request({
    url: '/Register/search',
    method: 'post',
    data
  })
}

// 医生详情
export const getDoctorDetail = (data: any) => {
  return request({
    url: '/Register/getDoctorDetail',
    method: 'post',
    data
  })
}

// 确认挂号
export const doReg = (data: any) => {
  return request({
    url: '/Register/doReg',
    method: 'post',
    data
  })
}

// 挂号记录
export const getRegList = (data: any) => {
  return request({
    url: '/Register/getRegList',
    method: 'post',
    data
  })
}

// 挂号信息
export const getReg = (data: any) => {
  return request({
    url: '/Register/getReg',
    method: 'post',
    data
  })
}

// 检查报告列表
export const getList = (data: any) => {
  return request({
    url: '/Report/getList',
    method: 'post',
    data
  })
}

// 检查报告详情
export const getDetail = (data: any) => {
  return request({
    url: '/Report/getDetail',
    method: 'post',
    data
  })
}

// 收藏医生
export const setCollection = (data: any) => {
  return request({
    url: '/User/setCollection',
    method: 'post',
    data
  })
}

// 收藏列表
export const getCollection = (data: any) => {
  return request({
    url: '/User/getCollection',
    method: 'post',
    data
  })
}
