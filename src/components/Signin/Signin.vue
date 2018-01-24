<template>
  <div id="signin" ref="signin">
    <div class="container">
       <group title="新用户注册">
      <x-input title="手机号" v-model="tel" type="text" required placeholder="请输入你的手机号">
        <i slot="label" class="iconfont icon-lianxirenwode"></i>
      </x-input>
       <x-input title="验证码" class="weui-vcode" v-model="valcode">
        <x-button slot="right" type="primary" mini :text="buttonText" :disabled="avail" @click.native="sendValidation()"></x-button>
      </x-input>
      <x-input title="密码" v-model="password" type="password" required placeholder="8位数字字母组合密码">
        <i slot="label" class="iconfont icon-suo"></i>
      </x-input>
      <x-input title="密码" v-model="confirm" type="password" required placeholder="请再次输入密码">
        <i slot="label" class="iconfont icon-suo"></i>
      </x-input>
    </group>
    <br>
    <x-button @click.native="register" class="sub-btn" plain> 注册 </x-button>
    </div>
    <div class="link">
      <router-link to="/login">返回登录</router-link>
    </div>
  </div>
</template>

<script>
import { XInput, Group, XButton } from 'vux'
export default {
  name: 'sigin',
  data () {
    return {
      tel: '',
      confirm: '',
      password: '',
      buttonText: '发送验证码',
      avail: false,
      valcode: '',
      count: 60
    }
  },
  mounted () {
    this.$refs.signin.style.width = window.screen.availWidth + 'px';
    this.$refs.signin.style.height = window.screen.availHeight + 'px';
  },
  methods: {
    sendValidation () {
      var _this = this
      this.count = 60
      let telreg = /^1[3|4|5|7|8][0-9]{9}$/ // 正则表达式对用户名做规则匹配
      if (this.tel === '' || !this.tel.match(telreg)) {
        this.$vux.alert.show({
          title: '警告',
          content: '手机号格式不对或者为空，请正确填写手机号！'
        })
        return
      }
      this.avail = true;
      this.$store.dispatch('sendMessage', {'tel': this.tel, 'confirm': this.confirm, 'code': this.valcode}).then(res => {
        if (res.status === 'no') {
          this.$vux.alert.show({
            title: '错误提示',
            content: '抱歉，链接失败！<br/>请尝试重新提交请求<br>错误信息：' + res.error,
            onHide () {
              _this.avail = false
            }
          })
        } else {
          var clear = setInterval(function() {
            _this.count--
            _this.buttonText = _this.count + '秒后重新发送'
            if (_this.count === 0) {
              clearInterval(clear)
              _this.avail = false
              _this.buttonText = '发送验证码'
            }
          }, 1000)
          _this.valcode = res.code
        }
      })
    },
    register () {
      var _this = this
      if (this.tel === '' || this.password === '' || this.confirm === '' || this.valcode === '') {
        return;
      }
      var telreg = /^1[3|4|5|7|8][0-9]{9}$/ // 正则表达式对用户名做规则匹配
      var pwdreg = /^[a-zA-Z0-9]{6,8}$/ // 正则表达式对密码做规则匹配
      if (!this.tel.match(telreg) || !this.password.match(pwdreg)) {
        this.$vux.alert.show({
          title: '错误提示',
          content: '密码格式有误<br>请确认后重启提交'
        })
        return
      }
      if (this.password !== this.confirm) {
        this.$vux.alert.show({
          title: '错误提示',
          content: '密码不一致<br>请确认后重新提交'
        })
        return
      }
      this.$store.dispatch('getSigin', {'tel': this.tel, 'confirm': this.confirm}).then(res => {
        if (res.status === 'yes') {
          this.$vux.alert.show({
            title: '成功提示',
            content: '恭喜你，你已经注册成功！<br/>将跳转至登录页面',
            onHide () {
              _this.$router.push('/login')
            }
          })     
        } else {
          this.$vux.alert.show({
            title: '错误提示',
            content: '抱歉，注册失败！<br/>请尝试重新提交请求<br>错误信息：' + _this.$store.getters.getSigninMessage
          })
        }
      })
    }
  },
  components: {
    XInput,
    Group,
    XButton
  }
}
</script>

<style lang="scss" scoped>
#signin {
  position: relative;
  background-color: #88D9DA;
  .iconfont {
    padding: 0 6px;
    }
  .container {
    position: absolute;
    height: 46%;
    width: 100%;
    margin: auto; // 元素垂直水平居中 设置绝对定位 top left right bottom 全部置零
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    padding: 0px 24px;
    .sub-btn {
      color:white;
      border-color: white;
    }
  }
  .link {
    position: fixed;
    bottom: 32px;
    margin: 0 auto;
    right: 0; // 使fixed对象中的元素水平居中
    left: 0;  // 使fixed对象中的元素水平居中
    a {
      color: white;
    }
  }
}
</style>
