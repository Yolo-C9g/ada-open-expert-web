<template>
	<div class="avatar">
		<div class="avatar-info">
			<span class="name">{{ layoutPinia.accountInfo?.merchantName }}</span>
			<div class="quit" @click.capture="layoutPinia.onQuitToLoginAction">
				<img src="../../../assets/image/quit.svg" />
				<span>登出</span>
			</div>
		</div>
		<!-- <div v-if="layoutPinia.showPop" class="avatar-pop">
			<div class="avatar-pop-item">
				<el-icon>
					<User />
				</el-icon>
				<span>个人中心</span>
			</div>
			<div class="avatar-pop-item">
				<el-icon>
					<Setting />
				</el-icon>
				<span>设置</span>
			</div>
			<div class="avatar-pop-item" @click="layoutPinia.onQuitToLoginAction">
				<el-icon>
					<SwitchButton />
				</el-icon>
				<span>退出</span>
			</div>
		</div> -->
	</div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount } from 'vue'
import useLayoutPinia from '@/pinia/layout/index'

export default defineComponent({
	name: 'Avatar'
})
</script>

<script lang="ts" setup>
const layoutPinia = useLayoutPinia()

onBeforeMount(() => {
	layoutPinia.onAccountInfoAction()
})

</script>

<style lang="scss" scoped>
@import '@/assets/style/colors.scss';

.avatar {
	position: relative;
	display: flex;
	align-items: center;
	height: 100%;

	&-more {
        margin-left: 18px;
		transform: rotate(90deg);
	}

	&-info {
		display: flex;
		align-items: center;
		height: 100%;

		.name {
			display: flex;
			align-items: center;
			line-height: 20px;
			font-size: 14px;
			font-weight: 500;
			color: #293754;


			&::after {
				display: inline-block;
				content: '';
				margin-left: 17px;
				width: 1px;
				height: 28px;
				background-color: #EBEFF3;
			}
		}

		.quit {
			display: flex;
			align-items: center;
			padding: 0 40px 0 20px;
			height: 100%;
			cursor: pointer;

			img {
				height: 24px;
				width: auto;
			}

			span {
				padding-left: 8px;
				line-height: 20px;
				font-size: 14px;
				font-weight: 400;
				color: #293754;
			}

			&:hover {
				background: $hover-color;
			}
		}
	}

	&-pop {
		position: absolute;
		right: 20px;
		top: 56px;
		width: 161px;
		height: 120px;
		background-color: $bg-fff-color;
		box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
		z-index: 1;

		&-item {
			display: flex;
			align-items: center;
			padding: 0 15px;
			height: 40px;
			cursor: pointer;

			&:hover {
				background-color: $bg-color;
			}

			&:nth-of-type(2) {
				border-bottom: 1px solid $line-color;
			}

			span {
				padding-left: 10px;
				font-size: 14px;
			}
		}
	}
}

.el-avatar {
	margin-right: 10px;
}
</style>