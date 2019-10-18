<template>
  <div class="content">
    <div class="search">
      <div class="searchIcon" @click="search"/>
      <input v-model.trim="searKey" :placeholder="plachoder" type="text" @focus="showHiss(true)" @keyup.enter="search">
      <div v-if="showHis" class="cancel" @click="showHiss(false)">取消</div>
    </div>
    <div v-if="!showHis" class="list1">
      <div v-for="(item, index) in pageData.item" :key="index" class="item" @click="gopage(index, 0)">
        <div class="name">{{ item.deptName }}</div>
        <div class="rightIcon"/>
      </div>
    </div>
    <div v-if="showHis" class="his">
      <div v-if="secData.dept.length" class="iptitle">搜索结果(科室)</div>
      <div class="list1">
        <div v-for="(item, index) in secData.dept" :key="index" class="item" @click="gopage(index, 1)">
          <div class="name">{{ item.deptName }}</div>
          <div class="rightIcon"/>
        </div>
      </div>
      <div v-if="secData.doctor.length" class="iptitle">搜索结果(医生)</div>
      <div v-for="(item, index) in secData.doctor" :key="'b' + index" class="item" @click="gopageDetail(index, 1)">
        <img src="https://cdncollege.quansuwangluo.com/image/hospital/avatar.png" class="avatar" alt="">
        <div class="infos">
          <div class="name">{{ item.doctorName }}</div>
          <div class="info">{{ item.doctorTitle }}</div>
        </div>
        <div class="guahao" @click="gopageDetail(index, 1)">挂号</div>
      </div>
      <div v-if="pageData.collection.length" class="iptitle">我的收藏</div>
      <div v-for="(item, index) in pageData.collection" :key="index" class="item" @click="gopageDetail(index, 2)">
        <img src="https://cdncollege.quansuwangluo.com/image/hospital/avatar.png" class="avatar" alt="">
        <div class="infos">
          <div class="name">{{ item.doctorName }}</div>
          <div class="info">{{ item.doctorTitle }}</div>
        </div>
        <div class="guahao" @click="gopageDetail(index, 2)">挂号</div>
      </div>
      <div v-if="pageData.reg.length" class="iptitle">挂号历史</div>
      <div v-for="(item, index) in pageData.reg" :key="'s' + index" class="item" @click="gopageDetail(index, 3)">
        <img src="https://cdncollege.quansuwangluo.com/image/hospital/avatar.png" class="avatar" alt="">
        <div class="infos">
          <div class="name">{{ item.doctorName }}</div>
          <div class="info">{{ item.doctorTitle }}</div>
        </div>
        <div class="guahao" @click="gopageDetail(index, 3)">挂号</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { getKSList, search } from '@/api/hospital'
import { Component, Vue } from 'vue-property-decorator';
import { Mutation,
  namespace } from 'vuex-class'
const userModule = namespace('user')
@Component({
})
export default class GuaHao extends Vue {
  @userModule.Mutation('TOGGLE_DOCINFO') private toggleDetail: any
  private pageData: any = {}
  private secData: any = {
    dept: [],
    doctor: []
  }
  private showHis: boolean = false
  private searKey: string = ''
  private plachoder: string = '点击搜索科室、医生'
  private mounted(): void {
    document.title = '科室列表'
    getKSList('').then((res: any) => {
      this.pageData = res.datas
    })
  }
  private search(): void {
    if (!this.searKey) {
      return
    }
    search({ key: this.searKey }).then((res: any) => {
      this.secData = res.datas
    })
  }
  private showHiss(mark: boolean): void {
    this.showHis = mark
  }
  private gopage(index: number, mark: number) {
    let temp: any
    temp = !mark ?  this.pageData.item[index] : this.secData.dept[index]
    this.$router.push('/doctorList/' + temp.deptCode + '/' + temp.deptName)
  }
  private gopageDetail(index: number, mark: number) {
    let temp: any
    switch (mark) {
      case 1:
        temp = this.secData.doctor[index]
        break
      case 2:
        temp = this.pageData.collection[index]
        break
      case 3:
        temp = this.pageData.reg[index]
        break
    }
    this.toggleDetail(temp)
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
  .search{
    border: 1px solid #E8E8E8;
    background: white;
    // background: rgba(255,255,255,0.25);
    height: 0.8rem;
    border-radius: 0.4rem;
    display: flex;
    position: relative;
    // z-index: 20;
    // width: 8rem;
    // left: 0.5rem;
    // top: 0.5rem;
    margin: 0.5rem;
    padding: 0 0.5rem 0 0;
    .searchIcon{
      align-self: center;
      width: 0.4rem;
      height: 0.4rem;
      margin-left: 0.3rem;
      background: url(https://cdncollege.quansuwangluo.com/image/hospital/search.png) no-repeat;
      background-size: 100% 100%;
    }
    .cancel{
      align-self: center;
      height: 0.5rem;
      font-size: pm(10);
      line-height: 0.5rem;
      background: #E8E8E8;
      border-radius: pm(4);
      padding: 0 0.2rem;
      margin-right: -0.3rem;
    }
    input{
      line-height: 0.62rem;
      font-size: 0.3rem;
      font-weight: 300;
      letter-spacing: 0.01rem;
      margin-left: 0.3rem;
      // color: #ADADAB;
      // color: #dedcdc;
      text-align: left;
      outline: none;
      border: none;
      flex: 1;
    }
  }
  .list1{
    background: white;
  }
  .item{
    display: flex;
    height: pm(50);
    justify-content: space-between;
    margin-left: pm(15);
    border-bottom: 1px solid #E8E8E8;
    color: #4C4C4C;
    font-size: pm(16);
    padding: 0 pm(16);
    >*{
      align-self: center;
    }
  }
  .iptitle{
    margin-bottom: 0.2rem;
  }
  .his{
    // background: white;
    .item{
      background: white;
      margin-left: pm(0);
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

