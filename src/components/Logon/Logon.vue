<template>
  <div id="landpage" ref="landpage">
    <div class="container">
      <div class="header">
        <img src="" alt="">
        <h3>灵性天空</h3>
        <p>自我·本我·超我</p>
        <p>探索藏在深处的你</p>
      </div>
      <div class="input-info">
      <group title="登 录 信 息">
      <x-input title="用户名" v-model="username" type="text" required placeholder="请输入用户名">
        <i slot="label" class="iconfont icon-lianxirenwode"></i>
      </x-input>
      <x-input title="密码" v-model="password" type="password" required placeholder="请输入密码">
        <i slot="label" class="iconfont icon-suo"></i>
      </x-input>
    </group>
    <div class="errinfo">
        {{error}}
      </div>
      </div>
      
      <div class="foot">
         <x-button @click.native="subinfo" class="sub-btn" plain :show-loading="showload"> 登 录 </x-button>
      </div>
      <div class="link">
        <router-link to="/sigin">注册新用户</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { XInput, Group, XButton } from 'vux'
import {mapgetters} from 'vuex'
export default {
  name: 'landpage',
  data () {
    return {
      username: '',
      password: '',
      error: ''
    }
  },
  computed: {
    showload () {
      return this.$store.getters.getLoadingStatus;
    }
  },
  mounted () {
    this.$refs.landpage.style.width = window.screen.availWidth + 'px';
    this.$refs.landpage.style.height = window.screen.availHeight + 'px';
  },
  methods: {
    subinfo () {
      var _this = this
      var unreg = /[\u4e00-\u9fa5_a-zA-Z0-9_]{4,6}/ // 正则表达式对用户名做规则匹配
      var pwdreg = /^[a-zA-Z0-9]{6,8}$/ // 正则表达式对密码做规则匹配
      if (this.username === '' || this.password === '') {
        return
      }
      if (!this.username.match(unreg) || !this.password.match(pwdreg)) {
        this.error = '用户名或密码有误，请重新输入'
        return
      }
      this.$store.dispatch('getLogin', {'username': _this.username, 'password': _this.password}).then(res => {
        if (_this.$store.getters.getLoginSuccess) {
          if (window.localStorage) {
            window.localStorage.setItem('userinfo', res)
          }
          alert('you are login')
          _this.$router.push('/index')
        } else {
          alert(_this.$store.getters.getErrorMessage);
          this.error = '用户名或密码有误，请重新输入'
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
  #landpage {
    background-color: #212121;
    .iconfont {
      padding: 0 6px;
    }
    .container {
      position: relative;
      padding-top: 48px;
      background: url('./index_bg.png') no-repeat center;
      .header {
        width: 200px;
        height: 200px;
        padding: 24px;
        background-color: white;
        border-radius: 50%;
        margin: 0 auto;
      }
      .input-info {
        padding: 48px 36px;
        margin-top: 48px;
      }
      .foot {
        padding: 0 36px;
        .sub-btn {
          color: white;
          border-color: white;
          font-weight: 500;
        }
      }
      .errinfo {
        color: #FF4081;
        text-align: center;
      }
      .link {
        position: fixed;
        bottom: 32px;
        margin: 0 auto;
        right: 0; // 使fixed对象中的元素水平居中
        left: 0;  // 使fixed对象中的元素水平居中
      }
    }
    p {
      color: #797979;
      font-weight: 500;
      letter-spacing: 4px;
    }
  }
</style>
