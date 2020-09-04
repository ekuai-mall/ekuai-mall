<template>
	<h1 class="margin-10">系统处理中，请稍后</h1>
</template>

<script>
export default {
	name: "Redirect",
	methods: {
		redirect() {
			let query = this.$route.query;
			if (query.do === "setCookie") {
				let session = localStorage.getItem("mall_session");
				session = session ? session : "{}";
				this.$store.commit("User/updateUserInfo", JSON.parse(session));
			}
			this.$router.push(query.redirect ? query.redirect : "/");
		},
	},
	mounted() {
		setTimeout(this.redirect, 1000);

	},
};
</script>

