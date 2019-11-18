<template>
  <div class="containers">
    <div class="baseInfo">
      <div class="item">
        <div class="text">收货人：</div>
        <input type="text" class="reinput" placeholder="请填写姓名" v-model="pageData.name"/>
      </div>
      <div class="item">
        <div class="text">联系电话：</div>
        <input type="text" class="reinput" placeholder="请填写联系电话" v-model="pageData.name"/>
      </div>
      <div class="item" @click="chooseAddr">
        <div class="text">配送地址：</div>
        <input type="text" disabled @click="chooseAddr" class="reinput" placeholder="请选择省、市、区" v-model="pageData.addr"/>
        <!-- <div class="addr">{{pageData.addr}}</div> -->
      </div>
    </div>
    <div class="dtaddr">
      <textarea class="reinput" name="" placeholder="请填写详细地址(街道、楼牌号等)" v-model="pageData.addr"></textarea>
    </div>
    <div class="dtaddr2" @click="save">
      设为默认地址
    </div>
    <van-popup v-model="showAddr" custom-class position="bottom" @close="onClose">
      <van-area :area-list="areaList" @confirm="confirm"/>
    </van-popup>
  </div>
</template>
<script lang="ts">
import { getSelfInfo } from '@/api/hospital'
import { Component, Vue } from 'vue-property-decorator';
import { getURLParams } from '@/utils/auth'
import { areaList } from '@/utils/address'
import Cookies from 'js-cookie'
import { State,
  namespace } from 'vuex-class'
const userModule = namespace('user')
@Component({
})
export default class EditAddr extends Vue {
  @userModule.State('addrInfo') private addrInfo: any
  private showAddr: boolean = false
  private areaList: any = areaList
  private pageData: any = {
    name: '请选择省、市、区',
    mobile: '',
    addr: '',
    default: 0
  }
  private list: any[] = []
  private mounted(): void {
    document.title = '修改资料'
    if (this.$route.params.id) {
      this.pageData = this.addrInfo
    }
    console.log(this.$route.params.id, this.addrInfo);
  }
  private save() {
    this.$router.goBack()
  }
  private chooseAddr() {
    this.showAddr = true
  }
  private onClose() {
    this.showAddr = false
  }
  private confirm(e: any) {
    this.pageData.addr = Array.from(e, (i: any) => i.name).join(' ')
    this.onClose()
  }
}
</script>
<style lang="scss" scoped>
@import "~@/styles/utils.scss";
.containers{
  height: 100%;
  background: #F3F3F3;
  .baseInfo{
    @include wh(355, 160);
    background: white;
    border-radius: pm(15);
    margin: pm(11) auto;
    display: flex;
    flex-direction: column;
    .item{
      flex: 1;
      display: flex;
      font-size: pm(15);
      padding: 0 pm(12);
      +.item{
        border-top: 1px solid #DEDEDE;
      }
      >*{
        align-self: center;
      }
      .text{
        color: #2F2F2F;
      }
      .reinput, .addr{
        flex: 1;
        text-align: right;
      }
    }
  }
  .dtaddr{
    background: white;
    // @include wh(355, 81);
    margin: 0 pm(10);
    padding: pm(24) pm(11);
    border-radius: pm(13);
    font-size: pm(15);
    textarea{
      width: 100%;
      height: 1.333333rem;
    }
  }
  .dtaddr2{
    background: white;
    margin: pm(10) pm(10);
    padding: pm(14) pm(11);
    border-radius: pm(10);
    font-size: pm(15);

  }
}
</style>

