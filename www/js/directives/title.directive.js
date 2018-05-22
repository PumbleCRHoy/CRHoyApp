Vue.component("v-title", {
    props: ["tag", "color", "metadata", "url", "colorText"],
    template: "",
    render: function (createElement) {
        var elements = [];
        if (this.metadata) {
            if (this.metadata.video   === 1) {
                elements.push(createElement("span", {
                    attrs: {
                        class: "icon icon-video color-" + this.color
                    }
                }));
            }
            if (this.metadata.galeria === 1) {
                elements.push(createElement("span", {
                    attrs: {
                        class: "icon icon-galery color-" + this.color
                    }
                }));
            }
            if (this.metadata.audio   === 1) {
                elements.push(createElement("span", {
                    attrs: {
                        class: "icon icon-audio color-" + this.color
                    }
                }));
            }
        }
		console.log(this);
        elements.push(this.$slots.default[0].text);
        var attrs = {
            title: this.title,
            href: this.url
        };
        if (this.colorText) {
            attrs.class = "color-" + this.colorText;
        }

        return createElement(this.tag, [createElement("a", {
            attrs: attrs
        }, elements)]);
    }
});