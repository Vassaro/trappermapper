// js/main.js

import i18n from "./i18n.js";
import lfmap from "./leaflet.js";


import { LayerTreeControl } from "./layerControl.js";

// Your existing map setup

// Layer tree
const layerTree = new LayerTreeControl(
    lfmap,
    document.getElementById("filter-box"),
    {
        translate: key => i18n.t(key)
    }
);

console.log(layerTree)

await layerTree.loadConfig("./js/data/layers.json");
