<template>
  <div class="containers">
    <div class="search">
      <img src="../../assets/index/searchIcon.png" alt="">
      <input class="reinput" type="text" placeholder="点击输入内容" v-model.trim="searchkey" @keyup.enter="search">
    </div>
    <div class="header">
      <!-- <div class="all">全部</div>
      <div class="rightIcon downfront"></div> -->
      <van-dropdown-menu>
        <van-dropdown-item @change='dpchange' v-model="dpIndex" :options="dplist" />
      </van-dropdown-menu>
      <!-- <div class="all">排序</div> -->
    </div>
    <van-list
      class="list"
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <div class="item boxshadow" v-for="(it, idx) in list" :key="idx">
        <div class="name">{{it.name}} - {{lvlist[parseInt(it.lv, 10) - 1].lvname}}</div>
        <div class="detail">
          <img :src="it.avatar" alt="" class="avatar"/>
          <div class="sex" :class="{sex2: it.sex > 1}">{{it.sex > 1 ? '女' : '男'}}</div>
          <div class="wenum">
            <img src="../../assets/image/wechat.png" alt="" class="icon"/>微信号
            <div class="tt">
              {{it.wechat}}
            </div>
          </div>
          <div class="wenum">
            <img src="../../assets/image/timeicon.png" alt="" class="icon"/>入职时间
            <div class="tt">
              {{it.time}}
            </div>
          </div>
        </div>
      </div>
    </van-list>
  </div>
</template>
<script lang="ts">
import { getSelfInfo } from '@/api/hospital'
import { Component, Vue } from 'vue-property-decorator';
import { getURLParams } from '@/utils/auth'
import { lvList, sexs } from '@/utils/mainData'
import Cookies from 'js-cookie'
@Component({
})
export default class Proxy extends Vue {
  private pageData: any = {}
  private searchkey: string = ''
  private dpIndex: number = 0
  private loading: boolean = false
  private finished: boolean = false
  private page: number = 1
  private dplist: any = sexs
  private lvlist: any[] = lvList
  private list: any[] = [{
    name: '二兴',
    avatar: '',
    lv: 1,
    sex: 1,
    time: '2019-02-02',
    wechat: 'alsdjfss'
  }, {
    name: '二兴',
    avatar: '',
    lv: 3,
    sex: 2,
    time: '2019-02-02',
    wechat: 'alsdjfss'
  }, {
    name: '二兴',
    avatar: '',
    lv: 3,
    sex: 2,
    time: '2019-02-02',
    wechat: 'alsdjfss'
  }, {
    name: '二兴',
    avatar: '',
    lv: 3,
    sex: 2,
    time: '2019-02-02',
    wechat: 'alsdjfss'
  }, {
    name: '二兴',
    avatar: '',
    lv: 3,
    sex: 2,
    time: '2019-02-02',
    wechat: 'alsdjfss'
  }, {
    name: '二兴',
    avatar: '',
    lv: 3,
    sex: 2,
    time: '2019-02-02',
    wechat: 'alsdjfss'
  }, {
    name: '二兴',
    avatar: '',
    lv: 3,
    sex: 2,
    time: '2019-02-02',
    wechat: 'alsdjfss'
  }, {
    name: '二兴',
    avatar: '',
    lv: 3,
    sex: 2,
    time: '2019-02-02',
    wechat: 'alsdjfss'
  }, {
    name: '二兴',
    avatar: '',
    lv: 3,
    sex: 2,
    time: '2019-02-02',
    wechat: 'alsdjfss'
  }, {
    name: '二兴',
    avatar: '',
    lv: 3,
    sex: 2,
    time: '2019-02-02',
    wechat: 'alsdjfss'
  }]
  private mounted(): void {
    document.title = '我的代理'
  }
  private search(): void {
    console.log(this.searchkey)
  }
  private gopage(path: string) {
  }
  private dpchange() {
    console.log(this.dpIndex);
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
  display: flex;
  flex-direction: column;
  background: #F3F3F3;
  .header{
    background: white;
    margin-top: pm(10);
    height: pm(42);
    display: flex;
    // justify-content: space-between;
    font-size: pm(12);
    color: #666666;
    padding: 0 pm(15) 0 pm(26);
    >*{
      align-self: center;
    }
    .all{
      margin-right: pm(10);
    }
  }
  .list{
    padding: pm(10) 0 pm(30) 0;
    flex: 1;
    overflow: scroll;
    background: #F3F3F3;
    .item{
      @include wh(336, 73);
      background: white;
      margin: pm(10) auto 0 auto;
      padding: pm(14) 0 pm(7) pm(14);
      .name{
        color: #333333;
        font-size: pm(15);
      }
      .detail{
        display: flex;
        // margin-top: pm(8);
        >*{
          align-self: center;
        }
        .avatar{
          @include wh(51, 51);
          object-fit: cover;
          border-radius: 50%;
          border: 1px solid #6FBDF1;
        }
        .sex{
          @include wh(35, 21);
          background: #6FBDF1;
          border-radius: pm(11);
          color: white;
          font-size: pm(12);
          text-align: center;
          line-height: pm(21);
          margin: 0 pm(24) 0 pm(12);
        }
        .sex2{
          background: #F24C4B;
        }
        .wenum{
          border-left: 1px solid #F0EDF1;
          width: pm(91);
          text-align: left;
          padding-left: pm(13);
          font-size: pm(11);
          color: #4E4E4E;
          .icon{
            @include wh(12, 12);
            float: left;
            margin: 2px 4px 0 0;
          }
          .tt{
            color: #666666;
          }
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

