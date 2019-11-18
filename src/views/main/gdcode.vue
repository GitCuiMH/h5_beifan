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
          <div>产品名称</div>
        </div>
        <div class="item">
          <div class="tt">234234</div>
          <div>全国统一零售价</div>
        </div>
      </div>
    </div>
    <div class="opts">
      <div class="stitle">
        <img src="../../assets/sao/search.png" alt="" class="icon">
        <span>代理查询</span>
      </div>
      <div class="searchbox">
        <input type="text" class="reinput searinput"/>
        <div class="btn">查询</div>
      </div>
      <div class="oplist">
        <div class="item">
          <div class="iicon">
            <img src="../../assets/sao/info.png" alt="" class="icon"/>
          </div>
          <div class="text">产品信息</div>
        </div>
        <div class="item brl">
          <div class="iicon">
            <img src="../../assets/sao/list.png" alt="" class="icon"/>
          </div>
          <div class="text">产品系列</div>
        </div>
        <div class="item brl">
          <div class="iicon">
            <img src="../../assets/sao/group.png" alt="" class="icon"/>
          </div>
          <div class="text">查看公众号</div>
        </div>
        <div class="item">
          <div class="iicon">
            <img src="../../assets/sao/renzheng.png" alt="" class="icon"/>
          </div>
          <div class="text">防伪认证</div>
        </div>
        <div class="item brl">
          <div class="iicon">
            <img src="../../assets/sao/photos.png" alt="" class="icon"/>
          </div>
          <div class="text">买家照片</div>
        </div>
        <div class="item brl">
          <div class="iicon">
            <img src="../../assets/sao/report.png" alt="" class="icon"/>
          </div>
          <div class="text">质检报告</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
@Component({
})
export default class MgdCode extends Vue {
  private pageData: any = {
  }
  private list: any[] = []
  private mounted(): void {
    document.title = '商品扫码'
  }
  private save() {
    this.$router.goBack()
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
    margin: pm(9) pm(10);
    background: white;
    border-radius: pm(10);
    box-shadow:0px 0px 9px 0px rgba(0, 0, 0, 0.18);
    padding-top: pm(19);
    .stitle{
      color: #434343;
      font-size: pm(16);
      line-height: pm(23);
      display: flex;
      margin-left: pm(12); 
      .icon{
        @include wh(23, 23);
        margin-right: pm(6);
      }
    }
    .searchbox{
      display: flex;
      // justify-content: space-between;
      margin: pm(8) pm(13) 0 pm(13);
      .searinput{
        flex: 1;
        height: pm(32);
        padding: 0 pm(4);
        font-size: pm(16);
        border:1px solid rgba(83,83,83,1);
        border-radius: pm(8);
      }
      .btn{
        color: white;
        @include wh(76, 32);
        background: $m;
        font-size: pm(16);
        border-radius: pm(8);
        text-align: center;
        line-height: pm(32);
        margin-left: pm(10); 
      }
    }
    .oplist{
      display: flex;
      flex-wrap: wrap;
      margin-top: pm(17);
      .brl{
        border-left: 1px solid rgba(0, 0, 0, .1);
      }
      .item{
        padding-bottom: pm(10);
        border-top: 1px solid rgba(0, 0, 0, .1);
        width: pm(115);
        color: #434343;
        font-size: pm(10);
        text-align: center;
        .iicon{
          margin: pm(9) 0 pm(5) 0;
          display: flex;
          justify-content: space-around;
          .icon{
            @include wh(48, 48);
          }
        }
      }
    }
  }
}
</style>

