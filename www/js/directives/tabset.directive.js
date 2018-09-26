Vue.component("v-tabset", {
    props: ["tabs", "id"],
    data: function () {
        return {
            itemIndex: 0,
            items: null
        };
    },
    mounted: function () {
        this.items = this.$el.getElementsByClassName("tabset-item");
        for (var i = 0; i < this.items.length; i++) {
            if (i !== this.itemIndex) {
                this.items.item(i).style.display = "none";
            }
        }
    },
    methods: {
        selectThisTab: function (index) {
            this.itemIndex = index;
            this.items.item(index).style.display = "block";
            for (var i = 0; i < this.items.length; i++) {
                if (i !== this.itemIndex) {
                    this.items.item(i).style.display = "none";
                }
            }
        }
    },
    template: "<div class='tabset' :id='id'>"
                    + "<v-ons-segment>"
                        + "<button v-for='(tab, index) in tabs' @click='selectThisTab(index)'>{{ tab }}</button>"
                    + "</v-ons-segment>"
                    + "<div class='tabset-content'>"
                        + "<slot></slot>"
                    + "</div>"
                + "</div>"
});