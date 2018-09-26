/*https://stackoverflow.com/questions/44261101/vue-broadcast-event-to-multiple-components*/
Vue.component("accordion", {
	props: ["color", "class"],
	data: function () {
		return {
			opened: false
		};
	},
    computed: {
        colorAccordion: function(){
            return this.color === null || this.color === undefined ? "negro" : this.color;
        },
        classAccordion: function(){
            return this.class === null || this.class === undefined ? "accordion" : "accordion " + this.class;
        }
    },
	methods: {
		toogle: function () {
			this.opened = !this.opened;
		}
	},
	template: "<div :class='classAccordion'>" +
						"<div :class=' \"accordion-header fondo-\" + colorAccordion' @click='toogle()'>" +
							"<h3><slot name='title'></slot></h3>" +
							"<button class='button--quiet' v-show='!opened' >" +
								"<v-ons-icon icon='chevron-down'></v-ons-icon>" +
							"</button>" +
							"<button class='button--quiet' v-show='opened'  >" +
								"<v-ons-icon icon='chevron-up'></v-ons-icon>" +
							"</button>" +
						"</div>" +
						"<div :class='\"accordion-body border-\" + colorAccordion' v-show='opened'>" +
							"<slot name='content'></slot>" +
						"</div>" +
					"</div>"
});