/* DOCUMENTACION
 * https://router.vuejs.org/
 * https://router.vuejs.org/guide/essentials/navigation.html
 * PROPS: https://github.com/vuejs/vue-touch/issues/16
*/

const _router = new VueRouter({
    routes: [{
        path: "/",
        name: "home",
        component: _homeComponent
    }, {
        path: "/ultimas",
        name: "ultimas",
        component: _ultimasComponent
    }, {
        path: "/masLeidas",
        name: "masLeidas",
        component: _masLeidasComponent
    }, {
        /*path: "/category/:cat_id/:cat_title/:cat_color",
        name: "category",
        component: _categoryComponent,
        props: true*/

        path: "/category/:cat_id",
        name: "category",
        component: _categoryComponent,
        props: true
    }, {
        path: "/especiales",
        name: "especiales",
        component: _especialesComponent
    }, {
        path: "/especial",
        name: "especial",
        component: _especialComponent,
        props: true
    }, {
        path: "/tema",
        name: "tema",
        component: _temaComponent,
        props: true
    }, {
        path: "/autor",
        name: "autor",
        component: _autorComponent,
        props: true
    }, {
        path: "/buscador",
        name: "buscador",
        component: _buscadorComponent
    }, {
        path: "/boletin",
        name: "boletin",
        component: _boletinComponent
    }, {
        path: "/noticia",
        name: "noticia",
        alias: "noticias",
        component: _noticiaComponent,
        props: true
    }, {
        path: "*",
        name: "indefinido",
        component: {
            template: "#indefinido"
        }
    }]
});