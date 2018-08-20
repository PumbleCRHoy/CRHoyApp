var _categoryService = {
	methods: {
		categoryService: function (cat, cant, text, current, date, portada, author) {
			// https://github.com/pagekit/vue-resource/blob/develop/docs/http.md
			return this.$http.get("https://www.crhoy.com/site/generators/category.php", {
				responseType: "json",
				params: {
					cat: cat,
					cant: cant,
					text: text,
					current: current,
					date: date,
					portada: portada,
					author: author
				}
			});
		}
	}
};