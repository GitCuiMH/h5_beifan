<template>
  <div class="containers">
    <div class="selfinfos" @click="$router.push('/address')">
      <div class="cjinfos">
        <div class="name">{{addrInfo.user_name}}
          <span style="margin-left: 30px">{{addrInfo.user_mobile}}</span>
        </div>
        <div class="cjaddr">{{addrInfo.province_name + ' ' + addrInfo.city_name + ' ' + addrInfo.district_name + ' ' + addrInfo.address}}</div>
      </div>
      <div class="rightIcon"></div>
    </div>
    <div class="linebk"></div>
    <div class="probox ">
      <div class="ttitl">订单商品</div>
      <div class="te">下单前请确认个人信息</div>
      <div class="gdinfos">
        <img :src="'http://beifan.400539.com' + skuInfos.pic" alt="">
        <div class="gdinfs">
          <div class="gdname">{{gdInfo.title}}</div>
          <div class="gdname1">{{skuInfos.name}}</div>
          <div class="opts">
            <div class="pirce">￥{{gdInfo.price}}</div>
            <van-stepper v-model="infos.num" min="1" @change="stpChange" />
          </div>
        </div>
      </div>
    </div>
    <div class="probox ">
      <div class="ttitl">支付方式</div>
      <div class="paykind" @click="infos.wecheck = 0">
        <img src="../../assets/image/wechat.png" alt="" class="payicon">
        <div class="text">微信支付</div>
        <div class="forpos"></div>
        <img v-if="!infos.wecheck" src="../../assets/image/check.png" alt="" class="checkicon">
        <img v-else src="" alt="" class="uncheckicon checkicon">
      </div>
      <div class="paykind" @click="setKind(1)">
        <img src="../../assets/image/zhanghu.png" alt="" class="payicon">
        <div class="text">账户余额</div>
        <div class="forpos"></div>
        <img v-if="infos.wecheck" src="../../assets/image/check.png" alt="" class="checkicon">
        <img v-else src="" alt="" class="uncheckicon checkicon">
      </div>
    </div>
    <div class="optbtnsss">
      <div class="forpos"></div>
      <div class="desc">应付:<span>￥{{gdInfo.price * infos.num}}</span></div>
      <div class="btns" @click="subordess">提交订单</div>
    </div>
  </div>
</template>
<script lang="ts">
import { subOrder, sub1Order } from '@/api/mainpage'
import { Component, Vue } from 'vue-property-decorator';
declare var WeixinJSBridge: any;
import { Mutation,
  namespace } from 'vuex-class'
const userModule = namespace('user')
@Component({
})
export default class ShouHou extends Vue {
  @userModule.State('skuInfos') private skuInfos: any;
  @userModule.State('addrInfo') private addrInfo: any
  @userModule.Mutation('SET_ADDRINFO') private setInfo: any
  private gdInfo: any = {}
  private selfGold: string = ''
  private infos: any = {
    num: 1,
    wecheck: 1
  }
  private list: any[] = []
  private mounted(): void {
    document.title = '确认订单'
    sub1Order({id: this.$route.params.id, tc: this.skuInfos.name}).then((res: any) => {
      this.gdInfo = res.datas.product
      this.selfGold = res.datas.money
      if (!this.addrInfo.id) {
        this.setInfo(res.datas.address)
      }
    })
  }
  private setKind(mark: number) {
    if (mark) {
      if (parseFloat(this.selfGold) <= 0) {
        this.$toast('余额不足')
      } else {
        this.infos.wecheck = 1
      }
    }
  }
  private subordess() {
    if (this.infos.wecheck) {
      this.$selfProm('', '确定', '取消', (ress: any) => {
        console.log(ress);
        this.sub(ress)
      })
    } else {
      this.sub()
    }
  }
  private sub(ps = '') {
    const p = {
      id: this.$route.params.id,
      tc: this.skuInfos.name,
      num: this.infos.num,
      type: this.infos.wecheck,
      address_id: this.addrInfo.id,
      paypwd: ps
    }
    const self = this
    subOrder(p).then((res: any) => {
      // this.$toast(res.message)
      WeixinJSBridge.invoke(
        'getBrandWCPayRequest',
        res.datas,
        (res2: any) => {
          let result = res2.err_msg.split(':');
          result = result[result.length - 1];
          if ( result === 'ok' ) {
            self.$router.push('/myorder/0')
          } else {
            alert('支付失败');
            // _self.close()
          }
        })
    })
  }
  private stpChange(e: any) {
  }
}
</script>
<style lang="scss" scoped>
@import "~@/styles/utils.scss";
.optbtnsss{
  position: fixed;
  background: white;
  z-index: 20;
  bottom: 0;
  width: 100%;
  height: pm(48);
  display: flex;
  >*{
    align-self: center;
  }
  .desc{
    font-size: pm(13);
    color: #060606;
    span{
      font-size: pm(15);
      color: #FF4444;
    }
  }
  .btns{
    @include wh(119, 47);
    margin-left: pm(17);
    background: #FF3657;
    line-height: pm(47);
    text-align: center;
    color: white;
    font-size: pm(16);
  }
}
.selfinfos{
  display: flex;
  background: white;
  padding: pm(16) pm(12) pm(16) pm(14);
}
.cjinfos{
  flex: 1;
  .cjaddr{
    font-size: pm(12);
    color: #7A7A7A;
  }
}
.containers{
  height: 100%;
  background: #F3F3F3;
  color: #434343;
  overflow: scroll;
  font-size: pm(14);
}

.probox{
  padding: pm(15) pm(12);
  background:rgba(255,255,255,1);
  margin: pm(10) auto;
  .ttitl{
    color: #1A1A1A;
    font-size: pm(15);
  }
  .te{
    color: #C6C6C6;
    font-size: pm(12);
  }
  .paykind{
    display: flex;
    margin-top: pm(25);

    >*{
      align-self: center;
    }
    .payicon{
      @include wh(20, 17);
      margin-right: pm(9);
    }
    .checkicon{
      @include wh(20, 20);
      border-radius: 50%;
      margin-right: pm(11);
      border: 1px solid white;
    }
    .uncheckicon{
      @include wh(18, 18);
      border: pm(1) solid #898989;
    }
  }
}
.gdinfos{
  margin: pm(13) auto 0;
  display: flex;
  img{
    @include wh(78, 78);
    // border: 1px solid red;
    margin-right: pm(13);
  }
  .gdinfs{
    flex: 1;
    display: flex;
    flex-direction: column;
    .gdname{
      flex: 1;
    }
    .gdname1{
      font-size: pm(13);
      color: #7A7A7A;
    }
    .opts{
      display: flex;
      justify-content: space-between;
      .pirce{
        color: #FF3657;
      }
    }
  }
}
</style>

