import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);
declare module 'vue-router/types/router' {
  interface VueRouter {
    goBack: any,
    isBack: boolean
  }
}
Router.prototype.goBack = function() {
  this.isBack = true
  window.history.go(-1)
}
export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Main',
      component: () => import('@/views/main.vue'),
    },
    // 等级管理
    {
      path: '/about',
      name: 'about',
      component: () => import('@/views/About.vue'),
    },
    // 等级管理
    {
      path: '/lvmanage',
      name: 'LvManager',
      component: () => import('@/views/lvmanager.vue'),
    },
    // 登录
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/login/index.vue'),
    },
    // 忘记密码
    {
      path: '/forget',
      name: 'Forget',
      component: () => import('@/views/login/forget.vue'),
    },
    // 邀请
    {
      path: '/invite',
      name: 'Invite',
      component: () => import('@/views/login/invite.vue'),
    },
    // 个人中心-我的代理
    {
      path: '/proxy',
      name: 'Proxy',
      component: () => import('@/views/self/proxy.vue'),
    },
    // 个人中心-充值
    {
      path: '/chongzhi',
      name: 'ChongZhi',
      component: () => import('@/views/self/chongzhi.vue'),
    },
    // 个人中心-收货地址
    {
      path: '/address',
      name: 'Address',
      component: () => import('@/views/self/address.vue'),
    },
    // 个人中心-编辑地址
    {
      path: '/editaddr/:id',
      name: 'EditAddr',
      component: () => import('@/views/self/editaddr.vue'),
    },
    // 个人中心-二维码收款
    {
      path: '/qrcode',
      name: 'QrCode',
      component: () => import('@/views/self/qrcode.vue'),
    },
    // 个人中心-提现
    {
      path: '/stixian',
      name: 'StiXian',
      component: () => import('@/views/self/tixian.vue'),
    },
    // 个人中心-查看收款二维码
    {
      path: '/ssqrcode',
      name: 'SQrCode',
      component: () => import('@/views/self/seeqrcode.vue'),
    },
    // 个人中心-设置。
    {
      path: '/setting',
      name: 'Setting',
      component: () => import('@/views/self/setting.vue'),
    },
    // 个人中心-我的订单
    {
      path: '/myorder/:idx',
      name: 'MyOrder',
      component: () => import('@/views/self/myorder.vue'),
    },
    // 订单-确认订单
    {
      path: '/suborder/:id',
      name: 'SubOrder',
      component: () => import('@/views/self/order.vue'),
    },
    // 订单-确认订单
    {
      path: '/orderinfo/:id',
      name: 'OrderInfo',
      component: () => import('@/views/self/orderdtl.vue'),
    },
    // 订单-退款/售后
    {
      path: '/shouhou/:id',
      name: 'ShouHou',
      component: () => import('@/views/self/shouhou.vue'),
    },
    // 订单-退款/售后-状态
    {
      path: '/shouhoust/:idx',
      name: 'ShouHouSt',
      component: () => import('@/views/self/shouhoustatus.vue'),
    },
    // 个人中心-账单细节
    {
      path: '/zdlist',
      name: 'ZdList',
      component: () => import('@/views/self/list.vue'),
    },
    // 个人中心-账号设置
    {
      path: '/set',
      name: 'Set',
      component: () => import('@/views/self/set.vue'),
    },
    // 个人中心-实名认证
    {
      path: '/renzheng',
      name: 'RenZheng',
      component: () => import('@/views/self/renzheng.vue'),
    },
    // 个人中心-修改资料
    {
      path: '/edit',
      name: 'Edit',
      component: () => import('@/views/self/edit.vue'),
    },
    // 主页-新人加盟
    {
      path: '/mnewadd',
      name: 'MnewAdd',
      component: () => import('@/views/main/newadd.vue'),
    },
    // 主页-邀请链接
    {
      path: '/minviteurl/:lv',
      name: 'MinviteUrl',
      component: () => import('@/views/main/inviteurl.vue'),
    },
    // 邀请回来
    {
      path: '/newppadd',
      name: 'NewppAdd',
      component: () => import('@/views/login/newppadd.vue'),
    },
    // 主页-商品扫码
    {
      path: '/mgdcode',
      name: 'MgdCode',
      component: () => import('@/views/main/gdcode.vue'),
    },
    // 商品扫码-查看公众号
    {
      path: '/mopenpub',
      name: 'MopenPub',
      component: () => import('@/views/main/openpub.vue'),
    },
    // 商品扫码-产品系列
    {
      path: '/mgdxilie',
      name: 'MgdXiLie',
      component: () => import('@/views/main/gdxilie.vue'),
    },
    // 商品扫码-产品信息
    {
      path: '/mgdxinxi/:id',
      name: 'MgdXinXi',
      component: () => import('@/views/main/goodinfos.vue'),
    },
    // 商品扫码-质检报告
    {
      path: '/mzjreport/:id',
      name: 'MzjReport',
      component: () => import('@/views/main/zjreport.vue'),
    },
    // 商品扫码-买家照片
    {
      path: '/mpppic/:id',
      name: 'MppPic',
      component: () => import('@/views/main/pppic.vue'),
    },
    // 商品扫码-防伪认证
    {
      path: '/mfagnweirenz',
      name: 'MRrenz',
      component: () => import('@/views/main/fangweirenz.vue'),
    },
    // 主页-审核管理
    {
      path: '/mmanager',
      name: 'Mmanager',
      component: () => import('@/views/main/manager.vue'),
    },
    // 主页-合伙人审核
    {
      path: '/mmanagerdtl/:id',
      name: 'MmanagerDtl',
      component: () => import('@/views/main/shenhestatus.vue'),
    },
    // 主页-下单
    {
      path: '/mxiadan',
      name: 'MxiaDan',
      component: () => import('@/views/main/xiadan.vue'),
    },
    // 商品-详情
    {
      path: '/mgdinfo/:id',
      name: 'MgdInfo',
      component: () => import('@/views/main/gdinfo.vue'),
    },
    // 主页-工厂出货
    {
      path: '/mchuhuo/:id/:m',
      name: 'MchuHuo',
      component: () => import('@/views/main/comchuohuo.vue'),
    },
    // 主页-提交成功
    {
      path: '/msubsuc',
      name: 'MsubSuc',
      component: () => import('@/views/main/subsuc.vue'),
    },
  ]
})
