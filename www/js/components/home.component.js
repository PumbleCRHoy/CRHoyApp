const _homeComponent = {
	template: "#home",
	mixins: [_homeService], // DEPENDENCIAS DE SERVICIOS
	data: function(){
		return {
			state: "initial",
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
			}
		};
	},
	mounted: function(){
        this.homeService().then(function (response) {
            this.noticias = response.data;
        }, function (error) {
            this.errorLoadingPage = true;
        });
    },
	methods: {
		refreshHome: function(done){
			this.homeService().then(function (response) {
				this.noticias = response.data;
				done();
			}, function (error) {
				this.errorLoadingPage = true;
			});
		},
		closeOthersAccordions: function(ev){
			console.log("aqui", ev);
		}
	}
};