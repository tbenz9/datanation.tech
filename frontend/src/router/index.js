import Vue from 'vue';
import VueRouter from 'vue-router';
import Browse from '@/views/Browse.vue';

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		name: 'browse',
		component: Browse
	},
	{
		path: '/add-skylink',
		name: 'addSkylink',
		component: () => import('@/views/AddSkylink.vue')
	}
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
});

export default router;
