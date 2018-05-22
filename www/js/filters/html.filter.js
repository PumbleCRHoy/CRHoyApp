Vue.filter("html", function (text) {
	if (typeof text !== "undefined") {
		return text.replace(/&#8220;/g, '"').replace(/&#8221;/g, '"')
			.replace(/&#8217;/g, "'").replace(/&#8216;/g, '"')
			.replace(/&#8221;/g, '"').replace(/&#8220;/g, '"')
			.replace("[&hellip;]", "").replace(/&#8211;/g, "–")
			.replace(/&#8243;/g, '"').replace(/&#8230;/g, "...")
			.replace(/&#8230;/g, "...").replace(/&#038;/g, "&")
			.replace(/&#8212;/g, "–").replace(/&#215;/g, "x");
		}
	else{
		return "";
	}
});