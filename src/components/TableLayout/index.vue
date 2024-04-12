<template>
    <el-table
        v-loading="props.loading"
        :data="props.data"
        stripe
        highlight-current-row
        :header-cell-style="{background: tableHeaderCss, color: tableHeaderColor}"
    >
        <slot name="default" />
    </el-table>
</template>

<script lang="ts">
import { defineComponent, defineProps, ref } from 'vue'
import { ITableLayout } from '../../interface/IComponents';


export default defineComponent({
    name: 'TableLayoutCmp'
})
</script>

<script setup lang="ts">
const props = withDefaults(defineProps<ITableLayout>(), {
    loading: true,
    data: <any>[]
})
const tableHeaderCss = ref('#F4F6F9')
const tableHeaderColor = ref('#000')
</script>

<style lang="scss" scoped>
.el-table {
    color: #000;
}
</style>