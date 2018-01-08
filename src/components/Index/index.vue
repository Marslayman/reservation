<template>
  <div id="index" style="height:100%;">
    <view-box body-padding-bottom="48px" body-padding-top="0px">
    <swiper :aspect-ratio="500/900" auto>
    <swiper-item class="swiper-demo-img" v-for="(item, index) in headerinfo.banner" :key="index"><a :href="item.url"><img :src="item.img"></a></swiper-item>
    </swiper>
      <sticky scroll-box="vux_view_box_body" ref="sticky" :check-sticky-support="false">
        <group label-width="5.5em" label-margin-right="2em" label-align="justify" gutter="0px">
          <cell :value="type" :border-intent="false" is-link @click.native="showPopup=true">
            <span slot="title">类型</span>
          </cell>
        </group>
      </sticky>
    <div v-transfer-dom>
      <popup v-model="showPopup" class="checker-popup">
        <div style="padding:10px 10px 40px 10px;">
          <p style="padding: 5px 5px 5px 2px;color:#888;">选择类型</p>
          <checker
          v-model="type"
          default-item-class="demo4-item"
          selected-item-class="demo4-item-selected"
          disabled-item-class="demo4-item-disabled">
            <checker-item :value="item" v-for="(item, key) in types" :key="key" @on-item-click="onItemClick"> {{item}} </checker-item>
          </checker>
        </div>
      </popup>
    </div>
    <group class="info-container" slot="default">
      <cell v-for="(item, index) in headerinfo.data" :key="index" @click.native="doctorInfo(item)" v-show="onTypeFilter(item.type, type)">
        <div class="content-r" slot="icon">
          <img :src="item.avatar" alt="">
        </div>
        <div class="content-l" slot="after-title">
          <p><i class="iconfont icon-mine_fill"></i>{{item.name}}</p>
          <p><i class="iconfont icon-mine_fill"></i>{{item.type}}</p>
          <p><i class="iconfont icon-coordinates_fill"></i>{{item.address}}</p>
          <p><i class="iconfont icon-mobilephone_fill"></i>{{item.phone}}</p>
          <p><i class="iconfont icon-like_fill"></i><rater v-model="item.rater" star="♡" active-color="red" :margin="4" :font-size="18" disabled></rater></p>
        </div>
      </cell>
    </group>
     <tabbar slot="bottom">
      <tabbar-item show-dot>
        <span slot="label">主页</span>
      </tabbar-item>
      <tabbar-item badge="2">
        <!-- <img slot="icon" src="../assets/demo/icon_nav_cell.png"> -->
        <span slot="label">个人</span>
      </tabbar-item>
    </tabbar>
    </view-box>
    <doctor :infoShow="infoShow" :doctor="doctor"></doctor>
  </div>
</template>

<script>
import { Swiper, SwiperItem, Divider, Cell, Group, Rater, Tabbar, TabbarItem, Checker, CheckerItem, Popup, TransferDom, ViewBox, Sticky } from 'vux'
import doctor from '../Doctor/Doctor'
export default {
  directives: {
    TransferDom
  },
  components: {
    Swiper,
    SwiperItem,
    Divider,
    Cell,
    Group,
    Rater,
    Tabbar,
    doctor,
    TabbarItem,
    Checker, 
    CheckerItem, 
    Popup, 
    TransferDom,
    ViewBox,
    Sticky
  },
  computed: {

  },
  methods: {
    onItemClick (value, disabled) {
      this.type = value
      if (!this.disabled) {
        this.showPopup = false
      }
    },
    doctorInfo (item) {
      this.infoShow = true
      this.doctor = item
      alert('step into doctor page')
    },
    onTypeFilter (originType, setType) {
      if (setType === '全部') {
        return true
      }
      if (originType === setType) {
        return true
      } else {
        return false
      }
    }
  },
  mounted() {
    this.$store.dispatch('getHomepageInfo').then(res => {
      if (res.status === 'in') {
        this.headerinfo = res
      } else {
        this.$vux.alert.show({
          title: '错误提示',
          content: '抱歉，获取信息失败！<br/>请尝试重新登录<br>错误信息：' + res.errormessage,
          onHide () {
            window.location.reload()
          }
        })
      }
    })
  },
  data () {
    return {
      headerinfo: {},
      showPopup: false,
      infoShow: false,
      doctor: {},
      type: '全部',
      types: [ '全部', '心理咨询', '塔罗牌', '催眠', '情感' ]
    }
  }
}
</script>

<style lang="scss" scoped>
.content-r img {
    border-radius: 50%;
}
.content-l {
  text-align: left;
  padding-left: 16px;
  p {
    font-size: 14px;
    vertical-align: middle;
    .icon-mine_fill,.icon-coordinates_fill,.icon-mobilephone_fill,.icon-like_fill {
      font-size: 18px;
      padding-right: 4px;
    }
  }
}
.swiper-demo-img img {
  width: 100%;
}
.demo4-item {
  background-color: #ddd;
  color: #222;
  font-size: 14px;
  padding: 5px 10px;
  margin-right: 10px;
  line-height: 18px;
  border-radius: 15px;
}
.demo4-item-selected {
  background-color: #FF3B3B;
  color: #fff;
}
.demo4-item-disabled {
  color: #999;
}
</style>
