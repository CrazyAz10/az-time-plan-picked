<template>
  <div style="padding: 10px;margin-bottom: 50px;">
    <aside>基础用法</aside>
    <week-plan-time ref="weekPlanTime" @change="selectBack" />
    <p style="text-align: center;">
      <el-button type="primary" @click="resetForm('weekPlanTime')">重置表单</el-button>
    </p>
    <el-collapse v-model="activeNames">
      <el-collapse-item title="代码演示" name="1">
        <xmp style="background: #303133;color: #fff;" v-html="preData"></xmp>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import WeekPlanTime from '@/components/WeekPlanTime'
export default {
  name: '',
  props: {},
  mixins: [],
  components: {
    WeekPlanTime
  },
  data() {
    return {
      activeNames:'1',
      preData: `
    \<template\>
      \<week-plan-time ref="weekPlanTime" @change="selectBack" \/\>
      \<p style="text-align: center;"\>
        \<el-button type="primary" @click="resetForm('weekPlanTime')"\>重置表单\<\/el-button\>
      \<\/p\>
    \<\/template\>


    \<script\>
      import WeekPlanTime from '@/components/WeekPlanTime'
      export default {
        components: {
          WeekPlanTime
        },
        methods: {
          selectBack(list) {
            console.log(list)
          },
          resetForm(name) {
            this.$refs[name].resetForm()
          }
        }
      }
    \<\/script\>
    `
    }
  },
  methods: {
    selectBack(data) {
      console.log(data)
    },
    resetForm(name) {
      this.$refs[name].resetForm()
    }
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/index.scss';
</style>