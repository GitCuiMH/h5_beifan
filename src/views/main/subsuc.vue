<template>
  <div class="containers">
    <div class="sucicon">
      <img src="../../assets/image/successIcon.png" alt="" class="icon">
    </div>
    <div class="tth">提交成功</div>
    <div class="desc">您的出货信息已提交，我们会尽快给您处理，请耐心等待,关注公众号可获得最新消息
                        </div>
    <div class="addbtn" @click="$router.replace('/')">返回首页</div>
  </div>
</template>
<script lang="ts">
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
  text-align: center;
  padding-top: pm(96);
  .sucicon{
    display: flex;
    justify-content: space-around;
    .icon{
      @include wh(88, 88);
    }
  }
  .tth{
    color: #181818;
    font-size: pm(24);
    margin: pm(10) auto pm(15) auto;
  }
  .desc{
    color: #858585;
    font-size: pm(14);
    margin: pm(5) pm(95);
  }
  .addbtn{
    margin-top: pm(68);
  }
}

</style>

