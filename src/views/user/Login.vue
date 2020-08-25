<template>
	<div>
		<div class="margin-10">
			<a-input placeholder="用户名" v-model="user">
				<a-icon slot="addonBefore" type="user"/>
			</a-input>
		</div>
		<div class="margin-10">
			<a-input-password placeholder="密码" v-model="password">
				<a-icon slot="addonBefore" type="key"/>
			</a-input-password>
		</div>
		<div class="margin-10">
			<a-button type="primary" @click="login" :disabled="password.length===0 || user.length===0">
				登陆
			</a-button>
		</div>
		没有账户？
		<router-link to="register">注册</router-link>
	</div>
</template>
<script>
export default {
	name: "Login",
	data: () => ({
		user: "",
		password: "",
	}),
	methods: {
		login() {
			this.$axios.$post("?_=auth/login", {
				user: this.user,
				pass: this.password,
			}).then(response => {
				if (response.status === 200) {
					let dat = response.data;
					if (dat.status === 0) {
						this.$success({
							title: "登录成功",
							content: "即将跳转，若无法跳转请刷新页面",
						});
					} else {
						this.$warning({
							title: "登录失败",
							content: "错误码：" + dat.status + "，错误信息：" + dat["ret"],
						});
					}
				} else {
					this.$error({
						title: "网络错误",
						content: response.status + "：" + response.statusText,
					});
				}
				console.log(response);
			}).catch(error => {
				this.$error({
					title: "网络错误",
					content: error,
				});
				console.log(error);
			});
		},
	},
	mounted() {
		let defaultUser = this.$store.state.User;
		if (defaultUser.username !== "") {
			this.user = defaultUser.username;
		}
		if (defaultUser.pass !== "") {
			this.password = defaultUser.pass;
		}
	},
};
</script>
