<template>
  <div class="containers">
    <div class="icons">
      <div class="pics">
        <img src="../../assets/image/yuepic.png" alt="" class="icon">
        <img src="../../assets/image/jtpic.png" alt="" class="icon2">
        <div class="item" @click="seedetail">
          <img src="../../assets/image/skpic.png" alt="" class="icon3">
          <van-uploader v-if="!userInfo.qrcode" class="upload" :after-read="afterRead" />
        </div>
        <!-- <img src="../../assets/image/skpic.png" alt="" class="icon3" @click="seedetail"> -->
      </div>
      <div class="desc">
        <div class="text">余额</div>
        <div :class="{text2: !userInfo.qrcode}" @click="seedetail">{{userInfo.qrcode ? '查看二维码' : '上传二维码'}}</div>
      </div>
    </div>
    <div class="ltdesc">
      <div class="forpos"></div>
      <div class="text">注：二维码不可进行随意更换</div>
    </div>
    <div class="txcon">
      <div class="ttt">
        <div class="text">提现金额</div>
        <div class="text2" @click="gold = userInfo.money">全部提现</div>
      </div>
      <div class="inputbox">
        <span>￥</span>
        <input type="tel" v-model.trim="gold" placeholder="请输入提现金额" class="reinput">
      </div>
    </div>
    <div class="descs">
      可提现金额<span>{{userInfo.money}}</span>元
    </div>
    <div class="addbtn" @click="sub">立即提现</div>
  </div>
</template>
<script lang="ts">
import { withdraw, editUserInfo, getUserInfo } from '@/api/mainpage'
import { Component, Vue } from 'vue-property-decorator';
declare var WeixinJSBridge: any;
import { Mutation,
  namespace } from 'vuex-class'
const userModule = namespace('user')
@Component({
})
export default class StiXian extends Vue {
  @userModule.State('userInfo') private userInfo: any;
  @userModule.Mutation('SET_userInfo') private setInfo: any
  private gold: string = ''
  private mounted(): void {
    document.title = '提现'
  }
  private seedetail() {
    if (this.userInfo.qrcode) {
      this.$router.push('/ssqrcode')
    }
  }
  private afterRead(file: any) {
    this.userInfo.qrcode = file.content
    editUserInfo({qrcode: file.content}).then((res2: any) => {
      getUserInfo({}).then((res: any) => {
        this.setInfo(res.datas)
      })
    })
  }
  private sub() {
    if (parseFloat(this.gold) > this.userInfo.money) {
      this.$toast('超出可提现额度')
      return
    }
    withdraw({money: this.gold}).then((res: any) => {
      this.$toast(res.message)
      setTimeout(() => {
        this.$router.goBack()
      }, 1000);
    })
  }
}
</script>
<style lang="scss" scoped>
@import "~@/styles/utils.scss";
.addbtn{
  margin-top: pm(200);
  width: pm(342);
}
.descs{
  margin: pm(13) pm(10);
  color: #8A8A8A;
  span{
    color: #393939;
  }
}
.txcon{
  background: white;
  padding: pm(10);
  .ttt{
    color: #393939;
    font-size: pm(14);
    display: flex;
    justify-content: space-between;
    .text2{
      color: #FFAE00;
    }
  }
  .inputbox{
    display: flex;
    color: #3C3C3C;
    font-size: pm(35);
    .reinput{
      flex: 1;
      font-size: pm(23);
      margin-left: pm(5);
    }
  }
}
.icons{
  margin: pm(10);
  background: #31292F;
  border-radius: pm(3);
  padding: pm(11) pm(42) 0 pm(42);
  .pics{
    display: flex;
    justify-content: space-between;
    .icon{
      @include wh(46, 45);
    }
    .icon2{
      @include wh(106, 22);
      margin-top: pm(15);
    }
    .icon3{
      @include wh(46, 44);
    }
    .item{
      position: relative;
      @include wh(46, 44);
    }
  }
  .desc{
    font-size: pm(13);
    margin: pm(-5) pm(-8) 0 pm(9);
    padding-bottom: pm(7);
    display: flex;
    justify-content: space-between;
    color: #FFAE00;
    .text2{
      color: #FF5644;
    }
  }
}
.ltdesc{
  display: flex;
  margin: pm(10);
  font-size: pm(10);
  color: #8A8A8A;
}
.containers{
  height: 100%;
  background: #F3F3F3;
  color: #434343;
  overflow: scroll;
  font-size: pm(14);
}
</style>

