<template>
  <div class="containers">
    <div class="header">
      <div class="all">全部</div>
      <div class="rightIcon downfront"></div>
      <!-- <div class="all">排序</div> -->
    </div>
    <div class="list">
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
      
    </div>
  </div>
</template>
<script lang="ts">
import { getSelfInfo } from '@/api/hospital'
import { Component, Vue } from 'vue-property-decorator';
import { getURLParams } from '@/utils/auth'
import { lvList } from '@/utils/mainData'
import Cookies from 'js-cookie'
@Component({
})
export default class Proxy extends Vue {
  private pageData: any = {}
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
  private gopage(path: string) {
  }
}
</script>
<style lang="scss" scoped>
@import "~@/styles/utils.scss";
.containers{
  height: 100%;
  display: flex;
  flex-direction: column;
  .header{
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
    flex: 1;
    padding-bottom: pm(30);
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
</style>

