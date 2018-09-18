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
        }
        /*, {
			title: "Boletín",
			route: "/boletin"
		}*/],
        socialNetworks: _socialNetworks,
        categories: _categories,
        openSide: false,
        deviceReady: false
    },
    computed: {
        currentUrl: function () {
            return window.location;
        }
    },
    router: _router,
    created: function () {
        this.$router.replace("/");
    },
    methods: {
        navToCategory: function (category) {
            /*
            console.log(category);
            this.$router.push({
                path: "/category/" + category.cat_id + "/" + category.cat_title + "/" + category.cat_color,
                params: {
                    cat_subCategories: category.cat_subCategories
                }
            });
            this.openSide = false;
            */
            this.$router.push({
                name: "category",
                params: category
            });
            this.openSide = false;
        },
        navToSearch: function () {
            this.$router.push({
                name: "buscador"
            });
            this.openSide = false;
        }
    }
});

document.addEventListener("deviceready", function () {
    app_crhoy.deviceReady = true;
}, false);