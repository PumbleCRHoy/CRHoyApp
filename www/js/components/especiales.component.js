const _especialesComponent = {
	template: "#especiales",
	mixins: [_especialesService], // DEPENDENCIAS DE SERVICIOS
	data: function () {
		return {
			especiales: []
		};
	},
	mounted: function () {
		this.getSpecials();
	},
	methods: {
		getSpecials: function () {
			this.especialesService().then(function (response) {
				this.especiales = response.data.especiales;
			}, function (error) {
				this.errorLoadingPage = true;
			});
		},
		navToSpecial: function (especial) {
			this.$router.push({
				name: "especial",
				params: especial
			})
		}
	}
};