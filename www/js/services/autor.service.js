var _autorService = {
	methods: {
		autorService: function (cant, current, mail, author) {
			// https://github.com/pagekit/vue-resource/blob/develop/docs/http.md
			return this.$http.get("https://www.crhoy.com/site/generators/author.php", {
				responseType: "json",
				params: {
					cant : cant,
                    current: current,
                    mail: mail,
                    author: author 
				}
			});
		}
	}
};