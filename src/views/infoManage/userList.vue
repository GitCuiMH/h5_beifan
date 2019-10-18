<template>
  <div class="content">
    <div class="list">
      <div v-for="(item, index) in pageData" :key="index" class="item" @click="checkUser(index)">
        <img :src="selIndex === index ? 'https://cdncollege.quansuwangluo.com/image/hospital/se.png' : 'https://cdncollege.quansuwangluo.com/image/hospital/uns.png'" alt="" class="checkIcon">
        <img src="https://cdncollege.quansuwangluo.com/image/hospital/default_avatar.png" class="avatar" alt="">
        <div class="infos">
          <div class="name">{{ item.patName }}</div>
          <div class="info">{{'院内诊疗卡 ' + item.patCardNo }}</div>
        </div>
        <div class="rightIcon"/>
      </div>
      <div class="largeBtn" @click="addUser">确定</div>
    </div>
  </div>
</template>

<script lang="ts">
import { addUser } from '@/api/hospital'
import { getURLParams } from '@/utils/auth'
import Cookies from 'js-cookie'
import { State,
  namespace } from 'vuex-class'
const userModule = namespace('user')
import { Component, Vue } from 'vue-property-decorator';
@Component({
})
export default class SwitchUsers extends Vue {
  @userModule.State('userList') private userList: any
  private userNum: number = 5
  private pageData: any[] = []
  private selIndex: number = -1
  private mounted(): void {
    document.title = '切换就诊人'
    console.log(this.userList)
    this.pageData = this.userList
    // getUsers('').then((response: any) => {
    //   this.pageData = response.datas
    //   if (this.pageData.length) {
    //     const self = this
    //     this.pageData.forEach((it: any, idx: number) => {
    //       if (it.is_default) {
    //         self.selIndex = idx
    //       }
    //     })
    //   }
    // })
  }
  private checkUser(index: number): void {
    this.pageData[index].is_default = 1
    this.selIndex = index
  }
  private addUser(): void {
    if (this.selIndex === -1) {
      this.$toast('请选择需要绑定的就诊人')
    } else {
      addUser({ itemType: '21', itemNo: this.pageData[this.selIndex].patCardNo, Phone: this.pageData[this.selIndex].patMobile }).then((res: any) => {
        this.$toast(res.message)
        this.$router.goBack()
      })
    }
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
