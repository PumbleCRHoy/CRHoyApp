const _masLeidasComponent = {
	template: "#masLeidas",
	mixins: [_masLeidasService], // DEPENDENCIAS DE SERVICIOS
	data: function(){
		return {
			state: "initial",
			noticias: []
		};
	},
	mounted: function(){
        this.masLeidasService().then(function (response) {
            this.noticias = response.data.masLeidas;
        }, function (error) {
            this.errorLoadingPage = true;
        });
    },
	methods: {
		refreshNews: function(done){
			this.masLeidasService().then(function (response) {
				this.noticias = response.data.masLeidas;
				done();
			}, function (error) {
				this.errorLoadingPage = true;
			});
		}
	}
};