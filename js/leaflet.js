//Definera länkar till basemaps (grundkartor) OpenStreetMap & satellit
const basemaps = {
    OpenStreetMap: L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors.</a>.'
    }),
    Satellit: L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: '&copy; <a href="https://www.arcgis.com/home/item.html?id=10df2279f9684e4a9f6a7f08febac2a9">Esri, Maxar, Earthstar Geographics, and the GIS User Community</a>.'
    })
};

// Skapar kartan med restriktioner på zoom
const lfmap = L.map('map', {
    center: [60.25542, 18.69360],
    zoom: 14,
    minZoom: 12,
    zoomControl: false,
    layers: [basemaps.OpenStreetMap],
});

// Definera kartans gränser (en bit utanför VÖ, Garpen, Bodskären)-->
const sw = L.latLng(60.0, 18.0);
const ne = L.latLng(60.4, 19.0);
const bounds = L.latLngBounds(sw, ne);
lfmap.setMaxBounds(bounds);
lfmap.on('drag', function () {
    lfmap.panInsideBounds(bounds, { animate: true });
});

const SCALE = new L.Control.ScaleNautical({
    position: "bottomright",
    maxWidth: 100
}).addTo(lfmap);

// Inställningar och aktivering av lokaliseringsfunktion - https://github.com/domoritz/leaflet-locatecontrol - För inställningar och instruktioner för locate.
const LC = L.control
    .locate({
        strings: {
            title: "Visar din nuvarande position!"
        },
        position: "bottomleft",
    }).addTo(lfmap);

// Switch basemap
if (document.querySelector('input[name="selectBackground"]')) {
    document.querySelectorAll('input[name="selectBackground"]').forEach((elem) => {
        elem.addEventListener("change", function (event) {
            const ITEM = event.target.value;
            for (let key in basemaps) {
                basemaps[key].remove();
            };
            basemaps[ITEM].addTo(lfmap);
        });
    });
}

export default lfmap;