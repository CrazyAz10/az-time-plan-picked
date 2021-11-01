// 导入自己需要的组件
import {
  Button,
  Checkbox,
  CheckboxGroup,
  Collapse,
  CollapseItem,
  Radio,
  Icon,
  Tag,
  Table,
  TableColumn,
  TimePicker,
  Popover,
  Loading,
  Switch,
  MessageBox,
  Message
} from 'element-ui'

const element = {
  install: (Vue) => {
    Vue.use(Button)
    Vue.use(Checkbox)
    Vue.use(CheckboxGroup)
    Vue.use(Collapse)
    Vue.use(CollapseItem)
    Vue.use(Radio)
    Vue.use(Icon)
    Vue.use(Loading)
    Vue.use(Tag)
    Vue.use(Table)
    Vue.use(TableColumn)
    Vue.use(TimePicker)
    Vue.use(Popover)
    Vue.use(Switch)
    Vue.prototype.$loading = Loading.service
    Vue.prototype.$msgbox = MessageBox
    Vue.prototype.$alert = MessageBox.alert
    Vue.prototype.$confirm = MessageBox.confirm
    Vue.prototype.$prompt = MessageBox.prompt
    Vue.prototype.$message = Message
  }
}

export default element
