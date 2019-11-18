<template>
  <div class="containers">
    <div class="sucicon">
      <img src="../../assets/image/successIcon.png" alt="" class="icon">
    </div>
    <div class="tth">提交成功</div>
    <div class="desc">您的出货信息已提交，我们会尽快给您处理，请耐心等待,关注公众号可获得最新消息
                        </div>
    <div class="addbtn">返回首页</div>
  </div>
</template>
<script lang="ts">
import { getSelfInfo } from '@/api/hospital'
import { Component, Vue } from 'vue-property-decorator';
import Cookies from 'js-cookie'
@Component({
})
export default class MsubSuc extends Vue {
  private pageData: any = {
  }
  private list: any[] = []
  private mounted(): void {
    document.title = '提交成功'
  }
  private save() {
    this.$router.goBack()
  }
}
</script>
<style lang="scss" scoped>
@import "~@/styles/utils.scss";
.containers{
  height: 100%;
  background: #F3F3F3;
  font-size: pm(13);
  
  .addbtn{
    margin-top: pm(68);
  }
}

</style>

