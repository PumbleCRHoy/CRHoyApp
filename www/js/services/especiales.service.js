// types: img, embed, videotag, newstag, text, videosid

var _especialesService = {
	methods: {
		especialesService: function () {
			// https://github.com/pagekit/vue-resource/blob/develop/docs/http.md

			return this.$http.get("https://www.crhoy.com/site/dist/json/especiales.app.json", {
				responseType: "json"
			});
		}
	}
};