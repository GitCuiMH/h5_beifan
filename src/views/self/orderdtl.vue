<template>
  <div class="containers">
    <div class="banner">
      <img v-if="gdInfo.status === 0" src="../../assets/image/pay.png" alt="">
      <span v-if="gdInfo.status === 0">待支付</span>
      <img v-if="gdInfo.status !== 0" src="../../assets/image/get.png" alt="">
      <span v-if="gdInfo.status === 20">等待确认收货</span>
      <span v-if="gdInfo.status === 30">已确认收货</span>
      <span v-if="gdInfo.status === 100">订单已完成</span>
    </div>
    <div class="selfinfos">
      <div class="cjinfos">
        <div class="name">{{gdInfo.user_name}}
          <span style="margin-left: 30px">{{gdInfo.user_mobile}}</span>
        </div>
        <div class="cjaddr">{{gdInfo.province_name + ' ' + gdInfo.city_name + ' ' + gdInfo.district_name + ' ' + gdInfo.address}}</div>
      </div>
      <!-- <div class="rightIcon"></div> -->
    </div>
    <div class="linebk"></div>
    <div class="probox ">
      <div class="ttitl">订单商品</div>
      <div class="te">下单前请确认个人信息</div>
      <div class="gdinfos">
        <img :src="'http://beifan.400539.com' + gdInfo.product_img" alt="">
        <div class="gdinfs">
          <div class="gdname">{{gdInfo.product_name}}</div>
          <div class="gdname1">{{gdInfo.product_tc}}</div>
          <div class="opts">
            <div class="pirce">￥{{gdInfo.product_price}}</div>
            <van-stepper disabled v-model="gdInfo.product_num" min="1" @change="stpChange" />
          </div>
        </div>
      </div>
    </div>
    <div v-if="gdInfo.status === 0" class="probox ">
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
    <div v-if="gdInfo.status !== 100" class="optbtnsss">
      <div v-if="gdInfo.status !== 0" class="forpos"></div>
      <div v-if="gdInfo.status === 0" class="desc">应付:<span>￥{{gdInfo.order_amount}}</span></div>
      <div v-if="gdInfo.status === 0" class="btns del" @click="setStatus(gdInfo.id, 1)">取消订单</div>
      <div v-if="gdInfo.status === 0" class="btns" @click="sub">立即支付</div>
      <div v-if="gdInfo.status === 20" class="btns" @click="sub">确认收货</div>
      <div v-if="gdInfo.status === 30" class="btns del" @click="$router.push('/shouhou/' + gdInfo.id)">换货/售后</div>
    </div>
  </div>
</template>
<script lang="ts">
import { getOrderInfo, orderpay, setStatus } from '@/api/mainpage'
import { Component, Vue } from 'vue-property-decorator';
declare var WeixinJSBridge: any;
import { Mutation,
  namespace } from 'vuex-class'
const userModule = namespace('user')
@Component({
})
export default class OrderInfo extends Vue {
  @userModule.State('skuInfos') private skuInfos: any;
  private gdInfo: any = {
    user_name: '',
    user_mobile: '',
    product_tc: '',
  }
  private list: any[] = []
  private infos: any = {
    wecheck: 1
  }
  private mounted(): void {
    document.title = '确认订单'
    getOrderInfo({id: this.$route.params.id}).then((res: any) => {
      this.gdInfo = res.datas
    })
  }
  private setKind(mark: number) {
    if (mark) {
      if (parseFloat(this.gdInfo.money) <= 0) {
        this.$toast('余额不足')
      } else {
        this.infos.wecheck = 1
      }
    }
  }
  private sub() {
    const p = {
      id: this.$route.params.id,
      type: this.infos.wecheck,
    }
    const self = this
    orderpay(p).then((res: any) => {
      // this.$toast(res.message)
      WeixinJSBridge.invoke(
        'getBrandWCPayRequest',
        res.datas,
        (res2: any) => {
          let result = res2.err_msg.split(':');
          result = result[result.length - 1];
          if ( result === 'ok' ) {
            self.$router.goBack()
          } else {
            alert('支付失败');
            // _self.close()
          }
        })
    })
  }
  private setStatus(id: number, kind: number) {
    const str = ['取消订单？', '删除订单？', '收货？']
    const st = [40, 50, 30]
    this.$selfConfirm('确认' + str[kind - 1], '确定', '删除', (res2: any) => {
      setStatus({id, status: st[kind - 1]}).then((res: any) => {
        this.$toast(res.message)
        setTimeout(() => {
          this.$router.goBack()
        }, 1000);
      })
    })
  }
  private stpChange(e: any) {
  }
}
</script>
<style lang="scss" scoped>
@import "~@/styles/utils.scss";
.banner{
  height: pm(72);
  display: flex;
  padding: 0 pm(21);
  color: white;
  background: $m;
  font-size: pm(14);
  >*{
    align-self: center;
  }
  img{
    @include wh(43, 41);
    margin-right: pm(7);
  }
}
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
    flex: 1;
    text-align: center;
    font-size: pm(13);
    color: #060606;
    span{
      font-size: pm(15);
      color: #FF4444;
    }
  }
  .btns{
    @include wh(119, 47);
    // margin-left: pm(17);
    background: #FF3657;
    line-height: pm(47);
    text-align: center;
    color: white;
    font-size: pm(16);
  }
  .del{
    background: #A0A0A0;
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

