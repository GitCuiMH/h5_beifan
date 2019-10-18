<template>
  <div class="content">
    <div class="userInfo">
      <div class="names">{{ pageData.patName }}</div>
      <div class="uinfos">{{ '院内诊疗卡  ' + userInfo.itemNo }}</div>
    </div>
    <div v-if="bAjax" class="lfInofs">
      <div class="lfitem">
        <div class="title">总余额</div>
        <div class="context">{{ formatPrice(pageData.totalAmt) + '元' }}</div>
      </div>
      <div class="lfitem">
        <div class="title">可用余额</div>
        <div class="context">{{ formatPrice(pageData.availAmt) + '元' }}</div>
      </div>
      <div class="lfitem">
        <div class="title">可提现余额</div>
        <div class="context">{{ formatPrice(pageData.outAmt) + '元' }}</div>
      </div>
      <div class="lfitem">
        <div class="title">冻结金额</div>
        <div class="context">{{ formatPrice(pageData.freezAmt) + '元' }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { getBalance } from '@/api/hospital'
import { getURLParams } from '@/utils/auth'
import Cookies from 'js-cookie'
import { Component, Vue } from 'vue-property-decorator';
@Component({
})
export default class Yue extends Vue {
  private userInfo: any = JSON.parse(Cookies.get('user') as string)
  private bAjax: boolean = false
  private pageData: any[] = []
  private mounted(): void {
    document.title = '预付卡余额查询'
    getBalance({ itemNo: this.userInfo.itemNo }).then((res: any) => {
      this.pageData = res.datas
      this.bAjax = true
    })
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
  background: white;
  .userInfo{
    margin: 0.4rem;
    text-align: center;
    .names{
      color: #252525;
      font-size: pm(18);
    }
    .uinfos{
      color: #48BCAB;
      font-size: pm(14);
    }
  }
  .lfInofs{
    margin-top: 0.8rem;
  }
}
</style>
