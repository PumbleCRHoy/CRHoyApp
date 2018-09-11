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
    props: ["content"],
    render: function (h, context) {
        const content = context.props.content;
        const component = content ? {
            "template": content,
            methods: {
                navleermas: function (url) {
                    console.log("AQUI DEBEMOS NAVEGAR", decodeURIComponent(url));
                }
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
                comments: []
            },
            comentario: {
                nombre: "",
                correo: "",
                comentario: "",
                loading: false
            },
            renderContent: null
        };
    },
    mounted: function () {
        console.log(this.noticia_id, this.noticia_url);
        this.noticiaService(this.noticia_id, this.noticia_url).then(function (response) {
            this.nota = response.data;
            console.log(this.nota);
        }, function (error) {
            console.log(error);
        });
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
        share: function () {
            // https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin
            // https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin
            // https://docs.monaca.io/en/tutorials/social_sharing/
            var self = this;
            /*
            self.nota.title,
            self.nota.img,
            self.nota.url

            window.plugins.socialsharing.shareViaFacebook(
                self.nota.title,
                self.nota.img,
                self.nota.url
            );
            */
            window.plugins.socialsharing.shareViaTwitter(
                "aqui va el titulo",
                self.nota.img,
                self.nota.url
            );

            /*
            window.plugins.socialsharing.shareViaInstagram(
                self.nota.title,
                self.nota.img
            );
            */
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
        }
    }
};