// BOTON DE ATRAS PARA IOS
Vue.component("v-ios-back-button", {
    template: "<ons-row class='fondo-gris sombra-gris' v-if='$root._isIOS'>"
                        + "<ons-col width='100'>"
                            + "<ons-button modifier='quiet' class='color-negro' @click='$root.back()'>"
						        + "<ons-icon icon='fa-chevron-left'></ons-icon> Atras"
					        + "</ons-button>"
				        + "</ons-col>"
			        + "</ons-row>"
});