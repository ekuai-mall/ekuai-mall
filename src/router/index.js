import Vue from "vue";
import VueRouter from "vue-router";
import Routes from "./routes.js";

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location, onResolve, onReject) {
	if (onResolve || onReject) {
		return originalPush.call(this, location, onResolve, onReject);
	}
	return originalPush.call(this, location).catch(err => err);
};
Vue.use(VueRouter);
const router = new VueRouter({
	routes: Routes,
});

router.beforeEach((to, from, next) => {
	let path = to.path.split("/");
	if (window.onloaded === true || path[1] === "redirect") {
		next();
	} else if (localStorage.getItem("mall_session") === null) {
		if (path[1] === "account" || path[1] === "order") {
			next({path: "/user/login", query: {redirect: to.path}});
		} else {
			next();
		}
	} else {
		next({path: "/redirect", query: {redirect: to.path, do: "setCookie"}});
	}
	console.log(to, from, window.onloaded);
});
export default router;
