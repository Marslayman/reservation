import Mock from 'mockjs'
import Reserve from './reserve'

Mock.mock('/api/reserve', Reserve)

export default Mock
