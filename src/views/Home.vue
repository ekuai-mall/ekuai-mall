<template>
	<div class="container">
		<a-input-search class="search-input" placeholder="在此输入搜索内容" enter-button @search="onSearch"/>
		<a-carousel autoplay>
			<div v-for="(url,index) in img" :key="index">
				<img :src="url" alt="">
			</div>
		</a-carousel>
		<a-row>
			<a-col :span="6" class="quick-jump padding-10" @click="onSearch('视频制作')">
				<a-row>
					<a-avatar :size="64" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>
				</a-row>
				<a-row class="padding-10">
					视频制作
				</a-row>
			</a-col>
			<a-col :span="6" class="quick-jump padding-10" @click="onSearch('平面设计')">
				<a-row>
					<a-avatar :size="64" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>
				</a-row>
				<a-row class="padding-10">
					平面设计
				</a-row>
			</a-col>
			<a-col :span="6" class="quick-jump padding-10" @click="onSearch('插画')">
				<a-row>
					<a-avatar :size="64" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>
				</a-row>
				<a-row class="padding-10">
					插画
				</a-row>
			</a-col>
			<a-col :span="6" class="quick-jump padding-10" @click="onSearch('活动策划')">
				<a-row>
					<a-avatar :size="64" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>
				</a-row>
				<a-row class="padding-10">
					活动策划
				</a-row>
			</a-col>
		</a-row>
		<a-row class="padding-10">
			<a-card class="margin-10" hoverable style="width: 100%;margin: auto" @click="redirect(2)">
				<img slot="cover" alt="测试商品" src="https://www.mzyyun.com/api/img.php?r=5"/>
				<a-card-meta title="测试商品" description="detail"/>
				<template slot="actions" class="ant-card-actions">
					<span>￥50</span>
					<span>查看</span>
				</template>
			</a-card>
		</a-row>
	</div>
</template>

<script>
export default {
	name: "Home",
	computed: {
		img() {
			return JSON.parse(this.$store.state.Run.homeImg ? this.$store.state.Run.homeImg : "[]");
		},
	},
	methods: {
		onSearch(val) {
			this.$router.push("/item/search/" + val);
		},
		redirect(val) {
			this.$router.push("/item/" + val);
		},
	},
};
</script>

<style scoped>
.container {
	max-width: 500px;
	margin: 10px auto;
}

.search-input {
	padding: 10px;
}

.ant-carousel div {
	max-height: 200px;
}

.ant-carousel img {
	width: 100%;
	overflow: hidden;
	text-align: center;
	background: #364d79;
}

.ant-carousel >>> .slick-slide h3 {
	color: #fff;
}

.quick-jump {
	cursor: pointer;
}
</style>
