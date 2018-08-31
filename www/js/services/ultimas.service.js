// EN ESTE CASO ES MEJOR MANEJARLO COMO COMPONENTE PARA SEPARLO Y NO TENERLO TODO CARGADO EN EL MIXIN
var _ultimasService = {
	methods: {
		ultimasService: function (fecha, cant) {
			// https://github.com/pagekit/vue-resource/blob/develop/docs/http.md
			var url = "https://api.crhoy.net/ultimas/{%param%}.json";
			if ((fecha !== null && fecha !== undefined) || (cant !== null && cant !== undefined)) {
				url = ("https://api.crhoy.net/ultimas/{%param%}.json").replace("{%param%}", fecha !== null && fecha !== undefined ? fecha : cant);
			} else {
				// EJEMPLO: https://api.crhoy.net/ultimas/2018-08-16.json?v=1
				var now = new Date();
				var date = now.getFullYear() + "-" + ((now.getMonth() + 1) < 10 ? "0" + (now.getMonth() + 1) : now.getMonth() + 1) + "-" + now.getDate();
				url = ("https://api.crhoy.net/ultimas/{%param%}.json").replace("{%param%}", date);
			}
			return this.$http.get(url, {
				responseType: "json",
				params: {
					v: 1
				}
			});
		}
	}
};