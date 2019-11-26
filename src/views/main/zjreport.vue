<template>
  <div class="containers">
    <div class="orderitem" v-for="(it, idx) in gdindtl.cert" :key="idx">
      <img :src="('http://beifan.400539.com' + it)" alt="" class="pic"/>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { State,
  namespace } from 'vuex-class'
const userModule = namespace('user')
@Component({
})
export default class MzjReport extends Vue {
  @userModule.State('gdindtl') private gdindtl: any
  private list: any[] = []
  private mounted(): void {
    document.title = '质检报告'
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
  padding: pm(10) 0 pm(10) pm(10);
  .orderitem{
    float: left;
    @include wh(172, 242);
    box-shadow:0px 2px 10px 0px rgba(174,185,190,0.7);
    margin-right: pm(10);
    margin-bottom: pm(10);
    img{
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}

</style>

