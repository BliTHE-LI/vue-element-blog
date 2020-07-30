import { createNamespacedHelpers } from 'vuex'
const { mapState } = createNamespacedHelpers('user')
export default {
  data () {
    return {
      menuList: []
    }
  },
  computed: {
    ...mapState(['userInfo'])
  },
  mounted () {
    this.menuList = this.getMenuList(this.userInfo.authList)
  },
  methods: {
    getMenuList (authList) {
      const menu = []
      const menuMap = {}
      authList = authList.sort((a, b) => a.pid - b.pid)
      authList.forEach(m => {
        m.children = []
        menuMap[m.id] = m
        if (m.pid === -1) {
          menu.push(m)
        } else {
          menuMap[m.pid] && menuMap[m.pid].children.push(m)
        }
      })

      return menu
    }
  },
  render () {
    // 递归生成菜单
    const renderChildren = (children) => {
      return children.map(child => {
        return child.children.length
          ? <el-submenu index={child._id}>
            <div slot="title">{child.name}</div>
            {renderChildren(child.children)}
          </el-submenu>
          : <el-menu-item index={child.path}>{child.name}</el-menu-item>
      })
    }
    return <el-menu
      background-color="#333"
      text-color="#fff"
      default-active={this.$route.path}
      router={true}
    >
      {renderChildren(this.menuList)}
    </el-menu>
  }
}
