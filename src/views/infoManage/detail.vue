<template>
  <div class="content">
    <div class="details">
      <div class="uinfos">
        <img class="avatar" src="https://cdncollege.quansuwangluo.com/image/hospital/default_avatar.png" alt="">
        <div class="infostextg">{{ pageData.patName + '   (' + pageData.patSex + '  ' + pageData.patAge +')' }}</div>
      </div>
      <div class="formbox">
        <div class="formDiv">
          <div class="kindname">诊疗卡类型</div>
          <div class="kindInfo">{{ pageData.patCardType }}</div>
        </div>
        <div class="formDiv">
          <div class="kindname">诊疗卡号</div>
          <div class="kindInfo">{{ pageData.patCardNo }}</div>
        </div>
        <div class="formDiv">
          <div class="kindname">证件类型</div>
          <div class="kindInfo">{{ pageData.patIdType }}</div>
        </div>
        <div class="formDiv">
          <div class="kindname">证件号码</div>
          <div class="kindInfo">{{ pageData.patIdNo }}</div>
        </div>
        <div class="formDiv">
          <div class="kindname">电话</div>
          <div class="kindInfo">{{ pageData.patMobile }}</div>
        </div>
        <div class="formDiv">
          <div class="kindname">出生日期</div>
          <div class="kindInfo">{{ pageData.patBirth }}</div>
        </div>
        <div class="formDiv">
          <div class="kindname">地址</div>
          <div class="kindInfo">{{ pageData.patAddress }}</div>
        </div>
      </div>
    </div>
    <div class="largeBtn" @click="delUser">解绑</div>
  </div>
</template>

<script lang="ts">
import { getUsersInfo, delUser } from '@/api/hospital'
import Cookies from 'js-cookie'
import { Component, Vue } from 'vue-property-decorator';
// interface IParams {
//   itemType: number,
//   itemNo: string
// }
@Component({
})
export default class Detail extends Vue {
  private pageData: any = {}
  private userInfo: any = JSON.parse(Cookies.get('user') as string)
  private mounted(): void {
    document.title = '就诊人信息'
    console.log(this.userInfo);
    const tempData = {
      // itemType: parseInt(this.userInfo.itemType, 10),
      // itemNo: this.userInfo.itemNo
      id: this.userInfo.id
    }
    this.getUsersInfo(tempData)
  }
  private getUsersInfo(param: any): void {
    getUsersInfo(param).then((res: any) => {
      this.pageData = res.datas
    })
  }
  private delUser() {
    this.$selfConfirm('确定要解除绑定吗？', '是', '否', (res: string) => {
      delUser({ id: this.userInfo.id }).then((ress: any) => {
        this.$toast(ress.message)
        this.$router.goBack()
        // const self = this
        // setTimeout(() => {
        //   self.$router.goBack()
        // }, 1000);
      })
    })
  }
}

</script>
<style lang="scss" scoped>
@function pm($pt) {
  @return $pt / 37.5 + rem
}
.content{
  .details{
    .uinfos{
      position: absolute;
      width: 100%;
      left: 0;
      top: 0.5rem;
      img{
        width: pm(65);
        height: pm(65);
        margin-left: pm(155);
      }
      .infostextg{
        text-align: center;
        color: #4C4C4C;
        font-size: pm(16);
      }
    }
    .formbox{
      width: pm(325);
      background: white;
      border-radius: pm(4);
      margin: 1.4rem auto 0.8rem auto;
      padding: 2.2rem pm(10) 0 pm(10);
    }
  }
  
}
</style>
