import _ from 'lodash';

import YandexRoute from './yandex';

// var L = require('leaflet');
// const map = L.map('map').setView([55.756, 37.627], 13);


const map = new L.Map('map', {center: new L.LatLng(55.756, 37.627), zoom: 13, zoomAnimation: false });


let YR, osmContainer, yndxContainer;
// const osm = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
const yndx = new L.Yandex();
yndx.on('MapObjectInitialized', () => {
	YR = new YandexRoute(yndx)
});


// const group = L.FeatureGroup.loadEvents([ osm, yndx ]);
map.addLayer(yndx)

// map.addLayer(osm);

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
