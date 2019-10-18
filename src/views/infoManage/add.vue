<template>
  <div class="content">
    <div class="iptitle">证件类型</div>
    <div class="selectsd" @click="showList">
      <div class="inputtext">{{ cardTypes[cardIndex].name }}</div>
      <div class="middleline"/>
      <div :style="iconStyle" class="rightIcon"></div>
    </div>
    <div class="iptitle">证件号码</div>
    <input v-model.trim="cardNumber" type="tel" class="inputtext" placeholder="请输入证件号码">
    <div class="iptitle">手机号码</div>
    <input v-model.trim="phoneNum" type="tel" class="inputtext" maxlength="11" placeholder="请输入手机号码">
    <!-- <div v-if="cardIndex === 0" class="iptitle">验证码</div>
    <input v-if="cardIndex === 0" v-model.trim="cardNumber" type="text" class="inputtext" placeholder="请输入验证号码"> -->
    <div class="iptitle tos">*请确保您填写的信息与医院登记的信息一致以便完成绑定.如您未在医院就诊过,请至医院建档后再在本平台绑卡</div>
    <div class="largeBtn" @click="addUser">添加</div>
    <div :class="{noborder: !bShowList}" :style="cardStyle" class="options">
      <div v-for="(item, index) in cardTypes" :key="index" class="opitme" v-text="item.name" @click="selOptions(index)"/>
    </div>
  </div>
</template>

<script lang="ts">
import { addUser } from '@/api/hospital'
import { Component, Vue } from 'vue-property-decorator';
import { Mutation,
  namespace } from 'vuex-class'
const userModule = namespace('user')
@Component({
})
export default class Add extends Vue {
  private bShowList: boolean = false
  @userModule.Mutation('TOGGLE_USERLISTS') private toggleDetail: any
  private userNum: number = 5
  private phoneNum: string = ''
  private cardIndex: number = 1
  private cardNumber: string = ''
  private pageData: any[] = []
  private cardStyle: any = {
    height: '0'
  }
  private iconStyle: any = {
    transform: 'rotateZ(0deg)'
  }
  private cardTypes: any[] = [
    {
      itemType: 11,
      name: '二代身份证'
    },
    {
      itemType: 21,
      name: '院内诊疗卡'
    },
    // {
    //   itemType: 12,
    //   name: '港澳居民身份证'
    // },
    // {
    //   itemType: 13,
    //   name: '台湾居民身份证'
    // },
    // {
    //   itemType: 14,
    //   name: '护照'
    // },
    // {
    //   itemType: 22,
    //   name: '社保卡'
    // },
    // {
    //   itemType: 23,
    //   name: '医保卡'
    // },
    // {
    //   itemType: 24,
    //   name: '区域健康卡'
    // }
  ]
  private mounted(): void {
    document.title = '添加就诊人'
    // this.$toast('系统升级中')
  }
  private selOptions(idx: number): void {
    this.bShowList = !this.bShowList
    this.cardIndex = idx
    this.cardStyle = {
      height: '0rem'
    }
    this.iconStyle = {
      transform: 'rotateZ(0deg)'
    }
  }
  private addUser(): void {
    // this.$toast('系统升级中')
    // return
    if (!this.cardNumber) {
      this.$toast('请输入证件号码')
      return
    }
    // 手机号正则匹配
    const reg = /^1[3|4|5|6|7|8|9][0-9]\d{4,8}$/
    if (this.phoneNum === '' || this.phoneNum.length !== 11 || !reg.test(this.phoneNum)) {
      this.$toast('请输入合法手机号码')
    }

    addUser({itemType: this.cardTypes[this.cardIndex].itemType, itemNo: this.cardNumber, Phone: this.phoneNum }).then((res: any) => {
      if (res.datas.length > 0 && this.cardIndex === 0) {
        this.toggleDetail(res.datas)
        this.$router.replace('/userList')
      } else {
        this.$toast(res.message)
        if (this.cardIndex !== 0) {
          this.$router.goBack()
        }
      }
    })
  }
  private showList(): void {
    this.bShowList = !this.bShowList
    this.cardStyle = {
      height: this.bShowList ? '2rem' : '0rem'
    }
    this.iconStyle = {
      transform: this.bShowList ? 'rotateZ(180deg)' : 'rotateZ(0deg)'
    }
  }
}

</script>
<style lang="scss" scoped>
@function pm($pt) {
  @return $pt / 37.5 + rem
}
.content{
  padding-top: 0.4rem;
  .selectsd{
    margin-top: 0.2rem;
    position: relative;
    .middleline{
      border-left: 1px solid #D8D8DA;
      height: pm(25);
      position: absolute;
      right: 1.5rem;
      width: 1px;
      top: pm(9.5);
    }
    .rightIcon{
      transition: all .5s cubic-bezier(0.5,0,.1,1);
      position: absolute;
      right: .7rem;
      top: pm(11);
      width: pm(18);
      height: pm(18);
      background: url(https://cdncollege.quansuwangluo.com/image/hospital/selectIcon.png) no-repeat;
      background-size: 100% 100%;
    }
  }
  .tos{
    margin: 0.2rem pm(15);
    text-align: justify;
  }
  .largeBtn{
    margin-top: 0.8rem;
  }
  .options{
    transition: all .25s cubic-bezier(0.5,0,.1,1);
    overflow: hidden;
    width: pm(321);
    position: absolute;
    background: white;
    z-index: 2;
    margin: 0 pm(15);
    padding: 0 pm(12);
    top: 2.43rem;
    border: 1px solid #D8D8DA;
    .opitme{
      color: #4C4C4C;
      font-size: pm(14);
      line-height: 1rem;
    }
  }
  .noborder{
    border-bottom: none;
    border-top: none;
  }
}
</style>
