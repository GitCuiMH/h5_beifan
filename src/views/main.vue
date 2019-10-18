<template>
  <div class="content">
    <div class="banner">
      <img :src="cpath + 'banner.png'" alt="">
    </div>
    <div v-for="(item, index) in iconList" :key="index" class="block">
      <div class="btitle">{{ item.title }}</div>
      <div class="iconList">
        <div v-for="(it, idx) in item.icons" :key="'i' + idx" class="blist" @click="gopage(it.url, it.mark, it.type)">
          <img :src="cpath + it.icon" alt="">
          <div class="cname">{{ it.name }}</div>
        </div>
      </div>
    </div>
    <!-- <div class="link" @click="gopage('infoManage/2')">门诊充值</div>
    <div class="link" @click="gopage('self')">个人中心</div>
    <div class="link" @click="gopage('infoManage/1')">门诊待缴费</div>
    <div class="link" @click="gopage('infoManage/0')">就诊人管理</div>
    <div class="link" @click="gopage('infoManage/3')">门诊挂号</div>
    <div class="link" @click="gopage('infoManage/4')">检查报告</div>
    <div class="link" @click="gopage('infoManage/5')">二维码</div>
    <div class="link" @click="clear">清除缓存</div> -->
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { getURLParams } from '@/utils/auth'
import { dataList, Test } from '@/utils/mainData'
import Cookies from 'js-cookie'
import { Mutation,
  namespace } from 'vuex-class'
const userModule = namespace('user')
@Component({
})
export default class Main extends Vue {
  @userModule.Mutation('SET_TYPE') private setType: any
  private cpath: string = 'https://cdncollege.quansuwangluo.com/image/wdhis/'
  private iconList: any = []
  private mounted(): void {
    document.title = '智慧妇幼'
    this.iconList = dataList
    // Test()
    if (Cookies.get('x_tk')) {
    } else if (getURLParams().x_tk) {
      Cookies.set('x_tk', getURLParams().x_tk, { expires: 3.33 })
    } else {
      window.location.href = 'http://wlhis.qs110.com/api/wechat/login/type/1'
      return
    }
  }
  private gopage(path: string, mark: any, type: any) {
    if (mark) {
      window.location.href = path
    } else {
      if (type) {
        this.setType(type)
      }
      this.$router.push(path)
    }
  }
}
</script>
<style lang="scss" scoped>
@function pm($pt) {
  @return $pt / 37.5 + rem
}
.content{
  background: white;
  overflow-y: scroll;
  overflow-x: hidden;
  .banner{
    margin: pm(20) pm(20) 0 pm(20);
    >img{
      width: 100%;
    }
  }
  .block{
    .btitle{
      padding: pm(14) pm(20) 0 pm(20);
      color: #252525;
      font-size: pm(18);
      font-weight: 600;
    }
    .iconList{
      padding: pm(0) pm(10);
      margin: pm(11) 0 0 0;
      display: flex;
      flex-wrap: wrap;
      // justify-content: space-around;
      .blist{
        width: pm(88);
        margin-bottom: pm(11);
        >img{
          width: pm(46);
          height: pm(46);
          margin-left: pm(21);
        }
        .cname{
          text-align: center;
          color: #474747;
          font-size: pm(14);
          margin-top: pm(-10);
        }
      }
    }

    +.block{
      border-top: 1px solid #E9E9E9;
    }
  }
 
}
</style>