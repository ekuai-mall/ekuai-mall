<template>
	<a-spin tip="Loading..." size="large" :spinning="loading">
		<div class="body">
			<h1 class="mod-title">
				<span class="ico-wechat"></span><span class="text">微信支付</span>
			</h1>
			<div v-if="finished">
				<a-result status="success" :title="title" :sub-title="subTitle"/>
			</div>
			<div v-else class="mod-ct">
				<div class="order"></div>
				<div class="amount">￥{{ price }}</div>
				<div v-if="openWx" id="open-app-container">
					<a-result title="请在弹出的微信界面支付"/>
					<a-alert v-if="jsPaid" message="微信支付完成，系统处理中，请稍后" type="success" show-icon/>
					<a-button v-else type="primary" @click="jsApiPay">
						点击支付
					</a-button>
				</div>
				<div v-else class="qr-image" id="qrcode">
					<img :src="src" alt="qrcode">
				</div>
				<div class="detail" id="orderDetail">
					<dl class="detail-ct" style="display: block">
						<dt>用户</dt>
						<dd id="User">{{ order ? order.user.user : "Loading" }}</dd>
						<dt>商品</dt>
						<dd id="storeName">{{ order ? order.name : "Loading" }}</dd>
						<dt>订单号</dt>
						<dd id="billId">{{ $route.params.order }}</dd>
						<dt>下单时间</dt>
						<dd id="createTime">{{ time }}</dd>
						<dt>备注留言</dt>
						<dd id="remark">{{ order ? order["remark"] : "Loading" }}</dd>
					</dl>
				</div>
				<a-button type="primary" @click="forceCheck">
					强制查单
				</a-button>
				<div class="tip">
					<span class="dec dec-left"></span>
					<span class="dec dec-right"></span>
					<div class="ico-scan"></div>
					<div class="tip-text">
						<p>请使用微信扫一扫</p>
						<p>扫描二维码完成支付</p>
					</div>
				</div>
				<div class="tip-text">
				</div>
			</div>
			<div class="foot">
				<div class="inner">
					<p>ekuai mall 2020, 有疑问请联系客服</p>
				</div>
			</div>
		</div>
	</a-spin>
</template>

<script>
export default {
	name: "Wechat",
	data: () => ({
		loading: true,
		order: null,
		openWx: false,
		finished: false,
		redirectTime: 5,
		jsPayDat: null,
		jsPaid: false,
		src: "",
		checking: false,
	}),
	computed: {
		time() {
			if (this.order) {
				let time = new Date(this.order["time_start"] * 1000),
					y = time.getFullYear(),
					m = time.getMonth() + 1,
					d = time.getDate();
				return y + "-" + (m < 10 ? "0" + m : m) + "-" + (d < 10 ? "0" + d : d) + " " + time.toTimeString().substr(0, 8);
			} else {
				return "";
			}
		},
		price() {
			return this.order ? this.order.price / 100 : 0;
		},
		title() {
			return "订单 " + this.$route.params.order + " 支付成功";
		},
		subTitle() {
			return this.redirectTime + "秒后将自动跳转到订单页面，若未跳转，请在用户中心查看";
		},
	},
	methods: {
		init() {
			if (this.order.url === "JSAPI") {
				if (navigator.userAgent.match(/MicroMessenger/i) === null) {
					this.$error({
						title: "系统错误",
						content: "请在微信中支付本订单",
					});
				} else {
					if (!this.$route.params.code) {
						let callBack = window.location.protocol + "//" + window.location.host + window.location.pathname;
						callBack = callBack.substring(0, callBack.lastIndexOf("/") + 1);
						let url = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + this.$store.state.Run.wxAppId + "&redirect_uri=" + callBack + "api/server.php&response_type=code&scope=snsapi_base&state=jsapi|" + btoa(callBack + "#/pay/wechat/" + this.order.order) + "#wechat_redirect";
						location.href = url;
					} else {
						this.$axios.$post("?_=pay/generateOrder", {
							code: this.$route.params.code,
							order: this.order.order,
						}).then(response => {
							if (response.status === 200) {
								let dat = response.data;
								if (dat.status === 0) {
									this.jsPayDat = dat["ret"];
									this.openWx = true;
								} else {
									this.$notification.error({
										message: "订单获取错误，请重试",
										description: dat["ret"],
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
					}
				}
			} else if (this.order.url.indexOf("http") > -1) {
				this.openWx = true;
			} else {
				let QRCode = require("qrcode");
				let that = this;
				QRCode.toDataURL(this.order.url, {errorCorrectionLevel: "H"}, function (error, url) {
					if (error) {
						console.error(error);
						that.$error({
							title: "系统错误",
							content: "二维码生成失败",
						});
					} else {
						that.src = url;
					}
				});
				this.checking || this.check();
			}
			this.loading = false;
		},
		jsApiPay() {
			if (this.order.url === "JSAPI") {
				if (window.WeixinJSBridge) {
					let that = this;
					window.WeixinJSBridge.invoke(
						"getBrandWCPayRequest", this.jsPayDat,
						function (res) {
							if (res.err_msg === "get_brand_wcpay_request:fail") {
								that.$error({
									title: "订单支付失败",
									content: "请刷新页面重试",
								});
							} else if (res.err_msg === "get_brand_wcpay_request:ok") {
								that.jsPaid = true;
								that.checking || that.check();
							}
						});
				} else {
					this.$error({
						title: "微信支付错误",
						content: "请重试",
					});
				}
			} else {
				localStorage.setItem("wxPayCheck", "true");
				location.href = this.order.url;
			}
		},
		check() {
			if (!this || this._isDestroyed) {
				return;
			}
			this.checking = true;
			this.$axios.$post("?_=pay/checkOrder", {
				order: this.$route.params.order,
			}).then(response => {
				if (response.status === 200) {
					let dat = response.data;
					if (dat.status === 0) {
						let status = dat["ret"];
						console.log(dat);
						if (status === "SUCCESS") {
							this.finish();
						} else {
							setTimeout(this.check, 2000);
						}
					} else {
						this.$notification.error({
							message: "订单获取错误，请刷新页面重试",
							description: dat["ret"],
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
		finish() {
			this.finished = true;
			this.loading = false;
			setTimeout(this.timer, 1000);
		},
		timer() {
			if (!this || this._isDestroyed) {
				return;
			}
			if (this.redirectTime === 0) {
				this.$router.push("/order/" + this.$route.params.order);
			}
			this.redirectTime -= 1;
			setTimeout(this.timer, 1000);
		},
		forceCheck() {
			if (this.checking) {
				this.$info({
					title: "提示",
					content: "查单线程已开启，请勿重复操作",
				});
			} else {
				this.check();
				this.$notification.success({
					message: "查单线程已开启",
					description: "正在查单，请稍后，若长时间无反应请联系客服",
				});

			}
		},
	},
	mounted() {
		if (localStorage.getItem("wxPayCheck") === "true") {
			localStorage.removeItem("wxPayCheck");
			this.check();
		}
		this.$axios.$post("?_=pay/getOrder", {
			order: this.$route.params.order,
		}).then(response => {
			if (response.status === 200) {
				let dat = response.data;
				if (dat.status === 0) {
					this.order = dat["ret"];
					if (dat["ret"].status === "SUCCESS") {
						this.finish();
					} else {
						this.init();
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
@import url('../../assets/wxpay.css');

</style>
