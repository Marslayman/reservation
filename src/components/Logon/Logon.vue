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
      <x-input title="用户名" v-model="username" type="text" required placeholder="请输入手机号">
        <i slot="label" class="iconfont icon-lianxirenwode"></i>
      </x-input>
      <x-input title="密码" v-model="password" type="password" required placeholder="请输入密码">
        <i slot="label" class="iconfont icon-suo"></i>
      </x-input>
    </group>
      </div>
      <div class="foot">
         <x-button @click.native="subinfo" class="sub-btn" plain > 登 录 </x-button>
      </div>
      <div class="link">
        <router-link to="/sigin">注册新用户</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { XInput, Group, XButton } from 'vux'
export default {
  name: 'landpage',
  data () {
    return {
      username: '',
      password: ''
    }
  },
  mounted () {
    this.$refs.landpage.style.width = window.screen.availWidth + 'px';
    this.$refs.landpage.style.height = window.screen.availHeight + 'px';
  },
  methods: {
    subinfo () {
      var _this = this
      var unreg = /^1[3|4|5|7|8][0-9]{9}$/ // 正则表达式对用户名做规则匹配
      var pwdreg = /^[a-zA-Z0-9]{6,8}$/ // 正则表达式对密码做规则匹配
      if (this.username === '' || this.password === '') {
        return
      }
      if (!this.username.match(unreg) || !this.password.match(pwdreg)) {
        this.$vux.alert.show({
          title: '错误提示',
          content: '手机号格式或密码有误<br>请确认后重启提交'
        })
        return
      }
      this.$store.dispatch('getLogin', {'username': _this.username, 'password': _this.password}).then(res => {
        var user = res.data
        if (res.status === 'in') {
          if (window.localStorage && window.localStorage.getItem('userinfo') === undefined) {
            window.localStorage.setItem('userinfo', JSON.stringify(user)) // JSON.stringify 将对象转换为字符串
          }
          _this.$router.push('/index')
        } else {
          this.$vux.alert.show({
            title: '错误提示',
            content: '登录失败<br/>请尝试重新提交请求<br>错误信息：' + _this.$store.getters.getErrorMessage
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
  #landpage {
    background-color: #88D9DA;
    .iconfont {
      padding: 0 6px;
    }
    .container {
      position: relative;
      padding-top: 48px;
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
        a {
          color: white;
        }
      }
    }
    p {
      color: #797979;
      font-weight: 500;
      letter-spacing: 4px;
    }
  }
</style>
