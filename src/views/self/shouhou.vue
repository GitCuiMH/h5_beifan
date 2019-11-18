<template>
  <div class="containers">
    <div class="cjinfos">
      <div class="text">厂家信息：</div>
      <div class="name">王小二</div>
      <div class="name">23423423423</div>
    </div>
    <div class="cjinfos">
      <div class="text">厂家地址：</div>
      <div class="cjaddr">王小二厂家地址</div>
    </div>
    <div class="linebk"></div>
    <div class="probox gdinfos">
      <img src="" alt="">
      <div class="gdname">阿拉斯加地方垃圾水电费阿拉时代峻峰阿拉斯加地方垃圾水电费阿拉时代峻峰阿拉斯加地方垃圾水电费阿拉时代峻峰</div>
    </div>
    <div class="probox boxshadow">
      <div class="title leftborder">换货信息</div>
      <div class="inputblock">
        物流编码：
        <input type="text" class="reinput">
      </div>
      <div class="inputblock">
        换货说明：
        <input type="text" class="reinput">
      </div>
      <div class="descbox">
        <div class="desc">
          <div class="tit">换货数量</div>
          <div class="con">最多可换{{infos.num}}件</div>
        </div>
        <van-stepper v-model="infos.num" min="5" max="8" />
      </div>
      <div class="addr">
        <div class="text">收货地址222</div>
        <div class="addrinfos">
          <div class="addrtext">123123123</div>
          <div class="addrtext">地方阿斯顿发阿萨德发</div>
        </div>
        <div class="rightIcon"></div>
      </div>
    </div>
    <div class="awbtn">提交换货</div>
  </div>
</template>
<script lang="ts">
import { getSelfInfo } from '@/api/hospital'
import { Component, Vue } from 'vue-property-decorator';
import Cookies from 'js-cookie'
@Component({
})
export default class ShouHou extends Vue {
  private infos: any = {
    num: 5
  }
  private list: any[] = []
  private mounted(): void {
    document.title = '换货/售后'
  }
  private save() {
    this.$router.goBack()
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
    border: 1px solid red;
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
    text-align: right;
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

