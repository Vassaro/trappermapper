/*
 *  Leaflet Nautical Scale
 *  Version 1.1
 *  Copyright (c) 2025 Daniel Martling
 * 
 *  A simple extension of the scale control that also shows nautical miles.
 */
L.Control.ScaleNautical = L.Control.Scale.extend({
    options: {
        position: "bottomleft",
        nautical: true,
        imperial: false,
        metric: true,
        maxWidth: 100,
        updateWhenIdle: false,
        nauticalMilesUnit: "NM"
    },

    onAdd: function (map) {
        var className = "leaflet-control-scale",
            container = L.DomUtil.create('div', className);
        var options = this.options;

        this._addScales(className, container);

        map.on(options.updateWhenIdle ? 'moveend' : 'move', this._update, this);
        map.whenReady(this._update, this);

        return container;
    },

    _addScales: function (className, container) {
        if (this.options.metric) {
            this._mScale = L.DomUtil.create('div', className + '-line', container);
        }
        if (this.options.imperial) {
            this._iScale = L.DomUtil.create('div', className + '-line', container);
        }
        if (this.options.nautical) {
            this._nScale = L.DomUtil.create('div', className + '-line', container);
        }
    },

    _update: function () {
        var map = this._map,
            y = map.getSize().y / 2;

        var maxMeters = map.distance(
            map.containerPointToLatLng([0, y]),
            map.containerPointToLatLng([this.options.maxWidth, y]));

        this._updateScales(maxMeters);
    },

    _updateScales: function (maxMeters) {
        if (this.options.metric && maxMeters) {
            this._updateMetric(maxMeters);
        }
        if (this.options.imperial && maxMeters) {
            this._updateImperial(maxMeters);
        }
        if (this.options.nautical && maxMeters) {
            this._updateNautical(maxMeters);
        }
    },

    _updateNautical: function (maxMeters) {
        var maxCables = maxMeters / 185.2,
            maxNauticalMiles,
            cables,
            nauticalMiles;

        if (maxCables >= 10) {
            maxNauticalMiles = maxMeters / 1852;
            nauticalMiles = L.Control.Scale.prototype._getRoundNum.call(this, maxNauticalMiles);
            this._updateScale(this._nScale, nauticalMiles + ' ' + this.options.nauticalMilesUnit, nauticalMiles / maxNauticalMiles);
        } else {
            cables = L.Control.Scale.prototype._getRoundNum.call(this, maxCables);
            this._updateScale(this._nScale, (cables / 10).toFixed(1) + ' ' + this.options.nauticalMilesUnit, cables / maxCables);
        }
    },

    _updateScale: function (scale, text, ratio) {
        var width = Math.round(this.options.maxWidth * ratio),
            screenWidth = this._map.getSize().x;
        if (width > screenWidth) {
            scale.style.display = "none";
        } else {
            scale.style.display = "";
            scale.style.width = width + 'px';
            scale.innerHTML = text;
        }
    }

});

L.control.scaleNautical = function (options) {
    return new L.Control.ScaleNautical(options);
};
