const _noticiaComponent = {
    template: "#noticia",
    mixins: [_noticiaService, _comentariosService], // DEPENDENCIAS DE SERVICIOS
    props: ["noticia_id"],
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
            }
        };
    },
    mounted: function () {
        this.noticiaService(this.noticia_id).then(function (response) {
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
            var self = this;
            /*
            self.nota.title,
            self.nota.img,
            self.nota.url
            */
            /*
            window.plugins.socialsharing.shareViaFacebook(
                self.nota.title,
                self.nota.img,
                self.nota.url
            );
            */
            alert("plugins");
            for (let i in window.plugins) {
                alert(i);
            }
            alert("window.plugins.socialsharing");
            for (let x in window.plugins.socialsharing) {
                alert(x);
            }
            window.plugins.socialsharing.shareViaTwitter(
                self.nota.title,
                self.nota.img,
                self.nota.url
            ).then(function (response) {
                alert(JSON.stringify(response));
            }, function (error) {
                alert(JSON.stringify(error));
            });
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