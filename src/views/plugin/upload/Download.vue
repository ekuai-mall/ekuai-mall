<template>
	<div>
		<div v-if="canDown">
			<div class="margin-10">
				<a-button type="primary" @click="download">
					点击下载文件 {{ this.proj ? this.proj.res : "file not found" }}
				</a-button>
				<span class="ant-btn ant-btn-link" v-clipboard:copy="link" v-clipboard:success="onCopy" v-clipboard:error="onError">点击复制链接</span>
			</div>
			<div class="margin-10">
				<a-button type="primary" @click="download1">
					无法下载请点击
				</a-button>
			</div>
		</div>
		<div v-else>
			<a-result title="您的项目正在制作中，请耐心等待"/>
		</div>
	</div>
</template>

<script>
export default {
	name: "Download",
	data: () => ({
		canDown: false,
	}),
	computed: {
		proj() {
			return this.$parent.proj;
		},
		link() {
			if (this.proj) {
				let b = this.proj.name + "/" + this.proj.res;
				return "https://life-down-1252428915.cos.ap-guangzhou.myqcloud.com/" + b;
			} else {
				return "";
			}
		},
	},
	methods: {
		download() {
			let a = document.createElement("a");
			a.href = this.link;
			a.click();
		},
		onCopy() {
			this.$message.success("链接已复制到剪切板！");
		},
		onError() {
			this.$message.error("抱歉，链接复制失败！");
		},
		download1() {
			window.open(this.link);
		},
	},
};
</script>
