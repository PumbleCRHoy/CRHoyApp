var _comentariosService = {
    methods: {
        comentariosService: function (id, nombre, correo, comentario) {
            // https://github.com/pagekit/vue-resource/blob/develop/docs/http.md
            return Vue.http.get("https://www.crhoy.com//site/generators/comments.php", {
                responseType: "json",
                params: {
                    id: id,
                    nombre: nombre,
                    correo: correo,
                    comentario: comentario
                }
            });
        }
    }
};