<template>
  <div class="content">
    <div v-if="pageData.length === 0" class="empty">
      <img src="https://cdncollege.quansuwangluo.com/image/hospital/emptyIcon.png" alt="">
      <div class="des">您还没有添加就诊人</div>
      <div class="largeBtn" @click="addUser">切换</div>
    </div>
    <div v-else class="list">
      <div v-for="(item, index) in pageData" :key="index" class="item" @click="checkUser(index)">
        <img :src="selIndex === index ? 'https://cdncollege.quansuwangluo.com/image/hospital/se.png' : 'https://cdncollege.quansuwangluo.com/image/hospital/uns.png'" alt="" class="checkIcon">
        <img src="https://cdncollege.quansuwangluo.com/image/hospital/default_avatar.png" class="avatar" alt="">
        <div class="infos">
          <div class="name">{{ item.name }}</div>
          <div class="info">{{ item.itemName + '  ' + item.itemNo }}</div>
        </div>
        <div class="rightIcon"/>
      </div>
      <div v-if="pageData.length < 5" class="item">
        <img src="" alt="" class="checkIcon">
        <img src="https://cdncollege.quansuwangluo.com/image/hospital/addUser.png" class="avatar" alt="">
        <div class="infos" @click="addUser">
          <div class="name">添加就诊人</div>
          <div class="info">还可以添加{{ 5 - pageData.length }}人</div>
        </div>
        <div class="rightIcon"/>
      </div>
      <div class="largeBtn" @click="switchUser">切换</div>
    </div>
  </div>
</template>

<script lang="ts">
import { getUsers, setDefault } from '@/api/hospital'
import { getURLParams } from '@/utils/auth'
import Cookies from 'js-cookie'
import { Component, Vue } from 'vue-property-decorator';
@Component({
})
export default class SwitchUsers extends Vue {
  private userNum: number = 5
  private pageData: any[] = []
  private selIndex: number = -1
  private mounted(): void {
    document.title = '切换就诊人'
    getUsers('').then((response: any) => {
      this.pageData = response.datas
      if (this.pageData.length) {
        const self = this
        this.pageData.forEach((it: any, idx: number) => {
          if (it.is_default) {
            self.selIndex = idx
          }
        })
      }
    })
  }
  private checkUser(index: number): void {
    this.pageData[index].is_default = 1
    this.selIndex = index
  }
  private addUser(): void {
    this.$router.push('add')
  }
  private switchUser(): void {
    setDefault({ id: this.pageData[this.selIndex].id }).then((res: any) => {
      this.$toast(res.message)
      Cookies.set('user', JSON.stringify(this.pageData[this.selIndex]), { expires: 3.33 })
      this.$router.goBack()
      // const self = this
      // setTimeout(() => {
      //   self.$router.goBack()
      // }, 1000);
    })
  }
  private godetail(index: number): void {
    // this.$router.push('detail/' + this.pageData[index].itemType + '/' + this.pageData[index].itemNo + '/' + this.pageData[index].id)
  }
}

</script>
<style lang="scss" scoped>
  @function pm($pt) {
    @return $pt / 37.5 + rem
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
  .list{
    margin: 0.6rem auto;
    width: pm(354);
    .item{
      background: white;
      display: flex;
      margin-bottom: 0.38rem;
      height: pm(78);
      border-radius: 0.03rem;
      >*{
        align-self: center;
      }
      img{
        margin: 0 pm(9);
      }
      .checkIcon{
        width: pm(21);
        height: pm(21);
      }
      .rightIcon{
        margin-right: 0.5rem;
      }
    }
  }
</style>
