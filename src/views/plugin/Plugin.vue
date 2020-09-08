<template>
	<div>
		<router-view v-if="loaded"></router-view>
		<a-result v-else status="403" title="403" sub-title="Sorry, you are not authorized to access this page."/>
	</div>
</template>

<script>
export default {
	name: "Plugin",
	data: () => ({
		loaded: false,
		orderInfo: null,
	}),
	computed: {
		order() {
			return this.$route.params.order;
		},
	},
	watch: {
		order() {
			this.$parent.reloadView();
		},
	},
	mounted() {
		this.$axios.$post("?_=pay/getOrder", {
			order: this.order,
		}).then(response => {
			if (response.status === 200) {
				let dat = response.data;
				if (dat.status === 0) {
					let order = dat["ret"];
					if (order.status !== "SUCCESS") {
						this.$error({
							title: "无法使用订单",
							content: "订单未支付",
						});
						this.$router.push("/pay/wechat/" + this.orderId);
					} else if (order.user.id !== this.$store.state.User.id) {
						this.$error({
							title: "无法使用订单",
							content: "您不是订单所有者",
						});
					} else if (!order.user.wechat) {
						this.$error({
							title: "无法使用订单",
							content: "请先绑定微信",
						});
						this.$router.push("/account/wechat");
					} else {
						this.orderInfo = order;
						this.loaded = true;
					}
				} else {
					this.$warning({
						title: "订单获取失败",
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
};
</script>

<style scoped>

</style>
