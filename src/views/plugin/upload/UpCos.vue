<template>
	<div>
		<div v-for="file in fileList" :key="file.name">
			<progressA :file="file"></progressA>
		</div>
		<a-button type="primary" @click="start" :loading="loading">
			开始上传
		</a-button>
	</div>
</template>
<script>
import progressA from "./progressA.vue";
import COS from "cos-js-sdk-v5";

export default {
	name: "UpCos",
	data: () => ({
		fileList: [],
		Bucket: "life-1252428915",
		Region: "ap-guangzhou",
		loading: false,
		finish: false,
	}),
	props: ["fileStatus", "auth", "dir", "fileArr"],
	components: {
		progressA,
	},
	mounted() {
		this.fileList = this.fileStatus;
	},
	computed: {
		prefix() {
			return "https://" + this.Bucket + ".cos." + this.Region + ".myqcloud.com/" + this.dir + "/";
		},
		order() {
			return this.$parent.order;
		},
	},
	methods: {
		start() {
			this.loading = true;
			let that = this;
			for (let index in this.fileStatus) {
				let file = this.fileList[index];
				let Key = file.name;
				this.getAuthorization({
					Method: "PUT",
					Pathname: this.dir + "/" + Key,
				}, function (info) {
					let auth = info.Authorization;
					let XCosSecurityToken = info.XCosSecurityToken;
					let url = that.prefix + that.camSafeUrlEncode(Key).replace(/%2F/, "/");
					let xhr = new XMLHttpRequest();
					xhr.open("PUT", url, true);
					xhr.setRequestHeader("Authorization", auth);
					XCosSecurityToken && xhr.setRequestHeader("x-cos-security-token", XCosSecurityToken);
					xhr.upload.onprogress = function (e) {
						that.fileList[index].uploaded = e.loaded;
					};
					xhr.onload = function () {
						if (xhr.status === 200 || xhr.status === 206) {
							that.$message.success("文件 " + Key + " 上传成功");
						} else {
							that.$message.error("文件 " + Key + " 上传失败，状态码：" + xhr.status);
						}
					};
					xhr.onerror = function () {
						that.$message.error("文件 " + Key + " 上传失败，请检查是否没配置 CORS 跨域规则");
					};
					xhr.send(that.fileArr[that.fileList[index].index]);
				});
			}
			this.checkNext();
		},
		getAuthorization(options, callback) {
			callback({
				XCosSecurityToken: this.auth.credentials.sessionToken,
				Authorization: COS.getAuthorization({
					SecretId: this.auth.credentials.tmpSecretId,
					SecretKey: this.auth.credentials.tmpSecretKey,
					Method: options.Method,
					Pathname: options.Pathname,
				}),
			});
		},
		camSafeUrlEncode(str) {
			return encodeURIComponent(str)
				.replace(/!/g, "%21")
				.replace(/'/g, "%27")
				.replace(/\(/g, "%28")
				.replace(/\)/g, "%29")
				.replace(/\*/g, "%2A");
		},
		checkNext() {
			if (!this || this._isDestroyed) {
				return;
			}
			if (this.$parent.current === 2) {
				setTimeout(this.checkNext, 1000);
			}
			if (this.loading) {
				for (let file of this.fileList) {
					if (file.size !== file.uploaded) {
						return;
					}
				}
				if (!this.finish) {
					this.finish = true;
					this.$axios.$post("?_=cos/finish", {
						order: this.order,
						user: this.$store.state.User.id,
						cookie: this.$store.state.User.cookie,
					}).then(response => {
						if (response.status === 200) {
							let dat = response.data;
							if (dat.status === 0) {
								this.$parent.current = 3;
							} else {
								this.$warning({
									title: "项目提交失败",
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
				}

			}
		},
	},
};
</script>
<style scoped>
</style>
