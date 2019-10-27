<template>
  <div class="search">
    <img src="../assets/index/searchIcon.png" alt="">
    <input class="reinput" placeholder="点击输入内容" type="text" v-model.trim="searchkey" @keyup.enter="search">
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class HelloWorld extends Vue {
  @Prop() private msg!: string;
  private searchkey: string = ''
  private search(): void {
    this.$emit('search', this.searchkey)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "~@/styles/utils.scss";
.search{
  width: 9.333333rem;
  height: .853333rem;
  margin: pm(9) auto 0 auto;
  display: flex;
  border-radius: .426667rem;
  background: rgba(238, 238, 238, 1);
  > * {
    align-self: center;
  }
  img{
    margin: 0 pm(6.5) 0 .426667rem;
    width: .4rem;
    height: .426667rem;
  }
  input{
    flex: 1;
    color: black;
    font-size: pm(13);
  }
}
</style>
