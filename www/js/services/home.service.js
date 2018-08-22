// GENERAR LA PORTADA: https://www.crhoy.com/site/generators/no-cache/new_portada_app.php
var _homeService = {
    methods: {
        homeService: function () {
            // https://github.com/pagekit/vue-resource/blob/develop/docs/http.md
            var fecha = new Date();
            var version = fecha.getTime();  // fecha.getFullYear() + fecha.getMonth() + fecha.getDate();

            return this.$http.get("https://www.crhoy.com/site/dist/json/new_portada_app.json", {
                responseType: "json",
                params: {
                    v: version
                }
            });
        }
    }
};