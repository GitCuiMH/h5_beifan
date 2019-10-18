<template>
  <div class="content">
    <div v-if="pageData.length === 0 && bAjax" class="empty">
      <img src="https://cdncollege.quansuwangluo.com/image/hospital/emptyIcon.png" alt="">
      <div class="des">没有查询到就诊卡待缴费处方信息</div>
    </div>
    <div v-if="pageData.length > 0" v-for="(item, index) in pageData" :key="index" class="tlist" @click="godetail(index)">
      <div class="litem">
        <div class="sid">订单号  {{ item.hisOrdNum }}</div>
        <div class="contitle">{{ item.deptName + '-' + item.payName }}</div>
        <div class="stime">{{ item.doctorName }}</div>
      </div>
      <div class="mNumber">{{ formatPrice(item.totalAmt) + '元' }}</div>
      <div class="rightIcon"/>
    </div>
    <div v-if="pageData.length > 0" class="allload">- 已全部加载 -</div>
  </div>
</template>

<script lang="ts">
import { getPending } from '@/api/hospital'
import { Component, Vue } from 'vue-property-decorator';
import Cookies from 'js-cookie'
import { Mutation,
  namespace } from 'vuex-class'
const userModule = namespace('user')
@Component({
})
export default class Yue extends Vue {
  @userModule.Mutation('TOGGLE_INFO') private toggleInfo: any
  private userInfo: any = JSON.parse(Cookies.get('user') as string)
  private bAjax: boolean = false
  private pageData: any[] = []
  private mounted(): void {
    document.title = '门诊待缴费记录'
    const tempData = {
      itemType: parseInt(this.userInfo.itemType, 10),
      itemNo: this.userInfo.itemNo
    }
    getPending(tempData).then((res: any) => {
      this.bAjax = true
      this.pageData = res.datas.item
    }).catch((res2) => {
      this.pageData = []
      this.bAjax = true
    })
  }
  private godetail(index: number): void {
    this.toggleInfo(this.pageData[index])
    this.$router.push('/jiaofeidetail/' + this.userInfo.itemType + '/' + this.userInfo.itemNo)
  }
  private formatPrice(price: string): string {
    return (parseInt(price, 10) / 100).toFixed(2)
  }
}

</script>
<style lang="scss" scoped>
@function pm($pt) {
  @return $pt / 37.5 + rem
}
.content{
  height: 100%;
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
  // .mNumber{
  //   margin-top: -.8rem;
  // }
  .empty{
    img{
      width: pm(184);
      margin: 2rem pm(95) 0 pm(95);
    }
    .des{
      font-size: pm(17);
      color: #4C4C4C;
      text-align: center;
      margin: 0.5rem auto 0.8rem auto;
    }
  }
}

</style>
