const _homePage = {
	template: "#home",
	props: ["toggleMenu"],
	mixins: [_homeService], // DEPENDENCIAS DE SERVICIOS
	components: {
		_customToolbar
	},
	data: function(){
		return {
			test: "HOLA",
			noticias: {
				slider: [],
				visualA: [],
				visualB: [],
				visualC: [],
				enterese: [],
				ultimas: [],
				masleidas: [],
				video: [],
				diva: {},
				humor: {},
				galeria: {},
				frase: {},
				nacionales: [],
				deportes: [],
				entretenimiento: [],
				opinion: [],
				mundo: [],
				economia: [],
				tecnologia: []
			}
		};
	},
	created: function(){
        this.homeService().then(function (response) {
            console.log(response);
            this.noticias = response.data;
        }, function (error) {
            this.errorLoadingPage = true;
            console.error(error);
        });
    }
};