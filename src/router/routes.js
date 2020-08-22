const routesRaw = [{
    path: '/user',
    redirect: '/user/login',
    default: 'login',
    component: () =>
        import( /* webpackChunkName: "user" */ '@/views/user/User.vue'),
    children: [{
        path: 'login',
        component: () =>
            import( /* webpackChunkName: "user" */ '@/views/user/Login.vue'),
    },
    {
        path: 'register',
        component: () =>
            import( /* webpackChunkName: "user" */ '@/views/user/Register.vue'),
    }]
}, {
    path: '*',
    component: () =>
        import( /* webpackChunkName: "error" */ '@/views/error/404.vue')
}];

export default routesRaw;
