import _ from 'lodash';

import YandexRoute from './yandex';

// var L = require('leaflet');
// const map = L.map('map').setView([55.756, 37.627], 13);


const map = new L.Map('map', {center: new L.LatLng(55.756, 37.627), zoom: 13, zoomAnimation: false });


// const osm = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
const yndx = new L.Yandex();

let YR, osmContainer, yndxContainer;

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
setTimeout(() => { YR = new YandexRoute(yndx) }, 5000);

map.addControl(new L.Control.Layers(
		{"Yandex":yndx}
	)
);



const
	markers = [],
	markerNames = ["A", "B", "C"];



map.on('click', function(e) {

	if(markers.length == 3) return;


	let marker = L.marker(e.latlng, {draggable: true})
	marker.addTo(map)
		.bindPopup(markerNames.shift())
		.openPopup();

	marker.on('dragend', buildRoute);

	markers.push(marker);
	buildRoute();

});




const buildRoute = function(){
	if(markers.length !== 3){
		console.warn('3 points required');
		return;
	}

	YR.buildRoute(markers.map( ({_latlng}) => {return [_latlng.lat, _latlng.lng]} ));
}
