$(document).on('page:change', function(event) {
  console.log('main.js loaded')

  if ($('#main_map').length > 0) {
    initMainMap();
  };
  
  var map;
  function initMainMap() {
    console.log("main.js called");
    map = new google.maps.Map(document.getElementById('main_map'), {
      center: {lat: 43.660, lng: -79.402},
      zoom: 12
    });

    var artworks = gon.artworks
    for (var i = 0; i < artworks.length; i++)  {
      var latitude = artworks[i].latitude;
      var longitude = artworks[i].longitude; 
      var latlong = {lat: latitude, lng: longitude}
      var marker = new google.maps.Marker({
        position: latlong
      });
    marker.setMap(map);
    } 

  }
});

