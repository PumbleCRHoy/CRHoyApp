const _categoryComponent = {
	template: "#category",
	mixins: [_categoryService], // DEPENDENCIAS DE SERVICIOS
	props: ["cat_title", "cat_id", "cat_color", "cat_subCategories"], //ENVIAMOS COMO PROPIEDADES LOS DATOS DE LA CATEGORIA QUE QUEREMOS
	data: function () {
		return {
			loading: true,
			cant: 15,
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
        //console.log("this", this)
        //console.log("this.route", this.$route);


		this.getNews();
	},
	watch: {
		'$route': function (to, from) {
			this.noticias = [];
			this.refreshNews();
		}
	},
	methods: {
		getNews: function (done) {
			this.loading = true;
			this.categoryService(this.cat_id, this.cant, this.text, this.current, this.date, this.portada, this.author).then(function (response) {
				this.noticias = this.noticias.concat(response.data.noticiasCategoria);
				if (done !== null && done !== undefined) {
					done();
				}
				this.loading = false;
			}, function (error) {
				this.errorLoadingPage = true;
				this.loading = false;
			});
		},
		viewMoreNews: function(){
			this.current++;
			this.getNews();
		},
		refreshNews: function(done){
			this.current = 1;
			this.noticias = [];
			this.getNews(done);
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