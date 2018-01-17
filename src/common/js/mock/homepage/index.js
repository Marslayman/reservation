import Mock from 'mockjs'
import Homepage from './homepage'

Mock.mock('/api/homepage', Homepage)

export default Mock
