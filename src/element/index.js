// 导入自己需要的组件
import {
  Button,
  Checkbox,
  CheckboxGroup,
  Icon,
  Tag,
  Table,
  TableColumn,
  Popover,
  Loading,
  MessageBox,
  Message
} from 'element-ui'

const element = {
  install: (Vue) => {
    Vue.use(Button)
    Vue.use(Checkbox)
    Vue.use(CheckboxGroup)
    Vue.use(Icon)
    Vue.use(Loading)
    Vue.use(Tag)
    Vue.use(Table)
    Vue.use(TableColumn)
    Vue.use(Popover)
    Vue.prototype.$loading = Loading.service
    Vue.prototype.$msgbox = MessageBox
    Vue.prototype.$alert = MessageBox.alert
    Vue.prototype.$confirm = MessageBox.confirm
    Vue.prototype.$prompt = MessageBox.prompt
    Vue.prototype.$message = Message
  }
}

export default element
