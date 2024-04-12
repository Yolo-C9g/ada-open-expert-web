<template>
    <div class="sidebar">
        <el-menu
            :default-active="$route.path"
            @select="handleSelect"
            unique-opened
            router
        >
            <template v-for="(item, index) in layoutPinia.menuTree">
                <el-sub-menu v-if="item.children && item.children.length > 0" :index="(item.children[0].path)" :key="(index+1+'')">
                    <template #title>
                        <el-icon><location /></el-icon>
                        <span>{{ item.name }}</span>
                    </template>
                    <el-menu-item v-for="(innerItem, innerIndex) in  item.children" :index="resetMenuIndex(innerItem.path)" :key="(index + 1) + '-' + innerIndex" @click="layoutPinia.onMenuClickAction(item.name, innerItem)">{{ innerItem.name }}</el-menu-item>
                </el-sub-menu>

                <el-menu-item v-else-if="item.path.indexOf('rbac') === -1" :index="item.path" @click="layoutPinia.onMenuClickAction(null, item)">
                    <img class="menu_icon" src="../../../assets/image/menu_staff.svg" />
                    <span>{{ item.name }}</span>
                </el-menu-item>

                <el-menu-item v-else @click="layoutPinia.onMenuClickAction(null, item)">
                    <img class="menu_icon" src="../../../assets/image/menu_staff.svg" />
                    <span>{{ item.name }}</span>
                </el-menu-item>
            </template>
        </el-menu>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import useLayoutPinia from '@/pinia/layout/index'

export default defineComponent({
    name: 'SidebarCmp'
})
</script>

<script lang="ts" setup>
const layoutPinia = useLayoutPinia()

const handleSelect = (key: string, keyPath: string[], router: any) => {
    console.log('handleSelect', key, keyPath, router)
}

const resetMenuIndex = (path: string) => {
    return path.indexOf('.com') !== -1 ? null : path
}
</script>

<style lang="scss" scoped>
@import '../../../assets/style/colors.scss';

.sidebar {

    &:deep(.el-menu) {
        border: none;
        background-color: inherit;
    }

    &:deep(.is-active) {
        color: $bg-fff-color;
        background-color: $main-color !important;
    }

    .menu_icon {
        margin-right: 8px;
        width: 24px;
        height: 24px;
    }
}
</style>