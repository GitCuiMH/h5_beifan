<template>
  <div class="content">
    <div v-if="pageData.length === 0 && bAjax" class="empty">
      <img src="https://cdncollege.quansuwangluo.com/image/hospital/emptyIcon.png" alt="">
      <div class="des">没有查询到挂号信息</div>
    </div>
    <div v-if="pageData.length > 0 && bAjax" v-for="(item, index) in pageData" :key="index" class="tlist" @click="gopage(index)">
      <img :src="item.status === 1 ? 'https://cdncollege.quansuwangluo.com/image/hospital/se.png' : 'https://cdncollege.quansuwangluo.com/image/hospital/undo.png'" class="checkIcon" alt="">
      <div class="litem">
        <div class="sid">{{ '预约挂号成功' }}</div>
        <div class="contitle">{{ item.inspectName }}</div>
        <div class="stime">{{ item.DeptName + ' | ' + item.DoctorName }}</div>
      </div>
      <div :class="{ czNUM: item.PayType === '充值' }" class="mNumber">
        <div class="ttime">就诊时间</div>
        <div class="time">{{ item.RegDate + ' ' + item.SessionName }}</div>
        <!-- <div class="time">{{ item.SessionName }}</div> -->
      </div>
    </div>
    <div v-if="pageData.length > 0 && bAjax" class="allload">- 已全部加载 -</div>
  </div>
</template>

<script lang="ts">
import { getRegList } from '@/api/hospital'
import { Component, Vue } from 'vue-property-decorator';
import Cookies from 'js-cookie'
import { Mutation,
  namespace } from 'vuex-class'
const userModule = namespace('user')
@Component({
})
export default class GRecord extends Vue {
  @userModule.Mutation('TOGGLE_GHINFOS') private toggleDetail: any
  private bAjax: boolean = false
  private userInfo: any = JSON.parse(Cookies.get('user') as string)
  private pageData: any[] = []
  private mounted(): void {
    document.title = '挂号记录'
    const tempData = {
      itemType: parseInt(this.$route.params.itemType, 10),
      itemNo: this.$route.params.itemNo
    }
    getRegList({ itemNo: this.userInfo.itemNo }).then((res: any) => {
      this.pageData = res.datas
      this.bAjax = true
    })
  }
  private gopage(index: number): void {
    this.toggleDetail(this.pageData[index].id)
    this.$router.push('/hdetail')
  }
}

</script>
<style lang="scss" scoped>
@function pm($pt) {
  @return $pt / 37.5 + rem
}
.content{
  height: 100%;
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
  .tlist{
    min-height: pm(91);
    margin-bottom: 0;
    +.tlist{
      border-top: 1px solid #E8E8E8;
    }
    .contitle{
      font-size: pm(16);
    }
    .stime{
      color: #9B9B9B;
    }
    .sid{
      font-size: pm(17);
      color: #48BCAB;
    }
    .czNUM{
      color: #F48015;
    }
  }
  .mNumber{
    margin-right: 0.1rem;
    .ttime{
      color: #4C4C4C;
      font-size: pm(14);
    }
    .time{
      font-size: pm(12);
      color: #9B9B9B;
      // width: pm(68);
    }
  }
  .empty{
    img{
      width: pm(184);
      margin: 2rem pm(95) 0 pm(95);
    }
    .des{
      font-size: pm(17);
      color: #4C4C4C;
      text-align: center;
      margin: 0.5rem auto 0.8rem auto;
    }
  }
  .czNUM{
    color: #F48015;
  }
  .tlist{
    padding: 0 pm(14) 0 pm(19);
  }
  .checkIcon{
    width: pm(21);
    height: pm(21);
    margin-right: pm(13);
  }
  .allload{
    margin-top: 0.5rem;
  }
}

</style>
