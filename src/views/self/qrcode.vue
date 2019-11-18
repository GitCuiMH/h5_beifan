<template>
  <div class="containers">
    <div class="cobox">
      <div class="header">
        <img src="../../assets/image/cash.png" alt="" class="icon"/>
        <div class="text">二维码收款</div>
      </div>
      <div class="dtl">
        <div class="tt">扫二维码向我付款</div>
        <img src="" alt="" class="qrcode">
        <div class="opts">
          <div class="text">设置金额</div>
          <div class="text">保存收款码</div>
        </div>
      </div>
      <div class="golist" @click="$router.push('/zdlist')">
        <img src="../../assets/image/money.png" alt="" class="icon">
        <div class="text">账单细节</div>
        <div class="rightIcon"></div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { getSelfInfo } from '@/api/hospital'
import { Component, Vue } from 'vue-property-decorator';
import { getURLParams } from '@/utils/auth'
import Cookies from 'js-cookie'
@Component({
})
export default class QrCode extends Vue {
  private pageData: any = {
  }
  private list: any[] = []
  private mounted(): void {
    document.title = '二维码收款'
  }
  private save() {
    this.$router.goBack()
  }
}
</script>
<style lang="scss" scoped>
@import "~@/styles/utils.scss";
.containers{
  height: 100%;
  background: $m;
  display: flex;
  .cobox{
    align-self: center;
    margin: 0 auto;
    @include wh(355, 451);
    border-radius: pm(15);
    background: white;
    .header{
      background: #FBFBFB;
      border-radius: pm(15);
      margin: pm(0) pm(23);
      height: pm(48);
      display: flex;
      color: $m;
      font-size: pm(17);
      >*{
        align-self: center;
      }
      .icon{
        @include wh(22, 23);
        margin-right: pm(9);
      }
    }
    .dtl{
      margin: 0 pm(24);
      border-bottom: 1px solid #DEDEDE;
      text-align: center;
      color: #2F2F2F;
      font-size: pm(15);
      .qrcode{
        @include wh(177, 177);
        margin: pm(14) pm(66) 0 pm(66);
        background-color: #2F2F2F;

      }
      .tt{
        margin-top: pm(53);

      }
      .opts{
        display: flex;
        padding: 0 pm(50);
        margin: pm(22) auto pm(27) auto;
        .text{
          flex: 1;
          text-align: center;
          color: #2F2F2F;
          +.text{
            border-left: 1px solid #DEDEDE;
          }
        }
      }
    }
    .golist{
      margin: 0 pm(24);
      display: flex;
      height: pm(64);
      >*{
        align-self: center;
      }
      .icon{
        @include wh(14, 14);
        margin-right: pm(7);
      }
      .text{
        color: #333333;
        font-size: pm(14);
        text-align: left;
        flex: 1;
      }
    }
  }
}
</style>

