import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import { translate, languageSupported } from '@/translation';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

Vue.component('icon', FontAwesomeIcon);

Vue.mixin({
	methods: {
		translate(id) {
			let language = store.state.displayLanguage;
			
			if (store.state.displayLanguage === 'detect') {
				language = (navigator.language || '').slice(0, 2);
				
				if (!languageSupported(language))
				language = 'en';
			}
			
			return translate.apply(this, [id, language].concat(Array.from(arguments).slice(1)));
		}
	}
});

Vue.config.productionTip = false;

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app');
