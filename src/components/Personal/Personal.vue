<template>
  <div id="personal" ref="personal" style="height:100%;">
    <div class="top">
      <card>
        <div slot="header" class="card-head">
          <div class="person-avatar">
            <img :src="userinfo.avater" alt="avatar" width="78" height="78">
          </div>
        </div>
        <div slot="content" class="card-content">
          <p :class="{man:userinfo.sex === '男', woman:userinfo.sex === '女'}">
            <i class="iconfont icon-sexm" v-show="userinfo.sex === '男'"></i>
            <i class="iconfont icon-sexw" v-show="userinfo.sex === '女'"></i>&nbsp;&nbsp;{{userinfo.name}}</p>
        </div>
      </card>
    </div>
    <view-box body-padding-bottom="60px" body-padding-top="178px">
      <div slot="default">
        <card v-for="(item, index) in reservations.data" :key="index">
          <div slot="header" class="info-header">
            预约信息
          </div>
          <div slot="content" class="info-content">
            <div class="tag">
              <i class="iconfont icon-schedule"></i>
            </div>
            <div class="info">
              <p>
                <i class="iconfont icon-shouye2"></i>&nbsp;&nbsp;{{item.name}}</p>
              <p>
                <i class="iconfont icon-shouye10"></i>&nbsp;&nbsp;{{item.type}}</p>
              <p>
                <i class="iconfont icon-icon1"></i>&nbsp;&nbsp;{{item.date}}</p>
              <p>
                <i class="iconfont icon-shouye3"></i>&nbsp;&nbsp;{{item.address}}</p>
            </div>
          </div>
          <div slot="footer" class="info-footer">
            <step v-model="item.process" v-show="item.process !== 4" background-color="white">
              <step-item description="生成预约"></step-item>
              <step-item description="医生审核"></step-item>
              <step-item description="完成预约"></step-item>
            </step>
            <step v-model="failed" v-show="item.process === 4" background-color="white">
              <step-item description="生成预约"></step-item>
              <step-item description="医生审核"></step-item>
              <step-item description="预约失败"></step-item>
            </step>
          </div>
        </card>
      </div>
      <tabbar slot="bottom">
        <tabbar-item link="/index">
          <i slot="icon" class="iconfont icon-shouye"></i>
          <span slot="label">主页</span>
        </tabbar-item>
        <tabbar-item selected link="/personal">
          <i slot="icon" class="iconfont icon-shouye2"></i>
          <span slot="label">个人</span>
        </tabbar-item>
      </tabbar>
    </view-box>
  </div>
</template>

<script>
  import { Card, ViewBox, Group, Cell, Step, StepItem, Tabbar, TabbarItem } from 'vux'
  export default {
    components: {
      Card,
      ViewBox,
      Group,
      Cell,
      Step,
      StepItem,
      Tabbar,
      TabbarItem
    },
    data() {
      return {
        userinfo: {},
        reservations: {},
        failed: 2
      }
    },
    mounted() {
      this.userinfo = JSON.parse(window.localStorage.getItem('userinfo'))
      this.$store.dispatch('getReservation').then(res => {
        if (res.status === 'success') {
          this.reservations = res
        } else {
          this.$vux.alert.show({
            title: '错误提示',
            content: '抱歉，获取信息失败！<br/>请尝试重新登录<br>错误信息：' + res.errormessage,
            onHide() {
              window.location.reload()
            }
          })
        }
      })
    }
  }
</script>

<style lang="scss" scoped>
  #personal {
    .top {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 9999;
      width: 100%;
    }
    .man {
      color: lightblue;
    }
    .woman {
      color: magenta;
    }
    .card-head {
      position: relative;
      width: 100%;
      height: 84px;
      background-color: lightblue;
      .person-avatar {
        position: absolute;
        bottom: -39px;
        left: 50%;
        margin-left: -39px;
        img {
          border-radius: 50%;
          border: solid 3px white;
        }
      }
    }
    .card-content {
      padding-top: 44px;
      padding-bottom: 12px;
      p {
        font-size: 14px;
      }
    }
    .info-header,
    .info-content,
    .info-footer {
      text-align: left;
      padding: 0 16px;
      font-size: 14px;
    }
    .info-content {
      display: flex;
      align-items: center;
      padding-bottom: 12px;
      padding-top: 6px;
      .tag {
        flex: 72px 0 1;
        text-align: center;
        color: #88D9DA;
        i {
          font-size: 36px;
          display: block;
          border: solid 1px lightgray;
          border-radius: 4px;
        }
      }
      .info {
        flex: 1;
        padding-left: 18px;
      }
    }
    .info-footer {
      width: 100%;
      margin: 0 auto;
      padding-top: 4px;
      padding-bottom: 4px;
      padding-left: 12px;
      padding-right: 12px;
    }
  }
</style>
