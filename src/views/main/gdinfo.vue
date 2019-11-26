<template>
  <div class="containers">
    <van-swipe class="swiper" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="(it, idx) in p.pics" :key="idx">
        <img :src="'http://beifan.400539.com' + it" alt="" class="pic">
      </van-swipe-item>
    </van-swipe>
    <div class="infos">
      <div class="title">{{p.title}}</div>
      <div class="price">￥{{p.price}}</div>
      <div class="kucun">库存:{{p.kc}}件</div>
      <div class="desc">
        <img src="../../assets/image/shitidian.png" alt="" class="icon">
        <span>正品保障</span>
      </div>
      <!-- <div class="shareblock" @click="share">
        <img src="../../assets/image/share.png" alt="" class="icon">
        <span>分享</span>
      </div> -->
    </div>
    <div class="gddetail">
      <div class="ttl">
        <div class="tl" :class="{sel: tabIndex === 0}" @click="tabIndex = 0">商品详情</div>
        <div class="tl" :class="{sel: tabIndex === 1}" @click="tabIndex = 1">产品规格</div>
      </div>
      <div class="conhtml" v-html="tabIndex ? p.content : p.specs"></div>
    </div>
    <div class="fixb">
      <div class="forpos"></div>
      <div class="btn" @click="show = true">立即购买</div>
    </div>
    <div v-if="layer > 0" class="layer" @click="layerclose">
      <div class="layercontent"></div>
    </div>
    <van-popup
      v-model="show"
      round
      position="bottom"
      :style="{ maxHeight: '80%' }"
    >
      <div class="gdinfos">
        <div class="gddtl">
          <img :src="'http://beifan.400539.com' + sel.pic" alt="" class="skpic">
          <div class="dtl">
            <div class="price">{{p.title}}</div>
            <div class="kucun">库存:{{sel.kc}}件</div>
            <div class="name">{{sel.name}}</div>
          </div>
        </div>
        <div class="skulist">
          <div class="tt">颜色分类</div>
          <div class="item" :class="{sel: skuIndex === idx}" v-for="(it, idx) in p.tc" :key="idx" @click="selSku(idx)">
            {{it.name}}
          </div>
        </div>
        <div class="gobuy" @click="gobuy">立即购买</div>
      </div>
    </van-popup>
  </div>
</template>
<script lang="ts">
import { getGdInfo } from '@/api/mainpage'
import { Component, Vue } from 'vue-property-decorator';
import Cookies from 'js-cookie'
import { dateList, dkind } from '@/utils/mainData'
import { Mutation,
  namespace } from 'vuex-class'
const userModule = namespace('user')
@Component({
})
export default class MgdInfo extends Vue {
  @userModule.Mutation('TOGGLE_DOCINFO') private setSku: any
  private p: any = {}
  private sel: any = {}
  private show: boolean = false
  private tabIndex: number = 0
  private skuIndex: number = 0
  private layer: number = 0;
  private mounted(): void {
    document.title = '产品详情'
    this.getData(parseInt(this.$route.params.id, 10))
  }
  private getData(id: number) {
    getGdInfo({id}).then((res: any) => {
      this.p = res.datas
      this.sel = this.p.tc[0]
    })
  }
  private share() {
    this.layer = 1
  }
  private layerclose() {
    this.layer = 0;
  }
  private selSku(idx: number) {
    this.skuIndex = idx
    this.sel = this.p.tc[idx]
  }
  private gobuy() {
    this.setSku(this.sel)
    this.$router.push('/suborder/' + this.$route.params.id)
  }
}
</script>
<style lang="scss" scoped>
@import "~@/styles/utils.scss";
.gdinfos{
  padding: pm(24) pm(10);
  .gobuy{
    margin: pm(20) auto pm(15) auto;
    @include wh(205, 40);
    text-align: center;
    line-height: pm(40);
    background: #FF3657;
    border-radius: pm(20);
    color: white;
    font-size: pm(16);
  }
  .gddtl{
    display: flex;
    >*{
      align-self: center;
    }
    .skpic{
      @include wh(101, 101);
      border-radius: pm(5);
      margin-right: pm(10);
    }
    .dtl{
      .price{
        color: #FF3657;
        font-size: pm(18);
      }
      .kucun{
        color: #8F8F8F;
        font-size: pm(10);
      }
      .name{
        color: #2C2C2C;
        font-size: pm(11);
      }
    }
  }
  .skulist{
    margin-top: pm(22);
    border-top: 1px solid #F1F1F1;
    border-bottom: 1px solid #F1F1F1;
    color: #2C2C2C;
    font-size: pm(12);
    .tt{
      margin: pm(14) 0;
    }
    .item{
      @include wh(286, 25);
      background: #EEEEEE;
      margin-bottom: pm(9);
      padding-left: pm(13);
      line-height: pm(25);
      border-radius: pm(5);
    }
    .sel{
      background: #FFEBEE;
      border-radius: 1px solid #FF3657;
    }
  }
}
.fixb{
  position: fixed;
  background: white;
  border-top: 1px solid #F1F1F1;
  bottom: 0;
  left: 0;
  right: 0;
  height: pm(45);
  display: flex;
  .btn{
    color: white;
    background: #FF3657;
    width: pm(102);
    text-align: center;
    line-height: pm(45);
    font-size: pm(16);
  }
}
.infos{
  position: relative;
  background: white;
  padding: pm(14) pm(14) 0 pm(14);
  .shareblock{
    position: absolute;
    top: pm(50);
    right: 0;
    z-index: 10;
    @include wh(67, 25);
    border-radius: pm(12) 0 0 pm(12);
    background: #D7D7D7;
    color: #6A6A6A;
    font-size: pm(14);
    display: flex;
    >*{
      align-self: center;
    }
    .icon{
      margin: 0 pm(5) 0 pm(11);
      @include wh(14, 14);
    }
  }
  .title{
    color: #323232;
    font-size: pm(18);
  }
  .price{
    font-size: pm(18);
    color: #FF3657;
    line-height: pm(41);
    border-bottom: 1px solid #F3F3F3;
  }
  .kucun{
    color: #888888;
    font-size: pm(13);
    line-height: pm(41);
    border-bottom: 1px solid #F3F3F3;
  }
  .desc{
    display: flex;
    color: #888888;
    height: pm(41);
    font-size: pm(13);
    >*{
      align-self: center;
    }
    .icon{
      @include wh(12, 15);
      margin-right: pm(5);
    }
  }
}
.gddetail{
  margin: pm(10) 0 pm(60) 0;
  background: white;
  .ttl{
    color: #323232;
    border-top: 1px solid #F1F1F1;
    border-bottom: 1px solid #F1F1F1;
    height: pm(45);
    line-height: pm(45);
    text-align: center;
    font-size: pm(16);
    display: flex;
    .tl{
      flex: 1;
      +.tl{
        border-left: 1px solid #F1F1F1;
      }
    }
  }
  
  .sel{
    color: #FF3657;
  }
}
.containers{
  height: 100%;
  overflow: scroll;
  flex-direction: column;
  background: #EEEEEE;
  .swiper{
    height: pm(355);
    width: 100%;
  }
  .pic{
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

</style>

