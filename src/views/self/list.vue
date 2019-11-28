<template>
  <div class="containers">
    <div class="header">
      <div class="tt">我的余额</div>
      <div class="num">{{pageData.all_money}}</div>
      <div class="detail">
        <div class="out">支出： {{pageData.zc}}</div>
        <div class="in">收入： {{pageData.sr}}</div>
      </div>
      <div class="tixianbtn" @click="$router.push('/chongzhi')">
        <img src="../../assets/image/czicon.png" alt="" class="icon">
        <div class="tixian">充值</div>
        <div class="rightcon"></div>
      </div>
      <div class="tixianbtn tixianbtn2" @click="$router.push('/stixian')">
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
        <!-- <img :src="it" alt="" class="avatar"> -->
        <div class="details">
          <div class="infos">
            <div class="target">{{it.desc}}</div>
            <div class="num">￥{{it.amount}}</div>
          </div>
          <div class="optb">
            <div class="time">{{it.createtime}}</div>
            <div class="desc">{{ststList[it.status]}}</div>
          </div>
        </div>
      </div>
    </van-list>
  </div>
</template>
<script lang="ts">
import { getAmount } from '@/api/mainpage'
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
  private ststList: string[] = ['消费', '收款', '提现', '退款', '返利']
  private dplist: any = dateList
  private dplist2: any = dkind
  private pageData: any = {
  }
  private list: any[] = []
  private mounted(): void {
    document.title = '账单细节'
    this.getData()
  }
  private dpchange() {
    console.log(this.dpIndex);
  }
  private dpchange2() {
    console.log(this.dpIndex2);
  }
  private getData(p = 1) {
    this.loading = true
    getAmount({page: p}).then((res: any) => {
      // console.log(res);
      this.pageData = res.datas
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
      top: pm(33);
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
    .tixianbtn2{
      top: pm(66);
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
        border: 1px solid red;
      }
      .details{
        margin-left: pm(5);
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

