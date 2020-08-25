import Vue from "vue";
import App from "./App.vue";
import Router from "./router";
import axios from "axios";
import qs from "qs";
import VueCookies from "vue-cookies";
import Store from "./store";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import "./assets/main.css";

axios.defaults.baseURL = "http://localhost/mall-api/index.php";
// axios.defaults.baseURL = "./api/";
axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
Vue.prototype["$axios"] = {
	$get: axios.get,
	'$post': (url, data) => {
		return axios.post(url, qs.stringify(data));
	},
	...axios,
};
Vue.use(VueCookies);
Vue.use(Antd);
Vue.config.productionTip = false;

new Vue({
	router: Router,
	store: Store,
	render: h => h(App),
}).$mount("#app");
