/* DOCUMENTACION
 * https://router.vuejs.org/
 * https://router.vuejs.org/guide/essentials/navigation.html
 * PROPS: https://github.com/vuejs/vue-touch/issues/16
*/

const _router = new VueRouter({
	routes:[{
		path:"/",
		name:"home",
		component: _homeComponent
	}, {
		path:"/ultimas",
		name:"ultimas",
		component: _ultimasComponent
	}, {
		path:"/masLeidas",
		name:"masLeidas",
		component: _masLeidasComponent
	}, {
		path:"/category/:cat_id",
		name:"category",
		component: _categoryComponent,
		props: true
	}, {
		path:"*",
		name:"404",
		component: {
			template: "<h5>Página no encontrada</h5>"
		}
	}],
	scrollBehavior: function(to, from, savedPosition) {
		if (savedPosition) {
			return savedPosition;
		} else {
			return { x: 0, y: 0 };
		}
	}
});

/*
, {
		path:"/category/:catId/:subCategoryId",
		name:"subCategory",
		component: {
			template: "<div><h4>category id: {{ $route.params.catId }}</h4><h5>sub category: {{ $route.params.subCategoryId }}</h5></div>"
		}
	}
*/