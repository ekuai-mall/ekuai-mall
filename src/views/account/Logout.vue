<template>
	<div>
		<a-page-header class="header" title="登出" sub-title="在此登出账号"/>
		<br/><br/>
		<a-button type="primary" shape="round" size="large" @click="logout">
			确认登出
		</a-button>
	</div>
</template>

<script>
export default {
	name: "Logout",
	methods: {
		logout() {
			this.$axios.$post("?_=auth/logout", {
				id: this.$store.state.User.id,
				cookie: this.$store.state.User.cookie,
			}).then(response => {
				if (response.status === 200) {
					this.$notification.success({
						message: "成功",
						description: "退出账户成功",
					});
				} else {
					this.$error({
						title: "网络错误",
						content: response.status + "：" + response.statusText,
					});
				}
				console.log(response);
				this.$store.commit("User/updateUserInfo");
				this.$router.push("/user/login");
			}).catch(error => {
				this.$error({
					title: "网络错误",
					content: error,
				});
				console.log(error);
			});

		},
	},
};
</script>

<style scoped>
.header {
	max-width: 90%;
	margin: 10px;
	border: 1px solid rgb(235, 237, 240);
}
</style>
