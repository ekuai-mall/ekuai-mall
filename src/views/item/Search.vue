<template>
	<div class="container">
		<a-page-header class="header" title="搜索" sub-title="在此搜索商品"/>
		<a-input-search placeholder="在此输入搜索内容" enter-button @search="onSearch"/>
		<div class="margin-10">
			<a-row>
				<a-col :md="12" :sm="24" v-for="(val,index) in items" :key="index">
					<a-card class="margin-10" hoverable style="width: 240px;margin: auto" @click="redirect(index)">
						<img slot="cover" :alt="val.name" :src="val.img[0].img"/>
						<a-card-meta :title="val.name">
							<template slot="description">
								{{ val.detail }}
							</template>
						</a-card-meta>
					</a-card>
				</a-col>
			</a-row>
		</div>
	</div>

</template>

<script>
export default {
	name: "ItemSearch",
	data: () => ({
		items: [],
	}),
	methods: {
		onSearch(val) {
			this.$axios.$post("?_=item/search", {
				key: val,
			}).then(response => {
				if (response.status === 200) {
					let dat = response.data;
					if (dat.status === 0) {
						let items = dat["ret"];
						for (let item of items) {
							item.img = JSON.parse(item.img);
						}
						this.items = items;
					} else {
						this.$warning({
							title: "搜索失败",
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
		redirect(e) {
			this.$router.push("/item/" + this.items[e].id);
		},
	},
	mounted() {
		this.onSearch("");
	},
};
</script>

<style scoped>
.header {
	max-width: 90%;
	margin: 10px;
	border: 1px solid rgb(235, 237, 240);
}

.container {
	max-width: min(1000px, 90%);
	margin: auto;
	text-align: left;
}
</style>
