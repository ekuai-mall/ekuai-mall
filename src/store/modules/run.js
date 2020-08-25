const Run = {
	namespaced: true,
	state: () => ({
		currentTab: [],
	}),
	mutations: {
		updateCurrentTab(state, e) {
			state.currentTab = [e];
		},
	},
};
export default Run;