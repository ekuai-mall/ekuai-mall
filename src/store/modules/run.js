const Run = {
	namespaced: true,
	state: () => ({
		currentTab: [],
		wxAppId: "",
		mallTitle: "",
	}),
	mutations: {
		updateCurrentTab(state, e) {
			state.currentTab = [e];
		},
		updateGlobalInfo(state, e) {
			for (let val of e) {
				if (state[val.key] !== undefined) {
					state[val.key] = val.value;
				}
			}
		},
	},
};
export default Run;
