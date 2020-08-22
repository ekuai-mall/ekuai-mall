<template>
<div>
	<div class="margin">
		<a-input placeholder="用户名" v-model="user">
			<a-icon slot="addonBefore" type="user" />
		</a-input>
	</div>
	<div class="margin">
		<a-input-password placeholder="密码" v-model="password">
			<a-icon slot="addonBefore" type="key" />
		</a-input-password>
	</div>
	<div class="margin">
		<a-input-password placeholder="再次输入密码" v-model="password1">
			<a-icon slot="addonBefore" type="key" />
		</a-input-password>
	</div>
	<div class="margin">
		<a-button type="primary" @click="register" :disable="password1.length!=0 && password.length!=0 && user.length!=0">
			注册
		</a-button>
	</div>
	已有账户？<router-link to="login">登陆</router-link>
</div>
</template>
<script>
export default {
	name: "Register",
	data: () => ({
		user: '',
		password: '',
		password1: '',
	}),
	methods: {
		register() {

		}
	}
}
</script>
<style lang="scss" scoped>
</style>
