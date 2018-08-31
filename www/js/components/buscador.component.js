const _buscadorComponent = {
	template: "#buscador",
	props: ["query"],
	mixins: [_buscadorService], // DEPENDENCIAS DE SERVICIOS
	data: function () {
		return {
			loading: false,
			noticias: [],
			page: 1,
			results: 0,
			lastQuery: "",
			times: 0
		};
	},
	mounted: function () {
		if(this.query !== "" && this.query !== undefined){
			this.buscar();
		}
	},
	methods: {
		buscar: function(){
			this.loading= true;
			if(this.lastQuery !== this.query && this.times !== 0){
				this.page = 1;
				this.results = 0;
				this.noticias = [];
			}
			this.buscadorService(this.query, this.page).then(function(response){
				this.lastQuery = this.query;
				this.results = response.data.searchInformation.totalResults;
				if(this.results > 0){
					this.noticias = this.noticias.concat(response.data.items);
				}
				this.loading= false;
				this.times ++;
			}, function(error){
				this.loading= false;
				this.times ++;
				this.page = 1;
				this.results = 0;
				this.noticias = [];
			});
		},
		viewMoreNews: function(){
			this.page ++;
			this.buscar();
		}
	}
};