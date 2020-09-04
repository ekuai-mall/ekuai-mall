<template>
	<div class="container">
		<a-page-header class="margin-10" title="订单信息" sub-title="在此查看我的订单"/>
		<a-card v-for="(val,index) in orderList" hoverable :key="index">
			<h4 slot="title">订单 {{ val.order }}</h4>
			<a-button slot="extra" type="primary" @click="redirect(index)">
				查看
			</a-button>
			<a-descriptions bordered>
				<a-descriptions-item label="商品" :span="2">
					{{ val.name }}
				</a-descriptions-item>
				<a-descriptions-item label="价格">
					￥ {{ val.price / 100 }}
				</a-descriptions-item>
				<a-descriptions-item label="下单时间" :span="2">
					{{ getTime(val["time_start"]) }}
				</a-descriptions-item>
				<a-descriptions-item label="支付状态">
					{{ getPayStatus(val.status) }}
				</a-descriptions-item>
				<a-descriptions-item label="支付时间" :span="2">
					{{ val["time_finish"] ? getTime(val["time_finish"]) : "/" }}
				</a-descriptions-item>
				<a-descriptions-item label="订单状态">
					功能开发中
				</a-descriptions-item>
				<a-descriptions-item label="备注" :span="3">
					{{ val["remark"] }}
				</a-descriptions-item>
			</a-descriptions>
		</a-card>
		<a-empty description="来到了数据的尽头"/>
	</div>

</template>

<script>
export default {
	name: "List",
	data: () => ({
		orderList: [],
	}),
	methods: {
		redirect(e) {
			this.$router.push("/order/" + this.orderList[e].order);
		},
		getTime(e) {
			let time = new Date(e * 10000),
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
	},
	mounted() {
		this.$axios.$post("?_=pay/getUserOrder", {
			user: this.$store.state.User.id,
			cookie: this.$store.state.User.cookie,
		}).then(response => {
			if (response.status === 200) {
				let dat = response.data;
				if (dat.status === 0) {
					this.orderList = dat["ret"];
					this.$notification.success({
						message: "成功",
						description: "订单信息数据拉取成功",
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
};
</script>

<style scoped>
.container {
	max-width: min(1000px, 90%);
	margin: auto;
	text-align: left;
}
</style>
