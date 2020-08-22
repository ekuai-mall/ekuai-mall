<template>
<div class="outer">
	<div class="bg"></div>
	<div class="center">
		<div class="verticalCenter">
			<div class="container">
				<div>
					<h2 class="title">EKUAI MALL</h2>
				</div>
				<div class="page">
					<router-view></router-view>
				</div>
			</div>
		</div>
	</div>
	<div class="footer"></div>
</div>
</template>
<script>
export default {
	name: "User",
	data: () => ({

	})
}
</script>
<style scoped>
.outer {
	height: 100%;

}

.bg {
	position: fixed;
	z-index: -10000;
	width: 100%;
	height: 100%;
	background: #FFF url(../../assets/background.jpg) no-repeat;
	background-size: cover;
	background-position: center;
}

.center {
	display: table;
	height: 100%;
	margin: auto;
	text-align: center;
}

.verticalCenter {
	display: table-cell;
	vertical-align: middle;
}

.container {
	border-radius: 5px;
	background-color: rgba(255, 255, 255, 0.5);
	box-shadow: 0px 20px 60px rgba(102, 204, 255, 0.5), 0px 0px 150px rgba(102, 204, 255, 0.5);
}

.title {
	padding: 20px;
	margin: 0;
	color: rgba(0, 68, 127, .85);
	font-size: 36px;
}

.page {
	padding: 20px;
	background-color: rgba(255, 255, 255, 0.7);
	min-width: 300px;
	border-radius: 0 0 5px 5px;
}

>>>.margin {
	margin: 10px;
}
</style>
