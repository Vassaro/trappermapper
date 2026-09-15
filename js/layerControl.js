export class LayerTreeControl {
    constructor(map, container, options = {}) {
        this.map = map;
        this.container = container;
        this.options = options;

        // this.translate = options.translate || (key => key);
        this.translate = options.translate ?? (key => key);

        this.layers = new Map();
        this.config = null;
    }

    /*
     * Loads layer config from eg. /js/data/layers.json
     */
    async loadConfig(url) {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Could not load layer configuration: ${response.status}`);
        }

        this.config = await response.json();
        await this.loadLayers(this.config.layers);
        this.renderTree();
    }

    /*
     * For each layer in config, recursively load its children or if it is a leaf, load geojson objects
     */
    async loadLayers(layers) {
        for (const layer of layers) {
            if (!layer.skip) {
                if (layer.children) {
                    await this.loadLayers(layer.children);
                }
                if (layer.source) {
                    // await this.loadGeoJsonLayer(layer);
                }
            }
        }
    }

    /* 
     * Load geojson layer as defined in layer
     */
    loadGeoJsonLayer(layer) {
        // TODO
    }

    /*
     * Render layer tree control
     */
    renderTree() {
        this.container.innerHTML = "";
        for (const layer of this.config.layers) {
            console.log(layer)
            if (!layer.skip) {
                this.container.appendChild(this.createNode(layer));
            }
        }
    }

    /*
     * Render layer tree row
     */
    createNode(layer, parentId = "", level = 0) {
        const li = document.createElement("li");

        const row = document.createElement("a");
        row.className = "dropdown-item";
        row.href = "#";

        row.addEventListener("click", event => {
            // event.preventDefault();
        });

        // if (level > 0) {
        //     row.style.paddingLeft = `${8 + level * 5}px`;
        // }

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.className = "form-check-input layer-checkbox";
        checkbox.id = `${layer.id}-checkbox`;
        checkbox.dataset.layerId = layer.id;

        const label = document.createElement("label");

        label.className = "ms-2";
        label.htmlFor = checkbox.id;

        if (level === 0) {
            label.dataset.i18n = "layers." + layer.id + ".title";
        } else {
            label.dataset.i18n = "layers." + parentId + "." + layer.id;
        }

        label.textContent =
            this.translate(label.dataset.i18n);

        row.appendChild(checkbox);
        row.appendChild(label);

        li.appendChild(row);

        if (layer.children?.length) {

            const children = document.createElement("ul");

            children.className = "list-unstyled layer-tree-children";

            for (const child of layer.children) {
                if (!child.skip) {
                    children.appendChild(
                        // this.createNode(child, level + 1)
                        this.createNode(child, layer.id, level + 1)
                    );
                }
            }

            li.appendChild(children);
        }

        return li;
    }

    toggleLayer() {
        // TODO...
    }


}
