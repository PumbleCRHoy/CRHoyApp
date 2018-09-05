Vue.use(VueResource);	// HAY QUE DECIRLE A VUE QUE UTILICE ESTE PLUGIN PARA LOS REQUEST
Vue.use(VueRouter);		// HAY QUE DECIRLE A VUE QUE UTILICE ESTE PLUGIN PARA EL ROUTING 

var app_crhoy = new Vue({
	el: "#app",
	data: {
		currentPage: "home",
		openSide: false,
		pages: [{
			title: "Inicio",
			route: "/"
		}, {
			title: "Últimas",
			route: "/ultimas"
		}, {
			title: "Más Leídas",
			route: "/masLeidas"
		}, {
			title: "Especiales",
			route: "/especiales"
        }/*, {
			title: "Boletín",
			route: "/boletin"
		}*/],
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
		},
		test: function () {
			this.router.push({
				name: "tema",
				params: {
					etiqueta_name: "Donald Trump",
					etiqueta_slug: "donald-trump"
				}
			});
			this.openSide = false;
		},
		test2: function () {
			this.router.push({
				name: "buscador"
			});
			this.openSide = false;
		}
	}
});