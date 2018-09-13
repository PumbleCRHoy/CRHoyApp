/* DOCUMENTACION
 * https://vuejs.org/v2/guide/render-function.html#Functional-Components
 * https://vuejs.org/v2/api/#Vue-compile
 * https://stackoverflow.com/questions/47759306/how-to-dynamically-compile-a-component-added-to-a-template-in-vuejs
 * https://jsfiddle.net/47ejdvyy/188/
 * https://forum.vuejs.org/t/vue-compile-what-is-staticrenderfns-render-vs-staticrenderfns/3950/11
 * https://vuejs.org/v2/guide/components-dynamic-async.html
 * https://stackoverflow.com/questions/48766904/wait-until-parent-component-is-mounted-ready-before-rendering-child-in-vue-js
*/

/* SE NECESITA UN COMPONENTE PARA RENDERIZAR EL CONTENIDO DE LA NOTICIA OBTENIDO CON noticiaService
 * ESE CONTENIDO LO ENVIAMOS COMO PROPIEDAD AL COMPONENTE contentComponent PARA USARLO COMO TEMPLATE A RENDERIZAR
 * UTILIZAMOS EL EVENTO render DEL COMPONENTE PARA VALIDAR, SI NO TENEMOS CONTENIDO, AL MENOS TENDREMOS UN LOADING
 * COMO ES UN COMPONENTE PROPIO NECESITA SUS METODOS Y POR ESE CONTIENE LOS METODOS DE LOS SHORTCODES NECESARIOS COMO navtonews QUE UTILIZA EL leer-mas
 */
var contentComponent = {
    name: "contentComponent",
    functional: true,
    template: "#contentDynamic",
    props: ["content", "scripts"],
    render: function (h, context) {
        const content = context.props.content;
        const component = content ? {
            "template": content,
            data: function () {
                return {
                    scripts: context.props.scripts
                };
            },
            methods: {
                navleermas: function (url) {
                    /* QUE EL PADRE SE ENCARGUE DE TODO
                     * YA QUE ROUTING AL MISMO COMPONENTE NO FUNCIONA COMO LO ESPERADO
                    */
                    this.$parent.$parent.navLeerMas(url);
                },
                prevGalleryItem: function (galleryID) {
                    document.getElementById(galleryID).prev();
                },
                nextGalleryItem: function (galleryID) {
                    document.getElementById(galleryID).next();
                }
            },
            mounted: function () {
                this.scripts.forEach(function (s) {
                    var script = document.createElement("script");
                    script.src = s;
                    script.async = true;
                    script.charset = "utf-8";
                    script.defer = true;
                    document.getElementById("nota-contenido").appendChild(script);
                });

                // EMBED DE TWITTER
                /*
                if (this.$el.innerHTML.search("twitter-tweet") !== -1) {
                    var script = document.createElement("script");
                    script.src = "https://platform.twitter.com/widgets.js";
                    script.async = true;
                    script.charset = "utf-8";
                    document.getElementById("nota-contenido").appendChild(script);
                }
                */
            }
        } : {
                "template": "<ons-row><ons-col class='text-center' width='100%'><v-ons-icon size='2em' spin icon='fa-cog' class='color-negro'></v-ons-icon></ons-col></ons-row>"
            };
        return h(component);
    }
};

const _noticiaComponent = {
    name: "noticiaComponent",
    template: "#noticia",
    mixins: [_noticiaService, _comentariosService], // DEPENDENCIAS DE SERVICIOS
    props: ["noticia_id", "noticia_url"],
    components: {
        "content-component": contentComponent
    },
    data: function () {
        return {
            state: "initial",
            nota: {
                id: 0,
                img: "",
                permalink: "",
                pretitle: "",
                title: "",
                subtitle1: "",
                subtitle2: "",
                guid: "",
                name: "",
                date: null,
                hour: null,
                author: {
                    autor_name: "",
                    autor_slug: "",
                    autor_id: "",
                    autor_email: ""
                },
                categories: [{
                    cat_color: "nacionales"
                }, {}],
                date: null,
                modified: null,
                content: "",
                tags: [],
                comments: [],
                scripts: []
            },
            comentario: {
                nombre: "",
                correo: "",
                comentario: "",
                loading: false
            },
            renderContent: null,
            loading: true,
            shareItems: [{
                name: "Whatsapp",
                icon: "whatsapp",
                slug: "whatsapp"
            }, {
                name: "Facebook",
                icon: "fa-facebook-f",
                slug: "facebook"
            }, {
                name: "Twitter",
                icon: "fa-twitter",
                slug: "twitter"
            }, {
                name: "Google +",
                icon: "fa-google-plus",
                slug: "google+"
            }, {
                name: "Email",
                icon: "fa-envelope",
                slug: "email"
            }]
        };
    },
    mounted: function () {
        this.getNoticia();
    },
    methods: {
        navToAuthor: function (author) {
            this.$router.push({
                name: "autor",
                params: author
            });
        },
        navToTag: function (tag) {
            this.$router.push({
                name: "tema",
                params: tag
            });
        },
        saveComment: function () {
            var self = this;
            if (this.comentario.nombre !== "") {
                if (this.comentario.correo !== "") {
                    if (this.comentario.comentario !== "") {
                        this.comentario.loading = true;
                        this.comentariosService(this.nota.id, this.comentario.nombre, this.comentario.correo, this.comentario.comentario).then(function (response) {
                            self.comentario = {
                                nombre: "",
                                correo: "",
                                comentario: "",
                                loading: false
                            };
                            self.$ons.notification.alert("Su comentario ha sido enviado y esta pendiente de aprobación.", {
                                title: "CRHoy"
                            });
                        }, function (error) {
                            self.comentario.loading = false;
                            self.$ons.notification.alert("Ocurrió un error al enviar su comentario, por favor, intentelo de nuevo.", {
                                title: "CRHoy"
                            });
                        });
                    } else {
                        self.$ons.notification.alert("Debe agregar un comentario", {
                            title: "CRHoy",
                            callback: function () {
                                document.getElementById("comentario-nombre").focus();
                            }
                        });
                    }
                } else {
                    self.$ons.notification.alert("Debe agregar un correo", {
                        title: "CRHoy",
                        callback: function () {
                            document.getElementById("comentario-correo").focus();
                        }
                    });
                }
            } else {
                self.$ons.notification.alert("Debe agregar un nombre", {
                    title: "CRHoy",
                    callback: function () {
                        document.getElementById("comentario-nombre").focus();
                    }
                });
            }
        },
        navLeerMas: function (url) {
            this.noticia_id = null;
            this.noticia_url = url;
        },
        getNoticia: function () {
            this.loading = true;
            this.noticiaService(this.noticia_id, this.noticia_url).then(function (response) {
                if (response.data !== null) {
                    this.nota = response.data;
                } else {
                    // RETORNO VACIO, ES UN ERROR, ASI QUE NOS VAMOS A LA RUTA DE 404
                    this.$router.push({
                        name: "indefinido"
                    });
                }
                this.loading = false;
                // HACER SCROLL HASTA ARRIBA DE LA NOTA Y OCULTAR LA ACTUAL MIENTRAS
            }, function (error) {
                this.loading = false;
                this.$router.push({
                    name: "indefinido"
                });
            });
        },
        share: function (slug) {
            // https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin
            // https://www.npmjs.com/package/cordova-plugin-x-socialsharing
            switch (slug) {
                case "whatsapp":
                    popupWindowCenter('whatsapp://send?text=' + this.nota.title, 696, 335);
                    //popupWindowCenter("https://api.whatsapp.com/send?phone=89568209&text=" + "Mira esta noticia: " + encodeURIComponent(this.nota.title) + " " + encodeURIComponent(this.nota.permalink), 300, 300);
                    break;
                case "facebook":
                    popupWindowCenter("https://www.facebook.com/sharer.php?u=" + this.nota.permalink, 696, 335);
                    break;
                case "twitter":
                    popupWindowCenter("https://twitter.com/intent/tweet?url=" + this.nota.permalink + "&via=crhoycom&related=slidedeck&text=" + encodeURIComponent(this.nota.title), 696, 335);
                    break;
                case "google+":
                    popupWindowCenter("https://plus.google.com/share?url=" + this.nota.permalink, 696, 335);
                    break;
                case "email":
                    popupWindowCenter("mailto:?subject=" + this.nota.title + "&body=" + this.nota.permalink, 696, 335);
                    break;
                default:
                    break;
            }
            /*
            var options = {
                message: 'share this', // not supported on some apps (Facebook, Instagram)
                subject: 'the subject', // fi. for email
                files: ['', ''], // an array of filenames either locally or remotely
                url: 'https://www.website.com/foo/#bar?a=b',
                chooserTitle: 'Pick an app',// Android only, you can override the default share sheet title,
                appPackageName: 'com.crhoy.lite' // Android only, you can provide id of the App you want to share with
            };

            var onSuccess = function (result) {
                alert("success");
                console.log("Share completed? " + result.completed); // On Android apps mostly return false even while it's true
                console.log("Shared to app: " + result.app); // On Android result.app since plugin version 5.4.0 this is no longer empty. On iOS it's empty when sharing is cancelled (result.completed=false)
            };

            var onError = function (msg) {
                alert("error");
                console.log("Sharing failed with message: " + msg);
            };

            alert("aqui");
            alert(window.plugins);
            alert(window.plugins.socialsharing);
            window.plugins.socialsharing.shareWithOptions(options, onSuccess, onError);
            */
        }
    },
    watch: {
        noticia_id: function (value) {
            this.getNoticia();
        },
        noticia_url: function (value) {
            this.getNoticia();
            // https://www.crhoy.com/site/generators/no-cache/new_single_app.php?id=&url=https%253A%252F%252Fwww.crhoy.com%252Feconomia%252Fausencia-de-decisiones-carcomio-patrimonio-de-bancredito%252F
        }
    }
};

function popupWindowCenter(URL, title, w, h) {
    var left = (screen.width / 2) - (w / 2);
    var top = (screen.height / 2) - (h / 2);
    window.open(URL, title, 'toolbar=no, location=no,directories=no, status=no, menubar=no, scrollbars=no, resizable=no,copyhistory=no, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);
}