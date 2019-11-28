<template>
  <div class="containers">
    <!-- <div class="linebk"></div> -->
    <div class="probox ">
      <div class="ttitl">充值金额</div>
      <div class="item">
        <div class="kkk" :class="{active: selIdx === 0}" @click="selIdx = 0">充{{selNum[0]}}元</div>
        <div class="kkk" :class="{active: selIdx === 1}" @click="selIdx = 1">充{{selNum[1]}}元</div>
      </div>
      <div class="item">
        <div class="kkk" :class="{active: selIdx === 2}" @click="selIdx = 2">充{{selNum[2]}}元</div>
        <div class="kkk" :class="{active: selIdx === 3}" @click="selIdx = 3">充{{selNum[3]}}</div>
      </div>
    </div>
    <div class="probox ">
      <div class="ttitl">支付方式</div>
      <div class="paykind">
        <img src="../../assets/image/wechat.png" alt="" class="payicon">
        <div class="text">微信支付</div>
        <div class="forpos"></div>
        <img src="../../assets/image/check.png" alt="" class="checkicon">
      </div>
    </div>
    <div class="addbtn" @click="sub">立即充值</div>
  </div>
</template>
<script lang="ts">
import { recharge } from '@/api/mainpage'
import { Component, Vue } from 'vue-property-decorator';
declare var WeixinJSBridge: any;
@Component({
})
export default class ChongZhi extends Vue {
  private gdInfo: any = {}
  private selfGold: string = ''
  private selIdx: number = 0
  private selNum: number[] = [50, 100, 500, 1000]
  private mounted(): void {
    document.title = '充值'
  }
  private sub() {
    const self = this
    recharge({money: this.selNum[this.selIdx]}).then((res: any) => {
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
}
</script>
<style lang="scss" scoped>
@import "~@/styles/utils.scss";
.containers{
  height: 100%;
  background: #F3F3F3;
  color: #434343;
  overflow: scroll;
  font-size: pm(14);
}
.addbtn{
  margin-top: pm(200);
  width: pm(342);
}
.probox{
  padding: pm(15) pm(12);
  background:rgba(255,255,255,1);
  margin: pm(10) auto;
  .item{
    display: flex;
    justify-content: space-between;
    margin-top: pm(18);
    .kkk{
      @include wh(167, 70);
      border: 1px solid $m;
      color: #2F2F2F;
      font-size: pm(18);
      text-align: center;
      background: white;
      line-height: pm(70);
      border-radius: pm(10);
    }
    .active{
      color: white;
      background: $m;
    }
  }
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

