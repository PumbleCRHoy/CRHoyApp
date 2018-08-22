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
			this.opened = !this.opened;
		}
	},
	template: "<div class='accordion'>" +
						"<div :class=' \"accordion-header fondo-\" + color' @click='toogle()'>" +
							"<h3><slot name='title'></slot></h3>" +
							"<button class='button--quiet' v-show='!opened' >" +
								"<v-ons-icon icon='chevron-down'></v-ons-icon>" +
							"</button>" +
							"<button class='button--quiet' v-show='opened'  >" +
								"<v-ons-icon icon='chevron-up'></v-ons-icon>" +
							"</button>" +
						"</div>" +
						"<div :class='\"accordion-body border-\" + color' v-show='opened'>" +
							"<slot name='content'></slot>" +
						"</div>" +
					"</div>"
});