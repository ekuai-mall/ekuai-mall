<template>
	<a-spin tip="Loading..." size="large" :spinning="loading">
		<div class="body">
			<h1 class="mod-title">
				<span class="ico-wechat"></span><span class="text">微信支付</span>
			</h1>
			<div class="mod-ct">
				<div class="order"></div>
				<div class="amount">￥{{ price }}</div>
				<div class="qr-image" id="qrcode">
					<canvas id="qrCanvas"></canvas>
				</div>
				<div id="open-app-container" v-show="openWx">
					<span style="display: block;margin-top: 24px">请截屏此界面或保存二维码，打开微信扫码，选择相册图片</span>
					<a style="display: inline-block;margin-top: 8px;padding:6px 34px;border:1px solid #e5e5e5" id="open-app" href="weixin://">点击打开微信</a>
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
	}),
	computed: {
		time() {
			if (this.order) {
				let time = new Date(this.order["time_start"] * 10000),
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
	},
	methods: {
		init() {
			if (navigator.userAgent.match(/MicroMessenger/i) !== null && this.order.url.indexOf("http") === 0) {
				// 当前在微信内, URL直接跳转
				location.href = this.order.url;
			} else if (navigator.userAgent.match(/MicroMessenger/i) !== null && this.order.url.indexOf("weixin://") === -1) {
				// 当前在微信内, code_url是JSAPI参数
				// $(".tip>.ico-scan").remove();
				// $(".tip>.tip-text").html("<p>请在弹出的窗口完成支付</p>");
				// $("#open-app-container").html("<p></p>");
				// $("#orderDetail>.detail-ct").show();
				// $("#orderDetail>.arrow").remove();
				//
				// function onBridgeReady() {
				// 	WeixinJSBridge.invoke(
				// 		"getBrandWCPayRequest", JSON.parse(code_url),
				// 		function (res) {
				// 			if (res.err_msg === "get_brand_wcpay_request:fail") {
				// 				$(".tip>.tip-text").html("<p>支付失败</p><p>" + res.err_desc + "</p>");
				// 				alert(res.err_desc);
				// 			} else if (res.err_msg === "get_brand_wcpay_request:ok") {
				// 				//使用以上方式判断前端返回,微信团队郑重提示：
				// 				//res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
				// 				$(".tip>.tip-text").html("<p>订单已支付, 正在处理...</p>");
				// 			}
				// 		});
				// }
				//
				// if (typeof WeixinJSBridge === "undefined") {
				// 	if (document.addEventListener) {
				// 		document.addEventListener("WeixinJSBridgeReady", onBridgeReady, false);
				// 	} else if (document.attachEvent) {
				// 		document.attachEvent("WeixinJSBridgeReady", onBridgeReady);
				// 		document.attachEvent("onWeixinJSBridgeReady", onBridgeReady);
				// 	}
				// } else {
				// 	onBridgeReady();
				// }
			} else {
				// 普通扫码
				let QRCode = require("qrcode");
				let canvas = document.getElementById("qrCanvas");
				QRCode.toCanvas(canvas, this.order.url, {errorCorrectionLevel: "H"}, function (error) {
					if (error) {
						console.error(error);
						this.$error({
							title: "系统错误",
							content: "二维码生成失败",
						});
					}
				});
			}

			// // 订单详情
			// var orderDetail = $("#orderDetail");
			// orderDetail.find(".arrow").click(function (event) {
			// 	if (orderDetail.hasClass("detail-open")) {
			// 		orderDetail.find(".detail-ct").slideUp(500, function () {
			// 			orderDetail.removeClass("detail-open");
			// 		});
			// 	} else {
			// 		orderDetail.find(".detail-ct").slideDown(500, function () {
			// 			orderDetail.addClass("detail-open");
			// 		});
			// 	}
			// });

			// call app
			if (navigator.userAgent.match(/(iPhone|iPod|Android|ios|SymbianOS)/i) !== null) {
				this.openWx = true;
			}
			this.loading = false;
		},
	},
	mounted() {
		this.$axios.$post("?_=pay/getOrder", {
			order: this.$route.params.order,
		}).then(response => {
			if (response.status === 200) {
				let dat = response.data;
				if (dat.status === 0) {
					this.order = dat["ret"];
					this.init();
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
