<template>
  <div class="content">
    <div v-if="pageData.id" class="item" @click="gopage('switchUsers')">
      <img src="https://cdncollege.quansuwangluo.com/image/hospital/default_avatar.png" class="avatar" alt="">
      <div class="infos">
        <div class="name">{{ pageData.name }}</div>
        <div class="info">{{ pageData.itemName + '  ' + pageData.itemNo }}</div>
      </div>
      <div class="rightIcon"/>
    </div>
    <div class="iptitle">预付卡</div>
    <div class="invite">
      <div class="Item" @click="gopage('guahao')">
        <div class="lIcon guahao"/>
        <div class="des">门诊挂号</div>
        <div class="rightIcon"/>
      </div>
      <div class="Item" @click="gopage('grecord')">
        <div class="lIcon ghrecord"/>
        <div class="des">挂号记录</div>
        <div class="rightIcon"/>
      </div>
    </div>
    <div class="iptitle">预付卡</div>
    <div class="invite">
      <div class="Item" @click="gopage('chongzhi')">
        <div class="lIcon chongzhi"/>
        <div class="des">充值</div>
        <div class="rightIcon"/>
      </div>
      <div class="Item" @click="gopage('yue')">
        <div class="lIcon yue"/>
        <div class="des">余额查询</div>
        <div class="rightIcon"/>
      </div>
      <div class="Item" @click="gopage('/chongzhirecord')">
        <div class="lIcon record"/>
        <div class="des">充值缴费记录</div>
        <div class="rightIcon"/>
      </div>
      <!-- <div class="Item" @click="gopage('')">
        <div class="lIcon status"/>
        <div class="des">充值状态查询</div>
        <div class="rightIcon"/>
      </div> -->
    </div>
    <div class="iptitle">门诊缴费</div>
    <div class="invite">
      <div class="Item" @click="gopage('jiaofei')">
        <div class="lIcon unjiaofei"/>
        <div class="des">待缴费查询</div>
        <div class="rightIcon"/>
      </div>
      <div class="Item" @click="gopage('fList')">
        <div class="lIcon jiaofeirecord"/>
        <div class="des">缴费记录</div>
        <div class="rightIcon"/>
      </div>
    </div>
    <div class="invite">
      <div class="Item" @click="gopage('/checkResult')">
        <div class="lIcon status"/>
        <div class="des">报告查询</div>
        <div class="rightIcon"/>
      </div>
    </div>
    <div class="invite">
      <div class="Item" @click="gopage('/catchList')">
        <div class="lIcon catch"/>
        <div class="des">我的收藏</div>
        <div class="rightIcon"/>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { getSelfInfo } from '@/api/hospital'
import { Component, Vue } from 'vue-property-decorator';
import { getURLParams } from '@/utils/auth'
import Cookies from 'js-cookie'
@Component({
})
export default class Home extends Vue {
  private pageData: any = {}
  private mounted(): void {
    document.title = '个人中心'
    if (Cookies.get('x_tk')) {
    } else if (getURLParams().x_tk) {
      Cookies.set('x_tk', getURLParams().x_tk, { expires: 3.33 })
    } else {
      window.location.href = 'http://wlhis.qs110.com/api/wechat/login/type/10'
      return
    }
    getSelfInfo('').then((res: any) => {
      this.pageData = res.datas
      Cookies.set('user', JSON.stringify(this.pageData), { expires: 3.33 })
      if (!this.pageData.id) {
        this.$selfConfirm('暂无就诊人，前往添加？', '是', '否', (ress: string) => {
          this.$router.push('/add')
          // this.$router.goBack()
          // const self = this
          // setTimeout(() => {
          //   self.$router.goBack()
          // }, 1000);
        })
      }
    })
  }
  private gopage(path: string) {
    if (!this.pageData.id) {
      this.$selfConfirm('暂无就诊人，前往添加？', '是', '否', (res: string) => {
        this.$router.push('/add')
        // const self = this
        // setTimeout(() => {
        //   self.$router.goBack()
        // }, 1000);
      })
    } else {
      this.$router.push(path)
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
  .item{
    background: white;
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
    
  }
  .rightIcon{
    margin-right: 0.5rem;
  }
  .iptitle{
    font-size: pm(14);
  }
  .invite{
    padding-left: pm(21);
    display: flex;
    background: white;
    flex-direction: column;
    margin-top: 0.2rem;
    .Item{
      
      height: 1.3rem;
      display: flex;
      +.Item{
        border-top: 1px solid #E8E8E8;
      }
      >*{
        align-self: center;
      }
      .lIcon{
        width: pm(28);
        height: pm(28);
        background-size: 100% 100% !important;
      }
      .des{
        flex: 1;
        width: 100%;
        color: #4C4C4C;
        font-size: pm(16);
        text-align: left;
        margin-left: 0.2rem;
      }
      .chongzhi{
        background: url(https://cdncollege.quansuwangluo.com/image/wdhis/chongzhi.png) no-repeat;
      }
      .yue{
        background: url(https://cdncollege.quansuwangluo.com/image/wdhis/yue.png) no-repeat;
      }
      .record{
        background: url(https://cdncollege.quansuwangluo.com/image/wdhis/record.png) no-repeat;
      }
      .status{
        background: url(https://cdncollege.quansuwangluo.com/image/wdhis/status.png) no-repeat;
      }
      .catch{
        background: url(https://cdncollege.quansuwangluo.com/image/wdhis/catch.png) no-repeat;
      }
      .unjiaofei{
        background: url(https://cdncollege.quansuwangluo.com/image/wdhis/unjiaofei.png) no-repeat;
      }
      .jiaofeirecord{
        background: url(https://cdncollege.quansuwangluo.com/image/wdhis/jiaofeirecord.png) no-repeat;
      }
      .guahao{
        background: url(https://cdncollege.quansuwangluo.com/image/wdhis/guahao.png) no-repeat;
      }
      .ghrecord{
        background: url(https://cdncollege.quansuwangluo.com/image/wdhis/ghrecord.png) no-repeat;
      }
    }
  }
}
</style>

