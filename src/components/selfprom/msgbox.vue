<template>
  <transition name="fade">
    <div v-if="show" class="msgbox" @click="confirm === '查看解析' ? closeBack() : closeLayer()">
      <div :class="{anima:anim.enter,leave:anim.leave}" class="modal fade dialog-modal" role="dialog" data-backdrop="false" aria-hidden="true" @click.stop="">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header row">
              <div class="modal-title col-md-4">提示</div>
              <div class="close" aria-label="Close">
                <span aria-hidden="true">×</span>
              </div>
            </div>
            <div class="modal-body">
              <!-- <div class="col-xs-offset-1">请填写您的联系方式</div> -->
              <input type="text" placeholder="请输入密码" class="reinput" v-model.trim="name">
              <!-- <input type="text" placeholder="请输入手机号码" class="reinput" v-model.trim="text"> -->
            </div>
            <div class="modal-footer" @click.stop>
              <div class="btn btn-gray" @click="closeLayer">{{ cancelText }}</div>
              <div class="btn btn-primary" @click="close">{{ confirm }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'MsgBox',
  data() {
    return {
      message: 'sserwe',
      confirm: '确定',
      cancelText: '取消',
      show: false,
      text: '',
      name: '',
      anim: {
        enter: true,
        leave: false
      }
    }
  },
  methods: {
    closeLayer() {
      const self = this
      this.anim.enter = false
      this.anim.leave = true
      setTimeout(() => {
        self.show = false
      }, 300)
    },
    closeBack() {
      const self = this
      this.anim.enter = false
      this.anim.leave = true
      setTimeout(() => {
        self.show = false
        window.history.go(-1)
      }, 300)
    },
    close() {
      if (!this.name) {
        return
      }
      const self = this
      this.conf(this.name)
      this.anim.enter = false
      this.anim.leave = true
      setTimeout(() => {
        self.show = false
      }, 300)
    }
  }
}
</script>

<style lang="scss" scoped>
@function pm($pt) {
  @return $pt / 37.5 + rem
};
.msgbox{
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  z-index: 1001;
  .modal{
    align-self: center;
    position: relative;
    width: 7rem;
    top: 0rem;
    // height: 5.5rem;
    margin: 1.5rem;
    z-index: 200;
    background: white;
    overflow: hidden;
    color: white;
    text-align: center;
    border-radius: 0.2rem;
    &-content{
      // height: 5.2rem;
      display: flex;
      flex-direction: column;
    }
    &-title{
      font-weight: 600;
      font-size: 0.5rem;
      padding-top: 0.4rem;
      // line-height: 1.5rem;
      height: 0.8rem;
      color: #2F2F2F;
    }
    .close{
      position: absolute;
      right: 0.3rem;
      top: 0;
      width: 0.6rem;
      height: 0.6rem;
    }
    &-body{
      // flex: 1;
      // align-self: center;
      // display: flex;
      padding: 0 0.3rem;
      font-size: 0.45rem;
      color: #2F2F2F;
      >div{
        align-self: center;
        text-align: center;
        width: 100%;
      }
    }
    &-footer{
      // position: absolute;
      // bottom: 0;
      border-top: 1px solid #D8D8D8;
      height: 1.3rem;
      width: 100%;
      background: #CD0000;
      text-align: center;
      line-height: 1.3rem;
      font-size: 0.45rem;
      color: white;
      display: flex;
      // justify-content: space-around;
      >div{
        width: 50%;
        height: 1.3rem;
      }
      .btn-gray{
        background: white;
        color: #2F2F2F;
      }
    }
  }
}

.reinput{
  margin: pm(3) auto pm(12);
  background: rgba(52, 63, 101, .1);
  border-radius: pm(6);
  width: pm(215);
  height: pm(42);
  padding-left: pm(14);
}
</style>
