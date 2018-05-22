var _homeService = {
    methods: {
        homeService: function () {
            // https://github.com/pagekit/vue-resource/blob/develop/docs/http.md
            var fecha = new Date();
            var version = fecha.getTime();  // fecha.getFullYear() + fecha.getMonth() + fecha.getDate();

            return this.$http.get("https://www.crhoy.com/site/dist/json/index2.json", {
                responseType: "json",
                params: {
                    v: version
                }
            });
        }
    }
};