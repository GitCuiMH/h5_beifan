<template>
  <div class="content">
    <div class="details">
      <div class="formbox">
        <div class="price">
          <div class="num">{{ formatPrice(fDetail.TotalFee) + '元' }}</div>
          <div v-if="!parseInt(fDetail.PayFlag, 10)" class="status">未支付</div>
        </div>
        <div class="formDiv">
          <div class="kindname">开单科室</div>
          <div class="kindInfo">{{ fDetail.DeptName }}</div>
        </div>
        <div class="formDiv">
          <div class="kindname">开单医生</div>
          <div class="kindInfo">{{ fDetail.DoctName }}</div>
        </div>
        <div class="formDiv">
          <div class="kindname">记录编码</div>
          <div class="kindInfo">{{ fDetail.RecipeNo }}</div>
        </div>
      </div>
    </div>
    <div v-for="(item, index) in fDetail.RecipeDetail" :key="index" class="detail">
      <div class="iptitle">医嘱</div>
      <div class="formbox formbox2">
        
        <div class="formDiv">
          <div class="kindname">编号</div>
          <div class="kindInfo">{{ item.ItemID }}</div>
        </div>
        <div class="formDiv">
          <div class="kindname">名称</div>
          <div class="kindInfo">{{ item.ItemName }}</div>
        </div>
        <div class="formDiv">
          <div class="kindname">类型</div>
          <div class="kindInfo">{{ item.ItemType }}</div>
        </div>
        <div class="formDiv">
          <div class="kindname">总金额</div>
          <div class="kindInfo">{{ formatPrice(item.ItemTotalFee) + '元' }}</div>
        </div>
        
      </div>
      <div class="iptitle">收费细项</div>
      <div v-for="(it, idx) in item.SubItem" :key="'s' + idx" class="formbox formbox2">
        <div class="formDiv">
          <div class="kindname">编号</div>
          <div class="kindInfo">{{ it.SubItemID }}</div>
        </div>
        <div class="formDiv">
          <div class="kindname">名称</div>
          <div class="kindInfo">{{ it.SubItemName }}</div>
        </div>
        <div class="formDiv">
          <div class="kindname">是否网售药</div>
          <div class="kindInfo">{{ parseInt(it.IsSaleOnLine, 10) === 1 ? '否' : '是' }}</div>
        </div>
        <div class="formDiv">
          <div class="kindname">规格</div>
          <div class="kindInfo">{{ it.Specs }}</div>
        </div>
        <div class="formDiv">
          <div class="kindname">单位</div>
          <div class="kindInfo">{{ it.Unit }}</div>
        </div>
        <div class="formDiv">
          <div class="kindname">数量</div>
          <div class="kindInfo">{{ it.Quantity }}</div>
        </div>
        <div class="formDiv">
          <div class="kindname">单价</div>
          <div class="kindInfo">{{ formatPrice(it.UnitPrice) + '元' }}</div>
        </div>
        <div class="formDiv">
          <div class="kindname">费用</div>
          <div class="kindInfo">{{ formatPrice(it.Fee) + '元' }}</div>
        </div>
        <div class="formSp">
          <div class="kindname">备用字段</div>
          <div class="kindInfo">{{ it.Note }}</div>
        </div>
      </div>
    </div>
    <div class="forpos" style="height: 1rem"></div>
  </div>
</template>

<script lang="ts">


import { Component, Vue } from 'vue-property-decorator';
import { State,
  namespace } from 'vuex-class'
const userModule = namespace('user')
@Component({
})
export default class FDetail extends Vue {
  @userModule.State('fDetail') private fDetail: any
  private mounted(): void {
    console.log(this.fDetail);
    document.title = '门诊待缴费记录'
  }
  private formatPrice(price: string): string {
    return (parseInt(price, 10) / 100).toFixed(2)
  }
  private pay() {
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
  .formbox{
    background: white;
    padding: 0 0 0 pm(12);
    .kindInfo{
      margin-right: pm(12);
    }
  }
  .formbox2, .largeBtn{
    margin-top: 0.2rem;
  }
  .iptitle{
    margin-left: pm(12);
    font-size: pm(12);
  }
  .price{
    padding: 0.5rem;
    text-align: center;
    border-bottom: 1px solid #E8E8E8;
    .num{
      font-weight: 600;
      font-size: pm(26);
      color: #252525;
    }
    .status{
      color: #F48015;
      font-size: pm(16);
    }
  }
  .formSp{
    font-size: pm(16);
    border-top: 1px solid #E8E8E8;
    text-align: left;
    >*{
      align-self: center;
    }
    .kindname{
      flex: 1;
      line-height: 1.1rem;
      min-width: 2rem;
      color: #4C4C4C;
    }
    .kindInfo{
      padding: 0 0 0.3rem 0;
      color: #9B9B9B;
      font-size: pm(14);
    }
    
  }
}

</style>
