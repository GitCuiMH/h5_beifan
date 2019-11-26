<template>
  <div class="containers">
    <div class="userinfo">
      <div v-if="!u.id" class="unsa">该商品未售出</div>
      <div v-if="u.id" class="avatar">
        <img :src="u.avatar" alt="" class="avat">
        <div class="name">{{u.name}}</div>
      </div>
      <div v-if="u.id" class="infos">
        <div class="item">
          <img src="../../assets/sao/zs.png" alt="" class="icon">
          <span v-if="u.level">{{lvList[parseInt(u.level, 10) - 1].lvname}}</span>
        </div>
        <div class="item">
          <img src="../../assets/sao/wechat.png" alt="" class="icon">
          <span>{{u.name}}</span>
        </div>
      </div>
      <div class="gdinfo">
        <div class="item">
          <div class="tt">{{p.title}}</div>
          <div>产品名称</div>
        </div>
        <div class="item">
          <div class="tt">{{p.price}}</div>
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
        <input type="text" v-model.trim="key" placeholder="请输入代理手机号" class="reinput searinput"/>
        <div class="btn" @click="searchProxy">查询</div>
      </div>
      <div class="oplist">
        <div class="item">
          <div class="iicon" @click="gopage('/mgdxinxi/' + p.id)">
            <img src="../../assets/sao/info.png" alt="" class="icon"/>
          </div>
          <div class="text">产品信息</div>
        </div>
        <div class="item brl" @click="gopage('/mgdxilie')">
          <div class="iicon">
            <img src="../../assets/sao/list.png" alt="" class="icon"/>
          </div>
          <div class="text">产品系列</div>
        </div>
        <div class="item brl" @click="gopage('/mopenpub')">
          <div class="iicon">
            <img src="../../assets/sao/group.png" alt="" class="icon"/>
          </div>
          <div class="text">查看公众号</div>
        </div>
        <div class="item" @click="gopage('/mfagnweirenz')">
          <div class="iicon">
            <img src="../../assets/sao/renzheng.png" alt="" class="icon"/>
          </div>
          <div class="text">防伪认证</div>
        </div>
        <div class="item brl" @click="gopage('/mpppic/' + p.id)">
          <div class="iicon">
            <img src="../../assets/sao/photos.png" alt="" class="icon"/>
          </div>
          <div class="text">买家照片</div>
        </div>
        <div class="item brl" @click="gopage('/mzjreport/' + p.id)">
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
import { getScanGinfo, agentsearch } from '@/api/mainpage'
import { lvList } from '@/utils/mainData'
import { getURLParams } from '@/utils/auth'

import { Mutation,
  namespace } from 'vuex-class'
const userModule = namespace('user')
@Component({
})
export default class MgdCode extends Vue {
  @userModule.Mutation('TOGGLE_gdindtl') private setInfos: any
  private p: any = {
  }
  private key: string = ''
  private lvList: any[] = lvList
  private u: any = {
    level: 1
  }
  private list: any[] = []
  private mounted(): void {
    document.title = '商品扫码'
    getScanGinfo({sn: getURLParams().sn}).then((res: any) => {
      this.u = res.datas.user
      this.p = res.datas.product
      this.setInfos(res.datas.product)
    })
  }
  private gopage(path: string) {
    this.$router.push(path)
  }
  private searchProxy() {
    agentsearch({mobile: this.key}).then((res: any) => {
      this.u = res.datas
    })
  }
}
</script>
<style lang="scss" scoped>
@import "~@/styles/utils.scss";
.unsa{
  text-align: center;
  padding: pm(80) 0;
  font-size: pm(20);
}
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

