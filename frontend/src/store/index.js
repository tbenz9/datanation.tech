import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		displayLanguage: localStorage.getItem('displayLanguage') || 'detect'
	},
	mutations: {
	},
	actions: {
	},
	modules: {
	}
});
