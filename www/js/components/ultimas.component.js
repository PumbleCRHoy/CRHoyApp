const _ultimasComponent = {
	template: "#ultimas",
	mixins: [_ultimasService], // DEPENDENCIAS DE SERVICIOS
	data: function(){
		return {
			state: "initial",
			noticias: []
		};
	},
	mounted: function(){
        this.ultimasService().then(function (response) {
            this.noticias = response.data.ultimas;
        }, function (error) {
            this.errorLoadingPage = true;
        });
    },
	methods: {
		refreshNews: function(done){
			this.ultimasService().then(function (response) {
				this.noticias = response.data.ultimas;
				done();
			}, function (error) {
				this.errorLoadingPage = true;
			});
		}
	}
};