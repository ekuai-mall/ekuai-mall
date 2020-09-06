<template>
	<div>upload plugin:order:{{ order }}

	</div>
</template>

<script>
export default {
	name: "Upload",
	mounted() {
		console.log("mounted", this.$route.params.order);
	},
	watch: {
		order() {
			console.log('watch', this.order);
			this.$router.go(0);
		},
	},
	computed: {
		order() {
			return this.$route.params.order;
		},
	},
};
</script>

<style scoped>

</style>
