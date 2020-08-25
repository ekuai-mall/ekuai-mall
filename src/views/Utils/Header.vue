<template>
	<div id="header">
		<a-row>
			<a-col :span="6">
				<div class="logo" @click="$router.push('/')"><img src="../../assets/logo.png" alt="">EKUAI MALL</div>
			</a-col>
			<a-col :span="18">
				<a-menu v-model="current" mode="horizontal" class="menu" @click="handleMenuClick">
					<a-menu-item key="user" class="menu-item">
						<a-icon type="user"/>
						用户
					</a-menu-item>
				</a-menu>
			</a-col>
		</a-row>
	</div>
</template>

<script>
export default {
	name: "Header",
	data: () => ({}),
	computed: {
		current: {
			get() {
				return this.$store.state.Run.currentTab;
			},
			set() {
				// console.log(e);
			},
		},
	},
	methods: {
		handleMenuClick({key, keyPath}) {
			console.log(key, keyPath);
			if (key !== this.current[0]) {
				this.$router.push("/" + key);
			}
		},
	},
};
</script>

<style scoped>
#header {
	box-shadow: 0 2px 8px #f0f1f2;
}

.logo {
	margin: 15px;
	font-size: large;
	cursor: pointer;
}

.logo > img {
	margin: 0 15px;
}

.menu {
	border: 0;
}

.menu-item {
	height: 62px;
	line-height: 60px;
}
</style>