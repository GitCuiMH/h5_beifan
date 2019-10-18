<template>
  <div class="content">
    <div class="formbox">
      <div class="formDiv">
        <div class="kindname">医生姓名</div>
        <div class="kindInfo">{{ docInfos.doctorName }}</div>
      </div>
      <div class="formDiv">
        <div class="kindname">医生职称</div>
        <div class="kindInfo">{{ docInfos.doctorTitle }}</div>
      </div>
      <div class="formDiv">
        <div class="kindname">就诊科室</div>
        <div class="kindInfo">{{ docInfos.ZhenShiMC }}</div>
      </div>
      <div class="formDiv">
        <div class="kindname">就诊时段</div>
        <div class="kindInfo aColor">{{ docInfos.time }}</div>
      </div>
    </div>
    <div class="formbox formbox2">
      <div class="formDiv">
        <div class="kindname">等待人数</div>
        <div class="kindInfo">{{ docInfos.dnum }}</div>
      </div>
      <div class="formDivs">
        <div class="fdtitle">就诊人</div>
        <div class="detail">
          <img src="https://cdncollege.quansuwangluo.com/image/hospital/default_avatar.png" class="avatar" alt="">
          <div class="infos">
            <div class="name">{{ userInfo.name }}</div>
            <div class="cardnum">{{ userInfo.itemName + ' ' + userInfo.itemNo }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="largeBtn" @click="gopage">确认挂号</div>
  </div>
</template>

<script lang="ts">
import { doReg } from '@/api/hospital'
import { Component, Vue } from 'vue-property-decorator';
import Cookies from 'js-cookie'
import { State,
  Mutation,
  namespace } from 'vuex-class'
const userModule = namespace('user')
@Component({
})
export default class HDetail extends Vue {
  @userModule.Mutation('TOGGLE_GHINFOS') private toggleDetail: any
  @userModule.State('docInfos') private docInfos: any
  private userInfo: any = JSON.parse(Cookies.get('user') as string)
  private bAjax: boolean = false
  private pageData: any = {}
  private mounted(): void {
    document.title = '挂号确认'
    if (!this.docInfos.time) {
      this.$router.goBack()
    }
  }
  private gopage(): void {
    const temp = {
      Name: this.userInfo.name,
      itemNo: this.userInfo.itemNo,
      RegDate: this.docInfos.time.substring(0, 10),
      time: this.docInfos.time,
      DeptName: this.docInfos.ZhenShiMC,
      DeptCode: this.docInfos.deptCode,
      SessionName: this.docInfos.time.substring(this.docInfos.time.length - 2),
      DoctorName: this.docInfos.doctorName,
      DoctorCode: this.docInfos.doctorCode,
      RankName: this.docInfos.doctorTitle,
      bindID: this.userInfo.id,
      num: this.docInfos.dnum
    }
    doReg(temp).then((res: any) => {
      this.toggleDetail(res.datas)
      this.$router.push('/hdetail')
    })
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
  .details{
    background: white;
    padding: pm(15);
    .resultTitle{
      color: #48BCAB;
      font-size: pm(17);
      margin-bottom: 0.3rem;
    }
    .boxs{
      background: #D9FFF9;
      border-radius: pm(4);
      padding: 0.2rem 0;
    }
    .formbox1{
      margin: 0 pm(15);
      padding: 0.2rem pm(0) 0.2rem pm(0);
      display: flex;
      justify-content: space-between;
      
      text-align: center;
      > *{
        align-self: center;
      }
      .fbox{
        width: 1.8rem !important;
      }
      .formDivBox{
        width: 1.5rem;
        font-size: pm(15);
        color: #48BCAB;
      }
      .commo{
        color: #4C4C4C;
        font-size: pm(14);
      }
      +.formbox1+.formbox1{
        border-top: 1px solid #48BCAB;
      }
    }
  }
  .formDivs{
    border-top: 1px solid #E8E8E8;
    line-height: pm(25);
    .fdtitle{
      color: #4C4C4C;
      font-size: pm(14);
    }
    .detail{
      display: flex;
      .infos{
        margin-left: pm(8);
        color: #9B9B9B;
        font-size: pm(14);
      }
    }

  }
  .formbox2, .largeBtn{
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
  }
  .kindInfo{
    width: pm(140);
    padding: pm(10) 0;
  }
  .aColor{
    color: #F48015;
  }
}

</style>
