<template>
  <div class="content">
    <div class="details">
      <div v-for="(item, index) in pageData" :key="index" class="formbox">
        <div class="formDiv">
          <div class="kindname">项目名称</div>
          <div class="kindInfo">{{ item.itemName }}</div>
        </div>
        <div class="formDiv">
          <div class="kindname">项目类别/费别</div>
          <div class="kindInfo">{{ item.itemType }}</div>
        </div>
        <div class="formDiv">
          <div class="kindname">科室</div>
          <div class="kindInfo">{{ jfInfo.deptName }}</div>
        </div>
        <div class="formDiv">
          <div class="kindname">医生</div>
          <div class="kindInfo">{{ jfInfo.doctorName }}</div>
        </div>
        <div class="formDiv">
          <div class="kindname">单位</div>
          <div class="kindInfo">{{ item.itemUnit }}</div>
        </div>
        <div class="formDiv">
          <div class="kindname">单价</div>
          <div class="kindInfo">{{ formatPrice(item.itemPrice) + '元' }}</div>
        </div>
        <div class="formDiv">
          <div class="kindname">规格</div>
          <div class="kindInfo">{{ item.itemSpec }}</div>
        </div>
        <div class="formDiv">
          <div class="kindname">数量</div>
          <div class="kindInfo">{{ item.itemNumber }}</div>
        </div>
        <div class="formDiv">
          <div class="kindname">项目价格合计</div>
          <div class="kindInfo">{{ formatPrice(item.itemTotalFee) + '元' }}</div>
        </div>
      </div>
    </div>
    <div class="formbox formbox2">
      <div class="formDiv">
        <div class="kindname">缴费总额</div>
        <div class="kindInfo">{{ formatPrice(jfInfo.totalAmt) + '元' }}</div>
      </div>
      <div class="formDiv">
        <div class="kindname">医保部分金额</div>
        <div class="kindInfo">{{ formatPrice(jfInfo.medInsAmt) + '元' }}</div>
      </div>
      <div class="formDiv">
        <div class="kindname">自费部分金额</div>
        <div class="kindInfo">{{ formatPrice(jfInfo.selfAmt) + '元' }}</div>
      </div>
    </div>
    <div v-if="bAjax" class="largeBtn" @click="pay">支付</div>
  </div>
</template>

<script lang="ts">
import { getPendingShow, setPay } from '@/api/hospital'
import Cookies from 'js-cookie'
import { Component, Vue } from 'vue-property-decorator';
import { State,
  namespace } from 'vuex-class'
const userModule = namespace('user')
@Component({
})
export default class JiaoFeiDetail extends Vue {
  @userModule.State('jiaofeiinfo') private jfInfo: any
  private bAjax: boolean = false
  private userInfo: any = JSON.parse(Cookies.get('user') as string)
  private pageData: any = {}
  private mounted(): void {
    document.title = '门诊待缴费记录'
    const tempData = {
      hisOrdNum: this.jfInfo.hisOrdNum,
      itemType: parseInt(this.$route.params.itemType, 10),
      itemNo: this.$route.params.itemNo
    }
    getPendingShow(tempData).then((res: any) => {
      this.bAjax = true
      this.pageData = res.datas.item.length ? res.datas.item : [res.datas.item]
    })
  }
  private formatPrice(price: string): string {
    return (parseInt(price, 10) / 100).toFixed(2)
  }
  private pay(): void {
    const tempData = {
      hisOrdNum: this.jfInfo.hisOrdNum,
      itemNo: this.$route.params.itemNo,
      // psOrdNum: '321564654',
      payAmt: this.jfInfo.selfAmt,
      name: this.userInfo.name,
      type: this.jfInfo.deptName + '-' + this.jfInfo.payName
    }
    setPay(tempData).then((res: any) => {
      this.$router.replace('/jfsucc')
    })
      // this.$router.push('/jfsucc')
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
  
  .formbox2, .largeBtn{
    margin-top: 0.5rem;
  }
}

</style>
