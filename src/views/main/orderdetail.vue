<template>
  <div class="containers">
    <div class="search">
      <img src="../../assets/index/searchIcon.png" alt="">
      <input class="reinput" type="text" placeholder="点击输入内容" v-model.trim="searchkey" @keyup.enter="search">
    </div>
    <div class="tabbar">
      <div class="item" :class="{active:tabIdx === 0}" @click="toggleTab(0)">全部</div>
      <div class="item" :class="{active:tabIdx === 1}" @click="toggleTab(1)">待付款</div>
      <div class="item" :class="{active:tabIdx === 2}" @click="toggleTab(2)">待收货</div>
      <div class="item" :class="{active:tabIdx === 3}" @click="toggleTab(3)">已完成</div>
      <div class="item" :class="{active:tabIdx === 4}" @click="toggleTab(4)">退款/售后</div>
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
          <img src="../../assets/image/timeg.png" alt="" class="icon"/>
          <span class="date">{{it.time.substring(0, 10)}}</span>
          <span>{{it.time.substring(11, 16)}}</span>
        </div>
        <div class="infos">
          <img :src="it.pic" alt=""/>
          <div class="info">
            <span class="title">{{it.goodsname}}</span>
            <span class="num">数量：{{it.num}}</span>
          </div>
          <div class="price">实付：<span>￥{{it.price}}</span></div>
        </div>
        <div class="btns">
          <div class="alert">{{it.stauts == 0 ? '等待您的付款' : ''}}</div>
          <div v-if="it.status == 0" class="del bt">取消订单</div>
          <div v-if="it.status == 3" class="del bt">删除订单</div>
          <div v-if="it.status == 0" class="pay bt">去支付</div>
          <div v-if="it.status == 1" class="pay bt">确认收货</div>
          <div v-if="it.status == 3" class="pay bt">退款/售后</div>
          <div v-if="it.status == 2" class="desc">订单已完成</div>
        </div>
      </div>
    </van-list>
  </div>
</template>
<script lang="ts">
import { getSelfInfo } from '@/api/hospital'
import { Component, Vue } from 'vue-property-decorator';
import Cookies from 'js-cookie'
@Component({
})
export default class MyOrder extends Vue {
  private searchkey: string = ''
  private tabIdx: number = 0
  private loading: boolean = false
  private finished: boolean = false
  private page: number = 1
  private pageData: any = {
  }
  private list: any[] = [{
    time: '2019-10-11 13:44:55',
    pic: '',
    goodsname: '据说是商品',
    num: 3,
    price: '999.9',
    status: 0
  }, {
    time: '2019-10-11 13:44:55',
    pic: '',
    goodsname: '据说是商品',
    num: 3,
    price: '999.9',
    status: 1
  }, {
    time: '2019-10-11 13:44:55',
    pic: '',
    goodsname: '据说是商品',
    num: 3,
    price: '999.9',
    status: 2
  }, {
    time: '2019-10-11 13:44:55',
    pic: '',
    goodsname: '据说是商品',
    num: 3,
    price: '999.9',
    status: 3
  }]
  private mounted(): void {
    document.title = '我的订单'
    this.tabIdx = parseInt(this.$route.params.idx, 10)
  }
  private save() {
    this.$router.goBack()
  }
  private search(): void {
    console.log(this.searchkey)
  }
  private toggleTab(idx: number): void {
    this.tabIdx = idx
  }
  private getData(p = 1) {
    // this.loading = true
    // getUserList({type: this.tabIndex, page: p, key: this.searchkey}).then((res: any) => {
    //   // console.log(res);
    //   this.loading = false
    //   if (p > 1) {
    //     this.datalist = this.datalist.concat(res.datas)
    //   } else {
    //     this.datalist = res.datas
    //   }
    //   if (this.datalist.length >= res.total) {
    //     this.finished = true
    //   }
    // })
  }
  private onLoad() {
    this.page++
    this.getData(this.page)
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
  .tabbar{
    display: flex;
    color: #434343;
    font-size: pm(13);
    border-radius: 0;
    background: white;
    margin-top: pm(9);
    height: pm(31);
    padding: 0 pm(10);
    .item{
      align-self: center;
      text-align: left;
      margin-right: .586667rem;
      // width: pm(66);
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
        border-bottom: 1px solid #DEDEDE;
        height: pm(31);
        .icon{
          @include wh(13, 13);
          margin-right: pm(6);
        }
        .date{
          flex: 1;
        }
      }
      .infos{
        height: pm(89);
        img{
          @include wh(73, 67);
          object-fit: cover;
          border-radius: pm(5);
          border: 1px solid red;
          margin-right: pm(9);
        }
        .info{
          flex: 1;
          height: 1.786667rem;
          display: flex;
          flex-direction: column;
          .title{
            flex: 1;
            color: #434343;
            font-size: pm(14);
          }
          .num{

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
          @include wh(70, 30);
          margin-left: .346667rem;
          color: white;
          line-height: .8rem;
          border-radius: pm(15);
          text-align: center;
        }
        .del{
          background: #434343;
        }
        .pay{
          background: $m;
        }
        .desc{

        }
      }
    }
  }
}
.search{
  width: 9.333333rem;
  height: .853333rem;
  margin: pm(9) auto 0 auto;
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
</style>

