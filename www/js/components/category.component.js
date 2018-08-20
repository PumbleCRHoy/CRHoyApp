const _categoryComponent = {
	template: "#category",
	mixins: [_categoryService], // DEPENDENCIAS DE SERVICIOS
	props: ["cat_title", "cat_id", "cat_color", "cat_subCategories"], //ENVIAMOS COMO PROPIEDADES LOS DATOS DE LA CATEGORIA QUE QUEREMOS
	data: function () {
		return {
			cant: 20,
			text: 50,
			date: 1,
			current: 1,
			portada: 0,
			author: 1,
			state: "initial",
			noticias: [],
			masLeidas: []
		};
	},
	mounted: function () {
		this.refreshNews();
	},
	watch: {
		'$route': function (to, from) {
			this.noticias = [];
			this.refreshNews();
		}
	},
	methods: {
		refreshNews: function (done) {
			this.categoryService(this.cat_id, this.cant, this.text, this.current, this.date, this.portada, this.author).then(function (response) {
				this.noticias = this.noticias.concat(response.data.noticiasCategoria);
				if (done !== null && done !== undefined) {
					done();
				}
			}, function (error) {
				this.errorLoadingPage = true;
			});
		},
		navToSubCategory: function (subCategory) {
			this.$router.push({
				name: "category",
				params: {
					cat_title: subCategory.title,
					cat_id: subCategory.id,
					cat_color: this.cat_color,
					cat_subCategories: this.cat_subCategories
				}
			});
		}
	}
};