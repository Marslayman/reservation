import Logon from '@/components/Logon/Logon'
import Sigin from '@/components/Signin/Signin'
import Index from '@/components/Index/index'

export default [{
  path: '/',
  component: Logon
}, {
  path: '/login',
  component: Logon
}, {
  path: '/sigin',
  component: Sigin
}, {
  path: '/index',
  component: Index
}]
