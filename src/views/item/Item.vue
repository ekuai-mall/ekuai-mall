<template>
	<div class="container">
		<a-spin tip="Loading..." size="large" :spinning="onLoading">
			<a-row>
				<a-col :lg="8" :md="24" class="imgContainer">
					<a-carousel ref="carousel" dots-class="slick-dots slick-thumb">
						<a slot="customPaging" slot-scope="props">
							<img @mouseover="changeImg(props.i)" :src="itemInfo.img[props.i].img" alt=""/>
						</a>
						<div v-for="(url,index) in itemInfo.img" :key="index">
							<video v-if="url.video" :src="url.video" :poster="url.img" controls></video>
							<img v-else :src="url.img" alt=""/>
						</div>
					</a-carousel>
				</a-col>
				<a-col :lg="16" :md="24" class="detailContainer">
					<a-row>
						<h2>{{ itemInfo.name }}</h2>
					</a-row>
					<a-row>
						{{ itemInfo.detail }}
					</a-row>
					<a-row>
						<ItemList :item="itemInfo.child" @hclick="handleClick" v-model="currentSelected"></ItemList>
					</a-row>
					<a-row>
						<a-button type="primary" block size="large" @click="checkUser">
							购买
						</a-button>
					</a-row>
				</a-col>
			</a-row>
		</a-spin>
		<a-drawer class="itemDrawer" title="选择" placement="bottom" :closable="false" :visible="draw" @close="draw=false" height="">
			<a-row class="drawerContainer">
				<a-col :lg="8" :md="24">
					<img class="img" v-if="currentSelected[0]>-1" :src="itemInfo.child[currentSelected[0]].img" alt="">
				</a-col>
				<a-col :lg="16" :md="24" class="detailContainer">
					<a-row>
						<ItemList :item="itemInfo.child" v-model="currentSelected"></ItemList>
					</a-row>
					<a-row>
						<a-button type="primary" block size="large" @click="buy">
							购买
						</a-button>
					</a-row>
				</a-col>
			</a-row>
		</a-drawer>
	</div>
</template>

<script>
import ItemList from "@/views/item/ItemList.vue";

export default {
	name: "Item",
	data: () => ({
		onLoading: true,
		itemId: -1,
		itemInfo: {},
		draw: false,
		currentSelected: [],
	}),
	methods: {
		handleClick() {
			this.draw = true;
		},
		changeImg(e) {
			this.$refs.carousel.goTo(e);
		},
		checkUser() {
			if (this.$store.state.User.cookie === "") {
				this.$info({
					title: "请先登录",
					content: "需要登陆后才可购买商品",
				});
				this.$router.push({path: "/user/login", query: {redirect: this.$route.path}});
				return false;
			} else if (this.currentSelected[0] === undefined || this.currentSelected[0] < 0 || this.currentSelected[0] >= this.itemInfo.child.length) {
				this.$info({
					title: "请先选择一个商品",
					content: "需要选中商品后才可购买商品",
				});
				return false;
			} else {
				this.draw = true;
				return true;
			}
		},
		buy() {
			if (this.checkUser()) {
				this.$axios.$post("?_=pay/buy", {
					cookie: this.$store.state.User.cookie,
					user: this.$store.state.User.id,
					product: this.itemInfo.child[this.currentSelected[0]].id,
				}).then(response => {
					if (response.status === 200) {
						let dat = response.data;
						if (dat.status === 0) {
							this.$success({
								title: "下单成功",
								content: "请在此页使用微信支付，有效期2小时",
							});
							this.$router.push("/pay/wechat/" + dat["ret"]);
						} else {
							this.$error({
								title: "下单失败",
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
			}
		},
	},
	computed: {},
	mounted() {
		this.itemId = this.$route.params.id;
		this.$axios.$get("?_=item/get/" + this.itemId)
			.then(response => {
				if (response.status === 200) {
					let dat = response.data;
					if (dat.status === 0) {
						this.onLoading = false;
						this.itemInfo = dat["ret"];
						this.itemInfo.img = JSON.parse(this.itemInfo.img);
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
	components: {
		ItemList,
	},
};
</script>

<style scoped>
.container {
	max-width: 1210px;
	margin: 40px auto;
}

.detailContainer {
	padding: 0 10px;
}

@media (min-width: 800px) {
	.detailContainer {
		padding: 0 80px;
	}
}

.imgContainer {
	margin-bottom: 80px;
}

.ant-carousel >>> .slick-dots {
	height: auto;
}

.ant-carousel >>> .slick-slide video {
	width: 100%;
	height: 100%;
	padding: 10px;
}

.ant-carousel >>> .slick-slide img {
	display: block;
	max-width: 80%;
	margin: auto;
	border: 5px solid #fff;
}

.ant-carousel >>> .slick-thumb {
	bottom: -45px;
}

.ant-carousel >>> .slick-thumb li,
.ant-carousel >>> .slick-thumb li img {
	width: 60px;
	height: 45px;
}

.ant-carousel >>> .slick-thumb li img {
	object-fit: contain;
}

.ant-carousel >>> .slick-thumb li.slick-active img {
	border: #2f54eb 2px solid;
}

.drawerContainer {
	max-width: 1000px;
	margin: auto;
}

.img {
	width: 100%;
	object-fit: contain;
}
</style>
<style>
.itemDrawer .ant-drawer-content-wrapper {
	height: calc(100% - 70px);
}
</style>
