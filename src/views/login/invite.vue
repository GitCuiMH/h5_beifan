<template>
  <div class="containers">
    <div class="title">发展链接生成成功</div>
    <div class="mian">
      <div class="tt">
        <div class="content">
          <span>剩余有效期: </span>
          <van-count-down
            :time="time"
            format="HH : mm : ss"
          />
        </div> 
        
      </div>
      <div class="qrcode">
        <img src="" alt=""/>
      </div>
      <div class="desc">
        <div class="item">1.长按二维码发送给朋友</div>
        <div class="item">2.还可以直接关注官方的公众号</div>
      </div>
    </div>
    <div class="addbtn larget">将二维码分享到朋友圈</div>
  </div>
</template>
<script lang="ts">
import { getSelfInfo } from '@/api/hospital'
import { Component, Vue } from 'vue-property-decorator';
import { getURLParams } from '@/utils/auth'
import Cookies from 'js-cookie'
export default class Proxy extends Vue {
  private time: any = 23423423
  private mounted(): void {
    document.title = '推荐注册'
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
.van-count-down{
  color: red;
  font-size: pm(16);
}
.containers{
  height: 100%;
  .title{
    padding-top: pm(40);
    font-size: pm(17);
    color: $m;
    text-align: center;
    line-height: pm(40);
  }
  .mian{
    @include wh(323, 443);
    @include bk('../../assets/image/sharebk.png');
    margin: pm(10) auto;
    text-align: center;
    .tt{
      font-size: pm(16);
      padding-top: pm(40);
      display: flex;
      justify-content: space-around;
      .content{
        background: white;
        display: flex;
        >*{
          align-self: center;
        }
      }
    }
    .qrcode{
      @include wh(215, 215);
      margin: pm(20) auto;
      img{
        @include wh(215, 215);
        border: 1px solid red;
      }
    }
    .desc{
      margin: pm(40) pm(29);
      text-align: center;
      padding-top: pm(20);
      border-top: 1px solid #D9DCE9;
      color: #7C838D;
      font-size: pm(15);
      line-height: pm(30);
    }
  }
}
.larget{
  width: pm(345);
  margin-top: pm(27);
}
</style>

