/*
    API TESTER CONSTANT CONTACT: https://constantcontact.mashery.com/io-docs
    [{
        id: "1108689755",
        name: "Testing"
    }, {
        id: "1640444717",
        name: "Entretenimiento"
    }, {
        id: "1282373586",
        name: "Tecnologia"
    }, {
        id: "1008388450",
        name: "Nacionales"
    }, {
        id: "2",
        name: "Boletín Diario"
    }, {
        id: "1311578206",
        name: "Deportes"
    }, {
        id: "1862456939",
        name: "COi List"
    }, {
        id: "1119829984",
        name: "Ultimo Minuto"
    }]
*/
const _boletinComponent = {
    template: "#boletin",
    props: [],
    mixins: [_boletinService], // DEPENDENCIAS DE SERVICIOS
    data: function () {
        return {
            email: "",
            alreadySubscribe: false,
            switchers: [{
                id: 2,
                name: "Boletín Diario",
                check: true
            }, {
                id: 1119829984,
                name: "Ultimo Minuto",
                check: true
            }, {
                id: 1008388450,
                name: "Nacionales",
                check: false
            }, {
                id: 1311578206,
                name: "Deportes",
                check: false
            }, {
                id: 1640444717,
                name: "Entretenimiento",
                check: false
            }, {
                id: 1282373586,
                name: "Tecnologia",
                check: false
            }]
        };
    },
    mounted: function () {
        try {
            var switchers = JSON.parse(window.localStorage.getItem("boletin_switchers"));
            var email = JSON.parse(window.localStorage.getItem("boletin_email"));
            if (switchers !== null) {
                this.switchers = switchers;
            }
            if (email !== null && email !== "") {
                this.email = email;
            }
        } catch (ex) { }
    },
    computed: {
        subscribedList: function () {
            var list = this.switchers.filter(function (a) {
                if (a.check === true) {
                    return a.id;
                } else {
                    return false;
                }
            });
            return list.map(function (b) {
                return b.id;
            });
        }
    },
    methods: {
        subscribe: function () {
            if (this.email !== "" && this.email !== null) {
                var self = this;
                this.boletinService(this.subscribedList, this.email).then(function (response) {
                    console.log(response.data);
                    if (response.data.response[0] === "Error al suscribirse") {
                        self.$ons.notification.alert("Ocurrió un error al subscribirlo a los boletines", {
                            title: "CRHoy"
                        });
                    } else {
                        self.$ons.notification.alert("Ha sido subscrito exitosamente", {
                            title: "CRHoy",
                            callback: function () {
                                window.localStorage.setItem("boletin_switchers", JSON.stringify(self.switchers));
                                window.localStorage.setItem("boletin_email", self.email);
                            }
                        });
                    }
                }, function (error) {
                    self.$ons.notification.alert("Ocurrió un error al subscribirlo a los boletines", {
                        title: "CRHoy"
                    });
                });
            }
        }
    }
};