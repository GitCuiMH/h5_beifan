<template>
  <div class="containers">
    <img v-if="user.lv == 0" src="../../assets/user/lv0.png" alt="" class="bk"/>
    <img v-if="user.lv == 1" src="../../assets/user/lv1.png" alt="" class="bk"/>
    <img v-if="user.lv == 2" src="../../assets/user/lv2.png" alt="" class="bk"/>
    <img v-if="user.lv == 3" src="../../assets/user/lv3.png" alt="" class="bk"/>
    <img v-if="user.lv == 4" src="../../assets/user/lv4.png" alt="" class="bk"/>
    <img v-if="user.lv == 5" src="../../assets/user/lv5.png" alt="" class="bk"/>
    <img v-if="user.lv == 6" src="../../assets/user/lv6.png" alt="" class="bk"/>
    <div class="ttname">公司名称：牛皮世家</div>
    <!-- <div class="selectblock" @click="showCop = true">
      <div class="text">{{user.copName}}</div>
      <img src="../../assets/image/shape.png" alt="" class="icon">
      <div v-if="showCop" class="lvlist">
        <div class="item" v-for="(it, idx) in copList" :key="idx" @click.stop="setCop(idx)">{{it}}</div>
      </div>
    </div> -->
    <div class="selectblock" @click="showLv = true">
      <div class="text">{{user.lvName}}</div>
      <img src="../../assets/image/shape.png" alt="" class="icon">
      <div v-if="showLv" class="lvlist">
        <div v-if="idx < 4 && idx < userInfo.level" class="item" v-for="(it, idx) in lvList" :key="idx" @click.stop="setLv(idx)">{{it.lvname}}</div>
      </div>
    </div>
    <div class="addbtn larget" @click="$router.push('/minviteurl/' + user.lv)">生成邀请链接</div>
  </div>
</template>
<script lang="ts">
import { getUserInfo } from '@/api/mainpage'
import { Component, Vue } from 'vue-property-decorator';
import { getURLParams } from '@/utils/auth'
import { lvList, sexs } from '@/utils/mainData'
import Cookies from 'js-cookie'
@Component({
})
export default class MnewAdd extends Vue {
  private user: any = {
    lv: 0,
    lvName: '代理等级',
    copName: '牛皮世家'
  }
  private copList: string[] = ['牛皮世家']
  private showCop: boolean = false
  private showLv: boolean = false
  private lvList: any[] = lvList
  private userInfo: any = {
    level: 1
  }
  private mounted() {
    getUserInfo({}).then((res: any) => {
      this.userInfo = res.datas
    })
  }
  private setLv(idx: number): void {
    this.showLv = false
    this.user.lvName = this.lvList[idx].lvname
    this.user.lv = idx + 1
  }
  private gopage(path: string): void  {
  }
  private setCop(idx: number): void  {
    this.showCop = false
    this.user.copName = this.copList[idx]
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
      left: 0;
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
  .larget{
    width: pm(285);
    margin-top: pm(65);
  }
}
</style>

