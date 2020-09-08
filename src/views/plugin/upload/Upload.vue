<template>
	<div class="container padding-10">
		<img alt="logo" src="../../../assets/life.png" class="logo">
		<router-view></router-view>
	</div>
</template>

<script>
export default {
	name: "Upload",
	data: () => ({
		proj: null,
	}),
	mounted() {
		this.$axios.$post("?_=cos/getProj", {
			order: this.order,
			user: this.$store.state.User.id,
			cookie: this.$store.state.User.cookie,
		}).then(response => {
			if (response.status === 200) {
				let dat = response.data;
				if (dat.status === 0) {
					let ret = dat["ret"];
					if (ret) {
						this.proj = ret;
						switch (ret.status) {
							case "INIT":
								this.$router.push("/order/" + this.order + "/plugin/upload/up");
								break;
							case "SUBMIT":
								this.$info({
									title: "项目提示",
									content: "素材已上传，请耐心等待制作",
								});
								this.$router.push("/order/" + this.order + "/plugin/upload/down");
								break;
							case "FINISH":
								this.$notification.success({
									message: "项目已完成",
									description: "项目已制作完成，请根据提示下载成品",
								});
								this.$router.push("/order/" + this.order + "/plugin/upload/down");
								break;
						}
					} else {
						this.$router.push("/order/" + this.order + "/plugin/upload/up");
					}
				} else {
					this.$warning({
						title: "项目获取失败",
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
	watch: {},
	computed: {
		order() {
			return this.$parent.order;
		},
		orderInfo() {
			return this.$parent.orderInfo;
		},
	},
};
</script>

<style scoped>
.container {
	max-width: 400px;
	margin: auto;
}
</style>
