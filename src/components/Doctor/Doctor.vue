<template>
  <div id="doc-info">
    <x-header>导师预约</x-header>
    <view-box >
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
        <p>提示：有<span style="background-color:#88D9DA;color:white;font-weight:700;">已预约</span>标签的日期为该导师已经被预约的日期,请酌情选择有效日期进行预约</p>
      <inline-calendar :disable-past="disablePast" @on-change="dateChange" v-model="reserveDate" :render-function="renderDate"></inline-calendar>
        <p class="reserve-date">您要预约的日期是：{{reserveDate}}<span style="color:red;" v-show="ErrMsg">请选择预约日期</span></p>
      </div>
      <x-button @click.native="reserveConfirm" type="primary"> 预 约 </x-button>
    </div>
    <div v-transfer-dom>
      <popup v-model="order" position="top" style="z-index: 99999;">
        <div class="orderinfo">
          <div class="topinfo">
             <icon type="success" is-msg></icon>
             <h4>预约信息已生成</h4>
             <p>请确认您的预约信息<br/>确认无误后提交</p>
          </div>
          <divider>+</divider>
          <div class="orderdetails">
            <h4>预约详情</h4>
            <h5>姓名</h5>
            <p>{{userinfo.name}}</p>
            <h5>联系电话</h5>
            <p>{{userinfo.phone}}</p>
            <h5>预约日期</h5>
            <p>{{reserveDate}}</p>
            <h5>备注信息</h5>
            <textarea rows="4" v-model="extrainfo" placeholder="附加信息"></textarea>
            <divider>+</divider>
            <h4>导师</h4>
            <div class="card">
            <div class="avatar">
              <img :src="doctor.avatar" alt="doctor" width="72px" height="72px">
            </div>
            <div class="detail">
              <p>{{doctor.name}}</p>
              <p>{{doctor.type}}</p>
              <p><rater v-model="doctor.rater" star="♡" active-color="red" :margin="4" :font-size="18" disabled></rater>&nbsp;<span>{{doctor.rater}}</span></p>
            </div>
            </div>
          </div>
          <div class="submitinfo">
            <x-button type="primary" style="border-radius:99px;"  @click.native="submitInfo">提 交</x-button>
            <x-button plain style="border-radius:99px;" @click.native="goBack">取 消</x-button>
          </div>
        </div>
      </popup>
    </div>
    </view-box>
  </div>
</template>

<script>
import { XHeader, Rater, Divider, InlineCalendar, ViewBox, Sticky, XButton, TransferDom, Popup, Icon } from 'vux'
// import message from '../Message/Message'
// import doctor from '../Doctor/Doctor'
export default {
  directives: {
    TransferDom
  },
  data () {
    var _this = this
    return {
      reserveDate: '',
      doctor: {},
      extrainfo: '',
      ErrMsg: false,
      order: false,
      userinfo: (function () {
        var user = window.localStorage.getItem('userinfo')
        var userinfo = JSON.parse(user)
        return userinfo
      })(),
      disablePast: true,
      mark: ['2018-01-10', '2018-01-11'],
      renderDate (line, index, data) {
        if (_this.mark.indexOf(data.formatedDate) >= 0) {
          return '<div style="font-size:12px;text-align:center;"><span style="background-color:#88D9DA;color:white;font-weight:700;">已预约</span></div>'
        } else {
          return '<div style="height:19px;"></div>'
        }
      }
    }
  },
  created () {
    this.getDocDetail()
  },
  watch: {
    '$route': 'getDocDetail'
  },
  methods: {
    getDocDetail () {
      var id = this.$route.params.id
      this.$store.dispatch('getDocDetail', id).then(res => {
        if (res.status === 'success') {
          this.doctor = res.data
          var aa = JSON.stringify(this.doctor)
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
    },
    dateChange (val) {
      if (this.mark.indexOf(val) >= 0) {
        this.reserveDate = ''
      }
      if (this.ErrMsg) {
        this.ErrMsg = false
      }
    },
    goBack () {

    },
    submitInfo () {
      var _this = this
      var reserveinfo = {
        'name': this.doctor.name,
        'type': this.doctor.type,
        'extrainfo': this.extrainfo,
        'date': this.reserveDate,
        'avatar': this.avater,
        'rate': this.doctor.rater
      }
      this.$store.dispatch('submitInfo', reserveinfo).then(res => {
        var result = res
        if (result.status === 'success') {
          _this.$router.push('/message')
        } else {
          this.$vux.alert.show({
            title: '错误提示',
            content: '信息提交失败,请尝试重新提交请求<br>错误信息：' + result.error + result.status
          })
        }
      })
    },
    reserveConfirm () {
      if (this.reserveDate === '') {
        this.ErrMsg = true
        return
      }
      this.order = true
    }
  },
  components: {
    XHeader,
    Rater,
    Divider,
    InlineCalendar,
    ViewBox,
    Sticky,
    XButton,
    TransferDom,
    Popup,
    Icon
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
  padding-bottom: 12px;
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
          color: #88D9DA;
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
          color: #88D9DA;
            }
      }
    }
  }
}
.orderinfo {
  width: 100%;
  height: 100%;
  padding: 24px 16px;
  background-color: white;
  .topinfo {
    text-align: center;
    margin-bottom: 36px;
    h4 {
      color: rgb(83, 89, 93);
      margin-top: 28px;
      font-weight: 700;
    }
    p {
      color: rgb(164, 169, 171);
      font-size: 14px;
    }
  }
  .orderdetails, .submitinfo {
    margin-bottom: 12px;
    padding: 0 12px;
    h4 {
      color: #88D9DA;
      font-weight: 700;
      margin-bottom: 8px;
    }
    h5 {
      color: rgb(83, 89, 93);
      font-weight: 700;
    }
    p {
      color: rgb(164, 169, 171);
      font-size: 14px;
      margin-bottom: 12px;
    }
    textarea {
      margin-top: 4px;
      width: 100%;
      border: 1px solid #88D9DA;
      border-radius: 8px;
      margin-bottom: 8px;
      padding: 8px;
    }
    .card {
      width: 100%;
      border: 1px solid #B9BDC0;
      border-radius: 4px;
      display: flex;
      align-items: center;
      padding-top: 0px;
      padding-right: 18px;
      padding-left: 18px;
      margin-bottom: 32px;
      .avatar {
        flex: 74px 0 1;
        text-align: center;
        img {
          border-radius: 50%;
        }
      }
      .detail {
        flex: 1;
        padding-top: 12px;
        padding-left: 18px;
        p:nth-child(2) {
          color: #88D9DA;
          font-style: italic;
        }
      }
    }
  }
}
</style>
