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
        if (this.query !== "" && this.query !== undefined) {
            this.buscar();
        }
    },
    methods: {
        buscar: function () {
            this.loading = true;
            if (this.lastQuery !== this.query && this.times !== 0) {
                this.page = 1;
                this.results = 0;
                this.noticias = [];
            }
            this.buscadorService(this.query, this.page).then(function (response) {
                this.lastQuery = this.query;
                this.results = response.data.searchInformation.totalResults;
                if (this.results > 0) {
                    var auxResults = response.data.items.filter(function (a) {
                        var link = a.link.replace("https://www.crhoy.com/", "");
                        var patt = /^site\/dist\//gim;
                        if (patt.test(link) === false) {
                            return a;
                        } else {
                            return false;
                        }
                    });
                    this.noticias = this.noticias.concat(auxResults);
                }
                this.loading = false;
                this.times++;
            }, function (error) {
                this.loading = false;
                this.times++;
                this.page = 1;
                this.results = 0;
                this.noticias = [];
            });
        },
        viewMoreNews: function () {
            this.page++;
            this.buscar();
        },
        navToNews: function (url) {
            var pattTheme = /noticias\-sobre/gim;
            if (pattTheme.test(url) === true) { // ES UN TEMA
                this.$router.push({
                    name: "tema",
                    params: {
                        etiqueta_name: "",
                        etiqueta_slug: url.replace("https://www.crhoy.com/noticias-sobre/", "")
                    }
                });
            } else {
                var pattAuthor = /author/gim;
                if (pattAuthor.test(url) === true) { // ES UN AUTOR
                    this.$router.push({
                        name: "autor",
                        params: {
                            autor_name: "",
                            autor_slug: url.replace("https://www.crhoy.com/author/", "").replace("/", ""),
                            autor_id: "",
                            autor_email: ""
                        }
                    });
                } else { // ES UNA NOTICIA
                    this.$router.push({
                        name: "noticia",
                        params: {
                            noticia_id: null,
                            noticia_url: encodeURIComponent(url)
                        }
                    });
                }
            }
        }
    }
};