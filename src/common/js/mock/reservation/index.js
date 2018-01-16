import Mock from 'mockjs'
import Reservation from './reservation'

Mock.mock('/api/reserve', Reservation)

export default Mock
