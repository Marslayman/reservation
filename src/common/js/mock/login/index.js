import Mock from 'mockjs'
import Login from './login'

Mock.mock('/api/login', Login)

export default Mock
