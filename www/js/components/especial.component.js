const _especialComponent = {
    template: "#especial",
    mixins: [_etiquetaService, _sambaService], // DEPENDENCIAS DE SERVICIOS
    mounted: function () {
        // OBTENER LAS NOTICIAS POR ETIQUETA O VIDEOS POR ETIQUETA
        this.$route.params.especial_body.forEach(function (a) {
            if (a.type === "videotag") {
                this.getVideosByTagService(a.tag, 0, a.cant, "ASC").then(function (response) {
                    a.videos = response.data;
                }, function (error) {
                    this.errorLoadingPage = true;
                })
            }
            if (a.type === "newstag") {
                this.etiquetaService(a.tag, a.cant, 50, 1, 1).then(function (response) {
                    a.news = response.data.noticiasEtiqueta;
                }, function (error) {
                    this.errorLoadingPage = true;
                });
            }
        }, this);  // HAY QUE PASARLE EL CONTEXTO DE THIS
    },
    methods: {}
};