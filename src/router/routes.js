import Logon from '@/components/Logon/Logon'
import Sigin from '@/components/Signin/Signin'
import Index from '@/components/Index/index'
import Message from '@/components/Message/Message'
import Personal from '@/components/Personal/Personal'

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
}, {
  path: '/message',
  component: Message
}, {
  path: '/personal',
  component: Personal
}]
