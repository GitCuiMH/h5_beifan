<template>
  <div class="content">
    <div class="searchBlock">
      <span>检查时间</span>
      <div class="input" v-text="beginDate" @click="selDate(0)"/>
      <span>到</span>
      <div class="input" v-text="endDate" @click="selDate(1)"/>
      <div class="subSeTime" @click="searchData">确定</div>
    </div>
    <div v-if="pageData.length === 0 && bAjax" class="empty">
      <img src="https://cdncollege.quansuwangluo.com/image/hospital/emptyIcon.png" alt="">
      <div class="des">没有查询到检查信息</div>
    </div>
    <div v-if="pageData.length > 0 && bAjax" v-for="(item, index) in pageData" :key="index" class="tlist" @click="godetail(index)">
      <img :src="item.inspectStatus === '3' ? 'https://cdncollege.quansuwangluo.com/image/hospital/se.png' : 'https://cdncollege.quansuwangluo.com/image/hospital/undo.png'" class="checkIcon" alt="">
      <div class="litem">
        <div :class="{ czNUM: item.inspectStatus !== '3' }" class="sid">{{ statusList[parseInt(item.inspectStatus, 10) - 1] }}</div>
        <div class="contitle">{{ item.inspectName }}</div>
        <div class="stime">{{ item.exeDeptName + ' | ' + item.doctorName }}</div>
      </div>
      <div :class="{ czNUM: item.PayType === '充值' }" class="mNumber">
        <div class="ttime">就诊时间</div>
        <div class="time">{{ item.inspectTime }}</div>
      </div>
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
import { getList, getDate } from '@/api/hospital'
import { formatTime } from '@/utils/validate'
import Cookies from 'js-cookie'
import { Component, Vue } from 'vue-property-decorator';
import { Mutation,
  namespace } from 'vuex-class'
const userModule = namespace('user')
@Component({
})
export default class CheckResult extends Vue {
  @userModule.Mutation('TOGGLE_CDTL') private toggleDetail: any
  private userInfo: any = JSON.parse(Cookies.get('user') as string)
  private bAjax: boolean = false
  private statusList: string[] = ['未出报告', '已出报告，未审核', '已出报告，已审核']
  private beginDate: string = '开始日期'
  private endDate: string = '结束日期'
  private currentDate: any = '结束日期'
  private dateKind: number = 0
  private showLayer: boolean = false
  private layerStyle: any = {}
  private pageData: any[] = []
  private mounted(): void {
    this.currentDate = new Date()
    document.title = '检查报告'
    const tempData = {
      itemType: parseInt(this.userInfo.itemType, 10),
      itemNo: this.userInfo.itemNo
    }
    getDate().then((res: any) => {
      this.beginDate = res.datas.begin
      this.endDate = res.datas.end
      this.searchData()
    })
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
    const tempData = {
      // itemType: this.userInfo.itemType,
      itemType: 1,
      itemNo: this.userInfo.itemNo,
      beginDate: this.beginDate,
      endDate: this.endDate
    }
    if (tempData.beginDate.length < 8) {
      this.$toast('请选择开始日期')
      return
    }
    if (tempData.endDate.length < 8) {
      this.$toast('请选择结束日期')
      return
    }
    getList(tempData).then((res: any) => {
      this.bAjax = true
      this.pageData = res.datas.item
    }).catch((res2) => {
      this.pageData = []
      this.bAjax = true
    })
  }
  private closeLayer(): void {
    const self = this
    this.layerStyle = { height: '0rem' }
    setTimeout(() => {
      self.showLayer = false
    }, 300)
  }
  private godetail(index: number): void {
    this.toggleDetail(this.pageData[index])
    this.$router.push('/resultDetail/' + this.userInfo.itemNo + '/' + this.pageData[index].inspectId)
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
  .tlist{
    min-height: pm(91);
    margin-bottom: 0;
    +.tlist{
      border-top: 1px solid #E8E8E8;
    }
    .contitle{
      font-size: pm(16);
    }
    .stime{
      color: #9B9B9B;
    }
    .sid{
      font-size: pm(17);
      color: #48BCAB;
    }
    .czNUM{
      color: #F48015;
    }
  }
  .mNumber{
    margin-right: 0.1rem;
    .ttime{
      color: #4C4C4C;
      font-size: pm(14);
    }
    .time{
      margin-top: pm(8);
      font-size: pm(12);
      color: #9B9B9B;
      width: pm(68);
    }
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
  .tlist{
    padding: 0 pm(14) 0 pm(19);
  }
  .checkIcon{
    width: pm(21);
    height: pm(21);
    margin-right: pm(13);
  }
  .allload{
    margin-top: 0.5rem;
  }
}

</style>
