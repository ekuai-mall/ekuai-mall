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
			<a-input-password placeholder="再次输入密码" v-model="password1">
				<a-icon slot="addonBefore" type="key"/>
			</a-input-password>
		</div>
		<a-alert v-show="password1!==password" message="两次密码输入不一致，请检查输入" type="warning" show-icon/>
		<div class="margin-10">
			<a-button type="primary" @click="register" :disabled="password1.length===0 || password.length===0 || user.length===0 || password1!==password">
				注册
			</a-button>
		</div>
		已有账户？
		<router-link to="login">登陆</router-link>
	</div>
</template>
<script>
export default {
	name: "Register",
	data: () => ({
		user: "",
		password: "",
		password1: "",
	}),
	methods: {
		register() {
			this.$axios.$post("?_=auth/register", {
				user: this.user,
				pass: this.password,
			}).then(response => {
				if (response.status === 200) {
					let dat = response.data;
					if (dat.status === 0) {
						this.$store.commit("User/updateUserInfo", {
							pass: this.password,
							...dat["ret"],
						});
						this.$notification.success({
							message: `注册成功！欢迎你， ${dat["ret"].user} ！`,
							description: "即将自动跳转，若跳转失败请刷新页面",
						});
						this.$router.push("login");
					} else {
						this.$warning({
							title: "注册失败",
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
};
</script>
