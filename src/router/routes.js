const routesRaw = [{
	path: "/user",
	redirect: "/user/login",
	component: () => import( /* webpackChunkName: "user" */ "@/views/user/User.vue"),
	children: [{
		path: "login",
		component: () => import( /* webpackChunkName: "user" */ "@/views/user/Login.vue"),
	}, {
		path: "register",
		component: () => import( /* webpackChunkName: "user" */ "@/views/user/Register.vue"),
	}],
}, {
	path: "/item",
	redirect: "/",
	component: () => import( /* webpackChunkName: "util" */ "@/views/Utils/EmptyFrame.vue"),
	children: [{
		path: ":id",
		component: () => import( /* webpackChunkName: "mall" */ "@/views/item/Item.vue"),
	}],
}, {
	path: "/pay",
	redirect: "/",
	component: () => import( /* webpackChunkName: "util" */ "@/views/Utils/EmptyFrame.vue"),
	children: [{
		path: "wechat/:order",
		component: () => import( /* webpackChunkName: "pay" */ "@/views/pay/Wechat.vue"),
	}],
}, {
	path: "*",
	component: () => import( /* webpackChunkName: "error" */ "@/views/error/404.vue"),
}];

export default routesRaw;
