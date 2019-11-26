<template>
  <div class="containers">
    <img v-if="lv == 0" src="../../assets/user/lv0.png" alt="" class="bk"/>
    <img v-if="lv == 1" src="../../assets/user/lv1.png" alt="" class="bk"/>
    <img v-if="lv == 2" src="../../assets/user/lv2.png" alt="" class="bk"/>
    <img v-if="lv == 3" src="../../assets/user/lv3.png" alt="" class="bk"/>
    <img v-if="lv == 4" src="../../assets/user/lv4.png" alt="" class="bk"/>
    <img v-if="lv == 5" src="../../assets/user/lv5.png" alt="" class="bk"/>
    <img v-if="lv == 6" src="../../assets/user/lv6.png" alt="" class="bk"/>
    <div class="ttname">公司名称：牛皮世家</div>
    <div class="ttname">邀请人：{{data.name}}</div>
    <div class="conbox">
      <div class="inputblock">
        <div class="text">授权名称:</div>
        <input type="text" v-model.trim="p.name" placeholder="请输入用户名" class="reinput"/>
      </div>
      <div class="selsex">
        <div class="titl">性别：</div>
        <div class="sex" :class="{selitem: p.sex == 1}" @click="p.sex = 1">男</div>
        <div class="sex" :class="{selitem: p.sex == 2}" @click="p.sex = 2">女</div>
      </div>
      <div class="inputblock">
        <div class="text">身份证号:</div>
        <input type="text" v-model.trim="p.idcard" placeholder="如实填写身份证号码" class="reinput"/>
      </div>
      <div class="inputblock" @click="chooseAddr">
        <div class="text">地区选择:</div>
        <div class="reinput">{{addrdetail}}</div>
      </div>
      <div class="inputblock">
        <div class="text">收货地址:</div>
        <input type="text" v-model.trim="p.address" placeholder="填写收货地址" class="reinput"/>
      </div>
      
      <div class="inputblock">
        <div class="text">手机号码:</div>
        <input type="text" v-model.trim="p.mobile" placeholder="11位手机号码将作为账号登录" class="reinput"/>
      </div>
      <div class="inputblock">
        <div class="text">登录密码:</div>
        <input type="text" v-model.trim="p.password" placeholder="请输入登录密码" class="reinput"/>
      </div>
      <div class="inputblock">
        <div class="text">确认登录密码:</div>
        <input type="text" v-model.trim="psw" placeholder="请确认登录密码" class="reinput"/>
      </div>
      <div class="inputblock">
        <div class="text">支付密码:</div>
        <input type="text" v-model.trim="p.paypwd" placeholder="请输入支付密码" class="reinput"/>
      </div>
      <div class="inputblock">
        <div class="text">确认支付密码:</div>
        <input type="text" v-model.trim="paypsw" placeholder="请确认支付密码" class="reinput"/>
      </div>
      <div class="inputblock">
        <div class="text">验证码:</div>
        <input type="text" v-model.trim="p.vcode" placeholder="点击获取验证码进行填写" class="reinput"/>
      </div>
      <div class="opts">
        <div class="ii2">需交费￥{{data.money}}</div>
        <div class="getcode" @click="getCode">获取验证码</div>
      </div>
      <!-- <div class="inputblock">
        <img src="../../assets/image/king.png" alt="" class="icon"/>
        <input type="text" placeholder="级别" class="reinput"/>
      </div> -->
      <!-- <div class="opts">
        <div class="ii"></div>
        <div class="ii">后台注册</div>
        <div class="ii" @click="forgetPw">忘记/修改密码</div>
      </div> -->
    </div>
    <div class="optbet">
      <div class="addbtn" @click="subdata">提交</div>
      <!-- <div class="addbtn wechat" @click="weLogin">
        <div class="ttt">
          <img src="../../assets/sao/wechat.png" alt=""/>
          <span>微信登录</span>
        </div>
      </div> -->
    </div>
    <!-- <div class="header">
      <div class="item2" :class="{active:tabIdx === 0}" @click="toggleTab(0)">登录</div>
      <div class="item2" :class="{active:tabIdx === 1}" @click="$router.push('/forget')">推荐注册</div>
    </div> -->
    <van-popup v-model="showAddr" custom-class position="bottom" @close="onClose">
      <van-area :area-list="areaList" @confirm="confirm"/>
    </van-popup>
  </div>
</template>
<script lang="ts">
import { checkSn, sendSms, register } from '@/api/mainpage'
import { Component, Vue } from 'vue-property-decorator';
import { getURLParams } from '@/utils/auth'
import { areaList } from '@/utils/address'
import { lvList, sexs } from '@/utils/mainData'
declare var WeixinJSBridge: any;
import Cookies from 'js-cookie'
@Component({
})
export default class NewppAdd extends Vue {
  private lv: number = 0
  private showAddr: boolean = false
  private addrdetail: string = ''
  private areaList: any = areaList
  private psw: string = ''
  private paypsw: string = ''
  private p: any = {
    name: '',
    mobile: '',
    idcard: '',
    province: '',
    city: '',
    district: '',
    address: '',
    password: '',
    vcode: '',
    paypwd: '',
    sex: 1,
    sn: getURLParams().sn,
    openid: getURLParams().openid
  }
  private data: any = {
    name: '',
    money: ''
  }
  private mounted(): void {
    document.title = '邀请注册'
    checkSn({sn: getURLParams().sn}).then((res: any) => {
      this.lv = res.datas.level
      this.data.name = res.datas.name
      this.data.money = res.datas.money
    })
  }
  private gopage(path: string) {
  }
  private chooseAddr() {
    this.showAddr = true
  }
  private onClose() {
    this.showAddr = false
  }
  private confirm(e: any) {
    this.p.province = e[0].code
    this.p.city = e[1].code
    this.p.district = e[2].code
    this.addrdetail = Array.from(e, (i: any) => i.name).join(' ')
    this.onClose()
  }
  private subdata() {
    if (!this.p.vcode) {
      this.$toast('请输入验证码')
      return
    }
    if (this.p.password !== this.psw) {
      this.$toast('两次登录密码不一致')
      return
    }
    if (this.p.paypwd !== this.paypsw) {
      this.$toast('两次支付密码不一致')
      return
    }
    register(this.p).then((res: any) => {
      const self = this
      if (this.data.money > 0) {
        WeixinJSBridge.invoke(
        'getBrandWCPayRequest',
        res.datas,
        (res2: any) => {
          let result = res2.err_msg.split(':');
          result = result[result.length - 1];
          if ( result === 'ok' ) {
            self.$toast(res.message)
          } else {
            alert('支付失败');
          }
        })
      } else {
        this.$toast(res.message)
        setTimeout(() => {
        }, 1000);
      }
    })
  }
  private getCode() {
    if (!this.p.mobile) {
      this.$toast('请输入手机号码')
      return
    } else {
      sendSms({mobile: this.p.mobile}).then((res: any) => {
        this.$toast('验证码已发送到：' + this.p.mobile + '，请注意查收')
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~@/styles/utils.scss";
.selsex{
  display: flex;
  margin: pm(10) pm(20);
  color: #434343;
  font-size: pm(14);
  >*{
    align-self: center;
  }
  .titl{
    text-align-last: justify;
    width: pm(60);
  }
  .sex{
    @include wh(54, 20);
    text-align: center;
    line-height: pm(21);
    border-radius: pm(5);
    border: 1px solid $m;
    margin-right: pm(25);
  }
  .selitem{
    color: white;
    background: $m;
  }
}
.bk{
  @include wh(350, 210);
  margin: pm(12);
}
.ttname{
  text-align: center;
  margin-top: pm(31);
  font-size: pm(17);
  +.ttname{
    margin-top: pm(1);
  }
}
.header{
  position: fixed;
  z-index: 10;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  color: #434343;
  font-size: pm(13);
  border-radius: 0;
  background: white;
  height: pm(37);
  justify-content: space-around;
  // padding: 0 pm(40);
  .item2{
    align-self: center;
    text-align: center !important;
  }
  .active {
    position: relative;
    color: $m;
    // font-size: pm(16);
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
.containers{
  height: 100%;
  display: flex;
  overflow: scroll;
  flex-direction: column;
  background: white;
  .logo{
    @include wh(87, 69);
    margin: pm(25) auto;
    >img{
      margin: 0;
    }
  }
  .optbet{
    margin-top: pm(41);
    .addbtn{
      width: pm(285) !important;
      margin-bottom: pm(50);
    }
    .wechat{
      margin-top: pm(17);
      background: #85C843;
      display: flex;
      justify-content: space-around;
      .ttt{
        display: flex;
        >*{
          align-self: center;
        }
        img{
          @include wh(19, 16);
          margin-right: pm(7);
        }
      }
    }
  }
  .conbox{
    .opts{
      display: flex;
      justify-content: space-between;
      color: $m;
      font-size: pm(14);
      margin: pm(5) pm(10);
      .getcode{
        @include wh(83, 20);
        border-radius: pm(10);
        background: #85C843;
        color: white;
        font-size: pm(12);
        line-height: pm(20);
        text-align: center;
      }
      .ii2{
        color: #F24C4B;
        font-size: pm(17);
      }
    }
    .inputblock{
      display: flex;
      padding: 0 pm(13);
      border-radius: pm(18);
      border: 1px solid rgba(0, 0, 0, .5);
      height: pm(36);
      margin: pm(15) pm(10) 0 pm(10);
      >*{
        align-self: center;
      }
      .text{
        color: #434343;
        font-size: pm(14);
        margin-right: pm(5);
      }
      .icon{
        @include wh(13, 21);
        margin-right: pm(5);
      }
      .icon2{
        @include wh(15, 19);
        margin-right: pm(5);
      }
      input{
        flex: 1;
      }
    }
  }
}
</style>

