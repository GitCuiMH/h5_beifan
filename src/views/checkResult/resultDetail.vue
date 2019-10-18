<template>
  <div class="content">
    <div class="details">
      <div class="resultTitle">报告详情</div>
      <div class="boxs">
        <div v-for="(item, index) in pageData.item" :key="index" class="formbox1">
          <div class="formDivBox ">
            <div :class="{ commo: index > 0 }" class="kindInfo">{{ index === 0 ? '名称' : item.itemName }}</div>
          </div>
          <div class="formDivBox">
            <div :class="{ commo: index > 0 }" class="kindInfo">{{ index === 0 ? '结果' : item.result }}</div>
          </div>
          <div class="formDivBox fbox">
            <div :class="{ commo: index > 0 }" class="kindInfo">{{ index === 0 ? '参考范围' : item.refRange }}</div>
          </div>
          <div class="formDivBox">
            <div :class="{ commo: index > 0 }" class="kindInfo">{{ index === 0 ? '单位' : item.unit }}</div>
          </div>
          <div class="formDivBox">
            <div :class="{ commo: index > 0, hColor: item.abnormal === 'H', lColor: item.abnormal === 'L', nColor: item.abnormal === 'M' }" class="kindInfo">{{ index === 0 ? '结果' : results[item.abnormal] }}</div>
          </div>
        </div>
      </div>
      
    </div>
    <div class="formbox formbox2">
      <div class="formDiv">
        <div class="kindname">检查名称</div>
        <div class="kindInfo">{{ pageData.inspectName }}</div>
      </div>
      <div class="formDiv">
        <div class="kindname">送检科室</div>
        <div class="kindInfo">{{ pageData.deptName }}</div>
      </div>
      <div class="formDiv">
        <div class="kindname">送检医生</div>
        <div class="kindInfo">{{ checkDetail.doctorName }}</div>
      </div>
      <div class="formDiv">
        <div class="kindname">检查医生</div>
        <div class="kindInfo">{{ pageData.doctorName }}</div>
      </div>
      <div class="formDiv">
        <div class="kindname">报告时间</div>
        <div class="kindInfo">{{ pageData.reportTime }}</div>
      </div>
      <div class="formDiv">
        <div class="kindname">报告号</div>
        <div class="kindInfo">{{ pageData.inspectId }}</div>
      </div>
    </div>
    <!-- <div v-if="bAjax" class="largeBtn" @click="pay">支付</div> -->
  </div>
</template>

<script lang="ts">
import { getDetail } from '@/api/hospital'
import { Component, Vue } from 'vue-property-decorator';
import { State,
  namespace } from 'vuex-class'
const userModule = namespace('user')
@Component({
})
export default class ResultDetail extends Vue {
  @userModule.State('checkDetail') private checkDetail: any
  private bAjax: boolean = false
  private pageData: any = {}
  private results: any = {
    L: '偏低 ↓',
    M: '正常',
    H: '偏高 ↑'
  }
  private mounted(): void {
    document.title = '报告详情'
    const tempData = {
      inspectId: this.$route.params.inspectId,
      itemNo: this.$route.params.itemNo
    }
    getDetail(tempData).then((res: any) => {
      this.bAjax = true
      this.pageData = res.datas
    })
  }
  private pay(): void {
    const tempData = {
      itemNo: this.$route.params.itemNo,
      psOrdNum: '321564654',
      payAmt: '1'
    }
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
  .details{
    background: white;
    padding: pm(15);
    .resultTitle{
      color: #48BCAB;
      font-size: pm(17);
      margin-bottom: 0.3rem;
    }
    .boxs{
      background: #D9FFF9;
      border-radius: pm(4);
      padding: 0.2rem 0;
    }
    .formbox1{
      margin: 0 pm(15);
      padding: 0.2rem pm(0) 0.2rem pm(0);
      display: flex;
      justify-content: space-between;
      
      text-align: center;
      > *{
        align-self: center;
      }
      .fbox{
        width: 1.8rem !important;
      }
      .formDivBox{
        width: 1.5rem;
        font-size: pm(15);
        color: #48BCAB;
      }
      .commo{
        color: #4C4C4C;
        font-size: pm(14);
      }
      +.formbox1+.formbox1{
        border-top: 1px solid #48BCAB;
      }
      .nColor{
        color: #48BCAB;
      }
      .hColor{
        color: red;
      }
      .lColor{
        color: #F48015;
      }
    }
  }
  
  .formbox2, .largeBtn{
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
  }
}

</style>
