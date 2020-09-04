<template>
	<div id="app">
		<a-affix :offset-top="0">
			<Header></Header>
		</a-affix>
		<div class="container">
			<router-view/>
		</div>
	</div>
</template>

<script>
import Header from "./views/Utils/Header.vue";

export default {
	name: "App",
	components: {Header},
	data: () => ({
		lastBeat: 0,
	}),
	methods: {
		async heartbeat() {
			let user = this.$store.state.User;
			if (user.id === -1 || user.cookie.length === 0) {
				return false;
			}
			if (Math.abs(this.lastBeat - new Date().getTime()) < 2000) {
				return true;
			}
			try {
				let response = await this.$axios.$post("?_=auth/heartbeat", {
					id: user.id,
					cookie: user.cookie,
				});
				if (response.status === 200) {
					let dat = response.data;
					if (dat.status === 0) {
						this.$store.commit("User/updateUserInfo", dat["ret"]);
						this.lastBeat = new Date().getTime();
						return true;
					} else {
						this.$notification.warning({
							message: "登陆失效",
							description: "由于 " + dat["ret"] + " 您的登陆信息已失效，您可能需要重新登录，错误码：" + dat.status,
						});
					}
				} else {
					this.$notification.warning({
						message: "登陆失效",
						description: "由于网络错误 " + response.statusText + " 您的登陆信息已失效，您可能需要重新登录，错误码：" + response.status,
					});
				}
				console.log(response);
			} catch (error) {
				this.$notification.warning({
					message: "登陆失效",
					description: "由于网络错误 " + error + " 您的登陆信息已失效，您可能需要重新登录",
				});
				console.log(error);
			}
			this.$store.commit("User/updateUserInfo");
			return false;

		},
	},
	mounted() {
		window.onloaded = true;
		this.$router.afterEach((to) => {
			let path = to.path.split("/");
			let ret = "";
			switch (path[1]) {
				case "user":
					ret = "user";
					break;
				case "account":
					ret = "user";
					break;
				case "order":
					ret = "order";
					break;
				case "item":
					ret = "item";
					break;
			}
			this.$store.commit("Run/updateCurrentTab", ret);
		});
		this.$router.beforeEach(async (to, from, next) => {
			console.log(1, to, from);
			let path = to.path.split("/");
			let beat = await this.heartbeat();
			if (beat) {
				if (path[1] === "user") {
					next({path: "/account/info"});
				} else {
					next();
				}
			} else {
				if (path[1] === "account" || path[1] === "order") {
					next({path: "/user/login", query: {redirect: to.path}});
				} else {
					next();
				}
			}
		});
		this.$axios.$get("?_=info/getAll")
			.then(response => {
				if (response.status === 200) {
					let dat = response.data;
					if (dat.status === 0) {
						this.$store.commit("Run/updateGlobalInfo", dat["ret"]);
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
	watch: {
		"$store.state.User": {
			deep: true,
			handler(e) {
				if (e.cookie.length === 0) {
					localStorage.removeItem("mall_session");
				} else {
					localStorage.setItem("mall_session", JSON.stringify(this.$store.state.User));
				}
			},
		},
	},
};

</script>

<style scoped>
#app {
	height: 100%;
	color: #2c3e50;
	font-family: Avenir, Helvetica, Arial, sans-serif;
	text-align: center;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}

.container {
	height: calc(100% - 64px);
}
</style>
