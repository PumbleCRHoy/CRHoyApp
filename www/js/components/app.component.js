Vue.use(VueResource);	// HAY QUE DECIRLE A VUE QUE UTILICE ESTE PLUGIN PARA LOS REQUEST
Vue.use(VueRouter);		// HAY QUE DECIRLE A VUE QUE UTILICE ESTE PLUGIN PARA EL ROUTING 

var app_crhoy = new Vue({
      el: "#app",
      data: {
            currentPage: "home",
            openSide: false,
            pages: [{
                  title: "Inicio",
                  route: "/"
            }, {
                  title: "Últimas",
                  route: "/ultimas"
            }, {
                  title: "Más Leídas",
                  route: "/masLeidas"
            }, {
                  title: "Especiales",
                  route: "/especiales"
            }
        /*, {
			title: "Boletín",
			route: "/boletin"
		}*/],
            socialNetworks: _socialNetworks,
            categories: _categories,
            openSide: false,
            deviceReady: false
      },
      computed: {
            _isIOS: function () {
                  return this.$ons.platform.isIPhone() || this.$ons.platform.isIPhoneX() || this.$ons.platform.isIPad() || this.$ons.platform.isIOS7above() || this.$ons.platform.isIOSSafari() || this.$ons.platform.isSafari() || this.$ons.platform.isIOS();
            }
      },
      router: _router,
      created: function () {
            this.$router.replace("/");
      },
      methods: {
            navToCategory: function (category) {
                  this.$router.push({
                        name: "category",
                        params: category
                  });
                  this.openSide = false;
            },
            navToSearch: function () {
                  this.$router.push({
                        name: "buscador"
                  });
                  this.openSide = false;
            },
            back: function (ev) {
                  // this.currentUrl.hash !== "#/"
                  switch (this.$route.name) {
                        case "home":
                              // https://onsen.io/v2/api/vue/$ons.notification.html#method-confirm
                              this.$ons.notification.confirm("¿Quiére salir del app?", {
                                    buttonLabels: ["Cancelar", "Ok"],
                                    title: "CRHoy"
                              }).then(function (response) {
                                    if (response == 1) {
                                          // https://stackoverflow.com/questions/12297525/exit-from-app-when-click-button-in-android-phonegap
                                          navigator.app.exitApp();
                                    }
                              });
                              break;
                        case "indefinido":
                              this.$router.go(-2);
                              break;
                        default:
                              window.history.back();
                              break;
                  }
            }
      },
      mounted: function () {
            var self = this;
            this.$ons.ready(function () {
                  self.deviceReady = true;
                  /* DECIRLE A ONSEN QUE NOS DE EL CONTROL DEL EVENTO DEL BOTON DE BACK DE ANDROID
                   *  REFERENCIA: https://onsen.io/v2/api/vue/$ons.html#method-setDefaultDeviceBackButtonListener
                   */
                  self.$ons.setDefaultDeviceBackButtonListener(self.back);
                  /*
                  // CONFIGURAR EL PLUGIN DE FIREBASE
                  window.FirebasePlugin.setAnalyticsCollectionEnabled(true);
                  window.FirebasePlugin.getToken(function (token) {
                        // save this server-side and use it to push notifications to this device
                        window.localStorage.setItem("firebase_token", token);
                  }, function (error) {
                        console.error(error);
                  });
                  window.FirebasePlugin.onTokenRefresh(function (token) {
                        // save this server-side and use it to push notifications to this device
                        window.localStorage.setItem("firebase_token", token);
                  }, function (error) {
                        console.error(error);
                  });


                  console.log("permisos de IOS");
                  console.log(
                        window.FirebasePlugin.grantPermission()
                  );
                  */
                  // REVISAR SI TENEMOS PERMISO PARA ENVIAR NOTIFICACIONES
                  /*
                  window.FirebasePlugin.hasPermission(function (data) {
                        if (data.isEnabled) {
                              console.log("subscribiendo noticias: noticias_importantes");
                              window.FirebasePlugin.subscribe("noticias_importantes");

                              window.FirebasePlugin.onNotificationOpen(function (notification) {
                                    console.log("notificacion recibida");
						/* CUANDO EL APP NO ESTA ABIERTA, DEBEMOS CORROBORAR SI LA NOTIFICACION HA SIDO "tapeada", SINO,
						 * QUIERE DECIR QUE LA NOTIFICACION HA SIDO RECIBIDA CON EL APP ABIERTA
						 *//*
if (notification.tap === true) {
alert("abierto desde fuera");
/*     
JSON RECIBIDO
{
"google.delivered_priority": "high",
"google.sent_time": 1538516005744,
"google.ttl": 3600,
"google.original_priority": "high",
"img": "https://cdn.crhoy.net/imagenes/2017/05/tecnologia2.jpg",
"tap": true,
"url": "https://www.crhoy.com/tecnologia/resumen-de-conferencias-e3-2018-nintendo/",
"from": "/topics/nacionales",
"title": "Resumen de conferencias E3 2018: Nintendo",
"google.message_id": "0:1538516006099236%43c196c443c196c4",
"collapse_key": "com.crhoy.testpush"
}
*//*
                     } else {
                           alert("notificacion recibida");
                     }
                     // {"tap":false,"body":"este es mi mensaje 3","dato1":"soy un string","dato2":"soy una url","dato3":"soy la url de la imagen","title":"este es el titulo 3"}
               }, function (error) {
                     console.error(error);
               });
              }
              });
              /*
              https://cordova.apache.org/docs/en/latest/reference/cordova-plugin-device/index.html
              console.log(device.cordova);
              console.log(device.model);
              console.log(device.platform);
              console.log(device.uuid);
              console.log(device.version);
              console.log(device.manufacturer);
              console.log(device.isVirtual);
              console.log(device.serial);
              */
            });
      }
});

document.addEventListener("deviceready", function () {
      console.log("========================device ready========================");
      console.log("plugins?");

      if (window.FirebasePlugin) {
            console.log("firebase plugin: ok");
      } else {
            console.log("firebase plugin: fail");
      }
      if (window.plugins.socialsharing) {
            console.log("socialsharing plugin: ok");
      } else {
            console.log("socialsharing plugin: fail");
      }
}, false);