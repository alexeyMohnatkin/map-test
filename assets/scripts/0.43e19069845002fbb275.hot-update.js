webpackHotUpdate(0,[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _lodash = __webpack_require__(1);
	
	var _lodash2 = _interopRequireDefault(_lodash);
	
	var _yandex = __webpack_require__(3);
	
	var _yandex2 = _interopRequireDefault(_yandex);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// var L = require('leaflet');
	// const map = L.map('map').setView([55.756, 37.627], 13);
	
	var map = new L.Map('map', { center: new L.LatLng(55.756, 37.627), zoom: 13, zoomAnimation: false });
	
	// const osm = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
	var yndx = new L.Yandex();
	
	var YR = void 0,
	    osmContainer = void 0,
	    yndxContainer = void 0;
	
	// const group = L.FeatureGroup.loadEvents([ osm, yndx ]);
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
	
	// беда с событиями в плагине яндекса
	setTimeout(function () {
		YR = new _yandex2.default(yndx);
	}, 5000);
	
	map.addControl(new L.Control.Layers({ "Yandex": yndx }));
	
	var markers = [],
	    markerNames = ["A", "B", "C"];
	
	map.on('click', function (e) {
	
		if (markers.length == 3) return;
	
		var marker = L.marker(e.latlng, { draggable: true });
		marker.addTo(map).bindPopup(markerNames.shift()).openPopup();
	
		marker.on('dragend', buildRoute);
	
		markers.push(marker);
		buildRoute();
	});
	
	var buildRoute = function buildRoute() {
		if (markers.length !== 3) {
			console.warn('3 points required');
			return;
		}
	
		YR.buildRoute(markers.map(function (_ref) {
			var _latlng = _ref._latlng;
			return [_latlng.lat, _latlng.lng];
		}));
	};

/***/ }
])
//# sourceMappingURL=0.43e19069845002fbb275.hot-update.js.map