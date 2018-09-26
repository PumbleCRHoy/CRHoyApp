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
        path: "/category/:cat_id/:cat_title/:cat_color",
        name: "category",
        component: _categoryComponent,
        props: true
    }, {
        path: "/especiales",
        name: "especiales",
        component: _especialesComponent
    }, {
        path: "/especial/:especial_name/:especial_description/:especial_img/:especial_body/:especial_url",
        name: "especial",
        component: _especialComponent
    }, {
        path: "/tema/:etiqueta_name/:etiqueta_slug",
        name: "tema",
        component: _temaComponent
    }, {
        path: "/autor/:autor_name/:autor_slug/:autor_id/:autor_email",
        name: "autor",
        component: _autorComponent
    }, {
        path: "/buscador",
        name: "buscador",
        component: _buscadorComponent
    }, {
        path: "/boletin",
        name: "boletin",
        component: _boletinComponent
    }, {
        path: "/noticia/:noticia_id/:noticia_url",
        name: "noticia",
        alias: "noticias",
        component: _noticiaComponent
    }, {
        path: "*",
        name: "indefinido",
        component: {
            template: "#indefinido"
        }
    }]
});