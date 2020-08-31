<template>
	<div>
		<a-page-header class="header" title="修改密码" sub-title="在此修改用户密码"/>
		<a-form-model class="form" :model="form" :label-col="labelCol" :wrapper-col="wrapperCol">
			<a-form-model-item label="原密码">
				<a-input-password v-model="form.pass"/>
			</a-form-model-item>
			<a-form-model-item label="新密码">
				<a-input-password v-model="form.pass1"/>
			</a-form-model-item>
			<a-form-model-item label="再次输入新密码">
				<a-input-password v-model="form.pass2"/>
			</a-form-model-item>
			<a-alert v-show="form.pass1!==form.pass2" message="两次密码输入不一致，请检查输入" type="warning" show-icon/>
			<a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
				<a-button class="margin-10" type="primary" @click="onSubmit">
					确认
				</a-button>
			</a-form-model-item>
		</a-form-model>
	</div>
</template>

<script>
export default {
	name: "ChangePass",
	data: () => ({
		labelCol: {span: 8},
		wrapperCol: {span: 16},
		form: {
			pass: "",
			pass1: "",
			pass2: "",
		},
	}),
	methods: {
		onSubmit() {
			this.$axios.$post("?_=auth/cPass", {
				user: this.$store.state.User.username,
				pass: this.form.pass,
				nPass: this.form.pass1,
			}).then(response => {
				if (response.status === 200) {
					let dat = response.data;
					if (dat.status === 0) {
						this.$notification.success({
							message: "成功",
							description: "密码更改成功，请重新登录",
						});
						this.$store.commit("User/updateUserInfo");
						this.$router.push("/user/login");
					} else {
						this.$warning({
							title: "密码更改失败",
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
		let user = this.$store.state.User;
		if (user.id === -1 || user.cookie.length === 0) {
			this.$warning({
				title: "鉴权错误",
				content: "请先登录",
			});
			this.$router.push("/user/login");
		}

		this.refresh();
	},
};
</script>

<style scoped>
.header {
	max-width: 90%;
	margin: 10px;
	border: 1px solid rgb(235, 237, 240);
}

.form {
	max-width: 500px;
}
</style>
