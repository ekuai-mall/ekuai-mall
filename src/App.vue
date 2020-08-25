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
	mounted() {
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
			}
			this.$store.commit("Run/updateCurrentTab", ret);
		});
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
