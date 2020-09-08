<template>
	<div class="container">
		<a-page-header class="header" title="订单详情" :sub-title="this.orderId"/>
		<div>
			<a-descriptions v-if="loaded">
				<a-descriptions-item label="下单用户">
					{{ order.user.user }}
				</a-descriptions-item>
				<a-descriptions-item label="商品">
					{{ order.name }}
				</a-descriptions-item>
				<a-descriptions-item label="价格">
					￥ {{ order.price / 100 }}
				</a-descriptions-item>
				<a-descriptions-item label="下单时间">
					{{ getTime(order["time_start"]) }}
				</a-descriptions-item>
				<a-descriptions-item label="支付状态">
					<clr :clr="(getClr(order.status))">{{ getPayStatus(order.status) }}</clr>
				</a-descriptions-item>
				<a-descriptions-item label="支付时间">
					{{ order["time_finish"] ? getTime(order["time_finish"]) : "/" }}
				</a-descriptions-item>
				<a-descriptions-item label="订单状态">
					<clr :clr="(getClr(order.extra))">{{ getExtra(order.extra) }}</clr>
				</a-descriptions-item>
				<a-descriptions-item label="备注">
					{{ order["remark"] }}
				</a-descriptions-item>
			</a-descriptions>
		</div>
		<div>
			<a-button-group>
				<a-button type="primary" @click="useOrder">
					使用订单
				</a-button>
			</a-button-group>
		</div>
	</div>

</template>

<script>
import Clr from "../Utils/Color.vue";

export default {
	name: "Order",
	data: () => ({
		order: null,
		loaded: false,
	}),
	computed: {
		orderId() {
			return this.$route.params.order;
		},
	},
	methods: {
		getTime(e) {
			let time = new Date(e * 1000),
				y = time.getFullYear(),
				m = time.getMonth() + 1,
				d = time.getDate();
			return y + "-" + (m < 10 ? "0" + m : m) + "-" + (d < 10 ? "0" + d : d) + " " + time.toTimeString().substr(0, 8);
		},
		getPayStatus(e) {
			let dat = {
				"SUCCESS": "支付成功",
				"NOTPAY": "未支付",
				"PAYERROR": "支付失败",
				"CLOSED": "订单关闭",
				"REFUND": "正在退款",
				"REVOKED": "支付撤销",
			};
			return dat[e] ? dat[e] : "Unknown status";
		},
		getExtra(e) {
			e = e ? e : "NULL";
			let dat = {
				"NULL": "未使用",
				"SUBMIT": "已提交",
				"FINISH": "已完成",
			};
			return dat[e] ? dat[e] : "Unknown status";
		},
		getClr(e) {
			e = e ? e : "NULL";
			let dat = {
				"SUBMIT": "#66ccff",
				"FINISH": "green",
				"SUCCESS": "green",
				"NOTPAY": "red",
			};
			return dat[e] ? dat[e] : "black";
		},
		useOrder() {
			if (this.order.status !== "SUCCESS") {
				this.$error({
					title: "无法使用订单",
					content: "订单未支付",
				});
				this.$router.push("/pay/wechat/" + this.orderId);
			} else if (this.order.user.id !== this.$store.state.User.id) {
				this.$error({
					title: "无法使用订单",
					content: "您不是订单所有者",
				});
			} else if (!this.order.user.wechat) {
				this.$error({
					title: "无法使用订单",
					content: "请先绑定微信",
				});
				this.$router.push("/account/wechat");
			} else {
				this.$router.push("/order/" + this.orderId + "/plugin/upload/");
			}
		},
	},
	mounted() {
		this.$axios.$post("?_=pay/getOrder", {
			order: this.orderId,
		}).then(response => {
			if (response.status === 200) {
				let dat = response.data;
				if (dat.status === 0) {
					this.order = dat["ret"];
					this.loaded = true;
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
	watch: {
		orderId() {
			this.$parent.reloadView();
		},
	},
	components: {
		Clr,
	},
};
</script>

<style scoped>
.container {
	max-width: 500px;
	margin: auto;
	padding: 10px;
}
</style>
