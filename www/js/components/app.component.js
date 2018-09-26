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
        _isIOS: function () {
            return this.$ons.platform.isIPhone() || this.$ons.platform.isIPhoneX() || this.$ons.platform.isIPad() || this.$ons.platform.isIOS7above() || this.$ons.platform.isIOSSafari() || this.$ons.platform.isSafari() || this.$ons.platform.isIOS();
        }
    },
    router: _router,
    created: function () {
        this.$router.replace("/");
    },
    methods: {
        navToCategory: function (category) {
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
        },
        back: function (ev) {
            // this.currentUrl.hash !== "#/"
            switch (this.$route.name) {
                case "home":
                    // https://onsen.io/v2/api/vue/$ons.notification.html#method-confirm
                    this.$ons.notification.confirm("¿Quiére salir del app?", {
                        buttonLabels: ["Cancelar", "Ok"],
                        title: "CRHoy"
                    }).then(function (response) {
                        if (response == 1) {
                            // https://stackoverflow.com/questions/12297525/exit-from-app-when-click-button-in-android-phonegap
                            navigator.app.exitApp();
                        }
                    });
                    break;
                case "indefinido":
                    this.$router.go(-2);
                    break;
                default:
                    window.history.back();
                    break;
            }
        }
    },
    mounted: function () {
        var self = this;
        this.$ons.ready(function () {
            self.deviceReady = true;
            // https://onsen.io/v2/api/vue/$ons.html#method-setDefaultDeviceBackButtonListener
            self.$ons.setDefaultDeviceBackButtonListener(self.back);
            /*
            https://cordova.apache.org/docs/en/latest/reference/cordova-plugin-device/index.html
            console.log(device.cordova);
            console.log(device.model);
            console.log(device.platform);
            console.log(device.uuid);
            console.log(device.version);
            console.log(device.manufacturer);
            console.log(device.isVirtual);
            console.log(device.serial);
            */
        });
    }
});