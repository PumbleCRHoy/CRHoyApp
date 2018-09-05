const _ultimasComponent = {
	template: "#ultimas",
	mixins: [_ultimasService], // DEPENDENCIAS DE SERVICIOS
	components: {
		vuejsDatepicker // https://github.com/charliekassel/vuejs-datepicker
	},
	data: function () {
		return {
			state: "initial",
			noticias: [],
			loading: true,
			datePickerConfig: {
				model: new Date(),
				format: "dd/MM/yyyy",
				langConfig: _es,
				disabledDates: {
					from: new Date(),
					to: new Date(2012, 0, 1)
				},
				highlighted: {
					dates: [new Date()]
				}
			},
			keyPointElements: null,
			io: null
		};
	},
	mounted: function () {
		this.getNews();
	},
	methods: {
		getNews: function (callback, date, cant) {
			this.loading = true;
			this.ultimasService(date, cant).then(function (response) {
				response.data.ultimas.forEach(function (a) {
					a.render = false;
				});
				response.data.ultimas[0].render = true;
				this.noticias = response.data.ultimas;
				if (callback !== null && callback !== undefined) {
					callback();
				}
				this.loading = false;
			}, function (error) {
				this.loading = false;
			});
		},
		selectedDate: function (date) {
			// SI HAY ELEMENTOS OBSERVADOS, DES-OBSERVARLOS PARA EVITAR MULTIPLES PROCESOS CORRIENDO
			if (this.io !== null && this.keyPointElements !== null) {
				if (this.keyPointElements.length > 0) {
					for (var i = 0; i < this.keyPointElements.length; i++) {
						this.io.unobserve(this.keyPointElements[i]);
					}
					this.keyPointElements = null;
				}
			}

			var dateString = date.getFullYear() + "-" + ((date.getMonth() + 1) < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1) + "-" + (date.getDate() < 10 ? ("0" + date.getDate()) : date.getDate());
			this.noticias = [];
			this.getNews(null, dateString);
		}
	},
	updated: function () {
		if ('IntersectionObserver' in window) {
			// AHORA QUE EL DOM ESTA ACTUALIZADO,
			// CREAR EL IntersectionObserver SI NO ESTABA CREADO
			if (this.io === null || this.keyPointElements === null) {
				var self = this;
				this.io = new IntersectionObserver(function (entries) {
					entries.forEach(function (a) {
						if (a.intersectionRatio === true || a.intersectionRatio >= 1) { // ESTA INTERSECTANDO
							//self.noticias[a.target.dataset.index].render = true;
							var index = parseInt(a.target.dataset.keypoint);
							var limit = index + 10;
							for (index; index < limit && index < self.noticias.length; index++) {
								self.noticias[index].render = true;
							}
							self.io.unobserve(a.target);
						}
					})
				}, {
						threshold: [1]
					});
			}

			// OBSERVAR LOS ELEMENTOS NUEVOS O ACTUALIZADOS
			if (this.keyPointElements === null) {
				var elements = document.getElementsByClassName("noticia-ultimas");
				for (var i = 0; i < elements.length; i++) {
					if (elements[i].dataset.index % 10 === 0) {
						elements[i].dataset.keypoint = i;
					}
				}
				if (elements.length > 0) {
					this.keyPointElements = document.querySelectorAll("[data-keypoint]");
					for (var i = 0; i < this.keyPointElements.length; i++) {
						this.io.observe(this.keyPointElements[i]);
					}
				}
			}
		}
	},
	beforeRouteLeave(to, from, next) {
		// Disable entire IntersectionObserver
		this.io.disconnect();
		next();
	}
};