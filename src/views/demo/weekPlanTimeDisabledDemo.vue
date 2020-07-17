<template>
  <div style="padding: 10px;margin-bottom: 50px;">
    <aside>只读模式</aside>
    <week-plan-time ref="weekPlanTime" :weekList="weekList" :disabled="true" @change="selectBack" />
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
  name: "",
  props: {},
  mixins: [],
  components: {WeekPlanTime},
  data() {
    return {
      activeNames: "1",
      weekList: [
        {
          label: "周一",
          active: false,
          timeList: [
            {
              startTime: "00:00",
              endTime: "24:00"
            }
          ]
        },
        {
          label: "周二",
          active: false,
          timeList: [
            {
              startTime: "00:00",
              endTime: "24:00"
            }
          ]
        },
        {
          label: "周三",
          active: false,
          timeList: [
            {
              startTime: "00:00",
              endTime: "24:00"
            }
          ]
        },
        {
          label: "周四",
          active: false,
          timeList: [
            {
              startTime: "00:00",
              endTime: "24:00"
            }
          ]
        },
        {
          label: "周五",
          active: false,
          timeList: [
            {
              startTime: "00:00",
              endTime: "24:00"
            }
          ]
        },
        { label: "周六", active: false, timeList: [] },
        { label: "周日", active: false, timeList: [] }
      ],
      preData: `
      \<template\>
        \<week-plan-time :disabled="true" :weekList="weekList" ref="weekPlanTime" @change="selectBack" \/\>
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
            }
          }
        }
      \<\/script\>
      `
    };
  },
  created() {},
  mounted() {},
  computed: {},
  watch: {},
  methods: {
    selectBack(data) {
      console.log(data)
    },
    resetForm(name) {
      this.$refs[name].resetForm()
    }
  },
  filters: {},
  beforeDestroy() {}
};
</script>

<style lang="scss" scoped>
@import '@/styles/index.scss';
</style>