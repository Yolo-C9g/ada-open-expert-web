<template>
	<el-container @click.capture="layoutPinia.onClosePopAction" class="layout">
		<el-header>
			<div class="header">
				<div class="header-left">
					<div class="header-left-systerm">
						<img src="../../assets/image/logo_crm.svg" />
					</div>

					<div class="header-left-breadcrumb">
						<el-breadcrumb v-if="layoutPinia.currentMenu" separator=">">
							<el-breadcrumb-item>{{ layoutPinia.menuGroup }}</el-breadcrumb-item>
							<el-breadcrumb-item class="current">{{ layoutPinia.currentMenu  }}</el-breadcrumb-item>
						</el-breadcrumb>

						<el-breadcrumb v-else>
							<el-breadcrumb-item class="current">{{ layoutPinia.menuGroup  }}</el-breadcrumb-item>
						</el-breadcrumb>
					</div>
				</div>
				
				<div class="header-right" @click="handleShowPop">
					<Avatar />
				</div>
			</div>
		</el-header>
		<el-container>
			<el-aside width="237px">
				<div class="aside">
					<Sidebar />
				</div>
			</el-aside>
			<el-main>
				<router-view :key="$route.name" />
			</el-main>
		</el-container>
	</el-container>
</template>

<script lang="ts">
import { defineComponent, ref, onBeforeMount } from 'vue'
import useLayoutPinia from '@/pinia/layout/index'

export default defineComponent({
	name: 'LayoutFrame'
})
</script>
<script lang="ts" setup>
const showHeaderPop = ref(false)
const handleShowPop = () => {
	showHeaderPop.value = !showHeaderPop.value
}

const layoutPinia = useLayoutPinia()

onBeforeMount(() => {
	layoutPinia.onInitBreadcrumbAction()
})
</script>

<style lang="scss" scoped>
@import '../../assets/style/colors.scss';

.layout {
	min-width: 1090px;
	height: 100%;
	overflow-x: scroll;
}

.header {
	display: flex;
	align-items: center;
	justify-content: space-between;
	height: 100%;
	background-color: $block-color;
	box-shadow: 0 1px 0 0 $line-color;

	&-left {
		display: flex;
		align-items: center;
		height: 100%;

		&-systerm {
			display: flex;
			align-items: center;
			width: 236px;
			height: 100%;
			background-color: $menu_bkg;
			border-bottom: 1px solid #000000;

			img {
				padding-left: 20px;
			}

			span {
				flex: 1;
				padding-left: 16px;
				color: #3C4043;
				font-weight: 500;
			}

			box-shadow: 1px 0 0 0 $menu_bkg;
		}

		&-breadcrumb {
			padding-left: 40px;

			&:deep(.el-breadcrumb__item:first-child .el-breadcrumb__inner) {
				font-size: 14px;
				font-weight: 400;
				color: #909399;
			}

			&:deep(.el-breadcrumb__item:last-child .el-breadcrumb__inner) {
				font-size: 14px;
				font-weight: 400;
				color: #303133;
			}
		}
		
	}

	&-right {
		display: flex;
		align-items: center;
		height: 100%;
	}
}

.aside {
	position: relative;
	width: 237px;
	height: 100%;
	background-color: inherit;
	box-shadow: 1px 0 0 0 $menu_bkg;
	overflow-y: scroll;

	&::-webkit-scrollbar {
		display: none;
	}
}

.el-container {
	flex: 1;
	overflow: hidden;
}

.el-header {
	padding: 0;
	height: 56px;
}

.el-main {
	padding-top: 0;
}

.el-aside {
	height: 100%;
	overflow: hidden;
	background-color: $menu_bkg;
}

.el-avatar {
	margin-right: 10px;
}

.margin-boxshaw {
	margin-top: 1px;
}
</style>