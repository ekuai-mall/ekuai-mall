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
			this.$parent.reloadView();
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
