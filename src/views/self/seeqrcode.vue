<template>
  <div class="containers">
    <div class="cobox">
      <img :src="userInfo.qrcode" alt="" class="qrcode">
    </div>
    <div class="addbtn" @click="$router.goBack()">返回</div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Mutation,
  namespace } from 'vuex-class'
const userModule = namespace('user')
@Component({
})
export default class SQrCode extends Vue {
  @userModule.State('userInfo') private userInfo: any;
  private mounted(): void {
    document.title = '查看二维码'
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
  background: $m;
  .cobox{
    margin: pm(57) auto;
    @include wh(354, 354);
    background: white;
    display: flex;
    box-shadow:0px 1px 15px 0px rgba(0, 0, 0, 0.3);
    .qrcode{
      @include wh(297, 297);
      margin: 0 auto;
      align-self: center;
      // border: 1px solid red;
    }
  }
}
.addbtn{
  background: white;
  color: #2A2A2A;
  width: pm(342);
  margin-top: pm(90);
  font-size: pm(15);
}
</style>

