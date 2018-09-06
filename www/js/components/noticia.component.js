const _noticiaComponent = {
    template: "#noticia",
    mixins: [_noticiaService], // DEPENDENCIAS DE SERVICIOS
    props: ["noticia_id"],
    data: function () {
        return {
            state: "initial",
            nota: {
                author: [],
                category: [],
                comment_count: 0,
                guid: "",
                id: 0,
                content: "",
                date: null,
                modified: null,
                name: "",
                title: "",
                tags: []
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
    }
};