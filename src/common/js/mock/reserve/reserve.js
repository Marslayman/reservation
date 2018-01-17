const Reservation = {
  'status|1': ['success', 'error'],
  'error': function () {
    if (this.status === 'error') {
      return '信息提交失败,请尝试重新提交';
    }
  }
}

module.exports = Reservation
