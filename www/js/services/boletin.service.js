var _boletinService = {
    methods: {
        boletinService: function (lista, email) {
            // https://github.com/pagekit/vue-resource/blob/develop/docs/http.md
            return Vue.http.post("https://www.crhoy.com/site/generators/no-cache/boletin.php", {
                lista: lista,
                email: email
            }, {
                    method: "POST",
                    emulateHTTP: true,
                    emulateJSON: true
                });
        }
    }
};