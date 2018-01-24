const Doctor = {
  'status|1': ['success', 'failed'],
  'errormessage': function () {
    if (this.status === 'out') {
      return 'receiving data failed ,please try again'
    }
  },
  'data': {
    'id': '@id',
    'name': '@cname',
    'rater|1-5.1-1': 1,
    'sex|1': ['男', '女'],
    'type|1': ['心理咨询', '塔罗牌', '催眠', '情感'],
    'description': '@cparagraph',
    'avatar': '@image("48x48", "blue", "white", "jpg", "1")',
    'address': '@county(true)',
    'phone': /((13[0-9])|(15[0-9])){1}\-\d{4}\-\d{4}/,
    'date|1-5': ['@date']
  }
}

module.exports = Doctor
