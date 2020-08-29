<template>
	<a-menu mode="inline" @click="handleClick" v-model="thisSelected" class="selector">
		<a-menu-item v-for="(val, index) in item" :key="index">
			{{ val.name }} - ￥{{ val.price / 100 }}
		</a-menu-item>
	</a-menu>
</template>

<script>
export default {
	name: "ItemList",
	methods: {
		handleClick(e) {
			this.$emit("hclick", e);
		},
	},
	model: {
		prop: "selected",
		event: "change",
	},
	props: ["item", "selected"],
	computed: {
		thisSelected: {
			get() {
				return this.selected;
			},
			set(e) {
				this.$emit("change", e);
			},
		},
	},
};
</script>

<style scoped>
.selector {
	padding: 40px 0;
	max-width: 300px;
	margin: auto;
	border: none;
}
</style>
