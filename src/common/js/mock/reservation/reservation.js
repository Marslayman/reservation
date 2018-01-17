const Reservation = {
  'status|1': ['success', 'error'],
  'error': function () {
    if (this.status === 'error') {
      return '信息提交失败,请尝试重新提交';
    }
  },
  'data|5-10': [{
    'id': '@id',
    'process|1': [1, 3, 4],
    'name': '@cword(3,7)',
    'date': '@date',
    'address': '@cword(8,11)',
    'type|1': ['心理学', '塔罗牌', '催眠']
  }]
}

module.exports = Reservation
