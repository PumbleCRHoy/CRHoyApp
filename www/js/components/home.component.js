const _homeComponent = {
	template: "#home",
	mixins: [_homeService], // DEPENDENCIAS DE SERVICIOS
	data: function () {
		return {
			state: "initial",
			loading: true,
			noticias: {
				importante: null,
				transmision: {
					post_content: ""
				},

				slider: [],
				visualA: [],
				visualB: [],
				visualC: [],
				enterese: [],

				tituloTemporal: null,
				colorTituloTemporal: null,
				temporal: [],

				diva: null,
				frase_del_dia: null,
				humor: null,
				foto_del_dia: null,

				multimedia: [],

				deportes: [],
				entretenimiento: [],
				economia: [],
				mundo: [],
				opinion: [],
				tecnologia: []
			},
			carouselIndexSlider: 0,
			carouselIndexEnterese: 0,
			carouselIndexMultimedia: 0
		};
	},
	mounted: function () {
		this.loading = true;
		this.homeService().then(function (response) {
			this.noticias = response.data;
			this.loading = false;
		}, function (error) {
			this.errorLoadingPage = true;
			this.loading = false;
		});
	},
	methods: {
		refreshHome: function (done) {
			this.homeService().then(function (response) {
				this.noticias = response.data;
				done();
			}, function (error) {
				this.errorLoadingPage = true;
			});
		}
	}
};