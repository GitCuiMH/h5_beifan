<template>
  <div class="containers">
    <div class="item" @click="$router.push('/set')">
      <div class="text">密码修改</div>
      <div class="rightIcon"></div>
    </div>
    <div class="item" @click="alerts(1)">
      <div class="text">微信解绑</div>
      <div class="rightIcon"></div>
    </div>
    <div class="item" @click="alerts(2)">
      <div class="text">退出登录</div>
      <div class="rightIcon"></div>
    </div>
  </div>
</template>
<script lang="ts">
import { unBind } from '@/api/mainpage'
import { Component, Vue } from 'vue-property-decorator';
import Cookies from 'js-cookie'
@Component({
})
export default class Setting extends Vue {
  private mounted(): void {
    document.title = '账号设置'
  }
  private save() {
    this.$router.goBack()
  }
  private alerts(i: number) {
    const str = i === 1 ? '确定解绑微信？' : '确定退出登录？'
    this.$selfConfirm(str, '确定', '取消', (res: any) => {
      if (i === 1) {
        unBind({}).then((res2: any) => {
          Cookies.remove('x_tk')
          this.$router.replace('/login')
        })
      } else {
        Cookies.remove('x_tk')
        this.$router.replace('/login')
      }
    })
  }
}
</script>
<style lang="scss" scoped>
@import "~@/styles/utils.scss";
.containers{
  height: 100%;
  background: #F3F3F3;
  color: #333333;
  font-size: pm(13);
  .item{
    margin: pm(16) pm(10) 0 pm(10);
    height: pm(44);
    display: flex;
    background:rgba(255,255,255,1);
    box-shadow:0px 2px 10px 0px rgba(174,185,190,0.7);
    border-radius: pm(10);
    color: #333333;
    padding: 0 pm(17);
    justify-content: space-between;
    font-size: pm(13);
    >*{
      align-self: center;
    }
  }
}
</style>

