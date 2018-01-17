import Mock from 'mockjs'
import Reservation from './reservation'

Mock.mock('/api/reservation', Reservation)

export default Mock
