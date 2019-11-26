<template>
  <div class="conbox">
    <div class="uinfos">
      <img :src="userInfo.avatar" alt="" class="avatar"/>
      <div class="ginfos">
        <div class="name">{{userInfo.name ? userInfo.name : userInfo.nickname}}</div>
        <div class="infos">
          <div class="item">
            <img src="../../assets/sao/zs.png" alt="" class="icon">
            <span>{{lvList[parseInt(userInfo.level, 10) -1].lvname}}</span>
          </div>
          <div class="item">
            <img src="../../assets/sao/wechat.png" alt="" class="icon">
            <span>{{userInfo.nickname}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="tabbar">
      <div class="item" :class="{active:tabIdx === 9}" @click="toggleTab(9)">全部</div>
      <div class="item" :class="{active:tabIdx === 0}" @click="toggleTab(0)">待处理</div>
      <div class="item" :class="{active:tabIdx === 1}" @click="toggleTab(1)">已处理</div>
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
      <!-- <div class="orderitem boxshadow" v-for="(it, idx) in list" :key="idx" @click="$router.push('/mmanagerdtl/1')"> -->
        <div class="detail">
          <div class="name">{{it.name + '-' + lvList[parseInt(it.level, 10) - 1].lvname}}</div>
          <div class="desc">
            <div class="dd">{{it.desc}}</div>
            <div class="dd time">时间：{{it.time}}</div>
          </div>
        </div>
        <div class="btn" :class="{aldeal: it.status}">
          {{it.status ? '已处理' : '待处理'}}
        </div>
      </div>
    </van-list>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { dateList, lvList } from '@/utils/mainData'
import { getagList, getUserInfo } from '@/api/mainpage'
@Component({
})
export default class Mmanager extends Vue {
  private tabIdx: number = 9
  private loading: boolean = false
  private finished: boolean = false
  private page: number = 1
  private dpIndex: number = 0
  private dplist: any = dateList
  private lvList: any = lvList
  private userInfo: any = {
    level: 1
  }
  private list: any[] = []
  private mounted() {
    this.getData()
    document.title = '审核管理'
    getUserInfo({}).then((res: any) => {
      this.userInfo = res.datas
    })
  }
  private toggleTab(idx: number): void {
    this.tabIdx = idx
    this.finished = false
    this.page = 1
    this.getData()
  }
  private getData(p = 1) {
    this.loading = true
    getagList({status: this.tabIdx, page: p}).then((res: any) => {
      // console.log(res);
      this.loading = false
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

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "~@/styles/utils.scss";
.uinfos{
  @include wh(375, 145);
  @include bk('../../assets/image/shbk.png');
  display: flex;
  color: white;
  >*{
    align-self: center;
  }
  .avatar{
    margin-left: pm(10);
    @include wh(81, 81);
    border-radius: 50%;
    border: 3px solid #515151;
  }
  .ginfos{
    margin-left: pm(16);
    flex: 1;
    .name{
      font-size: pm(20);
      line-height: pm(30);
    }
    .infos{
      display: flex;
      .item{
        padding-right: pm(8);
        text-align: center;
        display: flex;
        font-size: pm(12);
        // justify-content: space-around;
        >*{
          align-self: center;
        }
        .icon{
          @include wh(15, 15);
          margin-right: pm(5);
        }
        +.item{
          border-left: 1px solid rgba(255, 255, 255, .6);
          padding-left: pm(11);
        }
      }
    }
  }
}
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
      padding: pm(18) pm(16) pm(18) pm(13);
      margin: pm(13) pm(10) 0 pm(10);
      display: flex;
      .detail{
        flex: 1;
        color: #434343;
        .name{
          font-size: pm(19);
        }
        .desc{
          margin-top:pm(8);
          display: flex;
          font-size: pm(14);
          .dd{
            min-width: pm(96);
          }
        }
      }
      .btn{
        @include wh(61, 26);
        background:rgba(255,174,0,1);
        border-radius:13px;
        font-size:pm(14);
        font-weight:400;
        text-align: center;
        line-height: pm(26);
        color:rgba(255,255,255,1);
      }
      .aldeal{
        background: #8FC31F;
      }
    }
  }
}

</style>
