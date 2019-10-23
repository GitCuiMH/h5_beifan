<template>
  <div class="content">
    <div class="conbox" v-if="switchIndex === 0">
      <img src="../assets/index/banner.png" alt="" class="banner">
      <div class="menu boxshadow">
        <div class="item">
          <img src="../assets/index/addnew.png" alt="" class="icon">
          <div class="text">新人加盟</div>
        </div>
        <div class="item">
          <img src="../assets/index/sao.png" alt="" class="icon">
          <div class="text">商品扫码</div>
        </div>
        <div class="item">
          <img src="../assets/index/chuhuo.png" alt="" class="icon">
          <div class="text">商品出货</div>
        </div>
        <div class="item">
          <img src="../assets/index/shenhe.png" alt="" class="icon">
          <div class="text">审核管理</div>
        </div>
        <div class="item">
          <img src="../assets/index/xiadan.png" alt="" class="icon">
          <div class="text">我要下单</div>
        </div>
        <div class="item">
          <img src="../assets/index/tongji.png" alt="" class="icon">
          <div class="text">数据统计</div>
        </div>
      </div>
      <div class="probox boxshadow">
        <div class="title">常用应用</div>
        <div class="imgbox">
          <img src="../assets/index/rankbk.png" alt="" class="proimg">
          <img src="../assets/index/lvmanage.png" alt="" class="proimg">
        </div>
      </div>
    </div>
    <div class="conbox" v-if="switchIndex === 1">
      <div class="search">
        <img src="../assets/index/searchIcon.png" alt="">
        <input class="reinput" type="text" v-model.trim="searchkey" @keyup.enter="search">
      </div>
    </div>
    <div class="conbox" v-if="switchIndex === 2"></div>
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
import { getURLParams } from '@/utils/auth'
import Cookies from 'js-cookie'
import { Mutation,
  namespace } from 'vuex-class'
const userModule = namespace('user')
@Component({
})
export default class Main extends Vue {
  @userModule.Mutation('SET_TYPE') private setType: any
  private iconList: any = []
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
  private search() {
    console.log(this.searchkey)
  }
}
</script>
<style lang="scss" scoped>
@function pm($pt) {
  @return $pt / 37.5 + rem
}
.content{
  background: rgba(245, 245, 245, 1);
  height: 100%;
  display: flex;
  flex-direction: column;
  .conbox{
    flex: 1;
    .banner{
      height: 5.333333rem;
    }
    .menu{
      width:pm(303);
      height: pm(153);
      background:rgba(255,255,255,1);
      
      padding: pm(12) pm(24);
      display: flex;
      flex-wrap: wrap;
      margin: pm(15) auto pm(11) auto;
      .item{
        margin: 0 pm(24);
        display: flex;
        flex-direction: column;
        .icon{
          width: 1.333333rem;
          height: 1.333333rem;
        }
        .text{
          color: rgba(67, 67, 67, 1);
          font-size: .266667rem;
          text-align: center;
        }
      }
    }
    .probox{
      padding: pm(14) pm(16);
      background:rgba(255,255,255,1);
      width: pm(324);
      margin: 0 auto;
      height: pm(112);
      .title{
        color: rgba(67, 67, 67, 1);
        font-size: .373333rem;
        border-left: pm(2) solid rgba(244, 176, 62, 1);
        padding-left: pm(5);
      }
      .imgbox{
        margin-top: .28rem;
        display: flex;
        justify-content: space-between;
        .proimg{
          width: 3.96rem;
          height: 2.346667rem;
        }
      }
    }
    .search{
      width: 9.333333rem;
      height: .853333rem;
      margin: .613333rem auto 0 auto;
      display: flex;
      border-radius: .426667rem;
      background: rgba(238, 238, 238, 1);
      > * {
        align-self: center;
      }
      img{
        margin: 0 pm(6.5) 0 .426667rem;
        width: .4rem;
        height: .426667rem;
      }
      input{
        flex: 1;
        color: black;
        font-size: pm(13);
      }
    }
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
        width: .8rem;
        margin: 0 1.253333rem;
        height: .8rem;
      }
      .text{
        font-size: .266667rem;
        text-align: center;
        color: rgba(127, 131, 137, 1);
      }
    }
    .active{
      img{
        width: .7rem;
        margin: 0 1.253333rem;
        height: .7rem;
      }
      .text{
        color: rgba(244, 176, 62, 1);
      }
    }
    
  }
}
</style>