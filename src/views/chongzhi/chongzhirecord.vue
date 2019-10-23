<template>
  <div class="content">
    <div class="searchBlock">
      <span>充值时间</span>
      <div class="input" v-text="beginDate" @click="selDate(0)"/>
      <span>到</span>
      <div class="input" v-text="endDate" @click="selDate(1)"/>
      <div class="subSeTime" @click="searchData">确定</div>
    </div>
    <div v-if="pageData.length === 0 && bAjax" class="empty">
      <img src="https://cdncollege.quansuwangluo.com/image/hospital/emptyIcon.png" alt="">
      <div class="des">没有查询到就诊卡充值信息</div>
    </div>
    <div v-if="pageData.length > 0 && bAjax" v-for="(item, index) in pageData" :key="index" class="tlist">
      <div class="litem">
        <div class="sid">订单号  {{ item.hisOrdNum }}</div>
        <div class="contitle">{{ item.PayType === '充值' ? item.PayType + '(' + item.payBusCnl + ')' : item.PayType }}</div>
        <div class="stime">{{ item.payTime }}</div>
      </div>
      <div :class="{ czNUM: item.PayType === '充值' }" class="mNumber">{{ item.PayType === '充值' ? '+' + formatPrice(item.payAmt) + '元' : '-' + formatPrice(item.payAmt) + '元' }}</div>
    </div>
    <div v-if="pageData.length > 0 && bAjax" class="allload">- 已全部加载 -</div>
    <div v-if="showLayer" class="popLayer" @click="closeLayer">
      <div class="selDate" @click.stop>
        <van-datetime-picker
          v-model="currentDate"
          :style="layerStyle"
          :min-date="new Date(1900, 0, 1)"
          :max-date="new Date()"
          type="date"
          @confirm="confirmBirth"
          @cancel="closeLayer"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { getRecord, getDate } from '@/api/hospital'
import { formatTime } from '@/utils/validate'
import Cookies from 'js-cookie'
import { Component, Vue } from 'vue-property-decorator';
import { Mutation,
  namespace } from 'vuex-class'
const userModule = namespace('user')

@Component({
})
export default class ChongZhiRecord extends Vue {
  @userModule.Mutation('TOGGLE_INFO') private toggleInfo: any
  // private userInfo: any = JSON.parse(Cookies.get('user') as string)
  private bAjax: boolean = true
  private beginDate: string = '开始日期'
  private endDate: string = '结束日期'
  private currentDate: any = '结束日期'
  private dateKind: number = 0
  private showLayer: boolean = false
  private layerStyle: any = {}
  private payTypes: any = {
    CZ: '充值',
    MZJF: '门诊缴费',
    ZYYJBJ: '住院押金补缴'
  }
  private czTypes: any = {
    WX: '微信',
    ZFB: '支付宝',
    XX: '线下'
  }
  private pageData: any[] = []
  private mounted(): void {
    this.currentDate = new Date()
    document.title = '充值记录查询'
    // const tempData = {
    //   itemType: parseInt(this.userInfo.itemType, 10),
    //   itemNo: this.userInfo.itemNo
    // }
    // getDate().then((res: any) => {
    //   this.beginDate = res.datas.begin
    //   this.endDate = res.datas.end
    //   this.searchData()
    // })

  }
  private confirmBirth(val: any): void {
    const temp = formatTime(val).substring(0, 10)
    this.dateKind ? this.endDate = temp : this.beginDate = temp
    this.closeLayer()
  }
  private selDate(mark: number): void {
    this.dateKind = mark
    const temp = !mark ? this.beginDate.split('-') : this.endDate.split('-')
    this.currentDate = new Date(parseInt(temp[0], 10), parseInt(temp[1], 10) - 1, parseInt(temp[2], 10))
    const self = this
    self.showLayer = true
    setTimeout(() => {
      self.layerStyle = { height: '7rem' }
    }, 50)
  }
  private formatPrice(price: string): string {
    return (parseInt(price, 10) / 100).toFixed(2)
  }
  private searchData(): void {
    // const tempData = {
    //   // itemType: this.userInfo.itemType,
    //   itemType: 1,
    //   itemNo: this.userInfo.itemNo,
    //   beginDate: this.beginDate,
    //   endDate: this.endDate
    // }
    // if (tempData.beginDate.length < 8) {
    //   this.$toast('请选择开始日期')
    //   return
    // }
    // if (tempData.endDate.length < 8) {
    //   this.$toast('请选择结束日期')
    //   return
    // }
    // getRecord(tempData).then((res: any) => {
    //   this.bAjax = true
    //   this.pageData = res.datas.item
    //   console.log(this.pageData);
    // }).catch((res2) => {
    //   this.pageData = []
    //   this.bAjax = true
    // })
  }
  private closeLayer(): void {
    const self = this
    this.layerStyle = { height: '0rem' }
    setTimeout(() => {
      self.showLayer = false
    }, 300)
  }
  private godetail(index: number): void {
    // this.toggleInfo(this.pageData[index])
    const temp = {
      hisOrdNum: '23424234',
      payName: '缴费名称',
      deptName: '科室名称',
      doctorName: '医生',
      totalAmt: '$333',
      medInsAmt: '3333',
      selfAmt: '233223'
    }
    this.toggleInfo(temp)
    // this.$router.push('/jiaofeidetail/' + this.userInfo.itemType + '/' + this.userInfo.itemNo)
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
  
  .mNumber{
    margin-top: -.8rem;
  }
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
  .czNUM{
    color: #F48015;
  }
  .mNumber{
    margin-right: 0.1rem;
  }
}

</style>
