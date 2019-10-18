<template>
  <div class="content">
    <div class="formbox">
      <div class="detailInfo">
        <div class="header">
          <img src="https://cdncollege.quansuwangluo.com/image/hospital/succ.png" alt="">
          <div class="infosd">
            <div class="texts">预约挂号成功</div>
            <div class="timesdf">{{ pageData.create_time }}</div>
          </div>
        </div>
        <!-- <div class="dcont">
          请就诊当日到相应科室分诊台或自助机进行取号， 并提前15分钟到挂号科室候诊，若取消预约，请于 就诊当天22:00之前操作。
        </div> -->
      </div>
      <div class="formDiv">
        <div class="kindname">就诊时段</div>
        <div class="kindInfo aColor">{{ pageData.time }}</div>
      </div>
    </div>
    <div class="formbox formbox2">
      <div class="formDiv">
        <div class="kindname">费用类型</div>
        <div class="kindInfo">{{ '预约挂号' }}</div>
      </div>
      <div class="formDiv">
        <div class="kindname">医院名称</div>
        <div class="kindInfo">{{ '武城县妇幼保健计划生育服务中心' }}</div>
      </div>
      <div class="formDiv">
        <div class="kindname">就诊科室</div>
        <div class="kindInfo">{{ pageData.DeptName }}</div>
      </div>
      <!-- <div class="formDiv">
        <div class="kindname">科室位置</div>
        <div class="kindInfo">{{ pageData.doctorName }}</div>
      </div> -->
      <div class="formDiv">
        <div class="kindname">医生名称</div>
        <div class="kindInfo">{{ pageData.DoctorName }}</div>
      </div>
      <div class="formDiv">
        <div class="kindname">医生职称</div>
        <div class="kindInfo">{{ pageData.RankName }}</div>
      </div>
      
    </div>
    <div class="formbox formbox2">
      <div v-if="docInfos.dnum" class="formDiv">
        <div class="kindname">等待人数</div>
        <div class="kindInfo">{{ docInfos.dnum }}</div>
      </div>
      <div class="formDiv">
        <div class="kindname">就诊人</div>
        <div class="kindInfo aColor">
          <div class="name">{{ userInfo.name }}</div>
          <div class="infos">{{ userInfo.itemName + ' ' + userInfo.itemNo }}</div>
        </div>
      </div>
    </div>
    <div class="formbox formbox2">
      <div class="formDiv">
        <div class="kindname">医院单号</div>
        <div class="kindInfo">{{ pageData.TranSerNo }}</div>
      </div>
      <div class="formDiv">
        <div class="kindname">平台单号</div>
        <div class="kindInfo">{{ pageData.sn }}</div>
      </div>
    </div>
    <!-- <div class="largeBtn" @click="pay">确认挂号</div> -->
  </div>
</template>

<script lang="ts">
import { getReg } from '@/api/hospital'
import { Component, Vue } from 'vue-property-decorator';
import Cookies from 'js-cookie'
import { State,
  namespace } from 'vuex-class'
const userModule = namespace('user')
@Component({
})
export default class ResultDetail extends Vue {
  @userModule.State('docInfos') private docInfos: any
  @userModule.State('guahaoInfos') private ghInfos: any
  private bAjax: boolean = false
  private userInfo: any = JSON.parse(Cookies.get('user') as string)
  private pageData: any = {}
  private mounted(): void {
    document.title = '挂号确认'
    // console.log(this.userInfo);
    if (this.ghInfos === -1) {
      this.$router.goBack()
    } else {
      getReg({ id: this.ghInfos }).then((res: any) => {
        this.bAjax = true
        this.pageData = res.datas
      })
    }
  }
  private pay(): void {
    const tempData = {
      itemNo: this.$route.params.itemNo,
      psOrdNum: '321564654',
      payAmt: '1'
    }
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
  .detailInfo{
    padding: 0 pm(10);
    border-bottom: 1px solid #E8E8E8;
    .header{
      display: flex;
      height: pm(70);
      >*{
        align-self: center;
      }
      >img{
        width: pm(34);
        height: pm(34);
      }
      .infosd{
        margin-left: pm(10);
        .texts{
          color: #4DB5AA;
          font-size: pm(16);
        }
        .timesdf{
          color: #4C4C4C;
          font-size: pm(14);
        }
      }
    }
    .dcont{
      color: #8A8A8A;
      font-size: pm(15);
      text-align: justify;
      padding-bottom: pm(18);
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
    width: pm(180);
    padding: pm(10) 0;
  }
  .aColor{
    color: #F48015;
  }
}

</style>
