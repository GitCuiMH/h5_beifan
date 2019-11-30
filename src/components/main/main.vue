<template>
  <div class="conbox">
    <img src="../../assets/index/banner.png" alt="" class="banner">
    <div class="menu boxshadow">
      <div class="menubox">
        <div class="item" @click="gopage('/mnewadd')">
          <img src="../../assets/index/addnew.png" alt="" class="icon">
          <div class="text">新人加盟</div>
        </div>
        <div class="item" @click="sao">
          <img src="../../assets/index/sao.png" alt="" class="icon">
          <div class="text">商品扫码</div>
        </div>
        <div class="item" @click="gopage('/mchuhuo/0/0')">
          <img src="../../assets/index/chuhuo.png" alt="" class="icon">
          <div class="text">商品出货</div>
        </div>
      </div>
      <div class="menubox">
        <div class="item" @click="gopage('/mmanager')">
          <img src="../../assets/index/shenhe.png" alt="" class="icon">
          <div class="text">审核管理</div>
        </div>
        <div class="item" @click="gopage('/mxiadan')">
          <img src="../../assets/index/xiadan.png" alt="" class="icon">
          <div class="text">我要下单</div>
        </div>
        <div class="item" @click="gopage('aa')">
          <img src="../../assets/index/tongji.png" alt="" class="icon">
          <div class="text">数据统计</div>
        </div>
      </div>
    </div>
    <div class="probox boxshadow">
      <div class="title leftborder">常用应用</div>
      <div class="imgbox">
        <img src="../../assets/index/rankbk.png" alt="" class="proimg" @click="gopage('aa')">
        <img src="../../assets/index/lvmanage.png" alt="" class="proimg" @click="gopage('/lvmanage')">
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { getURLParams } from '@/utils/auth'
import { jssdk } from '@/api/mainpage'
import Cookies from 'js-cookie'
declare var wx: any
@Component
export default class HelloWorld extends Vue {
  private mounted(): void {
    document.title = '首页'
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
          title: '新年抢购：临沂美年大健康20元抵100元体检优惠券',
          desc: '赠送价值50元保温杯！！！速来抢购，先到先得！',
          link: 'http://webapp.qs110.com/meinian/index.html?s=s&id=1',
          imgUrl: 'http://webapp.qs110.com/meinian/share.jpg',
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
  }
  private gopage(path: string) {
    if (path === 'aa') {
      this.$toast('敬请期待')
      return
    }
    this.$router.push(path)
  }
  private sao() {
    const t = this
    wx.scanQRCode({
      desc: 'scanQRCode desc',
      needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
      scanType: ['qrCode', 'barCode'], // 可以指定扫二维码还是一维码，默认二者都有
      success: (res: any) => {
        // https://www.baidu.com/sd?sn=1231231
        let dd = ''
        if (res.resultStr.indexOf(',') > 0) {
          dd = res.resultStr.split(',')[1]
        } else {
          dd = res.resultStr.substring( res.resultStr.lastIndexOf('=') + 1)
        }
        // alert(dd)
        t.$router.push('/mgdcode?sn=' + dd)
      },
      error: (res: any) => {
        if (res.errMsg.indexOf('function_not_exist') > 0) {
          alert('版本过低请升级')
        }
      }
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "~@/styles/utils.scss";
.conbox{
  flex: 1;
  overflow: scroll;
}
.banner{
  height: 5.333333rem;
}
.menu{
  // @include wh(303, 153);
  height: pm(153);
  margin: pm(15) pm(10) pm(11) pm(10);
  background:rgba(255,255,255,1);
  padding: pm(12) pm(24);
  // display: flex;
  // flex-wrap: wrap;
  .menubox{
    margin-top: pm(4);
    display: flex;
    justify-content: space-around;
  }
  .item{
    margin: 0 pm(22);
    display: flex;
    flex-direction: column;
    .icon{
      width: 1.333333rem;
      height: 1.333333rem;
    }
    .text{
      color: rgba(67, 67, 67, 1);
      font-size: .266667rem;
      text-align: center;
    }
  }
}
.probox{
  padding: pm(14) pm(16);
  background:rgba(255,255,255,1);
  width: pm(324);
  margin: 0 auto;
  height: pm(112);
  .title{
    color: rgba(67, 67, 67, 1);
    font-size: .373333rem;
    padding-left: pm(5);
  }
  .imgbox{
    margin-top: .28rem;
    display: flex;
    justify-content: space-between;
    .proimg{
      width: 3.96rem;
      height: 2.346667rem;
    }
  }
}
</style>
