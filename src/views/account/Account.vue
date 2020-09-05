<template>
	<a-layout class="container">
		<a-layout-sider breakpoint="md" collapsed-width="0">
			<a-menu v-model="currentSelected" class="account-menu" theme="dark" mode="inline">
				<a-menu-item key="/account/info">
					<a-icon type="user"/>
					<span class="nav-text">个人信息</span>
				</a-menu-item>
				<a-menu-item key="/account/password">
					<a-icon type="key"/>
					<span class="nav-text">更改密码</span>
				</a-menu-item>
				<a-menu-item key="/account/wechat">
					<a-icon type="wechat"/>
					<span class="nav-text">绑定微信</span>
				</a-menu-item>
				<a-menu-item key="/account/logout">
					<a-icon type="logout"/>
					<span class="nav-text">退出登录</span>
				</a-menu-item>
			</a-menu>
		</a-layout-sider>
		<a-layout>
			<a-layout-content :style="{ margin: '24px 16px 0' }">
				<div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">
					<router-view></router-view>
				</div>
				<a-layout-footer style="text-align: center">
					Ekuai Software © 2020
				</a-layout-footer>
			</a-layout-content>

		</a-layout>
	</a-layout>
</template>

<script>
export default {
	name: "Account",
	computed: {
		currentSelected: {
			get() {
				return [this.$route.path];
			},
			set(e) {
				this.$router.push(e[0]);
			},
		},
	},
	mounted() {
	},
};
</script>

<style scoped>
.container, .account-menu {
	height: 100%;
}
</style>
