<template>
  <div id="app">
    <transition :name="transitionName">
      <keep-alive include="GuaHao,ChongZhiRecord">
        <router-view class="child-view totalBox"/>
      </keep-alive>
    </transition>
    <div v-show="loading" class="loading ">
      <i class="weui-loading"></i>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import router from './router';
import { namespace } from 'vuex-class'
import { getURLParams } from '@/utils/auth'
import Cookies from 'js-cookie';
const userModule = namespace('user')
@Component({
})
export default class App extends Vue {
  @userModule.State('loading') private loading: any
  private transitionName: string = 'slide-left'
  private unCheck: string[] = [
    'NewppAdd',
    'MgdCode',
    'MgdXinXi',
    'MgdXiLie',
    'MopenPub',
    'MzjReport',
    'MppPic',
    'MRrenz',
    'Login',
  ]
  @Watch('$route', { immediate: true })
  private changeRouter(route: any) {
    const isBack = this.$router.isBack
    if (isBack) {
      this.transitionName = 'slide-right'
    } else {
      this.transitionName = 'slide-left'
    }
    this.$router.isBack = false
    // path=invite&plv
    // if (getURLParams().path == 'invite') {
    //   this.$router.push('/minviteurl/'+ getURLParams().plv)
    //   return
    // }
    // 不校验token
    if (this.unCheck.includes(route.name) || route.name == null) {

    } else {
      if (getURLParams().x_tk) {
        Cookies.set('x_tk', getURLParams().x_tk, { expires: 3.33 })
      } else if (!Cookies.get('x_tk')) {
        this.$router.push('/login')
      }
    }
  }
  private mounted(): void {
  }
  private clicktest(): void {
  }
  private getEvent(pa: any): void {
  }
}
</script>

<style lang="scss">
#app{
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  
}
.totalBox{
  height: 100%;
  width: 100%;
  padding: 0;
  margin: 0;
}
.child-view {
  position: absolute;
  width:100%;
  transition: transform .5s cubic-bezier(0.5,0,.1,1), opacity .5s cubic-bezier(0.5,0,.1,1);
  overflow: hidden;
}
.child-view::-webkit-scrollbar {
  display: none;
}
.slide-left-enter, .slide-right-leave-active {
  opacity: 0;
  transform: translate(100%, 0);
}
.slide-left-leave-active, .slide-right-enter {
  opacity: 0;
  transform: translate(-50px, 0);
}
.loading{
  position: absolute;
  top: 40%;
  left: 50%;
  width: 0.5rem;
  margin-left: -0.25rem;
}
</style>
