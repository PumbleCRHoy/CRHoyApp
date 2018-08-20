Vue.use(VueResource);	// HAY QUE DECIRLE A VUE QUE UTILICE ESTE PLUGIN PARA LOS REQUEST
Vue.use(VueRouter);		// HAY QUE DECIRLE A VUE QUE UTILICE ESTE PLUGIN PARA EL ROUTING 

var app_crhoy = new Vue({
	el: "#app",
	data: {
		currentPage: "home",
		openSide: false,
		pages: [{
			title: "Inicio",
			template: "home",
			route: "/"
		}, {
			title: "Últimas",
			template: "ultimas",
			route: "/ultimas"
		}, {
			title: "Más Leídas",
			template: "masLeidas",
			route: "/masLeidas"
		}],
		socialNetworks: _socialNetworks,
		categories: _categories,
		openSide: false
	},
	computed: {
		router: function () {
			return this.$router;
		}
	},
	router: _router,
	created: function () {
		this.router.replace("/");
	},
	methods: {
		navToCategory: function (category) {
			this.router.push({
				name: "category",
				params: category
			});
			this.openSide = false;
		}
	}
});