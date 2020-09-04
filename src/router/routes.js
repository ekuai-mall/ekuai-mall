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
	path: "/account",
	redirect: "/account/info",
	component: () => import( /* webpackChunkName: "user" */ "@/views/account/Account.vue"),
	children: [{
		path: "info",
		component: () => import( /* webpackChunkName: "user" */ "@/views/account/Info.vue"),
	}, {
		path: "password",
		component: () => import( /* webpackChunkName: "user" */ "@/views/account/ChangePass.vue"),
	}, {
		path: "wechat",
		component: () => import( /* webpackChunkName: "user" */ "@/views/account/BindWechat.vue"),
	}, {
		path: "logout",
		component: () => import( /* webpackChunkName: "user" */ "@/views/account/Logout.vue"),
	}],
}, {
	path: "/item",
	redirect: "/item/search",
	component: () => import( /* webpackChunkName: "util" */ "@/views/Utils/EmptyFrame.vue"),
	children: [{
		path: "search",
		component: () => import( /* webpackChunkName: "mall" */ "@/views/item/Search.vue"),
	}, {
		path: ":id",
		component: () => import( /* webpackChunkName: "mall" */ "@/views/item/Item.vue"),
	}],
}, {
	path: "/order",
	redirect: "/order/list",
	component: () => import( /* webpackChunkName: "util" */ "@/views/Utils/EmptyFrame.vue"),
	children: [{
		path: "list",
		component: () => import( /* webpackChunkName: "order" */ "@/views/order/List.vue"),
	}, {
		path: ":order",
		component: () => import( /* webpackChunkName: "order" */ "@/views/order/Order.vue"),
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
	path: "/redirect",
	component: () => import( /* webpackChunkName: "util" */ "@/views/Utils/Redirect.vue"),
}, {
	path: "*",
	component: () => import( /* webpackChunkName: "util" */ "@/views/error/404.vue"),
}];

export default routesRaw;
