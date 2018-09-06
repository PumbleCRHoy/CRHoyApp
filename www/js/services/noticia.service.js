var _noticiaService = {
    methods: {
        noticiaService: function (id) {
            // https://github.com/pagekit/vue-resource/blob/develop/docs/http.md
            return this.$http.get("https://www.crhoy.com/site/generators/no-cache/new_single_app.php", {
                responseType: "json",
                params: {
                    id: id
                }
            });
        }
    }
};