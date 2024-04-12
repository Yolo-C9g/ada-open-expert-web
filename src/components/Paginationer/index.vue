<template>
    <div class="list-page page-left page-bottom">
        <el-pagination 
            v-if="props.show" 
            background
            layout="prev, pager, next, total" 
            :total="props.total"
            :current-page="props.current"
            @current-change="props.onPageNext"></el-pagination>
    </div>
</template>

<script lang="ts">
import { defineComponent, defineProps } from 'vue'
import { IPaginationer } from '../../interface/IComponents';


export default defineComponent({
    name: 'PaginationerCmp'
})
</script>

<script lang="ts" setup>
const props = defineProps<IPaginationer>()
</script>
