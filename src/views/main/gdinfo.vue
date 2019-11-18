<template>
  <div class="containers">
    <div class="header">
      <div class="tt">我的余额</div>
      <div class="num">2342342</div>
      <div class="detail">
        <div class="out">支出： 2342</div>
        <div class="in">收入： 2342</div>
      </div>
      <div class="tixianbtn">
        <img src="../../assets/image/tixian.png" alt="" class="icon">
        <div class="tixian">提现</div>
        <div class="rightcon"></div>
      </div>
    </div>
    <div class="opts">
      <van-dropdown-menu>
        <van-dropdown-item class="mrpm" @change='dpchange' v-model="dpIndex" :options="dplist" />
      </van-dropdown-menu>
      <van-dropdown-menu>
        <van-dropdown-item @change='dpchange2' v-model="dpIndex2" :options="dplist2" />
      </van-dropdown-menu>
      <!-- <div class="all">账单日期</div>
      <div class="updown"></div>
      <div class="all">交易类型</div>
      <div class="updown"></div> -->
    </div>
    <van-list
      class="list"
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <div class="item" v-for="(it, idx) in list" :key="idx">
        <img :src="it.avatar" alt="" class="avatar">
        <div class="details">
          <div class="infos">
            <div class="target">{{it.content}}</div>
            <div class="num">￥{{it.num}}</div>
          </div>
          <div class="optb">
            <div class="time">{{it.time.substring(0, 10)}}</div>
            <div class="desc">二维码收款</div>
          </div>
        </div>
      </div>
    </van-list>
  </div>
</template>
<script lang="ts">
import { getSelfInfo } from '@/api/hospital'
import { Component, Vue } from 'vue-property-decorator';
import Cookies from 'js-cookie'
import { dateList, dkind } from '@/utils/mainData'
@Component({
})
export default class ZdList extends Vue {
  private dpIndex: number = 0
  private dpIndex2: number = 0
  private loading: boolean = false
  private finished: boolean = false
  private page: number = 1
  private dplist: any = dateList
  private dplist2: any = dkind
  private pageData: any = {
  }
  private list: any[] = [{
    avatar: '',
    content: '提现到',
    time: '2019-10-10 10:10:10',
    num: '223'
  }, {
    avatar: '',
    content: '提现到',
    time: '2019-10-10 10:10:10',
    num: '223'
  }, {
    avatar: '',
    content: '提现到',
    time: '2019-10-10 10:10:10',
    num: '223'
  }, {
    avatar: '',
    content: '提现到',
    time: '2019-10-10 10:10:10',
    num: '223'
  }, {
    avatar: '',
    content: '提现到',
    time: '2019-10-10 10:10:10',
    num: '223'
  }, {
    avatar: '',
    content: '提现到',
    time: '2019-10-10 10:10:10',
    num: '223'
  }, {
    avatar: '',
    content: '提现到',
    time: '2019-10-10 10:10:10',
    num: '223'
  }, {
    avatar: '',
    content: '提现到',
    time: '2019-10-10 10:10:10',
    num: '223'
  }, {
    avatar: '',
    content: '提现到',
    time: '2019-10-10 10:10:10',
    num: '223'
  }, {
    avatar: '',
    content: '提现到',
    time: '2019-10-10 10:10:10',
    num: '223'
  }, {
    avatar: '',
    content: '提现到',
    time: '2019-10-10 10:10:10',
    num: '223'
  }]
  private mounted(): void {
    document.title = '账单细节'
  }
  private dpchange() {
    console.log(this.dpIndex);
  }
  private dpchange2() {
    console.log(this.dpIndex2);
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
  .header{
    margin: pm(13) pm(10);
    background: url('../../assets/image/tixianbk.png') no-repeat;
    background-size: 100% 100%;
    height: pm(131);
    padding: 0 pm(9) 0 pm(17);
    color: white;
    font-size: pm(14);
    position: relative;
    .tt{
      margin-top: pm(19);
    }
    .num{
      margin-top: pm(9);
      font-size: pm(31);
    }
    .detail{
      margin-top: pm(18);
      display: flex;
      justify-content: space-between;
    }
    .tixianbtn{
      position: absolute;
      right: 0;
      top: pm(52);
      color: white;
      font-size: pm(12);
      display: flex;
      >*{
        align-self: center;
      }
      .icon{
        @include wh(12, 13);
        margin-right: pm(5);
        margin-top: pm(-2);
      }
      .rightcon{
        border-top: 1px solid white;
        border-right: 1px solid white;
        transform: rotateZ(45deg);
        margin: 0 pm(9) 0 pm(11);
        @include wh(7,7);
      }
    }
  }
  .opts{
    height: pm(42);
    display: flex;
    background: white;
    font-size: pm(12);
    color: #2F2F2F;
    padding: 0 pm(10) 0 pm(10);
    >*{
      align-self: center;
    }
    .mrpm{
      margin-right: pm(22);
    }
    .all{
      margin-right: pm(7);
    }
    .updown{
      border-top: 1px solid #2F2F2F;
      border-right: 1px solid #2F2F2F;
      transform: rotateZ(135deg);
      margin: 0 pm(22) 0 0;
      @include wh(5,5);
    }
  }
  .list{
    flex: 1;
    overflow: scroll;
    padding: pm(10) 0 pm(30) 0;
    color: #434343;
    font-size: pm(12);
    .item{
      margin: pm(13) pm(10) 0 pm(10);
      height: pm(59);
      padding: pm(10) pm(15) pm(10) pm(3);
      background:rgba(255,255,255,1);
      box-shadow:0px pm(2) pm(10) 0px rgba(174,185,190,0.7);
      border-radius:pm(10);
      display: flex;
      .avatar{
        @include wh(49, 49);
        border-radius: 50%;
        margin-right: pm(5);
        border: 1px solid red;
      }
      .details{
        flex: 1;
        border-bottom: 1px solid #DEDEDE;
        display: flex;
        justify-content: space-between;
        .infos{
          color: #111111;
          .target{
            font-size: pm(14);
            margin: pm(5) 0 pm(1) 0;
          }
          .num{
            font-size: pm(18);
          }
        }
        .optb{
          .time{
            color: #888888;
            font-size: pm(13);
            margin: pm(7) 0 pm(6) 0;
          }
          .desc{
            @include wh(74, 23);
            background: $m;
            border-radius: pm(12);
            color: white;
            text-align: center;
            line-height: pm(23);
          }
        }
      }
    }
  }
}

</style>

