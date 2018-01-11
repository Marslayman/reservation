const Login = {
  'status|1': ['in', 'out'],
  'error': function () {
    if (this.status === 'out') {
      return 'input infomation error, login failed';
    }
  },
  'data': {
    'id': '@id',
    'name': '@cname',
    'sex|1': ['男', '女'],
    'username': '@cword(3,7)',
    'age': '@date',
    'avater': '@image("200x200", "#894FC4", "#FFF", "png")',
    'phone': /((13[0-9])|(15[0-9])){1}\-\d{4}\-\d{4}/
  }
}

module.exports = Login
