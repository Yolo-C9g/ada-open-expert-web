<template>
    <el-result
        v-if="props.show"
        :icon="props.icon"
        :title="props.title"
    >
        <template #sub-title>
            <div class="subtitle" v-html="props.subTitle"></div>
        </template>
        <template #extra>
            <el-button type="primary" @click="handleResultClickEvent">{{ props.confirmText }}</el-button>
        </template>
    </el-result>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { IResultBox } from '../../interface/IComponents';

export default defineComponent({
    name: 'ResultBoxCmp'
})
</script>

<script lang="ts" setup>
const props = withDefaults(defineProps<IResultBox>(), {
    show: false,
    icon: 'success',
    title: '',
    subTitle: '',
    confirmText: '我知道了'
})
const emits = defineEmits<{(event: 'onResultBox'):void}>()

const handleResultClickEvent = () => {
    emits('onResultBox')
}
</script>