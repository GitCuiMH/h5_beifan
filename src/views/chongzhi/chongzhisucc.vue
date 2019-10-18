<template>
  <div class="content">
    <div class="userInfo">
      <img src="https://cdncollege.quansuwangluo.com/image/hospital/successIcon.png" alt="">
      <div class="uinfos">充值成功</div>
    </div>
    <div class="lfInofs">
      <div class="lfitem">
        <div class="title">充值金额</div>
        <div class="context">{{ $route.params.num + '元' }}</div>
      </div>
      <div class="lfitem">
        <div class="title">充值时间</div>
        <div class="context">{{ currentTime }}</div>
      </div>
      <div class="lfitem">
        <div class="title">订单号</div>
        <div class="context">{{ $route.params.sn }}</div>
      </div>
    </div>
    <div class="largeBtn" @click="goback">确定</div>
  </div>
</template>

<script lang="ts">
import { getUsers, setDefault } from '@/api/hospital'
import { formatTime } from '@/utils/validate'
import { getURLParams } from '@/utils/auth'
import Cookies from 'js-cookie'
import { Component, Vue } from 'vue-property-decorator';
@Component({
})
export default class ChongZhiSucc extends Vue {
  private currentTime: string = formatTime(new Date())
  private mounted(): void {
    document.title = '充值成功'
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
