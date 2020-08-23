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
	data: () => ({}),
};
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
	background: #fff url(../../assets/background.jpg) no-repeat center;
	background-size: cover;
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
	background-color: rgba(255, 255, 255, 0.5);
	border-radius: 5px;
	box-shadow: 0 20px 60px rgba(102, 204, 255, 0.5), 0 0 150px rgba(102, 204, 255, 0.5);
}

.title {
	margin: 0;
	padding: 20px;
	color: rgba(0, 68, 127, 0.85);
	font-size: 36px;
}

.page {
	min-width: 300px;
	padding: 20px;
	background-color: rgba(255, 255, 255, 0.7);
	border-radius: 0 0 5px 5px;
}
</style>
