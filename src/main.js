import Vue from "vue";
import App from "./App.vue";
import Router from "./router";
import Store from "./store";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import "./assets/main.css";
import axios from "axios";
import VueAxios from "vue-axios";

Vue.use(Antd);
Vue.use(VueAxios, axios);

Vue.config.productionTip = false;

new Vue({
	router: Router,
	store: Store,
	render: h => h(App),
}).$mount("#app");
