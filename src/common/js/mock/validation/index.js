import Mock from 'mockjs'
import Validation from './validation'

Mock.mock('/api/validation', Validation)

export default Mock
