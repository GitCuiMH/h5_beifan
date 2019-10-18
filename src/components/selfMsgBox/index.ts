import msgbox from './msgbox.vue'

const test = {
  install(Vue: any) {
    Vue.component('test', msgbox)
    Vue.prototype.alertTest = (src: string) => {
      alert(src)
    }
    Object.defineProperty(Vue.prototype, '$selfMsgBox', {
      get() {
        const div = document.createElement('div')
        document.body.appendChild(div)
        return (message: string, confirm: string, confirmSure: any) => {
          const Constructor = Vue.extend(msgbox)
          new Constructor({
            data() {
              return {
                message,
                confirm,
                show: true,
                anim: {
                  enter: true,
                  leave: false
                }
              }
            },
            methods: {
              conf: confirmSure
            }
          }).$mount(div)
        }
      }
    })
  }
}

export default test