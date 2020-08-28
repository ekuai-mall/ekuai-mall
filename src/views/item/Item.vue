<template>
	<div class="container">
		<a-spin tip="Loading..." size="large" :spinning="onLoading">
			<a-row>
				<a-col :span="8" class="imgContainer">
					<img :src="itemInfo.img" alt="" class="img">
				</a-col>
				<a-col :span="16" class="detailContainer">
					<a-row>
						<h2>{{ itemInfo.name }}</h2>
					</a-row>
					<a-row>
						{{ itemInfo.detail }}
					</a-row>
					<a-row>
						<a-menu mode="inline" @click="handleClick">
							<a-menu-item v-for="(item, index) in itemInfo.child" :key="index">
								{{ item.name }} - ￥{{ item.price / 100 }}
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
	methods: {
		handleClick(e) {
			console.log(e);
		},
	},
	mounted() {
		// this.onLoading = true;
		this.itemId = this.$route.params.id;
		this.$axios.$get("?_=item/get/" + this.itemId)
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

.imgContainer {
	padding: 0 20px;
}

.detailContainer {
	padding: 0 90px;
}

.img {
	width: 360px;
}
</style>
