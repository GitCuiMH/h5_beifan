<template>
  <div class="content">
    <div v-if="bAjax" class="list">
      <div class="item">
        <img src="https://cdncollege.quansuwangluo.com/image/hospital/avatar.png" class="avatar" alt="">
        <div class="infos">
          <div class="name">{{ pageData.doctorInfo.doctorName }}</div>
          <div class="info chapt">{{ pageData.doctorInfo.deptName }}</div>
          <div class="info">{{ pageData.doctorInfo.doctorTitle }}</div>
        </div>
        <div class="shoucang" @click="shoucang">
          <div :class="{ alCatch: pageData.is_collection }" class="guahao"/>
          <div class="sctext">{{ pageData.is_collection ? '已收藏' : '未收藏' }}</div>
        </div>
        <div class="shoucang" @click="qrcode">
          <div class="qrcode"/>
          <div class="sctext">{{ '二维码' }}</div>
        </div>
      </div>
      <div class="title">
        <div class="guahao" @click="toggleTab(true)">挂号</div>
        <div class="intro" @click="toggleTab(false)">介绍</div>
      </div>
      <div :style="ulStyle" class="underLine"/>
    </div>
    <div :style="conStyle" class="contDetail">
      <div v-if="bAjax" class="iguahao">
        <div class="current">{{ pageData.date[cuIndex].day }}</div>
        <!-- <div class="dates">
          <div class="weekly">
            <div v-for="(item, index) in pageData.date" :key="index" class="weeks">{{ weekNames[item.week] }}</div>
          </div>
          <div class="dately">
            <div v-for="(item, index) in pageData.date" :key="index" :class="{ cudate: cuIndex === index}" class="date" @click="getInfos(index)">{{ item.d }}</div>
          </div>
        </div> -->
        <div v-if="pageData.doctor.length > 0"  class="dcList">
          <div v-for="(it, idx) in pageData.doctor" :key="idx" class="dcItem" @click="gopage(idx)">
            <div class="dt">
              <div class="dctime">{{ it.SessionName }}</div>
              <div class="zhenshi">{{ it.ZhenShiMC }}</div>
            </div>
            <div class="dnum">{{ '等待人数：' + it.TotalRegFee }}</div>
            <div class="rightIcon"/>
          </div>
        </div>
        <div v-if="pageData.doctor.length === 0" class="empty">
          <img src="https://cdncollege.quansuwangluo.com/image/hospital/emptyIcon.png" alt="">
          <div class="des">暂无医生排班</div>
        </div>
      </div>
      <div :class="{ mlft: !bAjax }" class="iintro">
        <div class="ititle">擅长</div>
        <div v-if="bAjax" class="isintro">{{ pageData.doctorInfo.doctorIntrodution.length > 0 ? pageData.doctorInfo.doctorIntrodution : '暂无内容' }}</div> 
      </div>
    </div>
    <div v-if="showLayer" class="layer">
      <div class="layerBK" @click="closeLayer"/>
      <div :class='{anima: anim.enter, leave: anim.leave}' class="layerForm">
        <div class="dcName">{{ pageData.doctorInfo.doctorName + ' | ' + pageData.doctorInfo.doctorTitle }}</div>
        <div class="dcPosition">{{ pageData.doctorInfo.deptName }}</div>
        <img :src="qrcodeImg" alt="">
        <div class="qrcodeimg" v-show="false">
          <qrcode-vue :value="qrcodeUrl" size='200' level="H"></qrcode-vue>
        </div>
        <div class="des">长按二维码保存</div>
        <div class="saveBtn" @click="closeLayer">关闭</div>
      </div>
    </div>
    <!-- <a href="tel:13555555555">点击给我打电话</a> -->
  </div>
</template>

<script lang="ts">
import { getDoctorDetail, setCollection } from '@/api/hospital'
import { Component, Vue } from 'vue-property-decorator';
import { getURLParams } from '@/utils/auth'
import QrcodeVue from 'qrcode.vue'
import Cookies from 'js-cookie'
import { State,
  Mutation,
  namespace } from 'vuex-class'
const userModule = namespace('user')
@Component({
  components: {
    QrcodeVue
  }
})
export default class DoctorDetail extends Vue {
  private showLayer: boolean = false
  private qrcodeImg: string = ''
  private getqcode: boolean = false
  private qrcodeUrl: string = 'https://lanhuapp.com/web/?code=0019RUBr1Yldwo0caAAr1LBRBr19RUBm&state=#/item/project/board?pid=bf0eb80e-5794-4481-8010-faa76cdb29f9'
  private weekNames: string[] = [ '日', '一', '二', '三', '四', '五', '六']
  private bAjax: boolean = false
  private anim: any = {
    enter: true,
    leave: false
  }
  @userModule.State('docInfos') private docInfos: any
  @userModule.Mutation('TOGGLE_DOCINFO') private toggleDetail: any
  @userModule.State('introType') private introType: any
  private pageData: any = {}
  private userInfo: any = JSON.parse(Cookies.get('user') as string)
  private cuIndex: number = 0
  private bTab: boolean = true
  private ulStyle: any = {
    marginLeft: '2rem'
  }
  private conStyle: any = {
    transform: 0
  }
  private mounted(): void {
    document.title = '医生排班'
    // store 中无数据
    if (!this.docInfos.doctorCode) {
      // 链接取
      if (getURLParams().doctorCode) {
        // 链接有数据
        this.toggleDetail(getURLParams())
        this.getInfos()
      } else { // 链接取不到数据，store里没有数据  返回
        // this.$router.goBack()
      }
    } else {
      // stroe有数据
      this.getInfos()
    }
  }
  private updated() {
    if (this.getqcode) {
      const canvas = document.getElementsByTagName('canvas')[0]
      this.qrcodeImg = canvas.toDataURL('image/png')
      this.getqcode = false
    }
  }
  private qrcode(): void {
    this.qrcodeUrl = 'http://webapp.qs110.com/wlhis/index.html#/infoManage/5?ss=2&&deptCode=' + this.docInfos.deptCode + '&doctorCode=' + this.docInfos.doctorCode
    this.getqcode = true
    this.showLayer = true
    this.anim.leave = false
    this.anim.enter = true
    // console.log(new QRCode(document.getElementById('test')).makeCode('elText.value'))
  }
  private closeLayer(): void {
    const self = this
    self.anim.leave = true
    self.anim.enter = false
    setTimeout(() => {
      self.showLayer = false
    }, 400)
  }
  private getInfos(index: number = -1) {
    this.cuIndex = index !== -1 ? index : 0
    getDoctorDetail({ itemNo: this.userInfo.itemNo, RegDate: index >= 0 ? this.pageData.date[index].day : '', DeptCode: this.docInfos.deptCode, DoctorCode: this.docInfos.doctorCode }).then((res: any) => {
      this.pageData = res.datas
      this.bAjax = true
    })
  }
  private toggleTab(mark: boolean): void {
    this.bTab = mark
    this.ulStyle = {
      marginLeft: !this.bTab ? '7rem' : '2rem'
    }
    this.conStyle = {
      transform: !this.bTab ? 'translateX(-50%)' : 'translateX(-0)'
    }
  }
  private gopage(index: number) {
    const temp = this.docInfos
    temp.doctorName = this.pageData.doctorInfo.doctorName
    temp.doctorTitle = this.pageData.doctorInfo.doctorTitle
    temp.ZhenShiMC = this.pageData.doctor[index].ZhenShiMC
    temp.time = this.pageData.date[this.cuIndex].day + ' 星期' + this.weekNames[this.pageData.date[this.cuIndex].week] + ' ' + this.pageData.doctor[index].SessionName
    temp.dnum = this.pageData.doctor[index].TotalRegFee
    this.toggleDetail(temp)
    this.$router.push('/hconfirm')
    // console.log(this.docInfos);
  }
  private shoucang(): void {
    setCollection({ deptCode: this.pageData.doctorInfo.deptCode, doctorCode: this.pageData.doctorInfo.doctorCode }).then((res: any) => {
      this.pageData.is_collection = !this.pageData.is_collection
      this.$toast(res.message)
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
  overflow-y: scroll;
  overflow-x: hidden;
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
    background: white;
    .item{
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
      .guahao, .qrcode{
        background-size: 100% 100% !important;
        background: url(https://cdncollege.quansuwangluo.com/image/hospital/unstar.png) no-repeat;
        border-radius: pm(4);
        color: white;
        width: pm(28);
        height: pm(28);
        margin-left: pm(4);
      }
      .alCatch{
        background: url(https://cdncollege.quansuwangluo.com/image/hospital/star.png) no-repeat;
      }
      .qrcode{
        background: url(https://cdncollege.quansuwangluo.com/image/hospital/qrcode.png) no-repeat;
      }
      + .item{
        border-top: 1px solid #E8E8E8;
      }
    }
    
  }
  .avatar{
    width: pm(54);
    height: pm(54);
  }
  .chapt{
    font-size: pm(14) !important;
  }
  .info{
    font-size: pm(12);
  }
  .shoucang{
    margin-right: pm(15);
  }
  .sctext{
    color: #9B9B9B;
    margin-top: pm(5);
    font-size: pm(12);
  }
  .title{
    display: flex;
    justify-content: space-around;
    font-size: pm(16);
    color: #4C4C4C;
  }
  .underLine{
    width: pm(40);
    height: pm(2);
    background: #4DB5AA;
    margin-top: pm(12);
    transition: all .45s cubic-bezier(0.5,0,.1,1);
  }
  .contDetail{
    margin-top: pm(16);
    width: 200%;
    transition: all .3s cubic-bezier(0.5,0,.1,1);
    >div{
      float: left;
      width: 50%;
      background: white;
    }
    .iguahao{
      color: #4C4C4C;
      font-size: pm(16);
      .current{
        border-bottom: 1px solid #E8E8E8;
        line-height: pm(42);
        padding-left: pm(15);
      }
      .dates{
        line-height: pm(40);
        padding-bottom: pm(18);
        border-bottom: 1px solid #E8E8E8;
        >div{
          display: flex;
          justify-content: space-around;
        }
        .dately{
          >div{
            width: pm(40);
            height: pm(40);
            text-align: center;
          }
        }
        .cudate{
          background: #4DB5AA;
          border-radius: 50%;
          color: white;
        }
      }
      .dcList{
        padding-left: pm(15);
        .dcItem{
          padding-right: pm(15);
          display: flex;
          font-size: pm(16);
          height: pm(67);
          >*{
            align-self: center;
          }
          .dt{
            flex: 1;
          }
          .dnum{
            margin-right: pm(15);
            color: #F48015;
          }
          +.dcItem{
            border-top: 1px solid #E8E8E8;
          }
        }
      }
    }
    .iintro{
      >div{
      }
    }
    .mlft{
      margin-left: 50%;
    }
    .ititle{
      padding: pm(15) pm(13) pm(5) pm(13);
      color: #4C4C4C;
      font-size: pm(16);
    }
    .isintro{
      padding: pm(1) pm(13) pm(10) pm(13);
      color: #9B9B9B;
      font-size: pm(14);
    }
  }
}
.layer, .layerBK{
  position: absolute;
  z-index: 10;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  display: flex;
  
}
.layerBK{
  position: absolute;
  background: rgba(0, 0, 0, 0.3);
}
.layerForm{
  background: white;
  padding: 0.5rem 0.9rem;
  width: 6.2rem;
  border-radius: pm(4);
  position: relative;
  z-index: 100;
  margin: 0 auto;
  align-self: center;
  .dcName{
    font-size: pm(16);
  }
  .dcPosition{
    margin-top: 0.3rem;
    font-size: pm(14);
    color: #9B9B9B;
  }
  img{
    margin: 0.35rem 0.35rem 0 0.35rem;
    width: 5.5rem;
  }
  .qrcodeimg{
    margin: 0.5rem auto 0 auto;
    width: pm(200);
  }
  .des{
    font-size: pm(12);
    color: #F48015;
    text-align: center;
  }
  .saveBtn{
    border: 1px solid #4DB5AA;
    border-radius: pm(4);
    height: 1.2rem;
    line-height: 1.2rem;
    text-align: center;
    color: #4DB5AA;
    font-size: pm(16);
    margin: 0.3rem 0;
  }
}
</style>

