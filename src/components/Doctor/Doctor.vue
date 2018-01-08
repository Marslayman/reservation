<template>
  <div id="doc-info" v-show="infoShow">
    <x-header>导师预约</x-header>
    <view-box >
    <sticky scroll-box="vux_view_box_body" ref="sticky" :check-sticky-support="false">
    <div class="container">
      <div class="header">
        <div class="avatar">
          <img :src="doctor.avatar" alt="doctor">
        </div>
        <div class="detail">
          <p>{{doctor.name}}</p>
          <p>{{doctor.type}}</p>
          <p><rater v-model="doctor.rater" star="♡" active-color="red" :margin="4" :font-size="18" disabled></rater>&nbsp;<span>{{doctor.rater}}</span></p>
        </div>
      </div>
      <divider>+</divider>
      <div class="desc">
        <h5>简介</h5>
        <p>{{doctor.description}}</p>
      </div>
      <div class="addr">
        <h5>地理位置</h5>
        <p><i class="iconfont icon-shouye3"></i>&nbsp;{{doctor.address}}</p>
      </div>
      <divider>+</divider>
      <div class="reserve">
        <h5>预约日期</h5>
        <p>提示：有<span style="background-color:green;color:white;font-weight:700;">已预约</span>标签的日期为该导师已经被预约的日期,请酌情选择有效日期进行预约</p>
      <inline-calendar @on-change="dateChange" :disable-past="disablePast" v-model="reserveDate" :render-function="renderDate"></inline-calendar>
        <p class="reserve-date">您要预约的日期是：{{reserveDate}}</p>
      </div>
      <x-button @click.native="reserveConfirm" type="primary"> 预 约 </x-button>
    </div>
    </sticky>
    </view-box>
  </div>
</template>

<script>
import { XHeader, Rater, Divider, InlineCalendar, ViewBox, Sticky, XButton } from 'vux'
export default {
  props: {
    infoShow: {
      types: Boolean,
      default: false
    },
    doctor: Object
  },
  data () {
    var _this = this
    return {
      reserveDate: '',
      disablePast: true,
      mark: ['2018-01-10', '2018-01-11'],
      renderDate (line, index, data) {
        if (_this.mark.indexOf(data.formatedDate) >= 0) {
          return '<div style="font-size:12px;text-align:center;"><span style="background-color:green;color:white;font-weight:700;">已预约</span></div>'
        } else {
          return '<div style="height:19px;"></div>'
        }
      }
    }
  },
  methods: {
    dateChange (val) {
      if (this.mark.indexOf(val) >= 0) {
        this.$vux.alert.show({
          title: '提示信息',
          content: '已经被预约，请重新选择预约日期'
        })
        this.reserveDate = ''
      } 
    },
    reserveConfirm () {
      if (this.reserveDate === '') {
        this.$vux.alert.show({
          title: '警告信息',
          content: '预约时间不能为空，请选择预约日期'
        })
      }
    }
  },
  components: {
    XHeader,
    Rater,
    Divider,
    InlineCalendar,
    ViewBox,
    Sticky,
    XButton
  }
}
</script>

<style lang="scss" scoped>
#doc-info {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: white;
  z-index: 9999;
  .container {
    padding: 12px 12px;
    .header {
      display: flex;
      align-items: center;
      padding-left: 32px;
      .avatar {
        flex: 0 1 auto;
        img {
          border-radius: 50%;
        }
      }
      .detail {
        flex: 1;
        p {
          vertical-align: top;
          span {
            font-size: 12px;
            color: rgb(129, 138 ,139);
          }
        }
        p:nth-child(2) {
          color: rgb(65, 194, 113);
          font-style: italic;
        }
        p:nth-child(1) {
          color: rgb(74, 80, 83);
          font-weight: 800;
        }
      }
    }
    .desc, .addr, .reserve {
      text-align: left;
      h5 {
        font-size: 16px;
        font-weight: 800;
        color: rgb(74, 80, 83)
      }
      p {
        font-size: 14px;
        margin-bottom: 12px;
        color: rgb(129, 138 ,139);
        &.reserve-date {
          font-weight: 700;
          margin-top: 12px;
          color: green;
            }
      }
    }
  }
}
</style>
