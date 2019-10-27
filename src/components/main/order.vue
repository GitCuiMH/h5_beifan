<template>
  <div class="conbox">
    <search @search="search"></search>
    <div class="tabbar">
      <div class="item" :class="{active:tabIdx === 0}" @click="toggleTab(0)">全部</div>
      <div class="item" :class="{active:tabIdx === 1}" @click="toggleTab(1)">待处理</div>
      <div class="item" :class="{active:tabIdx === 2}" @click="toggleTab(2)">已处理</div>
      <div class="item" :class="{active:tabIdx === 3}" @click="toggleTab(3)">退款/售后</div>
      <div class="item" style="flex: 1"></div>
      <div class="item2">
        <img src="../../assets/image/catlogo.png" alt="" class="icon">选择日期
      </div>
    </div>
    <div class="list">
      <div class="orderitem boxshadow" v-for="(it, idx) in list" :key="idx">
        <div class="tt">
          {{it.goodsname}}
          <!-- <img src="../../assets/image/timeg.png" alt="" class="icon"/>
          <span class="date">{{it.time.substring(0, 10)}}</span>
          <span>{{it.time.substring(11, 16)}}</span> -->
        </div>
        <div class="infos">
          <img :src="it.pic" alt=""/>
          <div class="info">
            <span class="title">{{it.goodsname}}</span>
            <span class="num">时间：{{it.time.substring(0, 10)}}</span>
            <span class="num">数量：{{it.num}}</span>
            <span class="num">￥{{it.price}}</span>
          </div>
          <div class="price">
            <div class="btns">
              <div v-if="it.status == 1" class="pay bt">接单发货</div>
              <div v-if="it.status == 3" class="pay bt">退款/售后</div>
              <div v-if="it.status == 2" class="desc">订单完成</div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import search from '@/components/search.vue'
@Component({
  components: {
    search
  }
})
export default class Order extends Vue {
  private tabIdx: number = 0
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
    private search(e: string): void {
      this.$emit('search', e)
    }
    private toggleTab(idx: number): void {
      this.tabIdx = idx
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
    padding: 0 pm(10);
    .item{
      align-self: center;
      text-align: left;
      margin-right: .586667rem;
      // width: pm(66);
    }
    .icon{
      @include wh(13,13);
      margin-right: pm(5);
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
    padding-bottom: pm(30);
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
          border: 1px solid red;
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
      }
    }
  }
}

</style>
