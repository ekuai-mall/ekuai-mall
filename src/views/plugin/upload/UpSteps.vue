<template>
	<div class="margin-10">
		<a-steps :current="current">
			<a-step title="项目">
				<a-icon slot="icon" type="user"/>
			</a-step>
			<a-step title="选择文件">
				<a-icon slot="icon" type="file-search"/>
			</a-step>
			<a-step title="上传文件">
				<a-icon slot="icon" type="upload"/>
			</a-step>
			<a-step title="完成">
				<a-icon slot="icon" type="check-circle"/>
			</a-step>
		</a-steps>
		<div class="margin-10">
			<div v-if="current===0">
				<div class="margin-10">
					<h4>订单号：{{ order }}</h4>
					<h4>订单内容：{{ orderInfo.name }}</h4>
				</div>
				<a-input class="margin-10" v-model="name" placeholder="请输入项目名">
					<a-icon slot="prefix" type="folder-open"/>
				</a-input>
				<a-textarea class="margin-10" v-model="remark" placeholder="请输入备注，可空" auto-size/>
				<div class="margin-10">
					<a-button-group>
						<a-button type="primary" @click="current=0">
							<a-icon type="left"/>
							返回
						</a-button>
						<a-button type="primary" @click="newProj" :loading="projLoading" :disabled="name.length===0">
							提交
							<a-icon type="right"/>
						</a-button>
					</a-button-group>
				</div>
			</div>
			<div v-if="current===1">
				<selector v-model="fileList"></selector>
				<div class="margin-10">
					<a-button-group>
						<a-button type="primary" @click="current=0">
							<a-icon type="left"/>
							返回
						</a-button>
						<a-button type="primary" @click="uploadCheck" :loading="uploadLoading" :disabled="fileList.length===0">
							开始上传
							<a-icon type="right"/>
						</a-button>
					</a-button-group>
				</div>
			</div>
			<div v-if="current===2">
				<upCos :fileStatus="fileStatus" :auth="auth" :fileArr="fileList" :dir="thisProj.name"></upCos>
			</div>
			<div v-if="current===3">
				<a-result status="success" title="文件上传成功!" sub-title="素材已提交，我们预计在1-2天内通过您提供的联系方式联系您！"/>
				<a-button type="primary" @click="back">
					回到订单
				</a-button>
			</div>
		</div>
	</div>
</template>
<script>
import selector from "./selector.vue";
import upCos from "./UpCos.vue";

export default {
	name: "UpSteps",
	data: () => ({
		current: 0,
		name: "",
		remark: "",
		projLoading: false,
		thisProj: null,
		fileList: [],
		uploadLoading: false,
		auth: null,
		fileStatus: {},
	}),
	computed: {
		orderInfo() {
			return this.$parent.orderInfo;
		},
		order() {
			return this.$parent.order;
		},
		proj() {
			return this.$parent.proj;
		},
	},
	components: {
		selector,
		upCos,
	},
	watch: {
		proj() {
			this.thisProj = this.$parent.proj;
			this.current = 1;
		},
	},
	methods: {
		newProj() {
			this.projLoading = true;
			this.$axios.$post("?_=cos/newProj", {
				order: this.order,
				user: this.$store.state.User.id,
				cookie: this.$store.state.User.cookie,
				proj: this.name,
			}).then(response => {
				if (response.status === 200) {
					let dat = response.data;
					if (dat.status === 0) {
						this.thisProj = dat["ret"];
						this.$notification.success({
							message: "成功",
							description: "项目生成成功",
						});
						this.current = 1;
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
				this.projLoading = false;
			}).catch(error => {
				this.$error({
					title: "网络错误",
					content: error,
				});
				console.log(error);
				this.projLoading = false;
			});
		},
		uploadCheck: function () {
			this.uploadLoading = true;
			let filename = [];
			for (let file of this.fileList) {
				if (filename.indexOf(file.name) !== -1) {
					this.$error({
						title: "提交失败",
						content: "错误信息：文件池中不得有重名文件",
					});
					this.uploadLoading = false;
					return;
				} else {
					filename.push(file.name);
				}
			}
			let that = this;
			this.$confirm({
				title: "是否确认上传？",
				content: "上传后无法取消或修改",
				onOk: () => {
					this.$axios.$post("?_=cos/getAuth", {
						order: that.order,
						user: that.$store.state.User.id,
						cookie: that.$store.state.User.cookie,
					}).then(response => {
						if (response.status === 200) {
							let dat = response.data;
							if (dat.status === 0) {
								if (!dat.ret.credentials) {
									that.$error({
										title: "提交失败",
										content: "错误信息：服务端错误",
									});
								} else {
									that.auth = dat.ret;
									that.fileStatus = [];
									for (let index in that.fileList) {
										that.fileStatus.push({
											name: that.fileList[index].name,
											size: that.fileList[index].size,
											index: index,
											uploaded: 0,
										});
									}
									that.current = 2;
								}
							} else {
								this.$warning({
									title: "提交鉴权失败",
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
						this.projLoading = false;
					}).catch(error => {
						this.$error({
							title: "网络错误",
							content: error,
						});
						console.log(error);
						this.projLoading = false;
					});
				},
				onCancel() {
					that.uploadLoading = false;
				},
				cancelText: "否",
				okTest: "是",
			});
		},
		back() {
			this.$router.push("/order/" + this.order);
		},
	},
};
</script>
