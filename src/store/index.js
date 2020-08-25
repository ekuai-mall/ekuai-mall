import Vue from "vue";
import Vuex from "vuex";
import User from "./modules/user.js";
import Run from "./modules/run.js";

Vue.use(Vuex);

export default new Vuex.Store({
	modules: {
		User,
		Run,
	},
});
