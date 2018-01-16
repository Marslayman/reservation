const Reservation = {
  'status|1': ['success', 'error'],
  'error': function () {
    if (this.status === 'error') {
      return '信息提交失败,请尝试重新提交';
    }
  },
  'data|3-8': {
    'id': '@id',
    'process|1': ['0', '1', '2'],
    'name': '@cword(3,7)',
    'date': '@date',
    'avater': '@image("200x200", "#894FC4", "#FFF", "png")',
    'type|1': ['心理学', '塔罗牌', '催眠']
  }
}

module.exports = Reservation
