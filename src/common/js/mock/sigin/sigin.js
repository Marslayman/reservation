const Sigin = {
  'status|1': ['yes', 'no'],
  'error': function () {
    if (this.status === 'no') {
      return 'something error happenned,please resubmit!';
    }
  }
}

module.exports = Sigin
