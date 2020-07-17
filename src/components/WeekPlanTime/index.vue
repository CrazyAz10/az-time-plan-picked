<template>
  <!-- 
  作者：啊佐 
  gitHub: MrChenGG
  创建时间：2020-07-15
  组件功能：
    周一 至 周日 七日每日24小时 多段 时段选择器
  功能缺失：
    时段拉伸 未限制已有时段范围 只限制了最大最小范围
  -->
  <div class="week-plan-time-wrap">
    <div class="tool-tips clearfix" :style="{maxWidth: boxWidth}">
      <el-tag size="medium">
        <s class="circular"></s>
        <span class="tip">识别时段</span>
      </el-tag>
      <el-button v-if="!disabled" size="mini" type="info" class="fr" @click.stop="resetForm" plain icon="el-icon-delete">清空</el-button>
    </div>
    <div class="scroll-box">
      <div class="week-plan-time" :style="{width: boxWidth}">
        <div class="az-time-list">
          <ul ref="timeContainer">
            <li v-for="index in 24" :key="index">{{index-1}}</li>
          </ul>
        </div>
        <div class="az-week-list">
          <div class="week-item" v-for="(item,index) in weekList" :key="index">
            <span class="label">{{item[props.label]}}</span>
            <div
              class="time-swiper"
              @mousedown.stop="event => mousedownStart(event,[index,item[props.timeList].length-1])"
            >
              <s class="chunk" v-for="ind in 24" :key="ind"></s>
              <el-popover
                placement="top"
                width="240"
                v-for="(time,ind) in item[props.timeList]"
                :key="ind+'_'"
                trigger="click"
                :ref="`popover-${index}-${ind}`"
              >
                <div
                  class="slider-time"
                  :class="{'active': (activeTime[0] == index && activeTime[1] == ind)}"
                  :style="{width: time.width,left: time.pointX}"
                  slot="reference"
                >
                  <div
                    class="content"
                    @mousedown.stop="event => arrowsStart(event,time,'content',[index,ind])"
                  ></div>
                  <div
                    class="left-arrows arrows"
                    v-if="(activeTime[0] == index && activeTime[1] == ind)"
                    @mousedown.stop="event => arrowsStart(event,time,'start')"
                  >
                    <i class="el-icon-caret-bottom" />
                    <i class="el-icon-caret-top" />
                  </div>
                  <div
                    class="right-arrows arrows"
                    v-if="(activeTime[0] == index && activeTime[1] == ind)"
                    @mousedown.stop="event => arrowsStart(event,time,'end')"
                  >
                    <i class="el-icon-caret-bottom" />
                    <i class="el-icon-caret-top" />
                  </div>
                </div>
                <div class="detail-box">
                  <el-time-picker
                    v-model="time.RangeTime"
                    :clearable="false"
                    style="width: 100%"
                    is-range
                    range-separator="-"
                    format="HH:mm"
                    :disabled="disabled"
                    value-format="HH:mm"
                    @change="value => timeChange(value,time)"
                  ></el-time-picker>
                  <div class="btn-box" v-if="!disabled" style="text-align: right;margin-top: 10px;">
                    <el-button
                      type="primary"
                      @click.stop="saveTime(time,`popover-${index}-${ind}`)"
                    >保存</el-button>
                    <el-button
                      type="danger"
                      @click.stop="deleteTime(index,ind,`popover-${index}-${ind}`)"
                    >删除</el-button>
                  </div>
                </div>
              </el-popover>
            </div>

            <span class="copy-btn" v-show="disabled" slot="reference"></span>
            <el-popover
              placement="left"
              width="350"
              v-show="!disabled"
              trigger="click"
              :ref="`popover-${index}m_`"
            >
              <span class="copy-btn" @click="actionCopy(index)" slot="reference">
                <i class="el-icon-document-copy"></i>
              </span>
              <p>复制到</p>
              <p>
                <el-checkbox
                  :indeterminate="isIndeterminate"
                  v-model="checkAll"
                  @change="handleCheckAllChange"
                >全选</el-checkbox>
                <el-checkbox-group v-model="copyList" @change="handleCheckedCitiesChange">
                  <el-checkbox
                    :disabled="val.disabled"
                    v-for="(val,i) in weekList"
                    :key="i+'__'"
                    :label="i"
                  >{{val[props.label]}}</el-checkbox>
                </el-checkbox-group>
              </p>
              <div class="text-right">
                <el-button type="primary" @click="confirmCopy(index,`popover-${index}m_`)">确认</el-button>
                <el-button type="danger" @click="closePopover(`popover-${index}m_`)">取消</el-button>
              </div>
            </el-popover>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Popover, Button, CheckboxGroup, Checkbox, Tag } from 'element-ui'
// 依赖深拷贝
import { deepClone } from "@/utils";
export default {
  name: "",
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    width: {
      type: String,
      default: "720px"
    },
    weekList: {
      type: Array,
      default() {
        return [
          {
            label: "周一",
            active: false,
            timeList: []
          },
          {
            label: "周二",
            active: false,
            timeList: []
          },
          {
            label: "周三",
            active: false,
            timeList: []
          },
          {
            label: "周四",
            active: false,
            timeList: []
          },
          {
            label: "周五",
            active: false,
            timeList: []
          },
          {
            label: "周六",
            active: false,
            timeList: []
          },
          {
            label: "周日",
            active: false,
            timeList: []
          }
        ];
      }
    },
    props: {
      type: Object,
      default() {
        return {
          label: "label",
          timeList: "timeList",
          startTime: "startTime",
          endTime: "endTime"
        };
      }
    }
  },
  components: {
    [Button.name]: Button,
    [Popover.name]: Popover,
    [CheckboxGroup.name]: CheckboxGroup,
    [Checkbox.name]: Checkbox,
    [Tag.name]: Tag,
  },
  data() {
    return {
      copyList: [],
      checkAll: false,
      isIndeterminate: false,
      // 当前激活对象
      activeTime: [],
      // 组件操作对象
      temp: false,
      // 拖拽节点
      dageDom: "",
      secondWidth: "", // 1秒对应的容器总宽度
      // 判断是否鼠标点下
      ifDrag: false,
      dataList: [],
    };
  },
  computed: {
    boxWidth() {
      return this.width.replace("px", "") * 1 + 122 + "px";
    }
  },
  watch: {
    weekList(n, o) {
      this.initFormatData();
    }
  },
  mounted() {
    window.addEventListener("mousemove", this.mousemoveNow);
    window.addEventListener("mouseup", this.mouseupEnd);
    // 获取1秒时间容器宽度
    this.secondWidth = this.width.replace("px", "") / (24 * 60);
    if (this.weekList) {
      this.initFormatData();
    }
  },
  methods: {
    // 格式化数据  转化成组件可操作格式
    initFormatData() {
      // 重置参数
      this.temp = false,
      this.dageDom = ''
      this.ifDrag = false
      this.activeTime = []
      this.copyList = []
      this.checkAll = false,
      this.isIndeterminate = false,
      // 格式化数据  转化成组件可操作格式
      this.weekList.forEach(value => {
        if (value[this.props.timeList] && value[this.props.timeList].length) {
          value[this.props.timeList].forEach(val => {
            this.$set(val,'pointX',"")// 时段定位
            this.$set(val,'r_width',"")// 备份
            this.$set(val,'r_pointX',"")// 备份
            this.$set(val,'width',"")// 时段宽度
            this.$set(val,'startX',"")// 操作时鼠标点击起始点位置
            this.$set(val,'endX',"")// 操作时鼠标最终位置
            this.$set(val,'id',"")// 时段id
            this.$set(val,'RangeTime',[
              val[this.props.startTime],
              val[this.props.endTime]
            ])// 时间选择器格式
            // 计算时段宽度
            let st = this.formatSecond(val[this.props.startTime]);
            let et = this.formatSecond(val[this.props.endTime]);
            val.width = (et - st) * this.secondWidth + "px";
            // 计算时段定位
            val.pointX = st * this.secondWidth + "px";
          });
        }
      });
    },
    // 时间段格式化转秒单位
    formatSecond(time) {
      if (!time) return;
      let t = time.split(":");
      if (t.length != 2) return;
      // 去除前缀0
      let st = t[0].replace(/^0/, "");
      let et = t[1].replace(/^0/, "");
      return st * 60 + et * 1;
    },
    // 点击预新增时段
    mousedownStart(event, action) {
      // 非警用状态下触发添加时段
      if (!this.disabled) {
        this.dageDom = "addTime";
        let temp = {
          pointX: event.layerX + "px", // 时段定位
          r_width: "", // 备份
          r_pointX: "", // 备份
          width: "1px", // 时段宽度
          startX: "", // 操作时鼠标点击起始点位置
          endX: "", // 操作时鼠标最终位置
          [this.props.startTime]: "", // 计算出的起始时间
          [this.props.endTime]: "", // 计算出的结束时间
          RangeTime: [],
          isPre: true
        };
        this.recalcTime(temp);
        this.weekList[action[0]][this.props.timeList].push(temp);
        // 激活vue数据更新钩子
        this.$set(
          this.weekList[action[0]][this.props.timeList],
          "length",
          this.weekList[action[0]][this.props.timeList].length
        );
        this.activeTime = [
          action[0],
          this.weekList[action[0]][this.props.timeList].length - 1
        ];
        this.ifDrag = true;
        this.dageDom = "end";
        this.temp = temp;
        // 备份记录
        this.temp.r_width = temp.width.replace("px", "") * 1;
        this.temp.r_pointX = temp.pointX.replace("px", "") * 1;
        this.temp.startX = event.clientX;
      }
    },
    // 时段点击拖拽
    arrowsStart(event, temp, dom, action) {
      // 非警用状态下触发编辑时段
      if (!this.disabled) {
        this.activeTime = action ? action : this.activeTime;
        this.ifDrag = true;
        this.dageDom = dom;
        this.temp = temp;
        // 备份记录
        this.temp.r_width = temp.width.replace("px", "") * 1;
        this.temp.r_pointX = temp.pointX.replace("px", "") * 1;
        this.temp.startX = event.clientX;
      }
    },
    // 鼠标移动
    mousemoveNow(event) {
      if (this.ifDrag) {
        this.temp.endX = event.clientX;
        this.temp.isPre = false;
        this.recalcAttr(this.temp);
      }
    },
    // 点击结束
    mouseupEnd(event) {
      // 鼠标点击其他位置取消选中的操作对象
      if (!this.temp) {
        this.activeTime = [];
      } else {
        this.listenerChange();
      }
      // 并非真正想新增
      if (this.temp && this.temp.isPre) {
        this.weekList[this.activeTime[0]][this.props.timeList].pop();
        this.$set(
          this.weekList[this.activeTime[0]][this.props.timeList],
          "length",
          this.weekList[this.activeTime[0]][this.props.timeList].length
        );
      }
      this.temp = false;
      this.dageDom = "";
      this.ifDrag = false;
    },
    // 重新计算宽度和定位
    recalcAttr(temp) {
      let point = temp.r_pointX;
      let maxW = this.width.replace("px", "") * 1;
      // 拖拽左滑块
      if (this.dageDom == "start") {
        let width = temp.r_width * 1 + (temp.startX - temp.endX);
        point = point * 1 - (temp.startX - temp.endX);
        if (point < 0) {
          point = 0;
          width = temp.width.replace("px", "");
        }
        if (temp.startX - temp.endX + temp.r_width * 1 < 0) {
          width *= -1;
        } else {
          temp.pointX = point + "px";
        }
        temp.width = width + "px";
        // 拖拽右滑块
      } else if (this.dageDom == "end") {
        let width = temp.r_width * 1 + (temp.endX - temp.startX);
        if (width < 0) {
          point = point * 1 + width;
          if (point < 0) {
            point = 0;
            width = temp.width.replace("px", "");
          }
          temp.pointX = point + "px";
          temp.width = width * -1 + "px";
        } else {
          if (point + width > maxW) {
            width = maxW - point;
          }
          temp.width = width + "px";
        }
        // 拖拽时段主体
      } else if (this.dageDom == "content") {
        let width = temp.r_width;
        point = point + (temp.endX - temp.startX);
        if (point < 0) {
          point = 0;
        }
        if (point + width > maxW) {
          point = maxW - width;
        }
        temp.pointX = point + "px";
        // 添加新时段
      }
      // 计算新时间
      this.recalcTime(this.temp);
    },
    // 重新计算时间
    recalcTime(temp) {
      let pointX = temp.pointX.replace("px", "") * 1;
      let width = temp.width.replace("px", "") * 1;
      let s_second = pointX / this.secondWidth;
      let e_second = (pointX + width) / this.secondWidth;
      temp[this.props.startTime] = this.formatMinute(s_second);
      temp[this.props.endTime] = this.formatMinute(e_second);
      temp.RangeTime = [temp[this.props.startTime], temp[this.props.endTime]];
    },
    // 秒数转 分秒显示 100 => 01:40
    formatMinute(scNumber) {
      let minute = Math.floor(scNumber / 60);
      let second = Math.floor(scNumber % 60);
      minute = minute >= 10 ? minute : "0" + minute;
      second = second >= 10 ? second : "0" + second;
      return minute + ":" + second;
    },
    // 编辑保存操作
    saveTime(temp, name) {
      this.closePopover(name);
      // 计算时段宽度
      let st = this.formatSecond(temp[this.props.startTime]);
      let et = this.formatSecond(temp[this.props.endTime]);
      temp.width = (et - st) * this.secondWidth + "px";
      // 计算时段定位
      temp.pointX = st * this.secondWidth + "px";
      this.listenerChange();
    },
    // 删除操作
    deleteTime(index, ind, name) {
      this.weekList[index][this.props.timeList].splice(ind, 1);
      this.listenerChange();
    },
    // 关闭popover
    closePopover(name) {
      if (!name) return;
      this.$refs[name][0].doClose();
    },
    // 通过输入框改变时间
    timeChange(value, time) {
      time.RangeTime = value;
      time[this.props.startTime] = value[0];
      time[this.props.endTime] = value[1];
    },
    // 复制
    actionCopy(index) {
      // 清空选中
      this.copyList = [];
      this.weekList.forEach((value, ind) => {
        this.$set(this.weekList[ind], "disabled", false);
        if (ind == index) {
          value.disabled = true;
        }
      });
    },
    // 复制全选
    handleCheckAllChange(val) {
      this.copyList = val
        ? this.weekList.map((d, i) => {
            return i;
          })
        : [];
      this.isIndeterminate = false;
    },
    // 复制选择回调
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.weekList.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.weekList.length;
    },
    // 确认复制
    confirmCopy(index, name) {
      // 复制时段
      this.copyList.forEach(ind => {
        this.weekList[ind][this.props.timeList] = deepClone(
          this.weekList[index][this.props.timeList]
        );
      });
      this.closePopover(name);
      this.listenerChange();
    },
    // 重置时段
    resetForm() {
      this.$confirm("此操作将删除所有已选时段, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.weekList.forEach(value => {
            value[this.props.timeList] = [];
          })
          this.temp = false,
          this.dageDom = ''
          this.ifDrag = false
          this.activeTime = []
          this.copyList = []
          this.checkAll = false,
          this.isIndeterminate = false,
          this.listenerChange();
        })
        .catch(() => {});
    },
    // 监听数据变动
    listenerChange() {
      this.$emit("change", this.weekList);
    }
  }
};
</script>

<style lang="scss" scoped>
.fr {
  float: right;
}
.week-plan-time-wrap {
  width: 100%;
  box-sizing: border-box;
  .tool-tips {
    padding: 10px 0;
    box-sizing: border-box;
    .circular{
      display: inline-block;
      width: 12px;
      height: 12px;
      vertical-align: middle;
      border-radius: 50%;
      background: #13C2C2;
      margin-top: -2px;
      margin-right: 8px;
    }
    .tip{
    }
  }
  .scroll-box {
    width: 100%;
    overflow: auto;
    .week-plan-time {
      border: 1px solid #ddd;
      overflow: auto;
      .az-time-list {
        width: 100%;
        padding: 0 40px 0 80px;
        box-sizing: border-box;
        height: 24px;
        background: #eee;
        ul {
          display: flex;
          padding: 0;
          margin: 0;
          li {
            list-style-type: none;
            flex: 1;
            width: calc(100% / 24);
            height: 24px;
            font-size: 12px;
            line-height: 24px;
          }
        }
      }
      .az-week-list {
        width: 100%;
        .week-item {
          width: 100%;
          height: 40px;
          padding: 0 40px 0 80px;
          box-sizing: border-box;
          position: relative;
          &:hover {
            background: rgba(0, 0, 0, 0.05);
          }
          .label {
            box-sizing: border-box;
            position: absolute;
            left: 0;
            top: 0;
            width: 80px;
            height: 40px;
            line-height: 40px;
            text-align: center;
            border-right: 1px solid #ddd;
            user-select: none;
          }
          .time-swiper {
            width: 100%;
            height: 100%;
            box-sizing: border-box;
            display: flex;
            position: relative;
            cursor: pointer;
            .chunk {
              display: block;
              height: 100%;
              flex: 1;
              border-left: 1px solid #ddd;
              &:first-child {
                border: none;
              }
            }
            .slider-time {
              position: absolute;
              height: 100%;
              padding: 10px 0;
              box-sizing: border-box;
              z-index: 30;
              .content {
                width: 100%;
                height: 100%;
                background: #13c2c2;
              }
              .arrows {
                position: absolute;
                height: 100%;
                size: 10px;
                color: #11a983;
                width: 14px;
                cursor: e-resize;
                .el-icon-caret-bottom {
                  position: absolute;
                  top: 0;
                  left: 0;
                }
                .el-icon-caret-top {
                  position: absolute;
                  bottom: 0;
                  left: 0;
                }
                &.left-arrows {
                  left: -7px;
                  top: 0;
                }
                &.right-arrows {
                  right: -7px;
                  top: 0;
                }
              }
            }
          }
          .copy-btn {
            position: absolute;
            top: 0;
            right: 0;
            width: 40px;
            height: 40px;
            line-height: 40px;
            background: #eee;
            text-align: center;
            font-size: 16px;
            cursor: pointer;
            &:hover {
              color: #13c2c2;
            }
          }
        }
      }
    }
    .footer-chunk {
      padding: 15px 0;
    }
  }
}
</style>