<template>
  <div class="home">
    <!-- <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/> -->
    <div class="link" @click="gopage('infoManage/2')">门诊充值</div>
    <div class="link" @click="gopage('self')">个人中心</div>
    <div class="link" @click="gopage('infoManage/1')">门诊待缴费</div>
    <div class="link" @click="gopage('infoManage/0')">就诊人管理</div>
    <div class="link" @click="gopage('infoManage/3')">门诊挂号</div>
    <div class="link" @click="gopage('infoManage/4')">检查报告</div>
    <div class="link" @click="gopage('infoManage/5')">二维码</div>
    <div class="link" @click="clear">清除缓存</div>
    <!-- <JSX :param="forparam" @emites='getEvent'></!-->
    <!-- <div class="sdf" @click="clicktest">{{ msg }}</div> -->
  </div>
</template>

<script lang="ts">
import { setAppName } from '@/store/methods'
import { getCate } from '@/api/mainpage'
import { setToken } from '@/utils/auth'
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import JSX from './jsx.vue'; // @ is an alias to /src
import { State,
  Getter,
  Action,
  Mutation,
  namespace } from 'vuex-class'
const appModule = namespace('app')
import { getURLParams } from '@/utils/auth'
import Cookies from 'js-cookie'
@Component({
  components: {
    HelloWorld,
    JSX
  },
})
export default class Home extends Vue {
  private msg: string = 'string test'
  private forparam: number = 1234556

  @State('app') private sname: any
  @Action('setName') private setNames: any
  @Mutation('TOGGLE_NAME') private TOGGLE_NAME: any
  @appModule.State('name') private aname: any
  @appModule.Mutation('TOGGLE_NAME') private TOGGLE_NAMESS: any
  @appModule.Action('setVal') private setVal: any
  private mounted(): void {
    // console.log(this.sname, this.aname);
    // this.TOGGLE_NAMESS('test1333')
    // this.setVal('3215233')
    setAppName('23')
    // getCate('').then((response: object) => {
    //   console.log(response)
    // })
    // if (Cookies.get('x_tk')) {
    // } else if (getURLParams().x_tk) {
    //   Cookies.set('x_tk', getURLParams().x_tk, { expires: 3.33 })
    // } else {
    //   window.location.href = 'http://gthis.qs110.com//api/wechat/login'
    // }
  }
  private clear(): void {
    Cookies.remove('x_tk')
  }
  private getEvent(pa: any): void {
  }
  private gopage(path: string) {
    this.$router.push(path)
  }
}
</script>
