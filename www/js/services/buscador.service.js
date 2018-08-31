/*
	*  EJEMPLO: https://www.googleapis.com/customsearch/v1/siterestrict?q=facebook&cx=008507857938782676068%3Aemcsi_rf77a&filter=1&imgSize=large&imgType=news&lr=lang_es&safe=high&start=1&fields=items(link%2Csnippet%2Ctitle)&key=AIzaSyC3RqPO_MIU5kgVezjfREQZnYTDmWKzB5I
	* CLAVE API: https://console.developers.google.com/apis/credentials/key/8831877153150126316?organizationId=530508754806&project=crhoy-app-lite
	* BUSCARDOR PERSONALIZADO: https://cse.google.com/cse/setup/basic?cx=008507857938782676068:emcsi_rf77a
	https://cse.google.com/cse/setup/basic?cx=008507857938782676068:emcsi_rf77a
	https://developers.google.com/apis-explorer/#p/customsearch/v1/search.cse.siterestrict.list?q=avioneta&cx=008507857938782676068%253Aemcsi_rf77a&filter=1&lr=lang_es&num=10&start=1&fields=searchInformation(formattedSearchTime%252CtotalResults)&_h=2&
*/
var _buscadorService = {
	methods: {
		buscadorService: function (query, page) {
			// https://github.com/pagekit/vue-resource/blob/develop/docs/http.md
			return this.$http.get("https://www.googleapis.com/customsearch/v1/siterestrict", {
				responseType: "json",
				params: {
					q: encodeURIComponent(query),
					cx: "008507857938782676068:emcsi_rf77a",
					filter: 1,
					lr: "lang_es",
					safe: "high",
					start: page !== null && page !== undefined ? page : 1,
					fields: "items(link,snippet,title),searchInformation(totalResults)",
					key: "AIzaSyC3RqPO_MIU5kgVezjfREQZnYTDmWKzB5I"
				}
			});
		}
	}
};