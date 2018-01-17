const Validation = {
  'status|1': ['yes', 'no'],
  'error': function () {
    if (this.status === 'no') {
      return 'something error happenned,please resubmit!';
    }
  },
  'code': function () {
    if (this.status === 'yes') {
      return '456789'
    }
  }
}

module.exports = Validation
