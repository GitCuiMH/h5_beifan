<template>
  <div class="containers">
    <div class="userinfo">
      <div class="avatar">
        <img src="" alt="" class="avat">
        <div class="name">forskan</div>
      </div>
      <div class="infos">
        <div class="item">
          <img src="../../assets/sao/zs.png" alt="" class="icon">
          <span>城市合伙人</span>
        </div>
        <div class="item">
          <img src="../../assets/sao/wechat.png" alt="" class="icon">
          <span>forskan</span>
        </div>
      </div>
      <div class="gdinfo">
        <div class="item">
          <div class="tt">阿斯顿发</div>
          <div>申请日期</div>
        </div>
        <div class="item">
          <div class="tt">非直属代理</div>
          <div>代理类型</div>
        </div>
      </div>
    </div>
    <div class="opts">
      <div class="btn" @click="setStatus(1)">通过</div>
      <div class="btn gbtn" @click="setStatus(2)">不通过</div>
      <div class="aldeal">已处理</div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { setagStatus } from '@/api/mainpage'
@Component({
})
export default class MmanagerDtl extends Vue {
  private pageData: any = {
  }
  private list: any[] = []
  private mounted(): void {
    document.title = '合伙人审核'
  }
  private setStatus(st: number) {
    setagStatus({id: this.$route.params.id, stauts: st}).then((res: any) => {
      const str = st ? '已通过！' : '已拒绝！'
      this.$toast(str)
      setTimeout(() => {
        this.$router.goBack()
      }, 1000);
    })
  }
}
</script>
<style lang="scss" scoped>
@import "~@/styles/utils.scss";
.containers{
  height: 100%;
  background: #F3F3F3;
  .userinfo{
    color: white;
    background: #232323;
    margin: pm(9) pm(10);
    border-radius: pm(10);
    .avatar{
      padding-top: pm(26);
      font-size: pm(16);
      line-height: pm(26);
      text-align: center;
      .avat{
        @include wh(77, 77);
        border-radius: 50%;
        margin-left: pm(135);
        border: 2px solid #A6A5A8;
      }
    }
    .infos{
      display: flex;
      padding-top: pm(20);
      padding: pm(20) pm(76);
      .item{
        flex: 1;
        text-align: center;
        display: flex;
        font-size: pm(12);
        // justify-content: space-around;
        >*{
          align-self: center;
        }
        .icon{
          @include wh(15, 15);
          margin-right: pm(5);
        }
        span{
          overflow: hidden;
          max-width: pm(170);
          text-overflow: ellipsis;
          white-space: nowrap;
          margin-right: pm(21);
        }
        +.item{
          border-left: 1px solid rgba(255, 255, 255, .6);
          padding-left: pm(20);
        }
      }
    }
    .gdinfo{
      display: flex;
      background: #000000;
      border-radius: 0 0 pm(10) pm(10);
      padding-bottom: pm(13);
      padding-top: pm(13);
      .item{
        flex: 1;
        text-align: center;
        font-size: pm(12);
        // justify-content: space-around;
        >*{
          align-self: center;
        }
        div{
          overflow: hidden;
          max-width: pm(170);
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: pm(11);
        }
        .tt{
          font-size: pm(19);
        }
        
        +.item{
          border-left: 1px solid rgba(255, 255, 255, .6);
        }
      }
    }
  }
  .opts{
    margin-top: pm(93);
    .btn{
      @include wh(205, 40);
      background:rgba(143,195,31,1);
      box-shadow:0px 0px 9px 0px rgba(0, 0, 0, 0.18);
      border-radius:pm(20);
      text-align: center;
      font-size: pm(16);
      line-height: pm(40);
      margin: 0 auto pm(27) auto;
      color: white;
    }
    .gbtn{
      background: $m;
    }
    .aldeal{
      color: #373737;
      font-size: pm(16);
      text-align: center;
    }
  }
}
</style>

