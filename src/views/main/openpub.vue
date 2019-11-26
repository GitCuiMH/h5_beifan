<template>
  <div class="containers">
    <div class="contabox">
      <div class="conttt">
        <div class="qrcode">
          <img src="../../assets/image/qrcodepub.jpeg" alt="" class="codeimg">
        </div>
        <div class="desc">
          <div class="text">长按识别二维码，关注公众号</div>
        </div>
      </div>
    </div>
    <!-- <div class="opts">
      <div class="btn active">分享给好友</div>
      <div class="btn">复制链接</div>
    </div> -->
    <div class="addbtn">更多惊喜等你来拿</div>
  </div>
</template>
<script lang="ts">
import { getSelfInfo } from '@/api/hospital'
import { Component, Vue } from 'vue-property-decorator';
@Component({
})
export default class MopenPub extends Vue {
  private pageData: any = {}
  private mounted(): void {
    document.title = '查看公众号'
  }
  private setDefault(idx: number): void {
  }
  private del(idx: number): void {
  }
  private edit(idx: number): void {
  }
  private gopage(path: string) {
  }
}
</script>
<style lang="scss" scoped>
@import "~@/styles/utils.scss";
.containers{
  background: #F3F3F3;
  height: 100%;
  display: flex;
  flex-direction: column;
  .contabox{
    .conttt{
      margin: pm(56) pm(17); 
      .qrcode{
        @include wh(341, 293);
        display: flex;
        border-radius: pm(8) pm(8) 0 0;
        background: $m;
        justify-content: space-around;
        .codeimg{
          align-self: center;
          // border: 1px solid red;
          @include wh(171, 173);

        }
      }
      .desc{
        padding: pm(15) 0;
        background: white;
        border-radius: 0 0 pm(8) pm(8);
        text-align: center;
        line-height: pm(25);
        color: #A3A3A3;
        font-size: pm(14);
        box-shadow:0px 3px 7px 0px rgba(0, 0, 0, 0.11);
      }
    }
  }
  .opts{
    height: pm(60);
    display: flex;
    >*{
      align-self: center;
      flex: 1;
      color: $m;
      font-size: pm(18);
      height: 100%;
      line-height: pm(60);
      text-align: center;
    }
    .active{
      color: white;
      background: $m;
    }
  }
}
</style>

