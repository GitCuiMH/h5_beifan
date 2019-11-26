<template>
  <div class="containers">
    <div class="cjinfos">
      <div class="text">厂家信息：</div>
      <div class="name">{{gdInfo.user_name}}</div>
      <div class="name">{{gdInfo.user_mobile}}</div>
    </div>
    <div class="cjinfos">
      <div class="text">厂家地址：</div>
      <div class="cjaddr">{{gdInfo.province_name + ' ' + gdInfo.city_name + ' ' + gdInfo.district_name + ' ' + gdInfo.address}}</div>
    </div>
    <div class="linebk"></div>
    <div class="probox gdinfos">
      <img :src="'http://beifan.400539.com' + gdInfo.product_img" alt="">
      <div class="gdname">{{gdInfo.product_name}}</div>
    </div>
    <div class="probox boxshadow">
      <div class="title leftborder">换货信息</div>
      <div class="inputblock">
        物流编码：
        <input type="text" v-model.trim="infos.sn" class="reinput">
      </div>
      <div class="inputblock">
        换货说明：
        <input type="text" v-model.trim="infos.desc" class="reinput">
      </div>
      <div class="descbox">
        <div class="desc">
          <div class="tit">换货数量</div>
          <div class="con">最多可换{{gdInfo.product_num}}件</div>
        </div>
        <van-stepper v-model="infos.num" min="1" :max="gdInfo.product_num" />
      </div>
      <div class="addr">
        <div class="text">收货地址:</div>
        <div class="addrinfos">
          <div class="addrtext">{{gdInfo.user_name}}
            <span style="margin-left: 30px">{{gdInfo.user_mobile}}</span>
          </div>
          <div class="addrtext">{{gdInfo.province_name + ' ' + gdInfo.city_name + ' ' + gdInfo.district_name + ' ' + gdInfo.address}}</div>
        </div>
        <div class="rightIcon"></div>
      </div>
    </div>
    <div class="awbtn" @click="save">提交换货</div>
  </div>
</template>
<script lang="ts">
import { getOrderInfo, afterSale } from '@/api/mainpage'
import { Component, Vue } from 'vue-property-decorator';
import Cookies from 'js-cookie'
import { Mutation,
  namespace } from 'vuex-class'
const userModule = namespace('user')
@Component({
})
export default class ShouHou extends Vue {
  @userModule.State('addrInfo') private addrInfo: any
  @userModule.Mutation('SET_ADDRINFO') private setInfo: any
  private infos: any = {
    id: 0,
    num: 1,
    sn: '',
    desc: ''
  }
  private gdInfo: any = {
    user_name: '',
    user_mobile: '',
    product_tc: '',
  }
  private list: any[] = []
  private mounted(): void {
    document.title = '换货/售后'
    this.infos.id = this.$route.params.id
    getOrderInfo({id: this.$route.params.id}).then((res: any) => {
      this.gdInfo = res.datas
    })
  }
  private save() {
    if (!this.infos.sn) {
      this.$toast('请填写物流编码')
      return
    }
    afterSale(this.infos).then((res: any) => {
      this.$toast(res.message)
      setTimeout(() => {
        this.$router.goBack()
      }, 1000);
    })
  }
}
</script>
<style lang="scss" scoped>
@import "~@/styles/utils.scss";
.cjinfos{
  display: flex;
  padding: pm(19) 0 pm(4) pm(10);
  background: white;
  +.cjinfos{
    padding: pm(0) 0 pm(19) pm(10);
  }
  >*{
    align-self: center;
  }
  .name{
    color: #535353;
    +.name{
      margin-left: pm(35);
    }
  }
  .cjaddr{
    color: #535353;
    font-size: pm(12);
  }
}
.containers{
  height: 100%;
  background: #F3F3F3;
  color: #434343;
  overflow: scroll;
  font-size: pm(14);
  .reinput{
    flex: 1;
    margin-right: pm(15);
  }
  .addbtn{
    margin-top: pm(68);
  }
}

.probox{
  padding: pm(14) pm(16);
  background:rgba(255,255,255,1);
  width: pm(324);
  margin: 0 auto;
  // height: pm(112);
  .title{
    color: rgba(67, 67, 67, 1);
    font-size: .373333rem;
    padding-left: pm(5);
  }
}
.gdinfos{
  margin: pm(20) auto;
  display: flex;
  border-radius:.266667rem;
  img{
    @include wh(78, 78);
    // border: 1px solid red;
    margin-right: pm(13);
  }
  .gdname{
    flex: 1;
  }
}
.inputblock{
  margin-top: pm(13);
  padding-left: pm(11);
}
.descbox{
  margin-top: pm(17);
  display: flex;
  justify-content: space-between;
  >*{
    align-self: center;
  }
  .desc{
    .tit{
      color: #434343;
      font-size: pm(14);
    }
    .con{
      color: #FFAE00;
      font-size: pm(10);
    }
  }
}
.addr{
  margin-top: pm(17);
  padding-top: pm(17);
  color: #2B2B2B;
  border-top: 1px dashed #DCE4E5;
  display: flex;
  .addrinfos{
    flex: 1;
    margin-right: pm(19);
    .contac{
      display: flex;
      justify-content: space-between;
    }
  }
  .addrtext{
    flex: 1;
    // text-align: right;
    margin-left: pm(10);
    +.addrtext{
      margin-top: pm(4);
    }
  }
}
.awbtn{
  background: $m;
  color: white;
  height: pm(61);
  line-height: pm(61);
  text-align: center;
  font-size: pm(18);
  position: fixed;
  bottom: 0;
  width: 100%;
}
</style>

