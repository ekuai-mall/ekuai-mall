<template>
	<div>
		<a-page-header class="header" title="用户信息" sub-title="在此修改用户个人信息"/>
		<a-form-model class="form" :model="form" :label-col="labelCol" :wrapper-col="wrapperCol">
			<a-form-model-item label="联系方式">
				<a-input v-model="form.contact"/>
			</a-form-model-item>
			<a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
				<a-button class="margin-10" type="primary" @click="onSubmit">
					保存
				</a-button>
				<a-button class="margin-10" @click="refresh">
					刷新
				</a-button>
			</a-form-model-item>
		</a-form-model>
	</div>
</template>

<script>
export default {
	name: "Info",
	data: () => ({
		labelCol: {span: 8},
		wrapperCol: {span: 16},
		form: {
			contact: "",
		},
	}),
	methods: {
		onSubmit() {
			this.$axios.$post("?_=auth/setInfo", {
				id: this.$store.state.User.id,
				cookie: this.$store.state.User.cookie,
				info: JSON.stringify(this.form),
			}).then(response => {
				if (response.status === 200) {
					let dat = response.data;
					if (dat.status === 0) {
						let ret = JSON.parse(dat["ret"]);
						for (let key in this.form) {
							this.form[key] = ret[key] ? ret[key] : this.form[key];
						}
						this.$notification.success({
							message: "成功",
							description: "个人信息数据提交成功，已自动刷新",
						});
					} else {
						this.$warning({
							title: "信息拉取失败",
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
		refresh() {
			this.$axios.$post("?_=auth/getInfo", {
				id: this.$store.state.User.id,
				cookie: this.$store.state.User.cookie,
			}).then(response => {
				if (response.status === 200) {
					let dat = response.data;
					if (dat.status === 0) {
						let ret = JSON.parse(dat["ret"]);
						for (let key in this.form) {
							this.form[key] = ret[key] ? ret[key] : this.form[key];
						}
						this.$notification.success({
							message: "成功",
							description: "个人信息数据拉取成功",
						});
					} else {
						this.$warning({
							title: "信息拉取失败",
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
