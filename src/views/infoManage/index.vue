<template>
  <div class="content">
    <div v-if="pageData.length === 0" class="empty">
      <img src="https://cdncollege.quansuwangluo.com/image/wdhis/emptyIcon.png" alt="">
      <div class="des">您还没有添加就诊人</div>
      <div class="largeBtn" @click="addUser">添加就诊人</div>
    </div>
    <div v-else class="list">
      <div v-for="(item, index) in pageData" :key="index" class="item" @click="godetail(index)">
        <img src="https://cdncollege.quansuwangluo.com/image/hospital/default_avatar.png" class="avatar" alt="">
        <div class="infos">
          <div class="name">{{ item.name }}</div>
          <div class="info">{{ item.itemName + '  ' + item.itemNo }}</div>
        </div>
        <div class="rightIcon"/>
      </div>
      <div v-if="pageData.length < 5" class="item">
        <img src="https://cdncollege.quansuwangluo.com/image/hospital/addUser.png" class="avatar" alt="">
        <div class="infos" @click="addUser">
          <div class="name">添加就诊人</div>
          <div class="info">还可以添加{{ 5 - pageData.length }}人</div>
        </div>
        <div class="rightIcon"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { getUsers } from '@/api/hospital'
import { getURLParams } from '@/utils/auth'
import Cookies from 'js-cookie'
import { Component, Vue } from 'vue-property-decorator';
@Component({
})
export default class InfoManage extends Vue {
  private userNum: number = 5
  private bAjax: boolean = false
  private pageData: any[] = []
  private mounted(): void {
    switch (parseInt(this.$route.params.type, 10)) {
      case 0:
        document.title = '就诊人管理'
        break;
      default:
        document.title = '选择就诊人'
        break;
    }
    if (Cookies.get('x_tk')) {
    } else if (getURLParams().x_tk) {
      Cookies.set('x_tk', getURLParams().x_tk, { expires: 3.33 })
    } else {
      if (parseInt(this.$route.params.type, 10) === 5) {
        window.location.href = 'http://wlhis.qs110.com/api/wechat/login/type/5?ss=2&deptCode=' + getURLParams().deptCode + '&doctorCode=' + getURLParams().doctorCode
        // console.log('http://gthis.qs110.com//api/wechat/login/type/5?ss=2&deptCode=' + getURLParams().deptCode + '&doctorCode=' + getURLParams().doctorCode);
      } else {
        window.location.href = 'http://wlhis.qs110.com/api/wechat/login/type/' + this.$route.params.type
      }
      return
    }
    getUsers('').then((response: any) => {
      this.pageData = response.datas
      this.bAjax = true
    })
  }
  private addUser(): void {
    this.$router.push('/add')
  }
  private godetail(index: number): void {
    Cookies.set('user', JSON.stringify(this.pageData[index]), { expires: 3.33 })
    if (this.$route.params.type) {
      if (parseInt(this.$route.params.type, 10) === 5) {
        this.$router.push('/doctorDetail?ss=2&deptCode=' + getURLParams().deptCode + '&doctorCode=' + getURLParams().doctorCode)
      } else {
        this.$router.push('/' + this.$route.params.type)
      }
    }
    // switch (parseInt(this.$route.params.type, 10)) {
    //   case 0:
    //     this.$router.push('/detail/' + this.pageData[index].itemType + '/' + this.pageData[index].itemNo + '/' + this.pageData[index].id)
    //     break;
    //   case 1:
    //     this.$router.push('/jiaofei/' + this.pageData[index].itemType + '/' + this.pageData[index].itemNo)
    //     break;
    //   case 2:
    //     this.$router.push('/chongzhi/' + this.pageData[index].itemNo)
    //     break;
    //   case 3:
    //     this.$router.push('/guahao')
    //     break;
    //   case 4:
    //     this.$router.push('/checkResult/' + this.pageData[index].itemNo)
    //     break;
    //   case 5:
    //     this.$router.push('/doctorDetail?ss=2&deptCode=' + getURLParams().deptCode + '&doctorCode=' + getURLParams().doctorCode)
    //     break;
    // }
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
      .rightIcon{
        margin-right: 0.5rem;
      }
    }
  }
</style>
