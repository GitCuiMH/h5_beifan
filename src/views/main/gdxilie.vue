<template>
  <div class="containers">
    <div class="search">
      <img src="../../assets/index/searchIcon.png" alt="">
      <input class="reinput" type="text" placeholder="点击输入内容" v-model.trim="searchkey" @keyup.enter="search">
    </div>
    <div class="header">
      <div class="item2" :class="{active:tabIdx === idx}" @click="toggleTab(idx)" v-for="(it, idx) in tabDatas" :key="idx">{{it.title}}</div>
    </div>
    <div class="contentbox">
      <div v-if="tabDatas.length" class="target">
        <van-sidebar v-model="activeKey" @change="tabChange">
          <van-sidebar-item :title="it.title" v-for="it in tabDatas[tabIdx].child" :key="it.id"/>
        </van-sidebar>
      </div>
      <!-- <div class="dtllist"> -->
        <van-list
          class="list"
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <div class="orderitem" v-for="(it, idx) in list" :key="idx" @click="$router.push('/mgdinfo/' + it.id)">
            <img :src="('http://beifan.400539.com' + it.thumb)" alt="" class="pic"/>
            <div class="text">{{it.title}}</div>
          </div>
        </van-list>
      <!-- </div> -->
    </div>
    
  </div>
</template>
<script lang="ts">
import { getCate, getGdList } from '@/api/mainpage'
import { Component, Vue } from 'vue-property-decorator';
import Cookies from 'js-cookie'
@Component({
})
export default class MxiaDan extends Vue {
  private searchkey: string = ''
  private tabIdx: number = 0
  private activeKey: number = 0
  private loading: boolean = false
  private finished: boolean = false
  private page: number = 1
  private tabDatas: any[] = []
  private pageData: any = {
  }
  private list: any[] = []
  private mounted(): void {
    document.title = '产品系列'
    getCate({}).then((res: any) => {
      this.tabDatas = res.datas
      this.tabChange(0)
    })
  }
  private save() {
    this.$router.goBack()
  }
  private search(): void {
    // console.log(this.searchkey)
    this.finished = false
    this.page = 1
    this.getData()
  }
  private toggleTab(idx: number): void {
    this.tabIdx = idx
  }
  private getData(p = 1) {
    this.loading = true
    console.log(this.tabDatas[this.tabIdx].child[this.activeKey].id);
    getGdList({key: this.searchkey, catid: this.tabDatas[this.tabIdx].child[this.activeKey].id, page: p}).then((res: any) => {
      this.loading = false
      if (p > 1) {
        this.list = this.list.concat(res.datas.data)
      } else {
        this.list = res.datas.data
      }
      if (this.list.length >= res.total) {
        this.finished = true
      }
    })
  }
  private onLoad() {
    if (this.list.length) {
      this.page++
      this.getData(this.page)
    }
  }
  private tabChange(idx: number) {
    this.page = 1
    this.getData(1)
  }
}
</script>
<style lang="scss" scoped>
@import "~@/styles/utils.scss";
.containers{
  height: 100%;
  // overflow: scroll;
  display: flex;
  flex-direction: column;
  background: #EEEEEE;
  .header{
    display: flex;
    color: #434343;
    font-size: pm(13);
    border-radius: 0;
    background: white;
    height: pm(47);
    justify-content: space-around;
    padding: 0 pm(40);
    .item2{
      align-self: center;
      text-align: center !important;
    }
    .active {
      position: relative;
      color: #242424;
      font-size: pm(16);
      &::after {
        position: absolute;
        left: 50%;
        bottom: -5px;
        content: "";
        width: pm(47);
        height: pm(2);
        margin-left: pm(-23);
        border-radius: 1px;
        background: $m;
      }
    }
  }
  .contentbox{
    flex: 1;
    display: flex;
    overflow: hidden;
    border-top: 1px solid #E5E5E5;
    .target{
      background: white;
      height: 100%;
      border-right: 1px solid #E5E5E5;
    }
  }
  .list{
    background: white;
    height: 100%;
    width: 100%;
    overflow: scroll;
    padding: pm(10) 0 pm(30) 0;
    color: #434343;
    font-size: pm(12);
    .orderitem{
      float: left;
      margin: pm(24) pm(5) pm(5) pm(5);
      @include wh(130, 100);
      .pic{
        @include wh(100, 70);
        margin-left: pm(15);
      }
      .text{
        text-align: center;
        color: #434343;
        font-size: pm(13);
        line-height: pm(23);
      }
    }
  }
}
.search{
  width: 9.333333rem;
  height: .853333rem;
  margin: pm(9) auto;
  display: flex;
  border-radius: .426667rem;
  background: white;
  > * {
    align-self: center;
  }
  img{
    margin: 0 pm(6.5) 0 .426667rem;
    width: .4rem;
    height: .426667rem;
  }
  input{
    flex: 1;
    color: black;
    font-size: pm(13);
  }
}
.van-sidebar-item{
  text-align: center;
  background: white;
}
.van-sidebar-item--select{
  border-color: transparent;
  color: $m;
}
.van-list__error-text, .van-list__finished-text, .van-list__loading {
  // float: left;
  clear: both !important;
  width: 100%;
}
</style>

