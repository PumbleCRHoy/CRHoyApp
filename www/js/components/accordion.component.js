/*https://stackoverflow.com/questions/44261101/vue-broadcast-event-to-multiple-components*/
Vue.component("accordion", {
	props: ["color"],
	data: function () {
		return {
			opened: false
		};
	},
	methods: {
		toogle: function () {
			this.$emit("test", "hollis");
			this.opened = !this.opened;
		},
		closeOthersAccordions: function(ev){
			console.log("aqui es el bueno", ev);
		}
	},
	template: "<div class='accordion'  @test='closeOthersAccordions($event)'>" +
						"<div :class=' \"accordion-header fondo-\" + color'>" +
							"<h3><slot name='title'></slot></h3>" +
							"<button class='button--quiet' v-show='!opened' @click='toogle()'>" +
								"<v-ons-icon icon='chevron-down'></v-ons-icon>" +
							"</button>" +
							"<button class='button--quiet' v-show='opened'  @click='toogle()'>" +
								"<v-ons-icon icon='chevron-up'></v-ons-icon>" +
							"</button>" +
						"</div>" +
						"<div :class='\"accordion-body border-\" + color' v-show='opened'>" +
							"<slot name='content'></slot>" +
						"</div>" +
					"</div>"
});