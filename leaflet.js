// Skapar kartan med restriktioner på zoom -->
var lfmap = L.map('map', {
    center: [60.25542, 18.69360],
    zoom: 14,
    minZoom: 12,
    zoomControl: false,
    layers: [MapLayers.Basemaps.OpenStreetMap],
});

// Definera kartans gränser (en bit utanför VÖ, Garpen, Bodskären)-->
const SOUTH_WEST = L.latLng(60.0, 18.0);
const NORTH_EAST = L.latLng(60.4, 19.0);
const BOUNDS = L.latLngBounds(SOUTH_WEST, NORTH_EAST);
lfmap.setMaxBounds(BOUNDS);
lfmap.on('drag', function () {
    lfmap.panInsideBounds(BOUNDS, { animate: true });
});

// Lägg till lager och kontroller till kartan.
const LAYER_CONTROL = L.control.layers.tree(null, MapLayers.OverlaysTree, MapLayers.Options).addTo(lfmap);

// Lägg till sidomeny till kartan.
const SIDEBAR = L.control.sidebar('sidebar').addTo(lfmap);

// Inställningar och aktivering av lokaliseringsfunktion - https://github.com/domoritz/leaflet-locatecontrol - För inställningar och instruktioner för locate.
const LC = L.control
    .locate({
        strings: {
            title: "Visar din nuvarande position!"
        }
    }).addTo(lfmap);

// Lägg till zoom-kontroll
const ZOOM = L.control.zoom().addTo(lfmap)

// Skapa skalan
const SCALE = L.control.scale({
    position: "bottomright",
    metric: true,
}).addTo(lfmap)

// Flytta knappar till sidomenyn eller filtermenyn.
const OBJECTS = [LC, ZOOM]
const BUTTON_BOX = document.getElementById('button-box')
const FILTER_BOX = document.getElementById('filter-box')
function setParent(child, newParent) {
    newParent.appendChild(child.getContainer());
};
OBJECTS.forEach(element => {
    setParent(element, BUTTON_BOX);
});
setParent(LAYER_CONTROL, FILTER_BOX);

// Switch basemap
if (document.querySelector('input[name="selectBackground"]')) {
    document.querySelectorAll('input[name="selectBackground"]').forEach((elem) => {
        elem.addEventListener("change", function (event) {
            const ITEM = event.target.value;
            for (let key in MapLayers.Basemaps) {
                MapLayers.Basemaps[key].remove();
            };
            MapLayers.Basemaps[ITEM].addTo(lfmap);
        });
    });
}
