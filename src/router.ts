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

    // 个人中心
    {
      path: '/self',
      name: 'Self',
      component: () => import('@/views/self/index.vue'),
    },
    // 切换就诊人
    {
      path: '/switchUsers',
      name: 'SwitchUsers',
      component: () => import('@/views/self/switchUsers.vue'),
    },
    // 余额查询
    {
      path: '/yue',
      name: 'Yue',
      component: () => import('@/views/self/yue.vue'),
    },


    // 门诊待缴费
    {
      path: '/jiaofei',
      name: 'JiaoFei',
      component: () => import('@/views/jiaofei/index.vue'),
    },
    // 缴费记录
    {
      path: '/fList',
      name: 'FList',
      component: () => import('@/views/jiaofei/fList.vue'),
    },
    // 缴费详情
    {
      path: '/fdetail',
      name: 'FDetail',
      component: () => import('@/views/jiaofei/fdetail.vue'),
    },
    // 门诊待缴费
    {
      path: '/jiaofeidetail/:itemType/:itemNo',
      name: 'JiaoFeiDetail',
      component: () => import('@/views/jiaofei/jiaofeidetail.vue'),
    },
    // 支付成功
    {
      path: '/jfsucc',
      name: 'Jfsucc',
      component: () => import('@/views/jiaofei/jfsucc.vue'),
    },

    // 就诊人管理
    {
      path: '/infoManage/:type',
      name: 'InfoManage',
      component: () => import('@/views/infoManage/index.vue'),
    },
    // 就诊人信息
    {
      path: '/detail',
      name: 'Detail',
      component: () => import('@/views/infoManage/detail.vue'),
    },
    // 添加就诊人
    {
      path: '/add',
      name: 'Add',
      component: () => import('@/views/infoManage/add.vue'),
    },
    // 身份证就诊人列表
    {
      path: '/userList',
      name: 'UserList',
      component: () => import('@/views/infoManage/userList.vue'),
    },


    // 门诊充值
    {
      path: '/chongzhi',
      name: 'ChongZhi',
      component: () => import('@/views/chongzhi/index.vue'),
    },
    // 充值成功
    {
      path: '/chongzhisucc/:num/:sn',
      name: 'ChongZhiSucc',
      component: () => import('@/views/chongzhi/chongzhisucc.vue'),
    },
    // 充值记录
    {
      path: '/chongzhirecord',
      name: 'ChongZhiRecord',
      component: () => import('@/views/chongzhi/chongzhirecord.vue'),
    },

    // 门诊挂号 - 科室列表
    {
      path: '/guahao',
      name: 'GuaHao',
      component: () => import('@/views/guahao/index.vue'),
    },

    // 科室列表
    {
      path: '/deptlist',
      name: 'DeptList',
      component: () => import('@/views/guahao/deptlist.vue'),
    },
    // 科室信息
    {
      path: '/intro/:id',
      name: 'Intro',
      component: () => import('@/views/guahao/intro.vue'),
    },
    // 医生介绍
    {
      path: '/docintro/:id',
      name: 'DocIntro',
      component: () => import('@/views/guahao/docintro.vue'),
    },
    // 门诊挂号 - 医生列表
    {
      path: '/doctorList/:deptCode/:name',
      name: 'DoctorList',
      component: () => import('@/views/guahao/doctorList.vue'),
    },
    // 门诊挂号 - 医生排班
    {
      path: '/doctorDetail',
      name: 'DoctorDetail',
      component: () => import('@/views/guahao/doctorDetail.vue'),
    },
    // 门诊挂号 - 挂号确认
    {
      path: '/hconfirm',
      name: 'HConfirm',
      component: () => import('@/views/guahao/hconfirm.vue'),
    },
    // 门诊挂号 - 挂号确认-详情
    {
      path: '/hdetail',
      name: 'HDetail',
      component: () => import('@/views/guahao/hdetail.vue'),
    },
    // 门诊挂号 - 挂号记录
    {
      path: '/grecord',
      name: 'GRecord',
      component: () => import('@/views/guahao/grecord.vue'),
    },


    // 检查报告 - 列表
     {
      path: '/checkResult',
      name: 'CheckResult',
      component: () => import('@/views/checkResult/resultList.vue'),
    },
    // 检查报告 - 详情
    {
      path: '/resultDetail/:itemNo/:inspectId',
      name: 'ResultDetail',
      component: () => import('@/views/checkResult/resultDetail.vue'),
    },

    // 收藏
    {
      path: '/catchList',
      name: 'CatchList',
      component: () => import('@/views/checkResult/catchList.vue'),
    },
  ]
})
