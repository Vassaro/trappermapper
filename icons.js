// icons.js

baseUrl = document.location.origin

const ICONS = {
    firehousePin: new L.Icon({
        iconUrl: baseUrl + '/icons/firehouse.png',
        iconSize: [60, 60],
        iconAnchor: [30, 60],
        popupAnchor: [0, -60]
    }),
    windshelterPin: new L.Icon({
        iconUrl: baseUrl + '/icons/windshelter.png',
        iconSize: [60, 60],
        iconAnchor: [30, 60],
        popupAnchor: [0, -60]
    }),
    campfireringPin: new L.Icon({
        iconUrl: baseUrl + '/icons/campfirering.png',
        iconSize: [60, 60],
        iconAnchor: [30, 60],
        popupAnchor: [0, -60]
    }),
    windshelterfirePin: new L.Icon({
        iconUrl: baseUrl + '/icons/windshelterfire.png',
        iconSize: [60, 60],
        iconAnchor: [30, 60],
        popupAnchor: [0, -60]
    }),
    campfirerockPin: new L.Icon({
        iconUrl: baseUrl + '/icons/campfire.png',
        iconSize: [60, 60],
        iconAnchor: [30, 60],
        popupAnchor: [0, -60]
    }),
    campfireotherIcon: new L.Icon({
        iconUrl: baseUrl + '/icons/otherPin.svg',
        iconSize: [80, 80],
        iconAnchor: [40, 80],
        popupAnchor: [0, -40]
    }),
    hollyrosaFlag: new L.Icon({
        iconUrl: baseUrl + '/icons/flagHollyrosa.png',
        iconSize: [60, 60],
        iconAnchor: [15, 40],
        popupAnchor: [0, -30]
    }),
    boomerangFlag: new L.Icon({
        iconUrl: baseUrl + '/icons/boomerang.png',
        iconSize: [60, 60],
        iconAnchor: [15, 40],
        popupAnchor: [0, -30],
        shadowUrl: baseUrl + '/icons/boomerangskugga.png',
        shadowSize: [60, 60],
        shadowAnchor: [15, 40],
    }),
    startFlag: new L.Icon({
        iconUrl: baseUrl + '/icons/flagStart.svg',
        iconSize: [60, 60],
        iconAnchor: [15, 40],
        popupAnchor: [0, -30]
    }),
    finishFlag: new L.Icon({
        iconUrl: baseUrl + '/icons/flagFinish.svg',
        iconSize: [60, 60],
        iconAnchor: [15, 40],
        popupAnchor: [0, -30]
    }),
    tempIcon: new L.icon({
        iconUrl: baseUrl + '/icons/flagTemp.svg',
        iconSize: [60, 60],
        iconAnchor: [0, 30],
        popupAnchor: [0, -30]
    }),
    toiletPin: new L.icon({
        iconUrl: baseUrl + '/icons/toilet.png',
        iconSize: [60, 60],
        iconAnchor: [30, 60],
        popupAnchor: [0, -60]
    }),
    trashroomPin: new L.icon({
        iconUrl: baseUrl + '/icons/trashroom.png',
        iconSize: [60, 60],
        iconAnchor: [30, 60],
        popupAnchor: [0, -60]
    }),
    chargeboxPin: new L.icon({
        iconUrl: baseUrl + '/icons/chargeboxPin.png',
        iconSize: [60, 60],
        iconAnchor: [30, 60],
        popupAnchor: [0, -60]
    })
};

// Fönster ut ur filen
window.Icons = {
    IconList: ICONS
};