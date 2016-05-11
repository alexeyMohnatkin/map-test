webpackHotUpdate(0,{

/***/ 3:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _jquery = __webpack_require__(4);
	
	var _jquery2 = _interopRequireDefault(_jquery);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var YandexRoute = function () {
		function YandexRoute(layer) {
			_classCallCheck(this, YandexRoute);
	
			console.log(layer._yandex);
			this.map = layer._yandex;
		}
	
		_createClass(YandexRoute, [{
			key: 'buildRoute',
			value: function buildRoute(points) {
				if (points.length != 3) {
					return;
				}
				this.points = points;
				ymaps.ready(this._buildRoute.call(this));
			}
		}, {
			key: '_buildRoute',
			value: function _buildRoute() {
	
				var myMap = this.map;
				console.log('building a route');
	
				myMap.geoObjects.removeAl;
				// Добавим на карту схему проезда
				// от улицы Крылатские холмы до станции метро "Кунцевская"
				// через станцию "Молодежная" и затем до станции "Пионерская".
				// Точки маршрута можно задавать 3 способами:
				// как строка, как объект или как массив геокоординат.
				ymaps.route(this.points).then(function (route) {
					myMap.geoObjects.add(route);
	
					console.log(route);
					// Зададим содержание иконок начальной и конечной точкам маршрута.
					// С помощью метода getWayPoints() получаем массив точек маршрута.
					// Массив транзитных точек маршрута можно получить с помощью метода getViaPoints.
					var points = route.getWayPoints(),
					    lastPoint = points.getLength() - 1;
					// Задаем стиль метки - иконки будут красного цвета, и
					// их изображения будут растягиваться под контент.
					// points.options.set('preset', 'twirl#redStretchyIcon');
	
					// Задаем контент меток в начальной и конечной точках.
					points.get(0).properties.set('iconContent', 'Точка отправления');
					points.get(lastPoint).properties.set('iconContent', 'Точка прибытия');
	
					// Проанализируем маршрут по сегментам.
					// Сегмент - участок маршрута, который нужно проехать до следующего
					// изменения направления движения.
					// Для того, чтобы получить сегменты маршрута, сначала необходимо получить
					// отдельно каждый путь маршрута.
					// Весь маршрут делится на два пути:
					// 1) от улицы Крылатские холмы до станции "Кунцевская";
					// 2) от станции "Кунцевская" до "Пионерская".
	
					var moveList = 'Трогаемся,</br>',
					    way,
					    segments;
					// Получаем массив путей.
					for (var i = 0; i < route.getPaths().getLength(); i++) {
						way = route.getPaths().get(i);
						segments = way.getSegments();
						for (var j = 0; j < segments.length; j++) {
							var street = segments[j].getStreet();
							moveList += 'Едем ' + segments[j].getHumanAction() + (street ? ' на ' + street : '') + ', проезжаем ' + segments[j].getLength() + ' м.,';
							moveList += '</br>';
						}
					}
					moveList += 'Останавливаемся.';
					// Выводим маршрутный лист.
					(0, _jquery2.default)('#list').append(moveList);
				}, function (error) {
					alert('Возникла ошибка: ' + error.message);
				});
			}
			// return buildRoute(domNode)
	
		}]);
	
		return YandexRoute;
	}();
	
	// export default YandexRoute;
	
	
	exports.default = YandexRoute;

/***/ }

})
//# sourceMappingURL=0.61f517da8631bc549d8b.hot-update.js.map