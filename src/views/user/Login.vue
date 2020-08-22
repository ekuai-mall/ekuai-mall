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
		<a-button type="primary" @click="login" :disable="password.length!=0 && user.length!=0">
			登陆
		</a-button>
	</div>
	没有账户？<router-link to="register">注册</router-link>

</div>
</template>
<script>
export default {
	name: "Login",
	data: () => ({
		user: '',
		password: ''
	}),
	methods: {
		login() {

		}
	},
}
</script>
<style scoped>

</style>
