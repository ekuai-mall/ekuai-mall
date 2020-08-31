const User = {
	namespaced: true,
	state: () => ({
		cookie: "",
		id: -1,
		username: "",
		pass: "",
	}),
	mutations: {
		updateUserInfo(state, e = {}) {
			state.id = e.id ? e.id : -1;
			state.cookie = e.cookie ? e.cookie : "";
			state.username = e.user ? e.user : "";
			state.pass = e.pass ? e.pass : "";
		},
	},
};
export default User;
