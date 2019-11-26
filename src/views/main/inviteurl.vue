<template>
  <div class="containers">
    <div class="contabox">
      <div class="conttt">
        <div class="qrcode">
          <img :src="qrcodeImg" class="codeimg" alt="">
          <div class="qrcodeimg" v-show="false">
            <qrcode-vue :value="qrcodeUrl" size='200' level="H"></qrcode-vue>
          </div>
        </div>
        <div class="desc">
          <div class="text">点击二维码可保存相册</div>
          <div class="text">提示：“复制链接”仅限于发送给好友</div>
        </div>
      </div>
    </div>
    <div class="opts">
      <div class="btn active" @click="share">分享给好友</div>
      <div class="btn copy" :data-clipboard-text="qrcodeUrl" @click="copy">复制链接</div>
    <!-- <div class="edit copy" data-clipboard-text="'it.car_num'" @click="copy">复制</div> -->
    </div>
    <div v-if="layer > 0" class="layer" @click="layerclose">
      <div class="layercontent"></div>
    </div>
  </div>
</template>
<script lang="ts">
import { jssdk, invite, getUserInfo } from '@/api/mainpage'
import { Component, Vue } from 'vue-property-decorator';
import { copy } from '@/utils/auth'
import { lvList } from '@/utils/mainData'
import QrcodeVue from 'qrcode.vue'
declare var wx: any
@Component({
  components: {
    QrcodeVue
  }
})
export default class Proxy extends Vue {
  private pageData: any = {}
  private layer: number = 0;
  private qrcodeImg: string = ''
  private getqcode: boolean = false
  private qrcodeUrl: string = ''
  private mounted(): void {
    document.title = '生成邀请链接'
    getUserInfo({}).then((uf: any) => {
      // console.log(uf.datas.nickname + '邀请你成为牛皮世家代理');
      // console.log('申请的代理级别是：' + lvList[parseInt(this.$route.params.lv, 10)].lvname);
      invite({level: this.$route.params.lv}).then((resss: any) => {
        this.qrcodeUrl = resss.datas.url
        this.getqcode = true
        jssdk({url: window.location.href}).then((res: any) => {
          // console.log(id);
          wx.config({
            debug: false,
            appId: res.datas.appId,
            timestamp: res.datas.timestamp,
            nonceStr: res.datas.nonceStr,
            signature: res.datas.signature,
            jsApiList: ['updateAppMessageShareData', 'scanQRCode', 'updateTimelineShareData', 'onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareQZone']
          })
          wx.ready(() => {
            const share = {
              title: uf.datas.nickname + '邀请你成为牛皮世家代理',
              desc: '申请的代理级别是：' + lvList[parseInt(this.$route.params.lv, 10) - 1].lvname,
              link: resss.datas.url,
              imgUrl: 'http://beifan.400539.com/logo.jpg',
            };
            console.log(share);
            wx.updateAppMessageShareData(share);
            wx.updateTimelineShareData(share);
            wx.onMenuShareTimeline(share);
            wx.onMenuShareAppMessage(share);
            wx.onMenuShareQQ(share);
            wx.onMenuShareQZone(share);
          })
        })
      })
    })
  }
  private updated() {
    if (this.getqcode) {
      const canvas = document.getElementsByTagName('canvas')[0]
      this.qrcodeImg = canvas.toDataURL('image/png')
      this.getqcode = false
    }
  }
  private share() {
    this.layer = 1
  }
  private copy() {
    copy()
    this.$toast('已复制')
  }
  private layerclose() {
    this.layer = 0;
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
    flex: 1;
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

