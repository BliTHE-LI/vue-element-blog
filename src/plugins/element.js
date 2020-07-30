import Vue from 'vue'
import {
  Button,
  Container,
  Header,
  Main,
  Footer,
  Row,
  Col,
  Menu,
  MenuItem,
  Submenu,
  Carousel,
  CarouselItem,
  Form,
  FormItem,
  Input,
  Link,
  Loading,
  MessageBox,
  Message,
  Notification,
  Aside
} from 'element-ui'

const components = {
  Button,
  Container,
  Header,
  Main,
  Footer,
  Row,
  Col,
  Menu,
  MenuItem,
  Submenu,
  Carousel,
  CarouselItem,
  Form,
  FormItem,
  Input,
  Link,
  Aside
}

Object.values(components).forEach(component => {
  Vue.use(component)
})
Vue.use(Loading.directive)

Vue.prototype.$loading = Loading.service
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt
Vue.prototype.$notify = Notification
Vue.prototype.$message = Message
// 在引入 Element 时，可以传入一个全局配置对象。
// 该对象目前支持 size 与 zIndex 字段。
// size 用于改变组件的默认尺寸，zIndex 设置弹框的初始 z-index（默认值：2000）。
// 按照引入 Element 的方式，具体操作如下：
// Vue.prototype.$ELEMENT = { size: 'small' }
