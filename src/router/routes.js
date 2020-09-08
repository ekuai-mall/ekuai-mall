const routesRaw = [{
	path: "/",
	component: () => import( /* webpackChunkName: "util" */ "@/views/Home.vue"),
}, {
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
		path: "search/:key?",
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
		path: ":order/plugin",
		component: () => import( /* webpackChunkName: "plugin" */ "@/views/plugin/Plugin.vue"),
		children: [{
			path: "upload",
			component: () => import( /* webpackChunkName: "plugin" */ "@/views/plugin/upload/Upload.vue"),
			children: [{
				path: "up",
				component: () => import( /* webpackChunkName: "plugin" */ "@/views/plugin/upload/UpSteps.vue"),
			},{
				path: "down",
				component: () => import( /* webpackChunkName: "plugin" */ "@/views/plugin/upload/Download.vue"),
			}],
		}],
	}, {
		path: ":order",
		component: () => import( /* webpackChunkName: "order" */ "@/views/order/Order.vue"),
	}],
}, {
	path: "/pay",
	redirect: "/",
	component: () => import( /* webpackChunkName: "util" */ "@/views/Utils/EmptyFrame.vue"),
	children: [{
		path: "wechat/:order/:code?",
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
