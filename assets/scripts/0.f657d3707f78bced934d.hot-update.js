webpackHotUpdate(0,[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _lodash = __webpack_require__(1);
	
	var _lodash2 = _interopRequireDefault(_lodash);
	
	var _yandex = __webpack_require__(3);
	
	var _yandex2 = _interopRequireDefault(_yandex);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/*
	$(() => {
		svg4everybody();
	});
	*/
	
	// var L = require('leaflet');
	// const map = L.map('map').setView([55.756, 37.627], 13);
	
	// import svg4everybody from 'svg4everybody';
	// import $ from 'jquery';
	var map = new L.Map('map', { center: new L.LatLng(55.756, 37.627), zoom: 13, zoomAnimation: false });
	
	var osm = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
	var yndx = new L.Yandex();
	
	// const ytraffic = new L.Yandex("null", {traffic:true, opacity:0.8, overlay:true});
	
	// map.addLayer(ytraffic);
	
	var group = L.FeatureGroup.loadEvents([osm, yndx]);
	var YR = void 0,
	    osmContainer = void 0,
	    yndxContainer = void 0;
	
	/*group.on({
		loading: function() {
			console.log('The layer group just fired the "loading" event!');
		},
		load: function() {
			console.log('The layer group just fired the "loaded" event!');
	
	
		}
	});
	group.addTo(map);
	*/
	
	map.addLayer(yndx);
	// map.addLayer(osm);
	osm.addTo(map).bringToBack();
	
	// беда с событиями в плагине яндекса
	setTimeout(function () {
		YR = new _yandex2.default(yndx);
	}, 4000);
	
	map.addControl(new L.Control.Layers({ 'OSM': osm, "Yandex": yndx }
	// {"Traffic":ytraffic}
	));
	
	// console.log(yndx.prototype);
	/*L.Class.prototype.onAdd.call(yndx, function() {
			// console.log('123');
		}
	);*/
	
	var markers = [],
	    markerNames = ["A", "B", "C"];
	
	map.on('click', function (e) {
	
		if (markers.length == 3) return;
	
		var marker = L.marker(e.latlng, { draggable: true });
		marker.addTo(map).bindPopup(markerNames.shift()).openPopup();
	
		marker.on('dragend', refreshMarkers);
	
		markers.push(marker);
	
		// if(markers.length === 3){
		// YR.markers = markers.map( ({_latlng}) => {return [_latlng.lat, _latlng.lng]} );
		buildRoute();
		// }
	});
	
	var refreshMarkers = function refreshMarkers() {
		// if(markers.length === 3){
		buildRoute();
		// }
		// console.log(markers);
		/*_.each(markers, (marker, index) => {
	 	console.log(index);
	 	// YR.markers = markers;
	 	// marker.dragend(()=>);
	 });*/
	};
	
	var buildRoute = function buildRoute() {
		if (markers.length !== 3) {
			console.warn('3 points required');
			return;
		}
	
		// YR.markers = markers.map( ({_latlng}) => {return [_latlng.lat, _latlng.lng]} );
		// YandexRoute.buildRoute(yndx._map);
		// let YR = new YandexRoute(yndx._yandex);
		YR.buildRoute(markers.map(function (_ref) {
			var _latlng = _ref._latlng;
			return [_latlng.lat, _latlng.lng];
		}));
		// console.log(yndx);
	};
	
	// console.log(YandexRoute);

/***/ }
])
//# sourceMappingURL=0.f657d3707f78bced934d.hot-update.js.map