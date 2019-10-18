<template>
  <div class="content">
    <div v-if="pageData.length === 0" class="empty">
      <img src="https://cdncollege.quansuwangluo.com/image/hospital/emptyIcon.png" alt="">
      <div class="des">您还没有收藏的医生</div>
      <!-- <div class="largeBtn" @click="addUser">添加就诊人</div> -->
    </div>
    <div v-else class="list">
      <div v-for="(item, index) in pageData" :key="index" class="item" @click="gopage(index)">
        <img src="https://cdncollege.quansuwangluo.com/image/hospital/avatar.png" class="avatar" alt="">
        <div class="infos">
          <div class="name">{{ item.doctorName + ' | ' + item.doctorTitle }}</div>
          <div class="info">{{ item.deptName }}</div>
        </div>
        <div class="rightIcon"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { getCollection } from '@/api/hospital'
import { Component, Vue } from 'vue-property-decorator';
import { Mutation,
  namespace } from 'vuex-class'
const userModule = namespace('user')
@Component({
})
export default class Home extends Vue {
  @userModule.Mutation('TOGGLE_DOCINFO') private toggleDetail: any
  private pageData: any = {}
  private mounted(): void {
    document.title = '我的收藏'
    getCollection('').then((res: any) => {
      this.pageData = res.datas
    })
  }
  private gopage(index: number) {
    this.toggleDetail(this.pageData[index])
    this.$router.push('/doctorDetail')
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
  .list{
    .item{
      padding-right: 0.5rem;
      background: white;
      // margin-left: pm(14);
      display: flex;
      // margin-bottom: 0.38rem;
      height: pm(78);
      border-radius: 0.03rem;
      >*{
        align-self: center;
      }
      img{
        margin: 0 pm(9);
      }
      .guahao{
        background: #00B8AA;
        border-radius: pm(4);
        color: white;
        width: pm(44);
        height: pm(20);
        line-height: pm(20);
        font-size: pm(12);
        text-align: center;
        margin-right: pm(15);
      }
      + .item{
        border-top: 1px solid #E8E8E8;
      }
    }
    
  }
}
</style>

