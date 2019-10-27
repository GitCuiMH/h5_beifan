<template>
  <div class="content">
    <mains v-if="switchIndex === 0"/>
    <order v-if="switchIndex === 1" @search="search"></order>
    <self v-if="switchIndex === 2" :user="userInfo"/>
    <div class="switchbar">
      <div class="item" :class="{active: switchIndex === 0}" @click="switchtab(0)">
        <img class="switchImg" v-if="switchIndex === 0" src="../assets/index/main.png" alt="">
        <img class="switchImg" v-else src="../assets/index/maing.png" alt="">
        <div class="text">首页</div>
      </div>
      <div class="item" :class="{active: switchIndex === 1}" @click="switchtab(1)">
        <img class="switchImg" v-if="switchIndex === 1" src="../assets/index/order.png" alt="">
        <img class="switchImg" v-else src="../assets/index/orderg.png" alt="">
        <div class="text">代理订单</div>
      </div>
      <div class="item" :class="{active: switchIndex === 2}" @click="switchtab(2)">
        <img class="switchImg" v-if="switchIndex === 2" src="../assets/index/user.png" alt="">
        <img class="switchImg" v-else src="../assets/index/userg.png" alt="">
        <div class="text">个人中心</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import mains from '@/components/main/main.vue'
import order from '@/components/main/order.vue'
import self from '@/components/main/self.vue'
import { getURLParams } from '@/utils/auth'
import Cookies from 'js-cookie'
import { Mutation,
  namespace } from 'vuex-class'
const userModule = namespace('user')
@Component({
  components: {
    order,
    mains,
    self
  }
})
export default class Main extends Vue {
  @userModule.Mutation('SET_TYPE') private setType: any
  private userInfo: any = {
    avatar: '',
    lv: 3,
    name: '二兴',
    ischeck: 1,
    yue: 1235,
    id: 1
  }
  private searchkey: string = ''
  private switchIndex: number = 0
  private mounted(): void {
    document.title = '首页'
    // if (Cookies.get('x_tk')) {
    // } else if (getURLParams().x_tk) {
    //   Cookies.set('x_tk', getURLParams().x_tk, { expires: 3.33 })
    // } else {
    //   window.location.href = 'http://wlhis.qs110.com/api/wechat/login/type/1'
    //   return
    // }
  }
  private switchtab(type: number) {
    const title = ['首页', '代理订单', '个人中心']
    this.switchIndex = type
    document.title = title[type]
  }
  private search(e: string) {
    console.log(e)
  }
}
</script>
<style lang="scss" scoped>
@import "~@/styles/utils.scss";
.content{
  background: rgba(245, 245, 245, 1);
  height: 100%;
  display: flex;
  flex-direction: column;
  .switchImg{
    width: .8rem;
    margin: 0 1.253333rem;
    height: .8rem;
  }
  .switchbar{
    background: white;
    height: 1.32rem;
    display: flex;
    justify-content: space-around;
    .item{
      display: flex;
      flex-direction: column;
      align-self: center;
      width: 3.333333rem;
      img{
        width: .7rem;
        margin: 0 1.3333rem;
        height: .7rem;
      }
      .text{
        font-size: .266667rem;
        text-align: center;
        color: rgba(127, 131, 137, 1);
      }
    }
    .active{
      .text{
        color: $m;
      }
    }
    
  }
}
</style>