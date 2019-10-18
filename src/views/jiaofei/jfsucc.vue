<template>
  <div class="content">
    <div class="userInfo">
      <img src="https://cdncollege.quansuwangluo.com/image/hospital/successIcon.png" alt="">
      <div class="uinfos">支付成功</div>
    </div>
    <div class="lfInofs">
      <div class="lfitem">
        <div class="title">支付项目</div>
        <div class="context">{{ jfInfo.payName }}</div>
      </div>
      <div class="lfitem">
        <div class="title">充值金额</div>
        <div class="context">{{ formatPrice(jfInfo.selfAmt) + '元' }}</div>
      </div>
      <div class="lfitem">
        <div class="title">充值时间</div>
        <div class="context">{{ currentTime }}</div>
      </div>
      <!-- <div class="lfitem">
        <div class="title">订单号</div>
        <div class="context">23423</div>
      </div> -->
    </div>
    <div class="largeBtn" @click="goback">确定</div>
  </div>
</template>

<script lang="ts">
import { getUsers, setDefault } from '@/api/hospital'
import { getURLParams } from '@/utils/auth'
import { formatTime } from '@/utils/validate'
import { State,
  namespace } from 'vuex-class'
const userModule = namespace('user')
import { Component, Vue } from 'vue-property-decorator';
@Component({
})
export default class Jfsucc extends Vue {
  @userModule.State('jiaofeiinfo') private jfInfo: any
  private currentTime: string = formatTime(new Date())
  private mounted(): void {
    document.title = '充值成功'
  }
  private formatPrice(price: string): string {
    return (parseInt(price, 10) / 100).toFixed(2)
  }
  private goback(): void {
    this.$router.replace('/self')
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
    margin: 1.4rem;
    text-align: center;
    img{
      width: pm(48);
    }
    .uinfos{
      color: #48BCAB;
      font-size: pm(16);
    }
  }
}
</style>
