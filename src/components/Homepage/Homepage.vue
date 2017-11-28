<template>
  <div class="homepage" ref="homepage">
    <div class="head-img">
      <img src="./index_bg1.gif" alt="仰望天空">
    </div>
    <div class="text">
      <h2>灵性天空</h2>
      <p>--- - ---</p>
      <p>我是谁</p>
      <p>我从哪里来</p>
      <p>要到哪里去</p>
      <p>一场关于自我的奇妙旅程</p>
      <p>--- + ---</p>
    </div>
    <div class="button-container">
      <mu-raised-button label=" 开启旅程 " to="/reserve" primary/>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  mounted () {
    this.$refs.homepage.style.height = window.screen.height + 'px';
  }
}
</script>

<style lang="scss" scoped>
.homepage {
  .head-img {
    position: relative;
    width: 100%;
    height: 60%;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .text {
    margin-top: 18px;
    color: rgb(147,153,159);
  }
  .button-container {
    margin-top: 18px;
  }
}
@media screen and (max-width: 320px) {
  .homepage {
    .head-img {
      position: relative;
      width: 100%;
      height: 310px;
      overflow: hidden;
      img {
        width: 100%;
      }
    }
  }
  .text {
    margin-top: 12px;
    color: rgb(147,153,159);
  }
  .button-container {
    margin-top: 12px;
  }  
}
</style>

