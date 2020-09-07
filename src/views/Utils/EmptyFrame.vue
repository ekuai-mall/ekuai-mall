<template>
	<router-view v-if="show"></router-view>
</template>

<script>
export default {
	name: "EmptyFrame",
	data: () => ({
		show: true,
	}),
	methods: {
		reloadView() {
			this.show = false;
			this.$nextTick(() => {
				this.show = true;
			});
		},
	},
};
</script>

