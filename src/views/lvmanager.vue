<template>
  <div class="containers">
    <img v-if="user.level == 0" src="../assets/user/lv0.png" alt="" class="bk"/>
    <img v-if="user.level == 1" src="../assets/user/lv1.png" alt="" class="bk"/>
    <img v-if="user.level == 2" src="../assets/user/lv2.png" alt="" class="bk"/>
    <img v-if="user.level == 3" src="../assets/user/lv3.png" alt="" class="bk"/>
    <img v-if="user.level == 4" src="../assets/user/lv4.png" alt="" class="bk"/>
    <img v-if="user.level == 5" src="../assets/user/lv5.png" alt="" class="bk"/>
    <img v-if="user.level == 6" src="../assets/user/lv6.png" alt="" class="bk"/>
    <div class="ttname">公司名称：牛皮世家</div>
    <!-- <div class="selectblock" @click="showLv = true"> -->
    <div class="selectblock">
      <div class="text">{{lvList[user.level - 1].lvname}}</div>
      <img src="../assets/image/shape.png" alt="" class="icon">
      <div v-if="showLv" class="lvlist">
        <div v-if="idx < 4" class="item" v-for="(it, idx) in lvList" :key="idx" @click.stop="setLv(idx)">{{it.lvname}}</div>
      </div>
    </div>
    <div v-if="user.level < 4" class="blockjf">
      <div class="forpos"></div>
      <div class="text">需交费￥1231</div>
    </div>
    <div class="forpos"></div>
    <div v-if="user.level < 4" class="addbtn larget" @click="uplv">进行升级</div>
  </div>
</template>
<script lang="ts">
import { upLevel, getUserInfo } from '@/api/mainpage'
import { Component, Vue } from 'vue-property-decorator';
import { getURLParams } from '@/utils/auth'
import { lvList, sexs } from '@/utils/mainData'
import Cookies from 'js-cookie'
declare var WeixinJSBridge: any;
@Component({
})
export default class LvManager extends Vue {
  private user: any = {
    level: 1
  }
  private showLv: boolean = false
  private lvList: any[] = lvList
  private mounted(): void {
    document.title = '等级管理'
    getUserInfo({}).then((res: any) => {
      this.user = res.datas
    })
  }
  private setLv(idx: number): void {
    this.showLv = false
    this.user.lvName = this.lvList[idx].lvname
    this.user.lv = idx + 1
  }
  private gopage(path: string) {
  }
  private uplv() {
    upLevel({})
  }
}
</script>
<style lang="scss" scoped>
@import "~@/styles/utils.scss";
.containers{
  height: 100%;
  display: flex;
  flex-direction: column;
  background: white;
  color: #434343;
  font-size: pm(17);
  .bk{
    @include wh(350, 210);
    margin: pm(12);
  }
  .ttname{
    text-align: center;
    margin-top: pm(31);
  }
  .selectblock{
    position: relative;
    display: flex;
    margin: pm(25) pm(11) 0 pm(18);
    border: 1px solid #232323;
    height: pm(33);
    padding: 0 pm(8) 0 pm(21);
    
    border-radius: pm(16);
    justify-content: space-between;
    line-height: pm(33);
    .icon{
      @include wh(10, 10);
      margin-top: pm(15);
    }
    .lvlist{
      background: white;
      position: absolute;
      // background: rgba(0, 0, 0, .5); 
      left: 0;
      // border-left: 1px solid black;
      // border-right: 1px solid black;
      // border-bottom: 1px solid black;
      top: pm(38);
      width: 100%;
      color: #434343;
      font-size: pm(14);
      line-height: pm(40);
      .item{
        padding-left: pm(10);
        +.item{
          border-top: 1px solid #eeeeee;
        }
      }
    }
  }
  .blockjf{
    display: flex;
    margin: pm(20) pm(11) 0 pm(18);
    font-size:pm(17);
    color:rgba(242,76,75,1);
  }
  .larget{
    border-radius: 0 !important;
    width: 100%;
    margin-top: pm(65);
  }
}
</style>

