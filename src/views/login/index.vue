<template>
  <div class="containers">
    <div class="logo">
      <img src="../../assets/image/logo.png" alt="" class="logo"/>
    </div>
    <div class="conbox">
      <div class="inputblock">
        <img src="../../assets/image/mobile.png" alt="" class="icon"/>
        <input type="text" placeholder="手机号" class="reinput"/>
      </div>
      <div v-if="forget" class="inputblock">
        <img src="../../assets/image/checkcode.png" alt="" class="icon2"/>
        <input type="text" placeholder="验证码" class="reinput"/>
      </div>
      <div v-if="!forget" class="inputblock">
        <img src="../../assets/image/lock.png" alt="" class="icon"/>
        <input type="text" placeholder="密码" class="reinput"/>
      </div>
      <div v-if="forget" class="opts">
        <div class="forpos"></div>
        <div class="getcode">获取验证码</div>
      </div>
      <!-- <div class="inputblock">
        <img src="../../assets/image/king.png" alt="" class="icon"/>
        <input type="text" placeholder="级别" class="reinput"/>
      </div> -->
      <div v-if="!forget" class="opts">
        <div class="ii">后台注册</div>
        <div class="ii" @click="forgetPw">忘记/修改密码</div>
      </div>
    </div>
    <div class="optbet">
      <div class="addbtn">登录</div>
      <!-- <div class="addbtn wechat">
        <div class="ttt">
          <img src="../../assets/sao/wechat.png" alt=""/>
          <span>微信登录</span>
        </div>
      </div> -->
    </div>
    <div class="header">
      <div class="item2" :class="{active:tabIdx === 0}" @click="toggleTab(0)">登录</div>
      <div class="item2" :class="{active:tabIdx === 1}" @click="$router.push('/forget')">推荐注册</div>
    </div>
  </div>
</template>
<script lang="ts">
import { getSelfInfo } from '@/api/hospital'
import { Component, Vue } from 'vue-property-decorator';
import { getURLParams } from '@/utils/auth'
import { lvList, sexs } from '@/utils/mainData'
import Cookies from 'js-cookie'
@Component({
})
export default class Login extends Vue {
  private forget: boolean = false
  private tabIdx: number = 0
  private pageData: any = {}
  private mounted(): void {
    document.title = '账号管理'
  }
  private forgetPw(): void {
    this.forget = true
    document.title = '忘记/修改密码'
  }
  private gopage(path: string) {
  }
  private toggleTab(num: number) {
    this.tabIdx = num
  }
}
</script>
<style lang="scss" scoped>
@import "~@/styles/utils.scss";
.header{
  position: fixed;
  z-index: 10;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  color: #434343;
  font-size: pm(13);
  border-radius: 0;
  background: white;
  height: pm(37);
  justify-content: space-around;
  // padding: 0 pm(40);
  .item2{
    align-self: center;
    text-align: center !important;
  }
  .active {
    position: relative;
    color: $m;
    // font-size: pm(16);
    &::after {
      position: absolute;
      left: 50%;
      bottom: -5px;
      content: "";
      width: pm(47);
      height: pm(2);
      margin-left: pm(-23);
      border-radius: 1px;
      background: $m;
    }
  }
}
.containers{
  height: 100%;
  display: flex;
  flex-direction: column;
  background: white;
  .logo{
    @include wh(87, 69);
    margin: pm(25) auto;
    >img{
      margin: 0;
    }
  }
  .optbet{
    margin-top: pm(41);
    .addbtn{
      width: pm(285) !important;
    }
    .wechat{
      margin-top: pm(17);
      background: #85C843;
      display: flex;
      justify-content: space-around;
      .ttt{
        display: flex;
        >*{
          align-self: center;
        }
        img{
          @include wh(19, 16);
          margin-right: pm(7);
        }
      }
    }
  }
  .conbox{
    .opts{
      display: flex;
      justify-content: space-between;
      color: $m;
      font-size: pm(14);
      margin: pm(5) pm(46);
      .getcode{
        @include wh(83, 20);
        border-radius: pm(10);
        background: #85C843;
        color: white;
        font-size: pm(12);
        line-height: pm(20);
        text-align: center;
      }
    }
    .inputblock{
      display: flex;
      padding: 0 pm(19);
      border-radius: pm(18);
      border: 1px solid rgba(0, 0, 0, .5);
      height: pm(36);
      margin: pm(15) pm(46) 0 pm(46);
      >*{
        align-self: center;
      }
      .icon{
        @include wh(13, 21);
        margin-right: pm(5);
      }
      .icon2{
        @include wh(15, 19);
        margin-right: pm(5);
      }
      input{
        flex: 1;
      }
    }
  }
}
</style>

