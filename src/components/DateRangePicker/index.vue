<template>
  <div class="date-range-picker">
    <span>{{ props.label }}:</span>
    <el-date-picker
      v-if="props.shortcuts"  
      class="public-multy-datapicker"
      type="daterange"
      unlink-panels
      v-model="startEndDate"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      :default-value="defaultPickerDate"
      :editable="false"
      :disabled-date="pickerOptions"
      :value-format="props.dateFmt"
      :shortcuts="props.shortcutsOptions"
      @change="handleDateRangePickerChange"
    />
    <el-date-picker
      v-else
      class="public-multy-datapicker"
      type="daterange"
      unlink-panels
      v-model="startEndDate"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      :default-value="defaultPickerDate"
      :editable="false"
      :disabled-date="pickerOptions"
      :value-format="props.dateFmt"
      @change="handleDateRangePickerChange"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, defineProps, ref, toRaw } from "vue";
import { IDateRangePicker } from '../../interface/IComponents';
import { projectConfigHelper } from "../../assets/script/config/project";

export default defineComponent({
  name: "DateRngePickerCmp",
});
</script>

<script lang="ts" setup>
const props = withDefaults(defineProps<IDateRangePicker>(), {
  label: '',
  dateFmt: projectConfigHelper.defaultDateFmt as string,
  shortcuts: false,
  shortcutsOptions: [
  {
    text: '昨天',
    value: () => {
      const start = new Date()
      const end = new Date(start.getTime() - 3600 * 1000 * 24);
      start.setTime(start.getTime() - 3600 * 1000 * 24)
      return [start, end]
    }
  },{
    text: '最近7天',
    value: () => {
      const start = new Date()
      const end = new Date(start.getTime() - 3600 * 1000 * 24);
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
      return [start, end]
    }
  },{
    text: '最近15天',
    value: () => {
      const start = new Date()
      const end = new Date(start.getTime() - 3600 * 1000 * 24);
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 15)
      return [start, end]
    }
  },{
    text: '最近30天',
    value: () => {
      const start = new Date()
      const end = new Date(start.getTime() - 3600 * 1000 * 24);
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
      return [start, end]
    }
  },{
    text: '最近90天',
    value: () => {
      const start = new Date()
      const end = new Date(start.getTime() - 3600 * 1000 * 24);
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
      return [start, end]
    }
  }, {
    text: '最近180天',
    value: () => {
      const start = new Date()
      const end = new Date(start.getTime() - 3600 * 1000 * 24);
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 180)
      return [start, end]
    }
  }, {
    text: '最近365天',
    value: () => {
      const start = new Date()
      const end = new Date(start.getTime() - 3600 * 1000 * 24);
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 365)
      return [start, end]
    }
  }, {
    text: '开始至今',
    value: () => {
      const start = new Date('2020-03-09')
      const end = new Date(new Date().getTime() - 3600 * 1000 * 24);
      return [start, end]
    }
  }
] as any
});

const startEndDate = ref();
const defaultPickerDate = ref(
  new Date(new Date().getTime() - 3600 * 1000 * 24 * 30)
);
const pickerOptions = ref((time: Date) => time.getTime() > Date.now());

const handleDateRangePickerChange = (val: any) => {
  console.log("handleDateRangePickerChange", val);
  props.callback(toRaw(val));
};
</script>

<style lang="scss" scoped>
.date-range-picker {
  display: flex;
  align-items: center;
  justify-content: flex-end;

  span {
    flex-shrink: 0;
    font-size: 14px;
    padding-right: 10px;
    text-align: right;
  }
}
</style>
