<template>
  <div class="doc" style="padding-bottom: 50px;">
    <aside style="margin-top: 30px;"><b>说明文档</b></aside>
    <div class="label" v-for="(item,key) in tableList" :key="key">
      <aside style="margin-top: 30px;">{{item.label}}</aside>
      <el-table :data="item.data" border style="width: 100%">
        <el-table-column prop="parameter" label="参数" width="150"></el-table-column>
        <el-table-column prop="explain" label="说明"></el-table-column>
        <el-table-column prop="type" label="类型" width="120"></el-table-column>
        <el-table-column prop="optional" label="可选值" width="180"></el-table-column>
        <el-table-column prop="default" label="默认值" width="150"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { Table, TableColumn } from 'element-ui'
export default {
  props: {},
  components: {
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
  },
  data() {
    return {
      tableList: {
        attrData: {
          label: "属性说明",
          data: [
            {
              parameter: "width",
              explain:
                "组件宽度（因为组件时段选择只支持选到分钟单位，24小时24*60=1440秒，组件宽度最好以1440px为被除数）",
              type: "String",
              optional: "--",
              default: "720px"
            },
            {
              parameter: "weekList",
              explain: "周列表数据",
              type: "Array",
              optional: "--",
              default:
                "[{label: '周一',active: false,timeList: []},...{label: '周日',active: false,timeList: []}]"
            },
            {
              parameter: "props",
              explain: "关键字段标识",
              type: "Object",
              optional: "--",
              default:
                "{label: 'label',timeList: 'timeList',startTime: 'startTime',endTime: 'endTime',}"
            },
            {
              parameter: "disabled",
              explain: "只读模式",
              type: "Boolean",
              optional: "true/false",
              default: "false"
            }
          ]
        },
        eventsData: {
          label: "Events说明",
          data: [
            {
              parameter: "change",
              explain: "组件时段数据发生变化时回调函数,回调参数为整周时段数据",
              type: "Function",
              optional: "Function(data)",
              default: "--"
            }
          ]
        },
        refsData: {
          label: "refs方法说明",
          data: [
            {
              parameter: "resetForm",
              explain: "清空数据",
              type: "--",
              optional: "--",
              default: "--"
            }
          ]
        }
      }
    };
  },
  mounted() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
@import '@/styles/index.scss';
</style>