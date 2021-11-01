<template>
  <div style="padding: 10px;margin-bottom: 50px;">
    <aside>基础用法</aside>
    <week-plan-time ref="weekPlanTime" :repeat="repeat" :timeLevel="timeLevel" :weekList="weekList" @change="selectBack" />
    <p style="text-align: center;">
      <el-radio v-model="timeLevel" @change="resetForm('weekPlanTime')" label="ss">秒级</el-radio>
      <el-radio v-model="timeLevel" @change="resetForm('weekPlanTime')" label="mm">分级</el-radio>
    </p>
    <p style="text-align: center;">
      复选模式：
      <el-switch
        v-model="repeat"
        @change="resetForm('weekPlanTime')"
        active-color="#13ce66"
        inactive-color="#ff4949">
      </el-switch>
    </p>
    <p style="text-align: center;">
      <el-button type="primary" :weekList="weekList" @click="resetForm('weekPlanTime')">重置表单</el-button>
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
      timeLevel: 'ss',
      repeat: true,
      weekList: [
        {
          label: "MON",
          active: false,
          timeList: [
            {
              startTime: "00:00:00",
              endTime: "24:00:00"
            }
          ]
        },
        {
          label: "TUE",
          active: false,
          timeList: [
            
          ]
        },
        {
          label: "WED",
          active: false,
          timeList: [
            
          ]
        },
        {
          label: "THU",
          active: false,
          timeList: [
            
          ]
        },
        {
          label: "FRI",
          active: false,
          timeList: [
            
          ]
        },
        {
          label: "SAT",
          active: false,
          timeList: [
            
          ]
        },
        {
          label: "SUN",
          active: false,
          timeList: [
            
          ]
        },
      ],
      preData: `
    \<template\>
      \<week-plan-time ref="weekPlanTime" :timeLevel="timeLevel" @change="selectBack" \/\>
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
        data() {
          return {
            timeLevel: 'ss',
            repeat: false,
            weekList: [
              {
                label: "MON",
                active: false,
                timeList: [
                  {
                    startTime: "00:00:00",
                    endTime: "24:00:00"
                  }
                ]
              },
              {
                label: "TUE",
                active: false,
                timeList: [
                  
                ]
              },
              {
                label: "WED",
                active: false,
                timeList: [
                  
                ]
              },
              {
                label: "THU",
                active: false,
                timeList: [
                  
                ]
              },
              {
                label: "FRI",
                active: false,
                timeList: [
                  
                ]
              },
              {
                label: "SAT",
                active: false,
                timeList: [
                  
                ]
              },
              {
                label: "SUN",
                active: false,
                timeList: [
                  
                ]
              },
            ],
          }
        }
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
      // console.log(data)
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