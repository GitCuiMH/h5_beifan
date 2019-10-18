<template>
  <div v-if="pageData" class="content">
    <div class="block">
      <div class="userInfo">
        <div class="names">{{ userInfo.name }}</div>
        <div class="uinfos">{{ '院内诊疗卡  ' + userInfo.itemNo }}</div>
      </div>
      <div class="iptitle">固定额度</div>
      <div class="prices">
        <div v-for="(item, idx) in pricesList" :key="idx" :class="{ selPric: pIndex === idx }" class="item" @click="selPrice(idx)">{{ item }}元</div>
      </div>
      <div class="iptitle">自定义额度</div>
      <div class="selfPrice">
        <!-- <input v-model.trim="inNum" type="tel" onkeypress="return( /[\d]/.test(String.fromCharCode(event.keyCode) ) )" placeholder="请输入充值金额"> -->
        <input v-model.trim="inNum" onkeyup = "value=value.replace(/[^\d|.]/g,'')" placeholder="请输入充值金额">
        <!-- <div class="sub" @click="subInNum">确定</div> -->
      </div>
    </div>
    <div class="block block2">
      <div class="text">充值金额</div>
      <div class="text tnum">{{ isNaN(parseFloat(inNum)) ? '0' : parseFloat(inNum).toFixed(2) }}元</div>
    </div>
    <div class="largeBtn" @click="chongzhi">充值</div>
  </div>
</template>

<script lang="ts">
declare var WeixinJSBridge: any;
import { getUserStatus, wxPay } from '@/api/hospital'
import Cookies from 'js-cookie'
import { Component, Vue } from 'vue-property-decorator';
@Component({
})
export default class ChongZhi extends Vue {
  private pricesList: string[] = ['100', '200', '500', '1000']
  private userInfo: any = JSON.parse(Cookies.get('user') as string)
  private pnum: string = '100'
  private pIndex: number = 0
  private inNum: string = '100'
  private pageData: any = {}
  private mounted(): void {
    document.title = '充值'
    getUserStatus({ id: this.userInfo.id }).then((res: any) => {
      this.pageData = res.datas
      if (!this.pageData) {
        this.$toast(res.message)
        setTimeout(() => {
          this.$router.goBack()
        }, 2000)
      }
    })
  }
  private selPrice(index: number): void {
    this.pIndex = index
    this.inNum = this.pricesList[index]
  }
  // private subInNum(): void {
  //   if (this.inNum) {
  //     this.pnum = parseFloat(this.inNum).toFixed(2)
  //   } else {
  //     return
  //   }
  // }
  private chongzhi(): void {
    const iNum = parseFloat(this.inNum).toFixed(2)
    if (parseFloat(this.inNum) <= 0 || isNaN(parseFloat(this.inNum))) {
      this.$toast('请选择充值金额！')
      return
    }
    // this.$selfConfirm('确定要充值吗？', '是', '否', (res: string) => {
      // this.$router.push('/chongzhisucc')
    const self = this
    wxPay({ itemNo: this.userInfo.itemNo, money: iNum }).then((res: any) => {
      // self.$router.push('/chongzhisucc/' + i_num + '/' + res.datas.sn)
      WeixinJSBridge.invoke(
        'getBrandWCPayRequest',
        res.datas.wxConfig,
        (res2: any) => {
          // alert(res2.err_msg)
          let result = res2.err_msg.split(':');
          result = result[result.length - 1];
          if ( result === 'ok' ) {
            self.$router.push('/chongzhisucc/' + iNum + '/' + res.datas.sn)
          } else {
            alert('充值失败');
            // _self.close()
          }
        })
    })
    // })
  }
}

</script>
<style lang="scss" scoped>
@function pm($pt) {
  @return $pt / 37.5 + rem
}
.content{
  height: 100%;
  .block{
    background: white;
    padding: 0.5rem 0 0 0;
  }
  .block2{
    margin: 0.5rem 0;
    display: flex;
    padding: 0 pm(17);
    line-height: pm(50);
    height: pm(50);
    .text{
      font-size: pm(16);
      color: #4C4C4C;
    }
    .tnum{
      flex: 1;
      text-align: right;
      color: #F48015;
      font-size: pm(18);
    }
  }
  .userInfo{
    margin: 0 auto 0.6rem auto;
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
  .iptitle{
    margin: 0.3rem 0 0 pm(17);
    font-size: pm(13);
  }
  .prices{
    display: flex;
    padding: 0.2rem pm(17) 0.5rem pm(17);
    border-bottom: 1px solid #E8E8E8;
    justify-content: space-between;
    .item{
      width: pm(76);
      height: pm(42);
      background: white;
      border-radius: pm(4);
      border: 1px solid #48BCAB;
      font-size: pm(17);
      color: #48BCAB;
      line-height: pm(46);
      text-align: center;
    }
    .selPric{
      background: #48BCAB;
      color: white;
      border: none;
      height: pm(44);
      width: pm(78);
    }
  }
  .selfPrice{
    padding: 0.2rem pm(17) 0.5rem pm(17);
    display: flex;
    font-size: pm(17);

    >*{
      align-self: center;
    }
    input{
      // width: pm(221);
      flex: 1;
      border: 1px solid #48BCAB;
      border-radius: pm(4);
      color: #48BCAB;
      line-height: pm(34);
      height: pm(34);
      padding: 0 pm(16);
    }
    .sub{
      background: #48BCAB;
      border-radius: pm(4);
      width: pm(78);
      height: pm(36);
      color: white;
      margin-left: 0.3rem;
      line-height: pm(36);
      text-align: center;
    }
  }
  .largeBtn{
    margin-top: 0.8rem;
  }
}
</style>
