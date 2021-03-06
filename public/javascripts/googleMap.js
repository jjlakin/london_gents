var map;
var boroughsJson;
var colors = ["#FF9999", "#FF6666", "#FF3333", "#FF0000", "#CC0000", "#800000"];
// var colors = ["#FFFF00", "#FFCC00", "#FF9933", "#FF6600", "#FF4719", "#FF0000"];

function initialize() {

	var styles = [
		{
			"elementType": "labels",
			"stylers": [
				{ "visibility": "off" }
			]
		},{
			"elementType": "geometry",
			"stylers": [
				{ "color": "#ffffff" }
			]
		},{
			"featureType": "road.highway",
			"stylers": [
				{ "color": "#dcedf1" },
				{ "weight": 0.6 }
			]
		},{
			"featureType": "road.arterial",
			"stylers": [
				{ "weight": 0.2 },
				{ "color": "#e6e6e7" }
			]
		},{
			"featureType": "water",
			"stylers": [
				{ "color": "#1D283D" }
			]
		},
	];


	var styles2 = [
	{
		"stylers": [
			{ "color": "#76da91" }
		]
	},{
		"featureType": "water",
		"stylers": [
			{ "color": "#e72f8c" }
		]
	},{
		"featureType": "road.highway",
		"elementType": "geometry",
		"stylers": [
			{ "color": "#e0ffdf" },
			{ "weight": 0.6 }
		]
	},{
		"featureType": "road.arterial",
		"elementType": "geometry",
		"stylers": [
			{ "weight": 0.2 },
			{ "color": "#e0ffea" }
		]
	}
]

	map = new google.maps.Map(document.getElementById('map-canvas'), {
	zoom: 11,
	center: {lat: 51.51, lng: - 0.10}

	})

	map.setOptions({styles: styles});

	$.getJSON("/trendingIndex", function(data) {
		console.log(boroughsJson);
		boroughsJson = data;

		map.data.setStyle(function(feature){
			return {fillColor: intensity(boroughsJson[feature.k.name]), fillOpacity: 0.8, strokeColor: 'white',strokeWeight: 0.5};
		});

		map.data.addListener('mouseover', function(event) {
			map.data.revertStyle();
			map.data.overrideStyle(event.feature, {strokeWeight: 3});
		});

		map.data.addListener('click', function(event) {

			map.data.revertStyle();
			map.data.overrideStyle(console.log(event.feature),console.log(event.feature.k.name));
			$.ajax({
				url: 'https://api.instagram.com/v1/tags/' + event.feature.k.name.replace(/\s/g, '') +'/media/recent?client_id=89cc7d4644154c718cc5fb612e5da3cb;count=20',
				method: 'GET',
				dataType: 'jsonp',
				success: function(data) {
					var imageArray = data.data;
					var urls = [];
					for(i in imageArray) {
						urls.push(imageArray[i].images.thumbnail.url)
					}
					var newImages = Mustache.render($('#instagram-images').html(), urls);
					console.log(urls);
					$(newImages).appendTo('.image-container');

					$('#image1').attr("src", urls[0]);
					$('#image2').attr("src", urls[1]);
					$('#image3').attr("src", urls[2]);
					$('#image4').attr("src", urls[3]);
					$('#image5').attr("src", urls[4]);
					$('#image6').attr("src", urls[5]);
					$('#image7').attr("src", urls[6]);
					$('#image8').attr("src", urls[7]);
					$('#image9').attr("src", urls[8]);
					$('#image10').attr("src", urls[9]);
					$('#image11').attr("src", urls[10]);
					$('#image12').attr("src", urls[11]);
					$('#image13').attr("src", urls[12]);
					$('#image14').attr("src", urls[13]);
					$('#image15').attr("src", urls[14]);
					$('#image16').attr("src", urls[15]);
					$('#image17').attr("src", urls[16]);
					$('#image18').attr("src", urls[17]);
					$('#image19').attr("src", urls[18]);
					$('#image20').attr("src", urls[19]);
				}
			})
		});

		map.data.addListener('click', function(event) {
			$('.borough-index').text(boroughsJson[event.feature.k.name]);
				console.log(typeof intensity(boroughsJson[event.feature.k.name]))
			$('.borough-index').css('color', intensity(boroughsJson[event.feature.k.name]))
		});

		map.data.addListener('click', function(event){
			$('.borough-name').text(event.feature.k.name)
		});


	});

	// $.getJSON('./data/compound-cities/boroughMap.json', function( data ){
	// 	var json = data;
	// 	console.log(json);
	// 	return json;
	// });

	// Load GeoJSON.
	var json = 'https://rawgit.com/jjlakin/compound-cities/master/greater-london/my-api.json'
	map.data.loadGeoJson(json);

	};

	var intensity = function(data) {
		if (data > 90) {
			return colors[5]
		}
		else if (data > 80 && data < 90) {
			return colors[4]
		}
		else if (data > 70 && data < 80) {
			return colors[3]
		}
		else if (data > 60 && data < 70) {
			return colors[2]
		}
		else if (data > 500 && data < 60) {
			return colors[2]
		}
		else {
			return colors[0]
		}

		// return colours[data];
}

google.maps.event.addDomListener(window, 'load', initialize);
