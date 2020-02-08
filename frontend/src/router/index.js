import Vue from 'vue';
import VueRouter from 'vue-router';
import Browse from '@/views/Browse.vue';

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		name: 'Browse',
		component: Browse
	}
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
});

export default router;
