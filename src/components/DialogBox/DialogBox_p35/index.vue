<template>

    <el-dialog
        v-model="dialogVisible"
        :title="props.title"
        width="35%"
        :before-close="handleClose"
        :show-close="props.showClose"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
    >
        <slot name="default" />

        <template v-if="props.showFooter" #footer>
            <span class="dialog-footer">
                <el-button v-if="!props.cancelType" @click="handleClose">{{ props.cancelText }}</el-button>
                <el-button v-else type="primary" @click="handleClose">{{ props.cancelText }}</el-button>

                <el-button type="primary" @click="handleSure" :disabled="!props.isActiveSure">{{ props.sureText }} </el-button>
            </span>
        </template>
    </el-dialog>

</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { IDialogBox } from '../../../interface/IComponents';


export default defineComponent({
    name: 'DialogBoxCmp'
})
</script>

<script lang="ts" setup>
const props = withDefaults(defineProps<IDialogBox>(), {
    show: false,
    showFooter: true,
    title: '',
    showClose: true,
    cancelText: '取消',
    sureText: '确认',
    isActiveSure: false
})
const emits = defineEmits<{(event: 'onDialogClose'):void, (event: 'onIconClose'): void}>()

const dialogVisible = ref(props.show)
const handleClose = () => {
    dialogVisible.value = false
    emits('onDialogClose')
}
const handleSure = () => {
    props.onSureEvent && props.onSureEvent()
}

watch([
        () => props.show,
    ], () => {
        console.log('watch到新数据并更新页面')

        dialogVisible.value = props.show || false
    }
)
</script>

<style lang="scss" scoped>
    
</style>