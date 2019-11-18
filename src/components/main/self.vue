<template>
  <div class="conbox">
    <img v-if="userInfo.level == 1" src="../../assets/user/bg1.png" alt="" class="bk"/>
    <img v-if="userInfo.level == 2" src="../../assets/user/bg2.png" alt="" class="bk"/>
    <img v-if="userInfo.level == 3" src="../../assets/user/bg3.png" alt="" class="bk"/>
    <img v-if="userInfo.level == 4" src="../../assets/user/bg4.png" alt="" class="bk"/>
    <img v-if="userInfo.level == 5" src="../../assets/user/bg5.png" alt="" class="bk"/>
    <img v-if="userInfo.level == 6" src="../../assets/user/bg6.png" alt="" class="bk"/>
    <div class="userInfo" @click="$router.push('/edit')">
      <img :src="userInfo.avatar" alt="" class="avatar"/>
      <div class="info">
        <div class="name">{{userInfo.nickname}}</div>
        <div class="infos">
          <div class="lvs">
            <img src="../../assets/user/zs.png" alt="" class="icon">
            <div class="lvname">{{lvList[parseInt(userInfo.level, 10) -1].lvname}}</div>
          </div>
          <div class="check">
            <img src="../../assets/user/renzhen.png" alt="" class="icon">
            <div class="lvname">{{userInfo.ischeck ? '已实名认证' : '未认证'}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="cashInfos">
      <div class="tt">
        <img src="../../assets/user/cash.png" alt="" class="icon"/>
        <span>我的余额</span>
      </div>
      <div class="concon">
        <span>{{userInfo.money}}</span>
        <div class="btn">
          <div class="con">
            <span>去提现</span>
            <div class="rectangle"></div>
          </div>
        </div>
      </div>
      <!-- <div class="nums" @click="gopage('zdlist')">
        <div class="te">我的余额</div>
        <div class="num">{{user.yue}}</div>
        <div class="btn">
          <div class="tixian">去提现</div>
          <div class="rectangle"/>
        </div>
      </div>
      <div class="codes" @click="gopage('qrcode')">
        <img src="../../assets/user/qrcode.png" alt="" class="qrcode"/>
        <div class="text">二维码收款</div>
      </div> -->
    </div>
    <div class="orderbox boxshadow comsize">
      <div class="title">
        <div class="desc">我的订单</div>
        <div class="alldesc" @click="goOrder(0)">全部订单></div>
      </div>
      <div class="optbox">
        <div class="item" @click="goOrder(1)">
          <img src="../../assets/user/unpay.png" alt="" class="icon"/>
          <div class="text">待付款</div>
        </div>
        <div class="item" @click="goOrder(2)">
          <img src="../../assets/user/unget.png" alt="" class="icon"/>
          <div class="text">待收货</div>
        </div>
        <div class="item" @click="goOrder(3)">
          <img src="../../assets/user/finish.png" alt="" class="icon"/>
          <div class="text">已完成</div>
        </div>
        <div class="item" @click="goOrder(4)">
          <img src="../../assets/user/backmoney.png" alt="" class="icon"/>
          <div class="text">退款/售后</div>
        </div>
      </div>
    </div>
    <div class="optss boxshadow comsize">
      <div class="items" @click="gopage('renzheng')">
        <img src="../../assets/user/shiming.png" alt="" class="icon"/>
        <div class="name">实名认证</div>
        <div class="rightIcon"></div>
      </div>
      <div class="items" @click="gopage('edit')">
        <img src="../../assets/user/paper.png" alt="" class="icon"/>
        <div class="name">修改资料</div>
        <div class="rightIcon"></div>
      </div>
      <div class="items" @click="gopage('proxy')">
        <img src="../../assets/user/fenxiao.png" alt="" class="icon"/>
        <div class="name">我的代理</div>
        <div class="rightIcon"></div>
      </div>
      <div class="items" @click="gopage('address')">
        <img src="../../assets/user/pos.png" alt="" class="icon"/>
        <div class="name">收货地址</div>
        <div class="rightIcon"></div>
      </div>
      <div class="items" @click="gopage('set')">
        <img src="../../assets/user/set.png" alt="" class="icon"/>
        <div class="name">账号设置</div>
        <div class="rightIcon"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { lvList } from '@/utils/mainData'
import { getUserInfo } from '@/api/mainpage'
@Component
export default class Self extends Vue {
  private userInfo: any = {
    level: 1
  }
  private lvList: any[] = lvList
  private mounted() {
    getUserInfo({}).then((res: any) => {
      this.userInfo = res.datas
    })
  }
  private gopage(url: string): void {
    this.$router.push(url)
  }
  private goOrder(idx: number): void {
    this.$router.push('myorder/' + idx)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "~@/styles/utils.scss";
.conbox{
  flex: 1;
  overflow: scroll;
  position: relative;
}
.bk{
  @include wh(375, 190);
  position: absolute;
  z-index: 1;
}
.userInfo{
  margin: pm(30) 0 pm(26) pm(11);
  position: relative;
  z-index: 10;
  display: flex;
  .avatar{
    @include wh(83, 82);
    border-radius: 50%;
    border: 1px solid white;
    margin-right: pm(7);
  }
  .info{
    color: white;
    .name{
      font-size: pm(17);
      margin: pm(27) 0 .373333rem 0;
    }
    .infos{
      display: flex;
      font-size: pm(11);
      >div{
        display: flex;
        width: 2.133333rem;
      }
      .check{
        border-left: 1px solid white;
        padding-left: pm(7);
      }
      .icon, .lvname{
        align-self: center;
      }
      .icon{
        @include wh(11, 11);
      }
      .lvname{
        margin: 0 pm(8) 0 pm(4);
      }
    }
  }
}
.cashInfos{
  
  position: relative;
  z-index: 10;
  // @include wh(355, 72);
  margin: pm(33) pm(11) pm(13) pm(11);
  background:linear-gradient(0deg,rgba(255,133,60,1),rgba(255,174,0,1));
  box-shadow:0px 0px pm(9) 0px rgba(0, 0, 0, 0.18);
  border-radius: pm(10);
  color: white;
  // display: flex;
  // justify-content: space-between;
  padding: pm(11) pm(19);
  text-align: center;
  .tt{
    font-size: pm(11);
    display: flex;
    >*{
      align-self: center;
    }
    img{
      @include wh(10, 11);
      margin-right: pm(4);
    }
  }
  .concon{
    display: flex;
    justify-content: space-between;
    font-size:pm(30);
    font-family:郑庆科黄油体Regular;
    font-weight:normal;
    color:rgba(255,255,255,1);
    >*{
      align-self: center;
    }
    .btn{
      @include wh(70, 26);
      border-radius: pm(5);
      border: 1px solid white;
      display: flex;
      justify-content: space-around;
      .con{
        align-self: center;
        margin-left: pm(6);
        display: flex;
        font-size: pm(11);
        >*{
          align-self: center;
        }
        span{
          margin-right: pm(5);
        }
      }
    }
  }
  .nums{
    flex: 1;
    .te{
      font-size: pm(11);
    }
    .num{
      font-size: .8rem;
      margin: .266667rem 0;
    }
    .btn{
      font-size: pm(11);
      @include wh(53, 16);
      background: #E16C16;
      border-radius: pm(8);
      margin: 0 auto;
      display: flex;
      justify-content: space-around;
      padding: 0 pm(8) 0 pm(12);
      >*{
        align-self: center;
      }
      .rectangle{
        margin-left: pm(3);
      }
    }
  }
  .codes{
    flex: 1;
    display: flex;
    border-left: 1px solid white;
    >*{
      align-self: center;
    }
    .qrcode{
      @include wh(53, 51);
      margin-left: .746667rem;
    }
    .text{
      margin-left: .346667rem;
      font-size: .293333rem;
      background: #E16C16;
      width: 0.50667rem;
      border-radius: 0.24rem;
      padding: pm(5) 0;
      line-height: .33333rem;
    }
  }
}
.orderbox{
  width: pm(313);
  margin: 0 auto;
  padding: .48rem .533333rem;
  background: white;
  .title{
    display: flex;
    justify-content: space-between;
    .desc{
      color: #2F2F2F;
      font-size: pm(16);
    }
    .alldesc{
      color: #565656;
      font-size: pm(13);
    }
  }
  .optbox{
    display: flex;
    margin: pm(17) 0 pm(0) pm(0);
    justify-content: space-around;
    .item{
      width: pm(53);
      margin-right: pm(10);
      .icon{
        margin-left: pm(10);
        @include wh(33, 33);
      }
      .text{
        text-align: center;
        margin-top: pm(8);
        color: #2F2F2F;
        font-size: .293333rem;
      }
    }
  }
}
.optss{
  // padding: .48rem 0;
  width: pm(355);
  background: white;
  margin: .4rem auto;
  .items{
    display: flex;
    padding: 0 pm(22);
    height: pm(41);
    +.items{
      border-top: 1px solid #DEDEDE;
    }
    >*{
      align-self: center;
    }
    .icon{
      @include wh(16, 16);
      margin-right: pm(4);
    }
    .name{
      flex: 1;
      color: #2F2F2F;
      font-size: pm(13);
    }
  }
}
</style>
