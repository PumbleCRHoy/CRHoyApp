var _sambaService = {
	methods: {
		getVideosByTagService: function (tags, skip, videosPerPage, order) {
			var urlBase = "https://api.sambavideos.sambatech.com/v1";
			var accessToken = "dcfc51db-11ad-4093-9e92-7e2820d7cdb0";
			var pid = "6657";

			// https://github.com/pagekit/vue-resource/blob/develop/docs/http.md
			return this.$http.get(urlBase + "/medias", {
				responseType: "json",
				params: {
					access_token: accessToken,
					pid: pid,
					sort: typeof order !== "undefined" ? order : "DESC",
					orderby: "POSTDATE",
					types: "VIDEO",
					status: "ACTIVE",
					limit: videosPerPage,
					start: skip,
					tags: tags
				}
			});
		}
	}
};