<template>
  <div class="containers">
    <div class="list">
      <div class="item boxshadow" v-for="(it, idx) in list" :key="idx">
        <div class="header">
          <div class="name">收货人: {{it.name}}</div>
          <div class="num">{{it.mobile}}</div>
        </div>
        <div class="reinput">{{it.addr}}</div>
        <!-- <input type="text" class="reinput" placeholder="此处填写详细地址信息" v-model="it.addr"/> -->
        <div class="opts">
          <div class="default" :class="{df: it.default}" @click.stop="setDefault(idx)">
            <img v-if="it.default" src="../../assets/image/check.png" alt="" class="icon"/>
            <img v-else src="../../assets/image/uncheck.png" alt="" class="icon"/>默认地址
          </div>
          <div class="edit" @click.stop="edit(idx)">
            <img src="../../assets/image/edit.png" class="icon" alt=""/>编辑
          </div>
          <div class="edit" @click.stop="del(idx)">
            <img src="../../assets/image/del.png" class="icon" alt=""/>删除
          </div>
        </div>
      </div>
      <div class="forpos"/>
    </div>
    
    <div class="addbtn" @click="$router.push('/editaddr/0')">添加新地址</div>
  </div>
</template>
<script lang="ts">
import { getSelfInfo } from '@/api/hospital'
import { Component, Vue } from 'vue-property-decorator';
import { getURLParams } from '@/utils/auth'
import Cookies from 'js-cookie'
import { State,
  namespace } from 'vuex-class'
const userModule = namespace('user')
@Component({
})
export default class Proxy extends Vue {
  @userModule.Mutation('SET_ADDRINFO') private setInfo: any
  private pageData: any = {}
  private list: any[] = [{
    name: '二兴',
    mobile: '12343212345',
    addr: 'sdfasdfasd',
    default: 1,
  }, {
    name: '二兴',
    mobile: '12343212345',
    addr: 'asdfasdfaasss',
    default: 0,
  }, {
    name: '二兴',
    mobile: '12343212345',
    addr: 'asdfasdfaasss',
    default: 0,
  }, {
    name: '二兴',
    mobile: '12343212345',
    addr: 'asdfasdfaasss',
    default: 0,
  }, {
    name: '二兴',
    mobile: '12343212345',
    addr: 'asdfasdfaasss',
    default: 0,
  }, {
    name: '二兴',
    mobile: '12343212345',
    addr: 'asdfasdfaasss',
    default: 0,
  }, {
    name: '二兴',
    mobile: '12343212345',
    addr: 'asdfasdfaasss',
    default: 0,
  }, {
    name: '二兴',
    mobile: '12343212345',
    addr: 'asdfasdfaasss',
    default: 0,
  }, {
    name: '二兴',
    mobile: '12343212345',
    addr: 'asdfasdfaasss',
    default: 0,
  }, {
    name: '二兴',
    mobile: '12343212345',
    addr: 'asdfasdfaasss',
    default: 0,
  }]
  private mounted(): void {
    document.title = '收货地址'
  }
  private setDefault(idx: number): void {
    this.list.forEach((it) => {
      it.default = 0
    })
    this.list[idx].default = 1
  }
  private del(idx: number): void {
    this.list.splice(idx, 1)
  }
  private edit(idx: number): void {
    this.setInfo(this.list[idx])
    // this.$router.push('/editaddr/' + this.list[idx].id)
    this.$router.push('/editaddr/3')
  }
  private gopage(path: string) {
  }
}
</script>
<style lang="scss" scoped>
@import "~@/styles/utils.scss";
.containers{
  height: 100%;
  .list{
    height: 100%;
    overflow: scroll;
    padding-bottom: pm(30);
  }
  .item{
    margin: pm(10) pm(11) 0 pm(11);
    padding: pm(20) pm(13) pm(12) pm(13);
    .header{
      display: flex;
      justify-content: space-between;
      .name{
        color: #2F2F2F;
        font-size: pm(15);
      }
      .num{
        color: #2F2F2F;
        font-size: pm(14);
      }
    }
    .reinput{
      font-size: pm(13);
      line-height: 1rem;
    }
    .opts{
      border-top: 1px solid #D7D7D7;
      padding-top: pm(12);
      display: flex;
      font-size: pm(12);
      color: #2F2F2F;
      .default{
        flex: 1;
      }
      .df{
        color: $m;
      }
      .edit{
        width: pm(60);
      }
      .icon{
        @include wh(13, 13);
        float: left;
        margin-right: pm(4);
        margin-top: pm(1);
      }
    }
  }
  .forpos{
    height: pm(130);
  }
  .addbtn{
    position: absolute;
    bottom: pm(65);
    @include wh(227, 44);
    line-height: pm(44);
    color: white;
    text-align: center;
    font-size: pm(18);
    left: pm(74);
    background: $m;
    border-radius: pm(22);
  }
}
</style>

