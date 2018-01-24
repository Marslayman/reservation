<template>
   <div>
     <msg :title="message" :description="description" :buttons="buttons" :icon="icon"></msg>
   </div>
</template>

<script>
import { XButton, Icon, Msg } from 'vux'
export default {
  data () {
    return {
      description: '你的预约已经成功提交，可在 <strong style="color:#88D9DA;">我的预约</strong> 中查看具体信息',
      icon: 'success',
      message: '预约成功',
      buttons: [{
        type: 'primary',
        text: '查看预约',
        link: '/personal'
      }, {
        type: 'default',
        text: '返回首页',
        link: '/index'
      }]
    }
  },
  components: {
    XButton,
    Icon,
    Msg
  }
}
</script>
 