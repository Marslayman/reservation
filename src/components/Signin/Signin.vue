<template>
  <div id="signin" ref="signin">
    <div class="container">
       <group title="新用户注册">
      <x-input title="用户名" v-model="username" type="text" required placeholder="请输入用户名">
        <i slot="label" class="iconfont icon-lianxirenwode"></i>
      </x-input>
      <x-input title="密码" v-model="password" type="password" required placeholder="请输入密码">
        <i slot="label" class="iconfont icon-suo"></i>
      </x-input>
      <x-input title="密码" v-model="confirm" type="password" required placeholder="再次输入密码">
        <i slot="label" class="iconfont icon-suo"></i>
      </x-input>
    </group>
     <div class="errinfo">
        {{error}}
      </div>
    <br>
    <x-button @click.native="register" class="sub-btn" plain :show-loading="showload"> 注册 </x-button>
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
      showload: false,
      username: '',
      confirm: '',
      error: '',
      password: ''
    }
  },
  mounted () {
    this.$refs.signin.style.width = window.screen.availWidth + 'px';
    this.$refs.signin.style.height = window.screen.availHeight + 'px';
  },
  methods: {
    register () {
      var _this = this
      if (this.username === '' || this.password === '' || this.confirm === '') {
        return;
      }
      var unreg = /[\u4e00-\u9fa5_a-zA-Z0-9_]{4,6}/ // 正则表达式对用户名做规则匹配
      var pwdreg = /^[a-zA-Z0-9]{6,8}$/ // 正则表达式对密码做规则匹配
      if (!this.username.match(unreg) || !this.password.match(pwdreg)) {
        this.error = '用户名或密码有误，请重新输入'
        return
      }
      if (this.password !== this.confirm) {
        this.error = '密码不一致，请重新输入！'
        return
      }
      this.$store.dispatch('getSigin', {'username': this.username, 'confirm': this.confirm}).then(res => {
        if (_this.$store.getters.getSigninSuccess) {
          alert('you are in')
          _this.$router.push('/login')
        } else {
          alert(_this.$store.getters.getSigninMessage)
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
  .iconfont {
    padding: 0 6px;
    }
  .container {
    position: absolute;
    height: 40%;
    width: 100%;
    margin: auto; // 元素垂直水平居中 设置绝对定位 top left right bottom 全部置零
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    border-top: 2px solid rgba(7, 17, 27, .5);
    border-bottom: 2px solid rgba(7, 17, 27, .5);
    .errinfo {
      color: #FF4081;
      text-align: center;
    }
  }
  .link {
    position: fixed;
    bottom: 32px;
    margin: 0 auto;
    right: 0; // 使fixed对象中的元素水平居中
    left: 0;  // 使fixed对象中的元素水平居中
    a {
      color: black;
    }
  }
}
</style>
