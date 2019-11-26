<template>
  <div class="containers">
    <div class="header">
      <div class="item2" :class="{active:tabIdx === 0}" @click="toggleTab(0)">登录密码修改</div>
      <div class="item2" :class="{active:tabIdx === 1}" @click="toggleTab(1)">交易密码修改</div>
    </div>
    <!-- <div class="item dtaddr2">
      <div class="text">输入登录账号：</div>
      <input type="text" class="reinput" placeholder="" v-model="pageData.name"/>
    </div> -->
    <div class="desc">请输入手机 {{userInfo.mobile.toString().replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')}} 收到的短信验证码</div>
    <div class="item dtaddr2">
      <div class="text">输入验证码：</div>
      <input type="text" class="reinput reinput2" placeholder="" v-model.trim="infos.code"/>
      <div class="getcode" @click="getcode">{{pag}}</div>
    </div>
    <div class="baseInfo">
      <div class="item">
        <div class="text">修改{{tabIdx ? '交易' : '登录'}}密码：</div>
        <input type="text" class="reinput" placeholder="" v-model.trim="infos.password"/>
      </div>
      <div class="item">
        <div class="text">确定{{tabIdx ? '交易' : '登录'}}密码：</div>
        <input type="text" class="reinput" placeholder="" v-model.trim="infos.r_password"/>
      </div>
    </div>
    <div class="addbtn" @click="subData">确定</div>
  </div>
</template>
<script lang="ts">
import { sendSms, setPwd } from '@/api/mainpage'
import { Component, Vue } from 'vue-property-decorator';
import { Mutation,
  namespace } from 'vuex-class'
const userModule = namespace('user')
@Component({
})
export default class Set extends Vue {
  @userModule.State('userInfo') private userInfo: any;
  private tabIdx: number = 0
  private pag: string = '获取验证码'
  private infos: any = {
    code: '',
    password: '',
    r_password: '',
    type: 1
  }
  private mounted(): void {
    document.title = '账号设置'
  }
  private save() {
    this.$router.goBack()
  }
  private toggleTab(idx: number): void {
    this.pag = '获取验证码'
    this.tabIdx = idx
    this.infos.type = idx + 1
  }
  private getcode() {
    sendSms({mobile: this.userInfo.mobile, type: 0}).then((res: any) => {
      this.pag = '已发送'
    })
  }
  private subData() {
    if (this.infos.password !== this.infos.r_password) {
      this.$toast('两次密码不一致')
      return
    }
    // console.log(this.infos);
    setPwd(this.infos).then((res: any) => {
      this.$toast(res.message)
      setTimeout(() => {
        this.$router.goBack()
      }, 1000);
    })
  }
}
</script>
<style lang="scss" scoped>
@import "~@/styles/utils.scss";
.containers{
  height: 100%;
  background: #F3F3F3;
  color: #333333;
  font-size: pm(13);
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
  .baseInfo{
    height: pm(89);
    background: white;
    border-radius: pm(15);
    margin: pm(11) pm(10);
    padding: 0 pm(16);
    display: flex;
    flex-direction: column;
    .item{
      +.item{
        border-top: 1px solid #DEDEDE;
      }
    }
  }
  .item{
    flex: 1;
    display: flex;
    font-size: pm(15);
    // padding: 0 pm(12);
    >*{
      align-self: center;
    }
    .text{
      color: #2F2F2F;
    }
    .reinput, .addr{
      flex: 1;
    }
    .reinput2{
      text-align: left;
      width: 110px;
    }
  }
  .dtaddr2{
    background: white;
    margin: pm(10) pm(10);
    padding: pm(14) pm(13) pm(14) pm(16);
    border-radius: pm(10);
    font-size: pm(15);
    .getcode{
      width: pm(92);
      color: $m;
      font-size: pm(13);
      text-align: center;
      // height: ;
      border-left: 1px solid #DEDEDE;
    }
  }
  .desc{
    color: #666666;
    font-size: pm(12);
    margin: pm(16) pm(16) pm(6) pm(16);
  }
  .addbtn{
    position: absolute;
    bottom: pm(65);
  }
}
</style>

