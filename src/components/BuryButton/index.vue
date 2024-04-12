<template>
    <el-button 
        :type="type" 
        :size="size" 
        :plain="plain" 
        :text="text" 
        :bg="bg" 
        :link="link" 
        :round="round" 
        :circle="circle" 
        :loading="loading" 
        :disabled="disabled" 
        :color="color" 
        :icon="icon"
        >
            <slot></slot>
        </el-button>
</template>


<script lang="ts">
import { defineComponent, defineProps, ref, watch, onMounted } from 'vue';
import { IBuryButton } from '@/interface/IComponents'

export default defineComponent({
    name: 'BuryButton'
})
</script>

<script lang="ts" setup>
const props = defineProps<IBuryButton>()

console.log('props', props)

const size = ref(props.size || 'default')
const type = ref(props.type)
const plain = ref(props.plain || false)
const text = ref(props.text || false)
const bg = ref(props.bg || false)
const link = ref(props.link || false)
const round = ref(props.round || false)
const circle = ref(props.circle || false)
const loading = ref(props.loading || false)
const disabled = ref(props.disabled || false)
const color = ref(props.color)
const icon = ref(props.icon)

watch([
        () => props.disabled,
        () => props.loading
    ], () => {
    console.log('watch到新数据并更新页面')

    disabled.value = props.disabled || false
    loading.value = props.loading || false
    }
)

</script>

<style lang="scss" scoped></style>