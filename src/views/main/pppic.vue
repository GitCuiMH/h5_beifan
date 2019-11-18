<template>
  <div class="containers">
    <div class="baseInfo box1">
      <div class="item ">
        <div class="text">头像</div>
        <img src="../../assets/image/defavatar.png" alt="" class="avatar">
      </div>
    </div>
    <div class="baseInfo">
      <div class="item">
        <div class="text">用户名</div>
        <input type="text" class="reinput" placeholder="" v-model="pageData.name"/>
        <div class="rightIcon"></div>
      </div>
      <div class="item" @click="chooseAddr(1)">
        <div class="text">性别</div>
        <div class="span">{{pageData.sex === 1 ? '男' : '女'}}</div>
        <div class="rightIcon"></div>
      </div>
    </div>
    <div class="baseInfo box3">
      <div class="item">
        <div class="text">邮箱</div>
        <input type="text" class="reinput" placeholder="" v-model="pageData.name"/>
        <div class="rightIcon"></div>
      </div>
      <div class="item">
        <div class="text">手机号码</div>
        <input type="text" class="reinput" placeholder="" v-model="pageData.name"/>
        <div class="rightIcon"></div>
      </div>
      <div class="item" @click="chooseAddr(0)">
        <div class="text">地区</div>
        <div class="span">{{pageData.addr ? pageData.addr : '选择地区'}}</div>
        <div class="rightIcon"></div>
      </div>
    </div>
    <div class="addbtn" @click="save">确定</div>
    <van-popup v-model="showAddr" custom-class position="bottom" @close="onClose">
      <van-area v-if="!sexm" :area-list="areaList" @confirm="confirm"/>
      <div class="sex" @click="setSex(1)">男</div>
      <div class="sex" @click="setSex(2)">女</div>
    </van-popup>
  </div>
</template>
<script lang="ts">
import { getSelfInfo } from '@/api/hospital'
import { Component, Vue } from 'vue-property-decorator';
import { areaList } from '@/utils/address'

import Cookies from 'js-cookie'
@Component({
})
export default class Edit extends Vue {
  private showAddr: boolean = false
  private sexm: number = 0
  private areaList = areaList
  private pageData: any = {
    addr: '',
    sex: '男'
  }
  private list: any[] = []
  private mounted(): void {
    document.title = '修改资料'
  }
  private save() {
    this.$router.goBack()
  }
  private chooseAddr(mark: number) {
    this.sexm = mark
    this.showAddr = true
  }
  private setSex(mark: number) {
    this.pageData.sex = mark
    this.onClose()
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
  color: #333333;
  font-size: pm(13);
  
  .baseInfo{
    height: pm(91);
    background: white;
    border-radius: pm(15);
    margin: pm(11) pm(10);
    padding: 0 pm(16);
    display: flex;
    flex-direction: column;
    .item{
      +.item{
        border-top: 1px solid #DEDEDE;
      }
    }
  }
  .item{
    flex: 1;
    display: flex;
    height: pm(45);
    justify-content: space-between;
    font-size: pm(15);
    // padding: 0 pm(12);
    >*{
      align-self: center;
    }
    .text{
      color: #2F2F2F;
    }
    .span{
      flex: 1;
      text-align: right;
      margin-right: pm(11);
    }
    .reinput{
      flex: 1;
      text-align: right;
      margin-right: pm(11);
    }
  }
  .addbtn{
    position: absolute;
    bottom: pm(65);
  }
}
.avatar{
  @include wh(45, 45);
  border-radius: 50%;
}
.box1{
  height: pm(70) !important;
}
.box3{
  height: pm(136) !important;
}
.sex{
  height: pm(18);
  text-align: center;
  line-height: pm(40);
  height: pm(40);
  border-bottom: 1px solid #eeeeee;
}
</style>

