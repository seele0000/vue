import Vue from 'vue';
import Router from 'vue-router';
import home from '../pages/home/home.vue';
import list from '../pages/list/list.vue';
import detail from '../pages/detail/detail.vue';

Vue.use(Router);

export default new Router({
	routes: [{
		path: '/',
		name: 'home',
		component: home
	}, {
		path: '/list/:type',
		name: 'list',
		component: list
	}, {
		path: '/detail/:id',
		name: 'detail',
		component: detail
	}]
});
