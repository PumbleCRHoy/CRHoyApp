// [ANCHO, ALTO, PORCENTAJE MAXIMO EN PANTALLA, CALIDAD, PNG, COLOR]
Vue.filter("icdn", function (route, size) {
	var path = "";
	if (route) {
		path = route.replace("http://cdn.crhoy.net", "").replace("http://cdn.crhoy.com", "").replace("https://cdn.crhoy.net", "").replace("https://m.crhoy.net", "").replace("https://www.crhoy.com", "").replace("http://cleandb.crhoy.com", "");
	} else {
		path = "/site/dist/img/predeterminada-60x60.jpg";
	}
	var quality = size[3] || "75";
	var maxAncho = 1000;
	var domain = "pull.crhoy.net";
	var query = "";
	if (typeof (size) !== "undefined") {
		var ancho = size[0];
		var alto = size[1];
		var porcentage = size[2];
		var png = 0;
		var color = 1;
		maxAncho = window.innerWidth * (porcentage / 100);
		if (size[4]) {
			png = 1;
		}
		query += png;
		if (ancho && ancho > maxAncho) {
			if (alto) {
				alto = maxAncho * alto / ancho;
				alto = Math.round(alto / 10) * 10;
			}
			ancho = Math.round(maxAncho / 10) * 10;
		}
		if (size[5]) {
			color = 0;
		}
		query = "https://icdn2.crhoy.net/w/" + ancho + "/h/" + alto + "/q/" + quality + "/png/" + png + "/c/" + color + "/s/" + domain + path;
	}
	return query;
});