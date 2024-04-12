<template>
    <div class="selector-options">
        <span>{{ props.label }}:</span>
        <el-select 
            clearable  
            v-model="selectModel" 
            placeholder="请选择"
            :filterable="props.filterable"
            :style="props.style ? props.style : 'width: 120px;'"
            :disabled="props.disabled"
            @change="handleSelectChange"
        >
            <el-option v-for="item in props.options" :key="item.value+''"
                :label="item.label" :value="item.value">
            </el-option>
        </el-select>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { ISelector } from '../../interface/IComponents';


export default defineComponent({
    name: 'SelectorCmp'
})
</script>

<script lang="ts" setup>
const props = defineProps<ISelector>()

const selectModel = ref(props.default)

const handleSelectChange = (val: any) => {
    console.log('handleSelectChange', val, props.order)
    props.callback(val, props.order)
}
</script>

<style lang="scss" scoped>
  .selector-options {
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