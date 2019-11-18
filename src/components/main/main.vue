<template>
  <div class="conbox">
    <img src="../../assets/index/banner.png" alt="" class="banner">
    <div class="menu boxshadow">
      <div class="item" @click="gopage('/mnewadd')">
        <img src="../../assets/index/addnew.png" alt="" class="icon">
        <div class="text">新人加盟</div>
      </div>
      <div class="item" @click="gopage('/mgdcode')">
        <img src="../../assets/index/sao.png" alt="" class="icon">
        <div class="text">商品扫码</div>
      </div>
      <div class="item" @click="gopage('/mchuhuo')">
        <img src="../../assets/index/chuhuo.png" alt="" class="icon">
        <div class="text">商品出货</div>
      </div>
      <div class="item" @click="gopage('/mmanager')">
        <img src="../../assets/index/shenhe.png" alt="" class="icon">
        <div class="text">审核管理</div>
      </div>
      <div class="item" @click="gopage('/mxiadan')">
        <img src="../../assets/index/xiadan.png" alt="" class="icon">
        <div class="text">我要下单</div>
      </div>
      <div class="item">
        <img src="../../assets/index/tongji.png" alt="" class="icon">
        <div class="text">数据统计</div>
      </div>
    </div>
    <div class="probox boxshadow">
      <div class="title leftborder">常用应用</div>
      <div class="imgbox">
        <img src="../../assets/index/rankbk.png" alt="" class="proimg">
        <img src="../../assets/index/lvmanage.png" alt="" class="proimg">
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { getURLParams } from '@/utils/auth'
import Cookies from 'js-cookie'
@Component
export default class HelloWorld extends Vue {
  private mounted(): void {
    document.title = '首页'
    if (Cookies.get('x_tk')) {
    } else if (getURLParams().x_tk) {
      Cookies.set('x_tk', getURLParams().x_tk, { expires: 3.33 })
    } else {
      window.location.href = 'http://beifan.400539.com/api/wechat/login/type/main'
      return
    }
  }
  private gopage(path: string) {
    this.$router.push(path)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "~@/styles/utils.scss";
.conbox{
  flex: 1;
  overflow: scroll;
}
.banner{
  height: 5.333333rem;
}
.menu{
  @include wh(303, 153);
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
</style>
