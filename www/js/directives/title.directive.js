/*
<i class="fa fa-headphones" aria-hidden="true"></i>
<i class="fa fa-picture-o" aria-hidden="true"></i>
<i class="fa fa-video-camera" aria-hidden="true"></i>
*/
Vue.component("v-title", {
    props: ["tag", "color", "metadata", "url", "colorText"],
    template: "",
    render: function (createElement) {
        var elements = [];
        if (this.metadata) {
            if (this.metadata.video   === 1) {
                elements.push(createElement("i", {
                    attrs: {
						"class":  "fa fa-video-camera icon-title color-" + this.color
                    }
                }));
            }
            if (this.metadata.galeria === 1) {
                elements.push(createElement("i", {
                    attrs: {
						"class":  "fa fa-picture-o  icon-title color-" + this.color
                    }
                }));
            }
            if (this.metadata.audio   === 1) {
                elements.push(createElement("i", {
                    attrs: {
						"class":  "fa fa-headphones  icon-title color-" + this.color
                    }
                }));
            }
        }
        elements.push(this.$slots.default[0].text);
        var attrs = {
            title: this.title,
            href: this.url,
			rel: "noopener",
			class: "v-title"
        };
        if (this.colorText) {
            attrs.class += " color-" + this.colorText;
        }

        return createElement(this.tag, [createElement("a", {
            attrs: attrs
        }, elements)]);
    }
});