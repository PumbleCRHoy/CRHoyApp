var _etiquetaService = {
	methods: {
		etiquetaService: function (tag, cant, text, current, date, metadata) {
			// https://github.com/pagekit/vue-resource/blob/develop/docs/http.md
			return this.$http.get("https://www.crhoy.com/site/generators/tag.php", {
				responseType: "json",
				params: {
					tag: tag,
					cant: cant,
					text: text,
					current: current,
					date: date,
					metadata: metadata
				}
			});
		}
	}
};