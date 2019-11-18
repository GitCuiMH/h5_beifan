<template>
  <div class="containers">
    <div class="header">
      <div class="item2" :class="{active:tabIdx === 0}" @click="toggleTab(0)">工厂出货</div>
      <div class="item2" :class="{active:tabIdx === 1}" @click="toggleTab(1)">零售出货</div>
    </div>
    <div v-if="!tabIdx" class="condt">
      <div class="probox boxshadow">
        <div class="title leftborder">换货信息</div>
        <div class="inputblock">
          <span>*</span>
          物流编码：
          <input type="text" class="reinput">
        </div>
        <div class="inputblock">
          备注：
          <input type="text" class="reinput">
        </div>
      </div>
      <div class="probox boxshadow">
        <div class="title leftborder">收货代理</div>
        <div class="inputblock">
          <span>*</span>
          代理品牌:
          <input type="text" class="reinput">
        </div>
        <div class="inputblock">
          <span>*</span>
          代理人信息:
          <input type="text" placeholder="授权号、手机号、微信号皆可" class="reinput">
        </div>
      </div>
      <div class="probox boxshadow">
        <div class="ttheadasd">
          <div class="ttile">
            <div class="btn" :class="{active: smIndex === 0}" @click="smIndex = 0">单码扫描</div>
            <div class="btn" :class="{active: smIndex === 1}" @click="smIndex = 1">流水号区间</div>
          </div>
        </div>
        <div v-if="smIndex" class="liushui">
          <span>*</span>
          <div class="text">流水号:</div>
          <input type="text" class="reinput linput">
          -
          <input type="text" class="reinpu linput">
          <div class="chuhuobtn">出货</div>
        </div>
        <div v-if="!smIndex" class="inputblock">
          <span>*</span>
          货品单号:
          <input type="text" class="reinput">
        </div>
        <div v-if="!smIndex" class="bt" @click="sao">单个扫描</div>
        <div class="ddss">注：带有<span style="color: #FF0000">*</span>为必填项，务必要如是填写
        </div>
      </div>
    </div>
    <div v-if="tabIdx" class="condt">
      <div class="probox boxshadow">
        <div class="title leftborder">扫描商品码</div>
        <div class="saomablock">
          <div class="inputblock saoma">
          </div>
          <img src="../../assets/image/sao.png" alt="" class="saoicon">
        </div>
      </div>
      <div class="probox boxshadow">
        <div class="title leftborder">添加照片</div>
        <div class="piclist">
          <div class="item">
            <img src="../../assets/image/addpic.png" alt="" class="addi">
            <div class="text">商品+车牌号</div>
          </div>
          <div class="item">
            <img src="../../assets/image/addpic.png" alt="" class="addi">
            <div class="text">安装完成照片</div>
          </div>
          <div class="item">
            <img src="../../assets/image/addpic.png" alt="" class="addi">
            <div class="text">交易凭证图</div>
          </div>
        </div>
      </div>
      <div class="probox boxshadow">
        <div class="title leftborder">客户信息</div>
        <div class="inputblock">
          <span>*</span>
          客户名称：
          <input type="text" class="reinput">
        </div>
        <div class="feilist">
          <span>*</span>
          <div class="te">缴费情况:</div>
          <div class="flst">
            <div class="item">现金</div>
            <div class="item">微信</div>
            <div class="item">支付宝</div>
            <div class="item">其他</div>
          </div>
        </div>
        <div class="inputblock">
          <span>*</span>
          备注：
          <input type="text" class="reinput">
        </div>
      </div>
    </div>
    <div class="addbtn" @click="$router.push('/msubsuc')">提交</div>
  </div>
</template>
<script lang="ts">
import { jssdk } from '@/api/mainpage'
import { Component, Vue } from 'vue-property-decorator';
import Cookies from 'js-cookie'
declare var wx: any
@Component({
})
export default class Set extends Vue {
  private tabIdx: number = 0
  private smIndex: number = 0
  private pageData: any = {
  }
  private mounted(): void {
    document.title = '工厂出货'
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
  private sao() {
    console.log('object');
    wx.scanQRCode({
      desc: 'scanQRCode desc',
      needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
      scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
      success: (res: any) => {
        // 回调
        alert(res)
      },
      error: (res: any) => {
        if(res.errMsg.indexOf('function_not_exist') > 0){
          alert('版本过低请升级')
        }
      }
  });
  }
  private save() {
    this.$router.goBack()
  }
  private toggleTab(idx: number): void {
    this.tabIdx = idx
  }
}
</script>
<style lang="scss" scoped>
@import "~@/styles/utils.scss";
.piclist{
  display: flex;
  margin: pm(11) 0 pm(25) 0;
  justify-content: space-between;
  .item{
    @include wh(91, 91);
    .addi{
      @include wh(91, 91);
    }
    .text{
      margin-top: pm(5);
      color: #676767;
      font-size: pm(10);
      text-align: center;
    }
  }
}
.saomablock{
  display: flex;
  margin-top: 0.26667rem;
  >*{
    align-self: center;
  }
  .saoma{
    margin: 0 !important;
    flex: 1;
  }
  .saoicon{
    @include wh(24, 22);
    margin-left: pm(8);
  }
}
.feilist{
  margin-top: 0.26667rem;
  display: flex;
  span{
    color: red;
  }
  .flst{
    margin-left: pm(5);
    display: flex;
    flex: 1;
    flex-wrap: wrap;
    .item{
      background: #8FC31F;
      @include wh(77, 22);
      color: white;
      font-size: pm(14);
      text-align: center;
      line-height: pm(22);
      border-radius: pm(11);
      margin-right: pm(7);
      margin-bottom: pm(5);
    }
  }
}
.liushui{
  margin-top: pm(20);
  margin-bottom: pm(60);
  display: flex;
  color: #434343;
  font-size: pm(15);
  justify-content: space-between;
  span{
    color: red;
  }
  .linput{
    border: 1px solid #030000;
    border-radius: pm(5);
    font-size: pm(15);
    @include wh(92, 20);
    line-height: pm(20);
  }
  .chuhuobtn{
    line-height:pm(20);
    @include wh(50, 20);
    background:rgba(255,174,0,1);
    border-radius:pm(5);
    color: white;
    font-size: pm(12);
    text-align: center;
  }
}
.containers{
  height: 100%;
  background: #F3F3F3;
  color: #333333;
  font-size: pm(13);
  display: flex;
  flex-direction: column;
  .header{
    display: flex;
    color: #434343;
    font-size: pm(13);
    border-radius: 0;
    background: white;
    height: pm(47);
    justify-content: space-around;
    padding: 0 pm(40);
    .item2{
      align-self: center;
      text-align: center !important;
    }
    .active {
      position: relative;
      color: #242424;
      font-size: pm(16);
      &::after {
        position: absolute;
        left: 50%;
        bottom: -5px;
        content: "";
        width: pm(47);
        height: pm(2);
        margin-left: pm(-23);
        border-radius: 1px;
        background: $m;
      }
    }
  }
  .condt{
    flex: 1;
    background: #F3F3F3;
    .boxblock{
      box-shadow:0px 0px 9px 0px rgba(0, 0, 0, 0.1);
      border-radius:pm(10);
      background: white;
    }
    .probox{
      margin: pm(10) pm(10) 0 pm(10);
      padding: pm(14) pm(16);
      background:rgba(255,255,255,1);
      width: pm(324);
      .title{
        color: #434343;
        font-size: .373333rem;
        padding-left: pm(5);
      }
      .inputblock{
        margin-top: pm(10);
        padding-left: pm(6);
      }
      .ttheadasd{
        display: flex;
        justify-content: space-around;
      }
      .ddss{
        text-align: center;
        color: #7F8389;
        font-size: pm(11);
      }
      .ttile{
        display: flex;
        height: pm(28);
        line-height: pm(28);
        text-align: center;
        color: white;
        font-size: pm(14);
        .btn{
          padding: 0 pm(16);
          border-radius: pm(14) 0 0 pm(14);
          background: #FFC955;
          +.btn{
            border-radius: 0 pm(14) pm(14) 0;
          }
        }
        .active{
          background: $m;
        }
      }
      .bt{
        @include wh(38, 46);
        border-radius: 50%;
        background: $m;
        margin: pm(9) auto;
        text-align: center;
        border: pm(6) solid #FFEFCC;
        color: white;
        font-size: pm(19);
        padding: pm(20) pm(24);
      }
    }
  }
  .addbtn{
    border-radius: 0;
    width: 100%;
  }
}
</style>

