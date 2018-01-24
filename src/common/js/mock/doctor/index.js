import Mock from 'mockjs'
import Doctor from './doctor'

Mock.mock('/api/doctorinfo', Doctor)

export default Mock
