/*
angular.module("crhoy").factory("masLeidasService", ["$resource",
    function ($resource) {
        return $resource("/site/dist/json/mas-leidas-:cant.json", {
        });
    }
]); 
*/

var _masLeidasService = {
    methods: {
        masLeidasService: function (cant) {
            // https://github.com/pagekit/vue-resource/blob/develop/docs/http.md
            return this.$http.get(("https://api.crhoy.net/mas-leidas-{%cant%}.json").replace("{%cant%}", cant !== null && cant !== undefined ?  cant : 20), {
                responseType: "json"
            });
        }
    }
};