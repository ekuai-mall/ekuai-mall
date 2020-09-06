<template>
	<span :style="{color:clr}"><slot></slot></span>
</template>

<script>
export default {
	name: "Color",
	props: ["clr"],
};
</script>
