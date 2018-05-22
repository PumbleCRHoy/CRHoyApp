const _homePage = {
	template: "#home",
	mixins: [_homeService], // DEPENDENCIAS DE SERVICIOS
	data: function(){
		return {
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