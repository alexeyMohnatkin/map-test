import $ from 'jquery';

export default class YandexRoute {

	constructor(layer) {
		// console.log(layer._yandex);
		this.map = layer._yandex;
	}


	buildRoute(points) {
		if(points.length != 3){
			return;
		}
		this.points = points;
		ymaps.ready(this._buildRoute.call(this));
	}

	_buildRoute() {

		const myMap = this.map;


		myMap.geoObjects.removeAll();
		$('#list').html('');
		// Добавим на карту схему проезда
		// от улицы Крылатские холмы до станции метро "Кунцевская"
		// через станцию "Молодежная" и затем до станции "Пионерская".
		// Точки маршрута можно задавать 3 способами:
		// как строка, как объект или как массив геокоординат.
		ymaps.route(this.points).then(function(route) {
			myMap.geoObjects.add(route);

			// Зададим содержание иконок начальной и конечной точкам маршрута.
			// С помощью метода getWayPoints() получаем массив точек маршрута.
			// Массив транзитных точек маршрута можно получить с помощью метода getViaPoints.
			var points = route.getWayPoints();

			points.options.set('visible', false);

			// Задаем контент меток в начальной и конечной точках.
			// points.get(0).properties.set('iconContent', 'Точка отправления');
			// points.get(lastPoint).properties.set('iconContent', 'Точка прибытия');

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
					moveList += ('Едем ' + segments[j].getHumanAction() + (street ? ' на ' + street : '') + ', проезжаем ' + segments[j].getLength() + ' м.,');
					moveList += '</br>'
				}
			}
			moveList += 'Останавливаемся.';
			// Выводим маршрутный лист.
			$('#list').append(moveList);
		}, function(error) {
			alert('Возникла ошибка: ' + error.message);
		});
	}
	// return buildRoute(domNode)
}


// export default YandexRoute;
