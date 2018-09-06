const _autorComponent = {
	template: "#autor",
	mixins: [_autorService], // DEPENDENCIAS DE SERVICIOS
	props: ["autor_name", "autor_slug", "autor_id", "autor_email"], //ENVIAMOS COMO PROPIEDADES LOS DATOS DEL AUTOR QUE BUSCAMOS
	data: function () {
		return {
			loading: true,
			noticias: [],
			cant: 20,
			current: 1,
		};
	},
	mounted: function () {
		this.getNews();
	},
	methods: {
		getNews: function () {
			this.loading = true;
			this.autorService(this.cant, this.current, this.autor_email, this.autor_slug).then(function (response) {
				this.noticias = this.noticias.concat(response.data);
				this.loading = false;
			}, function (error) {
				this.loading = false;
			});
		},
		viewMoreNews: function () {
			this.current++;
			this.getNews();
		}
	}
};