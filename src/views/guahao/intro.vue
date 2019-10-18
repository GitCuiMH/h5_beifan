<template>
  <div class="content">
    <div v-if="ajaxMark" class="box">
      <div class="infos">
        <div class="title">{{pageData.deptName}}</div>
        <div class="detali">
          <div class="dinfo">
            <div class="addr">地址：{{pageData.deptAddr}}</div>
            <div class="addr">科室电话：{{pageData.deptMobile}}</div>
          </div>
          <div class="tel">
            <img src="https://cdncollege.quansuwangluo.com/image/wdhis/tel.png" alt="">
            <a :href="'tel:' + pageData.deptMobile">拨打电话</a>
          </div>
        </div>
        <div class="tabs">
          <div class="item" :class="{ 'sel' : curIndex === 0}" @click="curIndex = 0">科室介绍</div>
          <div class="item" :class="{ 'sel' : curIndex === 1}" @click="curIndex = 1">科室医生</div>
        </div>
      </div>
      <div class="conbox">
        <div v-if="!curIndex" class="conhtml" v-html="pageData.deptDesc"></div>
        <div v-else class="list">
          <div v-for="(item, index) in pageData.doctor" :key="index" class="item" @click="gopage(index)">
            <img :src="'https://cdncollege.quansuwangluo.com/' + item.doctorAvatar" class="avatar" alt="">
            <div class="doc-infos">
              <div class="name">{{ item.doctorName }}</div>
              <div class="info">{{ item.doctorTitle }}</div>
            </div>
            <div class="rightIcon"/>
            <!-- <div class="guahao" @click="gopage(index)">挂号</div> -->
          </div>
        </div>
      </div>
      <!-- <div class="list">
        <div v-for="(item, index) in pageData" :key="index" class="item" @click="gopage(index)">
          <img src="https://cdncollege.quansuwangluo.com/image/hospital/avatar.png" class="avatar" alt="">
          <div class="infos">
            <div class="name">{{ item.doctorName }}</div>
            <div class="info">{{ item.doctorTitle }}</div>
          </div>
          <div class="guahao" @click="gopage(index)">挂号</div>
        </div>
      </div> -->
    </div>
    
  </div>
</template>

<script lang="ts">
import { getDeptInfo } from '@/api/hospital'
import { Component, Vue } from 'vue-property-decorator';
import { Mutation,
  namespace } from 'vuex-class'
const userModule = namespace('user')
@Component({
})
export default class Intro extends Vue {
  private pageData: any = {}
  @userModule.State('introType') private introType: any
  private curIndex: number = 0
  private ajaxMark: boolean = false
  private mounted(): void {
    this.curIndex = this.introType > 0 ? this.introType - 1 : this.introType
    document.title = '科室信息'
    getDeptInfo({ id: this.$route.params.id }).then((res: any) => {
      this.pageData = res.datas
      // console.log(this.pageData);
      this.ajaxMark = true
    })
  }
  private gopage(index: number) {
    this.$router.push('/docintro/' + this.pageData.doctor[index].id)
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
        object-fit: cover;
      }
      .doc-infos{
        flex: 1;
        .name{
          font-size: pm(16);
          font-weight:400;
          color:rgba(76,76,76,1);
          line-height: pm(22);
        }
        .info{
          font-size: pm(14);
          font-family:PingFangSC;
          font-weight:400;
          color:rgba(155,155,155,1);
          line-height:pm(20);
        }
      }
      .rightIcon{
        margin-right: pm(35);
      }
      + .item{
        border-top: 1px solid #E8E8E8;
      }
    }
    
  }
}
.infos{
  background: white;
  padding: pm(19) pm(13) 0 pm(28);
  .title{
    font-size: pm(20);
    font-weight:500;
    color:rgba(37,37,37,1);
    padding: pm(9) 0;
  }
  .detali{
    font-size:pm(16);
    font-weight:400;
    color:rgba(76,76,76,1);
    display: flex;
    justify-content: space-between;
    .dinfo{

    }
    .tel{
      img{
        width: pm(28);
        margin: 0 auto;
        display: block;
      }
      a{
        text-align: center;
        font-size:pm(12);
        font-family:PingFangSC;
        font-weight:500;
        color:rgba(107,168,254,1);
        line-height:pm(17);
      }
    }
  }
  .tabs{
    margin: pm(20) 0 pm(10) 0;
    display: flex;
    justify-content: space-around;
    .item{
      font-size:pm(16);
      font-family:PingFangSC;
      font-weight:400;
      color:rgba(76,76,76,1);
      line-height:pm(32);
    }
    .sel{
      position: relative;
      color:rgba(107,168,254,1);
      &:after {
        bottom:0;
        content:"";
        left:50%;
        margin-left: pm(-25);
        width: pm(50);
        height: pm(3);
        position:absolute;
        background:rgba(107,168,254,1);
      }
    }
  }
}
.conbox{
  margin-top: pm(16);
  background: white;
}
.conhtml{
  padding: pm(15);
  color: #9b9b9b;
}
</style>

