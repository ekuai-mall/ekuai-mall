<template>
	<div>
		<a-page-header class="header" title="绑定微信" sub-title="在此修改或取消微信绑定"/>
		<br>
		<a-alert v-if="wechat.length===0" class="msg" message="您的微信还未绑定" description="为了您能够正常使用各项功能，请绑定微信" type="warning" show-icon/>
		<a-alert v-else class="msg" message="您已绑定微信账户" type="success" show-icon>
			<p slot="description">
				您的账户已绑定微信账号： <span style="color: red">{{ wechat }}</span> !<br/>不是您的微信？
				<a-button type="link" @click="unbind">
					解绑
				</a-button>
			</p>
		</a-alert>

		<a-card title="扫描下方二维码绑定/修改微信" class="qr-container">
			<div>
				<img :src="src" alt="qrcode">
			</div>
		</a-card>
	</div>
</template>

<script>
export default {
	name: "BindWechat",
	data: () => ({
		wechat: "",
		src: "",
	}),
	methods: {
		refreshWechat() {
			if (!this || this._isDestroyed) {
				return;
			}
			this.$axios.$post("?_=auth/getWechat", {
				id: this.$store.state.User.id,
				cookie: this.$store.state.User.cookie,
			}).then(response => {
				if (response.status === 200) {
					let dat = response.data;
					if (dat.status === 0) {
						this.wechat = dat["ret"] ? dat["ret"] : "";
						setTimeout(this.refreshWechat, 2000);
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
				console.log(response.data);
			}).catch(error => {
				this.$error({
					title: "网络错误",
					content: error,
				});
				console.log(error);
			});
		},
		unbind() {
			this.$axios.$post("?_=auth/clearWechat", {
				id: this.$store.state.User.id,
				cookie: this.$store.state.User.cookie,
			}).then(response => {
				if (response.status === 200) {
					let dat = response.data;
					if (dat.status === 0) {
						this.wechat = "";
						this.$success({
							title: "成功",
							content: "微信解绑成功，您将不再从该微信收到本账号的信息",
						});
					} else {
						this.$warning({
							title: "解绑失败",
							content: "错误码：" + dat.status + "，错误信息：" + dat["ret"],
						});
					}
				} else {
					this.$error({
						title: "网络错误",
						content: response.status + "：" + response.statusText,
					});
				}
				console.log(response.data);
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
		this.$axios.$post("?_=auth/getWechat", {
			id: this.$store.state.User.id,
			cookie: this.$store.state.User.cookie,
		}).then(response => {
			if (response.status === 200) {
				let dat = response.data;
				if (dat.status === 0) {
					this.wechat = dat["ret"] ? dat["ret"] : "";
					this.$notification.success({
						message: "成功",
						description: "个人信息数据拉取成功",
					});
					let QRCode = require("qrcode");
					let state = this.$store.state.User.id + "|" + this.$store.state.User.cookie;
					let callBack = window.location.protocol + "//" + window.location.host + window.location.pathname;
					callBack = callBack.substring(0, callBack.lastIndexOf("/") + 1) + "api/server.php";
					let url = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + this.$store.state.Run.wxAppId + "&redirect_uri=" + callBack + "&response_type=code&scope=snsapi_userinfo&state=" + state;
					let that = this;
					QRCode.toDataURL(url, {errorCorrectionLevel: "H"}, function (error,url) {
						if (error) {
							console.error(error);
							that.$error({
								title: "系统错误",
								content: "二维码生成失败",
							});
						}else{
							that.src=url;
						}
					});
					this.refreshWechat();
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
.header {
	max-width: 90%;
	margin: 10px;
	border: 1px solid rgb(235, 237, 240);
}

.msg {
	max-width: 90%;
	margin: 10px;
	text-align: left;
}

.qr-container {
	width: 400px;
	margin: 10px;
}
</style>
