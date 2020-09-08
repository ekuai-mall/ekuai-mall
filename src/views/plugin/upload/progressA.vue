<template>
	<div>
		<span>{{ file.name }} - {{ uploaded }}/{{ size }} - {{ percent }}%</span>
		<a-progress :percent="percent" :status="status"/>
	</div>
</template>
<script>
export default {
	name: "progressA",
	props: ["file"],
	data: () => ({
		status: "active",
	}),
	methods: {
		renderSize(value) {
			if (value == null || value == "") {
				return "0 Bytes";
			}
			const unitArr = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
			let index = 0;
			let srcSize = parseFloat(value);
			index = Math.floor(Math.log(srcSize) / Math.log(1024));
			let size = srcSize / Math.pow(1024, index);
			size = size.toFixed(2); //保留的小数位数
			return size + unitArr[index];
		},
	},
	computed: {
		percent() {
			return Math.round(this.file.uploaded / this.file.size * 10000) / 100;
		},
		uploaded() {
			return this.renderSize(this.file.uploaded);
		},
		size() {
			return this.renderSize(this.file.size);
		},
	},
	watch: {
		percent() {
			if (this.percent === 100) {
				this.status = "";
			}
		},
	},
};
</script>
<style lang="scss" scoped>
</style>
