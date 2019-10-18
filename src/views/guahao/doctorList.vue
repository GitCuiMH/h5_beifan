<template>
  <div class="content">
    <div class="list">
      <div v-for="(item, index) in pageData" :key="index" class="item" @click="gopage(index)">
        <img src="https://cdncollege.quansuwangluo.com/image/hospital/avatar.png" class="avatar" alt="">
        <div class="infos">
          <div class="name">{{ item.doctorName }}</div>
          <div class="info">{{ item.doctorTitle }}</div>
        </div>
        <div class="guahao" @click="gopage(index)">挂号</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { getDoctor } from '@/api/hospital'
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
    document.title = this.$route.params.name
    getDoctor({ deptCode: this.$route.params.deptCode }).then((res: any) => {
      this.pageData = res.datas.item
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
  .list{
    .item{
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

