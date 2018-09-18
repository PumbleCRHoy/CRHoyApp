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
                console.log("MOUNTED!!!");
                /*
                    0: "https://connect.facebook.net/es_US/sdk.js#xfbml=1&version=v2.5&appId=623501091049135"
                    1: "https://www.instagram.com/embed.js"
                    2: "https://platform.twitter.com/widgets.js"
                    3: "https://assets.pinterest.com/js/pinit.js"
                */
                var d = new Date();
                this.scripts.forEach(function (s) {
                    var url = url = new URL(s);
                    url.searchParams.append("v_crhoy", d.getTime());

                    var script = document.createElement("script");
                    script.src = s.search("connect.facebook.net") !== -1 ? s + "&v_crhoy = " + d.getTime() : url.href;
                    script.type = "text/javascript";
                    //script.async = true;
                    script.charset = "utf-8";
                    //script.defer = true;
                    document.getElementById("nota-contenido").appendChild(script);
                });
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
            }, /*{
                name: "Google +",
                icon: "fa-google-plus",
                slug: "google+"
            }, */{
                name: "Instagram",
                icon: "fa-instagram",
                slug: "instagram"
            }, {
                name: "Email",
                icon: "fa-envelope",
                slug: "email"
            }, {
                name: "SMS",
                icon: "fa-comments",
                slug: "sms"
            }, {
                name: "Otros",
                icon: "fa-share-square",
                slug: "all"
            }]
        };
    },
    mounted: function () {
        this.getNoticia();
    },
    methods: {
        resetData: function () {
            this.nota = {
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
                modified: null,
                content: "",
                tags: [],
                comments: [],
                scripts: []
            };
            this.comentario = {
                nombre: "",
                correo: "",
                comentario: "",
                loading: false
            };
        },
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
            this.resetData();
            document.getElementById("contenido-noticia").scrollTop = 0;
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
            switch (slug) {
                case "whatsapp":
                    //popupWindowCenter('whatsapp://send?text=' + this.nota.title, 696, 335);
                    //popupWindowCenter("https://api.whatsapp.com/send?phone=89568209&text=" + "Mira esta noticia: " + encodeURIComponent(this.nota.title) + " " + encodeURIComponent(this.nota.permalink), 300, 300);
                    // https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin#whatsapp
                    window.plugins.socialsharing.shareViaWhatsApp(this.nota.title, this.nota.img, this.nota.permalink, function () {
                    }, function (errormsg) {
                        self.$ons.notification.alert("Ocurrió un error al compartir la noticia en Whatsapp", {
                            title: "CRHoy"
                        });
                    });
                    break;
                case "facebook":
                    // https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin#facebook
                    window.plugins.socialsharing.shareViaFacebook(this.nota.title, null, this.nota.permalink, function () {
                    }, function (errormsg) {
                        popupWindowCenter("https://www.facebook.com/sharer.php?u=" + this.nota.permalink, 696, 335);
                    });
                    break;
                case "twitter":
                    // https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin#twitter
                    //  unlike most apps Twitter doesn't like it when you use an array to pass multiple files as the second param
                    window.plugins.socialsharing.shareViaTwitter(this.nota.title + " " + this.nota.permalink + " @crhoycom ‏");
                    // window.plugins.socialsharing.shareViaTwitter('Message and link via Twitter', null /* img */, 'http://www.x-services.nl');
                    // popupWindowCenter("https://twitter.com/intent/tweet?url=" + this.nota.permalink + "&via=crhoycom&related=slidedeck&text=" + encodeURIComponent(this.nota.title), 696, 335);
                    break;
                case "google+":
                    popupWindowCenter("https://plus.google.com/share?url=" + this.nota.permalink, 696, 335);
                    break;
                case "email":
                    // https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin#email
                    ///
                    window.plugins.socialsharing.shareViaEmail(
                        this.nota.title, "Mira esta noticia", [], [], null, null, function () { }, function () {
                            popupWindowCenter("mailto:?subject=" + this.nota.title + "&body=" + this.nota.permalink, 696, 335);
                        });
                    break;
                case "instagram":
                    // https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin#instagram
                    window.plugins.socialsharing.shareViaInstagram(this.nota.title, this.nota.img, function () {
                    }, function (errormsg) {
                        self.$ons.notification.alert("Ocurrió un error al compartir la noticia en Instagram", {
                            title: "CRHoy"
                        });
                    });
                    break;
                case "sms":
                    // Want to share a prefilled SMS text?
                    window.plugins.socialsharing.shareViaSMS(this.nota.title + " " + this.nota.permalink, null /* see the note below */, function (msg) {
                    }, function (msg) {
                        self.$ons.notification.alert("Ocurrió un error al compartir la noticia por SMS", {
                            title: "CRHoy"
                        });
                    });
                    break;
                default:
                    // https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin#you-can-still-use-the-older-share-method-as-well
                    window.plugins.socialsharing.share(this.nota.title, "Mira esta noticia", this.nota.img, this.nota.permalink);
                    break;
            }
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