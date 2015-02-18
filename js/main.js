//var map = L.map('map').setView([51.505, -0.09], 13);

var map = new L.Map('map', {center: new L.LatLng(50.109146,14.4986248), zoom: 16});
var osm = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
var ggl = new L.Google('ROADMA');
//var ggl2 = new L.Google('TERRAIN');
map.addLayer(ggl);
map.addControl(new L.Control.Layers( {'OSM':osm, 'Google':ggl}, {}));

initReload(500);

/*
$.getJSON({
    type: "GET"
    ,dataType: "json"
    ,url:"https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=AIzaSyC4biH3p8QTWhVAdOGp8PuHRjtKyVGleXA&location=50.109146,14.4986248&radius=500&types=atm"
    ,data:""
    ,success:function (data,status,xhr) {
        alert(data);
    }
    
});
*/

/*    
$.getJSON( "https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=AIzaSyC4biH3p8QTWhVAdOGp8PuHRjtKyVGleXA&location=50.109146,14.4986248&radius=500&types=atm", function( json ) {
console.log( json );
});
*/

var map2;
var service;
var infowindow;

function initReload(radius){
//function initialize() {
  var pyrmont = new google.maps.LatLng(50.109146,14.4986248);
/*
  map2 = new google.maps.Map(document.getElementById('map2'), {
      center: pyrmont,
      zoom: 15
    });
*/
  var request = {
    location: pyrmont,
    radius: radius,
    types: ['atm']
  };

  //service = new google.maps.places.PlacesService(map2);
  //service.nearbySearch(request, callback);
  
  s2 = new google.maps.places.PlacesService(ggl._google);
  //console.log(s2);
  s2.nearbySearch(request, cb);
  
  //console.log(s2);
  //console.log("-----");
  //console.log(map2);
  
  //s3 = new ggl._google.maps.places.PlacesService(ggl._google);
  //s3.nearbySearch(request, cb2);
}


function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
      //console.log(results);
    for (var i = 0; i < results.length; i++) {
      var place = results[i];
      createMarker(results[i]);
      //console.log(results);
    }
  }
}

function cb(results, status, pagination) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    //console.log(results);
    pagination.nextPage();
    console.log("pagination.nextPage();");
    for (var i = 0; i < results.length; i++) {
      var place = results[i];
      createMarker(results[i]);
      //console.log(results);
    }
    //alert("pridano: "+marker.length);
    //console.log(marker);
    if(marker.length>50){
      alert("Limit hit!");
    }
  }
}
function cb2(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
      console.log(results);
    for (var i = 0; i < results.length; i++) {
      var place = results[i];
      //createMarker(results[i]);
      //console.log(results);
    }
  }
}

var marker = new Array();

function createMarker(place) {
  //var placeLoc = place.geometry.location;
  //var marker = new google.maps.Marker({
  //  map: map2,
  //  position: place.geometry.location
  //});
  //var a = L.marker(L.latLng(place.geometry.location.lat(),place.geometry.location.lng())).addTo(map);
  //console.log(place.geometry.location.lat());
  //console.log(a);
  var LamMarker = new L.marker(L.latLng(place.geometry.location.lat(),place.geometry.location.lng()));
  marker.push(LamMarker);
  //map.addLayer(marker.length);
  map.addLayer(LamMarker);
}

$( "#btnOK" ).click(function() {
  //alert( "Handler for .click() called." ;)
  //L.marker()
  for(i=0;i<marker.length;i++) {
    map.removeLayer(marker[i]);
  }
  console.log($( "#radius" ).val());
  initReload($( "#radius" ).val());
});