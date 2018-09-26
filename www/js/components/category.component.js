const _categoryComponent = {
    template: "#category",
    mixins: [_categoryService], // DEPENDENCIAS DE SERVICIOS
    props: ["cat_subCategories"], //ENVIAMOS COMO PROPIEDADES LOS DATOS DE LA CATEGORIA QUE QUEREMOS
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
        this.getNews();
    },
    watch: {
        "$route": function (to, from) {
            // BUSCAR LAS CATEGORIAS CUANDO NO HAY O NAVEGAMOS A LA SUBCATEGORIAS
            if (this.cat_subCategories === undefined) {
                var self = this;
                var fatherCategorys = _categories.filter(function (category) {
                    if (category.cat_id == self.$route.params.cat_id) {
                        return category;
                    }
                });
                if (fatherCategorys.length > 0) {
                    this.cat_subCategories = fatherCategorys[0].cat_subCategories;
                }
            }

            this.noticias = [];
            this.refreshNews();
        }
    },
    methods: {
        getNews: function (done) {
            this.loading = true;
            this.categoryService(this.$route.params.cat_id, this.cant, this.text, this.current, this.date, this.portada, this.author).then(function (response) {
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
        viewMoreNews: function () {
            this.current++;
            this.getNews();
        },
        refreshNews: function (done) {
            this.current = 1;
            this.noticias = [];
            this.getNews(done);
        },
        navToSubCategory: function (subCategory) {
            this.$router.push({
                path: "/category/" + subCategory.id + "/" + subCategory.title + "/" + this.$route.params.cat_color,
                params: {
                    cat_subCategories: this.cat_subCategories
                }
            });
        }
    }
};