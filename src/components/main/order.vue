<template>
  <div class="conbox">
    <search @search="search"></search>
    <div class="tabbar">
      <div class="item" :class="{active:tabIdx === 0}" @click="toggleTab(0)">全部</div>
      <div class="item" :class="{active:tabIdx === 1}" @click="toggleTab(1)">待处理</div>
      <div class="item" :class="{active:tabIdx === 2}" @click="toggleTab(2)">已处理</div>
      <div class="item" :class="{active:tabIdx === 3}" @click="toggleTab(3)">退货/售后</div>
      <div class="item" style="flex: 1"></div>
      <div class="item2">
        <img src="../../assets/image/catlogo.png" alt="" class="icon">
        <van-dropdown-menu>
          <van-dropdown-item class="mrpm" @change='dpchange' v-model="dpIndex" :options="dplist" />
        </van-dropdown-menu>
      </div>
    </div>
    <van-list
      class="list"
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <div class="orderitem boxshadow" v-for="(it, idx) in list" :key="idx">
        <div class="tt">
          {{it.product_name}}
          <!-- <img src="../../assets/image/timeg.png" alt="" class="icon"/>
          <span class="date">{{it.time.substring(0, 10)}}</span>
          <span>{{it.time.substring(11, 16)}}</span> -->
        </div>
        <div class="infos">
          <img :src="'http://beifan.400539.com' + it.product_img" alt=""/>
          <div class="info">
            <span class="title">{{it.product_name}}</span>
            <span class="num">时间：{{it.createtime.toString().substring(0, 10)}}</span>
            <span class="num">数量：{{it.product_num}}</span>
            <span class="num">￥{{it.amount}}</span>
          </div>
          <div class="price">
            <div class="btns">
              <div v-if="it.status == 10" class="pay bt" @click="getOrder(it)">接单发货</div>
              <div v-if="it.status == 10" class="pay bt yell" @click="temSend(it)">平台发货</div>
              <div v-if="it.status == 60" class="pay bt">退货/售后</div>
              <div v-if="it.status == 20" class="desc">订单完成</div>
            </div>
          </div>
        </div>
      </div>
    </van-list>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import search from '@/components/search.vue'
import { dateList, dkind } from '@/utils/mainData'
import { getagOrderList, df } from '@/api/mainpage'
@Component({
  components: {
    search
  }
})
export default class Order extends Vue {
  private tabIdx: number = 0
  private searchkey: string = ''
  private loading: boolean = false
  private finished: boolean = false
  private page: number = 1
  private dpIndex: number = 0
  private dplist: any = dateList
  private status: number[] = [-1, 10, 20, 60]
  private list: any[] = []
  private mounted() {
    this.getData()
  }
  private search(e: string): void {
    this.searchkey = e
    this.finished = false
    this.page = 1
    this.getData()
  }
  private toggleTab(idx: number): void {
    this.tabIdx = idx
    this.finished = false
    this.page = 1
    this.getData(this.page)
  }
  private getData(p = 1) {
    this.loading = true
    getagOrderList({status: this.status[this.tabIdx], page: p, key: this.searchkey, day: this.dpIndex}).then((res: any) => {
      // console.log(res);
      this.loading = false
      // res.datas.data = [1, 2]
      if (p > 1) {
        this.list = this.list.concat(res.datas.data)
      } else {
        this.list = res.datas.data
      }
      if (this.list.length >= res.datas.total) {
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
  private dpchange() {
    this.page = 1
    this.finished = false
    this.getData()
  }
  private getOrder(obj: any) {
    this.$router.push('/mchuhuo/' + obj.id)
  }
  private temSend(obj: any) {
    df({id: obj.id}).then((res: any) => {
      this.$toast(res.message)
      this.page = 1
      this.finished = false
      this.getData()
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "~@/styles/utils.scss";
.conbox{
  flex: 1;
  overflow: scroll;
  display: flex;
  flex-direction: column;
  background: white;
  .tabbar{
    display: flex;
    color: #434343;
    font-size: pm(13);
    border-radius: 0;
    background: white;
    margin-top: pm(9);
    height: pm(31);
    padding: 0 pm(18) 0 pm(10);
    .item{
      align-self: center;
      text-align: left;
      margin-right: .486667rem;
      // width: pm(66);
    }
    .icon{
      @include wh(13,13);
      // margin-right: pm(5);
    }
    .item2{
      align-self: center;
      display: flex;
      >*{
        align-self: center;
      }
    }
    .active {
      position: relative;
      // color: #003741;
      // font-weight: 700;
      &::after {
        position: absolute;
        left: 50%;
        bottom: -5px;
        content: "";
        width: pm(32);
        height: pm(2);
        margin-left: -0.426667rem;
        border-radius: 1px;
        background: $m;
      }
    }
  }
  .list{
    background: #F3F3F3;
    flex: 1;
    overflow: scroll;
    padding: pm(10) 0 pm(30) 0;
    color: #434343;
    font-size: pm(12);
    .orderitem{
      padding-bottom: pm(10);
      background: white;
      margin: pm(11) pm(10) 0 pm(10);
      >div{
        display: flex;
        padding: 0 pm(14) 0 pm(19);
        >*{
          align-self: center;
        }
      }
      .tt{
        color: #000000;
        font-size: pm(15);
        padding-top: pm(10);
      }
      .infos{
        height: pm(89);
        margin-top: pm(17);
        img{
          @include wh(87, 87);
          object-fit: cover;
          // border: 1px solid red;
          margin-right: pm(9);
        }
        .info{
          flex: 1;
          display: flex;
          height: 100%;
          flex-direction: column;
          .title{
            flex: 1;
            color: #434343;
            font-size: pm(14);
          }
          .num{
            flex: 1;
          }
        }
        .price{
          font-size: .346667rem;
          span{
            color: red;
          }
        }
      }
      .btns{
        font-size: pm(12);
        // margin-bottom: pm(10);
        .alert{
          flex: 1;
          color: $m;
        }
        .bt{
          @include wh(64, 23);
          margin-left: .346667rem;
          color: white;
          line-height: pm(23);
          border-radius: pm(12);
          text-align: center;
        }
        .del{
          background: #434343;
        }
        .pay{
          background: #8FC31F;
        }
        .desc{
          color: $m;
        }
        .yell{
          background: $m;
          margin-top: pm(5);
        }
      }
    }
  }
}

</style>
