<template>
	<section class="page">
		<section id="pageMenu" class="page-menu" v-if="props.menus && props.menus.length > 0" ref="menusRef">
			<slot name="menu" />
		</section>

		<section id="pageSetting" class="page-setting" ref="settingRef">
			<slot name="setting" />
		</section>

		<section class="page-content" 
			:style="{ height: props.menus && props.menus.length > 0 ? `calc(100% - ${ 60 + menusHeight + settingHeight }px)` :  `calc(100% - ${ 60 + settingHeight }px)`}">
			<slot name="content" />
		</section>
	</section>
</template>

<script lang="ts">
import { defineComponent, defineProps, ref, onMounted, nextTick } from 'vue';
import { IPage } from '@/interface/IComponents'

export default defineComponent({
	name: 'PageView'
})
</script>

<script lang="ts" setup>
const props = defineProps<IPage>()

const menusHeight = ref(0)
const settingHeight = ref(53)


onMounted(() => {
	nextTick(() => {
		menusHeight.value = document.getElementById('pageMenu')?.clientHeight || 0
		settingHeight.value = document.getElementById('pageSetting')?.clientHeight || 0
	})
})
</script>


<style lang="scss" scoped>
@import '../../../assets/style/colors.scss';

.page {
	height: calc(100% - 20px);

	&-menu {
		display: flex;
		align-items: center;
		margin: 0 -20px;
		height: 56px;
		background-color: $block-color;

		&-title {
			flex: 1;

			.title {
				font-size: 18px;
				color: #383640;

				span {
					padding-bottom: 8px;
					border-bottom: 2px solid #6A42F9;
				}
			}

		}
	}

	&-setting {
		display: flex;
		justify-content: flex-end;
		margin: 20px 0;
		padding: 20px 0;
		min-height: 35px;
		border-radius: 6px;
		background-color: $block-color;
	}

	&-content {
		padding: 20px;
		background-color: $block-color;
		border-radius: 6px;
		box-shadow: 0 1px 2px rgba(0, 0, 0, 0.09);
		overflow: auto;

		&::-webkit-scrollbar {
			display: none;
		}
	}

	.el-table--border {
		border-radius: 3px;
	}

	.el-table--border td,
	.el-table--border th {
		border-color: rgba(56, 54, 64, 0.05) !important;
	}

	.el-table td,
	.el-table th.is-leaf {
		border-color: rgba(56, 54, 64, 0.05) !important;
	}
}
</style>