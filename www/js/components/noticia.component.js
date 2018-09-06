const _noticiaComponent = {
    template: "#noticia",
    mixins: [_noticiaService], // DEPENDENCIAS DE SERVICIOS
    props: ["noticia_id"],
    data: function () {
        return {
            state: "initial",
            nota: {
                id: 0,
                img: "",
                pretitle: "",
                title: "",
                subtitle1: "",
                subtitle2: "",
                guid: "",
                name: "",
                date: null,
                hour: null,
                author: {
                    autor_name: "",
                    autor_slug: "",
                    autor_id: "",
                    autor_email: ""
                },
                categories: [{
                    cat_color: "nacionales"
                }, {}],
                date: null,
                modified: null,
                content: "",
                tags: [],
                comments: []
            }
        };
    },
    mounted: function () {
        this.noticiaService(this.noticia_id).then(function (response) {
            this.nota = response.data;
            console.log(this.nota);
        }, function (error) {
            console.log(error);
        });
    },
    methods: {
        navToAuthor: function (author) {
            this.$router.push({
                name: "autor",
                params: author
            });
        },
        navToTag: function (tag) {
            this.$router.push({
                name: "tema",
                params: tag
            });
        }
    }
};