<template>
  <div class="containers">
    <div class="item" @click="$router.push('/set')">
      <div class="text">防伪认证信息</div>
      <div class="forpos"></div>
      <div class="text2">{{gdindtl.fw_xx}}</div>
    </div>
    <div class="item" @click="alerts(1)">
      <div class="text">企业名称</div>
      <div class="forpos"></div>
      <div class="text2">{{gdindtl.fw_qy}}</div>
    </div>
    <div class="item" @click="alerts(2)">
      <div class="text">营业执照号码：</div>
      <div class="forpos"></div>
      <div class="text2">{{gdindtl.fw_yy}}</div>
    </div>
    <div class="item" @click="alerts(2)">
      <div class="text">企业地址：</div>
      <div class="forpos"></div>
      <div class="text2">{{gdindtl.fw_addr}}</div>
    </div>
    <!-- <div class="addbtn" @click="share">分享给好友</div> -->
    <div v-if="layer > 0" class="layer" @click="layerclose">
      <div class="layercontent"></div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Cookies from 'js-cookie'
import { State,
  namespace } from 'vuex-class'
const userModule = namespace('user')
@Component({
})
export default class Setting extends Vue {
  @userModule.State('gdindtl') private gdindtl: any
  private layer: number = 0;
  private mounted(): void {
    document.title = '防伪认证'
  }
  private save() {
    this.$router.goBack()
  }
  private share() {
    this.layer = 1
  }
  private layerclose() {
    this.layer = 0;
  }
}
</script>
<style lang="scss" scoped>
@import "~@/styles/utils.scss";
.containers{
  height: 100%;
  background: #F3F3F3;
  color: #333333;
  font-size: pm(13);
  .item{
    margin: pm(16) pm(10) 0 pm(10);
    // height: pm(44);
    display: flex;
    background:rgba(255,255,255,1);
    box-shadow:0px 2px 10px 0px rgba(174,185,190,0.7);
    border-radius: pm(10);
    color: #333333;
    padding: 0 pm(10) 0 pm(17);
    justify-content: space-between;
    font-size: pm(13);
    >*{
      align-self: center;
    }
    .text2{
      width: pm(220);
      padding: pm(10) 0;
      text-align: right;
    }
  }
}
.addbtn{
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  border-radius: 0;
}
</style>

