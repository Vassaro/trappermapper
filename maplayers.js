//Definera länkar till basemaps (grundkartor) OpenStreetMap & satellit
const BASEMAPS = {
    OpenStreetMap: L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors.</a>.'
    }),
    Satellit: L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: '&copy; <a href="https://www.arcgis.com/home/item.html?id=10df2279f9684e4a9f6a7f08febac2a9">Esri, Maxar, Earthstar Geographics, and the GIS User Community</a>.'
    })
};

//Definerar grupper
const GROUPS = {
    campfirering: new L.LayerGroup(),
    campfirerock: new L.LayerGroup(),
    firehouse: new L.LayerGroup(),
    // campfireother: new L.LayerGroup(),
    windshelterfire: new L.LayerGroup(),
    windshelter: new L.LayerGroup(),
    coopsite: new L.LayerGroup(),
    obstaclecourse: new L.LayerGroup(),
    bstt: new L.LayerGroup(),
    vassarorunt: new L.LayerGroup(),
    naturetrail: new L.LayerGroup(),
    trapper: new L.LayerGroup(),
    yellowtrail: new L.LayerGroup(),
    pinktrail: new L.LayerGroup(),
    bunkertrail: new L.LayerGroup(),
    moorings: new L.LayerGroup(),
    wildernesstrail: new L.LayerGroup(),
    treetrail: new L.LayerGroup(),
    pooptrail: new L.LayerGroup(),
    knottrail: new L.LayerGroup(),
    startrail: new L.LayerGroup(),
    woodcrafttrail: new L.LayerGroup(),
    naturegame: new L.LayerGroup(),
    chargebox: new L.LayerGroup(),
    toilets: new L.LayerGroup(),
    trashrooms: new L.LayerGroup(),
    // bookablerooms: new L.LayerGroup(),
    beachtrail: new L.LayerGroup(),
    // areas: new L.LayerGroup(),
    allorientering: new L.LayerGroup(),
    centralorientering: new L.LayerGroup(),
    fotoorientering: new L.LayerGroup(),
    miniorientering: new L.LayerGroup(),
    ls: new L.LayerGroup(),
    shortcuts: new L.LayerGroup(),
    boomerang: new L.LayerGroup(),
};

//Grupperar kartlager
const OVERLAYS_TREE = {
    label: "Visa / dölj alla",
    selectAllCheckbox: 'Visa/dölj alla',
    children: [
        {
            label: 'Lägerbålsplatser',
            selectAllCheckbox: true,
            collapsed: true,
            children: [
                { label: "Stockringar", layer: GROUPS.campfirering },
                { label: "Klipphällar", layer: GROUPS.campfirerock },
                { label: "Eldstad med tak", layer: GROUPS.firehouse },
                // { label: "Andra", layer: GROUPS.campfireother },
            ]
        },
        {
            label: "Vindskydd",
            selectAllCheckbox: true,
            collapsed: true,
            children: [
                { label: "Med eldstad", layer: GROUPS.windshelterfire },
                { label: "Utan eldstad", layer: GROUPS.windshelter },
            ]
        },
        {
            label: "Programaktiviteter",
            selectAllCheckbox: true,
            collapsed: false,
            children: [
                {
                    label: "Spår",
                    selectAllCheckbox: true,
                    collapsed: true,
                    children: [
                        { label: "Trapperspåret", layer: GROUPS.trapper },
                        { label: "Vildmarksspåret", layer: GROUPS.wildernesstrail },
                        { label: "Naturnäran", layer: GROUPS.naturetrail },
                        { label: "Bunkerspåret", layer: GROUPS.bunkertrail },
                        { label: "Naturleken", layer: GROUPS.naturegame },
                        { label: "Trädtränan", layer: GROUPS.treetrail },
                        { label: "Ovan molnen", layer: GROUPS.startrail },
                        { label: "Knopspåret", layer: GROUPS.knottrail },
                        { label: "Träck track", layer: GROUPS.pooptrail },
                        { label: "Woodcraftspåret", layer: GROUPS.woodcrafttrail },
                    ]
                },
                {
                    label: "Platser",
                    selectAllCheckbox: true,
                    collapsed: true,
                    children: [
                        { label: "Samarbetsgläntan", layer: GROUPS.coopsite },
                        { label: "Hinderbanan", layer: GROUPS.obstaclecourse },
                        { label: "Blood, sweat, tears and teamwork", layer: GROUPS.bstt },
                    ]
                },
                {
                    label: "Orientering",
                    selectAllCheckbox: true,
                    collapsed: true,
                    children: [
                        { label: "Miniorienteringen", layer: GROUPS.miniorientering },
                        { label: "Fotoorienteringen", layer: GROUPS.fotoorientering },
                        { label: "Centrala ön", layer: GROUPS.centralorientering },
                        { label: "Hela ön", layer: GROUPS.allorientering },
                    ]
                },
            ]
        },
        {
            label: "Vandringsstigar",
            selectAllCheckbox: true,
            collapsed: true,
            children: [
                { label: "Berättelsen", layer: GROUPS.beachtrail },
                { label: "Rosa spåret", layer: GROUPS.pinktrail },
                { label: "Gula spåret", layer: GROUPS.yellowtrail },
                { label: "Genvägar", layer: GROUPS.shortcuts },
                { label: "Vässarö runt", layer: GROUPS.vassarorunt },
            ]
        },
        {
            label: "Annat",
            selectAllCheckbox: true,
            collapsed: false,
            children: [
                { label: "Naturhamnar", layer: GROUPS.moorings },
                { label: "Laddlådor", layer: GROUPS.chargebox },
                { label: "Dass", layer: GROUPS.toilets },
                { label: "Soprum", layer: GROUPS.trashrooms },
                // { label: "Områden", layer: GROUPS.areas },
                // { label: 'Lägerskola', layer: GROUPS.ls }
            ]
            // "Lokaler": GROUPS.bookablerooms,
        }
    ]
}

//Skapa en lista med källor för geojson-data
const SOURCES = [
    "data/trapper.geojson",
    "data/trails.geojson",
    "data/activitySites.geojson",
    "data/moorings.geojson",
    "data/campfireSites.geojson",
    "data/chargeboxes.geojson",
    "data/toilets.geojson",
    "data/trashrooms.geojson",
    "data/orientering.geojson",
];

// Hämta geoJSON-objekt från varje fil
function getSources(sourceList) {
    sourceList.forEach(source => {
        var pathName = document.location.pathname;
        if (pathName == "/" || pathName == "/trappermapper/") {
            sourceUrl = source;
        } else {
            sourceUrl = "../" + source;
        }
        fetch(sourceUrl)
            .then(response => response.json())
            .then(data => {
                L.geoJSON(data, {
                    onEachFeature: function (feature, layer) {
                        if (feature.properties.title) {
                            layer.bindPopup("<b>" + feature.properties.title + "</b><br>" + feature.properties.desc);
                        }
                        if (!feature.properties.skip) { // för att dölja vissa stigar
                            if (typeof (feature.properties.group) === 'string') {
                                GROUPS[feature.properties.group].addLayer(layer);
                            } else {
                                feature.properties.group.forEach(element => {
                                    GROUPS[element].addLayer(layer);
                                })
                            }
                        }
                    },
                    pointToLayer: function (feature, latlng) {
                        if (feature.properties.icon) {
                            thisMarker = L.marker(latlng, {
                                icon: ICONS[feature.properties.icon],
                            });
                        } else {
                            thisMarker = L.marker(latlng, {
                            });
                        }
                        return thisMarker;
                    },
                    style: function (feature) {
                        return {
                            color: feature.properties.color,
                            weight: 10,
                            opacity: 0.7,
                        };
                    }
                });
            })
            .catch(error => {
                console.error('Error loading GeoJSON:', error);
            });
    });
};


// Inställningar till lagerkontrollen
const OPTIONS = {
    closedSymbol: '<i style="width:16px; text-align:center" class="fa fa-solid fa-chevron-right"></i>',
    openedSymbol: '<i style="width:16px; text-align:center" class="fa fa-solid fa-chevron-down"></i>',
    selectorBack: false,
    namedToggle: false,
    // collapseAll: "Kollapsa alla",
    // expandAll: "Expandera alla",
    labelIsSelector: "both",
    collapsed: false,
};

// Fönster ut ur filen
window.MapLayers = {
    OverlaysTree: OVERLAYS_TREE,
    Basemaps: BASEMAPS,
    Options: OPTIONS
}
