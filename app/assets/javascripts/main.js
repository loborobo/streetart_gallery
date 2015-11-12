$(document).on('page:change', function(event) {
  console.log('main.js loaded')

  var artworks_list = gon.artworks;
  var map;
  var all_markers = [];


  if ($('#main_map').length > 0) {
    initMainMap();
    setMarkers();
  };
 
  
  function initMainMap() {
    console.log("init map called");
    map = new google.maps.Map($('#main_map')[0], {
      center: {lat: 43.660, lng: -79.402},
      zoom: 13
    });
  }

  function setMarkers() {
    console.log("setting markers")
    for (var i = 0; i < artworks_list.length; i++)  {
      var latitude = artworks_list[i].latitude;
      var longitude = artworks_list[i].longitude; 
      var latlong = {lat: latitude, lng: longitude}
      var image_marker = [artworks_list[i].id, latlong]
      var marker = new google.maps.Marker({
        position: latlong
      });
    marker.setMap(map);
    all_markers.push(image_marker);
    }
  debugger;
  }
  
  var i = 0;
  var imageTag = "<img src="+ artworks_list[i].image.url+">"
    $('#artworks').html(imageTag)

  function showPictures() {
    i++;
    if (i == artworks_list.length) {
      i = 0;
    };
    var image_lat = artworks_list[i].latitude;
    var image_lng = artworks_list[i].longitude;
    imageTag = "<img src="+ artworks_list[i].image.url+">"
    $('#artworks').html(imageTag);
    map.setCenter(new google.maps.LatLng(image_lat, image_lng));
  }

  setInterval(showPictures, 2000);

});

  

if(locations[i][1] === lat_center && locations[i][2] === long_center) {

          marker.setAnimation(google.maps.Animation.DROP);
               marker.setIcon('http://maps.google.com/intl/en_us/mapfiles/ms/micons/purple.png');
        text += '<br>' + 'Additionl text for centered marker';
      }
