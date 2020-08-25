<template>
	<div class="container">
		<a-spin tip="Loading..." size="large" :spinning="onLoading">
			<a-row>
				<a-col :span="8">
					<img src="//img11.360buyimg.com/n1/s450x450_jfs/t1/124728/34/9676/165062/5f3a2b82Eb3862806/58da0d931de15fe0.jpg" alt="">
				</a-col>
				<a-col :span="16">
					<a-row>
						三星（SAMSUNG）15.6英寸Galaxy Book Flex 2020款触屏超轻薄二合一笔记本电脑(十代i7/16G/1T SSD)银
					</a-row>
					<a-row>
						<a-menu mode="inline" @click="handleClick">
							<a-menu-item key="5">
								Option 5
							</a-menu-item>
							<a-menu-item key="6">
								Option 6
							</a-menu-item>
						</a-menu>
					</a-row>
				</a-col>
			</a-row>
		</a-spin>
	</div>
</template>

<script>
export default {
	name: "Item",
	data: () => ({
		onLoading: true,
		itemId: -1,
		itemInfo: {},
	}),
	mounted() {
		// this.onLoading = true;
		this.itemId = this.$route.params.id;
		this.$axios.$get("?_=item/" + this.itemId)
			.then(response => {
				if (response.status === 200) {
					let dat = response.data;
					if (dat.status === 0) {
						this.onLoading = false;
						this.itemInfo = dat["ret"];
					} else {
						this.$error({
							title: "服务器错误",
							content: dat.status + "：" + dat["ret"],
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
	max-width: 1210px;
	margin: 40px auto;
}
</style>
