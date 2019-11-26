<template>
  <div class="containers">
    <div class="orderitem" v-for="(it, idx) in list" :key="idx">
      <img :src="('http://beifan.400539.com' + it)" alt="" class="pic"/>
      <div class="text">买家照片</div>
    </div>
  </div>
</template>
<script lang="ts">
import { getMshow } from '@/api/mainpage'
import { Component, Vue } from 'vue-property-decorator';
import { areaList } from '@/utils/address'

import Cookies from 'js-cookie'
@Component({
})
export default class Edit extends Vue {
  private list: any[] = []
  private mounted(): void {
    document.title = '买家照片'
    getMshow({id: this.$route.params.id}).then((res: any) => {
      this.list = res.datas.data
    })
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
  overflow: scroll;
  background: #F3F3F3;
  color: #333333;
  font-size: pm(13);
  padding: pm(15);
  .orderitem{
    float: left;
    // @include wh(172, 282);
    margin: 0 pm(10) pm(10) 0;
    img{
      @include wh(170, 170);
      border-radius: pm(13);
      object-fit: cover;
      // box-shadow:0px 2px 4px 0px rgba(174,185,190,0.7);
    }
    .text{
      color: #363535;
      text-align: center;
      margin-top: pm(9);
    }
  }
}

</style>

