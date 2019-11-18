<template>
  <div class="containers">
    <div class="selfinfos">
      <div class="cjinfos">
        <div class="name">王小二     23423423423</div>
        <div class="cjaddr">王小二厂家地址</div>
      </div>
      <div class="rightIcon"></div>
    </div>
    <div class="linebk"></div>
    <div class="probox ">
      <div class="ttitl">订单商品</div>
      <div class="te">下单前请确认个人信息</div>
      <div class="gdinfos">
        <img src="" alt="">
        <div class="gdinfs">
          <div class="gdname">下单前请确认个人信息</div>
          <div class="opts">
            <div class="pirce">$34234</div>
            <van-stepper v-model="infos.num" min="5" max="8" />
          </div>
        </div>
      </div>
    </div>
    <div class="probox ">
      <div class="ttitl">支付方式</div>
      <div class="paykind" @click="infos.wecheck = 1">
        <img src="../../assets/image/wechat.png" alt="" class="payicon">
        <div class="text">微信支付</div>
        <div class="forpos"></div>
        <img v-if="infos.wecheck" src="../../assets/image/check.png" alt="" class="checkicon">
        <img v-else src="" alt="" class="uncheckicon checkicon">
      </div>
      <div class="paykind" @click="infos.wecheck = 0">
        <img src="../../assets/image/zhanghu.png" alt="" class="payicon">
        <div class="text">账户余额</div>
        <div class="forpos"></div>
        <img v-if="!infos.wecheck" src="../../assets/image/check.png" alt="" class="checkicon">
        <img v-else src="" alt="" class="uncheckicon checkicon">
      </div>
    </div>
    <div class="optbtnsss">
      <div class="forpos"></div>
      <div class="desc">应付:<span>$2323</span></div>
      <div class="btns">提交订单</div>
    </div>
  </div>
</template>
<script lang="ts">
import { getSelfInfo } from '@/api/hospital'
import { Component, Vue } from 'vue-property-decorator';
import Cookies from 'js-cookie'
@Component({
})
export default class ShouHou extends Vue {
  private infos: any = {
    num: 5,
    wecheck: 1
  }
  private list: any[] = []
  private mounted(): void {
    document.title = '确认订单'
  }
  private save() {
    this.$router.goBack()
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
    border: 1px solid red;
    margin-right: pm(13);
  }
  .gdinfs{
    flex: 1;
    display: flex;
    flex-direction: column;
    .gdname{
      flex: 1;
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

