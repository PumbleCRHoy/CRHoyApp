const _temaComponent = {
    template: "#tema",
    mixins: [_etiquetaService], // DEPENDENCIAS DE SERVICIOS
    // props: ["etiqueta_name", "etiqueta_slug"], //ENVIAMOS COMO PROPIEDADES LOS DATOS DEL TEMA QUE QUEREMOS
    data: function () {
        return {
            loading: true,
            noticias: [],
            cant: 20,
            text: 50,
            current: 1,
            date: 1,
            metadata: 1,
            etiquetaNameUndefined: "initial"
        };
    },
    mounted: function () {
        if (this.$route.params.etiqueta_name === null || this.$route.params.etiqueta_name === "") {
            this.$route.params.etiqueta_name = this.$route.params.etiqueta_slug.replace("-", " ");
            this.etiquetaNameUndefined = "capitalize";
        }
        this.getNews();
    },
    methods: {
        getNews: function () {
            this.loading = true;
            this.etiquetaService(this.$route.params.etiqueta_slug, this.cant, this.text, this.current, this.date, this.metadata).then(function (response) {
                this.noticias = this.noticias.concat(response.data.noticiasEtiqueta);
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