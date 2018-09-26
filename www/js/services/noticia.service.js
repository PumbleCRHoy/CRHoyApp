var _noticiaService = {
    methods: {
        noticiaService: function (id, url) {
            // https://github.com/pagekit/vue-resource/blob/develop/docs/http.md
            // https://www.crhoy.com/site/generators/no-cache/new_single_app.php
            return this.$http.get("https://demo.crhoy.net/site/generators/no-cache/new_single_app.php", {
                responseType: "json",
                params: {
                    id: id,
                    url: url
                }
            });
        }
    }
};